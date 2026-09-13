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
  ExternalLink,
  Bot,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  type: 'text' | 'image' | 'voice' | 'location' | 'ticket';
  mediaUrl?: string;
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

export default function WhatsAppSimulatorPage() {
  const { language, t } = useCitizen();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getBotGreeting = React.useCallback((): string => {
    if (language === 'hi') {
      return 'जोहार! झारखण्ड जन-समस्या निवारण बॉट में आपका स्वागत है।\n\nकृपया समस्या की तस्वीर खींचकर भेजें, बोलकर अपनी आवाज़ रिकॉर्ड करें अथवा अपना वर्तमान स्थान साझा करें।';
    }
    if (language === 'sat') {
      return 'ᱡᱚᱦᱟᱨ! ᱡᱟᱜᱽᱨᱤᱛ ᱥᱮᱵᱟ ᱵᱳᱴ ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾\n\nᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱥᱮ ᱟᱲᱟᱝ ᱨᱮᱠᱚᱨᱰ ᱠᱟᱛᱮ ᱵᱷᱮᱡᱟᱭ ᱢᱮ ᱟᱨᱵᱟᱝ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱞᱟᱹᱭ ᱢᱮ᱾';
    }
    return 'Johar! Welcome to the JAGRIT Civic Service Bot (Government of Jharkhand).\n\nPlease send a photo of the civic defect, a voice note describing the issue, or share your live GPS location.';
  }, [language]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

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

  // Action 2: User Sends Voice Note
  const handleSendVoiceNote = () => {
    const time = getCurrentTime();
    const botResponseText =
      language === 'hi'
        ? 'ध्वनि संदेश प्राप्त हुआ!\n\nवाक पहचान प्रणाली द्वारा अनुवाद:\n"कांके टोले में चापाकल की पाइप में जंग लगने से दूषित पानी निकल रहा है।"\n\nकृपया अपना स्थान साझा करें ताकि आधिकारिक टिकट बनाया जा सके।'
        : language === 'sat'
        ? 'ᱟᱲᱟᱝ ᱧᱟᱢ ᱮᱱᱟ!\n\nᱟᱲᱟᱝ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱛᱮ ᱚᱞ ᱮᱱᱟ:\n"ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱯᱟᱭᱤᱯ ᱵᱟᱹᱲᱤᱡ ᱛᱮ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾"\n\nᱴᱤᱠᱮᱴ ᱵᱮᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱷᱮᱡᱟᱭ ᱢᱮ᱾'
        : 'Voice note received!\n\nAutomated Speech Recognition transcription:\n"Broken handpump casing with reddish iron water for three months."\n\nPlease share your location to generate a registered ticket.';

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'voice',
      voiceDuration: '0:14',
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
        text: botResponseText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

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
    return 'JAGRIT Seva Bot';
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
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Bot className="w-3.5 h-3.5 text-[#16A34A]" />
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
      <div className="bg-[#ECE5DD] rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800 max-w-lg mx-auto flex flex-col h-[680px]">
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-sm z-10 select-none">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-white hover:opacity-80 md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-amber-300 flex items-center justify-center font-black text-amber-300 text-lg">
              J
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-sm">{getHeaderTitle()}</h3>
                <span className="text-[#25D366] text-xs font-bold">✓</span>
              </div>
              <p className="text-[11px] text-emerald-100">{getHeaderSubtitle()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-white/90">
            <Video className="w-4 h-4 cursor-pointer" />
            <Phone className="w-4 h-4 cursor-pointer" />
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
          <div className="relative z-10 mx-auto max-w-xs bg-[#FFEECD] text-[#54656F] text-[10px] text-center p-2 rounded-lg shadow-xs border border-[#FFE0A3] flex items-center justify-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
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
                  className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-xs space-y-1.5 ${
                    isUser
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  {m.type === 'image' && m.mediaUrl && (
                    <div className="rounded-xl overflow-hidden border border-emerald-300/60 mb-1">
                      <img src={m.mediaUrl} alt="Uploaded site evidence" className="w-full h-36 object-cover" />
                    </div>
                  )}

                  {m.type === 'voice' && (
                    <div className="flex items-center space-x-3 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
                      <div className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-0.5 h-4">
                          {[4, 10, 16, 8, 14, 20, 12, 6, 18, 14, 8, 12, 16, 6].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${h}px` }}
                              className="w-1 bg-[#075E54] rounded-full inline-block"
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                          <span>{m.voiceDuration || '0:14'}</span>
                          <span>{language === 'hi' ? 'आवाज़ रिकॉर्डिंग' : language === 'sat' ? 'ᱟᱲᱟᱝ' : 'Voice Note'}</span>
                        </div>
                      </div>
                      <Mic className="w-4 h-4 text-[#075E54]" />
                    </div>
                  )}

                  {m.type === 'location' && m.locationDetails && (
                    <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-xs space-y-1.5 p-2">
                      <div className="bg-slate-900 h-24 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="text-center space-y-1">
                          <MapPin className="w-6 h-6 text-red-500 mx-auto animate-bounce" />
                          <span className="text-[10px] text-slate-300 font-mono">
                            {m.locationDetails.lat}° N, {m.locationDetails.lon}° E
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#075E54]" />
                          <span>{m.locationDetails.name}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {m.type === 'ticket' && m.ticketData && (
                    <div className="bg-white rounded-xl p-3 border-2 border-emerald-600 space-y-2 text-xs">
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
                <span className="text-[11px] text-[#075E54] font-medium">
                  {language === 'hi' ? 'टाइप किया जा रहा है' : language === 'sat' ? 'ᱚᱞᱚᱜ ᱠᱟᱱᱟ' : 'Typing'}
                </span>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce"
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
              className="flex items-center justify-center space-x-1 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
            >
              <Camera className="w-4 h-4 text-[#075E54]" />
              <span className="truncate">{t('whatsapp', 'sendPhoto', 'Photo')}</span>
            </button>

            <button
              type="button"
              onClick={handleSendVoiceNote}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
            >
              <Mic className="w-4 h-4 text-amber-600" />
              <span className="truncate">{t('whatsapp', 'sendVoice', 'Voice')}</span>
            </button>

            <button
              type="button"
              onClick={handleShareLocation}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-red-50 text-slate-800 border border-slate-300 rounded-xl min-h-[48px] py-2 px-1 text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-red-500" />
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
              className="w-11 h-11 min-h-[48px] min-w-[48px] rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-md active:scale-95"
            >
              <Send className="w-4 h-4 fill-white ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendVoiceNote}
              className="w-11 h-11 min-h-[48px] min-w-[48px] rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-md active:scale-95"
            >
              <Mic className="w-4 h-4 text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
