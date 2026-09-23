'use client';

import React from 'react';
import { StatewideLanguage } from './statewide-types';
import { MacroMetrics } from './statewide-types';
import {
  CheckCircle2,
  Activity,
  Building2,
  IndianRupee,
  GraduationCap,
  FileCheck2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

interface MacroImpactBannerProps {
  language: StatewideLanguage;
  metrics: MacroMetrics;
}

export default function MacroImpactBanner({ language, metrics }: MacroImpactBannerProps) {
  const m = metrics;

  const getHeadline = () => {
    if (language === 'hi') return 'झारखंड सामाजिक नवाचार एवं समाधान प्रगति निगरानी प्रणाली';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱟᱶᱛᱟ ᱱᱟᱣᱟᱱᱟᱜ ᱟᱨ ᱥᱚᱞᱦᱮ ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞᱛᱚᱫ';
    return 'Jharkhand Societal Innovation & Resolution Progress Monitor';
  };

  const getSubtitle = () => {
    if (language === 'hi')
      return 'नागरिकों से संकलित, विश्वविद्यालयों द्वारा हल एवं सीएसआर साझेदारी से सह-वित्तपोषित सामाजिक चुनौतियों की सीधी पारदर्शी ट्रैकिंग।';
    if (language === 'sat')
      return 'ᱦᱚᱲ ᱠᱷᱚᱱ ᱧᱟᱢ, ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱚᱛᱮᱛᱮ ᱥᱚᱞᱦᱮ ᱟᱨ CSR ᱜᱚᱲᱚ ᱛᱮ ᱠᱟᱹᱣᱰᱤ ᱧᱟᱢ ᱟᱠᱟᱱ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱱᱟᱜ ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞ᱾';
    return 'Live tracking of societal challenges crowdsourced from citizens, solved by universities, and co-funded by CSR partnerships.';
  };

  const getGovtBadge = () => {
    if (language === 'hi') return 'उच्च एवं तकनीकी शिक्षा विभाग • झारखण्ड सरकार';
    if (language === 'sat') return 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ • ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ';
    return 'Dept. of Higher & Technical Education • Govt. of Jharkhand';
  };

  const getLiveAuditBadge = () => {
    if (language === 'hi') return 'वास्तविक समय सार्वजनिक एस्क्रो एवं कोरम लेजर';
    if (language === 'sat') return 'ᱥᱟᱹᱨᱤ ᱚᱠᱛᱚ ᱮᱥᱠᱨᱳ ᱟᱨ ᱠᱳᱨᱟᱢ ᱠᱷᱟᱛᱟ';
    return 'Live Public Escrow & Quorum Ledger';
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 lg:p-10 border border-blue-900/60 shadow-xl">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#044728]/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header with DHTE State Crest & Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-800/80">
          <div className="flex items-start sm:items-center gap-4">
            {/* Authentic DHTE State Crest */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-emerald-950 border-2 border-amber-500/60 p-1 flex items-center justify-center flex-shrink-0 shadow-lg relative group">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" aria-label="DHTE Jharkhand Crest">
                {/* Outer Circular Ring */}
                <circle cx="50" cy="50" r="46" fill="#044728" stroke="#D97706" strokeWidth="3" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2,2" />
                {/* 24 Spokes ring */}
                <circle cx="50" cy="50" r="36" fill="#0F172A" stroke="#D97706" strokeWidth="1.5" />
                {/* Ashoka Stambh / Emblem motif */}
                <path
                  d="M50 20 L53 30 L63 30 L55 36 L58 46 L50 40 L42 46 L45 36 L37 30 L47 30 Z"
                  fill="#F59E0B"
                />
                <rect x="42" y="47" width="16" height="15" rx="2" fill="#F8FAFC" />
                <path d="M44 51 H56 M44 55 H56 M44 59 H56" stroke="#044728" strokeWidth="1.5" />
                <path d="M38 64 H62 L59 70 H41 Z" fill="#D97706" />
                {/* Base Banner */}
                <rect x="30" y="72" width="40" height="9" rx="3" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1" />
                <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="900" fontFamily="sans-serif">
                  DHTE • JH
                </text>
              </svg>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-sky-200 border border-blue-500/40 backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  <span>{getGovtBadge()}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>{getLiveAuditBadge()}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
                {getHeadline()}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl leading-relaxed lg:text-right">
            {getSubtitle()}
          </p>
        </div>

        {/* 4 Primary Macro Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Problems Solved (Emerald: #044728) */}
          <div className="group relative rounded-2xl bg-white text-slate-900 p-5 shadow-lg border-2 border-emerald-600 hover:border-emerald-700 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 text-[#044728]">
                <CheckCircle2 className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#044728]">
                100% Quorum
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#044728] mb-1 font-mono">
              {m.solvedProblemsCount}
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {m.solvedProblemsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">
              {m.solvedProblemsSub[language]}
            </div>
          </div>

          {/* Card 2: Active Ongoing Projects (Civic Blue: #1D4ED8) */}
          <div className="group relative rounded-2xl bg-white text-slate-900 p-5 shadow-lg border-2 border-blue-600 hover:border-blue-700 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-[#1D4ED8]">
                <Activity className="w-6 h-6 animate-pulse" />
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                Live Trials
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#1D4ED8] mb-1 font-mono">
              {m.activeProjectsCount}
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {m.activeProjectsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">
              {m.activeProjectsSub[language]}
            </div>
          </div>

          {/* Card 3: Engaged Higher Education Institutions (Purple: #7E22CE) */}
          <div className="group relative rounded-2xl bg-white text-slate-900 p-5 shadow-lg border-2 border-purple-500 hover:border-purple-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple-50 text-purple-700">
                <Building2 className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                24 Districts
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-purple-700 mb-1 font-mono">
              {m.institutionsCount}
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {m.institutionsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">
              {m.institutionsSub[language]}
            </div>
          </div>

          {/* Card 4: Escrow Funds Mobilized (Palash Saffron: #D97706) */}
          <div className="group relative rounded-2xl bg-white text-slate-900 p-5 shadow-lg border-2 border-amber-500 hover:border-amber-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-[#D97706]">
                <IndianRupee className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                Escrow Pool
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#D97706] mb-1 font-mono">
              {m.fundsMobilizedAmount}
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {m.fundsMobilizedLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">
              {m.fundsMobilizedSub[language]}
            </div>
          </div>
        </div>

        {/* Secondary Counters Bar */}
        <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-5 backdrop-blur-xs shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Counter 1: NEP Credits */}
            <div className="flex items-center space-x-3.5 pt-2 md:pt-0 first:pt-0">
              <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-sky-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                  {m.nepCreditsCount}
                </div>
                <div className="text-xs text-slate-300 font-semibold truncate">
                  {m.nepCreditsLabel[language]}
                </div>
              </div>
            </div>

            {/* Counter 2: Patents */}
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-5">
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                  {m.patentsFiledCount}
                </div>
                <div className="text-xs text-slate-300 font-semibold truncate">
                  {m.patentsFiledLabel[language]}
                </div>
              </div>
            </div>

            {/* Counter 3: Panchayats */}
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-5">
              <div className="w-11 h-11 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                  {m.panchayatsImpactedCount}
                </div>
                <div className="text-xs text-slate-300 font-semibold truncate">
                  {m.panchayatsImpactedLabel[language]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
