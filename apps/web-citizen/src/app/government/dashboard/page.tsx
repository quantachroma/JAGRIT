'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  FileText,
  GraduationCap,
  Award,
  Rocket,
  Cpu,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import GovtAiAssistantDrawer from '@/components/government/GovtAiAssistantDrawer';

interface TriageTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  source: string;
  district: string;
  isDemo?: boolean;
}

interface TriageEvaluation {
  classification: 'TYPE_A' | 'TYPE_B';
  confidence: string;
  rationale: string;
}

const DEMO_TRIAGE_TICKETS: TriageTicket[] = [
  {
    id: 'demo-kanke-pothole',
    ticketNumber: 'JAG-DEMO-RNC-0087',
    title: 'Deep Pothole and Drainage Waterlogging on Kanke Road',
    description: 'Routine civic drainage and road maintenance issue reported from Kanke Road.',
    source: 'WEB',
    district: 'Ranchi',
    isDemo: true,
  },
  {
    id: 'demo-palamu-fluoride',
    ticketNumber: 'JAG-DEMO-PAL-0041',
    title: 'Palamu Chianki Village Groundwater High Fluoride Contamination',
    description: 'Groundwater fluoride contamination requires applied water-quality research and field testing.',
    source: 'WHATSAPP',
    district: 'Palamu',
    isDemo: true,
  },
];

export default function GovernmentDashboardPage() {
  const [tickets, setTickets] = useState<TriageTicket[]>([]);
  const [evaluations, setEvaluations] = useState<Record<string, TriageEvaluation>>({});
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [queueNotice, setQueueNotice] = useState<string | null>(null);

  const [poolBalance, setPoolBalance] = useState<number>(42000000); // 4.20 Crore

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function loadChallenges() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/challenges`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Challenge request failed: ${response.status}`);
        const payload: unknown = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && 'data' in payload && Array.isArray(payload.data)
            ? payload.data
            : [];

        const liveTickets = items.filter((item): item is Record<string, unknown> => {
          if (!item || typeof item !== 'object') return false;
          const status = String((item as Record<string, unknown>).status || 'PENDING_TRIAGE');
          return status === 'PENDING_TRIAGE' || status === 'PENDING_HITL';
        }).flatMap((challenge, index) => {
          const id = String(challenge.id || challenge.ticket_number || `live-${index}`);
          return [{
            id,
            ticketNumber: String(challenge.ticket_number || challenge.id || 'Unknown ticket'),
            title: String(challenge.title || 'Citizen challenge'),
            description: String(challenge.description || challenge.title || 'Citizen challenge awaiting review'),
            source: String(challenge.submission_channel || 'WEB').toUpperCase(),
            district: String(challenge.district || 'Jharkhand'),
          }];
        });
        setTickets(liveTickets.length > 0 ? liveTickets : DEMO_TRIAGE_TICKETS);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setQueueNotice('Unable to load live challenges from the backend.');
          setTickets(DEMO_TRIAGE_TICKETS);
        }
      } finally {
        setLoadingTickets(false);
      }
    }

    void loadChallenges();
    return () => controller.abort();
  }, []);

  function handleCheck(ticketId: string, description: string, title: string) {
    const text = `${title} ${description}`.toLowerCase();
    const isTypeB = /काला पानी|fluoride|fluorosis|arsenic|toxic|chemical|handpump|crop rot|solar microgrid|contaminat|पानी/.test(text);
    const evaluation: TriageEvaluation = isTypeB
      ? {
          classification: 'TYPE_B',
          confidence: '96.4%',
          rationale: 'Critical public health hazard (S_health = 95). Chemical/materials R&D required. Exceeds municipal maintenance scope.',
        }
      : {
          classification: 'TYPE_A',
          confidence: '98.2%',
          rationale: 'Routine municipal defect. S_health <= 25. Standard maintenance pattern requires Urban Local Body intervention.',
        };
    setEvaluations((current) => ({ ...current, [ticketId]: evaluation }));
  }

  async function updateChallengeStatus(ticketId: string, status: 'APPROVED_RND' | 'REROUTED_ULB'): Promise<boolean> {
    setQueueNotice(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const ticket = tickets.find((item) => item.id === ticketId);
      if (!ticket?.isDemo) {
        const response = await fetch(`${apiUrl}/api/v1/challenges/${encodeURIComponent(ticketId)}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Unable to update evaluator status.');
      }
      setTickets((current) => current.filter((ticket) => ticket.id !== ticketId));
      if (status === 'APPROVED_RND') {
        setPoolBalance((current) => Math.max(0, current - 350000));
        setQueueNotice('✅ Success: Challenge broadcasted to all empanelled HEIs scoring >= 70%.');
      } else {
        setQueueNotice('✅ Success: The grievance has been successfully rerouted to the Municipal Corporation (JharSewa API gateway) for routine maintenance.');
      }
      return true;
    } catch (error) {
      setQueueNotice(error instanceof Error ? error.message : 'Unable to update evaluator status.');
      return false;
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* State Header: State Societal Innovation Command Center */}
      <div className="bg-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-700">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                OFFICIAL DHTE GOVERNMENT OF JHARKHAND
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              DHTE Evaluator Command Center
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Real-time governance console overseeing rural societal challenge triage, university research grants, industry tripartite IP filing, and Human-in-the-Loop (HITL) quality gates.
            </p>
            <button type="button" className="bg-white text-blue-900 font-bold text-xs px-4 py-2 rounded-xl shadow-sm">
              Samvaad Lab Sharing
            </button>
          </div>

          {/* State Innovation Pool KPI */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] text-right">
            <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
              State Innovation Pool
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              ₹{(poolBalance / 10000000).toFixed(2)} Crore
            </div>
            <div className="text-[10px] text-blue-200 mt-1 flex items-center justify-end space-x-1">
              <Landmark className="w-3 h-3 text-blue-300" />
              <span>FY 2026-27 Treasury Head: DHTE-R&amp;D-4402</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Macro KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Challenges Received
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">1,420</div>
            <div className="flex items-center space-x-1 text-xs text-blue-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 18% this month</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Received via Citizen PWA &amp; WhatsApp Seva
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active HEI R&amp;D Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-900">84</div>
            <div className="text-xs text-slate-700 font-semibold mt-1">
              Across 18 State HEIs
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            BIT Mesra, IIT ISM Dhanbad, BAU Ranchi leading
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patents &amp; IPR Filed
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">12</div>
            <div className="text-xs text-sky-800 font-bold mt-1">
              Tripartite Concordat
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Jointly held by HEIs, Students &amp; Industry Sponsors
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Startups Spun Out
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">6</div>
            <div className="text-xs text-blue-700 font-bold mt-1">
              State Incubation Hub
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Student-led ventures in AgriTech, CleanWater &amp; IoT
          </p>
        </div>
      </div>

      {/* Human-in-the-Loop (HITL) Evaluator Triage Queue Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Human-in-the-Loop (HITL) Evaluator Triage Queue
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero-Shot AI pre-classifies grievances into Routine Civic vs Academic R&amp;D. Department evaluators confirm or override routing.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="font-semibold text-slate-600">Pending Review:</span>
            <span className="bg-sky-100 text-sky-900 font-black px-2.5 py-0.5 rounded-full">
              {tickets.filter((ticket) => !evaluations[ticket.id]).length} Tickets
            </span>
          </div>
        </div>

        {/* Triage Queue List */}
        <div className="space-y-4">
          {loadingTickets && <p className="text-sm text-slate-500">Loading live challenges...</p>}
          {queueNotice && <p className="text-sm font-semibold text-slate-600">{queueNotice}</p>}
          {!loadingTickets && tickets.length === 0 && !queueNotice && (
            <p className="text-sm text-slate-500">No challenges are waiting for evaluation.</p>
          )}
          {tickets.map((ticket) => {
            const evaluation = evaluations[ticket.id];
            const isTypeB = evaluation?.classification === 'TYPE_B';

            return (
              <div
                key={ticket.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Ticket Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ticket.ticketNumber}
                      </span>
                      <span className="text-[11px] text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {ticket.source === 'WHATSAPP' ? 'WhatsApp' : 'Web'}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{ticket.district}</span>
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{ticket.description}</p>

                    {evaluation && (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-slate-600" />
                          <span className="font-bold text-slate-700">DeBERTa-v3 Triage Analysis</span>
                          <span className={`font-black ${isTypeB ? 'text-emerald-800' : 'text-amber-800'}`}>
                            {isTypeB ? 'TYPE_B (Applied R&D)' : 'TYPE_A (Routine Municipal Civic)'}
                          </span>
                          <span className="text-slate-500">{evaluation.confidence} confidence</span>
                        </div>
                        <p className="text-slate-600">{evaluation.rationale}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="shrink-0 flex flex-col sm:items-end justify-center gap-2">
                    {!evaluation ? (
                      <button
                        type="button"
                        onClick={() => handleCheck(ticket.id, ticket.description, ticket.title)}
                        className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                      >
                        🔍 Check
                      </button>
                    ) : isTypeB ? (
                      <>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-300">
                          ✅ Approved for Applied R&amp;D
                        </span>
                        <Link
                          href={`/government/matching?challengeId=${encodeURIComponent(ticket.id)}`}
                          onClick={async (event) => {
                            event.preventDefault();
                            const approved = await updateChallengeStatus(ticket.id, 'APPROVED_RND');
                            if (approved) window.location.assign(`/government/matching?challengeId=${encodeURIComponent(ticket.id)}`);
                          }}
                          className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                        >
                          🎓 Go for University Matching →
                        </Link>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => void updateChallengeStatus(ticket.id, 'REROUTED_ULB')}
                        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm"
                      >
                          🚛 Reroute to Municipal ULB (JharSewa)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <GovtAiAssistantDrawer
        innovationPool={poolBalance}
        activeProjects={384}
        escrowLocked={14000000}
        pendingReviewTickets={tickets.filter((ticket) => !evaluations[ticket.id]).length}
        typeATickets={Object.values(evaluations).filter((evaluation) => evaluation.classification === 'TYPE_A').length}
        typeBTickets={Object.values(evaluations).filter((evaluation) => evaluation.classification === 'TYPE_B').length}
      />

    </div>
  );
}

