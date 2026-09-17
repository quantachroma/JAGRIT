'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, AlertTriangle, XCircle, PlusCircle, Send, Clock, MapPin, Building2 } from 'lucide-react';

export default function CitizenFeedbackPortal() {
  const { t } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<'solved' | 'partial' | 'failed' | null>(null);
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [newIssueText, setNewIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resolvedProject = {
    id: 'JAG-2026-PAL-0052',
    title: 'Palamu District: Solar Fluoride & Iron Water Purification Unit',
    location: 'Satbarwa Block, Palamu',
    deployedDaysAgo: 46,
    heiPartner: 'BIT Mesra (Civil & Environmental Eng.)',
    populationBenefited: '~850 Residents',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{t.feedback.reviewBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.feedback.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
          {t.feedback.subtitle}
        </p>
      </div>

      {/* Project Feedback Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {resolvedProject.id}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">{resolvedProject.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {resolvedProject.location}</span>
              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {resolvedProject.heiPartner}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl self-start">
            {t.feedback.activeReviewDays}
          </span>
        </div>

        {submitted ? (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
            <h4 className="font-bold text-base text-blue-950">{t.feedback.recordedTitle}</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {t.feedback.recordedDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Voting Buttons */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-3">
                {t.feedback.voteQuestion}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedVote('solved')}
                  className={`p-4 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    selectedVote === 'solved'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.feedback.solvedBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVote('partial')}
                  className={`p-4 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    selectedVote === 'partial'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>{t.feedback.partialBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVote('failed')}
                  className={`p-4 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    selectedVote === 'failed'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                  <span>{t.feedback.failedBtn}</span>
                </button>
              </div>
            </div>

            {/* Accordion: Add More Issues / Defects to Resolved Problem */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddIssue(!showAddIssue)}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.feedback.addIssueBtn}</span>
              </button>
              <p className="text-[11px] text-slate-500 mt-1.5">{t.feedback.addIssueDesc}</p>

              {showAddIssue && (
                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <textarea
                    rows={3}
                    value={newIssueText}
                    onChange={(e) => setNewIssueText(e.target.value)}
                    placeholder={t.feedback.issueInputPlaceholder}
                    className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-600 outline-none bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {t.feedback.routingNotice}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedVote}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.feedback.submitFeedback}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

