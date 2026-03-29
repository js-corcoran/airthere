'use client';

import { useState, createContext, useContext, type ReactNode } from 'react';
import { AICopilotSheet } from './AICopilotSheet';
import { FloatingActionButton } from './FloatingActionButton';

interface CopilotContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function useCopilot(): CopilotContextType {
  const ctx = useContext(CopilotContext);
  if (!ctx) throw new Error('useCopilot must be used within AICopilotProvider');
  return ctx;
}

export function AICopilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <CopilotContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      <FloatingActionButton onClick={open} isOpen={isOpen} />
      <AICopilotSheet isOpen={isOpen} onClose={close} />
    </CopilotContext.Provider>
  );
}
