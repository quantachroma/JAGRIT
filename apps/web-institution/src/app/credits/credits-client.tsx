"use client";
import { useState } from "react";
import { Calculator, Download, GraduationCap, ShieldCheck } from "lucide-react";
import IprModal from "@/components/ipr-modal";
import TranscriptPreview from "./transcript-preview";
import { COURSE_MAPPINGS, buildApaarPayload, computeCredits, downloadJson } from "@/lib/credits";

const PRESETS = [60, 90, 120, 150];

export default function CreditsClient() {
  const [hours, setHours] = useState(120);
  const [name, setName] = useState("Ananya Sharma");
  const [apaar, setApaar] = useState("BIT/2023/BT-114");
  const [courseIdx, setCourseIdx] = useState(0);
  const [ticket, setTicket] = useState("JAG-4102");
  const [pi, setPi] = useState("Dr. R. K. Verma");
  const [iprOpen, setIprOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function exportPayload() {
    const course = COURSE_MAPPINGS[courseIdx] ?? COURSE_MAPPINGS[0];
    const calc = computeCredits(hours);
    const payload = buildApaarPayload({
      studentName: name, apaarId: apaar, course,
      workhours: hours, credits: calc.credits,
      projectTicket: ticket, facultyPi: pi, institution: "BIT Mesra",
    });
    downloadJson(`APAAR-ABC-${apaar.replaceAll("/", "-")}-${calc.credits}cr.json`, payload);
    setToast(`Signed APAAR/ABC payload exported: ${calc.credits} credits for ${hours} hrs.`);
  }
  return <CreditsLayout hours={hours} setHours={setHours} name={name} setName={setName} apaar={apaar} setApaar={setApaar} courseIdx={courseIdx} setCourseIdx={setCourseIdx} ticket={ticket} setTicket={setTicket} pi={pi} setPi={setPi} iprOpen={iprOpen} setIprOpen={setIprOpen} toast={toast} exportPayload={exportPayload} />;
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
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">ADR-008 · NEP 2020 · 30 hrs = 1 credit</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold"><GraduationCap className="h-6 w-6 text-[#044728]" />NEP 2020 Academic Credit Generator</h1>
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
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-emerald-400" style={{ width: `${calc.credits >= 4 ? 100 : (calc.remainder / 30) * 100}%` }} /></div>
              {calc.capped && <p className="mt-1 text-xs text-amber-300">Capstone cap applied: clamped to 4.</p>}
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
        <button onClick={p.exportPayload} className="flex items-center justify-center gap-1.5 rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"><Download className="h-4 w-4" />Generate Signed APAAR/ABC JSON Payload</button>
        <button onClick={() => p.setIprOpen(true)} className="flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"><ShieldCheck className="h-4 w-4 text-[#044728]" />View Tripartite IPR Concordat</button>
      </div>
      {p.toast && <p role="status" className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">{p.toast}</p>}
      <details className="mt-3 rounded-xl border bg-slate-950 p-3 text-[11px] text-emerald-200">
        <summary className="cursor-pointer font-semibold text-white">Preview JSON payload</summary>
        <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap">{JSON.stringify(payload, null, 2)}</pre>
      </details>
    </div>
  );
}

