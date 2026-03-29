'use client';

import { createContext, useContext } from 'react';
import { PersonaType, UserProfile } from '@/lib/types/user';

export interface PersonaContextType {
  persona: PersonaType;
  setPersona: (persona: PersonaType) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isOnboarded: boolean;
  setOnboarded: (val: boolean) => void;
}

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function usePersona(): PersonaContextType {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
