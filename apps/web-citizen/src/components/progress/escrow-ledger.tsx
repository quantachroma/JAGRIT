'use client';

import React from 'react';
import { EscrowTranche } from './types';
import { IndianRupee, ShieldCheck, CheckCircle2, Lock, ArrowUpRight, FileCheck } from 'lucide-react';

interface EscrowLedgerProps {
  tranches: EscrowTranche[];
  totalBudget: string;
  language: 'en' | 'hi' | 'sat';
}

export default function EscrowLedger({ tranches, totalBudget, language }: EscrowLedgerProps) {
  const getMilestoneTitle = (tranche: EscrowTranche) => {
    if (language === 'hi') return tranche.milestoneTitleHi;
    if (language === 'sat') return tranche.milestoneTitleSat;
    return tranche.milestoneTitleEn;
  };

  const getVerificationBadge = (tranche: EscrowTranche) => {
    if (language === 'hi') return tranche.verificationBadgeHi;
    if (language === 'sat') return tranche.verificationBadgeSat;
    return tranche.verificationBadgeEn;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Ledger Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? 'चरणबद्ध एस्क्रो निधि लेजर'
                : language === 'sat'
                ? 'ᱥᱚᱨᱠᱟᱨ ᱯᱟᱭᱥᱟ ᱠᱷᱟᱛᱟ ᱞᱮᱰᱡᱟᱨ'
                : 'Tranche-Based Escrow Financial Health Ledger'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {language === 'hi'
              ? 'मील का पत्थर आधारित सरकारी अनुदान एवं वित्तीय सुरक्षा'
              : language === 'sat'
              ? 'ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱞᱮᱠᱟᱛᱮ ᱥᱚᱨᱠᱟᱨ ᱯᱟᱭᱥᱟ ᱪᱟᱞ'
              : 'Milestone-Gated Government Innovation Escrow'}
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {language === 'hi' ? 'कुल संवितरित निधि' : language === 'sat' ? 'ᱜᱩᱞᱟᱹᱴ ᱮᱢ ᱟᱠᱟᱱ ᱯᱟᱭᱥᱟ' : 'Total Escrow Disbursed'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-900 tracking-tight block">
            {totalBudget}
          </span>
          <span className="text-[11px] font-bold text-emerald-700 block">
            {language === 'hi' ? '१००% मील के पत्थर सत्यापित' : language === 'sat' ? '᱑᱐᱐% ᱠᱟᱹᱢᱤ ᱥᱟᱹᱨᱤ ᱮᱱᱟ' : '100% Milestone Verified'}
          </span>
        </div>
      </div>

      {/* 3 Tranche Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tranches.map((t) => (
          <div
            key={t.trancheNumber}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex flex-col justify-between space-y-4 transition-all"
          >
            {/* Top Tranche Pill & Amount */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900">
                {language === 'hi' ? `किस्त ${t.trancheNumber} (${t.percentage}%)` : language === 'sat' ? `ᱠᱤᱥᱛᱤ ${t.trancheNumber} (${t.percentage}%)` : `Tranche 0${t.trancheNumber} (${t.percentage}%)`}
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>{language === 'hi' ? 'संवितरित' : language === 'sat' ? 'ᱮᱢ ᱮᱱᱟ' : 'DISBURSED'}</span>
              </span>
            </div>

            {/* Tranche Title & Amount */}
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {t.amount}
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
                {getMilestoneTitle(t)}
              </h3>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {language === 'hi' ? `विमुक्ति तिथि: ${t.disbursedDate}` : language === 'sat' ? `ᱢᱟᱹᱦᱤᱛ: ${t.disbursedDate}` : `Release Date: ${t.disbursedDate}`}
              </span>
            </div>

            {/* Verification Badge & Proof Ref */}
            <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
              <div className="flex items-start gap-1.5 text-[11px] text-emerald-900 font-bold bg-white p-2 rounded-xl border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{getVerificationBadge(t)}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block pl-1">
                Ref: {t.attachmentRef}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Escrow Security Callout Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-emerald-950">
              {language === 'hi'
                ? 'एसबीएलए क्लॉबैक सुरक्षा उपायों द्वारा सुरक्षित एस्क्रो'
                : language === 'sat'
                ? 'SLA ᱟᱹᱱ ᱦᱚᱛᱮᱛᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱯᱟᱭᱥᱟ ᱠᱷᱟᱛᱟ'
                : 'Protected by SLA Clawback Safeguards. 0% unverified upfront leakage.'}
            </h4>
            <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
              {language === 'hi'
                ? 'निधि केवल भौतिक प्रमाण और डिजिटल ग्राम सभा सत्यापन के बाद ही जारी होती है। अप्रयुक्त राशि स्वचालित रूप से ट्रेजरी को वापस लौट जाती है।'
                : language === 'sat'
                ? 'ᱠᱟᱹᱢᱤ ᱥᱟᱹᱨᱤ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱢᱟᱹᱱ ᱛᱟᱭᱚᱢ ᱜᱮ ᱴᱟᱠᱟ ᱪᱟᱞᱟᱜ-ᱟ᱾ ᱵᱟᱝ ᱠᱟᱹᱢᱤ ᱞᱮᱱᱠᱷᱟᱱ ᱴᱟᱠᱟ ᱨᱩᱣᱟᱹᱲ ᱦᱤᱡᱩᱜ-ᱟ᱾'
                : 'Funds locked in SBI Nodal Escrow and released strictly upon third-party verification. Unverified tranches are clawed back.'}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl whitespace-nowrap self-start sm:self-auto shadow-2xs">
          Escrow #JAG-ESC-PLM08
        </span>
      </div>
    </div>
  );
}

