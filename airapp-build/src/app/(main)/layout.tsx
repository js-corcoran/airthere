'use client';

import { ReactNode } from 'react';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { ContextualHeader } from '@/components/navigation/ContextualHeader';
import { AICopilotProvider } from '@/components/ai/AICopilotProvider';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AICopilotProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <ContextualHeader />
        <main className="flex-1 overflow-y-auto pb-24 pb-[calc(6rem+env(safe-area-inset-bottom))]">
          {children}
        </main>
        <BottomTabBar />
      </div>
    </AICopilotProvider>
  );
}
