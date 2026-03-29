'use client';

import { Crown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { LoyaltyData } from '@/lib/types/profile';

interface EliteStatusCardProps {
  loyalty: LoyaltyData;
}

export function EliteStatusCard({ loyalty }: EliteStatusCardProps) {
  const expiryDate = new Date(loyalty.tierExpiry).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const flightProgress = loyalty.qualifiedFlights / (loyalty.qualifiedFlights + loyalty.flightsToNextTier);

  return (
    <section aria-labelledby="elite-status-heading" className="space-y-3">
      <h3
        id="elite-status-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Your Benefits
      </h3>
      <div className="bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-[oklch(32%_0.008_50)]">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-secondary-500" aria-hidden="true" />
          <span className="font-bold text-primary-800 dark:text-[oklch(90%_0.002_50)]">
            {loyalty.eliteTier} Status
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {loyalty.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-primary-700 dark:text-primary-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-300 dark:border-[oklch(32%_0.008_50)] pt-3 space-y-2">
          <p className="text-xs text-primary-500 dark:text-primary-400">
            Status valid through {expiryDate}
          </p>

          {loyalty.flightsToNextTier > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-primary-600 dark:text-primary-300 font-medium">
                  {loyalty.qualifiedFlights} of {loyalty.qualifiedFlights + loyalty.flightsToNextTier} flights
                </span>
                <span className="text-primary-500 dark:text-primary-400">
                  {loyalty.flightsToNextTier} to {loyalty.nextTier}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full bg-surface-200 dark:bg-[oklch(25%_0.005_50)] overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(flightProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Flight qualification progress: ${loyalty.qualifiedFlights} of ${loyalty.qualifiedFlights + loyalty.flightsToNextTier}`}
              >
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-[--duration-normal]"
                  style={{ width: `${flightProgress * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
