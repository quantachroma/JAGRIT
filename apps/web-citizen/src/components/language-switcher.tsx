'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-sm"
      role="radiogroup"
      aria-label="Select language"
    >
      <button
        type="button"
        role="radio"
        aria-checked={language === 'en'}
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-blue-600'
        }`}
      >
        English
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={language === 'hi'}
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
          language === 'hi'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-blue-600'
        }`}
      >
        हिन्दी
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={language === 'sat'}
        onClick={() => setLanguage('sat')}
        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
          language === 'sat'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-blue-600'
        }`}
      >
        संथाली
      </button>
    </div>
  );
}
