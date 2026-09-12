'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import SpatialRadarMap from '@/components/spatial-radar-map';
import {
  LayoutDashboard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ThumbsUp,
  AlertTriangle,
  MapPin,
  ArrowRight,
  TrendingUp,
  IndianRupee,
  Layers,
  Building2,
  Sparkles,
  Compass,
  Plus,
  Flame,
  Radio,
  SlidersHorizontal,
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
  descriptionHi: string;
  descriptionEn: string;
  assignedHei?: string;
  thumbnailEmoji: string;
}

const MOCK_CHALLENGES: ChallengeItem[] = [
    {
      id: 'JAG-2026-RAN-0104',
      titleHi: 'कांके वार्ड 4 में चापाकल मरम्मत एवं बोरवेल गाद निकासी',
      titleSat: 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱟᱸᱠᱮ',
      titleEn: 'Handpump Repair & Borewell Desilting in Kanke Ward 4',
      category: 'drinking_water',
      location: 'Ranchi, Kanke Panchayat',
      distanceKm: 1.2,
      status: 'OPEN_FOR_BIDS',
      upvotes: 42,
      date: '12 Sep 2026',
      descriptionHi: 'चापाकल से अत्यधिक मटमैला व फ्लोराइड युक्त पानी निकल रहा है। 45 परिवार प्रभावित हैं।',
      descriptionEn: 'Fluoride and heavy silt contamination in public borewell casing affecting 45 families.',
      assignedHei: 'BIT Mesra (Civil & Environmental Eng.)',
      thumbnailEmoji: '🚰',
    },
    {
      id: 'JAG-2026-RAN-0098',
      titleHi: 'कांके चौक पर सोलर माइक्रोग्रिड बैटरी डिस्चार्ज एवं इन्वर्टर फॉल्ट',
      titleSat: 'ᱥᱮᱸᱜᱮᱞ ᱵᱤᱡᱞᱤ ᱠᱷᱟᱹᱢᱤ ᱠᱟᱸᱠᱮ',
      titleEn: 'Solar Microgrid Battery Depletion at Kanke Chowk',
      category: 'electricity',
      location: 'Ranchi, Kanke Chowk',
      distanceKm: 3.4,
      status: 'DYNAMIC_HACKATHON',
      upvotes: 67,
      date: '10 Sep 2026',
      descriptionHi: 'स्ट्रीट लाइट और कम्युनिटी सेंटर की सोलर बैटरी 2 घंटे में बंद हो रही है।',
      descriptionEn: 'Microgrid battery bank degraded; student hackathon team developing BMS telemetry.',
      assignedHei: 'IIT ISM Dhanbad / NIFFT Ranchi Consortium',
      thumbnailEmoji: '⚡',
    },
    {
      id: 'JAG-2026-RAN-0081',
      titleHi: 'ओरमांझी कृषि चेकडैम डिसिल्टिंग एवं सौर लिफ्ट सिंचाई',
      titleSat: 'ᱫᱟᱜ ᱯᱟᱴᱟᱣ ᱪᱮᱠᱰᱮᱢ ᱳᱨᱢᱟᱧᱡᱷᱤ',
      titleEn: 'Ormanjhi Checkdam Desilting & Solar Lift Irrigation',
      category: 'agriculture',
      location: 'Ranchi, Ormanjhi',
      distanceKm: 9.8,
      status: 'IN_PILOT',
      upvotes: 89,
      date: '05 Sep 2026',
      descriptionHi: '45-दिवसीय परिपक्वता (Maturation) चरण में परीक्षण जारी। ग्राम सभा कोरम सत्यापन खुला है।',
      descriptionEn: '45-day operational maturation pilot active. Gram Sabha quorum voting open.',
      assignedHei: 'Birsa Agricultural University (BAU)',
      thumbnailEmoji: '🌾',
    },
    {
      id: 'JAG-2026-RAN-0074',
      titleHi: 'नगड़ी ग्रामीण संपर्क मार्ग पुलिया जल निकासी मरम्मत',
      titleSat: 'ᱱᱟᱞᱤ ᱟᱨ ᱦᱚᱨ ᱢᱟᱨᱟᱢᱚᱛ ᱱᱟᱜᱽᱨᱤ',
      titleEn: 'Nagri Rural Culvert Drainage & Causeway Repair',
      category: 'road_drainage',
      location: 'Ranchi, Nagri Block',
      distanceKm: 13.5,
      status: 'PENDING_HITL',
      upvotes: 31,
      date: '02 Sep 2026',
      descriptionHi: 'मानसून के कारण पुलिया की नींव में कटाव आ गया है। भारी वाहनों का आवागमन बाधित है।',
      descriptionEn: 'Causeway scour erosion threatening village connectivity. Under HITL evaluation.',
      thumbnailEmoji: '🛣️',
    },
    {
      id: 'JAG-2026-RAN-0042',
      titleHi: 'अनगड़ा प्राथमिक विद्यालय छत सौर पैनल एवं वर्षा जल संचयन',
      titleSat: 'ᱤᱥᱠᱩᱞ ᱚᱲᱟᱜ ᱢᱟᱨᱟᱢᱚᱛ ᱟᱱᱜᱟᱲᱟ',
      titleEn: 'Angara Primary School Solar Roof & Rainwater Harvesting',
      category: 'education',
      location: 'Ranchi, Angara Block',
      distanceKm: 22.0,
      status: 'RESOLVED',
      upvotes: 114,
      date: '24 Aug 2026',
      descriptionHi: 'परियोजना पूर्ण एवं ग्राम सभा पेसा अधिनियम (PESA NOC) द्वारा 100% सत्यापित।',
      descriptionEn: 'Project completed and approved with Gram Sabha PESA Act NOC sign-off.',
      assignedHei: 'Usha Martin University / Ranchi University',
      thumbnailEmoji: '🏫',
    },
    {
      id: 'JAG-2026-DHN-0089',
      titleHi: 'तोपचांची में सोलर माइक्रोग्रिड इन्वर्टर खराबी',
      titleSat: 'ᱥᱮᱸᱜᱮᱞ ᱵᱤᱡᱞᱤ ᱛᱳᱯᱪᱟᱸᱪᱤ',
      titleEn: 'Topchanchi Solar Microgrid Inverter Failure',
      category: 'electricity',
      location: 'Dhanbad, Topchanchi',
      distanceKm: 48.0,
      status: 'DYNAMIC_HACKATHON',
      upvotes: 76,
      date: '18 Aug 2026',
      descriptionHi: 'बीआईटी सिंदरी छात्र दल स्टेज 2 में टाटा स्टील सीएसआर के साथ मेंटरशिप में है।',
      descriptionEn: 'BIT Sindri team prototype in Stage 2 mentoring with Tata Steel CSR.',
      assignedHei: 'BIT Sindri',
      thumbnailEmoji: '💡',
    },
  ];

export default function CitizenDashboardPage() {
  const { t, language, currentLocation } = useCitizen();

  // Filter States
  const [proximityFilter, setProximityFilter] = useState<'<5km' | '<15km' | 'district'>('<5km');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards');

  // Optimistic Upvote State: Map of challengeId -> { count: number, isUpvoted: boolean }
  const [optimisticUpvotes, setOptimisticUpvotes] = useState<Record<string, { count: number; isUpvoted: boolean }>>({});

  // Optimistic Upvote Trigger
  const handleOptimisticUpvote = (challengeId: string, initialCount: number) => {
    setOptimisticUpvotes((prev) => {
      const current = prev[challengeId];
      if (current && current.isUpvoted) {
        // Toggle off
        return {
          ...prev,
          [challengeId]: { count: current.count - 1, isUpvoted: false },
        };
      } else {
        // Increment optimistically
        const currentCount = current ? current.count : initialCount;
        return {
          ...prev,
          [challengeId]: { count: currentCount + 1, isUpvoted: true },
        };
      }
    });
  };

  // Filtered List
  const filteredChallenges = useMemo(() => {
    return MOCK_CHALLENGES.filter((item) => {
      // Proximity
      if (proximityFilter === '<5km' && item.distanceKm > 5) return false;
      if (proximityFilter === '<15km' && item.distanceKm > 15) return false;
      // 'district' includes whole district (all items within ~35km or current district)

      // Category
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      // Search Query
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

  // Helper for status badge
  const renderStatusBadge = (status: ChallengeItem['status']) => {
    switch (status) {
      case 'PENDING_HITL':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{language === 'hi' ? 'विशेषज्ञ मूल्यांकन' : 'Pending HITL'}</span>
          </span>
        );
      case 'OPEN_FOR_BIDS':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
            <span>{language === 'hi' ? '10-दिवसीय बिडिंग खुली' : 'Open for Bids'}</span>
          </span>
        );
      case 'DYNAMIC_HACKATHON':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-purple-200">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>{language === 'hi' ? 'हैकथॉन समाधान' : 'Hackathon Solution'}</span>
          </span>
        );
      case 'IN_PILOT':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Clock className="w-3 h-3 text-blue-700" />
            <span>{language === 'hi' ? 'फील्ड पायलट (45-दिन)' : 'Field Pilot (45-Day)'}</span>
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{language === 'hi' ? 'हल एवं पेसा सत्यापित' : 'Resolved & Approved'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            {status}
          </span>
        );
    }
  };

  const getLocalizedTitle = (item: ChallengeItem) => {
    if (language === 'hi') return item.titleHi;
    if (language === 'sat') return item.titleSat;
    return item.titleEn;
  };

  const getLocalizedDesc = (item: ChallengeItem) => {
    if (language === 'hi' || language === 'sat') return item.descriptionHi;
    return item.descriptionEn;
  };

  return (
    <div className="space-y-6 pb-24 relative max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#044728] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <LayoutDashboard className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Screen 3: Citizen Civic Progress Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            {language === 'hi' ? 'नागरिक समाधान डैशबोर्ड' : language === 'sat' ? 'ᱤᱧᱟᱜ ᱥᱚᱢᱚᱥᱭᱟ ᱰᱮᱥᱵᱳᱨᱰ' : 'Citizen Grievance & Solution Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'झारखण्ड के विश्वविद्यालयों और ग्राम सभाओं द्वारा समाधान की जा रही समस्याओं की रीयल-टाइम स्थिति।'
              : 'Real-time tracking of civic challenges routed to university labs, hackathons, and Gram Sabha verification.'}
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center space-x-2 bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>{language === 'hi' ? 'नई समस्या दर्ज करें' : '+ Report Issue'}</span>
        </Link>
      </div>

      {/* 1. Mandatory Metric Carousel / Top Stat Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x sm:grid sm:grid-cols-3 sm:overflow-visible">
        {/* Metric 1: 412 Samasya Hal Hui (Resolved) */}
        <div className="min-w-[260px] sm:min-w-0 snap-center bg-gradient-to-br from-emerald-900 to-[#044728] text-white p-4 sm:p-5 rounded-2xl shadow-md border border-emerald-700/50 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
              {language === 'hi' ? 'पेसा ग्राम सभा सत्यापित' : 'PESA Verified'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span>412</span>
              <span className="text-xs font-semibold text-emerald-300">/ 540</span>
            </div>
            <p className="text-xs font-bold text-emerald-100 mt-1">
              {language === 'hi' ? '412 समस्याएं हल हुईं' : '412 Samasya Hal Hui (Resolved)'}
            </p>
            <p className="text-[10px] text-emerald-300/80 mt-0.5">
              Approved by Gram Sabha Quorum (ADR-007)
            </p>
          </div>
        </div>

        {/* Metric 2: 184 Karyaprat (Being Solved by HEIs) */}
        <div className="min-w-[260px] sm:min-w-0 snap-center bg-gradient-to-br from-indigo-950 to-purple-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-purple-700/50 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
              {language === 'hi' ? 'सक्रिय हैकथॉन व शोध' : 'Active HEI R&D'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-800/80 flex items-center justify-center text-purple-300">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span>184</span>
              <span className="text-xs font-semibold text-purple-300">Challenges</span>
            </div>
            <p className="text-xs font-bold text-purple-100 mt-1">
              {language === 'hi' ? '184 कार्यप्रत (HEIs शोध जारी)' : '184 Karyaprat (Being Solved by HEIs)'}
            </p>
            <p className="text-[10px] text-purple-300/80 mt-0.5">
              BIT Mesra, IIT-ISM, BIT Sindri &amp; NIT
            </p>
          </div>
        </div>

        {/* Metric 3: ₹1.8 Cr Escrow Disbursed */}
        <div className="min-w-[260px] sm:min-w-0 snap-center bg-gradient-to-br from-amber-950 to-amber-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-amber-700/50 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
              {language === 'hi' ? '30/40/30 एस्क्रो लेजर' : 'Escrow Ledger'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-800/80 flex items-center justify-center text-amber-300">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-100 flex items-baseline gap-1">
              <span>₹1.8 Cr</span>
              <span className="text-xs font-semibold text-amber-300">Disbursed</span>
            </div>
            <p className="text-xs font-bold text-amber-100 mt-1">
              {language === 'hi' ? '₹1.8 करोड़ एस्क्रो अनुदान वितरित' : '₹1.8 Cr Escrow Disbursed'}
            </p>
            <p className="text-[10px] text-amber-300/80 mt-0.5">
              Tranche 1 (30%) &amp; Tranche 2 (40%) Releases
            </p>
          </div>
        </div>
      </div>

      {/* 2. Hot Challenges Near You Header & View Toggles */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {language === 'hi' ? 'आपके आस-पास की समस्याएं' : 'Aapke Aas-Paas Ki Samasyayein'}
              </h2>
              <p className="text-xs text-slate-500">
                Hot Challenges Near You &bull; Real-time Citizen Upvoting
              </p>
            </div>
          </div>

          {/* View Mode Switcher: Cards vs 500m Radar Map */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कार्ड सूची' : 'Cards Feed'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'radar'
                  ? 'bg-[#044728] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? '500m रडार मैप' : '500m Radar Map'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Proximity Pills, Search, Category Dropdown */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Proximity Filter Pills: <5 km, <15 km, Whole District */}
          <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1 flex-shrink-0">
              <MapPin className="w-3 h-3 text-[#044728]" />
              {language === 'hi' ? 'दूरी:' : 'Range:'}
            </span>
            <button
              type="button"
              onClick={() => setProximityFilter('<5km')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                proximityFilter === '<5km'
                  ? 'bg-[#044728] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              &lt; 5 km
            </button>
            <button
              type="button"
              onClick={() => setProximityFilter('<15km')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                proximityFilter === '<15km'
                  ? 'bg-[#044728] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              &lt; 15 km
            </button>
            <button
              type="button"
              onClick={() => setProximityFilter('district')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                proximityFilter === 'district'
                  ? 'bg-[#044728] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {language === 'hi' ? 'संपूर्ण ज़िला' : 'Whole District'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'टिकट आईडी, गांव या समस्या का नाम खोजें...'
                  : 'Search by ticket ID, village, or keyword...'
              }
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044728] bg-slate-50/50"
            />
          </div>

          {/* Domain / Category Dropdown */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Domain"
              className="w-full lg:w-auto text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#044728]"
            >
              <option value="ALL">All Categories / सभी श्रेणियां</option>
              <option value="drinking_water">Drinking Water / पेयजल एवं चापाकल</option>
              <option value="electricity">Electricity / सौर ऊर्जा व ग्रिड</option>
              <option value="agriculture">Agriculture / सिंचाई व कृषि</option>
              <option value="road_drainage">Roads &amp; Drainage / सड़क व पुलिया</option>
              <option value="education">Education / विद्यालय अधोसंरचना</option>
            </select>
          </div>
        </div>

        {/* View Mode 1: Radar Map View */}
        {viewMode === 'radar' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span>
                Interactive Radar Centered at{' '}
                <strong className="text-[#044728]">{currentLocation.district}, {currentLocation.block}</strong>
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Pulsing 500m PostGIS Buffer
              </span>
            </div>
            <SpatialRadarMap
              centerLocation={currentLocation}
              nearbyRadiusMeters={500}
              currentPhotoPreview=""
            />
          </div>
        )}

        {/* View Mode 2: Card Feed View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChallenges.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">
                  {language === 'hi' ? 'इस फ़िल्टर में कोई समस्या नहीं मिली' : 'No challenges match this filter'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting the proximity range or category filter.
                </p>
              </div>
            ) : (
              filteredChallenges.map((item) => {
                const optState = optimisticUpvotes[item.id];
                const currentCount = optState ? optState.count : item.upvotes;
                const isUpvoted = optState ? optState.isUpvoted : false;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    {/* Top Row: Category Badge, Distance Pill, Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#044728] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.id}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span>{item.distanceKm} km away</span>
                        </span>
                      </div>
                      <div>{renderStatusBadge(item.status)}</div>
                    </div>

                    {/* Card Content & Thumbnail */}
                    <div className="flex gap-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
                        {item.thumbnailEmoji}
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#044728] transition-colors">
                          {getLocalizedTitle(item)}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {getLocalizedDesc(item)}
                        </p>
                      </div>
                    </div>

                    {/* Assigned HEI / University Tag */}
                    {item.assignedHei && (
                      <div className="text-[11px] bg-slate-50 text-slate-700 p-2 rounded-xl border border-slate-100 flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">HEI Partner:</span>
                        <span className="truncate">{item.assignedHei}</span>
                      </div>
                    )}

                    {/* Bottom Action Row: Geo Location & Optimistic Upvote Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Optimistic Upvote CTA */}
                        <button
                          type="button"
                          onClick={() => handleOptimisticUpvote(item.id, item.upvotes)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                            isUpvoted
                              ? 'bg-amber-500 text-white shadow-amber-500/30'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-[#044728] border border-emerald-200'
                          }`}
                          title="Support this civic grievance"
                        >
                          <ThumbsUp
                            className={`w-3.5 h-3.5 transition-transform ${
                              isUpvoted ? 'fill-white scale-110' : 'text-amber-600'
                            }`}
                          />
                          <span>{currentCount}</span>
                          <span className="text-[10px] hidden sm:inline">
                            {isUpvoted
                              ? language === 'hi'
                                ? 'समर्थित'
                                : 'Upvoted'
                              : language === 'hi'
                              ? 'समर्थन दें'
                              : 'Upvote'}
                          </span>
                        </button>

                        <Link
                          href="/time-machine"
                          className="inline-flex items-center justify-center p-1.5 rounded-xl text-slate-400 hover:text-[#044728] hover:bg-slate-100 transition-colors"
                          title="View Quorum & Satyapan Details"
                        >
                          <ChevronRight className="w-4 h-4" />
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

      {/* 3. Mandatory Floating Action Button (FAB) at bottom-right */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40">
        <Link
          href="/report"
          className="group flex items-center space-x-2 bg-[#044728] hover:bg-[#03361e] text-white px-4 sm:px-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-900/60 border-2 border-amber-400 transition-all duration-300 active:scale-95"
          aria-label="Report New Problem"
        >
          <Plus className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" />
          <span className="font-bold text-xs sm:text-sm tracking-wide">
            {language === 'hi'
              ? '+ समस्या दर्ज करें'
              : language === 'sat'
              ? '+ ᱥᱚᱢᱚᱥᱭᱟ ᱫᱟᱨᱡᱽ ᱢᱮ'
              : '+ Samasya Darj Karein'}
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping hidden sm:inline-block" />
        </Link>
      </div>
    </div>
  );
}
