"use client";
import { useState } from "react";
import { Building2, ChevronDown, Trophy, Wallet } from "lucide-react";
import { campuses, grantSummary, personas, type CampusId, type PersonaId } from "@/lib/mock-data";
import { useJury } from "@/components/jury-provider";

export default function TopBar() {
  const [campus, setCampus] = useState<CampusId>("bit-mesra");
  const [campusOpen, setCampusOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaId>("faculty-pi");
  const { juryMode, toggleJury } = useJury();
  const active = campuses.find((c) => c.id === campus) ?? campuses[0];

  return (
    <header className={`sticky top-0 z-40 border-b text-white ${juryMode ? "border-sky-300 bg-slate-950" : "border-[#F1F5F9] bg-[#0F172A]"}`}>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${juryMode ? "bg-sky-400 text-slate-950" : "bg-[#1E3A8A] text-white"}`}>J</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society</p>
            <p className={`text-xs ${juryMode ? "text-sky-200" : "text-slate-300"}`}>Jharkhand R&amp;D Collaboration{juryMode ? " · Jury View" : ""}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setCampusOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-medium hover:bg-slate-700"
            aria-haspopup="listbox"
            aria-expanded={campusOpen}
          >
            <Building2 className="h-3.5 w-3.5 text-blue-300" />
            <span>{active.fullLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {campusOpen && (
            <ul role="listbox" className="absolute left-0 mt-2 w-72 overflow-hidden rounded-lg border border-[#F1F5F9] bg-white text-slate-900 shadow-xl">
              {campuses.map((c) => (
                <li key={c.id}>
                  <button
                    role="option"
                    aria-selected={c.id === campus}
                    onClick={() => { setCampus(c.id); setCampusOpen(false); }}
                    className="block w-full px-3 py-2 text-left text-xs hover:bg-slate-100"
                  >
                    <span className="font-semibold">{c.shortName}</span>
                    <span className="block text-slate-500">{c.cell}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A]">
          <Wallet className="h-3.5 w-3.5" />{grantSummary.activeGrantsLabel}
        </span>
        <button
          onClick={toggleJury}
          aria-pressed={juryMode}
          title="High-contrast jury presentation view (Feasibility 40 / Sustainability 30 / Cost 30)"
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${juryMode ? "bg-sky-400 text-slate-950 hover:bg-sky-300" : "border border-sky-300/60 bg-transparent text-sky-200 hover:bg-sky-400/10"}`}
        >
          <Trophy className="h-3.5 w-3.5" />{juryMode ? "Exit Jury Mode" : "Jury Presentation Mode"}
        </button>
        <PersonaSwitcher persona={persona} onChange={setPersona} />
      </div>
      {juryMode && (
        <div className="border-t border-sky-300/40 bg-slate-950 px-4 py-1.5 sm:px-6" role="note" aria-label="Jury scoring criteria">
          <p className="mx-auto max-w-[1400px] text-[11px] font-bold uppercase tracking-widest text-sky-300">
            Jury criteria — Feasibility (40%) · Sustainability (30%) · Cost Effectiveness (30%)
          </p>
        </div>
      )}
    </header>
  );
}

function PersonaSwitcher({ persona, onChange }: { persona: PersonaId; onChange: (p: PersonaId) => void }) {
  return (
    <div className="ml-auto flex flex-wrap items-center gap-1 rounded-full border border-slate-600 bg-slate-800/60 p-1" role="tablist" aria-label="Persona switcher">
      {personas.map((p) => (
        <button
          key={p.id}
          role="tab"
          aria-selected={persona === p.id}
          onClick={() => onChange(p.id)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${persona === p.id ? "bg-[#2563EB] text-white" : "text-slate-200 hover:bg-slate-700"}`}
          title={p.description}
        >
          {p.id === "faculty-pi" ? "Faculty PI" : p.id === "student-lead" ? "Student Lead" : "Industry/CSR Mentor"}
        </button>
      ))}
    </div>
  );
}

