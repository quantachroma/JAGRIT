"use client";
import { useState } from "react";
import { UserCheck, CalendarCheck, CheckCircle2 } from "lucide-react";

export const SLOTS = ["Mon 11:00 IST · Virtual", "Wed 15:00 IST · Virtual", "Fri 10:00 IST · Virtual", "Sat 12:00 IST · On-site Ranchi"];

export default function Round2Mentor({ onBook }: { onBook: (s: string) => void }) {
  const [slot, setSlot] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <h3 className="flex items-center gap-1.5 text-sm font-bold"><UserCheck className="h-4 w-4" /> Assigned Industry Mentor</h3>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#044728] text-sm font-bold text-white">SR</span>
          <div>
            <p className="text-sm font-bold">Dr. S. Roy, Chief Metallurgist</p>
            <p className="text-xs text-slate-500">Tata Steel CSR Cell · Water and Materials · 22 yrs field deployment</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
          <p><span className="font-bold">Focus:</span> media sizing, vessel MOC, NABL test design.</p>
          <p className="mt-1"><span className="font-bold">Office hours:</span> Mon / Wed / Fri virtual · Sat on-site Ranchi.</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <h3 className="flex items-center gap-1.5 text-sm font-bold"><CalendarCheck className="h-4 w-4" /> Mentor slot booking</h3>
        <div className="mt-3 grid gap-2">
          {SLOTS.map((s) => (
            <button key={s} onClick={() => { setSlot(s); onBook(s); }} aria-pressed={slot === s} className={`rounded-lg border px-3 py-2 text-left text-sm ${slot === s ? "border-[#044728] bg-emerald-50 font-bold" : "border-[#E2E8F0] hover:bg-slate-50"}`}>
              {s}
            </button>
          ))}
        </div>
        {slot && <p role="status" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" />Booked: {slot}</p>}
      </div>
    </div>
  );
}
