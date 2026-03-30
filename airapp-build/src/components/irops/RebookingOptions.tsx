'use client';

import { useState } from 'react';
import { Plane, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { RebookingFlight } from '@/lib/types/disruption';

interface RebookingOptionsProps {
  alternatives: RebookingFlight[];
  onSelect: (flight: RebookingFlight) => void;
  selectedId?: string;
}

type FilterTab = 'all' | 'same_day' | 'next_day';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Options' },
  { id: 'same_day', label: 'Same Day' },
  { id: 'next_day', label: 'Next Day' },
];

function isSameDay(date1: string, date2: string): boolean {
  return date1.split('T')[0] === date2.split('T')[0];
}

export function RebookingOptions({ alternatives, onSelect, selectedId }: RebookingOptionsProps) {
  const [filter, setFilter] = useState<FilterTab>('all');

  const today = alternatives[0]?.departure.date ?? '';

  const filtered = alternatives.filter((flight) => {
    if (filter === 'all') return true;
    if (filter === 'same_day') return isSameDay(flight.departure.date, today);
    if (filter === 'next_day') return !isSameDay(flight.departure.date, today);
    return true;
  });

  if (alternatives.length === 0) return null;

  return (
    <section aria-labelledby="alternatives-heading" className="space-y-3">
      <h3
        id="alternatives-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Alternative Flights
      </h3>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter flights">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap',
              'transition-colors duration-[--duration-micro]',
              'min-h-[var(--touch-min)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              filter === tab.id
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-surface-200 dark:bg-input text-primary-600 dark:text-primary-300 hover:bg-surface-300 dark:hover:bg-muted',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Flight list */}
      <div className="space-y-3" role="tabpanel">
        {filtered.length === 0 ? (
          <p className="text-sm text-primary-500 dark:text-primary-400 text-center py-6">
            No flights available for this filter. Try another option.
          </p>
        ) : (
          filtered.map((flight, i) => (
            <div key={flight.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
              <FlightOptionCard
                flight={flight}
                isSelected={flight.id === selectedId}
                onSelect={() => onSelect(flight)}
              />
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-primary-400 dark:text-primary-500 text-center">
        Monitoring availability — more options may appear
      </p>
    </section>
  );
}

function FlightOptionCard({
  flight,
  isSelected,
  onSelect,
}: {
  flight: RebookingFlight;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'w-full text-left rounded-[var(--radius-lg)] p-4',
        'border transition-all duration-[--duration-micro]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        isSelected
          ? 'border-primary-500 bg-primary-50 dark:bg-surface-primary dark:border-primary-400 shadow-md'
          : 'border-surface-300 dark:border-muted bg-surface dark:bg-card hover:shadow-sm hover:-translate-y-0.5',
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-sm font-bold text-primary-800 dark:text-subtle-foreground">
            {flight.flightNumber}
          </span>
          <span className="text-xs text-primary-500 dark:text-primary-400 ml-2">
            {flight.airline}
          </span>
        </div>
        <PriceBadge cost={flight.additionalCost} />
      </div>

      <div className="flex items-center gap-3 text-sm mb-3">
        <div className="flex-1">
          <p className="font-semibold text-primary-900 dark:text-foreground">
            {flight.departure.time}
          </p>
          <p className="text-xs text-primary-500 dark:text-primary-400">
            {flight.departure.airport}
          </p>
        </div>

        <div className="flex flex-col items-center gap-0.5 px-2">
          <Plane className="w-3.5 h-3.5 text-primary-400 dark:text-primary-500 rotate-90" aria-hidden="true" />
          <div className="w-12 h-px bg-primary-200 dark:bg-primary-700" aria-hidden="true" />
          <span className="text-[10px] text-primary-400 dark:text-primary-500">
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
          </span>
        </div>

        <div className="flex-1 text-right">
          <p className="font-semibold text-primary-900 dark:text-foreground">
            {flight.arrival.time}
          </p>
          <p className="text-xs text-primary-500 dark:text-primary-400">
            {flight.arrival.airport}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-primary-500 dark:text-primary-400 flex-wrap">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
        </span>
        <span className="capitalize">{flight.cabinClass}</span>
        <span>{flight.seatsAvailable} seats left</span>
        <span className="flex items-center gap-1">{flight.departure.date}</span>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-primary-200 dark:border-primary-700 flex items-center justify-center gap-2 text-primary-600 dark:text-primary-300 text-sm font-medium">
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          Selected — Confirm rebooking above
        </div>
      )}
    </button>
  );
}

function PriceBadge({ cost }: { cost: number }) {
  if (cost === 0) {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300">
        No extra cost
      </span>
    );
  }
  if (cost < 0) {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300">
        ${Math.abs(cost)} refund
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-warning-100 dark:bg-warning-900 text-warning-700 dark:text-warning-300">
      +${cost}
    </span>
  );
}
