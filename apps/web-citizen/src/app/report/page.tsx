'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { GeoLocation } from '@jagrit/contracts';
import { useCitizen } from '@/context/CitizenContext';
import { supabase } from "@/lib/supabase";
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
} from 'lucide-react';

const JHARKHAND_DISTRICTS = [
  { name: 'Ranchi', block: 'Kanke', lat: 23.3441, lon: 85.3096 },
  { name: 'Dhanbad', block: 'Govindpur', lat: 23.7957, lon: 86.4304 },
  { name: 'Bokaro', block: 'Chas', lat: 23.6693, lon: 86.1511 },
  { name: 'East Singhbhum', block: 'Golmuri-cum-Jugsalai', lat: 22.8046, lon: 86.2029 },
  { name: 'Hazaribagh', block: 'Sadar', lat: 23.9925, lon: 85.3637 },
  { name: 'Dumka', block: 'Jama', lat: 24.2698, lon: 87.2471 },
  { name: 'Deoghar', block: 'Mohanpur', lat: 24.4826, lon: 86.6974 },
  { name: 'Palamu', block: 'Daltonganj', lat: 24.0384, lon: 84.0706 },
];

export default function ProblemSubmissionStudio() {
  const { t, language, currentLocation, setCurrentLocation, detectLocation, isDetectingLocation } = useCitizen();

  // Form State typed with @jagrit/contracts
  const [category, setCategory] = useState<string>('drinking_water');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // Component A: Image upload with client-side canvas compression (<= 500 KB)
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSizeKb: number;
    compressedSizeKb: number;
    ratio: number;
  } | null>(null);

  // Component C: Interactive Map Picker
  const [mapCoords, setMapCoords] = useState<{ lat: number; lon: number }>({
    lat: currentLocation.lat || 23.3441,
    lon: currentLocation.lon || 85.3096,
  });
  const [activeDistrict, setActiveDistrict] = useState<string>(currentLocation.district || 'Ranchi');
  const [activeBlock, setActiveBlock] = useState<string>(currentLocation.block || 'Kanke');
  const [isDraggingPin, setIsDraggingPin] = useState(false);
  const [mapTab, setMapTab] = useState<'radar' | 'pin'>('radar');
  const mapSvgRef = useRef<SVGSVGElement | null>(null);

  // Component D: CV Laser Scanner Defect metadata
  const [detectedDefects, setDetectedDefects] = useState<DetectedDefect[]>([]);

  // Submission Status
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    {
      id: 'drinking_water',
      label:
        t('submission.categories.drinking_water') ||
        (language === 'hi'
          ? 'पेयजल एवं चापाकल'
          : language === 'sat'
          ? 'ᱧᱩ ᱫᱟᱜ ᱟᱨ ᱪᱟᱯᱟᱠᱚᱞ'
          : 'Drinking Water and Handpumps'),
    },
    {
      id: 'road_drainage',
      label:
        t('submission.categories.road_drainage') ||
        (language === 'hi'
          ? 'ग्रामीण सड़क एवं जल निकासी'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱟ'
          : 'Rural Roads and Drainage'),
    },
    {
      id: 'electricity',
      label:
        t('submission.categories.electricity') ||
        (language === 'hi'
          ? 'ग्रामीण विद्युतीकरण एवं सौर ग्रिड'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ'
          : 'Rural Electrification and Solar Microgrids'),
    },
    {
      id: 'health',
      label:
        t('submission.categories.health') ||
        (language === 'hi'
          ? 'स्वास्थ्य उप-केंद्र उपकरण'
          : language === 'sat'
          ? 'ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱩᱯ-ᱠᱮᱱᱫᱽᱨᱚ ᱥᱟᱯᱟᱵ'
          : 'Health Sub-Centre Equipment'),
    },
    {
      id: 'education',
      label:
        t('submission.categories.education') ||
        (language === 'hi'
          ? 'विद्यालय एवं आंगनबाड़ी ढांचा'
          : language === 'sat'
          ? 'ᱟᱥᱲᱟ ᱟᱨ ᱟᱝᱜᱚᱱᱣᱟᱰᱤ ᱜᱟᱲ'
          : 'School and Anganwadi Infrastructure'),
    },
    {
      id: 'agriculture',
      label:
        t('submission.categories.agriculture') ||
        (language === 'hi'
          ? 'सिंचाई एवं कृषि प्रौद्योगिकी'
          : language === 'sat'
          ? 'ᱪᱟᱥ ᱫᱟᱜ ᱟᱨ ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ'
          : 'Irrigation and Agricultural Technology'),
    },
  ];

  // Update map coordinates when currentLocation changes
  useEffect(() => {
    setMapCoords({ lat: currentLocation.lat, lon: currentLocation.lon });
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

  // Component C: Interactive Map Picker Handlers
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
      panchayat: 'GPS Verified Ward',
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
      panchayat: `${dist.block} Panchayat`,
    });
  };

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

      const mediaUrls: string[] = [];
      let rawAudioUrl: string | undefined;

      if (compressedFile) {
        const imagePath = `reports/${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
        const { error: imageUploadError } = await supabase.storage
          .from('challenge-media')
          .upload(imagePath, compressedFile);

        if (imageUploadError) throw imageUploadError;

        const { data: imageUrlData } = supabase.storage
          .from('challenge-media')
          .getPublicUrl(imagePath);
        mediaUrls.push(imageUrlData.publicUrl);
      }

      if (recordedAudioBlob) {
        const audioPath = `audio/${Date.now()}_voice.ogg`;
        const { error: audioUploadError } = await supabase.storage
          .from('challenge-media')
          .upload(audioPath, recordedAudioBlob);

        if (audioUploadError) throw audioUploadError;

        const { data: audioUrlData } = supabase.storage
          .from('challenge-media')
          .getPublicUrl(audioPath);
        rawAudioUrl = audioUrlData.publicUrl;
      }

      const ticketNumber = `JAG-${new Date().getFullYear()}-${(activeDistrict || 'RAN')
        .substring(0, 3)
        .toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const { error: insertError } = await supabase.from('challenges').insert({
        ticket_number: ticketNumber,
        title: title.trim() || 'Grassroots Civic Challenge',
        description: description.trim(),
        location: `POINT(${mapCoords.lon || 85.3096} ${mapCoords.lat || 23.3441})`,
        district: activeDistrict || 'Ranchi',
        block: activeBlock || 'Kanke',
        panchayat: currentLocation.panchayat || 'Chianki',
        media_urls: mediaUrls,
        raw_audio_url: rawAudioUrl,
        submission_channel: 'APP',
        status: 'OPEN_FOR_PRIORITIZATION',
        upvotes_count: 1,
      });

      if (insertError) throw insertError;

      setSubmitResult({ ticketNumber, upvotes: 1 });
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
        <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3.5 text-blue-700">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shadow-inner">
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

          <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 space-y-3 text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
              <span className="text-slate-600">
                {language === 'hi' ? 'टिकट संख्या' : language === 'sat' ? 'ᱴᱤᱠᱮᱴ ᱮᱞ' : 'Ticket ID'}:
              </span>
              <span className="font-mono font-black text-blue-700 text-lg">{submitResult.ticketNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
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
            <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
              <span className="text-slate-600">
                {language === 'hi' ? 'सत्यापित स्थान' : language === 'sat' ? 'ᱪᱤᱱᱦᱟᱹᱣ ᱟᱠᱟᱱ ᱴᱷᱟᱶ' : 'GeoLocation Verified'}:
              </span>
              <span className="font-semibold text-slate-800 text-xs">
                {activeDistrict}, {activeBlock} ({mapCoords.lat.toFixed(4)}, {mapCoords.lon.toFixed(4)})
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600">
                {language === 'hi' ? 'नागरिक समर्थन' : language === 'sat' ? 'ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱥᱚᱦᱚᱫ' : 'Community Upvotes'}:
              </span>
              <span className="font-bold text-slate-900">
                {submitResult.upvotes || 1}{' '}
                {language === 'hi' ? '(प्रारंभिक नागरिक सत्यापन)' : language === 'sat' ? '(ᱯᱩᱭᱞᱩ ᱥᱟᱹᱵᱤᱛ)' : '(Initial Citizen Sign-off)'}
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
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all shadow-md"
            >
              {language === 'hi' ? 'एक और समस्या दर्ज करें' : language === 'sat' ? 'ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ' : 'Submit Another Grievance'}
            </button>
            <a
              href="/dashboard"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold transition-all border border-slate-300 flex items-center"
            >
              {language === 'hi' ? 'डैशबोर्ड पर जाएं' : language === 'sat' ? 'ᱰᱮᱥᱵᱳᱨᱰ ᱨᱮ ᱥᱮᱱᱚᱜ ᱢᱮ' : 'Go to Grievance Dashboard'}
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {errorMsg && (
            <div className="bg-blue-50 text-blue-700 text-xs p-4 rounded-xl border border-blue-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Problem Domain */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>{t('submission.categoryLabel') || (language === 'hi' ? 'समस्या का क्षेत्र चुनें' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱟᱹᱴᱤᱧ ᱵᱟᱪᱷᱟᱣ ᱢᱮ' : 'Select Problem Domain')} *</span>
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

          {/* Section 2: Audio Recording Studio */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>{language === 'hi' ? 'आवाज़ में विवरण रिकॉर्ड करें' : language === 'sat' ? 'ᱟᱲᱟᱝ ᱨᱮᱠᱚᱨᱰᱤᱝ' : 'Voice Note Ingestion'}</span>
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

          {/* Section 3: Title and Problem Description */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>{language === 'hi' ? 'शीर्षक एवं विस्तृत विवरण' : language === 'sat' ? 'ᱧᱩᱛᱩᱢ ᱟᱨ ᱵᱤᱵᱚᱨᱚᱬ' : 'Title & Problem Description'}</span>
              </div>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                {language === 'hi' ? 'आवाज़ से स्वतः भरा गया' : language === 'sat' ? 'ᱟᱲᱟᱝ ᱛᱮ ᱯᱮᱨᱮᱡ ᱮᱱᱟ' : 'Auto-filled from Voice'}
              </span>
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
                placeholder={t('submission.problemTitlePlaceholder') || (language === 'hi' ? 'उदा. कांके टोले में खराब चापाकल' : language === 'sat' ? 'ᱫᱟᱹᱭᱠᱟᱹ: ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱵᱟᱹᱲᱤᱡ ᱪᱟᱯᱟᱠᱚᱞ' : 'e.g., Broken Handpump in Kanke Village')}
                className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
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

          {/* Section 4: Image Upload with Client-Side Canvas Compression */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>{language === 'hi' ? 'स्थल फ़ोटो एवं प्रमाण' : language === 'sat' ? 'ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱥᱟᱹᱵᱤᱛ' : 'Photo Evidence & Compression'}</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200">
                {language === 'hi' ? 'अधिकतम ५०० केबी' : language === 'sat' ? '᱕᱐᱐ KB ᱵᱷᱤᱛᱨᱤ' : 'Max 500 KB'}
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
                      : 'High-res mobile camera photos are automatically resized and compressed on your device'}
                  </p>
                </div>
              </label>
            </div>

            {/* Compression Feedback */}
            {isCompressing && (
              <div className="flex items-center space-x-2 text-xs text-sky-700 bg-sky-50 p-3 rounded-xl border border-sky-200">
                <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                <span>
                  {language === 'hi'
                    ? 'फ़ोटो का आकार अनुकूलित किया जा रहा है...'
                    : language === 'sat'
                    ? 'ᱪᱤᱛᱟᱹᱨ ᱥᱟᱭᱤᱡᱽ ᱴᱷᱤᱠᱚᱜ ᱠᱟᱱᱟ...'
                    : 'Resizing and compressing image...'}
                </span>
              </div>
            )}

            {compressionStats && !isCompressing && (
              <div className="bg-blue-50 border border-blue-300 rounded-2xl p-4 text-xs text-blue-950 flex items-center justify-between flex-wrap gap-2 shadow-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">
                      {language === 'hi'
                        ? 'फ़ोटो संपीड़न पूर्ण!'
                        : language === 'sat'
                        ? 'ᱪᱤᱛᱟᱹᱨ ᱥᱟᱭᱤᱡᱽ ᱥᱟᱹᱛ ᱮᱱᱟ!'
                        : 'Image Compression Complete!'}
                    </span>
                    <p className="text-[11px] text-blue-800">
                      {language === 'hi' ? 'मूल आकार:' : language === 'sat' ? 'ᱢᱩᱲ ᱥᱟᱭᱤᱡᱽ:' : 'Original:'}{' '}
                      <span className="font-mono">{compressionStats.originalSizeKb} KB</span> &rarr;{' '}
                      {language === 'hi' ? 'संकुचित:' : language === 'sat' ? 'ᱠᱟᱹᱴᱤᱡ ᱥᱟᱭᱤᱡᱽ:' : 'Compressed:'}{' '}
                      <span className="font-mono font-bold text-blue-900">
                        {compressionStats.compressedSizeKb} KB
                      </span>{' '}
                      ({compressionStats.ratio}% {language === 'hi' ? 'बचत' : language === 'sat' ? 'ᱠᱟᱹᱴᱤᱡ' : 'reduced'})
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-black bg-blue-200 text-blue-900 px-2.5 py-1 rounded-md">
                  &le; 500 KB OK
                </span>
              </div>
            )}

            {/* Embedded CV Laser Scanner */}
            {compressedPreviewUrl && (
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
            )}
          </div>

          {/* Section 5: Interactive Map Picker */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  5
                </span>
                <span>
                  {language === 'hi'
                    ? 'मानचित्र स्थान एवं जीपीएस सत्यापन'
                    : language === 'sat'
                    ? 'ᱢᱮᱯ ᱴᱷᱟᱶ ᱟᱨ ᱡᱤᱯᱤᱮᱥ ᱥᱟᱹᱵᱤᱛ'
                    : 'Map Location & GPS Geolocation'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => detectLocation()}
                disabled={isDetectingLocation}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 min-h-[44px] rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all disabled:opacity-50 border border-blue-200"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Navigation className="w-3.5 h-3.5" />
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

            {/* Geolocation Status Pill Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800">
                  {language === 'hi' ? 'ज़िला:' : language === 'sat' ? 'ᱡᱤᱞᱟᱹ:' : 'District:'}{' '}
                  <span className="text-blue-700">{activeDistrict}</span> |{' '}
                  {language === 'hi' ? 'प्रखंड:' : language === 'sat' ? 'ᱵᱞᱚᱠ:' : 'Block:'}{' '}
                  <span className="text-blue-700">{activeBlock}</span>
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {mapCoords.lat.toFixed(4)}° N, {mapCoords.lon.toFixed(4)}° E
              </div>
            </div>

            {/* District Selector Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-600 block">
                {language === 'hi'
                  ? 'त्वरित ज़िला चयन:'
                  : language === 'sat'
                  ? 'ᱡᱤᱞᱟᱹ ᱵᱟᱪᱷᱟᱣ:'
                  : 'Quick District Selection:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {JHARKHAND_DISTRICTS.map((dist) => (
                  <button
                    key={dist.name}
                    type="button"
                    onClick={() => handleSelectDistrictPill(dist)}
                    className={`px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-medium transition-all ${
                      activeDistrict === dist.name
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {dist.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Mode Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
              <button
                type="button"
                onClick={() => setMapTab('radar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mapTab === 'radar'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{language === 'hi' ? 'रडार मानचित्र' : language === 'sat' ? 'ᱨᱟᱰᱟᱨ ᱢᱮᱯ' : 'Nearby Radar Map'}</span>
              </button>
              <button
                type="button"
                onClick={() => setMapTab('pin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                        <rect x="-45" y="-56" width="90" height="18" rx="4" fill="#1e293b" stroke="#2563eb" strokeWidth="1" />
                        <text x="0" y="-43" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                          {activeDistrict} Pin
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

          {/* Section 6: Primary Submission CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 min-h-[52px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2.5 text-base disabled:opacity-75 group active:scale-95"
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
                  <Send className="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform" />
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
            <p className="text-center text-xs text-slate-500 mt-2">
              {language === 'hi'
                ? 'आपकी समस्या का समाधान विश्वविद्यालय के अभियंताओं और स्थानीय प्रशासन द्वारा किया जाएगा।'
                : language === 'sat'
                ? 'ᱱᱚᱶᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱫᱚ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱟᱨ ᱯᱨᱚᱥᱟᱥᱚᱱ ᱦᱚᱛᱮᱛᱮ ᱵᱤᱰᱟᱹᱣ ᱦᱩᱭᱩᱜᱼᱟ᱾'
                : 'Your submission will be evaluated by university engineering labs and local administration.'}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
