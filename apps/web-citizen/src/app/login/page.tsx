'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';

type Role = 'CITIZEN' | 'UNIVERSITY' | 'INDUSTRY' | 'EVALUATOR';
type AuthMode = 'signin' | 'register';

type RoleCard = {
  role: Role;
  emoji: string;
  title: string;
  badge: string;
  description: string;
  destination: string;
  icon: typeof Users;
  accent: string;
};

const roles: RoleCard[] = [
  {
    role: 'CITIZEN',
    emoji: '👤',
    title: 'Citizen & Gram Panchayat (PRI)',
    badge: 'Grassroots & Village Communities',
    description: 'Voice/photo problem reporting in Hindi & Santhali, PostGIS tracking, and Gram Sabha Citizen Quorum.',
    destination: '/dashboard?role=CITIZEN',
    icon: Users,
    accent: 'border-emerald-400/50 hover:border-emerald-300 focus-visible:ring-emerald-300',
  },
  {
    role: 'UNIVERSITY',
    emoji: '🎓',
    title: 'University & HEI Researcher',
    badge: 'State & Central HEIs (BIT Mesra, NIT Jsr, BAU)',
    description: '6-Axis XAI capability matching, 3-Stage Hackathon Workspace (BOM builder), and NEP 2020 Academic Credits.',
    destination: '/university/dashboard',
    icon: GraduationCap,
    accent: 'border-sky-400/50 hover:border-sky-300 focus-visible:ring-sky-300',
  },
  {
    role: 'INDUSTRY',
    emoji: '🏭',
    title: 'Corporate CSR Partner',
    badge: 'Industry CSR (Tata Steel, CCL, BCCL)',
    description: '1:1 matching grant escrow pledge, instant JAGRIT CSR Contribution Certificates, and ROFR licensing.',
    destination: '/dashboard?role=INDUSTRY',
    icon: Building2,
    accent: 'border-amber-400/50 hover:border-amber-300 focus-visible:ring-amber-300',
  },
  {
    role: 'EVALUATOR',
    emoji: '🏛️',
    title: 'Government Evaluator (DHTE Command Center)',
    badge: 'State Administration & Evaluators',
    description: 'AI Triage Approval Queue, 30%-40%-30% Milestone Escrow disbursement, and 24-District GIS Heatmap.',
    destination: '/admin',
    icon: Landmark,
    accent: 'border-blue-400/50 hover:border-blue-300 focus-visible:ring-blue-300',
  },
];

const demoCredentials: Record<Role, { email: string; password: string }> = {
  CITIZEN: { email: 'citizen@jagrit.jh.gov.in', password: 'JAGRIT2026' },
  UNIVERSITY: { email: 'researcher@jagrit.jh.gov.in', password: 'JAGRIT2026' },
  INDUSTRY: { email: 'csr@jagrit.jh.gov.in', password: 'JAGRIT2026' },
  EVALUATOR: { email: 'evaluator@jagrit.jh.gov.in', password: 'JAGRIT2026' },
};

function LoginGateway() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>('CITIZEN');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigateToRole = (role: Role) => {
    const destination = roles.find((item) => item.role === role)?.destination;
    if (destination) router.push(destination);
  };

  const selectRole = (role: Role) => {
    setSelectedRole(role);
    const demo = demoCredentials[role];
    setEmail(demo.email);
    setPassword(demo.password);
  };

  const launchDemo = () => {
    selectRole('EVALUATOR');
    navigateToRole('EVALUATOR');
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#06111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(14,116,144,0.28),transparent_35%),linear-gradient(135deg,#06111f_0%,#0b1d31_55%,#07101c_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-slate-700/70 pb-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">JAGRIT (जाग्रत) — Stakeholder Access Gateway</p>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">Select your identity to access your dedicated workspace</p>
            </div>
            <button type="button" onClick={() => router.push('/')} className="inline-flex items-center gap-2 rounded-md border border-slate-600 bg-slate-950/60 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Public Portal
            </button>
          </div>
        </header>

        <section className="py-8 sm:py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Four dedicated portals</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Where do you work in JAGRIT?</h1>
            </div>
            <ShieldCheck className="hidden h-10 w-10 text-emerald-300 sm:block" aria-hidden="true" />
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = role.role === selectedRole;
              return (
                <button key={role.role} type="button" onClick={() => { selectRole(role.role); navigateToRole(role.role); }} className={`group flex min-h-[260px] flex-col rounded-xl border bg-slate-900/85 p-6 text-left shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 ${role.accent}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/80 text-2xl ring-1 ring-cyan-300/20" aria-hidden="true">{role.emoji}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${isSelected ? 'border-emerald-300/50 bg-emerald-400/10 text-emerald-300' : 'border-slate-700 text-slate-400'}`}>
                      {isSelected ? 'Selected' : 'Select portal'}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-black text-white">{role.title}</h2>
                  <p className="mt-2 text-xs font-black uppercase leading-relaxed tracking-wide text-cyan-300">{role.badge}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{role.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white group-hover:text-emerald-300">
                    <Icon className="h-4 w-4 text-emerald-400" />
                    Enter as {role.role === 'UNIVERSITY' ? 'University HEI' : role.role === 'INDUSTRY' ? 'Corporate CSR' : role.role === 'EVALUATOR' ? 'Govt Evaluator' : 'Citizen'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="border-t border-slate-700/70 py-8">
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-700 bg-slate-900/85 p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Quick credentials</p>
                <h2 className="mt-1 text-2xl font-black text-white">Access your stakeholder account</h2>
              </div>
              <div className="grid grid-cols-2 rounded-lg border border-slate-700 bg-slate-950 p-1" role="tablist" aria-label="Account access mode">
                {(['signin', 'register'] as const).map((mode) => (
                  <button key={mode} type="button" role="tab" aria-selected={authMode === mode} onClick={() => setAuthMode(mode)} className={`rounded-md px-4 py-2 text-xs font-black transition ${authMode === mode ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                    {mode === 'signin' ? 'Sign In' : 'Register New Account'}
                  </button>
                ))}
              </div>
            </div>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); navigateToRole(selectedRole); }}>
              {authMode === 'register' && <label className="text-xs font-bold text-slate-300">Full name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" /></label>}
              <label className="text-xs font-bold text-slate-300">Email address<span className="relative mt-1 block"><Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@organisation.in" className="w-full rounded-md border border-slate-700 bg-slate-950 py-3 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" /></span></label>
              <label className="text-xs font-bold text-slate-300">Password<span className="relative mt-1 block"><LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="w-full rounded-md border border-slate-700 bg-slate-950 py-3 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" /></span></label>
              <label className="text-xs font-bold text-slate-300">Stakeholder role<select value={selectedRole} onChange={(event) => selectRole(event.target.value as Role)} className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-cyan-300">{roles.map((role) => <option key={role.role} value={role.role}>{role.title}</option>)}</select></label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300 sm:col-span-2"><Check className="h-4 w-4" />{authMode === 'signin' ? 'Sign In' : 'Create Account'}</button>
            </form>
          </div>
        </section>

        <section className="border-y border-amber-300/20 bg-amber-300/[0.06] py-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Evaluator &amp; Jury Testing</p><h2 className="mt-1 text-xl font-black text-white">Need a guided preview?</h2><p className="mt-1 text-sm text-slate-300">Launch Demo Mode instantly. No password or account required.</p></div>
            <button type="button" onClick={launchDemo} className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"><Landmark className="h-4 w-4" />Launch Evaluator Demo<ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 py-6 text-[10px] font-bold uppercase tracking-wide text-slate-500"><span>JAGRIT State Innovation Infrastructure</span><span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />Secure stakeholder access</span></footer>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#06111f]" />}><LoginGateway /></Suspense>;
}
