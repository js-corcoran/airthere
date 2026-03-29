'use client';

import { cn } from '@/lib/utils/cn';
import { NearbyFlight } from '../types';

interface NearbyFlightsSectionProps {
  flights: NearbyFlight[];
}

const statusDot: Record<string, string> = {
  'on-time': 'bg-success-500',
  'delayed': 'bg-warning-500',
  'cancelled': 'bg-error-500',
  'boarding': 'bg-primary-500 animate-pulse',
};

export function NearbyFlightsSection({ flights }: NearbyFlightsSectionProps) {
  return (
    <section aria-labelledby="nearby-heading" className="space-y-2">
      <h3 id="nearby-heading" className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
        Other Nearby Flights
      </h3>
      <div className="space-y-1">
        {flights.map((f) => (
          <div
            key={f.flightNumber}
            className="flex items-center gap-3 py-2.5 px-3 rounded-md
                       hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                       transition-colors duration-[--duration-micro]"
          >
            <span className={cn('w-2 h-2 rounded-full shrink-0', statusDot[f.status] ?? statusDot['on-time'])} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                <span className="font-semibold">{f.flightNumber}</span>
                <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]"> · {f.airline}</span>
              </p>
              <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                to {f.destination}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                Gate {f.gate}
              </p>
              <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                {f.departureTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
