'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
  Landmark,
  Link2,
  MapPin,
  Mic,
  MoreVertical,
  Paperclip,
  Pause,
  Phone,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Video,
  Volume2,
} from 'lucide-react';
import { sendWhatsAppWebhookPayload } from '@/services/api';

export type JuryScenario = 'pothole' | 'palamu' | 'emergency';
type ChatStep = 0 | 1 | 2 | 3 | 4;
type MessageType = 'text' | 'voice' | 'photo' | 'location' | 'triage' | 'outcome';

type ChatMessage = {
  id: string;
  sender: 'bot' | 'user';
  type: MessageType;
  text?: string;
  time: string;
  audioUrl?: string;
  duration?: number;
};

type ScenarioDefinition = {
  label: string;
  title: string;
  detail: string;
  location: { name: string; lat: number; lon: number };
  triage: string;
  outcome: 'reroute' | 'duplicate' | 'emergency';
};

const SCENARIOS: Record<JuryScenario, ScenarioDefinition> = {
  pothole: {
    label: 'Scenario A · Routine municipal pothole',
    title: 'Routine municipal pothole',
    detail: 'Type A Civic Gate: route to JharSewa ULB without R&D escalation.',
    location: { name: 'Kanke, Ranchi', lat: 23.3441, lon: 85.3096 },
    triage: 'DeBERTa-v3: Type A Civic Gate · confidence 0.91',
    outcome: 'reroute',
  },
  palamu: {
    label: 'Scenario B · Poisonous red water in Palamu',
    title: 'Poisonous red water in Palamu',
    detail: 'Type B R&D flow with a 500 m PostGIS cluster match.',
    location: { name: 'Chianki, Daltonganj, Palamu', lat: 24.03, lon: 84.07 },
    triage: 'DeBERTa-v3: Type B R&D · D = 0.89 · 500 m cluster match',
    outcome: 'duplicate',
  },
  emergency: {
    label: 'Scenario C · Acute toxicity emergency',
    title: 'Acute toxicity emergency',
    detail: 'S_health >= 90: emergency bypass to district health control room.',
    location: { name: 'Lesliganj, Palamu', lat: 24.0384, lon: 84.0706 },
    triage: 'DeBERTa-v3: S_health = 94 · emergency bypass active',
    outcome: 'emergency',
  },
};

const sampleTranscript = 'Chapekal khon laal daah oḍok kan-a';

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createSampleVoiceUrl() {
  const sampleRate = 8000;
  const seconds = 20;
  const samples = sampleRate * seconds;
  const buffer = new ArrayBuffer(44 + samples);
  const view = new DataView(buffer);
  const write = (offset: number, value: string) => [...value].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)));
  write(0, 'RIFF'); view.setUint32(4, 36 + samples, true); write(8, 'WAVE'); write(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate, true); view.setUint16(32, 1, true); view.setUint16(34, 8, true); write(36, 'data'); view.setUint32(40, samples, true);
  for (let index = 0; index < samples; index += 1) {
    const time = index / sampleRate;
    const cadence = Math.max(0, Math.sin(time * Math.PI * 1.8));
    const tone = Math.sin(time * Math.PI * 2 * 210) * 0.6 + Math.sin(time * Math.PI * 2 * 390) * 0.25;
    view.setUint8(44 + index, Math.max(0, Math.min(255, 128 + tone * cadence * 80)));
  }
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

function BubbleMeta({ message }: { message: ChatMessage }) {
  return <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400"><span>{message.time}</span>{message.sender === 'user' && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}</div>;
}

function VoicePlayer({ message, playing, progress, onToggle, onSeek }: { message: ChatMessage; playing: boolean; progress: number; onToggle: () => void; onSeek: (value: number) => void }) {
  const bars = [7, 13, 10, 19, 11, 24, 15, 9, 18, 25, 14, 20, 10, 17, 23, 12, 8, 19, 14, 11, 21, 16, 9, 18, 13, 22, 15, 8];
  return <div className="min-w-[235px] space-y-2 rounded-xl bg-white/80 p-2.5"><div className="flex items-center gap-2.5"><button type="button" onClick={onToggle} aria-label={playing ? 'Pause voice note' : 'Play voice note'} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#128c7e] text-white shadow-sm">{playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="ml-0.5 h-4 w-4 fill-white" />}</button><div className="flex flex-1 items-center gap-1" aria-label="Voice waveform">{bars.map((height, index) => <span key={index} className={`w-1 rounded-full ${index / bars.length <= progress ? 'bg-[#128c7e]' : 'bg-[#b9d9d4]'} ${playing ? 'transition-all duration-300' : ''}`} style={{ height }} />)}</div><Volume2 className="h-4 w-4 text-[#128c7e]" /></div><input type="range" min="0" max="1" step="0.01" value={progress} onChange={(event) => onSeek(Number(event.target.value))} className="h-1 w-full accent-[#128c7e]" /><div className="flex justify-between text-[10px] font-mono text-slate-500"><span>{playing ? `${Math.floor(progress * 20)}s` : '0:20'}</span><span>Santhali / Hindi</span></div></div>;
}

export default function WhatsAppChatWindow({ scenario, onScenarioChange }: { scenario: JuryScenario; onScenarioChange: (scenario: JuryScenario) => void }) {
  const definition = SCENARIOS[scenario];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const greeting = useMemo(() => ({ id: 'welcome', sender: 'bot' as const, type: 'text' as const, time: '10:00 AM', text: 'Johar! Welcome to JAGRIT Seva Bot. Send a voice note, photo, or live location to report a village problem.' }), []);

  useEffect(() => { setMessages([greeting]); setStep(0); setTyping(false); setInput(''); }, [greeting, scenario]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => () => { timersRef.current.forEach(clearTimeout); audioRef.current?.pause(); if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current); }, []);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'time'>) => setMessages((current) => [...current, { ...message, id: `${message.type}-${Date.now()}-${Math.random()}`, time: currentTime() }]);
  const later = (callback: () => void, delay: number) => { const timer = setTimeout(callback, delay); timersRef.current.push(timer); };

  const acknowledgeGreeting = (label: string, voice = false) => {
    if (step > 0 || typing) return;
    void sendWhatsAppWebhookPayload({ event: voice ? 'voice_note' : 'message', text: label, language: voice ? 'sat' : 'en', scenario });
    addMessage(voice ? { sender: 'user', type: 'voice', audioUrl: sampleVoiceUrl(), duration: 20 } : { sender: 'user', type: 'text', text: label });
    setTyping(true);
    later(() => { setTyping(false); setStep(1); addMessage({ sender: 'bot', type: 'text', text: 'जोहार! आपकी आवाज़ दर्ज हो गई है (Transcribed: Chapekal khon laal daah oḍok kan-a). कृपया प्रभावित स्थल का फोटो या Live Location साझा करें।' }); }, 280);
  };

  const sampleVoiceUrl = () => { if (!audioUrlRef.current) audioUrlRef.current = createSampleVoiceUrl(); return audioUrlRef.current; };

  const sendPhoto = () => {
    if (step < 1 || typing) return;
    void sendWhatsAppWebhookPayload({ event: 'photo', scenario, ticketId: 'JAG-PLM-0082' });
    addMessage({ sender: 'user', type: 'photo', text: 'Site photo · visual evidence' });
    setStep(2);
    setTyping(true);
    later(() => { setTyping(false); addMessage({ sender: 'bot', type: 'text', text: 'फोटो प्राप्त हुई। अब कृपया 500m क्षेत्र सत्यापन के लिए अपना Live Location साझा करें।' }); }, 280);
  };

  const shareLocation = () => {
    if (step < 1 || typing) return;
    void sendWhatsAppWebhookPayload({ event: 'live_location', scenario, location: definition.location });
    addMessage({ sender: 'user', type: 'location', text: definition.location.name });
    setStep(3); setTyping(true);
    later(() => { setTyping(false); setStep(4); addMessage({ sender: 'bot', type: 'triage', text: 'AI processing complete' }); }, 720);
    later(() => {
      const outcomeText = definition.outcome === 'duplicate'
        ? 'आपकी समस्या पहले से दर्ज है। Master Incident Cluster #JAG-PLM-0082 में आपका +1 Upvote दर्ज कर लिया गया है।'
        : definition.outcome === 'reroute'
        ? 'नई समस्या पंजीकृत! Master Ticket ID: #JAG-PLM-0082. यह Type A Civic Gate मामला है और JharSewa ULB को त्वरित नगर निकाय कार्रवाई के लिए भेज दिया गया है। ट्रैक करने हेतु लिंक: jagrit.jharkhand.gov.in/progress?id=JAG-PLM-0082'
        : 'S_health >= 90: Emergency bypass सक्रिय। जिला स्वास्थ्य नियंत्रण कक्ष को तत्काल सूचित किया गया है। कृपया 108 पर भी कॉल करें।';
      addMessage({ sender: 'bot', type: 'outcome', text: outcomeText });
    }, 1050);
  };

  const sendText = (event: React.FormEvent) => { event.preventDefault(); const value = input.trim(); if (!value) return; setInput(''); if (/^(johar|namaste)$/i.test(value)) acknowledgeGreeting(value); else addMessage({ sender: 'user', type: 'text', text: value }); };
  const toggleAudio = (message: ChatMessage) => { if (!message.audioUrl) return; if (!audioRef.current || playingId !== message.id) { audioRef.current?.pause(); const audio = new Audio(message.audioUrl); audioRef.current = audio; audio.ontimeupdate = () => setProgress((audio.currentTime || 0) / 20); audio.onended = () => { setPlayingId(null); setProgress(0); }; void audio.play(); setPlayingId(message.id); } else { audioRef.current.pause(); setPlayingId(null); } };
  const seekAudio = (value: number) => { if (audioRef.current) audioRef.current.currentTime = value * 20; setProgress(value); };
  const reset = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; audioRef.current?.pause(); setPlayingId(null); setProgress(0); setMessages([greeting]); setStep(0); setTyping(false); };

  return <div className="grid gap-5 xl:grid-cols-[minmax(0,42rem)_18rem]">
    <section className="overflow-hidden rounded-[1.5rem] border-4 border-[#202c33] bg-[#efeae2] shadow-2xl">
      <header className="flex min-h-[4.5rem] items-center justify-between bg-[#075e54] px-4 text-white"><div className="flex items-center gap-3"><Link href="/" className="md:hidden"><ChevronDown className="h-5 w-5 rotate-90" /></Link><div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#d9e7e3] text-[#075e54]"><Landmark className="h-6 w-6" /><span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-0.5"><ShieldCheck className="h-3 w-3 fill-[#25d366] text-[#075e54]" /></span></div><div><div className="flex items-center gap-1.5"><h1 className="text-sm font-bold">JAGRIT Seva Bot (DHTE Govt of Jharkhand)</h1><CheckCircle2 className="h-4 w-4 fill-[#25d366] text-white" /></div><p className="text-[11px] text-emerald-100">Online · Official civic service</p></div></div><div className="flex items-center gap-4"><Video className="h-4 w-4" /><Phone className="h-4 w-4" /><MoreVertical className="h-5 w-5" /></div></header>
      <div className="relative flex h-[35rem] flex-col bg-[#efeae2] bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,.035)_0_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(0,0,0,.03)_0_1px,transparent_1px)] bg-[length:26px_26px]">
        <div className="m-3 flex items-center justify-center gap-1.5 self-center rounded-lg bg-[#fff3c4] px-3 py-1.5 text-center text-[10px] text-[#54656f] shadow-sm"><ShieldCheck className="h-3.5 w-3.5 text-[#8696a0]" /> Messages are end-to-end encrypted</div>
        <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-4 sm:px-5">{messages.map((message) => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-lg px-2.5 py-1.5 text-xs shadow-sm ${message.sender === 'user' ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'}`}>
          {message.type === 'photo' && <div className="mb-1 flex h-28 w-52 items-center justify-center rounded-md bg-gradient-to-br from-slate-700 to-amber-700 text-white"><ImageIcon className="h-8 w-8" /><span className="ml-2 text-[10px] font-bold">Photo evidence</span></div>}
          {message.type === 'location' && <div className="mb-1 w-56 overflow-hidden rounded-md border border-emerald-200 bg-emerald-50"><div className="flex h-20 items-center justify-center bg-[#d7ece4]"><MapPin className="h-8 w-8 animate-bounce text-[#128c7e]" /></div><div className="p-2 text-[11px] font-bold text-slate-700">{definition.location.name}<br /><span className="font-mono font-normal text-slate-500">Lat: {definition.location.lat} · Lng: {definition.location.lon}</span></div></div>}
          {message.type === 'voice' && <VoicePlayer message={message} playing={playingId === message.id} progress={playingId === message.id ? progress : 0} onToggle={() => toggleAudio(message)} onSeek={seekAudio} />}
          {message.type === 'triage' && <div className="space-y-2 rounded-md border border-emerald-200 bg-emerald-50 p-2.5 text-[11px] text-emerald-950"><div className="flex items-center gap-1.5 font-black"><Sparkles className="h-3.5 w-3.5" /> PostGIS + DeBERTa-v3 triage</div><p>{definition.triage}</p><div className="h-1.5 overflow-hidden rounded-full bg-emerald-200"><div className="h-full w-full animate-pulse rounded-full bg-emerald-600" /></div></div>}
          {message.type === 'outcome' && <div className="space-y-2"><div className="flex items-center gap-1.5 font-black text-[#075e54]"><CheckCircle2 className="h-4 w-4" /> JAGRIT routing result</div><p className="whitespace-pre-line leading-relaxed">{message.text}</p>{definition.outcome === 'duplicate' && <Link href="/progress?id=JAG-PLM-0082" className="inline-flex items-center gap-1 font-bold text-[#075e54]">Open cluster <Link2 className="h-3.5 w-3.5" /></Link>}</div>}
          {message.text && !['outcome', 'triage'].includes(message.type) && <p className="whitespace-pre-line leading-relaxed">{message.text}</p>}<BubbleMeta message={message} />
        </div></div>)}{typing && <div className="flex justify-start"><div className="flex items-center gap-2 rounded-lg rounded-tl-none bg-white px-3 py-2 text-[11px] text-slate-500 shadow-sm"><span>typing</span><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#128c7e]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#128c7e] [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#128c7e] [animation-delay:300ms]" /></span></div></div>}<div ref={endRef} /></div>
        <div className="space-y-2 border-t border-[#d7d0c8] bg-[#f0f2f5] p-2"><div className="flex gap-2 overflow-x-auto pb-0.5"><button type="button" onClick={() => acknowledgeGreeting('Johar')} disabled={step > 0 || typing} className="min-h-9 shrink-0 rounded-full border border-[#b7d8d1] bg-white px-3 text-[11px] font-bold text-[#075e54] disabled:opacity-40">Johar</button><button type="button" onClick={() => acknowledgeGreeting('Namaste')} disabled={step > 0 || typing} className="min-h-9 shrink-0 rounded-full border border-[#b7d8d1] bg-white px-3 text-[11px] font-bold text-[#075e54] disabled:opacity-40">Namaste</button><button type="button" onClick={() => acknowledgeGreeting(sampleTranscript, true)} disabled={step > 0 || typing} className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full border border-[#b7d8d1] bg-white px-3 text-[11px] font-bold text-[#075e54] disabled:opacity-40"><Mic className="h-3.5 w-3.5" /> Play 0:20 sample</button></div><div className="grid grid-cols-2 gap-2"><button type="button" onClick={sendPhoto} disabled={step < 1 || typing} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-white px-2 text-[11px] font-bold text-slate-700 shadow-sm disabled:opacity-40"><ImageIcon className="h-4 w-4 text-[#128c7e]" /> Send Photo</button><button type="button" onClick={shareLocation} disabled={step < 1 || typing} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-white px-2 text-[11px] font-bold text-slate-700 shadow-sm disabled:opacity-40"><MapPin className="h-4 w-4 text-[#128c7e]" /> Share Live Location Pin (Lat: {definition.location.lat}, Lng: {definition.location.lon})</button></div><div className="flex items-center gap-2"><Smile className="h-5 w-5 text-slate-500" /><Paperclip className="h-5 w-5 text-slate-500" /><form onSubmit={sendText} className="flex flex-1 items-center gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type Johar or Namaste..." className="min-h-10 flex-1 rounded-full border-0 bg-white px-4 text-xs outline-none ring-[#128c7e] focus:ring-2" /><button type="submit" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#128c7e] text-white"><Send className="h-4 w-4" /></button></form></div></div>
      </div>
    </section>
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#128c7e]">Developer / Jury</p><h2 className="mt-1 text-lg font-black text-slate-950">Scenario control</h2></div><button type="button" onClick={reset} aria-label="Reset chat" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><RotateCcw className="h-4 w-4" /></button></div><div className="mt-4 space-y-2">{(Object.keys(SCENARIOS) as JuryScenario[]).map((key) => <button key={key} type="button" onClick={() => { onScenarioChange(key); reset(); }} className={`w-full rounded-xl border p-3 text-left transition-colors ${scenario === key ? 'border-[#128c7e] bg-emerald-50 ring-2 ring-emerald-100' : 'border-slate-200 hover:bg-slate-50'}`}><p className="text-xs font-black text-slate-900">{SCENARIOS[key].label}</p><p className="mt-1 text-[11px] leading-4 text-slate-600">{SCENARIOS[key].detail}</p></button>)}</div><div className="mt-4 rounded-xl bg-slate-950 p-3 text-[11px] text-slate-300"><p className="font-black text-emerald-300">Current pipeline</p><ol className="mt-2 space-y-1.5"><li className={step >= 1 ? 'text-white' : ''}>01 · Voice / text intake</li><li className={step >= 2 ? 'text-white' : ''}>02 · Photo / location evidence</li><li className={step >= 3 ? 'text-white' : ''}>03 · 500m PostGIS search</li><li className={step >= 4 ? 'text-white' : ''}>04 · Routing outcome</li></ol></div><p className="mt-4 text-[10px] leading-4 text-slate-500">Demo controls simulate the DHTE execution pipeline. No production report is created.</p></aside>
  </div>;
}