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
      <h3 id="nearby-heading" className="text-sm font-semibold text-primary-900 dark:text-foreground">
        Other Nearby Flights
      </h3>
      <div className="space-y-1">
        {flights.map((f, i) => (
          <div
            key={f.flightNumber}
            className="flex items-center gap-3 py-2.5 px-3 rounded-md
                       hover:bg-surface-200 dark:hover:bg-input
                       transition-colors duration-[--duration-micro]
                       opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className={cn('w-2 h-2 rounded-full shrink-0', statusDot[f.status] ?? statusDot['on-time'])} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                <span className="font-semibold">{f.flightNumber}</span>
                <span className="text-primary-700 dark:text-caption-foreground"> · {f.airline}</span>
              </p>
              <p className="text-xs text-primary-700 dark:text-caption-foreground">
                to {f.destination}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                Gate {f.gate}
              </p>
              <p className="text-xs text-primary-700 dark:text-caption-foreground">
                {f.departureTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
