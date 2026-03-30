'use client';

import { cn } from '@/lib/utils/cn';
import { Flight } from '@/lib/types/flight';
import { CabinClass } from '@/lib/types/user';
import { Plane, Clock, ArrowRight, Shield } from 'lucide-react';

interface FlightSummaryProps {
  flight: Flight;
  cabinClass: CabinClass;
  passengerCount: number;
  persona?: string;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function getPrice(flight: Flight, cabinClass: CabinClass): number {
  const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
  return flight.pricing[key as keyof typeof flight.pricing] as number;
}

export function FlightSummary({ flight, cabinClass, passengerCount, persona }: FlightSummaryProps) {
  const price = getPrice(flight, cabinClass);
  const totalPrice = price * passengerCount;

  return (
    <div className="bg-background dark:bg-card rounded-xl border border-surface-300 dark:border-input p-4 space-y-4">
      {/* Airline + Flight */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-input flex items-center justify-center">
          <span className="text-sm font-bold text-primary-700 dark:text-soft-foreground">
            {flight.airline.code}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
            {flight.airline.name} {flight.flightNumber}
          </p>
          <p className="text-xs text-primary-500 dark:text-faint-foreground">
            {flight.aircraft} · {cabinClass.replace('-', ' ')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
            ${totalPrice.toLocaleString()}
          </p>
          {passengerCount > 1 && (
            <p className="text-xs text-primary-500 dark:text-faint-foreground">
              ${price}/person
            </p>
          )}
        </div>
      </div>

      {/* Route + Times */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-primary-900 dark:text-foreground tabular-nums">
            {formatTime(flight.departure.time)}
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-soft-foreground">
            {flight.departure.airport}
          </p>
          <p className="text-xs text-primary-400 dark:text-faint-foreground">
            {flight.departure.city}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-xs text-primary-500 dark:text-faint-foreground">
            <Clock className="w-3 h-3" />
            {formatDuration(flight.duration)}
          </div>
          <div className="w-full flex items-center">
            <div className="flex-1 h-px bg-surface-300 dark:bg-muted" />
            <Plane className="w-4 h-4 text-primary-400 mx-1" />
            <div className="flex-1 h-px bg-surface-300 dark:bg-muted" />
          </div>
          <p className={cn(
            'text-xs font-medium',
            flight.stops === 0
              ? 'text-success-600 dark:text-success-300'
              : 'text-warning-600 dark:text-warning-400'
          )}>
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-primary-900 dark:text-foreground tabular-nums">
            {formatTime(flight.arrival.time)}
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-soft-foreground">
            {flight.arrival.airport}
          </p>
          <p className="text-xs text-primary-400 dark:text-faint-foreground">
            {flight.arrival.city}
          </p>
        </div>
      </div>

      {/* Family guarantee */}
      {persona === 'family' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success-50 dark:bg-surface-success border border-success-200 dark:border-success">
          <Shield className="w-4 h-4 text-success-600 dark:text-success-300" />
          <p className="text-xs font-medium text-success-700 dark:text-success-200">
            Family seating guarantee — we&apos;ll keep you together
          </p>
        </div>
      )}
    </div>
  );
}
