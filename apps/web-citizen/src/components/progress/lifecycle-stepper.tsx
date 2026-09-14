'use client';

import React, { useState } from 'react';
import { ProgressStage } from './types';
import { CheckCircle2, Clock, Lock, Sparkles, ChevronRight, ShieldCheck, FileText, Check } from 'lucide-react';

interface LifecycleStepperProps {
  stages: ProgressStage[];
  currentDay: number;
  totalDays: number;
  language: 'en' | 'hi' | 'sat';
}

export default function LifecycleStepper({ stages, currentDay, totalDays, language }: LifecycleStepperProps) {
  // Default to Stage 4 (the active in-progress stage)
  const [selectedStageId, setSelectedStageId] = useState<number>(4);

  const selectedStage = stages.find((s) => s.id === selectedStageId) || stages[3];

  const getStageTitle = (stage: ProgressStage) => {
    if (language === 'hi') return stage.titleHi;
    if (language === 'sat') return stage.titleSat;
    return stage.titleEn;
  };

  const getStageSubtitle = (stage: ProgressStage) => {
    if (language === 'hi') return stage.subtitleHi;
    if (language === 'sat') return stage.subtitleSat;
    return stage.subtitleEn;
  };

  const getDeliverables = (stage: ProgressStage) => {
    if (language === 'hi') return stage.deliverablesHi;
    if (language === 'sat') return stage.deliverablesSat;
    return stage.deliverablesEn;
  };

  const getSignOff = (stage: ProgressStage) => {
    if (language === 'hi') return stage.signOffAuthorityHi;
    if (language === 'sat') return stage.signOffAuthoritySat;
    return stage.signOffAuthorityEn;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Stepper Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? '५-चरणीय पूर्ण जीवनचक्र प्रगति'
                : language === 'sat'
                ? '᱕-ᱦᱟᱹᱴᱤᱧ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱞᱟᱦᱟᱱᱛᱤ'
                : '5-Stage Full Lifecycle Stepper'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {language === 'hi'
              ? 'विश्वविद्यालयी समाधान जीवनचक्र एवं अनुमोदन ट्रैकर'
              : language === 'sat'
              ? 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱚᱞᱦᱮ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱧᱮᱞ'
              : 'End-to-End Implementation Progress Tracker'}
          </h2>
        </div>

        {/* Dynamic Day Counter */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2 flex items-center space-x-2.5 self-start sm:self-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          <div>
            <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
              {language === 'hi' ? 'स्थिरीकरण ट्रैकर' : language === 'sat' ? 'ᱫᱤᱱᱟᱹᱢ ᱦᱤᱞᱳᱜ ᱦᱟᱞᱚᱛ' : 'Maturation Buffer'}
            </span>
            <span className="text-xs sm:text-sm font-black text-blue-950">
              {language === 'hi'
                ? `दिन ${currentDay} / ${totalDays} दिन पूर्ण`
                : language === 'sat'
                ? `${totalDays} ᱢᱟᱦᱟᱸ ᱠᱷᱚᱱ ${currentDay} ᱢᱟᱦᱟᱸ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ`
                : `Day ${currentDay} of ${totalDays} Days Completed`}
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Horizontal Stepper Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {stages.map((stage, idx) => {
          const isSelected = stage.id === selectedStageId;
          const isCompleted = stage.status === 'COMPLETED';
          const isInProgress = stage.status === 'IN_PROGRESS';
          const isScheduled = stage.status === 'SCHEDULED';

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedStageId(stage.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-2.5 active:scale-[0.98] ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              {/* Stage Top Status Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {language === 'hi' ? `चरण ${stage.id}` : language === 'sat' ? `ᱦᱟᱹᱴᱤᱧ ${stage.id}` : `Stage 0${stage.id}`}
                </span>

                {isCompleted && (
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                {isInProgress && (
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
                    <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                      {currentDay}
                    </span>
                  </span>
                )}

                {isScheduled && (
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Stage Title */}
              <div>
                <h3 className={`text-xs font-black leading-snug line-clamp-2 ${
                  isSelected ? 'text-blue-950' : 'text-slate-800'
                }`}>
                  {getStageTitle(stage)}
                </h3>
                <span className={`text-[11px] font-bold block mt-1 ${
                  isCompleted
                    ? 'text-emerald-700'
                    : isInProgress
                    ? 'text-blue-700'
                    : 'text-slate-400'
                }`}>
                  {getStageSubtitle(stage)}
                </span>
              </div>

              {/* Stage Pill Tag */}
              <div className="pt-1">
                {isCompleted && (
                  <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {language === 'hi' ? 'पूर्ण' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Completed'}
                  </span>
                )}
                {isInProgress && (
                  <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white shadow-2xs">
                    {language === 'hi' ? 'प्रगति पर' : language === 'sat' ? 'ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ' : 'In Progress'}
                  </span>
                )}
                {isScheduled && (
                  <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                    {language === 'hi' ? 'अनुसूचित' : language === 'sat' ? 'ᱛᱟᱺᱜᱤ ᱨᱮ' : 'Scheduled'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Inspector Card */}
      <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
              selectedStage.status === 'COMPLETED'
                ? 'bg-emerald-600 text-white'
                : selectedStage.status === 'IN_PROGRESS'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {selectedStage.id}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'hi' ? `चरण विवरण • चरण ${selectedStage.id}` : language === 'sat' ? `ᱦᱟᱹᱴᱤᱧ ᱵᱤᱵᱚᱨᱚᱬ • ${selectedStage.id}` : `Stage Deliverables & Verification • Stage 0${selectedStage.id}`}
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                {getStageTitle(selectedStage)}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              Audit Ref: {selectedStage.auditRef}
            </span>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
            {language === 'hi' ? 'सत्यापित कार्य एवं परिणाम (डिलिवरेबल्स):' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ ᱠᱟᱹᱢᱤ ᱠᱚ:' : 'Key Verified Milestones & Deliverables:'}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {getDeliverables(selectedStage).map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/90 flex items-start space-x-2 text-xs text-slate-800">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  selectedStage.status === 'COMPLETED'
                    ? 'text-emerald-600'
                    : selectedStage.status === 'IN_PROGRESS'
                    ? 'text-blue-600'
                    : 'text-slate-300'
                }`} />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off Authority Footer */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>{language === 'hi' ? 'सत्यापन प्राधिकरण: ' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱚᱯᱷᱤᱥ: ' : 'Verification Authority: '}</strong>
              {getSignOff(selectedStage)}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {selectedStage.completedDate ? `Completed: ${selectedStage.completedDate}` : 'Real-time telemetry active'}
          </span>
        </div>
      </div>
    </div>
  );
}

