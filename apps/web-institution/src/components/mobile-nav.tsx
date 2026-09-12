"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GraduationCap, Lightbulb, Rocket, Archive } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";

export default function MobileNav() {
  const pathname = usePathname();
  const { toggle } = useCopilot();
  const item = (href: string, active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${active ? "text-white" : "text-slate-300"}`;
  return (
    <nav className="sticky bottom-0 z-40 flex border-t border-slate-700 bg-[#0F172A] px-2 md:hidden" aria-label="Institution navigation mobile">
      <Link href="/dashboard" className={item("/dashboard", pathname === "/dashboard")}>
        <Compass className="h-4 w-4" />Discovery
      </Link>
      <Link href="/hackathon" className={item("/hackathon", pathname.startsWith("/hackathon"))}>
        <Rocket className="h-4 w-4" />Arena
      </Link>
      <button onClick={toggle} className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium text-amber-300">
        <Lightbulb className="h-4 w-4" />Copilot
      </button>
      <Link href="/credits" className={item("/credits", pathname === "/credits")}>
        <GraduationCap className="h-4 w-4" />Credits
      </Link>
      <Link href="/repository" className={item("/repository", pathname === "/repository")}>
        <Archive className="h-4 w-4" />Library
      </Link>
    </nav>
  );
}
