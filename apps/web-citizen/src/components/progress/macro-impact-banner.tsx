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
  Sparkles,
} from 'lucide-react';

interface MacroImpactBannerProps {
  language: StatewideLanguage;
  metrics: MacroMetrics;
}

export default function MacroImpactBanner({ language, metrics }: MacroImpactBannerProps) {
  const m = metrics;

  const getHeadline = () => {
    if (language === 'hi') return 'झारखंड नवाचार एवं जन-शिकायत समाधान निगरानी प्रणाली';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱱᱟᱣᱟᱱᱟᱜ ᱟᱨ ᱦᱚᱲ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱧᱮᱞᱛᱚᱫ';
    return 'Jharkhand Innovation & Grievance Resolution Monitor';
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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 border border-blue-900/60 shadow-xl">
      {/* Decorative subtle background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-7">
        {/* Top Badges & Headline Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-sky-200 border border-blue-500/40 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              <span>{getGovtBadge()}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{getLiveAuditBadge()}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {getHeadline()}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal max-w-4xl leading-relaxed">
            {getSubtitle()}
          </p>
        </div>

        {/* 4 High-Impact Primary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Problems Solved */}
          <div className="group relative rounded-2xl bg-white/95 text-slate-900 p-5 shadow-lg border-2 border-emerald-500/80 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800">
                100% Quorum
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-700 mb-1">
              {m.solvedProblemsCount}
            </div>
            <div className="text-sm font-bold text-slate-900 leading-snug">
              {m.solvedProblemsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {m.solvedProblemsSub[language]}
            </div>
          </div>

          {/* Card 2: Active Ongoing Projects */}
          <div className="group relative rounded-2xl bg-white/95 text-slate-900 p-5 shadow-lg border-2 border-blue-500/80 hover:border-blue-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-blue-700">
                <Activity className="w-6 h-6 animate-pulse" />
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100/90 text-blue-800">
                Live Pipeline
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-blue-700 mb-1">
              {m.activeProjectsCount}
            </div>
            <div className="text-sm font-bold text-slate-900 leading-snug">
              {m.activeProjectsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {m.activeProjectsSub[language]}
            </div>
          </div>

          {/* Card 3: Engaged Higher Education Institutions */}
          <div className="group relative rounded-2xl bg-white/95 text-slate-900 p-5 shadow-lg border-2 border-slate-300 hover:border-blue-500 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700">
                <Building2 className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100/90 text-indigo-800">
                Academic Grid
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-indigo-900 mb-1">
              {m.institutionsCount}
            </div>
            <div className="text-sm font-bold text-slate-900 leading-snug">
              {m.institutionsLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {m.institutionsSub[language]}
            </div>
          </div>

          {/* Card 4: Escrow Funds Mobilized */}
          <div className="group relative rounded-2xl bg-white/95 text-slate-900 p-5 shadow-lg border-2 border-amber-500/80 hover:border-amber-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100 text-amber-700">
                <IndianRupee className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900">
                Tranche Escrow
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-amber-700 mb-1">
              {m.fundsMobilizedAmount}
            </div>
            <div className="text-sm font-bold text-slate-900 leading-snug">
              {m.fundsMobilizedLabel[language]}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {m.fundsMobilizedSub[language]}
            </div>
          </div>
        </div>

        {/* Secondary Counters Strip */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-4 sm:p-5 backdrop-blur-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Counter 1: NEP Credits */}
            <div className="flex items-center space-x-3.5 pt-2 md:pt-0 first:pt-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-sky-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {m.nepCreditsCount}
                </div>
                <div className="text-xs text-slate-300 font-medium truncate">
                  {m.nepCreditsLabel[language]}
                </div>
              </div>
            </div>

            {/* Counter 2: Patents */}
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {m.patentsFiledCount}
                </div>
                <div className="text-xs text-slate-300 font-medium truncate">
                  {m.patentsFiledLabel[language]}
                </div>
              </div>
            </div>

            {/* Counter 3: Panchayats */}
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {m.panchayatsImpactedCount}
                </div>
                <div className="text-xs text-slate-300 font-medium truncate">
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

