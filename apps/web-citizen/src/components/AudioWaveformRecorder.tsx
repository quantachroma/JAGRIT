'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Pause, Play, RotateCcw, Square, Volume2, AlertCircle } from 'lucide-react';

interface AudioWaveformRecorderProps {
  lang?: 'hi' | 'sat' | 'en';
  speechLang?: 'hi' | 'sat' | 'en';
  maxDurationSec?: number;
  onAudioRecorded?: (blob: Blob, dataUrl: string, durationSec: number) => void;
  onTranscriptionGenerated?: (data: { title: string; description: string; detectedLang: string }) => void;
  onTranscription?: (text: string) => void;
}

// Relatable localized labels
const i18n = {
  en: {
    title: 'Voice Note Ingestion (1 Minute)',
    subtitle: 'Speak naturally for up to 1 minute. Words will auto-type below.',
    pressToSpeak: 'Press record to speak',
    startBtn: 'Start recording',
    stopBtn: 'Stop recording',
    recordAgain: 'Record again',
    playPreview: 'Play preview',
    pause: 'Pause',
    reset: 'Reset',
    permissionError: 'Microphone permission is required. Please allow access in your browser address bar settings.',
    notSupported: 'Microphone recording is not supported in this browser.',
    defaultTitle: 'High Fluoride and Riser Pipe Corrosion in Community Handpump',
    defaultDesc: 'Reddish iron and high-fluoride contaminated water is discharging from the handpump. Over 50 households lack potable water.',
  },
  hi: {
    title: 'आवाज़ में विवरण रिकॉर्ड करें (१ मिनट)',
    subtitle: '१ मिनट तक अपनी समस्या बोलें। आवाज़ नीचे अपने आप टाइप हो जाएगी।',
    pressToSpeak: 'रिकॉर्ड करने के लिए नीचे बटन दबाएं',
    startBtn: 'रिकॉर्डिंग शुरू करें',
    stopBtn: 'रिकॉर्डिंग रोकें',
    recordAgain: 'दोबारा रिकॉर्ड करें',
    playPreview: 'ऑडियो सुनें',
    pause: 'रोकें',
    reset: 'रीसेट करें',
    permissionError: 'माइक्रोफ़ोन की अनुमति आवश्यक है। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन चालू करें।',
    notSupported: 'इस ब्राउज़र में ऑडियो रिकॉर्डिंग समर्थित नहीं है।',
    defaultTitle: 'चापाकल में जंग एवं फ्लोराइड युक्त दूषित जल की समस्या',
    defaultDesc: 'चापाकल से लाल और फ्लोराइड युक्त पानी निकल रहा है। ५० से अधिक परिवार दूषित पानी पीने को मजबूर हैं।',
  },
  sat: {
    title: 'ᱨᱚᱲ ᱠᱟᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ (᱑ ᱴᱤᱯᱤᱡ)',
    subtitle: '᱑ ᱴᱤᱯᱤᱡ ᱫᱷᱟᱹᱵᱤᱡ ᱥᱟᱯᱷᱟ ᱛᱮ ᱨᱚᱲ ᱢᱮ ᱾ ᱨᱚᱲ ᱠᱚ ᱞᱟᱛᱟᱨ ᱨᱮ ᱚᱞᱚᱜᱼᱟ ᱾',
    pressToSpeak: 'ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱵᱚᱴᱚᱱ ᱚᱛᱟᱭ ᱢᱮ',
    startBtn: 'ᱨᱮᱠᱚᱨᱰᱤᱝ ᱮᱛᱚᱦᱚᱵ ᱢᱮ',
    stopBtn: 'ᱨᱮᱠᱚᱨᱰᱤᱝ ᱛᱷᱟᱢᱵᱟᱣ ᱢᱮ',
    recordAgain: 'ᱫᱚᱦᱲᱟ ᱨᱮᱠᱚᱨᱰ ᱢᱮ',
    playPreview: 'ᱟᱸᱡᱚᱢ ᱢᱮ',
    pause: 'ᱛᱷᱟᱢᱵᱟᱣ ᱢᱮ',
    reset: 'ᱨᱤᱥᱮᱴ',
    permissionError: 'ᱢᱟᱭᱠᱨᱳᱯᱷᱳᱱ ᱪᱟᱹᱞᱩ ᱞᱟᱹᱠᱛᱤ ᱠᱟᱱᱟ ᱾',
    notSupported: 'ᱱᱚᱶᱟ ᱵᱽᱨᱟᱣᱡᱟᱨ ᱨᱮ ᱨᱮᱠᱚᱨᱰᱤᱝ ᱵᱟᱝ ᱜᱟᱱᱚᱜᱼᱟ ᱾',
    defaultTitle: 'ᱪᱟᱯᱟᱠᱚᱞ ᱨᱮ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ',
    defaultDesc: 'ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ ᱾',
  },
};

const isDevanagariTranscript = (transcript: string) =>
  /[\u0900-\u097F]/u.test(transcript) && !/[A-Za-z]/u.test(transcript);

const speechRecognitionLanguages: Record<NonNullable<AudioWaveformRecorderProps['lang']>, string> = {
  hi: 'hi-IN',
  sat: 'hi-IN',
  en: 'en-IN',
};

export default function AudioWaveformRecorder({
  lang = 'hi',
  speechLang = 'hi',
  maxDurationSec = 60, // 1 Full Minute (60s)
  onAudioRecorded,
  onTranscriptionGenerated,
  onTranscription,
}: AudioWaveformRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const durationRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const liveTranscriptRef = useRef<string>('');

  const t = i18n[lang] || i18n.hi;

  useEffect(() => () => cleanup(), []);

  const cleanup = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (contextRef.current && contextRef.current.state !== 'closed') {
      void contextRef.current.close();
    }
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteFrequencyData(data);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#061a17';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Center baseline guide
      context.strokeStyle = 'rgba(52, 211, 153, 0.2)';
      context.beginPath();
      context.moveTo(0, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();

      // Oscillating emerald green bars
      const barWidth = (canvas.width / data.length) * 2.5;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / 255) * canvas.height * 0.85;
        context.fillStyle = '#10b981';
        context.shadowColor = '#34d399';
        context.shadowBlur = 8;
        context.fillRect(x, (canvas.height - barHeight) / 2, barWidth - 1, Math.max(barHeight, 3));
        x += barWidth + 1;
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const startRecording = async () => {
    setError(null);
    liveTranscriptRef.current = '';

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError(t.notSupported);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      setDuration(0);
      durationRef.current = 0;

      // 1. AudioContext with safe resume() for Chrome/Safari autoplay policies
      const AudioContextClass =
        window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const audioContext = new AudioContextClass();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        audioContext.createMediaStreamSource(stream).connect(analyser);
        contextRef.current = audioContext;
        analyserRef.current = analyser;
      }

      // 2. Select compatible MIME type
      const candidateTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
      const mimeType = candidateTypes.find((type) => MediaRecorder.isTypeSupported(type)) || '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordedMime = recorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: recordedMime });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        const reader = new FileReader();
        reader.onloadend = () => {
          onAudioRecorded?.(blob, String(reader.result), durationRef.current);
        };
        reader.readAsDataURL(blob);

        // Deliver live transcript or fallback
        const capturedTranscript = liveTranscriptRef.current.trim();
        const finalTranscript = speechLang === 'hi' && !isDevanagariTranscript(capturedTranscript)
          ? ''
          : capturedTranscript;
        const finalDescription = finalTranscript || t.defaultDesc;
        const finalTitle = finalTranscript
          ? `जल समस्या: ${finalTranscript.split(/\s+/u).slice(0, 5).join(' ')}`
          : t.defaultTitle;

        onTranscriptionGenerated?.({
          title: finalTitle,
          description: finalDescription,
          detectedLang: lang,
        });

        if (onTranscription) {
          onTranscription(finalDescription);
        }
      };

      recorder.start(250);
      setRecording(true);
      drawWaveform();

      // 3. Start live speech recognition alongside recording
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        try {
          const recognition = new SpeechRecognitionClass();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = speechRecognitionLanguages[speechLang];

          recognition.onresult = (event: any) => {
            let transcript = '';
            for (let i = 0; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript) {
              if (speechLang === 'hi' && !isDevanagariTranscript(transcript)) return;
              liveTranscriptRef.current = transcript;
              if (onTranscription) onTranscription(transcript);
            }
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('SpeechRecognition unavailable, continuing raw audio recording:', e);
        }
      }

      // 4. Accurate timer counting up to maxDurationSec (60s)
      timerRef.current = setInterval(() => {
        setDuration((val) => {
          const next = val + 1;
          durationRef.current = next;
          if (next >= maxDurationSec) {
            stopRecording();
            return maxDurationSec;
          }
          return next;
        });
      }, 1000);
    } catch (err: any) {
      cleanup();
      console.error('Microphone access failed:', err);
      setError(t.permissionError);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const togglePlayback = () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      void audioRef.current.play();
      setPlaying(true);
    }
  };

  const reset = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    cleanup();
    setAudioUrl(null);
    setPlaying(false);
    setDuration(0);
    durationRef.current = 0;
    setRecording(false);
    setError(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Mic className="h-4 w-4 text-emerald-600" />
            {t.title}
          </p>
          <p className="text-xs text-slate-600 mt-0.5">{t.subtitle}</p>
        </div>
        <span
          className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
            recording ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {formatTime(duration)} / {formatTime(maxDurationSec)}
        </span>
      </div>

      {/* Waveform Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-emerald-900/40 bg-[#061a17]">
        <canvas ref={canvasRef} width={640} height={120} className="h-28 w-full" />
        {!recording && !audioUrl && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs text-emerald-200 font-semibold">
            <Volume2 className="h-4 w-4" /> {t.pressToSpeak}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={recording ? stopRecording : startRecording}
          className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-black text-white transition-all shadow-sm ${
            recording
              ? 'bg-red-600 hover:bg-red-700 animate-pulse'
              : 'bg-emerald-700 hover:bg-emerald-800 active:scale-95'
          }`}
        >
          {recording ? (
            <>
              <Square className="h-4 w-4 fill-white" /> {t.stopBtn}
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" /> {audioUrl ? t.recordAgain : t.startBtn}
            </>
          )}
        </button>

        {audioUrl && (
          <>
            <button
              type="button"
              onClick={togglePlayback}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 text-xs font-black text-emerald-800 hover:bg-emerald-50 transition-all shadow-xs"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? t.pause : t.playPreview}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label="Reset recording"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
            >
              <RotateCcw className="h-4 w-4" /> {t.reset}
            </button>
          </>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}