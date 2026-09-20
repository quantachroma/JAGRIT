"use client";

import { useState } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Lock,
  Clock,
  FileSearch,
  ShieldCheck,
  AlertTriangle,
  X,
  FlaskConical,
  Landmark,
  Users,
  Package,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type TrancheStatus = "DISBURSED" | "PENDING_AUDIT" | "LOCKED";

interface DocumentPreview {
  title: string;
  lines: string[];
}

interface Tranche {
  id: number;
  pct: number;
  amount: string;
  amountNum: number;
  label: string;
  milestone: string;
  status: TrancheStatus;
  inspectLabel: string;
  authorizeLabel: string;
  doc: DocumentPreview;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TRANCHES_INIT: Tranche[] = [
  {
    id: 1,
    pct: 30,
    amount: "₹1,05,000",
    amountNum: 105000,
    label: "Tranche 1",
    milestone: "Component Fabrication & Lab Setup",
    status: "DISBURSED",
    inspectLabel: "Inspect Fabrication Invoice & Lab Setup Report",
    authorizeLabel: "Authorize Tranche 1 Release (₹1,05,000)",
    doc: {
      title: "Fabrication Invoice & Lab Setup Verification Report",
      lines: [
        "Ref: JAG-PLM-0082 / T1 / FAB-INV-2025",
        "BIT Mesra Material Procurement — Approved Vendor: Aqua Techno Labs, Ranchi",
        "Items: 12× Defluoridation Filter Cartridges (Activated Alumina Grade III)",
        "Lab Commissioning: Room B-204, Environmental Engineering Block",
        "Verified by: Dr. P. Oraon, Faculty PI | Date: 14 Nov 2025",
        "NABL Lab Requisition Logged: NABL-JHK-2025-1148",
        "Status: FULLY VERIFIED — Tranche 1 released on 18 Nov 2025",
      ],
    },
  },
  {
    id: 2,
    pct: 40,
    amount: "₹1,40,000",
    amountNum: 140000,
    label: "Tranche 2",
    milestone: "Laboratory Bench Validation",
    status: "PENDING_AUDIT",
    inspectLabel: "Inspect NABL Certificate",
    authorizeLabel: "Authorize Tranche 2 Release (₹1,40,000)",
    doc: {
      title: "NABL Accredited Lab Test Report — Defluoridation Bench Study",
      lines: [
        "Test ID: NABL-JHK-2025-1148 | NABL Cert No: MC-3302",
        "Testing Laboratory: IIT (ISM) Central Instrumentation Facility, Dhanbad",
        "Sample Source: Handpump, Ward 7, Hussainabad, Palamu",
        "────────────────────────────────────",
        "Parameter       | Raw Water | Treated | WHO Limit",
        "Fluoride (mg/L) |   8.2     |   0.8   | ≤ 1.5 mg/L ✓",
        "pH              |   7.4     |   7.2   | 6.5–8.5 ✓",
        "Turbidity (NTU) |   2.1     |   0.3   | < 1.0 NTU ✓",
        "────────────────────────────────────",
        "Conclusion: Prototype reduces fluoride from 8.2 mg/L → 0.8 mg/L.",
        "Meets WHO Drinking Water Quality Guidelines (2022).",
        "Signed: Dr. S. Kumar, Analyst | NABL Stamp Affixed | 05 Jan 2026",
      ],
    },
  },
  {
    id: 3,
    pct: 30,
    amount: "₹1,05,000",
    amountNum: 105000,
    label: "Tranche 3",
    milestone: "Ground Installation & Caretaker Handover",
    status: "LOCKED",
    inspectLabel: "Inspect Gram Sabha PESA NOC & Caretaker SOP",
    authorizeLabel: "Authorize Tranche 3 Release (₹1,05,000)",
    doc: {
      title: "Gram Sabha PESA NOC & Jal Sahiya Handover Certificate",
      lines: [
        "PESA NOC Ref: GP-PLM-HBD-2026-NOC-004",
        "Panchayat: Hussainabad Gram Panchayat, Palamu",
        "Signed: Rajeshwar Mahto, Panchayat Secretary | 20 Feb 2026",
        "Resolution No.: GS/HBD/26/Resolution-12 — Approved unanimously in Gram Sabha",
        "────────────────────────────────────",
        "Jal Sahiya Training Receipt",
        "Trainee 1: Sunita Devi (Jal Sahiya, Ward 7) — Signed ✓",
        "Trainee 2: Meena Kumari (Jal Sahiya, Ward 9) — Signed ✓",
        "Training conducted: BIT Mesra outreach team, 28 Feb 2026",
        "────────────────────────────────────",
        "12-Month Spares Kit Deposit",
        "Kit Contents: 4× Replacement Cartridges, 1× Pressure Gauge, Tools",
        "Deposited with GP Koshagar | Receipt No.: GP-KIT-2026-007",
        "Status: PENDING FIELD INSTALLATION — Awaiting Tranche 2 clearance.",
      ],
    },
  },
];

/* ─── Status Badge ───────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: TrancheStatus }) {
  if (status === "DISBURSED")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" />
        DISBURSED
      </span>
    );
  if (status === "PENDING_AUDIT")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
        <Clock className="w-3 h-3" />
        PENDING EVALUATOR AUDIT
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <Lock className="w-3 h-3" />
      LOCKED
    </span>
  );
}

/* ─── Document Audit Modal ───────────────────────────────────────────────── */
interface DocModalProps {
  tranche: Tranche;
  onClose: () => void;
  onAuthorize: () => void;
}

function DocumentAuditModal({ tranche, onClose, onAuthorize }: DocModalProps) {
  const isDisbursed = tranche.status === "DISBURSED";
  const isLocked = tranche.status === "LOCKED";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-700" />
            <div>
              <h3 className="font-black text-slate-900 text-sm leading-tight">
                {tranche.doc.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {tranche.label} • {tranche.milestone}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Preview */}
        <div className="p-5">
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-300 leading-relaxed space-y-0.5 max-h-72 overflow-y-auto">
            <p className="text-slate-400 text-[10px] mb-2">
              ╔══ JAGRIT Document Vault — Immutable IPFS Reference ══╗
            </p>
            {tranche.doc.lines.map((line, i) => (
              <p key={i} className={line.startsWith("─") ? "text-slate-600" : ""}>
                {line}
              </p>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            IPFS Hash: Qm{tranche.id}xZ7kR9pL...{tranche.id}8fTyQ3 • SHA-256 verified
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          {!isDisbursed && (
            <button
              type="button"
              onClick={onAuthorize}
              disabled={isLocked}
              className={`flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-xl transition-all active:scale-95 ${
                isLocked
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {tranche.authorizeLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SLA Breach Callout ─────────────────────────────────────────────────── */
function SLABreachCallout() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
        <h4 className="text-xs font-black text-red-900 uppercase tracking-wide">
          Automated SLA Breach Protocol — Tranche 2 (Active)
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            day: "+7 Days",
            label: "Yellow Warning",
            desc: "Auto-reminder dispatched to evaluator & Faculty PI. Escalation flag raised in JAGRIT audit log.",
            color: "bg-yellow-50 border-yellow-200 text-yellow-900",
            dot: "bg-yellow-400",
            active: true,
          },
          {
            day: "+14 Days",
            label: "Dean Escalation",
            desc: "Automatic notice to Dean (R&D) of BIT Mesra. CC: District Collector Palamu. 48-hour response window.",
            color: "bg-orange-50 border-orange-200 text-orange-900",
            dot: "bg-orange-400",
            active: false,
          },
          {
            day: "+30 Days",
            label: "Default Clawback",
            desc: "Tranche 2 escrow reverted to State Treasury. 1st runner-up team (JAG-PLM-0083) auto-activated as replacement.",
            color: "bg-red-50 border-red-200 text-red-900",
            dot: "bg-red-500",
            active: false,
          },
        ].map((step) => (
          <div
            key={step.day}
            className={`border rounded-xl p-3 text-[11px] space-y-1 ${step.color} ${
              step.active ? "ring-2 ring-yellow-400 ring-offset-1" : "opacity-70"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${step.dot} ${step.active ? "animate-pulse" : ""}`} />
              <span className="font-black text-xs">{step.day}</span>
              {step.active && (
                <span className="text-[9px] font-black bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full ml-auto">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="font-bold">{step.label}</p>
            <p className="leading-snug opacity-80">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function EscrowGatekeeper() {
  const [tranches, setTranches] = useState<Tranche[]>(TRANCHES_INIT);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const modalTranche = tranches.find((t) => t.id === activeModal) ?? null;

  function handleAuthorize(id: number) {
    setTranches((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "DISBURSED" as TrancheStatus } : t))
    );
    setActiveModal(null);
  }

  const disbursedTotal = tranches
    .filter((t) => t.status === "DISBURSED")
    .reduce((acc, t) => acc + t.amountNum, 0);

  return (
    <>
      {modalTranche && (
        <DocumentAuditModal
          tranche={modalTranche}
          onClose={() => setActiveModal(null)}
          onAuthorize={() => handleAuthorize(modalTranche.id)}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* ── Header ── */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-slate-50">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
                <IndianRupee className="w-3.5 h-3.5" />
                Milestone Escrow Disbursement Gatekeeper
              </div>
              <h2 className="text-base font-black text-slate-900 leading-tight">
                Palamu Borewell Fluoride Defluoridation Unit
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="font-mono font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  #JAG-PLM-0082
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-600 font-semibold">
                  BIT Mesra R&D Team
                </span>
                <span className="text-slate-500">•</span>
                <span className="font-bold text-blue-800">
                  Total Grant: ₹3,50,000
                </span>
              </div>
            </div>

            {/* Disbursement Progress */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-right shadow-xs min-w-[180px]">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Disbursed
              </p>
              <p className="text-2xl font-black text-blue-900 tracking-tight">
                ₹{disbursedTotal.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                of ₹3,50,000 total
              </p>
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${(disbursedTotal / 350000) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {Math.round((disbursedTotal / 350000) * 100)}% released
              </p>
            </div>
          </div>
        </div>

        {/* ── Tranche Ledger ── */}
        <div className="p-5 sm:p-6 space-y-4">
          {tranches.map((tranche) => {
            const canInspect = tranche.status !== "LOCKED" || tranche.id === 3;

            return (
              <div
                key={tranche.id}
                className={`border rounded-2xl p-4 sm:p-5 space-y-3 transition-all ${
                  tranche.status === "DISBURSED"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : tranche.status === "PENDING_AUDIT"
                    ? "bg-amber-50/50 border-amber-200"
                    : "bg-slate-50 border-slate-200 opacity-80"
                }`}
              >
                {/* Row: Tranche header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                        tranche.status === "DISBURSED"
                          ? "bg-emerald-600 text-white"
                          : tranche.status === "PENDING_AUDIT"
                          ? "bg-amber-500 text-white"
                          : "bg-slate-300 text-white"
                      }`}
                    >
                      {tranche.status === "DISBURSED" ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : tranche.status === "PENDING_AUDIT" ? (
                        <FlaskConical className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-wide">
                          {tranche.label} ({tranche.pct}%)
                        </span>
                        <StatusBadge status={tranche.status} />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight mt-0.5">
                        {tranche.milestone}
                      </h3>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      {tranche.amount}
                    </span>
                  </div>
                </div>

                {/* Row: Action buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-slate-200/60">
                  {/* Inspect Document Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModal(tranche.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors"
                  >
                    <FileSearch className="w-3.5 h-3.5" />
                    [ {tranche.inspectLabel} ]
                  </button>

                  {/* Authorize Button — only for non-disbursed tranches */}
                  {tranche.status !== "DISBURSED" && (
                    <button
                      type="button"
                      onClick={() =>
                        tranche.status === "PENDING_AUDIT"
                          ? handleAuthorize(tranche.id)
                          : undefined
                      }
                      disabled={tranche.status === "LOCKED"}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-xl transition-all active:scale-95 ${
                        tranche.status === "PENDING_AUDIT"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />[ {tranche.authorizeLabel} ]
                    </button>
                  )}

                  {tranche.status === "DISBURSED" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Released & Audit-Logged to IPFS
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* ── SLA Breach Callout ── */}
          <SLABreachCallout />

          {/* Footer */}
          <div className="text-[10px] text-slate-400 font-mono text-center pt-2">
            Escrow #JAG-ESC-PLM0082 • SBI Nodal Account • All disbursements require 3rd-party
            evaluator HITL sign-off • Logged to JAGRIT Immutable Audit Ledger
          </div>
        </div>
      </div>
    </>
  );
}

