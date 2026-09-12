"use client";
import { useState } from "react";
import { MapPin, CalendarCheck, CheckCircle2 } from "lucide-react";

const DEFENSE_SLOTS = ["Tue 10:00 IST · Hall A, DHTE HQ Ranchi", "Tue 14:00 IST · Hall A, DHTE HQ Ranchi", "Wed 11:00 IST · Hall B, DHTE HQ Ranchi", "Wed 15:30 IST · Hall B, DHTE HQ Ranchi"];

export default function DefenseScheduler({ onBook }: { onBook: (s: string) => void }) {
  const [slot, setSlot] = useState<string | null>(null);
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <h3 className="flex items-center gap-1.5 text-sm font-bold"><MapPin className="h-4 w-4" /> Physical Defense Slot · DHTE HQ, Ranchi</h3>
      <p className="mt-1 text-xs text-slate-500">Jury scores: Feasibility 40% · Sustainability 30% · Cost 30%. Bring prototype + NABL file.</p>
      <div className="mt-3 grid gap-2">
        {DEFENSE_SLOTS.map((s) => (
          <button key={s} onClick={() => { setSlot(s); onBook(s); }} aria-pressed={slot === s} className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-left text-sm ${slot === s ? "border-[#044728] bg-emerald-50 font-bold" : "border-[#E2E8F0] hover:bg-slate-50"}`}>
            <CalendarCheck className="h-4 w-4 shrink-0" />{s}
          </button>
        ))}
      </div>
      {slot && <p role="status" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" />Defense booked: {slot}</p>}
    </div>
  );
}
