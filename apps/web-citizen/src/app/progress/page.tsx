'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import MacroImpactBanner from '@/components/progress/macro-impact-banner';
import OngoingPipeline from '@/components/progress/ongoing-pipeline';
import UniversityLeaderboard from '@/components/progress/university-leaderboard';
import DistrictBreakdownTable from '@/components/progress/district-breakdown-table';
import {
  TrendingUp,
  Activity,
  Trophy,
  MapPin,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function StatewideProgressPage() {
  const { language } = useCitizen();
  const [activeTab, setActiveTab] = useState<'all' | 'pipeline' | 'universities' | 'districts'>('all');

  const scrollToSection = (id: string, tab: 'all' | 'pipeline' | 'universities' | 'districts') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLabels = {
    all: {
      en: 'Overview & Impact',
      hi: 'समग्र प्रभाव व सांख्यिकी',
      sat: 'ᱢᱩᱬᱩᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞ',
    },
    pipeline: {
      en: 'Live Ongoing Pipeline',
      hi: 'सक्रिय परियोजना पाइपलाइन',
      sat: 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ',
    },
    universities: {
      en: 'University Resolution Leaderboard',
      hi: 'विश्वविद्यालय समाधान लीडरबोर्ड',
      sat: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱚᱞᱦᱮ ᱨᱮᱸᱠ',
    },
    districts: {
      en: 'District Spread Breakdown',
      hi: 'ज़िलावार भौगोलिक विश्लेषण',
      sat: 'ᱡᱤᱞᱟᱹ ᱴᱚᱴᱷᱟ ᱦᱟᱹᱴᱤᱧ',
    },
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 pb-20 animate-in fade-in duration-300">
      {/* Sticky Quick-Nav Sub-bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 px-3 sm:px-4 rounded-2xl shadow-xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
          <button
            type="button"
            onClick={() => scrollToSection('section-macro', 'all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'all'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{navLabels.all[language]}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-pipeline', 'pipeline')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'pipeline'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{navLabels.pipeline[language]}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-universities', 'universities')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'universities'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{navLabels.universities[language]}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('section-districts', 'districts')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              activeTab === 'districts'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{navLabels.districts[language]}</span>
          </button>
        </div>

        {/* Quick Report CTA in subbar */}
        <Link
          href="/report"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex-shrink-0"
        >
          <AlertCircle className="w-3.5 h-3.5 text-blue-700" />
          <span>
            {language === 'hi'
              ? 'नई समस्या दर्ज करें'
              : language === 'sat'
              ? 'ᱱᱟᱣᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ'
              : 'Report New Issue'}
          </span>
        </Link>
      </div>

      {/* SECTION 1: MACRO IMPACT BANNER */}
      <div id="section-macro" className="scroll-mt-36">
        <MacroImpactBanner language={language} />
      </div>

      {/* SECTION 2: "ABHI KYA CHAL RAHA HAI" — LIVE ONGOING PIPELINE */}
      <div id="section-pipeline" className="scroll-mt-36 pt-2">
        <OngoingPipeline language={language} />
      </div>

      {/* SECTION 3: "KIS UNIVERSITY NE KI" — UNIVERSITY LEADERBOARD & PORTFOLIOS */}
      <div id="section-universities" className="scroll-mt-36 pt-2">
        <UniversityLeaderboard language={language} />
      </div>

      {/* SECTION 4: DISTRICT RESOLUTION BREAKDOWN */}
      <div id="section-districts" className="scroll-mt-36 pt-2">
        <DistrictBreakdownTable language={language} />
      </div>

      {/* BOTTOM CITIZEN ACTION & AUDIT NOTICE */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-sky-200 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            <span>
              {language === 'hi'
                ? 'नागरिक सशक्तिकरण एवं सहभागिता'
                : language === 'sat'
                ? 'ᱦᱚᱲ ᱫᱟᱲᱮ ᱟᱨ ᱥᱮᱞᱮᱫ'
                : 'Citizen Participation & Empowerment'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {language === 'hi'
              ? 'क्या आपके गाँव में कोई गंभीर तकनीकी समस्या है?'
              : language === 'sat'
              ? 'ᱪᱮᱫ ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱦᱟᱸᱱ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱢᱮᱱᱟᱜ-ᱟ?'
              : 'Have a civic engineering challenge in your village?'}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-normal leading-relaxed">
            {language === 'hi'
              ? 'जल, विद्युत, कृषि अथवा स्वास्थ्य संबंधी समस्याओं को सीधे राज्य के ४२ उच्च शिक्षण संस्थानों के संज्ञान में लाएं।'
              : language === 'sat'
              ? 'ᱫᱟᱜ, ᱵᱤᱡᱽᱞᱤ, ᱪᱟᱥ ᱟᱨ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱟᱡᱽ ᱨᱮᱱᱟᱜ ᱔᱒ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱥᱟᱢᱟᱝ ᱨᱮ ᱥᱚᱫᱚᱨ ᱢᱮ᱾'
              : 'Submit drinking water, electricity, agriculture, or sanitation challenges directly to 42 university research labs.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-white hover:bg-slate-100 text-blue-900 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>
              {language === 'hi'
                ? 'समस्या दर्ज करें'
                : language === 'sat'
                ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ'
                : 'Report a Problem'}
            </span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </Link>

          <Link
            href="/samvaad"
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-blue-900/80 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold border border-blue-400/40 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-sky-300" />
            <span>
              {language === 'hi'
                ? 'जन संवाद में भाग लें'
                : language === 'sat'
                ? 'ᱦᱚᱲ ᱨᱚᱯᱚᱲ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ'
                : 'Join Jan Samvaad'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

