import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  card: string;
  cardElevated: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentLight: string;
  accentSoft: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  purple: string;
  purpleSoft: string;
  headerBg: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  inputBg: string;
  inputBorder: string;
  overlay: string;
  gradientStart: string;
  gradientEnd: string;
  statusBarStyle: 'light' | 'dark';
}

const darkColors: ThemeColors = {
  background: '#090d16',
  card: '#131b2e',
  cardElevated: '#1a2340',
  border: '#1e293b',
  text: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#38bdf8',
  accentLight: '#7dd3fc',
  accentSoft: 'rgba(56, 189, 248, 0.15)',
  success: '#34d399',
  successSoft: 'rgba(52, 211, 153, 0.15)',
  danger: '#ef4444',
  dangerSoft: 'rgba(239, 68, 68, 0.15)',
  warning: '#f59e0b',
  warningSoft: 'rgba(245, 158, 11, 0.15)',
  purple: '#a855f7',
  purpleSoft: 'rgba(168, 85, 247, 0.15)',
  headerBg: '#0f172a',
  tabBarBg: 'rgba(15, 23, 42, 0.92)',
  tabBarBorder: '#1e293b',
  tabBarActive: '#38bdf8',
  tabBarInactive: '#64748b',
  inputBg: '#0f172a',
  inputBorder: '#334155',
  overlay: 'rgba(0, 0, 0, 0.6)',
  gradientStart: '#0f172a',
  gradientEnd: '#020617',
  statusBarStyle: 'light',
};

const lightColors: ThemeColors = {
  background: '#f1f5f9',
  card: '#ffffff',
  cardElevated: '#f8fafc',
  border: '#e2e8f0',
  text: '#0f172a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  accent: '#0284c7',
  accentLight: '#38bdf8',
  accentSoft: 'rgba(2, 132, 199, 0.12)',
  success: '#059669',
  successSoft: 'rgba(5, 150, 105, 0.12)',
  danger: '#dc2626',
  dangerSoft: 'rgba(220, 38, 38, 0.12)',
  warning: '#d97706',
  warningSoft: 'rgba(217, 119, 6, 0.12)',
  purple: '#7c3aed',
  purpleSoft: 'rgba(124, 58, 237, 0.12)',
  headerBg: '#ffffff',
  tabBarBg: 'rgba(255, 255, 255, 0.95)',
  tabBarBorder: '#e2e8f0',
  tabBarActive: '#0284c7',
  tabBarInactive: '#94a3b8',
  inputBg: '#f8fafc',
  inputBorder: '#cbd5e1',
  overlay: 'rgba(0, 0, 0, 0.3)',
  gradientStart: '#ffffff',
  gradientEnd: '#f1f5f9',
  statusBarStyle: 'dark',
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: darkColors,
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: true,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('driverAppTheme');
      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved);
      }
    } catch (e) {
      // fallback to dark
    }
  };

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    try {
      await AsyncStorage.setItem('driverAppTheme', next);
    } catch (e) {}
  };

  const setTheme = async (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      await AsyncStorage.setItem('driverAppTheme', mode);
    } catch (e) {}
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
