'use client';

import React from 'react';
import Link from 'next/link';
import { useCitizen, Language } from '@/context/CitizenContext';
import { Shield, Sparkles } from 'lucide-react';

export default function NamasteSplash() {
  const { hasSeenSplash, setHasSeenSplash, language, setLanguage, t, mounted } = useCitizen();

  // Hydration safety: do not render on server or if user has already seen splash
  if (!mounted || hasSeenSplash) {
    return null;
  }

  const languages: { code: Language; label: string }[] = [
    { code: 'hi', label: 'हिन्दी' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'en', label: 'English' },
  ];

  const handleEnter = () => {
    setHasSeenSplash(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-greeting-heading"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
    >
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full shadow-2xl border border-slate-100 text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Top Gold Radiant Ring: Subtle radial amber gradient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-amber-200/50 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Official State Insignia Emblem (Dignified Vector Heraldry, NO emojis) */}
        <div className="relative mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#044728] to-[#15803D] flex items-center justify-center text-white shadow-lg border-2 border-emerald-500/40">
          <svg
            className="w-9 h-9 text-amber-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Ashoka Pillar / Civic Monument Stylized Heraldry */}
            <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
            <path d="M12 6v6" />
            <circle cx="12" cy="14" r="2" />
            <path d="M8 10h8" />
          </svg>
          <span className="sr-only">State Seal of Jharkhand</span>
        </div>

        {/* Dignified Calligraphic / Serif Typographic Greeting (NO emojis) */}
        <h1
          id="splash-greeting-heading"
          className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2 leading-tight"
        >
          {t('splash_greeting')}
        </h1>

        {/* Saffron / Emerald Decorative Horizontal Line */}
        <div className="w-20 h-1 bg-gradient-to-r from-[#D97706] to-[#044728] mx-auto rounded-full mb-4" />

        {/* Department Insignia */}
        <div className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold tracking-wider px-3.5 py-1 rounded-full uppercase mb-6 border border-slate-200">
          {t('dhte_label')}
        </div>

        {/* Slogan Card */}
        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 mb-8">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#044728] mb-2 leading-snug">
            {t('splash_slogan_title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {t('splash_slogan_sub')}
          </p>
        </div>

        {/* Language Selection Cluster: 3 High-Contrast Pills */}
        <div className="mb-8">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Select Preferred Language
          </div>
          <div className="flex items-center justify-center gap-2">
            {languages.map((l) => {
              const isActive = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-[#044728] text-white font-bold shadow-sm ring-2 ring-[#044728]/20'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                  aria-pressed={isActive}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleEnter}
            className="w-full bg-[#044728] hover:bg-[#065f35] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition transform active:scale-95 text-base cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('splash_enter_btn')}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>

          <Link
            href="/auth"
            onClick={handleEnter}
            className="inline-block text-xs font-bold text-slate-600 hover:text-[#044728] underline underline-offset-4 py-1.5 transition-colors"
          >
            {t('nav_login')}
          </Link>
        </div>
      </div>
    </div>
  );
}

