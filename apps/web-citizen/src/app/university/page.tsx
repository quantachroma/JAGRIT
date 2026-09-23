"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCitizen } from "@/context/CitizenContext";
import { STRINGS, toLang } from "@/components/university/i18n";
import ProfileHeader from "@/components/university/profile-header";
import BiddingCard from "@/components/university/bidding-card";
import XAISpiderChart from "@/components/university/xai-spider-chart";
import EscalationIndicator from "@/components/university/escalation-indicator";
import HackathonWorkspace from "@/components/university/hackathon-workspace";
import LabExchange from "@/components/university/lab-exchange";
import NepCredits from "@/components/university/nep-credits";

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
        <section aria-labelledby="exam-buffer-title" className="rounded-xl border border-violet-200 bg-violet-50 p-4 shadow-sm sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Academic continuity safeguard</p>
              <h2 id="exam-buffer-title" className="mt-1 text-lg font-bold text-violet-950">Exam Pause Buffer · up to 14 days</h2>
              <p className="mt-1 text-sm leading-relaxed text-violet-900">During a university semester examination period, the hackathon clock automatically pauses for up to 14 days. The pause is injected into the schedule without penalizing student teams or changing the approved grant.</p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-violet-300 bg-white px-3 py-1.5 text-xs font-bold text-violet-800">Auto-injected at exam registry match</span>
          </div>
        </section>
        <EscalationIndicator />
        <HackathonWorkspace />
        <NepCredits />
        <LabExchange />
      </main>
    </div>
  );
}