'use client';

import { cn } from '@/lib/utils/cn';
import { CheckCircle } from 'lucide-react';

interface AccessSummaryProps {
  accessibleCount: number;
  reason: string;
}

export function AccessSummary({ accessibleCount, reason }: AccessSummaryProps) {
  if (accessibleCount === 0) {
    return (
      <div
        className={cn(
          'sticky top-0 z-10 px-4 py-3',
          'bg-surface-200 dark:bg-[oklch(20%_0.003_50)]',
          'border-b border-surface-300 dark:border-[oklch(32%_0.008_50)]'
        )}
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)]">
          No included lounge access
        </p>
        <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5">
          Upgrade options available below
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'sticky top-0 z-10 px-4 py-3',
        'bg-success-50 dark:bg-[oklch(18%_0.01_142)]',
        'border-b border-success-200 dark:border-[oklch(35%_0.040_142)]'
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <CheckCircle
          className="w-5 h-5 text-success-600 dark:text-[oklch(62%_0.165_142)] flex-shrink-0"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-success-700 dark:text-[oklch(65%_0.160_142)]">
            You have access to {accessibleCount} lounge{accessibleCount !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-success-600 dark:text-[oklch(55%_0.155_142)] mt-0.5">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
}
