'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, AlertTriangle, XCircle, PlusCircle, Send, Clock, MapPin, Building2 } from 'lucide-react';

type QuorumStats = {
  quorum_required?: number;
  votes_logged?: number;
  status?: string;
};

export default function CitizenFeedbackPortal() {
  const { t } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<'solved' | 'partial' | 'failed' | null>(null);
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [newIssueText, setNewIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resolvedProject = {
    id: 'JAG-2026-PAL-3785',
    title: 'Palamu District: Solar Fluoride & Iron Water Purification Unit',
    location: 'Chianki / Satbarwa Block, Palamu',
    deployedDaysAgo: 46,
    heiPartner: 'BIT Mesra (Civil & Environmental Eng.)',
    populationBenefited: '~850 Residents (Gram Sabha Quorum Required: 43 Votes)',
  };

  const [quorumStats, setQuorumStats] = useState<QuorumStats | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchLiveQuorumStats = useCallback(async () => {
    const evaluateUrl = `${apiUrl}/api/v1/quorum/evaluate/${resolvedProject.id}`;
    const statusUrl = `${apiUrl}/api/v1/quorum/status/${resolvedProject.id}`;

    try {
      let response: Response;
      try {
        response = await fetch(evaluateUrl);
      } catch {
        response = await fetch(statusUrl);
      }
      if (!response.ok) {
        response = await fetch(statusUrl);
      }

      if (!response.ok) {
        throw new Error(`Unable to load quorum stats (${response.status})`);
      }

      const data: QuorumStats = await response.json();
      setQuorumStats(data);
    } catch (error) {
      console.warn('Could not fetch live quorum stats:', error);
    }
  }, [apiUrl, resolvedProject.id]);

  useEffect(() => {
    void fetchLiveQuorumStats();
  }, [fetchLiveQuorumStats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVote) return;

    setSubmitting(true);
    setErrorMsg(null);

    // Map citizen vote to backend format
    const isPass = selectedVote === 'solved';
    const complaintType =
      selectedVote === 'solved'
        ? 'NONE'
        : selectedVote === 'partial'
        ? (newIssueText || 'PARTIAL_PERFORMANCE_DEFECT')
        : (newIssueText || 'CRITICAL_FAILURE');

    // Citizen coordinates (default to Palamu)
    const lat = 24.0353;
    const lon = 84.0722;

    const payload = {
      targetId: resolvedProject.id,
      is_pass: isPass,
      complaint_type: complaintType,
      lat: lat,
      lon: lon,
      citizen_id: null,
    };

    try {
      // 1. POST the vote to PostgreSQL `public.feedback_ledger`
      const res = await fetch(`${apiUrl}/api/v1/quorum/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned ${res.status}`);
      }

      console.log('✅ [Quorum Vote] Successfully stored in public.feedback_ledger!');

      // 2. Fetch updated Formula 5 Quorum evaluation before showing success.
      await fetchLiveQuorumStats();
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Vote submission error:', err);
      setErrorMsg(err instanceof Error ? err.message : 'Unable to record your vote.');
    } finally {
      setSubmitting(false);
    }
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
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl space-y-5">
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
              <h4 className="font-bold text-base text-blue-950">वोट सफलतापूर्वक दर्ज किया गया (Vote Saved in PostgreSQL)!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your feedback is permanently recorded in public.feedback_ledger under the PESA Gram Sabha Quorum (PRD Formula 5).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 bg-white rounded-xl border border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500 block">Settlement Population</span>
                <span className="text-lg font-bold text-slate-900">850 Residents</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500 block">Quorum Threshold</span>
                <span className="text-lg font-bold text-blue-700">{quorumStats?.quorum_required || 43} Votes Needed</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500 block">Logged Votes</span>
                <span className="text-lg font-bold text-blue-700">{quorumStats?.votes_logged ?? 0} Verified Votes</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500 block">Quorum State</span>
                <span className="text-lg font-bold text-slate-900">{quorumStats?.status || 'QUORUM_PENDING (Day 46 Review)'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline underline-offset-2"
            >
              ← Cast another test vote
            </button>
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
            {errorMsg && <p className="text-xs font-semibold text-red-600">{errorMsg}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

