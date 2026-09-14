'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Users, GraduationCap, Building2, Landmark, ArrowRight, ArrowLeft } from 'lucide-react';

export default function EntryPage() {
  const { language, setLanguage } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState<'citizen' | 'university' | 'industry' | 'govt'>('citizen');

  const greetings = {
    en: { greeting: 'Namaste', sub: 'Welcome to JAGRIT' },
    hi: { greeting: 'नमस्ते', sub: 'जागृत में आपका स्वागत है' },
    sat: { greeting: 'ᱡᱚᱦᱟᱨ (Johar)', sub: 'JAGRIT re sagun daram' },
  };

  const curr = greetings[language] || greetings.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-slate-100 flex flex-col justify-between p-6">
      {/* Top Bar: Language Only */}
      <div className="flex justify-end">
        <div className="bg-white border border-slate-200 shadow-sm p-1 rounded-xl flex space-x-1 text-xs font-bold">
          {(['en', 'hi', 'sat'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                language === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'संथाली'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Center Container */}
      <div className="max-w-md mx-auto w-full text-center">
        {!showLogin ? (
          /* STEP 1: Minimalist Landing */
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
              <span className="text-5xl">🙏</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black text-blue-900">{curr.greeting}</h2>
              <p className="text-xs text-slate-500 font-medium">{curr.sub}</p>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black text-blue-950 tracking-tight">JAGRIT</h1>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed px-4">
                Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society
              </p>
            </div>

            <button
              onClick={() => setShowLogin(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 text-sm transition-all transform hover:scale-105"
            >
              <span>{language === 'hi' ? 'पोर्टल में प्रवेश करें ➔' : 'Enter Portal ➔'}</span>
            </button>
          </div>
        ) : (
          /* STEP 2: 4-Role Login Card */
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl text-left space-y-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowLogin(false)}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">JAGRIT Sign In</span>
            </div>

            {/* 4 Role Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'citizen', label: 'Citizen', icon: Users },
                { id: 'university', label: 'University', icon: GraduationCap },
                { id: 'industry', label: 'Industry', icon: Building2 },
                { id: 'govt', label: 'Government', icon: Landmark },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setRole(t.id as any)}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                      role === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Inputs */}
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href =
                  role === 'citizen'
                    ? '/dashboard'
                    : role === 'university'
                    ? '/university/dashboard'
                    : role === 'industry'
                    ? '/industry/dashboard'
                    : '/government/dashboard';
              }}
            >
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  {role === 'citizen'
                    ? 'Phone / Voter ID / Aadhaar'
                    : role === 'university'
                    ? 'Campus + Faculty/Student ID'
                    : role === 'industry'
                    ? 'Corporate CIN / CSR-1 Registration No'
                    : 'Department + Official Govt Service Code'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    role === 'citizen'
                      ? '+91 98765 43210'
                      : role === 'university'
                      ? 'BIT Mesra · FAC-4402'
                      : role === 'industry'
                      ? 'CIN: L27100MH1907PLC000260'
                      : 'DHTE-SEC-2026-JH'
                  }
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all mt-2 flex items-center justify-center gap-1.5"
              >
                <span>Sign In ➔</span>
              </button>
            </form>

            {/* 1-Click Fast-Pass for Evaluators */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                ⚡ Quick Demo Fast-Pass (1-Click Login):
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                <Link
                  href="/dashboard"
                  className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg text-center transition-colors"
                >
                  👥 Citizen
                </Link>
                <Link
                  href="/university/dashboard"
                  className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg text-center transition-colors"
                >
                  🎓 University
                </Link>
                <Link
                  href="/industry/dashboard"
                  className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg text-center transition-colors"
                >
                  💼 Industry
                </Link>
                <Link
                  href="/government/dashboard"
                  className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg text-center transition-colors"
                >
                  🏛️ Govt
                </Link>
                <Link
                  href="/progress"
                  className="col-span-2 p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-center transition-colors font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>📊</span>
                  <span>
                    {language === 'hi'
                      ? 'राज्यव्यापी प्रगति एवं समाधान ट्रैकर'
                      : language === 'sat'
                      ? 'ᱯᱚᱱᱚᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱥᱚᱞᱦᱮ ᱴᱨᱮᱠᱟᱨ'
                      : 'Statewide Progress & Resolution Tracker'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-slate-400">
        Department of Higher & Technical Education, Government of Jharkhand
      </div>
    </div>
  );
}
