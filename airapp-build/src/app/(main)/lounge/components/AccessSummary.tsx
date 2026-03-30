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
          'bg-surface-200 dark:bg-surface-100',
          'border-b border-surface-300 dark:border-muted'
        )}
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-primary-700 dark:text-muted-foreground">
          No included lounge access
        </p>
        <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
          Upgrade options available below
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'sticky top-0 z-10 px-4 py-3',
        'bg-success-50 dark:bg-surface-success',
        'border-b border-success-200 dark:border-success'
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <CheckCircle
          className="w-5 h-5 text-success-600 dark:text-success-500 flex-shrink-0"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-success-700 dark:text-success-400">
            You have access to {accessibleCount} lounge{accessibleCount !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-success-600 dark:text-success-600 mt-0.5">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
}
