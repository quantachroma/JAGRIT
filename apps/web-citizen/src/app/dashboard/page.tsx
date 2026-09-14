'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import SpatialRadarMap from '@/components/spatial-radar-map';
import {
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
} from 'lucide-react';

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

export default function CitizenDashboardPage() {
  const { currentLocation } = useCitizen();
  const { language, t } = useLanguage();

  // Filter States
  const [proximityFilter, setProximityFilter] = useState<'<5km' | '<15km' | 'district'>('<5km');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards');

  // Optimistic Upvote State
  const [optimisticUpvotes, setOptimisticUpvotes] = useState<Record<string, { count: number; isUpvoted: boolean }>>({});

  const handleOptimisticUpvote = (challengeId: string, initialCount: number) => {
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
        en: 'Open for University Bids',
        hi: 'विश्वविद्यालय निविदा हेतु खुला',
        sat: 'University Nel Khula',
      },
      DYNAMIC_HACKATHON: {
        en: 'Active Hackathon Solution',
        hi: 'सक्रिय हैकाथॉन समाधान',
        sat: 'Hackathon Hal Chalu',
      },
      IN_PILOT: {
        en: 'Field Testing',
        hi: 'क्षेत्रीय परीक्षण जारी',
        sat: 'Khet Bidaw Chalu',
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
    if (language === 'hi') {
      const map: Record<string, string> = {
        'Palamu, Satbarwa Block': 'पलामू, सतबरवा प्रखंड',
        'Khunti, Murhu Block': 'खूंटी, मुरहू प्रखंड',
        'West Singhbhum, Chaibasa': 'पश्चिमी सिंहभूम, चाईबासा',
        'Ranchi, Kanke Panchayat': 'राँची, कांके पंचायत',
        'Ranchi, Angara Block': 'राँची, अनगड़ा प्रखंड',
      };
      return map[loc] || loc;
    }
    return loc;
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
      label: t.dashboard.allCategories,
    },
    {
      id: 'drinking_water',
      label:
        language === 'hi'
          ? 'पेयजल एवं चापाकल'
          : language === 'sat'
          ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ'
          : 'Drinking Water and Handpumps',
    },
    {
      id: 'electricity',
      label:
        language === 'hi'
          ? 'विद्युत एवं सौर ऊर्जा'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱞᱤ'
          : 'Electricity and Solar',
    },
    {
      id: 'agriculture',
      label:
        language === 'hi'
          ? 'सिंचाई एवं कृषि तकनीक'
          : language === 'sat'
          ? 'ᱪᱟᱥ-ᱵᱟᱥ'
          : 'Agriculture and Irrigation',
    },
    {
      id: 'road_drainage',
      label:
        language === 'hi'
          ? 'ग्रामीण सड़क एवं नाली'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱨ'
          : 'Roads and Drainage',
    },
    {
      id: 'education',
      label:
        language === 'hi'
          ? 'विद्यालय अधोसंरचना'
          : language === 'sat'
          ? 'ᱤᱥᱠᱩᱞ ᱚᱲᱟᱜ'
          : 'School Infrastructure',
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
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {t.dashboard.subtitle}
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center space-x-2 bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-5 py-3 min-h-[48px] rounded-2xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all self-start sm:self-auto active:scale-95"
        >
          <span>{t.dashboard.reportBtn}</span>
        </Link>
      </div>

      {/* 1. Metric Strip: Clean White Cards with Large Bold Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Resolved */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.dashboard.verifiedQuorum}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              {t.dashboard.resolvedCount}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.dashboard.resolvedLabel}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.dashboard.resolvedSub}
            </p>
          </div>
        </div>

        {/* Metric 2: Active Solving */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.dashboard.universityRnd}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              {t.dashboard.activeCount}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.dashboard.activeLabel}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.dashboard.activeSub}
            </p>
          </div>
        </div>

        {/* Metric 3: Escrow Funds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              {t.dashboard.escrowLedger}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
              {t.dashboard.fundsAmount}
            </div>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {t.dashboard.fundsLabel}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.dashboard.fundsSub}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Challenges Near You */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <span className="text-base">🔥</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {t.dashboard.problemsNearTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.dashboard.problemsNearSubtitle}
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
              <span>{t.dashboard.cardsFeed}</span>
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
              <span>{t.dashboard.radarMap}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Proximity Filter Pills (>= 48px touch targets) */}
          <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              {t.dashboard.range}
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
              {language === 'hi' ? '< ५ किमी' : '< 5 km'}
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
              {language === 'hi' ? '< १५ किमी' : '< 15 km'}
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
              {language === 'hi' ? 'पूरा जिला' : language === 'sat' ? 'Joto Honot' : 'Whole District'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dashboard.searchPlaceholder}
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
                  {c.label}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChallenges.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <AlertTriangle className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">
                  {language === 'hi'
                    ? 'इस फ़िल्टर में कोई समस्या नहीं मिली'
                    : language === 'sat'
                    ? 'ᱪᱮᱫ ᱦᱚᱸ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱟᱝ ᱧᱟᱢ ᱮᱱᱟ'
                    : 'No challenges match this filter'}
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
                          <span>{item.distanceKm} {language === 'hi' ? 'किमी' : 'km'}</span>
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
                          {getLocalizedLocation(item.location)} • {item.date}
                        </p>
                      </div>
                    </div>

                    {/* Vital Metrics: ⏱️ Days Left | 🧠 AI Fit | ₹ Grant */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.dashboard.timeline}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          ⏱️ {item.daysLeft} {t.dashboard.daysLeft}
                        </span>
                      </div>
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.dashboard.aiMatch}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          🧠 {t.dashboard.aiFit} {item.aiFit}%
                        </span>
                      </div>
                      <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-500">{t.dashboard.grant}</span>
                        <span className="text-xs font-black text-blue-900 mt-0.5 block whitespace-nowrap">
                          {item.grantAmount}
                        </span>
                      </div>
                    </div>

                    {/* Assigned HEI Partner */}
                    {item.assignedHei && (
                      <div className="text-[11px] bg-slate-50 text-slate-700 p-2 rounded-xl border border-slate-100 flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {t.dashboard.heiPartner}
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
                          href="/progress/JAG-PLM-0082"
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
                          <span>{isUpvoted ? t.dashboard.upvotedBtn : t.dashboard.upvoteBtn}</span>
                          <span className="text-[11px] opacity-80">({currentCount})</span>
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
        )}
      </div>
    </div>
  );
}
