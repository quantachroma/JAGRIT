'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  Globe,
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
    { href: '/dashboard', label: t('common', 'dashboard', 'Dashboard'), icon: LayoutDashboard },
    { href: '/samvaad', label: t('common', 'samvaad', 'Jan Samvaad'), icon: MessageSquare },
    { href: '/time-machine', label: 'Time Machine ⚡', icon: Clock },
    { href: '/whatsapp-simulator', label: 'WhatsApp Sim', icon: Send },
  ];

  const languages: { code: Language; label: string; subLabel: string }[] = [
    { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi' },
    { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ', subLabel: 'Santhali' },
    { code: 'en', label: 'English', subLabel: 'English' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner: Govt of Jharkhand & Johar */}
      <div className="bg-[#044728] text-white text-xs py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center space-x-2">
            <span className="bg-[#D97706] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              DHTE Jharkhand
            </span>
            <span className="font-medium text-[11px] sm:text-xs truncate max-w-[200px] sm:max-w-none">
              उच्च एवं तकनीकी शिक्षा विभाग | Government of Jharkhand
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-amber-200 font-semibold text-[11px] sm:text-xs flex items-center gap-1">
              ✨ {t('common', 'johar', 'Johar')}
            </span>
            <div className="flex items-center text-emerald-100 text-[10px] sm:text-[11px] gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-700/50">
              <MapPin className="w-3 h-3 text-amber-300 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {currentLocation.district}, {currentLocation.block || 'Kanke'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-[#044728] flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-[#D97706] group-hover:scale-105 transition-transform">
                J
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#044728] block leading-tight">
                  JAGRIT <span className="text-[#D97706] text-sm font-semibold">जागृत</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden md:block">
                  Jharkhand Societal Innovation Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all active:scale-95 ${
                    isActive
                      ? 'bg-emerald-50 text-[#044728] font-semibold border-b-2 border-[#044728]'
                      : 'text-slate-600 hover:text-[#044728] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#044728]' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <Globe className="w-3.5 h-3.5 ml-1.5 mr-0.5 text-slate-500 hidden sm:inline" />
              {languages.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 sm:px-2.5 py-1 min-h-[36px] sm:min-h-[40px] text-xs rounded-md font-medium transition-all active:scale-95 ${
                    language === l.code
                      ? 'bg-[#044728] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={l.subLabel}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link
              href="/report"
              className="hidden lg:inline-flex items-center space-x-1.5 bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95 border border-[#044728]"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{t('common', 'report', 'Report Issue')}</span>
            </Link>

            {/* Mobile menu button (Accessible 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 min-h-[44px] min-w-[44px] rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-medium active:scale-95 transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-[#044728] font-bold border-l-4 border-[#044728]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#044728]' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
