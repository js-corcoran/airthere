'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { PersonaType } from '@/lib/types/user';
import { cityToAirportCode } from '@/lib/utils/cityToAirport';

export interface Destination {
  id: string;
  city: string;
  country: string;
  highlights: string[];
  priceFrom: number;
  imageGradient: string;
  persona: PersonaType[];
}

interface DestinationCardProps {
  destination: Destination;
  persona: PersonaType;
}

export function DestinationCard({ destination, persona }: DestinationCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden bg-surface dark:bg-card',
        'border border-surface-300 dark:border-muted',
        'shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]'
      )}
    >
      {/* Image placeholder with gradient */}
      <div
        className={cn(
          'relative h-32 flex items-end p-3',
          destination.imageGradient
        )}
        aria-hidden="true"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center',
            'bg-surface/80 dark:bg-card/80 backdrop-blur-sm',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500'
          )}
          aria-label={saved ? `Remove ${destination.city} from saved` : `Save ${destination.city}`}
          aria-pressed={saved}
        >
          <Heart
            className={cn(
              'w-4 h-4',
              saved ? 'fill-error-500 text-error-500' : 'text-primary-700'
            )}
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-1">
          {destination.city}
        </h3>
        <p className="text-xs text-primary-700 dark:text-caption-foreground mb-2">
          {destination.country}
        </p>

        {/* Highlights based on persona */}
        <ul className="space-y-1 mb-3" role="list">
          {destination.highlights.slice(0, persona === 'family' ? 3 : 2).map((h, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-primary-700 dark:text-soft-foreground">
              <span className="text-success-500 shrink-0 mt-0.5" aria-hidden="true">
                ·
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
            From ${destination.priceFrom.toLocaleString()}
          </span>
          <Link
            href={`${ROUTES.SEARCH}?to=${cityToAirportCode(destination.city) || encodeURIComponent(destination.city)}`}
            className="flex items-center gap-1 text-xs font-medium text-primary-500 dark:text-primary-400
                       hover:text-primary-600 transition-colors duration-[--duration-micro]
                       min-h-[var(--touch-min)] min-w-[var(--touch-min)] justify-end"
            aria-label={`Search flights to ${destination.city}`}
          >
            Search <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
