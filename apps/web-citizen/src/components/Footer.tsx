'use client';

import React from 'react';
import { useCitizen } from '@/context/CitizenContext';

export default function Footer() {
  const { t } = useCitizen();

  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <p className="font-semibold text-slate-900">
          {t('common', 'footerText', 'JAGRIT — Jharkhand Societal Innovation Collaboration Portal')}
        </p>
        <p className="text-xs text-slate-500">
          {t(
            'common',
            'footerSubtext',
            'Department of Higher and Technical Education, Government of Jharkhand | NEP 2020 & PESA 1996 Aligned'
          )}
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 pt-2">
          <span>
            {t(
              'common',
              'footerDistricts',
              'Ranchi • Dhanbad • Jamshedpur • Dumka • Hazaribagh • Palamu • Khunti • Chaibasa'
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}

