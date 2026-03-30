'use client';

import { cn } from '@/lib/utils/cn';
import { Minus, Plus, Users } from 'lucide-react';
import { PassengerCount } from '@/lib/types/flight';
import { useState } from 'react';

interface PassengerSelectorProps {
  value: PassengerCount;
  onChange: (count: PassengerCount) => void;
}

interface CounterRowProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

function CounterRow({ label, description, value, min, max, onChange }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-medium text-primary-900 dark:text-foreground">{label}</span>
        <p className="text-xs text-primary-700 dark:text-caption-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={cn(
            'w-9 h-9 rounded-full border flex items-center justify-center',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            value <= min
              ? 'border-surface-300 text-surface-300 cursor-not-allowed dark:border-muted dark:text-faint-foreground'
              : 'border-primary-300 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:border-primary-500 dark:hover:bg-input'
          )}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span
          className="w-8 text-center text-base font-semibold text-primary-900 dark:text-foreground tabular-nums"
          aria-live="polite"
          aria-label={`${value} ${label}`}
        >
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={cn(
            'w-9 h-9 rounded-full border flex items-center justify-center',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            value >= max
              ? 'border-surface-300 text-surface-300 cursor-not-allowed dark:border-muted dark:text-faint-foreground'
              : 'border-primary-300 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:border-primary-500 dark:hover:bg-input'
          )}
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const total = value.adults + value.children + value.infants;

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-primary-700 dark:text-muted-foreground mb-1.5 uppercase tracking-wider">
        Passengers
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-3 border rounded-md text-left text-base bg-background',
          'flex items-center gap-2',
          'transition-colors duration-[--duration-short]',
          'border-surface-300 dark:border-muted',
          'dark:bg-card dark:text-foreground',
          'hover:bg-surface-200 dark:hover:bg-surface-elevated hover:border-primary-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'min-h-[var(--touch-preferred)]'
        )}
        aria-expanded={isOpen}
        aria-label={`${total} passenger${total !== 1 ? 's' : ''}`}
      >
        <Users className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
        <span>
          {total} passenger{total !== 1 ? 's' : ''}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-surface dark:bg-card
                      border border-surface-300 dark:border-muted
                      rounded-lg shadow-lg p-4"
        >
          <CounterRow
            label="Adults"
            description="Age 12+"
            value={value.adults}
            min={1}
            max={9}
            onChange={(v) => onChange({ ...value, adults: v })}
          />
          <div className="border-t border-surface-300 dark:border-muted" />
          <CounterRow
            label="Children"
            description="Age 2-11"
            value={value.children}
            min={0}
            max={8}
            onChange={(v) => onChange({ ...value, children: v })}
          />
          <div className="border-t border-surface-300 dark:border-muted" />
          <CounterRow
            label="Infants"
            description="Under 2"
            value={value.infants}
            min={0}
            max={value.adults}
            onChange={(v) => onChange({ ...value, infants: v })}
          />

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-3 py-2.5 bg-primary-500 text-white font-medium rounded-md text-sm
                       hover:bg-primary-600 transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-min)]"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
