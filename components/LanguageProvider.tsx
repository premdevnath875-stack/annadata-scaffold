'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, LanguageCode } from '@/lib/translations/dictionaries';
import { LANGUAGES } from '@/lib/constants';

type TranslationContextType = {
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isMounted: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const savedLang = localStorage.getItem('annadata_lang') as LanguageCode;
    if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
      setCurrentLang(savedLang);
    }
    setIsMounted(true);
  }, []);

  const handleSetLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('annadata_lang', lang);
  };

  const t = (key: string): string => {
    let langToUse = isMounted ? currentLang : 'en'; // Default to English during SSR
    
    const keys = key.split('.');
    let value: any = dictionaries[langToUse] || dictionaries['en'];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined || typeof value !== 'string') {
      // Fallback to English
      let fallbackValue: any = dictionaries['en'];
      for (const k of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
          fallbackValue = fallbackValue[k];
        } else {
          fallbackValue = undefined;
          break;
        }
      }
      return typeof fallbackValue === 'string' ? fallbackValue : key;
    }

    return value;
  };

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang: handleSetLang, t, isMounted }}>
      <div dir={currentLang === 'ur' || currentLang === 'ks' || currentLang === 'sd' ? 'rtl' : 'ltr'} className={`lang-${currentLang}`}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
