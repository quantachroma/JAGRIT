'use client';

import { Check, LockKeyhole, Radio } from 'lucide-react';

const nodes = [
  { title: 'Submitted', detail: 'Citizen report received' },
  { title: 'AI Verified', detail: 'Evidence and location checked' },
  { title: 'University Assigned', detail: 'BIT Mesra' },
  { title: 'Live Field Pilot Installed', detail: 'Day 14 of 45' },
  { title: 'Citizen Quorum', detail: 'Pending village validation' },
];

export default function GrievanceStepper({ paused = false }: { paused?: boolean }) {
  return <section aria-labelledby="grievance-stepper-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">My active grievance · JAG-4102</p><h2 id="grievance-stepper-heading" className="mt-1 text-xl font-black text-slate-950">Palamu groundwater pilot</h2></div>{paused && <span className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-800">STATUS: PAUSED - CLOCK FROZEN</span>}</div><div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-0">{nodes.map((node, index) => { const done = index < 3; const active = index === 3; return <div key={node.title} className="relative flex items-center gap-3 sm:block sm:text-center"><div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 bg-white sm:mx-auto sm:h-12 sm:w-12 ${done ? 'border-emerald-500 text-emerald-700' : active ? 'border-blue-500 text-blue-700 ring-4 ring-amber-200 animate-pulse' : 'border-slate-300 text-slate-400'}`}>{done ? <Check className="h-5 w-5" /> : active ? <Radio className="h-5 w-5" /> : <LockKeyhole className="h-4 w-4" />}</div>{index < nodes.length - 1 && <div className="absolute left-[22px] top-11 h-[calc(100%+1rem)] w-0.5 bg-slate-200 sm:left-1/2 sm:top-6 sm:h-0.5 sm:w-full" />}<div className="sm:mt-3"><p className={`text-sm font-black ${done ? 'text-emerald-800' : active ? 'text-blue-800' : 'text-slate-500'}`}>{node.title}</p><p className="mt-0.5 text-[11px] font-medium text-slate-500">{active && paused ? 'Clock frozen pending inspection' : node.detail}</p></div></div>; })}</div></section>;
}