'use client';

import { cn } from '@/lib/utils/cn';
import { Flight, FlightAmenity } from '@/lib/types/flight';
import { CabinClass } from '@/lib/types/user';
import { Wifi, Monitor, Utensils, Plug, BedDouble, Crown, Clock, ArrowRight } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  cabinClass: CabinClass;
  passengerCount: number;
  onSelect: (flight: Flight) => void;
  persona?: string;
}

const AMENITY_ICONS: Record<FlightAmenity, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: 'WiFi' },
  entertainment: { icon: Monitor, label: 'Entertainment' },
  meals: { icon: Utensils, label: 'Meals' },
  power: { icon: Plug, label: 'Power' },
  flatbed: { icon: BedDouble, label: 'Flat Bed' },
  'lounge-access': { icon: Crown, label: 'Lounge' },
};

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

function getDayDiff(dep: string, arr: string): number {
  const d1 = new Date(dep);
  const d2 = new Date(arr);
  const dayStart1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const dayStart2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.round((dayStart2.getTime() - dayStart1.getTime()) / (1000 * 60 * 60 * 24));
}

function getPrice(flight: Flight, cabinClass: CabinClass): number {
  const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
  return flight.pricing[key as keyof typeof flight.pricing] as number;
}

function getStopsLabel(stops: number): string {
  if (stops === 0) return 'Nonstop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
}

export function FlightCard({ flight, cabinClass, passengerCount, onSelect, persona }: FlightCardProps) {
  const price = getPrice(flight, cabinClass);
  const totalPrice = price * passengerCount;
  const dayDiff = getDayDiff(flight.departure.time, flight.arrival.time);
  const isLowSeats = flight.seatsAvailable <= 5;

  return (
    <button
      onClick={() => onSelect(flight)}
      className={cn(
        'w-full text-left p-4 rounded-xl border bg-background',
        'transition-all duration-[--duration-short]',
        'hover:shadow-md hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-[oklch(45%_0.1_262)]',
        'focus-visible:outline-2 focus-visible:outline-primary-500',
        'border-surface-300 dark:border-[oklch(28%_0.005_50)]',
        'dark:bg-[oklch(18%_0.003_50)]',
        'group'
      )}
      aria-label={`${flight.airline.name} ${flight.flightNumber}, ${formatTime(flight.departure.time)} to ${formatTime(flight.arrival.time)}, ${getStopsLabel(flight.stops)}, $${totalPrice}`}
    >
      {/* Header: Airline + Price */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-surface-100 dark:bg-[oklch(25%_0.005_50)] flex items-center justify-center text-xs font-bold text-primary-700 dark:text-[oklch(80%_0.005_50)]">
            {flight.airline.code}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {flight.airline.name}
            </p>
            <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              {flight.flightNumber} · {flight.aircraft}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            ${totalPrice.toLocaleString()}
          </p>
          {passengerCount > 1 && (
            <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              ${price}/person
            </p>
          )}
        </div>
      </div>

      {/* Times Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-center">
          <p className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
            {formatTime(flight.departure.time)}
          </p>
          <p className="text-xs font-medium text-primary-500 dark:text-[oklch(60%_0.005_50)]">
            {flight.departure.airport}
          </p>
        </div>

        {/* Duration line */}
        <div className="flex-1 flex flex-col items-center gap-1 px-2">
          <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(flight.duration)}
          </p>
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-surface-300 dark:bg-[oklch(35%_0.005_50)]" />
            {flight.stops > 0 && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-warning-400" />
                {flight.stops > 1 && <div className="w-1.5 h-1.5 rounded-full bg-warning-400" />}
                <div className="flex-1 h-px bg-surface-300 dark:bg-[oklch(35%_0.005_50)]" />
              </>
            )}
            <ArrowRight className="w-3 h-3 text-primary-400" />
          </div>
          <p className={cn(
            'text-xs font-medium',
            flight.stops === 0
              ? 'text-success-600 dark:text-[oklch(72%_0.15_155)]'
              : 'text-warning-600 dark:text-[oklch(72%_0.15_75)]'
          )}>
            {getStopsLabel(flight.stops)}
            {flight.stopoverAirports && flight.stopoverAirports.length > 0 && (
              <span className="text-primary-400 dark:text-[oklch(55%_0.005_50)] font-normal">
                {' '}via {flight.stopoverAirports.join(', ')}
              </span>
            )}
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
            {formatTime(flight.arrival.time)}
            {dayDiff > 0 && (
              <span className="text-xs text-warning-500 font-normal ml-0.5">+{dayDiff}</span>
            )}
          </p>
          <p className="text-xs font-medium text-primary-500 dark:text-[oklch(60%_0.005_50)]">
            {flight.arrival.airport}
          </p>
        </div>
      </div>

      {/* Footer: Amenities + Urgency */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-200 dark:border-[oklch(25%_0.005_50)]">
        <div className="flex items-center gap-2">
          {flight.amenities.slice(0, 4).map((amenity) => {
            const config = AMENITY_ICONS[amenity];
            if (!config) return null;
            const Icon = config.icon;
            return (
              <div
                key={amenity}
                className="flex items-center gap-0.5"
                title={config.label}
              >
                <Icon className="w-3.5 h-3.5 text-primary-400 dark:text-[oklch(55%_0.005_50)]" aria-hidden="true" />
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {isLowSeats && (
            <span className="text-xs font-medium text-error-500 dark:text-[oklch(70%_0.18_25)]">
              {flight.seatsAvailable} left
            </span>
          )}
          <span className="text-xs font-medium text-primary-500 dark:text-[oklch(65%_0.194_262)] group-hover:text-primary-600 transition-colors">
            Select →
          </span>
        </div>
      </div>
    </button>
  );
}
