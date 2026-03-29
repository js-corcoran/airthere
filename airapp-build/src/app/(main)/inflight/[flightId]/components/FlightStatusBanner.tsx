'use client';

import { cn } from '@/lib/utils/cn';
import { FlightProgress } from '@/lib/types/inflight';
import { Ruler, Thermometer, Clock, Wifi } from 'lucide-react';

interface FlightStatusBannerProps {
  flight: FlightProgress;
}

export function FlightStatusBanner({ flight }: FlightStatusBannerProps) {
  const stats = [
    {
      icon: Ruler,
      label: 'Altitude',
      value: `${flight.current.altitude.toLocaleString()} ft`,
    },
    {
      icon: Thermometer,
      label: 'Cabin',
      value: `${flight.cabinTemp}°C`,
    },
    {
      icon: Clock,
      label: flight.route.toCity,
      value: flight.destinationLocalTime,
    },
    {
      icon: Wifi,
      label: 'WiFi',
      value: `${flight.wifiStrength}/5`,
    },
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-2 p-3 rounded-lg',
        'bg-primary-50 dark:bg-[oklch(18%_0.005_262)]',
        'border border-primary-200 dark:border-[oklch(32%_0.010_262)]'
      )}
      role="status"
      aria-label="Flight quick status"
    >
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col items-center text-center gap-1">
          <Icon className="w-4 h-4 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
          <span className="text-[10px] text-primary-500 dark:text-[oklch(60%_0.005_50)] leading-none">
            {label}
          </span>
          <span className="text-xs font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] font-mono">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
