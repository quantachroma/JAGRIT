'use client';

import { FormEvent, useState } from 'react';
import { Building2, Download, Send, X } from 'lucide-react';

type Message = {
  id: number;
  from: 'copilot' | 'partner';
  text: string;
};

const quickPrompts = [
  '💡 How does the 1:1 state matching grant work under Sec 135?',
  '📄 How do I download my audit-ready CSR Contribution Certificate?',
  '⚖️ What are the Tripartite IPR & ROFR manufacturing rules?',
  "🛠️ How do I submit my senior engineer's Round 2 bench test sign-off?",
];

const responses: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['matching', '1:1', 'grant', 'sec 135', 'section 135'],
    answer: 'Under the JAGRIT co-funding model, an eligible corporate CSR contribution is matched 1:1 from the state pool, subject to approval and available escrow capacity. The contribution must support an eligible Schedule VII public-impact activity, such as clean drinking water or agro-livelihoods. Your dashboard shows the match, escrow status, and release milestones.',
  },
  {
    keywords: ['certificate', 'download', 'audit'],
    answer: 'Open CSR Portfolio Hub and select “Download certificate” in the Active CSR portfolio panel. The audit-ready CSR Contribution Certificate records the corporate contribution, Section 135 and Schedule VII mapping, match status, and project reference. Keep the downloaded file with your CSR records and board reporting pack.',
  },
  {
    keywords: ['ipr', 'rofr', 'manufacturing', 'tripartite'],
    answer: 'The tripartite agreement keeps implementation rights clear: the university or creator retains background IP, the corporate partner receives the agreed manufacturing and commercial pathway, and JAGRIT records the public-interest safeguards. Any ROFR must be project-specific, time-bound, and consistent with the signed agreement and community deployment obligations.',
  },
  {
    keywords: ['engineer', 'round 2', 'bench', 'sign-off'],
    answer: 'From the relevant Co-Funding Pipeline project, open the Round 2 technical review and upload the signed bench-test checklist, test data, observed failures, and senior engineer approval. Submit it for partner review; the status changes to “Awaiting verification” until the university or designated evaluator confirms the sign-off.',
  },
  {
    keywords: ['schedule vii', 'drinking water', 'agro', 'livelihood', 'compliance'],
    answer: 'Clean drinking water and agro-livelihood projects can map to Schedule VII when they deliver a documented public benefit. Keep the impact geography, beneficiary records, deployment evidence, expenditure trail, and outcome measures linked to the CSR project so the contribution remains reviewable under Section 135 reporting.',
  },
  {
    keywords: ['escrow', 'pool', 'release'],
    answer: 'The escrow matching pool holds approved corporate and state-match allocations against project milestones. Funds are released after the required technical, field, and acceptance checks are recorded. The pipeline shows whether a project is awaiting match, escrow-ready, or cleared for its next tranche.',
  },
];

function getResponse(query: string): string {
  const normalizedQuery = query.toLocaleLowerCase();
  const matchedResponse = responses.find(({ keywords }) => keywords.some((keyword) => normalizedQuery.includes(keyword)));
  return matchedResponse?.answer || 'I can help with Section 135 and Schedule VII mapping, clean-water and agro-livelihood compliance, escrow matching pools, CSR certificates, tripartite IPR and ROFR terms, and Round 2 engineering sign-offs. Try one of the partner prompts above.';
}

function downloadCertificate(): void {
  const certificate = [
    'JAGRIT JHARKHAND',
    'CSR CONTRIBUTION CERTIFICATE',
    'Section 135 / Schedule VII mapping verified',
    'Certificate reference: JAG-CSR-2026-DEMO',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([certificate], { type: 'text/plain' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'jagrit-csr-contribution-certificate.txt';
  link.click();
  URL.revokeObjectURL(url);
}

export default function CsrAiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [nextMessageId, setNextMessageId] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: 'copilot', text: 'Welcome. I can help your CSR team navigate matching grants, compliance evidence, certificates, and technical partner sign-offs.' },
  ]);

  const submitQuery = (event?: FormEvent, prompt = query) => {
    event?.preventDefault();
    const trimmedQuery = prompt.trim();
    if (!trimmedQuery) return;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextMessageId, from: 'partner', text: trimmedQuery },
      { id: nextMessageId + 1, from: 'copilot', text: getResponse(trimmedQuery) },
    ]);
    setNextMessageId((currentId) => currentId + 2);
    setQuery('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl ring-1 ring-blue-300/40 transition hover:bg-blue-950"
        aria-label="Open CSR Co-Funding Copilot"
      >
        <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
        <Building2 className="h-4 w-4 text-sky-200" />
        <span>🏢 CSR Co-Funding Copilot</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/30" onClick={() => setIsOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="csr-copilot-title"
            onClick={(event) => event.stopPropagation()}
            className="fixed bottom-0 left-0 flex h-[min(720px,100vh)] w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl sm:bottom-4 sm:left-6 sm:w-[min(440px,calc(100vw-3rem))] sm:rounded-2xl"
          >
            <header className="flex items-start justify-between gap-4 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-5 text-white">
              <div><p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">Corporate partner desk</p><h2 id="csr-copilot-title" className="mt-2 text-lg font-black leading-6">JAGRIT Corporate CSR &amp; Matching Agent</h2><p className="mt-1 text-xs font-medium text-blue-100">Schedule VII &amp; Sec 135 Expert</p></div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-blue-100 transition hover:bg-white/10 hover:text-white" aria-label="Close CSR Copilot"><X className="h-5 w-5" /></button>
            </header>

            <div className="border-b border-slate-200 bg-slate-50 p-4"><p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">Partner prompts</p><div className="flex gap-2 overflow-x-auto pb-1">{quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => submitQuery(undefined, prompt)} className="shrink-0 rounded-xl border border-blue-200 bg-white px-3 py-2 text-left text-xs font-semibold leading-4 text-blue-950 transition hover:border-blue-500 hover:bg-blue-50">{prompt}</button>)}</div></div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white p-4" aria-live="polite">{messages.map((message) => <div key={message.id} className={`flex ${message.from === 'partner' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-sm leading-5 ${message.from === 'partner' ? 'bg-blue-700 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'}`}>{message.text}</p></div>)}</div>

            <div className="border-t border-slate-200 bg-white p-4"><button type="button" onClick={downloadCertificate} className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"><Download className="h-4 w-4" /> Download demo CSR certificate</button><form onSubmit={submitQuery} className="flex gap-2"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about CSR co-funding..." className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-500 focus:ring-2" aria-label="Ask the CSR Copilot" /><button type="submit" className="rounded-xl bg-blue-700 p-2.5 text-white transition hover:bg-blue-800" aria-label="Send question"><Send className="h-4 w-4" /></button></form></div>
          </section>
        </div>
      )}
    </>
  );
}