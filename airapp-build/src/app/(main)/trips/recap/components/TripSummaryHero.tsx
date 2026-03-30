'use client';

import { Share2, Download } from 'lucide-react';
import type { TripRecapData } from '../data/mock-recap';

interface TripSummaryHeroProps {
  trip: TripRecapData['trip'];
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start + 'T12:00:00');
  const e = new Date(end + 'T12:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startStr = s.toLocaleDateString('en-US', opts);
  const endStr = e.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  return `${startStr} \u2014 ${endStr}`;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TripSummaryHero({ trip }: TripSummaryHeroProps) {
  const destinations = trip.destinations.map((d) => d.city).join(' & ');

  return (
    <section
      aria-labelledby="trip-summary-heading"
      className="relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 p-5 text-white shadow-[var(--shadow-lg)]"
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-1">
          Trip Complete
        </p>
        <h2
          id="trip-summary-heading"
          className="text-2xl font-bold mb-1"
        >
          {trip.title}
        </h2>
        <p className="text-sm text-white/80 mb-1">{destinations}</p>
        <p className="text-sm text-white/70 mb-4">
          {formatDateRange(trip.startDate, trip.endDate)}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">Total Cost</p>
            <p className="text-3xl font-bold tracking-tight">
              {formatCurrency(trip.totalCost, trip.currency)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              aria-label="Share trip recap"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition-colors duration-[--duration-micro] min-h-[var(--touch-min)] min-w-[var(--touch-min)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              aria-label="Download trip recap"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition-colors duration-[--duration-micro] min-h-[var(--touch-min)] min-w-[var(--touch-min)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
