'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCitizen } from '@/context/CitizenContext';
import { ShieldCheck, Phone, User, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { user, login, logout, language, t } = useCitizen();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(phoneNumber, citizenName || 'Jharkhand Citizen');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#044728] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'नागरिक सत्यापन एवं लॉगिन' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱵᱚᱞᱚᱱ (Login)' : 'Citizen Authentication'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'ओटीपी द्वारा त्वरित सत्यापन — आधार/मोबाइल सुरक्षित'
              : language === 'sat'
              ? 'ᱢᱚᱵᱟᱭᱤᱞ ᱮᱞ ᱛᱮ ᱵᱚᱞᱚᱱ ᱢᱮ'
              : 'Direct OTP verification with mobile number for rural citizens.'}
          </p>
        </div>

        {user.isAuthenticated ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-10 h-10 text-[#044728] mx-auto" />
            <div className="text-sm">
              <p className="font-bold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.phone}</p>
            </div>
            <button
              onClick={() => logout()}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-lg transition-colors"
            >
              {t('common', 'logout', 'Logout')}
            </button>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {t('common', 'name', 'Full Name')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="उदा. बिरसा मुंडा"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#044728] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {t('common', 'phone', 'Mobile Phone Number')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#044728] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#044728] hover:bg-[#03361e] text-white text-xs font-bold py-3 rounded-lg shadow transition-all"
            >
              {language === 'hi' ? 'ओटीपी प्राप्त करें' : language === 'sat' ? 'OTP ᱧᱟᱢ ᱢᱮ' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {language === 'hi' ? '6-अंकीय ओटीपी दर्ज करें (डिफ़ॉल्ट: 123456)' : 'Enter 6-digit OTP (Mock: 123456)'}
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-base font-mono py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#044728] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#044728] hover:bg-[#03361e] text-white text-xs font-bold py-3 rounded-lg shadow transition-all"
            >
              {language === 'hi' ? 'ओटीपी सत्यापित करें' : language === 'sat' ? 'OTP ᱥᱟᱹᱨᱤ ᱢᱮ' : 'Verify & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

