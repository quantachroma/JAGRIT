'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCitizen, UserRole } from '@/context/CitizenContext';
import {
  User,
  Building2,
  Briefcase,
  ShieldCheck,
  Phone,
  Mail,
  FileCheck2,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { user, login, logout, setRole, language, t } = useCitizen();

  // Active Role Tab
  const [activeTab, setActiveTab] = useState<UserRole>('citizen');

  // Citizen Form State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  // University Form State
  const [univEmail, setUnivEmail] = useState('');
  const [facultyName, setFacultyName] = useState('');

  // Industry Form State
  const [industryEmail, setIndustryEmail] = useState('');
  const [industryCin, setIndustryCin] = useState('');
  const [industryName, setIndustryName] = useState('');

  // Govt Form State
  const [govtEmail, setGovtEmail] = useState('');
  const [govtEsign, setGovtEsign] = useState('');

  // Handle OTP digit change
  const handleOtpDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCitizenSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
      // default mock OTP
      setOtpDigits(['4', '1', '0', '2', '8', '8']);
    }
  };

  const handleCitizenVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const name = citizenName.trim() || 'Mangal Soren';
    login(phoneNumber || '9835123456', name, 'citizen');
    router.push('/dashboard');
  };

  const handleUnivSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = facultyName.trim() || 'Dr. Amit Kumar (Faculty PI)';
    login('9431100001', name, 'university', 'BIT Mesra (Civil & Env. Eng)');
    router.push('/dashboard');
  };

  const handleIndustrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = industryName.trim() || 'Tata Steel CSR Division';
    login('9431100002', name, 'industry', 'Tata Steel CSR & Sustainability');
    router.push('/dashboard');
  };

  const handleGovtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('9431100003', 'State Triage Evaluator (DHTE)', 'government', 'Dept. of Higher & Technical Education');
    router.push('/dashboard');
  };

  // Demo 1-Click Fast Login
  const handleDemoLogin = (role: UserRole) => {
    if (role === 'citizen') {
      login('9835123456', 'Mangal Soren', 'citizen', 'Kanke Panchayat, Ranchi');
    } else if (role === 'university') {
      login('9431100001', 'Dr. Amit Kumar (Faculty PI)', 'university', 'BIT Mesra');
    } else if (role === 'industry') {
      login('9431100002', 'Tata Steel CSR Lead', 'industry', 'Tata Steel CSR');
    } else if (role === 'government') {
      login('9431100003', 'State Triage Evaluator (DHTE)', 'government', 'Dept. of Higher & Technical Education');
    }
    setRole(role);
    router.push('/dashboard');
  };

  const roleTabs: { id: UserRole; labelKey: string; icon: any }[] = [
    { id: 'citizen', labelKey: 'auth.citizenTab', icon: User },
    { id: 'university', labelKey: 'auth.universityTab', icon: Building2 },
    { id: 'industry', labelKey: 'auth.industryTab', icon: Briefcase },
    { id: 'government', labelKey: 'auth.govtTab', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-xl mx-auto py-8 sm:py-12 px-2 sm:px-0">
      {/* Centered Modern Card with Subtle Gradient Header and Clean White Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-card-subtle overflow-hidden">
        {/* Subtle Header Gradient */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50/60 p-6 sm:p-8 border-b border-[#E2E8F0] text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-[#1D4ED8] px-3.5 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('auth.badge')}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('auth.title')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {t('auth.subtitle')}
          </p>
        </div>

        {/* Role Selection Navigation Bar (4 Tab Options with Clear SVG Icons) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#E2E8F0] bg-slate-50/70 p-1.5 gap-1">
          {roleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 min-h-[48px] rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'bg-white text-[#1D4ED8] shadow-xs border-b-[3px] border-[#1D4ED8]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1D4ED8]' : 'text-slate-400'}`} />
                <span className="truncate">{t(tab.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Card Body with Role-Specific Form Fields */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: CITIZEN */}
          {activeTab === 'citizen' && (
            <div className="space-y-5">
              {!otpSent ? (
                <form onSubmit={handleCitizenSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {t('common.name')}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        placeholder="Mangal Soren"
                        className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {t('auth.citizenPhoneLabel')} *
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold font-mono text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder={t('auth.citizenPhonePlaceholder')}
                        className="w-full pl-12 pr-3 py-3 min-h-[48px] text-xs sm:text-sm font-mono border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50 tracking-wider"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm py-3.5 min-h-[48px] rounded-xl shadow transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>{t('auth.getOtp')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCitizenVerify} className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-2 text-center">
                    <label className="block text-xs font-bold text-slate-800">
                      {t('auth.otpLabel')}
                    </label>
                    <p className="text-[11px] text-slate-500">
                      +91 {phoneNumber || '9835123456'}
                    </p>

                    {/* 6-Digit OTP Inputs with auto-focus */}
                    <div className="flex justify-center gap-2 pt-2">
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                          className="w-11 h-12 text-center text-lg font-mono font-black border-2 border-[#E2E8F0] focus:border-[#1D4ED8] rounded-xl focus:outline-none bg-white shadow-xs"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black text-xs sm:text-sm py-3.5 min-h-[48px] rounded-xl shadow transition-all duration-200 active:scale-[0.98]"
                  >
                    {t('auth.otpVerify')}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: UNIVERSITY */}
          {activeTab === 'university' && (
            <form onSubmit={handleUnivSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t('auth.univEmailLabel')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={univEmail}
                    onChange={(e) => setUnivEmail(e.target.value)}
                    placeholder={t('auth.univEmailPlaceholder')}
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center space-x-2 text-[11px] text-blue-900">
                <FileCheck2 className="w-4 h-4 text-[#1D4ED8] flex-shrink-0" />
                <span>{t('auth.univNadBadge')}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm py-3.5 min-h-[48px] rounded-xl shadow transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-4 h-4 text-white" />
                <span>{t('auth.univSsoButton')}</span>
              </button>
            </form>
          )}

          {/* TAB 3: INDUSTRY / CSR */}
          {activeTab === 'industry' && (
            <form onSubmit={handleIndustrySubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t('auth.industryEmailLabel')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={industryEmail}
                    onChange={(e) => setIndustryEmail(e.target.value)}
                    placeholder={t('auth.industryEmailPlaceholder')}
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t('auth.industryCinLabel')} *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={industryCin}
                    onChange={(e) => setIndustryCin(e.target.value)}
                    placeholder={t('auth.industryCinPlaceholder')}
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm font-mono border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50 uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm py-3.5 min-h-[48px] rounded-xl shadow transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{t('auth.industryVerifyButton')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 4: GOVT EVALUATOR */}
          {activeTab === 'government' && (
            <form onSubmit={handleGovtSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t('auth.govtEmailLabel')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={govtEmail}
                    onChange={(e) => setGovtEmail(e.target.value)}
                    placeholder={t('auth.govtEmailPlaceholder')}
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {t('auth.govtEsignLabel')} *
                </label>
                <div className="relative">
                  <Fingerprint className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={govtEsign}
                    onChange={(e) => setGovtEsign(e.target.value)}
                    placeholder={t('auth.govtEsignPlaceholder')}
                    className="w-full pl-10 pr-3 py-3 min-h-[48px] text-xs sm:text-sm font-mono border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm py-3.5 min-h-[48px] rounded-xl shadow transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{t('auth.govtLoginButton')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Demo 1-Click Fast Login Pills Section */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] space-y-3 text-center">
            <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('auth.demoTitle')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('citizen')}
                className="px-3 py-2.5 min-h-[48px] rounded-xl border border-[#E2E8F0] hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 text-emerald-900 font-bold text-xs transition-all active:scale-[0.98] text-left flex items-center space-x-2"
              >
                <User className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span className="truncate">{t('auth.demoCitizen')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('university')}
                className="px-3 py-2.5 min-h-[48px] rounded-xl border border-[#E2E8F0] hover:border-blue-500 bg-blue-50/60 hover:bg-blue-50 text-blue-900 font-bold text-xs transition-all active:scale-[0.98] text-left flex items-center space-x-2"
              >
                <Building2 className="w-4 h-4 text-[#1D4ED8] flex-shrink-0" />
                <span className="truncate">{t('auth.demoUniv')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('industry')}
                className="px-3 py-2.5 min-h-[48px] rounded-xl border border-[#E2E8F0] hover:border-amber-500 bg-amber-50/60 hover:bg-amber-50 text-amber-900 font-bold text-xs transition-all active:scale-[0.98] text-left flex items-center space-x-2"
              >
                <Briefcase className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span className="truncate">{t('auth.demoIndustry')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('government')}
                className="px-3 py-2.5 min-h-[48px] rounded-xl border border-[#E2E8F0] hover:border-indigo-500 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-all active:scale-[0.98] text-left flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-700 flex-shrink-0" />
                <span className="truncate">{t('auth.demoGovt')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
