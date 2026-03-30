'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { SlidersHorizontal, X } from 'lucide-react';

export interface FlightFilters {
  stops: Set<number>;
  airlines: Set<string>;
  timeOfDay: Set<'morning' | 'afternoon' | 'evening' | 'night'>;
  maxPrice: number;
}

interface FilterSheetProps {
  filters: FlightFilters;
  onChange: (filters: FlightFilters) => void;
  availableAirlines: { code: string; name: string }[];
  maxPriceLimit: number;
  activeFilterCount: number;
}

const TIME_OPTIONS: { value: 'morning' | 'afternoon' | 'evening' | 'night'; label: string; desc: string }[] = [
  { value: 'morning', label: 'Morning', desc: '6am–12pm' },
  { value: 'afternoon', label: 'Afternoon', desc: '12pm–6pm' },
  { value: 'evening', label: 'Evening', desc: '6pm–12am' },
  { value: 'night', label: 'Night', desc: '12am–6am' },
];

const STOP_OPTIONS = [
  { value: 0, label: 'Nonstop' },
  { value: 1, label: '1 stop' },
  { value: 2, label: '2+ stops' },
];

function CheckboxItem({
  checked,
  onChange,
  label,
  sublabel,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 py-2 px-1 cursor-pointer rounded-md',
        'hover:bg-surface-50 dark:hover:bg-surface-elevated',
        'min-h-[var(--touch-min)]'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500"
      />
      <div>
        <span className="text-sm text-primary-900 dark:text-foreground">{label}</span>
        {sublabel && (
          <span className="text-xs text-primary-400 dark:text-faint-foreground ml-1">{sublabel}</span>
        )}
      </div>
    </label>
  );
}

export function FilterSheet({ filters, onChange, availableAirlines, maxPriceLimit, activeFilterCount }: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStop = (stop: number) => {
    const next = new Set(filters.stops);
    if (next.has(stop)) next.delete(stop);
    else next.add(stop);
    onChange({ ...filters, stops: next });
  };

  const toggleAirline = (code: string) => {
    const next = new Set(filters.airlines);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    onChange({ ...filters, airlines: next });
  };

  const toggleTime = (time: 'morning' | 'afternoon' | 'evening' | 'night') => {
    const next = new Set(filters.timeOfDay);
    if (next.has(time)) next.delete(time);
    else next.add(time);
    onChange({ ...filters, timeOfDay: next });
  };

  const resetFilters = () => {
    onChange({
      stops: new Set(),
      airlines: new Set(),
      timeOfDay: new Set(),
      maxPrice: maxPriceLimit,
    });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-primary-500',
          'min-h-[var(--touch-min)]',
          activeFilterCount > 0
            ? 'bg-primary-100 text-primary-700 dark:bg-surface-primary dark:text-primary-200'
            : 'bg-surface-100 text-primary-600 dark:bg-surface-elevated dark:text-soft-foreground'
        )}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="w-4.5 h-4.5 rounded-full bg-primary-500 text-white text-[10px] flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Overlay + Sheet */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-overlay-dark z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-background dark:bg-background
                        rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto
                        animate-[slideUp_0.3s_ease-out]"
            role="dialog"
            aria-label="Flight filters"
          >
            {/* Sheet Header */}
            <div className="sticky top-0 bg-background dark:bg-background px-4 py-3 border-b border-surface-200 dark:border-input flex items-center justify-between z-10">
              <h3 className="text-base font-semibold text-primary-900 dark:text-foreground">
                Filters
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-primary-500 dark:text-primary-400 min-h-[var(--touch-min)] flex items-center"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-input transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-primary-500" />
                </button>
              </div>
            </div>

            <div className="px-4 py-4 space-y-6">
              {/* Price */}
              <div>
                <h4 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-2">
                  Max Price
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={maxPriceLimit}
                    step={50}
                    value={filters.maxPrice}
                    onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                    className="flex-1 accent-primary-500"
                    aria-label="Maximum price"
                  />
                  <span className="text-sm font-semibold text-primary-900 dark:text-foreground tabular-nums w-16 text-right">
                    ${filters.maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Stops */}
              <div>
                <h4 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-2">
                  Stops
                </h4>
                {STOP_OPTIONS.map((opt) => (
                  <CheckboxItem
                    key={opt.value}
                    checked={filters.stops.has(opt.value)}
                    onChange={() => toggleStop(opt.value)}
                    label={opt.label}
                  />
                ))}
              </div>

              {/* Airlines */}
              {availableAirlines.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-2">
                    Airlines
                  </h4>
                  {availableAirlines.map((airline) => (
                    <CheckboxItem
                      key={airline.code}
                      checked={filters.airlines.has(airline.code)}
                      onChange={() => toggleAirline(airline.code)}
                      label={airline.name}
                      sublabel={airline.code}
                    />
                  ))}
                </div>
              )}

              {/* Time of Day */}
              <div>
                <h4 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-2">
                  Departure Time
                </h4>
                {TIME_OPTIONS.map((opt) => (
                  <CheckboxItem
                    key={opt.value}
                    checked={filters.timeOfDay.has(opt.value)}
                    onChange={() => toggleTime(opt.value)}
                    label={opt.label}
                    sublabel={opt.desc}
                  />
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 px-4 py-3 bg-background dark:bg-background border-t border-surface-200 dark:border-input">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-lg font-semibold text-sm bg-primary-500 text-white
                           hover:bg-primary-600 transition-colors duration-[--duration-short]
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                           min-h-[var(--touch-preferred)]
                           dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                Show Results
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
