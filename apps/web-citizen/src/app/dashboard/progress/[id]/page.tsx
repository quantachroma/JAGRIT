'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  FileText,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Droplets,
  Activity,
  X,
  Download,
  Share2,
} from 'lucide-react';

export default function CitizenProgressStatusPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [showDprModal, setShowDprModal] = useState(false);

  // Normalize ticket ID
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const ticketId = rawId ? decodeURIComponent(rawId) : 'JAG-4102';
  const displayTicket = ticketId.startsWith('#') ? ticketId : `#${ticketId}`;

  // Localized texts
  const tContent = {
    en: {
      backBtn: '← Back to Grievance Dashboard',
      badgeStatus: 'ACTIVE UNIVERSITY R&D SPRINT',
      title: 'Palamu District: High Fluoride & Arsenic Contamination in Borewell Water',
      stage4Status: 'Implementation is going on (Week 3 of 16)',
      liveTelemetry: 'Live Telemetry: Bench-scale solar defluoridation unit fabricated. NABL lab testing in progress. Field deployment scheduled at Kanke elementary school.',
      actionCardTitle: 'Have questions about this project?',
      actionCardSub: 'Connect directly with student researchers or inspect technical project reports.',
      samvaadBtn: '💬 Open Samvaad Research Thread',
      dprBtn: '📊 View Technical DPR Report (PDF)',
      step1Title: 'Step 1: Submitted by Citizen',
      step1Date: 'Completed on 12 Sep 2026',
      step1Desc: 'Media verified, PostGIS 500m deduplication radar passed, upvoted by 24 citizens.',
      step2Title: 'Step 2: AI Triage & University Matching',
      step2Date: 'Completed on 13 Sep 2026',
      step2Desc: 'Classified as HEI_RESEARCH. Matched with BIT Mesra (Civil & Environmental Eng.) via 5-axis XAI Spider Chart (94% Fit).',
      step3Title: 'Step 3: University Proposal & Tranche 1 Funding',
      step3Date: 'Completed on 14 Sep 2026',
      step3Desc: 'Faculty PI Dr. Anand Verma accepted challenge. DPR approved. State released Tranche 1 Grant: ₹1,05,000 (30%).',
      step4Title: 'Step 4: Innovation, Lab Prototyping & Field Implementation',
      step4Badge: 'CURRENT ACTIVE STAGE',
      step5Title: 'Step 5: 45-Day Maturation & Citizen Quorum Verification',
      step5Badge: 'Pending',
      step5Desc: 'Unassisted 45-day field test followed by community quorum voting to unlock NEP 2020 student credits.',
      heiPartnerLabel: 'Assigned University:',
      leadPiLabel: 'Faculty Lead:',
      grantAllocatedLabel: 'Total Approved Grant:',
      disbursedLabel: 'Tranche 1 Disbursed:',
    },
    hi: {
      backBtn: '← जनसमस्या डैशबोर्ड पर वापस जाएं',
      badgeStatus: 'सक्रिय विश्वविद्यालय आरएंडडी स्प्रिंट',
      title: 'पलामू ज़िला: बोरवेल भूजल में अत्यधिक फ्लोराइड एवं आर्सेनिक संदूषण',
      stage4Status: 'कार्यान्वयन प्रगति पर है (सप्ताह ३ / १६)',
      liveTelemetry: 'लाइव टेलीमेट्री: बेंच-स्केल सोलर फ्लोराइड-मुक्त इकाई का निर्माण पूर्ण। एनएबीएल लैब परीक्षण जारी। कांके प्राथमिक विद्यालय में क्षेत्रीय स्थापना निर्धारित।',
      actionCardTitle: 'क्या आपके पास इस परियोजना के संबंध में कोई प्रश्न हैं?',
      actionCardSub: 'छात्र शोधकर्ताओं से सीधे संवाद करें अथवा तकनीकी परियोजना रिपोर्ट देखें।',
      samvaadBtn: '💬 संवाद अनुसंधान मंच खोलें',
      dprBtn: '📊 तकनीकी डीपीआर रिपोर्ट देखें (पीडीएफ)',
      step1Title: 'चरण १: नागरिक द्वारा शिकायत दर्ज',
      step1Date: '१२ सितम्बर २०२६ को पूर्ण',
      step1Desc: 'फ़ोटो एवं मीडिया सत्यापित, पोस्टजीआईएस ५०० मीटर डुप्लीकेट जांच उत्तीर्ण, २४ नागरिकों द्वारा समर्थित।',
      step2Title: 'चरण २: एआई विश्लेषण एवं विश्वविद्यालय मिलान',
      step2Date: '१३ सितम्बर २०२६ को पूर्ण',
      step2Desc: 'HEI_RESEARCH के रूप में वर्गीकृत। ५-अक्षीय एआई स्पाइडर चार्ट के माध्यम से बीआईटी मेसरा (सिविल एवं पर्यावरण इंजीनियरिंग) से ९४% मिलान।',
      step3Title: 'चरण ३: विश्वविद्यालय प्रस्ताव एवं प्रथम किस्त अनुदान',
      step3Date: '१४ सितम्बर २०२६ को पूर्ण',
      step3Desc: 'संकाय प्रमुख डॉ. आनंद वर्मा ने चुनौती स्वीकार की। विस्तृत डीपीआर स्वीकृत। राज्य सरकार द्वारा प्रथम किस्त ₹१,०५,००० (३०%) जारी।',
      step4Title: 'चरण ४: नवाचार, प्रयोगशाला प्रोटोटाइपिंग एवं क्षेत्रीय क्रियान्वयन',
      step4Badge: 'वर्तमान सक्रिय चरण',
      step5Title: 'चरण ५: ४५ दिवसीय स्थायित्व परीक्षण एवं नागरिक कोरम सत्यापन',
      step5Badge: 'लंबित',
      step5Desc: '४५ दिनों तक बिना बाहरी सहायता के संचालन परीक्षण, जिसके बाद एनईपी २०२० छात्र क्रेडिट हेतु ग्राम सभा कोरम वोटिंग होगी।',
      heiPartnerLabel: 'भागीदार विश्वविद्यालय:',
      leadPiLabel: 'संकाय प्रमुख:',
      grantAllocatedLabel: 'कुल स्वीकृत अनुदान:',
      disbursedLabel: 'प्रथम किस्त जारी:',
    },
    sat: {
      backBtn: '← Aatu Samasya Dashboard Te Ruwar',
      badgeStatus: 'CHALU BIRDAUSUL R&D SPRINT',
      title: 'Palamu Honot: Daq Re Fluoride ar Arsenic Samasya',
      stage4Status: 'Kaami chalu menah-a (Week 3 of 16)',
      liveTelemetry: 'Live Telemetry: Solar defluoridation unit benao purao ena. NABL lab bidaw chalu menah-a.',
      actionCardTitle: 'Noa project babat te kuli sanaye meya?',
      actionCardSub: 'Birdausul team songe galmarao me se technical report nel me.',
      samvaadBtn: '💬 Galmarao Research Thread Jhin Me',
      dprBtn: '📊 Technical DPR Report (PDF) Ñel Me',
      step1Title: 'Step 1: Aatu Hor Te Ol Ena',
      step1Date: '12 Sep 2026 Re Purao Ena',
      step1Desc: 'Media sari ena, PostGIS 500m check parom ena, 24 hor vote em keda.',
      step2Title: 'Step 2: AI Triage ar University Milaw',
      step2Date: '13 Sep 2026 Re Purao Ena',
      step2Desc: 'HEI_RESEARCH hisab te bachaona. BIT Mesra songete 94% fit milaw ena.',
      step3Title: 'Step 3: University Proposal ar Paisa Taka',
      step3Date: '14 Sep 2026 Re Purao Ena',
      step3Desc: 'Dr. Anand Verma DPR manjot ena. Sarkar Tranche 1 Taka: ₹1,05,000 (30%) aada ena.',
      step4Title: 'Step 4: Lab Prototyping ar Khet Kaami',
      step4Badge: 'CURRENT ACTIVE STAGE',
      step5Title: 'Step 5: 45-Maha Maturation ar Quorum Vote',
      step5Badge: 'Baki',
      step5Desc: '45-maha unassisted test tayom NEP 2020 credit laigi aatu quorum vote.',
      heiPartnerLabel: 'University:',
      leadPiLabel: 'Faculty Lead:',
      grantAllocatedLabel: 'Joto Paisa:',
      disbursedLabel: 'Pahil Kist:',
    },
  };

  const curr = tContent[language] || tContent.en;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* 1. Header Navigation & Ticket Status */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{curr.backBtn}</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-black bg-blue-100 text-blue-900 px-3 py-1 rounded-lg border border-blue-200">
                {displayTicket}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>{curr.badgeStatus}</span>
              </span>
            </div>
            <div className="text-xs text-slate-500 font-bold">
              {language === 'hi' ? 'स्थान: सतबरवा, पलामू ज़िला' : language === 'sat' ? 'Jaiga: Satbarwa, Palamu' : 'Location: Satbarwa, Palamu District'}
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {curr.title}
            </h1>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                {curr.heiPartnerLabel}
              </span>
              <span className="text-xs font-extrabold text-slate-800 block truncate">
                BIT Mesra
              </span>
              <span className="text-[10px] text-slate-500 block truncate">Civil & Env Eng.</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                {curr.leadPiLabel}
              </span>
              <span className="text-xs font-extrabold text-slate-800 block truncate">
                Dr. Anand Verma
              </span>
              <span className="text-[10px] text-slate-500 block">Faculty Investigator</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                {curr.grantAllocatedLabel}
              </span>
              <span className="text-xs font-black text-blue-900 block">
                ₹3,50,000
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">100% Escrow Secured</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                {curr.disbursedLabel}
              </span>
              <span className="text-xs font-black text-blue-900 block">
                ₹1,05,000 (30%)
              </span>
              <span className="text-[10px] text-slate-500 block">State Treasury Released</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Step-by-Step Progress Timeline Tracker */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>
              {language === 'hi'
                ? '५-चरणीय समाधान प्रगति समय-रेखा'
                : language === 'sat'
                ? '5-Dhap Samadhan Lahanti Okto'
                : '5-Stage Solution Progress Timeline'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'नागरिक शिकायत से लेकर विश्वविद्यालय प्रोटोटाइपिंग एवं क्षेत्र सत्यापन तक की आधिकारिक प्रगति'
              : 'Verifiable audit chain from grassroots submission to academic field deployment'}
          </p>
        </div>

        {/* Step Progression List */}
        <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {/* STEP 1: Completed */}
          <div className="relative group">
            <span className="absolute -left-[33px] sm:-left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white shadow-md ring-4 ring-white">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {curr.step1Title} ✅
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {curr.step1Date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {curr.step1Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  📸 {language === 'hi' ? 'फ़ोटो साक्ष्य सत्यापित' : 'Photo Evidence Geo-Tagged'}
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  🛰️ {language === 'hi' ? '५०० मी. रडार अद्वितीय' : 'PostGIS 500m Cluster Unique'}
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  👥 {language === 'hi' ? '२४ ग्राम वासियों का समर्थन' : '24 Citizen Upvotes'}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: Completed */}
          <div className="relative group">
            <span className="absolute -left-[33px] sm:-left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white shadow-md ring-4 ring-white">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {curr.step2Title} ✅
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {curr.step2Date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {curr.step2Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  🧠 {language === 'hi' ? 'वर्गीकरण: HEI_RESEARCH' : 'Category: HEI_RESEARCH'}
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  🎯 {language === 'hi' ? 'बीआईटी मेसरा मिलान: ९४%' : 'BIT Mesra Fit: 94%'}
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  🕸️ {language === 'hi' ? '५-अक्षीय XAI स्पाइडर चार्ट' : '5-Axis XAI Match Radar'}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3: Completed */}
          <div className="relative group">
            <span className="absolute -left-[33px] sm:-left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white shadow-md ring-4 ring-white">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {curr.step3Title} ✅
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {curr.step3Date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {curr.step3Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  👨‍🏫 PI: Dr. Anand Verma
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  📑 {language === 'hi' ? 'डीपीआर अनुमोदित' : 'Detailed Project Report (DPR) Passed'}
                </span>
                <span className="text-[11px] bg-white border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                  💰 {language === 'hi' ? 'किस्त १: ₹१,०५,००० जारी' : 'Tranche 1 Grant: ₹1,05,000 Released'}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 4: CURRENT ACTIVE STAGE */}
          <div className="relative group">
            <span className="absolute -left-[33px] sm:-left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="bg-blue-50/60 border-2 border-blue-500/80 rounded-xl p-5 sm:p-6 space-y-3.5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-black text-blue-950 flex items-center gap-1.5">
                  <span>{curr.step4Title} 🔄</span>
                </h3>
                <span className="text-[11px] font-black uppercase tracking-wider text-white bg-blue-600 px-3 py-1 rounded-full shadow-xs">
                  {curr.step4Badge}
                </span>
              </div>

              {/* Status highlight */}
              <div className="inline-flex items-center gap-2 bg-white border border-blue-200 px-3.5 py-1.5 rounded-lg text-xs font-bold text-blue-900 shadow-2xs">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{curr.stage4Status}</span>
              </div>

              {/* Live Telemetry Banner */}
              <div className="bg-white border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 shadow-inner">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{curr.liveTelemetry}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {language === 'hi' ? 'फ्लोराइड स्तर' : 'Fluoride Level'}
                    </span>
                    <span className="font-mono font-black text-slate-900 text-xs">
                      2.8 mg/L ➔ 0.65 mg/L
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {language === 'hi' ? 'सौर निर्वहन क्षमता' : 'Solar Flow Rate'}
                    </span>
                    <span className="font-mono font-black text-slate-900 text-xs">
                      120 L/hr continuous
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {language === 'hi' ? 'परीक्षण स्थल' : 'Field Pilot Site'}
                    </span>
                    <span className="font-bold text-slate-900 text-xs truncate block">
                      Satbarwa Govt School
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5: Pending */}
          <div className="relative group">
            <span className="absolute -left-[33px] sm:-left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-500 shadow-sm ring-4 ring-white">
              <Clock className="w-4 h-4" />
            </span>
            <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-2 opacity-85">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-700">
                  {curr.step5Title} ⏳
                </h3>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-200/70 px-2.5 py-0.5 rounded-full">
                  {curr.step5Badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {curr.step5Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500 font-semibold">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  ⏳ {language === 'hi' ? '४५ दिवसीय अनअसिस्टेड रन' : '45-Day Unassisted Run'}
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  🗳️ {language === 'hi' ? 'ग्राम सभा कोरम वोट' : 'Gram Sabha Quorum Voting'}
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  🎓 {language === 'hi' ? '४ एनईपी अकादमिक क्रेडिट' : '4 NEP 2020 Academic Credits'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Action Card */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              {curr.actionCardTitle}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 font-medium mt-0.5">
              {curr.actionCardSub}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Button 1: Open Samvaad Thread */}
          <Link
            href="/samvaad"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{curr.samvaadBtn}</span>
          </Link>

          {/* Button 2: View Technical DPR Report */}
          <button
            type="button"
            onClick={() => setShowDprModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold backdrop-blur-xs transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>{curr.dprBtn}</span>
          </button>
        </div>
      </div>

      {/* Interactive DPR Report Modal */}
      {showDprModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  DPR-JAG-4102-BIT-2026.pdf
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowDprModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 max-h-[60vh] overflow-y-auto pr-1">
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-2">
                <span className="font-black text-blue-950 uppercase tracking-wider text-[11px] block">
                  Executive DPR Summary
                </span>
                <p className="leading-relaxed">
                  Project: <strong>Solar Adsorption Column for Fluoride and Arsenic Mitigation</strong> in Satbarwa Block, Palamu District.
                </p>
                <p className="leading-relaxed">
                  Principal Investigator: <strong>Dr. Anand Verma</strong>, Dept. of Civil and Environmental Engineering, BIT Mesra.
                </p>
                <p className="leading-relaxed">
                  State Grant Pool: <strong>₹3,50,000</strong> (Tranche 1: ₹1,05,000 disbursed; Tranche 2: ₹1,40,000 on prototype test; Tranche 3: ₹1,05,000 on 45-day quorum pass).
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-slate-900 text-xs block">Technical Architecture</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Locally activated alumina + nano-zirconia composite adsorbent matrix.</li>
                  <li>Zero-electricity continuous gravity siphon with solar-powered backwash flush.</li>
                  <li>Target capacity: 1,500 litres/day clean water for Anganwadi & primary school hamlet.</li>
                  <li>Post-filtration fluoride index: &lt; 0.8 mg/L (well within BIS 10500 standard).</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowDprModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('DPR Document downloaded for ticket #JAG-4102');
                  setShowDprModal(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official DPR PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

