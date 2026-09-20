"use client";

import Link from "next/link";
import {
  Landmark,
  IndianRupee,
  Briefcase,
  Lock,
  FlaskConical,
  ShieldCheck,
  Handshake,
  ChevronRight,
} from "lucide-react";

import { TriageQueue }               from "@/components/admin/triage-queue";
import { ScopeExpansionModal }       from "@/components/admin/scope-expansion-modal";
import { DistrictHeatmap }           from "@/components/admin/district-heatmap";
import { InstitutionalMandateConsole } from "@/components/admin/institutional-mandate-console";
import { EscrowGatekeeper }          from "@/components/admin/escrow-gatekeeper";

/* ─── Treasury KPI Card ─────────────────────────────────────────────────── */
type TreasuryCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent: string;
  bg: string;
};

function TreasuryCard({ icon: Icon, label, value, sub, accent, bg }: TreasuryCardProps) {
  return (
    <div className={`${bg} rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs`}>
      <div className={`${accent} p-3 rounded-xl shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-tight mb-0.5">
          {label}
        </p>
        <p className="text-xl font-black text-slate-900 leading-tight tracking-tight">
          {value}
        </p>
        {sub && (
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{sub}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function AdminCommandCenterPage() {
  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">

      {/* ══ Page Header ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-blue-800" />
            <h1 className="text-lg font-black text-blue-950 tracking-tight leading-tight">
              Government of Jharkhand
            </h1>
          </div>
          <h2 className="text-sm font-bold text-slate-600 pl-8">
            Department of Higher &amp; Technical Education (DHTE) — Command Center
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          HITL Evaluator Active Session
        </div>
      </div>

      {/* ══ State Treasury Overview Strip ════════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          State Treasury Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <TreasuryCard
            icon={IndianRupee}
            label="Total State Innovation Pool"
            value="₹4.20 Crore"
            sub="Govt of Jharkhand — FY 2025-26"
            accent="bg-blue-700"
            bg="bg-blue-50/60"
          />
          <TreasuryCard
            icon={Briefcase}
            label="Corporate CSR Matched Pool"
            value="₹4.85 Crore"
            sub="TATA Steel, JSW, Vedanta & 12 others"
            accent="bg-violet-700"
            bg="bg-violet-50/60"
          />
          <TreasuryCard
            icon={Lock}
            label="Escrow Locked Capital"
            value="₹1.40 Crore"
            sub="Across 42 active milestone tranches"
            accent="bg-amber-600"
            bg="bg-amber-50/60"
          />
          <TreasuryCard
            icon={FlaskConical}
            label="Active HEI Projects"
            value="384 Active"
            sub="Across 24 districts • 42+ universities"
            accent="bg-emerald-700"
            bg="bg-emerald-50/60"
          />
        </div>
      </section>

      {/* ══ AI Triage Queue ═══════════════════════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          AI Zero-Shot Triage Approval Queue
        </h2>
        <TriageQueue />
      </section>

      {/* ══ Anti-Speculation Scope Expansion ═════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Anti-Speculation Scope Expansion Control
        </h2>
        <ScopeExpansionModal />
      </section>

      {/* ══ 24-District GIS Heatmap ═══════════════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Statewide 24-District GIS Summary Heatmap
        </h2>
        <DistrictHeatmap />
      </section>

      {/* ══ Institutional Mandate Console ════════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          State Institutional Mandate Console
        </h2>
        <InstitutionalMandateConsole />
      </section>

      {/* ══ Milestone Escrow Disbursement Gatekeeper ══════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Milestone Escrow Disbursement Gatekeeper
        </h2>
        <EscrowGatekeeper />
      </section>

      {/* ══ CSR Partner Console Nav Card ══════════════════════════════════════ */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Industry &amp; CSR Partnership Hub
        </h2>
        <Link href="/admin/csr" className="block">
          <div className="bg-gradient-to-r from-violet-600 to-blue-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md hover:shadow-lg hover:from-violet-700 hover:to-blue-800 transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-base font-black leading-tight">
                  Corporate CSR &amp; Industry Innovation Hub
                </h3>
                <p className="text-[12px] text-violet-200 font-medium mt-0.5">
                  1:1 Matching Grant Escrow • Section 135 / Schedule VII •
                  Mentorship Board • ROFR Patent Licensing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/30 transition-colors group-hover:bg-white/30 shrink-0">
              Open CSR Console
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* ══ Footer note ══════════════════════════════════════════════════════ */}
      <div className="text-[10px] text-slate-400 text-center pb-4">
        JAGRIT SIH26043 • Department of Higher &amp; Technical Education, Government of Jharkhand •
        All actions are audit-logged to the immutable IPFS ledger.
      </div>
    </div>
  );
}

