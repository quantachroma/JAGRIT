'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  StatewideLanguage,
  UniversityLeaderboardItem,
} from './statewide-types';
import { UNIVERSITY_LEADERBOARD_DATA } from './statewide-data';
import {
  Search,
  Trophy,
  Award,
  CheckCircle2,
  Activity,
  FileCheck2,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface UniversityLeaderboardProps {
  language: StatewideLanguage;
}

export default function UniversityLeaderboard({ language }: UniversityLeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUniversities, setExpandedUniversities] = useState<Record<string, boolean>>({
    'bit-mesra': true, // Keep top university expanded initially for immediate demonstration
  });

  const toggleExpand = (uniId: string) => {
    setExpandedUniversities((prev) => ({
      ...prev,
      [uniId]: !prev[uniId],
    }));
  };

  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) return UNIVERSITY_LEADERBOARD_DATA;
    const query = searchQuery.toLowerCase().trim();

    return UNIVERSITY_LEADERBOARD_DATA.filter((uni) => {
      const matchName =
        uni.name.en.toLowerCase().includes(query) ||
        uni.name.hi.toLowerCase().includes(query) ||
        uni.name.sat.toLowerCase().includes(query);

      const matchExpertise =
        uni.coreExpertise.en.some((e) => e.toLowerCase().includes(query)) ||
        uni.coreExpertise.hi.some((e) => e.toLowerCase().includes(query)) ||
        uni.coreExpertise.sat.some((e) => e.toLowerCase().includes(query));

      const matchBadge =
        uni.badge.en.toLowerCase().includes(query) ||
        uni.badge.hi.toLowerCase().includes(query) ||
        uni.badge.sat.toLowerCase().includes(query);

      return matchName || matchExpertise || matchBadge;
    });
  }, [searchQuery]);

  const getSectionTitle = () => {
    if (language === 'hi') return 'किस विश्वविद्यालय ने समाधान किया — नवाचार लीडरबोर्ड एवं पोर्टफोलियो';
    if (language === 'sat') return 'ᱚᱠᱟ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱚᱞᱦᱮ ᱠᱮᱫᱟ — ᱥᱤᱨᱟᱹ ᱞᱤᱥᱴᱤ ᱟᱨ ᱠᱟᱹᱢᱤ';
    return 'University Resolution Leaderboard & Portfolios';
  };

  const getSectionSubtitle = () => {
    if (language === 'hi')
      return 'झारखंड के अग्रणी उच्च शिक्षण संस्थानों द्वारा हल की गई जमीनी समस्याएं, सक्रिय शोध अनुदान, पेटेंट एवं नागरिक कोरम रेटिंग।';
    if (language === 'sat')
      return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱢᱟᱨᱟᱝ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱦᱚᱛᱮᱛᱮ ᱥᱚᱞᱦᱮ ᱟᱠᱟᱱ ᱮᱴᱠᱮᱴᱚᱬᱮ, ᱯᱮᱴᱮᱱᱴ ᱟᱨ ᱦᱚᱲ ᱠᱳᱨᱟᱢ ᱨᱮᱴᱤᱝ᱾';
    return 'Detailed track record of higher education institutions resolving civic grievances through applied engineering, research grants, and verified Gram Sabha quorums.';
  };

  const getSearchPlaceholder = () => {
    if (language === 'hi') return 'विश्वविद्यालय का नाम अथवा अनुसंधान विषय खोजें...';
    if (language === 'sat') return 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱧᱩᱛᱩᱢ ᱥᱮ ᱥᱟᱬᱮᱥ ᱯᱟᱸᱡᱟᱭ ᱢᱮ...';
    return 'Search by university name or research discipline...';
  };

  const getPortfolioToggleText = (isExpanded: boolean, count: number) => {
    if (language === 'hi') {
      return isExpanded ? 'सत्यापित समाधान पोर्टफोलियो समेटें' : `सत्यापित समाधान पोर्टफोलियो देखें (${count} समस्याएं)`;
    }
    if (language === 'sat') {
      return isExpanded ? 'ᱥᱟᱹᱛ ᱟᱠᱟᱱ ᱠᱟᱹᱢᱤ ᱯᱚᱴᱚᱢ ᱢᱮ' : `ᱥᱟᱹᱛ ᱟᱠᱟᱱ ᱠᱟᱹᱢᱤ ᱧᱮᱞ ᱢᱮ (${count})`;
    }
    return isExpanded ? 'Collapse Solved Problems Portfolio' : `Expand Solved Problems Portfolio (${count} Solved)`;
  };

  return (
    <section className="space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === 'hi'
                ? 'संस्थागत उत्कृष्टता रैंकिंग'
                : language === 'sat'
                ? 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱢᱟᱹᱱ ᱨᱮᱸᱠ'
                : 'Institutional Excellence Ranking'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {getSectionTitle()}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {getSectionSubtitle()}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-10 pr-4 py-3 min-h-[48px] rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-2xs"
          />
        </div>
      </div>

      {/* University Cards List */}
      <div className="space-y-4">
        {filteredUniversities.map((uni) => {
          const isExpanded = !!expandedUniversities[uni.id];
          return (
            <div
              key={uni.id}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-300 transition-all shadow-xs overflow-hidden"
            >
              {/* Primary University Card Banner */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Rank & Info */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-700 text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-md border-2 border-blue-500">
                      #{uni.rank}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          {uni.name[language]}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{uni.badge[language]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Key Performance Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                    {/* Solved */}
                    <div className="text-center px-2">
                      <div className="text-base sm:text-lg font-black text-emerald-700 font-mono">
                        {uni.solvedCount}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {language === 'hi' ? 'समाधानित' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Solved'}
                      </div>
                    </div>

                    {/* Ongoing */}
                    <div className="text-center px-2 border-l border-slate-200">
                      <div className="text-base sm:text-lg font-black text-blue-700 font-mono">
                        {uni.ongoingCount}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {language === 'hi' ? 'प्रगति पर' : language === 'sat' ? 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ' : 'Ongoing'}
                      </div>
                    </div>

                    {/* Patents */}
                    <div className="text-center px-2 border-l border-slate-200">
                      <div className="text-base sm:text-lg font-black text-indigo-700 font-mono">
                        {uni.patentsCount}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {language === 'hi' ? 'पेटेंट' : language === 'sat' ? 'ᱯᱮᱴᱮᱱᱴ' : 'Patents'}
                      </div>
                    </div>

                    {/* Grants */}
                    <div className="text-center px-2 border-l border-slate-200">
                      <div className="text-base sm:text-lg font-black text-amber-700 font-mono">
                        {uni.totalGrants}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {language === 'hi' ? 'कुल अनुदान' : language === 'sat' ? 'ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ' : 'Grants'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Expertise Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-500 mr-1">
                    {language === 'hi' ? 'प्रमुख विशेषज्ञता:' : language === 'sat' ? 'ᱢᱩᱬᱩᱛ ᱠᱟᱹᱢᱤ:' : 'Core Expertise:'}
                  </span>
                  {uni.coreExpertise[language].map((expertise, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50/80 text-blue-800 border border-blue-200/70"
                    >
                      {expertise}
                    </span>
                  ))}
                </div>

                {/* Expand / Collapse Drawer Button (>= 48px touch target) */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(uni.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 hover:bg-blue-50 border border-blue-200 transition-all active:scale-95"
                  >
                    <span>{getPortfolioToggleText(isExpanded, uni.solvedPortfolio.length)}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {language === 'hi'
                        ? '१००% ग्राम सभा कोरम सत्यापित'
                        : language === 'sat'
                        ? '᱑᱐᱐% ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱥᱟᱹᱨᱤ'
                        : '100% Quorum Verified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable Solved Problems Drawer */}
              {isExpanded && (
                <div className="bg-slate-50/90 border-t border-slate-200 p-5 sm:p-6 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {language === 'hi'
                      ? 'हाल ही में समाधानित सामुदायिक समस्याएं:'
                      : language === 'sat'
                      ? 'ᱱᱤᱛᱚᱜ ᱥᱚᱞᱦᱮ ᱟᱠᱟᱱ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ:'
                      : 'Recently Solved Community Challenges:'}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {uni.solvedPortfolio.map((item) => (
                      <div
                        key={item.ticketId}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5 hover:border-emerald-500 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                              #{item.ticketId}
                            </span>
                            <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              {item.quorumScore}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {item.title[language]}
                          </h4>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.impactSnippet[language]}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{item.location[language]}</span>
                          </span>
                          <span className="font-bold text-slate-700 font-mono">
                            {item.grantAmount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
