"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Building2,
  Cpu,
  AlertTriangle,
  Send,
  X,
  MapPin,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────────────────────── */
type TriageRow = {
  id: string;
  ticketId: string;
  description: string;
  severity: number;          // 0-100
  domain: string;
  defectClass: string | null;
  defectConfidence: number | null; // 0-100
  aiLabel: "Applied R&D" | "Routine Civic";
  aiConfidence: number;     // 0-100
  district: string;
  status: "pending" | "approved" | "rerouted";
  approvedNote?: string;
};

const INITIAL_ROWS: TriageRow[] = [
  {
    id: "1",
    ticketId: "JAG-PLM-0041",
    description: "Groundwater Fluoride Contamination in Palamu",
    severity: 94,
    domain: "Water Resources",
    defectClass: "Corroded Pump Casing",
    defectConfidence: 94,
    aiLabel: "Applied R&D",
    aiConfidence: 96,
    district: "Palamu",
    status: "pending",
  },
  {
    id: "2",
    ticketId: "JAG-RNC-0087",
    description: "Deep pothole and waterlogging on Kanke Road",
    severity: 35,
    domain: "Urban Infra",
    defectClass: null,
    defectConfidence: null,
    aiLabel: "Routine Civic",
    aiConfidence: 98,
    district: "Ranchi",
    status: "pending",
  },
];

/* ─── Severity Bar ──────────────────────────────────────────────────────── */
function SeverityBar({ value }: { value: number }) {
  const color =
    value >= 80 ? "bg-red-500" : value >= 50 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className={`font-black text-xs ${value >= 80 ? "text-red-700" : value >= 50 ? "text-amber-700" : "text-emerald-700"}`}>
        {value}/100
      </span>
    </div>
  );
}

/* ─── ULB Dispatch Modal ────────────────────────────────────────────────── */
function ULBModal({ ticket, onClose, onConfirm }: { ticket: TriageRow; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-slate-900 text-sm">Dispatch to Municipal ULB / JharSewa</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-2 border border-slate-100">
            <p className="font-bold text-slate-700">Ticket: <span className="font-mono">{ticket.ticketId}</span></p>
            <p className="text-slate-600">{ticket.description}</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-800 space-y-1">
            <p className="font-bold">📡 Dispatching to:</p>
            <p className="font-semibold">Ranchi Municipal Corporation API</p>
            <p className="text-sky-600 text-[11px]">Endpoint: RMC-JharSewa/v2/civic-tickets/ingest</p>
            <p className="text-sky-600 text-[11px]">SLA: 72-hour acknowledgement • PWD escalation if unresponded</p>
          </div>
          <p className="text-xs text-slate-500">
            This ticket does not meet the threshold for HEI R&amp;D engagement (AI Severity: {ticket.severity}/100).
            It will be forwarded to the relevant Urban Local Body for standard civic resolution.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100">
          <button type="button" onClick={onClose} className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-colors active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            Confirm Dispatch to RMC
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export function TriageQueue() {
  const [rows, setRows]           = useState<TriageRow[]>(INITIAL_ROWS);
  const [ulbTarget, setUlbTarget] = useState<TriageRow | null>(null);

  function handleApproveRD(id: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "approved", approvedNote: "Applied R&D approved. 7-day university bidding window opened. Budget ceiling: ₹3,50,000." }
          : r
      )
    );
  }

  function handleULBConfirm() {
    if (!ulbTarget) return;
    setRows((prev) =>
      prev.map((r) =>
        r.id === ulbTarget.id
          ? { ...r, status: "rerouted", approvedNote: "Dispatched to Ranchi Municipal Corporation via JharSewa API." }
          : r
      )
    );
    setUlbTarget(null);
  }

  return (
    <>
      {ulbTarget && (
        <ULBModal
          ticket={ulbTarget}
          onClose={() => setUlbTarget(null)}
          onConfirm={handleULBConfirm}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              AI Zero-Shot Triage Approval Queue
            </h3>
            <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full ml-1">
              DeBERTa-v3
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Human-in-the-Loop (HITL) evaluator approval required before citizen problems proceed to HEI bidding or civic dispatch.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Ticket ID", "Problem Description", "AI Severity", "Thematic Domain", "Visual Defect Class", "AI Classification Confidence", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((row) => {
                const isRD     = row.aiLabel === "Applied R&D";
                const isDone   = row.status !== "pending";
                return (
                  <tr key={row.id} className={`transition-colors ${isDone ? "opacity-70" : "hover:bg-slate-50/60"}`}>
                    {/* Ticket ID */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-mono text-[11px] font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {row.ticketId}
                      </span>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{row.district}</span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-4 max-w-[220px]">
                      <p className="font-semibold text-slate-900 leading-snug">{row.description}</p>
                    </td>

                    {/* Severity */}
                    <td className="px-4 py-4">
                      <SeverityBar value={row.severity} />
                    </td>

                    {/* Domain */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-lg border border-blue-100">
                        {row.domain}
                      </span>
                    </td>

                    {/* Visual Defect */}
                    <td className="px-4 py-4">
                      {row.defectClass ? (
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-800">{row.defectClass}</p>
                          <p className="text-[10px] text-slate-400">{row.defectConfidence}% match</p>
                        </div>
                      ) : (
                        <span className="text-slate-300 italic">N/A</span>
                      )}
                    </td>

                    {/* AI Confidence */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-black ${
                            isRD
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-sky-100 text-sky-800 border border-sky-200"
                          }`}
                        >
                          {row.aiConfidence}% {row.aiLabel}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      {isDone ? (
                        <div className="flex items-start gap-1.5 max-w-[220px]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-slate-600 font-medium leading-snug">{row.approvedNote}</p>
                        </div>
                      ) : isRD ? (
                        <button
                          type="button"
                          onClick={() => handleApproveRD(row.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs leading-snug text-left"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Approve as Applied R&amp;D &amp; Authorize ₹3,50,000 Grant Ceiling</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setUlbTarget(row)}
                          className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-[11px] px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs leading-snug text-left"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Reroute to Municipal ULB / JharSewa</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-slate-100 text-[10px] text-slate-400">
          Model: DeBERTa-v3-large-mnli • Zero-shot classification on zero labelled Jharkhand data • All approvals logged to immutable IPFS audit chain.
        </div>
      </div>
    </>
  );
}

