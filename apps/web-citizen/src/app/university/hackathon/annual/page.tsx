'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Trophy,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  FileText,
  ShieldCheck,
  X,
  ChevronRight,
  Flame,
  ArrowLeft,
  Upload,
  UserCheck,
  Landmark,
  FileCheck,
  AlertOctagon,
  ChevronLeft,
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

interface FacultyPI {
  name: string;
  dept: string;
  designation: string;
}

const FACULTY_DIRECTORY: Record<string, FacultyPI[]> = {
  'BIT Mesra, Ranchi': [
    { name: 'Dr. Anand Verma', dept: 'Civil & Environmental Engineering', designation: 'Professor & Head' },
    { name: 'Dr. Priya Sharma', dept: 'Electrical & Renewable Energy', designation: 'Associate Professor' },
    { name: 'Dr. Rajesh Sinha', dept: 'Metallurgical & Materials Engineering', designation: 'Professor' },
  ],
  'NIT Jamshedpur': [
    { name: 'Prof. M. K. Soren', dept: 'Electrical Engineering & Microgrids', designation: 'Professor' },
    { name: 'Dr. Amit Ghosh', dept: 'Mechanical & Thermal Engineering', designation: 'Associate Professor' },
  ],
  'Birsa Agricultural University, Kanke': [
    { name: 'Dr. Sanjeev Oraon', dept: 'Post-Harvest Technology & Forest Produce', designation: 'Senior Scientist' },
    { name: 'Dr. Meena Lakra', dept: 'Soil & Water Conservation', designation: 'Associate Professor' },
  ],
  'IIT (ISM) Dhanbad': [
    { name: 'Prof. R. K. Mukherjee', dept: 'Hydrogeology & Earth Sciences', designation: 'Chair Professor' },
    { name: 'Dr. S. K. Mahato', dept: 'Mining Automation & Sensor Networks', designation: 'Associate Professor' },
  ],
  'Ranchi University': [
    { name: 'Dr. Anjali Tirkey', dept: 'Rural Development & Applied Sciences', designation: 'Dean, Science' },
    { name: 'Prof. V. K. Roy', dept: 'Physics & Instrumentation', designation: 'Professor' },
  ],
  'Kolhan University, Chaibasa': [
    { name: 'Dr. S. N. Murmu', dept: 'Environmental Sciences', designation: 'Associate Professor' },
  ],
  'Binod Bihari Mahto Koyalanchal University, Dhanbad': [
    { name: 'Prof. P. K. Jha', dept: 'Applied Chemistry', designation: 'Professor' },
  ],
  'Government Polytechnic, Ranchi': [
    { name: 'Er. R. K. Singh', dept: 'Mechanical & Fabrication', designation: 'Head of Department' },
  ],
};

const ESCROW_MAPPING: Record<string, { accountRef: string; bank: string; ifscPrefix: string }> = {
  'BIT Mesra, Ranchi': {
    accountRef: 'JH-DHTE-ESCROW-BITM-0021',
    bank: 'Canara Bank, Mesra Branch',
    ifscPrefix: 'CNRB0001923',
  },
  'NIT Jamshedpur': {
    accountRef: 'JH-DHTE-ESCROW-NITJ-0043',
    bank: 'State Bank of India, Adityapur Branch',
    ifscPrefix: 'SBIN0001882',
  },
  'Birsa Agricultural University, Kanke': {
    accountRef: 'JH-DHTE-ESCROW-BAUK-0012',
    bank: 'Bank of India, Kanke Campus Branch',
    ifscPrefix: 'BKID0004901',
  },
  'IIT (ISM) Dhanbad': {
    accountRef: 'JH-DHTE-ESCROW-IITD-0091',
    bank: 'State Bank of India, ISM Campus',
    ifscPrefix: 'SBIN0001641',
  },
  'Ranchi University': {
    accountRef: 'JH-DHTE-ESCROW-RANC-0008',
    bank: 'Punjab National Bank, Ranchi University Branch',
    ifscPrefix: 'PUNB0024900',
  },
  'Kolhan University, Chaibasa': {
    accountRef: 'JH-DHTE-ESCROW-KOLH-0019',
    bank: 'State Bank of India, Chaibasa',
    ifscPrefix: 'SBIN0000054',
  },
  'Binod Bihari Mahto Koyalanchal University, Dhanbad': {
    accountRef: 'JH-DHTE-ESCROW-BBMK-0033',
    bank: 'Canara Bank, Dhanbad',
    ifscPrefix: 'CNRB0002194',
  },
  'Government Polytechnic, Ranchi': {
    accountRef: 'JH-DHTE-ESCROW-GPRA-0005',
    bank: 'State Bank of India, Doranda',
    ifscPrefix: 'SBIN0001542',
  },
};

const UNIVERSITIES = Object.keys(FACULTY_DIRECTORY);

interface TeamMember {
  name: string;
  apaarId: string;
  dept: string;
  iprConsent: boolean;
}

const INITIAL_MEMBERS: TeamMember[] = [
  { name: 'Rahul Soren', apaarId: '984512304891', dept: 'Civil & Environmental Eng.', iprConsent: true },
  { name: 'Pooja Kumari', apaarId: '871239045124', dept: 'Chemical Engineering', iprConsent: true },
  { name: 'Amit Kumar Mahato', apaarId: '761928340192', dept: 'Mechanical Engineering', iprConsent: true },
  { name: 'Sneha Tirkey', apaarId: '650192837410', dept: 'Environmental Sciences', iprConsent: true },
];

export default function AnnualHackathonPage() {
  const { t } = useLanguage();

  // Live Countdown Timer
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

  // Multi-Step Registration Modal State
  const [selectedProblem, setSelectedProblem] = useState<HackathonProblem | null>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [teamName, setTeamName] = useState('Team Jal-Suraksha Innovators');
  const [university, setUniversity] = useState('BIT Mesra, Ranchi');
  const [teamSize, setTeamSize] = useState<number>(4);
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [facultyPi, setFacultyPi] = useState<string>(FACULTY_DIRECTORY['BIT Mesra, Ranchi'][0].name);
  const [authMethod, setAuthMethod] = useState<'sso' | 'noc'>('sso');
  const [nocFile, setNocFile] = useState<string>('BITM_DEAN_NOC_SIGNED_JAG2026.pdf');
  const [slaAgreed, setSlaAgreed] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // When university changes, update default faculty PI
  const availableFaculty = useMemo(() => {
    return FACULTY_DIRECTORY[university] || [];
  }, [university]);

  const escrowDetails = useMemo(() => {
    return ESCROW_MAPPING[university] || {
      accountRef: 'JH-DHTE-ESCROW-UNIV-GEN',
      bank: 'State Bank of India, Main Secretariat',
      ifscPrefix: 'SBIN0000001',
    };
  }, [university]);

  // Adjust member list when teamSize changes
  const handleTeamSizeChange = (newSize: number) => {
    setTeamSize(newSize);
    setMembers((prev) => {
      if (newSize > prev.length) {
        const additions: TeamMember[] = [];
        for (let i = prev.length; i < newSize; i++) {
          additions.push({
            name: '',
            apaarId: '',
            dept: 'Engineering & Technology',
            iprConsent: false,
          });
        }
        return [...prev, additions[0] ? additions[0] : additions[0]];
      } else {
        return prev.slice(0, newSize);
      }
    });
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string | boolean) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleOpenRegistration = (problem: HackathonProblem) => {
    setSelectedProblem(problem);
    setActiveStep(1);
    setSubmitted(false);
    setValidationError(null);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    if (!teamName.trim()) {
      setValidationError('Please enter a valid Team Name.');
      return false;
    }
    if (members.length < 2) {
      setValidationError('A minimum of 2 team members is required.');
      return false;
    }
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim()) {
        setValidationError(`Member #${i + 1}: Name cannot be empty.`);
        return false;
      }
      if (!m.apaarId.trim() || m.apaarId.trim().length !== 12) {
        setValidationError(`Member #${i + 1} (${m.name}): APAAR ID must be exactly 12 digits.`);
        return false;
      }
      if (!m.iprConsent) {
        setValidationError(`Member #${i + 1} (${m.name}): Must acknowledge Tripartite IPR Concordat terms.`);
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!facultyPi) {
      setValidationError('Please select an authorized Faculty PI Mentor.');
      return false;
    }
    if (authMethod === 'noc' && !nocFile) {
      setValidationError('Please attach the signed Dean / HOD NOC document.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (validateStep1()) setActiveStep(2);
    } else if (activeStep === 2) {
      if (validateStep2()) setActiveStep(3);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slaAgreed) {
      setValidationError('You must acknowledge the SLA Governance & Clawback Policy before submission.');
      return;
    }
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
          <span>{t.hackathon.backToDashboard}</span>
        </Link>
        <Link
          href="/repository"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>{t.hackathon.viewAllArchives}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* CONTEXT BANNER & MANDATE */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#0F172A] border-2 border-blue-700/80 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-sky-400 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>{t.hackathon.arenaBadge}</span>
            </span>
            <span className="bg-blue-900/80 text-blue-200 border border-blue-700/60 px-3 py-1 rounded-full text-xs font-semibold">
              {t.hackathon.dhteDept}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t.hackathon.mainTitle}{' '}
              <span className="text-sky-300 block text-xl sm:text-3xl font-extrabold mt-1">
                {t.hackathon.heldAnnually}
              </span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-sky-200/95 max-w-3xl leading-snug">
              {t.hackathon.mandateQuote}
            </p>

            <p className="text-xs sm:text-sm text-slate-200/80 max-w-3xl leading-relaxed">
              {t.hackathon.mandateSub}
            </p>
          </div>

          {/* ANIMATED COUNTDOWN TIMER WIDGET */}
          <div className="pt-2">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl border-2 border-sky-400/50 p-4 sm:p-6 max-w-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sky-300 text-xs font-black uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>{t.hackathon.countdownHeader}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {t.hackathon.annualCycle}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    {t.hackathon.days}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    {t.hackathon.hours}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    {t.hackathon.mins}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-blue-800/80 rounded-xl p-2.5 sm:p-3 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-black text-sky-300 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase mt-0.5">
                    {t.hackathon.secs}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>{t.hackathon.submissionWindow}</span>
                <span className="text-sky-300 font-bold">{t.hackathon.openToAll}</span>
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
            <h4 className="text-sm font-black text-slate-900">{t.hackathon.stages.s1Title}</h4>
            <p className="text-xs text-slate-600">
              {t.hackathon.stages.s1Desc}
            </p>
            <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {t.hackathon.stages.s1Escrow}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 font-black text-sm flex items-center justify-center border border-sky-200 shrink-0">
            02
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">{t.hackathon.stages.s2Title}</h4>
            <p className="text-xs text-slate-600">
              {t.hackathon.stages.s2Desc}
            </p>
            <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
              {t.hackathon.stages.s2Escrow}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200 shrink-0">
            03
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">{t.hackathon.stages.s3Title}</h4>
            <p className="text-xs text-slate-600">
              {t.hackathon.stages.s3Desc}
            </p>
            <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {t.hackathon.stages.s3Escrow}
            </span>
          </div>
        </div>
      </div>

      {/* PROBLEM STATEMENT DIRECTORY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-[#0284C7]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                {t.hackathon.competitiveHeading}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-1">
              {t.hackathon.failureStatementsTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            {t.hackathon.statementsSub}
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
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isMicro ? 'bg-gradient-to-r from-sky-500 to-sky-500' : 'bg-gradient-to-r from-blue-600 to-sky-600'
                  }`}
                />

                <div className="space-y-5">
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

                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-slate-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
                        <span>{t.hackathon.originalProblemLabel}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {prob.originalProblem}
                      </p>
                    </div>

                    <div className="bg-blue-50/80 rounded-2xl border border-blue-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-900">
                        <Flame className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.hackathon.whyFailedLabel}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                        {prob.whyFailed}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-[#1E3A8A]">
                        <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                        <span>{t.hackathon.challengeScopeLabel}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                        {prob.challengeScope}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 via-sky-400/15 to-sky-500/10 border-2 border-sky-300 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-sky-600" />
                        <span>{t.hackathon.prizePoolLabel}</span>
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

                <button
                  type="button"
                  onClick={() => handleOpenRegistration(prob)}
                  className="w-full inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#0F172A] hover:to-[#0F172A] text-white font-black px-6 py-4 min-h-[52px] rounded-2xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] group/btn"
                >
                  <Trophy className="w-4 h-4 text-sky-400 group-hover/btn:scale-110 transition-transform" />
                  <span>{t.hackathon.registerTeamBtn}</span>
                  <ArrowRight className="w-4 h-4 text-sky-300 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* EXPANDED MULTI-STEP GOVERNMENT REGISTRATION MODAL */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-2 border-slate-300 max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProblem(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {/* Header & Problem Context */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 mb-2">
                    <Trophy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Government of Jharkhand · DHTE Hackathon Registration</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Registration: {selectedProblem.failureCode}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                    {selectedProblem.title}
                  </p>
                </div>

                {/* Stepper Progress Bar */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { num: 1, label: '1. Team Roster & IPR' },
                    { num: 2, label: '2. Mentor & Authorization' },
                    { num: 3, label: '3. Escrow & Governance' },
                  ].map((step) => {
                    const isCurrent = activeStep === step.num;
                    const isDone = activeStep > step.num;
                    return (
                      <div
                        key={step.num}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-black ring-1 ring-blue-400'
                            : isDone
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-400 font-semibold'
                        }`}
                      >
                        <span className="text-xs block truncate">{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {validationError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* STEP 1: TEAM ROSTER & TRIPARTITE IPR CONCORDAT */}
                {activeStep === 1 && (
                  <div className="space-y-4 text-xs animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Team Name / टीम का नाम *
                        </label>
                        <input
                          type="text"
                          required
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="e.g. Team Jal-Suraksha Innovators"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 text-xs font-semibold bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          University / Higher Education Institution (HEI) *
                        </label>
                        <select
                          value={university}
                          onChange={(e) => {
                            const newUniv = e.target.value;
                            setUniversity(newUniv);
                            const facs = FACULTY_DIRECTORY[newUniv];
                            if (facs && facs[0]) {
                              setFacultyPi(facs[0].name);
                            }
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 text-xs font-semibold bg-white"
                        >
                          {UNIVERSITIES.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          Team Members Roster (2–6 Students)
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Every member must provide a verified 12-digit APAAR ID and individually consent to IPR Concordat.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-600">Size:</span>
                        <select
                          value={teamSize}
                          onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
                          className="px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-slate-800"
                        >
                          <option value="2">2 Members</option>
                          <option value="3">3 Members</option>
                          <option value="4">4 Members (Recommended)</option>
                          <option value="5">5 Members</option>
                          <option value="6">6 Members (Max)</option>
                        </select>
                      </div>
                    </div>

                    {/* Member Rows */}
                    <div className="space-y-3">
                      {members.map((member, index) => (
                        <div
                          key={index}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                            <span className="inline-flex items-center gap-1.5 text-blue-900">
                              <Users className="w-3.5 h-3.5 text-blue-600" />
                              <span>Member #{index + 1} {index === 0 ? '(Team Lead)' : ''}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              APAAR REGISTRY LINK
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <input
                                type="text"
                                required
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                placeholder="Full Name *"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                maxLength={12}
                                required
                                value={member.apaarId}
                                onChange={(e) => handleMemberChange(index, 'apaarId', e.target.value.replace(/\D/g, ''))}
                                placeholder="12-Digit APAAR ID *"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono font-semibold text-slate-900 outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                required
                                value={member.dept}
                                onChange={(e) => handleMemberChange(index, 'dept', e.target.value)}
                                placeholder="Department / Branch *"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                          </div>

                          {/* Member Tripartite IPR Checkbox */}
                          <label className="flex items-start gap-2 text-[10.5px] text-slate-700 select-none cursor-pointer pt-0.5">
                            <input
                              type="checkbox"
                              checked={member.iprConsent}
                              onChange={(e) => handleMemberChange(index, 'iprConsent', e.target.checked)}
                              className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 h-3.5 w-3.5"
                              required
                            />
                            <span className="leading-tight">
                              I acknowledge and accept the <strong>Tripartite IPR Concordat (PRD 9.2)</strong>: ≥60% student equity, university patent custody, state public deployment rights, and CSR ROFR.
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: FACULTY MENTOR & INSTITUTIONAL AUTHORIZATION */}
                {activeStep === 2 && (
                  <div className="space-y-4 text-xs animate-in fade-in duration-150">
                    <div>
                      <label className="block font-bold text-slate-800 text-sm mb-1">
                        Searchable Faculty PI Mentor ({university}) *
                      </label>
                      <p className="text-[11px] text-slate-500 mb-2">
                        Per PRD RBAC, an approved Faculty PI must supervise the lab milestones and countersign DPR tranche disbursements.
                      </p>
                      <select
                        value={facultyPi}
                        onChange={(e) => setFacultyPi(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 text-xs font-bold bg-white"
                      >
                        {availableFaculty.map((fac) => (
                          <option key={fac.name} value={fac.name}>
                            {fac.name} — {fac.dept} ({fac.designation})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Faculty PI Details Card */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                        <UserCheck className="w-4 h-4 text-blue-700" />
                        <span>Assigned Mentor: {facultyPi}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Institutional Role: Principal Investigator for Technical Due Diligence, NABL Telemetry Sign-off, and Tranche Drawdown Authorization.
                      </p>
                    </div>

                    {/* Institutional Authorization Method */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <span className="font-bold text-slate-900 text-sm block">
                        Institutional Authorization &amp; Dean Verification
                      </span>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setAuthMethod('sso')}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            authMethod === 'sso'
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-400'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block text-xs font-bold">Auto-SSO Verification</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">Matched with active HEI portal records</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setAuthMethod('noc')}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            authMethod === 'noc'
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-400'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block text-xs font-bold">Dean / HOD NOC Upload</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">Signed authorization document fallback</span>
                        </button>
                      </div>

                      {authMethod === 'sso' ? (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Institutional SSO Auto-Verified: Active enrollment records matched at {university}</span>
                          </div>
                          <p className="text-[11px] text-emerald-800">
                            Verified against Jharkhand DHTE Unified Higher Education MIS registry. No manual paperwork required.
                          </p>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <label className="block text-xs font-bold text-slate-700">
                            Upload Signed NOC Document (PDF / DOCX)
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-700 truncate">
                              {nocFile}
                            </div>
                            <button
                              type="button"
                              onClick={() => setNocFile('BITM_DEAN_NOC_SIGNED_JAG2026.pdf')}
                              className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Attached</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: ESCROW DISBURSEMENT & GOVERNANCE SLA COMMITMENTS */}
                {activeStep === 3 && (
                  <div className="space-y-4 text-xs animate-in fade-in duration-150">
                    {/* Read-Only PFMS University Escrow Details */}
                    <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                          <Landmark className="w-4 h-4 text-blue-700" />
                          <span>Official University Escrow Account (PFMS Disbursed)</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded">
                          DHTE DIRECT ESCROW
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500 block">PFMS Escrow Reference:</span>
                          <span className="font-mono font-bold text-slate-900">{escrowDetails.accountRef}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Designated Bank:</span>
                          <span className="font-bold text-slate-900">{escrowDetails.bank}</span>
                        </div>
                      </div>

                      <p className="text-[10.5px] text-blue-900 font-medium pt-1 border-t border-blue-200">
                        ⚖️ <strong>Directives Notice:</strong> Under Jharkhand DHTE Hackathon Escrow Directives, milestone tranches (30% / 40% / 30%) are disbursed directly to institutional PFMS escrow accounts, not student personal accounts.
                      </p>
                    </div>

                    {/* Bidding Window & Milestone Governance Summary */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-900 block text-xs">
                        10-Day Bidding Window &amp; 3-Round Sprint Governance
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10.5px]">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="font-black text-blue-800 block">Round 1</span>
                          <span className="text-slate-500">14 Days · Root Cause</span>
                          <span className="font-bold text-blue-700 block mt-0.5">30% Tranche</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="font-black text-sky-800 block">Round 2</span>
                          <span className="text-slate-500">21 Days · Lab Prototype</span>
                          <span className="font-bold text-sky-700 block mt-0.5">40% Tranche</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="font-black text-blue-800 block">Round 3</span>
                          <span className="text-slate-500">10 Days · DHTE Defense</span>
                          <span className="font-bold text-blue-700 block mt-0.5">30% + 4 Credits</span>
                        </div>
                      </div>
                    </div>

                    {/* SLA Breach Clawback Policy */}
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
                        <AlertOctagon className="w-4 h-4 text-amber-700" />
                        <span>DHTE SLA Breach Clawback Policy</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-amber-900">
                        <li><strong>Day +7:</strong> Formal cure notice issued upon failure to submit lab telemetry.</li>
                        <li><strong>Day +14:</strong> Mandatory DHTE remediation hearing with Dean &amp; Faculty PI.</li>
                        <li><strong>Day +30:</strong> Full tranche clawback from escrow and automatic tender re-allocation to runner-up team.</li>
                      </ul>
                    </div>

                    {/* SLA Acknowledgement Checkbox */}
                    <label className="flex items-start gap-2 text-xs font-bold text-slate-800 select-none cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={slaAgreed}
                        onChange={(e) => setSlaAgreed(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 h-4 w-4"
                        required
                      />
                      <span className="leading-snug">
                        Our student team and Faculty PI understand and accept the 3-Round Milestone Governance and DHTE SLA Clawback Terms.
                      </span>
                    </label>
                  </div>
                )}

                {/* Stepper Navigation Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {activeStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => (prev - 1) as 1 | 2)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProblem(null)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        {t.hackathon.registrationModal.cancelBtn}
                      </button>
                    )}
                  </div>

                  <div>
                    {activeStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#0F172A] text-white text-xs font-black shadow-md flex items-center gap-1.5"
                      >
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!slaAgreed}
                        className={`px-6 py-2.5 rounded-xl text-white text-xs font-black shadow-md flex items-center gap-1.5 ${
                          slaAgreed
                            ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-98'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Confirm Government Registration ➔</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : (
              /* SUBMISSION SUCCESS CONFIRMATION RECEIPT */
              <div className="text-center space-y-4 py-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Government Hackathon Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    <strong>{teamName}</strong> has been enrolled under <strong>{selectedProblem.failureCode}</strong> for the Jharkhand Annual State Innovation Hackathon.
                  </p>
                </div>

                {/* Registration Details Receipt */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Institution / Campus:</span>
                    <span className="font-bold text-slate-900">{university}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Faculty PI Mentor:</span>
                    <span className="font-bold text-blue-900">{facultyPi}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Institutional Escrow:</span>
                    <span className="font-mono font-bold text-slate-900">{escrowDetails.accountRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Team Size &amp; Equity:</span>
                    <span className="font-bold text-slate-900">{members.length} Members (≥60% Student Equity)</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-slate-500 block text-[11px]">Enrolled Student APAAR IDs:</span>
                    <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-700">
                      {members.map((m, i) => (
                        <span key={i} className="truncate">
                          #{i + 1} {m.name}: {m.apaarId}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-blue-800 font-bold">
                    <span>NEP 2020 Innovation Credits:</span>
                    <span>4 Credits Allocated</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 max-w-lg mx-auto font-medium">
                  ✅ <strong>Phase 1 Bidding Window Active:</strong> Your team workspace has been unlocked with git repository access and Detailed Project Report archives.
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProblem(null)}
                  className="inline-flex items-center space-x-2 bg-[#1E3A8A] hover:bg-[#0F172A] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <span>{t.hackathon.registrationModal.returnBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
