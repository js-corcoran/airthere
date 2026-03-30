'use client';

import { cn } from '@/lib/utils/cn';
import { Calendar } from 'lucide-react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';

interface DateSelectorProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  optional?: boolean;
}

export function DateSelector({ label, value, onChange, minDate, optional }: DateSelectorProps) {
  const today = format(startOfDay(new Date()), 'yyyy-MM-dd');
  const min = minDate ?? today;

  return (
    <div>
      <label className="block text-xs font-medium text-primary-700 dark:text-muted-foreground mb-1.5 uppercase tracking-wider">
        {label} {optional && <span className="text-primary-600 dark:text-faint-foreground normal-case">(optional)</span>}
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500 dark:text-primary-400 pointer-events-none" aria-hidden="true" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          className={cn(
            'w-full pl-10 pr-4 py-3 border rounded-md text-base bg-background',
            'transition-colors duration-[--duration-short]',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'dark:bg-card dark:text-foreground',
            'border-surface-300 dark:border-muted',
            'min-h-[var(--touch-preferred)]',
            '[color-scheme:light] dark:[color-scheme:dark]'
          )}
          aria-label={label}
        />
      </div>
    </div>
  );
}
