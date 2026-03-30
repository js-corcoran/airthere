'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface DiscoverSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterToggle: () => void;
  hasActiveFilters: boolean;
  isFilterOpen?: boolean;
}

export function DiscoverSearchBar({
  value,
  onChange,
  onFilterToggle,
  hasActiveFilters,
  isFilterOpen = false,
}: DiscoverSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="px-4 py-3">
      <div className="flex gap-2">
        <div
          className={cn(
            'flex-1 flex items-center gap-2 px-3 h-[var(--touch-preferred)] rounded-lg',
            'bg-surface-200 dark:bg-[oklch(25%_0.005_50)]',
            'border border-transparent transition-all duration-[--duration-short]',
            isFocused && 'border-primary-400 dark:border-[oklch(65%_0.194_262)] ring-1 ring-primary-400/20'
          )}
        >
          <Search
            className="w-4 h-4 text-primary-400 dark:text-[oklch(60%_0.005_50)] shrink-0"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search destinations, cities..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-sm text-primary-900 dark:text-[oklch(95%_0.002_50)]
                       placeholder:text-primary-400 dark:placeholder:text-[oklch(60%_0.005_50)]
                       outline-none"
            aria-label="Search destinations"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="w-6 h-6 flex items-center justify-center rounded-full
                         bg-primary-200 dark:bg-[oklch(35%_0.005_50)]
                         hover:bg-primary-300 dark:hover:bg-[oklch(40%_0.005_50)]
                         transition-colors duration-[--duration-micro]"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 text-primary-700 dark:text-[oklch(85%_0.005_50)]" />
            </button>
          )}
        </div>

        <button
          onClick={onFilterToggle}
          className={cn(
            'flex items-center justify-center w-[var(--touch-preferred)] h-[var(--touch-preferred)] rounded-lg',
            'transition-colors duration-[--duration-short]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            hasActiveFilters
              ? 'bg-primary-500 dark:bg-[oklch(55%_0.194_262)] text-white'
              : 'bg-surface-200 dark:bg-[oklch(25%_0.005_50)] text-primary-700 dark:text-[oklch(85%_0.005_50)]'
          )}
          aria-label={hasActiveFilters ? 'Filters active — tap to modify' : 'Open filters'}
          aria-expanded={isFilterOpen}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {hasActiveFilters && (
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary-500 rounded-full border-2 border-white dark:border-[oklch(18%_0.003_50)]"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </div>
  );
}
