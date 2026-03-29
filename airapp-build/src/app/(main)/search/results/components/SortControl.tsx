'use client';

import { cn } from '@/lib/utils/cn';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'price' | 'duration' | 'departure' | 'arrival';

interface SortControlProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  totalResults: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price', label: 'Price' },
  { value: 'duration', label: 'Duration' },
  { value: 'departure', label: 'Depart' },
  { value: 'arrival', label: 'Arrive' },
];

export function SortControl({ value, onChange, totalResults }: SortControlProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] whitespace-nowrap shrink-0">
        {totalResults} flight{totalResults !== 1 ? 's' : ''}
      </span>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide" role="radiogroup" aria-label="Sort flights by">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              value === option.value
                ? 'bg-primary-500 text-white dark:bg-[oklch(55%_0.194_262)]'
                : 'bg-surface-100 text-primary-600 dark:bg-[oklch(22%_0.003_50)] dark:text-[oklch(75%_0.005_50)] hover:bg-surface-200 dark:hover:bg-[oklch(28%_0.005_50)]'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
