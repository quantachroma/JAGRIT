"use client";
import { X, Lightbulb } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";
import { openChallenges } from "@/lib/mock-data";

export default function CopilotPanel() {
  const { isOpen, close } = useCopilot();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Student R&D Copilot">
      <div className="absolute inset-0 bg-slate-900/40" onClick={close} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-4 py-3">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-semibold">Student R&amp;D Copilot</h2>
          <button onClick={close} aria-label="Close copilot" className="ml-auto rounded p-1 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3 overflow-y-auto p-4 text-sm">
          <p className="text-slate-600">Stage 0 mock guidance based on the open discovery feed.</p>
          {openChallenges.map((c) => (
            <div key={c.ticketId} className="rounded-lg border border-[#E2E8F0] p-3">
              <p className="text-xs font-semibold text-[#4F46E5]">{c.ticketId} · AI match {c.aiMatch}%</p>
              <p className="mt-1 font-medium">{c.title}</p>
              <p className="mt-1 text-xs text-slate-500">Suggested first step: scope {c.skills[0]} with one faculty reviewer.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
