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
        <h3 id="amenities-heading" className="text-base font-semibold text-primary-900 dark:text-foreground">
          Near Gate {gate}
        </h3>
        <span className="text-xs text-primary-500 dark:text-caption-foreground">
          {terminal}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {amenities.map((amenity, i) => (
          <div
            key={amenity.name}
            className="flex items-center gap-3 p-3 rounded-lg
                       bg-surface dark:bg-card
                       border border-surface-300 dark:border-muted
                       opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-xl shrink-0" aria-hidden="true">{amenity.icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-primary-900 dark:text-foreground truncate">
                {amenity.name}
              </p>
              <p className="text-[10px] text-primary-500 dark:text-caption-foreground">
                {amenity.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
