'use client';

import React from 'react';
import { useCitizen } from '@/context/CitizenContext';

export default function Footer() {
  const { language } = useCitizen();

  const text = {
    title:
      language === 'hi'
        ? 'JAGRIT — झारखंड एकेडेमिया इंडस्ट्री गेटवे फॉर रिसर्च, इनोवेशन एंड ट्रांसफॉर्मेशन ऑफ सोसाइटी'
        : 'JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society',
    dept:
      language === 'hi'
        ? 'उच्च एवं तकनीकी शिक्षा विभाग, झारखंड सरकार'
        : language === 'sat'
        ? 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ'
        : 'Department of Higher & Technical Education, Government of Jharkhand',
    districts: 'Ranchi • Dhanbad • Jamshedpur • Bokaro • Hazaribagh • Deoghar • Dumka • Chaibasa',
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1.5">
        <p className="font-bold text-blue-950">{text.title}</p>
        <p className="text-slate-500">{text.dept}</p>
        <p className="text-[11px] text-slate-400 pt-1">{text.districts}</p>
      </div>
    </footer>
  );
}
