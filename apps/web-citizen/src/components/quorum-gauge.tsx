'use client';

import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

interface QuorumGaugeProps {
  currentPercentage: number;
  requiredPercentage?: number;
  totalVoters?: number;
}

export default function QuorumGauge({
  currentPercentage = 68,
  requiredPercentage = 60,
  totalVoters = 142,
}: QuorumGaugeProps) {
  const isPassing = currentPercentage >= requiredPercentage;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-[#044728]" />
          <span className="text-xs font-bold text-slate-800">Gram Sabha Quorum Status</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isPassing ? 'bg-emerald-100 text-[#044728]' : 'bg-amber-100 text-amber-900'
          }`}
        >
          {isPassing ? 'Quorum Reached' : 'Quorum Pending'}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Votes Cast: {totalVoters}</span>
          <span className="font-bold text-slate-800">
            {currentPercentage}% / {requiredPercentage}%
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isPassing ? 'bg-[#044728]' : 'bg-[#D97706]'
            }`}
            style={{ width: `${Math.min(currentPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

