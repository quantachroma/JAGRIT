"use client";
import { useMemo, useState } from "react";
import { Archive, Search } from "lucide-react";
import FailureCard from "./failure-card";
import { FAILURE_TABS, filterFailures, type FailureTab } from "@/lib/failures";
import { ALL_FAILURE_CASES } from "@/lib/failure-cases";

export default function RepositoryClient() {
  const [tab, setTab] = useState<FailureTab>("All Archives");
  const [q, setQ] = useState("");
  const list = useMemo(() => filterFailures(ALL_FAILURE_CASES, tab, q), [tab, q]);
  const minor = ALL_FAILURE_CASES.filter((c) => c.severity === "MINOR").length;
  const major = ALL_FAILURE_CASES.filter((c) => c.severity === "MAJOR").length;
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">ADR-009 · Screen 10 · rnd_failure_repository</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold"><Archive className="h-6 w-6 text-[#044728]" />R&D Failure Knowledge Base</h1>
        <p className="mt-1 text-sm text-slate-600">{ALL_FAILURE_CASES.length} archives · {minor} minor (repo) · {major} major (Pan-India) across Jharkhand HEIs.</p>
        <label className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, campus, district, root cause…" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Failure filters">
          {FAILURE_TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tab === t ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{t}</button>
          ))}
        </div>
      </div>
      {list.length === 0 && <p role="status" className="rounded-xl border bg-white p-5 text-sm text-slate-600">No archives match. Try another keyword or tab.</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((c) => <FailureCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}
