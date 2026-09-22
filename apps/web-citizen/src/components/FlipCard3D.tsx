'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, MapPin, RotateCw } from 'lucide-react';

export type FlipCardData = { title: string; location: string; urgency: 'Urgent' | 'Active'; category: string; detail: string; institution: string; solution: string; tranche: string; progress: number; tint: string };

export default function FlipCard3D({ problem }: { problem: FlipCardData }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="h-[25rem] [perspective:1000px]" onClick={() => setFlipped((value) => !value)}>
      <div className={`relative h-full w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <article className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg [backface-visibility:hidden]">
          <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${problem.tint}`}><div className="absolute -right-5 -top-10 h-36 w-36 rounded-full border-[18px] border-white/20" /><div className="absolute bottom-4 left-5 rounded-xl bg-black/25 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-sm">Field signal / 2026</div></div>
          <div className="flex h-[calc(100%-9rem)] flex-col p-5"><div className="flex items-center justify-between gap-3 text-[11px] font-extrabold uppercase tracking-wider"><span className="inline-flex items-center gap-1.5 text-slate-600"><MapPin className="h-3.5 w-3.5" />{problem.location}</span><span className={`rounded-full px-2.5 py-1 ${problem.urgency === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'}`}>{problem.urgency}</span></div><p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-sky-700">{problem.category}</p><h3 className="mt-2 text-xl font-black leading-tight text-slate-950">{problem.title}</h3><p className="mt-3 text-sm leading-5 text-slate-600">{problem.detail}</p><div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500"><span>Tap to inspect pathway</span><RotateCw className="h-4 w-4" /></div></div>
        </article>
        <article className="absolute inset-0 flex flex-col rounded-3xl bg-slate-950 p-6 text-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"><div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-cyan-300"><span>R&amp;D pathway</span><RotateCw className="h-4 w-4" /></div><h3 className="mt-6 text-2xl font-black leading-tight">{problem.solution}</h3><div className="mt-6 space-y-4 text-sm text-slate-300"><div><span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Assigned institution</span><span className="mt-1 block font-bold text-white">{problem.institution}</span></div><div><div className="mb-2 flex justify-between"><span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Milestone escrow</span><span className="font-bold text-cyan-300">{problem.tranche}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${problem.progress}%` }} /></div></div><div className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> PESA Gram Sabha quorum verified</div></div><Link href="/dashboard?role=CITIZEN" onClick={(event) => event.stopPropagation()} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-white">Open citizen pathway <ArrowUpRight className="h-4 w-4" /></Link></article>
      </div>
    </div>
  );
}