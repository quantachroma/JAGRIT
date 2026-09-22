'use client';

import { useState } from 'react';
import { Bot, RotateCcw, ShieldCheck } from 'lucide-react';
import WhatsAppChatWindow, { type JuryScenario } from '@/components/WhatsAppChatWindow';

export default function WhatsAppSimulatorPage() {
  const [scenario, setScenario] = useState<JuryScenario>('palamu');

  return <main className="min-h-screen bg-[#f6f8f7] px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl space-y-5"><header className="flex flex-wrap items-end justify-between gap-4"><div><div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-800"><Bot className="h-3.5 w-3.5" /> WhatsApp Seva Bot · execution simulator</div><h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">JAGRIT citizen intake pipeline</h1><p className="mt-1 max-w-2xl text-sm text-slate-600">A zero-barrier WhatsApp flow for Santhali and Hindi voice, photo evidence, live location, and accountable triage.</p></div><div className="flex items-center gap-2 text-xs font-bold text-slate-600"><ShieldCheck className="h-4 w-4 text-emerald-700" /> DHTE Govt of Jharkhand <button type="button" onClick={() => setScenario('palamu')} className="ml-2 inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 hover:bg-slate-50"><RotateCcw className="h-3.5 w-3.5" /> Reset demo</button></div></header><WhatsAppChatWindow scenario={scenario} onScenarioChange={setScenario} /></div></main>;
}
