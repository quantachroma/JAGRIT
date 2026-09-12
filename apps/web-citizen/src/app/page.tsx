'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  AlertCircle,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Droplets,
  Zap,
  Hammer,
  ShieldCheck,
  Globe,
  ChevronRight,
  Cpu,
  GraduationCap,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const { t, language, setLanguage } = useCitizen();

  const languagePills: { code: Language; label: string; script: string; englishName: string }[] = [
    { code: 'hi', label: 'हिन्दी', script: 'देवनागरी', englishName: 'Hindi' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', englishName: 'Santhali' },
    { code: 'en', label: 'English', script: 'Latin', englishName: 'English' },
  ];

  const problemCategories = [
    {
      id: 'drinking_water',
      title:
        language === 'hi'
          ? 'पेयजल एवं चापाकल'
          : language === 'sat'
          ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ (Chapekal daah)'
          : 'Drinking Water & Handpump',
      icon: Droplets,
      desc:
        language === 'hi'
          ? 'खराब चापाकल, जल दूषण व पाइपलाइन मरम्मत'
          : language === 'sat'
          ? 'ᱵᱟᱹᱲᱤᱡ ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ'
          : 'Broken handpumps, contamination & supply lines',
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      id: 'road_drainage',
      title:
        language === 'hi'
          ? 'ग्रामीण सड़क एवं नाली'
          : language === 'sat'
          ? 'ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱤ (Hor ar nali)'
          : 'Rural Roads & Drainage',
      icon: Hammer,
      desc:
        language === 'hi'
          ? 'टूटी पुलिया, कच्ची सड़क व जलजमाव'
          : language === 'sat'
          ? 'ᱵᱟᱹᱲᱤᱡ ᱦᱚᱨ ᱟᱨ ᱰᱟᱦᱟᱨ'
          : 'Culverts, village roads & drainage overflow',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'electricity',
      title:
        language === 'hi'
          ? 'विद्युत एवं सौर ऊर्जा'
          : language === 'sat'
          ? 'ᱵᱤᱡᱞᱤ ᱟᱨ ᱥᱮᱸᱜᱮᱞ (Bijli ar sengel)'
          : 'Rural Solar & Microgrid',
      icon: Zap,
      desc:
        language === 'hi'
          ? 'खराब ट्रांसफार्मर, स्ट्रीट लाइट व सौर पैनल'
          : language === 'sat'
          ? 'ᱴᱨᱟᱱᱥᱯᱷᱟᱨᱢᱟᱨ ᱟᱨ ᱵᱤᱡᱞᱤ'
          : 'Solar microgrids, transformers & village lighting',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Screen 1: Splash Screen / Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#02311c] via-[#044728] to-[#011a0e] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-emerald-700/60">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D97706]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Branding, Greetings, Trilingual Pills & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Government of Jharkhand DHTE Official Branding Banner */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/25 to-amber-600/15 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="uppercase tracking-wider">Govt. of Jharkhand • DHTE</span>
              </div>
              <span className="text-emerald-200/80 text-xs hidden sm:inline">
                उच्च एवं तकनीकी शिक्षा विभाग | Dept. of Higher & Technical Education
              </span>
            </div>

            {/* Portal Title & Branding */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg border border-amber-300">
                  J
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                    JAGRIT
                    <span className="text-amber-400 text-2xl sm:text-3xl font-bold font-serif">जागृत</span>
                  </h1>
                  <p className="text-xs text-emerald-200 tracking-wider font-medium">
                    झारखण्ड जन-समस्या नवाचार एवं समाधान पोर्टल • ᱡᱟᱜᱽᱨᱤᱛ
                  </p>
                </div>
              </div>

              {/* Welcoming Tagline */}
              <p className="text-lg sm:text-xl font-medium text-emerald-100 leading-relaxed pt-2">
                {language === 'hi'
                  ? 'जोहार! झारखण्ड जन-समस्या नवाचार पोर्टल में आपका स्वागत है।'
                  : language === 'sat'
                  ? 'ᱡᱚᱦᱟᱨ! ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾'
                  : 'Johar! Welcome to the Jharkhand Societal Innovation Collaboration Portal.'}
              </p>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-xl">
                {language === 'hi'
                  ? 'गांव और टोलों की जमीनी समस्याओं (पेयजल, सड़क, बिजली) को विश्वविद्यालयों के इंजीनियरिंग शोध व 3-चरणीय हैकथॉन से जोड़कर स्थायी समाधान।'
                  : language === 'sat'
                  ? 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ (ᱫᱟᱜ, ᱦᱚᱨ, ᱵᱤᱡᱞᱤ) ᱠᱚ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱨᱮᱱᱟᱜ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱟᱨ ᱦᱮᱯᱨᱟᱣ ᱛᱮ ᱥᱚᱞᱦᱮ᱾'
                  : 'Transforming rural grassroots challenges into applied engineering hackathons across 42 Higher Education Institutions in Jharkhand.'}
              </p>
            </div>

            {/* Trilingual Selector Pills */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-amber-300">
                <Globe className="w-3.5 h-3.5" />
                <span>
                  {language === 'hi'
                    ? 'अपनी भाषा चुनें (Select Language):'
                    : language === 'sat'
                    ? 'ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ (Select Language):'
                    : 'Choose Your Preferred Language:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {languagePills.map((pill) => {
                  const isSelected = language === pill.code;
                  return (
                    <button
                      key={pill.code}
                      onClick={() => setLanguage(pill.code)}
                      className={`group relative flex items-center space-x-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border active:scale-95 ${
                        isSelected
                          ? 'bg-[#D97706] text-slate-950 border-amber-300 shadow-lg shadow-amber-900/40 scale-105 ring-2 ring-amber-400/50'
                          : 'bg-white/10 hover:bg-white/20 text-emerald-100 border-white/20 hover:border-white/40 backdrop-blur'
                      }`}
                    >
                      <span className="font-bold">{pill.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-slate-950/20 text-slate-950 font-medium'
                            : 'bg-white/10 text-emerald-200 group-hover:text-white'
                        }`}
                      >
                        {pill.script}
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5 text-slate-950" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              {/* Primary CTA: Aage Badhein / Get Started -> /report */}
              <Link
                href="/report"
                className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3.5 min-h-[48px] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base group border border-amber-300 active:scale-95"
              >
                <AlertCircle className="w-5 h-5 text-slate-950" />
                <span>
                  {language === 'hi'
                    ? 'आगे बढ़ें / समस्या दर्ज करें'
                    : language === 'sat'
                    ? 'ᱞᱟᱦᱟᱜ ᱢᱮ / ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ'
                    : 'Aage Badhein / Get Started'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-slate-950" />
              </Link>

              {/* Secondary CTA: Track Status -> /dashboard */}
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 bg-emerald-950/70 hover:bg-emerald-900/90 text-white font-semibold px-5 py-3.5 min-h-[48px] rounded-xl backdrop-blur border border-emerald-600/60 hover:border-emerald-400 transition-all text-sm active:scale-95"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'hi'
                    ? 'स्थिति जांचें'
                    : language === 'sat'
                    ? 'ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ'
                    : 'Track Status'}
                </span>
              </Link>

              {/* WhatsApp Simulator Shortcut */}
              <Link
                href="/whatsapp-simulator"
                className="inline-flex items-center space-x-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-200 hover:text-white px-3.5 py-3 min-h-[44px] rounded-xl border border-[#25D366]/40 transition-all text-xs font-semibold active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Seva Bot</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Smooth CSS Namaste Greeting Animation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Animated Radiant Mandala & Namaste Hands */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Pulsing Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-400/20 to-amber-300/10 animate-ping opacity-30 pointer-events-none" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/30 animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-emerald-400/40 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
              
              {/* Inner Glowing Orb */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-emerald-800/80 to-[#044728] shadow-[0_0_50px_rgba(217,119,6,0.35)] border border-amber-400/50 flex items-center justify-center">
                {/* Handcrafted Namaste (Folding Hands) SVG Animation */}
                <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-28 h-28 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  >
                    {/* Background Halo Rays */}
                    <circle cx="60" cy="60" r="48" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <circle cx="60" cy="60" r="38" stroke="#34D399" strokeWidth="1" opacity="0.5" />
                    
                    {/* Golden Radiance Aura behind hands */}
                    <circle cx="60" cy="55" r="24" fill="url(#haloGlow)" />
                    
                    {/* Left & Right Folding Hands (Namaskar / Johar) */}
                    <g transform="translate(60, 58)">
                      {/* Left Hand Silhouette */}
                      <path
                        d="M -3 18 C -3 6, -16 -4, -14 -16 C -13 -22, -9 -25, -6 -23 C -3 -21, -3 -12, -2 -6 C -1 -12, 1 -24, 0 -25 C 0 -25, 0 18, 0 18 Z"
                        fill="#FDE68A"
                        stroke="#B45309"
                        strokeWidth="1.2"
                      />
                      {/* Right Hand Silhouette */}
                      <path
                        d="M 3 18 C 3 6, 16 -4, 14 -16 C 13 -22, 9 -25, 6 -23 C 3 -21, 3 -12, 2 -6 C 1 -12, -1 -24, 0 -25 C 0 -25, 0 18, 0 18 Z"
                        fill="#FDE68A"
                        stroke="#B45309"
                        strokeWidth="1.2"
                      />
                      {/* Palm Conjunction Highlight */}
                      <line x1="0" y1="-25" x2="0" y2="18" stroke="#D97706" strokeWidth="1.5" />
                      {/* Wrist / Sleeves with Tribal Saffron & Green Accent */}
                      <rect x="-8" y="16" width="16" height="6" rx="2" fill="#D97706" />
                      <rect x="-7" y="21" width="14" height="4" rx="1.5" fill="#044728" stroke="#F59E0B" strokeWidth="0.8" />
                    </g>

                    <defs>
                      <radialGradient id="haloGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#D97706" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#044728" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Floating Tribal Accents */}
              <div className="absolute top-2 left-6 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 backdrop-blur">
                ✨ Johar!
              </div>
              <div className="absolute bottom-3 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 backdrop-blur">
                🌱 ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ
              </div>
            </div>

            {/* Namaste Caption Card */}
            <div className="mt-4 text-center space-y-1">
              <div className="text-sm font-bold text-amber-300 tracking-wide">
                {language === 'hi'
                  ? 'जोहार एवं सादर प्रणाम'
                  : language === 'sat'
                  ? 'ᱡᱚᱦᱟᱨ ᱟᱨ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ'
                  : 'Namaste & Johar Jharkhand'}
              </div>
              <div className="text-[11px] text-emerald-200/80">
                {language === 'hi'
                  ? 'नागरिक सेवा एवं तकनीकी नवाचार का संगम'
                  : language === 'sat'
                  ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱟᱨ ᱠᱚᱞᱮᱡᱽ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱢᱤᱞᱚᱱ'
                  : 'Empowering Citizens through University Engineering'}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Portal Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-emerald-700/60">
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">1,248+</div>
            <div className="text-xs text-emerald-100 font-medium">{t('splash', 'statIssuesResolved', 'Issues Resolved')}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-white">42</div>
            <div className="text-xs text-emerald-100 font-medium">{t('splash', 'statCollegesEngaged', 'HEIs Connected')}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">4,350+</div>
            <div className="text-xs text-emerald-100 font-medium">{t('splash', 'statPanchayatsCovered', 'Panchayats Covered')}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-white">₹3.8 Cr</div>
            <div className="text-xs text-emerald-100 font-medium">{t('splash', 'statFundsDisbursed', 'Escrow Released')}</div>
          </div>
        </div>
      </section>

      {/* Primary Action Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'hi' ? 'शीर्ष नागरिक सेवाएं' : language === 'sat' ? 'ᱢᱩᱬᱩᱛ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Services)' : 'Key Citizen Services'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'hi'
                ? 'सीधे अपनी समस्या दर्ज करें, व्हाट्सएप बॉट का उपयोग करें अथवा स्थिति जांचें'
                : language === 'sat'
                ? 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱞᱟᱹᱭ ᱢᱮ ᱥᱮ ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ'
                : 'Submit grievance, inspect via CV scanner, or simulate WhatsApp ingestion'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Submit Problem */}
          <Link
            href="/report"
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#044728] hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#044728] group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#044728] transition-colors">
                {language === 'hi' ? 'समस्या दर्ज करें (Problem Studio)' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱥᱚᱢᱚᱥᱭᱟ (Aatu Samasya)' : 'Problem Submission Studio'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पेयजल, चापाकल, सड़क अथवा बिजली की समस्या की फोटो (कंप्रेस कर ≤500KB) व लाइव माइक्रोफोन रिकॉर्डिंग से शिकायत दर्ज करें।'
                  : language === 'sat'
                  ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱥᱮ ᱦᱚᱨ-ᱰᱟᱦᱟᱨ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱮᱢ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾'
                  : 'Report broken civic assets using compressed photos (≤500 KB), real-time voice waveform notes & GPS map picker.'}
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs font-semibold text-[#044728] group-hover:underline">
              <span>{language === 'hi' ? 'स्टूडियो खोलें' : language === 'sat' ? 'ᱚᱞ ᱢᱮ' : 'Open Studio'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: WhatsApp Simulator */}
          <Link
            href="/whatsapp-simulator"
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#25D366] hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                <span>WhatsApp Seva Bot</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Simulator</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'व्हाट्सएप चैट के माध्यम से बिना ऐप डाउनलोड किए फोटो, वॉइस नोट या लाइव लोकेशन भेजकर सीधे टिकट #JAG-4102 प्राप्त करें।'
                  : language === 'sat'
                  ? 'ᱣᱟᱴᱥᱟᱯ ᱛᱮ ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱟᱲᱟᱝ ᱵᱷᱮᱡᱟᱭ ᱢᱮ ᱟᱨ ᱴᱤᱠᱮᱴ ᱦᱟᱛᱟᱣ ᱢᱮ᱾'
                  : 'Simulate instant ingestion over WhatsApp: send photo, voice note, or live GPS to generate automated ticket JAG-4102.'}
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs font-semibold text-emerald-700 group-hover:underline">
              <span>{language === 'hi' ? 'व्हाट्सएप चैट सिमुलेट करें' : language === 'sat' ? 'ᱪᱟᱞᱟᱜ ᱢᱮ' : 'Launch WhatsApp Simulator'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Track Status */}
          <Link
            href="/dashboard"
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#D97706] hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706] group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#D97706] transition-colors">
                {language === 'hi' ? 'स्थिति एवं समाधान डैशबोर्ड' : language === 'sat' ? 'ᱤᱧᱟᱜ ᱥᱚᱢᱚᱥᱭᱟ (Dashboard)' : 'Grievance Dashboard'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'अपनी दर्ज समस्या की लाइव स्थिति, विश्वविद्यालय हैकथॉन समाधान व 45-दिवसीय नागरिक कोरम सत्यापन ट्रैक करें।'
                  : language === 'sat'
                  ? 'ᱮᱟᱭᱤ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱟᱨ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱮᱯᱨᱟᱣ ᱨᱮᱱᱟᱜ ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ᱾'
                  : 'Track your ticket through AI Triage, 10-day HEI bidding window, 3-round hackathon, and Gram Sabha quorum.'}
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs font-semibold text-[#D97706] group-hover:underline">
              <span>{language === 'hi' ? 'डैशबोर्ड देखें' : language === 'sat' ? 'ᱧᱮᱞ ᱢᱮ' : 'View Dashboard'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Problem Domains Preview */}
      <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'hi' ? 'प्रमुख ग्रामीण समस्या क्षेत्र' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱟᱹᱴᱤᱧ (Domains)' : 'Supported Problem Domains'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi' ? 'झारखण्ड के ग्रामीण क्षेत्रों की प्राथमिक समस्याएं' : language === 'sat' ? 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ' : 'High priority rural domains addressed by university research labs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problemCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
                <div className={`p-3 rounded-xl border ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{cat.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Stage Closed Loop Workflow */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {language === 'hi' ? 'जागृत कार्यप्रणाली: समस्या से स्थायी समाधान' : language === 'sat' ? 'ᱡᱟᱜᱽᱨᱤᱛ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Workflow)' : 'How JAGRIT Works (The Closed-Loop Model)'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#044728] font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'नागरिक रिपोर्टिंग' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ' : '1. Multilingual Ingestion'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi' ? 'हिन्दी, संथाली या खोरठा में बोलकर या लिखकर समस्या दर्ज करें।' : language === 'sat' ? 'ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮ ᱦᱤᱱᱫᱤ ᱛᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾' : 'Report in Santhali, Hindi, or English via Web or WhatsApp.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#D97706] font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'एआई जांच व वर्गीकरण' : language === 'sat' ? 'ᱮᱟᱭᱤ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ' : '2. AI & HITL Triage'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi' ? '500m डुप्लिकेशन जांच और विश्वविद्यालय शोध के लिए चयन।' : language === 'sat' ? '᱕᱐᱐ ᱢᱤᱴᱟᱨ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱦᱩᱭᱩᱜ-ᱟ᱾' : '500m PostGIS buffer and zero-shot research routing.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#044728] font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'विश्वविद्यालय हैकथॉन' : language === 'sat' ? 'ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱮᱯᱨᱟᱣ' : '3. University R&D Sprint'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi' ? '3-चरणीय हैकथॉन और एस्क्रो फंड (30-40-30%) से प्रोटोटाइप निर्माण।' : language === 'sat' ? 'ᱠᱚᱞᱮᱡᱽ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱚᱞᱦᱮ ᱵᱮᱱᱟᱣᱟ᱾' : '3-round hackathon with milestone-based escrow release.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#D97706] font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'ग्राम सभा सत्यापन' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ' : '4. 45-Day Citizen Quorum'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi' ? 'जमीनी सत्यापन और ग्राम सभा अनापत्ति (PESA Act) के बाद समापन।' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱚ ᱥᱟᱹᱨᱤ ᱞᱮᱠᱷᱟᱱ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣᱜ-ᱟ᱾' : 'Durability testing, citizen quorum, and PESA Gram Sabha NOC.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
