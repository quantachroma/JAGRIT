'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import MacroImpactBanner from '@/components/progress/macro-impact-banner';
import OngoingPipeline from '@/components/progress/ongoing-pipeline';
import UniversityLeaderboard from '@/components/progress/university-leaderboard';
import DistrictBreakdownTable from '@/components/progress/district-breakdown-table';
import { STATEWIDE_MACRO_METRICS } from '@/components/progress/statewide-data';
import type { MacroMetrics, OngoingProjectItem } from '@/components/progress/statewide-types';
import {
  TrendingUp,
  Activity,
  Trophy,
  MapPin,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Boxes,
  Loader2,
} from 'lucide-react';

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

type BlueprintRow = {
  id: string;
  blueprint_code: string;
  title: string;
  thematic_domain: string;
  developed_by_heis: string | null;
  bom_json: Record<string, unknown>;
  capital_cost_inr: number | null;
  mean_quorum_rating: number | null;
  cloned_count: number;
};

const seededSolvedOffset = 1248;

const localized = (value: string) => ({ en: value, hi: value, sat: value });

const formatIndianCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatCompactCurrency = (amount: number) =>
  amount >= 10000000 ? `₹${(amount / 10000000).toFixed(2)} Cr` : formatIndianCurrency(amount);

const toLiveProject = (project: ProjectRow): OngoingProjectItem => {
  const challenge = project.challenge;
  const round = project.current_hackathon_round;
  const isMaturation = Boolean(project.maturation_ends_at);
  const stageKey = isMaturation ? 'maturation' : round && round >= 2 ? 'prototyping' : 'bidding';
  const stageLabel = isMaturation
    ? '45-Day Unassisted Maturation Buffer'
    : round && round >= 2
    ? `Hackathon Round ${round}: Functional Prototyping & Review`
    : 'Bidding Window';
  const stageProgressPct = isMaturation ? 75 : round && round >= 2 ? 50 : 25;
  const disbursed = [project.tranche_1_disbursed, project.tranche_2_disbursed, project.tranche_3_disbursed]
    .filter(Boolean).length;
  const released = (project.total_budget_inr || 0) * ([0.3, 0.4, 0.3][0] * Number(project.tranche_1_disbursed) + [0.3, 0.4, 0.3][1] * Number(project.tranche_2_disbursed) + [0.3, 0.4, 0.3][2] * Number(project.tranche_3_disbursed));
  const domain = project.challenge?.title?.toLowerCase().includes('water') ? 'water' : 'all';

  return {
    id: project.id,
    ticketId: challenge?.ticket_number || project.id.slice(0, 8),
    domainKey: domain,
    stageKey,
    title: localized(challenge?.title || 'Untitled project'),
    location: localized(challenge?.district || 'Jharkhand'),
    institution: localized(project.lead_university_name || 'University partner pending'),
    facultyPi: localized('Project lead details pending'),
    liveStageLabel: localized(stageLabel),
    stageBadgeColor: isMaturation ? 'emerald' : round && round >= 2 ? 'blue' : 'amber',
    stageProgressPct,
    escrowStatus: localized(`${disbursed} tranche${disbursed === 1 ? '' : 's'} disbursed (${formatIndianCurrency(released)} released)`),
    fieldHealth: localized('Live project status reported by Supabase'),
    mentorOrCompliance: localized(`Resolution status: ${project.resolution_status}`),
    inspectUrl: `/progress/${challenge?.ticket_number || project.id}`,
  };
};

export default function StatewideProgressPage() {
  const { language } = useCitizen();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'pipeline' | 'universities' | 'districts'>('all');
  const [metrics, setMetrics] = useState<MacroMetrics>(STATEWIDE_MACRO_METRICS);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [blueprints, setBlueprints] = useState<BlueprintRow[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<BlueprintRow | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProgressData = async () => {
      const [clustersResult, projectsResult, blueprintsResult] = await Promise.all([
        supabase
          .from('incident_clusters')
          .select('cluster_code, title, thematic_domain, complexity_tier, district, block, priority_score, status, report_velocity'),
        supabase
          .from('projects')
          .select('id, lead_university_name, total_budget_inr, tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed, maturation_ends_at, current_hackathon_round, resolution_status, challenge:challenges(ticket_number, title, district)'),
        supabase
          .from('verified_blueprints')
          .select('id, blueprint_code, title, thematic_domain, developed_by_heis, bom_json, capital_cost_inr, mean_quorum_rating, cloned_count'),
      ]);

      if (!active || projectsResult.error || blueprintsResult.error || clustersResult.error) return;

      const liveProjects = ((projectsResult.data || []) as SupabaseProjectRow[]).map((project) => ({
        ...project,
        challenge: project.challenge?.[0] || null,
      }));
      const liveBlueprints = (blueprintsResult.data || []) as BlueprintRow[];
      const disbursedTotal = liveProjects.reduce((sum, project) => {
        const budget = Number(project.total_budget_inr || 0);
        return sum + budget * (0.3 * Number(project.tranche_1_disbursed) + 0.4 * Number(project.tranche_2_disbursed) + 0.3 * Number(project.tranche_3_disbursed));
      }, 0);
      const universities = new Set(liveProjects.map((project) => project.lead_university_name).filter(Boolean));

      setProjects(liveProjects);
      setBlueprints(liveBlueprints);
      setMetrics({
        ...STATEWIDE_MACRO_METRICS,
        solvedProblemsCount: (seededSolvedOffset + liveProjects.filter((project) => project.resolution_status === 'COMPLETELY_SOLVED').length).toLocaleString('en-IN'),
        activeProjectsCount: liveProjects.filter((project) => project.resolution_status === 'IN_PROGRESS').length.toLocaleString('en-IN'),
        institutionsCount: universities.size.toLocaleString('en-IN'),
        fundsMobilizedAmount: formatCompactCurrency(disbursedTotal),
      });
    };

    void loadProgressData();
    return () => {
      active = false;
    };
  }, []);

  const handleCloneBlueprint = async () => {
    if (!selectedBlueprint) return;
    setIsCloning(true);
    const nextCount = selectedBlueprint.cloned_count + 1;
    const { error } = await supabase
      .from('verified_blueprints')
      .update({ cloned_count: nextCount })
      .eq('id', selectedBlueprint.id);

    setIsCloning(false);
    if (error) return;
    setBlueprints((current) => current.map((blueprint) => blueprint.id === selectedBlueprint.id ? { ...blueprint, cloned_count: nextCount } : blueprint));
    setSelectedBlueprint(null);
    setNotification('Blueprint cloned successfully for target district. Fast-track fabrication order dispatched.');
    window.setTimeout(() => setNotification(null), 5000);
  };

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

        {/* Quick Report CTA in subbar */}
        <Link
          href="/report"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex-shrink-0"
        >
          <AlertCircle className="w-3.5 h-3.5 text-blue-700" />
          <span>{t.progressTracker.reportIssueBtn}</span>
        </Link>
      </div>

      {/* SECTION 1: MACRO IMPACT BANNER */}
      <div id="section-macro" className="scroll-mt-36">
          <MacroImpactBanner language={language} metrics={metrics} />
      </div>

      {/* SECTION 2: "ABHI KYA CHAL RAHA HAI" — LIVE ONGOING PIPELINE */}
      <div id="section-pipeline" className="scroll-mt-36 pt-2">
        <OngoingPipeline language={language} projects={projects.map(toLiveProject)} />
      </div>

      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Boxes className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Blueprints</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Blueprint reuse catalog</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {blueprints.map((blueprint) => (
            <article key={blueprint.id} className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono">{blueprint.blueprint_code}</span>
                  <h3 className="mt-3 text-base sm:text-lg font-black text-slate-900">{blueprint.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{blueprint.thematic_domain} · {blueprint.developed_by_heis || 'HEI details pending'}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">{blueprint.cloned_count} clones</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3"><span className="block font-bold text-slate-500">Capital cost</span><span className="font-black text-slate-900">{formatIndianCurrency(Number(blueprint.capital_cost_inr || 0))}</span></div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3"><span className="block font-bold text-slate-500">Quorum rating</span><span className="font-black text-slate-900">{blueprint.mean_quorum_rating ?? 'N/A'}</span></div>
              </div>
              <button type="button" onClick={() => setSelectedBlueprint(blueprint)} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]">
                <Boxes className="w-4 h-4" />
                <span>Clone Blueprint</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: "KIS UNIVERSITY NE KI" — UNIVERSITY LEADERBOARD & PORTFOLIOS */}
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

      {notification && <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-xl bg-emerald-700 text-white px-4 py-3 text-sm font-semibold shadow-xl">{notification}</div>}

      {selectedBlueprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4">
              <div><span className="text-xs font-black tracking-wider uppercase text-emerald-700">{selectedBlueprint.blueprint_code}</span><h3 className="mt-1 text-lg font-bold text-slate-950">{selectedBlueprint.title}</h3></div>
              <button type="button" onClick={() => setSelectedBlueprint(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><strong className="block text-slate-900">Thematic domain</strong>{selectedBlueprint.thematic_domain}</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><strong className="block text-slate-900">Developed by</strong>{selectedBlueprint.developed_by_heis || 'HEI details pending'}</div>
            </div>
            <pre className="mt-4 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-200 whitespace-pre-wrap">{JSON.stringify(selectedBlueprint.bom_json, null, 2)}</pre>
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
              <button type="button" onClick={() => setSelectedBlueprint(null)} className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700">Cancel</button>
              <button type="button" disabled={isCloning} onClick={handleCloneBlueprint} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 px-5 py-2.5 text-xs font-bold text-white shadow-md">
                {isCloning && <Loader2 className="w-4 h-4 animate-spin" />}<span>Confirm Clone</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

