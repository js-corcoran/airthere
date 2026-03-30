'use client';

import { CheckCircle2, Clock, ChevronRight, Award } from 'lucide-react';
import type { PersonaType } from '@/lib/types/user';
import type { TripRecapData } from '../data/mock-recap';

interface LoyaltyReconciliationProps {
  loyalty: TripRecapData['loyalty'];
  persona: PersonaType;
}

function formatPoints(n: number): string {
  return n.toLocaleString('en-US');
}

export function LoyaltyReconciliation({ loyalty, persona }: LoyaltyReconciliationProps) {
  const isPosted = loyalty.status === 'posted';
  const totalEarned = loyalty.items.reduce((sum, i) => sum + i.points, 0);

  return (
    <section aria-labelledby="loyalty-heading" className="space-y-3">
      <h3
        id="loyalty-heading"
        className="text-lg font-semibold text-primary-900 dark:text-foreground"
      >
        Loyalty &amp; Points
      </h3>

      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] border border-surface-300 dark:border-muted p-4 space-y-4">
        {/* Status header */}
        <div className="flex items-center gap-2">
          {isPosted ? (
            <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 flex-shrink-0" aria-hidden="true" />
          ) : (
            <Clock className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0" aria-hidden="true" />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
              {isPosted ? 'Points Posted' : 'Points Pending'}
            </p>
            <p className="text-xs text-primary-700 dark:text-caption-foreground">
              {isPosted ? loyalty.program : 'Typically posts within 24\u201348 hours'}
            </p>
          </div>

          {/* Premium VIP badge */}
          {persona === 'premium' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-xs font-medium">
              <Award className="w-3 h-3" aria-hidden="true" />
              VIP
            </span>
          )}
        </div>

        {/* Point items */}
        <ul className="space-y-2" aria-label="Points earned">
          {loyalty.items.map((item, i) => (
            <li
              key={item.label}
              className="flex items-center justify-between opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-sm text-primary-700 dark:text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium text-primary-900 dark:text-foreground tabular-nums">
                {item.points > 0 ? '+' : ''}{formatPoints(item.points)}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-surface-300 dark:border-muted" aria-hidden="true" />

        {/* Total earned */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary-700 dark:text-muted-foreground">
            Total earned
          </span>
          <span className="text-base font-bold text-success-600 dark:text-success-400 tabular-nums">
            +{formatPoints(totalEarned)}
          </span>
        </div>

        {/* New balance */}
        <div className="flex items-center justify-between bg-primary-50 dark:bg-background rounded-[var(--radius-md)] px-3 py-2.5">
          <span className="text-sm font-medium text-primary-800 dark:text-primary-200">
            New balance
          </span>
          <span className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
            {formatPoints(loyalty.newBalance)} mi
          </span>
        </div>

        {/* View transactions link */}
        <button
          className="w-full flex items-center justify-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-[--duration-micro] min-h-[var(--touch-min)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          View Transactions
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
