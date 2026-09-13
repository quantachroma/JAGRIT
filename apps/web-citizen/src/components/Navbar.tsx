'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  MapPin,
  AlertCircle,
  MessageSquare,
  LayoutDashboard,
  Menu,
  X,
  ShieldCheck,
  Send,
  Clock,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, currentLocation, t } = useCitizen();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('common', 'home', 'Home'), icon: ShieldCheck },
    { href: '/report', label: t('common', 'report', 'Report Problem'), icon: AlertCircle },
    { href: '/dashboard', label: t('common', 'dashboard', 'My Grievances'), icon: LayoutDashboard },
    { href: '/samvaad', label: t('common', 'samvaad', 'Jan Samvaad'), icon: MessageSquare },
    { href: '/time-machine', label: t('common', 'timeMachine', 'Time Machine'), icon: Clock },
    { href: '/whatsapp-simulator', label: t('common', 'whatsappSim', 'WhatsApp Seva Bot'), icon: Send },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  ];

  // Strictly localized portal branding
  const getAppTitle = () => {
    if (language === 'hi') return 'जागृत';
    if (language === 'sat') return 'ᱡᱟᱜᱽᱨᱤᱛ';
    return 'JAGRIT — Jharkhand Academic & Grassroots Resolution for Innovation and Transformation';
  };

  const getAppSubtitle = () => {
    if (language === 'hi') return 'झारखण्ड जन-समस्या नवाचार एवं समाधान पोर्टल';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱯᱳᱨᱴᱟᱞ';
    return 'Jharkhand Societal Innovation Portal';
  };

  const getDeptBadge = () => {
    if (language === 'hi') return 'झारखण्ड सरकार';
    if (language === 'sat') return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ';
    return 'Govt. of Jharkhand';
  };

  const getDeptFull = () => {
    if (language === 'hi') return 'उच्च एवं तकनीकी शिक्षा विभाग';
    if (language === 'sat') return 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ';
    return 'Department of Higher & Technical Education';
  };

  const getGreeting = () => {
    if (language === 'hi') return 'जोहार झारखण्ड';
    if (language === 'sat') return 'ᱡᱚᱦᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ';
    return 'Johar Jharkhand';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Gov Banner: Strict Single-Language Isolation */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              {getDeptBadge()}
            </span>
            <span className="font-medium text-[11px] sm:text-xs truncate max-w-[200px] sm:max-w-none text-slate-300">
              {getDeptFull()}
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sky-300 font-semibold text-[11px] sm:text-xs">
              {getGreeting()}
            </span>
            <div className="flex items-center text-slate-300 text-[10px] sm:text-[11px] gap-1 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
              <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-none">
                {currentLocation.district}, {currentLocation.block || 'Kanke'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Portal Branding */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group active:scale-95 transition-transform">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-blue-500 group-hover:scale-105 transition-transform">
                J
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                  {getAppTitle()}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:block">
                  {getAppSubtitle()}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Accessible >= 48px touch targets) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 min-h-[48px] rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-700'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Quick CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* 3 Distinct Pill Buttons with Generous Touch Targets (>= 48px) */}
            <div
              role="radiogroup"
              aria-label="Select Language"
              className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 gap-1"
            >
              {languages.map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    type="button"
                    key={l.code}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 sm:px-4 py-2 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-700/20'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 border border-transparent'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Report Issue Button */}
            <Link
              href="/report"
              className="hidden sm:inline-flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-5 py-2.5 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 border border-blue-800"
            >
              <AlertCircle className="w-4 h-4 text-sky-300" />
              <span>{t('common', 'report', 'Report a Problem')}</span>
            </Link>

            {/* Mobile menu button (Generous 48x48px target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 min-h-[48px] min-w-[48px] rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 min-h-[48px] rounded-xl text-sm font-bold active:scale-95 transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
