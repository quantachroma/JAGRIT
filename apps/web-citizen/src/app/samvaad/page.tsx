'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
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

type CommunityThreadRow = {
  id: string;
  author_id?: string;
  author_name?: string;
  author_role?: string;
  content: string;
  tags: string[] | null;
  likes_count: number | null;
  created_at: string;
};

export default function SamvaadPage() {
  const { currentLocation, user } = useCitizen();
  const { t } = useLanguage();

  const [threads, setThreads] = useState<SamvaadThread[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(['WaterResources']);

  const mapCommunityThread = (row: CommunityThreadRow): SamvaadThread => {
    const content = row.content || '';
    const tags = row.tags || [];
    const authorRole: AuthorRole = row.author_role === 'RESEARCHER' || row.author_role === 'STUDENT'
      ? row.author_role
      : 'CITIZEN';

    return {
      id: row.id,
      author: row.author_name || user.name || 'Citizen Contributor',
      role: authorRole,
      roleLabel: authorRole === 'CITIZEN' ? t.samvaad.roles.citizen : row.author_role || t.samvaad.roles.citizen,
      location: `${currentLocation.district || 'Ranchi'}, ${currentLocation.block || 'Kanke'}`,
      timeAgo: new Date(row.created_at).toLocaleDateString(),
      category: tags.some((tag) => /water/i.test(tag)) ? 'WATER' : tags.some((tag) => /agri|livelihood/i.test(tag)) ? 'AGRITECH' : tags.some((tag) => /energy/i.test(tag)) ? 'ENERGY' : 'LIVELIHOODS',
      title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
      content,
      tags,
      likesCount: row.likes_count || 0,
      replies: [],
    };
  };

  useEffect(() => {
    const loadThreads = async () => {
      const { data, error } = await supabase
        .from('community_threads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load community threads:', error);
        return;
      }

      setThreads((data as CommunityThreadRow[]).map(mapCommunityThread));
    };

    void loadThreads();
  }, [currentLocation.block, currentLocation.district, t, user.name]);

  const [activeCategory, setActiveCategory] = useState<TopicCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Post Composer Box State
  const [composerText, setComposerText] = useState('');
  const [composerCategory, setComposerCategory] = useState<TopicCategory>('WATER');
  const [composerRole, setComposerRole] = useState<AuthorRole>('RESEARCHER');
  const availableTags = ['WaterResources', 'Palamu', 'Agritech', 'Energy', 'Livelihoods'];

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
  const handleToggleLike = async (thread: SamvaadThread) => {
    if (thread.isLiked) return;

    const nextLikesCount = thread.likesCount + 1;
    setThreads((prev) => prev.map((currentThread) =>
      currentThread.id === thread.id
        ? { ...currentThread, isLiked: true, likesCount: nextLikesCount }
        : currentThread
    ));

    const { error } = await supabase
      .from('community_threads')
      .update({ likes_count: nextLikesCount })
      .eq('id', thread.id);

    if (error) {
      setThreads((prev) => prev.map((currentThread) =>
        currentThread.id === thread.id
          ? { ...currentThread, isLiked: false, likesCount: thread.likesCount }
          : currentThread
      ));
      console.error('Failed to like community thread:', error);
    }
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
  const handleQuickPost = async () => {
    if (!composerText.trim()) return;

    const currentUserId = (user as typeof user & { id?: string }).id || crypto.randomUUID();
    const { data, error } = await supabase
      .from('community_threads')
      .insert({
        content: composerText.trim(),
        tags: selectedTags,
        author_id: currentUserId,
        likes_count: 0,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create community thread:', error);
      showToast('Unable to start discussion');
      return;
    }

    setThreads((prev) => [mapCommunityThread(data as CommunityThreadRow), ...prev]);
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

            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedTags((prev) =>
                        isSelected ? prev.filter((selectedTag) => selectedTag !== tag) : [...prev, tag]
                      )
                    }
                    className={`px-2.5 py-1 rounded-full border text-[10px] font-bold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
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
                      onClick={() => void handleToggleLike(thread)}
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
