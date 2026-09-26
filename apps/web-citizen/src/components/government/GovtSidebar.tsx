'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Archive,
  Building2,
  GraduationCap,
  Landmark,
  MessageSquare,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

interface GovernmentNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  activeCheck: (pathname: string) => boolean;
}

const navigationItems: GovernmentNavItem[] = [
  {
    label: 'Government Evaluator',
    href: '/government/dashboard',
    icon: Landmark,
    activeCheck: (pathname) => pathname.startsWith('/government') || pathname.startsWith('/admin'),
  },
  {
    label: 'University Matching',
    href: '/university/dashboard',
    icon: GraduationCap,
    activeCheck: (pathname) =>
      (pathname === '/university' || pathname.startsWith('/university/dashboard')) &&
      !pathname.includes('hackathon'),
  },
  {
    label: 'Bidding & Hackathon',
    href: '/university/hackathon',
    icon: Trophy,
    activeCheck: (pathname) => pathname.includes('hackathon'),
  },
  {
    label: 'Industry / CSR',
    href: '/industry/dashboard',
    icon: Building2,
    activeCheck: (pathname) => pathname.startsWith('/industry'),
  },
  {
    label: 'Progress Tracker',
    href: '/progress',
    icon: TrendingUp,
    activeCheck: (pathname) => pathname === '/progress' || pathname.startsWith('/progress/'),
  },
  {
    label: 'R&D Repository',
    href: '/repository',
    icon: Archive,
    activeCheck: (pathname) => pathname.startsWith('/repository'),
  },
  {
    label: 'Samvaad',
    href: '/samvaad',
    icon: MessageSquare,
    activeCheck: (pathname) => pathname.startsWith('/samvaad'),
  },
];

export default function GovtSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-8">
        <Link href="/" className="flex items-start gap-3 px-2">
          <span className="text-3xl leading-none" aria-hidden="true">
            🏛️
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-blue-950">JAGRIT JHARKHAND</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-blue-700">
              DEPARTMENT OF HIGHER &amp; TECHNICAL EDUCATION
            </span>
          </span>
        </Link>

        <nav aria-label="Government navigation" className="space-y-1.5">
          {navigationItems.map(({ label, href, icon: Icon, activeCheck }) => {
            const isActive = activeCheck(pathname);

            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all'
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-100 px-2 pt-4 text-[11px] leading-5 text-slate-500">
        <span className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-700">
          Government of Jharkhand · State Evaluation Command
        </span>
      </div>
    </aside>
  );
}