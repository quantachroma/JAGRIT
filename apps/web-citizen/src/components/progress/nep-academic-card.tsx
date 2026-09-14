'use client';

import React from 'react';
import { AcademicCreditData } from './types';
import { GraduationCap, Award, BookOpen, Clock, ShieldCheck, CheckCircle2, FileBadge, Sparkles } from 'lucide-react';

interface NepAcademicCardProps {
  data: AcademicCreditData;
  language: 'en' | 'hi' | 'sat';
}

export default function NepAcademicCard({ data, language }: NepAcademicCardProps) {
  const getApaarStatus = () => {
    if (language === 'hi') return data.apaarStatusHi;
    if (language === 'sat') return data.apaarStatusSat;
    return data.apaarStatusEn;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? 'राष्ट्रीय शिक्षा नीति (एनईपी २०२०) अकादमिक क्रेडिट एवं प्रभाव निपटान'
                : language === 'sat'
                ? 'NEP 2020 ᱥᱮᱪᱮᱫ ᱠᱨᱮᱰᱤᱴ ᱟᱨ ᱥᱟᱹᱨᱤ ᱢᱟᱹᱱ'
                : 'NEP 2020 Academic Credit & Impact Settlement Card'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {language === 'hi'
              ? 'राष्ट्रीय क्रेडिट फ्रेमवर्क (NCrF) एवं अपार / डिजिलॉकर स्वचालित अंतरण'
              : language === 'sat'
              ? 'NCrF ᱱᱤᱭᱟᱹᱢ ᱟᱨ APAAR / DigiLocker ᱠᱨᱮᱰᱤᱴ ᱪᱟᱞ'
              : 'NCrF Workhour Equation & APAAR / DigiLocker Transcript Settlement'}
          </h2>
        </div>

        <span className="text-[11px] font-mono font-bold bg-blue-100/80 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          ABC Registry ID: {data.apaarRegistryId}
        </span>
      </div>

      {/* Grid: 3 Pillars (Student Credits, Faculty API Points, APAAR DigiLocker Status) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: NCrF Workhour Equation & Credits */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
          <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
            {language === 'hi' ? 'एनसीआरएफ मानक समीकरण' : language === 'sat' ? 'NCrF ᱥᱮᱪᱮᱫ ᱱᱤᱭᱟᱹᱢ' : 'NCrF Standard Equation'}
          </span>
          <div className="text-3xl font-black text-blue-950 tracking-tight flex items-baseline gap-1.5">
            <span>{data.creditsEarned}</span>
            <span className="text-sm font-extrabold text-blue-700">
              {language === 'hi' ? 'अकादमिक क्रेडिट' : language === 'sat' ? 'ᱥᱮᱪᱮᱫ ᱠᱨᱮᱰᱤᱴ' : 'Academic Credits'}
            </span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-blue-100 text-[11px] text-slate-700 font-medium">
            <span className="font-bold text-blue-900 block">{data.ncrfFormula}</span>
            <span className="text-slate-500 block mt-1">
              {language === 'hi'
                ? `सत्यापित कार्यघंटे: ${data.hoursLogged} घंटे (क्षेत्रीय + प्रयोगशाला)`
                : language === 'sat'
                ? `ᱥᱟᱹᱨᱤ ᱠᱟᱹᱢᱤ ᱚᱠᱛᱚ: ${data.hoursLogged} ᱴᱟᱲᱟᱝ`
                : `Verified Log: ${data.hoursLogged} Field & Lab Hours`}
            </span>
          </div>
        </div>

        {/* Pillar 2: Faculty UGC-CAS API Points */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
            {language === 'hi' ? 'संकाय यूजीसी-सीएएस क्रेडिट' : language === 'sat' ? 'ᱯᱨᱚᱯᱷᱮᱥᱚᱨ UGC-CAS ᱠᱨᱮᱰᱤᱴ' : 'Faculty UGC-CAS Research Credit'}
          </span>
          <div className="text-3xl font-black text-emerald-950 tracking-tight flex items-baseline gap-1.5">
            <span>+{data.facultyApiPoints}</span>
            <span className="text-sm font-extrabold text-emerald-700">
              {language === 'hi' ? 'एपीआई अंक स्वीकृत' : language === 'sat' ? 'API ᱯᱚᱭᱮᱱᱴ ᱢᱟᱹᱱ' : 'API Points Sanctioned'}
            </span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-emerald-100 text-[11px] text-slate-700 font-medium">
            <span className="font-bold text-emerald-900 block">{data.facultyCasScheme}</span>
            <span className="text-slate-500 block mt-1">
              {language === 'hi'
                ? 'ग्रामीण सामाजिक अनुसंधान श्रेणी ३ के अंतर्गत पदोन्नति हेतु मान्य'
                : language === 'sat'
                ? 'ᱟᱹᱛᱩ ᱥᱟᱶᱛᱟ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱨᱠᱟᱨ ᱢᱟᱹᱱ'
                : 'Valid for career advancement under rural applied research'}
            </span>
          </div>
        </div>

        {/* Pillar 3: Student APAAR / DigiLocker Deposit Status */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            {language === 'hi' ? 'अपार / डिजिलॉकर स्थिति' : language === 'sat' ? 'APAAR / DigiLocker ᱦᱟᱞᱚᱛ' : 'APAAR / DigiLocker Deposit Status'}
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === 'hi' ? 'पूर्व-अधिकृत' : language === 'sat' ? 'ᱢᱟᱲᱟᱝ ᱠᱷᱚᱱ ᱢᱟᱹᱱ' : 'Pre-Authorized'}</span>
          </div>
          <p className="text-xs text-slate-700 font-bold leading-relaxed">
            {getApaarStatus()}
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Direct API Token: APAAR-JAG-BIT-2026
          </span>
        </div>
      </div>

      {/* Accredited Scholars Cohort Section */}
      <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
        <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
          {language === 'hi'
            ? 'मान्यता प्राप्त छात्र शोधार्थी एवं तकनीकी योगदान दल:'
            : language === 'sat'
            ? 'ᱥᱮᱞᱮᱫ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱧᱩᱛᱩᱢ ᱟᱨ ᱠᱟᱹᱢᱤ:'
            : 'Accredited Student Scholars & Innovation Cohort:'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.studentLeads.map((student, i) => (
            <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="font-extrabold text-slate-900 text-xs block truncate">
                {student.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block truncate">
                {student.program}
              </span>
              <span className="text-[11px] text-blue-700 font-bold block pt-1 border-t border-slate-50 leading-tight">
                {language === 'hi' ? student.roleHi : language === 'sat' ? student.roleSat : student.roleEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

