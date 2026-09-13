'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { GeoLocation } from '@jagrit/contracts';
import enLocale from '../../public/locales/en.json';
import hiLocale from '../../public/locales/hi.json';
import satLocale from '../../public/locales/sat.json';

export type Language = 'hi' | 'sat' | 'en';

export interface CitizenUser {
  phone?: string;
  name?: string;
  isAuthenticated: boolean;
}

export const DEFAULT_RANCHI_LOCATION: GeoLocation = {
  lat: 23.3441,
  lon: 85.3096,
  district: 'Ranchi',
  block: 'Kanke',
  panchayat: 'Kanke Panchayat',
};

const dictionaries: Record<Language, any> = {
  hi: hiLocale,
  sat: satLocale,
  en: enLocale,
};

export interface CitizenContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: CitizenUser;
  setUser: React.Dispatch<React.SetStateAction<CitizenUser>>;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  currentLocation: GeoLocation;
  setCurrentLocation: (loc: GeoLocation) => void;
  detectLocation: () => Promise<void>;
  isDetectingLocation: boolean;
  t: (section: string, key?: string, fallback?: string) => string;
  dict: any;
}

const CitizenContext = createContext<CitizenContextType | undefined>(undefined);

export function CitizenProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hi');
  const [user, setUser] = useState<CitizenUser>({
    isAuthenticated: false,
  });
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(DEFAULT_RANCHI_LOCATION);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // Initialize stored preferences if present in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('jagrit_citizen_lang') as Language;
      if (storedLang && ['hi', 'sat', 'en'].includes(storedLang)) {
        setLanguageState(storedLang);
      }
      const storedUser = localStorage.getItem('jagrit_citizen_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore corrupted storage
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jagrit_citizen_lang', lang);
    }
  };

  const login = (phone: string, name?: string) => {
    const newUser: CitizenUser = {
      phone,
      name: name || 'Jharkhand Citizen',
      isAuthenticated: true,
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jagrit_citizen_user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    const emptyUser: CitizenUser = { isAuthenticated: false };
    setUser(emptyUser);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jagrit_citizen_user');
    }
  };

  const detectLocation = async (): Promise<void> => {
    setIsDetectingLocation(true);
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: Number(position.coords.latitude.toFixed(4)),
              lon: Number(position.coords.longitude.toFixed(4)),
              district: 'Ranchi', // fallback district identification
              block: 'Kanke',
              panchayat: 'GPS Verified Ward',
            });
            setIsDetectingLocation(false);
            resolve();
          },
          (error) => {
            console.warn('Geolocation failed or denied, using Ranchi default fallback:', error.message);
            setCurrentLocation(DEFAULT_RANCHI_LOCATION);
            setIsDetectingLocation(false);
            resolve();
          },
          { timeout: 8000, enableHighAccuracy: true }
        );
      } else {
        setCurrentLocation(DEFAULT_RANCHI_LOCATION);
        setIsDetectingLocation(false);
        resolve();
      }
    });
  };

  const t = (section: string, key?: string, fallback?: string): string => {
    try {
      const activeDict = dictionaries[language] || dictionaries.hi;
      
      // If called with a dotted path like t('home.heroTitle', 'fallback')
      if (key === undefined || (typeof key === 'string' && fallback === undefined && section.includes('.'))) {
        const path = section;
        const fb = key;
        const parts = path.split('.');
        let val: any = activeDict;
        for (const p of parts) {
          val = val?.[p];
          if (val === undefined) break;
        }
        if (val !== undefined && typeof val === 'string') return val;

        // Try English fallback
        let engVal: any = dictionaries.en;
        for (const p of parts) {
          engVal = engVal?.[p];
          if (engVal === undefined) break;
        }
        if (engVal !== undefined && typeof engVal === 'string') return engVal;

        // Try Hindi fallback
        let hiVal: any = dictionaries.hi;
        for (const p of parts) {
          hiVal = hiVal?.[p];
          if (hiVal === undefined) break;
        }
        if (hiVal !== undefined && typeof hiVal === 'string') return hiVal;

        return fb || path;
      }

      // If called with (section, key, fallback)
      if (section.includes('.')) {
        const parts = [...section.split('.'), key];
        let val: any = activeDict;
        for (const p of parts) {
          val = val?.[p];
          if (val === undefined) break;
        }
        if (val !== undefined && typeof val === 'string') return val;

        let engVal: any = dictionaries.en;
        for (const p of parts) {
          engVal = engVal?.[p];
          if (engVal === undefined) break;
        }
        if (engVal !== undefined && typeof engVal === 'string') return engVal;

        return fallback || `${section}.${key}`;
      }

      const sectionObj = activeDict?.[section];
      if (sectionObj && sectionObj[key] !== undefined) {
        return sectionObj[key];
      }
      const fallbackValue = dictionaries.en?.[section]?.[key] || dictionaries.hi?.[section]?.[key];
      return fallbackValue !== undefined ? fallbackValue : (fallback || `${section}.${key}`);
    } catch {
      return fallback || `${section}.${key || ''}`;
    }
  };

  return (
    <CitizenContext.Provider
      value={{
        language,
        setLanguage,
        user,
        setUser,
        login,
        logout,
        currentLocation,
        setCurrentLocation,
        detectLocation,
        isDetectingLocation,
        t,
        dict: dictionaries[language] || dictionaries.hi,
      }}
    >
      {children}
    </CitizenContext.Provider>
  );
}

export function useCitizen(): CitizenContextType {
  const context = useContext(CitizenContext);
  if (!context) {
    throw new Error('useCitizen must be used within a CitizenProvider');
  }
  return context;
}

