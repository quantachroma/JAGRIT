'use client';

import React, { useState, useMemo } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  MessageSquare,
  Heart,
  Share2,
  Send,
  User,
  MapPin,
  Sparkles,
  Plus,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  MessageCircle,
  Clock,
  Repeat2,
} from 'lucide-react';

export type AuthorRole = 'CITIZEN' | 'RESEARCHER' | 'STUDENT' | 'GOVT_OFFICER';
export type TopicCategory = 'ALL' | 'WATER' | 'AGRITECH' | 'ENERGY' | 'LIVELIHOODS';

export interface SamvaadComment {
  id: string;
  author: string;
  role: AuthorRole;
  roleLabel: string;
  timeAgo: string;
  content: string;
}

export interface SamvaadThread {
  id: string;
  author: string;
  role: AuthorRole;
  roleLabel: string;
  institution?: string;
  location: string;
  timeAgo: string;
  category: TopicCategory;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  isLiked?: boolean;
  replies: SamvaadComment[];
  attachmentCaption?: string;
}

const INITIAL_THREADS: SamvaadThread[] = [
  {
    id: 'th-1',
    author: 'Dr. Anand Verma',
    role: 'RESEARCHER',
    roleLabel: 'Dr. Anand Verma - BIT Mesra',
    institution: 'BIT Mesra · Water & Environmental Engineering',
    location: 'Palamu, Satbarwa Block',
    timeAgo: '2 hours ago',
    category: 'WATER',
    title: 'Palamu District: Solar Defluoridation Unit Active in 45-Day Verification Phase',
    content:
      'To address severe groundwater fluoride contamination in Satbarwa, BIT Mesra deployed an unassisted solar membrane defluoridation unit. Operating efficiency is at 88%. Gram Sabha members are actively participating in the citizen quorum audit.',
    tags: ['WaterResearch', 'FluorideRemoval', 'BITMesra'],
    likesCount: 68,
    isLiked: false,
    attachmentCaption: 'Palamu Solar Defluoridation Unit: 45-Day Durability Audit',
    replies: [
      {
        id: 'c-1-1',
        author: 'Somra Oraon',
        role: 'CITIZEN',
        roleLabel: 'Citizen',
        timeAgo: '1 hour ago',
        content: 'Drinking water quality has noticeably improved in our hamlet.',
      },
    ],
  },
  {
    id: 'th-2',
    author: 'Sunil Hembrom',
    role: 'STUDENT',
    roleLabel: 'Student Lead',
    institution: 'NIT Jamshedpur · Renewable Energy',
    location: 'West Singhbhum, Chaibasa',
    timeAgo: '5 hours ago',
    category: 'ENERGY',
    title: 'Chaibasa: Solar Microgrid Voltage Stabilizer for Rural Primary Health Centre',
    content:
      'In Tonto health centre, evening battery voltage dropped to 140V, risking cold-chain vaccine refrigeration. Our student engineering team installed an active battery management system maintaining a steady 220V.',
    tags: ['Energy', 'HealthCenterSolar', 'NITJamshedpur'],
    likesCount: 82,
    isLiked: true,
    attachmentCaption: 'Active Telemetry Controller Board installed at Chaibasa PHC',
    replies: [],
  },
  {
    id: 'th-3',
    author: 'Ramesh Munda',
    role: 'CITIZEN',
    roleLabel: 'Citizen',
    location: 'Ranchi, Kanke Panchayat',
    timeAgo: '1 day ago',
    category: 'WATER',
    title: 'Kanke Ward 4: Community Monitoring Committee Formed for Solar Handpump',
    content:
      'The new solar-powered deep bore pump in Ward 4 is supplying clean water to 45 families daily. A village maintenance committee has been established to protect the solar panels.',
    tags: ['WaterResearch', 'SolarPump', 'GramSabha'],
    likesCount: 46,
    isLiked: false,
    attachmentCaption: 'Operational solar pump providing clean water to 45 households',
    replies: [],
  },
  {
    id: 'th-4',
    author: 'Birsa Munda SHG',
    role: 'CITIZEN',
    roleLabel: 'Citizen',
    location: 'Khunti, Murhu Block',
    timeAgo: '3 hours ago',
    category: 'LIVELIHOODS',
    title: 'Khunti District: Post-Harvest Spoilage in Lac — Solar Tunnel Dryer Required',
    content:
      'Heavy monsoon dampness is causing over 35% fungal rot in our harvested kusmi and rangini lac produce. Can a portable solar dehumidifier dryer be piloted for our 20 women self-help groups?',
    tags: ['Livelihoods', 'Agritech', 'PostHarvestDecay'],
    likesCount: 54,
    isLiked: false,
    attachmentCaption: 'Raw Lac Spoilage Assessment & Storage Issues in Murhu',
    replies: [],
  },
];

const INITIAL_THREADS_BY_LANG: Record<string, SamvaadThread[]> = {
  en: INITIAL_THREADS,
  hi: [
    {
      id: 'th-1',
      author: 'डॉ. आनंद वर्मा',
      role: 'RESEARCHER',
      roleLabel: 'डॉ. आनंद वर्मा - बीआईटी मेसरा',
      institution: 'बीआईटी मेसरा · जल एवं पर्यावरण इंजीनियरिंग',
      location: 'पलामू, सतबरवा प्रखंड',
      timeAgo: '२ घंटे पहले',
      category: 'WATER',
      title: 'पलामू ज़िला: ४५-दिवसीय सत्यापन चरण में सौर फ्लोराइड-मुक्त इकाई सक्रिय',
      content:
        'सतबरवा में भूजल के अत्यधिक फ्लोराइड संदूषण से निपटने हेतु बीआईटी मेसरा ने सौर ऊर्जा चालित फ्लोराइड निष्कासन इकाई स्थापित की है। कार्यकुशलता ८८% है। ग्राम सभा सदस्य नागरिक कोरम सत्यापन में भाग ले रहे हैं।',
      tags: ['जलअनुसंधान', 'फ्लोराइडनिवारण', 'बीआईटीमेसरा'],
      likesCount: 68,
      isLiked: false,
      attachmentCaption: 'पलामू सौर फ्लोराइड-मुक्त इकाई: ४५-दिवसीय स्थायित्व परीक्षण',
      replies: [
        {
          id: 'c-1-1',
          author: 'सोमरा उरांव',
          role: 'CITIZEN',
          roleLabel: 'नागरिक',
          timeAgo: '१ घंटा पहले',
          content: 'हमारे टोले में पीने के पानी की गुणवत्ता में उल्लेखनीय सुधार हुआ है।',
        },
      ],
    },
    {
      id: 'th-2',
      author: 'सुनील हेम्ब्रम',
      role: 'STUDENT',
      roleLabel: 'छात्र दल प्रमुख',
      institution: 'एनआईटी जमशेदपुर · नवीकरणीय ऊर्जा',
      location: 'पश्चिमी सिंहभूम, चाईबासा',
      timeAgo: '५ घंटे पहले',
      category: 'ENERGY',
      title: 'चाईबासा: ग्रामीण प्राथमिक स्वास्थ्य केंद्र हेतु सोलर माइक्रोग्रिड वोल्टेज स्टेबलाइजर',
      content:
        'टोन्टो स्वास्थ्य केंद्र में शाम को बैटरी वोल्टेज १४०V तक गिर जाता था, जिससे टीकों के कोल्ड-चेन प्रशीतन को खतरा था। हमारी छात्र इंजीनियरिंग टीम ने सक्रिय बैटरी प्रबंधन प्रणाली स्थापित कर २२०V स्थिर किया।',
      tags: ['ऊर्जा', 'स्वास्थ्यकेंद्रसौर', 'एनआईटीजमशेदपुर'],
      likesCount: 82,
      isLiked: true,
      attachmentCaption: 'चाईबासा पीएचसी में स्थापित सक्रिय टेलीमेट्री नियंत्रक बोर्ड',
      replies: [],
    },
    {
      id: 'th-3',
      author: 'रमेश मुंडा',
      role: 'CITIZEN',
      roleLabel: 'नागरिक',
      location: 'रांची, कांके पंचायत',
      timeAgo: '१ दिन पहले',
      category: 'WATER',
      title: 'कांके वार्ड ४: सोलर चापाकल हेतु सामुदायिक निगरानी समिति गठित',
      content:
        'वार्ड ४ में नया सौर संचालित डीप बोर पंप प्रतिदिन ४५ परिवारों को स्वच्छ जल उपलब्ध करा रहा है। सौर पैनलों की सुरक्षा हेतु ग्राम रखरखाव समिति बनाई गई है।',
      tags: ['जलअनुसंधान', 'सोलरपंप', 'ग्रामसभा'],
      likesCount: 46,
      isLiked: false,
      attachmentCaption: '४५ परिवारों को पेयजल प्रदान करता क्रियाशील सौर पंप',
      replies: [],
    },
    {
      id: 'th-4',
      author: 'बिरसा मुंडा स्वयं सहायता समूह',
      role: 'CITIZEN',
      roleLabel: 'नागरिक',
      location: 'खूंटी, मुरहू प्रखंड',
      timeAgo: '३ घंटे पहले',
      category: 'LIVELIHOODS',
      title: 'खूंटी ज़िला: लाह की फसल में फफूंद से बचाव — सोलर टनल ड्रायर की आवश्यकता',
      content:
        'मानसून की भारी नमी के कारण हमारी कुसुमी और रंगीनी लाह की ३५% फसल खराब हो रही है। क्या हमारे २० महिला स्वयं सहायता समूहों के लिए एक पोर्टेबल सोलर डीह्यूमिडिफायर ड्रायर का परीक्षण किया जा सकता है?',
      tags: ['आजीविका', 'कृषितकनीक', 'फसलबचाव'],
      likesCount: 54,
      isLiked: false,
      attachmentCaption: 'मुरहू में कच्ची लाह की बर्बादी एवं भंडारण समस्या का आकलन',
      replies: [],
    },
  ],
  sat: [
    {
      id: 'th-1',
      author: 'Dr. Anand Verma',
      role: 'RESEARCHER',
      roleLabel: 'Dr. Anand Verma - BIT Mesra',
      institution: 'BIT Mesra · Daq ar Poribesh Eng.',
      location: 'Palamu, Satbarwa Block',
      timeAgo: '2 ᱴᱟᱲᱟᱝ ᱢᱟᱬᱟᱝ',
      category: 'WATER',
      title: 'Palamu District: Solar Defluoridation Unit 45-Maha Bidao Re Menah-a',
      content:
        'Satbarwa re daq re fluoride kom laigi BIT Mesra solar defluoridation unit lagao keda. 88% bes kaami choloh kana. Aatu hor baisi re vote em kana.',
      tags: ['DaqKondron', 'FluorideKom', 'BITMesra'],
      likesCount: 68,
      isLiked: false,
      attachmentCaption: 'Palamu Solar Defluoridation Unit: 45-Maha Bidao Audit',
      replies: [
        {
          id: 'c-1-1',
          author: 'Somra Oraon',
          role: 'CITIZEN',
          roleLabel: 'Aatu Hor',
          timeAgo: '1 ᱴᱟᱲᱟᱝ ᱢᱟᱬᱟᱝ',
          content: 'Ńu daq nahaq bes bujhao kana.',
        },
      ],
    },
    {
      id: 'th-2',
      author: 'Sunil Hembrom',
      role: 'STUDENT',
      roleLabel: 'Student Lead',
      institution: 'NIT Jamshedpur · Renewable Energy',
      location: 'West Singhbhum, Chaibasa',
      timeAgo: '5 ᱴᱟᱲᱟᱝ ᱢᱟᱬᱟᱝ',
      category: 'ENERGY',
      title: 'Chaibasa: Solar Microgrid Voltage Stabilizer Rural PHC Laigi',
      content:
        'Tonto health centre re tikin tayom battery 140V dhabich komolen tahikana, vaccine baarijoh kan tahikana. NIT Jamshedpur team active BMS lagao keda 220V doho laigi.',
      tags: ['Energy', 'HealthSolar', 'NITJamshedpur'],
      likesCount: 82,
      isLiked: true,
      attachmentCaption: 'Chaibasa PHC re controller board lagao ena',
      replies: [],
    },
    {
      id: 'th-3',
      author: 'Ramesh Munda',
      role: 'CITIZEN',
      roleLabel: 'Aatu Hor',
      location: 'Ranchi, Kanke Panchayat',
      timeAgo: '1 ᱢᱟᱦᱟᱸ ᱢᱟᱬᱟᱝ',
      category: 'WATER',
      title: 'Kanke Ward 4: Solar Handpump Laigi Gram Sabha Committee Benaw Ena',
      content:
        'Ward 4 re solar deep bore pump 45 oraq hor daq em kana. Solar panel joton laigi aatu hor baisi keda.',
      tags: ['DaqKondron', 'SolarPump', 'GramSabha'],
      likesCount: 46,
      isLiked: false,
      attachmentCaption: '45 oraq hor laigi solar pump chalu menah-a',
      replies: [],
    },
    {
      id: 'th-4',
      author: 'Birsa Munda SHG',
      role: 'CITIZEN',
      roleLabel: 'Aatu Hor',
      location: 'Khunti, Murhu Block',
      timeAgo: '3 ᱴᱟᱲᱟᱝ ᱢᱟᱬᱟᱝ',
      category: 'LIVELIHOODS',
      title: 'Khunti District: Lac Produce Baarijoh Kana — Solar Dryer Darkar',
      content:
        'Japud re 35% lac baarijoh kana. 20 gogo dol laigi portable solar dehumidifier dryer pilote banaw daareyaleba?',
      tags: ['AsulogHor', 'ChasHunar', 'PostHarvest'],
      likesCount: 54,
      isLiked: false,
      attachmentCaption: 'Murhu re lac baarijoh katha nel ena',
      replies: [],
    },
  ],
};

export default function SamvaadPage() {
  const { currentLocation } = useCitizen();
  const { language, t } = useLanguage();

  const [threads, setThreads] = useState<SamvaadThread[]>(() => INITIAL_THREADS);

  // Sync sample threads when language changes
  React.useEffect(() => {
    const localized = INITIAL_THREADS_BY_LANG[language] || INITIAL_THREADS_BY_LANG.en;
    setThreads(localized);
  }, [language]);

  const [activeCategory, setActiveCategory] = useState<TopicCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Post Composer Box State
  const [composerText, setComposerText] = useState('');
  const [composerCategory, setComposerCategory] = useState<TopicCategory>('WATER');
  const [composerRole, setComposerRole] = useState<AuthorRole>('RESEARCHER');

  // Comment Expander / Drawer State
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [replyInputText, setReplyInputText] = useState<Record<string, string>>({});

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Optimistic Like Toggle
  const handleToggleLike = (threadId: string) => {
    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const isLiked = !thread.isLiked;
          const likesCount = isLiked ? thread.likesCount + 1 : thread.likesCount - 1;
          return { ...thread, isLiked, likesCount };
        }
        return thread;
      })
    );
  };

  // Optimistic Reply Action
  const handlePostReply = (threadId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = replyInputText[threadId]?.trim();
    if (!text) return;

    const newReply: SamvaadComment = {
      id: `rep-${Date.now()}`,
      author: 'Citizen Contributor',
      role: 'CITIZEN',
      roleLabel: 'Citizen',
      timeAgo: 'Just now',
      content: text,
    };

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: [...thread.replies, newReply],
          };
        }
        return thread;
      })
    );

    setReplyInputText((prev) => ({ ...prev, [threadId]: '' }));
    showToast(t.samvaad.toastReplySuccess);
  };

  // Share Action
  const handleShareThread = async (thread: SamvaadThread) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/samvaad#${thread.id}` : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: thread.title,
          text: thread.content,
          url,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast(t.samvaad.toastLinkCopied);
    }
  };

  // Post Composer Action
  const handleQuickPost = () => {
    if (!composerText.trim()) return;

    const authorName =
      composerRole === 'RESEARCHER'
        ? 'Dr. Anand Verma'
        : composerRole === 'STUDENT'
        ? 'Student Lead'
        : 'Citizen Contributor';

    const roleLabel =
      composerRole === 'RESEARCHER'
        ? t.samvaad.roles.researcher
        : composerRole === 'STUDENT'
        ? t.samvaad.roles.student
        : t.samvaad.roles.citizen;

    const newThread: SamvaadThread = {
      id: `th-user-${Date.now()}`,
      author: authorName,
      role: composerRole,
      roleLabel: roleLabel,
      location: `${currentLocation.district || 'Ranchi'}, ${currentLocation.block || 'Kanke'}`,
      timeAgo: 'Just now',
      category: composerCategory === 'ALL' ? 'WATER' : composerCategory,
      title: composerText.slice(0, 50) + (composerText.length > 50 ? '...' : ''),
      content: composerText,
      tags: [
        composerCategory === 'WATER'
          ? 'WaterResearch'
          : composerCategory === 'AGRITECH'
          ? 'Agritech'
          : composerCategory === 'ENERGY'
          ? 'Energy'
          : 'Livelihoods',
      ],
      likesCount: 1,
      isLiked: true,
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setComposerText('');
    showToast(t.samvaad.toastPostSuccess);
  };

  // Filter Categories: All Threads | Water Research | Agritech | Energy | Livelihoods
  const categoryFilters: { id: TopicCategory; label: string }[] = [
    { id: 'ALL', label: t.samvaad.filterAll },
    { id: 'WATER', label: t.samvaad.filterWater },
    { id: 'AGRITECH', label: t.samvaad.filterAgritech },
    { id: 'ENERGY', label: t.samvaad.filterEnergy },
    { id: 'LIVELIHOODS', label: t.samvaad.filterLivelihoods },
  ];

  const filteredThreads = useMemo(() => {
    return threads.filter((th) => {
      if (activeCategory !== 'ALL' && th.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          th.title.toLowerCase().includes(q) ||
          th.content.toLowerCase().includes(q) ||
          th.author.toLowerCase().includes(q) ||
          th.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [threads, activeCategory, searchQuery]);

  const renderRoleBadge = (role: AuthorRole, label: string) => {
    switch (role) {
      case 'RESEARCHER':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>{label || 'Dr. Anand Verma - BIT Mesra'}</span>
          </span>
        );
      case 'STUDENT':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            <span>{label || 'Student Lead'}</span>
          </span>
        );
      case 'CITIZEN':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span>{label || 'Citizen'}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 relative">
      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white border border-blue-900 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-200 max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{t.samvaad.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
          {t.samvaad.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.samvaad.subtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        {categoryFilters.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 min-h-[40px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ✍️ Post Composer Box (X / Threads Style) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
            🗣️
          </div>
          <div className="flex-1">
            <textarea
              rows={3}
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder={t.samvaad.composerPlaceholder}
              className="w-full text-sm text-slate-900 border-none outline-none resize-none focus:ring-0 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-2 flex-wrap gap-1.5">
            <select
              value={composerCategory}
              onChange={(e) => setComposerCategory(e.target.value as TopicCategory)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="WATER">{t.samvaad.composerWater}</option>
              <option value="AGRITECH">{t.samvaad.composerAgritech}</option>
              <option value="ENERGY">{t.samvaad.composerEnergy}</option>
              <option value="LIVELIHOODS">{t.samvaad.composerLivelihoods}</option>
            </select>

            <select
              value={composerRole}
              onChange={(e) => setComposerRole(e.target.value as AuthorRole)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="RESEARCHER">{t.samvaad.roles.researcher}</option>
              <option value="STUDENT">{t.samvaad.roles.student}</option>
              <option value="CITIZEN">{t.samvaad.roles.citizen}</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleQuickPost}
            disabled={!composerText.trim()}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold px-5 py-2 min-h-[40px] rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <span>{t.samvaad.postBtn}</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.samvaad.searchPlaceholder}
          className="w-full pl-9 pr-3 py-2.5 min-h-[42px] text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-2xs"
        />
      </div>

      {/* Threads Feed */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-2">
            <MessageCircle className="w-8 h-8 text-slate-400 mx-auto opacity-60" />
            <h3 className="text-sm font-bold text-slate-800">
              {t.samvaad.emptyTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.samvaad.emptySub}
            </p>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isCommentsOpen = Boolean(expandedComments[thread.id]);

            return (
              <div
                key={thread.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-sm hover:border-blue-200 transition-all space-y-3.5"
              >
                {/* Author Info Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0">
                      {thread.author.charAt(0)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-900">
                          {thread.author}
                        </h3>
                        {renderRoleBadge(thread.role, thread.roleLabel)}
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>{thread.location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{thread.timeAgo}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {thread.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {thread.content}
                  </p>
                </div>

                {/* Evidence / Caption Pill */}
                {thread.attachmentCaption && (
                  <div className="bg-blue-50/50 rounded-xl p-2.5 border border-blue-100 text-xs text-slate-700 flex items-center space-x-2">
                    <span className="text-blue-700 font-bold">✓</span>
                    <span className="font-mono text-[11px] text-slate-700">{thread.attachmentCaption}</span>
                  </div>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Bar: Like, Reply, Share */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(thread.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                        thread.isLiked
                          ? 'bg-blue-50 text-blue-700 font-black'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          thread.isLiked ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{t.samvaad.like} ({thread.likesCount})</span>
                    </button>

                    {/* Reply Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [thread.id]: !prev[thread.id],
                        }))
                      }
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                        isCommentsOpen
                          ? 'bg-blue-50 text-blue-700 font-black'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-blue-700" />
                      <span>{t.samvaad.reply} ({thread.replies.length})</span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={() => handleShareThread(thread)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all active:scale-95"
                    >
                      <Repeat2 className="w-4 h-4 text-slate-500" />
                      <span>{t.samvaad.share}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Replies Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-blue-200">
                      {thread.replies.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">
                          {t.samvaad.noReplies}
                        </p>
                      ) : (
                        thread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-900">{reply.author}</span>
                                {renderRoleBadge(reply.role, reply.roleLabel)}
                              </div>
                              <span className="text-[10px] text-slate-400">{reply.timeAgo}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{reply.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Quick Reply Form */}
                    <form
                      onSubmit={(e) => handlePostReply(thread.id, e)}
                      className="flex items-center space-x-2 pt-1"
                    >
                      <input
                        type="text"
                        value={replyInputText[thread.id] || ''}
                        onChange={(e) =>
                          setReplyInputText((prev) => ({
                            ...prev,
                            [thread.id]: e.target.value,
                          }))
                        }
                        placeholder={t.samvaad.replyPlaceholder}
                        className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[42px] focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 min-h-[42px] min-w-[42px] rounded-xl transition-all shadow-xs flex items-center justify-center"
                        title="Send Reply"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
