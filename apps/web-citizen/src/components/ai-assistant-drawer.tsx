'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HeartHandshake, LifeBuoy, Loader2, Send, X } from 'lucide-react';
import { aiClient, CopilotQueryResult } from '@/lib/ai-client';
import { useLanguage } from '@/context/LanguageContext';

type CitizenLanguage = 'hi' | 'sat' | 'en';

type Challenge = {
  ticket_number?: string;
  title?: string;
  description?: string;
  district?: string;
  status?: string;
};

type CitizenCopy = {
  triggerButton: string;
  drawerHeader: string;
  drawerSubtitle: string;
  greeting: string;
  cardReportTitle: string;
  cardReportDesc: string;
  cardTrackTitle: string;
  cardTrackDesc: string;
  cardQuorumTitle: string;
  cardQuorumDesc: string;
  quorumPortalButton: string;
  inputPlaceholder: string;
};

type LocalizedStatus = Record<CitizenLanguage, string>;

const COPY: Record<CitizenLanguage, CitizenCopy> = {
  hi: {
    triggerButton: '🤝 जन-सहायक',
    drawerHeader: 'जाग्रत जन-सहायक',
    drawerSubtitle: 'नागरिक समस्या समाधान एवं सेवा केंद्र',
    greeting: 'जोहार! जाग्रत जन-सहायक में आपका स्वागत है। आज आपके गांव या टोले की किस समस्या में हम आपकी सहायता कर सकते हैं?',
    cardReportTitle: '📝 नई समस्या दर्ज करें',
    cardReportDesc: 'चापाकल, पानी, सड़क या बिजली की शिकायत बोलकर या फोटो से दर्ज करें',
    cardTrackTitle: '🔍 अपने टिकट का स्टेटस जानें',
    cardTrackDesc: 'अपनी पूर्व शिकायत का स्टेटस और समाधान की प्रगति देखें',
    cardQuorumTitle: '🗳️ ४५-दिन ग्राम सभा कोरम क्या है?',
    cardQuorumDesc: 'मशीन लगने के बाद 45 दिन तक चलने पर ग्राम सभा के नागरिक व ट्रस्टी वोट करते हैं। 70% हाँ मिलने पर ही काम पूरा माना जाता है।',
    quorumPortalButton: '🗳️ ग्राम सभा फीडबैक एवं कोरम पोर्टल खोलें',
    inputPlaceholder: 'अपनी समस्या लिखें या टिकट नंबर दर्ज करें (उदा. JAG-2026-PAL-3785)...',
  },
  sat: {
    triggerButton: '🤝 ᱡᱟᱱ-ᱜᱚᱲᱚ',
    drawerHeader: 'ᱡᱟᱜᱽᱨᱟᱛ ᱡᱟᱱ-ᱜᱚᱲᱚᱭᱤᱡ',
    drawerSubtitle: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱜᱚᱲᱚ ᱥᱮᱵᱟ',
    greeting: 'ᱡᱚᱦᱟᱨ! ᱡᱟᱜᱽᱨᱟᱛ ᱡᱟᱱ-ᱜᱚᱲᱚᱭᱤᱡ ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ ᱾ ᱛᱮᱦᱮᱧ ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱪᱮᱫ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮ ᱜᱚᱲᱚ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ?',
    cardReportTitle: '📝 ᱱᱟᱶᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ/ᱨᱚᱲ ᱢᱮ',
    cardReportDesc: 'ᱫᱟᱜ, ᱥᱟᱲᱟᱠ ᱥᱮ ᱵᱤᱡᱽᱞᱤ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱵᱷᱮᱡᱟᱭ ᱢᱮ',
    cardTrackTitle: '🔍 ᱴᱤᱠᱤᱴ ᱨᱮᱭᱟᱜ ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ',
    cardTrackDesc: 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱠᱟ ᱦᱟᱹᱵᱤᱡ ᱥᱮᱴᱮᱨ ᱮᱱᱟ ᱧᱮᱞ ᱢᱮ',
    cardQuorumTitle: '🗳️ ᱔᱕ ᱢᱟᱦᱟᱸ ᱟᱹᱛᱩ ᱜᱽᱨᱟᱢ ᱥᱚᱵᱷᱟ ᱵᱷᱳᱴ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    cardQuorumDesc: '᱔᱕ ᱢᱟᱦᱟᱸ ᱢᱮᱥᱤᱱ ᱪᱟᱞᱟᱣ ᱛᱟᱭᱚᱢ ᱜᱽᱨᱟᱢ ᱥᱚᱵᱷᱟ ᱨᱮ ᱵᱷᱳᱴ ᱦᱩᱭᱩᱜᱼᱟ ᱾ ᱗᱐% ᱦᱮᱸ ᱞᱮᱱᱠᱷᱟᱱ ᱜᱮ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱢᱟᱱᱟᱣᱜᱼᱟ ᱾',
    quorumPortalButton: '🗳️ ᱜᱽᱨᱟᱢ ᱥᱚᱵᱷᱟ ᱯᱷᱤᱰᱵᱮᱠ ᱟᱨ ᱠᱳᱨᱚᱢ ᱯᱳᱨᱴᱟᱞ ᱡᱷᱤᱡ ᱢᱮ',
    inputPlaceholder: 'ᱟᱢᱟᱜ ᱠᱩᱠᱞᱤ ᱥᱮ ᱴᱤᱠᱤᱴ ᱱᱚᱢᱵᱚᱨ ᱚᱞ ᱢᱮ...',
  },
  en: {
    triggerButton: '🤝 Citizen Sahayak',
    drawerHeader: 'JAGRIT Jan-Sahayak',
    drawerSubtitle: 'Citizen Civic Grievance Helpdesk',
    greeting: 'Johar! Welcome to JAGRIT Jan-Sahayak. How can we help resolve your village problem today?',
    cardReportTitle: '📝 Report a Problem',
    cardReportDesc: 'Report drinking water, electricity or road defects via voice note or photo',
    cardTrackTitle: '🔍 Track Ticket Status',
    cardTrackDesc: 'Check ongoing progress and university assignment of your complaint',
    cardQuorumTitle: '🗳️ What is the 45-Day Village Quorum?',
    cardQuorumDesc: 'After installation, the unit runs for 45 days unassisted. On Day 46, villagers vote. 70% approval is required for sign-off.',
    quorumPortalButton: '🗳️ Go to Quorum Portal',
    inputPlaceholder: 'Type your query or enter ticket ID (e.g. JAG-2026-PAL-3785)...',
  },
};

const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const DEFAULT_TICKET = 'JAG-2026-PAL-3785';

const STATUS_COPY: Record<string, LocalizedStatus> = {
  PENDING_HITL: {
    en: 'Your issue is registered. State government evaluator technical verification is in progress.',
    hi: 'आपकी समस्या दर्ज हो चुकी है। राज्य मूल्यांकनकर्ता (Evaluator) द्वारा तकनीकी सत्यापन जारी है।',
    sat: 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱟᱠᱟᱱᱟ ᱾ ᱥᱚᱨᱠᱟᱨᱤ ᱡᱟᱹᱪᱤᱭᱟᱹ ᱱᱚᱶᱟ ᱧᱮᱞ ᱵᱤᱰᱟᱹᱣ ᱮᱫᱟᱭ ᱾',
  },
  OPEN_FOR_BIDS: {
    en: 'Issue verified! Qualified universities (BIT Mesra) are preparing engineering proposals.',
    hi: 'समस्या सत्यापित! बी.आई.टी. मेसरा (BIT Mesra) समाधान व फ़िल्टर तैयार कर रहे हैं।',
    sat: 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱡᱟᱹᱪ ᱦᱩᱭ ᱮᱱᱟ! ᱵᱤᱨᱞᱟ ᱴᱮᱠᱱᱚᱞᱚᱡᱤ ᱤᱱᱥᱴᱤᱪᱩᱴ (BIT Mesra) ᱱᱚᱶᱟ ᱨᱮᱭᱟᱜ ᱥᱟᱢᱟᱫᱷᱟᱱ ᱛᱮᱭᱟᱨ ᱮᱫᱟᱭ ᱾',
  },
  IN_PILOT: {
    en: 'Field pilot installed in your village. 45-day durability testing in progress.',
    hi: 'फ़िल्टर/मशीन गांव में स्थापित हो चुकी है। ४५-दिनों की फील्ड टेस्टिंग चल रही है।',
    sat: 'ᱢᱮᱥᱤᱱ ᱟᱹᱛᱩ ᱨᱮ ᱵᱟᱹᱭᱥᱟᱹᱣ ᱦᱩᱭ ᱮᱱᱟ ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱨᱮᱭᱟᱜ ᱯᱷᱤᱞᱰ ᱴᱮᱥᱴᱤᱝ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ ᱾',
  },
  QUORUM_PENDING: {
    en: 'Field pilot installed in your village. 45-day durability testing in progress.',
    hi: 'फ़िल्टर/मशीन गांव में स्थापित हो चुकी है। ४५-दिनों की फील्ड टेस्टिंग चल रही है।',
    sat: 'ᱢᱮᱥᱤᱱ ᱟᱹᱛᱩ ᱨᱮ ᱵᱟᱹᱭᱥᱟᱹᱣ ᱦᱩᱭ ᱮᱱᱟ ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱨᱮᱭᱟᱜ ᱯᱷᱤᱞᱰ ᱴᱮᱥᱴᱤᱝ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ ᱾',
  },
};

const PROGRESS_BUTTON: LocalizedStatus = {
  en: '📍 View on Live Progress Map',
  hi: '📍 लाइव प्रोग्रेस मैप पर देखें',
  sat: '📍 ᱞᱟᱭᱤᱵᱷ ᱯᱨᱚᱜᱽᱨᱮᱥ ᱢᱮᱯ ᱨᱮ ᱧᱮᱞ ᱢᱮ',
};

function statusText(status: string | undefined, language: CitizenLanguage): string {
  const localized = status ? STATUS_COPY[status]?.[language] : undefined;
  if (localized) return localized;
  switch (status) {
    case '100%_SOLVED': return language === 'en' ? 'Success! The solution was approved by the village quorum.' : language === 'sat' ? 'ᱥᱟᱯᱷᱟᱞ! ᱟᱹᱛᱩ ᱠᱳᱨᱚᱢ ᱥᱟᱶᱛᱮ ᱥᱟᱢᱟᱫᱷᱟᱱ ᱢᱟᱱᱟᱣ ᱮᱱᱟ ᱾' : 'सफलता! ग्राम सभा कोरम द्वारा समाधान स्वीकृत।';
    default: return language === 'en' ? 'Your complaint is registered and the responsible team is tracking its progress.' : language === 'sat' ? 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱟᱠᱟᱱᱟ ᱟᱨ ᱞᱟᱹᱜᱤᱫ ᱫᱚᱞ ᱱᱚᱶᱟ ᱧᱮᱞ ᱮᱫᱟᱭ ᱾' : 'आपकी शिकायत दर्ज है और संबंधित टीम इसकी प्रगति देख रही है।';
  }
}

function UniversityView() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CopilotQueryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try { setResult(await aiClient.queryCopilot(query)); } finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-700">Materials &amp; Warnings</p>
      {result ? <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-800">{result.answer}</div> : <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">Search the regional materials and failure registry.</p>}
      <form onSubmit={submit} className="flex gap-2">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search materials and warnings..." className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm" />
        <button type="submit" disabled={loading} className="rounded-xl bg-blue-800 p-2.5 text-white disabled:opacity-50" aria-label="Search materials"><Send className="h-4 w-4" /></button>
      </form>
    </div>
  );
}

export default function AIAssistantDrawer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const copy = COPY[language as CitizenLanguage] || COPY.en;
  const activeLanguage = (language as CitizenLanguage) || 'en';
  const isUniversity = pathname.startsWith('/university');
  const [isOpen, setIsOpen] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [ticketInput, setTicketInput] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [matchingChallenges, setMatchingChallenges] = useState<Challenge[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quorumExplainer, setQuorumExplainer] = useState(false);
  const ticketInputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const loadChallenges = async (): Promise<Challenge[]> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ROOT}/api/v1/challenges`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load challenges');
      const records = await response.json() as Challenge[];
      setChallenges(records);
      return records;
    } catch {
      setChallenges([]);
      return [];
    }
    finally { setLoading(false); }
  };

  const lookupTicket = async (ticket = ticketInput) => {
    const normalized = ticket.trim().toUpperCase();
    if (!normalized) return;
    setTicketInput(normalized);
    setNotFound(false);
    let records = challenges;
    if (!records.length) records = await loadChallenges();
    const found = records.find((challenge) => challenge.ticket_number?.toUpperCase() === normalized);
    setSelectedChallenge(found || null);
    setMatchingChallenges([]);
    setNotFound(!found);
  };

  useEffect(() => {
    if (isOpen && !isUniversity) void loadChallenges();
  }, [isOpen, isUniversity]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const handleTrack = () => {
    const latest = challenges.find((challenge) => !['100%_SOLVED', 'ROUTED_CIVIC'].includes(challenge.status || ''))?.ticket_number || DEFAULT_TICKET;
    ticketInputRef.current?.focus();
    setTicketInput(latest);
    void lookupTicket(latest);
  };

  const navigateAndClose = (path: string) => {
    setIsOpen(false);
    if (pathname !== path) router.push(path);
  };

  const handleQuerySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = ticketInput.trim();
    if (!normalized) return;
    const lowerQuery = normalized.toLocaleLowerCase();
    if (['quorum', 'voting', 'vote', 'कोरम', 'वोट'].some((keyword) => lowerQuery.includes(keyword))) {
      setQuorumExplainer(true);
      setSelectedChallenge(null);
      setMatchingChallenges([]);
      setNotFound(false);
      return;
    }
    if (/^JAG-\d{4}-[A-Z]{3}-\d+$/i.test(normalized)) {
      await lookupTicket(normalized);
      return;
    }
    const records = challenges.length ? challenges : await loadChallenges();
    const matches = records.filter((challenge) => [challenge.ticket_number, challenge.title, challenge.description, challenge.district]
      .some((field) => field?.toLocaleLowerCase().includes(lowerQuery)));
    setSelectedChallenge(null);
    setMatchingChallenges(matches);
    setNotFound(!matches.length);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <button type="button" onClick={() => setIsOpen(true)} aria-label={isUniversity ? 'Open materials and warnings' : copy.triggerButton} className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2.5 font-bold text-white shadow-lg transition hover:bg-emerald-800 active:scale-95">
          <HeartHandshake className="h-5 w-5" aria-hidden="true" />
          <span>{isUniversity ? 'Materials & Warnings' : copy.triggerButton}</span>
        </button>
      </div>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" />}
      <aside ref={drawerRef} aria-hidden={!isOpen} className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex items-center justify-between border-b border-emerald-800 bg-emerald-700 px-5 py-4 text-white">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-white/10 p-2"><LifeBuoy className="h-5 w-5" /></div><div><h2 className="font-black">{isUniversity ? 'Materials & Warnings' : copy.drawerHeader}</h2><p className="text-xs text-emerald-100">{isUniversity ? 'Regional research knowledge' : copy.drawerSubtitle}</p></div></div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close" className="rounded-lg p-2 hover:bg-white/10"><X className="h-5 w-5" /></button>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
          {isUniversity ? <UniversityView /> : <div className="space-y-4">
            <p className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm">{copy.greeting}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => navigateAndClose('/report')} className="rounded-2xl border border-emerald-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-500"><strong className="block text-sm text-slate-900">{copy.cardReportTitle}</strong><span className="mt-1 block text-xs leading-relaxed text-slate-600">{copy.cardReportDesc}</span></button>
              <button type="button" onClick={handleTrack} className="rounded-2xl border border-emerald-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-500"><strong className="block text-sm text-slate-900">{copy.cardTrackTitle}</strong><span className="mt-1 block text-xs leading-relaxed text-slate-600">{copy.cardTrackDesc}</span></button>
              <button type="button" onClick={() => navigateAndClose('/feedback')} className="rounded-2xl border border-emerald-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-500 sm:col-span-2"><strong className="block text-sm text-slate-900">{copy.cardQuorumTitle}</strong><span className="mt-1 block text-xs leading-relaxed text-slate-600">{copy.cardQuorumDesc}</span></button>
            </div>
            {quorumExplainer && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-950"><p>{copy.cardQuorumDesc}</p><button type="button" onClick={() => navigateAndClose('/feedback')} className="mt-3 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-800">{copy.quorumPortalButton}</button></div>}
            {loading && <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading live village records...</div>}
            {selectedChallenge && <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{selectedChallenge.ticket_number}</p><h3 className="mt-1 font-bold text-slate-900">{selectedChallenge.title || 'Voice Report: मेरे गांव महुआ में काला पानी...'}</h3></div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">{selectedChallenge.district || 'Palamu'}</span></div><p className="mt-3 text-sm leading-relaxed text-slate-700">{statusText(selectedChallenge.status, activeLanguage)}</p><button type="button" onClick={() => navigateAndClose('/progress')} className="mt-4 inline-flex rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-700">{PROGRESS_BUTTON[activeLanguage]}</button></div>}
            {matchingChallenges.length > 0 && <div className="space-y-3">{matchingChallenges.map((challenge) => <div key={challenge.ticket_number || challenge.title} className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{challenge.ticket_number}</p><h3 className="mt-1 font-bold text-slate-900">{challenge.title || 'Civic challenge'}</h3></div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">{challenge.district || 'Palamu'}</span></div><p className="mt-3 text-sm leading-relaxed text-slate-700">{statusText(challenge.status, activeLanguage)}</p><button type="button" onClick={() => navigateAndClose('/progress')} className="mt-4 inline-flex rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-700">{PROGRESS_BUTTON[activeLanguage]}</button></div>)}</div>}
            {notFound && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">टिकट नंबर नहीं मिला। कृपया सही टिकट नंबर डालें या नई समस्या दर्ज करें।</div>}
          </div>}
        </div>

        {!isUniversity && <form onSubmit={(event) => { void handleQuerySubmit(event); }} className="flex gap-2 border-t border-slate-200 bg-white p-4"><input ref={ticketInputRef} value={ticketInput} onChange={(event) => setTicketInput(event.target.value)} placeholder={copy.inputPlaceholder} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200" /><button type="submit" disabled={loading || !ticketInput.trim()} aria-label="Search ticket" className="rounded-xl bg-emerald-600 p-2.5 text-white hover:bg-emerald-700 disabled:opacity-50"><Send className="h-4 w-4" /></button></form>}
      </aside>
    </>
  );
}
