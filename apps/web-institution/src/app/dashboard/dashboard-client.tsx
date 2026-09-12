"use client";
import { useMemo, useState } from "react";
import { Search, MapPin, IndianRupee, Sparkles, Timer, X } from "lucide-react";
import type { ChallengeStatus } from "@jagrit/contracts";
import type { OpenChallenge } from "@/lib/mock-data";
import XaiSpiderChart from "@/components/xai-spider-chart";
import ChallengeAcceptModal from "@/components/challenge-accept-modal";
import { formatINR } from "@/lib/mock-data";

const FILTERS = ["All", "Water & Sanitation", "Agritech & Lac", "Renewable Energy", "Tribal Health"] as const;
const DAYS_LEFT: Record<string, number> = { "JAG-4102": 4, "JAG-3891": 6, "JAG-4022": 8 };
const CSR_POOL: Record<string, string> = { "JAG-4102": "Rs. 2,00,000 (Tata Steel)", "JAG-3891": "Rs. 1,50,000 (Hindalco)", "JAG-4022": "Rs. 80,000 (CSR pool)" };

interface Props { challenges: OpenChallenge[]; summary: { openTickets: number; statePoolTotalINR: number; activeGrantsLabel: string }; }

export default function DashboardClient({ challenges, summary }: Props) {
  const fmt = formatINR;
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<OpenChallenge | null>(null);
  const [acceptFor, setAcceptFor] = useState<OpenChallenge | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const list = useMemo(() => challenges.filter((c) => {
    const hay = `${c.title} ${c.district} ${c.domain} ${c.ticketId}`.toLowerCase();
    const okQ = !q.trim() || hay.includes(q.trim().toLowerCase());
    const okF = filter === "All" || c.domain.toLowerCase().includes(filter.split(" ")[0].toLowerCase()) || (filter === "Water & Sanitation" && c.domain.toLowerCase().includes("water")) || (filter === "Water & Sanitation" && c.domain.toLowerCase().includes("sanitation")) || (filter === "Agritech & Lac" && c.domain.toLowerCase().includes("agri")) || (filter === "Renewable Energy" && c.domain.toLowerCase().includes("cold")) || (filter === "Tribal Health" && c.domain.toLowerCase().includes("health"));
    return okQ && okF;
  }), [challenges, q, filter]);
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">University Discovery Feed</p>
        <h1 className="mt-1 text-2xl font-bold text-[#0F172A]">Open Jharkhand challenges</h1>
        <p className="mt-1 text-sm text-slate-600">{summary.openTickets} open tickets · {fmt(summary.statePoolTotalINR)} combined state pool · {summary.activeGrantsLabel}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tickets, districts, domains…" className="w-full bg-transparent text-sm outline-none" />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${filter === f ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{f}</button>
          ))}
        </div>
      </div>
      {toast && (<p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">{toast}</p>)}
      <div className="grid gap-4 lg:grid-cols-3">
        {list.map((c) => (
          <article key={c.ticketId} className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded-full bg-indigo-50 px-2 py-1 font-semibold text-[#4F46E5]">{c.domain}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700"><MapPin className="h-3 w-3" />📍 {c.district} District</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-800"><Timer className="h-3 w-3" />⏱️ {DAYS_LEFT[c.ticketId] ?? 5} Days Left to Bid</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 font-semibold text-[#044728]"><Sparkles className="h-3 w-3" />🧠 AI Capability Fit: {c.aiMatch}%</span>
            </div>
            <h2 className="mt-3 text-base font-semibold leading-snug">#{c.ticketId} — {c.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{c.summary}</p>
            <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs">
              <p className="flex items-center gap-1 font-semibold text-[#044728]"><IndianRupee className="h-3.5 w-3.5" /> State Grant {fmt(c.statePoolINR)}</p>
              <p className="mt-0.5 text-slate-600">Corporate CSR pool: {CSR_POOL[c.ticketId] ?? c.csrMatching ?? "—"}</p>
            </div>
            <button onClick={() => setSelected(c)} className="mt-4 rounded-lg bg-[#0F172A] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Review Challenge & Match Analysis</button>
          </article>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/60 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Match analysis">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">{selected.ticketId} · Match Analysis</p>
              <h2 className="text-lg font-bold">{selected.title}</h2></div>
              <button onClick={() => setSelected(null)} aria-label="Close detail" className="rounded-full bg-white p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4"><XaiSpiderChart data={selected.xai} ticketId={selected.ticketId} /></div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button onClick={() => { setAcceptFor(selected); setSelected(null); }} className="flex-1 rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-semibold text-white">Accept & Nominate Team</button>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
      <ChallengeAcceptModal open={!!acceptFor} challenge={acceptFor} onClose={() => setAcceptFor(null)} onSubmitted={(s: ChallengeStatus, m: string) => setToast(`${acceptFor?.ticketId}: ${m} Status now ${s}.`)} />
    </div>
  );
}
