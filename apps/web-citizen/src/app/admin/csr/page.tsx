"use client";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Filter,
  Droplets,
  Sprout,
  FlaskConical,
  Users,
  Handshake,
  FileCheck2,
  Clock,
  ChevronRight,
  Star,
  BadgeCheck,
  Gavel,
  Timer,
  IndianRupee,
  ExternalLink,
} from "lucide-react";

import { MatchingPledgeSlider } from "@/components/csr/matching-pledge-slider";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ScheduleVIICategory = "i" | "ii" | "x" | "all";

interface CSRProject {
  id: string;
  title: string;
  location: string;
  category: "i" | "ii" | "x";
  categoryLabel: string;
  grantTotal: string;
  csrPledged: string;
  stateMatch: string;
  status: "active" | "pipeline" | "completed";
  impactMetric: string;
  university: string;
}

interface MentorRow {
  team: string;
  domain: string;
  engineer: string;
  title: string;
  company: string;
  auditStatus: "Signed" | "Pending" | "Scheduled";
}

interface PatentRow {
  id: string;
  title: string;
  university: string;
  filedDate: string;
  rofr_deadline: string;
  daysLeft: number;
  status: "Available" | "Under Review" | "Exercised";
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PROJECTS: CSRProject[] = [
  {
    id: "JAG-PLM-0082",
    title: "Palamu Borewell Fluoride Defluoridation Units",
    location: "Hussainabad, Palamu",
    category: "i",
    categoryLabel: "Schedule VII (i) — Clean Drinking Water & Sanitation",
    grantTotal: "₹3,50,000",
    csrPledged: "₹1,75,000",
    stateMatch: "₹1,75,000",
    status: "active",
    impactMetric: "40,000 beneficiaries • 8 villages • Fluoride: 8.2 → 0.8 mg/L",
    university: "BIT Mesra, Ranchi",
  },
  {
    id: "JAG-KHT-0041",
    title: "Khunti Lac Cold Storage & Cooperative Livelihood Hub",
    location: "Murhu Block, Khunti",
    category: "ii",
    categoryLabel: "Schedule VII (ii) — Agro-Forestry & Livelihood Enhancement",
    grantTotal: "₹4,20,000",
    csrPledged: "₹2,10,000",
    stateMatch: "₹2,10,000",
    status: "pipeline",
    impactMetric: "800+ tribal artisans • ₹1.2L/yr avg income increase",
    university: "Birsa Agricultural University, Ranchi",
  },
  {
    id: "JAG-RNC-0107",
    title: "BIT Mesra Innovation Center — DeepTech Incubator",
    location: "Mesra, Ranchi",
    category: "x",
    categoryLabel: "Schedule VII (x) — University Science Incubators",
    grantTotal: "₹8,50,000",
    csrPledged: "₹4,25,000",
    stateMatch: "₹4,25,000",
    status: "active",
    impactMetric: "22 startups • 3 filed patents • 48 student innovators",
    university: "BIT Mesra, Ranchi",
  },
];

const MENTORS: MentorRow[] = [
  {
    team: "Team Jalpravah (JAG-PLM-0082)",
    domain: "Fluoride Removal Membrane Technology",
    engineer: "Dr. A. Sen",
    title: "Chief Water Scientist",
    company: "Tata Steel R&D",
    auditStatus: "Signed",
  },
  {
    team: "Team VanaJeevan (JAG-KHT-0041)",
    domain: "Lac Resin Cold-Chain Logistics",
    engineer: "Priya Mishra",
    title: "Supply Chain Lead",
    company: "Tata Steel CSR",
    auditStatus: "Pending",
  },
  {
    team: "Team NeuralNexus (JAG-RNC-0107)",
    domain: "Embedded AI & IoT Sensor Fusion",
    engineer: "Rajiv Ghosh",
    title: "Principal Engineer, AI/ML",
    company: "Tata Consultancy Services",
    auditStatus: "Scheduled",
  },
];

const PATENTS: PatentRow[] = [
  {
    id: "IN-2026-JAG-001",
    title: "Activated Alumina Gradient Defluoridation Filter for Rural Groundwater",
    university: "BIT Mesra, Ranchi",
    filedDate: "15 Mar 2026",
    rofr_deadline: "15 Sep 2026",
    daysLeft: 24,
    status: "Available",
  },
  {
    id: "IN-2026-JAG-004",
    title: "IoT-Enabled Real-Time Water Quality Telemetry Module",
    university: "NIT Jamshedpur",
    filedDate: "02 Apr 2026",
    rofr_deadline: "02 Oct 2026",
    daysLeft: 41,
    status: "Under Review",
  },
  {
    id: "IN-2025-JAG-017",
    title: "Lac Resin Phase-Change Cold Bag for Last-Mile Agri Cold Chain",
    university: "Birsa Agricultural University",
    filedDate: "08 Jan 2026",
    rofr_deadline: "08 Jul 2026",
    daysLeft: 0,
    status: "Exercised",
  },
];

/* ─── Category Icon ──────────────────────────────────────────────────────── */
function CategoryIcon({ cat }: { cat: "i" | "ii" | "x" }) {
  const map = {
    i: { icon: Droplets, color: "bg-blue-100 text-blue-700" },
    ii: { icon: Sprout, color: "bg-green-100 text-green-700" },
    x: { icon: FlaskConical, color: "bg-purple-100 text-purple-700" },
  };
  const { icon: Icon, color } = map[cat];
  return (
    <span className={`inline-flex p-1.5 rounded-lg ${color}`}>
      <Icon className="w-3.5 h-3.5" />
    </span>
  );
}

/* ─── Project Status Badge ───────────────────────────────────────────────── */
function StatusBadge({ status }: { status: CSRProject["status"] }) {
  const map = {
    active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pipeline: "bg-amber-100 text-amber-800 border-amber-200",
    completed: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${map[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}

/* ─── Audit Status Badge ─────────────────────────────────────────────────── */
function AuditBadge({ status }: { status: MentorRow["auditStatus"] }) {
  const map = {
    Signed: "bg-emerald-100 text-emerald-800",
    Pending: "bg-amber-100 text-amber-800",
    Scheduled: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}

/* ─── ROFR Urgency Badge ─────────────────────────────────────────────────── */
function ROFRBadge({ days, status }: { days: number; status: PatentRow["status"] }) {
  if (status === "Exercised")
    return <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">ROFR Exercised</span>;
  if (days <= 0)
    return <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-800 animate-pulse">EXPIRED</span>;
  if (days <= 30)
    return (
      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 animate-pulse">
        {days}d left — URGENT
      </span>
    );
  return <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{days}d remaining</span>;
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
      {children}
    </h2>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function CSRPartnerConsolePage() {
  const [activeFilter, setActiveFilter] = useState<ScheduleVIICategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const filterOptions: { label: string; value: ScheduleVIICategory; icon: React.ElementType; color: string }[] = [
    { label: "All Categories", value: "all", icon: Filter, color: "bg-slate-600" },
    { label: "Cat (i) — Water & Sanitation", value: "i", icon: Droplets, color: "bg-blue-600" },
    { label: "Cat (ii) — Agro-Forestry", value: "ii", icon: Sprout, color: "bg-green-600" },
    { label: "Cat (x) — University Incubators", value: "x", icon: FlaskConical, color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-10 max-w-screen-2xl mx-auto">

      {/* ══ Page Header ════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-violet-700" />
            <h1 className="text-lg font-black text-violet-950 tracking-tight leading-tight">
              Corporate Social Responsibility (CSR) &amp; Industry Innovation Hub
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-600 pl-8">
            JAGRIT Platform — Section 135 / Schedule VII Matched Escrow Ecosystem
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800 shrink-0">
          <BadgeCheck className="w-4 h-4 text-emerald-600" />
          Section 135 Schedule VII Compliance Verified
        </div>
      </div>

      {/* ══ Corporate Identity Card ════════════════════════════════════════════ */}
      <section>
        <SectionHeader>Active Corporate Partner</SectionHeader>
        <div className="bg-white rounded-2xl border border-violet-200 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-violet-50 via-white to-blue-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-violet-700 flex items-center justify-center shadow-md">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Tata Steel CSR &amp; Sustainability Division
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    CIN: L27102JH1907PLC000001 • PAN: AAACT2727Q
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      Schedule VII Verified
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3" />
                      Platinum CSR Partner
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white border border-violet-200 rounded-xl p-3 shadow-xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    Committed Escrow Pool
                  </p>
                  <p className="text-xl font-black text-violet-900 mt-0.5">₹50,00,000</p>
                  <p className="text-[10px] text-slate-500 font-medium">FY 2025–26</p>
                </div>
                <div className="bg-white border border-emerald-200 rounded-xl p-3 shadow-xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    State DHTE Match
                  </p>
                  <p className="text-xl font-black text-emerald-900 mt-0.5">₹50,00,000</p>
                  <p className="text-[10px] text-slate-500 font-medium">1:1 Guaranteed</p>
                </div>
                <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-xs col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    Total Deployed
                  </p>
                  <p className="text-xl font-black text-blue-900 mt-0.5">₹1,00,00,000</p>
                  <p className="text-[10px] text-slate-500 font-medium">Across 3 active projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Schedule VII Opportunity Pipeline ═════════════════════════════════ */}
      <section>
        <SectionHeader>Schedule VII Opportunity Pipeline</SectionHeader>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-5">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeFilter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActiveFilter(opt.value)}
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-xl border transition-all ${
                  isActive
                    ? `${opt.color} text-white border-transparent shadow-sm`
                    : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="p-4 sm:p-5 flex-1 space-y-3">
                {/* Category tag */}
                <div className="flex items-center gap-2">
                  <CategoryIcon cat={project.category} />
                  <span className="text-[10px] font-bold text-slate-500">{project.categoryLabel}</span>
                </div>

                {/* Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>

                {/* Meta */}
                <div className="space-y-1 text-[11px] text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">📍 Location:</span> {project.location}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">🎓 University:</span> {project.university}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">📊 Impact:</span> {project.impactMetric}
                  </p>
                </div>

                {/* Grant breakdown */}
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-violet-700 font-bold">🏢 CSR Pledged</span>
                    <span className="font-black text-violet-900">{project.csrPledged}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700 font-bold">🏛️ State DHTE Match</span>
                    <span className="font-black text-emerald-900">{project.stateMatch}</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex justify-between">
                    <span className="text-blue-700 font-bold">💼 Total Grant</span>
                    <span className="font-black text-blue-900">{project.grantTotal}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400">{project.id}</span>
                <button className="inline-flex items-center gap-1 text-[11px] font-bold text-violet-700 hover:text-violet-900 transition-colors">
                  View Project
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 1:1 Matching Grant Pledge Slider ══════════════════════════════════ */}
      <section>
        <SectionHeader>Interactive 1:1 Matching Grant Escrow Pledge</SectionHeader>
        <MatchingPledgeSlider />
      </section>

      {/* ══ Corporate Technical Mentorship Board ══════════════════════════════ */}
      <section>
        <SectionHeader>Corporate Technical Mentorship Board</SectionHeader>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-700" />
            <h3 className="font-black text-slate-900 text-sm">
              Assigned Corporate Engineers — Round 2 Bench Test Audit Sign-Off
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Student Team
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Problem Domain
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Assigned Corporate Engineer
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Round 2 Bench Test Audit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MENTORS.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-violet-50/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="text-[12px] font-black text-slate-900">{row.team.split("(")[0].trim()}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {row.team.match(/\(([^)]+)\)/)?.[1] ?? ""}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[11px] text-slate-700 font-medium max-w-[200px] leading-snug">
                      {row.domain}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[12px] font-black text-slate-900">{row.engineer}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{row.title}</div>
                      <div className="text-[10px] text-violet-700 font-bold mt-0.5">{row.company}</div>
                    </td>
                    <td className="px-5 py-4">
                      <AuditBadge status={row.auditStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ Commercialization & ROFR Licensing Dashboard ══════════════════════ */}
      <section>
        <SectionHeader>Commercialization &amp; ROFR Licensing Dashboard</SectionHeader>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-orange-600" />
              <h3 className="font-black text-slate-900 text-sm">
                University Patent Catalog — Right of First Refusal (ROFR) for Manufacturing
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
              {PATENTS.filter((p) => p.status !== "Exercised").length} Active ROFR Windows
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {PATENTS.map((patent) => (
              <div
                key={patent.id}
                className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-orange-50/20 transition-colors ${
                  patent.status === "Exercised" ? "opacity-60" : ""
                }`}
              >
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400">{patent.id}</span>
                    <ROFRBadge days={patent.daysLeft} status={patent.status} />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">{patent.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span>
                      <span className="font-semibold text-slate-700">University:</span> {patent.university}
                    </span>
                    <span>
                      <span className="font-semibold text-slate-700">Filed:</span> {patent.filedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      <span className="font-semibold text-slate-700">ROFR Deadline:</span>{" "}
                      {patent.rofr_deadline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {patent.status !== "Exercised" && (
                    <button className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 border border-orange-200 bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-xl transition-colors">
                      <IndianRupee className="w-3.5 h-3.5" />
                      Exercise ROFR License
                    </button>
                  )}
                  <button className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-700 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Full Patent
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-mono text-center">
              All patents are 100% resolved IP — university-owned, Tata Steel holds ROFR for 6 months post-grant closure •
              JAGRIT IP Vault v1.0 • IPFS-logged
            </p>
          </div>
        </div>
      </section>

      {/* ══ Footer note ════════════════════════════════════════════════════════ */}
      <div className="text-[10px] text-slate-400 text-center pb-4">
        JAGRIT SIH26043 • Corporate CSR &amp; Industry Innovation Hub •
        Section 135 / Schedule VII • All pledges logged to immutable IPFS audit ledger.
      </div>
    </div>
  );
}

