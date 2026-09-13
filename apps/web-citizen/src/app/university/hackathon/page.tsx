"use client";
import Link from "next/link";
import { Lightbulb, MapPin } from "lucide-react";
import CountdownTimer from "@/components/countdown-timer";
import JuryGate from "@/components/jury-gate";
import { openChallenges, formatINR } from "@/lib/mock-data";

export default function HackathonIndex() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Dynamic Hackathon Arena</h1>
        <p className="mt-1 text-sm text-slate-600">ADR-004 live bidding · ADR-005 3-stage sprint (14 + 21 + 7 days) · ADR-006 30/40/30 escrow.</p>
      </div>
      {openChallenges.map((c, i) => (
        <div key={c.ticketId} className="space-y-3 rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600"><MapPin className="h-3.5 w-3.5" />{c.district} · {c.domain}</p>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-bold text-[#1E3A8A]">{formatINR(c.statePoolINR)} state pool</span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-bold text-[#2563EB]">AI {c.aiMatch}%</span>
          </div>
          <h2 className="text-base font-bold leading-snug sm:text-lg">#{c.ticketId} — {c.title}</h2>
          <CountdownTimer ticketId={c.ticketId} bids={i === 0 ? 2 : i === 1 ? 1 : 0} compact />
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:text-sm sm:font-semibold">
            <Link href={`/hackathon/${c.ticketId}/round-1`} className="rounded-lg bg-[#0F172A] px-3 py-2 text-center text-sm font-semibold text-white">Enter Round 1 · Ideation</Link>
            <Link href={`/hackathon/${c.ticketId}/round-2`} className="rounded-lg border px-3 py-2 text-center text-sm font-semibold">Round 2 · Prototype</Link>
            <Link href={`/hackathon/${c.ticketId}/round-3`} className="rounded-lg border px-3 py-2 text-center text-sm font-semibold">Round 3 · DPR &amp; Defense</Link>
          </div>
          <JuryGate ticketId={c.ticketId} />
          <p className="inline-flex items-center gap-1 text-xs text-slate-500"><Lightbulb className="h-3.5 w-3.5 text-sky-500" /> Tip: open Student R&amp;D Copilot from the sidebar on any arena route.</p>
        </div>
      ))}
    </div>
  );
}


