"use client";
import { useEffect, useMemo, useState } from "react";
import { Timer, Flame, UserCheck, Flag } from "lucide-react";

interface CountdownTimerProps {
  deadlineISO?: string;
  bids?: number;
  ticketId?: string;
  compact?: boolean;
}

function getDefaultDeadline(): number {
  return Date.now() + 4 * 24 * 3600 * 1000 + 7 * 3600 * 1000 + 42 * 60 * 1000;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function getTimeParts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds, closed: diff <= 0 };
}

export default function CountdownTimer({ deadlineISO, bids = 2, ticketId, compact = false }: CountdownTimerProps) {
  const target = useMemo(() => {
    if (deadlineISO) {
      const t = Date.parse(deadlineISO);
      if (!Number.isNaN(t)) return t;
    }
    return getDefaultDeadline();
  }, [deadlineISO]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const { days, hours, minutes, seconds, closed } = getTimeParts(target, now);
  const cells = [
    { v: pad(days), l: "Days" },
    { v: pad(hours), l: "Hours" },
    { v: pad(minutes), l: "Mins" },
    { v: pad(seconds), l: "Secs" },
  ];
  return (
    <section aria-label="10-day bidding countdown" className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">
          <Timer className="h-3.5 w-3.5" /> 10-Day Bidding Window {ticketId ? `· ${ticketId}` : ""}
        </p>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
          {bids} {bids === 1 ? "bid" : "bids"} logged
        </span>
      </div>
      <div className={`mt-3 grid grid-cols-4 gap-2 ${compact ? "max-w-sm" : "max-w-md"}`} role="timer">
        {cells.map((c) => (
          <div key={c.l} className="rounded-lg bg-[#0F172A] px-2 py-2.5 text-center text-white tabular-nums">
            <p className="animate-pulse text-xl font-bold leading-none sm:text-2xl" style={{ animationDuration: "2s" }}>{c.v}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">{c.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        {closed ? (
          <p className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white">
            <Flag className="h-3.5 w-3.5" /> Bidding window closed — transition executed per ADR-004.
          </p>
        ) : bids <= 0 ? (
          <p className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
            <Timer className="h-3.5 w-3.5" /> No bids yet — budget +20% and expanded eligibility on expiry (ADR-004).
          </p>
        ) : bids === 1 ? (
          <p className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">
            <UserCheck className="h-3.5 w-3.5" /> Solo Bidder: Will transition to Direct R&amp;D Track upon window close.
          </p>
        ) : (
          <p className="flex items-center gap-1.5 rounded-lg bg-orange-100 px-3 py-2 text-xs font-semibold text-orange-900">
            <Flame className="h-3.5 w-3.5" /> Competition Triggered: Will convert to 3-Stage Dynamic Hackathon Mode.
          </p>
        )}
      </div>
      <p className="mt-2 text-[11px] text-slate-500">ADR-004: exactly 1 bid goes Direct R&amp;D; 2+ bids go Dynamic Hackathon; 0 bids get +20% budget.</p>
    </section>
  );
}

