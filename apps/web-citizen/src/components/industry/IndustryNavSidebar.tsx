'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Layers, MessageSquare, Users } from 'lucide-react';

const navigationItems = [
  { label: 'CSR Portfolio Hub', href: '/industry/dashboard', icon: Building2 },
  { label: 'Co-Funding Pipeline', href: '/industry/pipeline', icon: Layers },
  { label: 'Corporate Mentorship Hub', href: '/industry/mentorship', icon: Users },
  { label: 'Samvaad Exchange', href: '/industry/samvaad', icon: MessageSquare },
];

export default function IndustryNavSidebar() {
  const pathname = usePathname();
  if (!pathname.startsWith('/industry/')) return null;

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-8">
        <Link href="/" className="block px-2 text-sm font-black tracking-tight text-blue-950">
          🏛️ JAGRIT JHARKHAND · CORPORATE CSR HUB
        </Link>
        <nav aria-label="Industry navigation" className="space-y-1.5">
          {navigationItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={isActive
                ? 'bg-blue-600 text-white font-semibold shadow-sm rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all'}>
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}