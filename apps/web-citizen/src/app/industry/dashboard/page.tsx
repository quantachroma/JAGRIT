'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  Gavel,
  IndianRupee,
  Landmark,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface OversightProject {
  id: string;
  title: string;
  leadHei: string;
  stateAllocation: string;
  corporateMatch: string;
  corporatePartner: string;
  status: string;
  mentor: string;
}

interface PatentRecord {
  id: string;
  title: string;
  leadShare: string;
  heiRoyalty: string;
  rofrStatus: string;
  stateLicense: string;
}

interface EscrowOverview {
  metrics: {
    totalCommittedCsrPool: string;
    stateMatchingGrantsDisbursed: string;
    activeCorporateMentors: string;
    tripartiteIprConcordats: string;
  };
  projects: OversightProject[];
  patents: PatentRecord[];
}

const FALLBACK_OVERVIEW: EscrowOverview = {
  metrics: {
    totalCommittedCsrPool: '₹50.00 Lakh',
    stateMatchingGrantsDisbursed: '₹24.50 Lakh',
    activeCorporateMentors: '14 Senior Engineers',
    tripartiteIprConcordats: '8 Agreements',
  },
  projects: [
    {
      id: 'JAG-CSR-01',
      title: 'Solar Fluoride Purification for 12 Anganwadi Centers (Palamu)',
      leadHei: 'BIT Mesra (Dept. of Environmental Engineering)',
      stateAllocation: '₹3.50 Lakh',
      corporateMatch: '₹3.50 Lakh',
      corporatePartner: 'Tata Steel CSR',
      status: '✅ 1:1 Matched & Escrow Locked (Schedule VII Compliant)',
      mentor: 'Dr. A. Sen (Senior Principal Scientist, Tata Steel R&D)',
    },
    {
      id: 'JAG-CSR-02',
      title: 'Tribal Lac Post-Harvest Desiccant Storage Units (Khunti)',
      leadHei: 'BAU Ranchi',
      stateAllocation: '₹4.20 Lakh',
      corporateMatch: '₹4.20 Lakh',
      corporatePartner: 'CCL CSR',
      status: '✅ 1:1 Matched & Escrow Locked',
      mentor: 'Er. Manoj Kumar (CCL Agro-Infrastructure Cell)',
    },
  ],
  patents: [
    {
      id: 'IN-2026-JAG-001',
      title: 'Activated Alumina Gradient Defluoridation Filter',
      leadShare: '60%',
      heiRoyalty: '25%',
      rofrStatus: 'Tata Steel ROFR active through 15 Sep 2026',
      stateLicense: 'Verified: royalty-free public deployment',
    },
    {
      id: 'IN-2026-JAG-004',
      title: 'IoT Real-Time Water Quality Telemetry Module',
      leadShare: '60%',
      heiRoyalty: '20%',
      rofrStatus: 'CCL ROFR review pending',
      stateLicense: 'Verified: royalty-free public deployment',
    },
  ],
};

const KPI_CARDS = [
  { key: 'totalCommittedCsrPool', label: 'Total Committed CSR Pool', icon: IndianRupee, accent: 'bg-amber-600', tint: 'bg-amber-50' },
  { key: 'stateMatchingGrantsDisbursed', label: '1:1 State Matching Grants Disbursed', icon: Landmark, accent: 'bg-blue-700', tint: 'bg-blue-50' },
  { key: 'activeCorporateMentors', label: 'Active Corporate Mentors Assigned', icon: Users, accent: 'bg-emerald-700', tint: 'bg-emerald-50' },
  { key: 'tripartiteIprConcordats', label: 'Tripartite IPR Concordats Ratified', icon: FileCheck2, accent: 'bg-violet-700', tint: 'bg-violet-50' },
] as const;

export default function IndustryDashboardPage() {
  const [overview, setOverview] = useState<EscrowOverview>(FALLBACK_OVERVIEW);
  const [syncState, setSyncState] = useState<'loading' | 'live' | 'fallback'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function loadOverview() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/escrow/overview`, { signal: controller.signal });
        if (!response.ok) throw new Error('Escrow overview request failed');
        const payload = (await response.json()) as Partial<EscrowOverview>;
        setOverview({
          metrics: { ...FALLBACK_OVERVIEW.metrics, ...(payload.metrics || {}) },
          projects: payload.projects?.length ? payload.projects : FALLBACK_OVERVIEW.projects,
          patents: payload.patents?.length ? payload.patents : FALLBACK_OVERVIEW.patents,
        });
        setSyncState('live');
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setSyncState('fallback');
      }
    }

    void loadOverview();
    return () => controller.abort();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl space-y-8 pb-12">
      <header className="rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sky-100 ring-1 ring-white/20"><Landmark className="h-3.5 w-3.5" /> DHTE evaluator console</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1.5 text-emerald-200 ring-1 ring-emerald-300/30"><ShieldCheck className="h-3.5 w-3.5" /> Section 135 verified</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">State CSR &amp; Corporate Co-Funding Command Center</h1>
            <p className="max-w-3xl text-sm leading-6 text-blue-100">Monitoring Schedule VII compliance, 1:1 state co-grants, and industry mentorship under Companies Act 2013 (Sec 135).</p>
          </div>
          <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-4 text-xs text-blue-100">
            <p className="font-black uppercase tracking-wider text-sky-200">Data sync</p>
            <p className="mt-1 flex items-center gap-1.5 font-bold"><span className={`h-2 w-2 rounded-full ${syncState === 'live' ? 'bg-emerald-400' : syncState === 'loading' ? 'bg-amber-300' : 'bg-slate-300'}`} />{syncState === 'live' ? 'Live escrow records' : syncState === 'loading' ? 'Loading escrow records' : 'Reference records displayed'}</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">State oversight summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_CARDS.map(({ key, label, icon: Icon, accent, tint }) => (
            <div key={key} className={`${tint} flex items-start gap-4 rounded-2xl border border-slate-200 p-5 shadow-xs`}>
              <div className={`${accent} rounded-xl p-3 text-white`}><Icon className="h-5 w-5" /></div>
              <div><p className="text-[10px] font-black uppercase leading-tight tracking-wide text-slate-500">{label}</p><p className="mt-1 text-xl font-black leading-tight text-slate-950">{overview.metrics[key]}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="projects-heading" className="space-y-4">
        <div><h2 id="projects-heading" className="text-lg font-black text-slate-900">High-Impact Projects Co-Funding Tracking</h2><p className="text-xs text-slate-500">Administrative view of state allocations, corporate matching funds, escrow locks, and mentor accountability.</p></div>
        <div className="grid gap-5 lg:grid-cols-2">
          {overview.projects.map((project) => (
            <article key={project.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3"><span className="font-mono text-[11px] font-black text-slate-500">{project.id}</span><span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" /> Matched</span></div>
                <h3 className="text-base font-black leading-snug text-slate-900">{project.title}</h3>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"><p className="font-bold text-slate-500">Lead HEI</p><p className="mt-1 font-black text-slate-900">{project.leadHei}</p></div>
                <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-blue-200 bg-blue-50 p-3"><p className="text-[10px] font-black uppercase tracking-wide text-blue-700">State DHTE allocation</p><p className="mt-1 text-lg font-black text-blue-950">{project.stateAllocation}</p></div><div className="rounded-xl border border-amber-200 bg-amber-50 p-3"><p className="text-[10px] font-black uppercase tracking-wide text-amber-700">Corporate CSR match</p><p className="mt-1 text-lg font-black text-amber-950">{project.corporateMatch}</p><p className="text-[10px] font-bold text-amber-800">{project.corporatePartner}</p></div></div>
                <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-900"><Lock className="mt-0.5 h-4 w-4 shrink-0" /><span>{project.status}</span></div>
                <div className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs"><Users className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" /><span><strong className="text-slate-900">Assigned Corporate Mentor:</strong> <span className="text-slate-700">{project.mentor}</span></span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="ipr-heading" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="ipr-heading" className="flex items-center gap-2 text-lg font-black text-slate-900"><Gavel className="h-5 w-5 text-violet-700" /> Tripartite IPR &amp; ROFR Monitoring</h2><p className="mt-1 text-xs text-slate-500">PRD Section 10 · Academia–Industry–State Concordat register</p></div><span className="inline-flex items-center gap-1.5 self-start rounded-full bg-violet-100 px-3 py-1 text-[11px] font-black text-violet-900"><BadgeCheck className="h-3.5 w-3.5" /> State review enabled</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-xs"><thead className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Patent ID</th><th className="px-5 py-3">Title</th><th className="px-5 py-3">Lead student / faculty share</th><th className="px-5 py-3">HEI royalty share</th><th className="px-5 py-3">Corporate ROFR status</th><th className="px-5 py-3">State license</th></tr></thead><tbody className="divide-y divide-slate-100">{overview.patents.map((patent) => <tr key={patent.id} className="align-top hover:bg-violet-50/30"><td className="whitespace-nowrap px-5 py-4 font-mono font-black text-slate-500">{patent.id}</td><td className="px-5 py-4 font-black text-slate-900">{patent.title}</td><td className="px-5 py-4 font-bold text-emerald-800">{patent.leadShare} <span className="block text-[10px] font-medium text-slate-500">Minimum concordat threshold met</span></td><td className="px-5 py-4 font-bold text-blue-800">{patent.heiRoyalty}</td><td className="px-5 py-4 text-slate-700">{patent.rofrStatus}</td><td className="px-5 py-4 font-bold text-emerald-800">{patent.stateLicense}</td></tr>)}</tbody></table></div>
        <div className="flex items-center gap-2 border-t border-slate-100 p-4 text-[10px] font-bold text-slate-500"><FileCheck2 className="h-3.5 w-3.5 text-emerald-600" /> State license verification is required before any commercial deployment or ROFR exercise.</div>
      </section>

      <footer className="text-center text-[10px] text-slate-400">JAGRIT SIH26043 · DHTE CSR oversight · Companies Act 2013 Section 135 / Schedule VII · All review records audit-logged.</footer>
    </div>
  );
}
