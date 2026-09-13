'use client';

import { useState, useCallback } from 'react';

export interface UseVoiceTranscribeReturn {
  isRecording: boolean;
  transcript: string;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
}

export function useVoiceTranscribe(lang: 'hi' | 'sat' | 'en' = 'hi'): UseVoiceTranscribeReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setError(null);

    // Mock speech-to-text transcription engine simulation
    setTimeout(() => {
      if (lang === 'hi') {
        setTranscript('कांके पंचायत में चापाकल खराब है, पेयजल की समस्या है।');
      } else if (lang === 'sat') {
        setTranscript('ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱢᱮᱱᱟᱜ-ᱟ᱾');
      } else {
        setTranscript('Handpump in Kanke village is non-functional, causing acute drinking water shortage.');
      }
      setIsRecording(false);
    }, 2000);
  }, [lang]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
    resetTranscript,
  };
}

