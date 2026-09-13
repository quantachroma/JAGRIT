'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  FileText,
  GraduationCap,
  Award,
  Rocket,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Cpu,
  Clock,
  Send,
  MapPin,
  Check,
  Filter,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface TriageTicket {
  id: string;
  ticketNumber: string;
  title: string;
  source: string;
  district: string;
  date: string;
  aiClassification: 'CIVIC_ROUTINE' | 'HEI_RESEARCH';
  aiConfidence: number;
  domain: string;
  recommendedBudget?: number;
  status: 'AWAITING_REVIEW' | 'CONFIRMED';
  confirmedActionNote?: string;
}

export default function GovernmentDashboardPage() {
  const [tickets, setTickets] = useState<TriageTicket[]>([
    {
      id: 't1',
      ticketNumber: '#JAG-4190',
      title: 'Ranchi Road Bitumen & Deep Pothole Repair (Albert Ekka Chowk to Main Road)',
      source: 'Nagrik PWA Grievance Form',
      district: 'Ranchi Urban',
      date: 'Today, 09:15 AM',
      aiClassification: 'CIVIC_ROUTINE',
      aiConfidence: 0.96,
      domain: 'Municipal Infrastructure & Road Maintenance',
      status: 'AWAITING_REVIEW',
    },
    {
      id: 't2',
      ticketNumber: '#JAG-4191',
      title: 'Kanke Kasturba Gandhi Residential School Arsenic Groundwater Contamination',
      source: 'Block Development Officer (BDO) Escalation',
      district: 'Ranchi (Kanke Block)',
      date: 'Today, 08:30 AM',
      aiClassification: 'HEI_RESEARCH',
      aiConfidence: 0.94,
      domain: 'Chemical Adsorption & Potable Water Engineering',
      recommendedBudget: 350000,
      status: 'AWAITING_REVIEW',
    },
    {
      id: 't3',
      ticketNumber: '#JAG-4192',
      title: 'Monsoon High-Humidity Sticklac Spoilage in Torpa Tribal FPO Storage Units',
      source: 'District Forest Officer (DFO) & JHAMCOFED',
      district: 'Khunti (Torpa)',
      date: 'Yesterday, 04:45 PM',
      aiClassification: 'HEI_RESEARCH',
      aiConfidence: 0.91,
      domain: 'Bio-resource Preservation & Solar Thermal Desiccants',
      recommendedBudget: 420000,
      status: 'AWAITING_REVIEW',
    },
  ]);

  const [poolBalance, setPoolBalance] = useState<number>(42000000); // 4.20 Crore

  // Confirm ULB Dispatch
  const handleConfirmULB = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'CONFIRMED',
            confirmedActionNote: 'Dispatched to Ranchi Municipal Corp (JharSewa Ref: RMC-2026-8812)',
          };
        }
        return t;
      })
    );
  };

  // Approve Budget & Broadcast to HEIs
  const handleApproveHEI = (ticketId: string, budget: number = 350000) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          setPoolBalance((curr) => Math.max(0, curr - budget));
          return {
            ...t,
            status: 'CONFIRMED',
            confirmedActionNote: `Approved ₹${(budget / 100000).toFixed(2)}L & Broadcasted to BIT Mesra & Qualified HEIs`,
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* State Header: State Societal Innovation Command Center */}
      <div className="bg-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-700">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-sky-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Government Command Center
              </span>
              <span className="text-xs text-blue-200">
                Department of Higher &amp; Technical Education (DHTE)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Government of Jharkhand • State Societal Innovation Command Center
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Real-time governance console overseeing rural societal challenge triage, university research grants, industry tripartite IP filing, and Human-in-the-Loop (HITL) quality gates.
            </p>
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
              {tickets.filter((t) => t.status === 'AWAITING_REVIEW').length} Tickets
            </span>
          </div>
        </div>

        {/* Triage Queue List */}
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const isConfirmed = ticket.status === 'CONFIRMED';
            const isCivic = ticket.aiClassification === 'CIVIC_ROUTINE';

            return (
              <div
                key={ticket.id}
                className={`rounded-2xl border p-5 transition-all duration-200 ${
                  isConfirmed
                    ? 'bg-slate-50/80 border-slate-200'
                    : isCivic
                    ? 'bg-sky-50/30 border-sky-200 hover:shadow-xs'
                    : 'bg-blue-50/30 border-blue-200 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Ticket Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ticket.ticketNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {ticket.source} • {ticket.date}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{ticket.district}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {ticket.title}
                    </h3>

                    {/* AI Classification Pill & Domain */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        <Cpu className="w-3.5 h-3.5 text-slate-600" />
                        <span className="font-semibold text-slate-700">AI Triage:</span>
                        <span
                          className={`font-black ${
                            isCivic ? 'text-sky-800' : 'text-blue-900'
                          }`}
                        >
                          {isCivic ? 'Type A (Civic Routine)' : 'Type B (HEI R&D)'}
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600 font-medium">
                          {(ticket.aiConfidence * 100).toFixed(0)}% Confidence
                        </span>
                      </div>

                      <span className="text-slate-600 text-xs">
                        Domain: <strong className="text-slate-800">{ticket.domain}</strong>
                      </span>

                      {ticket.recommendedBudget && (
                        <span className="text-blue-900 font-bold text-xs bg-blue-100/70 px-2 py-0.5 rounded">
                          Budget: ₹{(ticket.recommendedBudget / 100000).toFixed(2)} Lakh
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="shrink-0 flex flex-col sm:items-end justify-center gap-2">
                    {isConfirmed ? (
                      <div className="bg-white border border-blue-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 shadow-2xs space-y-1">
                        <div className="flex items-center space-x-1.5 font-bold text-blue-900">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span>HITL Evaluator Confirmed</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium max-w-xs">
                          {ticket.confirmedActionNote}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {isCivic ? (
                          <button
                            type="button"
                            onClick={() => handleConfirmULB(ticket.id)}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-1.5 active:scale-95"
                          >
                            <Building2 className="w-4 h-4" />
                            <span>Confirm ULB Dispatch</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApproveHEI(ticket.id, ticket.recommendedBudget)}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center space-x-1.5 active:scale-95 border border-blue-800"
                          >
                            <Send className="w-4 h-4 text-sky-300" />
                            <span>Approve ₹3.5L &amp; Broadcast to Universities</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* University R&D Deployment Status Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              State HEI Research Capability Index
            </h3>
            <p className="text-xs text-slate-500">
              Active academic deployment, field testing telemetry, and faculty patent filing status.
            </p>
          </div>
          <Link
            href="/university/dashboard"
            className="text-xs font-bold text-blue-900 hover:underline flex items-center space-x-1"
          >
            <span>Open University Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-900">BIT Mesra</span>
              <span className="text-blue-900 bg-blue-100 px-2 py-0.5 rounded text-[10px]">Tier 1 Lead</span>
            </div>
            <p className="text-slate-600 text-[11px]">18 Active Projects • 34 Patents Filed • NABL Environmental Lab</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-700 w-[94%]" />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-900">IIT (ISM) Dhanbad</span>
              <span className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[10px]">Tier 1 Lead</span>
            </div>
            <p className="text-slate-600 text-[11px]">14 Active Projects • 27 Patents Filed • Mining &amp; Hydro Lab</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-700 w-[89%]" />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-900">BAU Ranchi</span>
              <span className="text-sky-900 bg-sky-100 px-2 py-0.5 rounded text-[10px]">Agri Tech Lead</span>
            </div>
            <p className="text-slate-600 text-[11px]">22 Active Projects • 19 Patents Filed • Post-Harvest Lab</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-sky-600 w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

