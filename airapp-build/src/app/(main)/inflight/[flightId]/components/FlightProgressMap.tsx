'use client';

import { cn } from '@/lib/utils/cn';
import { FlightProgress } from '@/lib/types/inflight';
import { Plane, CloudSun, Thermometer } from 'lucide-react';

interface FlightProgressMapProps {
  flight: FlightProgress;
}

export function FlightProgressMap({ flight }: FlightProgressMapProps) {
  const hoursRemaining = Math.floor(flight.progress.timeRemaining / 3600);
  const minutesRemaining = Math.floor((flight.progress.timeRemaining % 3600) / 60);

  return (
    <section
      className={cn(
        'rounded-lg overflow-hidden shadow-sm border',
        'border-surface-300 dark:border-muted'
      )}
      aria-label="Flight progress"
    >
      {/* Map area */}
      <div
        className={cn(
          'relative h-44 md:h-56 lg:h-72',
          'bg-gradient-to-b from-primary-100 to-primary-50',
          'dark:from-surface-primary dark:to-background'
        )}
      >
        {/* Route visualization */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 180"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Route line background */}
          <path
            d="M 40 120 Q 200 20 360 100"
            fill="none"
            stroke="oklch(85% 0.030 262)"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="dark:stroke-primary-700"
          />
          {/* Progress line */}
          <path
            d="M 40 120 Q 200 20 360 100"
            fill="none"
            stroke="oklch(57.5% 0.194 262)"
            strokeWidth="3"
            strokeDasharray={`${flight.progress.percentComplete * 3.6} 1000`}
            className="dark:stroke-primary-400"
          />
          {/* Departure dot */}
          <circle cx="40" cy="120" r="5" fill="oklch(57.5% 0.194 262)" className="dark:fill-primary-400" />
          {/* Arrival dot */}
          <circle cx="360" cy="100" r="5" fill="oklch(85% 0.030 262)" className="dark:fill-primary-700" />
          {/* Departure label */}
          <text x="40" y="145" textAnchor="middle" className="fill-primary-700 dark:fill-muted-foreground" fontSize="12" fontWeight="600">
            {flight.route.from}
          </text>
          {/* Arrival label */}
          <text x="360" y="125" textAnchor="middle" className="fill-primary-700 dark:fill-muted-foreground" fontSize="12" fontWeight="600">
            {flight.route.to}
          </text>
        </svg>

        {/* Aircraft icon overlay */}
        <div
          className="absolute"
          style={{
            left: `${Math.min(85, Math.max(10, flight.progress.percentComplete * 0.75 + 10))}%`,
            top: `${35 + Math.sin(flight.progress.percentComplete * 0.03) * 15}%`,
            transform: 'translate(-50%, -50%) rotate(-15deg)',
          }}
        >
          <div className="bg-primary-500 dark:bg-primary-400 rounded-full p-1.5 shadow-md">
            <Plane className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Altitude badge */}
        <div
          className={cn(
            'absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium',
            'bg-background/80 backdrop-blur-sm',
            'dark:bg-card/80',
            'text-primary-700 dark:text-muted-foreground'
          )}
        >
          {flight.current.altitude.toLocaleString()} ft
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 bg-surface dark:bg-card">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-primary-700 dark:text-muted-foreground">
            {flight.route.fromCity}
          </span>
          <span className="text-xs font-medium text-primary-700 dark:text-muted-foreground">
            {flight.route.toCity}
          </span>
        </div>
        <div className="h-1.5 bg-surface-200 dark:bg-input rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 dark:bg-primary-400 rounded-full transition-all duration-[--duration-long]"
            style={{ width: `${flight.progress.percentComplete}%` }}
            role="progressbar"
            aria-valuenow={flight.progress.percentComplete}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Flight ${flight.progress.percentComplete}% complete`}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-primary-500 dark:text-faint-foreground">
            {flight.progress.percentComplete}% complete
          </span>
          <span className="text-xs font-medium text-primary-900 dark:text-foreground">
            {hoursRemaining}h {minutesRemaining}m remaining
          </span>
        </div>

        {/* Destination weather */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-surface-300 dark:border-muted">
          <div className="flex items-center gap-1.5">
            <CloudSun className="w-4 h-4 text-info-500 dark:text-info-400" aria-hidden="true" />
            <span className="text-xs text-primary-700 dark:text-muted-foreground">
              {flight.route.toCity}: {flight.destinationWeather.condition}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-info-500 dark:text-info-400" aria-hidden="true" />
            <span className="text-xs text-primary-700 dark:text-muted-foreground">
              {flight.destinationWeather.temperature}°C
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
