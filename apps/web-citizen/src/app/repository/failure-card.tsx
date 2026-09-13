"use client";
import { Archive, Award, FlaskConical, MapPin } from "lucide-react";
import type { FailureCase } from "@/lib/failures";
import { formatINR } from "@/lib/mock-data";

export default function FailureCard({ c }: { c: FailureCase }) {
  const major = c.severity === "MAJOR";
  return (
    <article className={`rounded-xl border bg-white p-5 shadow-sm ${major ? "border-sky-300 ring-1 ring-sky-200" : "border-[#F1F5F9]"}`}>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className={`rounded-full px-2 py-1 font-bold ${major ? "bg-sky-100 text-sky-900" : "bg-slate-100 text-slate-700"}`}>{major ? "MAJOR" : "MINOR"}</span>
        <span className="rounded-full bg-blue-50 px-2 py-1 font-semibold text-[#2563EB]">{c.domain}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700"><MapPin className="h-3 w-3" />{c.district}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">{c.trl}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-400 via-sky-400 to-sky-300 px-3 py-1 text-[11px] font-black text-slate-950 shadow-sm border border-sky-300">
          🎯 Selected for Annual Hackathon
        </span>
        {major && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 border border-sky-300 px-3 py-1 text-[11px] font-bold text-sky-950 shadow-xs">
            <Award className="h-3.5 w-3.5 text-sky-700" />
            Promoted to Pan-India National Hackathon Statement
          </span>
        )}
      </div>
      <h2 className="mt-2 text-base font-bold leading-snug">#{c.ticketId} — {c.title}</h2>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-600"><FlaskConical className="h-3.5 w-3.5" />{c.campus} · {c.year} · {c.teamSize} members · {formatINR(c.costINR)}</p>
      <div className="mt-3 rounded-lg border-l-4 border-sky-500 bg-sky-50 p-3">
        <p className="text-xs font-bold text-sky-900">What Was Attempted</p>
        <p className="mt-1 text-xs text-sky-900">{c.attempted}</p>
        <ul className="mt-1.5 list-disc pl-4 text-[11px] text-sky-800">{c.specs.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      <div className="mt-2 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
        <p className="text-xs font-bold text-blue-900">Root Cause of Failure</p>
        <p className="mt-1 text-xs text-blue-900">{c.rootCause}</p>
        <ul className="mt-1.5 list-disc pl-4 text-[11px] text-blue-800">{c.failureModes.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      <div className="mt-2 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3">
        <p className="text-xs font-bold text-blue-900">Key Recommendations for Future Teams</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-blue-900">{c.recommendations.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-500"><Archive className="h-3 w-3" />{c.id} · rnd_failure_repository</p>
    </article>
  );
}
