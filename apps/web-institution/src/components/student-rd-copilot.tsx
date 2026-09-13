"use client";
import { useMemo, useState } from "react";
import { X, Lightbulb, Send, AlertTriangle, FlaskConical, MapPin } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";

interface Suggestion {
  title: string;
  detail: string;
  tag: string;
}

interface FailureRef {
  id: string;
  warning: string;
}

const FAILURE_REPO: FailureRef[] = [
  { id: "FAIL-104", warning: "Avoid aluminium sulphate coagulant; saturated within 72 hrs in 2024 Palamu trial (Ref: Project #FAIL-104)" },
  { id: "FAIL-087", warning: "Avoid bare MS vessels for fluoride media; corroded in 30 days in Garhwa pilot (Ref: #FAIL-087)" },
  { id: "FAIL-112", warning: "Avoid single-stage solar cold room without thermal mass; 6°C excursion on cloudy days (Ref: #FAIL-112)" },
];

function infer(query: string): { materials: Suggestion[]; warnings: FailureRef[]; steps: string[] } {
  const q = query.toLowerCase();
  if (q.includes("fluoride") || q.includes("arsenic") || q.includes("water") || q.includes("filter")) {
    return {
      materials: [
        { title: "Activated bauxite from Lohardaga", detail: "Locally calcined bauxite, 0.8–1.2 mm grade. ~3.5 mg F/g uptake in BIT Mesra bench tests. Rs.84/kg via Mines Co-op.", tag: "Adsorbent" },
        { title: "Burnt-clay pottery granules", detail: "Fired Khunti kumhar clay, porous matrix for pre-filtration + pH buffer. Rs.36/kg, women SHG supply.", tag: "Pre-filter" },
        { title: "Bone-char / biochar polish layer", detail: "Optional polish for arsenic traces. Regenerate at 400°C; log regeneration cycles.", tag: "Polish" },
      ],
      warnings: [FAILURE_REPO[0], FAILURE_REPO[1]],
      steps: ["Jar-test 3 media ratios (70:20:10) at 1.5–3 mg/L F", "Log flow vs breakthrough curve for 14 days", "Upload NABL bench certificate before Tranche 2"],
    };
  }
  if (q.includes("lac") || q.includes("cold") || q.includes("solar") || q.includes("storage")) {
    return {
      materials: [
        { title: "Phase-change thermal mass (paraffin + clay)", detail: "Buffers night/cloudy excursion for 5MT Khunti cold room. Local fabrication at NIT Jamshedpur.", tag: "Thermal" },
        { title: "Pay-per-use IoT metering", detail: "ESP32 + load cell billing for FPO clusters; offline-first sync.", tag: "IoT" },
      ],
      warnings: [FAILURE_REPO[2]],
      steps: ["Size 5MT room with 2-day autonomy", "Prototype door-seal + FPO tariff model", "Book mentor review on insulation U-values"],
    };
  }
  return {
    materials: [
      { title: "Activated bauxite from Lohardaga", detail: "General-purpose fluoride adsorbent; start here for water tickets.", tag: "Adsorbent" },
      { title: "Burnt-clay pottery granules", detail: "Low-cost porous pre-filter from local potters.", tag: "Pre-filter" },
    ],
    warnings: [FAILURE_REPO[0]],
    steps: ["Scope one bench test with faculty reviewer", "Cross-check failure repo before procurement", "Draft Round 1 pitch with local-context evidence"],
  };
}


export function CopilotBody() {
  const [query, setQuery] = useState("What low-cost local materials can adsorb fluoride?");
  const [asked, setAsked] = useState("What low-cost local materials can adsorb fluoride?");
  const result = useMemo(() => infer(asked), [asked]);
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2">
        <label htmlFor="rd-copilot-query" className="text-xs font-semibold text-slate-700">
          Ask R&amp;D Copilot (e.g., What low-cost local materials can adsorb fluoride?)
        </label>
        <div className="flex gap-2">
          <input
            id="rd-copilot-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") setAsked(query); }}
            placeholder="Ask about materials, methods, failure history…"
            className="flex-1 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
          />
          <button onClick={() => setAsked(query)} aria-label="Ask copilot" className="rounded-lg bg-[#0F172A] px-3 py-2 text-white hover:bg-slate-800">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pb-2">
        <p className="text-xs text-slate-500">Context: {asked}</p>
        {result.materials.map((m) => (
          <div key={m.title} className="rounded-lg border border-[#E2E8F0] p-3">
            <p className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#1E3A8A]">
              <MapPin className="h-3 w-3 text-[#2563EB]" /> {m.tag} · Jharkhand-local
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold"><FlaskConical className="h-3.5 w-3.5 text-[#2563EB]" />{m.title}</p>
            <p className="mt-1 text-xs text-slate-600">{m.detail}</p>
          </div>
        ))}
        {result.warnings.map((w) => (
          <p key={w.id} role="alert" className="flex items-start gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs font-semibold text-[#1E3A8A]">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563EB]" /> Advisory: {w.warning}
          </p>
        ))}
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-800">Suggested next steps</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-xs text-slate-600">
            {result.steps.map((s) => (<li key={s}>{s}</li>))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function StudentRdCopilot() {
  const { isOpen, close } = useCopilot();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Student R&D Copilot">
      <div className="absolute inset-0 bg-slate-900/40" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-4 py-3">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-semibold">Student R&amp;D Copilot</h2>
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-[#4F46E5]">FAILURE-REPO AWARE</span>
          <button onClick={close} aria-label="Close copilot" className="ml-auto rounded p-1 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden p-4 text-sm">
          <CopilotBody />
        </div>
      </aside>
    </div>
  );
}
