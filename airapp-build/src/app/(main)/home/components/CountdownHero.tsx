'use client';

import { useEffect, useState } from 'react';
import { Trip } from '@/lib/types/trip';
import { Plane, MapPin, Clock } from 'lucide-react';

interface CountdownHeroProps {
  trip: Trip;
}

function getCountdown(targetDate: string): { hours: number; minutes: number; seconds: number } | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function CountdownHero({ trip }: CountdownHeroProps) {
  const flight = trip.flights[0];
  const depTime = flight?.flight.departure.time ?? '';
  const [countdown, setCountdown] = useState(getCountdown(depTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(depTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [depTime]);

  if (!flight) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      className="mx-4 my-4 rounded-xl overflow-hidden
                  bg-gradient-to-br from-primary-600 to-primary-500
                  dark:from-primary-800 dark:to-primary-700
                  text-white shadow-lg p-5"
    >
      {/* Route */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold">{trip.departure.city}</span>
        <Plane className="w-4 h-4 opacity-75" aria-hidden="true" />
        <span className="text-base font-semibold">{trip.arrival.city}</span>
      </div>

      {/* Airline & flight */}
      <p className="text-sm opacity-75 mb-4">
        {flight.flight.airline.name} {flight.flight.flightNumber}
      </p>

      {/* Flight details grid */}
      <div className="grid grid-cols-3 gap-3 mb-5 text-sm">
        <div>
          <span className="block text-xs opacity-60 uppercase tracking-wider">Gate</span>
          <span className="text-lg font-semibold">
            {flight.flight.departure.gate ?? 'TBD'}
          </span>
        </div>
        <div>
          <span className="block text-xs opacity-60 uppercase tracking-wider">Seat</span>
          <span className="text-lg font-semibold">{flight.seat ?? 'TBD'}</span>
        </div>
        <div>
          <span className="block text-xs opacity-60 uppercase tracking-wider">Status</span>
          <span className="text-lg font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success-400 inline-block" aria-hidden="true" />
            On time
          </span>
        </div>
      </div>

      {/* Countdown */}
      <div className="border-t border-white/20 pt-5 flex flex-col items-center">
        {countdown ? (
          <>
            <div className="flex items-baseline gap-1 tabular-nums" aria-live="polite">
              <span className="text-5xl font-bold">{pad(countdown.hours)}</span>
              <span className="text-2xl opacity-60">h</span>
              <span className="text-5xl font-bold ml-1">{pad(countdown.minutes)}</span>
              <span className="text-2xl opacity-60">m</span>
              <span className="text-3xl font-bold ml-1 opacity-80">{pad(countdown.seconds)}</span>
              <span className="text-lg opacity-60">s</span>
            </div>
            <span className="text-xs opacity-60 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              until departure
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="text-lg font-semibold">Departed</span>
          </div>
        )}
      </div>
    </div>
  );
}
