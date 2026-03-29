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
    <div className="bg-background dark:bg-[oklch(18%_0.003_50)] rounded-xl border border-surface-300 dark:border-[oklch(28%_0.005_50)] p-4 space-y-4">
      {/* Airline + Flight */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-[oklch(25%_0.005_50)] flex items-center justify-center">
          <span className="text-sm font-bold text-primary-700 dark:text-[oklch(80%_0.005_50)]">
            {flight.airline.code}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.airline.name} {flight.flightNumber}
          </p>
          <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
            {flight.aircraft} · {cabinClass.replace('-', ' ')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            ${totalPrice.toLocaleString()}
          </p>
          {passengerCount > 1 && (
            <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              ${price}/person
            </p>
          )}
        </div>
      </div>

      {/* Route + Times */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
            {formatTime(flight.departure.time)}
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-[oklch(75%_0.005_50)]">
            {flight.departure.airport}
          </p>
          <p className="text-xs text-primary-400 dark:text-[oklch(55%_0.005_50)]">
            {flight.departure.city}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
            <Clock className="w-3 h-3" />
            {formatDuration(flight.duration)}
          </div>
          <div className="w-full flex items-center">
            <div className="flex-1 h-px bg-surface-300 dark:bg-[oklch(35%_0.005_50)]" />
            <Plane className="w-4 h-4 text-primary-400 mx-1" />
            <div className="flex-1 h-px bg-surface-300 dark:bg-[oklch(35%_0.005_50)]" />
          </div>
          <p className={cn(
            'text-xs font-medium',
            flight.stops === 0
              ? 'text-success-600 dark:text-[oklch(72%_0.15_155)]'
              : 'text-warning-600 dark:text-[oklch(72%_0.15_75)]'
          )}>
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
            {formatTime(flight.arrival.time)}
          </p>
          <p className="text-sm font-medium text-primary-600 dark:text-[oklch(75%_0.005_50)]">
            {flight.arrival.airport}
          </p>
          <p className="text-xs text-primary-400 dark:text-[oklch(55%_0.005_50)]">
            {flight.arrival.city}
          </p>
        </div>
      </div>

      {/* Family guarantee */}
      {persona === 'family' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success-50 dark:bg-[oklch(20%_0.02_155)] border border-success-200 dark:border-[oklch(30%_0.05_155)]">
          <Shield className="w-4 h-4 text-success-600 dark:text-[oklch(72%_0.15_155)]" />
          <p className="text-xs font-medium text-success-700 dark:text-[oklch(80%_0.08_155)]">
            Family seating guarantee — we&apos;ll keep you together
          </p>
        </div>
      )}
    </div>
  );
}
