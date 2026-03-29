'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Plane, Clock, ArrowRight, CreditCard } from 'lucide-react';
import { AirportFlightInfo } from '../types';

interface FlightStatusCardProps {
  flight: AirportFlightInfo;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  'on-time': { label: 'On Time', className: 'bg-success-500 dark:bg-[oklch(62%_0.165_142)]' },
  'delayed': { label: 'Delayed', className: 'bg-warning-500 dark:bg-[oklch(67%_0.175_60)]' },
  'boarding': { label: 'Boarding', className: 'bg-primary-500 dark:bg-[oklch(55%_0.194_262)] animate-pulse' },
  'cancelled': { label: 'Cancelled', className: 'bg-error-500 dark:bg-[oklch(62%_0.228_25)]' },
  'departed': { label: 'Departed', className: 'bg-primary-400 dark:bg-[oklch(60%_0.125_262)]' },
  'arrived': { label: 'Arrived', className: 'bg-success-600 dark:bg-[oklch(55%_0.155_142)]' },
  'diverted': { label: 'Diverted', className: 'bg-error-400 dark:bg-[oklch(68%_0.200_25)]' },
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
                 dark:from-[oklch(20%_0.010_262)] dark:to-[oklch(18%_0.008_262)]
                 rounded-xl p-5 border-2 border-primary-200 dark:border-[oklch(35%_0.030_262)]
                 shadow-md"
      role="status"
      aria-live="polite"
      aria-label={`Flight ${flight.flightNumber} status: ${flight.status}, gate ${flight.gate.number}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
            <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              {flight.airline}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tracking-tight">
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
          <p className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.route.from}
          </p>
          <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
            {flight.departureTime}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 px-4">
          <div className="h-px flex-1 bg-primary-300 dark:bg-[oklch(40%_0.020_262)]" />
          <Plane className="w-4 h-4 text-primary-400 dark:text-[oklch(60%_0.125_262)] rotate-90" aria-hidden="true" />
          <div className="h-px flex-1 bg-primary-300 dark:bg-[oklch(40%_0.020_262)]" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.route.to}
          </p>
          <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
            {flight.arrivalTime}
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="text-center py-3 mb-4 border-y border-primary-200 dark:border-[oklch(30%_0.020_262)]">
        <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mb-1">
          {flight.status === 'boarding' ? 'Boarding Now' : 'Departs in'}
        </p>
        <p className="text-4xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tracking-tight">
          {countdown}
        </p>
        <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-1">
          Boarding starts {flight.gate.boardingStartTime}
        </p>
      </div>

      {/* Gate + seat info */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-[oklch(22%_0.005_262)]">
          <p className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)] uppercase tracking-wider">Gate</p>
          <p className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.gate.number}
          </p>
          {flight.gate.previousGate && (
            <p className="text-[10px] text-warning-600 dark:text-[oklch(58%_0.165_60)] font-medium">
              was {flight.gate.previousGate}
            </p>
          )}
        </div>
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-[oklch(22%_0.005_262)]">
          <p className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)] uppercase tracking-wider">Terminal</p>
          <p className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.terminal}
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/50 dark:bg-[oklch(22%_0.005_262)]">
          <p className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)] uppercase tracking-wider">Seat</p>
          <p className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {flight.seatNumber ?? '—'}
          </p>
        </div>
      </div>

      {/* Boarding progress */}
      {flight.boardingGroup && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-primary-700 dark:text-[oklch(80%_0.005_50)] font-medium">
              Your group: {flight.boardingGroup}
            </span>
            <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              {flight.gate.boardingProgress}% boarded
            </span>
          </div>
          <div className="h-2 bg-primary-200 dark:bg-[oklch(30%_0.020_262)] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 dark:bg-[oklch(55%_0.194_262)] rounded-full transition-all duration-[--duration-normal]"
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
      <div className="flex items-center gap-2 text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{flight.gate.walkingTimeMinutes} min walk to gate</span>
      </div>
    </div>
  );
}
