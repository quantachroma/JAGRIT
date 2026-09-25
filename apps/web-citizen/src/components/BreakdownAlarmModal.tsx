'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, Mic, X } from 'lucide-react';

type SpeechRecognitionEventLike = Event & {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export default function BreakdownAlarmModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: (description: string) => void }) {
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechPrefixRef = useRef('');
  const finalTranscriptRef = useRef('');

  const stopRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  const startRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    const SpeechRecognition = (window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }).SpeechRecognition || (window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      speechPrefixRef.current = description;
      finalTranscriptRef.current = '';
      recognition.lang = 'hi-IN';
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const transcript = event.results[index][0].transcript;
          if (event.results[index].isFinal) {
            finalTranscriptRef.current += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        const prefix = speechPrefixRef.current;
        const separator = prefix && !prefix.endsWith(' ') ? ' ' : '';
        setDescription(`${prefix}${separator}${finalTranscriptRef.current}${interimTranscript}`);
      };
      recognition.onend = () => {
        const prefix = speechPrefixRef.current;
        const separator = prefix && !prefix.endsWith(' ') ? ' ' : '';
        setDescription(`${prefix}${separator}${finalTranscriptRef.current}`);
        recognitionRef.current = null;
        setIsRecording(false);
      };
      recognition.onerror = () => {
        recognitionRef.current = null;
        setIsRecording(false);
      };
      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.onstop = () => stream.getTracks().forEach((track) => track.stop());
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setIsRecording(false);
    }
  };

  if (!open) return null;
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="breakdown-alarm-title"><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700"><AlertTriangle className="h-6 w-6" /></span><div><h2 id="breakdown-alarm-title" className="text-xl font-black text-slate-950">Report Machine Breakdown</h2><p className="mt-1 text-xs font-bold text-red-700">Kharab Ho Gaya · emergency pilot signal</p></div></div><button type="button" onClick={onClose} aria-label="Close breakdown dialog" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button></div><p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950">Report any machine breakdown, water stoppage, or filter leakage. Our team and local Jal Sahiya will inspect within 48 hours to freeze the project clock and begin emergency repairs.</p><label className="mt-5 block text-xs font-black text-slate-800">Voice note or breakdown description</label><div className="mt-2 flex gap-2"><input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe what has stopped working..." className="min-h-12 flex-1 rounded-xl border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-red-500" /><button type="button" onClick={startRecording} aria-label={isRecording ? 'Stop voice recording' : 'Start voice recording'} className={`flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 ${isRecording ? 'animate-pulse bg-red-600 text-white' : ''}`}><Mic className="h-5 w-5" /></button></div><div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 rounded-xl px-4 text-sm font-bold text-slate-600 hover:bg-slate-100">Cancel</button><button type="button" onClick={() => { onConfirm(description || 'Citizen reported a machine breakdown.'); setDescription(''); }} className="min-h-11 rounded-xl bg-red-700 px-5 text-sm font-black text-white shadow-lg shadow-red-900/20 hover:bg-red-800">Confirm breakdown report</button></div></div></div>;
}