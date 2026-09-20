"use client";

import { useState } from "react";
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  X,
  BadgeAlert,
  ArrowUpRight,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────────────────────── */
type ScopeItem = {
  id: string;
  label: string;
  mandatory: boolean;
};

type UnacceptedChallenge = {
  ticketId: string;
  title: string;
  district: string;
  originalBudget: number;
  expandedBudget: number;
  zeroBidDays: number;
  status: "open" | "rescoped";
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const CHALLENGE: UnacceptedChallenge = {
  ticketId: "JAG-LHR-0019",
  title: "Iron-Rich Acid Water in Latehar Tribal Hamlet",
  district: "Latehar",
  originalBudget: 350000,
  expandedBudget: 437500,
  zeroBidDays: 7,
  status: "open",
};

const SCOPE_ITEMS: ScopeItem[] = [
  { id: "s1", label: "Cover 2 adjacent hamlets instead of 1 borewell (mandatory geographic expansion)", mandatory: true },
  { id: "s2", label: "Install 24/7 digital IoT water quality telemetry sensors (real-time Fe²⁺/pH/TDS monitoring)", mandatory: true },
  { id: "s3", label: "Provide 24 months of replacement spares instead of 12 months (extended operational continuity)", mandatory: true },
  { id: "s4", label: "Remove 120 km geofence — broadcast statewide across all 42+ HEIs (pan-Jharkhand open bidding)", mandatory: true },
  { id: "s5", label: "Apply −5 point institutional responsiveness penalty (score H) to any invited local college that skipped Round 1 without justification", mandatory: true },
];

/* ─── Re-Scope Modal ────────────────────────────────────────────────────── */
function RescopeModal({
  challenge,
  onClose,
  onConfirm,
}: {
  challenge: UnacceptedChallenge;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(SCOPE_ITEMS.map((s) => [s.id, false]))
  );
  const [budgetConfirmed, setBudgetConfirmed] = useState(false);

  const allChecked = Object.values(checked).every(Boolean) && budgetConfirmed;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <BadgeAlert className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-sm">Re-scope Deliverables & Expand Budget</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Ticket Info */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {challenge.ticketId}
              </span>
              <span className="text-slate-500">{challenge.district} District</span>
            </div>
            <p className="font-semibold text-slate-900 text-sm">{challenge.title}</p>
            <p className="text-red-600 font-bold">
              ⚠ 0 university bids received in {challenge.zeroBidDays}-day bidding window
            </p>
          </div>

          {/* Anti-Speculation Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-black text-amber-800 text-[13px]">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Anti-Speculation Safeguard Active
            </div>
            <p className="leading-relaxed">
              To prevent colleges from waiting for free money, budget increases <strong>MUST</strong> be
              tied to expanded deliverables. All scope items below are mandatory pre-conditions for approval.
            </p>
          </div>

          {/* Budget Increase */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">1. Budget Increase Confirmation</h4>
            <button
              type="button"
              onClick={() => setBudgetConfirmed(!budgetConfirmed)}
              className="w-full flex items-start gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-left transition-colors"
            >
              <span className="mt-0.5 shrink-0 text-blue-600">
                {budgetConfirmed ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
              </span>
              <span className="text-xs text-slate-800 leading-relaxed">
                Approve budget increase from{" "}
                <span className="font-bold line-through text-red-600">₹3,50,000</span> to{" "}
                <span className="font-bold text-emerald-700">₹4,37,500</span>{" "}
                <span className="text-slate-500">(+25% | +₹87,500)</span>
              </span>
            </button>
          </div>

          {/* Mandatory Scope Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              2. Mandatory Scope Expansions
            </h4>
            <div className="space-y-2">
              {SCOPE_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-start gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-left transition-colors"
                >
                  <span className="mt-0.5 shrink-0 text-blue-600">
                    {checked[item.id] ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </span>
                  <span className="text-xs text-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-500 mr-1.5">({idx + 1})</span>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary Panel */}
          {allChecked && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 space-y-1">
              <p className="font-bold text-emerald-900">✓ All pre-conditions satisfied — ready to re-scope.</p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                <li>Budget: ₹4,37,500 (+25%)</li>
                <li>Geofence removed — 42+ HEIs notified statewide</li>
                <li>IoT telemetry & 24-month spares mandated</li>
                <li>−5 responsiveness penalty applied to non-participating local colleges</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={allChecked ? onConfirm : undefined}
            disabled={!allChecked}
            className={`text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 ${
              allChecked
                ? "bg-amber-600 hover:bg-amber-700 shadow-xs"
                : "bg-slate-300 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Confirm Re-scope & Broadcast Statewide
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export function ScopeExpansionModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus]           = useState<"open" | "rescoped">(CHALLENGE.status as "open" | "rescoped");
  const [expanded, setExpanded]       = useState(true);

  function handleConfirm() {
    setStatus("rescoped");
    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen && (
        <RescopeModal
          challenge={CHALLENGE}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Section Header */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-5 border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Anti-Speculation Scope Expansion Control
              </h3>
              <p className="text-xs text-slate-500">
                Challenges with zero bids after 7-day window — mandatory scope expansion required to unlock budget increase
              </p>
            </div>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expanded && (
          <>
            {/* Anti-Speculation Callout Banner */}
            <div className="mx-5 mt-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 text-xs text-amber-900">
              <div className="flex items-center gap-1.5 font-black text-amber-800 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Anti-Speculation Safeguard Active
              </div>
              <p>
                To prevent colleges from waiting for free money, grant increases <strong>MUST</strong> be tied to
                expanded deliverables. Every budget increment is gated by compulsory additional scope requirements.
              </p>
            </div>

            {/* Unaccepted Challenges Table */}
            <div className="p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Unaccepted Challenges (0 bids after bidding window closed)
              </h4>

              <div className={`border rounded-xl p-4 space-y-3 transition-all ${status === "rescoped" ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-black bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {CHALLENGE.ticketId}
                      </span>
                      <span className="text-slate-500">{CHALLENGE.district} District</span>
                      <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-[11px]">
                        0 bids in {CHALLENGE.zeroBidDays} days
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{CHALLENGE.title}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                      <span>Original: <strong className="text-slate-800">₹3,50,000</strong></span>
                      <span>→</span>
                      <span>Expanded: <strong className="text-emerald-700">₹4,37,500</strong> (+25%)</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {status === "rescoped" ? (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-200">
                        <CheckSquare className="w-4 h-4" />
                        Re-scoped & Broadcast Statewide
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-xs whitespace-nowrap"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Re-scope Deliverables & Approve +25% Budget
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

