'use client';

import { useState } from 'react';
import { CheckCircle2, Droplets, IndianRupee, Sprout } from 'lucide-react';

const projects = [
  { title: 'Palamu Water Purification', university: 'BIT Mesra · Environmental Engineering', location: 'Palamu', request: '₹3.50 Lakh', icon: Droplets },
  { title: 'Khunti Lac Storage', university: 'Birsa Agricultural University · AgriTech', location: 'Khunti', request: '₹4.20 Lakh', icon: Sprout },
];

export default function CoFundingPipelinePage() {
  const [pledged, setPledged] = useState<string | null>(null);
  return <div className="mx-auto max-w-7xl space-y-8 pb-12"><header><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">University-led R&amp;D</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Co-Funding Pipeline</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Review active research projects awaiting a corporate matching grant.</p></header><div className="grid gap-5 lg:grid-cols-2">{projects.map(({ title, university, location, request, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between"><div className="rounded-xl bg-blue-50 p-3 text-blue-700"><Icon className="h-6 w-6" /></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">Awaiting match</span></div><h2 className="mt-6 text-xl font-black text-slate-900">{title}</h2><p className="mt-2 text-sm font-bold text-slate-700">{university}</p><p className="mt-1 text-sm text-slate-500">District: {location}</p><div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4"><span className="inline-flex items-center gap-1 text-lg font-black text-slate-900"><IndianRupee className="h-4 w-4" /> {request}</span><button type="button" onClick={() => { setPledged(title); window.alert(`CSR grant pledge recorded for ${title}.`); }} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">[ Pledge Matching CSR Grant (₹3.5L) ]</button></div>{pledged === title && <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700" role="status"><CheckCircle2 className="h-4 w-4" /> Pledge recorded for this project.</p>}</article>)}</div></div>;
}