"use client";
import { useMemo, useState } from "react";
import { Star, Trophy, Scale } from "lucide-react";

export const JURY_CRITERIA = [
  { id: "feasibility", label: "Feasibility", weight: 40, hint: "Technical soundness, lab readiness, deployment plan." },
  { id: "sustainability", label: "Sustainability", weight: 30, hint: "O&M handover, SHG ownership, 5-yr upkeep." },
  { id: "cost", label: "Cost Effectiveness", weight: 30, hint: "BOM within State + CSR ceiling, frugal sourcing." },
] as const;

export type JuryCriterionId = (typeof JURY_CRITERIA)[number]["id"];

export function JuryScoreCard({ ticketId, compact = false }: { ticketId: string; compact?: boolean }) {
  const [scores, setScores] = useState<Record<JuryCriterionId, number>>({
    feasibility: 0,
    sustainability: 0,
    cost: 0,
  });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const total = useMemo(() => {
    const weighted =
      (scores.feasibility / 5) * 40 + (scores.sustainability / 5) * 30 + (scores.cost / 5) * 30;
    return Math.round(weighted * 10) / 10;
  }, [scores]);

  const complete = scores.feasibility > 0 && scores.sustainability > 0 && scores.cost > 0;

  function set(id: JuryCriterionId, v: number) {
    setScores((p) => ({ ...p, [id]: v }));
    setSubmitted(null);
  }

  return (
    <section
      aria-label={`Jury scoring for ${ticketId}`}
      className={`rounded-xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white p-4 shadow-sm ${compact ? "" : "sm:p-5"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-300">
          <Trophy className="h-3.5 w-3.5" /> Jury Presentation Mode · {ticketId}
        </p>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900">
          <Scale className="h-3.5 w-3.5" /> Feasibility 40% | Sustainability 30% | Cost 30%
        </span>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {JURY_CRITERIA.map((c) => (
          <div key={c.id} className="rounded-lg border border-amber-200 bg-white p-3">
            <p className="text-sm font-bold text-slate-900">
              {c.label} <span className="text-xs font-semibold text-amber-700">({c.weight}%)</span>
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{c.hint}</p>
            <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label={`${c.label} star rating`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={scores[c.id] === s}
                  aria-label={`${c.label} ${s} star${s > 1 ? "s" : ""}`}
                  onClick={() => set(c.id, s)}
                  className="rounded p-0.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#4F46E5]"
                >
                  <Star
                    className={`h-6 w-6 ${s <= scores[c.id] ? "fill-amber-400 text-amber-500" : "fill-slate-100 text-slate-300"}`}
                  />
                </button>
              ))}
              <span className="ml-1 text-xs font-bold tabular-nums text-slate-700">
                {scores[c.id] > 0 ? `${scores[c.id]}/5` : "—/5"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <p className="text-sm font-bold tabular-nums text-slate-900" aria-live="polite">
          Weighted jury score: {complete ? `${total} / 100` : "— / 100"}
        </p>
        <button
          disabled={!complete}
          onClick={() => setSubmitted(`Jury score ${total}/100 locked for ${ticketId} (F:${scores.feasibility} S:${scores.sustainability} C:${scores.cost}).`)}
          className="ml-auto rounded-lg bg-[#0F172A] px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Lock jury score
        </button>
      </div>
      {submitted && (
        <p role="status" className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
          {submitted}
        </p>
      )}
    </section>
  );
}

export default JuryScoreCard;
