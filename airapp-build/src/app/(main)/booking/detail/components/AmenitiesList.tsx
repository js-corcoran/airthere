'use client';

import { FlightAmenity } from '@/lib/types/flight';
import { Wifi, Monitor, Utensils, Plug, BedDouble, Crown } from 'lucide-react';

interface AmenitiesListProps {
  amenities: FlightAmenity[];
}

const AMENITY_CONFIG: Record<FlightAmenity, { icon: typeof Wifi; label: string; desc: string }> = {
  wifi: { icon: Wifi, label: 'WiFi', desc: 'In-flight connectivity' },
  entertainment: { icon: Monitor, label: 'Entertainment', desc: 'Seatback screens' },
  meals: { icon: Utensils, label: 'Meals', desc: 'Complimentary meal service' },
  power: { icon: Plug, label: 'Power', desc: 'AC & USB outlets' },
  flatbed: { icon: BedDouble, label: 'Flat Bed', desc: 'Lie-flat seats' },
  'lounge-access': { icon: Crown, label: 'Lounge', desc: 'Airport lounge access' },
};

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3">
        Amenities
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {amenities.map((amenity, i) => {
          const config = AMENITY_CONFIG[amenity];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <div
              key={amenity}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                  {config.label}
                </p>
                <p className="text-[11px] text-primary-400 dark:text-faint-foreground">
                  {config.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
