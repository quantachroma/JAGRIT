"use client";
import { useState } from "react";
import Round2Mentor from "./round-2-mentor";
import Round2Proto, { REVISIONS } from "./round-2-proto";
import DemoTelemetryCard from "@/components/demo-telemetry-card";
import JuryGate from "@/components/jury-gate";

export default function Round2Client({ ticketId }: { ticketId: string }) {
  const [slot, setSlot] = useState<string | null>(null);
  const [teleOk, setTeleOk] = useState(false);
  const [done, setDone] = useState<string[]>(["r1"]);
  const [toast, setToast] = useState<string | null>(null);
  const ready = !!slot && teleOk && done.length === REVISIONS.length;
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">Round 2 · Mentoring and Prototype (21 Days) · {ticketId}</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">Industry mentor + bench-scale evidence</h1>
        <p className="mt-1 text-sm text-slate-600">Top 2 advance. Book a mentor slot, upload lab telemetry, clear the revision checklist.</p>
      </div>
      <JuryGate ticketId={ticketId} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Round2Mentor onBook={(s) => { setSlot(s); setToast(`Mentor session booked: ${s}. Invite sent to Dr. S. Roy.`); }} />
        <Round2Proto onTele={(ok) => setTeleOk(ok)} done={done} setDone={setDone} onToast={setToast} />
      </div>
      <DemoTelemetryCard ticketId={ticketId} />
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-xs text-slate-600 shadow-sm">
        <p className="font-bold text-slate-800">Prototype gate</p>
        <p className="mt-1">Advance needs: 1 booked session + 1 telemetry file + all revisions checked.</p>
        <p className="mt-1 font-semibold">{ready ? "Gate: READY — eligible for Top-2 shortlist." : "Gate: IN PROGRESS."}</p>
        {toast && <p role="status" className="mt-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-900">{toast}</p>}
      </div>
    </div>
  );
}

