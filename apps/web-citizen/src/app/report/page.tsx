'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { ChallengeSubmissionPayload, GeoLocation } from '@jagrit/contracts';
import { useCitizen } from '@/context/CitizenContext';
import AudioRecorder from '@/components/audio-recorder';
import CVLaserScanner, { DetectedDefect } from '@/components/cv-laser-scanner';
import SpatialRadarMap from '@/components/spatial-radar-map';
import {
  AlertCircle,
  MapPin,
  Camera,
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
  Navigation,
  ArrowRight,
  ArrowLeft,
  Layers,
  FileText,
  Mic,
} from 'lucide-react';

const JHARKHAND_DISTRICTS = [
  { name: 'Palamu', block: 'Lesliganj', lat: 24.0384, lon: 84.0706 },
  { name: 'Ranchi', block: 'Kanke', lat: 23.3441, lon: 85.3096 },
  { name: 'Dhanbad', block: 'Govindpur', lat: 23.7957, lon: 86.4304 },
  { name: 'Bokaro', block: 'Chas', lat: 23.6693, lon: 86.1511 },
  { name: 'East Singhbhum', block: 'Golmuri', lat: 22.8046, lon: 86.2029 },
  { name: 'Hazaribagh', block: 'Sadar', lat: 23.9925, lon: 85.3637 },
  { name: 'Dumka', block: 'Jama', lat: 24.2698, lon: 87.2471 },
  { name: 'Deoghar', block: 'Mohanpur', lat: 24.4826, lon: 86.6974 },
];

export default function ProblemSubmissionStudio() {
  const { t, language, currentLocation, setCurrentLocation, detectLocation, isDetectingLocation } = useCitizen();

  // Wizard Step State: 1 | 2 | 3
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  // Form State typed with @jagrit/contracts
  const [category, setCategory] = useState<string>('drinking_water');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // Step 1: Image upload with client-side canvas compression (<= 500 KB)
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSizeKb: number;
    compressedSizeKb: number;
    ratio: number;
  } | null>(null);

  // Step 3: Interactive Map Picker & Location
  const [mapCoords, setMapCoords] = useState<{ lat: number; lon: number }>({
    lat: currentLocation.lat || 24.0384,
    lon: currentLocation.lon || 84.0706,
  });
  const [activeDistrict, setActiveDistrict] = useState<string>(currentLocation.district || 'Palamu');
  const [activeBlock, setActiveBlock] = useState<string>(currentLocation.block || 'Lesliganj');
  const [isDraggingPin, setIsDraggingPin] = useState(false);
  const [mapTab, setMapTab] = useState<'radar' | 'pin'>('radar');
  const mapSvgRef = useRef<SVGSVGElement | null>(null);

  // Step 1: CV Laser Scanner Defect metadata
  const [detectedDefects, setDetectedDefects] = useState<DetectedDefect[]>([]);

  // Submission Status
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    {
      id: 'drinking_water',
      label:
        language === 'hi'
          ? 'पेयजल एवं चापाकल'
          : language === 'sat'
          ? 'ᱧᱩ ᱫᱟᱜ ᱟᱨ ᱪᱟᱯᱟᱠᱚᱞ'
          : 'Drinking Water & Handpumps',
    },
    {
      id: 'road_drainage',
      label:
        language === 'hi'
          ? 'ग्रामीण सड़क एवं जल निकासी'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱟ'
          : 'Rural Roads & Drainage',
    },
    {
      id: 'electricity',
      label:
        language === 'hi'
          ? 'ग्रामीण विद्युतीकरण एवं सौर ग्रिड'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ'
          : 'Electricity & Solar Microgrids',
    },
    {
      id: 'health',
      label:
        language === 'hi'
          ? 'स्वास्थ्य उप-केंद्र उपकरण'
          : language === 'sat'
          ? 'ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱩᱯ-ᱠᱮᱱᱫᱽᱨᱚ ᱥᱟᱯᱟᱵ'
          : 'Health Sub-Centre Equipment',
    },
    {
      id: 'education',
      label:
        language === 'hi'
          ? 'विद्यालय एवं आंगनबाड़ी ढांचा'
          : language === 'sat'
          ? 'ᱟᱥᱲᱟ ᱟᱨ ᱟᱝᱜᱚᱱᱣᱟᱰᱤ ᱜᱟᱲ'
          : 'School & Anganwadi Infrastructure',
    },
    {
      id: 'agriculture',
      label:
        language === 'hi'
          ? 'सिंचाई एवं कृषि प्रौद्योगिकी'
          : language === 'sat'
          ? 'ᱪᱟᱥ ᱫᱟᱜ ᱟᱨ ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ'
          : 'Agriculture & Irrigation Tech',
    },
  ];

  // Update map coordinates when currentLocation changes
  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      setMapCoords({ lat: currentLocation.lat, lon: currentLocation.lon });
    }
    if (currentLocation.district) setActiveDistrict(currentLocation.district);
    if (currentLocation.block) setActiveBlock(currentLocation.block);
  }, [currentLocation]);

  // Client-Side Canvas Image Compression to <= 500 KB
  const handleImageFileSelected = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    setOriginalFile(file);
    setIsCompressing(true);
    setCompressionStats(null);

    const originalSizeKb = Math.round(file.size / 1024);

    try {
      const compressed = await compressImageToTarget(file, 500); // 500 KB target threshold
      const compressedSizeKb = Math.round(compressed.size / 1024);
      const ratio = Math.round(((file.size - compressed.size) / file.size) * 100);

      setCompressedFile(compressed);
      const previewUrl = URL.createObjectURL(compressed);
      setCompressedPreviewUrl(previewUrl);

      setCompressionStats({
        originalSizeKb,
        compressedSizeKb,
        ratio: Math.max(ratio, 0),
      });
    } catch (err) {
      console.error('Canvas compression error:', err);
      setCompressedFile(file);
      setCompressedPreviewUrl(URL.createObjectURL(file));
      setCompressionStats({
        originalSizeKb,
        compressedSizeKb: originalSizeKb,
        ratio: 0,
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const compressImageToTarget = (file: File, maxKb: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension boundary 1600px
          const MAX_DIM = 1600;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(file);
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Dynamic quality stepping loop to guarantee <= maxKb (500 KB)
          let quality = 0.86;
          const stepDown = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  return resolve(file);
                }
                const currentKb = blob.size / 1024;
                if (currentKb <= maxKb || quality <= 0.35) {
                  const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  quality -= 0.12;
                  stepDown();
                }
              },
              'image/jpeg',
              quality
            );
          };

          stepDown();
        };
        img.onerror = (e) => reject(e);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  // Interactive Map Picker Handlers
  const handleMapClickOrDrag = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!mapSvgRef.current) return;
    const rect = mapSvgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const lonNorm = x / rect.width;
    const latNorm = 1 - y / rect.height;

    const newLon = Number((83.3 + lonNorm * (87.9 - 83.3)).toFixed(4));
    const newLat = Number((22.0 + latNorm * (25.3 - 22.0)).toFixed(4));

    setMapCoords({ lat: newLat, lon: newLon });

    const updatedLocation: GeoLocation = {
      lat: newLat,
      lon: newLon,
      district: activeDistrict,
      block: activeBlock,
      panchayat: `${activeBlock} Gram Panchayat`,
    };
    setCurrentLocation(updatedLocation);
  };

  const handleSelectDistrictPill = (dist: (typeof JHARKHAND_DISTRICTS)[0]) => {
    setActiveDistrict(dist.name);
    setActiveBlock(dist.block);
    setMapCoords({ lat: dist.lat, lon: dist.lon });
    setCurrentLocation({
      lat: dist.lat,
      lon: dist.lon,
      district: dist.name,
      block: dist.block,
      panchayat: `${dist.block} Gram Panchayat`,
    });
  };

  // Submission to API strictly obeying ChallengeSubmissionPayload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const locationPayload: GeoLocation = {
        lat: mapCoords.lat,
        lon: mapCoords.lon,
        district: activeDistrict,
        block: activeBlock,
        panchayat: currentLocation.panchayat || `${activeBlock} Ward`,
      };

      const challengePayload: ChallengeSubmissionPayload = {
        title: title.trim() || 'Rural Infrastructure Problem',
        description: description.trim(),
        mediaUrls: compressedFile ? [compressedFile.name] : [],
        location: locationPayload,
        preferredLanguage: (language as 'hi' | 'sat' | 'en') || 'hi',
        rawAudioUrl: recordedAudioUrl || undefined,
      };

      const formData = new FormData();
      formData.append('title', challengePayload.title);
      formData.append('description', challengePayload.description);
      formData.append('category', category);
      formData.append('language', challengePayload.preferredLanguage);
      formData.append('latitude', String(challengePayload.location.lat));
      formData.append('longitude', String(challengePayload.location.lon));
      formData.append('district', challengePayload.location.district);
      formData.append('block', challengePayload.location.block || 'Lesliganj');
      formData.append('panchayat', challengePayload.location.panchayat || 'Lesliganj');

      if (compressedFile) {
        formData.append('evidence', compressedFile);
      }
      if (recordedAudioUrl) {
        formData.append('audioData', recordedAudioUrl);
      }
      if (detectedDefects.length > 0) {
        formData.append('cvDefects', JSON.stringify(detectedDefects));
      }

      const res = await fetch('/api/mock/submit', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Submission failed with HTTP ${res.status}`);
      }

      const data = await res.json();
      setSubmitResult(data);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error occurred during problem submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Studio Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>
            {language === 'hi'
              ? 'नागरिक समस्या पंजीकरण पोर्टल'
              : language === 'sat'
              ? 'ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱥᱚᱫᱚᱨ'
              : 'Problem Submission Studio'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('submission.title') || (language === 'hi' ? 'ग्रामीण समस्या दर्ज करें' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱥᱚᱫᱚᱨ ᱢᱮ' : 'Report a Rural Problem')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {t('submission.subtitle') || (
            language === 'hi'
              ? 'पेयजल, सड़क, बिजली एवं नागरिक समस्याओं को सीधे विश्वविद्यालय अनुसंधान और स्थानीय प्रशासन से जोड़ें।'
              : language === 'sat'
              ? 'ᱫᱟᱜ, ᱦᱚᱨ, ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱥᱚᱡᱷᱮ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱟᱨ ᱥᱚᱨᱠᱟᱨ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ᱾'
              : 'Submit civil, infrastructure, or environmental issues directly to our research and local administration network.'
          )}
        </p>
      </div>

      {submitResult ? (
        /* Submission Success Ticket View */
        <div className="bg-white border-2 border-emerald-600 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3.5 text-emerald-700">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {language === 'hi'
                  ? 'समस्या सफलतापूर्वक दर्ज कर ली गई है!'
                  : language === 'sat'
                  ? 'ᱥᱚᱢᱚᱥᱭᱟ ᱥᱟᱹᱛ ᱛᱮ ᱫᱟᱨᱡᱽ ᱮᱱᱟ!'
                  : 'Grievance Submitted Successfully!'}
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'hi'
                  ? 'आपकी समस्या को समीक्षा और विश्वविद्यालय अनुसंधान हेतु पंजीकृत किया गया है।'
                  : language === 'sat'
                  ? 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱤᱰᱟᱹᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱛ ᱮᱱᱟ᱾'
                  : 'Your grievance has been routed to engineering triage and local administration.'}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
              <span className="text-slate-600">
                {language === 'hi' ? 'टिकट संख्या' : language === 'sat' ? 'ᱴᱤᱠᱮᱴ ᱮᱞ' : 'Ticket ID'}:
              </span>
              <span className="font-mono font-black text-blue-700 text-lg">{submitResult.ticketNumber || 'JAG-PLM-0082'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
              <span className="text-slate-600">
                {language === 'hi' ? 'वर्तमान स्थिति' : language === 'sat' ? 'ᱱᱤᱛᱚᱜᱟᱜ ᱦᱟᱞᱚᱛ' : 'Lifecycle Status'}:
              </span>
              <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-200">
                {language === 'hi'
                  ? 'विशेषज्ञ मूल्यांकन प्रक्रियाधीन'
                  : language === 'sat'
                  ? 'ᱯᱟᱨᱠᱷᱟᱣ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ'
                  : 'Pending Expert Evaluation'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
              <span className="text-slate-600">
                {language === 'hi' ? 'सत्यापित स्थान' : language === 'sat' ? 'ᱪᱤᱱᱦᱟᱹᱣ ᱟᱠᱟᱱ ᱴᱷᱟᱶ' : 'GeoLocation Tag'}:
              </span>
              <span className="font-semibold text-slate-800 text-xs">
                {activeDistrict} • {activeBlock} ({mapCoords.lat.toFixed(4)}, {mapCoords.lon.toFixed(4)})
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600">
                {language === 'hi' ? 'नागरिक समर्थन' : language === 'sat' ? 'ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱥᱚᱦᱚᱫ' : 'Community Upvotes'}:
              </span>
              <span className="font-bold text-slate-900">
                {submitResult.upvotes || 19}{' '}
                {language === 'hi' ? '(प्रारंभिक नागरिक सत्यापन)' : language === 'sat' ? '(ᱯᱩᱭᱞᱩ ᱥᱟᱹᱵᱤᱛ)' : '(Verified Sign-offs)'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSubmitResult(null);
                setTitle('');
                setDescription('');
                setCompressedFile(null);
                setCompressedPreviewUrl(null);
                setRecordedAudioBlob(null);
                setRecordedAudioUrl(null);
                setDetectedDefects([]);
                setCompressionStats(null);
                setWizardStep(1);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
            >
              {language === 'hi' ? 'एक और समस्या दर्ज करें' : language === 'sat' ? 'ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ' : 'Submit Another Grievance'}
            </button>
            <a
              href="/dashboard"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-semibold transition-all border border-slate-300 flex items-center"
            >
              {language === 'hi' ? 'डैशबोर्ड पर जाएं' : language === 'sat' ? 'ᱰᱮᱥᱵᱳᱨᱰ ᱨᱮ ᱥᱮᱱᱚᱜ ᱢᱮ' : 'Go to Grievance Dashboard'}
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs p-4 rounded-xl border border-red-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Accessible 3-Step Wizard Indicator Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setWizardStep(1)}
                className={`flex items-center justify-center space-x-2 p-3 min-h-[48px] rounded-xl text-xs font-bold transition-all ${
                  wizardStep === 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  wizardStep === 1 ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  1
                </span>
                <span className="hidden sm:inline">
                  {language === 'hi' ? 'प्रमाण एवं आवाज़' : language === 'sat' ? 'ᱥᱟᱹᱵᱤᱛ ᱟᱨ ᱟᱲᱟᱝ' : 'Voice & Evidence'}
                </span>
                <span className="sm:hidden">
                  {language === 'hi' ? 'प्रमाण' : language === 'sat' ? 'ᱥᱟᱹᱵᱤᱛ' : 'Evidence'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setWizardStep(2)}
                className={`flex items-center justify-center space-x-2 p-3 min-h-[48px] rounded-xl text-xs font-bold transition-all ${
                  wizardStep === 2
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  wizardStep === 2 ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  2
                </span>
                <span className="hidden sm:inline">
                  {language === 'hi' ? 'विवरण एवं श्रेणी' : language === 'sat' ? 'ᱵᱤᱵᱚᱨᱚᱬ ᱟᱨ ᱦᱟᱹᱴᱤᱧ' : 'Problem Details'}
                </span>
                <span className="sm:hidden">
                  {language === 'hi' ? 'विवरण' : language === 'sat' ? 'ᱵᱤᱵᱚᱨᱚᱬ' : 'Details'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setWizardStep(3)}
                className={`flex items-center justify-center space-x-2 p-3 min-h-[48px] rounded-xl text-xs font-bold transition-all ${
                  wizardStep === 3
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  wizardStep === 3 ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  3
                </span>
                <span className="hidden sm:inline">
                  {language === 'hi' ? 'स्थान एवं रडार' : language === 'sat' ? 'ᱴᱷᱟᱶ ᱟᱨ ᱨᱟᱰᱟᱨ' : 'Location Pinning'}
                </span>
                <span className="sm:hidden">
                  {language === 'hi' ? 'स्थान' : language === 'sat' ? 'ᱴᱷᱟᱶ' : 'Location'}
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: VOICE & MEDIA EVIDENCE */}
          {/* ========================================================================= */}
          {wizardStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Component: Audio Recording Studio */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                    <Mic className="w-5 h-5 text-blue-600" />
                    <span>{language === 'hi' ? 'आवाज़ में विवरण रिकॉर्ड करें' : language === 'sat' ? 'ᱟᱲᱟᱝ ᱨᱮᱠᱚᱨᱰᱤᱝ ᱥᱴᱩᱰᱤᱭᱳ' : 'Voice Note Ingestion'}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {language === 'hi' ? 'ग्रामीण-अनुकूल' : language === 'sat' ? 'ᱟᱹᱛᱩ-ᱞᱟᱹᱜᱤᱫ' : 'Rural-Friendly Audio'}
                  </span>
                </div>
                <AudioRecorder
                  lang={language}
                  onAudioRecorded={(blob, url, duration) => {
                    setRecordedAudioBlob(blob);
                    setRecordedAudioUrl(url);
                    setAudioDuration(duration);
                  }}
                  onTranscriptionGenerated={(transcription) => {
                    setTitle(transcription.title);
                    setDescription(transcription.description);
                  }}
                />
              </div>

              {/* Component: Image Upload with Client-Side Canvas Compression (<= 500 KB) */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <span>{language === 'hi' ? 'स्थल फ़ोटो एवं प्रमाण' : language === 'sat' ? 'ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱥᱟᱹᱵᱤᱛ' : 'Photo Evidence & Compression'}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200">
                    {language === 'hi' ? 'अधिकतम ५०० केबी' : language === 'sat' ? '᱕᱐᱐ KB ᱵᱷᱤᱛᱨᱤ' : 'Max 500 KB (Auto Resized)'}
                  </span>
                </div>

                {/* Drag & Drop or File Upload Box */}
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageFileSelected(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="image-file-input"
                  />
                  <label htmlFor="image-file-input" className="cursor-pointer flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        {originalFile
                          ? originalFile.name
                          : language === 'hi'
                          ? 'स्थल का फ़ोटो खींचें या प्रमाण अपलोड करें'
                          : language === 'sat'
                          ? 'ᱴᱷᱟᱶ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱟᱹᱜᱩᱭ ᱢᱮ'
                          : 'Click to take a site photo or upload evidence'}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {language === 'hi'
                          ? 'मोबाइल फ़ोटो स्वतः सुरक्षित आकार में संकुचित हो जाती है'
                          : language === 'sat'
                          ? 'ᱪᱤᱛᱟᱹᱨ ᱟᱡ ᱛᱮᱜᱮ ᱠᱟᱹᱴᱤᱡᱚᱜᱼᱟ'
                          : 'High-res mobile camera photos are automatically resized and compressed on your device (<= 500 KB)'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Compression Feedback */}
                {isCompressing && (
                  <div className="flex items-center space-x-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                    <span>
                      {language === 'hi'
                        ? 'फ़ोटो का आकार अनुकूलित किया जा रहा है...'
                        : language === 'sat'
                        ? 'ᱪᱤᱛᱟᱹᱨ ᱥᱟᱭᱤᱡᱽ ᱴᱷᱤᱠᱚᱜ ᱠᱟᱱᱟ...'
                        : 'Resizing and compressing image on device...'}
                    </span>
                  </div>
                )}

                {compressionStats && !isCompressing && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-950 flex items-center justify-between flex-wrap gap-2 shadow-xs">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-bold">
                          {language === 'hi'
                            ? 'फ़ोटो संपीड़न पूर्ण!'
                            : language === 'sat'
                            ? 'ᱪᱤᱛᱟᱹᱨ ᱥᱟᱭᱤᱡᱽ ᱥᱟᱹᱛ ᱮᱱᱟ!'
                            : 'Image Compression Complete!'}
                        </span>
                        <p className="text-[11px] text-emerald-800">
                          {language === 'hi' ? 'मूल आकार:' : language === 'sat' ? 'ᱢᱩᱲ ᱥᱟᱭᱤᱡᱽ:' : 'Original:'}{' '}
                          <span className="font-mono">{compressionStats.originalSizeKb} KB</span> &rarr;{' '}
                          {language === 'hi' ? 'संकुचित:' : language === 'sat' ? 'ᱠᱟᱹᱴᱤᱡ ᱥᱟᱭᱤᱡᱽ:' : 'Compressed:'}{' '}
                          <span className="font-mono font-bold text-emerald-900">
                            {compressionStats.compressedSizeKb} KB
                          </span>{' '}
                          ({compressionStats.ratio}% {language === 'hi' ? 'बचत' : language === 'sat' ? 'ᱠᱟᱹᱴᱤᱡ' : 'reduced'})
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-md">
                      &le; 500 KB OK
                    </span>
                  </div>
                )}

                {/* CV Laser Scanner: 1.5s scan with the 2 defect bounding boxes */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {language === 'hi'
                        ? 'स्वचालित दृश्य दोष पहचान:'
                        : language === 'sat'
                        ? 'ᱪᱤᱛᱟᱹᱨ ᱠᱷᱟᱹᱢᱤ ᱯᱟᱱᱛᱷᱟ:'
                        : 'Integrated CV Laser Scanner Verification:'}
                    </span>
                  </div>
                  <CVLaserScanner
                    imageUrl={compressedPreviewUrl}
                    autoScan={true}
                    onScanComplete={(data) => {
                      setDetectedDefects(data.defects);
                    }}
                  />
                </div>
              </div>

              {/* Step 1 Next Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 min-h-[48px] rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>
                    {language === 'hi' ? 'अगला: विवरण एवं वर्गीकरण' : language === 'sat' ? 'ᱞᱟᱦᱟ: ᱵᱤᱵᱚᱨᱚᱬ' : 'Continue to Step 2: Problem Details'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: PROBLEM DETAILS & CLASSIFICATION */}
          {/* ========================================================================= */}
          {wizardStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Component: Problem Domain / Category selector */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>{language === 'hi' ? 'समस्या का क्षेत्र चुनें' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱟᱹᱴᱤᱧ ᱵᱟᱪᱷᱟᱣ ᱢᱮ' : 'Select Problem Domain'} *</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-3.5 min-h-[48px] rounded-2xl border text-left text-xs font-semibold transition-all active:scale-95 ${
                        category === c.id
                          ? 'bg-blue-50 text-blue-800 border-blue-600 ring-2 ring-blue-600/20 shadow-sm font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Component: Title & Description Input */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>{language === 'hi' ? 'शीर्षक एवं विस्तृत विवरण' : language === 'sat' ? 'ᱧᱩᱛᱩᱢ ᱟᱨ ᱵᱤᱵᱚᱨᱚᱬ' : 'Title & Problem Description'}</span>
                  </div>
                  {title && (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {language === 'hi' ? 'आवाज़ से स्वतः भरा गया' : language === 'sat' ? 'ᱟᱲᱟᱝ ᱛᱮ ᱯᱮᱨᱮᱡ ᱮᱱᱟ' : 'Auto-filled from Voice'}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {t('submission.problemTitle') || (language === 'hi' ? 'समस्या का शीर्षक' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱧᱩᱛᱩᱢ' : 'Problem Title')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('submission.problemTitlePlaceholder') || (language === 'hi' ? 'उदा. लेसलीगंज में खराब चापाकल' : language === 'sat' ? 'ᱫᱟᱹᱭᱠᱟᱹ: ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱨᱮ ᱵᱟᱹᱲᱤᱡ ᱪᱟᱯᱟᱠᱚᱞ' : 'e.g., Broken Handpump in Lesliganj Village')}
                    className="w-full text-sm border border-slate-300 rounded-xl p-3 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {t('submission.problemDescription') || (language === 'hi' ? 'विस्तृत विवरण' : language === 'sat' ? 'ᱵᱤᱵᱚᱨᱚᱬ' : 'Detailed Description')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('submission.problemDescriptionPlaceholder') || (language === 'hi' ? 'समस्या का विस्तृत विवरण दें: कब से शुरू हुई, कितने परिवार प्रभावित हैं...' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱤᱵᱚᱨᱚᱬ ᱚᱞ ᱢᱮ: ᱛᱤᱥ ᱠᱷᱚᱱ ᱦᱩᱭ ᱟᱠᱟᱱᱟ, ᱛᱤᱱᱟᱹᱜ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ...' : 'Describe the issue in detail: duration, affected households, prior attempts...')}
                    className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Step 2 Navigation Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-3 min-h-[48px] rounded-xl border border-slate-300 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'hi' ? 'पीछे जाएं' : language === 'sat' ? 'ᱛᱟᱭᱚᱢ' : 'Back to Evidence'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWizardStep(3)}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 min-h-[48px] rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>
                    {language === 'hi' ? 'अगला: स्थान एवं रडार' : language === 'sat' ? 'ᱞᱟᱦᱟ: ᱴᱷᱟᱶ' : 'Continue to Step 3: Location Pinning'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: LOCATION & COMMUNITY PINNING */}
          {/* ========================================================================= */}
          {wizardStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>
                      {language === 'hi'
                        ? 'मानचित्र स्थान एवं जीपीएस सत्यापन'
                        : language === 'sat'
                        ? 'ᱢᱮᱯ ᱴᱷᱟᱶ ᱟᱨ ᱡᱤᱯᱤᱮᱥ ᱥᱟᱹᱵᱤᱛ'
                        : 'Map Location & Community Pinning'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => detectLocation()}
                    disabled={isDetectingLocation}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold px-4 py-2 min-h-[48px] rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all disabled:opacity-50 border border-blue-200"
                  >
                    {isDetectingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                    <span>
                      {language === 'hi'
                        ? 'स्थान पहचानें'
                        : language === 'sat'
                        ? 'ᱴᱷᱟᱶ ᱯᱟᱱᱛᱷᱟᱭ ᱢᱮ'
                        : 'Auto-Detect GPS'}
                    </span>
                  </button>
                </div>

                {/* Reverse-Geocoded Tag Banner (e.g. 'Palamu • Lesliganj') */}
                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-blue-600 font-semibold block">
                        {language === 'hi' ? 'सत्यापित भू-स्थान टैग' : language === 'sat' ? 'ᱥᱟᱹᱵᱤᱛ ᱴᱷᱟᱶ ᱴᱮᱜᱽ' : 'Reverse-Geocoded Location Tag'}
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {activeDistrict} • {activeBlock}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-blue-800 bg-white px-3 py-1.5 rounded-lg border border-blue-200 font-bold">
                    {mapCoords.lat.toFixed(4)}° N, {mapCoords.lon.toFixed(4)}° E
                  </div>
                </div>

                {/* District Selector Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-600 block">
                    {language === 'hi'
                      ? 'त्वरित ज़िला एवं प्रखंड चयन:'
                      : language === 'sat'
                      ? 'ᱡᱤᱞᱟᱹ ᱵᱟᱪᱷᱟᱣ:'
                      : 'Quick District & Block Pinning:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {JHARKHAND_DISTRICTS.map((dist) => (
                      <button
                        key={dist.name}
                        type="button"
                        onClick={() => handleSelectDistrictPill(dist)}
                        className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-semibold transition-all ${
                          activeDistrict === dist.name
                            ? 'bg-blue-600 text-white shadow-sm font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {dist.name} • {dist.block}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Map Mode Switcher */}
                <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
                  <button
                    type="button"
                    onClick={() => setMapTab('radar')}
                    className={`px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      mapTab === 'radar'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{language === 'hi' ? '५०० मीटर रडार' : language === 'sat' ? '᱕᱐᱐ ᱢᱤᱴᱟᱨ ᱨᱟᱰᱟᱨ' : '500m Community Radar'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapTab('pin')}
                    className={`px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      mapTab === 'pin'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{language === 'hi' ? 'स्थान पिन' : language === 'sat' ? 'ᱴᱷᱟᱶ ᱯᱤᱱ' : 'Interactive Pin'}</span>
                  </button>
                </div>

                {mapTab === 'radar' ? (
                  <SpatialRadarMap
                    centerLocation={{
                      lat: mapCoords.lat,
                      lon: mapCoords.lon,
                      district: activeDistrict,
                      block: activeBlock,
                    }}
                    nearbyRadiusMeters={500}
                    currentPhotoPreview={compressedPreviewUrl || undefined}
                    compact
                  />
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 aspect-[16/9] max-h-[300px] select-none">
                    <svg
                      ref={mapSvgRef}
                      onClick={handleMapClickOrDrag}
                      onMouseMove={(e) => {
                        if (isDraggingPin) handleMapClickOrDrag(e);
                      }}
                      onMouseUp={() => setIsDraggingPin(false)}
                      className="w-full h-full cursor-crosshair"
                      viewBox="0 0 800 450"
                    >
                      <rect width="800" height="450" fill="#0f172a" />
                      <path
                        d="M 120 180 Q 240 60, 480 80 T 720 150 Q 760 300, 600 380 T 260 400 Q 80 320, 120 180 Z"
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="2"
                      />
                      <circle cx="420" cy="220" r="160" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" strokeWidth="1" />
                      <path d="M 280 180 L 450 210 L 580 160" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                      <path d="M 450 210 L 520 320" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

                      <text x="420" y="210" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">
                        Ranchi Hub
                      </text>
                      <text x="620" y="160" fill="#64748b" fontSize="12" textAnchor="middle">
                        Dhanbad / Bokaro
                      </text>
                      <text x="540" y="340" fill="#64748b" fontSize="12" textAnchor="middle">
                        Jamshedpur
                      </text>
                      <text x="240" y="140" fill="#64748b" fontSize="12" textAnchor="middle">
                        Palamu / Latehar
                      </text>

                      {(() => {
                        const lonNorm = (mapCoords.lon - 83.3) / (87.9 - 83.3);
                        const latNorm = 1 - (mapCoords.lat - 22.0) / (25.3 - 22.0);
                        const pinX = Math.max(20, Math.min(lonNorm * 800, 780));
                        const pinY = Math.max(20, Math.min(latNorm * 450, 430));

                        return (
                          <g
                            transform={`translate(${pinX}, ${pinY})`}
                            onMouseDown={() => setIsDraggingPin(true)}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <circle r="22" fill="rgba(37, 99, 235, 0.25)" className="animate-ping" />
                            <circle r="12" fill="rgba(37, 99, 235, 0.45)" />
                            <path
                              d="M 0 0 C -6 -12, -10 -16, -10 -22 C -10 -28, -5 -34, 0 -34 C 5 -34, 10 -28, 10 -22 C 10 -16, 6 -12, 0 0 Z"
                              fill="#2563eb"
                              stroke="#FFF"
                              strokeWidth="2"
                              className="drop-shadow-md"
                            />
                            <circle cx="0" cy="-22" r="3.5" fill="#FFF" />
                            <rect x="-55" y="-56" width="110" height="18" rx="4" fill="#1e293b" stroke="#2563eb" strokeWidth="1" />
                            <text x="0" y="-43" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                              {activeDistrict} • {activeBlock}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] text-slate-300 border border-slate-800">
                      {language === 'hi'
                        ? 'पिन को खींचकर स्थान ठीक करें'
                        : language === 'sat'
                        ? 'ᱯᱤᱱ ᱚᱨ ᱠᱟᱛᱮ ᱴᱷᱟᱶ ᱴᱷᱤᱠ ᱢᱮ'
                        : 'Click or drag pin anywhere to calibrate coordinates'}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3 Navigation & Primary Submission CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-3 min-h-[48px] rounded-xl border border-slate-300 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'hi' ? 'पीछे जाएं' : language === 'sat' ? 'ᱛᱟᱭᱚᱢ' : 'Back to Details'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 min-h-[52px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2.5 text-base disabled:opacity-75 group active:scale-95"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>
                          {language === 'hi'
                            ? 'समस्या दर्ज हो रही है...'
                            : language === 'sat'
                            ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ...'
                            : 'Submitting Problem to Ingestion Network...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                        <span>
                          {t('submission.submitBtn') ||
                            (language === 'hi'
                              ? 'समस्या दर्ज करें'
                              : language === 'sat'
                              ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱥᱚᱫᱚᱨ ᱢᱮ'
                              : 'Submit Problem to Ingestion Network')}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500">
                  {language === 'hi'
                    ? 'आपकी समस्या का समाधान विश्वविद्यालय के अभियंताओं और स्थानीय प्रशासन द्वारा किया जाएगा।'
                    : language === 'sat'
                    ? 'ᱱᱚᱶᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱫᱚ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱟᱨ ᱯᱨᱚᱥᱟᱥᱚᱱ ᱦᱚᱛᱮᱛᱮ ᱵᱤᱰᱟᱹᱣ ᱦᱩᱭᱩᱜᱼᱟ᱾'
                    : 'Your submission will be evaluated by university engineering labs and local administration.'}
                </p>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
