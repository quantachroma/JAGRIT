'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectProgressData } from './types';
import { Building2, MapPin, Award, Users, ArrowLeft, ShieldCheck, IndianRupee, Layers, Sparkles } from 'lucide-react';

interface ProgressHeaderProps {
  project: ProjectProgressData;
  language: 'en' | 'hi' | 'sat';
}

export default function ProgressHeader({ project, language }: ProgressHeaderProps) {
  const getTitle = () => {
    if (language === 'hi') return project.titleHi;
    if (language === 'sat') return project.titleSat;
    return project.titleEn;
  };

  const getDomain = () => {
    if (language === 'hi') return project.domainHi;
    if (language === 'sat') return project.domainSat;
    return project.domainEn;
  };

  const getLocation = () => {
    if (language === 'hi') return project.locationHi;
    if (language === 'sat') return project.locationSat;
    return project.locationEn;
  };

  const getInstitution = () => {
    if (language === 'hi') return project.institutionHi;
    if (language === 'sat') return project.institutionSat;
    return project.institutionEn;
  };

  const getNablTag = () => {
    if (language === 'hi') return project.nablTagHi;
    if (language === 'sat') return project.nablTagSat;
    return project.nablTagEn;
  };

  const getFacultyDept = () => {
    if (language === 'hi') return project.facultyDeptHi;
    if (language === 'sat') return project.facultyDeptSat;
    return project.facultyDeptEn;
  };

  const getCsrSponsor = () => {
    if (language === 'hi') return project.csrSponsorHi;
    if (language === 'sat') return project.csrSponsorSat;
    return project.csrSponsorEn;
  };

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Ticket Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/progress"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {language === 'hi' ? 'राज्य प्रगति ट्रैकर' : language === 'sat' ? 'ᱨᱟᱡᱽ ᱞᱟᱦᱟᱱᱛᱤ' : 'Statewide Progress'}
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
          >
            <span>
              {language === 'hi' ? 'डैशबोर्ड' : language === 'sat' ? 'ᱰᱮᱥᱵᱳᱨᱰ' : 'Dashboard'}
            </span>
          </Link>

          {/* Master Ticket Chip */}
          <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100/80 px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
            {language === 'hi' ? 'मास्टर टिकट: ' : language === 'sat' ? 'ᱢᱩᱬᱩᱛ ᱴᱤᱠᱮᱴ: ' : 'Master Ticket: '}
            #{project.ticketId}
          </span>

          {/* Domain Chip */}
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{getDomain()}</span>
          </span>

          {/* Location Chip */}
          <span className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>{getLocation()}</span>
          </span>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black px-3.5 py-1.5 rounded-full shadow-2xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span>
            {language === 'hi'
              ? '४५ दिवसीय स्वायत्त स्थिरीकरण जारी'
              : language === 'sat'
              ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱟᱡ ᱛᱮ ᱪᱟᱞᱟᱣ ᱵᱤᱰᱟᱹᱣ'
              : '45-Day Unassisted Maturation Active'}
          </span>
        </div>
      </div>

      {/* Main Title & Institution Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === 'hi' ? 'उच्च एवं तकनीकी शिक्षा विभाग • अनुसंधान एवं विकास' : language === 'sat' ? 'ᱥᱚᱨᱠᱟᱨ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ • ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ' : 'Jharkhand DHTE Societal Innovation Sprint'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {getTitle()}
            </h1>
          </div>

          {/* Assigned Institution Badge with NABL Verification */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center space-x-3.5 self-start lg:self-auto min-w-[280px]">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'स्वीकृत उच्च शिक्षण संस्थान' : language === 'sat' ? 'ᱢᱟᱹᱱ ᱟᱠᱟᱱ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ' : 'Assigned University Partner'}
              </span>
              <span className="text-sm font-black text-slate-900 block leading-tight">
                {getInstitution()}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md mt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>{getNablTag()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stakeholder Attribution Strip */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Faculty PI */}
          <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'hi' ? 'प्रधान अन्वेषक (पीआई)' : language === 'sat' ? 'ᱢᱩᱬᱩᱛ ᱯᱨᱚᱯᱷᱮᱥᱚᱨ (PI)' : 'Principal Investigator'}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-0.5">
              {project.facultyPi}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block truncate">
              {getFacultyDept()}
            </span>
          </div>

          {/* Student Engineering Leads */}
          <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'hi' ? 'छात्र इंजीनियरिंग दल' : language === 'sat' ? 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨ ᱠᱚ' : 'Student Engineering Leads'}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-0.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{project.studentScholarsCount} {language === 'hi' ? 'प्रमाणित शोधार्थी' : language === 'sat' ? 'ᱥᱮᱪᱮᱫ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ' : 'Accredited Scholars'}</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium block">
              {language === 'hi' ? 'एनईपी २०२० अकादमिक क्रेडिट पात्र' : language === 'sat' ? 'NEP 2020 ᱠᱨᱮᱰᱤᱴ ᱧᱟᱢᱚᱜ' : 'Eligible for 4 NCrF Academic Credits'}
            </span>
          </div>

          {/* Industry CSR Co-Sponsor */}
          <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'hi' ? 'उद्योग सीएसआर सह-प्रायोजक' : language === 'sat' ? 'ᱠᱟᱨᱠᱷᱟᱱᱟ CSR ᱜᱚᱲᱚ' : 'Industry CSR Co-Sponsor'}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-0.5">
              {getCsrSponsor()}
            </span>
            <span className="text-[11px] text-blue-700 font-bold block">
              {language === 'hi' ? `एस्क्रो अंशदान: ${project.csrAmount}` : language === 'sat' ? `ᱯᱟᱭᱥᱟ ᱜᱚᱲᱚ: ${project.csrAmount}` : `Matching Escrow: ${project.csrAmount}`}
            </span>
          </div>

          {/* Total Approved Budget */}
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200/80">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              {language === 'hi' ? 'कुल स्वीकृत परियोजना बजट' : language === 'sat' ? 'ᱜᱩᱞᱟᱹᱴ ᱥᱟᱹᱨᱤ ᱵᱟᱡᱮᱴ' : 'Total Approved Budget'}
            </span>
            <span className="text-base sm:text-lg font-black text-blue-950 block mt-0.5">
              {project.totalBudget}
            </span>
            <span className="text-[11px] text-slate-600 font-medium block">
              {language === 'hi' ? 'डीएचटीई नवाचार पूल + सीएसआर' : language === 'sat' ? 'DHTE ᱯᱚᱨᱛᱚᱱ + CSR ᱜᱚᱲᱚ' : 'DHTE Pool + CSR Match'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

