'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  Clock,
  MapPin,
  TrendingUp,
  Landmark,
  UserCheck,
} from 'lucide-react';

interface CSRChallenge {
  id: string;
  title: string;
  district: string;
  stateAllocationLakh: number;
  csrMatchLakh: number;
  leadHEI: string;
  sdg: {
    code: string;
    label: string;
    color: string;
  };
  summary: string;
  impactMetrics: string;
  status: 'PENDING_MATCH' | 'PLEDGED';
  csr1Ref?: string;
  assignedMentor?: {
    name: string;
    organization: string;
    designation: string;
  };
}

interface Mentor {
  id: string;
  name: string;
  organization: string;
  designation: string;
  expertise: string;
}

const AVAILABLE_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Er. Alok Sen',
    organization: 'Tata Steel Jamshedpur',
    designation: 'Chief Environmental & Materials Specialist',
    expertise: 'Membrane Separation & Industrial Scale Adsorption Systems',
  },
  {
    id: 'm2',
    name: 'Dr. Shalini Kumari',
    organization: 'Central Coalfields Limited (CCL)',
    designation: 'General Manager, CSR & Rural Sustainable Tech',
    expertise: 'Solar Thermal Engineering & Off-Grid Rural Infrastructure',
  },
  {
    id: 'm3',
    name: 'Rajeshwar Topno',
    organization: 'Tata Technologies Innovation Lab',
    designation: 'Principal Systems Architect',
    expertise: 'IoT Remote Telemetry & Post-Harvest Cold Chain Automation',
  },
];

export default function IndustryDashboardPage() {
  const [challenges, setChallenges] = useState<CSRChallenge[]>([
    {
      id: 'JAG-CSR-01',
      title: 'Solar Fluoride Purification for 12 Anganwadi Centers (Palamu)',
      district: 'Palamu (Satbarwa & Daltonganj Blocks)',
      stateAllocationLakh: 3.5,
      csrMatchLakh: 3.5,
      leadHEI: 'BIT Mesra (Dept. of Environmental Engineering)',
      sdg: {
        code: 'SDG 6',
        label: 'Clean Water & Sanitation',
        color: 'bg-blue-600',
      },
      summary:
        'Solar-powered gravity-fed fluoride adsorption column eliminating skeletal fluorosis risk in 12 Anganwadi Centers serving 1,450 children.',
      impactMetrics: '1,450 children secured • Zero-grid electricity • 5-year local SHG ops model',
      status: 'PENDING_MATCH',
    },
    {
      id: 'JAG-CSR-02',
      title: 'Tribal Lac Post-Harvest Desiccant Storage Units (Khunti)',
      district: 'Khunti (Torpa & Murhu Blocks)',
      stateAllocationLakh: 4.2,
      csrMatchLakh: 4.2,
      leadHEI: 'BAU Ranchi (Agri-Innovation & Forest Tech)',
      sdg: {
        code: 'SDG 8',
        label: 'Decent Work & Economic Growth',
        color: 'bg-sky-600',
      },
      summary:
        'Decentralized solar thermal desiccant drying units preventing 45% monsoon sticklac spoilage across 4 tribal Women Farmer Producer Groups.',
      impactMetrics: '480 tribal women farmers • 38% higher household earnings • Local sal resin desiccant',
      status: 'PENDING_MATCH',
    },
  ]);

  const [totalPool, setTotalPool] = useState<number>(5000000); // 50 Lakhs
  const [activeMentorChallenge, setActiveMentorChallenge] = useState<CSRChallenge | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Pledge matching grant
  const handlePledgeGrant = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          const matchAmountINR = c.csrMatchLakh * 100000;
          setTotalPool((current) => Math.max(0, current - matchAmountINR));
          return {
            ...c,
            status: 'PLEDGED',
            csr1Ref: `CSR1-JH-${Math.floor(100000 + Math.random() * 900000)}`,
          };
        }
        return c;
      })
    );
    setToast('Grant Pledged (Form CSR-1 Issued)');
    window.setTimeout(() => setToast(null), 3200);
  };

  // Assign Mentor
  const handleAssignMentor = (mentor: Mentor) => {
    if (!activeMentorChallenge) return;
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === activeMentorChallenge.id) {
          return {
            ...c,
            assignedMentor: {
              name: mentor.name,
              organization: mentor.organization,
              designation: mentor.designation,
            },
          };
        }
        return c;
      })
    );
    setActiveMentorChallenge(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {toast && <div role="status" className="fixed right-4 top-20 z-50 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-900 shadow-lg">{toast}</div>}
      {/* Top Banner: Tata Steel & Coal India CSR Consortium */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-[#1E3A8A] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-700/30">
        {/* Decorative Watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
          <Building className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-sky-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Consortium Portal
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>Form CSR-1 Certified (Govt. of India MCA)</span>
              </span>
              <span className="text-xs text-slate-300 hidden lg:inline">
                Companies Act 2013 § 135 / Schedule VII
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Tata Steel &amp; Coal India CSR Consortium
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Co-funding breakthrough University R&amp;D solving critical grassroots challenges in Jharkhand. Every ₹1 of corporate CSR matching grant is matched 1:1 by the Department of Higher &amp; Technical Education (DHTE).
            </p>
          </div>

          {/* Committed CSR Pool Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] text-right">
            <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
              Committed CSR Pool
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              ₹{(totalPool / 100000).toFixed(2)} Lakh
            </div>
            <div className="text-[10px] text-blue-200 mt-1 flex items-center justify-end space-x-1">
              <CheckCircle2 className="w-3 h-3 text-blue-300" />
              <span>Section 135 / 80G Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Info Card */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center space-x-2.5">
          <Award className="w-5 h-5 text-sky-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Tripartite Concordat Framework: </span>
            <span>
              All university pilots funded via CSR co-grant include pre-ratified Tripartite IPR (30% HEI / 30% Student Innovators / 40% Industry Sponsor) with first right of commercial licensing.
            </span>
          </div>
        </div>
        <div className="shrink-0 font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-sky-300">
          MCA REG: CSR00049214
        </div>
      </div>

      {/* Challenge Cards Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            High-Impact Societal Challenges Open for Matching Co-Grant
          </h2>
          <p className="text-xs text-slate-500">
            Select a verified university-led project to pledge 1:1 matching funds and assign industry technical mentors.
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-600 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Active R&amp;D Bids</span>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map((challenge) => {
          const isPledged = challenge.status === 'PLEDGED';

          return (
            <div
              key={challenge.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                isPledged ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200'
              }`}
            >
              {/* Card Top */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {challenge.id}
                    </span>
                    <span
                      className={`text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${challenge.sdg.color}`}
                    >
                      {challenge.sdg.code} • {challenge.sdg.label}
                    </span>
                  </div>

                  {isPledged ? (
                    <span className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-950 text-xs font-black px-3 py-1 rounded-full border border-blue-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Grant Pledged</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 bg-sky-100 text-sky-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-sky-700" />
                      <span>Awaiting CSR Match</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{challenge.district}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {challenge.summary}
                </p>

                {/* Lead HEI & Key Impact */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Lead University:</span>
                    <span className="font-bold text-slate-900 text-right">{challenge.leadHEI}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Social Impact Target:</span>
                    <span className="font-semibold text-blue-800 text-right">
                      {challenge.impactMetrics}
                    </span>
                  </div>
                </div>

                {/* 1:1 Co-Funding Split Table */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                      State DHTE Allocation
                    </div>
                    <div className="text-lg font-black text-blue-950 mt-0.5">
                      ₹{challenge.stateAllocationLakh.toFixed(2)} Lakh
                    </div>
                    <div className="text-[10px] text-blue-700">100% Treasury Backed</div>
                  </div>

                  <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                      Required CSR Match
                    </div>
                    <div className="text-lg font-black text-sky-900 mt-0.5">
                      ₹{challenge.csrMatchLakh.toFixed(2)} Lakh
                    </div>
                    <div className="text-[10px] text-sky-700">Schedule VII Eligible</div>
                  </div>
                </div>

                {/* Assigned Mentor Indicator */}
                {challenge.assignedMentor && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">
                          Mentor: {challenge.assignedMentor.name}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          {challenge.assignedMentor.organization} • {challenge.assignedMentor.designation}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded">
                      Assigned
                    </span>
                  </div>
                )}

                {/* Form CSR-1 Receipt if Pledged */}
                {isPledged && challenge.csr1Ref && (
                  <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <span className="font-bold text-blue-950">
                          Statutory Receipt: {challenge.csr1Ref}
                        </span>
                        <span className="text-[11px] text-blue-800 block">
                          Form CSR-1 digitally generated &amp; registered on MCA Portal.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveMentorChallenge(challenge)}
                  className="px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-300 bg-white transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <span>
                    {challenge.assignedMentor ? 'Change Corporate Mentor' : 'Assign Corporate Mentor'}
                  </span>
                </button>

                {isPledged ? (
                  <button
                    type="button"
                    disabled
                    className="px-4 py-2 min-h-[40px] rounded-xl text-xs font-black text-blue-950 bg-blue-100/90 border border-blue-300 flex items-center space-x-1.5 cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    <span>Grant Pledged (Form CSR-1 Issued)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePledgeGrant(challenge.id)}
                    className="px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 border border-blue-800 shadow-sm hover:shadow transition-all flex items-center space-x-1.5 active:scale-95"
                  >
                    <DollarSign className="w-4 h-4 text-sky-300" />
                    <span>Pledge Matching CSR Grant (₹{challenge.csrMatchLakh}L)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mentor Assignment Slide-Out / Modal */}
      {activeMentorChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Users className="w-5 h-5 text-sky-300" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wide">
                    Assign Corporate Technical Mentor
                  </h4>
                  <p className="text-xs text-blue-100">
                    {activeMentorChallenge.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveMentorChallenge(null)}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-slate-600">
                Corporate mentors provide bi-weekly technical design reviews, assist student teams with industrial testing equipment, and guide field trial protocols.
              </p>

              <div className="space-y-3">
                {AVAILABLE_MENTORS.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900">{mentor.name}</span>
                        <span className="text-[10px] bg-white font-bold text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {mentor.organization}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{mentor.designation}</p>
                      <p className="text-[11px] text-blue-800 font-medium">
                        Focus: {mentor.expertise}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAssignMentor(mentor)}
                      className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-all active:scale-95"
                    >
                      Assign Mentor
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveMentorChallenge(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

