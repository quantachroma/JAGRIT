"use client";
import { useState } from "react";
import { X, Users, Building2, UserCheck, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import type { ChallengeStatus, ChallengeSubmissionPayload } from "@jagrit/contracts";
import type { OpenChallenge } from "@/lib/mock-data";

export type BidMode = "SOLO" | "CONSORTIUM";
const APAAR_RE = /^[A-Z]{2,4}\/\d{4}\/[A-Z]{2,3}-?\d{2,5}$/i;
const EMP_RE = /^[A-Z]+\/EMP\/\d{4}-\d{2,4}$/i;

interface Props { open: boolean; challenge: OpenChallenge | null; onClose: () => void; onSubmitted: (s: ChallengeStatus, m: string) => void; }
interface Student { name: string; dept: string; apaar: string; }

export default function ChallengeAcceptModal({ open, challenge, onClose, onSubmitted }: Props) {
  const [mode, setMode] = useState<BidMode>("SOLO");
  const [partner, setPartner] = useState("Birsa Agricultural University");
  const [piName, setPiName] = useState("Dr. R. K. Verma");
  const [piCode, setPiCode] = useState("BIT/EMP/2014-042");
  const [students, setStudents] = useState<Student[]>([{ name: "Ananya Sharma", dept: "Environmental Eng.", apaar: "BIT/2023/BT-114" }]);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  if (!open || !challenge) return null;
  function addStudent() {
    if (students.length >= 5) { setError("Maximum 5 student members allowed."); return; }
    setStudents([...students, { name: "", dept: "", apaar: "" }]);
  }
  function upd(i: number, k: keyof Student, v: string) {
    setStudents(students.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  }
  function submit() {
    setError(null);
    if (!challenge) return;
    if (!piName.trim()) { setError("Faculty PI name is required."); return; }
    if (!EMP_RE.test(piCode.trim())) { setError("PI employee code invalid. Example: BIT/EMP/2014-042."); return; }
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      if (!s.name.trim() || !s.dept.trim()) { setError(`Student ${i + 1}: name and department required.`); return; }
      if (!APAAR_RE.test(s.apaar.trim())) { setError(`Student ${i + 1}: APAAR / Student ID invalid (e.g. BIT/2023/BT-114).`); return; }
    }
    const payload: ChallengeSubmissionPayload = { title: challenge.title, description: challenge.summary, mediaUrls: [], location: { lat: 23.34, lon: 85.3, district: challenge.district }, preferredLanguage: "en" };
    void payload;
    const next: ChallengeStatus = mode === "SOLO" ? "DIRECT_RND" : "DYNAMIC_HACKATHON";
    const msg = mode === "SOLO" ? `Direct R&D track accepted by ${piName} + ${students.length} students.` : `Joint consortium proposed with ${partner}.`;
    setDone(`${msg} Transition: OPEN_FOR_BIDS to ${next}`);
    setTimeout(() => { onSubmitted(next, msg); onClose(); setDone(null); }, 900);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Challenge acceptance">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">{challenge.ticketId} · Acceptance</p>
          <h2 className="text-lg font-bold text-[#0F172A]">Nominate team & accept challenge</h2></div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button onClick={() => setMode("SOLO")} className={`rounded-xl border p-3 text-left ${mode === "SOLO" ? "border-[#4F46E5] bg-indigo-50" : "border-[#E2E8F0]"}`}>
            <p className="flex items-center gap-1.5 text-sm font-bold"><UserCheck className="h-4 w-4 text-[#4F46E5]" /> Option A: Accept Solo & Form Team</p>
            <p className="mt-1 text-xs text-slate-600">Direct R&D Track — single HEI owns delivery.</p>
          </button>
          <button onClick={() => setMode("CONSORTIUM")} className={`rounded-xl border p-3 text-left ${mode === "CONSORTIUM" ? "border-[#044728] bg-emerald-50" : "border-[#E2E8F0]"}`}>
            <p className="flex items-center gap-1.5 text-sm font-bold"><Building2 className="h-4 w-4 text-[#044728]" /> Option B: Propose Joint Consortium</p>
            <p className="mt-1 text-xs text-slate-600">e.g. BIT Mesra + Birsa Agricultural University bid.</p>
          </button>
        </div>

        {mode === "CONSORTIUM" && (
          <label className="mt-3 block"><span className="text-xs font-semibold">Consortium partner</span>
            <select value={partner} onChange={(e) => setPartner(e.target.value)} className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm">
              <option>Birsa Agricultural University</option><option>NIT Jamshedpur</option><option>IIT ISM Dhanbad</option>
            </select></label>
        )}
        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Faculty Principal Investigator</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input value={piName} onChange={(e) => setPiName(e.target.value)} placeholder="PI name" className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm" />
            <input value={piCode} onChange={(e) => setPiCode(e.target.value)} placeholder="BIT/EMP/2014-042" className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500"><Users className="h-3.5 w-3.5" /> Students ({students.length}/5)</p>
            <button onClick={addStudent} className="inline-flex items-center gap-1 rounded-lg bg-[#0F172A] px-2.5 py-1.5 text-xs font-semibold text-white"><Plus className="h-3.5 w-3.5" /> Add member</button>
          </div>
          <div className="mt-2 space-y-2">
            {students.map((s, i) => (
              <div key={i} className="grid gap-2 rounded-lg border border-[#E2E8F0] p-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
                <input value={s.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Student name" className="rounded-lg border border-[#E2E8F0] px-2.5 py-1.5 text-sm" />
                <input value={s.dept} onChange={(e) => upd(i, "dept", e.target.value)} placeholder="Department" className="rounded-lg border border-[#E2E8F0] px-2.5 py-1.5 text-sm" />
                <input value={s.apaar} onChange={(e) => upd(i, "apaar", e.target.value)} placeholder="APAAR / ID" className="rounded-lg border border-[#E2E8F0] px-2.5 py-1.5 text-sm" />
                <button onClick={() => setStudents(students.filter((_, j) => j !== i))} aria-label="Remove" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
        {error && (<p role="alert" className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>)}
        {done && (<p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{done}</p>)}
        <button onClick={submit} className="mt-4 w-full rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Submit acceptance & nominate team</button>
      </div>
    </div>
  );
}