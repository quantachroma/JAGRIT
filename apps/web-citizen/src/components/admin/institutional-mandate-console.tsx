"use client";

import { useState } from "react";
import {
  GraduationCap,
  Landmark,
  Send,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

const INSTITUTIONS = [
  "Birsa Agricultural University (BAU), Ranchi",
  "BIT Sindri, Dhanbad",
  "IIT (ISM) Dhanbad",
  "BIT Mesra, Ranchi",
  "Nilamber-Pitamber University, Palamu",
  "Sido Kanhu Murmu University, Dumka",
  "Kolhan University, Chaibasa",
];

type MandateStatus = "idle" | "issued";

export function InstitutionalMandateConsole() {
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [problemDescription, setProblemDescription]   = useState<string>("");
  const [mandateStatus, setMandateStatus]             = useState<MandateStatus>("idle");
  const [issuedTo, setIssuedTo]                       = useState<string>("");

  function handleIssue() {
    if (!selectedInstitution) return;
    setIssuedTo(selectedInstitution);
    setMandateStatus("issued");
    setSelectedInstitution("");
    setProblemDescription("");
  }

  function handleReset() {
    setMandateStatus("idle");
    setIssuedTo("");
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <Landmark className="w-5 h-5 text-blue-800" />
          <h3 className="text-sm font-bold text-slate-900">
            State Institutional Mandate Console
          </h3>
          <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-1">
            JCSTI Charter
          </span>
        </div>
        <p className="text-xs text-slate-500">
          DHTE can issue compulsory funded research directives to specific HEIs for
          chronic problems that remain unaccepted after re-scoping.
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 text-xs text-blue-900 space-y-1">
          <p className="font-bold text-blue-800">
            📋 State Research Mandate under JCSTI Charter
          </p>
          <p className="leading-relaxed">
            Under the Jharkhand Council of Science, Technology &amp; Innovation (JCSTI) Act,
            the Department of Higher &amp; Technical Education may issue a <strong>compulsory
            funded research directive</strong> to a designated HEI. The institution is
            legally required to form a Faculty PI team within 14 days and submit a
            milestone plan within 30 days. Failure attracts a −10 AISHE performance score.
          </p>
        </div>

        {mandateStatus === "issued" ? (
          /* Success State */
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3 text-xs text-emerald-800">
            <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              State Research Mandate Issued Successfully
            </div>
            <div className="space-y-1 text-[11px]">
              <p><strong>Institution:</strong> {issuedTo}</p>
              <p><strong>Issuing Authority:</strong> Dept. of Higher &amp; Technical Education, GoJ</p>
              <p><strong>Legal Basis:</strong> JCSTI Charter — Section 14(b) Compulsory Innovation Directive</p>
              <p><strong>Response Deadline:</strong> 14 days (Faculty PI formation)</p>
              <p><strong>Milestone Plan Deadline:</strong> 30 days</p>
              <p><strong>Non-compliance Penalty:</strong> −10 AISHE institutional performance score</p>
            </div>
            <p className="text-[10px] text-emerald-600">
              Mandate reference logged to JAGRIT immutable audit ledger. Copy dispatched to JCSTI Secretariat.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900 mt-1"
            >
              Issue another mandate →
            </button>
          </div>
        ) : (
          /* Form State */
          <div className="space-y-4">
            {/* Institution Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Select Institution
              </label>
              <div className="relative">
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10 cursor-pointer"
                >
                  <option value="" disabled>
                    — Select an HEI to issue mandate to —
                  </option>
                  {INSTITUTIONS.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Problem Description (optional context) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Problem Context / Directive Note
                <span className="text-slate-400 font-normal ml-1 normal-case">(optional)</span>
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="e.g., Iron-Rich Acid Water in Latehar Tribal Hamlet — chronic unresolved for 11 months, zero HEI bids after 3 open windows..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              />
            </div>

            {/* Warning */}
            {selectedInstitution && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Issuing a State Research Mandate to{" "}
                  <strong>{selectedInstitution}</strong> is a legally binding directive
                  under the JCSTI Charter. Ensure this action has been reviewed at Joint
                  Secretary level or above before proceeding.
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              type="button"
              onClick={handleIssue}
              disabled={!selectedInstitution}
              className={`w-full flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-xl transition-all active:scale-[0.99] ${
                selectedInstitution
                  ? "bg-blue-800 hover:bg-blue-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Issue State Research Mandate under JCSTI Charter
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

