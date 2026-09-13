'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Gauge,
  LayoutPanelTop,
  Maximize2,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';

type ViewMode = 'split' | 'focus';

type Stage = {
  title: string;
  shortTitle: string;
  focusSide: 'citizen' | 'institution';
  citizenPath?: string;
  institutionPath?: string;
  eyebrow: string;
  description: string;
};

const CITIZEN_ORIGIN = process.env.NEXT_PUBLIC_CITIZEN_ORIGIN || 'http://localhost:3000';
const INSTITUTION_ORIGIN = process.env.NEXT_PUBLIC_INSTITUTION_ORIGIN || 'http://localhost:3001';

const stages: Stage[] = [
  {
    title: '1. Citizen Intake (Voice/Photo)',
    shortTitle: 'Citizen Intake',
    focusSide: 'citizen',
    citizenPath: '/report?scenario=palamu-fluoride',
    institutionPath: '/dashboard',
    eyebrow: 'Role 1 / Ingestion engine',
    description: 'Capture a grounded voice or photo report and route it into the innovation network.',
  },
  {
    title: '2. PostGIS 500m Radar & Upvote',
    shortTitle: '500m Radar',
    focusSide: 'citizen',
    citizenPath: '/dashboard?scenario=palamu-fluoride&view=radar',
    institutionPath: '/dashboard',
    eyebrow: 'Role 1 / Spatial deduplication',
    description: 'Show the nearby master ticket, similarity score, and citizen support signal.',
  },
  {
    title: '3. AI Triage & Evaluator Console',
    shortTitle: 'AI Triage',
    focusSide: 'institution',
    institutionPath: '/dashboard',
    eyebrow: 'Roles 2 + 3 / Human-in-the-loop',
    description: 'Make the routing decision visible: routine civic work or applied HEI innovation.',
  },
  {
    title: '4. University XAI Spider Chart',
    shortTitle: 'XAI Match',
    focusSide: 'institution',
    citizenPath: '/dashboard',
    institutionPath: '/dashboard?challenge=JAG-2026-PAL-0052&panel=xai',
    eyebrow: 'Role 2 / Capability match',
    description: 'Open the institutional workspace and explain why a university is a strong fit.',
  },
  {
    title: '5. Dynamic Hackathon DPR',
    shortTitle: 'DPR + BOM',
    focusSide: 'institution',
    citizenPath: '/dashboard',
    institutionPath: '/hackathon?challenge=JAG-2026-PAL-0052&panel=bom',
    eyebrow: 'Role 2 / Delivery arena',
    description: 'Move from a matched challenge to a costed, defensible deployment proposal.',
  },
  {
    title: '6. Day 46 Quorum & NEP Credits',
    shortTitle: 'Day 46',
    focusSide: 'citizen',
    citizenPath: '/time-machine?auto=day46',
    institutionPath: '/credits?certificate=palamu-fluoride',
    eyebrow: 'Roles 1 + 2 / Governance close',
    description: 'Unlock citizen verification, close the quorum, and show the academic credit certificate.',
  },
];

const statusItems = [
  { label: 'AI Microservice', port: 'Port 8000', state: 'ACTIVE', tone: 'blue' },
  { label: 'Core Backend & PostGIS', port: 'Port 5000', state: 'CONNECTED', tone: 'blue' },
  { label: 'Citizen Web', port: 'Port 3000', state: 'READY', tone: 'blue' },
  { label: 'University Portal', port: 'Port 3001', state: 'READY', tone: 'blue' },
] as const;

function buildUrl(origin: string, path?: string) {
  return path ? `${origin}${path}` : undefined;
}

export default function DemoHubPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [scenario, setScenario] = useState('Live jury walkthrough');

  const stage = stages[activeStage];
  const citizenUrl = useMemo(() => buildUrl(CITIZEN_ORIGIN, stage.citizenPath), [stage.citizenPath]);
  const institutionUrl = useMemo(
    () => buildUrl(INSTITUTION_ORIGIN, stage.institutionPath),
    [stage.institutionPath]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActiveStage((current) => Math.min(current + 1, stages.length - 1));
      if (event.key === 'ArrowLeft') setActiveStage((current) => Math.max(current - 1, 0));
      if (event.key.toLowerCase() === 'f') setViewMode((current) => (current === 'split' ? 'focus' : 'split'));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const loadScenario = (name: string, stageIndex: number) => {
    setScenario(name);
    setActiveStage(stageIndex);
    setViewMode('split');
  };

  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen flex-col overflow-hidden bg-[#020617] text-slate-100 selection:bg-blue-300 selection:text-[#020617]">
      <header className="shrink-0 border-b border-white/10 bg-[#020617]/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/30 bg-[#1E3A8A] text-lg font-black text-blue-100 shadow-[0_0_24px_rgba(16,185,129,0.16)]">J</div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300">JAGRIT — Jharkhand Academic &amp; Grassroots Resolution for Innovation and Transformation / LIVE JURY MODE</p>
              <h1 className="text-base font-black tracking-tight text-white sm:text-lg">Master Presentation Hub</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Radio className="h-4 w-4 animate-pulse text-blue-400" />
            <span>{scenario}</span>
            <a href="/" className="ml-2 rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white" aria-label="Exit presentation hub" title="Exit presentation hub">
              <X className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Presentation stages" className="mt-4 grid grid-cols-2 gap-1.5 md:grid-cols-6">
          {stages.map((item, index) => {
            const active = index === activeStage;
            return (
              <button key={item.title} type="button" onClick={() => setActiveStage(index)} className={`group min-h-[54px] rounded-xl border px-2.5 py-2 text-left transition-all duration-300 ${active ? 'border-blue-300/50 bg-[#1E3A8A] text-white shadow-[0_0_22px_rgba(16,185,129,0.13)]' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-300/40 hover:bg-blue-500/10 hover:text-slate-200'}`} aria-current={active ? 'step' : undefined}>
                <span className={`block text-[10px] font-black uppercase tracking-wider ${active ? 'text-blue-200' : 'text-slate-500 group-hover:text-blue-300'}`}>0{index + 1}</span>
                <span className="mt-0.5 block text-[11px] font-bold leading-tight sm:text-xs">{item.shortTitle}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <section className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">{stage.eyebrow}</p>
            <h2 className="mt-1 truncate text-lg font-black text-white sm:text-xl">{stage.title}</h2>
            <p className="mt-0.5 hidden text-xs text-slate-400 sm:block">{stage.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-white/10 bg-slate-950/20 p-1" role="group" aria-label="Viewport display mode">
              <button type="button" onClick={() => setViewMode('split')} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${viewMode === 'split' ? 'bg-white text-[#020617]' : 'text-slate-400 hover:text-white'}`}><LayoutPanelTop className="h-3.5 w-3.5" /> Split</button>
              <button type="button" onClick={() => setViewMode('focus')} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${viewMode === 'focus' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}><Maximize2 className="h-3.5 w-3.5" /> Focus</button>
            </div>
            <button type="button" onClick={() => setActiveStage((current) => Math.max(current - 1, 0))} disabled={activeStage === 0} className="rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:border-blue-300/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30" aria-label="Previous stage" title="Previous stage (Left arrow)"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => setActiveStage((current) => Math.min(current + 1, stages.length - 1))} disabled={activeStage === stages.length - 1} className="rounded-xl border border-blue-300/30 bg-[#1E3A8A] p-2.5 text-blue-100 transition hover:border-blue-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30" aria-label="Next stage" title="Next stage (Right arrow)"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className={`grid min-h-0 flex-1 gap-3 transition-all duration-500 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-[0.82fr_1fr]' : 'grid-cols-1'}`}>
          <FramePanel label="Citizen Mobile Studio" port="3000" url={citizenUrl} hidden={viewMode === 'focus' && stage.focusSide !== 'citizen'} />
          {activeStage === 2 ? <TriageConsole /> : <FramePanel label="University Innovation Portal" port="3001" url={institutionUrl} hidden={viewMode === 'focus' && stage.focusSide !== 'institution'} blue />}
        </div>
      </section>

      <footer className="shrink-0 border-t border-white/10 bg-[#020617]/95 px-3 py-2.5 sm:px-5">
        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {statusItems.map((item) => <StatusPill key={item.label} {...item} />)}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 hidden text-[10px] font-black uppercase tracking-wider text-slate-500 sm:inline">Quick Demo Fast-Path</span>
            <button type="button" onClick={() => loadScenario('Palamu Fluoride / JAG-4102', 0)} className="inline-flex items-center gap-1.5 rounded-lg border border-sky-300/25 bg-sky-300/10 px-2.5 py-2 text-[11px] font-bold text-sky-200 transition hover:bg-sky-300/20"><Zap className="h-3.5 w-3.5" /> Load Palamu Fluoride Scenario</button>
            <button type="button" onClick={() => loadScenario('Khunti Lac Storage / JAG-3891', 3)} className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300/25 bg-blue-300/10 px-2.5 py-2 text-[11px] font-bold text-blue-200 transition hover:bg-blue-300/20"><Zap className="h-3.5 w-3.5" /> Load Khunti Lac Storage Scenario</button>
            <button type="button" onClick={() => loadScenario('Day 46 / Quorum Simulation', 5)} className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300/25 bg-blue-300/10 px-2.5 py-2 text-[11px] font-bold text-blue-200 transition hover:bg-blue-300/20"><Zap className="h-3.5 w-3.5" /> Simulate Day 46 Feedback Quorum</button>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StatusPill({ label, port, state, tone }: { label: string; port: string; state: string; tone: 'blue' | 'blue' }) {
  return <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-semibold"><span className={`h-1.5 w-1.5 rounded-full ${tone === 'blue' ? 'bg-blue-400 shadow-[0_0_8px_#34d399]' : 'bg-blue-400 shadow-[0_0_8px_#818cf8]'}`} /><span className="text-slate-400">{label} ({port}):</span><span className={tone === 'blue' ? 'text-blue-300' : 'text-blue-300'}>{state}</span></div>;
}

function FramePanel({ label, port, url, hidden, blue = false }: { label: string; port: string; url?: string; hidden: boolean; blue?: boolean }) {
  return <article className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-[#0b1224] shadow-2xl transition-all duration-500 ${hidden ? 'hidden' : ''} ${blue ? 'border-blue-400/30' : 'border-blue-400/30'}`}>
    <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-950/20 px-3 py-2"><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${blue ? 'bg-blue-400' : 'bg-blue-400'}`} /><span className="text-xs font-black uppercase tracking-wider text-slate-200">{label}</span><span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">:{port}</span></div>{url && <a href={url} target="_blank" rel="noreferrer" className="rounded p-1 text-slate-500 hover:text-white" aria-label={`Open ${label} in new tab`} title="Open in new tab"><ExternalLink className="h-3.5 w-3.5" /></a>}</div>
    <div className="relative min-h-0 flex-1 overflow-hidden bg-slate-950"><div className={`absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(4,71,40,0.22),transparent_56%)] ${url ? 'hidden' : ''}`}><div className="px-6 text-center"><Gauge className="mx-auto h-8 w-8 text-slate-600" /><p className="mt-2 text-sm font-bold text-slate-300">Single-view stage</p><p className="mt-1 text-xs text-slate-500">This role is represented in the active console.</p></div></div>{url && <iframe key={url} src={url} title={label} className="h-full w-full border-0 bg-white" loading="eager" allow="microphone; camera; geolocation" referrerPolicy="no-referrer" />}</div>
  </article>;
}

function TriageConsole() {
  return <article className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-blue-400/30 bg-[#0b1224] shadow-2xl"><div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-950/20 px-3 py-2"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-400" /><span className="text-xs font-black uppercase tracking-wider text-slate-200">AI Triage & Evaluator Console</span><span className="rounded bg-blue-400/15 px-1.5 py-0.5 font-mono text-[10px] text-blue-300">LIVE</span></div><FlaskConical className="h-4 w-4 text-blue-300" /></div><div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6"><div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-[10px] text-blue-300">JAG-2026-PAL-0052</p><h3 className="mt-2 text-lg font-black text-white">High fluoride in Palamu borewell water</h3><p className="mt-2 text-xs leading-5 text-slate-400">Voice + geo-tagged image ingested from Satbarwa Block. Similarity radar found a nearby master ticket.</p></div><span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-2 py-1 text-[10px] font-bold text-sky-200">PENDING HITL</span></div><div className="mt-5 space-y-3"><Score label="Vision: water contamination" value="94%" width="94%" tone="blue" /><Score label="Semantic duplicate match" value="89%" width="89%" tone="blue" /><Score label="Location confidence" value="98%" width="98%" tone="blue" /></div></div><div className="space-y-3"><CategoryCard icon={<ShieldCheck className="h-5 w-5" />} title="ROUTED CIVIC" text="Routine repair / local administration" tone="blue" /><CategoryCard icon={<Sparkles className="h-5 w-5" />} title="ROUTED TO HEI" text="Applied R&D / university response" tone="blue" active /><div className="rounded-xl border border-white/10 bg-slate-950/20 p-3 text-xs text-slate-400"><div className="flex items-center gap-2 font-bold text-slate-200"><Users className="h-4 w-4 text-sky-300" /> Evaluator confidence</div><p className="mt-2 leading-5">Dual-route recommendation keeps the civic fix moving while BIT Mesra validates a solar defluoridation intervention.</p></div></div></div></div></article>;
}

function Score({ label, value, width, tone }: { label: string; value: string; width: string; tone: 'blue' | 'blue' }) {
  return <div><div className="mb-1 flex justify-between text-[11px] font-semibold"><span className="text-slate-400">{label}</span><span className={tone === 'blue' ? 'text-blue-300' : 'text-blue-300'}>{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${tone === 'blue' ? 'bg-blue-400' : 'bg-blue-400'}`} style={{ width }} /></div></div>;
}

function CategoryCard({ icon, title, text, tone, active = false }: { icon: React.ReactNode; title: string; text: string; tone: 'blue' | 'blue'; active?: boolean }) {
  return <div className={`rounded-xl border p-3 transition ${active ? tone === 'blue' ? 'border-blue-300/40 bg-blue-400/10' : 'border-blue-300/40 bg-blue-400/10' : 'border-white/10 bg-white/[0.025]'}`}><div className="flex items-center gap-2"><span className={tone === 'blue' ? 'text-blue-300' : 'text-blue-300'}>{icon}</span><span className="text-xs font-black text-white">{title}</span>{active && <CheckCircle2 className="ml-auto h-4 w-4 text-blue-300" />}</div><p className="mt-1 pl-7 text-[11px] text-slate-400">{text}</p></div>;
}