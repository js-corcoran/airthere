'use client';

import { cn } from '@/lib/utils/cn';
import { Trip } from '@/lib/types/trip';
import { ArrowRight, Clock, Plane, MapPin, Users, AlertTriangle, BookOpen } from 'lucide-react';

interface TripDashboardCardProps {
  trip: Trip;
  onClick: (trip: Trip) => void;
  persona?: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  upcoming: {
    bg: 'bg-primary-100 dark:bg-surface-primary',
    text: 'text-primary-700 dark:text-primary-200',
    label: 'Upcoming',
  },
  'active': {
    bg: 'bg-warning-100 dark:bg-surface-warning',
    text: 'text-warning-700 dark:text-warning-300',
    label: 'In Progress',
  },
  completed: {
    bg: 'bg-surface-200 dark:bg-input',
    text: 'text-primary-500 dark:text-faint-foreground',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-error-100 dark:bg-surface-error',
    text: 'text-error-700 dark:text-error-300',
    label: 'Cancelled',
  },
  disrupted: {
    bg: 'bg-error-100 dark:bg-surface-error',
    text: 'text-error-700 dark:text-error-300',
    label: 'Disrupted',
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
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
        'hover:shadow-md hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-500',
        'focus-visible:outline-2 focus-visible:outline-primary-500',
        'border-surface-300 dark:border-input',
        'dark:bg-card'
      )}
    >
      {/* Header: Route + Status */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-900 dark:text-foreground">
              {trip.departure.airport}
            </span>
            <ArrowRight className="w-4 h-4 text-primary-400" />
            <span className="text-lg font-bold text-primary-900 dark:text-foreground">
              {trip.arrival.airport}
            </span>
          </div>
          <p className="text-sm text-primary-600 dark:text-caption-foreground mt-0.5">
            {trip.name}
          </p>
        </div>
        <span className={cn('px-2 py-0.5 rounded-full text-[11px] font-semibold', statusStyle.bg, statusStyle.text)}>
          {statusStyle.label}
        </span>
      </div>

      {/* Flight Info */}
      {flight && (
        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-surface-200 dark:border-input">
          <div className="flex items-center gap-1.5 text-sm text-primary-700 dark:text-soft-foreground">
            <Plane className="w-3.5 h-3.5 text-primary-400" />
            <span className="font-medium">{flight.flight.airline.name}</span>
            <span className="text-primary-400">{flight.flight.flightNumber}</span>
          </div>
          {flight.seat && (
            <div className="flex items-center gap-1 text-xs text-primary-500 dark:text-faint-foreground">
              <MapPin className="w-3 h-3" />
              Seat {flight.seat}
            </div>
          )}
        </div>
      )}

      {/* Date + Passengers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-caption-foreground">
          <Clock className="w-3.5 h-3.5 text-primary-400" />
          {formatDate(trip.departure.date)} – {formatDate(trip.arrival.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-primary-500 dark:text-faint-foreground">
          <Users className="w-3.5 h-3.5" />
          {paxCount} traveler{paxCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Family seating confirmation */}
      {persona === 'family' && paxCount > 1 && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-success-600 dark:text-success-300">
          <span>✓</span>
          <span>Family seats together confirmed</span>
        </div>
      )}

      {/* Total Cost */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-primary-400 dark:text-faint-foreground">
          Confirmation: {trip.confirmationNumber}
        </span>
        <span className="text-base font-bold text-primary-900 dark:text-foreground tabular-nums">
          ${trip.totalCost.toLocaleString()}
        </span>
      </div>

      {/* Next Action Badge */}
      <div className={cn(
        'mt-3 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5',
        trip.status === 'disrupted' && 'bg-error-50 dark:bg-surface-error text-error-700 dark:text-error-300',
        trip.status === 'upcoming' && getDaysUntil(trip.departure.date) <= 7
          ? 'bg-warning-50 dark:bg-surface-warning text-warning-700 dark:text-warning-300'
          : trip.status === 'upcoming' && 'bg-success-50 dark:bg-surface-success text-success-700 dark:text-success-300',
        trip.status === 'completed' && 'bg-info-50 dark:bg-surface-info text-info-700 dark:text-info-300',
      )}>
        {trip.status === 'disrupted' && (
          <>
            <AlertTriangle className="w-3.5 h-3.5" />
            Flight delayed — view recovery options
          </>
        )}
        {trip.status === 'upcoming' && getDaysUntil(trip.departure.date) <= 7 && (
          <>
            <Clock className="w-3.5 h-3.5" />
            Check-in opens soon
          </>
        )}
        {trip.status === 'upcoming' && getDaysUntil(trip.departure.date) > 7 && (
          <>
            <Clock className="w-3.5 h-3.5" />
            Confirmed — {getDaysUntil(trip.departure.date)} days until departure
          </>
        )}
        {trip.status === 'completed' && (
          <>
            <BookOpen className="w-3.5 h-3.5" />
            View trip recap
          </>
        )}
      </div>
    </button>
  );
}
