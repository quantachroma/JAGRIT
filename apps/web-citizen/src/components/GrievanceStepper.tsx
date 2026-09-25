'use client';

import { useEffect, useState } from 'react';
import { Check, LockKeyhole, Radio } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Grievance = {
  ticketNumber: string;
  title: string;
  description?: string;
  district: string;
  block?: string;
  status: string;
  stage: number;
  submissionDate?: string;
  upvotes?: number;
};

const nodes = [
  { title: 'Submitted', detail: 'Citizen report received' },
  { title: 'AI Verified & Triage', detail: 'Evidence and location checked' },
  { title: 'University Assigned', detail: 'BIT Mesra' },
  { title: 'Field Pilot Installed', detail: 'Day 0 of 45' },
  { title: 'Citizen Quorum & Voting', detail: 'Locked pending pilot results' },
];

export default function GrievanceStepper({ ticketId, paused = false }: { ticketId: string; paused?: boolean }) {
  const { language } = useLanguage();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [activeTicket, setActiveTicket] = useState(ticketId);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('jagrit_my_grievances') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setGrievances(stored);
        setActiveTicket(stored[0].ticketNumber);
      } else {
        setGrievances([{ ticketNumber: 'JAG-2026-RNC-0087', title: 'Deep Pothole & Drainage on Kanke Road', stage: 3, district: 'Ranchi', status: 'UNIVERSITY_ASSIGNED' }]);
      }
    } catch {
      setGrievances([{ ticketNumber: 'JAG-2026-RNC-0087', title: 'Deep Pothole & Drainage on Kanke Road', stage: 3, district: 'Ranchi', status: 'UNIVERSITY_ASSIGNED' }]);
    }
  }, [ticketId]);

  const activeGrievance = grievances.find((grievance) => grievance.ticketNumber === activeTicket) || grievances[0];
  if (!activeGrievance) return null;
  const currentStage = activeGrievance.stage || 1;
  const activeStage = Math.min(currentStage + 1, nodes.length);
  const stageLabel = (stage: number) => stage === 1 ? 'Submitted' : stage === 2 ? 'AI Verified' : stage === 3 ? 'University Assigned' : stage === 4 ? 'Field Pilot' : 'Quorum';
  const statusBanner = currentStage === 1
    ? language === 'hi'
      ? 'आपकी शिकायत सफलतापूर्वक दर्ज हो चुकी है (चरण 1: प्रेषित)। यह कम्युनिटी अपवोटिंग और ए.आई. सत्यापन हेतु खुली है।'
      : language === 'sat'
      ? 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱮᱱᱟ (ᱦᱟᱹᱴᱤᱧ 1: ᱮᱢ ᱮᱱᱟ) ᱾ ᱱᱚᱶᱟ ᱫᱚ ᱟᱯᱵᱷᱳᱴ ᱞᱟᱜᱤᱫ ᱡᱷᱤᱡ ᱢᱮᱱᱟᱜᱼᱟ ᱾'
      : 'Your grievance is submitted (Stage 1: Submitted). It is currently open for community upvoting and AI triage.'
    : language === 'hi'
      ? 'आपकी शिकायत विश्वविद्यालय आवंटन चरण में है। समाधान की प्रगति यहां लाइव दिखाई देगी।'
      : language === 'sat'
      ? 'ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱮᱱᱟ᱾ ᱥᱚᱞᱦᱟ ᱞᱟᱦᱟᱱᱛᱤ ᱱᱚᱶᱟ ᱨᱮ ᱡᱤᱣᱤ ᱧᱮᱞᱚᱜᱼᱟ᱾'
      : 'Your grievance is assigned to the university. Solution progress will appear here live.';

  return <section aria-labelledby="grievance-stepper-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-base font-black text-blue-800">📌 My Active Grievance (मेरी सक्रिय शिकायत)</p>{grievances.length > 1 && <div className="mt-3 flex flex-wrap gap-2">{grievances.map((grievance) => <button key={grievance.ticketNumber} type="button" onClick={() => setActiveTicket(grievance.ticketNumber)} className={`rounded-full border px-3 py-1.5 text-xs font-black ${grievance.ticketNumber === activeGrievance.ticketNumber ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>📌 {grievance.ticketNumber} (Stage {grievance.stage}: {stageLabel(grievance.stage)})</button>)}</div>}<p className="mt-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-black text-blue-800">#{activeGrievance.ticketNumber}</p><h2 id="grievance-stepper-heading" className="mt-3 text-xl font-black text-slate-950">{activeGrievance.title}</h2><p className="mt-1 text-xs font-semibold text-slate-500">{activeGrievance.district} District{activeGrievance.block ? ` - ${activeGrievance.block}` : ''}</p></div>{paused && <span className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-800">STATUS: PAUSED - CLOCK FROZEN</span>}</div><div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-0">{nodes.map((node, index) => { const stage = index + 1; const done = stage <= currentStage; const active = stage === activeStage; return <div key={node.title} className="relative flex items-center gap-3 sm:block sm:text-center"><div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 bg-white sm:mx-auto sm:h-12 sm:w-12 ${done ? 'border-emerald-500 text-emerald-700' : active ? 'border-blue-500 text-blue-700 ring-4 ring-amber-200 animate-pulse' : 'border-slate-300 text-slate-400'}`}>{done ? <Check className="h-5 w-5" /> : active ? <Radio className="h-5 w-5" /> : <LockKeyhole className="h-4 w-4" />}</div>{index < nodes.length - 1 && <div className="absolute left-[22px] top-11 h-[calc(100%+1rem)] w-0.5 bg-slate-200 sm:left-1/2 sm:top-6 sm:h-0.5 sm:w-full" />}<div className="sm:mt-3"><p className={`text-sm font-black ${done ? 'text-emerald-800' : active ? 'text-blue-800' : 'text-slate-500'}`}>{node.title}</p><p className="mt-0.5 text-[11px] font-medium text-slate-500">{active ? (currentStage === 1 ? 'In progress · Community Upvoting Active' : 'In progress') : done ? node.detail : currentStage === 1 && stage === 3 ? 'Awaiting Evaluator Approval' : paused && index === 2 ? 'Clock frozen pending inspection' : node.detail}</p></div></div>; })}</div><p className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-900">{statusBanner}</p></section>;
}