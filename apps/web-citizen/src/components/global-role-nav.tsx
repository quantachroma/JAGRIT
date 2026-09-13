'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  GraduationCap,
  Briefcase,
  Landmark,
  Menu,
  X,
  MapPin,
  Trophy,
  Archive,
  LogIn,
  UserPlus,
  MessageSquare,
} from 'lucide-react';
import { useCitizen } from '@/context/CitizenContext';
import LanguageSwitcher from '@/components/language-switcher';

interface RoleNavPill {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_PILLS: RoleNavPill[] = [
  {
    label: '👥 Citizen',
    href: '/dashboard',
    icon: Users,
  },
  {
    label: '🎓 University',
    href: '/university/dashboard',
    icon: GraduationCap,
  },
  {
    label: '💼 Industry',
    href: '/industry/dashboard',
    icon: Briefcase,
  },
  {
    label: '🏛️ Govt DHTE',
    href: '/government/dashboard',
    icon: Landmark,
  },
  {
    label: '🗣️ Samvaad',
    href: '/samvaad',
    icon: MessageSquare,
  },
  {
    label: '🏆 Hackathon',
    href: '/university/hackathon/annual',
    icon: Trophy,
  },
  {
    label: '📚 R&D Failures',
    href: '/repository',
    icon: Archive,
  },
];

export default function GlobalRoleNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLocation, language } = useCitizen();

  const isPillActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLabels = {
    gov: language === 'hi' ? 'झारखंड सरकार' : language === 'sat' ? 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ' : 'Govt of Jharkhand',
    dhte: language === 'hi' ? 'उच्च एवं तकनीकी शिक्षा विभाग' : language === 'sat' ? 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ' : 'Dept of Higher & Technical Education',
    greeting: language === 'hi' ? 'जोहार झारखंड' : language === 'sat' ? 'ᱡᱚᱦᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ' : 'Johar Jharkhand',
    login: language === 'hi' ? 'लॉगिन' : language === 'sat' ? 'ᱵᱚᱞᱚᱱ' : 'Login',
    register: language === 'hi' ? 'पंजीकरण' : language === 'sat' ? 'ᱨᱮᱡᱤᱥᱴᱟᱨ' : 'Register',
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1E3A8A] border-b border-blue-900 shadow-md">
      {/* Top Status Ribbon */}
      <div className="bg-[#0F172A] text-white text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
              {navLabels.gov}
            </span>
            <span className="font-semibold text-blue-100 hidden sm:inline">
              {navLabels.dhte}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-blue-200 text-[10px] sm:text-[11px]">
            <span className="text-sky-300 font-bold">{navLabels.greeting}</span>
            <span className="text-blue-400/60">•</span>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-sky-300" />
              <span>
                {currentLocation?.district || 'Ranchi'}, {currentLocation?.block || 'Kanke'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 group active:scale-95 transition-transform shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-900 font-black text-xl shadow-md border-2 border-sky-400 group-hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-tight">
                JAGRIT
              </span>
              <span className="text-[10px] text-blue-200 font-medium block">
                Govt of Jharkhand · DHTE
              </span>
            </div>
          </Link>

          {/* Desktop High-Contrast Role Switcher Pills */}
          <nav
            aria-label="Stakeholder Portal Switcher"
            className="hidden lg:flex items-center space-x-1.5 overflow-x-auto py-1.5 scrollbar-none"
          >
            {ROLE_PILLS.map((pill) => {
              const active = isPillActive(pill.href);
              return (
                <Link
                  key={pill.href}
                  href={pill.href}
                  className={`px-3 py-2 min-h-[42px] rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 active:scale-95 whitespace-nowrap ${
                    active
                      ? 'bg-white text-blue-950 shadow-md ring-2 ring-sky-300 font-black'
                      : 'text-blue-100 hover:text-white hover:bg-white/10 border border-blue-800/50'
                  }`}
                >
                  <span>{pill.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Links: Language Switcher, Login & Register */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Prominent Language Switcher */}
            <LanguageSwitcher />

            <Link
              href="/"
              className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                pathname === '/'
                  ? 'bg-white text-blue-900 font-black shadow-sm'
                  : 'bg-blue-800/70 hover:bg-blue-800 text-white border border-blue-700/60'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{navLabels.login}</span>
            </Link>

            <Link
              href="/register"
              className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                pathname === '/register'
                  ? 'bg-white text-blue-900 font-black shadow-sm'
                  : 'bg-sky-500 hover:bg-sky-400 text-white shadow-sm'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{navLabels.register}</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-h-[42px] min-w-[42px] rounded-xl text-white hover:bg-white/10 border border-blue-700 focus:outline-none flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Toggle Portal Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Portal Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-900 bg-[#0F172A] px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-blue-900/60">
            <span className="text-xs text-blue-200 font-medium">भाषा / Language:</span>
            <LanguageSwitcher />
          </div>
          <div className="flex sm:hidden items-center space-x-2 pt-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-white text-blue-900 font-black shadow-sm'
                  : 'bg-blue-800/70 text-white border border-blue-700/60'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{navLabels.login}</span>
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/register'
                  ? 'bg-white text-blue-900 font-black shadow-sm'
                  : 'bg-sky-500 text-white shadow-sm'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{navLabels.register}</span>
            </Link>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300 px-3 pb-1">
            Stakeholder Portals
          </div>
          {ROLE_PILLS.map((pill) => {
            const active = isPillActive(pill.href);
            return (
              <Link
                key={pill.href}
                href={pill.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2.5 px-3.5 py-3 min-h-[48px] rounded-xl text-xs font-bold active:scale-95 transition-all ${
                  active
                    ? 'bg-white text-blue-950 font-black shadow-md'
                    : 'text-blue-100 hover:bg-white/10 border border-blue-800/60'
                }`}
              >
                <span>{pill.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
