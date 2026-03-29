'use client';

import { cn } from '@/lib/utils/cn';
import { FamilySeating } from '@/lib/types/family';
import { Armchair, CheckCircle2, Plane } from 'lucide-react';

interface SeatingVisualizationProps {
  seating: FamilySeating[];
}

export function SeatingVisualization({ seating }: SeatingVisualizationProps) {
  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="Family seating assignments"
    >
      <div className="flex items-center gap-2 mb-3">
        <Armchair className="w-5 h-5 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Confirmed Family Seating
        </h2>
      </div>

      <div className="space-y-4">
        {seating.map((flight) => (
          <div
            key={flight.flightNumber}
            className={cn(
              'rounded-md p-3 border',
              'bg-success-50 border-success-200',
              'dark:bg-[oklch(15%_0.008_142)] dark:border-success-800'
            )}
          >
            {/* Flight label */}
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-4 h-4 text-primary-600 dark:text-[oklch(70%_0.125_262)]" aria-hidden="true" />
              <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                {flight.flightNumber} — {flight.route}
              </span>
            </div>

            {/* Seat grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {flight.seats.map((seat) => (
                <div
                  key={seat.seat}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                    seat.memberType === 'adult'
                      ? 'bg-primary-100 dark:bg-[oklch(25%_0.010_262)]'
                      : 'bg-secondary-100 dark:bg-[oklch(25%_0.020_50)]'
                  )}
                >
                  <span className="font-mono text-xs font-bold text-primary-600 dark:text-[oklch(70%_0.125_262)]">
                    {seat.seat}
                  </span>
                  <span className="text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                    {seat.memberName}
                  </span>
                  <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
                    ({seat.memberType === 'adult' ? 'Adult' : 'Child'})
                  </span>
                </div>
              ))}
            </div>

            {/* Confirmation */}
            {flight.confirmed && (
              <div className="flex items-center gap-1.5 mt-2">
                <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400" aria-hidden="true" />
                <span className="text-xs font-medium text-success-700 dark:text-success-300">
                  All together — Confirmed
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
