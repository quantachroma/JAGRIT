'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import MacroImpactBanner from '@/components/progress/macro-impact-banner';
import UniversityLeaderboard from '@/components/progress/university-leaderboard';
import DistrictBreakdownTable from '@/components/progress/district-breakdown-table';
import { STATEWIDE_MACRO_METRICS } from '@/components/progress/statewide-data';
import type { MacroMetrics } from '@/components/progress/statewide-types';
import {
  TrendingUp,
  Activity,
  Trophy,
  MapPin,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  ChevronRight,
} from 'lucide-react';

type Challenge = {
  id: string;
  ticket_number: string;
  title: string;
  description?: string;
  district?: string;
  block?: string;
  village_name?: string;
  submission_channel?: string;
  upvotes_count?: number;
  status?: string;
};

type ChallengeStage = {
  label: string;
  explanation: string;
  className: string;
};

function normalizeChallenge(value: unknown): Challenge | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (typeof record.ticket_number !== 'string' || typeof record.title !== 'string') return null;

  return {
    id: typeof record.id === 'string' ? record.id : record.ticket_number,
    ticket_number: record.ticket_number,
    title: record.title,
    description: typeof record.description === 'string' ? record.description : undefined,
    district: typeof record.district === 'string' ? record.district : undefined,
    block: typeof record.block === 'string' ? record.block : undefined,
    village_name: typeof record.village_name === 'string'
      ? record.village_name
      : typeof record.village === 'string'
      ? record.village
      : typeof record.block === 'string'
      ? record.block
      : undefined,
    submission_channel: typeof record.submission_channel === 'string' ? record.submission_channel : undefined,
    upvotes_count: typeof record.upvotes_count === 'number' ? record.upvotes_count : undefined,
    status: typeof record.status === 'string' ? record.status : undefined,
  };
}

const FALLBACK_CHALLENGES: Challenge[] = [
  { id: 'fallback-pal-3785', ticket_number: 'JAG-2026-PAL-3785', title: 'Voice Report: मेरे गाउ महुआ में काला पानी आ रहा है नल से', description: 'मेरे गाउ महुआ में काला पानी आ रहा है नल से मैं बहुत परिशान हूँ प्लीज मदद करें', district: 'Palamu', block: 'Daltonganj', village_name: 'Mahua', submission_channel: 'WHATSAPP', upvotes_count: 6, status: 'PENDING_HITL' },
  { id: 'fallback-kht-0014', ticket_number: 'JAG-2026-KHT-0014', title: 'Post-Harvest Lac Produce Spoilage & Fungal Rot in Khunti', description: 'Lac, tamarind and minor forest produce spoil within 48 hours in Khunti heat.', district: 'Khunti', block: 'Murhu', village_name: 'Murhu', submission_channel: 'WEB', upvotes_count: 34, status: 'DYNAMIC_HACKATHON' },
  { id: 'fallback-wsh-0031', ticket_number: 'JAG-2026-WSH-0031', title: 'Primary Health Dispensary Solar Battery Voltage Surges', description: 'Remote tribal health dispensary in Tantnagar experiences battery inverter dropouts.', district: 'West Singhbhum', block: 'Tantnagar', village_name: 'Tantnagar', submission_channel: 'WEB', upvotes_count: 28, status: 'IN_PILOT' },
  { id: 'fallback-dhn-0055', ticket_number: 'JAG-2026-DHN-0055', title: 'Acid Mine Drainage Runoff into Potable Water Streams', description: 'Pyrite oxidation runoff contaminating drinking water streams in Jharia mining belt.', district: 'Dhanbad', block: 'Jharia', village_name: 'Jharia', submission_channel: 'APP', upvotes_count: 52, status: '100%_RESOLVED' },
  { id: 'fallback-rnc-0087', ticket_number: 'JAG-2026-RNC-0087', title: 'Deep Pothole and Drainage Waterlogging on Kanke Road', description: 'Routine municipal waterlogging and road crater outside Kanke block office.', district: 'Ranchi', block: 'Kanke', village_name: 'Kanke', submission_channel: 'WHATSAPP', upvotes_count: 12, status: 'ROUTED_CIVIC' },
];

const lifecycleSteps = ['Citizen Speaks', 'AI Eliminates Duplicates', 'Upvotes & Grant', 'University Hackathon', '3-Step Escrow', '45-Day Village Test'];

function lifecycleBadge(status?: string): ChallengeStage {
  switch (status) {
    case 'PENDING_HITL': return { label: 'AI Triage Queue · Evaluator Review', explanation: 'The report is being checked by an evaluator so the problem can be understood, grouped, and sent to the right next step.', className: 'bg-yellow-50 text-yellow-800 border-yellow-300' };
    case 'OPEN_FOR_BIDS': return { label: 'University Bidding', explanation: 'Universities are reviewing this challenge and proposing practical solutions for the village.', className: 'bg-blue-50 text-blue-800 border-blue-300' };
    case 'DYNAMIC_HACKATHON': return { label: 'University Bidding', explanation: 'A university team is shaping and testing a solution proposal for this challenge.', className: 'bg-indigo-50 text-indigo-800 border-indigo-300' };
    case 'IN_PILOT': return { label: 'In 45-Day Village Test', explanation: 'The proposed solution is being tested in the village for 45 days. Community feedback helps confirm whether it works.', className: 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse' };
    case '100%_RESOLVED':
    case 'RESOLVED': return { label: '100% Solved (Quorum Passed)', explanation: 'The community has confirmed that the problem is solved through the public quorum check.', className: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
    case 'ROUTED_CIVIC': return { label: 'AI Triage Queue · Evaluator Review', explanation: 'This report has been routed for civic review so the responsible local authority can take the next action.', className: 'bg-slate-100 text-slate-700 border-slate-300' };
    default: return { label: 'AI Triage Queue · Evaluator Review', explanation: 'The report is being checked by an evaluator so the problem can be understood, grouped, and sent to the right next step.', className: 'bg-yellow-50 text-yellow-800 border-yellow-300' };
  }
}

function normalizedStatus(status?: string) {
  return status === 'RESOLVED' ? '100%_RESOLVED' : status || 'PENDING_HITL';
}

type ProjectRow = {
  id: string;
  lead_university_name: string | null;
  total_budget_inr: number | null;
  tranche_1_disbursed: boolean;
  tranche_2_disbursed: boolean;
  tranche_3_disbursed: boolean;
  maturation_ends_at: string | null;
  current_hackathon_round: number | null;
  resolution_status: string;
  challenge: { ticket_number: string; title: string; district: string } | null;
};

type SupabaseProjectRow = Omit<ProjectRow, 'challenge'> & {
  challenge: { ticket_number: string; title: string; district: string }[] | null;
};

const seededSolvedOffset = 1248;

const localized = (value: string) => ({ en: value, hi: value, sat: value });

const formatCompactCurrency = (amount: number) =>
  amount >= 10000000
    ? `₹${(amount / 10000000).toFixed(2)} Cr`
    : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function StatewideProgressPage() {
  const { language } = useCitizen();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'pipeline' | 'universities' | 'districts'>('all');
  const [metrics, setMetrics] = useState<MacroMetrics>(STATEWIDE_MACRO_METRICS);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(FALLBACK_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [statusFilter, setStatusFilter] = useState('All Stages');
  const [challengeSearch, setChallengeSearch] = useState('');

  useEffect(() => {
    let active = true;

    const loadProgressData = async () => {
      const [clustersResult, projectsResult] = await Promise.all([
        supabase
          .from('incident_clusters')
          .select('cluster_code, title, thematic_domain, complexity_tier, district, block, priority_score, status, report_velocity'),
        supabase
          .from('projects')
          .select('id, lead_university_name, total_budget_inr, tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed, maturation_ends_at, current_hackathon_round, resolution_status, challenge:challenges(ticket_number, title, district)'),
      ]);

      if (!active || projectsResult.error || clustersResult.error) return;

      const liveProjects = ((projectsResult.data || []) as SupabaseProjectRow[]).map((project) => ({
        ...project,
        challenge: project.challenge?.[0] || null,
      }));
      const disbursedTotal = liveProjects.reduce((sum, project) => {
        const budget = Number(project.total_budget_inr || 0);
        return sum + budget * (0.3 * Number(project.tranche_1_disbursed) + 0.4 * Number(project.tranche_2_disbursed) + 0.3 * Number(project.tranche_3_disbursed));
      }, 0);
      setProjects(liveProjects);
      setMetrics({
        ...STATEWIDE_MACRO_METRICS,
        solvedProblemsCount: (seededSolvedOffset + liveProjects.filter((project) => project.resolution_status === 'COMPLETELY_SOLVED').length).toLocaleString('en-IN'),
        activeProjectsCount: liveProjects.filter((project) => project.resolution_status === 'IN_PROGRESS').length.toLocaleString('en-IN'),
        fundsMobilizedAmount: formatCompactCurrency(disbursedTotal),
      });
    };

    void loadProgressData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadChallenges = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/v1/challenges`);
        if (!response.ok) throw new Error(`Challenge request failed: ${response.status}`);
        const payload = await response.json() as unknown;
        if (!Array.isArray(payload)) throw new Error('Challenge response was not an array.');
        const liveChallenges = payload.map(normalizeChallenge).filter((challenge): challenge is Challenge => challenge !== null);
        if (!liveChallenges.length) throw new Error('Challenge response contained no valid challenges.');
        if (active) setChallenges(liveChallenges);
      } catch (error) {
        console.warn('Using seeded progress tracker fixtures:', error);
        if (active) setChallenges(FALLBACK_CHALLENGES);
      }
    };

    void loadChallenges();
    return () => {
      active = false;
    };
  }, []);

  const filteredChallenges = challenges.filter((challenge) => {
    const normalizedChallengeStatus = normalizedStatus(challenge.status);
    const searchText = challengeSearch.trim().toLowerCase();
    const searchableText = [challenge.ticket_number, challenge.village_name, challenge.title, challenge.description].filter(Boolean).join(' ').toLowerCase();
    const matchesDistrict = districtFilter === 'All Districts' || challenge.district === districtFilter;
    const matchesStatus = statusFilter === 'All Stages' ||
      (statusFilter === '1. AI Triage Review' && normalizedChallengeStatus === 'PENDING_HITL') ||
      (statusFilter === '2. University Bidding' && ['OPEN_FOR_BIDS', 'DYNAMIC_HACKATHON'].includes(normalizedChallengeStatus)) ||
      (statusFilter === '3. In 45-Day Village Test' && normalizedChallengeStatus === 'IN_PILOT') ||
      (statusFilter === '4. 100% Solved (Quorum Passed)' && normalizedChallengeStatus === '100%_RESOLVED');
    return matchesDistrict && matchesStatus && (!searchText || searchableText.includes(searchText));
  });

  const challengeMetrics = {
    total: challenges.length,
    bids: challenges.filter((challenge) => ['OPEN_FOR_BIDS', 'DYNAMIC_HACKATHON'].includes(normalizedStatus(challenge.status))).length,
    pilots: challenges.filter((challenge) => normalizedStatus(challenge.status) === 'IN_PILOT').length,
    solved: challenges.filter((challenge) => normalizedStatus(challenge.status) === '100%_RESOLVED').length,
  };

  const selectedChallengeIsMahua = selectedChallenge
    ? /mahua|JAG-2026-PAL-3785/i.test(`${selectedChallenge.title} ${selectedChallenge.ticket_number}`)
    : false;

  const scrollToSection = (id: string, tab: 'all' | 'pipeline' | 'universities' | 'districts') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 pb-20 animate-in fade-in duration-300">
      {/* Sticky Quick-Nav Sub-bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 px-3 sm:px-4 rounded-2xl shadow-xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
          <button
            type="button"
            onClick={() => scrollToSection('section-macro', 'all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'all'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.progressTracker.navOverview}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-pipeline', 'pipeline')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'pipeline'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.progressTracker.navPipeline}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-universities', 'universities')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'universities'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t.progressTracker.navUniversities}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-districts', 'districts')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'districts'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.progressTracker.navDistricts}</span>
          </button>
        </div>

      </div>

      {/* SECTION 1: MACRO IMPACT BANNER */}
      <div id="section-macro" className="scroll-mt-36">
          <MacroImpactBanner language={language} metrics={metrics} />
      </div>

      <section className="space-y-5" aria-labelledby="challenge-tracker-heading">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-800">Public Process & Project Lifecycle</span>
          <h2 id="challenge-tracker-heading" className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">Statewide Progress Tracker</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">Live challenge movement from citizen voice report to university solution, field pilot, and verified resolution.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: 'Total Challenges Ingested', value: challengeMetrics.total, color: 'border-slate-300 text-slate-900' },
            { label: 'Active University Bids / Hackathons', value: challengeMetrics.bids, color: 'border-blue-300 text-blue-800' },
            { label: 'Machines on 45-Day Village Test', subtitle: 'Unassisted field trials with active Breakdown Alarm protection', value: challengeMetrics.pilots, color: 'border-amber-300 text-amber-800' },
            { label: 'Solved & Quorum Verified', value: challengeMetrics.solved, color: 'border-emerald-300 text-emerald-800' },
          ].map((metric) => (
            <div key={metric.label} className={`rounded-2xl border-2 bg-white p-4 shadow-sm ${metric.color}`}>
              <div className="font-mono text-2xl font-black sm:text-3xl">{metric.value}</div>
              <div className="mt-1 text-xs font-bold leading-snug text-slate-600">{metric.label}</div>
              {'subtitle' in metric && <div className="mt-1 text-[11px] leading-snug text-slate-500">{metric.subtitle}</div>}
            </div>
          ))}
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search challenges</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={challengeSearch} onChange={(event) => setChallengeSearch(event.target.value)} placeholder="Search ticket, title, or village" className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none ring-blue-500 focus:ring-2" />
          </label>
          <label className="block">
            <span className="sr-only">District filter</span>
            <select value={districtFilter} onChange={(event) => setDistrictFilter(event.target.value)} className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none ring-blue-500 focus:ring-2">
              {['All Districts', 'Palamu', 'Khunti', 'Dhanbad', 'West Singhbhum', 'Ranchi'].map((district) => <option key={district}>{district}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="sr-only">Stage filter</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none ring-blue-500 focus:ring-2">
              {['All Stages', '1. AI Triage Review', '2. University Bidding', '3. In 45-Day Village Test', '4. 100% Solved (Quorum Passed)'].map((stage) => <option key={stage}>{stage}</option>)}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredChallenges.map((challenge) => {
            const badge = lifecycleBadge(challenge.status);
            const isMahua = /mahua|JAG-2026-PAL-3785/i.test(`${challenge.title} ${challenge.ticket_number}`);
            return (
              <button key={challenge.id || challenge.ticket_number} type="button" onClick={() => setSelectedChallenge(challenge)} className="group rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-xs font-black uppercase tracking-wider text-white">#{challenge.ticket_number}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
                <h3 className="mt-4 text-base font-black leading-snug text-slate-900">{challenge.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{challenge.description || 'Verified citizen challenge awaiting the next public process milestone.'}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>📍 {challenge.district || 'Jharkhand'}, {challenge.village_name || challenge.block || 'Jharkhand'}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{challenge.district || 'Jharkhand'} District · {challenge.submission_channel?.toUpperCase().includes('WHATSAPP') ? 'WhatsApp Voice' : 'Web Portal'}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{challenge.upvotes_count || 0} upvotes</span>
                </div>
                <span className={`mt-4 inline-flex border px-3 py-1.5 text-xs font-bold ${badge.className} rounded-full`}>{badge.label}</span>
                {isMahua && <span className="mt-3 block text-xs font-bold text-blue-700">Open card for university bidding route</span>}
              </button>
            );
          })}
        </div>
        {filteredChallenges.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-semibold text-slate-500">No challenges match the selected filters.</div>}
      </section>

      {/* SECTION 2: HIGHER EDUCATION INSTITUTIONS LEADERBOARD & RESOLUTION PORTFOLIOS */}
      <div id="section-universities" className="scroll-mt-36 pt-2">
        <UniversityLeaderboard language={language} />
      </div>

      {/* SECTION 4: DISTRICT RESOLUTION BREAKDOWN */}
      <div id="section-districts" className="scroll-mt-36 pt-2">
        <DistrictBreakdownTable language={language} />
      </div>

      {/* BOTTOM CITIZEN ACTION & AUDIT NOTICE */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-sky-200 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            <span>{t.progressTracker.calloutBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {t.progressTracker.calloutTitle}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-normal leading-relaxed">
            {t.progressTracker.calloutDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-white hover:bg-slate-100 text-blue-900 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>{t.progressTracker.reportProblemBtn}</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </Link>

          <Link
            href="/samvaad"
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-blue-900/80 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold border border-blue-400/40 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-sky-300" />
            <span>{t.progressTracker.joinSamvaadBtn}</span>
          </Link>
        </div>
      </div>

      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="challenge-inspection-title">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-blue-700">{selectedChallenge.ticket_number}</span>
                <h2 id="challenge-inspection-title" className="mt-1 text-xl font-black leading-tight text-slate-950">{selectedChallenge.title}</h2>
                <p className="mt-2 text-sm text-slate-600">📍 {selectedChallenge.district || 'Jharkhand'}, {selectedChallenge.block || 'Jharkhand'} · 👍 {selectedChallenge.upvotes_count || 1} Upvotes</p>
              </div>
              <button type="button" onClick={() => setSelectedChallenge(null)} aria-label="Close inspection" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">{selectedChallenge.description || 'No additional description was submitted.'}</p>
            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-blue-700">Current step</p>
              <p className="mt-1 text-base font-black text-blue-950">{lifecycleBadge(selectedChallenge.status).label}</p>
              <p className="mt-1 text-sm leading-relaxed text-blue-900">{lifecycleBadge(selectedChallenge.status).explanation}</p>
            </div>
            <div className="mt-6 space-y-3">
              {lifecycleSteps.map((step, index) => {
                const currentStatus = normalizedStatus(selectedChallenge.status);
                const completed = (currentStatus === 'PENDING_HITL' && index === 0) || (currentStatus === 'OPEN_FOR_BIDS' && index <= 2) || (currentStatus === 'DYNAMIC_HACKATHON' && index <= 3) || (currentStatus === 'IN_PILOT' && index <= 4) || (currentStatus === '100%_RESOLVED' && index <= 5) || (currentStatus === 'ROUTED_CIVIC' && index <= 1);
                return <div key={step} className={`flex items-center gap-3 rounded-xl border p-3 ${completed ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${completed ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span><span className={`text-sm font-bold ${completed ? 'text-blue-900' : 'text-slate-500'}`}>{step}</span>{completed && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />}</div>;
              })}
            </div>
            {selectedChallengeIsMahua && <Link href="/university/dashboard" onClick={() => setSelectedChallenge(null)} className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-800">View in University Bidding</Link>}
          </div>
        </div>
      )}

    </div>
  );
}

