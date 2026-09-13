'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import SpatialRadarMap from '@/components/spatial-radar-map';
import {
  LayoutDashboard,
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
  Plus,
  Flame,
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
  descriptionHi: string;
  descriptionSat: string;
  descriptionEn: string;
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
    descriptionHi: 'सतबरवा के 4 गांवों में भूजल में फ्लोराइड पाया गया है। बीआईटी मेसरा द्वारा स्थापित सौर डी-फ्लोराइडेशन इकाई 45-दिवसीय परिपक्वता बफ़र में है।',
    descriptionSat: 'ᱥᱟᱛᱵᱟᱨᱣᱟ ᱟᱹᱛᱩ ᱨᱮ ᱫᱟᱜ ᱥᱟᱯᱷᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱵᱤᱟᱭᱤᱴᱤ ᱢᱮᱥᱨᱟ ᱦᱚᱛᱮᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱟᱹᱢᱤ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ᱾',
    descriptionEn: 'Critical fluoride contamination in public borewells. BIT Mesra solar defluoridation unit active in 45-day operational maturation buffer.',
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
    descriptionHi: 'मानसून के दौरान अत्यधिक नमी से कुसमी और रंगीनी लाह में सड़न हो रही है। किसान सोलर ड्रायर अनुसंधान मांग रहे हैं।',
    descriptionSat: 'ᱫᱟᱜ ᱫᱤᱱ ᱞᱟᱦᱟ ᱵᱟᱹᱲᱤᱡᱚᱜ ᱠᱟᱱᱟ᱾ ᱪᱟᱹᱥᱤ ᱠᱚ ᱥᱮᱸᱜᱮᱞ ᱰᱨᱟᱭᱟᱨ ᱠᱚ ᱠᱷᱚᱡᱚᱜ ᱠᱟᱱᱟ᱾',
    descriptionEn: 'Farmers suffering post-harvest fungal spoilage in raw lac due to monsoon humidity. Open for university solar dryer engineering bids.',
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
    descriptionHi: 'प्राथमिक स्वास्थ्य केंद्र के वैक्सीन रेफ्रिजरेटर में शाम को वोल्टेज गिर जाता है। एनआईटी जमशेदपुर छात्र टीम बीएमएस का विकास कर रही है।',
    descriptionSat: 'ᱦᱟᱥᱯᱟᱛᱟᱞ ᱨᱮ ᱨᱟᱱ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱤᱡᱞᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱠᱚᱢᱚᱜ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾ ᱮᱱᱟᱭᱤᱴᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱱᱟᱣᱟ ᱥᱚᱞᱦᱮ ᱠᱚ ᱵᱮᱱᱟᱣ ᱠᱮᱫᱟ᱾',
    descriptionEn: 'Microgrid battery voltage drop threatening cold-chain vaccine storage in Tonto PHC. NIT Jamshedpur student team developing battery telemetry.',
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
    descriptionHi: 'चापाकल से अत्यधिक मटमैला पानी निकल रहा है। 45 परिवार प्रभावित हैं।',
    descriptionSat: 'ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱵᱟᱹᱲᱤᱡ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾ ᱔᱕ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
    descriptionEn: 'Heavy silt contamination in public borewell casing affecting 45 families.',
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
    descriptionHi: 'परियोजना पूर्ण एवं ग्राम सभा पेसा अधिनियम द्वारा सत्यापित।',
    descriptionSat: 'ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱚ ᱥᱟᱹᱨᱤ ᱠᱮᱫᱟ᱾',
    descriptionEn: 'Project completed and approved with Gram Sabha PESA Act verification.',
    assignedHei: 'Ranchi University',
    thumbnailEmoji: '🏫',
  },
];

export default function CitizenDashboardPage() {
  const { t, language, currentLocation } = useCitizen();

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
    switch (status) {
      case 'PENDING_HITL':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{t('dashboard.statuses', 'PENDING_HITL', 'Pending Expert Evaluation')}</span>
          </span>
        );
      case 'OPEN_FOR_BIDS':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
            <span>{t('dashboard.statuses', 'OPEN_FOR_BIDS', 'Open for University Bids')}</span>
          </span>
        );
      case 'DYNAMIC_HACKATHON':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{t('dashboard.statuses', 'DYNAMIC_HACKATHON', 'Active Hackathon Solution')}</span>
          </span>
        );
      case 'IN_PILOT':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-purple-700" />
            <span>{t('dashboard.statuses', 'IN_PILOT', 'Field Testing')}</span>
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{t('dashboard.statuses', 'RESOLVED', 'Resolved & Approved')}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full text-[11px] font-bold">
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
    if (language === 'hi') return item.descriptionHi;
    if (language === 'sat') return item.descriptionSat;
    return item.descriptionEn;
  };

  const categories = [
    {
      id: 'ALL',
      label:
        language === 'hi'
          ? 'सभी श्रेणियां'
          : language === 'sat'
          ? 'ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ'
          : 'All Categories',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('dashboard', 'title', 'Grievance and Solution Dashboard')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            {t('dashboard', 'title', 'Grievance and Solution Dashboard')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {t(
              'dashboard',
              'subtitle',
              'Track your registered issues through engineering evaluation, university hackathons, and Gram Sabha verification.'
            )}
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 min-h-[48px] rounded-2xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{t('dashboard', 'reportNewButton', '+ Report an Issue')}</span>
        </Link>
      </div>

      {/* 1. Metric Strip: Clean White Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              {language === 'hi' ? 'ग्राम सभा अनुमोदित' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱥᱟᱹᱨᱤ' : 'Verified Quorum'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">412</div>
            <p className="text-xs font-bold text-slate-800 mt-0.5">
              {t('dashboard', 'metricResolvedTitle', 'Issues Resolved')}
            </p>
            <p className="text-[10px] text-slate-500">
              {t('dashboard', 'metricResolvedSubtitle', 'Approved by Gram Sabha Quorum')}
            </p>
          </div>
        </div>

        {/* Metric 2: Active Solving */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              {language === 'hi' ? 'सक्रिय शोध' : language === 'sat' ? 'ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ' : 'University R&D'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">184</div>
            <p className="text-xs font-bold text-slate-800 mt-0.5">
              {t('dashboard', 'metricSolvingTitle', 'Active University Research')}
            </p>
            <p className="text-[10px] text-slate-500">
              {t('dashboard', 'metricSolvingSubtitle', 'BIT Mesra, IIT ISM, BIT Sindri and NIT')}
            </p>
          </div>
        </div>

        {/* Metric 3: Escrow Funds */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              {language === 'hi' ? 'अनुदान लेजर' : language === 'sat' ? 'ᱴᱟᱠᱟ ᱪᱟᱞ' : 'Escrow Ledger'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700">₹1.8 Cr</div>
            <p className="text-xs font-bold text-slate-800 mt-0.5">
              {t('dashboard', 'metricEscrowTitle', 'Escrow Funds Disbursed')}
            </p>
            <p className="text-[10px] text-slate-500">
              {t('dashboard', 'metricEscrowSubtitle', 'Milestone Releases Completed')}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Challenges Near You */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {t('dashboard', 'nearbyTitle', 'Challenges in Your Vicinity')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('dashboard', 'nearbySubtitle', 'Hot issues near you with real-time citizen upvoting')}
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
              <span>{t('dashboard', 'viewCards', 'Cards Feed')}</span>
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
              <span>{t('dashboard', 'viewRadar', '500m Radar Map')}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Proximity Filter Pills (>= 48px touch targets) */}
          <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              {t('dashboard', 'proximityRange', 'Range:')}
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
              {t('dashboard', 'proximity5km', '< 5 km')}
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
              {t('dashboard', 'proximity15km', '< 15 km')}
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
              {t('dashboard', 'proximityDistrict', 'Whole District')}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('dashboard', 'searchPlaceholder', 'Search by ticket number, village, or keyword...')}
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
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
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
                          <span>{item.distanceKm} km</span>
                        </span>
                      </div>
                      <div>{renderStatusBadge(item.status)}</div>
                    </div>

                    {/* Card Content & Thumbnail */}
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                        {item.thumbnailEmoji}
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {getLocalizedTitle(item)}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {getLocalizedDesc(item)}
                        </p>
                      </div>
                    </div>

                    {/* Assigned HEI Partner */}
                    {item.assignedHei && (
                      <div className="text-[11px] bg-slate-50 text-slate-700 p-2 rounded-xl border border-slate-100 flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {language === 'hi' ? 'संबद्ध संस्थान:' : language === 'sat' ? 'ᱥᱮᱪᱮᱫ ᱛᱟᱞᱢᱟ:' : 'HEI Partner:'}
                        </span>
                        <span className="truncate">{item.assignedHei}</span>
                      </div>
                    )}

                    {/* Bottom Action Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
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
                          <span>{currentCount}</span>
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

      {/* Floating Action Button (FAB) (>= 48px target, Single-Language) */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40">
        <Link
          href="/report"
          className="group flex items-center space-x-2.5 bg-blue-700 hover:bg-blue-800 text-white px-5 sm:px-6 py-4 min-h-[52px] rounded-full shadow-2xl transition-all duration-300 active:scale-95 border-2 border-blue-400"
          aria-label="Report a Problem"
        >
          <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" />
          <span className="font-black text-xs sm:text-sm tracking-wide">
            {t('dashboard', 'reportNewButton', '+ Report an Issue')}
          </span>
        </Link>
      </div>
    </div>
  );
}
