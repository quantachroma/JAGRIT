'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { CitizenProvider } from '@/context/CitizenContext';
import {
  Users,
  GraduationCap,
  Building2,
  Landmark,
  MessageSquare,
  Trophy,
  Archive,
  MessageCircle,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import AIAssistantDrawer from '@/components/ai-assistant-drawer';
import { useCitizen } from '@/context/CitizenContext';
import { getActiveSession, clearActiveSession } from '@/lib/mock-auth';

type NavRole = 'CITIZEN' | 'STUDENT' | 'FACULTY_PI' | 'INDUSTRY_MENTOR' | 'EVALUATOR' | 'PRI_OFFICER' | 'ADMIN';
const ROLE_ALIASES: Record<string, NavRole> = { UNIVERSITY: 'STUDENT', INDUSTRY: 'INDUSTRY_MENTOR', GOVERNMENT: 'EVALUATOR' };
const FULL_VISIBILITY_ROLES: NavRole[] = ['EVALUATOR', 'PRI_OFFICER', 'ADMIN'];

const PROTECTED_ROUTES = [
  '/dashboard',
  '/pledge-support',
  '/university',
  '/industry',
  '/government',
  '/feedback',
  '/report',
  '/samvaad',
  '/repository',
  '/time-machine',
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useCitizen();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const isLandingPage = pathname === '/';

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (!isProtected) {
      setIsCheckingAuth(false);
      return;
    }

    const session = getActiveSession();
    const isAuth = Boolean(session || user.isAuthenticated);

    if (!isAuth) {
      let impliedRole = 'citizen';
      if (pathname.startsWith('/university')) impliedRole = 'university';
      else if (pathname.startsWith('/industry')) impliedRole = 'industry';
      else if (pathname.startsWith('/government')) impliedRole = 'govt';

      router.replace(`/?login=true&role=${impliedRole}&redirect=${encodeURIComponent(pathname)}`);
    } else {
      setIsCheckingAuth(false);
    }
  }, [pathname, isProtected, user.isAuthenticated, router]);

  if (isLandingPage) {
    return <main>{children}</main>;
  }

  if (isProtected && isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#051120] text-sky-100 p-4">
        <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-wider text-amber-200">
          Verifying JAGRIT Single Sign-On session...
        </p>
      </div>
    );
  }

  const role = user.role ? ROLE_ALIASES[user.role] || user.role as NavRole : null;
  const navItems = [
    { label: t.nav.citizen, href: '/dashboard', icon: Users, roles: ['CITIZEN', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.progress || 'Progress Tracker', href: '/dashboard/progress/JAG-4102', icon: TrendingUp, roles: ['CITIZEN', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.feedback || '45-Day Feedback', href: '/feedback', icon: CheckCircle2, roles: ['CITIZEN', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.whatsapp, href: '/whatsapp-simulator', icon: MessageCircle, roles: ['CITIZEN', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.pledgeSupport || 'Pledge & Support', href: '/pledge-support', icon: HeartHandshake, roles: ['CITIZEN', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.university, href: '/university/dashboard', icon: GraduationCap, roles: ['STUDENT', 'FACULTY_PI', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.industry, href: '/industry/dashboard', icon: Building2, roles: ['INDUSTRY_MENTOR', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.govt, href: '/government/dashboard', icon: Landmark, roles: FULL_VISIBILITY_ROLES },
    { label: t.nav.samvaad, href: '/samvaad', icon: MessageSquare, roles: ['CITIZEN', 'STUDENT', 'FACULTY_PI', 'INDUSTRY_MENTOR', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.hackathon, href: '/university/hackathon/annual', icon: Trophy, roles: ['STUDENT', 'FACULTY_PI', 'INDUSTRY_MENTOR', ...FULL_VISIBILITY_ROLES] },
    { label: t.nav.rndFailures, href: '/repository', icon: Archive, roles: ['STUDENT', 'FACULTY_PI', ...FULL_VISIBILITY_ROLES] },
  ].filter((item) => role && item.roles.includes(role));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* UNSTOP-STYLE FIXED VERTICAL LEFT SIDEBAR */}
      <aside className="w-60 bg-white border-r border-slate-200 fixed top-0 bottom-0 left-0 z-40 hidden md:flex flex-col justify-between p-4 shadow-sm">
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2 px-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <span className="text-lg font-black text-blue-950 tracking-tight block">JAGRIT</span>
              <span className="text-[10px] text-blue-700 font-bold block uppercase tracking-wider">
                {language === 'hi' ? 'झारखंड' : 'Jharkhand'}
              </span>
            </div>
          </Link>

          {/* Vertical Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="text-[10px] text-slate-400 px-2 py-3 border-t border-slate-100">
          {language === 'hi' ? 'झारखंड सरकार • डीएचटीई' : language === 'sat' ? 'Jharkhand Sarkar • DHTE' : 'Govt of Jharkhand • DHTE'}
        </div>
      </aside>

      {/* MOBILE DRAWER / FLYOUT MENU */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-64 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <Link href="/" onClick={() => setMobileNavOpen(false)} className="flex items-center space-x-2">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <span className="text-lg font-black text-blue-950 tracking-tight block">JAGRIT</span>
                    <span className="text-[10px] text-blue-700 font-bold block uppercase tracking-wider">
                      {language === 'hi' ? 'झारखंड' : 'Jharkhand'}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="text-[10px] text-slate-400 px-2 py-3 border-t border-slate-100">
              {language === 'hi' ? 'झारखंड सरकार • डीएचटीई' : language === 'sat' ? 'Jharkhand Sarkar • DHTE' : 'Govt of Jharkhand • DHTE'}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* MAIN VIEWPORT WITH TOP LANGUAGE HEADER */}
      <div className="flex-1 md:ml-60 min-h-screen flex flex-col">
        <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-blue-950 tracking-wide uppercase">
              {t.stateHeader}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Clean Top-Right Language Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-xs font-bold">
              {(['en', 'hi', 'sat'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                    language === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'संथाली'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                logout();
                clearActiveSession();
                window.location.href = '/?login=true';
              }}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              {t.signOut}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>

      <AIAssistantDrawer />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CitizenProvider>
            <LayoutContent>{children}</LayoutContent>
          </CitizenProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
