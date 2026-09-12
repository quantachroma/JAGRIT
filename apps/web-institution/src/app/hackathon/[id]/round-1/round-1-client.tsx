"use client";
import { useState } from "react";
import { ClipboardCheck, Lightbulb } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";
import Round1Form from "./round-1-form";

export default function Round1Client({ ticketId }: { ticketId: string }) {
  const { open } = useCopilot();
  const [toast, setToast] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">Round 1 · Ideation (14 Days) · {ticketId}</p>
        <h2 className="mt-1 text-xl font-bold">Pitch deck + 2-min video approach</h2>
        <p className="mt-1 text-sm text-slate-600">Evaluators shortlist top 3–5. Max 5 slides; narrate local context.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Round1Form ticketId={ticketId} onToast={setToast} />
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
            <h3 className="flex items-center gap-1.5 text-sm font-bold"><ClipboardCheck className="h-4 w-4" /> Scoring Rubric — Round 1</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-44 font-semibold">Innovation (40%)</span><span className="h-2 flex-1 rounded-full bg-slate-200"><span className="block h-full w-[40%] rounded-full bg-[#4F46E5]" /></span></li>
              <li className="flex items-center gap-2"><span className="w-44 font-semibold">Technical Feasibility (30%)</span><span className="h-2 flex-1 rounded-full bg-slate-200"><span className="block h-full w-[30%] rounded-full bg-[#044728]" /></span></li>
              <li className="flex items-center gap-2"><span className="w-44 font-semibold">Local Context (30%)</span><span className="h-2 flex-1 rounded-full bg-slate-200"><span className="block h-full w-[30%] rounded-full bg-amber-500" /></span></li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">Cite Lohardaga bauxite / Khunti pottery evidence for Local Context marks.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="flex items-center gap-1 font-bold text-amber-900"><Lightbulb className="h-4 w-4" />Stuck on materials?</p>
            <p className="mt-1 text-xs text-amber-800">Ask the copilot for fluoride adsorbents and failure-repo warnings.</p>
            <button onClick={open} className="mt-2 rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-bold text-white">Ask R&amp;D Copilot</button>
          </div>
          {toast && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900">{toast}</p>}
        </div>
      </div>
    </div>
  );
}
