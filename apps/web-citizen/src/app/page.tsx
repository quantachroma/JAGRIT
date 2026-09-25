'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import HeroBackgroundSvg from '@/components/hero/hero-background-svg';
import HeroCarousel from '@/components/HeroCarousel';
import { MOCK_ACCOUNTS, saveActiveSession, type MockUser } from '@/lib/mock-auth';
import {
  Users,
  GraduationCap,
  Building2,
  Landmark,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  MessageSquareText,
  BrainCircuit,
  Vote,
  LockKeyhole,
} from 'lucide-react';

const civicPillars = [
  { eyebrow: '3 LANGUAGES AT LAUNCH (English, Hindi, Santhali)', title: 'Every voice becomes a research brief.', description: 'Speak in Santhali or Hindi, send a photo, or use WhatsApp. JAGRIT turns lived experience into a location-verified problem statement.', accent: 'from-[#075985] via-[#0e7490] to-[#164e63]', icon: 'voice' as const, stat: '3', statLabel: 'languages at launch' },
  { eyebrow: 'STATEWIDE HEI INNOVATION NETWORK', title: 'The right campus for every challenge.', description: 'AI-assisted capability matching connects validated village problems to researchers across all 42+ universities, engineering colleges, polytechnics, and ITIs across Jharkhand.', accent: 'from-[#9a3412] via-[#c2410c] to-[#7c2d12]', icon: 'research' as const, stat: '42+', statLabel: 'higher education institutions' },
  { eyebrow: '03 / Public trust', title: 'Progress is visible. Funding is earned.', description: 'Dual-lock citizen quorum and PESA Gram Sabha verification release milestone escrow in a clear 30% / 40% / 30% sequence.', accent: 'from-[#166534] via-[#15803d] to-[#14532d]', icon: 'quorum' as const, stat: '30·40·30', statLabel: 'escrow tranches' },
];

export default function EntryPage() {
  const { language, setLanguage, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState<'citizen' | 'university' | 'industry' | 'govt'>('citizen');
  const [isRegistering, setIsRegistering] = useState(false);
  const [dpdpConsent, setDpdpConsent] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [regOtp, setRegOtp] = useState('');
  const [regError, setRegError] = useState('');
  const [password, setPassword] = useState('');

  const lifecycleSteps = [
    {
      number: '01',
      timing: 'VILLAGE VOICE',
      title: '1. Report the Problem (Day 0)',
      description:
        'A villager speaks a short voice note or takes a photo on WhatsApp or Web in Hindi, Santhali, or English. No app download needed.',
      icon: MessageSquareText,
      accent: 'border-cyan-300/40 bg-cyan-300/[0.07] text-cyan-200',
      detail: 'Voice, photo, local language',
    },
    {
      number: '02',
      timing: 'INSTANT AI CHECK',
      title: '2. AI Filters & Sorts (In 2 Minutes)',
      description:
        'AI removes duplicate reports from nearby areas. Simple tasks (like potholes or garbage) go to the municipal office, while real engineering challenges go to universities.',
      icon: BrainCircuit,
      accent: 'border-blue-300/40 bg-blue-300/[0.07] text-blue-200',
      detail: 'Quick local sorting',
    },
    {
      number: '03',
      timing: 'VILLAGE PRIORITY',
      title: '3. Community Votes & Budget Set (Days 1–3)',
      description:
        'Local residents upvote the issue. The government approves research grant funds, doubled with 1:1 Corporate CSR matching money.',
      icon: Vote,
      accent: 'border-amber-300/40 bg-amber-300/[0.07] text-amber-200',
      detail: 'Community choice and funding',
    },
    {
      number: '04',
      timing: 'UNIVERSITY TEAMS',
      title: '4. Colleges Compete to Solve It',
      description:
        'Colleges across Jharkhand with the right labs bid on the problem. Teams compete in a short hackathon to design the best working solution.',
      icon: GraduationCap,
      accent: 'border-orange-300/40 bg-orange-300/[0.07] text-orange-200',
      detail: 'Teams build and compete',
    },
    {
      number: '05',
      timing: 'SAFE 3-STEP ESCROW',
      title: '5. Lab Certified & Installed in Village',
      description:
        'Funds release safely in 3 steps: 30% for parts, 40% after an independent government lab tests it, and 30% once installed in the village with Gram Sabha permission.',
      icon: LockKeyhole,
      accent: 'border-emerald-300/40 bg-emerald-300/[0.07] text-emerald-200',
      detail: 'Checked, funded, installed',
    },
    {
      number: '06',
      timing: '45-DAY VILLAGE TEST',
      title: '6. 45-Day Test & Final Approval (Day 46)',
      description:
        'The machine runs for 45 days. If it works without breaking, local village trustees vote to approve it, and university students earn NEP 2020 degree credits.',
      icon: ShieldCheck,
      accent: 'border-violet-300/40 bg-violet-300/[0.07] text-violet-200',
      detail: 'Tested and approved locally',
    },
  ];

  const statutoryConcordats = ['NEP 2020', 'Companies Act 2013 · Sec 135', 'PESA Act 1996', 'DPDP Act 2023'];

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam) {
        if (roleParam === 'government' || roleParam === 'govt') {
          setRole('govt');
        } else if (roleParam === 'citizen' || roleParam === 'university' || roleParam === 'industry') {
          setRole(roleParam);
        }
      }
      if (params.get('login') === 'true' || params.get('auth') === 'sso' || roleParam) {
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

  const handleSelectRolePortal = (selectedRole: 'citizen' | 'university' | 'industry' | 'govt') => {
    setRole(selectedRole);
    setShowLogin(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('login', 'true');
      url.searchParams.set('role', selectedRole);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    setIsRegistering(false);
    setOtpSent(false);
    setRegOtp('');
    setRegError('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      url.searchParams.delete('auth');
      url.searchParams.delete('role');
      url.searchParams.delete('redirect');
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
    // [AUDIT NOTICE: Santhali landing strings flagged for native review. Audit Reference: docs/SANTHALI_TRANSLATION_AUDIT.md]
    sat: {
      greeting: 'ᱡᱚᱦᱟᱨ (Johar)', // [AUDIT FLAG: Mixed Ol Chiki and Latin transliteration]
      sub: 'JAGRIT re sagun daram', // [AUDIT FLAG: Mixed Latin English brand and transliterated Santhali]
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
          desc: 'ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱞᱟᱹᱜᱤᱫ CSR ᱴᱟᱠᱟ ᱮᱢ ᱢᱮ ᱟᱨ ᱱᱟᱣᱟ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ ᱦᱟᱛᱟᱣ ᱢᱮ᱾',
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

  const handleRoleLoginAndNavigate = (roleKey: 'citizen' | 'university' | 'industry' | 'government') => {
    const mockUser: MockUser = MOCK_ACCOUNTS[roleKey];
    saveActiveSession(mockUser);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect');
      if (redirectUrl && redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')) {
        window.location.href = redirectUrl;
        return;
      }
    }
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
              <p className="text-sm font-black tracking-tight text-white sm:text-base">JAGRIT (जाग्रत)</p>
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
            <div className="flex items-center gap-2">
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
            <Link href="/?login=true" className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-amber-300 px-3 text-xs font-black text-slate-950 shadow-lg shadow-amber-950/30 transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-white sm:px-4 sm:text-sm">
              <LockKeyhole className="h-4 w-4" /> Login / Sign Up
            </Link>
            </div>
          </nav>
        </header>

        {/* MAIN CENTER HERO CONTAINER */}
        <main className="w-full max-w-6xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
            <>
              <div className="w-full space-y-10 text-left">
                <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="max-w-3xl">
                    <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">JAGRIT<span className="text-cyan-300">.</span></h1>
                    <p className="mt-5 text-xl font-black leading-tight text-amber-200 sm:text-2xl">समस्या से समाधान तक — Problem se Samadhaan tak</p>
                    <p className="mt-5 max-w-2xl text-xl font-bold leading-tight text-white sm:text-2xl">Jharkhand Academia-Industry Gateway for Research, Innovation &amp; Transformation of Society</p>
                    <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-amber-200">झारखण्ड जन-समस्या नवाचार, शोध एवं सामाजिक परिवर्तन सेतु</p>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-slate-200">A public innovation loop for village voices, university research, accountable funding, and solutions that return to the people who shaped them.</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Link href="/progress" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-300/50 px-5 text-sm font-black text-amber-200 transition-colors hover:bg-amber-300/10 focus:outline-none focus:ring-2 focus:ring-amber-200">🗺️ Explore Statewide Progress <ArrowRight className="h-4 w-4" /></Link>
                      <a href="#lifecycle" onClick={(event) => { event.preventDefault(); document.getElementById('lifecycle')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-black text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300">📜 View 6-Step Lifecycle (Scroll) <ArrowDown className="h-4 w-4" /></a>
                    </div>
                  </div>
                  <div className="hidden justify-end pb-2 lg:flex"><div className="max-w-xs border-l-2 border-amber-300/60 pl-5 text-sm leading-6 text-slate-300"><span className="font-black text-white">A civic operating system for Jharkhand.</span><br />Built around NEP 2020 research credits, local language access, and Gram Sabha verified trust.</div></div>
                </div>
                <HeroCarousel pillars={civicPillars} />
              </div>
              <section id="lifecycle" aria-labelledby="lifecycle-heading" className="mt-20 w-full scroll-mt-8 text-left">
                <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Public process · PRD Section 5</p><h2 id="lifecycle-heading" className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl">A problem should never disappear into a queue.</h2><p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">Every challenge moves through a visible chain of evidence, decisions, and community consent, from first report to field verification.</p></div>
                <div className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <div className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-cyan-300/40 via-amber-300/30 to-violet-300/40 xl:block" />
                  {lifecycleSteps.map((step) => { const Icon = step.icon; return <article key={step.number} className={`relative rounded-2xl border p-6 shadow-xl shadow-black/10 backdrop-blur-sm ${step.accent}`}><div className="flex items-start justify-between gap-4"><span className="font-mono text-3xl font-black text-white/30">{step.number}</span><span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[10px] font-black tracking-wider text-white/70">{step.timing}</span></div><div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/10"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-xl font-black leading-tight text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-slate-200">{step.description}</p><div className="mt-5 border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[0.12em] text-white/65">{step.detail}</div></article>; })}
                </div>
              </section>
              <div className="mt-16 w-full border-t border-white/10 pt-8 text-left"><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Statutory concordats</p><div className="mt-4 flex flex-wrap gap-2">{statutoryConcordats.map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-slate-300">{item}</span>)}</div></div>
              <div className="hidden">
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

              {/* PRIMARY ACTION BUTTONS: "Enter Portal", "Report via WhatsApp", and "Statewide Progress Tracker" */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-2xl pt-1">
                {/* Enter Portal Button (High-Contrast Primary CTA) */}
                <button
                  onClick={handleOpenLogin}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold px-7 py-3.5 min-h-[48px] rounded-2xl shadow-xl shadow-blue-950/50 text-sm sm:text-base border border-blue-400/40 transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-300"
                >
                  <span>{curr.enterPortal}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                {/* Report via WhatsApp Button (High-Contrast Civic WhatsApp CTA) */}
                <Link
                  href="/whatsapp-simulator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold px-6 py-3.5 min-h-[48px] rounded-2xl shadow-xl shadow-emerald-950/40 text-sm sm:text-base border border-emerald-400/40 transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{curr.reportWhatsapp}</span>
                </Link>

                {/* Statewide Progress & Resolution Tracker (Standalone Public CTA) */}
                <Link
                  href="/progress"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 text-white font-extrabold px-6 py-3.5 min-h-[48px] rounded-2xl shadow-xl shadow-blue-950/40 text-sm sm:text-base border border-sky-400/40 transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-sky-300"
                >
                  <span>📊</span>
                  <span>{t.sso.trackerBtn}</span>
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
                          role="button"
                          tabIndex={0}
                          aria-label={`Open SSO login for ${card.info.name}`}
                          className="bg-white hover:bg-blue-50/60 border-2 border-blue-200/90 hover:border-blue-500 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          onClick={() => handleSelectRolePortal(card.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectRolePortal(card.id);
                            }
                          }}
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

                          {/* Action Button: Opens SSO preselecting role */}
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
            </>
            {showLogin ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-8 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-md space-y-4 animate-in zoom-in-95 duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-300 shadow-2xl text-left space-y-5 w-full backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
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
                        type="button"
                        onClick={() => {
                          setRole(item.id);
                          setIsRegistering(false);
                        }}
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

                {/* Dynamic Credential Inputs or Phone OTP Registration */}
                {isRegistering && role === 'citizen' ? (
                  <div className="space-y-3.5 pt-1">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-black text-blue-900">
                        📝 {t.sso.registerHere} (Phone OTP)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering(false);
                          setOtpSent(false);
                          setRegOtp('');
                          setRegError('');
                        }}
                        className="text-[11px] font-bold text-blue-700 hover:underline"
                      >
                        {t.sso.backToSignIn}
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Full Name / पूरा नाम / ᱧᱩᱛᱩᱢ *
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Mahto"
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-slate-900 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        10-Digit Mobile Number / मोबाइल नंबर *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9876543210"
                          className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-slate-900 bg-slate-50/50"
                        />
                        <button
                          type="button"
                          disabled={regPhone.length !== 10}
                          onClick={() => setOtpSent(true)}
                          className="px-3 py-2 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 text-blue-800 rounded-xl text-xs font-bold whitespace-nowrap transition-colors"
                        >
                          {otpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>
                      </div>
                      {otpSent && (
                        <p className="text-[11px] text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>OTP sent to +91 {regPhone}. Demo code: <strong>123456</strong></span>
                        </p>
                      )}
                    </div>

                    {otpSent && (
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          6-Digit OTP / ओटीपी कोड *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={regOtp}
                          onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden font-mono tracking-widest text-slate-900 bg-slate-50/50"
                        />
                      </div>
                    )}

                    <label className="flex items-start gap-2 text-[11px] text-slate-700 select-none cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={dpdpConsent}
                        onChange={(e) => setDpdpConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 h-3.5 w-3.5"
                        required
                      />
                      <span className="leading-tight">
                        {t.sso.dpdpConsentLabel}
                      </span>
                    </label>

                    {regError && (
                      <p className="text-xs text-red-600 font-semibold">{regError}</p>
                    )}

                    <button
                      type="button"
                      disabled={!dpdpConsent || !otpSent || regOtp.length !== 6 || !regName}
                      onClick={() => {
                        if (regOtp !== '123456') {
                          setRegError('Invalid OTP. Use demo OTP: 123456');
                          return;
                        }
                        handleRoleLoginAndNavigate('citizen');
                      }}
                      className={`w-full font-black py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2 flex items-center justify-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-400 ${
                        dpdpConsent && otpSent && regOtp.length === 6 && regName
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98 cursor-pointer'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Complete Citizen Registration ➔</span>
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-3.5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!dpdpConsent) return;
                      const targetRole = role === 'govt' ? 'government' : role;
                      handleRoleLoginAndNavigate(targetRole);
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

                      {/* Format Hints under identity input */}
                      {role === 'citizen' && (
                        <div className="mt-1.5 p-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[10.5px] text-slate-600 space-y-0.5">
                          <p className="font-semibold text-blue-900">{t.sso.formatHints.phone}</p>
                          <p className="font-semibold text-blue-900">{t.sso.formatHints.voterId}</p>
                          <p className="font-semibold text-blue-900">{t.sso.formatHints.aadhaar}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        {t.sso.passwordLabel}
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.sso.passwordPlaceholder}
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden font-medium text-slate-900 bg-slate-50/50"
                      />
                    </div>

                    {/* DPDP Act 2023 Required Consent Checkbox */}
                    <label className="flex items-start gap-2 text-[11px] text-slate-700 select-none cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={dpdpConsent}
                        onChange={(e) => setDpdpConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 h-3.5 w-3.5"
                        required
                      />
                      <span className="leading-tight">
                        {t.sso.dpdpConsentLabel}
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!dpdpConsent}
                      className={`w-full font-black py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2 flex items-center justify-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-400 ${
                        dpdpConsent
                          ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98 cursor-pointer'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <span>{t.sso.signInBtn}</span>
                    </button>

                    {/* Citizen Registration Link */}
                    {role === 'citizen' && (
                      <div className="text-center pt-2">
                        <span className="text-xs text-slate-600">{t.sso.newCitizenPrompt} </span>
                        <button
                          type="button"
                          onClick={() => setIsRegistering(true)}
                          className="text-xs font-bold text-blue-700 hover:underline hover:text-blue-900"
                        >
                          {t.sso.registerHere}
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* SEPARATE VISUALLY DISTINCT DEMO MODE SECTION */}
              <div className="p-4 rounded-2xl bg-amber-50/95 border-2 border-dashed border-amber-300 text-left w-full shadow-md">
                <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black uppercase tracking-wider text-amber-900">
                  <span>{t.sso.demoModeBadge}</span>
                </div>
                <p className="text-[11px] text-amber-800/90 font-medium mb-3">
                  {t.sso.demoModeDesc}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleRoleLoginAndNavigate('citizen')}
                    className="p-2 bg-white hover:bg-amber-100/70 text-blue-900 border border-amber-200 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs"
                  >
                    {t.sso.fastPassRoles.citizen}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleLoginAndNavigate('university')}
                    className="p-2 bg-white hover:bg-amber-100/70 text-blue-900 border border-amber-200 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs"
                  >
                    {t.sso.fastPassRoles.university}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleLoginAndNavigate('industry')}
                    className="p-2 bg-white hover:bg-amber-100/70 text-blue-900 border border-amber-200 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs"
                  >
                    {t.sso.fastPassRoles.industry}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleLoginAndNavigate('government')}
                    className="p-2 bg-white hover:bg-amber-100/70 text-blue-900 border border-amber-200 rounded-xl text-center transition-colors font-extrabold flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs"
                  >
                    {t.sso.fastPassRoles.govt}
                  </button>
                </div>
              </div>
              </div>
            </div>
            ) : null}
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
