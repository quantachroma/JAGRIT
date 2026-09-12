"use client";
import { Activity, FlaskConical } from "lucide-react";
import { telemetryByTicket, type TelemetryLog } from "@/lib/demo-fixtures";

function Badge({ s }: { s: TelemetryLog["status"] }) {
  const cls =
    s === "WITHIN_SPEC"
      ? "bg-emerald-100 text-emerald-900"
      : s === "WATCH"
        ? "bg-amber-100 text-amber-900"
        : "bg-red-100 text-red-800";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}>{s.replace("_", " ")}</span>;
}

export default function DemoTelemetryCard({ ticketId }: { ticketId: string }) {
  const logs = telemetryByTicket(ticketId);
  if (logs.length === 0) return null;
  return (
    <section aria-label={`Lab telemetry fixtures for ${ticketId}`} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <h3 className="flex items-center gap-1.5 text-sm font-bold text-[#0F172A]">
        <Activity className="h-4 w-4 text-[#044728]" /> Pre-loaded lab telemetry · {ticketId}
      </h3>
      <p className="mt-1 text-xs text-slate-500">Jharkhand academic fixtures for evaluator demos (offline mock, no backend call).</p>
      <ul className="mt-3 space-y-2">
        {logs.map((l) => (
          <li key={l.id} className="rounded-lg bg-slate-50 p-2.5 text-xs">
            <p className="flex flex-wrap items-center gap-1.5 font-bold text-slate-800">
              <FlaskConical className="h-3.5 w-3.5 text-[#4F46E5]" /> {l.lab} <Badge s={l.status} />
            </p>
            <p className="mt-1 text-slate-700">
              <span className="font-semibold">{l.metric}:</span> {l.value} <span className="text-slate-400">· {l.date}</span>
            </p>
            <p className="mt-0.5 text-slate-500">{l.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
