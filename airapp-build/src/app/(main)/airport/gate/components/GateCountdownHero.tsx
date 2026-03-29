'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Plane, ArrowRight, AlertTriangle } from 'lucide-react';
import { GateBoardingInfo } from '../types';

interface GateCountdownHeroProps {
  info: GateBoardingInfo;
}

const statusConfig = {
  on_time: { label: 'On Time', className: 'bg-success-500/20 text-success-100', dot: 'bg-success-400' },
  delayed: { label: 'Delayed', className: 'bg-warning-500/20 text-warning-100', dot: 'bg-warning-400 animate-pulse' },
  boarding: { label: 'Now Boarding', className: 'bg-white/20 text-white animate-pulse', dot: 'bg-white animate-pulse' },
  boarding_complete: { label: 'Boarding Complete', className: 'bg-primary-400/20 text-primary-100', dot: 'bg-primary-300' },
  departed: { label: 'Departed', className: 'bg-primary-400/20 text-primary-100', dot: 'bg-primary-300' },
};

function useCountdown(targetTime: string): string {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    function calcDiff() {
      const now = new Date();
      const timePart = targetTime.replace(' +1', '');
      const [time, period] = timePart.split(' ');
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

export function GateCountdownHero({ info }: GateCountdownHeroProps) {
  const countdown = useCountdown(info.estimatedTime);
  const status = statusConfig[info.status];

  return (
    <div
      className="bg-gradient-to-b from-primary-600 to-primary-800
                 dark:from-[oklch(35%_0.180_262)] dark:to-[oklch(22%_0.140_262)]
                 rounded-xl p-6 text-white shadow-lg"
      role="status"
      aria-live="polite"
      aria-label={`Flight ${info.flightNumber}, gate ${info.gate}, ${status.label}`}
    >
      {/* Route display */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 opacity-70" aria-hidden="true" />
          <span className="text-sm opacity-80">{info.airline}</span>
        </div>
        <span className={cn('flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold', status.className)}>
          <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} aria-hidden="true" />
          {status.label}
        </span>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-1">{info.flightNumber}</h2>

      <div className="flex items-center gap-3 mb-4 text-sm opacity-90">
        <span>{info.route.fromCity} ({info.route.from})</span>
        <ArrowRight className="w-4 h-4" aria-label="to" />
        <span>{info.route.toCity} ({info.route.to})</span>
      </div>

      {/* Large countdown */}
      <div className="text-center py-4 border-y border-white/20 mb-4">
        <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
          {info.status === 'boarding' ? 'Boarding in progress' : 'Departs in'}
        </p>
        <p className="text-5xl font-bold tracking-tight font-mono">
          {countdown}
        </p>
        {info.delayMinutes > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-2 text-warning-300">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-xs font-medium">
              Delayed {info.delayMinutes} min · Est. {info.estimatedTime}
            </span>
          </div>
        )}
      </div>

      {/* Gate + seat grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 rounded-lg bg-white/10">
          <p className="text-[10px] uppercase tracking-wider opacity-70">Gate</p>
          <p className="text-xl font-bold">{info.gate}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/10">
          <p className="text-[10px] uppercase tracking-wider opacity-70">Terminal</p>
          <p className="text-xl font-bold">{info.terminal}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/10">
          <p className="text-[10px] uppercase tracking-wider opacity-70">Seat</p>
          <p className="text-xl font-bold">{info.seatNumber}</p>
        </div>
      </div>
    </div>
  );
}
