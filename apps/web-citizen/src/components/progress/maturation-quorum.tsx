'use client';

import React from 'react';
import { QuorumData } from './types';
import { Vote, CheckCircle2, AlertTriangle, ShieldCheck, ThumbsUp, ThumbsDown, Sparkles, Activity } from 'lucide-react';

interface MaturationQuorumProps {
  currentDay: number;
  totalDays: number;
  maturationPct: number;
  quorum: QuorumData;
  language: 'en' | 'hi' | 'sat';
}

export default function MaturationQuorum({
  currentDay,
  totalDays,
  maturationPct,
  quorum,
  language
}: MaturationQuorumProps) {
  const getNlpStatus = () => {
    if (language === 'hi') return quorum.nlpFilterStatusHi;
    if (language === 'sat') return quorum.nlpFilterStatusSat;
    return quorum.nlpFilterStatusEn;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
            <Vote className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? '४५ दिवसीय स्थिरीकरण एवं वास्तविक समय नागरिक कोरम'
                : language === 'sat'
                ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱵᱤᱰᱟᱹᱣ ᱟᱨ ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱳᱨᱟᱢ ᱦᱟᱞᱚᱛ'
                : '45-Day Maturation Buffer & Real-Time Quorum Status'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {language === 'hi'
              ? 'स्वायत्त परिचालन मजबूती एवं ग्राम सभा सत्यापन प्रगति'
              : language === 'sat'
              ? 'ᱟᱡ ᱛᱮ ᱪᱟᱞᱟᱣ ᱫᱟᱲᱮ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ'
              : 'Unassisted Durability & Verified Grassroots Quorum'}
          </h2>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'hi'
              ? 'कोरम न्यूनतम सीमा पूर्ण (१०७%)'
              : language === 'sat'
              ? 'ᱠᱳᱨᱟᱢ ᱥᱤᱢᱟᱹ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ (᱑᱐᱗%)'
              : 'Quorum Threshold Met (107%)'}
          </span>
        </span>
      </div>

      {/* Part 1: Visual 45-Day Maturation Progress Bar */}
      <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>
              {language === 'hi'
                ? '४५ दिवसीय स्वायत्त स्थिरीकरण प्रगति:'
                : language === 'sat'
                ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱟᱡ ᱛᱮ ᱪᱟᱞᱟᱣ ᱞᱟᱦᱟᱱᱛᱤ:'
                : '45-Day Unassisted Field Durability Progress:'}
            </span>
          </span>
          <span className="font-mono font-black text-blue-800 text-xs sm:text-sm">
            {language === 'hi'
              ? `दिन ${currentDay} / ${totalDays} (${maturationPct}% पूर्ण - १३ दिन शेष)`
              : language === 'sat'
              ? `${totalDays} ᱢᱟᱦᱟᱸ ᱠᱷᱚᱱ ${currentDay} (${maturationPct}% - ᱑᱓ ᱢᱟᱦᱟᱸ ᱵᱟᱹᱠᱤ)`
              : `Day ${currentDay} of ${totalDays} Completed (${maturationPct}% • 13 Days Remaining)`}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full transition-all duration-500 shadow-inner"
            style={{ width: `${maturationPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>
            {language === 'hi' ? 'दिन १: स्थापना एवं कमीशनिंग' : language === 'sat' ? '᱑ ᱢᱟᱦᱟᱸ: ᱵᱮᱥᱟᱣ ᱮᱦᱚᱵ' : 'Day 01: Commissioning'}
          </span>
          <span className="font-bold text-blue-700">
            {language === 'hi' ? 'दिन ३२: आज की स्थिति' : language === 'sat' ? '᱓᱒ ᱢᱟᱦᱟᱸ: ᱛᱮᱦᱮᱧᱟᱜ ᱦᱟᱞᱚᱛ' : 'Day 32: Current Telemetry'}
          </span>
          <span>
            {language === 'hi' ? 'दिन ४६: औपचारिक सत्यापन' : language === 'sat' ? '᱔᱖ ᱢᱟᱦᱟᱸ: ᱢᱩᱪᱟᱹᱫ ᱢᱟᱹᱱ' : 'Day 46: Final Sign-off'}
          </span>
        </div>
      </div>

      {/* Part 2: Population-Weighted Quorum Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Card: Mathematical Quorum Formula & Population Weight */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            {language === 'hi' ? 'जनसंख्या-भारित कोरम सूत्र (झारखंड नवाचार प्रारूप)' : language === 'sat' ? 'ᱦᱚᱲ ᱞᱮᱠᱷᱟ ᱞᱮᱠᱟᱛᱮ ᱠᱳᱨᱟᱢ ᱱᱤᱭᱟᱹᱢ' : 'Population-Weighted Mathematical Quorum Formula'}
          </span>

          {/* Formula Display Box */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-center">
            <span className="font-mono text-xs sm:text-sm font-black text-blue-950 block">
              {quorum.formulaString}
            </span>
            <span className="text-[11px] text-slate-600 block mt-1">
              {language === 'hi'
                ? 'लेसलीगंज वार्ड ४ जनसंख्या: ~८५० निवासी • न्यूनतम आवश्यक कोरम: ४३ वोट'
                : language === 'sat'
                ? 'ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱔ ᱟᱱᱟᱜ ᱣᱟᱨᱰ ᱨᱮ ᱘᱕᱐ ᱦᱚᱲ • ᱠᱚᱢ ᱠᱷᱚᱱ ᱠᱚᱢ ᱔᱓ ᱵᱷᱳᱴ ᱞᱟᱹᱠᱛᱤ'
                : 'Lesliganj Settlement Population: ~850 Residents • Quorum Floor: 43 Votes'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'hi' ? 'न्यूनतम कोरम' : language === 'sat' ? 'ᱞᱟᱹᱠᱛᱤ ᱠᱳᱨᱟᱢ' : 'Quorum Target'}
              </span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {quorum.quorumNeeded}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {language === 'hi' ? 'सत्यापित स्थानीय नागरिक' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱟᱹᱛᱩ ᱦᱚᱲ' : 'Verified Residents'}
              </span>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                {language === 'hi' ? 'दर्ज वोट' : language === 'sat' ? 'ᱮᱢ ᱟᱠᱟᱱ ᱵᱷᱳᱴ' : 'Votes Polled'}
              </span>
              <span className="text-xl font-black text-emerald-900 block mt-0.5">
                {quorum.quorumPolled} / {quorum.quorumNeeded}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 block">
                {quorum.percentMet}% {language === 'hi' ? 'सीमा पार' : language === 'sat' ? 'ᱯᱩᱨᱟᱹᱣ' : 'Threshold Met'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Sentiment Pass Rate & NLP Defect Classifier */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'hi' ? 'नागरिक संतुष्टि एवं भावना विश्लेषण' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱨᱟᱹᱥᱠᱟᱹ ᱟᱨ ᱵᱷᱳᱴ ᱦᱟᱹᱴᱤᱧ' : 'Citizen Sentiment & Pass Rate Breakdown'}
            </span>

            {/* Voting Visual Breakdown */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-emerald-950 block">
                    {quorum.passPercentage}% {language === 'hi' ? 'हाँ / संतुष्ट' : language === 'sat' ? 'ᱦᱮᱸ / ᱵᱮᱥ ᱜᱮᱭᱟ' : 'YES / Satisfied'}
                  </span>
                  <span className="text-[11px] text-emerald-800 font-bold block">
                    {quorum.passVotes} {language === 'hi' ? 'नागरिक वोट' : language === 'sat' ? 'ᱦᱚᱲ ᱵᱷᱳᱴ' : 'Verified Votes'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-400 text-white flex items-center justify-center flex-shrink-0">
                  <ThumbsDown className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-800 block">
                    {quorum.failPercentage}% {language === 'hi' ? 'नहीं / असंतोष' : language === 'sat' ? 'ᱵᱟᱝ / ᱵᱟᱹᱲᱤᱡ' : 'NO / Minor'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {quorum.failVotes} {language === 'hi' ? 'नागरिक वोट' : language === 'sat' ? 'ᱦᱚᱲ ᱵᱷᱳᱴ' : 'Cosmetic Votes'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NLP Defect Filter Badge */}
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {language === 'hi'
                  ? 'एआई भाषा मॉडल दोष वर्गीकरण:'
                  : language === 'sat'
                  ? 'AI ᱠᱷᱟᱹᱢᱤ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱦᱟᱞᱚᱛ:'
                  : 'AI NLP Defect Classifier:'}
              </span>
            </div>
            <p className="text-xs text-slate-800 font-extrabold leading-snug">
              {getNlpStatus()}
            </p>
            <span className="text-[10px] text-slate-500 block">
              {language === 'hi'
                ? 'नागरिकों द्वारा उल्लेखित केवल २ सुझाव शाम के समय नल दबाव से संबंधित हैं, मुख्य शोधन इकाई पूर्णतः कार्यरत है।'
                : language === 'sat'
                ? '᱒ ᱜᱚᱴᱟᱝ ᱠᱟᱹᱴᱤᱡ ᱠᱷᱟᱹᱢᱤ ᱫᱚ ᱱᱚᱞ ᱫᱟᱜ ᱡᱚᱨᱚ ᱵᱟᱵᱚᱛ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ, ᱢᱩᱬᱩᱛ ᱢᱮᱥᱤᱱ ᱴᱷᱤᱠ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ᱾'
                : 'Both cosmetic mentions pertain to evening tap flow; zero chemical or structural defects detected.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

