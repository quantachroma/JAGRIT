"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Archive, Search, Trophy } from "lucide-react";
import FailureCard from "./failure-card";
import { filterFailures, type FailureTab } from "@/lib/failures";
import { ALL_FAILURE_CASES } from "@/lib/failure-cases";
import { useLanguage } from "@/context/LanguageContext";

export default function RepositoryClient() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<FailureTab>("All Archives");
  const [q, setQ] = useState("");
  const list = useMemo(() => filterFailures(ALL_FAILURE_CASES, tab, q), [tab, q]);
  const minor = ALL_FAILURE_CASES.filter((c) => c.severity === "MINOR").length;
  const major = ALL_FAILURE_CASES.filter((c) => c.severity === "MAJOR").length;

  const tabOptions: { key: FailureTab; label: string }[] = useMemo(() => [
    { key: "All Archives", label: t.repository.tabAll },
    { key: "Minor Engineering Failures", label: t.repository.tabMinor },
    { key: "Major State Challenges", label: t.repository.tabMajor },
  ], [t.repository]);

  return (
    <div className="space-y-5">
      {/* Prominent Annual Hackathon Callout Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-600 p-5 sm:p-6 text-slate-950 shadow-md border-2 border-sky-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider bg-slate-950 text-sky-300 px-2.5 py-0.5 rounded-md">
            <Trophy className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.repository.bannerBadge}</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-950 leading-snug">
            {t.repository.bannerTitle}
          </p>
          <p className="text-xs font-semibold text-slate-900/85">
            {t.repository.bannerDesc}
          </p>
        </div>

        <Link
          href="/university/hackathon/annual"
          className="shrink-0 inline-flex items-center space-x-2 bg-slate-950 hover:bg-slate-900 text-sky-300 hover:text-white font-black px-5 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
        >
          <span>{t.repository.bannerCta}</span>
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">{t.repository.tagline}</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold"><Archive className="h-6 w-6 text-[#1E3A8A]" />{t.repository.title}</h1>
        <p className="mt-1 text-sm text-slate-600">{ALL_FAILURE_CASES.length} {t.repository.archivesSummary} ({minor} minor / {major} major)</p>
        <label className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.repository.searchPlaceholder} className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Failure filters">
          {tabOptions.map((opt) => (
            <button key={opt.key} role="tab" aria-selected={tab === opt.key} onClick={() => setTab(opt.key)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tab === opt.key ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{opt.label}</button>
          ))}
        </div>
      </div>
      {list.length === 0 && <p role="status" className="rounded-xl border bg-white p-5 text-sm text-slate-600">{t.repository.noMatch}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((c) => <FailureCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}
