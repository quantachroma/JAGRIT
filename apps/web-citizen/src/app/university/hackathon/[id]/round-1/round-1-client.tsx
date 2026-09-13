"use client";
import { useState } from "react";
import { ClipboardCheck, Lightbulb } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";
import JuryGate from "@/components/jury-gate";
import Round1Form from "./round-1-form";

export default function Round1Client({ ticketId }: { ticketId: string }) {
  const { open } = useCopilot();
  const [toast, setToast] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">Round 1 · Ideation (14 Days) · {ticketId}</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">Pitch deck + 2-min video approach</h1>
        <p className="mt-1 text-sm text-slate-600">Evaluators shortlist top 3–5. Max 5 slides; narrate local context.</p>
      </div>
      <JuryGate ticketId={ticketId} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Round1Form ticketId={ticketId} onToast={setToast} />
        <div className="space-y-4">
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-1.5 text-sm font-bold"><ClipboardCheck className="h-4 w-4" /> Scoring Rubric — Round 1</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-44 shrink-0 font-semibold">Innovation (40%)</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><span className="block h-full w-[40%] rounded-full bg-[#2563EB]" /></span></li>
              <li className="flex items-center gap-2"><span className="w-44 shrink-0 font-semibold">Technical Feasibility (30%)</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><span className="block h-full w-[30%] rounded-full bg-[#1E3A8A]" /></span></li>
              <li className="flex items-center gap-2"><span className="w-44 shrink-0 font-semibold">Local Context (30%)</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><span className="block h-full w-[30%] rounded-full bg-sky-500" /></span></li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">Cite Lohardaga bauxite / Khunti pottery evidence for Local Context marks.</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm">
            <p className="flex items-center gap-1 font-bold text-sky-900"><Lightbulb className="h-4 w-4" />Stuck on materials?</p>
            <p className="mt-1 text-xs text-sky-800">Ask the copilot for fluoride adsorbents and failure-repo warnings.</p>
            <button onClick={open} className="mt-2 rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-bold text-white">Ask R&amp;D Copilot</button>
          </div>
          {toast && <p role="status" className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900">{toast}</p>}
        </div>
      </div>
    </div>
  );
}

