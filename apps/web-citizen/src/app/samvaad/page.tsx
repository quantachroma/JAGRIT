'use client';

import React, { useState, useMemo } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import {
  MessageSquare,
  Heart,
  Share2,
  Mic,
  Send,
  User,
  MapPin,
  Sparkles,
  Plus,
  GraduationCap,
  ShieldCheck,
  Tag,
  CheckCircle2,
  X,
  Camera,
  Layers,
  Flame,
  Search,
  MessageCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export type AuthorRole = 'CITIZEN' | 'RESEARCHER' | 'GOVT_OFFICER' | 'STUDENT';
export type TopicCategory = 'ALL' | 'WATER' | 'AGRITECH' | 'TRIBAL_LIVELIHOODS' | 'RURAL_ENERGY';

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
  attachmentUrl?: string;
  attachmentCaption?: string;
  hasAudio?: boolean;
}

const INITIAL_THREADS: SamvaadThread[] = [
  {
    id: 'th-1',
    author: 'अमित कुमार (Amit Kumar)',
    role: 'RESEARCHER',
    roleLabel: 'Researcher - BIT Mesra',
    institution: 'Department of Chemical & Environmental Engineering',
    location: 'Palamu, Satbarwa Block',
    timeAgo: '2 hours ago',
    category: 'WATER',
    title: 'Palamu District: High Fluoride in Borewell Water — BIT Mesra सौर डी-फ्लोराइडेशन फील्ड परीक्षण',
    content:
      'पलामू ज़िला सतबरवा प्रखंड में भूजल में 4.5 mg/L फ्लोराइड की गंभीर समस्या को दूर करने हेतु बीआईटी मेसरा ने सौर-ऊर्जा चालित सोखता झिल्ली (Solar Defluoridation Unit) स्थापित की है। 45-दिवसीय परिपक्वता बफ़र में 88% परिचालन दक्षता दर्ज की गई है। क्या स्थानीय ग्राम सभा 14-दिवसीय सत्यापन वोटिंग में भाग ले रही है?',
    tags: ['PalamuWater', 'FluorideRemoval', 'BITMesra', 'GramSabhaQuorum'],
    likesCount: 68,
    isLiked: false,
    attachmentCaption: '🔬 Palamu Solar Defluoridation Unit: 45-Day Durability Audit',
    replies: [
      {
        id: 'c-1-1',
        author: 'सोमरा उरांव (Somra Oraon)',
        role: 'CITIZEN',
        roleLabel: 'Nagrik / Ward Member, Palamu',
        timeAgo: '1 hour ago',
        content: 'जोहार अमित जी। सतबरवा में पानी की गुणवत्ता में भारी सुधार हुआ है। हमने टाइम मशीन सत्यापन में हाँ (YES) वोट दिया है।',
      },
      {
        id: 'c-1-2',
        author: 'अंजना तिग्गा (Anjana Tigga)',
        role: 'GOVT_OFFICER',
        roleLabel: 'Govt Officer (DW&S Dept)',
        timeAgo: '30 mins ago',
        content: 'पेसा ग्राम सभा की एनओसी मिलते ही Tranche 3 का 30% एस्क्रो अनुदान बीआईटी मेसरा को जारी कर दिया जाएगा।',
      },
    ],
  },
  {
    id: 'th-2',
    author: 'बिरसा मुंडा महिला स्वयं सहायता समूह',
    role: 'CITIZEN',
    roleLabel: 'SHG Lead / Citizen',
    location: 'Khunti, Murhu Block',
    timeAgo: '3 hours ago',
    category: 'TRIBAL_LIVELIHOODS',
    title: 'Khunti District: Post-harvest decay in Lac produce — लाह सुखाने हेतु सोलर ड्रायर की आवश्यकता',
    content:
      'खूंटी ज़िला मुरहू में बारिश और अत्यधिक नमी के कारण कुसमी व रंगीनी लाह में 35% से अधिक फफूंद सड़न हो रही है। क्या बीएयू (BAU) या आईसीएआर द्वारा विकसित पोर्टेबल सोलर टनल ड्रायर को हमारे स्वयं सहायता समूह के लिए पायलट किया जा सकता है?',
    tags: ['KhuntiLac', 'TribalLivelihoods', 'PostHarvestDecay', 'BAURanchi'],
    likesCount: 54,
    isLiked: true,
    hasAudio: true,
    attachmentCaption: '🌾 Raw Lac Spoilage Assessment & Storage Issues in Murhu',
    replies: [
      {
        id: 'c-2-1',
        author: 'डॉ. विकास कुमार (Dr. Vikas Kumar)',
        role: 'RESEARCHER',
        roleLabel: 'Scientist - ICAR IINRG / BAU Ranchi',
        timeAgo: '2 hours ago',
        content: 'बिरसा कृषि विश्वविद्यालय की टीम ने ₹3,200 लागत का फोल्डेबल सोलर डिह्यूमिडिफायर ड्रायर तैयार किया है। अगले सप्ताह मुरहू में 20 महिला एसएचजी को प्रशिक्षण दिया जाएगा।',
      },
    ],
  },
  {
    id: 'th-3',
    author: 'सुनील हेंब्रम (Sunil Hembrom)',
    role: 'STUDENT',
    roleLabel: 'Student Lead - NIT Jamshedpur',
    institution: 'Department of Electrical & Renewable Energy Engineering',
    location: 'West Singhbhum, Chaibasa',
    timeAgo: '5 hours ago',
    category: 'RURAL_ENERGY',
    title: 'Chaibasa: Solar micro-grid voltage drop in rural health center — बीएमएस टेलीमेट्री समाधान',
    content:
      'चाईबासा टोंटो प्राथमिक स्वास्थ्य केंद्र में शाम 6 बजे सोलर बैटरी वोल्टेज 140V तक गिर जाता था, जिससे वैक्सीन कोल्ड-चेन रेफ्रिजरेटर बंद हो रहे थे। एनआईटी जमशेदपुर छात्र टीम ने स्मार्ट आईओटी रिले व एक्टिव बीएमएस लगाया है जिससे वोल्टेज 220V स्थिर रहता है।',
    tags: ['ChaibasaEnergy', 'HealthCenterSolar', 'NITJamshedpur', 'StudentHackathon'],
    likesCount: 82,
    isLiked: false,
    attachmentCaption: '⚡ Active Telemetry Controller Board installed at Chaibasa PHC',
    replies: [
      {
        id: 'c-3-1',
        author: 'डॉ. सुधीर कुजूर (MOIC, Tonto PHC)',
        role: 'GOVT_OFFICER',
        roleLabel: 'Medical Officer, Chaibasa',
        timeAgo: '3 hours ago',
        content: 'एनआईटी जमशेदपुर के छात्रों द्वारा विकसित प्रणाली से अब रात में भी वैक्सीन सुरक्षित हैं। बेहतरीन नवाचार!',
      },
    ],
  },
  {
    id: 'th-4',
    author: 'सोमरा उरांव (Somra Oraon)',
    role: 'CITIZEN',
    roleLabel: 'Nagrik / Citizen',
    location: 'Ranchi, Kanke Panchayat',
    timeAgo: '1 day ago',
    category: 'WATER',
    title: 'कांके पंचायत के वार्ड 4 में नया सोलर चापाकल पायलट: ग्राम सभा की प्रतिक्रिया',
    content:
      'वार्ड 4 में लगाया गया सोलर चापाकल दिन में 1500 लीटर पानी दे रहा है। ग्रामीणों को 1 किमी दूर नहीं जाना पड़ रहा। क्या अन्य वार्डों में भी इसे बढ़ाया जा सकता है? हम सोलर पैनल की सुरक्षा हेतु सामुदायिक निगरानी समिति बना रहे हैं।',
    tags: ['DrinkingWater', 'SolarPump', 'GramSabha', 'PESA'],
    likesCount: 46,
    isLiked: false,
    attachmentCaption: '🚰 Operational solar pump providing clean water to 40 households',
    replies: [],
  },
];

export default function SamvaadPage() {
  const { t, language, currentLocation } = useCitizen();

  // Feed State
  const [threads, setThreads] = useState<SamvaadThread[]>(INITIAL_THREADS);
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Comment Expander / Drawer State: Map of threadId -> boolean
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [replyInputText, setReplyInputText] = useState<Record<string, string>>({});

  // Start Discussion Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<TopicCategory>('WATER');
  const [newRole, setNewRole] = useState<AuthorRole>('CITIZEN');
  const [newTags, setNewTags] = useState('');
  const [hasVoiceAttached, setHasVoiceAttached] = useState(false);
  const [isRecordingSim, setIsRecordingSim] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Optimistic Like Action
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
      author: language === 'hi' ? 'नागरिक प्रतिभागी' : 'Citizen Contributor',
      role: 'CITIZEN',
      roleLabel: 'Nagrik / Citizen',
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
    showToast(language === 'hi' ? 'आपकी टिप्पणी तुरंत पोस्ट हो गई!' : 'Reply posted successfully!');
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
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast(language === 'hi' ? 'चर्चा का लिंक कॉपी किया गया!' : 'Thread link copied to clipboard!');
    }
  };

  // Create Discussion Action
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const roleLabels: Record<AuthorRole, string> = {
      CITIZEN: 'Nagrik / Citizen',
      RESEARCHER: 'Researcher - BIT Mesra',
      STUDENT: 'Student Lead - IIT ISM Dhanbad',
      GOVT_OFFICER: 'Govt Officer (Panchayat / DW&S)',
    };

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newThread: SamvaadThread = {
      id: `th-${Date.now()}`,
      author:
        newRole === 'CITIZEN'
          ? language === 'hi'
            ? 'नागरिक सदस्य'
            : 'Local Citizen'
          : newRole === 'RESEARCHER'
          ? 'शोधकर्ता प्रतिनिधि'
          : newRole === 'STUDENT'
          ? 'छात्र इनोवेटर'
          : 'प्रशासनिक अधिकारी',
      role: newRole,
      roleLabel: roleLabels[newRole],
      location: `${currentLocation.district}, ${currentLocation.block || 'Kanke'}`,
      timeAgo: 'Just now',
      category: newCategory,
      title: newTitle,
      content: newContent,
      tags: parsedTags.length > 0 ? parsedTags : ['JanSamvaad', 'JharkhandInnovation'],
      likesCount: 1,
      isLiked: true,
      replies: [],
      hasAudio: hasVoiceAttached,
      attachmentCaption: hasVoiceAttached ? '🎙️ Verified Voice Query Recorded' : undefined,
    };

    // Optimistic Prepend
    setThreads([newThread, ...threads]);

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setHasVoiceAttached(false);
    setIsModalOpen(false);

    showToast(
      language === 'hi'
        ? 'जन संवाद में आपकी चर्चा सफलतापूर्वक प्रकाशित हो गई!'
        : 'Discussion published to Jan Samvaad community feed!'
    );
  };

  // Filter logic
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

  // Role Badge Helper
  const renderRoleBadge = (role: AuthorRole, label: string) => {
    switch (role) {
      case 'RESEARCHER':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 border border-purple-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
            <span>{label}</span>
          </span>
        );
      case 'STUDENT':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>{label}</span>
          </span>
        );
      case 'GOVT_OFFICER':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>{label}</span>
          </span>
        );
      case 'CITIZEN':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <User className="w-3.5 h-3.5 text-[#044728]" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 relative">
      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#044728] text-white border-2 border-amber-400 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-200 max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen 11 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#044728] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Screen 11: Samvaad / Threads Community Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            {language === 'hi' ? 'जन संवाद चौपाल' : language === 'sat' ? 'ᱵᱤᱪᱟᱹᱨ ᱟᱨ ᱨᱚᱯᱚᱲ (Jan Samvaad)' : 'Jan Samvaad Community Forum'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {language === 'hi'
              ? 'ग्रामीण नागरिकों, शोधकर्ताओं एवं छात्र इनोवेटर्स के बीच तकनीकी विचार-विमर्श एवं समस्या समाधान।'
              : 'Collaborative micro-blogging forum uniting citizens, university researchers, and student innovators.'}
          </p>
        </div>

        {/* Start Discussion Trigger Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 bg-[#044728] hover:bg-[#03361e] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all self-start sm:self-auto active:scale-95 group"
        >
          <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
          <span>{language === 'hi' ? 'नई चर्चा शुरू करें' : 'Start a Discussion'}</span>
        </button>
      </div>

      {/* Mandatory Filter Pills & Search */}
      <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200 shadow-sm">
        {/* Horizontal Scrollable Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCategory('ALL')}
            className={`px-4 py-2 min-h-[44px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === 'ALL'
                ? 'bg-[#044728] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {language === 'hi' ? 'सभी विषय (All Topics)' : 'All Topics'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('WATER')}
            className={`px-4 py-2 min-h-[44px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === 'WATER'
                ? 'bg-[#044728] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            🚰 {language === 'hi' ? 'पेयजल एवं स्वच्छता' : 'Water Sanitation'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('AGRITECH')}
            className={`px-4 py-2 min-h-[44px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === 'AGRITECH'
                ? 'bg-[#044728] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            🌾 {language === 'hi' ? 'कृषि तकनीक (Agritech)' : 'Agritech'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('TRIBAL_LIVELIHOODS')}
            className={`px-4 py-2 min-h-[44px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === 'TRIBAL_LIVELIHOODS'
                ? 'bg-[#044728] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            🏹 {language === 'hi' ? 'जनजातीय आजीविका' : 'Tribal Livelihoods'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('RURAL_ENERGY')}
            className={`px-4 py-2 min-h-[44px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === 'RURAL_ENERGY'
                ? 'bg-[#044728] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            ⚡ {language === 'hi' ? 'ग्रामीण ऊर्जा (Rural Energy)' : 'Rural Energy'}
          </button>
        </div>

        {/* Search within discussions */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'संवाद, कीवर्ड्स या शोधकर्ताओं को खोजें...'
                : 'Search discussions, researcher tags, or villages...'
            }
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044728] bg-slate-50/50"
          />
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <MessageCircle className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'hi' ? 'इस श्रेणी में अभी कोई संवाद नहीं है' : 'No discussions in this topic yet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Be the first to start a conversation with citizens and researchers!
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center space-x-1.5 bg-[#044728] text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'चर्चा शुरू करें' : 'Start Discussion'}</span>
            </button>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isCommentsOpen = Boolean(expandedComments[thread.id]);

            return (
              <div
                key={thread.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Author Info & Role Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-100 to-amber-100 flex items-center justify-center font-bold text-[#044728] text-sm shadow-inner flex-shrink-0">
                      {thread.author.charAt(0)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {thread.author}
                        </h3>
                        {renderRoleBadge(thread.role, thread.roleLabel)}
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span>{thread.location}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{thread.timeAgo}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {thread.hasAudio && (
                    <span className="inline-flex items-center space-x-1 text-[10px] bg-amber-50 text-[#D97706] px-2 py-0.5 rounded-full border border-amber-200 font-bold">
                      <Mic className="w-3 h-3 animate-pulse" />
                      <span>Voice Note</span>
                    </span>
                  )}
                </div>

                {/* Post Title & Content */}
                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {thread.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {thread.content}
                  </p>
                </div>

                {/* Optional Image Attachment Card */}
                {thread.attachmentCaption && (
                  <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Evidence / Prototype Attachment</span>
                      </span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Verified</span>
                    </div>

                    <div className="h-28 bg-slate-950/80 rounded-xl flex items-center justify-center border border-slate-800 p-3 text-center">
                      <p className="text-xs font-mono text-slate-300">
                        {thread.attachmentCaption}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-[#044728] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Bar: Like (Heart), Reply (Comment Drawer), Share */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center space-x-4">
                    {/* Like Action with Real-Time Optimistic Counter */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(thread.id)}
                      className={`flex items-center space-x-1.5 px-3.5 py-2 min-h-[44px] rounded-xl transition-all active:scale-95 ${
                        thread.isLiked
                          ? 'bg-rose-50 text-rose-600'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          thread.isLiked ? 'fill-rose-600 text-rose-600 scale-110' : 'text-slate-400'
                        }`}
                      />
                      <span>{thread.likesCount}</span>
                      <span className="hidden sm:inline text-[11px] font-normal">
                        {thread.isLiked ? 'Liked' : 'Support'}
                      </span>
                    </button>

                    {/* Reply Action Opening Animated Comment Drawer */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [thread.id]: !prev[thread.id],
                        }))
                      }
                      className={`flex items-center space-x-1.5 px-3.5 py-2 min-h-[44px] rounded-xl transition-all active:scale-95 ${
                        isCommentsOpen
                          ? 'bg-emerald-50 text-[#044728]'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-[#044728]" />
                      <span>{thread.replies.length}</span>
                      <span className="hidden sm:inline text-[11px] font-normal">
                        {language === 'hi' ? 'उत्तर' : 'Replies'}
                      </span>
                    </button>
                  </div>

                  {/* Share Action */}
                  <button
                    type="button"
                    onClick={() => handleShareThread(thread.id as any)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 min-h-[44px] rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'hi' ? 'साझा करें' : 'Share'}</span>
                  </button>
                </div>

                {/* Animated Comment Drawer / Replies Section */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#044728]" />
                      <span>
                        {language === 'hi' ? 'चर्चा व प्रतिक्रियाएं' : 'Deliberation & Replies'}{' '}
                        ({thread.replies.length})
                      </span>
                    </h5>

                    {/* Previous Replies */}
                    <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-emerald-100">
                      {thread.replies.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">
                          No replies yet. Be the first to share an insight!
                        </p>
                      ) : (
                        thread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1 text-xs"
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

                    {/* Reply Input Form */}
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
                        placeholder={
                          language === 'hi'
                            ? 'अपनी राय या समाधान लिखें...'
                            : 'Add to the discussion or propose an approach...'
                        }
                        className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728] bg-slate-50/60"
                      />
                      <button
                        type="submit"
                        className="bg-[#044728] hover:bg-[#03361e] text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center"
                        title="Send Reply"
                      >
                        <Send className="w-4 h-4 text-amber-300" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* "Start a Discussion" Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#044728] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'hi' ? 'जन संवाद में नई चर्चा शुरू करें' : 'Start a Discussion'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Share queries, research updates, or rural challenges
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDiscussion} className="space-y-4 text-xs">
              {/* Role Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Posting Role / आपकी भूमिका:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRole('CITIZEN')}
                    className={`p-2 rounded-xl border text-left font-bold transition-all flex items-center gap-1.5 ${
                      newRole === 'CITIZEN'
                        ? 'bg-emerald-50 text-[#044728] border-[#044728]'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>नागरिक / Citizen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewRole('RESEARCHER')}
                    className={`p-2 rounded-xl border text-left font-bold transition-all flex items-center gap-1.5 ${
                      newRole === 'RESEARCHER'
                        ? 'bg-purple-50 text-purple-900 border-purple-600'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Researcher (HEI)</span>
                  </button>
                </div>
              </div>

              {/* Topic Category */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Topic Domain / विषय श्रेणी:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as TopicCategory)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#044728]"
                >
                  <option value="WATER">Drinking Water &amp; Sanitation / पेयजल</option>
                  <option value="AGRITECH">Agritech &amp; Irrigation / कृषि तकनीक</option>
                  <option value="TRIBAL_LIVELIHOODS">Tribal Livelihoods / जनजातीय आजीविका</option>
                  <option value="RURAL_ENERGY">Rural Energy &amp; Solar / ग्रामीण ऊर्जा</option>
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Discussion Title / मुख्य शीर्षक:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Need low-cost soil testing method for Kanke farmers..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728]"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description / विस्तृत विवरण:
                </label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain your thought, ask for university guidance, or share field observations..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728]"
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tags (Comma separated):
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. WaterTesting, Kanke, Filter, SHG"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#044728]"
                />
              </div>

              {/* Simulated Voice Note Attachment */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-2">
                  <Mic className={`w-4 h-4 ${hasVoiceAttached ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div>
                    <span className="font-bold text-slate-800">Voice Note / आवाज़ में रिकॉर्डिंग</span>
                    <p className="text-[10px] text-slate-400">Attach oral context for non-literate members</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRecordingSim(true);
                    setTimeout(() => {
                      setIsRecordingSim(false);
                      setHasVoiceAttached(!hasVoiceAttached);
                    }, 600);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    hasVoiceAttached
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isRecordingSim ? 'Recording...' : hasVoiceAttached ? '✓ Attached' : '+ Record'}
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#044728] hover:bg-[#03361e] text-white font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'hi' ? 'संवाद में प्रकाशित करें' : 'Publish Discussion'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
