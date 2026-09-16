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
    if (typeof window === 'undefined') return;

    const syncLanguage = () => {
      // 1. Prioritize explicit URL param (?lang= or ?language=)
      const params = new URLSearchParams(window.location.search);
      const urlLang = (params.get('lang') || params.get('language')) as AppLanguage | null;
      if (urlLang && urlLang in TRANSLATIONS) {
        setLanguageState(urlLang);
        window.localStorage.setItem('jagrit_language', urlLang);
        document.documentElement.lang = urlLang;
        return;
      }

      // 2. Fall back to localStorage
      const stored = window.localStorage.getItem('jagrit_language') as AppLanguage | null;
      if (stored && stored in TRANSLATIONS) {
        setLanguageState(stored);
        document.documentElement.lang = stored;
      }
    };

    syncLanguage();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'jagrit_language' && e.newValue && e.newValue in TRANSLATIONS) {
        setLanguageState(e.newValue as AppLanguage);
        document.documentElement.lang = e.newValue;
      }
    };

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent<AppLanguage>).detail;
      if (detail && detail in TRANSLATIONS) {
        setLanguageState(detail);
        document.documentElement.lang = detail;
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('jagrit:language-change', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('jagrit:language-change', handleCustomChange);
    };
  }, []);

  const setLanguage = (next: AppLanguage) => {
    setLanguageState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jagrit_language', next);
      document.documentElement.lang = next;

      // Update URL param dynamically without reloading
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', next);
        window.history.replaceState({}, '', url.toString());
      } catch {
        // ignore if in unsupported environment
      }

      // Broadcast event
      window.dispatchEvent(new CustomEvent('jagrit:language-change', { detail: next }));
    }
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
