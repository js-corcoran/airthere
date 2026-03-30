'use client';

import { cn } from '@/lib/utils/cn';
import { FlightSearchParams } from '@/lib/types/flight';

type TripType = FlightSearchParams['tripType'];

interface TripTypeToggleProps {
  value: TripType;
  onChange: (type: TripType) => void;
}

const TRIP_TYPES: { value: TripType; label: string }[] = [
  { value: 'round-trip', label: 'Round Trip' },
  { value: 'one-way', label: 'One Way' },
  { value: 'multi-city', label: 'Multi-City' },
];

export function TripTypeToggle({ value, onChange }: TripTypeToggleProps) {
  return (
    <div
      className="flex rounded-lg bg-surface-100 dark:bg-background p-1 gap-1"
      role="radiogroup"
      aria-label="Trip type"
    >
      {TRIP_TYPES.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 py-2 text-sm font-medium rounded-md text-center',
            'transition-all duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-min)]',
            value === option.value
              ? 'bg-background text-primary-900 shadow-sm dark:bg-input dark:text-foreground'
              : 'text-primary-500 dark:text-dimmed-foreground hover:text-primary-700 dark:hover:text-soft-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
