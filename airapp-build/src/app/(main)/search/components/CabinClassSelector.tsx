'use client';

import { cn } from '@/lib/utils/cn';
import { CabinClass, PersonaType } from '@/lib/types/user';

interface CabinClassSelectorProps {
  value: CabinClass;
  onChange: (cabin: CabinClass) => void;
  persona?: PersonaType;
}

const CABIN_OPTIONS: { value: CabinClass; label: string; shortLabel: string }[] = [
  { value: 'economy', label: 'Economy', shortLabel: 'Eco' },
  { value: 'premium-economy', label: 'Premium Economy', shortLabel: 'Prem' },
  { value: 'business', label: 'Business', shortLabel: 'Biz' },
  { value: 'first', label: 'First', shortLabel: 'First' },
];

export function CabinClassSelector({ value, onChange }: CabinClassSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)] mb-1.5 uppercase tracking-wider">
        Cabin Class
      </label>
      <div className="flex rounded-md border border-surface-300 dark:border-[oklch(32%_0.008_50)] overflow-hidden" role="radiogroup" aria-label="Cabin class">
        {CABIN_OPTIONS.map((option) => (
          <button
            key={option.value}
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 py-2.5 text-xs font-medium text-center transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              value === option.value
                ? 'bg-primary-500 text-white dark:bg-[oklch(65%_0.194_262)]'
                : 'bg-background text-primary-600 dark:bg-[oklch(18%_0.003_50)] dark:text-[oklch(80%_0.005_50)] hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]'
            )}
          >
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sm:hidden">{option.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
