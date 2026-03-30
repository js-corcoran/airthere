'use client';

import { useState, useEffect, ReactNode } from 'react';
import { PersonaType, UserProfile } from '@/lib/types/user';
import { PersonaContext } from './usePersonaStore';

interface PersonaProviderProps {
  children: ReactNode;
}

export function PersonaProvider({ children }: PersonaProviderProps) {
  const [persona, setPersonaState] = useState<PersonaType>('premium');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOnboarded, setOnboarded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedPersona = localStorage.getItem('airthere-persona') as PersonaType | null;
    const savedOnboarded = localStorage.getItem('airthere-onboarded');
    const savedUser = localStorage.getItem('airthere-user');

    if (savedPersona) setPersonaState(savedPersona);
    if (savedOnboarded === 'true') setOnboarded(true);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // Ignore invalid JSON
      }
    }
  }, []);

  const setPersona = (p: PersonaType) => {
    setPersonaState(p);
    if (mounted) localStorage.setItem('airthere-persona', p);
  };

  const setOnboardedValue = (val: boolean) => {
    setOnboarded(val);
    if (mounted) localStorage.setItem('airthere-onboarded', String(val));
  };

  const setUserValue = (u: UserProfile | null) => {
    setUser(u);
    if (mounted) {
      if (u) localStorage.setItem('airthere-user', JSON.stringify(u));
      else localStorage.removeItem('airthere-user');
    }
  };

  return (
    <PersonaContext.Provider
      value={{
        persona,
        setPersona,
        user,
        setUser: setUserValue,
        isOnboarded,
        setOnboarded: setOnboardedValue,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}
