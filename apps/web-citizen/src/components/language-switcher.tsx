'use client';

import { useLanguage, type AppLanguage } from '@/context/LanguageContext';

const options: Array<[AppLanguage, string]> = [
  ['en', 'English'],
  ['hi', 'हिन्दी'],
  ['sat', 'संथाली'],
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-1 rounded-xl border border-blue-100 bg-blue-50 p-1" role="radiogroup" aria-label="Language selector">
      {options.map(([code, label]) => (
        <button key={code} type="button" role="radio" aria-checked={language === code} onClick={() => setLanguage(code)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${language === code ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-white hover:text-blue-700'}`}>
          {label}
        </button>
      ))}
    </div>
  );
}
