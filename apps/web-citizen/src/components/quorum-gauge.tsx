'use client';

import React from 'react';
import { Users, CheckCircle2, AlertTriangle, Wrench, ShieldCheck, Info, Sparkles } from 'lucide-react';

export interface QuorumGaugeProps {
  population?: number;
  quorumTarget?: number;
  votesLogged?: number;
  operationalPassRate?: number;
  cosmeticGrievanceRate?: number;
  criticalDefectRate?: number;
  cosmeticExample?: string;
  criticalThreshold?: number;
  language?: 'hi' | 'sat' | 'en';
}

export default function QuorumGauge({
  population = 850,
  quorumTarget = 42,
  votesLogged = 45,
  operationalPassRate = 88,
  cosmeticGrievanceRate = 10,
  criticalDefectRate = 2,
  cosmeticExample,
  criticalThreshold = 30,
  language = 'hi',
}: QuorumGaugeProps) {
  const defaultCosmeticRemark =
    cosmeticExample ||
    (language === 'hi'
      ? 'नलके का हत्था थोड़ा भारी है'
      : language === 'sat'
      ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱠᱟᱹᱴᱤᱡ ᱠᱮᱴᱮᱡ ᱜᱮᱭᱟ'
      : 'Handpump lever requires extra effort');

  // SVG Circular Gauge Calculations
  const radius = 62;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.round((votesLogged / quorumTarget) * 100), 100);
  const rawPercentage = Math.round((votesLogged / quorumTarget) * 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const isQuorumMet = votesLogged >= quorumTarget;
  const isCriticalDefectSafe = criticalDefectRate < criticalThreshold;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span>
                {language === 'hi'
                  ? 'ग्राम सभा कोरम स्थिति'
                  : language === 'sat'
                  ? 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱚᱢ ᱦᱟᱞᱚᱛ'
                  : 'Gram Sabha Quorum Status'}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'जनसंख्या-आधारित लोकतांत्रिक सत्यापन एवं गुणवत्ता विश्लेषण'
                : language === 'sat'
                ? 'ᱦᱚᱲ ᱮᱞ ᱞᱮᱠᱟᱛᱮ ᱥᱟᱹᱵᱤᱛ ᱟᱨ ᱜᱩᱱ ᱵᱤᱪᱟᱹᱨ'
                : 'Population-Weighted Democratic Quorum & Quality Analysis'}
            </p>
          </div>
        </div>

        {/* Quorum Badge */}
        <div className="self-start sm:self-auto">
          {isQuorumMet ? (
            <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? 'कोरम पूर्ण'
                  : language === 'sat'
                  ? 'ᱠᱳᱨᱚᱢ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ'
                  : '100% Quorum Achieved'}
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>
                {language === 'hi'
                  ? 'कोरम प्रगति पर है'
                  : language === 'sat'
                  ? 'ᱠᱳᱨᱚᱢ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ'
                  : 'Quorum In Progress'}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Main Quorum Metric & Circular SVG Ring */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Circular Gauge Ring */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-50/70 rounded-2xl border border-slate-100">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="quorumEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1D4ED8" />
                  <stop offset="60%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
                <linearGradient id="quorumAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
              />

              {/* Animated Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={isQuorumMet ? 'url(#quorumEmeraldGrad)' : 'url(#quorumAmberGrad)'}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Ring Data Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {votesLogged} <span className="text-slate-400 text-lg font-medium">/ {quorumTarget}</span>
              </span>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide mt-0.5">
                {language === 'hi' ? 'सत्यापित मत' : language === 'sat' ? 'ᱥᱟᱹᱵᱤᱛ ᱵᱷᱳᱴ' : 'Votes Logged'}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                {rawPercentage}% {language === 'hi' ? 'कोरम' : language === 'sat' ? 'ᱠᱳᱨᱚᱢ' : 'Quorum'}
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <p className="text-xs font-bold text-slate-700">
              {votesLogged} / {quorumTarget}{' '}
              {language === 'hi'
                ? 'वोट दर्ज (कोरम पूर्ण)'
                : language === 'sat'
                ? 'ᱵᱷᱳᱴ ᱮᱢ ᱮᱱᱟ (ᱠᱳᱨᱚᱢ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ)'
                : 'Votes Logged (Quorum Achieved)'}
            </p>
          </div>
        </div>

        {/* Right Column: Settlement & Formula Details */}
        <div className="md:col-span-7 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block">
                {language === 'hi' ? 'ग्राम पंचायत जनसंख्या' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱮᱞ' : 'Settlement Population'}
              </span>
              <span className="text-lg font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <span>~{population}</span>
                <span className="text-xs font-normal text-slate-500">
                  {language === 'hi' ? 'निवासी' : language === 'sat' ? 'ᱦᱚᱲ' : 'residents'}
                </span>
              </span>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-800 block">
                {language === 'hi' ? 'आवश्यक कोरम' : language === 'sat' ? 'ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱠᱳᱨᱚᱢ' : 'Quorum Threshold'}
              </span>
              <span className="text-lg font-bold text-blue-700 flex items-center gap-1 mt-0.5">
                <span>{quorumTarget}</span>
                <span className="text-xs font-normal text-blue-800">
                  {language === 'hi' ? 'सत्यापित मत' : language === 'sat' ? 'ᱥᱟᱹᱵᱤᱛ ᱵᱷᱳᱴ' : 'verified votes'}
                </span>
              </span>
            </div>
          </div>

          {/* Formula Explainer */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 text-slate-700 font-bold text-[11px]">
              <Info className="w-3.5 h-3.5 text-blue-700" />
              <span>
                {language === 'hi'
                  ? 'जनसंख्या कोरम सूत्र:'
                  : language === 'sat'
                  ? 'ᱦᱚᱲ ᱮᱞ ᱠᱳᱨᱚᱢ ᱥᱩᱛᱩᱨ:'
                  : 'AI Population Quorum Formula:'}
              </span>
            </div>
            <p className="font-mono text-[11px] text-blue-800 bg-white px-2.5 py-1 rounded border border-slate-200">
              Quorum_min = max(15, ⌈k · √N⌉) &rarr; max(15, ⌈1.44 · √{population}⌉) = {quorumTarget}
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'यह सूत्र पूरे गांव के निष्पक्ष प्रतिनिधित्व को अनिवार्य करता है।'
                : language === 'sat'
                ? 'ᱱᱚᱶᱟ ᱥᱩᱛᱩᱨ ᱫᱚ ᱜᱚᱴᱟ ᱟᱹᱛᱩ ᱨᱤᱱ ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱥᱚᱦᱚᱫ ᱞᱟᱹᱠᱛᱤᱭᱟ᱾'
                : 'Enforces representative democratic validation across the village prior to fund release.'}
            </p>
          </div>
        </div>
      </div>

      {/* Qualitative Sentiment Breakdown Card */}
      <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2.5">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {language === 'hi'
                ? 'गुणात्मक नागरिक प्रतिक्रिया विश्लेषण'
                : language === 'sat'
                ? 'ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱢᱚᱱᱚᱛ ᱵᱤᱪᱟᱹᱨ'
                : 'Qualitative Sentiment Breakdown'}
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {language === 'hi'
              ? 'स्वचालित भाषा विश्लेषण'
              : language === 'sat'
              ? 'ᱥᱟᱹᱵᱤᱛ ᱵᱤᱪᱟᱹᱨ'
              : 'Natural Language Processing Triage'}
          </span>
        </div>

        {/* 3 Metric Rows */}
        <div className="space-y-3.5">
          {/* 1. Operational Pass Rate */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {language === 'hi'
                    ? 'संतुष्ट एवं सफल संचालन'
                    : language === 'sat'
                    ? 'ᱱᱟᱯᱟᱭ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ'
                    : 'Operational Pass Rate'}
                </span>
              </div>
              <span className="font-mono font-black text-sm text-emerald-700">{operationalPassRate}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${operationalPassRate}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 italic">
              &quot;
              {language === 'hi'
                ? 'साफ पानी मिल रहा है, चापाकल सुचारू रूप से कार्यरत है।'
                : language === 'sat'
                ? 'ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱟᱢᱚᱜ ᱠᱟᱱᱟ, ᱪᱟᱯᱟᱠᱚᱞ ᱴᱷᱤᱠ ᱜᱮ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ᱾'
                : 'Clean drinking water flowing continuously at optimal pressure.'}
              &quot;
            </p>
          </div>

          {/* 2. Cosmetic Grievances */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-amber-800">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {language === 'hi'
                    ? 'मामूली शिकायतें'
                    : language === 'sat'
                    ? 'ᱠᱟᱹᱴᱤᱡ ᱮᱴᱠᱮᱴᱚᱬᱮ'
                    : 'Cosmetic Grievances'}
                </span>
              </div>
              <span className="font-mono font-black text-sm text-amber-700">{cosmeticGrievanceRate}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${cosmeticGrievanceRate}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span>
                {language === 'hi' ? 'मुख्य टिप्पणी:' : language === 'sat' ? 'ᱢᱩᱲ ᱠᱟᱛᱷᱟ:' : 'Key remark:'} &quot;
                {defaultCosmeticRemark}&quot;
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                {language === 'hi' ? 'समाधान योग्य' : language === 'sat' ? 'ᱥᱟᱞᱟᱜ ᱮᱱᱟ' : 'Resolved - Non-critical'}
              </span>
            </div>
          </div>

          {/* 3. Critical Defects */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-red-700">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>
                  {language === 'hi'
                    ? 'गंभीर तकनीकी दोष'
                    : language === 'sat'
                    ? 'ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱠᱷᱟᱹᱢᱤ'
                    : 'Critical System Defects'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {isCriticalDefectSafe
                    ? language === 'hi'
                      ? 'स्वीकृत सीमा के अंतर्गत'
                      : language === 'sat'
                      ? 'ᱥᱤᱢᱟᱹ ᱵᱷᱤᱛᱨᱤ ᱨᱮ'
                      : `Below ${criticalThreshold}% threshold`
                    : language === 'hi'
                    ? 'सीमा पार'
                    : language === 'sat'
                    ? 'ᱥᱤᱢᱟᱹ ᱯᱟᱨᱚᱢ ᱮᱱᱟ'
                    : 'Threshold Breached'}
                </span>
                <span className="font-mono font-black text-sm text-red-600">{criticalDefectRate}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${criticalDefectRate}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'hi'
                ? `३०% से कम दोष होने के कारण परियोजना को स्वीकृत माना गया है। (वर्तमान दोष दर: ${criticalDefectRate}%)`
                : language === 'sat'
                ? `᱓᱐% ᱠᱷᱚᱱ ᱠᱚᱢ ᱠᱷᱟᱹᱢᱤ ᱠᱷᱟᱹᱛᱤᱨ ᱯᱨᱚᱠᱚᱞᱯᱚ ᱥᱟᱹᱛ ᱮᱱᱟ᱾ (${criticalDefectRate}%)`
                : `System passed validation as defect rate (${criticalDefectRate}%) remains strictly below the 30% failure threshold.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
