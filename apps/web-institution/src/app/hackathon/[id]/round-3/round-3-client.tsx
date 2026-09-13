"use client";
import { useState } from "react";
import DefenseScheduler from "./defense-scheduler";
import DprTable from "@/components/dpr-table";
import JuryGate from "@/components/jury-gate";

export default function Round3Client({ ticketId }: { ticketId: string }) {
  const [title, setTitle] = useState("Low-cost fluoride filter pilot — 20 hamlets, Palamu");
  const [scope, setScope] = useState("40 household units + 2 school units; bauxite + clay media; SS-304 lined vessels.");
  const [om, setOm] = useState("SHG-led media regeneration every 90 days; Panchayat O&M fund Rs.500/unit/year.");
  const [slotMsg, setSlotMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const ready = title.trim().length >= 10 && scope.trim().length >= 20 && om.trim().length >= 20 && !!slotMsg;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">Round 3 · DPR and Physical Defense (7 Days) · {ticketId}</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">Structured DPR builder + Ranchi defense slot</h1>
        <p className="mt-1 text-sm text-slate-600">BOM total must stay within the State + CSR ceiling (Rs. 3,50,000). Jury: Feasibility 40 / Sustainability 30 / Cost 30.</p>
      </div>
      <JuryGate ticketId={ticketId} />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold">DPR core sections</h2>
            <label htmlFor="dpr-title" className="mt-3 block text-xs font-semibold">Project title</label>
            <input id="dpr-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]" />
            <label htmlFor="dpr-scope" className="mt-3 block text-xs font-semibold">Scope + deployment plan</label>
            <textarea id="dpr-scope" value={scope} onChange={(e) => setScope(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]" />
            <label htmlFor="dpr-om" className="mt-3 block text-xs font-semibold">O&amp;M handover plan</label>
            <textarea id="dpr-om" value={om} onChange={(e) => setOm(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]" />
            <button disabled={!ready} onClick={() => setToast(`DPR submitted for ${ticketId}. BOM within ceiling; defense slot locked.`)} className="mt-4 w-full rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
              Submit DPR for jury defense
            </button>
            {!ready && <p className="mt-1 text-xs text-slate-500">Complete all DPR fields + book a defense slot to enable submit.</p>}
            {toast && <p role="status" className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900">{toast}</p>}
          </div>
          <DefenseScheduler onBook={(s) => setSlotMsg(`Defense booked: ${s}`)} />
          {slotMsg && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900">{slotMsg}</p>}
        </div>
        <div className="min-w-0">
          <DprTable allocationCeiling={350000} stateShare={200000} csrShare={150000} />
        </div>
      </div>
    </div>
  );
}

