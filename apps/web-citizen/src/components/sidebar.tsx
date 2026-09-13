"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GraduationCap, Lightbulb, Rocket, Archive } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";

const links = [
  { href: "/dashboard", label: "Discovery Feed", icon: Compass },
  { href: "/hackathon", label: "Dynamic Hackathon Arena", icon: Rocket },
  { href: "/credits", label: "NEP 2020 APAAR Credits", icon: GraduationCap },
  { href: "/repository", label: "R&D Failure Repository", icon: Archive },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { toggle } = useCopilot();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#F1F5F9] bg-white md:block">
      <nav className="space-y-1 p-4" aria-label="Institution navigation">
        {links.slice(0, 2).map((l) => (
          <NavLink key={l.href} href={l.href} active={pathname === l.href || pathname.startsWith(l.href + "/")} icon={<l.icon className="h-4 w-4" />} label={l.label} />
        ))}
        <button
          onClick={toggle}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <Lightbulb className="h-4 w-4 text-sky-500" />Student R&amp;D Copilot
          <span className="ml-auto rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">SLIDE-OUT</span>
        </button>
        {links.slice(2).map((l) => (
          <NavLink key={l.href} href={l.href} active={pathname === l.href} icon={<l.icon className="h-4 w-4" />} label={l.label} />
        ))}
      </nav>
      <div className="mx-4 mb-4 rounded-lg border border-[#F1F5F9] bg-slate-50 p-3 text-xs text-slate-600">
        <p className="font-semibold text-slate-800">Stage 4 · Demo-ready</p>
        <p>Discovery → Hackathon → Credits → Failure Repo wired. Jury Mode in top bar.</p>
      </div>
      <nav className="space-y-1 p-4 pt-0 md:hidden" aria-label="Institution navigation mobile" />
    </aside>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${active ? "bg-[#0F172A] text-white" : "text-slate-700 hover:bg-slate-100"}`}
    >
      {icon}{label}
    </Link>
  );
}
