'use client';

import React, { useState, useMemo } from 'react';
import { useCitizen } from '@/context/CitizenContext';
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

export default function SamvaadPage() {
  const { language, currentLocation } = useCitizen();

  const [threads, setThreads] = useState<SamvaadThread[]>(INITIAL_THREADS);
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
    showToast('Reply posted successfully!');
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
      showToast('Discussion thread link copied to clipboard!');
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
        ? 'Dr. Anand Verma - BIT Mesra'
        : composerRole === 'STUDENT'
        ? 'Student Lead'
        : 'Citizen';

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
    showToast('Research discussion posted to Samvaad feed!');
  };

  // Filter Categories: All Threads | Water Research | Agritech | Energy | Livelihoods
  const categoryFilters: { id: TopicCategory; label: string }[] = [
    { id: 'ALL', label: 'All Threads' },
    { id: 'WATER', label: 'Water Research' },
    { id: 'AGRITECH', label: 'Agritech' },
    { id: 'ENERGY', label: 'Energy' },
    { id: 'LIVELIHOODS', label: 'Livelihoods' },
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
          <span>🗣️ Samvaad · Community Microblogging Feed</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
          Samvaad
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Open research and grassroots discussion forum connecting citizens, researchers, and student innovators across Jharkhand.
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
              placeholder="Start a research discussion or ask scientists..."
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
              <option value="WATER">Water Research</option>
              <option value="AGRITECH">Agritech</option>
              <option value="ENERGY">Energy</option>
              <option value="LIVELIHOODS">Livelihoods</option>
            </select>

            <select
              value={composerRole}
              onChange={(e) => setComposerRole(e.target.value as AuthorRole)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="RESEARCHER">Dr. Anand Verma - BIT Mesra</option>
              <option value="STUDENT">Student Lead</option>
              <option value="CITIZEN">Citizen</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleQuickPost}
            disabled={!composerText.trim()}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold px-5 py-2 min-h-[40px] rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <span>Post</span>
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
          placeholder="Search discussions, researchers, or topics..."
          className="w-full pl-9 pr-3 py-2.5 min-h-[42px] text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-2xs"
        />
      </div>

      {/* Threads Feed */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-2">
            <MessageCircle className="w-8 h-8 text-slate-400 mx-auto opacity-60" />
            <h3 className="text-sm font-bold text-slate-800">
              No discussions in this category yet
            </h3>
            <p className="text-xs text-slate-500">
              Be the first to post a research query or insight above!
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
                      <span>Like ({thread.likesCount})</span>
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
                      <span>Reply ({thread.replies.length})</span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={() => handleShareThread(thread)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all active:scale-95"
                    >
                      <Repeat2 className="w-4 h-4 text-slate-500" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Replies Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-blue-200">
                      {thread.replies.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">
                          No replies yet. Start the conversation!
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
                        placeholder="Write a research reply or inquiry..."
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
