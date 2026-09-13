"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb, FlaskConical, Presentation } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";

const STEPS = [
  { slug: "round-1", label: "Round 1: Ideation", meta: "14 Days", icon: Lightbulb },
  { slug: "round-2", label: "Round 2: Mentoring & Prototype", meta: "21 Days", icon: FlaskConical },
  { slug: "round-3", label: "Round 3: DPR & Physical Defense", meta: "7 Days", icon: Presentation },
];

export default function ArenaStepper({ id }: { id: string }) {
  const pathname = usePathname();
  const { open } = useCopilot();
  return (
    <section aria-label="Hackathon stepper" className="rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-lg font-bold">Hackathon Arena · {id}</h1>
        <button onClick={open} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-900 hover:bg-sky-200">
          <Lightbulb className="h-3.5 w-3.5" /> Open R&amp;D Copilot
        </button>
      </div>
      <ol className="mt-3 grid gap-2 sm:grid-cols-3">
        {STEPS.map((s, i) => {
          const href = `/hackathon/${id}/${s.slug}`;
          const active = pathname === href || pathname.startsWith(href);
          return (
            <li key={s.slug}>
              <Link href={href} aria-current={active ? "step" : undefined} className={`flex items-center gap-2 rounded-lg border p-3 ${active ? "border-[#2563EB] bg-blue-50" : "border-[#F1F5F9] bg-slate-50 hover:bg-slate-100"}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-[#2563EB] text-white" : "bg-slate-200 text-slate-700"}`}>{i + 1}</span>
                <span>
                  <span className="flex items-center gap-1 text-xs font-bold"><s.icon className="h-3.5 w-3.5" />{s.label}</span>
                  <span className="text-[11px] text-slate-500">{s.meta}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
