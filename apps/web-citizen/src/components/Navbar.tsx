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
      <div className="bg-[#044728] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#D97706] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              DHTE Jharkhand
            </span>
            <span className="font-medium hidden sm:inline">
              उच्च एवं तकनीकी शिक्षा विभाग | Government of Jharkhand
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-amber-200 font-semibold flex items-center gap-1">
              ✨ {t('common', 'johar', 'Johar Jharkhand')}
            </span>
            <div className="flex items-center text-emerald-100 text-[11px] gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-700/50">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>
                {currentLocation.district}, {currentLocation.block || 'Kanke'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-[#044728] flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-[#D97706] group-hover:scale-105 transition-transform">
                J
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#044728] block leading-tight">
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
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-slate-500 hidden sm:inline" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
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
              className="hidden lg:inline-flex items-center space-x-1.5 bg-[#044728] hover:bg-[#03361e] text-white px-3.5 py-2 rounded-md text-xs font-semibold shadow-sm hover:shadow transition-all border border-[#044728]"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{t('common', 'report', 'Report Issue')}</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-[#044728] font-semibold'
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

