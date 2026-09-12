'use client';

import React, { useState } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  ShieldCheck,
  FileCheck,
  Vote,
  Sparkles,
} from 'lucide-react';

export default function TimeMachinePage() {
  const { t, language, currentLocation } = useCitizen();
  const [dayOffset, setDayOffset] = useState(15);
  const [hasVoted, setHasVoted] = useState(false);
  const [isFunctionalPass, setIsFunctionalPass] = useState<boolean | null>(true);
  const [defectType, setDefectType] = useState('NONE');

  const totalDays = 45;
  const daysRemaining = Math.max(0, totalDays - dayOffset);
  const quorumCurrent = 68;
  const quorumRequired = 60; // 60% population quorum requirement from PRD

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();
    setHasVoted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#044728] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? '45-दिवसीय परिपक्वता बफ़र' : language === 'sat' ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱵᱤᱰᱟᱹᱣ' : '45-Day Maturation Buffer'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          {t('feedback', 'title', 'Citizen Quorum & Satyapan (Verification)')}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t('feedback', 'subtitle', 'Gram Sabha & Citizen-driven validation under the 45-day maturation buffer.')}
        </p>
      </div>

      {/* Time Machine Slider */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>Time-Machine Simulation Controller</span>
          </span>
          <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded font-bold text-[#044728]">
            Day {dayOffset} of {totalDays} ({daysRemaining} days left)
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="45"
          value={dayOffset}
          onChange={(e) => setDayOffset(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#044728]"
        />

        {/* Quorum Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Gram Sabha Population Quorum:</span>
            <span className="font-bold text-[#044728]">
              {quorumCurrent}% / {quorumRequired}% required
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-[#044728] rounded-full transition-all duration-300"
              style={{ width: `${quorumCurrent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verification / Satyapan Voting Box */}
      {hasVoted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#044728] mx-auto" />
          <h3 className="font-bold text-base text-[#044728]">
            {language === 'hi' ? 'सत्यापन वोट सफलतापूर्वक दर्ज हुआ!' : language === 'sat' ? 'ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱵᱷᱳᱴ ᱮᱢ ᱮᱱᱟ!' : 'Verification Recorded Successfully!'}
          </h3>
          <p className="text-xs text-slate-600">
            {language === 'hi'
              ? 'ग्राम सभा कोरम में आपका सत्यापन मत जोड़ दिया गया है।'
              : 'Your vote has been cryptographically recorded into the Gram Sabha PESA Act ledger.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleVote} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Vote className="w-5 h-5 text-[#044728]" />
            <h3 className="font-bold text-sm text-slate-900">
              {t('feedback', 'satyapan', 'Field Verification & Functional Audit')}
            </h3>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              {t('feedback', 'functionalPassQuestion', 'Is the installed solution functioning properly in your locality?')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsFunctionalPass(true)}
                className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  isFunctionalPass === true
                    ? 'border-[#044728] bg-emerald-50 text-[#044728]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('feedback', 'passOption', 'Yes, Working Satisfactorily')}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFunctionalPass(false)}
                className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  isFunctionalPass === false
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{t('feedback', 'failOption', 'No, Malfunctioning')}</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t('feedback', 'defectType', 'Report Defect Category')}
            </label>
            <select
              value={defectType}
              onChange={(e) => setDefectType(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#044728]"
            >
              <option value="NONE">{t('feedback.defectTypes', 'NONE', 'No Defects - Optimal Operation')}</option>
              <option value="COSMETIC_GRIEVANCE">{t('feedback.defectTypes', 'COSMETIC_GRIEVANCE', 'Minor Cosmetic Grievance')}</option>
              <option value="CRITICAL_DEFECT">{t('feedback.defectTypes', 'CRITICAL_DEFECT', 'Critical Defect / Breakdown')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#044728] hover:bg-[#03361e] text-white font-bold py-2.5 rounded-lg text-xs shadow transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{t('feedback', 'submitFeedback', 'Submit Verification Vote')}</span>
          </button>
        </form>
      )}
    </div>
  );
}

