'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { TRANSLATIONS, type Language, type TranslationDictionary } from '@/lib/translations';

export type AppLanguage = Language;
export type LanguageDictionary = TranslationDictionary;

export interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: LanguageDictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('jagrit_language') as AppLanguage | null;
    if (stored && stored in TRANSLATIONS) {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLanguage = (next: AppLanguage) => {
    setLanguageState(next);
    window.localStorage.setItem('jagrit_language', next);
    document.documentElement.lang = next;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: TRANSLATIONS[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
