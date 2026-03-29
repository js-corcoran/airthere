'use client';

import { cn } from '@/lib/utils/cn';
import { MapPin } from 'lucide-react';
import { AirportWeather } from '../types';

interface AirportHeaderProps {
  airportCode: string;
  airportName: string;
  weather: AirportWeather;
  currentTime: string;
}

export function AirportHeader({ airportCode, airportName, weather, currentTime }: AirportHeaderProps) {
  return (
    <div
      className="bg-gradient-to-r from-primary-600 to-primary-800
                 dark:from-[oklch(30%_0.180_262)] dark:to-[oklch(20%_0.140_262)]
                 px-4 py-4 text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 opacity-80" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold tracking-tight">{airportCode}</h2>
            <p className="text-xs opacity-80">{airportName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-lg" aria-hidden="true">{weather.icon}</span>
            <span className="text-base font-semibold">{weather.temperature}°{weather.unit}</span>
          </div>
          <p className="text-xs opacity-80">{currentTime}</p>
        </div>
      </div>
    </div>
  );
}
