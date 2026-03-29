'use client';

import { cn } from '@/lib/utils/cn';
import { Trip } from '@/lib/types/trip';
import { ArrowRight, Clock, Plane, MapPin, Users } from 'lucide-react';

interface TripDashboardCardProps {
  trip: Trip;
  onClick: (trip: Trip) => void;
  persona?: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  upcoming: {
    bg: 'bg-primary-100 dark:bg-[oklch(25%_0.03_262)]',
    text: 'text-primary-700 dark:text-[oklch(80%_0.1_262)]',
    label: 'Upcoming',
  },
  'active': {
    bg: 'bg-warning-100 dark:bg-[oklch(25%_0.04_75)]',
    text: 'text-warning-700 dark:text-[oklch(80%_0.1_75)]',
    label: 'In Progress',
  },
  completed: {
    bg: 'bg-surface-200 dark:bg-[oklch(28%_0.005_50)]',
    text: 'text-primary-500 dark:text-[oklch(60%_0.005_50)]',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-error-100 dark:bg-[oklch(25%_0.04_25)]',
    text: 'text-error-700 dark:text-[oklch(80%_0.12_25)]',
    label: 'Cancelled',
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function TripDashboardCard({ trip, onClick, persona }: TripDashboardCardProps) {
  const statusStyle = STATUS_STYLES[trip.status] ?? STATUS_STYLES.upcoming;
  const flight = trip.flights[0];
  const paxCount = trip.passengers.length;

  return (
    <button
      onClick={() => onClick(trip)}
      className={cn(
        'w-full text-left p-4 rounded-xl border bg-background',
        'transition-all duration-[--duration-short]',
        'hover:shadow-md hover:border-primary-300 dark:hover:border-[oklch(45%_0.1_262)]',
        'focus-visible:outline-2 focus-visible:outline-primary-500',
        'border-surface-300 dark:border-[oklch(28%_0.005_50)]',
        'dark:bg-[oklch(18%_0.003_50)]'
      )}
    >
      {/* Header: Route + Status */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {trip.departure.airport}
            </span>
            <ArrowRight className="w-4 h-4 text-primary-400" />
            <span className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {trip.arrival.airport}
            </span>
          </div>
          <p className="text-sm text-primary-600 dark:text-[oklch(72%_0.005_50)] mt-0.5">
            {trip.name}
          </p>
        </div>
        <span className={cn('px-2 py-0.5 rounded-full text-[11px] font-semibold', statusStyle.bg, statusStyle.text)}>
          {statusStyle.label}
        </span>
      </div>

      {/* Flight Info */}
      {flight && (
        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-surface-200 dark:border-[oklch(25%_0.005_50)]">
          <div className="flex items-center gap-1.5 text-sm text-primary-700 dark:text-[oklch(80%_0.005_50)]">
            <Plane className="w-3.5 h-3.5 text-primary-400" />
            <span className="font-medium">{flight.flight.airline.name}</span>
            <span className="text-primary-400">{flight.flight.flightNumber}</span>
          </div>
          {flight.seat && (
            <div className="flex items-center gap-1 text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              <MapPin className="w-3 h-3" />
              Seat {flight.seat}
            </div>
          )}
        </div>
      )}

      {/* Date + Passengers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-[oklch(72%_0.005_50)]">
          <Clock className="w-3.5 h-3.5 text-primary-400" />
          {formatDate(trip.departure.date)} – {formatDate(trip.arrival.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-primary-500 dark:text-[oklch(60%_0.005_50)]">
          <Users className="w-3.5 h-3.5" />
          {paxCount} traveler{paxCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Family seating confirmation */}
      {persona === 'family' && paxCount > 1 && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-success-600 dark:text-[oklch(72%_0.15_155)]">
          <span>✓</span>
          <span>Family seats together confirmed</span>
        </div>
      )}

      {/* Total Cost */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-primary-400 dark:text-[oklch(50%_0.005_50)]">
          Confirmation: {trip.confirmationNumber}
        </span>
        <span className="text-base font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
          ${trip.totalCost.toLocaleString()}
        </span>
      </div>
    </button>
  );
}
