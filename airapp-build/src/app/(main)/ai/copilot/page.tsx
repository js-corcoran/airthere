'use client';

import { AICopilotSheet } from '@/components/ai/AICopilotSheet';

export default function AICopilotPage() {
  return (
    <main
      role="main"
      aria-label="AI Copilot"
      className="h-[calc(100vh-8rem)] bg-background dark:bg-background"
    >
      <AICopilotSheet isOpen={true} onClose={() => {}} embedded />
    </main>
  );
}
