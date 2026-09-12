import Link from "next/link";
import { ArrowRight, MapPin, IndianRupee, Sparkles } from "lucide-react";
import { openChallenges, grantSummary, formatINR, institutions } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">Discovery Feed</p>
        <h1 className="mt-1 text-2xl font-bold text-[#0F172A]">Open Jharkhand challenges</h1>
        <p className="mt-1 text-sm text-slate-600">
          {grantSummary.openTickets} open tickets · {formatINR(grantSummary.statePoolTotalINR)} combined state pool · {grantSummary.activeGrantsLabel}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {openChallenges.map((c) => (
          <article key={c.ticketId} className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">#{c.ticketId}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 font-semibold text-[#4F46E5]">
                <Sparkles className="h-3 w-3" />AI Match {c.aiMatch}%
              </span>
            </div>
            <h2 className="mt-3 text-base font-semibold leading-snug">{c.title}</h2>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5" />{c.district} · {c.domain}
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{c.summary}</p>
            <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#044728]">
              <IndianRupee className="h-4 w-4" />State Pool {formatINR(c.statePoolINR)}
            </p>
            {c.csrMatching && <p className="text-xs text-slate-500">CSR Matching: {c.csrMatching}</p>}
            <Link href="/hackathon" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#4F46E5]">
              Open in Hackathon Arena<ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="text-sm font-semibold">Institutional capabilities (Stage 0 mock)</h2>
        <ul className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
          {institutions.map((i) => (
            <li key={i.id} className="rounded-lg bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">{i.name}</p>
              <p className="text-xs">{i.cell} · {i.district}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
