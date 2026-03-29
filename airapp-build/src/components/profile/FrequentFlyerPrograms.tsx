'use client';

import { useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { FrequentFlyerProgram } from '@/lib/types/profile';

interface FrequentFlyerProgramsProps {
  programs: FrequentFlyerProgram[];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function FrequentFlyerPrograms({ programs }: FrequentFlyerProgramsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? programs : programs.slice(0, 3);

  return (
    <section aria-labelledby="ffp-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          id="ffp-heading"
          className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
        >
          Frequent Flyer Programs
        </h3>
        <span className="text-xs text-primary-500 dark:text-primary-400">
          {programs.length} linked
        </span>
      </div>

      <div className="space-y-2">
        {visible.map((program) => (
          <button
            key={program.id}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-[var(--radius-lg)] text-left',
              'bg-surface dark:bg-[oklch(18%_0.003_50)]',
              'border border-surface-300 dark:border-[oklch(32%_0.008_50)]',
              'hover:shadow-sm transition-shadow duration-[--duration-micro]',
              'min-h-[var(--touch-preferred)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            )}
            aria-label={`${program.airline} ${program.programName}: ${program.balance.toLocaleString()} ${program.unit}`}
          >
            {/* Airline code badge */}
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-primary-100 dark:bg-primary-800 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                {program.airlineCode}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-primary-800 dark:text-[oklch(90%_0.002_50)] truncate">
                  {program.programName}
                </p>
                {program.eliteStatus && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 shrink-0">
                    {program.eliteStatus}
                  </span>
                )}
              </div>
              <p className="text-xs text-primary-500 dark:text-primary-400">
                {program.balance.toLocaleString()} {program.unit} &middot; Last activity {formatDate(program.lastActivity)}
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-primary-400 dark:text-primary-500 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {programs.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 px-4 py-2.5 rounded-[var(--radius-md)]',
              'text-xs font-medium text-primary-600 dark:text-primary-300',
              'border border-primary-200 dark:border-primary-700',
              'hover:bg-primary-50 dark:hover:bg-[oklch(22%_0.005_50)]',
              'transition-colors duration-[--duration-micro]',
              'min-h-[var(--touch-min)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            )}
          >
            {showAll ? 'Show Less' : `Show All ${programs.length}`}
          </button>
        )}
        <button
          className={cn(
            'flex-1 flex items-center justify-center gap-1 px-4 py-2.5 rounded-[var(--radius-md)]',
            'text-xs font-medium text-primary-600 dark:text-primary-300',
            'border border-dashed border-primary-300 dark:border-primary-600',
            'hover:bg-primary-50 dark:hover:bg-[oklch(22%_0.005_50)]',
            'transition-colors duration-[--duration-micro]',
            'min-h-[var(--touch-min)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add Program
        </button>
      </div>
    </section>
  );
}
