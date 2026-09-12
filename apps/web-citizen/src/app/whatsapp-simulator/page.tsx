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
  Volume2,
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
  const { language } = useCitizen();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialBotGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'bot',
    type: 'text',
    text:
      language === 'hi'
        ? 'जोहार! झारखण्ड जन-समस्या नवाचार (JAGRIT Seva Bot) में आपका स्वागत है।\n\nJohar! Apni samasya ki photo ya voice note bhejein taaki hum turant karyawahi kar sakein.'
        : language === 'sat'
        ? 'ᱡᱚᱦᱟᱨ! ᱡᱟᱜᱽᱨᱤᱛ (JAGRIT Seva Bot) ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾\n\nJohar! Apni samasya ki photo ya voice note bhejein.'
        : 'Johar! Welcome to JAGRIT Seva Bot (Govt. of Jharkhand).\n\nPlease send a photo of the civic defect, a voice note in Hindi/Santhali, or share your live location.',
    time: '10:00 AM',
    isRead: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotGreeting]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

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
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'image',
      text: 'कांके वार्ड 3 चापाकल की पाइप में जंग और दूषित पानी।',
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
        text: '📸 Photo prapt hui!\n\n🤖 CV AI dwara jaanch sampann:\n• Bounding Box 1: 🟢 Iron Effluent (94% confidence)\n• Bounding Box 2: 🔴 Pipe Corrosion (88% confidence)\n\nKripya niche die gae button se apni Live Location share karein taaki hum 500m radius mein deduplication kar sakein.',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1400);
  };

  // Action 2: User Sends Voice Note
  const handleSendVoiceNote = () => {
    const time = getCurrentTime();
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
        text:
          language === 'hi'
            ? '🎙️ Voice Note Prapt hua!\n\n📝 ASR Bhashini Anuvaad:\n"हमारे टोले में चापाकल पिछले 3 महीनों से खराब पड़ा है। जल स्तर नीचे जाने और जंग लगने से दूषित पानी निकल रहा है।"\n\nBhasha: Hindi / Santhali (Confidence 98%). Kripya apni live location share karein.'
            : '🎙️ Voice Note Received!\n\n📝 ASR Transcription (Hindi/Santhali):\n"Broken handpump in Kanke village with red water effluent for 3 months."\n\nPlease share your Live Location to generate an official grievance ticket.',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1400);
  };

  // Action 3: User Shares Live Location & Receives Ticket #JAG-4102
  const handleShareLocation = () => {
    const time = getCurrentTime();
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
        text: 'Ticket #JAG-4102 darj kar liya gaya hai.',
        ticketData: {
          ticketNumber: 'JAG-4102',
          domain: 'Drinking Water & Handpump (चापाकल)',
          location: 'Kanke Panchayat, Ranchi (23.3441° N, 85.3096° E)',
          triageType: 'Type B (Applied HEI R&D Track)',
          universities: ['BIT Mesra', 'NIT Jamshedpur', 'Ranchi University'],
          dashboardUrl: '/dashboard?id=JAG-4102',
        },
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, ticketMsg]);
    }, 1600);
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
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: 'text',
        text:
          'Dhanyawad! Apka sandesh prapt hua. Kripya samasya ki photo [📷 Send Photo], voice note [🎙️ Send Voice Note] ya location [📍 Share Location] share karein taaki ticket generate kiya jaa sake.',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleResetChat = () => {
    setMessages([initialBotGreeting]);
    setActiveStep(0);
    setIsTyping(false);
    setInputText('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Page Title & Context Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Bot className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Task 1.1.3: WhatsApp Ingestion Simulator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            WhatsApp Civic Ingestion Mockup
          </h1>
          <p className="text-xs text-slate-500">
            Simulating zero-barrier rural reporting via WhatsApp Web/Mobile with AI classification
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="inline-flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-xs hover:bg-slate-50 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* WhatsApp Frame Mockup Container */}
      <div className="bg-[#ECE5DD] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 max-w-lg mx-auto flex flex-col h-[680px]">
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md z-10 select-none">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-white hover:opacity-80 md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* Official Avatar with Verified Green Shield */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-amber-400 flex items-center justify-center font-black text-amber-300 text-lg shadow-md">
                J
              </div>
              {/* Verified Green Checkmark Badge */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#25D366] border border-white flex items-center justify-center text-white"
                title="Verified Official Bot"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-sm tracking-wide">JAGRIT Seva Bot</h3>
                {/* Green checkmark text badge */}
                <span className="text-[#25D366] text-xs font-bold" title="Official Government Verified">
                  ✓
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 leading-tight">
                Official Govt of Jharkhand Civic Bot • online
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-white/90">
            <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
            <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
          {/* Subtle WhatsApp Wallpaper background pattern */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* End-to-End Encryption Security Banner */}
          <div className="relative z-10 mx-auto max-w-xs bg-[#FFEECD] text-[#54656F] text-[10px] text-center p-2 rounded-lg shadow-xs border border-[#FFE0A3] flex items-center justify-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
            <span>Messages and calls are end-to-end encrypted. Govt of Jharkhand Verified Portal.</span>
          </div>

          {/* Date Stamp Pill */}
          <div className="relative z-10 flex justify-center">
            <span className="bg-white/80 backdrop-blur px-3 py-0.5 rounded-full text-[10px] font-semibold text-slate-500 uppercase tracking-wider shadow-xs">
              TODAY
            </span>
          </div>

          {/* Render Messages */}
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`relative z-10 flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-sm space-y-1.5 ${
                    isUser
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  {/* Photo Bubble */}
                  {m.type === 'image' && m.mediaUrl && (
                    <div className="rounded-xl overflow-hidden border border-emerald-300/60 mb-1">
                      <img src={m.mediaUrl} alt="Uploaded site" className="w-full h-36 object-cover" />
                    </div>
                  )}

                  {/* Voice Note Bubble */}
                  {m.type === 'voice' && (
                    <div className="flex items-center space-x-3 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center shadow-xs"
                      >
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </button>
                      <div className="flex-1 space-y-1">
                        {/* Audio Wave Simulation */}
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
                          <span>Voice Note (Bhashini)</span>
                        </div>
                      </div>
                      <Mic className="w-4 h-4 text-[#075E54]" />
                    </div>
                  )}

                  {/* Location Card Bubble */}
                  {m.type === 'location' && m.locationDetails && (
                    <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-xs space-y-1.5 p-2">
                      <div className="bg-slate-900 h-24 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Mini Map Graphic */}
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
                        <p className="text-[10px] text-slate-500">Live GPS Verified via Citizen Device</p>
                      </div>
                    </div>
                  )}

                  {/* AI Generated Ticket Card */}
                  {m.type === 'ticket' && m.ticketData && (
                    <div className="bg-emerald-50 rounded-xl p-3 border-2 border-[#044728] space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                        <span className="font-bold text-emerald-950 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Official Ticket Generated</span>
                        </span>
                        <span className="font-mono font-black text-[#044728] bg-white px-2 py-0.5 rounded border border-emerald-300">
                          #{m.ticketData.ticketNumber}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-700">
                        <p>
                          <strong className="text-slate-900">📌 Shreni:</strong> {m.ticketData.domain}
                        </p>
                        <p>
                          <strong className="text-slate-900">📍 Sthan:</strong> {m.ticketData.location}
                        </p>
                        <p>
                          <strong className="text-slate-900">🤖 AI Triage:</strong>{' '}
                          <span className="text-[#044728] font-bold">{m.ticketData.triageType}</span>
                        </p>
                        <p>
                          <strong className="text-slate-900">🏛️ 10-Day Bidding:</strong>{' '}
                          {m.ticketData.universities.join(', ')}
                        </p>
                      </div>

                      <Link
                        href={m.ticketData.dashboardUrl}
                        className="inline-flex items-center space-x-1 bg-[#044728] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xs hover:bg-[#03361e] transition-all"
                      >
                        <span>View Live Status on Dashboard</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  )}

                  {/* Standard Text */}
                  {m.text && <p className="whitespace-pre-line leading-relaxed">{m.text}</p>}

                  {/* Timestamp & Read Receipts */}
                  <div className="flex items-center justify-end space-x-1 text-[9px] text-slate-400 mt-0.5">
                    <span>{m.time}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-sky-500" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="relative z-10 flex justify-start animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 text-xs shadow-sm border border-slate-200 flex items-center space-x-1.5">
                <span className="text-[11px] text-[#075E54] font-medium">JAGRIT Seva Bot is typing</span>
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

        {/* Interactive Simulated Action Buttons Bar */}
        <div className="bg-slate-100/90 border-t border-slate-300 p-2 space-y-1.5 z-10">
          <div className="text-[10px] font-bold text-slate-500 px-1 flex items-center justify-between">
            <span>Simulate Citizen Actions (Click to Trigger Flow):</span>
            <span className="text-[#075E54]">Step {activeStep}/3</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleSendPhoto}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-emerald-50 text-slate-800 hover:text-[#075E54] border border-slate-300 rounded-xl py-2 px-1 text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
            >
              <Camera className="w-3.5 h-3.5 text-[#075E54]" />
              <span className="truncate">📷 Send Photo</span>
            </button>

            <button
              type="button"
              onClick={handleSendVoiceNote}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-amber-50 text-slate-800 hover:text-[#D97706] border border-slate-300 rounded-xl py-2 px-1 text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
            >
              <Mic className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="truncate">🎙️ Send Voice</span>
            </button>

            <button
              type="button"
              onClick={handleShareLocation}
              disabled={isTyping}
              className="flex items-center justify-center space-x-1 bg-white hover:bg-red-50 text-slate-800 hover:text-red-600 border border-slate-300 rounded-xl py-2 px-1 text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span className="truncate">📍 Share Location</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Message Input Bar */}
        <form
          onSubmit={handleSendText}
          className="bg-[#F0F2F5] p-2.5 flex items-center space-x-2 border-t border-slate-300 z-10"
        >
          <button type="button" className="text-slate-500 hover:text-slate-700 p-1">
            <Smile className="w-5 h-5" />
          </button>
          <button type="button" className="text-slate-500 hover:text-slate-700 p-1">
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white rounded-full py-2 px-4 text-xs text-slate-800 border-none focus:outline-none shadow-xs"
          />

          {inputText.trim() ? (
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-md hover:bg-[#008069] transition-all"
            >
              <Send className="w-4 h-4 fill-white ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendVoiceNote}
              className="w-9 h-9 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-md hover:bg-[#008069] transition-all"
            >
              <Mic className="w-4 h-4 text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
