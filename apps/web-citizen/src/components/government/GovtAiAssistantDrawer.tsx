'use client';

import { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';

export interface GovtAiAssistantDrawerProps {
  innovationPool: number;
  activeProjects: number;
  escrowLocked: number;
  pendingReviewTickets: number;
  typeATickets: number;
  typeBTickets: number;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  '📊 Summarize state escrow balances & active tranches',
  '⚖️ Check PESA Act compliance rules for Scheduled Areas',
  '🏢 Verify Tata Steel & CCL Schedule VII CSR allocation status',
  '🔍 Audit AI Triage Queue distribution (Type A vs Type B)',
];

function formatCrore(amount: number): string {
  return `₹${(amount / 10000000).toFixed(2)} Cr`;
}

function buildResponse(prompt: string, props: GovtAiAssistantDrawerProps): string {
  const normalized = prompt.toLowerCase();

  if (normalized.includes('pesa')) {
    return 'PESA Act 1996 check: Scheduled Area deployments require Gram Sabha consultation and the applicable local consent record before field installation. Confirm the PESA or standard NOC is attached before authorizing the final escrow tranche. This review complements the NEP 2020 community verification workflow.';
  }

  if (normalized.includes('tata') || normalized.includes('ccl') || normalized.includes('schedule')) {
    return 'Schedule VII review: Tata Steel and CCL allocations are tracked as 1:1 state co-grants under Companies Act 2013, Section 135. Confirm the corporate contribution receipt, Schedule VII category, and escrow lock in the project audit record before marking the partnership compliant.';
  }

  if (normalized.includes('triage') || normalized.includes('type a') || normalized.includes('type b')) {
    return `AI triage snapshot: ${props.pendingReviewTickets} ticket(s) remain pending review. Current evaluator decisions: ${props.typeATickets} Type A routine civic and ${props.typeBTickets} Type B applied R&D. Human-in-the-loop confirmation remains required before routing or university broadcast.`;
  }

  return `State escrow snapshot: Innovation Pool ${formatCrore(props.innovationPool)}, Escrow Locked ${formatCrore(props.escrowLocked)}, and ${props.activeProjects} active HEI projects. ${props.pendingReviewTickets} ticket(s) await evaluator review. Active tranches remain subject to milestone evidence, Companies Act 2013 Section 135 compliance, and the NEP 2020 academic-credit workflow.`;
}

export default function GovtAiAssistantDrawer(props: GovtAiAssistantDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextId, setNextId] = useState(1);

  function ask(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    const userMessage: ChatMessage = { id: nextId, role: 'user', content: trimmed };
    const assistantMessage: ChatMessage = {
      id: nextId + 1,
      role: 'assistant',
      content: buildResponse(trimmed, props),
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setNextId((current) => current + 2);
    setQuery('');
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-6 z-40 inline-flex items-center gap-2 rounded-2xl bg-[#0F172A] px-4 py-3 text-xs font-black text-white shadow-2xl ring-1 ring-slate-700 transition hover:bg-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Open DHTE Policy Copilot"
        >
          <Bot className="h-4 w-4 text-sky-300" />
          🤖 DHTE Policy Copilot
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40" role="presentation" onClick={() => setIsOpen(false)}>
          <aside
            className="absolute bottom-0 left-0 flex h-[min(760px,100vh)] w-full max-w-lg flex-col border-r border-slate-700 bg-slate-50 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dhte-copilot-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="bg-[#0F172A] p-5 text-white">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-sky-400/15 p-2.5 ring-1 ring-sky-300/30"><Bot className="h-5 w-5 text-sky-300" /></div>
                <div className="min-w-0 flex-1"><h2 id="dhte-copilot-title" className="text-sm font-black leading-snug">JAGRIT Governance Copilot · DHTE Policy &amp; Compliance Agent</h2><p className="mt-1 text-[11px] text-slate-300">Evaluator-only context from this command center</p></div>
                <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close DHTE Policy Copilot"><X className="h-5 w-5" /></button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-bold"><div className="rounded-lg bg-white/10 p-2"><span className="block text-sky-300">Pool</span>{formatCrore(props.innovationPool)}</div><div className="rounded-lg bg-white/10 p-2"><span className="block text-emerald-300">Locked</span>{formatCrore(props.escrowLocked)}</div><div className="rounded-lg bg-white/10 p-2"><span className="block text-amber-300">Pending</span>{props.pendingReviewTickets}</div></div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-950"><div className="flex items-center gap-2 font-black"><ShieldCheck className="h-4 w-4 text-blue-700" /> Statutory review scope</div><p className="mt-1 leading-relaxed">NEP 2020 · Companies Act 2013 Sec 135 · PESA Act 1996</p></div>
              <div className="space-y-2"><p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Evaluator quick prompts</p>{QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => ask(prompt)} className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50">{prompt}</button>)}</div>
              {messages.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-xs leading-relaxed text-slate-600"><div className="flex items-center gap-2 font-black text-slate-900"><ClipboardCheck className="h-4 w-4 text-blue-700" /> Ready for policy review</div><p className="mt-2">Ask about current escrow, statutory compliance, corporate CSR records, or the AI triage queue.</p></div>}
              {messages.map((message) => <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed ${message.role === 'user' ? 'bg-[#1E3A8A] text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>{message.role === 'assistant' && <FileText className="mb-1 h-3.5 w-3.5 text-blue-700" />}{message.content}</div></div>)}
            </div>

            <form className="border-t border-slate-200 bg-white p-4" onSubmit={(event) => { event.preventDefault(); ask(query); }}><div className="flex items-center gap-2"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask a DHTE policy question..." className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" aria-label="Ask DHTE Policy Copilot" /><button type="submit" className="rounded-xl bg-[#1E3A8A] p-2.5 text-white hover:bg-blue-900" aria-label="Send policy question"><Send className="h-4 w-4" /></button></div><p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400"><CheckCircle2 className="h-3 w-3 text-emerald-600" /> Advisory only. Evaluator approval remains the decision record.</p></form>
          </aside>
        </div>
      )}
    </>
  );
}
