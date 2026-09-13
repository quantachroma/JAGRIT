/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Camera,
  Mic,
  MapPin,
  CheckCheck,
  Smile,
  Paperclip,
  Shield,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  ExternalLink,
  Bot,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  type: 'text' | 'image' | 'voice' | 'location' | 'ticket';
  mediaUrl?: string;
  audioUrl?: string;
  voiceDuration?: string;
  locationDetails?: { name: string; lat: number; lon: number };
  ticketData?: {
    ticketNumber: string;
    domain: string;
    location: string;
    triageType: string;
    universities: string[];
    dashboardUrl: string;
  };
  time: string;
  isRead?: boolean;
}

function createMockVoiceWavBlob(): string {
  if (typeof window === 'undefined') return '';
  const sampleRate = 8000;
  const numSamples = sampleRate * 6;
  const buffer = new ArrayBuffer(44 + numSamples);
  const view = new DataView(buffer);

  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + numSamples, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint16(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, numSamples, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const speechCadence = Math.sin(2 * Math.PI * 2.5 * t);
    const formant = Math.sin(2 * Math.PI * 220 * t) * 0.5 + Math.sin(2 * Math.PI * 440 * t) * 0.25;
    const sample = Math.floor(128 + 45 * formant * Math.max(0, speechCadence));
    view.setUint8(44 + i, sample);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

export default function WhatsAppSimulatorPage() {
  const { language, t } = useCitizen();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const getBotGreeting = React.useCallback((): string => {
    if (language === 'hi') {
      return 'जोहार! झारखण्ड जन-समस्या निवारण बॉट में आपका स्वागत है।\n\nकृपया समस्या की तस्वीर खींचकर भेजें, बोलकर अपनी आवाज़ रिकॉर्ड करें अथवा अपना वर्तमान स्थान साझा करें।';
    }
    if (language === 'sat') {
      return 'ᱡᱚᱦᱟᱨ! ᱡᱟᱜᱽᱨᱤᱛ ᱥᱮᱵᱟ ᱵᱳᱴ ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾\n\nᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱥᱮ ᱟᱲᱟᱝ ᱨᱮᱠᱚᱨᱰ ᱠᱟᱛᱮ ᱵᱷᱮᱡᱟᱭ ᱢᱮ ᱟᱨᱵᱟᱝ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱞᱟᱹᱭ ᱢᱮ᱾';
    }
    return 'Johar! Welcome to the JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society Civic Service Bot (Government of Jharkhand).\n\nPlease send a photo of the civic defect, a voice note describing the issue, or share your live GPS location.';
  }, [language]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(6);

  // Initialize messages whenever language changes
  useEffect(() => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        type: 'text',
        text: getBotGreeting(),
        time: '10:00 AM',
        isRead: true,
      },
    ]);
    setActiveStep(0);
  }, [getBotGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Action 1: User Sends Photo
  const handleSendPhoto = () => {
    const time = getCurrentTime();
    const userMsgText =
      language === 'hi'
        ? 'कांके वार्ड 3: चापाकल की पाइप में जंग और मटमैला पानी।'
        : language === 'sat'
        ? 'ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱯᱟᱭᱤᱯ ᱨᱮ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ᱾'
        : 'Kanke Ward 3: Corroded handpump pipe casing with iron precipitate.';

    const botResponseText =
      language === 'hi'
        ? 'तस्वीर प्राप्त हुई!\n\nकंप्यूटर विज़न द्वारा तकनीकी जांच पूर्ण:\n• पहचानी गई खराबी: जंग एवं दूषित जल रिसाव\n\nकृपया नीचे दिए गए बटन से अपना वर्तमान स्थान साझा करें।'
        : language === 'sat'
        ? 'ᱪᱤᱛᱟᱹᱨ ᱧᱟᱢ ᱮᱱᱟ!\n\nᱠᱚᱢᱯᱤᱭᱩᱴᱟᱨ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ:\n• ᱧᱟᱢ ᱟᱠᱟᱱ ᱠᱷᱟᱹᱢᱤ: ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱟᱨ ᱯᱟᱭᱤᱯ ᱡᱚᱨᱚ\n\nᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱞᱟᱛᱟᱨ ᱨᱮᱱᱟᱜ ᱵᱮᱵᱚᱥᱛᱟ ᱛᱮ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱷᱮᱡᱟᱭ ᱢᱮ᱾'
        : 'Photo received!\n\nComputer Vision Analysis completed:\n• Identified: Iron Effluent and Pipe Degradation\n\nPlease share your live location so we can cross-reference nearby records.';

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'image',
      text: userMsgText,
      mediaUrl:
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="100%" height="100%" fill="%231e293b"/><rect x="180" y="40" width="40" height="130" rx="4" fill="%2364748b"/><circle cx="200" cy="180" r="28" fill="%23b45309" opacity="0.9"/><rect x="150" y="160" width="100" height="50" rx="6" fill="%23334155" opacity="0.6"/><text x="50%" y="88%" dominant-baseline="middle" text-anchor="middle" fill="%23f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">PHOTO: Corroded Handpump Evidence</text></svg>',
      time,
      isRead: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActiveStep(1);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: 'text',
        text: botResponseText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  const insertVoiceMessage = (audioUrl?: string, duration = 6) => {
    const time = getCurrentTime();
    const effectiveAudioUrl = audioUrl || createMockVoiceWavBlob();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'voice',
      voiceDuration: '0:06',
      audioUrl: effectiveAudioUrl,
      time,
      isRead: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActiveStep(2);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: 'text',
        text: '✅ आपकी समस्या दर्ज हो गई है! Ticket #JAG-4102 जनरेट किया गया है। विश्वविद्यालय अनुसंधान दल को सूचित कर दिया गया है।',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 700);
  };

  const stopVoiceRecording = () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    fallbackTimerRef.current = null;
    recordingTimerRef.current = null;
    setIsRecordingVoice(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      return;
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    insertVoiceMessage(createMockVoiceWavBlob(), 6);
  };

  const startVoiceRecording = async () => {
    if (isRecordingVoice) {
      stopVoiceRecording();
      return;
    }
    setRecordingSeconds(0);
    setIsRecordingVoice(true);
    audioChunksRef.current = [];
    let stream: MediaStream | null = null;
    try {
      if (navigator.mediaDevices?.getUserMedia) stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      stream = null;
    }

    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((current) => {
        if (current >= 6) {
          stopVoiceRecording();
          return current;
        }
        return current + 1;
      });
    }, 1000);

    if (stream && typeof MediaRecorder !== 'undefined') {
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size) audioChunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        insertVoiceMessage(url, 6);
      };
      recorder.start();
    } else {
      fallbackTimerRef.current = setTimeout(stopVoiceRecording, 3000);
    }
  };

  const toggleVoicePlayback = (message: ChatMessage) => {
    const url = message.audioUrl || createMockVoiceWavBlob();
    if (playingVoiceId === message.id) {
      audioPlayerRef.current?.pause();
      setPlayingVoiceId(null);
      return;
    }
    audioPlayerRef.current?.pause();
    const player = new Audio(url);
    audioPlayerRef.current = player;
    setAudioCurrentTime(0);
    setAudioDuration(6);
    player.ontimeupdate = () => {
      setAudioCurrentTime(player.currentTime);
      if (player.duration && !isNaN(player.duration)) {
        setAudioDuration(player.duration);
      }
    };
    player.onended = () => {
      setPlayingVoiceId(null);
      setAudioCurrentTime(0);
    };
    player.play().catch(() => {
      setPlayingVoiceId(null);
    });
    setPlayingVoiceId(message.id);
  };

  const handleVoiceSeek = (e: React.MouseEvent<HTMLDivElement>, message: ChatMessage) => {
    e.stopPropagation();
    if (!audioPlayerRef.current || playingVoiceId !== message.id) {
      toggleVoicePlayback(message);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * (audioPlayerRef.current.duration || 6);
    audioPlayerRef.current.currentTime = targetTime;
    setAudioCurrentTime(targetTime);
  };

  useEffect(() => () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioPlayerRef.current?.pause();
  }, []);

  // Action 3: User Shares Live Location & Receives Ticket
  const handleShareLocation = () => {
    const time = getCurrentTime();
    const domainText =
      language === 'hi'
        ? 'पेयजल एवं चापाकल'
        : language === 'sat'
        ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ'
        : 'Drinking Water and Handpumps';

    const triageText =
      language === 'hi'
        ? 'विश्वविद्यालय शोध एवं हैकथॉन ट्रैक'
        : language === 'sat'
        ? 'ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ'
        : 'Applied University R&D Track';

    const ticketSummaryText =
      language === 'hi'
        ? 'शिकायत संख्या JAG-4102 सफलतापूर्वक दर्ज कर ली गई है।'
        : language === 'sat'
        ? 'ᱴᱤᱠᱮᱴ JAG-4102 ᱥᱟᱹᱛ ᱛᱮ ᱫᱟᱨᱡᱽ ᱮᱱᱟ᱾'
        : 'Ticket JAG-4102 has been successfully registered.';

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'location',
      locationDetails: {
        name: 'Kanke Block, Ranchi, Jharkhand',
        lat: 23.3441,
        lon: 85.3096,
      },
      time,
      isRead: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActiveStep(3);

    setTimeout(() => {
      setIsTyping(false);
      const ticketMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: 'ticket',
        text: ticketSummaryText,
        ticketData: {
          ticketNumber: 'JAG-4102',
          domain: domainText,
          location: 'Kanke Panchayat, Ranchi',
          triageType: triageText,
          universities: ['BIT Mesra', 'NIT Jamshedpur', 'Ranchi University'],
          dashboardUrl: '/dashboard',
        },
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, ticketMsg]);
    }, 1400);
  };

  // Text message submission
  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const time = getCurrentTime();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'text',
      text: inputText.trim(),
      time,
      isRead: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponseText =
        language === 'hi'
          ? 'धन्यवाद! आपका संदेश प्राप्त हुआ। कृपया नीचे दिए गए बटनों का उपयोग करके फोटो, आवाज़ या स्थान भेजें।'
          : language === 'sat'
          ? 'ᱥᱟᱨᱦᱟᱣ! ᱟᱢᱟᱜ ᱠᱷᱚᱵᱚᱨ ᱧᱟᱢ ᱮᱱᱟ᱾ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱪᱤᱛᱟᱹᱨ ᱥᱮ ᱴᱷᱟᱶ ᱵᱷᱮᱡᱟᱭ ᱢᱮ᱾'
          : 'Thank you! Your message was received. Please share a photo, record a voice note, or share your location.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: 'text',
        text: botResponseText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        type: 'text',
        text: getBotGreeting(),
        time: '10:00 AM',
        isRead: true,
      },
    ]);
    setActiveStep(0);
    setIsTyping(false);
    setInputText('');
  };

  const getHeaderTitle = () => {
    if (language === 'hi') return 'व्हाट्सएप सेवा बॉट';
    if (language === 'sat') return 'ᱣᱟᱴᱥᱟᱯ ᱥᱮᱵᱟ ᱵᱳᱴ';
    return 'JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society Seva Bot';
  };

  const getHeaderSubtitle = () => {
    if (language === 'hi') return 'झारखण्ड सरकार का आधिकारिक नागरिक बॉट • सक्रिय';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨᱟᱜ ᱥᱮᱵᱟ • ᱥᱟᱹᱛ';
    return 'Official Govt of Jharkhand Civic Bot • Online';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Page Title & Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('common', 'whatsappSim', 'WhatsApp Seva Bot')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {getHeaderTitle()}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'व्हाट्सएप द्वारा बिना ऐप डाउनलोड किए नागरिक समस्याओं का स्वतः निवारण'
              : language === 'sat'
              ? 'ᱣᱟᱴᱥᱟᱯ ᱛᱮ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱞᱟᱹᱭ ᱥᱚᱫᱚᱨ ᱢᱮ'
              : 'Zero-barrier rural reporting via WhatsApp with automated AI classification'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 min-h-[48px] rounded-2xl shadow-xs hover:bg-slate-50 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('whatsapp', 'resetChat', 'Reset Simulation')}</span>
        </button>
      </div>

      {/* WhatsApp Frame Mockup */}
      <div className="bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800 max-w-lg mx-auto flex flex-col h-[680px]">
        {/* WhatsApp Header */}
        <div className="bg-[#1E3A8A] text-white px-4 py-3 flex items-center justify-between shadow-sm z-10 select-none">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-white hover:opacity-80 md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="w-10 h-10 rounded-full bg-blue-800 border-2 border-sky-300 flex items-center justify-center font-black text-sky-300 text-lg">
              J
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-sm">{getHeaderTitle()}</h3>
                <span className="text-sky-300 text-xs font-bold">✓</span>
              </div>
              <p className="text-[11px] text-blue-100">{getHeaderSubtitle()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-white/90">
            <Video className="w-4 h-4 cursor-pointer" />
            <Phone className="w-4 h-4 cursor-pointer" />
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative bg-slate-100/70">
          <div className="relative z-10 mx-auto max-w-xs bg-blue-50 text-blue-900 text-[10px] text-center p-2 rounded-lg shadow-xs border border-blue-200 flex items-center justify-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
            <span>{t('whatsapp', 'encryptedBanner', 'Messages and calls are end-to-end encrypted.')}</span>
          </div>

          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`relative z-10 flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-xs shadow-xs space-y-2 ${
                    isUser
                      ? 'bg-[#EFF6FF] text-slate-900 rounded-tr-none border border-blue-200'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/80'
                  }`}
                >
                  {m.type === 'image' && m.mediaUrl && (
                    <div className="rounded-xl overflow-hidden border border-blue-300/60 mb-1">
                      <img src={m.mediaUrl} alt="Uploaded site evidence" className="w-full h-36 object-cover" />
                    </div>
                  )}

                  {m.type === 'voice' && (
                    <div className="space-y-2.5">
                      {/* Playable Voice Note Bubble */}
                      <div className="flex items-center space-x-3 bg-white/90 p-3 rounded-xl border border-blue-200 shadow-xs">
                        <button
                          type="button"
                          onClick={() => toggleVoicePlayback(m)}
                          className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform shrink-0"
                          aria-label={playingVoiceId === m.id ? 'Pause voice note' : 'Play voice note'}
                        >
                          {playingVoiceId === m.id ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 space-y-1 cursor-pointer" onClick={(e) => handleVoiceSeek(e, m)}>
                          {/* Animated Waveform Progress Scrub Bar */}
                          <div className="flex items-center space-x-1 h-6">
                            {[6, 14, 20, 10, 16, 22, 14, 8, 20, 16, 10, 14, 18, 8, 12, 6].map((h, i) => {
                              const barProgress = (i + 1) / 16;
                              const currentProgress = playingVoiceId === m.id ? audioCurrentTime / (audioDuration || 6) : 0;
                              const isPlayed = currentProgress >= barProgress;
                              return (
                                <span
                                  key={i}
                                  style={{ height: `${h}px` }}
                                  className={`w-1 rounded-full transition-all duration-100 ${
                                    isPlayed ? 'bg-blue-600' : 'bg-blue-200'
                                  } ${playingVoiceId === m.id ? 'animate-pulse' : ''}`}
                                />
                              );
                            })}
                          </div>

                          <div className="flex justify-between text-[10px] text-slate-600 font-mono font-semibold">
                            <span>
                              {playingVoiceId === m.id
                                ? `0:0${Math.min(6, Math.floor(audioCurrentTime))}`
                                : m.voiceDuration || '0:06'}
                            </span>
                            <span className="text-blue-700 font-medium">
                              {playingVoiceId === m.id ? 'Playing ▶' : 'Tap to play'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Visible Transcribed Text Box */}
                      <div className="rounded-xl border border-blue-200 bg-white p-3 text-xs shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="font-bold text-blue-900 flex items-center gap-1 text-[11px]">
                            📝 ट्रांसक्रिप्ट / Transcribed Text:
                          </span>
                          <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                            🏷️ Detected: Santhali / Hindi (94% confidence)
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 leading-relaxed">
                          &ldquo;चापाकल से लाल पानी निकल रहा है, पीने योग्य नहीं है।&rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                  {m.type === 'location' && m.locationDetails && (
                    <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-xs space-y-1.5 p-2">
                      <div className="bg-slate-900 h-24 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="text-center space-y-1">
                          <MapPin className="w-6 h-6 text-blue-500 mx-auto animate-bounce" />
                          <span className="text-[10px] text-slate-300 font-mono">
                            {m.locationDetails.lat}° N, {m.locationDetails.lon}° E
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-700" />
                          <span>{m.locationDetails.name}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {m.type === 'ticket' && m.ticketData && (
                    <div className="bg-white rounded-xl p-3 border-2 border-blue-600 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {language === 'hi'
                              ? 'शिकायत टिकट दर्ज'
                              : language === 'sat'
                              ? 'ᱴᱤᱠᱮᱴ ᱫᱟᱨᱡᱽ ᱮᱱᱟ'
                              : 'Official Ticket Generated'}
                          </span>
                        </span>
                        <span className="font-mono font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          #{m.ticketData.ticketNumber}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-700">
                        <p>
                          <strong className="text-slate-900">
                            {language === 'hi' ? 'श्रेणी:' : language === 'sat' ? 'ᱦᱟᱹᱴᱤᱧ:' : 'Category:'}
                          </strong>{' '}
                          {m.ticketData.domain}
                        </p>
                        <p>
                          <strong className="text-slate-900">
                            {language === 'hi' ? 'स्थान:' : language === 'sat' ? 'ᱴᱷᱟᱶ:' : 'Location:'}
                          </strong>{' '}
                          {m.ticketData.location}
                        </p>
                        <p>
                          <strong className="text-slate-900">
                            {language === 'hi' ? 'ट्रैक:' : language === 'sat' ? 'ᱠᱟᱹᱢᱤ:' : 'Triage:'}
                          </strong>{' '}
                          {m.ticketData.triageType}
                        </p>
                      </div>

                      <Link
                        href={m.ticketData.dashboardUrl}
                        className="inline-flex items-center space-x-1 bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xs hover:bg-blue-800 transition-all min-h-[36px]"
                      >
                        <span>
                          {language === 'hi'
                            ? 'डैशबोर्ड में स्थिति देखें'
                            : language === 'sat'
                            ? 'ᱰᱮᱥᱵᱳᱨᱰ ᱨᱮ ᱧᱮᱞ ᱢᱮ'
                            : 'View Status on Dashboard'}
                        </span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  )}

                  {m.text && <p className="whitespace-pre-line leading-relaxed">{m.text}</p>}

                  <div className="flex items-center justify-end space-x-1 text-[9px] text-slate-400 mt-0.5">
                    <span>{m.time}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="relative z-10 flex justify-start animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 text-xs shadow-xs border border-slate-200 flex items-center space-x-1.5">
                <span className="text-[11px] text-blue-700 font-medium">
                  {language === 'hi' ? 'टाइप किया जा रहा है' : language === 'sat' ? 'ᱚᱞᱚᱜ ᱠᱟᱱᱟ' : 'Typing'}
                </span>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Action Buttons (Generous >= 48px touch targets) */}
        <div className="bg-slate-100 border-t border-slate-300 p-2 space-y-1.5 z-10">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleSendPhoto}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-blue-50 text-slate-800 border border-slate-300 rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
            >
              <Camera className="w-4 h-4 text-blue-700" />
              <span className="truncate">{t('whatsapp', 'sendPhoto', 'Photo')}</span>
            </button>

            <button
              type="button"
              onClick={startVoiceRecording}
              disabled={isTyping}
              className={`flex items-center justify-center space-x-1 ${isRecordingVoice ? 'bg-blue-600 text-white border-blue-700 animate-pulse' : 'bg-white hover:bg-blue-50 text-slate-800 border-slate-300'} rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95`}
            >
              <Mic className={`w-4 h-4 ${isRecordingVoice ? 'text-white' : 'text-blue-600'}`} />
              <span className="truncate">{isRecordingVoice ? `${t('whatsapp', 'tapToStop', 'Tap to Stop')} 00:${String(recordingSeconds).padStart(2, '0')}` : t('whatsapp', 'sendVoice', 'Voice')}</span>
            </button>

            <button
              type="button"
              onClick={handleShareLocation}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-blue-50 text-slate-800 border border-slate-300 rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="truncate">{t('whatsapp', 'sendLocation', 'Location')}</span>
            </button>
          </div>
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={handleSendText}
          className="bg-[#F0F2F5] p-2.5 flex items-center space-x-2 border-t border-slate-300 z-10"
        >
          <button type="button" className="text-slate-500 hover:text-slate-700 p-2 min-h-[48px] min-w-[36px] flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </button>
          <button type="button" className="text-slate-500 hover:text-slate-700 p-2 min-h-[48px] min-w-[36px] flex items-center justify-center">
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('whatsapp', 'typeMessage', 'Type a message...')}
            className="flex-1 bg-white rounded-full py-2.5 px-4 text-xs text-slate-800 border-none focus:outline-none shadow-xs min-h-[48px]"
          />

          {inputText.trim() ? (
            <button
              type="submit"
              className="w-11 h-11 min-h-[48px] min-w-[48px] rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md active:scale-95"
            >
              <Send className="w-4 h-4 fill-white ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={startVoiceRecording}
              className={`w-11 h-11 min-h-[48px] min-w-[48px] rounded-full ${isRecordingVoice ? 'bg-blue-600 animate-pulse' : 'bg-blue-600'} text-white flex items-center justify-center shadow-md active:scale-95`}
            >
              <Mic className="w-4 h-4 text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
