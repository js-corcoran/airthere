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
      className="bg-surface dark:bg-card
                 rounded-lg border border-surface-300 dark:border-muted
                 p-4"
      aria-labelledby="boarding-phase-heading"
    >
      <h3 id="boarding-phase-heading" className="text-base font-semibold text-primary-900 dark:text-foreground mb-4">
        Boarding Progress
      </h3>

      <div className="space-y-0">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="flex items-start gap-3 opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${idx * 60}ms` }}>
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                  'transition-all duration-[--duration-short]',
                  phase.status === 'completed'
                    ? 'bg-success-500 dark:bg-success-500 text-white'
                    : phase.status === 'in_progress'
                      ? 'bg-primary-500 dark:bg-primary-500 text-white animate-pulse'
                      : 'bg-surface-200 dark:bg-muted text-primary-600 dark:text-faint-foreground'
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
                      ? 'bg-success-300 dark:bg-success-800'
                      : 'bg-surface-300 dark:bg-muted'
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
                    ? 'text-success-700 dark:text-success-400'
                    : phase.status === 'in_progress'
                      ? 'text-primary-900 dark:text-foreground'
                      : 'text-primary-600 dark:text-faint-foreground'
                )}
              >
                {phase.label}
              </p>
              {phase.time && (
                <p className="text-xs text-primary-700 dark:text-caption-foreground">
                  {phase.time}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Your group callout */}
      <div className="mt-3 pt-3 border-t border-surface-300 dark:border-muted">
        <p className="text-sm text-primary-700 dark:text-soft-foreground">
          {currentPhase ? (
            <>
              Currently boarding: <span className="font-semibold text-primary-900 dark:text-foreground">{currentPhase.label}</span>
            </>
          ) : (
            'Boarding not yet started'
          )}
        </p>
        <p className="text-xs text-secondary-600 dark:text-secondary-400 font-medium mt-1">
          Your group: {passengerGroup}
        </p>
      </div>
    </section>
  );
}
