'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import HeroBackgroundSvg from '@/components/hero/hero-background-svg';
import { MOCK_ACCOUNTS, saveActiveSession, type MockUser } from '@/lib/mock-auth';
import {
  Users,
  GraduationCap,
  Building2,
  Landmark,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export default function EntryPage() {
  const { language, setLanguage, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState<'citizen' | 'university' | 'industry' | 'govt'>('citizen');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('login') === 'true' || params.get('auth') === 'sso') {
        setShowLogin(true);
      }
    }
  }, []);

  const handleOpenLogin = () => {
    setShowLogin(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('login', 'true');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      url.searchParams.delete('auth');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const greetings = {
    en: {
      greeting: 'Johar & Namaste',
      sub: 'Welcome to JAGRIT Collaboration Portal',
      title: 'JAGRIT',
      titleDevanagari: 'जागृत',
      subtitle:
        'Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society',
      description:
        'A closed-loop civic tech platform transforming grassroots village challenges in water, roads, and clean energy into university engineering hackathons and CSR-underwritten solutions.',
      enterPortal: 'Enter Portal',
      reportWhatsapp: 'Report via WhatsApp',
      stakeholderHeading: 'Choose Stakeholder Portal',
      stakeholderSub: 'Select your role or sign in with your official institutional identity',
      roles: {
        citizen: {
          label: 'Citizen',
          tag: 'Rural Ingestion',
          name: 'Citizen Portal',
          desc: 'Report village issues via voice notes in Hindi & Santhali or GPS photos. Vote in the 45-day civic resolution quorum.',
          cta: 'Access Citizen Desk',
        },
        university: {
          label: 'University',
          tag: 'R&D & NEP 2020',
          name: 'University & HEI',
          desc: 'Accept verified societal challenges, deploy faculty & student teams in 3-round hackathons, and earn academic credits.',
          cta: 'Enter Academic Lab',
        },
        industry: {
          label: 'Industry',
          tag: 'Corporate CSR',
          name: 'Industry & CSR',
          desc: 'Sponsor district problem statements, co-fund milestone escrow tranches, and license verified student-built IP.',
          cta: 'Open Corporate Suite',
        },
        govt: {
          label: 'Government',
          tag: 'DHTE Governance',
          name: 'Government Admin',
          desc: 'Oversee statewide problem distributions, verify milestone deliverables, and authorize escrow tranche releases.',
          cta: 'Govt Control Room',
        },
      },
    },
    hi: {
      greeting: 'जोहार एवं नमस्ते',
      sub: 'जागृत नवाचार एवं समाधान पोर्टल में आपका स्वागत है',
      title: 'JAGRIT',
      titleDevanagari: 'जागृत',
      subtitle: 'झारखंड एकेडमिक-उद्योग नवाचार एवं जन-समस्या समाधान मंच',
      description:
        'गांव एवं टोलों की पेयजल, सड़क और सौर ऊर्जा समस्याओं को विश्वविद्यालयों के इंजीनियरिंग शोध, 3-चरणीय हैकथॉन और सीएसआर अनुदान से जोड़कर स्थायी समाधान।',
      enterPortal: 'पोर्टल में प्रवेश करें',
      reportWhatsapp: 'व्हाट्सएप द्वारा दर्ज करें',
      stakeholderHeading: 'हितधारक पोर्टल चुनें',
      stakeholderSub: 'अपनी भूमिका चुनें अथवा अपने आधिकारिक पहचान पत्र से साइन इन करें',
      roles: {
        citizen: {
          label: 'नागरिक',
          tag: 'जमीनी स्तर आवाज़',
          name: 'नागरिक सेवा पोर्टल',
          desc: 'हिंदी अथवा संथाली में बोलकर और फोटो खींचकर समस्या दर्ज करें। 45-दिवसीय नागरिक समाधान मतदान में भाग लें।',
          cta: 'नागरिक डेस्क खोलें',
        },
        university: {
          label: 'विश्वविद्यालय',
          tag: 'शोध एवं एनईपी 2020',
          name: 'विश्वविद्यालय एवं संस्थान',
          desc: 'सत्यापित जन-समस्याओं को स्वीकार करें, 3-चरणीय हैकथॉन में भाग लें और एनईपी-अनुमोदित शोध क्रेडिट अर्जित करें।',
          cta: 'अनुसंधान लैब में जाएं',
        },
        industry: {
          label: 'उद्योग',
          tag: 'सीएसआर सह-वित्तपोषण',
          name: 'उद्योग एवं कॉर्पोरेट',
          desc: 'जिला स्तरीय समस्याओं को प्रायोजित करें, एस्क्रो फंड में सह-योगदान दें और पेटेंट प्राप्त प्रोटोटाइप का व्यावसायीकरण करें।',
          cta: 'उद्योग सुइट खोलें',
        },
        govt: {
          label: 'प्रशासन',
          tag: 'उच्च शिक्षा विभाग',
          name: 'शासन एवं प्रशासन',
          desc: 'राज्यव्यापी नवाचार पाइपलाइन की निगरानी करें, समाधान मील के पत्थर सत्यापित करें और एस्क्रो फंड रिलीज करें।',
          cta: 'प्रशासन कंट्रोल रूम',
        },
      },
    },
    sat: {
      greeting: 'ᱡᱚᱦᱟᱨ (Johar)',
      sub: 'JAGRIT re sagun daram',
      title: 'JAGRIT',
      titleDevanagari: 'ᱡᱟᱜᱽᱨᱤᱛ',
      subtitle: 'Jharkhand Academia Industry Gateway for Research, Innovation and Transformation',
      description:
        'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱫᱟᱜ, ᱦᱚᱨ ᱟᱨ ᱵᱤᱡᱞᱤ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱠᱚᱞᱮᱡᱽ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ ᱦᱮᱯᱨᱟᱣ ᱟᱨ ᱥᱚᱨᱠᱟᱨ ᱜᱚᱲᱚ ᱛᱮ ᱥᱚᱞᱦᱮ᱾',
      enterPortal: 'ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ',
      reportWhatsapp: 'ᱣᱟᱴᱥᱟᱯ ᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ',
      stakeholderHeading: 'ᱨᱟᱹᱥᱤᱭᱟᱹ ᱯᱳᱨᱴᱟᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      stakeholderSub: 'ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ ᱟᱨ ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ',
      roles: {
        citizen: {
          label: 'ᱨᱟᱹᱥᱤᱭᱟᱹ',
          tag: 'ᱟᱹᱛᱩ ᱟᱲᱟᱝ',
          name: 'ᱨᱟᱹᱥᱤᱭᱟᱹ ᱯᱳᱨᱴᱟᱞ',
          desc: 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱵᱷᱮᱡᱟ ᱠᱟᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱥᱚᱞᱦᱮ ᱵᱷᱳᱴ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ᱾',
          cta: 'ᱨᱟᱹᱥᱤᱭᱟᱹ ᱰᱮᱥᱠ ᱡᱷᱤᱡ ᱢᱮ',
        },
        university: {
          label: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
          tag: 'ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱟᱨ ᱠᱨᱮᱰᱤᱴ',
          name: 'ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
          desc: 'ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱦᱟᱛᱟᱣ ᱢᱮ, ᱓ ᱛᱷᱚᱠ ᱨᱮᱱᱟᱜ ᱦᱮᱯᱨᱟᱣ ᱨᱮ ᱡᱤᱛᱠᱟᱹᱨ ᱢᱮ ᱟᱨ ᱮᱠᱟᱰᱮᱢᱤᱠ ᱠᱨᱮᱰᱤᱴ ᱧᱟᱢ ᱢᱮ᱾',
          cta: 'ᱮᱠᱟᱰᱮᱢᱤᱠ ᱞᱮᱵᱽ ᱵᱚᱞᱚᱱ ᱢᱮ',
        },
        industry: {
          label: 'ᱠᱟᱹᱨᱜᱟᱲ',
          tag: 'ᱠᱟᱹᱨᱜᱟᱲ ᱜᱚᱲᱚ',
          name: 'ᱠᱟᱹᱨᱜᱟᱲ ᱯᱳᱨᱴᱟᱞ',
          desc: 'ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱞᱟᱹᱜᱤᱫ CSR ᱴᱟᱠᱟ ᱮᱢ ᱢᱮ ᱟᱨ ᱱᱟᱣᱟ ટેક્ᱱᱳᱞᱳᱡᱤ ᱦᱟᱛᱟᱣ ᱢᱮ᱾',
          cta: 'ᱠᱟᱹᱨᱜᱟᱲ ᱰᱮᱥᱠ ᱡᱷᱤᱡ ᱢᱮ',
        },
        govt: {
          label: 'ᱥᱚᱨᱠᱟᱨ',
          tag: 'ᱥᱚᱨᱠᱟᱨ ᱥᱟᱥᱚᱱ',
          name: 'ᱥᱚᱨᱠᱟᱨ ᱯᱳᱨᱴᱟᱞ',
          desc: 'ᱯᱚᱱᱚᱛ ᱨᱮᱱᱟᱜ ᱡᱚᱛᱚ ᱠᱟᱹᱢᱤ ᱧᱮᱞ ᱢᱮ, ᱥᱚᱞᱦᱮ ᱯᱚᱨᱢᱟᱬ ᱢᱮ ᱟᱨ ᱯᱷᱟᱱᱰ ᱨᱤᱞᱤᱡᱽ ᱢᱮ᱾',
          cta: 'ᱥᱚᱨᱠᱟᱨ ᱠᱚᱱᱴᱨᱳᱞ ᱨᱩᱢ',
        },
      },
    },
  };

  const curr = greetings[language] || greetings.en;

  const roleCardData = [
    {
      id: 'citizen' as const,
      roleKey: 'citizen' as const,
      icon: Users,
      iconColor: 'text-blue-700 bg-blue-50 border-blue-200',
      badgeBg: 'bg-blue-50 text-blue-900 border-blue-200',
      href: '/dashboard',
      info: curr.roles.citizen,
    },
    {
      id: 'university' as const,
      roleKey: 'university' as const,
      icon: GraduationCap,
      iconColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      href: '/university/dashboard',
      info: curr.roles.university,
    },
    {
      id: 'industry' as const,
      roleKey: 'industry' as const,
      icon: Building2,
      iconColor: 'text-amber-800 bg-amber-50 border-amber-300',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
      href: '/industry/dashboard',
      info: curr.roles.industry,
    },
    {
      id: 'govt' as const,
      roleKey: 'government' as const,
      icon: Landmark,
      iconColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      href: '/government/dashboard',
      info: curr.roles.govt,
    },
  ];

  const handleDirectRoleLogin = (roleKey: 'citizen' | 'university' | 'industry' | 'government') => {
    const mockUser: MockUser = MOCK_ACCOUNTS[roleKey];
    saveActiveSession(mockUser);
    window.location.href = mockUser.targetDashboard;
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* 1. LAYERED GRADIENT & STATIC VECTOR ILLUSTRATION BACKGROUND */}
      <HeroBackgroundSvg />

      {/* 2. FOREGROUND CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between p-4 sm:p-6 md:p-8">
        {/* TOP BAR: Government Emblem & High-Contrast Language Toggle */}
        <header className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 pt-2">
          {/* Official Govt of Jharkhand Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-950/80 border border-blue-400/40 flex items-center justify-center shadow-md backdrop-blur-md">
              <span className="text-lg sm:text-xl" role="img" aria-label="Govt of Jharkhand">🏛️</span>
            </div>
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-900/60 to-[#7C2D12]/40 border border-[#EA580C]/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-200">
                  {language === 'hi'
                    ? 'झारखंड सरकार • डीएचटीई'
                    : language === 'sat'
                    ? 'Jharkhand Sarkar • DHTE'
                    : 'Govt. of Jharkhand • DHTE'}
                </span>
              </div>
              <p className="text-[10px] text-blue-200 hidden sm:block font-semibold mt-0.5">
                {language === 'hi'
                  ? 'उच्च एवं तकनीकी शिक्षा विभाग'
                  : language === 'sat'
                  ? 'Department of Higher & Technical Education'
                  : 'Department of Higher & Technical Education'}
              </p>
            </div>
          </div>

          {/* High-Contrast WCAG AA Language Toggle Capsule */}
          <nav aria-label="Language selector">
            <div className="bg-[#061933]/90 border border-blue-400/40 shadow-xl p-1 rounded-xl flex space-x-1 text-xs font-bold backdrop-blur-md">
              {(['en', 'hi', 'sat'] as const).map((l) => {
                const isActive = language === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 rounded-lg transition-all text-xs font-extrabold focus:outline-hidden focus:ring-2 focus:ring-blue-400 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-300'
                        : 'text-slate-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'ᱥᱟᱱᱛᱟᱲᱤ'}
                  </button>
                );
              })}
            </div>
          </nav>
        </header>

        {/* MAIN CENTER HERO CONTAINER */}
        <main className="w-full max-w-6xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
          {!showLogin ? (
            /* STEP 1: Hero Identity, CTAs & 4 Role-Selection Cards */
            <div className="w-full flex flex-col items-center space-y-8 sm:space-y-10">
              {/* Primary Identity: JAGRIT Wordmark with WCAG AA Contrast on Deep Navy */}
              <div className="space-y-3 max-w-3xl">
                {/* Authentic Sohrai/Khovar Earth Palette Johar Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7C2D12]/80 via-[#9A3412]/70 to-[#7C2D12]/80 border border-[#EA580C]/50 text-[#FED7AA] text-xs font-extrabold backdrop-blur-sm shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#FDBA74] animate-pulse" />
                  <span>{curr.greeting} • {curr.sub}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                  <span>{curr.title}</span>
                  <span className="text-amber-300 text-3xl sm:text-5xl font-extrabold font-serif">
                    {curr.titleDevanagari}
                  </span>
                </h1>

                <p className="text-sm sm:text-base font-bold text-sky-100 leading-snug px-2">
                  {curr.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto px-4 font-normal">
                  {curr.description}
                </p>
              </div>

              {/* PRIMARY ACTION BUTTONS: "Enter Portal" and "Report via WhatsApp" */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md pt-1">
                {/* Enter Portal Button (High-Contrast Primary CTA) */}
                <button
                  onClick={handleOpenLogin}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold px-8 py-3.5 min-h-[48px] rounded-2xl shadow-xl shadow-blue-950/50 text-sm sm:text-base border border-blue-400/40 transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-300"
                >
                  <span>{curr.enterPortal}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                {/* Report via WhatsApp Button (High-Contrast Civic WhatsApp CTA) */}
                <Link
                  href="/whatsapp-simulator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold px-7 py-3.5 min-h-[48px] rounded-2xl shadow-xl shadow-emerald-950/40 text-sm sm:text-base border border-emerald-400/40 transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{curr.reportWhatsapp}</span>
                </Link>
              </div>

              {/* SECTION: 4 STAKEHOLDER ROLE-SELECTION CARDS */}
              {/* Situated in a smooth gradient transition zone with a lighter navy/blue-tinted background */}
              <div className="w-full pt-6 sm:pt-8">
                <div className="relative rounded-3xl p-5 sm:p-7 bg-blue-950/40 border border-blue-400/25 backdrop-blur-xs shadow-2xl">
                  {/* Transition Heading with Balanced Divider and Subtle Sohrai Terracotta Accent */}
                  <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#EA580C]/40 to-sky-400/20 flex-1 max-w-[120px]" />
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-sky-100 bg-blue-900/80 px-4 py-1.5 rounded-full border border-sky-400/30 shadow-md backdrop-blur-md">
                      {curr.stakeholderHeading}
                    </span>
                    <div className="h-px bg-gradient-to-l from-transparent via-[#EA580C]/40 to-sky-400/20 flex-1 max-w-[120px]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">
                    {roleCardData.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.id}
                          className="bg-white hover:bg-blue-50/60 border-2 border-blue-200/90 hover:border-blue-500 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                          onClick={() => handleDirectRoleLogin(card.roleKey)}
                        >
                          <div className="space-y-3">
                            {/* Card Header: Icon & Category Tag */}
                            <div className="flex items-center justify-between gap-2">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.iconColor} group-hover:scale-110 transition-transform shadow-2xs`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${card.badgeBg}`}>
                                {card.info.tag}
                              </span>
                            </div>

                            {/* Card Title (WCAG AAA contrast on white: 18.5:1) */}
                            <div>
                              <h2 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                                {card.info.name}
                              </h2>
                              {/* Card Body (WCAG AAA contrast on white: 9.5:1) */}
                              <p className="text-xs text-slate-700 leading-relaxed font-medium mt-1">
                                {card.info.desc}
                              </p>
                            </div>
                          </div>

                          {/* Direct Fast-Pass Action Button */}
                          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-blue-800">
                            <span>{card.info.cta}</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: 4-ROLE CREDENTIAL LOGIN & FAST-PASS PANEL WITH FULL MULTILINGUAL FIDELITY */
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-300 shadow-2xl text-left space-y-5 max-w-md mx-auto w-full backdrop-blur-md">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCloseLogin}
                  className="text-xs text-slate-600 hover:text-blue-700 flex items-center gap-1 font-bold transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" /> {t.sso.back}
                </button>
                <span className="text-xs font-black text-blue-950 uppercase tracking-wider">
                  {t.sso.ssoTitle}
                </span>
              </div>

              {/* 4 Role Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {[
                  { id: 'citizen' as const, label: t.sso.tabs.citizen, icon: Users },
                  { id: 'university' as const, label: t.sso.tabs.university, icon: GraduationCap },
                  { id: 'industry' as const, label: t.sso.tabs.industry, icon: Building2 },
                  { id: 'govt' as const, label: t.sso.tabs.govt, icon: Landmark },
                ].map((item) => {
                  const Icon = item.icon;
                  const isCurrentRole = role === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setRole(item.id)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                        isCurrentRole
                          ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                          : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Credential Inputs */}
              <form
                className="space-y-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const targetRole = role === 'govt' ? 'government' : role;
                  handleDirectRoleLogin(targetRole);
                }}
              >
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    {t.sso.fieldLabels[role]}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.sso.placeholders[role]}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    {t.sso.passwordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    defaultValue="••••••••"
                    placeholder={t.sso.passwordPlaceholder}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden font-medium text-slate-900 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2 flex items-center justify-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                >
                  <span>{t.sso.signInBtn}</span>
                </button>
              </form>

              {/* 1-Click Fast-Pass for Evaluators & Judges */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                  {t.sso.fastPassHeading}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => handleDirectRoleLogin('citizen')}
                    className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-800 border border-slate-200 hover:border-blue-300 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1"
                  >
                    {t.sso.fastPassRoles.citizen}
                  </button>
                  <button
                    onClick={() => handleDirectRoleLogin('university')}
                    className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-800 border border-slate-200 hover:border-blue-300 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1"
                  >
                    {t.sso.fastPassRoles.university}
                  </button>
                  <button
                    onClick={() => handleDirectRoleLogin('industry')}
                    className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-800 border border-slate-200 hover:border-blue-300 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1"
                  >
                    {t.sso.fastPassRoles.industry}
                  </button>
                  <button
                    onClick={() => handleDirectRoleLogin('government')}
                    className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-800 border border-slate-200 hover:border-blue-300 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1"
                  >
                    {t.sso.fastPassRoles.govt}
                  </button>
                  <Link
                    href="/progress"
                    className="col-span-2 p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>📊</span>
                    <span>{t.sso.trackerBtn}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* OFFICIAL FOOTER: Clear Civic Attribution with High Contrast */}
        <footer className="w-full text-center py-3">
          <p className="text-[11px] font-bold text-sky-200/80 tracking-wide">
            {language === 'hi'
              ? 'उच्च एवं तकनीकी शिक्षा विभाग • झारखंड सरकार • जागृत नागरिक मंच'
              : language === 'sat'
              ? 'Department of Higher & Technical Education • Jharkhand Sarkar • JAGRIT Civic Gateway'
              : 'Department of Higher & Technical Education • Government of Jharkhand • JAGRIT Civic Gateway'}
          </p>
        </footer>
      </div>
    </div>
  );
}
