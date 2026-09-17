"use client";
import { useState } from "react";
import { Archive, Award, FlaskConical, MapPin, Terminal, Copy, Check, X, FileText, CheckCircle2 } from "lucide-react";
import type { FailureCase } from "@/lib/failures";
import { formatINR } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

export default function FailureCard({ c }: { c: FailureCase }) {
  const { t } = useLanguage();
  const major = c.severity === "MAJOR";
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const gitCloneCmd = `git clone https://github.com/jharkhand-rnd/fail-2024-plm-fluoride.git`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gitCloneCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadDPR = () => {
    const dprSummary = `%PDF-1.4 Mock DPR Report
======================================================================
JHARKHAND STATE R&D FAILURE KNOWLEDGE BASE - DETAILED PROJECT REPORT (DPR)
Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society
======================================================================

CASE ID: ${c.id}
TICKET REF: #${c.ticketId}
PROJECT TITLE: ${c.title}
INSTITUTION: ${c.campus}
ACADEMIC YEAR: ${c.year}
TEAM COMPOSITION: ${c.teamSize} Faculty & Student Researchers
R&D GRANT EXPENDITURE: ${formatINR(c.costINR)}
DOMAIN: ${c.domain}
DISTRICT TARGET: ${c.district}
TRL LEVEL AT TIME OF ARCHIVAL: ${c.trl}

----------------------------------------------------------------------
1. OBJECTIVE & PROPOSED METHODOLOGY
----------------------------------------------------------------------
${c.attempted}

TECHNICAL SPECIFICATIONS:
${c.specs.map((s, i) => `  [${i + 1}] ${s}`).join("\n")}

----------------------------------------------------------------------
2. FAILURE ANALYSIS & ROOT CAUSE (WHY IT FAILED IN THE FIELD)
----------------------------------------------------------------------
ROOT CAUSE:
${c.rootCause}

OBSERVED FAILURE MODES:
${c.failureModes.map((f, i) => `  * ${f}`).join("\n")}

----------------------------------------------------------------------
3. DIRECTIVES FOR SUBSEQUENT ACADEMIC & INDUSTRY RESEARCH TEAMS
----------------------------------------------------------------------
${c.recommendations.map((r, i) => `  (${i + 1}) ${r}`).join("\n")}

----------------------------------------------------------------------
4. REPOSITORY & ESCROW AUDIT REFERENCE
----------------------------------------------------------------------
Git Archive: ${gitCloneCmd}
State Audit Ref: RND-JAGRIT-ESCROW-${c.id}
Status: Archived for Annual Hackathon Re-engineering
`;
    const blob = new Blob([dprSummary], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DPR-${c.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <article className={`relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${major ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200"}`}>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className={`rounded-full px-2 py-0.5 font-bold ${major ? "bg-blue-100 text-[#1E3A8A] border border-blue-200" : "bg-slate-100 text-slate-700"}`}>
          {major ? "MAJOR" : "MINOR"}
        </span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#2563EB]">{c.domain}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
          <MapPin className="h-3 w-3 text-[#2563EB]" />{c.district}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">{c.trl}</span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A] text-white px-3 py-1 text-[11px] font-bold shadow-xs">
          {t.repository.selectedHackathonBadge}
        </span>
        {major && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] font-bold text-[#1E3A8A] shadow-xs">
            <Award className="h-3.5 w-3.5 text-[#2563EB]" />
            {t.repository.promotedPanIndiaBadge}
          </span>
        )}
      </div>

      <h2 className="mt-2.5 text-base font-bold leading-snug text-slate-950">#{c.ticketId} — {c.title}</h2>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
        <FlaskConical className="h-3.5 w-3.5 text-[#2563EB]" />
        {c.campus} · {c.year} · {c.teamSize} members · {formatINR(c.costINR)}
      </p>

      <div className="mt-3.5 rounded-lg border-l-4 border-sky-500 bg-sky-50/60 p-3">
        <p className="text-xs font-bold text-sky-950">{t.repository.whatAttemptedLabel}</p>
        <p className="mt-1 text-xs text-slate-800">{c.attempted}</p>
        <ul className="mt-1.5 list-disc pl-4 text-[11px] text-slate-700 space-y-0.5">
          {c.specs.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>

      <div className="mt-2.5 rounded-lg border-l-4 border-[#2563EB] bg-[#EFF6FF] p-3">
        <p className="text-xs font-bold text-[#1E3A8A]">{t.repository.rootCauseLabel}</p>
        <p className="mt-1 text-xs text-slate-800">{c.rootCause}</p>
        <ul className="mt-1.5 list-disc pl-4 text-[11px] text-slate-700 space-y-0.5">
          {c.failureModes.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>

      <div className="mt-2.5 rounded-lg border-l-4 border-[#1E3A8A] bg-blue-50/60 p-3">
        <p className="text-xs font-bold text-[#1E3A8A]">{t.repository.lessonsLabel}</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-800">
          {c.recommendations.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>

      {/* Action Buttons: Download Past DPR Report & Clone Project Repository */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Button 1: Download Past DPR Report (PDF) */}
          <button
            type="button"
            onClick={handleDownloadDPR}
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 px-3 py-2 text-xs font-bold text-[#1E3A8A] transition-colors shadow-xs"
            title="Download full architectural and metallurgical Detailed Project Report"
          >
            <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>{t.repository.downloadDprBtn}</span>
          </button>

          {/* Button 2: Clone Project Repository */}
          <button
            type="button"
            onClick={() => setShowCloneModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#2563EB] px-3.5 py-2 text-xs font-bold text-white transition-colors shadow-xs"
            title="Clone Git repository containing hardware schematics and codebase"
          >
            <Terminal className="h-3.5 w-3.5 text-sky-200" />
            <span>{t.repository.cloneRepoBtn}</span>
          </button>
        </div>

        <p className="inline-flex items-center gap-1 text-[11px] text-slate-400">
          <Archive className="h-3 w-3" />{c.id} · rnd_failure_repository
        </p>
      </div>

      {/* Instant Download Feedback Toast */}
      {downloaded && (
        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 p-2.5 text-xs text-[#1E3A8A]">
          <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0" />
          <span className="font-semibold">
            DPR report for <strong>{c.id}</strong> downloaded as PDF. Check your downloads folder.
          </span>
        </div>
      )}

      {/* Clone Repo Modal */}
      {showCloneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-blue-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-[#1E3A8A] px-2.5 py-0.5 text-[11px] font-bold">
                  <Terminal className="h-3.5 w-3.5 text-[#2563EB]" />
                  Open Source Research Archive
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-slate-950">Clone Project Repository</h3>
                <p className="text-xs text-slate-500">
                  #{c.ticketId} — {c.title} ({c.id})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCloneModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-950 p-3.5 text-white font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>bash / git shell</span>
                <span className="text-sky-300">HTTPS</span>
              </div>
              <code className="text-sky-300 select-all break-all block">
                {gitCloneCmd}
              </code>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-sky-200" />
                    <span>✓ Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>📋 Copy Git Command</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowCloneModal(false)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors"
              >
                {t.repository.closeBtn}
              </button>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
              💡 <strong>Repository Contents:</strong> Hardware schematics (CAD/KiCad), firmware C/C++ source code, failed lab test telemetry logs, and component Bill of Materials (BOM).
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
