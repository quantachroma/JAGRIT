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
    login(phoneNumber, citizenName || (language === 'hi' ? 'झारखण्ड नागरिक' : language === 'sat' ? 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱱᱟᱜᱟᱨᱤᱠ' : 'Jharkhand Citizen'));
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto border border-blue-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {language === 'hi'
              ? 'नागरिक सत्यापन एवं लॉगिन'
              : language === 'sat'
              ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱵᱚᱞᱚᱱ'
              : 'Citizen Authentication'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'ओटीपी द्वारा त्वरित सत्यापन — मोबाइल सुरक्षित'
              : language === 'sat'
              ? 'ᱢᱚᱵᱟᱭᱤᱞ ᱮᱞ ᱛᱮ ᱵᱚᱞᱚᱱ ᱢᱮ'
              : 'Direct OTP verification with mobile number for rural citizens.'}
          </p>
        </div>

        {user.isAuthenticated ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <div className="text-sm">
              <p className="font-bold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.phone}</p>
            </div>
            <button
              onClick={() => logout()}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 min-h-[44px] rounded-lg transition-colors"
            >
              {t('common.logout') || (language === 'hi' ? 'लॉगआउट' : language === 'sat' ? 'ᱚᱰᱚᱠᱚᱜ ᱢᱮ' : 'Logout')}
            </button>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {t('common.name') || (language === 'hi' ? 'पूरा नाम' : language === 'sat' ? 'ᱯᱩᱨᱟᱹ ᱧᱩᱛᱩᱢ' : 'Full Name')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. बिरसा मुंडा'
                      : language === 'sat'
                      ? 'ᱫᱟᱹᱭᱠᱟᱹ: ᱵᱤᱨᱥᱟ ᱢᱩᱱᱰᱟ'
                      : 'e.g., Birsa Munda'
                  }
                  className="w-full pl-9 pr-3 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {t('common.phone') || (language === 'hi' ? 'मोबाइल नंबर' : language === 'sat' ? 'ᱢᱚᱵᱟᱭᱤᱞ ᱮᱞ' : 'Mobile Phone Number')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 min-h-[48px] rounded-lg shadow transition-all active:scale-95"
            >
              {language === 'hi'
                ? 'ओटीपी प्राप्त करें'
                : language === 'sat'
                ? 'OTP ᱧᱟᱢ ᱢᱮ'
                : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {language === 'hi'
                  ? 'सत्यापन कोड दर्ज करें'
                  : language === 'sat'
                  ? 'ᱠᱳᱰ ᱚᱞ ᱢᱮ'
                  : 'Enter Verification Code'}
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-base font-mono py-2.5 min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 min-h-[48px] rounded-lg shadow transition-all active:scale-95"
            >
              {language === 'hi'
                ? 'सत्यापित करें और आगे बढ़ें'
                : language === 'sat'
                ? 'ᱥᱟᱹᱨᱤ ᱢᱮ ᱟᱨ ᱞᱟᱦᱟᱜ ᱢᱮ'
                : 'Verify & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
