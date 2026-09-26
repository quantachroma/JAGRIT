'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Archive,
  Award,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Trophy,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const navigationItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: 'University Dashboard', href: '/university/dashboard', icon: LayoutDashboard },
  { label: 'Problem Statements', href: '/university/problems', icon: FileText },
  { label: 'Leaderboard', href: '/university/leaderboard', icon: Trophy },
  { label: 'NEP Credit Banking', href: '/university/credits', icon: Award },
  { label: 'Maintenance', href: '/university/maintenance', icon: Wrench },
  { label: 'Samvaad Exchange', href: '/university/samvaad', icon: MessageSquare },
  { label: 'R&D Repository', href: '/university/repository', icon: Archive },
];

export default function DedicatedUniversitySidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <Link href="/" className="mb-8 px-3.5">
        <div className="text-lg font-black tracking-tight text-slate-950">🏛️ JAGRIT JHARKHAND</div>
        <div className="mt-1 text-[10px] font-bold tracking-[0.12em] text-slate-500">
          ACADEMIA &amp; HEI RESEARCH WORKSPACE
        </div>
      </Link>

      <nav aria-label="University portal navigation" className="space-y-1.5">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
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
    </aside>
  );
}