'use client';

import React, { useState } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Mic,
  Send,
  User,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface SamvaadPost {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  repliesCount: number;
  hasAudio?: boolean;
}

export default function SamvaadPage() {
  const { t, language, currentLocation } = useCitizen();
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState<SamvaadPost[]>([
    {
      id: '1',
      author: 'सोमरा उरांव (PRI Member)',
      location: 'Ranchi, Kanke',
      timeAgo: '2 hours ago',
      content:
        language === 'hi'
          ? 'कांके पंचायत के वार्ड 4 में नया सोलर चापाकल पायलट बहुत अच्छा काम कर रहा है। क्या अन्य वार्डों में भी इसे बढ़ाया जाएगा?'
          : language === 'sat'
          ? 'ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ ᱨᱮ ᱱᱟᱣᱟ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ᱾ ᱟᱨ ᱮᱴᱟᱜ ᱴᱚᱞᱟ ᱨᱮ ᱦᱚᱸ ᱦᱩᱭᱩᱜ-ᱟ?'
          : 'The new solar handpump pilot in Ward 4 of Kanke is running exceptionally well. Can we extend this to neighbouring wards?',
      upvotes: 24,
      repliesCount: 6,
      hasAudio: true,
    },
    {
      id: '2',
      author: 'अमित कुमार (BIT Mesra Student)',
      location: 'Ranchi, Mesra',
      timeAgo: '5 hours ago',
      content:
        language === 'hi'
          ? 'हमारी टीम ने फ्लोराइड निस्पंदन (Fluoride Filtration) के लिए कम लागत वाली मिट्टी-आधारित झिल्ली तैयार की है। हम फील्ड टेस्टिंग के लिए इच्छुक हैं।'
          : language === 'sat'
          ? 'ᱟᱞᱮ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱞᱟᱹᱜᱤᱫ ᱠᱚᱢ ᱠᱷᱚᱨᱚᱪ ᱦᱟᱥᱟ ᱯᱷᱤᱞᱴᱟᱨ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱫᱟᱞᱮ᱾'
          : 'Our university team has engineered a low-cost clay membrane for fluoride filtration. Looking forward to Gram Sabha testing.',
      upvotes: 41,
      repliesCount: 11,
    },
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: SamvaadPost = {
      id: Date.now().toString(),
      author: language === 'hi' ? 'नागरिक सदस्य' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ' : 'Citizen Participant',
      location: `${currentLocation.district}, ${currentLocation.block || 'Kanke'}`,
      timeAgo: 'Just now',
      content: newPostContent,
      upvotes: 1,
      repliesCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#044728] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{t('samvaad', 'title', 'Jan Samvaad — Citizen Community Forum')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          {language === 'hi' ? 'जन संवाद चौपाल' : language === 'sat' ? 'ᱵᱤᱪᱟᱹᱨ ᱟᱨ ᱨᱚᱯᱚᱲ (Jan Samvaad)' : 'Community Deliberation'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t('samvaad', 'subtitle', 'Collaborate with fellow residents, PRI officers, and university students.')}
        </p>
      </div>

      {/* New Post Creator */}
      <form onSubmit={handleCreatePost} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <textarea
          rows={3}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder={
            language === 'hi'
              ? 'अपने गांव की समस्या अथवा समाधान पर विचार रखें...'
              : language === 'sat'
              ? 'ᱟᱹᱛᱩ ᱥᱚᱢᱚᱥᱭᱟ ᱵᱟᱵᱚᱛ ᱟᱢᱟᱜ ᱵᱤᱪᱟᱹᱨ ᱚᱞ ᱢᱮ...'
              : 'Share your thoughts, local concerns, or ask university researchers...'
          }
          className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#044728]"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentLocation.district}, {currentLocation.block || 'Kanke'}</span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Send className="w-3 h-3 text-[#D97706]" />
            <span>{language === 'hi' ? 'साझा करें' : language === 'sat' ? 'ᱵᱷᱮᱡᱟᱭ ᱢᱮ' : 'Post'}</span>
          </button>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#044728] font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{post.author}</h4>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                    <span>• {post.timeAgo}</span>
                  </div>
                </div>
              </div>

              {post.hasAudio && (
                <span className="inline-flex items-center space-x-1 text-[10px] bg-amber-50 text-[#D97706] px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  <Mic className="w-3 h-3" />
                  <span>Voice Note</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{post.content}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-4 text-xs text-slate-500">
              <button
                onClick={() => {
                  setPosts(
                    posts.map((p) => (p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p))
                  );
                }}
                className="flex items-center space-x-1 hover:text-[#044728] font-medium"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                <span>{post.upvotes} {t('samvaad', 'upvoteDiscussion', 'Support')}</span>
              </button>

              <span className="flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.repliesCount} {t('samvaad', 'replies', 'Replies')}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

