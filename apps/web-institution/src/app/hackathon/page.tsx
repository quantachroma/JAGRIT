import Link from "next/link";
import { openChallenges, formatINR } from "@/lib/mock-data";

export default function HackathonIndex() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dynamic Hackathon Arena</h1>
      <p className="text-sm text-slate-600">Stage 0 placeholder. Each arena round route already exists under /hackathon/[id]/round-N.</p>
      <div className="grid gap-3">
        {openChallenges.map((c) => (
          <div key={c.ticketId} className="rounded-xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm font-semibold">#{c.ticketId} · {c.title}</p>
            <p className="text-xs text-slate-500">{formatINR(c.statePoolINR)} · AI {c.aiMatch}%</p>
            <div className="mt-2 flex gap-3 text-sm font-medium text-[#4F46E5]">
              <Link href={`/hackathon/${c.ticketId}/round-1`}>Round 1</Link>
              <Link href={`/hackathon/${c.ticketId}/round-2`}>Round 2</Link>
              <Link href={`/hackathon/${c.ticketId}/round-3`}>Round 3</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
