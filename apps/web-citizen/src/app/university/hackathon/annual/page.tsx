'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Building,
  GraduationCap,
  FileText,
  ShieldCheck,
  X,
  ChevronRight,
  Flame,
  ArrowLeft,
} from 'lucide-react';

interface HackathonProblem {
  id: string;
  failureCode: string;
  badgeType: 'MICRO-FAILURE' | 'MINOR-FAILURE';
  title: string;
  location: string;
  domain: string;
  originalProblem: string;
  whyFailed: string;
  challengeScope: string;
  prizePool: string;
  grantDetails: string;
  academicCredits: string;
  difficulty: 'Intermediate' | 'Advanced';
  tags: string[];
}

const ANNUAL_PROBLEMS: HackathonProblem[] = [
  {
    id: 'FAIL-2024-PLM-01',
    failureCode: '#FAIL-2024-PLM-01',
    badgeType: 'MICRO-FAILURE',
    title: 'Solar Defluoridation Unit: Electrode Passivation Breakdown',
    location: 'Palamu District (High Silica Groundwater Belt)',
    domain: 'Water & Public Health / Electro-Chemistry',
    originalProblem:
      'Groundwater arsenic & fluoride contamination in Palamu hamlets exceeding 3.8 mg/L.',
    whyFailed:
      'High dissolved iron & silica passivated aluminium electrodes within 72 hours, dropping current density by 84% and stalling remediation.',
    challengeScope:
      'Design an automated reverse-polarity self-cleaning electrode circuit or low-cost pre-treatment chsky with sacrificial filtration.',
    prizePool: '₹2,50,000',
    grantDetails: 'Prototype Incubation Grant + PHED Pilot Deployment Support',
    academicCredits: '4 APAAR Academic Innovation Credits (NEP 2020)',
    difficulty: 'Advanced',
    tags: ['Electrochemistry', 'Embedded Systems', 'Water Treatment', 'Solar Pumping'],
  },
  {
    id: 'FAIL-2023-KHT-04',
    failureCode: '#FAIL-2023-KHT-04',
    badgeType: 'MINOR-FAILURE',
    title: 'Tribal Lac Storage: Biomass Thermal Regulator Failure',
    location: 'Khunti District (Tribal Lac Farming Cluster)',
    domain: 'Agri-Tech & Forest Produce / Thermal Engineering',
    originalProblem:
      'Post-harvest raw lac decay during monsoon in Khunti, causing 40% value degradation for tribal self-help groups.',
    whyFailed:
      'Stirling biomass heat exchanger fluctuated by ±8°C, ruining resin humidity tolerance and melting sticklac into unusable clumps.',
    challengeScope:
      'Integrate a phase-change material (PCM) thermal buffer or passive terracotta cooling jacket maintainable by village self-help groups.',
    prizePool: '₹2,00,000',
    grantDetails: 'Tech Transfer Rights + TRIFED & Jharkhand Forest Dept Tie-up',
    academicCredits: '4 APAAR Academic Innovation Credits (NEP 2020)',
    difficulty: 'Intermediate',
    tags: ['Thermal Storage', 'Passive Cooling', 'Tribal Livelihoods', 'Biomass'],
  },
];

export default function AnnualHackathonPage() {
  // Live Countdown Timer (Targeting Annual Kickoff: 48 Days 14 Hours 22 Mins)
  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 14,
    minutes: 22,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Registration Modal State
  const [selectedProblem, setSelectedProblem] = useState<HackathonProblem | null>(null);
  const [teamName, setTeamName] = useState('');
  const [university, setUniversity] = useState('BIT Mesra, Ranchi');
  const [teamLeadName, setTeamLeadName] = useState('');
  const [apaarId, setApaarId] = useState('');
  const [teamSize, setTeamSize] = useState('4');
  const [submitted, setSubmitted] = useState(false);

  const handleOpenRegistration = (problem: HackathonProblem) => {
    setSelectedProblem(problem);
    setSubmitted(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back to University Portal Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/university/dashboard"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#0284C7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to University Dashboard</span>
        </Link>
        <Link
          href="/repository"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>View All R&amp;D Failure Archives</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* DELIVERABLE 2: CONTEXT BANNER & MANDATE */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#0F172A] border-2 border-blue-700/80 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 space-y-6">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-sky-400 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>Jharkhand State Innovation Arena</span>
            </span>
            <span className="bg-blue-900/80 text-blue-200 border border-blue-700/60 px-3 py-1 rounded-full text-xs font-semibold">
              Department of Higher &amp; Technical Education (DHTE)
            </span>
          </div>

          {/* Heading & Mandate */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              🏆 Jharkhand Annual State Innovation Hackathon{' '}
              <span className="text-sky-300 block text-xl sm:text-3xl font-extrabold mt-1">
                (Held Once a Year)
              </span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-sky-200/95 max-w-3xl leading-snug">
              &ldquo;Transforming Past Micro &amp; Minor Engineering Failures into Breakthrough Academic Solutions&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-200/80 max-w-3xl leading-relaxed">
              Instead of theoretical toy projects, university teams solve verified engineering bottlenecks from past Jharkhand R&amp;D pilots. Selected student teams receive milestone escrow funding, corporate CSR sponsorship, and 4 NEP 2020 APAAR Innovation Credits.
            </p>
          </div>

          {/* DELIVERABLE 2: ANIMATED COUNTDOWN TIMER WIDGET */}
          <div className="pt-2">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl border-2 border-sky-400/50 p-4 sm:p-6 max-w-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sky-300 text-xs font-black uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>Statewide Hackathon Kickoff Countdown</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Annual Cycle 2026
                </span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    Days
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    Hours
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    Mins
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-300 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    Secs
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>Phase 1 Abstract &amp; Root-Cause Submission Window</span>
                <span className="text-sky-300 font-bold">Open to all Jharkhand HEIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-STAGE INNOVATION SPRINT ROADMAP STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200 shrink-0">
            01
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">Stage 1: Failure Root-Cause Analysis</h4>
            <p className="text-xs text-slate-600">
              14-day ideation sprint diagnosing exact metallurgical, thermal, or microbiological breakdown triggers.
            </p>
            <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              30% Initial Escrow Release
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 font-black text-sm flex items-center justify-center border border-sky-200 shrink-0">
            02
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">Stage 2: Bench &amp; Lab Prototyping</h4>
            <p className="text-xs text-slate-600">
              21-day fabrication with corporate CSR technical mentorship and laboratory test telemetry integration.
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
              40% Milestone Escrow Release
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200 shrink-0">
            03
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">Stage 3: DPR Defense at DHTE Ranchi</h4>
            <p className="text-xs text-slate-600">
              Final defense before state academic jury + Gram Sabha verification lead + commercial patent licensing.
            </p>
            <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              30% Final Grant + 4 APAAR Credits
            </span>
          </div>
        </div>
      </div>

      {/* DELIVERABLE 2: PROBLEM STATEMENT DIRECTORY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-[#0284C7]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Competitive R&amp;D Problem Statements
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-1">
              Micro &amp; Minor Engineering Failure Statements
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Derived directly from documented field pilots in Palamu, Khunti, and Chaibasa. Open for student team registration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ANNUAL_PROBLEMS.map((prob) => {
            const isMicro = prob.badgeType === 'MICRO-FAILURE';
            return (
              <article
                key={prob.id}
                className="bg-white border-2 border-slate-200 hover:border-[#1E3A8A] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                {/* Top Badge Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isMicro ? 'bg-gradient-to-r from-sky-500 to-sky-500' : 'bg-gradient-to-r from-blue-600 to-sky-600'
                  }`}
                />

                <div className="space-y-5">
                  {/* Identification Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border ${
                        isMicro
                          ? 'bg-sky-100 text-sky-900 border-sky-300'
                          : 'bg-blue-100 text-[#1E3A8A] border-blue-300'
                      }`}
                    >
                      {prob.badgeType}
                    </span>

                    <span className="text-xs font-bold font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {prob.failureCode}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-sky-50 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-full shadow-xs">
                      <Sparkles className="w-3 h-3 text-sky-500" />
                      <span>Selected for Annual Hackathon</span>
                    </span>
                  </div>

                  {/* Title & Domain */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                      {prob.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">{prob.location}</span>
                      <span>•</span>
                      <span className="text-blue-700 font-bold">{prob.domain}</span>
                    </div>
                  </div>

                  {/* Original Problem & Why Previous Solution Failed */}
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-slate-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
                        <span>Original Problem:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {prob.originalProblem}
                      </p>
                    </div>

                    <div className="bg-blue-50/80 rounded-2xl border border-blue-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-900">
                        <Flame className="w-3.5 h-3.5 text-blue-600" />
                        <span>Why Previous Solution Failed:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                        {prob.whyFailed}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-[#1E3A8A]">
                        <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                        <span>Hackathon Challenge Scope:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                        {prob.challengeScope}
                      </p>
                    </div>
                  </div>

                  {/* Prize Pool & Grants Banner */}
                  <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 via-sky-400/15 to-sky-500/10 border-2 border-sky-300 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-sky-600" />
                        <span>State + CSR Prize Pool:</span>
                      </span>
                      <span className="text-lg sm:text-xl font-black text-slate-950">
                        {prob.prizePool}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {prob.grantDetails}
                    </p>
                    <div className="text-[11px] font-bold text-blue-800 flex items-center gap-1 pt-1 border-t border-sky-200">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                      <span>{prob.academicCredits}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prob.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Registration CTA Button */}
                <button
                  type="button"
                  onClick={() => handleOpenRegistration(prob)}
                  className="w-full inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#0F172A] hover:to-[#0F172A] text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] group/btn"
                >
                  <Trophy className="w-4 h-4 text-sky-400 group-hover/btn:scale-110 transition-transform" />
                  <span>Register Student Team for Hackathon</span>
                  <ArrowRight className="w-4 h-4 text-sky-300 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* STUDENT REGISTRATION MODAL */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-2 border-slate-300 max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProblem(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 mb-2">
                    <Trophy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Annual State Hackathon Registration</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Register Team for {selectedProblem.failureCode}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {selectedProblem.title}
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Team Jal-Suraksha Innovators"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-slate-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      University / Higher Education Institution (HEI) *
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-slate-900 text-sm bg-white"
                    >
                      <option value="BIT Mesra, Ranchi">BIT Mesra, Ranchi</option>
                      <option value="NIT Jamshedpur">NIT Jamshedpur</option>
                      <option value="Birsa Agricultural University, Kanke">
                        Birsa Agricultural University, Kanke
                      </option>
                      <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad</option>
                      <option value="Ranchi University">Ranchi University</option>
                      <option value="Kolhan University, Chaibasa">Kolhan University, Chaibasa</option>
                      <option value="Binod Bihari Mahto Koyalanchal University">
                        Binod Bihari Mahto Koyalanchal University, Dhanbad
                      </option>
                      <option value="Government Polytechnic, Ranchi">
                        Government Polytechnic, Ranchi
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Team Lead Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamLeadName}
                        onChange={(e) => setTeamLeadName(e.target.value)}
                        placeholder="e.g. Rahul Soren"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Lead Student APAAR ID (12-Digit) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={12}
                        value={apaarId}
                        onChange={(e) => setApaarId(e.target.value)}
                        placeholder="e.g. 984512304891"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-slate-900 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Team Size (Students)
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-slate-900 text-sm bg-white"
                    >
                      <option value="3">3 Students</option>
                      <option value="4">4 Students (Recommended)</option>
                      <option value="5">5 Students</option>
                      <option value="6">6 Students (Max)</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-[11px] text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">
                      🏆 State + CSR Prize Eligibility: {selectedProblem.prizePool}
                    </p>
                    <p>
                      Upon registration, your team will be assigned a faculty mentor and industry CSR guide for Stage 1 Failure Root-Cause Analysis.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProblem(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-xs font-black shadow-md"
                  >
                    Confirm Registration ➔
                  </button>
                </div>
              </form>
            ) : (
              /* Submission Success View */
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-[#1E3A8A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#1E3A8A]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Team Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {teamName || 'Your team'} has been successfully registered for {selectedProblem.failureCode} under the Jharkhand Annual State University Hackathon.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-bold text-slate-900">{university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Team Lead:</span>
                    <span className="font-bold text-slate-900">{teamLeadName || 'Registered Lead'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">APAAR ID:</span>
                    <span className="font-mono font-bold text-slate-900">{apaarId || '984512304891'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Innovation Credits:</span>
                    <span className="font-bold text-blue-700">4 Credits Allocated</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProblem(null)}
                  className="inline-flex items-center space-x-2 bg-[#1E3A8A] hover:bg-[#0F172A] text-white px-6 py-3 rounded-xl text-xs font-bold shadow"
                >
                  <span>Return to Problem Statement Directory</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

