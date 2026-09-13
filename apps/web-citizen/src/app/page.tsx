'use client';

import React from 'react';
import Link from 'next/link';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  AlertCircle,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Send,
  Droplets,
  Zap,
  Hammer,
  Globe,
  Camera,
  Mic,
  Building2,
  MapPin,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const { t, language, setLanguage } = useCitizen();

  const languagePills: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'Latin' },
    { code: 'hi', label: 'हिन्दी', script: 'देवनागरी' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki' },
  ];

  const getPortalTitle = () => {
    if (language === 'hi') return 'जागृत';
    if (language === 'sat') return 'ᱡᱟᱜᱽᱨᱤᱛ';
    return 'JAGRIT';
  };

  const problemCategories = [
    {
      id: 'drinking_water',
      title:
        language === 'hi'
          ? 'पेयजल एवं चापाकल मरम्मत'
          : language === 'sat'
          ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ'
          : 'Drinking Water and Handpumps',
      icon: Droplets,
      desc:
        language === 'hi'
          ? 'खराब चापाकल, जल दूषण व पाइपलाइन मरम्मत'
          : language === 'sat'
          ? 'ᱵᱟᱹᱲᱤᱡ ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ'
          : 'Broken handpumps, contamination, and supply lines',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'road_drainage',
      title:
        language === 'hi'
          ? 'ग्रामीण सड़क एवं नाली'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱤ'
          : 'Rural Roads and Drainage',
      icon: Hammer,
      desc:
        language === 'hi'
          ? 'टूटी पुलिया, कच्ची सड़क व जलजमाव'
          : language === 'sat'
          ? 'ᱵᱟᱹᱲᱤᱡ ᱦᱚᱨ ᱟᱨ ᱰᱟᱦᱟᱨ'
          : 'Culverts, village roads, and drainage overflow',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      id: 'electricity',
      title:
        language === 'hi'
          ? 'ग्रामीण विद्युतीकरण एवं सौर ऊर्जा'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱞᱤ ᱟᱨ ᱥᱮᱸᱜᱮᱞ'
          : 'Rural Electrification and Solar',
      icon: Zap,
      desc:
        language === 'hi'
          ? 'खराब ट्रांसफार्मर, स्ट्रीट लाइट व सौर पैनल'
          : language === 'sat'
          ? 'ᱴᱨᱟᱱᱥᱯᱷᱟᱨᱢᱟᱨ ᱟᱨ ᱵᱤᱡᱞᱤ'
          : 'Solar microgrids, transformers, and village lighting',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Clean Modern Hero Section (DPI Civic White/Slate Layout) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Portal Identity, Language Pills & Headings */}
          <div className="lg:col-span-8 space-y-6">
            {/* Government Official Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('home', 'heroBadge', 'Government of Jharkhand Initiative')}</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white font-black text-2xl flex items-center justify-center shadow-sm">
                  J
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {getPortalTitle()}
                </h1>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {t('home', 'heroTitle', 'Empowering Rural Communities Through Higher Education Innovation')}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {t('home', 'heroSubtitle', 'Connecting grassroots village challenges in water, electricity, and roads directly with university engineering research.')}
              </p>
            </div>

            {/* Language Switcher Pills (Generous >= 48px touch targets) */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-700" />
                <span>{t('home', 'chooseLanguage', 'Choose Your Preferred Language:')}</span>
              </span>

              <div className="flex flex-wrap gap-2.5">
                {languagePills.map((pill) => {
                  const isSelected = language === pill.code;
                  return (
                    <button
                      key={pill.code}
                      onClick={() => setLanguage(pill.code)}
                      className={`flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 min-h-[48px] rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 border ${
                        isSelected
                          ? 'bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-700/20'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className="text-sm">{pill.label}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                        }`}
                      >
                        {pill.script}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Civic Greeting Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center shadow-inner">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
              >
                <circle cx="50" cy="50" r="40" fill="#DBEAFE" />
                <path
                  d="M 40 68 C 40 56, 32 46, 36 34 C 38 28, 44 26, 48 28 C 50 30, 50 38, 50 44 C 50 38, 50 30, 52 28 C 56 26, 62 28, 64 34 C 68 46, 60 56, 60 68 Z"
                  fill="#1D4ED8"
                />
                <line x1="50" y1="28" x2="50" y2="68" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                {t('home', 'namasteGreeting', 'Johar and Warm Greetings')}
              </h3>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                {t('home', 'namasteSubtitle', 'Empowering Citizens Through Applied University Engineering')}
              </p>
            </div>

            <div className="inline-flex items-center text-[11px] font-bold text-blue-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <span>{t('common', 'deptShort', 'Govt. of Jharkhand • DHTE')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Two Prominent, Friendly Action Cards (Easy for Villagers) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('home', 'servicesTitle', 'Essential Citizen Services')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('home', 'servicesSubtitle', 'Direct problem submission, automated WhatsApp intake, and lifecycle resolution tracking')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Card 1: Report a Problem (Camera & Mic with Big Touch Targets) */}
          <div className="bg-white border-2 border-blue-200 hover:border-blue-600 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform">
                  <div className="flex items-center gap-1">
                    <Camera className="w-6 h-6" />
                    <Mic className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    Direct Grievance Intake
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {t('home', 'actionCardReportTitle', 'Report a Problem')}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home', 'actionCardReportDesc', 'Submit village issues using compressed site photos and clear audio voice recordings.')}
              </p>
            </div>

            <Link
              href="/report"
              className="inline-flex items-center justify-center space-x-3 bg-blue-700 hover:bg-blue-800 text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 group/btn"
            >
              <Camera className="w-5 h-5 text-white" />
              <Mic className="w-5 h-5 text-amber-300" />
              <span>{t('home', 'actionCardReportButton', 'Start Problem Submission')}</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Action Card 2: WhatsApp Seva Bot */}
          <div className="bg-white border-2 border-emerald-200 hover:border-[#25D366] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center border border-emerald-200 group-hover:scale-105 transition-transform">
                  <Send className="w-7 h-7 text-[#16A34A]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Zero Application Install
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <span>{t('home', 'actionCardWhatsAppTitle', 'WhatsApp Seva Bot')}</span>
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home', 'actionCardWhatsAppDesc', 'Chat directly on WhatsApp with our civic bot. Send voice notes, photos, or location without installing any application.')}
              </p>
            </div>

            <Link
              href="/whatsapp-simulator"
              className="inline-flex items-center justify-center space-x-3 bg-[#16A34A] hover:bg-[#15803d] text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 group/btn"
            >
              <Send className="w-5 h-5 text-white" />
              <span>{t('home', 'actionCardWhatsAppButton', 'Open WhatsApp Chat')}</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Simple 4-Card Metric Strip with Clean White Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-700">1,248+</div>
          <div className="text-xs font-bold text-slate-800">
            {t('home', 'statIssuesResolved', 'Issues Resolved')}
          </div>
          <div className="text-[10px] text-slate-500">PESA Gram Sabha verified</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-slate-900">42</div>
          <div className="text-xs font-bold text-slate-800">
            {t('home', 'statCollegesEngaged', 'Universities Connected')}
          </div>
          <div className="text-[10px] text-slate-500">Engineering R&D labs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-700">4,350+</div>
          <div className="text-xs font-bold text-slate-800">
            {t('home', 'statPanchayatsCovered', 'Panchayats Covered')}
          </div>
          <div className="text-[10px] text-slate-500">Across 24 districts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">₹3.8 Cr</div>
          <div className="text-xs font-bold text-slate-800">
            {t('home', 'statFundsDisbursed', 'Innovation Funds Released')}
          </div>
          <div className="text-[10px] text-slate-500">Milestone escrow tranches</div>
        </div>
      </section>

      {/* 4. Supported Problem Domains (Clean Single-Language White Cards) */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('home', 'domainsTitle', 'Key Civic Domains Addressed')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('home', 'domainsSubtitle', 'High priority rural challenges solved by university research labs')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problemCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-start space-x-3.5"
              >
                <div className={`p-3 rounded-xl border ${cat.badgeColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{cat.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 4-Stage Closed Loop Workflow */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {t('home', 'workflowTitle', 'How JAGRIT Works')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {t('home', 'step1Title', '1. Multilingual Ingestion')}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('home', 'step1Desc', 'Speak or write your grievance in Santhali, Hindi, or English via Web or WhatsApp.')}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {t('home', 'step2Title', '2. Intelligent Deduplication')}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('home', 'step2Desc', 'Automated 500-meter spatial buffer check and engineering lab assignment.')}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {t('home', 'step3Title', '3. University Innovation Sprint')}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('home', 'step3Desc', 'Engineering student teams build durable field prototypes with milestone escrow funding.')}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {t('home', 'step4Title', '4. Gram Sabha Verification')}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('home', 'step4Desc', '45-day village field test and democratic citizen quorum approval before project closure.')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
