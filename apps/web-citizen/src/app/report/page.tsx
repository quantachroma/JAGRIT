'use client';

import React, { useState } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import {
  AlertCircle,
  MapPin,
  Mic,
  Camera,
  CheckCircle2,
  Send,
  Loader2,
  FileCheck,
} from 'lucide-react';

export default function ReportPage() {
  const { t, language, currentLocation, detectLocation, isDetectingLocation } = useCitizen();

  const [category, setCategory] = useState('drinking_water');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    { id: 'drinking_water', label: t('submission.categories', 'drinking_water', 'Drinking Water & Handpump (चापाकल)') },
    { id: 'road_drainage', label: t('submission.categories', 'road_drainage', 'Rural Roads & Drainage') },
    { id: 'electricity', label: t('submission.categories', 'electricity', 'Rural Electricity & Solar Microgrids') },
    { id: 'health', label: t('submission.categories', 'health', 'Health Sub-Centre Equipment') },
    { id: 'education', label: t('submission.categories', 'education', 'School Infrastructure') },
    { id: 'agriculture', label: t('submission.categories', 'agriculture', 'Irrigation & Soil') },
  ];

  const handleSimulateVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedAudio('data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
        if (!description) {
          setDescription(
            language === 'hi'
              ? 'हमारे टोले में चापाकल पिछले 3 महीनों से खराब पड़ा है। पेयजल की भारी किल्लत है।'
              : language === 'sat'
              ? 'ᱟᱞᱮᱭᱟᱜ ᱟᱹᱛᱩ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱵᱟᱹᱱᱩᱜ-ᱟ, ᱵᱟᱹᱲᱤᱡ ᱟᱠᱟᱱᱟ᱾'
              : 'The village handpump has been broken for 3 months. Acute shortage of drinking water.'
          );
        }
      }, 1500);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      // Build FormData to verify multipart submission requirement in Task 1.0.4
      const formData = new FormData();
      formData.append('title', title || 'Rural Civic Issue');
      formData.append('description', description);
      formData.append('category', category);
      formData.append('language', language);
      formData.append('latitude', String(currentLocation.lat));
      formData.append('longitude', String(currentLocation.lon));
      formData.append('district', currentLocation.district);
      formData.append('block', currentLocation.block || 'Kanke');
      formData.append('panchayat', currentLocation.panchayat || 'Kanke');

      if (selectedFile) {
        formData.append('evidence', selectedFile);
      }
      if (recordedAudio) {
        formData.append('audioData', recordedAudio);
      }

      const res = await fetch('/api/mock/submit', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Submission failed with status ${res.status}`);
      }

      const data = await res.json();
      setSubmitResult(data);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error occurred while submitting');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#044728] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'नागरिक समस्या रिपोर्टिंग' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱥᱚᱢᱚᱥᱭᱟ ᱚᱞ' : 'Civic Grievance Ingestion'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          {t('submission', 'title', 'Report a Problem')}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t('submission', 'subtitle', 'Submit civil, infrastructure, or environmental issues directly to our research and local administration network.')}
        </p>
      </div>

      {submitResult ? (
        <div className="bg-white border-2 border-[#044728] rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-3 text-[#044728]">
            <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-bold">
                {language === 'hi' ? 'समस्या सफलतापूर्वक दर्ज हो गई!' : language === 'sat' ? 'ᱥᱚᱢᱚᱥᱭᱟ ᱥᱟᱹᱛ ᱛᱮ ᱫᱟᱨᱡᱽ ᱮᱱᱟ!' : 'Submission Successful!'}
              </h2>
              <p className="text-xs text-slate-600">{submitResult.message}</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 space-y-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">{t('dashboard', 'ticketNumber', 'Ticket ID')}:</span>
              <span className="font-mono font-bold text-[#044728] text-base">{submitResult.ticketNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">{t('dashboard', 'status', 'Status')}:</span>
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-xs font-semibold">
                {submitResult.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600">{t('dashboard', 'upvotes', 'Upvotes')}:</span>
              <span className="font-bold text-slate-900">{submitResult.upvotes}</span>
            </div>
          </div>

          <div className="pt-2 flex space-x-3">
            <button
              onClick={() => {
                setSubmitResult(null);
                setTitle('');
                setDescription('');
                setRecordedAudio(null);
                setSelectedFile(null);
              }}
              className="bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              {language === 'hi' ? 'एक और समस्या दर्ज करें' : language === 'sat' ? 'ᱟᱨ ᱢᱤᱫᱴᱟᱹᱝ ᱚᱞ ᱢᱮ' : 'Submit Another Grievance'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm space-y-5">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t('submission', 'categoryLabel', 'Problem Domain')} *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#044728]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t('submission', 'problemTitle', 'Problem Summary / Title')} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('submission', 'problemTitlePlaceholder', 'e.g., Broken Handpump in Kanke Village')}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728]"
            />
          </div>

          {/* Voice Ingestion Aid */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-[#D97706]" />
                {t('submission', 'voiceNote', 'Voice Note (Jharkhand Multilingual)')}
              </span>
              <button
                type="button"
                onClick={handleSimulateVoice}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : recordedAudio
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D97706] text-white hover:bg-amber-700'
                }`}
              >
                <Mic className="w-3 h-3" />
                <span>
                  {isRecording
                    ? t('submission', 'stopRecording', 'Recording...')
                    : recordedAudio
                    ? 'Recorded (Click to replace)'
                    : t('submission', 'startRecording', 'Press to Speak')}
                </span>
              </button>
            </div>
            <p className="text-[11px] text-amber-800">
              {t('submission', 'voiceNoteHelp', 'Speak in Santhali, Hindi, or English. Audio will be transcribed automatically.')}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t('submission', 'problemDescription', 'Detailed Description')} *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('submission', 'problemDescriptionPlaceholder', 'Describe the issue in detail...')}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728]"
            />
          </div>

          {/* Media upload */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t('submission', 'mediaUpload', 'Attach Photos / Physical Evidence')}
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-slate-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-1">
                <Camera className="w-6 h-6 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">
                  {selectedFile ? selectedFile.name : t('submission', 'uploadHint', 'Click to upload site photos')}
                </span>
              </label>
            </div>
          </div>

          {/* Geolocation Lock */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#044728]" />
              <div className="text-xs">
                <span className="font-semibold text-slate-800">
                  {currentLocation.district}, {currentLocation.block || 'Kanke'}
                </span>
                <span className="text-slate-500 ml-1">
                  ({currentLocation.lat.toFixed(4)}, {currentLocation.lon.toFixed(4)})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => detectLocation()}
              disabled={isDetectingLocation}
              className="text-xs text-[#044728] hover:underline font-semibold flex items-center gap-1"
            >
              {isDetectingLocation ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              <span>{t('submission', 'detectLocation', 'Detect GPS')}</span>
            </button>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#044728] hover:bg-[#03361e] text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-75"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('submission', 'submitting', 'Submitting Grievance...')}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D97706]" />
                  <span>{t('submission', 'submitBtn', 'Submit Problem')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

