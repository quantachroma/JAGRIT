"use client";
import { useState } from "react";
import { Award, Calculator, CheckCircle2, Download, GraduationCap, Landmark, ShieldCheck } from "lucide-react";
import IprModal from "@/components/ipr-modal";
import TranscriptPreview from "./transcript-preview";
import { COURSE_MAPPINGS, buildApaarPayload, computeCredits, downloadJson } from "@/lib/credits";

const PRESETS = [60, 90, 120, 150];
const HOURS_PER_CREDIT = 30;
const LEDGER_ROWS = [
  { name: "Ananya Sharma", apaarId: "BIT/2023/BT-114", hours: 120 },
  { name: "Rahul Kumar", apaarId: "BIT/2022/CS-087", hours: 90 },
  { name: "Priya Kumari", apaarId: "BIT/2024/EE-032", hours: 60 },
];

export default function CreditsClient() {
  const [hours, setHours] = useState(120);
  const [deposited, setDeposited] = useState(false);
  const credits = Math.floor(hours / HOURS_PER_CREDIT);

  function updateHours(value: string) {
    const nextHours = Number(value);
    setHours(Number.isFinite(nextHours) ? Math.max(0, Math.floor(nextHours)) : 0);
    setDeposited(false);
  }

  return (
    <main className="space-y-6 pb-8">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">University academic records</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">NEP 2020 &amp; NCrF Academic Credit Banking</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Converting verified grassroots field workhours into official degree credits deposited directly into national APAAR / DigiLocker transcripts.</p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-blue-800"><GraduationCap className="h-5 w-5" aria-hidden="true" /><h2 className="text-lg font-bold text-slate-950">Interactive Credit Calculator</h2></div>
          <p className="mt-2 text-sm text-slate-600">Only faculty-verified project workhours are eligible for academic credit banking.</p>
          <label htmlFor="verified-workhours" className="mt-6 block text-sm font-semibold text-slate-800">Verified Project Workhours</label>
          <div className="mt-2 flex items-center gap-3"><input id="verified-workhours" type="number" min="0" step="1" value={hours} onChange={(event) => updateHours(event.target.value)} className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-lg font-bold text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /><span className="text-sm text-slate-500">hours</span></div>
          <div className="mt-5 rounded-xl bg-slate-950 p-5 text-white"><p className="text-sm font-semibold text-blue-200">30 Workhours = 1 Academic Credit</p><p className="mt-3 text-2xl font-black sm:text-3xl">{hours} hours = <span className="text-emerald-300">{credits} Academic Credits</span></p><p className="mt-2 text-xs text-slate-400">Calculation: floor({hours} / {HOURS_PER_CREDIT}) verified credits</p></div>
          <button type="button" disabled={credits < 1} onClick={() => setDeposited(true)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"><span aria-hidden="true">🎓</span>{deposited ? "Credits Deposited" : "Deposit Credits to APAAR / DigiLocker"}</button>
          {deposited && <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Success: {credits} Academic Credits successfully minted and deposited into student APAAR ID credentials.</p>}
        </div>

        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6"><div className="flex items-center gap-2 text-amber-900"><Award className="h-5 w-5" aria-hidden="true" /><h2 className="text-lg font-bold">Faculty UGC-CAS Integration</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-700">UGC Regulations 2018</p><p className="mt-5 text-sm leading-6 text-amber-950">Faculty Principal Investigators who lead student teams through verified grassroots field projects receive official evidence for career advancement. Each qualifying team contributes <strong>10 official UGC-CAS points</strong> toward the PI&apos;s career advancement record.</p><div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-white/80 p-4"><Landmark className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" /><span className="text-sm font-bold text-amber-950">10 UGC-CAS points per leading student team</span></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-800"><ShieldCheck className="h-4 w-4" aria-hidden="true" />Faculty-verified impact evidence retained with the credit record</div></aside>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 px-5 py-4 sm:px-6"><h2 className="text-lg font-bold text-slate-950">Student &amp; Faculty Credit Ledger</h2><p className="mt-1 text-sm text-slate-500">Verified workhours and transcript synchronization status.</p></div><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-bold sm:px-6">Student Name</th><th className="px-5 py-3 font-bold">APAAR ID</th><th className="px-5 py-3 font-bold">Logged Workhours</th><th className="px-5 py-3 font-bold">Calculated Credits</th><th className="px-5 py-3 font-bold">Sync Status</th></tr></thead><tbody className="divide-y divide-slate-100">{LEDGER_ROWS.map((row) => <tr key={row.apaarId} className="text-slate-700"><td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-950 sm:px-6">{row.name}</td><td className="whitespace-nowrap px-5 py-4 font-mono text-xs">{row.apaarId}</td><td className="whitespace-nowrap px-5 py-4">{row.hours} hrs</td><td className="whitespace-nowrap px-5 py-4 font-bold text-blue-800">{Math.floor(row.hours / HOURS_PER_CREDIT)}</td><td className="whitespace-nowrap px-5 py-4"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Synced with DigiLocker</span></td></tr>)}</tbody></table></div></section>
    </main>
  );
}

function CreditsLayout(p: {
  hours: number; setHours: (n: number) => void;
  name: string; setName: (s: string) => void;
  apaar: string; setApaar: (s: string) => void;
  courseIdx: number; setCourseIdx: (n: number) => void;
  ticket: string; setTicket: (s: string) => void;
  pi: string; setPi: (s: string) => void;
  iprOpen: boolean; setIprOpen: (b: boolean) => void;
  toast: string | null; exportPayload: () => void;
}) {
  const course = COURSE_MAPPINGS[p.courseIdx] ?? COURSE_MAPPINGS[0];
  const calc = computeCredits(p.hours);
  const payload = buildApaarPayload({ studentName: p.name, apaarId: p.apaar, course, workhours: p.hours, credits: calc.credits, projectTicket: p.ticket, facultyPi: p.pi, institution: "BIT Mesra" });
  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">ADR-008 · NEP 2020 · 30 hrs = 1 credit</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold"><GraduationCap className="h-6 w-6 text-[#1E3A8A]" />NEP 2020 Academic Credit Generator</h1>
        <p className="mt-1 text-sm text-slate-600">Whole credits via floor(hours/30), capped at 4 for Capstone.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500"><Calculator className="h-3.5 w-3.5" />Credit calculator</p>
            <label className="mt-2 block text-xs font-semibold">Verified student workhours</label>
            <input type="number" min={0} max={300} value={p.hours} onChange={(e) => setHoursSafe(e.target.value, p.setHours)} className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm" />
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((v) => (
                <button key={v} onClick={() => p.setHours(v)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${p.hours === v ? "bg-[#0F172A] text-white" : "bg-white text-slate-700 border hover:bg-slate-100"}`}>{v} hrs</button>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-[#0F172A] p-4 text-white">
              <p className="text-4xl font-bold">{calc.credits} <span className="text-sm font-medium text-slate-300">/ 4 credits</span></p>
              <p className="mt-1 text-xs text-slate-300">{p.hours} hrs / 30 = {calc.credits} whole · {calc.remainder} hrs remainder</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-blue-400" style={{ width: `${calc.credits >= 4 ? 100 : (calc.remainder / 30) * 100}%` }} /></div>
              {calc.capped && <p className="mt-1 text-xs text-sky-300">Capstone cap applied: clamped to 4.</p>}
            </div>
            <Fields p={p} />
          </div>
          <RightPane p={p} calcCredits={calc.credits} checksum={payload.signatures.checksum} payload={payload} />
        </div>
      </div>
      <IprModal open={p.iprOpen} ticket={p.ticket} title={course.title} team={`${p.name} + ${p.pi}`} onClose={() => p.setIprOpen(false)} />
    </div>
  );
}

function setHoursSafe(v: string, set: (n: number) => void) {
  const n = Number(v);
  set(Number.isFinite(n) ? Math.max(0, Math.min(300, Math.floor(n))) : 0);
}

function Fields({ p }: { p: { name: string; setName: (s: string) => void; apaar: string; setApaar: (s: string) => void; ticket: string; setTicket: (s: string) => void; pi: string; setPi: (s: string) => void; courseIdx: number; setCourseIdx: (n: number) => void } }) {
  return (
    <>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="block text-xs font-semibold">Student<input value={p.name} onChange={(e) => p.setName(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-2.5 py-1.5 text-sm font-normal" /></label>
        <label className="block text-xs font-semibold">APAAR ID<input value={p.apaar} onChange={(e) => p.setApaar(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-2.5 py-1.5 text-sm font-normal" /></label>
        <label className="block text-xs font-semibold">Ticket<input value={p.ticket} onChange={(e) => p.setTicket(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-2.5 py-1.5 text-sm font-normal" /></label>
        <label className="block text-xs font-semibold">Faculty PI<input value={p.pi} onChange={(e) => p.setPi(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-2.5 py-1.5 text-sm font-normal" /></label>
      </div>
      <label className="mt-2 block text-xs font-semibold">Course mapping
        <select value={p.courseIdx} onChange={(e) => p.setCourseIdx(Number(e.target.value))} className="mt-1 w-full rounded-lg border bg-white px-2.5 py-2 text-sm font-normal">
          {COURSE_MAPPINGS.map((c, i) => <option key={c.code} value={i}>{c.code} — {c.title}</option>)}
        </select>
      </label>
    </>
  );
}

function RightPane({ p, calcCredits, checksum, payload }: { p: { name: string; apaar: string; ticket: string; pi: string; hours: number; courseIdx: number; toast: string | null; setIprOpen: (b: boolean) => void; exportPayload: () => void }; calcCredits: number; checksum: string; payload: unknown }) {
  const course = COURSE_MAPPINGS[p.courseIdx] ?? COURSE_MAPPINGS[0];
  return (
    <div>
      <TranscriptPreview name={p.name} apaar={p.apaar} courseCode={course.code} courseTitle={course.title} hours={p.hours} credits={calcCredits} ticket={p.ticket} pi={p.pi} checksum={checksum} />
      <div className="mt-3 flex flex-col gap-2">
        <button onClick={p.exportPayload} className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"><Download className="h-4 w-4" />Generate Signed APAAR/ABC JSON Payload</button>
        <button onClick={() => p.setIprOpen(true)} className="flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"><ShieldCheck className="h-4 w-4 text-[#1E3A8A]" />View Tripartite IPR Concordat</button>
      </div>
      {p.toast && <p role="status" className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800">{p.toast}</p>}
      <details className="mt-3 rounded-xl border bg-slate-950 p-3 text-[11px] text-blue-200">
        <summary className="cursor-pointer font-semibold text-white">Preview JSON payload</summary>
        <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap">{JSON.stringify(payload, null, 2)}</pre>
      </details>
    </div>
  );
}

