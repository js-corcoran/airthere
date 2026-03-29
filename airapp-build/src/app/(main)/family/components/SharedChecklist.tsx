'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChecklistItem } from '@/lib/types/family';
import { CheckSquare, Square, ClipboardList, User } from 'lucide-react';

interface SharedChecklistProps {
  items: ChecklistItem[];
  tripLabel: string;
  onToggle: (itemId: string) => void;
}

export function SharedChecklist({ items, tripLabel, onToggle }: SharedChecklistProps) {
  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="Pre-trip checklist"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <ClipboardList className="w-5 h-5 text-secondary-500 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Pre-Trip Checklist
        </h2>
      </div>
      <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] mb-3">
        {tripLabel}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)]">
            {completedCount} of {items.length} completed
          </span>
          <span className="text-xs font-medium text-primary-500 dark:text-[oklch(60%_0.005_50)]">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1.5 bg-surface-200 dark:bg-[oklch(25%_0.005_50)] rounded-full overflow-hidden">
          <div
            className="h-full bg-success-500 rounded-full transition-all duration-[--duration-normal]"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progressPercent}% of checklist completed`}
          />
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-1" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onToggle(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left',
                'transition-colors duration-[--duration-micro]',
                'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
              aria-checked={item.completed}
              role="checkbox"
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-success-500 shrink-0" aria-hidden="true" />
              ) : (
                <Square className="w-5 h-5 text-primary-400 dark:text-[oklch(50%_0.005_50)] shrink-0" aria-hidden="true" />
              )}
              <span
                className={cn(
                  'text-sm flex-1',
                  item.completed
                    ? 'line-through text-primary-400 dark:text-[oklch(50%_0.005_50)]'
                    : 'text-primary-900 dark:text-[oklch(95%_0.002_50)]'
                )}
              >
                {item.task}
              </span>
              {item.assignedTo && (
                <span className="inline-flex items-center gap-1 text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] shrink-0">
                  <User className="w-3 h-3" aria-hidden="true" />
                  {item.assignedTo}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
