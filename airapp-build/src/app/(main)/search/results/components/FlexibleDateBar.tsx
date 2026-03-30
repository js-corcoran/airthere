'use client';

import { cn } from '@/lib/utils/cn';
import { format, addDays, parseISO } from 'date-fns';

interface FlexibleDateBarProps {
  selectedDate: string; // yyyy-MM-dd
  onDateChange: (date: string) => void;
}

export function FlexibleDateBar({ selectedDate, onDateChange }: FlexibleDateBarProps) {
  const baseDate = parseISO(selectedDate);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(baseDate, i - 3));

  return (
    <div
      className="flex gap-1 overflow-x-auto scrollbar-hide py-2 px-1 -mx-1"
      role="tablist"
      aria-label="Flexible dates"
    >
      {dates.map((date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');

        return (
          <button
            key={dateStr}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onDateChange(dateStr)}
            className={cn(
              'flex flex-col items-center px-3 py-2 rounded-lg shrink-0',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)] min-w-[52px]',
              isSelected
                ? 'bg-primary-500 text-white dark:bg-primary-500'
                : 'bg-surface-50 dark:bg-surface-100 text-primary-700 dark:text-soft-foreground hover:bg-surface-100 dark:hover:bg-input'
            )}
          >
            <span className={cn(
              'text-[10px] font-medium uppercase',
              isSelected ? 'text-white/80' : 'text-primary-400 dark:text-faint-foreground'
            )}>
              {format(date, 'EEE')}
            </span>
            <span className={cn(
              'text-sm font-semibold',
              isSelected ? 'text-white' : ''
            )}>
              {format(date, 'd')}
            </span>
            <span className={cn(
              'text-[10px]',
              isSelected ? 'text-white/80' : 'text-primary-400 dark:text-faint-foreground'
            )}>
              {format(date, 'MMM')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
