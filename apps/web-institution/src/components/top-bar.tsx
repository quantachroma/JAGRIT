"use client";
import { useState } from "react";
import { Building2, ChevronDown, Wallet } from "lucide-react";
import { campuses, grantSummary, personas, type CampusId, type PersonaId } from "@/lib/mock-data";

export default function TopBar() {
  const [campus, setCampus] = useState<CampusId>("bit-mesra");
  const [campusOpen, setCampusOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaId>("faculty-pi");
  const active = campuses.find((c) => c.id === campus) ?? campuses[0];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-[#0F172A] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#044728] text-sm font-bold">J</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">JAGRIT Institution Portal</p>
            <p className="text-xs text-slate-300">Jharkhand R&amp;D Collaboration</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setCampusOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-medium hover:bg-slate-700"
            aria-haspopup="listbox"
            aria-expanded={campusOpen}
          >
            <Building2 className="h-3.5 w-3.5 text-emerald-300" />
            <span>{active.fullLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {campusOpen && (
            <ul role="listbox" className="absolute left-0 mt-2 w-72 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white text-slate-900 shadow-xl">
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-[#044728]">
          <Wallet className="h-3.5 w-3.5" />{grantSummary.activeGrantsLabel}
        </span>
        <PersonaSwitcher persona={persona} onChange={setPersona} />
      </div>
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
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${persona === p.id ? "bg-[#4F46E5] text-white" : "text-slate-200 hover:bg-slate-700"}`}
          title={p.description}
        >
          {p.id === "faculty-pi" ? "Faculty PI" : p.id === "student-lead" ? "Student Lead" : "Industry/CSR Mentor"}
        </button>
      ))}
    </div>
  );
}
