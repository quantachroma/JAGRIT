'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  StatewideLanguage,
  ChallengeDomain,
  ChallengeStage,
  OngoingProjectItem,
} from './statewide-types';
import { ONGOING_PROJECTS_DATA } from './statewide-data';
import {
  Droplets,
  Sprout,
  Zap,
  HeartPulse,
  Layers,
  Timer,
  Microscope,
  Tractor,
  Hourglass,
  Building2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Activity,
  Filter,
  AlertCircle,
} from 'lucide-react';

interface OngoingPipelineProps {
  language: StatewideLanguage;
}

export default function OngoingPipeline({ language }: OngoingPipelineProps) {
  const [selectedDomain, setSelectedDomain] = useState<ChallengeDomain>('all');
  const [selectedStage, setSelectedStage] = useState<ChallengeStage>('all');

  const domainOptions: { key: ChallengeDomain; label: { en: string; hi: string; sat: string }; icon: any }[] = [
    { key: 'all', label: { en: 'All Domains', hi: 'सभी कार्यक्षेत्र', sat: 'ᱡᱚᱛᱚ ᱠᱟᱹᱢᱤ' }, icon: Layers },
    { key: 'water', label: { en: '💧 Water', hi: '💧 जल', sat: '💧 ᱫᱟᱜ' }, icon: Droplets },
    { key: 'agritech', label: { en: '🌾 Agritech', hi: '🌾 कृषि तकनीक', sat: '🌾 ᱪᱟᱥ' }, icon: Sprout },
    { key: 'energy', label: { en: '⚡ Clean Energy', hi: '⚡ स्वच्छ ऊर्जा', sat: '⚡ ᱯᱷᱟᱨᱪᱟ ᱫᱟᱲᱮ' }, icon: Zap },
    { key: 'healthcare', label: { en: '🏥 Healthcare', hi: '🏥 स्वास्थ्य सेवा', sat: '🏥 ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ' }, icon: HeartPulse },
  ];

  const stageOptions: { key: ChallengeStage; label: { en: string; hi: string; sat: string }; icon: any }[] = [
    { key: 'all', label: { en: 'All Stages', hi: 'सभी चरण', sat: 'ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ' }, icon: Filter },
    { key: 'bidding', label: { en: 'Bidding Window', hi: 'निविदा खिड़की', sat: 'ᱴᱮᱱᱰᱟᱨ ᱡᱷᱤᱡ' }, icon: Timer },
    { key: 'prototyping', label: { en: 'Lab Bench Testing', hi: 'प्रयोगशाला परीक्षण', sat: 'ᱞᱮᱵᱽ ᱵᱮᱱᱟᱣ' }, icon: Microscope },
    { key: 'deployment', label: { en: 'Field Deployment', hi: 'क्षेत्रीय स्थापना', sat: 'ᱴᱷᱟᱶ ᱨᱮ ᱵᱟᱹᱭᱥᱟᱹᱣ' }, icon: Tractor },
    { key: 'maturation', label: { en: '45-Day Maturation', hi: '४५ दिवसीय स्थिरीकरण', sat: '᱔᱕ ᱢᱟᱦᱟᱸ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ' }, icon: Hourglass },
  ];

  const filteredProjects = useMemo(() => {
    return ONGOING_PROJECTS_DATA.filter((project) => {
      const matchDomain = selectedDomain === 'all' || project.domainKey === selectedDomain;
      const matchStage = selectedStage === 'all' || project.stageKey === selectedStage;
      return matchDomain && matchStage;
    });
  }, [selectedDomain, selectedStage]);

  const getSectionTitle = () => {
    if (language === 'hi') return 'अभी क्या चल रहा है — लाइव परियोजना पाइपलाइन';
    if (language === 'sat') return 'ᱱᱤᱛᱚᱜ ᱪᱮᱫ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ — ᱞᱟᱭᱤᱵᱽ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ';
    return '“Abhi Kya Chal Raha Hai” — Live In-Progress Pipeline';
  };

  const getSectionSubtitle = () => {
    if (language === 'hi')
      return 'विश्वविद्यालयों द्वारा हल की जा रही सक्रिय समस्याओं, चरण प्रगति, एस्क्रो वित्तीय स्थिति एवं टेलीमेट्री स्वास्थ्य का प्रत्यक्ष विवरण।';
    if (language === 'sat')
      return 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱦᱚᱛᱮᱛᱮ ᱥᱚᱞᱦᱮᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤ, ᱴᱟᱠᱟ ᱠᱷᱟᱛᱟ ᱟᱨ ᱴᱷᱟᱶ ᱦᱟᱞᱚᱛ ᱨᱮᱱᱟᱜ ᱵᱤᱵᱨᱚᱬ᱾';
    return 'Real-time tracking of active challenges in university labs and field trials across Jharkhand.';
  };

  const getInspectButtonText = () => {
    if (language === 'hi') return 'पूर्ण प्रगति देखें';
    if (language === 'sat') return 'ᱯᱩᱨᱟᱹ ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞ ᱢᱮ';
    return 'View Full Progress';
  };

  const getNoResultsText = () => {
    if (language === 'hi') return 'चयनित फिल्टर के अनुरूप कोई सक्रिय परियोजना नहीं मिली।';
    if (language === 'sat') return 'ᱵᱟᱪᱷᱟᱣ ᱟᱠᱟᱱ ᱯᱷᱤᱞᱴᱟᱨ ᱞᱮᱠᱟᱛᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱦᱚᱸ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾';
    return 'No active projects found matching the selected filters.';
  };

  const getResetFiltersText = () => {
    if (language === 'hi') return 'फ़िल्टर रीसेट करें';
    if (language === 'sat') return 'ᱯᱷᱤᱞᱴᱟᱨ ᱨᱩᱣᱟᱹᱲ ᱢᱮ';
    return 'Reset Filters';
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-black border border-blue-200 mb-2">
            <Activity className="w-3.5 h-3.5 text-[#1D4ED8] animate-pulse" />
            <span>
              {language === 'hi'
                ? 'सक्रिय शोध एवं क्षेत्रीय परियोजनाएं'
                : language === 'sat'
                ? 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱥᱟᱬᱮᱥ ᱟᱨ ᱴᱷᱟᱶ ᱠᱟᱹᱢᱤ'
                : 'Active Research & Field Deployments'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
            {getSectionTitle()}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {getSectionSubtitle()}
          </p>
        </div>

        <div className="text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto font-mono">
          {filteredProjects.length}{' '}
          {language === 'hi' ? 'सक्रिय परियोजनाएं प्रदर्शित' : language === 'sat' ? 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤ ᱠᱚ' : 'Active Projects Displayed'}
        </div>
      </div>

      {/* Domain Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-bold text-slate-600 sm:w-28 flex-shrink-0">
            {language === 'hi' ? 'कार्यक्षेत्र:' : language === 'sat' ? 'ᱠᱟᱹᱢᱤ ᱦᱟᱹᱴᱤᱧ:' : 'Filter Bar:'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {domainOptions.map((opt) => {
              const isSelected = selectedDomain === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedDomain(opt.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#1D4ED8] text-white shadow-md ring-2 ring-blue-700/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{opt.label[language]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 sm:w-28 flex-shrink-0">
            {language === 'hi' ? 'प्रगति चरण:' : language === 'sat' ? 'ᱠᱟᱹᱢᱤ ᱦᱟᱹᱴᱤᱧ:' : 'Stage:'}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {stageOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedStage === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedStage(opt.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#044728] text-white shadow-xs ring-2 ring-emerald-700/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span>{opt.label[language]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Live Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">{getNoResultsText()}</p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain('all');
              setSelectedStage('all');
            }}
            className="px-4 py-2 min-h-[48px] rounded-xl bg-blue-50 text-[#1D4ED8] font-bold text-xs hover:bg-blue-100 border border-blue-200 transition-all"
          >
            {getResetFiltersText()}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-[#1D4ED8] transition-all shadow-xs hover:shadow-md p-5 sm:p-6 flex flex-col justify-between space-y-4"
            >
              {/* Header: Ticket & Stage Badge */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-[#0F172A] text-white shadow-2xs font-mono">
                      #{project.ticketId}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 capitalize">
                      {project.domainKey}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      project.stageBadgeColor === 'emerald'
                        ? 'bg-emerald-50 text-[#044728] border border-emerald-300'
                        : project.stageBadgeColor === 'blue'
                        ? 'bg-blue-50 text-[#1D4ED8] border border-blue-300'
                        : project.stageBadgeColor === 'amber'
                        ? 'bg-amber-50 text-[#D97706] border border-amber-300'
                        : 'bg-purple-50 text-purple-800 border border-purple-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>{project.liveStageLabel[language]}</span>
                  </span>
                </div>

                {/* Title & Location */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                    {project.title[language]}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{project.location[language]}</span>
                  </div>
                </div>

                {/* Progress Bar & Countdown Indicator */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {language === 'hi' ? 'चरण प्रगति' : language === 'sat' ? 'ᱠᱟᱹᱢᱤ ᱞᱟᱦᱟᱱᱛᱤ' : 'Stage Progress'}
                    </span>
                    <span className="font-black text-[#1D4ED8] font-mono">
                      {project.stageProgressPct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.stageBadgeColor === 'emerald'
                          ? 'bg-[#044728]'
                          : project.stageBadgeColor === 'blue'
                          ? 'bg-[#1D4ED8]'
                          : project.stageBadgeColor === 'amber'
                          ? 'bg-[#D97706]'
                          : 'bg-purple-600'
                      }`}
                      style={{ width: `${project.stageProgressPct}%` }}
                    />
                  </div>
                  {project.stageCountdown && (
                    <div className="text-[11px] text-slate-500 font-medium text-right">
                      {project.stageCountdown[language]}
                    </div>
                  )}
                </div>

                {/* Assigned Institution & Faculty */}
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#1D4ED8] mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-black text-[#0F172A] block">
                        {project.institution[language]}
                      </span>
                      <span className="text-slate-600 font-medium">
                        {project.facultyPi[language]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Escrow, Health Telemetry & Compliance Indicators */}
                <div className="space-y-2 text-xs">
                  {/* Escrow status */}
                  <div className="flex items-start gap-2">
                    <IndianRupee className="w-3.5 h-3.5 text-[#D97706] mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-slate-700">
                      <strong className="text-slate-900 font-bold">
                        {language === 'hi' ? 'एस्क्रो:' : language === 'sat' ? 'ᱮᱥᱠᱨᱳ:' : 'Escrow:'}{' '}
                      </strong>
                      {project.escrowStatus[language]}
                    </span>
                  </div>

                  {/* Operational Health Telemetry */}
                  <div className="flex items-start gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-[#044728] mt-0.5 flex-shrink-0" />
                    <span className="font-bold text-[#044728] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {project.fieldHealth[language]}
                    </span>
                  </div>

                  {/* Mentor / Statutory Compliance */}
                  {project.mentorOrCompliance && (
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1D4ED8] mt-0.5 flex-shrink-0" />
                      <span className="text-[11px] text-slate-600 font-medium">
                        {project.mentorOrCompliance[language]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: View Full Progress */}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={project.inspectUrl}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 min-h-[48px] rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all active:scale-[0.98]"
                >
                  <span>{getInspectButtonText()}</span>
                  <ArrowRight className="w-4 h-4 text-sky-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
