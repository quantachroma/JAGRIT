"use client";
import { useState } from "react";
import { X, Download, FileCheck2, ShieldCheck, BadgeCheck } from "lucide-react";
import { IPR_CLAUSES, buildIprAgreementText } from "@/lib/ipr";

interface Props {
  open: boolean;
  ticket: string;
  title: string;
  team: string;
  onClose: () => void;
}

export default function IprModal({ open, ticket, title, team, onClose }: Props) {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const date = new Date().toISOString().slice(0, 10);
  if (!open) return null;

  function download() {
    if (!agreed) return;
    const text = buildIprAgreementText({ ticket, title, team: team || name || "Consenting team", date });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `JAGRIT-IPR-Concordat-${ticket}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDone(`Agreement accepted & downloaded for ${ticket}.`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Tripartite IPR concordat">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">{ticket} · PRD 10.2 Concordat</p>
            <h2 className="flex items-center gap-2 text-lg font-bold"><ShieldCheck className="h-5 w-5 text-[#1E3A8A]" />Tripartite IPR Agreement</h2>
            <p className="mt-1 text-xs text-slate-600">{title}</p>
          </div>
          <button onClick={onClose} aria-label="Close IPR modal" className="rounded-full p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {IPR_CLAUSES.map((c) => (
            <div key={c.party} className={`rounded-xl border p-3 ${c.accent}`}>
              <p className="text-sm font-bold">{c.icon} {c.party}</p>
              <p className="mt-0.5 text-xs font-semibold text-slate-700">{c.title}</p>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-slate-700">
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <label className="mt-3 block text-xs font-semibold">Signatory name (Faculty PI / Student Lead)</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. R. K. Verma" className="mt-1 w-full rounded-lg border border-[#F1F5F9] px-3 py-2 text-sm" />
        <label className="mt-3 flex cursor-pointer items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1E3A8A]" />
          <span><span className="font-bold">I accept the IPR terms</span> — inventor equity ≥60%, university 20–30% royalty, CSR ROFR + internal licence, Jharkhand royalty-free public licence. (ADR-009 / PRD 10.2)</span>
        </label>
        {done && <p role="status" className="mt-2 flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800"><BadgeCheck className="h-4 w-4" />{done}</p>}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button onClick={download} disabled={!agreed} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${agreed ? "bg-[#1E3A8A] hover:bg-blue-900" : "cursor-not-allowed bg-slate-300"}`}>
            <Download className="h-4 w-4" />Accept IPR Terms & Download Agreement
          </button>
          <button onClick={onClose} className="rounded-lg border border-[#F1F5F9] px-4 py-2.5 text-sm font-semibold"><FileCheck2 className="mr-1 inline h-4 w-4" />Close</button>
        </div>
      </div>
    </div>
  );
}
