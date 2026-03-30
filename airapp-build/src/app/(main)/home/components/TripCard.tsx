'use client';

import { cn } from '@/lib/utils/cn';
import { Trip } from '@/lib/types/trip';
import { Plane, Calendar, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

interface TripCardProps {
  trip: Trip;
  className?: string;
}

export function TripCard({ trip, className }: TripCardProps) {
  const flight = trip.flights[0];
  const depDate = parseISO(trip.departure.date);

  return (
    <Link
      href={ROUTES.TRIPS}
      className={cn(
        'block min-w-[280px] rounded-lg bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border border-surface-300 dark:border-[oklch(32%_0.008_50)]',
        'p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        className
      )}
      aria-label={`Trip to ${trip.arrival.city} on ${format(depDate, 'MMMM d')}`}
    >
      {/* Route */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          {trip.departure.airport}
        </span>
        <Plane className="w-3.5 h-3.5 text-primary-400 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
        <span className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          {trip.arrival.airport}
        </span>
        <span className="ml-auto text-xs font-medium text-secondary-600 dark:text-[oklch(72%_0.158_50)] bg-secondary-50 dark:bg-secondary-900 px-2 py-0.5 rounded-full">
          {trip.status}
        </span>
      </div>

      {/* Trip name */}
      <h3 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-2">
        {trip.name}
      </h3>

      {/* Details */}
      <div className="flex items-center gap-4 text-xs text-primary-600 dark:text-[oklch(80%_0.005_50)]">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" aria-hidden="true" />
          {format(depDate, 'MMM d, yyyy')}
        </span>
        {flight && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {flight.flight.airline.name}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mt-3 pt-3 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)] flex items-center justify-between">
        <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">Total cost</span>
        <span className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] font-mono">
          ${trip.totalCost.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
