'use client';

import { Bus, Car, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { TransportOption } from '@/lib/types/disruption';

interface TransportVoucherProps {
  options: TransportOption[];
  onSelect: (optionId: string) => void;
  selectedId?: string;
}

const TYPE_ICONS: Record<string, typeof Bus> = {
  shuttle: Bus,
  rental: Car,
  rideshare: MapPin,
  taxi: Car,
};

export function TransportVoucher({ options, onSelect, selectedId }: TransportVoucherProps) {
  if (options.length === 0) return null;

  return (
    <section aria-labelledby="transport-heading" className="space-y-3">
      <h3
        id="transport-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Ground Transport
      </h3>
      <div className="bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-[oklch(32%_0.008_50)]">
        <div className="space-y-2">
          {options.map((option, i) => {
            const Icon = TYPE_ICONS[option.type] ?? Car;
            const isSelected = selectedId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                aria-pressed={isSelected}
                style={{ animationDelay: `${i * 60}ms` }}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] text-left',
                  'border transition-all duration-[--duration-micro]',
                  'min-h-[var(--touch-preferred)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-[oklch(20%_0.01_262)] dark:border-primary-400'
                    : 'border-surface-300 dark:border-[oklch(32%_0.008_50)] hover:bg-surface-200 dark:hover:bg-[oklch(22%_0.005_50)]',
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0',
                  isSelected
                    ? 'bg-primary-100 dark:bg-primary-800'
                    : 'bg-surface-200 dark:bg-[oklch(25%_0.005_50)]'
                )}>
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      isSelected
                        ? 'text-primary-600 dark:text-primary-300'
                        : 'text-primary-500 dark:text-primary-400'
                    )}
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                    {option.name}
                  </p>
                  <p className="text-xs text-primary-500 dark:text-primary-400">
                    {option.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {option.covered && option.cost === 0 ? (
                    <span className="text-xs font-semibold text-success-600 dark:text-success-400">Free</span>
                  ) : option.covered ? (
                    <span className="text-xs font-semibold text-success-600 dark:text-success-400">Covered</span>
                  ) : (
                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">${option.cost}</span>
                  )}
                  {isSelected && (
                    <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 ml-auto" aria-hidden="true" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
