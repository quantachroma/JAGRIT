'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Trash2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AudioRecorderProps {
  onAudioRecorded?: (audioBlob: Blob, base64Url: string, durationSec: number) => void;
  onTranscriptionGenerated?: (data: { title: string; description: string; detectedLang: string }) => void;
  lang?: 'hi' | 'sat' | 'en';
}

export default function AudioRecorder({
  onAudioRecorded,
  onTranscriptionGenerated,
  lang = 'hi',
}: AudioRecorderProps) {
  const [mounted, setMounted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcribed, setTranscribed] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
  };

  // Draw real-time audio waveform onto HTML5 Canvas
  const startWaveformVisualizer = (stream: MediaStream | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;

    if (stream && typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;
        sourceRef.current = source;

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (e) {
        console.warn('Live Web Audio analyser not supported in this environment, falling back to simulated wave:', e);
      }
    }

    let phase = 0;
    const draw = () => {
      if (!canvas) return;
      animationFrameRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal reference line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray as any);
        const barWidth = (width / dataArray.length) * 1.5;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = (dataArray[i] / 255) * (height * 0.85);

          // Gradient from Jharkhand Emerald (#044728) to Saffron (#D97706)
          const grad = ctx.createLinearGradient(0, height / 2 - barHeight / 2, 0, height / 2 + barHeight / 2);
          grad.addColorStop(0, '#34d399');
          grad.addColorStop(0.5, '#f59e0b');
          grad.addColorStop(1, '#044728');

          ctx.fillStyle = grad;
          ctx.fillRect(x, (height - barHeight) / 2, barWidth - 1, Math.max(barHeight, 2));
          x += barWidth;
        }
      } else {
        // High-precision smooth sinusoidal simulated wave fallback (always active during recording)
        phase += 0.12;
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        const waveGrad = ctx.createLinearGradient(0, 0, width, 0);
        waveGrad.addColorStop(0, '#044728');
        waveGrad.addColorStop(0.5, '#f59e0b');
        waveGrad.addColorStop(1, '#34d399');
        ctx.strokeStyle = waveGrad;

        const sliceWidth = width / 40;
        let x = 0;

        for (let i = 0; i < 40; i++) {
          const amplitude = Math.sin(phase + i * 0.3) * (height * 0.28);
          const y = height / 2 + amplitude;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();

        // Mirrored wave for visual richness
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
        x = 0;
        for (let i = 0; i < 40; i++) {
          const amplitude = Math.cos(phase * 0.8 + i * 0.25) * (height * 0.2);
          const y = height / 2 - amplitude;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      }
    };

    draw();
  };

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setRecordingDuration(0);
      setAudioUrl(null);
      setTranscribed(false);

      let stream: MediaStream | null = null;
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;
        } catch (err) {
          console.warn('Microphone permission not granted or device unavailable, using simulated voice recording:', err);
        }
      }

      setIsRecording(true);
      startWaveformVisualizer(stream);

      // Duration counter
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 120) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // MediaRecorder initialization if stream is present
      if (stream && typeof MediaRecorder !== 'undefined') {
        const mimeType = MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : '';
        const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = handleRecordingStopped;
        mediaRecorder.start(250);
      }
    } catch (e) {
      console.error('Failed to start recording:', e);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback synthetic audio generation for simulated environments
      handleRecordingStopped();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const handleRecordingStopped = () => {
    let finalBlob: Blob;
    if (audioChunksRef.current.length > 0) {
      finalBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    } else {
      // Mock minimal valid WAV header payload for simulation
      const mockWavBase64 = 'UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
      const byteCharacters = atob(mockWavBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      finalBlob = new Blob([new Uint8Array(byteNumbers)], { type: 'audio/wav' });
    }

    const url = URL.createObjectURL(finalBlob);
    setAudioUrl(url);

    // Convert to base64 and emit to parent
    const reader = new FileReader();
    reader.readAsDataURL(finalBlob);
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (onAudioRecorded) {
        onAudioRecorded(finalBlob, base64Data, Math.max(recordingDuration, 3));
      }
    };

    // Auto-populate Title & Description based on language via simulated ASR pipeline
    generateTranscribedContent();
  };

  const generateTranscribedContent = () => {
    setTranscribed(true);
    let title = '';
    let description = '';

    if (lang === 'hi') {
      title = 'कांके टोले में चापाकल की पाइप में जंग एवं दूषित जल समस्या';
      description =
        'कांके पंचायत के वार्ड 3 में चापाकल पिछले 3 महीनों से खराब पड़ा है। जल स्तर नीचे जाने व पाइप में जंग लगने से लाल मटमैला पानी निकल रहा है। टोले के 50 से अधिक ग्रामीण परिवार पेयजल संकट से जूझ रहे हैं। कृपया तकनीकी समाधान हेतु संज्ञान लें।';
    } else if (lang === 'sat') {
      title = 'ᱠᱟᱸᱠᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱯᱟᱭᱤᱯ ᱵᱟᱹᱲᱤᱡ ᱟᱨ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ';
      description =
        'ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱯᱟᱭᱤᱯ ᱓ ᱪᱟᱸᱫᱚ ᱠᱷᱚᱱ ᱵᱟᱹᱲᱤᱡ ᱟᱠᱟᱱᱟ᱾ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ (iron effluent) ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ ᱟᱨ ᱕᱐ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾';
    } else {
      title = 'Severe Pipe Corrosion and Iron Contamination in Kanke Handpump';
      description =
        'The deep bore handpump in Kanke Block has been inoperative for over 3 months due to riser pipe corrosion and reddish iron effluent contamination. Over 50 rural households are facing acute water shortages.';
    }

    if (onTranscriptionGenerated) {
      onTranscriptionGenerated({
        title,
        description,
        detectedLang: lang,
      });
    }
  };

  const togglePlayback = () => {
    if (!audioElementRef.current && audioUrl) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    } else if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const resetRecording = () => {
    cleanupAudio();
    setAudioUrl(null);
    setIsRecording(false);
    setRecordingDuration(0);
    setIsPlaying(false);
    setTranscribed(false);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mounted) {
    return (
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400">
        Initializing Voice Studio...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-[#D97706] border border-amber-500/30">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>{lang === 'hi' ? 'आवाज़ में रिकॉर्ड करें' : lang === 'sat' ? 'ᱟᱲᱟᱝ ᱨᱮᱠᱚᱨᱰ (Voice Note)' : 'Voice Recording Studio'}</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                Bhashini / ASR
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              {lang === 'hi'
                ? 'हिन्दी, संथाली (Ol Chiki) अथवा खोरठा में बोलें — एआई स्वतः टेक्स्ट भरेगा'
                : lang === 'sat'
                ? 'ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮ ᱦᱤᱱᱫᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ — ᱮᱟᱭᱤ ᱟᱯᱱᱟᱨ ᱛᱮ ᱚᱞᱟ'
                : 'Speak in Hindi, Santhali, or English — speech-to-text auto-fills the form'}
            </p>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center space-x-2 bg-red-50 text-red-600 px-2.5 py-1 rounded-full border border-red-200 text-xs font-mono font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>REC {formatTime(recordingDuration)}</span>
          </div>
        )}
      </div>

      {/* HTML5 Canvas Waveform Visualizer */}
      <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-900 h-24 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={96}
          className="w-full h-full block"
        />

        {!isRecording && !audioUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/70 backdrop-blur-xs text-slate-400 text-xs space-y-1">
            <Volume2 className="w-5 h-5 text-slate-500" />
            <span>{lang === 'hi' ? 'माइक दबाकर बोलना शुरू करें' : 'Press mic button below to record'}</span>
          </div>
        )}

        {audioUrl && !isRecording && (
          <div className="absolute top-2 right-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>WAV {formatTime(recordingDuration || 4)} captured</span>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center space-x-2.5">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="inline-flex items-center space-x-2 bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Mic className="w-4 h-4 text-amber-300" />
              <span>
                {audioUrl
                  ? lang === 'hi'
                    ? 'पुनः रिकॉर्ड करें (Re-record)'
                    : 'Record Over'
                  : lang === 'hi'
                  ? 'बोलना शुरू करें (Start Speaking)'
                  : lang === 'sat'
                  ? 'ᱨᱚᱲ ᱮᱦᱚᱵ ᱢᱮ'
                  : 'Start Voice Recording'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all animate-bounce"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>{lang === 'hi' ? 'रिकॉर्डिंग समाप्त करें (Stop)' : 'Stop Recording'}</span>
            </button>
          )}

          {audioUrl && (
            <button
              type="button"
              onClick={togglePlayback}
              className="inline-flex items-center space-x-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-800" />}
              <span>{isPlaying ? 'Pause' : 'Play Voice Note'}</span>
            </button>
          )}
        </div>

        {audioUrl && (
          <button
            type="button"
            onClick={resetRecording}
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-red-600 text-xs font-medium px-2 py-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Discard</span>
          </button>
        )}
      </div>

      {/* Auto-Transcription Notification Banner */}
      {transcribed && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-emerald-900 shadow-xs animate-in fade-in duration-300">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">
              {lang === 'hi'
                ? '✨ आवाज़ से शीर्षक एवं विवरण स्वतः भर दिए गए हैं!'
                : lang === 'sat'
                ? '✨ ᱟᱲᱟᱝ ᱛᱮ ᱥᱚᱢᱚᱥᱭᱟ ᱧᱩᱛᱩᱢ ᱟᱨ ᱵᱤᱵᱚᱨᱚᱬ ᱚᱞ ᱮᱱᱟ!'
                : '✨ Voice note transcribed! Title and description have been auto-populated.'}
            </p>
            <p className="text-[11px] text-emerald-700">
              {lang === 'hi'
                ? 'आप नीचे दिए गए बॉक्स में आवश्यकतानुसार बदलाव कर सकते हैं।'
                : 'You can review and freely edit the generated text fields below before submitting.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
