import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { driverDict, DriverLanguage } from '../services/i18n';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => Promise<void>;
  t: Record<string, string>;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: driverDict.en,
  languages: SUPPORTED_LANGUAGES,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem('driverAppLanguage');
      if (saved && (SUPPORTED_LANGUAGES.some(l => l.code === saved))) {
        setLanguageState(saved as LanguageCode);
      }
    } catch (e) {
      console.warn('Failed to load saved language:', e);
    }
  };

  const setLanguage = async (code: LanguageCode) => {
    setLanguageState(code);
    try {
      await AsyncStorage.setItem('driverAppLanguage', code);
    } catch (e) {
      console.warn('Failed to save language:', e);
    }
  };

  // Get dictionary; fallback to Hindi or English if specific regional language dict not fully populated
  const dict = (driverDict as any)[language] || driverDict.en;
  // Fallback to English for any missing keys
  const t = new Proxy(dict, {
    get: (target, prop: string) => {
      return target[prop] || (driverDict.en as any)[prop] || prop;
    }
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
