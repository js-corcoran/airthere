'use client';

import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';
import { BoardingPhaseStep } from '../types';

interface BoardingPhaseIndicatorProps {
  phases: BoardingPhaseStep[];
  passengerGroup: string;
}

export function BoardingPhaseIndicator({ phases, passengerGroup }: BoardingPhaseIndicatorProps) {
  const currentPhase = phases.find((p) => p.status === 'in_progress');

  return (
    <section
      className="bg-surface dark:bg-[oklch(18%_0.003_50)]
                 rounded-lg border border-surface-300 dark:border-[oklch(32%_0.008_50)]
                 p-4"
      aria-labelledby="boarding-phase-heading"
    >
      <h3 id="boarding-phase-heading" className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-4">
        Boarding Progress
      </h3>

      <div className="space-y-0">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="flex items-start gap-3">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                  'transition-all duration-[--duration-short]',
                  phase.status === 'completed'
                    ? 'bg-success-500 dark:bg-[oklch(62%_0.165_142)] text-white'
                    : phase.status === 'in_progress'
                      ? 'bg-primary-500 dark:bg-[oklch(55%_0.194_262)] text-white animate-pulse'
                      : 'bg-surface-200 dark:bg-[oklch(32%_0.008_50)] text-primary-400 dark:text-[oklch(60%_0.005_50)]'
                )}
                aria-hidden="true"
              >
                {phase.status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              {/* Connector */}
              {idx < phases.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-6 my-0.5',
                    phase.status === 'completed'
                      ? 'bg-success-300 dark:bg-[oklch(40%_0.070_142)]'
                      : 'bg-surface-300 dark:bg-[oklch(32%_0.008_50)]'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Phase label */}
            <div className="flex-1 min-w-0 pb-3">
              <p
                className={cn(
                  'text-sm font-medium',
                  phase.status === 'completed'
                    ? 'text-success-700 dark:text-[oklch(65%_0.160_142)]'
                    : phase.status === 'in_progress'
                      ? 'text-primary-900 dark:text-[oklch(95%_0.002_50)]'
                      : 'text-primary-400 dark:text-[oklch(60%_0.005_50)]'
                )}
              >
                {phase.label}
              </p>
              {phase.time && (
                <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                  {phase.time}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Your group callout */}
      <div className="mt-3 pt-3 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)]">
        <p className="text-sm text-primary-700 dark:text-[oklch(80%_0.005_50)]">
          {currentPhase ? (
            <>
              Currently boarding: <span className="font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">{currentPhase.label}</span>
            </>
          ) : (
            'Boarding not yet started'
          )}
        </p>
        <p className="text-xs text-secondary-600 dark:text-[oklch(72%_0.158_50)] font-medium mt-1">
          Your group: {passengerGroup}
        </p>
      </div>
    </section>
  );
}
