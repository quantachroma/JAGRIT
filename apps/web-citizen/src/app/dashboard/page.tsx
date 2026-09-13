'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCitizen, UserRole } from '@/context/CitizenContext';
import SpatialRadarMap from '@/components/spatial-radar-map';
import {
  LayoutDashboard,
  Search,
  CheckCircle2,
  Clock,
  ThumbsUp,
  AlertTriangle,
  MapPin,
  IndianRupee,
  Layers,
  Building2,
  Sparkles,
  Compass,
  Plus,
  Flame,
  Radio,
  ChevronRight,
  User,
  Briefcase,
  ShieldCheck,
  Award,
  Users,
  FileCheck2,
  Sliders,
  Send,
  Camera,
  Mic,
  ArrowRight,
  Check,
  X,
  FileText,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Download,
} from 'lucide-react';

// District Data for 24 Districts of Jharkhand
const JHARKHAND_24_DISTRICTS = [
  { name: 'Ranchi', submissions: 142, activeHEIs: 8, patents: 4, resolutionRate: '94%' },
  { name: 'Dhanbad', submissions: 118, activeHEIs: 5, patents: 3, resolutionRate: '91%' },
  { name: 'East Singhbhum', submissions: 104, activeHEIs: 6, patents: 3, resolutionRate: '89%' },
  { name: 'Palamu', submissions: 98, activeHEIs: 4, patents: 2, resolutionRate: '92%' },
  { name: 'Bokaro', submissions: 86, activeHEIs: 4, patents: 2, resolutionRate: '88%' },
  { name: 'Hazaribagh', submissions: 79, activeHEIs: 3, patents: 1, resolutionRate: '87%' },
  { name: 'West Singhbhum', submissions: 74, activeHEIs: 3, patents: 1, resolutionRate: '85%' },
  { name: 'Deoghar', submissions: 68, activeHEIs: 2, patents: 1, resolutionRate: '90%' },
  { name: 'Giridih', submissions: 65, activeHEIs: 2, patents: 1, resolutionRate: '86%' },
  { name: 'Ramgarh', submissions: 58, activeHEIs: 2, patents: 1, resolutionRate: '88%' },
  { name: 'Dumka', submissions: 54, activeHEIs: 2, patents: 1, resolutionRate: '84%' },
  { name: 'Khunti', submissions: 52, activeHEIs: 2, patents: 1, resolutionRate: '93%' },
  { name: 'Saraikela Kharsawan', submissions: 48, activeHEIs: 2, patents: 1, resolutionRate: '87%' },
  { name: 'Garhwa', submissions: 42, activeHEIs: 1, patents: 0, resolutionRate: '82%' },
  { name: 'Gumla', submissions: 39, activeHEIs: 1, patents: 0, resolutionRate: '85%' },
  { name: 'Chatra', submissions: 36, activeHEIs: 1, patents: 0, resolutionRate: '81%' },
  { name: 'Latehar', submissions: 34, activeHEIs: 1, patents: 0, resolutionRate: '83%' },
  { name: 'Simdega', submissions: 31, activeHEIs: 1, patents: 0, resolutionRate: '86%' },
  { name: 'Koderma', submissions: 29, activeHEIs: 1, patents: 0, resolutionRate: '88%' },
  { name: 'Godda', submissions: 27, activeHEIs: 1, patents: 0, resolutionRate: '80%' },
  { name: 'Sahebganj', submissions: 26, activeHEIs: 1, patents: 0, resolutionRate: '79%' },
  { name: 'Pakur', submissions: 24, activeHEIs: 1, patents: 0, resolutionRate: '78%' },
  { name: 'Jamtara', submissions: 22, activeHEIs: 1, patents: 0, resolutionRate: '82%' },
  { name: 'Lohardaga', submissions: 20, activeHEIs: 1, patents: 0, resolutionRate: '85%' },
];

export default function DashboardPage() {
  const { role, setRole, language, t, currentLocation } = useCitizen();

  // Perspective Switcher Options
  const roleOptions: { id: UserRole; labelKey: string; icon: any }[] = [
    { id: 'citizen', labelKey: 'dashboard.roleCitizen', icon: User },
    { id: 'university', labelKey: 'dashboard.roleUniversity', icon: Building2 },
    { id: 'industry', labelKey: 'dashboard.roleIndustry', icon: Briefcase },
    { id: 'government', labelKey: 'dashboard.roleGovt', icon: ShieldCheck },
  ];

  // Citizen View State
  const [proximityFilter, setProximityFilter] = useState<'<5km' | '<15km' | 'district'>('<5km');
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards');
  const [upvotes, setUpvotes] = useState<Record<string, number>>({
    'JAG-2026-PLM-0082': 19,
    'JAG-2026-KHU-0034': 42,
    'JAG-2026-WSH-0071': 28,
  });

  // University View State
  const [hackathonTab, setHackathonTab] = useState<'round1' | 'round2' | 'round3'>('round1');
  const [showSoloModal, setShowSoloModal] = useState(false);
  const [showConsortiumModal, setShowConsortiumModal] = useState(false);
  const [teamFormedToast, setTeamFormedToast] = useState<string | null>(null);
  const [bomHardwareCost, setBomHardwareCost] = useState({
    filtrationColumn: 18500,
    solarPvPumps: 24000,
    adsorptionMedia: 12500,
    iotTelemetryLogger: 8500,
    installationCivic: 6500,
  });

  // Industry View State
  const [csrPledgeAmount, setCsrPledgeAmount] = useState<number>(250000);
  const [sprintStatus, setSprintStatus] = useState<string | null>(null);

  // Government View State
  const [m2Disbursed, setM2Disbursed] = useState(false);
  const [triageAction, setTriageAction] = useState<'approved' | 'rerouted' | null>(null);

  const handleUpvote = (id: string) => {
    setUpvotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const bomTotal = Object.values(bomHardwareCost).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 pb-24 relative max-w-7xl mx-auto">
      {/* =========================================================================
          TOP ROLE SIMULATOR / PERSPECTIVE SWITCHER BAR
          ========================================================================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-card-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
          <span>{t('dashboard.perspectiveSwitcher')}</span>
        </div>

        {/* 4 Clickable Perspective Switcher Pills (>= 48px touch targets) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full md:w-auto bg-slate-50 p-1.5 rounded-2xl border border-[#E2E8F0]">
          {roleOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = role === opt.id;

            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => setRole(opt.id)}
                className={`px-3 sm:px-4 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1D4ED8] text-white shadow-sm ring-1 ring-[#1D4ED8]'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-[#E2E8F0] hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{t(opt.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          VIEW A: CITIZEN DASHBOARD
          ========================================================================= */}
      {role === 'citizen' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Personalized Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-card-subtle">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <User className="w-3.5 h-3.5" />
                <span>{t('dashboard.roleCitizen')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
                {t('dashboard.citizen.greeting')}
              </h1>
            </div>

            <div className="inline-flex items-center space-x-2 bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
              <MapPin className="w-4 h-4 text-[#1D4ED8]" />
              <span>{t('dashboard.citizen.locationPill')}</span>
            </div>
          </div>

          {/* 2 Hero Action Cards (Large, High-Contrast for Non-Technical Citizens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Report a Problem (Emerald Green Accent) */}
            <div className="bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-card-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-5 group">
              <div className="space-y-2.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="flex items-center gap-1">
                    <Camera className="w-6 h-6" />
                    <Mic className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {t('dashboard.citizen.actionReportTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('dashboard.citizen.actionReportDesc')}
                </p>
              </div>

              <Link
                href="/report"
                className="inline-flex items-center justify-center space-x-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-black px-6 py-3.5 min-h-[48px] rounded-xl text-sm shadow transition-all active:scale-[0.98]"
              >
                <span>{t('dashboard.citizen.actionReportTitle')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: WhatsApp Seva Bot (Official WhatsApp Green #25D366) */}
            <div className="bg-white border-2 border-emerald-200 hover:border-[#25D366] rounded-3xl p-6 sm:p-8 shadow-card-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-5 group">
              <div className="space-y-2.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#25D366] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Send className="w-7 h-7 text-[#16A34A]" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {t('dashboard.citizen.actionWhatsappTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('dashboard.citizen.actionWhatsappDesc')}
                </p>
              </div>

              <Link
                href="/whatsapp-simulator"
                className="inline-flex items-center justify-center space-x-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-black px-6 py-3.5 min-h-[48px] rounded-xl text-sm shadow transition-all active:scale-[0.98]"
              >
                <span>{t('dashboard.citizen.actionWhatsappTitle')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Active Grievances Visual Stepper */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-card-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold font-mono text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {t('dashboard.citizen.ticketLabel')}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {t('dashboard.citizen.ticketName')}
                </h3>
              </div>

              <Link
                href="/time-machine"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D4ED8] hover:underline"
              >
                <span>{t('timeMachine.bannerTitle')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5-Stage Visual Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
              {/* Stage 1: Submitted (Green Check) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="text-xs font-black text-emerald-950">1. {t('dashboard.citizen.stage1')}</div>
                <div className="text-[10px] text-emerald-700">GPS & photo captured</div>
              </div>

              {/* Stage 2: AI Verified (Green Check) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="text-xs font-black text-emerald-950">2. {t('dashboard.citizen.stage2')}</div>
                <div className="text-[10px] text-emerald-700">ViT defect confirmed</div>
              </div>

              {/* Stage 3: University Assigned (Green Check: BIT Mesra) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="text-xs font-black text-emerald-950">3. {t('dashboard.citizen.stage3')}</div>
                <div className="text-[10px] text-emerald-700">Lab consortium lead</div>
              </div>

              {/* Stage 4: Live Field Pilot (Pulsing Blue) */}
              <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-[#1D4ED8] space-y-1.5 ring-2 ring-blue-500/20">
                <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center animate-pulse">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-[#1D4ED8]">4. {t('dashboard.citizen.stage4')}</div>
                <div className="text-[10px] text-blue-700 font-bold">Unassisted buffer</div>
              </div>

              {/* Stage 5: 45-Day Quorum (Locked) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 opacity-80">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-700">5. {t('dashboard.citizen.stage5')}</div>
                <div className="text-[10px] text-slate-500">Unlocks on Day 46</div>
              </div>
            </div>
          </div>

          {/* Local Challenges & Deduplication Radar Feed */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-card-subtle space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t('dashboard.citizen.radarTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('dashboard.citizen.radarSubtitle')}
                </p>
              </div>

              {/* Filter Pills: [ Within 5 km ] [ Within 15 km ] [ Entire District ] */}
              <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-2xl border border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setProximityFilter('<5km')}
                  className={`px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    proximityFilter === '<5km'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.citizen.range5km')}
                </button>
                <button
                  type="button"
                  onClick={() => setProximityFilter('<15km')}
                  className={`px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    proximityFilter === '<15km'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.citizen.range15km')}
                </button>
                <button
                  type="button"
                  onClick={() => setProximityFilter('district')}
                  className={`px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    proximityFilter === 'district'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.citizen.rangeDistrict')}
                </button>
              </div>
            </div>

            {/* Mini 500m Radar Map Widget */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#1D4ED8]" />
                  <span>{t('dashboard.citizen.miniRadarTitle')}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Radius: 500m Active Buffer</span>
              </div>
              <SpatialRadarMap
                centerLocation={currentLocation}
                nearbyRadiusMeters={500}
                compact
              />
            </div>

            {/* Challenge Cards Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-white shadow-card-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-blue-50 text-[#1D4ED8] px-2 py-0.5 rounded font-bold border border-blue-200">
                    JAG-2026-PLM-0082
                  </span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Water & Sanitation
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-2xl flex items-center justify-center flex-shrink-0">
                    🚰
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Solar Water Defluoridation Unit
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Palamu • Satbarwa Block (2.4 km)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-xs text-slate-500">BIT Mesra Environmental Lab</span>
                  <button
                    type="button"
                    onClick={() => handleUpvote('JAG-2026-PLM-0082')}
                    className="inline-flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{upvotes['JAG-2026-PLM-0082']}</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-white shadow-card-subtle flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-amber-50 text-[#D97706] px-2 py-0.5 rounded font-bold border border-amber-200">
                    JAG-2026-KHU-0034
                  </span>
                  <span className="text-[11px] bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Agritech & Drying
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-2xl flex items-center justify-center flex-shrink-0">
                    🌾
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Lac Produce Solar Tunnel Dryer
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Khunti • Murhu Block (3.8 km)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-xs text-slate-500">Birsa Agricultural University</span>
                  <button
                    type="button"
                    onClick={() => handleUpvote('JAG-2026-KHU-0034')}
                    className="inline-flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-[#D97706] px-3 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{upvotes['JAG-2026-KHU-0034']}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW B: UNIVERSITY / RESEARCHER DASHBOARD
          ========================================================================= */}
      {role === 'university' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Institutional Profile Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{t('dashboard.university.nablBadge')}</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-blue-50 text-[#1D4ED8] text-[11px] font-bold px-3 py-1 rounded-full border border-blue-200">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>{t('dashboard.university.activeGrants')}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('dashboard.university.headerTitle')}
              </h1>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center space-x-2 self-start md:self-auto">
              <Clock className="w-4 h-4 text-[#D97706] flex-shrink-0 animate-pulse" />
              <span className="text-xs font-black text-amber-900">
                {t('dashboard.university.biddingWindowCountdown')}
              </span>
            </div>
          </div>

          {/* AI-Matched Challenge Feed & 5-Axis Explainable AI Spider/Radar Chart */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t('dashboard.university.matchedFeedTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  Matched Challenge: High Fluoride Groundwater Filtration in Palamu Basin
                </p>
              </div>

              <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-[#1D4ED8] font-black text-sm px-4 py-1.5 rounded-full border border-blue-200 self-start sm:self-auto">
                <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
                <span>{t('dashboard.university.compatibilityScore')}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: 5-Axis Explainable AI Spider/Radar Chart (SVG) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="relative w-56 h-56">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Concentric Pentagon Background Grids */}
                    <polygon
                      points="100,20 176,75 147,165 53,165 24,75"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                    <polygon
                      points="100,44 153,82 133,145 67,145 47,82"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                    <polygon
                      points="100,68 130,90 119,126 81,126 70,90"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />

                    {/* 5 Spokes */}
                    <line x1="100" y1="100" x2="100" y2="20" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="100" y1="100" x2="176" y2="75" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="100" y1="100" x2="147" y2="165" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="100" y1="100" x2="53" y2="165" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="100" y1="100" x2="24" y2="75" stroke="#CBD5E1" strokeWidth="1" />

                    {/* Algorithmic Match Polygon (95%, 90%, 85%, 88%, 92%) */}
                    <polygon
                      points="100,24 168,77 140,155 59,157 30,77"
                      fill="rgba(29, 78, 216, 0.25)"
                      stroke="#1D4ED8"
                      strokeWidth="2.5"
                    />

                    {/* Polygon Points */}
                    <circle cx="100" cy="24" r="4" fill="#1D4ED8" />
                    <circle cx="168" cy="77" r="4" fill="#1D4ED8" />
                    <circle cx="140" cy="155" r="4" fill="#1D4ED8" />
                    <circle cx="59" cy="157" r="4" fill="#1D4ED8" />
                    <circle cx="30" cy="77" r="4" fill="#1D4ED8" />
                  </svg>
                </div>

                {/* Legend Below Chart */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 w-full mt-2">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span>Labs: 95%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span>Patents: 90%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span>Proximity: 85%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span>Track Record: 88%</span>
                  </div>
                </div>
              </div>

              {/* Right: Bidding Actions & Explanatory Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-base text-slate-900">
                    Challenge #JAG-2026-PLM-0082: Fluoride Remediation
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Hydro-chemical survey in Satbarwa identified fluoride levels at 3.8 mg/L (WHO limit: 1.5 mg/L). BIT Mesra&apos;s NABL-accredited Adsorption Lab has 4 filed patents in activated alumina media, meeting 94% algorithmic fitness.
                  </p>
                </div>

                {/* Bidding Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSoloModal(true)}
                    className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold shadow transition-all active:scale-[0.98] flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>{t('dashboard.university.acceptSoloBtn')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowConsortiumModal(true)}
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-[#E2E8F0] px-5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98] flex items-center space-x-2"
                  >
                    <Building2 className="w-4 h-4 text-[#1D4ED8]" />
                    <span>{t('dashboard.university.proposeConsortiumBtn')}</span>
                  </button>
                </div>

                {teamFormedToast && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>{teamFormedToast}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3-Stage Dynamic Hackathon Workspace */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-black text-slate-900">
                {t('dashboard.university.hackathonTitle')}
              </h3>

              {/* Round 1, 2, 3 Tabs (>= 48px touch targets) */}
              <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-2xl border border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setHackathonTab('round1')}
                  className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    hackathonTab === 'round1'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.university.round1Tab')}
                </button>
                <button
                  type="button"
                  onClick={() => setHackathonTab('round2')}
                  className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    hackathonTab === 'round2'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.university.round2Tab')}
                </button>
                <button
                  type="button"
                  onClick={() => setHackathonTab('round3')}
                  className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                    hackathonTab === 'round3'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard.university.round3Tab')}
                </button>
              </div>
            </div>

            {/* TAB CONTENT: Round 1 (Ideation) */}
            {hackathonTab === 'round1' && (
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900">
                  {t('dashboard.university.round1Tab')}: Preliminary Jury Review
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('dashboard.university.round1Desc')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2">
                    <span className="text-xs font-bold text-slate-800">1. Pitch Deck (.PDF)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#1D4ED8]"
                    />
                  </div>
                  <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2">
                    <span className="text-xs font-bold text-slate-800">2. Video Pitch URL (2 Min)</span>
                    <input
                      type="url"
                      placeholder="https://youtu.be/..."
                      className="w-full text-xs p-2.5 min-h-[40px] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Round 2 (Mentoring & Prototype) */}
            {hackathonTab === 'round2' && (
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900">
                  {t('dashboard.university.round2Tab')}: Technical Mentorship & Bench Prototype
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('dashboard.university.round2Desc')}
                </p>
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900">
                      Assigned Mentor: Mr. Rajesh Sharma (Tata Steel Chief Metallurgist)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Sprint Check-in: Wednesday, 11:00 AM • Bench Fluoride Drop Target: &lt; 1.0 mg/L
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                    Session Confirmed
                  </span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Round 3 (DPR & Defense) */}
            {hackathonTab === 'round3' && (
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">
                    Interactive Bill of Materials (BOM) Cost Calculator
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Physical Presentation Defense: Ranchi Slot 3
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-[#E2E8F0]">
                      <tr>
                        <th className="p-3">Hardware Subsystem</th>
                        <th className="p-3">Vendor / Material Specification</th>
                        <th className="p-3 text-right">Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      <tr>
                        <td className="p-3 font-bold">Adsorption Column Vessel</td>
                        <td className="p-3">FRP 50L pressure cylinder with manifold</td>
                        <td className="p-3 text-right font-mono">₹{bomHardwareCost.filtrationColumn}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Solar PV Pump Kit</td>
                        <td className="p-3">300W monocrystalline with DC submersible pump</td>
                        <td className="p-3 text-right font-mono">₹{bomHardwareCost.solarPvPumps}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Adsorption Media Charge</td>
                        <td className="p-3">Nano-functionalized activated alumina (50 kg)</td>
                        <td className="p-3 text-right font-mono">₹{bomHardwareCost.adsorptionMedia}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">IoT Telemetry Logger</td>
                        <td className="p-3">ESP32 with 4G LTE SIM & TDS sensor</td>
                        <td className="p-3 text-right font-mono">₹{bomHardwareCost.iotTelemetryLogger}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Civic Installation Base</td>
                        <td className="p-3">Reinforced concrete pad & security cage</td>
                        <td className="p-3 text-right font-mono">₹{bomHardwareCost.installationCivic}</td>
                      </tr>
                      <tr className="bg-blue-50/70 font-black text-slate-900 border-t-2 border-[#1D4ED8]">
                        <td className="p-3" colSpan={2}>
                          Total Hardware Prototype Budget
                        </td>
                        <td className="p-3 text-right font-mono text-sm text-[#1D4ED8]">
                          ₹{bomTotal.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* NEP 2020 Credit Banking Widget */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {t('dashboard.university.nepTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('dashboard.university.nepSubtitle')}
                </p>
              </div>

              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {t('dashboard.university.hoursLogged')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="space-y-1 text-xs text-slate-700">
                <p className="font-bold text-slate-900">Student Lead: Rahul Soren (Roll: 2023-CS-041)</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  APAAR ID: 9021-4820-1129 • ABC Account: ABC-JH-2026-9921
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('APAAR/ABC Credit Payload XML generated and cryptographically signed.')}
                className="inline-flex items-center space-x-1.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2.5 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{t('dashboard.university.exportApaarBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW C: INDUSTRY & CSR PARTNER DASHBOARD
          ========================================================================= */}
      {role === 'industry' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* CSR Portfolio Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-200">
                <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Section 135 Compliant Matching Grant Program</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
                {t('dashboard.industry.headerTitle')}
              </h1>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl self-start md:self-auto">
              <span className="text-xs font-black text-[#1D4ED8]">
                {t('dashboard.industry.escrowPool')}
              </span>
            </div>
          </div>

          {/* CSR Schedule VII Opportunity Pipeline & Interactive Co-Funding Slider */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {t('dashboard.industry.pipelineTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dashboard.industry.pipelineSubtitle')}
              </p>
            </div>

            {/* Interactive Co-Funding Slider */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {t('dashboard.industry.coFundingTitle')}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Select your corporate grant pledge (₹50,000 to ₹10,00,000). The State of Jharkhand automatically matches 1:1.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 block">Pledged CSR Grant</span>
                  <span className="text-2xl font-black text-[#1D4ED8] font-mono">
                    ₹{csrPledgeAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Slider Component */}
              <input
                type="range"
                min={50000}
                max={1000000}
                step={25000}
                value={csrPledgeAmount}
                onChange={(e) => setCsrPledgeAmount(Number(e.target.value))}
                className="w-full accent-[#1D4ED8] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              {/* Real-Time Calculation Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[11px]">{t('dashboard.industry.sliderPledge')}</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">₹{csrPledgeAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[11px]">{t('dashboard.industry.stateMatching')}</span>
                  <span className="font-bold text-[#16A34A] font-mono text-sm">+ ₹{csrPledgeAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs">
                  <span className="text-blue-700 block text-[11px] font-bold">{t('dashboard.industry.totalProjectGrant')}</span>
                  <span className="font-black text-[#1D4ED8] font-mono text-sm">₹{(csrPledgeAmount * 2).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                <span>✓ {t('dashboard.industry.taxReceiptPreview')}</span>
                <span className="font-mono text-[11px] text-emerald-700">Receipt #CSR-JH-2026-8819</span>
              </div>
            </div>
          </div>

          {/* Corporate Mentorship Hub */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t('dashboard.industry.mentorshipHubTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('dashboard.industry.mentorshipSubtitle')}
                </p>
              </div>

              <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-[#1D4ED8] font-bold text-xs px-3 py-1 rounded-full border border-blue-200">
                <Check className="w-3.5 h-3.5" />
                <span>{t('dashboard.industry.rofrBadge')}</span>
              </span>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm text-slate-900">
                    Active Student Team: BIT Mesra Adsorption Cohort
                  </span>
                  <p className="text-xs text-slate-500">
                    Milestone 2 Prototype Submission: Activated Alumina Column with Solar Telemetry
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded">
                  Pending Review
                </span>
              </div>

              {/* Sprint Review Submission Box */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSprintStatus('approved')}
                  className="bg-[#16A34A] hover:bg-[#15803D] text-white px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-bold shadow transition-all active:scale-[0.98] flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{t('dashboard.industry.approvePrototypeBtn')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSprintStatus('revision_requested')}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                  <span>{t('dashboard.industry.requestRevisionBtn')}</span>
                </button>
              </div>

              {sprintStatus === 'approved' && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Bench Prototype Approved. Milestone release clearance sent to DHTE Evaluator.</span>
                </div>
              )}

              {sprintStatus === 'revision_requested' && (
                <div className="p-3 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Hardware Revision Requested. Student team notified to reinforce column mount.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW D: GOVERNMENT (DHTE) & HITL EVALUATOR COMMAND CENTER
          ========================================================================= */}
      {role === 'government' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* State Treasury Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-500">Innovation Treasury</span>
                <IndianRupee className="w-4 h-4 text-[#1D4ED8]" />
              </div>
              <div className="text-2xl font-black text-[#1D4ED8]">₹4.2 Cr</div>
              <p className="text-[11px] text-slate-500">{t('dashboard.govt.totalPool')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-500">University Grants</span>
                <Building2 className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-2xl font-black text-slate-900">₹1.8 Cr</div>
              <p className="text-[11px] text-slate-500">{t('dashboard.govt.activeGrants')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card-subtle space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-500">Escrow Locked</span>
                <Clock className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="text-2xl font-black text-[#16A34A]">₹1.4 Cr</div>
              <p className="text-[11px] text-slate-500">{t('dashboard.govt.escrowLocked')}</p>
            </div>
          </div>

          {/* Human-in-the-Loop (HITL) Triage Verification Queue */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t('dashboard.govt.triageTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  Incoming challenges filtered by spatial radar and ViT defect classification
                </p>
              </div>

              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {t('dashboard.govt.aiConfidence')}
              </span>
            </div>

            {/* Triage Card */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    JAG-2026-PLM-0082
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">
                    Solar Water Defluoridation in Palamu (Satbarwa)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Groundwater fluoride level: 3.8 mg/L. ViT defect detection: 94% confidence.
                  </p>
                </div>
              </div>

              {/* Split Action Controls */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setTriageAction('approved')}
                  className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-bold shadow transition-all active:scale-[0.98] flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{t('dashboard.govt.approveRndBtn')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTriageAction('rerouted')}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-5 py-2.5 min-h-[48px] rounded-xl text-xs font-bold transition-all active:scale-[0.98] flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{t('dashboard.govt.rerouteCivicBtn')}</span>
                </button>
              </div>

              {triageAction === 'approved' && (
                <div className="p-3 bg-blue-50 text-blue-900 border border-blue-300 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Approved as Applied R&D grant. Broadcasted to matched HEIs with ₹3,50,000 ceiling.</span>
                </div>
              )}

              {triageAction === 'rerouted' && (
                <div className="p-3 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Rerouted to Urban Local Body / JharSewa portal for standard civil maintenance.</span>
                </div>
              )}
            </div>
          </div>

          {/* Escrow Tranche Disbursement Approvals */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {t('dashboard.govt.escrowApprovalsTitle')}
              </h3>
              <p className="text-xs text-slate-500">{t('dashboard.govt.projectName')}</p>
            </div>

            <div className="space-y-3">
              {/* Milestone 1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  <span className="font-bold text-slate-900">{t('dashboard.govt.m1Status')}</span>
                </div>
                <span className="font-mono font-bold text-slate-500">₹1,05,000 Released</span>
              </div>

              {/* Milestone 2 */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#1D4ED8]" />
                    <span className="font-black text-slate-900">{t('dashboard.govt.m2Status')}</span>
                  </div>
                  <p className="text-[11px] text-blue-700">
                    NABL Lab Water Certificate: Fluoride reduced to 0.78 mg/L. Verified safe.
                  </p>
                </div>

                <div>
                  {!m2Disbursed ? (
                    <button
                      type="button"
                      onClick={() => setM2Disbursed(true)}
                      className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2.5 min-h-[48px] rounded-xl font-bold shadow transition-all active:scale-[0.98]"
                    >
                      {t('dashboard.govt.m2AuthorizeBtn')}
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>₹1,40,000 Disbursed</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs opacity-75">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-700">{t('dashboard.govt.m3Status')}</span>
                </div>
                <span className="font-mono text-slate-400">₹1,05,000 Locked</span>
              </div>
            </div>
          </div>

          {/* State-Wide Macro GIS Analytics Heatmap (24 Districts) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card-subtle space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {t('dashboard.govt.heatmapTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dashboard.govt.heatmapSubtitle')}
              </p>
            </div>

            <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
              <table className="w-full text-xs text-left bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0 border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3">District (24 Total)</th>
                    <th className="p-3 text-right">Submissions</th>
                    <th className="p-3 text-right">Active HEIs</th>
                    <th className="p-3 text-right">Patents Filed</th>
                    <th className="p-3 text-right">Resolution Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {JHARKHAND_24_DISTRICTS.map((dist, idx) => (
                    <tr key={dist.name} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                        <span>{dist.name}</span>
                      </td>
                      <td className="p-3 text-right font-mono">{dist.submissions}</td>
                      <td className="p-3 text-right font-mono">{dist.activeHEIs}</td>
                      <td className="p-3 text-right font-mono">{dist.patents}</td>
                      <td className="p-3 text-right font-mono font-bold text-[#16A34A]">
                        {dist.resolutionRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS FOR UNIVERSITY BIDDING ACTIONS
          ========================================================================= */}
      {/* Solo Team Formation Modal */}
      {showSoloModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowSoloModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900">
              Form Solo Challenge Team: BIT Mesra
            </h3>
            <p className="text-xs text-slate-600">
              Select your Principal Investigator (PI) and 4 Student Engineering Leads for the 3-Stage Hackathon.
            </p>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Faculty Principal Investigator (PI)</label>
                <input
                  type="text"
                  defaultValue="Dr. Amit Kumar (Professor, Civil & Env. Eng)"
                  className="w-full p-2.5 min-h-[40px] border border-slate-200 rounded-lg bg-slate-50"
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">4 Student Lead Roll Numbers</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" defaultValue="2023-CS-041 (Lead)" className="p-2 border rounded-lg bg-slate-50" readOnly />
                  <input type="text" defaultValue="2023-ME-019 (Hardware)" className="p-2 border rounded-lg bg-slate-50" readOnly />
                  <input type="text" defaultValue="2023-EE-082 (Solar)" className="p-2 border rounded-lg bg-slate-50" readOnly />
                  <input type="text" defaultValue="2023-CE-034 (Field)" className="p-2 border rounded-lg bg-slate-50" readOnly />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSoloModal(false);
                setTeamFormedToast('Solo Challenge Accepted! Team Registered with BIT Mesra. Round 1 Ideation Workspace Unlocked.');
              }}
              className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold py-3.5 min-h-[48px] rounded-xl shadow transition-all"
            >
              Confirm Team & Begin Round 1
            </button>
          </div>
        </div>
      )}

      {/* Joint Consortium Modal */}
      {showConsortiumModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowConsortiumModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900">
              Propose Joint HEI Consortium
            </h3>
            <p className="text-xs text-slate-600">
              Partner with Birsa Agricultural University (BAU) or NIT Jamshedpur to co-engineer the solution.
            </p>

            <div className="space-y-3 text-xs">
              <label className="font-bold text-slate-800">Select Partner HEI</label>
              <select className="w-full p-2.5 min-h-[48px] border border-slate-200 rounded-xl bg-white font-bold">
                <option>Birsa Agricultural University (BAU) — Agronomy & Soil Lab</option>
                <option>NIT Jamshedpur — Electronics & Telemetry</option>
                <option>IIT (ISM) Dhanbad — Hydrogeology Division</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowConsortiumModal(false);
                setTeamFormedToast('Consortium Proposal Dispatched to Birsa Agricultural University.');
              }}
              className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold py-3.5 min-h-[48px] rounded-xl shadow transition-all"
            >
              Dispatch Consortium Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
