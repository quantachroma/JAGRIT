"use client";

import { useState } from "react";
import {
  IndianRupee,
  Handshake,
  FileCheck2,
  X,
  Download,
  CheckCircle2,
  Building2,
} from "lucide-react";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

/* ─── Tax Receipt Modal ───────────────────────────────────────────────────── */
interface TaxReceiptModalProps {
  pledge: number;
  onClose: () => void;
}

function TaxReceiptModal({ pledge, onClose }: TaxReceiptModalProps) {
  const total = pledge * 2;
  const now = new Date();
  const receiptNo = `MCA-CSR1-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}-0082`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-slate-50">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-violet-700" />
            <div>
              <h3 className="font-black text-slate-900 text-sm leading-tight">
                MCA Form CSR-1 — Tax Deduction Receipt
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Section 135 / Schedule VII • JAGRIT Platform
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

        {/* Receipt Preview */}
        <div className="p-5">
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-300 leading-relaxed space-y-1">
            <p className="text-slate-400 text-[10px] mb-2">
              ╔══ GOVERNMENT OF INDIA — MINISTRY OF CORPORATE AFFAIRS ══╗
            </p>
            <p className="text-white font-bold">FORM CSR-1 — CONTRIBUTION RECEIPT</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p>Receipt No: {receiptNo}</p>
            <p>Date: {now.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p>Donor Entity: Tata Steel CSR &amp; Sustainability Division</p>
            <p>CIN: L27102JH1907PLC000001</p>
            <p>PAN: AAACT2727Q</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p>Implementing Agency: JAGRIT Platform</p>
            <p>  (Dept. of Higher &amp; Technical Education, Govt. of Jharkhand)</p>
            <p>Schedule VII Category (i): Clean Drinking Water &amp; Sanitation</p>
            <p>Project: Palamu Fluoride Defluoridation Units (JAG-PLM-0082)</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p>Corporate Pledge Amount:   {formatINR(pledge)}</p>
            <p>State DHTE 1:1 Match:      {formatINR(pledge)}</p>
            <p className="text-yellow-400 font-bold">Total Project Grant:       {formatINR(total)}</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p>Tax Deduction u/s 80G:     100% of {formatINR(pledge)}</p>
            <p>Escrow Lock Reference:     JAG-ESC-PLM0082</p>
            <p className="text-slate-500">{"─".repeat(44)}</p>
            <p className="text-emerald-400">✓ Digitally Signed: JAGRIT DHTE Auth Node</p>
            <p className="text-slate-400 text-[10px] mt-2">
              IPFS Receipt Hash: QmT2xR...9kLpZ • SHA-256 Verified
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Matching Pledge Slider ─────────────────────────────────────────────── */
const MIN = 50000;
const MAX = 1000000;
const DEFAULT = 175000;

export function MatchingPledgeSlider() {
  const [pledge, setPledge] = useState(DEFAULT);
  const [showModal, setShowModal] = useState(false);

  const stateMatch = pledge;
  const totalGrant = pledge * 2;

  // Slider percentage for track fill
  const pct = ((pledge - MIN) / (MAX - MIN)) * 100;

  return (
    <>
      {showModal && (
        <TaxReceiptModal pledge={pledge} onClose={() => setShowModal(false)} />
      )}

      <div className="bg-white rounded-2xl border border-violet-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-slate-50">
          <div className="flex items-center gap-2 mb-1">
            <Handshake className="w-5 h-5 text-violet-700" />
            <h3 className="font-black text-slate-900 text-sm">
              1:1 Matching Grant Escrow Pledge
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            State DHTE matches every corporate rupee pledged, rupee-for-rupee.
            Funds are locked in SBI Nodal Escrow until milestone disbursement.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Live Amount Display */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-violet-600 uppercase tracking-wide mb-1">
                Your Pledge
              </p>
              <p className="text-lg font-black text-violet-900 tracking-tight">
                {formatINR(pledge)}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Building2 className="w-3 h-3 text-violet-500" />
                <span className="text-[10px] text-violet-600 font-semibold">Corporate CSR</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-300">+</span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">DHTE Match</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1">
                State DHTE Match
              </p>
              <p className="text-lg font-black text-emerald-900 tracking-tight">
                {formatINR(stateMatch)}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] text-emerald-600 font-semibold">Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Total Banner */}
          <div className="bg-gradient-to-r from-violet-600 to-blue-700 rounded-xl p-4 text-center text-white">
            <p className="text-[11px] font-bold opacity-80 uppercase tracking-wider mb-1">
              Total Project Grant Unlocked
            </p>
            <div className="flex items-center justify-center gap-2">
              <IndianRupee className="w-5 h-5 opacity-90" />
              <p className="text-2xl font-black tracking-tight">
                {totalGrant.toLocaleString("en-IN")}
              </p>
            </div>
            <p className="text-[10px] opacity-70 mt-1">
              {formatINR(pledge)} (Corporate) + {formatINR(stateMatch)} (DHTE) = {formatINR(totalGrant)}
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-semibold">₹50,000 (Min)</span>
              <span className="font-black text-violet-800">Drag to set pledge amount</span>
              <span className="text-slate-500 font-semibold">₹10,00,000 (Max)</span>
            </div>

            {/* Custom styled range input */}
            <div className="relative h-6 flex items-center">
              <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={5000}
                value={pledge}
                onChange={(e) => setPledge(Number(e.target.value))}
                className="absolute inset-x-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-violet-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-grab"
              />
            </div>

            {/* Quick-select chips */}
            <div className="flex flex-wrap gap-2">
              {[50000, 175000, 500000, 1000000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setPledge(v)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    pledge === v
                      ? "bg-violet-600 text-white border-violet-600"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                  }`}
                >
                  {formatINR(v)}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 font-black text-sm px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md transition-all active:scale-[0.98]"
          >
            <FileCheck2 className="w-4 h-4" />
            Pledge &amp; Download MCA Form CSR-1 Receipt
          </button>

          <p className="text-[10px] text-slate-400 text-center font-mono">
            Escrow Pledge Reference: JAG-ESC-CSR-TATA-2026 • Section 135 / Schedule VII Compliant
          </p>
        </div>
      </div>
    </>
  );
}

