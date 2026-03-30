'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Plane, Clock, ArrowRight, CreditCard } from 'lucide-react';
import { AirportFlightInfo } from '../types';

interface FlightStatusCardProps {
  flight: AirportFlightInfo;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  'on-time': { label: 'On Time', className: 'bg-success-500 dark:bg-success-500' },
  'delayed': { label: 'Delayed', className: 'bg-warning-500 dark:bg-warning-500' },
  'boarding': { label: 'Boarding', className: 'bg-primary-500 dark:bg-primary-500 animate-pulse' },
  'cancelled': { label: 'Cancelled', className: 'bg-error-500 dark:bg-error-500' },
  'departed': { label: 'Departed', className: 'bg-primary-400 dark:bg-primary-500' },
  'arrived': { label: 'Arrived', className: 'bg-success-600 dark:bg-success-600' },
  'diverted': { label: 'Diverted', className: 'bg-error-400 dark:bg-error-400' },
};

function useCountdown(targetTime: string): string {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    function calcDiff() {
      const now = new Date();
      const [time, period] = targetTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const target = new Date();
      let h = hours;
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      target.setHours(h, minutes, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return 'Now';

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (hrs > 0) return `${hrs}h ${mins}m`;
      return `${mins}m`;
    }
    setDisplay(calcDiff());
    const interval = setInterval(() => setDisplay(calcDiff()), 60000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return display;
}

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const countdown = useCountdown(flight.departureTime);
  const status = statusConfig[flight.status] ?? statusConfig['on-time'];

  return (
    <div
      className="bg-gradient-to-br from-primary-50 to-primary-100
                 dark:from-surface-primary dark:to-surface-primary
                 rounded-xl p-5 border-2 border-primary-200 dark:border-primary
                 shadow-md"
      role="status"
      aria-live="polite"
      aria-label={`Flight ${flight.flightNumber} status: ${flight.status}, gate ${flight.gate.number}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
            <span className="text-xs text-primary-500 dark:text-caption-foreground">
              {flight.airline}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-foreground tracking-tight">
            {flight.flightNumber}
          </h3>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-xs font-bold text-white', status.className)}>
          {status.label}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
            {flight.route.from}
          </p>
          <p className="text-xs text-primary-500 dark:text-caption-foreground">
            {flight.departureTime}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 px-4">
          <div className="h-px flex-1 bg-primary-300 dark:bg-primary-800" />
          <Plane className="w-4 h-4 text-primary-400 dark:text-primary-400 rotate-90" aria-hidden="true" />
          <div className="h-px flex-1 bg-primary-300 dark:bg-primary-800" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
            {flight.route.to}
          </p>
          <p className="text-xs text-primary-500 dark:text-caption-foreground">
            {flight.arrivalTime}
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="text-center py-3 mb-4 border-y border-primary-200 dark:border-primary">
        <p className="text-xs text-primary-500 dark:text-caption-foreground mb-1">
          {flight.status === 'boarding' ? 'Boarding Now' : 'Departs in'}
        </p>
        <p className="text-4xl font-bold text-primary-900 dark:text-foreground tracking-tight">
          {countdown}
        </p>
        <p className="text-xs text-primary-500 dark:text-caption-foreground mt-1">
          Boarding starts {flight.gate.boardingStartTime}
        </p>
      </div>

      {/* Gate + seat info */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-surface-primary">
          <p className="text-[10px] text-primary-500 dark:text-caption-foreground uppercase tracking-wider">Gate</p>
          <p className="text-lg font-bold text-primary-900 dark:text-foreground">
            {flight.gate.number}
          </p>
          {flight.gate.previousGate && (
            <p className="text-[10px] text-warning-600 dark:text-warning-600 font-medium">
              was {flight.gate.previousGate}
            </p>
          )}
        </div>
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-surface-primary">
          <p className="text-[10px] text-primary-500 dark:text-caption-foreground uppercase tracking-wider">Terminal</p>
          <p className="text-lg font-bold text-primary-900 dark:text-foreground">
            {flight.terminal}
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-surface-primary">
          <p className="text-[10px] text-primary-500 dark:text-caption-foreground uppercase tracking-wider">Seat</p>
          <p className="text-lg font-bold text-primary-900 dark:text-foreground">
            {flight.seatNumber ?? '—'}
          </p>
        </div>
      </div>

      {/* Boarding progress */}
      {flight.boardingGroup && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-primary-700 dark:text-soft-foreground font-medium">
              Your group: {flight.boardingGroup}
            </span>
            <span className="text-primary-500 dark:text-caption-foreground">
              {flight.gate.boardingProgress}% boarded
            </span>
          </div>
          <div className="h-2 bg-primary-200 dark:bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 dark:bg-primary-500 rounded-full transition-all duration-[--duration-normal]"
              style={{ width: `${flight.gate.boardingProgress}%` }}
              role="progressbar"
              aria-valuenow={flight.gate.boardingProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Boarding progress"
            />
          </div>
        </div>
      )}

      {/* Walking time */}
      <div className="flex items-center gap-2 text-xs text-primary-500 dark:text-caption-foreground">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{flight.gate.walkingTimeMinutes} min walk to gate</span>
      </div>
    </div>
  );
}
