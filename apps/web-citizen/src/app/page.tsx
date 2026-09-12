'use client';

import React from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import {
  AlertCircle,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2,
  GraduationCap,
  Scale,
  Sparkles,
  ArrowRight,
  Send,
  Droplets,
  Zap,
  Hammer,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useCitizen();

  const problemCategories = [
    {
      id: 'drinking_water',
      title: language === 'hi' ? 'पेयजल एवं चापाकल' : language === 'sat' ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ (Chapekal daah)' : 'Drinking Water & Handpump',
      icon: Droplets,
      desc: language === 'hi' ? 'खराब चापाकल, जल दूषण व पाइपलाइन मरम्मत' : language === 'sat' ? 'ᱵᱟᱹᱲᱤᱡ ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ' : 'Broken handpumps, contamination & supply lines',
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      id: 'road_drainage',
      title: language === 'hi' ? 'ग्रामीण सड़क एवं नाली' : language === 'sat' ? 'ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱤ (Hor ar nali)' : 'Rural Roads & Drainage',
      icon: Hammer,
      desc: language === 'hi' ? 'टूटी पुलिया, कच्ची सड़क व जलजमाव' : language === 'sat' ? 'ᱵᱟᱹᱲᱤᱡ ᱦᱚᱨ ᱟᱨ ᱰᱟᱦᱟᱨ' : 'Culverts, village roads & drainage overflow',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'electricity',
      title: language === 'hi' ? 'विद्युत एवं सौर ऊर्जा' : language === 'sat' ? 'ᱵᱤᱡᱞᱤ ᱟᱨ ᱥᱮᱸᱜᱮᱞ (Bijli ar sengel)' : 'Rural Solar & Microgrid',
      icon: Zap,
      desc: language === 'hi' ? 'खराब ट्रांसफार्मर, स्ट्रीट लाइट व सौर पैनल' : language === 'sat' ? 'ᱴᱨᱟᱱᱥᱯᱷᱟᱨᱢᱟᱨ ᱟᱨ ᱵᱤᱡᱞᱤ' : 'Solar microgrids, transformers & village lighting',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#044728] via-[#033b21] to-[#011a0e] text-white p-6 sm:p-10 shadow-xl border border-emerald-800">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('splash', 'badge', 'Government of Jharkhand Initiative')}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
            {t('splash', 'heroTitle', 'Empowering Rural Communities Through Higher Education Innovation')}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {t('splash', 'heroSubtitle', 'Transforming civic grievances into applied engineering challenges for universities across Jharkhand.')}
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <Link
              href="/report"
              className="inline-flex items-center space-x-2 bg-[#D97706] hover:bg-[#b45309] text-white font-bold px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm group"
            >
              <AlertCircle className="w-4 h-4 text-amber-100" />
              <span>{t('splash', 'actionReport', 'Report Problem')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-lg backdrop-blur border border-white/20 transition-all text-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-300" />
              <span>{t('splash', 'actionDashboard', 'Track Status')}</span>
            </Link>

            <Link
              href="/samvaad"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-lg backdrop-blur border border-white/20 transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4 text-amber-300" />
              <span>{t('splash', 'actionSamvaad', 'Jan Samvaad')}</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights / Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-emerald-700/50">
          <div>
            <div className="text-2xl font-black text-amber-300">1,248+</div>
            <div className="text-xs text-emerald-200">{t('splash', 'statIssuesResolved', 'Issues Resolved')}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">42</div>
            <div className="text-xs text-emerald-200">{t('splash', 'statCollegesEngaged', 'HEIs Connected')}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-300">4,350+</div>
            <div className="text-xs text-emerald-200">{t('splash', 'statPanchayatsCovered', 'Panchayats Covered')}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">₹3.8 Cr</div>
            <div className="text-xs text-emerald-200">{t('splash', 'statFundsDisbursed', 'Escrow Released')}</div>
          </div>
        </div>
      </section>

      {/* Primary Action Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'hi' ? 'शीर्ष नागरिक सेवाएं' : language === 'sat' ? 'ᱢᱩᱬᱩᱛ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Services)' : 'Key Citizen Services'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'सीधे अपनी समस्या दर्ज करें अथवा समुदाय के साथ विचार करें' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱞᱟᱹᱭ ᱢᱮ' : 'Submit grievance, view live progress or deliberate in community forum'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Submit Problem */}
          <Link
            href="/report"
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#044728] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-[#044728] group-hover:scale-105 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#044728] transition-colors">
                {language === 'hi' ? 'समस्या दर्ज करें' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱥᱚᱢᱚᱥᱭᱟ (Aatu samasya)' : 'Report Problem'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पेयजल, चापाकल, बिजली, सड़क अथवा नाली संबंधी समस्या की फोटो या बोलकर शिकायत दर्ज करें।'
                  : language === 'sat'
                  ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱥᱮ ᱦᱚᱨ-ᱰᱟᱦᱟᱨ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾'
                  : 'Report broken civic assets using voice notes, photos, or GPS geolocation.'}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#044728] group-hover:underline">
              <span>{language === 'hi' ? 'दर्ज करने के लिए क्लिक करें' : language === 'sat' ? 'ᱚᱞ ᱢᱮ' : 'Start Reporting'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 2: Track Status */}
          <Link
            href="/dashboard"
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#D97706] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-[#D97706] group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#D97706] transition-colors">
                {language === 'hi' ? 'स्थिति एवं समाधान डैशबोर्ड' : language === 'sat' ? 'ᱤᱧᱟᱜ ᱥᱚᱢᱚᱥᱭᱟ (Dashboard)' : 'Grievance Dashboard'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'अपनी दर्ज समस्या की लाइव स्थिति, विश्वविद्यालय हैकथॉन समाधान व ग्राम सभा सत्यापन ट्रैक करें।'
                  : language === 'sat'
                  ? 'ᱮᱟᱭᱤ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱟᱨ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱮᱯᱨᱟᱣ ᱨᱮᱱᱟᱜ ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ᱾'
                  : 'Track your ticket through AI Triage, University Bidding, Hackathons & Field Testing.'}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#D97706] group-hover:underline">
              <span>{language === 'hi' ? 'स्थिति जांचें' : language === 'sat' ? 'ᱧᱮᱞ ᱢᱮ' : 'View Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 3: Jan Samvaad */}
          <Link
            href="/samvaad"
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#044728] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-[#044728] group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#044728] transition-colors">
                {language === 'hi' ? 'जन संवाद (सामुदायिक चौपाल)' : language === 'sat' ? 'ᱵᱤᱪᱟᱹᱨ (Bichar - Forum)' : 'Jan Samvaad Forum'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'अपने पंचायत व प्रखंड के अन्य नागरिकों व छात्रों के साथ समस्याओं पर खुली चर्चा करें।'
                  : language === 'sat'
                  ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱟᱨ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱶ ᱨᱚᱯᱚᱲ ᱟᱨ ᱜᱚᱲᱚ ᱮᱢ ᱢᱮ᱾'
                  : 'Deliberate civic challenges, share audio threads, and participate in community upvoting.'}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#044728] group-hover:underline">
              <span>{language === 'hi' ? 'संवाद में जुड़ें' : language === 'sat' ? 'ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ' : 'Join Discussion'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Problem Domains Preview */}
      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'hi' ? 'प्रमुख ग्रामीण समस्या क्षेत्र' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱟᱹᱴᱤᱧ (Domains)' : 'Supported Problem Domains'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi' ? 'झारखण्ड के ग्रामीण क्षेत्रों की प्राथमिक समस्याएं' : language === 'sat' ? 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ' : 'High priority rural domains addressed by university research labs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problemCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-3">
                <div className={`p-2.5 rounded-lg border ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{cat.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How JAGRIT Works: 4-Stage Closed Loop */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {language === 'hi' ? 'जागृत कार्यप्रणाली: समस्या से स्थायी समाधान' : language === 'sat' ? 'ᱡᱟᱜᱽᱨᱤᱛ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Workflow)' : 'How JAGRIT Works (The Closed-Loop Model)'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#044728] font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'नागरिक रिपोर्टिंग' : language === 'sat' ? 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ' : '1. Multilingual Ingestion'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'हिन्दी, संथाली या खोरठा में बोलकर या लिखकर समस्या दर्ज करें।' : language === 'sat' ? 'ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮ ᱦᱤᱱᱫᱤ ᱛᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾' : 'Report in Santhali, Hindi, or English via Web or WhatsApp.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#D97706] font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'एआई जांच व वर्गीकरण' : language === 'sat' ? 'ᱮᱟᱭᱤ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ' : '2. AI & HITL Triage'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? '500m डुप्लिकेशन जांच और विश्वविद्यालय शोध के लिए चयन।' : language === 'sat' ? '᱕᱐᱐ ᱢᱤᱴᱟᱨ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱦᱩᱭᱩᱜ-ᱟ᱾' : '500m PostGIS buffer and zero-shot research routing.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#044728] font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'विश्वविद्यालय हैकथॉन' : language === 'sat' ? 'ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱮᱯᱨᱟᱣ' : '3. University R&D Sprint'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? '3-चरणीय हैकथॉन और एस्क्रो फंड (30-40-30%) से प्रोटोटाइप निर्माण।' : language === 'sat' ? 'ᱠᱚᱞᱮᱡᱽ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱚᱞᱦᱮ ᱵᱮᱱᱟᱣᱟ᱾' : '3-round hackathon with milestone-based escrow release.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#D97706] font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'hi' ? 'ग्राम सभा सत्यापन' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ' : '4. 45-Day Citizen Quorum'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'जमीनी सत्यापन और ग्राम सभा अनापत्ति (PESA Act) के बाद समापन।' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱚ ᱥᱟᱹᱨᱤ ᱞᱮᱠᱷᱟᱱ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣᱜ-ᱟ᱾' : 'Durability testing, citizen quorum, and PESA Gram Sabha NOC.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

