'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Heart, ArrowRight, TrendingUp, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { PersonaType } from '@/lib/types/user';
import { DiscoverDestination } from '../types';

interface DiscoverDestinationCardProps {
  destination: DiscoverDestination;
  persona: PersonaType;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  variant?: 'grid' | 'featured';
}

export function DiscoverDestinationCard({
  destination,
  persona,
  isSaved,
  onToggleSave,
  variant = 'grid',
}: DiscoverDestinationCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden bg-surface dark:bg-card',
        'border border-surface-300 dark:border-muted',
        'shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]',
        isFeatured && 'col-span-2'
      )}
    >
      {/* Image area with gradient */}
      <div
        className={cn(
          'relative flex items-end p-3',
          destination.imageGradient,
          isFeatured ? 'h-48' : 'h-32'
        )}
        aria-hidden="true"
      >
        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(destination.id);
          }}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center',
            'bg-surface/80 dark:bg-card/80 backdrop-blur-sm',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500'
          )}
          aria-label={isSaved ? `Remove ${destination.city} from wishlist` : `Save ${destination.city} to wishlist`}
          aria-pressed={isSaved}
        >
          <Heart
            className={cn(
              'w-4 h-4',
              isSaved ? 'fill-error-500 text-error-500' : 'text-primary-700'
            )}
          />
        </button>

        {/* Deal badge */}
        {destination.dealBadge && (
          <span className="absolute top-2 left-2 bg-warning-500 dark:bg-warning-500 text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm">
            <Clock className="w-3 h-3" aria-hidden="true" />
            Save ${destination.dealBadge.discount}
          </span>
        )}

        {/* Trending badge */}
        {destination.trendingRank && destination.trendingRank <= 5 && !destination.dealBadge && (
          <span className="absolute top-2 left-2 bg-success-500 dark:bg-success-500 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
            #{destination.trendingRank}
          </span>
        )}

        {/* Rating badge */}
        <span className="bg-overlay-dark backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          ★ {destination.rating}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground truncate">
              {destination.city}
            </h3>
            <p className="text-xs text-primary-500 dark:text-caption-foreground">
              {destination.country}
            </p>
          </div>
        </div>

        {/* Personalization reason */}
        {destination.personalizationReason && (
          <p className="flex items-center gap-1 text-[10px] text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
            <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{destination.personalizationReason}</span>
          </p>
        )}

        {/* Highlights */}
        <ul className="space-y-1 mb-3" role="list">
          {destination.highlights.slice(0, persona === 'family' ? 3 : 2).map((h, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-primary-700 dark:text-soft-foreground">
              <span className="text-success-500 shrink-0 mt-0.5" aria-hidden="true">·</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Price + action */}
        <div className="flex items-center justify-between">
          <div>
            {destination.dealBadge ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-400 dark:text-faint-foreground line-through">
                  ${destination.dealBadge.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-success-600 dark:text-success-400">
                  ${destination.dealBadge.discountedPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
                {persona === 'family' ? `From $${(destination.priceFrom * 4).toLocaleString()}` : `From $${destination.priceFrom.toLocaleString()}`}
              </span>
            )}
            {persona === 'family' && !destination.dealBadge && (
              <span className="block text-[10px] text-primary-400 dark:text-faint-foreground">
                family of 4
              </span>
            )}
          </div>
          <Link
            href={`${ROUTES.SEARCH}?to=${encodeURIComponent(destination.city)}`}
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
