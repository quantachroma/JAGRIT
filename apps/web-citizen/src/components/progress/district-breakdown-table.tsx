'use client';

import React, { useState } from 'react';
import { StatewideLanguage, DistrictResolutionItem } from './statewide-types';
import { DISTRICT_RESOLUTION_DATA } from './statewide-data';
import { MapPin, CheckCircle2, Clock, Building2, TrendingUp, Sparkles } from 'lucide-react';

interface DistrictBreakdownTableProps {
  language: StatewideLanguage;
}

export default function DistrictBreakdownTable({ language }: DistrictBreakdownTableProps) {
  const [sortField, setSortField] = useState<'solved' | 'rate' | 'received'>('solved');

  const getSectionTitle = () => {
    if (language === 'hi') return 'ज़िलावार समाधान विश्लेषण — झारखण्ड भौगोलिक विस्तार';
    if (language === 'sat') return 'ᱡᱤᱞᱟᱹ ᱞᱮᱠᱟᱛᱮ ᱥᱚᱞᱦᱮ ᱦᱟᱹᱴᱤᱧ — ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱴᱚᱴᱷᱟ';
    return 'District Resolution Breakdown (Jharkhand Geographic Spread)';
  };

  const getSectionSubtitle = () => {
    if (language === 'hi')
      return 'झारखंड के प्रमुख ज़िलों में प्राप्त समस्याएं, समाधान अनुपात, संबद्ध विश्वविद्यालय, औसत निवारण अवधि एवं नागरिक संतुष्टि कोरम स्कोर।';
    if (language === 'sat')
      return 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱡᱤᱞᱟᱹ ᱠᱚᱨᱮ ᱧᱟᱢ ᱟᱠᱟᱱ ᱮᱴᱠᱮᱴᱚᱬᱮ, ᱥᱚᱞᱦᱮ ᱦᱟᱹᱴᱤᱧ, ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱟᱨ ᱦᱚᱲ ᱨᱮᱵᱮᱱ ᱠᱳᱨᱟᱢ ᱥᱠᱳᱨ᱾';
    return 'Comprehensive district-by-district performance displaying problems received, resolved counts, active university engineering labs, turnaround times, and Gram Sabha satisfaction ratings.';
  };

  const sortedData = [...DISTRICT_RESOLUTION_DATA].sort((a, b) => {
    if (sortField === 'received') return b.problemsReceived - a.problemsReceived;
    if (sortField === 'rate') {
      const rateA = (a.problemsSolved / a.problemsReceived) * 100;
      const rateB = (b.problemsSolved / b.problemsReceived) * 100;
      return rateB - rateA;
    }
    return b.problemsSolved - a.problemsSolved;
  });

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {language === 'hi'
                ? '२४ ज़िले समावेशी कवरेज'
                : language === 'sat'
                ? '᱒᱔ ᱡᱤᱞᱟᱹ ᱯᱟᱥᱱᱟᱣ'
                : '24 Districts Inclusive Reach'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {getSectionTitle()}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {getSectionSubtitle()}
          </p>
        </div>

        {/* Quick Sorting Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setSortField('solved')}
            className={`px-3 py-1.5 min-h-[40px] rounded-lg text-xs font-bold transition-all ${
              sortField === 'solved'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'सर्वाधिक समाधान' : language === 'sat' ? 'ᱡᱟᱹᱥᱛᱤ ᱥᱚᱞᱦᱮ' : 'Most Solved'}
          </button>
          <button
            type="button"
            onClick={() => setSortField('rate')}
            className={`px-3 py-1.5 min-h-[40px] rounded-lg text-xs font-bold transition-all ${
              sortField === 'rate'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'समाधान दर (%)' : language === 'sat' ? 'ᱥᱚᱞᱦᱮ ᱫᱚᱨ (%)' : 'Success Rate (%)'}
          </button>
        </div>
      </div>

      {/* Accessible Responsive Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                <th scope="col" className="py-4 px-4 sm:px-6">
                  {language === 'hi' ? 'ज़िला' : language === 'sat' ? 'ᱡᱤᱞᱟᱹ' : 'District'}
                </th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                  {language === 'hi' ? 'प्राप्त समस्याएं' : language === 'sat' ? 'ᱧᱟᱢ ᱮᱴᱠᱮᱴᱚᱬᱮ' : 'Problems Received'}
                </th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                  {language === 'hi' ? 'समाधानित' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Problems Solved'}
                </th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                  {language === 'hi' ? 'सक्रिय विश्वविद्यालय' : language === 'sat' ? 'ᱪᱟᱹᱞᱩ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ' : 'Active Universities'}
                </th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                  {language === 'hi' ? 'औसत समाधान अवधि' : language === 'sat' ? 'ᱦᱟᱨᱟᱦᱟᱹᱨᱤ ᱚᱠᱛᱚ' : 'Avg Resolution Time'}
                </th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-right">
                  {language === 'hi' ? 'नागरिक कोरम संतुष्टि' : language === 'sat' ? 'ᱦᱚᱲ ᱠᱳᱨᱟᱢ ᱨᱮᱵᱮᱱ' : 'Citizen Satisfaction Score'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedData.map((item, index) => {
                const resolutionRate = Math.round((item.problemsSolved / item.problemsReceived) * 100);
                return (
                  <tr
                    key={item.districtName.en}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    {/* District Name */}
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-blue-100 text-slate-700 group-hover:text-blue-700 text-xs font-black flex items-center justify-center font-mono">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-sm font-black text-slate-900 block">
                          {item.districtName[language]}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {item.statusTag[language]}
                        </span>
                      </div>
                    </td>

                    {/* Received */}
                    <td className="py-4 px-4 sm:px-6 text-center font-mono font-bold text-slate-700">
                      {item.problemsReceived}
                    </td>

                    {/* Solved */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-mono font-black text-emerald-700 text-sm">
                          {item.problemsSolved}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600">
                          {resolutionRate}% {language === 'hi' ? 'पूर्ण' : language === 'sat' ? 'ᱥᱟᱹᱛ' : 'Cleared'}
                        </span>
                      </div>
                    </td>

                    {/* Active Universities */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold text-xs border border-indigo-200">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{item.activeUniversities}</span>
                      </span>
                    </td>

                    {/* Avg Resolution Time */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.avgResolutionWeeks[language]}</span>
                      </span>
                    </td>

                    {/* Citizen Satisfaction Score */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 font-black px-3 py-1 rounded-xl text-xs sm:text-sm font-mono shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.satisfactionQuorumScore}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              {language === 'hi'
                ? 'सभी परिणाम पेसा ग्राम सभा एवं त्रि-स्तरीय तकनीकी जांच समिति द्वारा अंकेक्षित हैं।'
                : language === 'sat'
                ? 'ᱡᱚᱛᱚ ᱠᱟᱹᱢᱤ ᱯᱮᱥᱟ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱠᱩᱢᱩᱴ ᱦᱚᱛᱮᱛᱮ ᱧᱮᱞ ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱᱟ᱾'
                : 'All resolution metrics audited by PESA Gram Sabhas and Tier-3 Technical Validation Committees.'}
            </span>
          </div>

          <div className="font-semibold text-slate-600">
            {language === 'hi' ? 'अंतिम समन्वय: आज' : language === 'sat' ? 'ᱢᱩᱪᱟᱹᱫ ᱧᱮᱞ: ᱛᱮᱦᱮᱧ' : 'Last Synced: Live'}
          </div>
        </div>
      </div>
    </section>
  );
}

