"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, IndianRupee, Sparkles, Timer, X, Wallet, FlaskConical, UserCheck, ArrowRight } from "lucide-react";
import type { ChallengeStatus } from "@jagrit/contracts";
import type { OpenChallenge } from "@/lib/mock-data";
import XaiSpiderChart from "@/components/xai-spider-chart";
import ChallengeAcceptModal from "@/components/challenge-accept-modal";
import { formatINR } from "@/lib/mock-data";

const FILTERS = ["All", "Water & Sanitation", "Agritech & Lac", "Renewable Energy", "Tribal Health"] as const;
const DAYS_LEFT: Record<string, number> = { "JAG-4102": 4, "JAG-3891": 6, "JAG-4022": 8 };
const CSR_POOL: Record<string, string> = { "JAG-4102": "Rs. 2,00,000 (Tata Steel)", "JAG-3891": "Rs. 1,50,000 (Hindalco)", "JAG-4022": "Rs. 80,000 (CSR pool)" };

export interface AcceptedProject {
  ticketId: string;
  title: string;
  fundingStatus: string;
  activeSprint: string;
  facultyPI: string;
  link: string;
}

const INITIAL_ACCEPTED_PROJECTS: AcceptedProject[] = [
  {
    ticketId: "JAG-4102",
    title: "Palamu District: Solar Fluoride & Iron Water Purification",
    fundingStatus: "Tranche 1 Disbursed: ₹1,05,000 (30%)",
    activeSprint: "Stage: Bench Prototyping & Lab Testing (Week 3/16)",
    facultyPI: "Dr. Anand Verma (BIT Mesra)",
    link: "/university/hackathon/JAG-4102/round-1",
  },
];

interface Props { challenges: OpenChallenge[]; summary: { openTickets: number; statePoolTotalINR: number; activeGrantsLabel: string }; }

export default function DashboardClient({ challenges, summary }: Props) {
  const fmt = formatINR;
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<OpenChallenge | null>(null);
  const [acceptFor, setAcceptFor] = useState<OpenChallenge | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [acceptedProjects, setAcceptedProjects] = useState<AcceptedProject[]>(INITIAL_ACCEPTED_PROJECTS);

  const handleAccepted = (s: ChallengeStatus, m: string) => {
    if (acceptFor) {
      const newProj: AcceptedProject = {
        ticketId: acceptFor.ticketId,
        title: acceptFor.title,
        fundingStatus: "Tranche 1 Disbursed: ₹1,05,000 (30%)",
        activeSprint: "Stage: Bench Prototyping & Lab Testing (Week 3/16)",
        facultyPI: "Dr. Anand Verma (BIT Mesra)",
        link: `/university/hackathon/${acceptFor.ticketId}/round-1`,
      };
      setAcceptedProjects((prev) => [newProj, ...prev.filter((p) => p.ticketId !== acceptFor.ticketId)]);
      setToast(`${acceptFor.ticketId}: ${m} Status now ${s}.`);
    }
  };

  const list = useMemo(() => challenges.filter((c) => {
    const hay = `${c.title} ${c.district} ${c.domain} ${c.ticketId}`.toLowerCase();
    const okQ = !q.trim() || hay.includes(q.trim().toLowerCase());
    const okF = filter === "All" || c.domain.toLowerCase().includes(filter.split(" ")[0].toLowerCase()) || (filter === "Water & Sanitation" && c.domain.toLowerCase().includes("water")) || (filter === "Water & Sanitation" && c.domain.toLowerCase().includes("sanitation")) || (filter === "Agritech & Lac" && c.domain.toLowerCase().includes("agri")) || (filter === "Renewable Energy" && c.domain.toLowerCase().includes("cold")) || (filter === "Tribal Health" && c.domain.toLowerCase().includes("health"));
    return okQ && okF;
  }), [challenges, q, filter]);

  return (
    <div className="space-y-6">
      {/* 🚀 My Accepted Projects / सक्रिय स्वीकृत परियोजनाएं (In Progress) */}
      <section className="rounded-2xl border-2 border-blue-600 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-blue-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#1E3A8A] flex items-center gap-2">
              <span>🚀 My Accepted Projects / सक्रिय स्वीकृत परियोजनाएं (In Progress)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Active university research sprint & tranche milestone governance
            </p>
          </div>
          <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800">
            {acceptedProjects.length} Active {acceptedProjects.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {acceptedProjects.map((proj) => (
            <div
              key={proj.ticketId}
              className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-blue-300 shadow-xs"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-600 text-white px-2.5 py-0.5 text-xs font-mono font-black">
                    #{proj.ticketId}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-[#1E3A8A]">
                    <Wallet className="h-3 w-3" /> {proj.fundingStatus}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-900">
                    <FlaskConical className="h-3 w-3" /> {proj.activeSprint}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#0F172A] leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-blue-700" />
                  <span>Faculty PI: <strong className="text-slate-900">{proj.facultyPI}</strong></span>
                </p>
              </div>

              <div className="flex items-center md:self-center shrink-0">
                <Link
                  href={proj.link}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white px-5 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Open Project Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">University Discovery Feed</p>
        <h1 className="mt-1 text-2xl font-bold text-[#0F172A]">Open Jharkhand challenges</h1>
        <p className="mt-1 text-sm text-slate-600">{summary.openTickets} open tickets · {fmt(summary.statePoolTotalINR)} combined state pool · {summary.activeGrantsLabel}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#F1F5F9] px-3 py-2">
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
      {toast && (<p role="status" className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800">{toast}</p>)}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const daysLeft = DAYS_LEFT[c.ticketId] ?? 4;
          const shortTag =
            c.shortTag ||
            (c.ticketId === "JAG-4102"
              ? "Fluoride water filtration needed for 20 hamlets"
              : c.ticketId === "JAG-3891"
              ? "5MT solar cold room needed for forest produce"
              : "Non-electric aerated composter for school campuses");

          return (
            <article
              key={c.ticketId}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-4"
            >
              <div className="space-y-3.5">
                {/* Header Pills: Domain & District */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700">
                    {c.domain}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    <span>{c.district} District</span>
                  </span>
                </div>

                {/* Challenge Identifier & Title */}
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-600">#{c.ticketId}</span>
                  <h2 className="text-base font-black text-slate-900 leading-snug mt-0.5">
                    {c.title}
                  </h2>
                </div>

                {/* Concise 1-Line Tag (replaces dense 3-line academic paragraph) */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                    🏷️ {shortTag}
                  </p>
                </div>

                {/* Highlighted Vital Metrics: ⏱️ Days Left | 🧠 AI Fit | ₹ Grant */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5 text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Timeline</span>
                    <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                      ⏱️ {daysLeft} Days Left
                    </span>
                  </div>
                  <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5 text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-500">AI Match</span>
                    <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                      🧠 AI Fit: {c.aiMatch}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5 text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Grant</span>
                    <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                      {fmt(c.statePoolINR)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelected(c)}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Review Challenge & Match Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {selected && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/60 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Match analysis">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">{selected.ticketId} · Match Analysis</p>
              <h2 className="text-lg font-bold leading-snug">{selected.title}</h2></div>
              <button onClick={() => setSelected(null)} aria-label="Close detail" className="rounded-full bg-white p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4"><XaiSpiderChart data={selected.xai} ticketId={selected.ticketId} /></div>
            <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
              <p className="font-bold">Evaluator tip — enable Jury Presentation Mode in the top bar to score this team live (Feasibility 40 / Sustainability 30 / Cost 30).</p>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button onClick={() => { setAcceptFor(selected); setSelected(null); }} className="flex-1 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white">Accept & Nominate Team</button>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-[#F1F5F9] bg-white px-4 py-2.5 text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
      <ChallengeAcceptModal open={!!acceptFor} challenge={acceptFor} onClose={() => setAcceptFor(null)} onSubmitted={handleAccepted} />
    </div>
  );
}
