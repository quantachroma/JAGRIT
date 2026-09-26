'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Handshake, Sparkles, XCircle } from 'lucide-react';

type ChallengeStatus = 'Available' | 'Accepted solo' | 'Consortium proposed' | 'Rejected';

type Challenge = {
  id: string;
  title: string;
  district: string;
  domain: string;
  match: number;
  budget: string;
  deadline: string;
  status: ChallengeStatus;
};

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'JAG-PLM-0082', title: 'Solar defluoridation for rural borewells', district: 'Palamu', domain: 'Water resilience', match: 96, budget: 'INR 3.5 lakh', deadline: '04 Oct 2026', status: 'Available' },
  { id: 'JAG-KHT-0014', title: 'Solar cold storage for lac and silk', district: 'Khunti', domain: 'Agritech', match: 91, budget: 'INR 2.8 lakh', deadline: '08 Oct 2026', status: 'Available' },
  { id: 'JAG-ESG-0147', title: 'Low-cost microgrid for a forest hamlet', district: 'East Singhbhum', domain: 'Renewable energy', match: 84, budget: 'INR 4.2 lakh', deadline: '12 Oct 2026', status: 'Available' },
];

export default function ProblemsPage() {
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function updateChallenge(id: string, status: ChallengeStatus, message: string) {
    setChallenges((current) => current.map((challenge) => challenge.id === id ? { ...challenge, status } : challenge));
    setRejectingId(null);
    setNotice(message);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">University Matching</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Problem statements</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">AI-ranked civic challenges matched to your labs, faculty availability, and field capacity.</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-right">
          <p className="text-2xl font-black text-blue-900">{challenges.filter((challenge) => challenge.status === 'Available').length}</p>
          <p className="text-xs font-bold text-blue-700">open matches</p>
        </div>
      </header>

      {notice && <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4 shrink-0" />{notice}</div>}

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <article key={challenge.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold"><span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-slate-700">#{challenge.id}</span><span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-800">{challenge.domain}</span><span className="text-slate-500">{challenge.district}</span></div>
                <h2 className="text-xl font-black text-slate-950">{challenge.title}</h2>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"><span><strong className="text-slate-900">{challenge.budget}</strong> escrow pool</span><span>Bid closes <strong className="text-slate-900">{challenge.deadline}</strong></span></div>
              </div>
              <div className="min-w-40 rounded-xl border border-emerald-200 bg-emerald-50 p-3 lg:text-right"><p className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-emerald-700 lg:justify-end"><Sparkles className="h-3.5 w-3.5" /> AI match</p><p className="mt-1 text-3xl font-black text-emerald-900">{challenge.match}%</p><p className="text-xs font-semibold text-emerald-700">capacity fit</p></div>
            </div>
            {challenge.status !== 'Available' && <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">Status: {challenge.status}</p>}
            {challenge.status === 'Available' && <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
              <button type="button" onClick={() => updateChallenge(challenge.id, 'Accepted solo', `${challenge.id} accepted as a solo university challenge.`)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"><CheckCircle2 className="h-4 w-4" />Accept Solo Challenge</button>
              <button type="button" onClick={() => updateChallenge(challenge.id, 'Consortium proposed', `Joint consortium proposal started for ${challenge.id}.`)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800 hover:bg-blue-100"><Handshake className="h-4 w-4" />Propose Joint Consortium</button>
              <button type="button" onClick={() => setRejectingId(challenge.id)} className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-rose-700 hover:bg-rose-50"><XCircle className="h-4 w-4" />Reject Challenge</button>
            </div>}
            {rejectingId === challenge.id && <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4" role="alert"><p className="flex items-start gap-2 text-sm font-bold text-amber-950"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Statutory penalty warning</p><p className="mt-1 text-xs leading-relaxed text-amber-900">⚠️ Official Institutional Policy Notice: Declining an assigned research challenge after evaluation impacts departmental responsiveness metrics and institutional ranking. Please confirm only if your laboratory lacks the capacity or instrumentation required for this deployment.</p><div className="mt-3 flex gap-2"><button type="button" onClick={() => updateChallenge(challenge.id, 'Rejected', `${challenge.id} rejected and recorded for statutory review.`)} className="rounded-lg bg-rose-700 px-3 py-2 text-xs font-bold text-white hover:bg-rose-800">Confirm rejection</button><button type="button" onClick={() => setRejectingId(null)} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-amber-900">Keep in pool</button></div></div>}
          </article>
        ))}
      </div>
    </div>
  );
}
