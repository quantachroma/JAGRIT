"use client";
import { useState } from "react";
import { Upload, ClipboardList, AlertTriangle } from "lucide-react";

export const REVISIONS = [
  { id: "r1", label: "Replace aluminium sulphate with bauxite media (FAIL-104)" },
  { id: "r2", label: "Add SS-304 lining to MS vessel (FAIL-087)" },
  { id: "r3", label: "Log 14-day breakthrough curve + flow calibration" },
  { id: "r4", label: "Attach NABL bench certificate draft for Tranche 2" },
];

export default function Round2Proto({ onTele, done, setDone, onToast }: { onTele: (ok: boolean, label: string | null) => void; done: string[]; setDone: (v: string[]) => void; onToast: (m: string) => void }) {
  const [tele, setTele] = useState<string | null>(null);
  const [teleErr, setTeleErr] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);

  function onFile(f: File | undefined) {
    setTeleErr(null);
    if (!f) return;
    const ok = f.name.endsWith(".csv") || f.name.endsWith(".xlsx") || f.type.includes("csv") || f.type.includes("sheet");
    if (!ok) {
      setTeleErr("Upload bench telemetry as .csv or .xlsx.");
      onTele(false, null);
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setTeleErr("Telemetry file exceeds 10 MB.");
      onTele(false, null);
      return;
    }
    const label = `${f.name} (${(f.size / 1024).toFixed(0)} KB)`;
    setTele(label);
    onTele(true, label);
  }

  function toggle(id: string) {
    setDone(done.includes(id) ? done.filter((x) => x !== id) : [...done, id]);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
        <h3 className="flex items-center gap-1.5 text-sm font-bold"><Upload className="h-4 w-4" /> Bench-scale telemetry + lab test log</h3>
        <label className="mt-3 block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center hover:border-[#2563EB]">
          <input type="file" accept=".csv,.xlsx" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          <span className="text-sm font-semibold">Upload CSV / XLSX (max 10 MB)</span>
          <span className="mt-1 block text-xs text-slate-500">Flow, F-in/out, pH, bed volumes per day</span>
        </label>
        {tele && !teleErr && <p role="status" className="mt-2 text-xs font-semibold text-blue-800">Queued: {tele}</p>}
        {teleErr && <p role="alert" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700"><AlertTriangle className="h-3.5 w-3.5" />{teleErr}</p>}
        <button onClick={() => setDrawer(true)} className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-bold text-white">
          <ClipboardList className="h-4 w-4" /> Open mentor feedback + checklist ({done.length}/{REVISIONS.length})
        </button>
      </div>
      {drawer && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label="Mentor feedback log">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setDrawer(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[#F1F5F9] px-4 py-3">
              <h3 className="text-sm font-bold">Mentor feedback log</h3>
              <button onClick={() => setDrawer(false)} aria-label="Close feedback" className="ml-auto rounded p-1 hover:bg-slate-100">✕</button>
            </div>
            <div className="space-y-3 overflow-y-auto p-4 text-sm">
              <div className="rounded-lg bg-slate-50 p-3 text-xs">
                <p className="font-bold">Dr. S. Roy · Wed review</p>
                <p className="mt-1 text-slate-600">Media ratio promising; fix vessel MOC and re-run 72-hr saturation test.</p>
              </div>
              {REVISIONS.map((r) => (
                <label key={r.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-[#F1F5F9] p-3 text-sm hover:bg-slate-50">
                  <input type="checkbox" checked={done.includes(r.id)} onChange={() => toggle(r.id)} className="mt-1" />
                  <span className={done.includes(r.id) ? "line-through text-slate-500" : "font-medium"}>{r.label}</span>
                </label>
              ))}
              <button onClick={() => { setDrawer(false); onToast("Revision checklist saved. Mentor notified for re-review."); }} className="w-full rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-bold text-white">Save checklist</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
