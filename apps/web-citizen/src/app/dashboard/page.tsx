'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/lib/translations';
import GrievanceStepper from '@/components/GrievanceStepper';
import BreakdownAlarmModal from '@/components/BreakdownAlarmModal';
import HotChallengesFeed, { challengeFeedTranslations } from '@/components/HotChallengesFeed';
import { triggerBreakdownAlarm, upvoteChallenge } from '@/services/api';
import {
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  ThumbsUp,
  AlertTriangle,
  MapPin,
  IndianRupee,
  Layers,
  Building2,
  Sparkles,
  Compass,
  Radio,
  ChevronRight,
  TrendingUp,
  Mic,
  Camera,
  MessageCircle,
  BadgeCheck,
} from 'lucide-react';

const SpatialRadarMap = dynamic(() => import('@/components/spatial-radar-map'), { ssr: false });

export interface ChallengeItem {
  id: string;
  titleHi: string;
  titleSat: string;
  titleEn: string;
  category: 'drinking_water' | 'electricity' | 'agriculture' | 'road_drainage' | 'education';
  location: string;
  distanceKm: number;
  status: 'PENDING_HITL' | 'ROUTED_CIVIC' | 'OPEN_FOR_BIDS' | 'DYNAMIC_HACKATHON' | 'IN_PILOT' | 'RESOLVED';
  upvotes: number;
  date: string;
  daysLeft: number;
  aiFit: number;
  grantAmount: string;
  assignedHei?: string;
  thumbnailEmoji: string;
}

const MOCK_CHALLENGES: ChallengeItem[] = [
  {
    id: 'JAG-2026-PAL-0052',
    titleHi: 'पलामू ज़िला: बोरवेल भूजल में अत्यधिक फ्लोराइड संदूषण',
    titleSat: 'ᱯᱟᱞᱟᱢᱩ ᱦᱚᱱᱚᱛ ᱫᱟᱜ ᱨᱮ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱮᱴᱠᱮᱴᱚᱬᱮ',
    titleEn: 'Palamu District: High Fluoride in Borewell Water',
    category: 'drinking_water',
    location: 'Palamu, Satbarwa Block',
    distanceKm: 2.4,
    status: 'IN_PILOT',
    upvotes: 142,
    date: '12 Sep 2026',
    daysLeft: 4,
    aiFit: 94,
    grantAmount: '₹3,50,000',
    assignedHei: 'BIT Mesra (Civil & Environmental Eng.)',
    thumbnailEmoji: '🚰',
  },
  {
    id: 'JAG-2026-KHU-0034',
    titleHi: 'खूंटी ज़िला: लाह उपज में तुड़ाई उपरांत सड़न एवं फंगस क्षति',
    titleSat: 'ᱠᱷᱩᱸᱴᱤ ᱦᱚᱱᱚᱛ ᱞᱟᱦᱟ ᱵᱟᱹᱲᱤᱡ ᱮᱴᱠᱮᱴᱚᱬᱮ',
    titleEn: 'Khunti District: Post-Harvest Spoilage in Lac Produce',
    category: 'agriculture',
    location: 'Khunti, Murhu Block',
    distanceKm: 3.8,
    status: 'OPEN_FOR_BIDS',
    upvotes: 98,
    date: '10 Sep 2026',
    daysLeft: 6,
    aiFit: 91,
    grantAmount: '₹4,20,000',
    assignedHei: 'Birsa Agricultural University (BAU)',
    thumbnailEmoji: '🌾',
  },
  {
    id: 'JAG-2026-WSH-0071',
    titleHi: 'चाईबासा: ग्रामीण स्वास्थ्य उपकेंद्र में सोलर माइक्रोग्रिड वोल्टेज ड्रॉप',
    titleSat: 'ᱪᱟᱭᱵᱟᱥᱟ ᱦᱟᱥᱯᱟᱛᱟᱞ ᱥᱮᱸᱜᱮᱞ ᱵᱤᱡᱞᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱠᱷᱟᱹᱢᱤ',
    titleEn: 'Chaibasa: Solar Microgrid Voltage Drop in Rural Health Centre',
    category: 'electricity',
    location: 'West Singhbhum, Chaibasa',
    distanceKm: 4.6,
    status: 'DYNAMIC_HACKATHON',
    upvotes: 115,
    date: '08 Sep 2026',
    daysLeft: 3,
    aiFit: 96,
    grantAmount: '₹2,80,000',
    assignedHei: 'NIT Jamshedpur',
    thumbnailEmoji: '⚡',
  },
  {
    id: 'JAG-2026-RAN-0104',
    titleHi: 'कांके वार्ड 4 में चापाकल मरम्मत एवं बोरवेल गाद निकासी',
    titleSat: 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱟᱸᱠᱮ',
    titleEn: 'Handpump Repair and Borewell Desilting in Kanke Ward 4',
    category: 'drinking_water',
    location: 'Ranchi, Kanke Panchayat',
    distanceKm: 1.2,
    status: 'OPEN_FOR_BIDS',
    upvotes: 42,
    date: '12 Sep 2026',
    daysLeft: 8,
    aiFit: 88,
    grantAmount: '₹1,50,000',
    assignedHei: 'BIT Mesra',
    thumbnailEmoji: '🚰',
  },
  {
    id: 'JAG-2026-RAN-0042',
    titleHi: 'अनगड़ा प्राथमिक विद्यालय छत सौर पैनल एवं वर्षा जल संचयन',
    titleSat: 'ᱤᱥᱠᱩᱞ ᱚᱲᱟᱜ ᱢᱟᱨᱟᱢᱚᱛ ᱟᱱᱜᱟᱲᱟ',
    titleEn: 'Angara Primary School Solar Roof and Rainwater Harvesting',
    category: 'education',
    location: 'Ranchi, Angara Block',
    distanceKm: 22.0,
    status: 'RESOLVED',
    upvotes: 114,
    date: '24 Aug 2026',
    daysLeft: 0,
    aiFit: 98,
    grantAmount: '₹2,50,000',
    assignedHei: 'Ranchi University',
    thumbnailEmoji: '🏫',
  },
];

const toHindiNumerals = (val: number | string): string => {
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(val).replace(/[0-9]/g, (d) => hindiDigits[Number(d)]);
};

const getLocalizedDate = (dateStr: string, lang: Language): string => {
  if (lang === 'hi') {
    return dateStr
      .replace('12 Sep 2026', '१२ सितम्बर २०२६')
      .replace('10 Sep 2026', '१० सितम्बर २०२६')
      .replace('08 Sep 2026', '०८ सितम्बर २०२६')
      .replace('24 Aug 2026', '२४ अगस्त २०२६')
      .replace('11 Sep 2026', '११ सितम्बर २०२६')
      .replace('09 Sep 2026', '०९ सितम्बर २०२६');
  }
  return dateStr;
};

const getLocalizedGrant = (grantStr: string, lang: Language): string => {
  if (lang === 'hi') {
    return toHindiNumerals(grantStr);
  }
  return grantStr;
};

export default function CitizenDashboardPage() {
  const { currentLocation, user } = useCitizen();
  const { language, t } = useLanguage();
  const router = useRouter();
  const [reportedTickets, setReportedTickets] = useState<string[]>(['JAG-2026-PAL-7763']);

  useEffect(() => {
    const storedTickets = localStorage.getItem('jagrit_my_reported_tickets');
    if (!storedTickets) return;

    try {
      const parsedTickets = JSON.parse(storedTickets);
      if (Array.isArray(parsedTickets) && parsedTickets.every((ticket) => typeof ticket === 'string') && parsedTickets.length > 0) {
        setReportedTickets(parsedTickets);
      }
    } catch {
      localStorage.removeItem('jagrit_my_reported_tickets');
    }
  }, []);

  useEffect(() => {
    if (user.role === 'UNIVERSITY' || user.role === 'STUDENT' || user.role === 'FACULTY_PI') {
      router.replace('/university/dashboard');
    } else if (user.role === 'EVALUATOR' || user.role === 'ADMIN' || user.role === 'GOVERNMENT') {
      router.replace('/admin');
    }
  }, [router, user.role]);

  // Filter States
  const [proximityFilter, setProximityFilter] = useState<'<5km' | '<15km' | 'district' | 'state'>('state');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards');
  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);
  const [pilotPaused, setPilotPaused] = useState(false);

  // Optimistic Upvote State
  const [optimisticUpvotes, setOptimisticUpvotes] = useState<Record<string, { count: number; isUpvoted: boolean }>>({});

  const handleOptimisticUpvote = (challengeId: string, initialCount: number) => {
    void upvoteChallenge(challengeId, getCitizenUserHash());
    setOptimisticUpvotes((prev) => {
      const current = prev[challengeId];
      if (current && current.isUpvoted) {
        return {
          ...prev,
          [challengeId]: { count: current.count - 1, isUpvoted: false },
        };
      } else {
        const currentCount = current ? current.count : initialCount;
        return {
          ...prev,
          [challengeId]: { count: currentCount + 1, isUpvoted: true },
        };
      }
    });
  };

  const getCitizenUserHash = () => {
    if (typeof window === 'undefined') return 'citizen-demo';
    const existing = localStorage.getItem('jagrit_citizen_user_hash');
    if (existing) return existing;
    const generated = `citizen-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem('jagrit_citizen_user_hash', generated);
    return generated;
  };

  const filteredChallenges = useMemo(() => {
    return MOCK_CHALLENGES.filter((item) => {
      if (proximityFilter === '<5km' && item.distanceKm > 5) return false;
      if (proximityFilter === '<15km' && item.distanceKm > 15) return false;

      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          item.titleHi.toLowerCase().includes(q) ||
          item.titleEn.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q);
        if (!matchTitle) return false;
      }

      return true;
    });
  }, [proximityFilter, selectedCategory, searchQuery]);

  const renderStatusBadge = (status: ChallengeItem['status']) => {
    const statusLabels: Record<ChallengeItem['status'], { en: string; hi: string; sat: string }> = {
      PENDING_HITL: {
        en: 'Pending Expert Evaluation',
        hi: 'विशेषज्ञ मूल्यांकन लंबित',
        sat: 'Goroic Nel Baki',
      },
      OPEN_FOR_BIDS: {
        en: t.openBids,
        hi: t.openBids,
        sat: t.openBids,
      },
      DYNAMIC_HACKATHON: {
        en: 'Active Hackathon Solution',
        hi: 'सक्रिय हैकाथॉन समाधान',
        sat: 'Hackathon Hal Chalu',
      },
      IN_PILOT: {
        en: t.fieldTesting,
        hi: t.fieldTesting,
        sat: t.fieldTesting,
      },
      RESOLVED: {
        en: 'Resolved & Approved',
        hi: 'स्वीकृत एवं पूर्ण',
        sat: 'Hal Sari Ena',
      },
      ROUTED_CIVIC: {
        en: 'Routed to Civic Body',
        hi: 'नगर निकाय को प्रेषित',
        sat: 'Nagar Palika Send',
      },
    };

    const label = statusLabels[status]?.[language] || status;

    switch (status) {
      case 'PENDING_HITL':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-sky-700" />
            <span>{label}</span>
          </span>
        );
      case 'OPEN_FOR_BIDS':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
            <span>{label}</span>
          </span>
        );
      case 'DYNAMIC_HACKATHON':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{label}</span>
          </span>
        );
      case 'IN_PILOT':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-blue-700" />
            <span>{label}</span>
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-blue-700" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full text-[11px] font-bold">
            {label}
          </span>
        );
    }
  };

  const getLocalizedTitle = (item: ChallengeItem) => {
    if (language === 'hi') return item.titleHi;
    if (language === 'sat') return item.titleSat;
    return item.titleEn;
  };

  const getLocalizedLocation = (loc: string) => {
      const map: Record<string, Record<Language, string>> = {
        'Palamu, Satbarwa Block': { en: 'Palamu, Satbarwa Block', hi: 'पलामू, सतबरवा प्रखंड', sat: 'ᱯᱟᱞᱟᱢᱩ, ᱥᱟᱛᱵᱟᱨᱣᱟ ᱵᱞᱚᱠ' },
        'Khunti, Murhu Block': { en: 'Khunti, Murhu Block', hi: 'खूंटी, मुरहू प्रखंड', sat: 'ᱠᱷᱩᱸᱴᱤ, ᱢᱩᱨᱦᱩ ᱵᱞᱚᱠ' },
        'West Singhbhum, Chaibasa': { en: 'West Singhbhum, Chaibasa', hi: 'पश्चिमी सिंहभूम, चाईबासा', sat: 'ᱯᱟᱹᱪᱷᱤᱢ ᱥᱤᱝᱵᱷᱩᱢ, ᱪᱟᱭᱵᱟᱥᱟ' },
        'Ranchi, Kanke Panchayat': { en: 'Ranchi, Kanke Panchayat', hi: 'राँची, कांके पंचायत', sat: 'ᱨᱟᱸᱪᱤ, ᱠᱟᱸᱠᱮ ᱯᱟᱧᱪᱟᱭᱟᱛ' },
        'Ranchi, Angara Block': { en: 'Ranchi, Angara Block', hi: 'राँची, अनगड़ा प्रखंड', sat: 'ᱨᱟᱸᱪᱤ, ᱟᱝᱜᱟᱲᱟ ᱵᱞᱚᱠ' },
      };
      return map[loc]?.[language] || loc;
  };

  const getLocalizedHei = (hei?: string) => {
    if (!hei) return '';
    if (language === 'hi') {
      const map: Record<string, string> = {
        'BIT Mesra (Civil & Environmental Eng.)': 'बीआईटी मेसरा (सिविल एवं पर्यावरण इंजीनियरिंग)',
        'Birsa Agricultural University (BAU)': 'बिरसा कृषि विश्वविद्यालय (बीएयू)',
        'NIT Jamshedpur': 'एनआईटी जमशेदपुर',
        'BIT Mesra': 'बीआईटी मेसरा',
        'Ranchi University': 'राँची विश्वविद्यालय',
      };
      return map[hei] || hei;
    }
    return hei;
  };

  const categories = [
    {
      id: 'ALL',
      label: { en: 'All Categories', hi: 'सभी श्रेणियाँ', sat: 'ᱡᱚᱛᱚ ᱥᱨᱮᱬᱤ' },
    },
    {
      id: 'WATER',
      label: { en: 'Water Resources', hi: 'पेयजल एवं चापाकल', sat: 'ᱫᱟᱜ ᱥᱚᱢᱯᱟᱛ' },
    },
    {
      id: 'AGRICULTURE',
      label: { en: 'Agriculture & Lac', hi: 'कृषि एवं वनोपज', sat: 'ᱠᱨᱤᱥᱤ ᱟᱨ ᱞᱟᱦᱟ' },
    },
    {
      id: 'ENERGY',
      label: { en: 'Clean Energy & Solar', hi: 'सौर एवं विद्युत', sat: 'ᱥᱟᱯᱷᱟ ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱥᱳᱞᱟᱨ' },
    },
    {
      id: 'HEALTH',
      label: { en: 'Health & Sanitation', hi: 'स्वास्थ्य एवं स्वच्छता', sat: 'ᱦᱟᱥᱯᱟᱛᱟᱞ ᱟᱨ ᱥᱟᱯᱷᱟᱭ' },
    },
  ];

  return (
    <div className="space-y-6 pb-24 relative max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <span>🌐</span>
            <span>{t.gridBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.heading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {t.subheading}
          </p>
        </div>

      </div>

      {/* Primary citizen intake actions */}
      <section aria-labelledby="primary-intake-heading" className="grid gap-5 lg:grid-cols-2">
        <article className="group relative overflow-hidden rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white shadow-xl shadow-emerald-950/20 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-8 border-emerald-300/20 ring-8 ring-emerald-300/10 animate-pulse" />
          <div className="relative flex min-h-[330px] flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-950/30 ring-8 ring-emerald-300/20">
                  <Mic className="h-8 w-8" aria-hidden="true" />
                </div>
                <Camera className="h-9 w-9 text-emerald-200" aria-hidden="true" />
              </div>
              <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-100">Voice + photo</span>
            </div>
            <div className="mt-8 flex-1">
              <h2 id="primary-intake-heading" className="max-w-xl text-2xl font-black leading-tight sm:text-3xl">Report a Village Problem (आवाज़ या फोटो से समस्या दर्ज करें)</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50/85">Speak a 20-second voice note in Hindi/Santhali or upload photo evidence. System extracts GPS coordinates and creates an instant tracking ticket.</p>
            </div>
            <Link href="/report" className="relative inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-base font-black text-emerald-950 shadow-lg transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-200/50 active:scale-[.99]">
              📢 Start Problem Submission <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-3xl border-2 border-[#25D366] bg-gradient-to-br from-[#064e3b] via-[#075e54] to-[#052e2b] p-6 text-white shadow-xl shadow-emerald-950/20 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-8 border-[#25D366]/20 ring-8 ring-[#25D366]/10 animate-pulse" />
          <div className="relative flex min-h-[330px] flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-emerald-950/30 ring-8 ring-[#25D366]/20">
                <MessageCircle className="h-9 w-9 fill-white" aria-hidden="true" />
                <BadgeCheck className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white text-[#128C7E]" aria-label="Verified WhatsApp service" />
              </div>
              <span className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-100">Verified Seva</span>
            </div>
            <div className="mt-8 flex-1">
              <h2 className="text-2xl font-black leading-tight sm:text-3xl">Zero-Barrier WhatsApp Bot (व्हाट्सएप सेवा बॉट)</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50/85">Submit grievances directly through WhatsApp without installing an app. Experience the live conversational state machine with Santhali/Hindi ASR.</p>
            </div>
            <Link href="/whatsapp-simulator" className="relative inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 text-base font-black text-emerald-950 shadow-lg transition hover:bg-[#54df82] focus:outline-none focus:ring-4 focus:ring-emerald-200/50 active:scale-[.99]">
              💬 Open WhatsApp Seva Bot <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </section>

      {/* 1. Metric Strip: Clean White Cards with Large Bold Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Resolved */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.resolvedTitle}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              {t.resolvedCount}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.resolvedSub}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.resolvedDesc}
            </p>
          </div>
        </div>

        {/* Metric 2: Active Solving */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.activeTitle}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              {t.activeCount}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.activeSub}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.activeDesc}
            </p>
          </div>
        </div>

        {/* Metric 3: Escrow Funds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.escrowTitle}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
              {t.escrowAmt}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.escrowSub}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.escrowDesc}
            </p>
          </div>
        </div>
      </div>

      <GrievanceStepper ticketId={reportedTickets[reportedTickets.length - 1]} paused={pilotPaused} />

      <section className="flex flex-col items-start justify-between gap-4 rounded-3xl border-2 border-red-200 bg-red-50 p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div>
          <h2 className="mt-1 text-lg font-black text-red-950">Is the field pilot not working?</h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-red-900/80">Report a machine breakdown immediately so verified citizen signals can freeze the resolution clock.</p>
        </div>
        <button type="button" onClick={() => setBreakdownModalOpen(true)} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-700 px-5 text-sm font-black text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500">🚨 Report Machine Breakdown / Kharab Ho Gaya</button>
      </section>

      {/* 2. Challenges Near You */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <span className="text-base">🔥</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {t.problemsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.problemsSub}
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95 ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{challengeFeedTranslations.filters.cards[language]}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('radar')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95 ${
                viewMode === 'radar'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{challengeFeedTranslations.filters.radar[language]}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Proximity Filter Pills (>= 48px touch targets) */}
          <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              {t.rangeLabel}
            </span>
            <button
              type="button"
              onClick={() => setProximityFilter('<5km')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                proximityFilter === '<5km'
                  ? 'bg-blue-700 text-white shadow-sm font-black'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {challengeFeedTranslations.filters.under5[language]}
            </button>
            <button
              type="button"
              onClick={() => setProximityFilter('<15km')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                proximityFilter === '<15km'
                  ? 'bg-blue-700 text-white shadow-sm font-black'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {challengeFeedTranslations.filters.under15[language]}
            </button>
            <button
              type="button"
              onClick={() => setProximityFilter('district')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                proximityFilter === 'district'
                  ? 'bg-blue-700 text-white shadow-sm font-black'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {challengeFeedTranslations.filters.district[language]}
            </button>
            <button
              type="button"
              onClick={() => setProximityFilter('state')}
              className={`px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                proximityFilter === 'state'
                  ? 'bg-blue-700 text-white shadow-sm font-black'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {challengeFeedTranslations.filters.state[language]}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 min-h-[48px] text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-50/50"
            />
          </div>

          {/* Category Dropdown (Strict Single-Language Options) */}
          <div className="flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
              className="w-full lg:w-auto text-xs border border-slate-200 rounded-xl px-4 py-2.5 min-h-[48px] bg-white text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Radar Map View */}
        {viewMode === 'radar' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <SpatialRadarMap
              centerLocation={currentLocation}
              nearbyRadiusMeters={500}
              currentPhotoPreview=""
            />
          </div>
        )}

        {/* Cards Feed View */}
        {viewMode === 'cards' && (
          <>
            <HotChallengesFeed
              activeRange={proximityFilter === '<5km' ? '5' : proximityFilter === '<15km' ? '15' : proximityFilter === 'district' ? 'district' : 'all'}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onUpvote={(ticketId) => { void upvoteChallenge(ticketId, getCitizenUserHash()); }}
            />
            <div className="hidden">
            {filteredChallenges.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <AlertTriangle className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">
                  {language === 'hi'
                    ? 'इस फ़िल्टर में कोई समस्या नहीं मिली'
                    : language === 'sat'
                    ? 'ᱪᱮᱫ ᱦᱚᱸ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱟᱝ ᱧᱟᱢ ᱮᱱᱟ'
                    : 'No problems match this filter'}
                </h3>
              </div>
            ) : (
              filteredChallenges.map((item) => {
                const optState = optimisticUpvotes[item.id];
                const currentCount = optState ? optState.count : item.upvotes;
                const isUpvoted = optState ? optState.isUpvoted : false;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                  >
                    {/* Top Row: Category Badge, Distance Pill, Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                          {item.id}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>{language === 'hi' ? `${toHindiNumerals(item.distanceKm)} किमी` : `${item.distanceKm} km`}</span>
                        </span>
                      </div>
                      <div>{renderStatusBadge(item.status)}</div>
                    </div>

                    {/* Card Content & Thumbnail */}
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                        {item.thumbnailEmoji}
                      </div>

                      <div className="space-y-0.5 flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug line-clamp-1">
                          {getLocalizedTitle(item)}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 truncate">
                          {getLocalizedLocation(item.location)} • {getLocalizedDate(item.date, language)}
                        </p>
                      </div>
                    </div>

                    {/* Vital Metrics: ⏱️ Days Left | 🧠 AI Fit | ₹ Grant */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.timeline}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          ⏱️ {language === 'hi' ? `${toHindiNumerals(item.daysLeft)} दिन शेष` : language === 'sat' ? `${item.daysLeft} Maha Baki` : `${item.daysLeft} Days Left`}
                        </span>
                      </div>
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.aiMatch}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          🧠 {language === 'hi' ? `एआई मिलान: ${toHindiNumerals(item.aiFit)}%` : language === 'sat' ? `AI Milaw: ${item.aiFit}%` : `AI Fit: ${item.aiFit}%`}
                        </span>
                      </div>
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.grant}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          {getLocalizedGrant(item.grantAmount, language)}
                        </span>
                      </div>
                    </div>

                    {/* Assigned HEI Partner */}
                    {item.assignedHei && (
                      <div className="text-[11px] bg-slate-50 text-slate-700 p-2 rounded-xl border border-slate-100 flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {t.heiPartner}
                        </span>
                        <span className="truncate">{getLocalizedHei(item.assignedHei)}</span>
                      </div>
                    )}

                    {/* Bottom Action Row */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{getLocalizedLocation(item.location)}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* View Progress Dashboard Button */}
                        <Link
                          href={`/dashboard/progress/${item.id === 'JAG-2026-PAL-0052' ? 'JAG-4102' : item.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 transition-all active:scale-95 shadow-2xs"
                        >
                          <span>
                            {language === 'hi'
                              ? 'प्रगति देखें'
                              : language === 'sat'
                              ? 'ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞ'
                              : 'View Progress'}
                          </span>
                        </Link>

                        {/* Optimistic Upvote Button (>= 48px touch target) */}
                        <button
                          type="button"
                          onClick={() => handleOptimisticUpvote(item.id, item.upvotes)}
                          className={`inline-flex items-center space-x-1.5 px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                            isUpvoted
                              ? 'bg-blue-700 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <ThumbsUp
                            className={`w-4 h-4 ${
                              isUpvoted ? 'fill-white' : 'text-slate-600'
                            }`}
                          />
                          <span>{isUpvoted ? t.upvotedBtn : t.upvoteBtn}</span>
                          <span className="text-[11px] opacity-80">
                            ({language === 'hi' ? toHindiNumerals(currentCount) : currentCount})
                          </span>
                        </button>

                        <Link
                          href="/time-machine"
                          className="inline-flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-xl text-slate-400 hover:text-blue-700 hover:bg-slate-100 active:scale-95 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </>
        )}
      </div>
      <BreakdownAlarmModal
        open={breakdownModalOpen}
        onClose={() => setBreakdownModalOpen(false)}
        onConfirm={(reason) => {
          void triggerBreakdownAlarm('JAG-4102', reason);
          setPilotPaused(true);
          setBreakdownModalOpen(false);
        }}
      />
    </div>
  );
}
