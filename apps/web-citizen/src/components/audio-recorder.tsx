'use client';

import React, { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

interface AudioRecorderProps {
  onAudioRecorded?: (base64Audio: string) => void;
  lang?: 'hi' | 'sat' | 'en';
}

export default function AudioRecorder({ onAudioRecorded, lang = 'hi' }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const toggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Mock recording simulation
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
        if (onAudioRecorded) {
          onAudioRecorded('data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
        }
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <button
        type="button"
        onClick={toggleRecord}
        className={`p-3 rounded-full text-white transition-all shadow ${
          isRecording ? 'bg-red-600 animate-pulse' : 'bg-[#044728] hover:bg-[#03361e]'
        }`}
      >
        {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      <div className="text-xs">
        <p className="font-semibold text-slate-800">
          {isRecording
            ? lang === 'hi'
              ? 'रिकॉर्डिंग जारी है... (Recording)'
              : 'Recording in progress...'
            : hasRecorded
            ? lang === 'hi'
              ? 'ऑडियो रिकॉर्ड हो गया (Audio Captured)'
              : 'Audio Captured'
            : lang === 'hi'
            ? 'अपनी आवाज़ में समस्या बताएं'
            : 'Press to record problem in voice'}
        </p>
        <p className="text-[11px] text-slate-500">
          {lang === 'hi' ? 'हिन्दी, संथाली या खोरठा' : 'Supported: Hindi, Santhali, Khortha'}
        </p>
      </div>
    </div>
  );
}

