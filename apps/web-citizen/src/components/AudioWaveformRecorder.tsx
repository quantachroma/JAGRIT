'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';

interface AudioWaveformRecorderProps {
  lang?: 'hi' | 'sat' | 'en';
  maxDurationSec?: number;
  onAudioRecorded?: (blob: Blob, dataUrl: string, durationSec: number) => void;
  onTranscriptionGenerated?: (data: { title: string; description: string; detectedLang: string }) => void;
}

const transcription = {
  en: { title: 'High Fluoride and Riser Pipe Corrosion in Community Handpump', description: 'Reddish iron and high-fluoride contaminated water is discharging from the handpump. Over 50 households lack potable water.' },
  hi: { title: 'चापाकल में जंग एवं फ्लोराइड युक्त दूषित जल की समस्या', description: 'चापाकल से लाल और फ्लोराइड युक्त पानी निकल रहा है। ५० से अधिक परिवार दूषित पानी पीने को मजबूर हैं।' },
  sat: { title: 'ᱪᱟᱯᱟᱠᱚᱞ ᱨᱮ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ', description: 'ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾' },
};

export default function AudioWaveformRecorder({ lang = 'hi', maxDurationSec = 30, onAudioRecorded, onTranscriptionGenerated }: AudioWaveformRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => cleanup(), []);

  const cleanup = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (contextRef.current && contextRef.current.state !== 'closed') void contextRef.current.close();
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const data = new Uint8Array(analyser.fftSize);
    const draw = () => {
      analyser.getByteTimeDomainData(data);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#061a17';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = 'rgba(52, 211, 153, .16)';
      context.beginPath();
      context.moveTo(0, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();
      context.strokeStyle = '#34d399';
      context.shadowColor = '#10b981';
      context.shadowBlur = 10;
      context.lineWidth = 2;
      context.beginPath();
      data.forEach((value, index) => {
        const x = (index / data.length) * canvas.width;
        const y = (value / 255) * canvas.height;
        index === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
      });
      context.stroke();
      context.shadowBlur = 0;
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  const startRecording = async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('Microphone recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      setDuration(0);
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const audioContext = new AudioContextClass();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        audioContext.createMediaStreamSource(stream).connect(analyser);
        contextRef.current = audioContext;
        analyserRef.current = analyser;
      }
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : '';
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => event.data.size > 0 && chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        const reader = new FileReader();
        reader.onloadend = () => onAudioRecorded?.(blob, String(reader.result), duration);
        reader.readAsDataURL(blob);
        onTranscriptionGenerated?.({ ...transcription[lang], detectedLang: lang });
      };
      recorder.start(250);
      setRecording(true);
      drawWaveform();
      timerRef.current = setInterval(() => setDuration((value) => {
        if (value + 1 >= maxDurationSec) stopRecording();
        return Math.min(value + 1, maxDurationSec);
      }), 1000);
    } catch {
      cleanup();
      setError('Microphone permission is required to record a voice note.');
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (recorderRef.current?.state !== 'inactive') recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const togglePlayback = () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); } else { void audioRef.current.play(); setPlaying(true); }
  };

  const reset = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    cleanup();
    setAudioUrl(null); setPlaying(false); setDuration(0); setRecording(false);
  };

  return <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
    <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black text-slate-900">Voice note in Hindi or Santhali</p><p className="text-xs text-slate-600">Speak naturally for up to {maxDurationSec} seconds.</p></div><span className="font-mono text-xs font-bold text-emerald-700">{String(Math.floor(duration / 60)).padStart(2, '0')}:{String(duration % 60).padStart(2, '0')} / 00:{maxDurationSec}</span></div>
    <div className="relative overflow-hidden rounded-xl border border-emerald-900/40 bg-[#061a17]"><canvas ref={canvasRef} width={640} height={120} className="h-28 w-full" />{!recording && !audioUrl && <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs text-emerald-200"><Volume2 className="h-4 w-4" /> Press record to speak</div>}</div>
    <div className="flex flex-wrap gap-2"><button type="button" onClick={recording ? stopRecording : startRecording} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-xs font-black text-white hover:bg-emerald-800">{recording ? <><Square className="h-4 w-4 fill-white" /> Stop recording</> : <><Mic className="h-4 w-4" /> {audioUrl ? 'Record again' : 'Start recording'}</>}</button>{audioUrl && <><button type="button" onClick={togglePlayback} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 text-xs font-black text-emerald-800">{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {playing ? 'Pause' : 'Play preview'}</button><button type="button" onClick={reset} aria-label="Reset recording" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700"><RotateCcw className="h-4 w-4" /> Reset</button></>}</div>
    {error && <p role="alert" className="text-xs font-bold text-red-700">{error}</p>}
  </div>;
}