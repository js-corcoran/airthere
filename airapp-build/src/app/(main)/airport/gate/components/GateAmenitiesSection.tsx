'use client';

import { cn } from '@/lib/utils/cn';
import { GateAmenity } from '../types';

interface GateAmenitiesSectionProps {
  amenities: GateAmenity[];
  gate: string;
  terminal: string;
}

export function GateAmenitiesSection({ amenities, gate, terminal }: GateAmenitiesSectionProps) {
  return (
    <section aria-labelledby="amenities-heading">
      <div className="flex items-center justify-between mb-3">
        <h3 id="amenities-heading" className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Near Gate {gate}
        </h3>
        <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
          {terminal}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.name}
            className="flex items-center gap-3 p-3 rounded-lg
                       bg-surface dark:bg-[oklch(18%_0.003_50)]
                       border border-surface-300 dark:border-[oklch(32%_0.008_50)]"
          >
            <span className="text-xl shrink-0" aria-hidden="true">{amenity.icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)] truncate">
                {amenity.name}
              </p>
              <p className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                {amenity.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
