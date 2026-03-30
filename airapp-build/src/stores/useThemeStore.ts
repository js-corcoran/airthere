'use client';

import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'airthere-theme';

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'system';
}

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode: ThemeMode) {
  const isDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark());
  document.documentElement.classList.toggle('dark', isDark);
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = getStoredTheme();
    setModeState(stored);
    applyTheme(stored);
  }, []);

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
    applyTheme(newMode);
  }, []);

  const isDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark());

  return { mode, setMode, isDark };
}
