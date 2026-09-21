"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCitizen } from "@/context/CitizenContext";
import { STRINGS, toLang } from "@/components/university/i18n";
import ProfileHeader from "@/components/university/profile-header";
import BiddingCard from "@/components/university/bidding-card";
import XAISpiderChart from "@/components/university/xai-spider-chart";

export default function UniversityPortalPage() {
  // Hooks first, early return after — keeps hook order stable.
  const citizen = useCitizen() as unknown as Record<string, unknown> | null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Blocks SSR/hydration mismatches from localStorage-backed context and recharts.
  if (!mounted) return null;

  // ASSUMPTION: CitizenContext exposes the active language as `language` (or `lang`).
  // Adjust this one line if the context uses a different key.
  const lang = toLang(citizen?.language ?? citizen?.lang);
  const t = STRINGS[lang];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <nav className="border-b border-slate-200 bg-white" aria-label={t.portalTitle}>
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="rounded-md text-sm font-medium text-[#1D4ED8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
          >
            {t.back}
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <ProfileHeader lang={lang} />
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <BiddingCard lang={lang} />
          <XAISpiderChart lang={lang} />
        </div>
      </main>
    </div>
  );
}