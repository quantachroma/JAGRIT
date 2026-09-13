'use client';

import React from 'react';
import Link from 'next/link';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  ArrowRight,
  Check,
  Droplets,
  Zap,
  Hammer,
  Sparkles,
  ShieldCheck,
  Send,
  Building2,
  Users,
  Award,
  Clock,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const { t, language, setLanguage } = useCitizen();

  const languagePills: { code: Language; label: string }[] = [
    { code: 'hi', label: 'हिन्दी' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'en', label: 'English' },
  ];

  const getSubTitle = () => {
    if (language === 'hi') return 'झारखण्ड जन-समस्या समाधान एवं नवाचार मंच';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱟᱶᱛᱟ ᱱᱟᱶᱟ ᱩᱭᱦᱟᱹᱨ ᱟᱨ ᱥᱚᱞᱦᱮ ᱯᱚᱨᱴᱟᱞ';
    return 'Jharkhand Academic & Grassroots Resolution Innovation Technology';
  };

  const getExplainer = () => {
    if (language === 'hi') {
      return 'नागरिकों को राज्य के 42 से अधिक विश्वविद्यालयों से जोड़कर जमीनी समस्याओं के स्थायी तकनीकी समाधान का निर्माण।';
    }
    if (language === 'sat') {
      return 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱚ ᱔᱒ ᱠᱷᱚᱱ ᱵᱟᱹᱲᱛᱤ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱱᱟᱜ ᱥᱚᱞᱦᱮ ᱵᱮᱱᱟᱣ᱾';
    }
    return 'Connecting citizens with 42+ state universities to engineer deployable solutions for real grassroots problems.';
  };

  const getPrimaryBtnText = () => {
    if (language === 'hi') return 'शुरू करें';
    if (language === 'sat') return 'ᱮᱦᱚᱵ ᱢᱮ';
    return 'Get Started';
  };

  const getSecondaryBtnText = () => {
    if (language === 'hi') return 'सक्रिय परियोजनाएं देखें';
    if (language === 'sat') return 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤ';
    return 'Explore Active Projects';
  };

  const problemCategories = [
    {
      id: 'drinking_water',
      title:
        language === 'hi'
          ? 'पेयजल एवं फ्लोराइड निवारण'
          : language === 'sat'
          ? 'ᱧᱩ ᱫᱟᱜ ᱟᱨ ᱪᱟᱯᱟᱠᱚᱞ'
          : 'Drinking Water & Defluoridation',
      icon: Droplets,
      desc:
        language === 'hi'
          ? 'चापाकल गाद निकासी, आर्सेनिक-फ्लोराइड झिल्ली सोखता इकाइयां'
          : language === 'sat'
          ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱥᱟᱯᱷᱟ ᱟᱨ ᱫᱟᱜ ᱨᱮ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱟᱦᱟᱭ ᱠᱟᱹᱢᱤ'
          : 'Aquifer desilting, solar nano-membrane defluoridation systems',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'road_drainage',
      title:
        language === 'hi'
          ? 'ग्रामीण सड़क एवं जल निकासी'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱤ'
          : 'Rural Roads & Culvert Infrastructure',
      icon: Hammer,
      desc:
        language === 'hi'
          ? 'पुलिया निर्माण, बरसाती जल निकासी एवं स्थानीय सामग्री संवर्धन'
          : language === 'sat'
          ? 'ᱯᱩᱞᱤᱭᱟᱹ ᱵᱮᱱᱟᱣ ᱟᱨ ᱫᱟᱜ ᱪᱟᱞᱟᱣ ᱱᱟᱞᱤ ᱠᱟᱹᱢᱤ'
          : 'Geotechnical culvert stabilization and indigenous materials',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      id: 'electricity',
      title:
        language === 'hi'
          ? 'सौर ऊर्जा एवं माइक्रोग्रिड'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱞᱤ ᱟᱨ ᱥᱮᱸᱜᱮᱞ'
          : 'Solar Microgrids & Battery Telemetry',
      icon: Zap,
      desc:
        language === 'hi'
          ? 'स्वास्थ्य उपकेंद्र वोल्टेज स्थिरीकरण एवं सौर पंप टेलीमेट्री'
          : language === 'sat'
          ? 'ᱦᱟᱥᱯᱟᱛᱟᱞ ᱵᱤᱡᱞᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱴᱷᱤᱠ ᱫᱚᱦᱚ ᱟᱨ ᱥᱮᱸᱜᱮᱞ ᱯᱟᱢᱯ'
          : 'Primary health centre voltage telemetry and decentralized solar',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* =========================================================================
          SCREEN 1: WELCOME & ANIMATED NAMASTE SPLASH VIEW
          ========================================================================= */}
      <section className="relative rounded-3xl border border-[#E2E8F0] bg-gradient-to-b from-[#EFF6FF] via-[#FFFFFF] to-[#FFFFFF] p-6 sm:p-10 lg:p-14 shadow-card-subtle overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-gradient-to-b from-blue-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Utility Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
          {/* Left: Government Emblem Badge */}
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center space-x-2 bg-white text-slate-800 border border-[#E2E8F0] px-4 py-2 rounded-full text-xs font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-pulse" />
              <span>{t('home.heroBadge')}</span>
            </span>
          </div>

          {/* Right: Clean 3-Pill Language Switcher (>= 48px touch target) */}
          <div
            role="radiogroup"
            aria-label="Language Selector"
            className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-[#E2E8F0] gap-1.5"
          >
            {languagePills.map((pill) => {
              const isSelected = language === pill.code;
              return (
                <button
                  type="button"
                  key={pill.code}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setLanguage(pill.code)}
                  className={`px-4 py-2 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1D4ED8] text-white shadow-sm ring-1 ring-[#1D4ED8]'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  <span>{pill.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Pure CSS / SVG Animated Namaste Greeting (🙏) */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            {/* Gentle Pulsing Ambient Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 via-emerald-400/25 to-blue-500/20 animate-pulse-ring blur-sm" />
            <div className="absolute inset-2 rounded-full border border-blue-200/60 bg-white/70 backdrop-blur-xs shadow-inner flex items-center justify-center" />

            {/* Stylized Hands in Saffron (#D97706) and Emerald (#16A34A) with Namaste translateY Keyframes */}
            <div className="relative z-10 animate-namaste-rise">
              <svg
                viewBox="0 0 120 120"
                className="w-24 h-24 drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ambient Golden Aura Behind Hands */}
                <circle cx="60" cy="60" r="44" fill="#FEF3C7" opacity="0.6" />
                <circle cx="60" cy="60" r="36" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Left Hand: Warm Saffron / Gold (#D97706) */}
                <path
                  d="M 46 84 C 44 72, 38 60, 42 44 C 44 36, 52 32, 57 34 C 59 36, 59 46, 59 54 C 59 64, 55 76, 55 84 Z"
                  fill="#D97706"
                />
                {/* Left Thumb & Palm Fold */}
                <path
                  d="M 38 72 C 37 65, 41 58, 46 56 C 48 62, 48 70, 44 75 Z"
                  fill="#B45309"
                  opacity="0.8"
                />

                {/* Right Hand: Forest Emerald (#16A34A) */}
                <path
                  d="M 74 84 C 76 72, 82 60, 78 44 C 76 36, 68 32, 63 34 C 61 36, 61 46, 61 54 C 61 64, 65 76, 65 84 Z"
                  fill="#16A34A"
                />
                {/* Right Thumb & Palm Fold */}
                <path
                  d="M 82 72 C 83 65, 79 58, 74 56 C 72 62, 72 70, 76 75 Z"
                  fill="#15803D"
                  opacity="0.8"
                />

                {/* Center Joining Light / Innovation Spark */}
                <line x1="60" y1="34" x2="60" y2="82" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="60" cy="38" r="3" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="2" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* Typography & Identity */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {t('home.heroTitle')}
            </h1>

            {/* Single-Language Subtitle underneath (NO bilingual slashes) */}
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#1D4ED8] leading-snug">
              {getSubTitle()}
            </h2>

            {/* Explanatory Sub-banner */}
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
              {getExplainer()}
            </p>
          </div>

          {/* Action Buttons (Generous Touch Targets >= 48px) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              href="/auth"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 ease-out active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>{getPrimaryBtnText()}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base border border-[#E2E8F0] shadow-card-subtle hover:shadow-card-hover transition-all duration-200 ease-out active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-[#1D4ED8]" />
              <span>{getSecondaryBtnText()}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Metrics Strip (4 White Elevated Cards) */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-10 mt-10 border-t border-slate-200/80">
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#1D4ED8]">1,248+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {t('home.statIssuesResolved')}
            </div>
            <div className="text-[11px] text-slate-500">{t('home.statIssuesResolvedMeta')}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1 text-left">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">42</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {t('home.statCollegesEngaged')}
            </div>
            <div className="text-[11px] text-slate-500">{t('home.statCollegesEngagedMeta')}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#1D4ED8]">4,350+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {t('home.statPanchayatsCovered')}
            </div>
            <div className="text-[11px] text-slate-500">{t('home.statPanchayatsCoveredMeta')}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#16A34A]">₹3.8 Cr</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {t('home.statFundsDisbursed')}
            </div>
            <div className="text-[11px] text-slate-500">{t('home.statFundsDisbursedMeta')}</div>
          </div>
        </div>
      </section>

      {/* Two High-Contrast Rural Action Cards */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {t('home.servicesTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('home.servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Report a Problem (Emerald Green Accent) */}
          <div className="bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-card-subtle hover:shadow-card-hover transition-all duration-200 ease-out active:scale-[0.99] flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-2xl">📷</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {language === 'hi' ? 'सीधा पंजीकरण' : language === 'sat' ? 'ᱥᱚᱡᱷᱮ ᱚᱞ' : 'Direct Ingestion'}
                  </span>
                  <h4 className="text-xl font-black text-slate-900 mt-1">
                    {t('home.actionCardReportTitle')}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home.actionCardReportDesc')}
              </p>
            </div>

            <Link
              href="/report"
              className="inline-flex items-center justify-center space-x-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm shadow-md hover:shadow transition-all active:scale-[0.98]"
            >
              <span>{t('home.actionCardReportButton')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Card 2: WhatsApp Seva Bot (Official WhatsApp Green #25D366) */}
          <div className="bg-white border-2 border-emerald-200 hover:border-[#25D366] rounded-3xl p-6 sm:p-8 shadow-card-subtle hover:shadow-card-hover transition-all duration-200 ease-out active:scale-[0.99] flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#25D366] border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Send className="w-7 h-7 text-[#16A34A]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {language === 'hi' ? 'बिना ऐप डाउनलोड' : language === 'sat' ? 'ᱵᱟᱝ ᱮᱯ ᱰᱟᱣᱩᱱᱞᱳᱰ' : 'Zero App Install'}
                  </span>
                  <h4 className="text-xl font-black text-slate-900 mt-1">
                    {t('home.actionCardWhatsAppTitle')}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('home.actionCardWhatsAppDesc')}
              </p>
            </div>

            <Link
              href="/whatsapp-simulator"
              className="inline-flex items-center justify-center space-x-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm shadow-md hover:shadow transition-all active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              <span>{t('home.actionCardWhatsAppButton')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Domains Strip */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('home.domainsTitle')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('home.domainsSubtitle')}
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

      {/* 4-Step Closed Loop Workflow */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {t('home.workflowTitle')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D4ED8] font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t('home.step1Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('home.step1Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t('home.step2Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('home.step2Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D4ED8] font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t('home.step3Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('home.step3Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16A34A] font-bold text-sm flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t('home.step4Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('home.step4Desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
