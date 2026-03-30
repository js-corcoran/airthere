'use client';

import { useState } from 'react';
import { Sun, Utensils, BedDouble, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import type { TripRecapData } from '../data/mock-recap';

interface JetLagRecoveryProps {
  jetlag: TripRecapData['jetlag'];
}

const TIP_ICONS: Record<string, React.ElementType> = {
  sun: Sun,
  utensils: Utensils,
  bed: BedDouble,
};

export function JetLagRecovery({ jetlag }: JetLagRecoveryProps) {
  const [expanded, setExpanded] = useState(false);

  // Show first tip always, rest on expand
  const visibleTips = expanded ? jetlag.tips : jetlag.tips.slice(0, 1);

  return (
    <section aria-labelledby="jetlag-heading" className="space-y-3">
      <h3
        id="jetlag-heading"
        className="text-lg font-semibold text-primary-900 dark:text-foreground"
      >
        Jet Lag Recovery
      </h3>

      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] border border-surface-300 dark:border-muted p-4 space-y-4">
        {/* Time zone shift indicator */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-warning-50 dark:bg-warning-900/30 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-warning-600 dark:text-warning-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
              +{jetlag.shift}h time zone shift
            </p>
            <p className="text-xs text-primary-500 dark:text-caption-foreground">
              Traveled {jetlag.direction} &mdash; expect {Math.ceil(jetlag.shift / 2)}&ndash;{jetlag.shift} days to fully adjust
            </p>
          </div>
        </div>

        {/* Recovery progress bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary-500 dark:text-caption-foreground">Recovery progress</span>
            <span className="text-xs font-medium text-primary-700 dark:text-muted-foreground">Day 1 of ~{jetlag.shift}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-200 dark:bg-input overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-warning-400 to-success-500 transition-all duration-[--duration-normal]"
              style={{ width: `${Math.round((1 / jetlag.shift) * 100)}%` }}
              role="progressbar"
              aria-valuenow={1}
              aria-valuemin={0}
              aria-valuemax={jetlag.shift}
              aria-label={`Jet lag recovery: day 1 of ${jetlag.shift}`}
            />
          </div>
        </div>

        {/* Tips */}
        <ul className="space-y-3" aria-label="Jet lag recovery tips">
          {visibleTips.map((tip, i) => {
            const Icon = TIP_ICONS[tip.icon] || Sun;
            return (
              <li key={tip.title} className="flex gap-3 opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-primary-50 dark:bg-surface-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                    {tip.title}
                  </p>
                  <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Expand / collapse */}
        {jetlag.tips.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="w-full flex items-center justify-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-[--duration-micro] min-h-[var(--touch-min)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              </>
            ) : (
              <>
                View full guide
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
