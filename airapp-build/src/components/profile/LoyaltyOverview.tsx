'use client';

import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { LoyaltyData } from '@/lib/types/profile';

interface LoyaltyOverviewProps {
  loyalty: LoyaltyData;
}

export function LoyaltyOverview({ loyalty }: LoyaltyOverviewProps) {
  const progress = loyalty.pointsToNextTier > 0
    ? Math.round((loyalty.totalPoints / (loyalty.totalPoints + loyalty.pointsToNextTier)) * 100)
    : 100;

  return (
    <section aria-labelledby="loyalty-overview-heading" className="space-y-3">
      <h3
        id="loyalty-overview-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Loyalty Points
      </h3>
      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-muted">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
              {loyalty.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              miles across {loyalty.programs.length} programs
            </p>
          </div>
          <TrendingUp className="w-5 h-5 text-success-500" aria-hidden="true" />
        </div>

        {/* Progress to next tier */}
        {loyalty.pointsToNextTier > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-primary-600 dark:text-primary-300 font-medium">
                {loyalty.eliteTier}
              </span>
              <span className="text-primary-500 dark:text-primary-400">
                {loyalty.nextTier}
              </span>
            </div>
            <div
              className="h-2 rounded-full bg-surface-200 dark:bg-input overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progress}% progress to ${loyalty.nextTier}`}
            >
              <div
                className="h-full rounded-full bg-secondary-500 transition-all duration-[--duration-normal]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              {loyalty.pointsToNextTier.toLocaleString()} miles to {loyalty.nextTier}
              {loyalty.flightsToNextTier > 0 && (
                <span> &middot; {loyalty.flightsToNextTier} more {loyalty.flightsToNextTier === 1 ? 'flight' : 'flights'} needed</span>
              )}
            </p>
          </div>
        )}

        {loyalty.pointsToNextTier === 0 && (
          <p className="text-xs text-success-600 dark:text-success-400 font-medium">
            Top tier achieved — enjoy all benefits through {new Date(loyalty.tierExpiry).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>
    </section>
  );
}
