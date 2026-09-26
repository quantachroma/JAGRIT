'use client';

import { FormEvent, useState } from 'react';
import { FlaskConical, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const QUICK_PROMPTS = [
  '🎓 How do I convert 120 workhours into NEP academic credits?',
  "📊 Check my university's 6-Axis Capability Score for Palamu water",
  '📝 What are the Tranche 2 NABL lab purity submission requirements?',
  '⚖️ Review statutory penalty rules for bidding stage rejections',
];

const WELCOME_MESSAGE =
  'Welcome to the HEI Research Copilot. Ask about NEP 2020 credits, faculty research points, NABL tranches, or university-to-challenge matching.';

function answerQuery(query: string): string {
  const normalizedQuery = query.toLocaleLowerCase();

  if (normalizedQuery.includes('credit') || normalizedQuery.includes('workhour') || normalizedQuery.includes('ncrf') || normalizedQuery.includes('nep')) {
    return 'Under the NCrF/NEP 2020 conversion used by JAGRIT, 30 verified workhours equal 1 academic credit. Therefore, 120 workhours equal 4 credits (120 / 30 = 4). Keep the work log and institutional verification record for audit.';
  }

  if (normalizedQuery.includes('6-axis') || normalizedQuery.includes('6 axis') || normalizedQuery.includes('capability') || normalizedQuery.includes('matching') || normalizedQuery.includes('palamu water')) {
    return 'The 6-axis matching model weighs domain expertise at 25%, NABL lab capability at 20%, faculty availability at 15%, geographic proximity at 15%, campus capacity at 10%, and delivery track record at 15%. Your university profile and the Palamu water challenge are scored across these six axes.';
  }

  if (normalizedQuery.includes('nabl') || normalizedQuery.includes('tranche') || normalizedQuery.includes('purity') || normalizedQuery.includes('escrow')) {
    return 'Tranche 2 NABL submissions should include the accredited lab report, sample chain of custody, test method and detection limits, signed purity results, QA/QC record, and institutional verification. The escrow release sequence is 30% on award, 40% after the verified milestone, and 30% after final acceptance.';
  }

  if (normalizedQuery.includes('penalty') || normalizedQuery.includes('statutory') || normalizedQuery.includes('bidding') || normalizedQuery.includes('rejection')) {
    return 'For a bidding-stage rejection, first record the stated eligibility or compliance reason and preserve the decision trail. Statutory penalties depend on the governing tender terms and applicable rules; the copilot can summarize the rule, but an authorized procurement or legal reviewer must confirm any sanction.';
  }

  if (normalizedQuery.includes('faculty') || normalizedQuery.includes('ugc') || normalizedQuery.includes('cas') || normalizedQuery.includes('research point')) {
    return 'For UGC-CAS planning, a faculty PI receives 10 research points in the JAGRIT academic profile model. Record the PI role, verified outputs, grant or challenge association, and evidence links before submitting for institutional review.';
  }

  return 'I can help with NCrF/NEP 2020 credit calculations, UGC-CAS research points, Tranche escrow and NABL submissions, statutory bidding rules, and 6-axis university matching. Try one of the research prompts below.';
}

export default function HeiaiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [nextMessageId, setNextMessageId] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: 'assistant', text: WELCOME_MESSAGE },
  ]);

  const submitQuery = (value: string) => {
    const trimmedQuery = value.trim();
    if (!trimmedQuery) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextMessageId, role: 'user', text: trimmedQuery },
      { id: nextMessageId + 1, role: 'assistant', text: answerQuery(trimmedQuery) },
    ]);
    setNextMessageId((currentId) => currentId + 2);
    setQuery('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuery(query);
  };

  return (
    <div className="fixed bottom-4 left-6 z-50">
      {isOpen && (
        <section
          id="hei-research-copilot"
          aria-label="HEI Research Copilot chat"
          className="mb-3 flex h-[min(650px,calc(100vh-7rem))] w-[min(420px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-2xl shadow-indigo-950/20"
        >
          <header className="flex items-start justify-between gap-3 bg-indigo-950 px-5 py-4 text-white">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-indigo-200">
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                HEI Research Copilot
              </div>
              <h2 className="text-sm font-semibold leading-5">
                JAGRIT Student &amp; Faculty R&amp;D Copilot · NABL Lab &amp; NEP 2020 Assistant
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-indigo-200 transition hover:bg-indigo-800 hover:text-white"
              aria-label="Close HEI Research Copilot"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${message.role === 'user' ? 'rounded-br-md bg-indigo-700 text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm'}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitQuery(prompt)}
                  className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-left text-xs font-medium text-indigo-800 transition hover:border-indigo-400 hover:bg-indigo-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask a research or policy question..."
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                aria-label="Research question"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-700 p-2.5 text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!query.trim()}
                aria-label="Send research question"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full bg-indigo-800 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/25 transition hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        aria-expanded={isOpen}
        aria-controls="hei-research-copilot"
      >
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <span>🔬 HEI Research Copilot</span>
      </button>
    </div>
  );
}