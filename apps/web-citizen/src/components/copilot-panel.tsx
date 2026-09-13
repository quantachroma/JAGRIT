"use client";
import { X, Lightbulb } from "lucide-react";
import { useCopilot } from "@/components/copilot-provider";
import { CopilotBody } from "@/components/student-rd-copilot";

export default function CopilotPanel() {
  const { isOpen, close } = useCopilot();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Student R&D Copilot">
      <div className="absolute inset-0 bg-slate-900/40" onClick={close} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[#F1F5F9] px-4 py-3">
          <Lightbulb className="h-4 w-4 text-sky-500" />
          <h2 className="text-sm font-semibold">Student R&amp;D Copilot</h2>
          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-[#2563EB]">FAILURE-REPO AWARE</span>
          <button onClick={close} aria-label="Close copilot" className="ml-auto rounded p-1 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden p-4 text-sm">
          <CopilotBody />
        </div>
      </div>
    </div>
  );
}

