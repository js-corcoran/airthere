'use client';

import { Cloud, Wrench, Users, Radio, Shield, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Disruption } from '@/lib/types/disruption';

interface RootCauseExplanationProps {
  disruption: Disruption;
}

const CAUSE_CONFIG: Record<string, { icon: typeof Cloud; label: string }> = {
  weather: { icon: Cloud, label: 'Weather' },
  mechanical: { icon: Wrench, label: 'Mechanical' },
  crew: { icon: Users, label: 'Crew Scheduling' },
  air_traffic: { icon: Radio, label: 'Air Traffic Control' },
  security: { icon: Shield, label: 'Security' },
  oversold: { icon: Users, label: 'Oversold' },
  unknown: { icon: HelpCircle, label: 'Under Investigation' },
};

function formatTime(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function RootCauseExplanation({ disruption }: RootCauseExplanationProps) {
  const causeConfig = CAUSE_CONFIG[disruption.rootCause.type] ?? CAUSE_CONFIG.unknown;
  const Icon = causeConfig.icon;
  const resolutionTime = formatTime(disruption.rootCause.expectedResolution);

  return (
    <section aria-labelledby="root-cause-heading" className="space-y-3">
      <h3
        id="root-cause-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        What Happened
      </h3>
      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-muted">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary-600 dark:text-primary-300" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-200">
            {causeConfig.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-primary-800 dark:text-muted-foreground">
          {disruption.rootCause.description}
        </p>
        {resolutionTime && (
          <p className="text-sm mt-3 font-medium text-primary-600 dark:text-primary-300">
            Expected clarity by {resolutionTime}
          </p>
        )}
      </div>
    </section>
  );
}
