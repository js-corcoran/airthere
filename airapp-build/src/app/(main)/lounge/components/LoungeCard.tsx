'use client';

import { cn } from '@/lib/utils/cn';
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  ArrowUpCircle,
  XCircle,
  ChevronRight,
  Footprints,
} from 'lucide-react';
import { Lounge } from '../data/mock-lounges';
import { AmenityChip } from './AmenityIcon';

interface LoungeCardProps {
  lounge: Lounge;
  onSelect: (lounge: Lounge) => void;
}

function AccessBadge({ access }: { access: Lounge['access'] }) {
  switch (access.type) {
    case 'included':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
            'bg-success-50 text-success-700',
            'dark:bg-[oklch(18%_0.01_142)] dark:text-success-400'
          )}
        >
          <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
          Included
        </span>
      );
    case 'upgrade':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
            'bg-info-50 text-info-700',
            'dark:bg-[oklch(18%_0.01_252)] dark:text-[oklch(75%_0.12_252)]'
          )}
        >
          <ArrowUpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          ${access.upgradePrice} upgrade
        </span>
      );
    case 'not_available':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
            'bg-surface-200 text-primary-500',
            'dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(60%_0.005_50)]'
          )}
        >
          <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
          Not available
        </span>
      );
  }
}

function CapacityBar({ capacity }: { capacity: Lounge['capacity'] }) {
  const isBusy = capacity.percentage > 70;
  const isModerate = capacity.percentage > 50;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-[10px] mb-1">
        <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]">Capacity</span>
        <span
          className={cn(
            'font-medium',
            isBusy
              ? 'text-error-600 dark:text-[oklch(55%_0.215_25)]'
              : isModerate
                ? 'text-warning-600 dark:text-[oklch(58%_0.165_60)]'
                : 'text-success-600 dark:text-[oklch(65%_0.160_142)]'
          )}
        >
          {capacity.percentage}% full
        </span>
      </div>
      <div
        className="h-1.5 bg-surface-200 dark:bg-[oklch(25%_0.005_50)] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={capacity.percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Lounge capacity: ${capacity.percentage}% full`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-[--duration-normal]',
            isBusy
              ? 'bg-error-500'
              : isModerate
                ? 'bg-warning-500'
                : 'bg-success-500'
          )}
          style={{ width: `${capacity.percentage}%` }}
        />
      </div>
    </div>
  );
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars, ${reviewCount} reviews`}
    >
      <Star className="w-3.5 h-3.5 text-warning-500 fill-warning-500" aria-hidden="true" />
      <span className="text-xs font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
        {rating}
      </span>
      <span className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)]">
        ({reviewCount.toLocaleString()})
      </span>
    </div>
  );
}

export function LoungeCard({ lounge, onSelect }: LoungeCardProps) {
  const topAmenities = lounge.amenities.filter((a) => a.available).slice(0, 4);

  return (
    <article
      className={cn(
        'rounded-[var(--radius-lg)] border overflow-hidden',
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'shadow-[var(--shadow-sm)]',
        'transition-colors duration-[--duration-micro]',
        lounge.access.type === 'included'
          ? 'border-success-200 dark:border-[oklch(35%_0.040_142)]'
          : 'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
    >
      <div className="p-4">
        {/* Header row: name + access badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] truncate">
              {lounge.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin
                className="w-3 h-3 text-primary-500 dark:text-[oklch(70%_0.008_50)] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                {lounge.terminal}, {lounge.gateArea}
              </span>
            </div>
          </div>
          <AccessBadge access={lounge.access} />
        </div>

        {/* Rating + wait time row */}
        <div className="flex items-center gap-4 mb-3">
          <StarRating rating={lounge.rating} reviewCount={lounge.reviewCount} />
          <div className="flex items-center gap-1">
            <Clock
              className="w-3 h-3 text-primary-500 dark:text-[oklch(70%_0.008_50)]"
              aria-hidden="true"
            />
            <span
              className={cn(
                'text-xs font-medium',
                lounge.waitTime === 0
                  ? 'text-success-600 dark:text-[oklch(65%_0.160_142)]'
                  : lounge.waitTime <= 10
                    ? 'text-warning-600 dark:text-[oklch(58%_0.165_60)]'
                    : 'text-error-600 dark:text-[oklch(55%_0.215_25)]'
              )}
            >
              {lounge.waitTime === 0 ? 'No wait' : `${lounge.waitTime} min wait`}
            </span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-3">
          <CapacityBar capacity={lounge.capacity} />
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {topAmenities.map((amenity) => (
            <AmenityChip
              key={amenity.name}
              name={amenity.name}
              available={amenity.available}
              icon={amenity.icon}
            />
          ))}
        </div>

        {/* Footer: walking distance + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-200 dark:border-[oklch(28%_0.005_50)]">
          <div className="flex items-center gap-1.5">
            <Footprints
              className="w-3.5 h-3.5 text-primary-500 dark:text-[oklch(70%_0.008_50)]"
              aria-hidden="true"
            />
            <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              {lounge.walkingDistance}
            </span>
          </div>
          <button
            onClick={() => onSelect(lounge)}
            className={cn(
              'inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-[var(--radius-md)]',
              'text-primary-600 dark:text-[oklch(80%_0.005_50)]',
              'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]'
            )}
            aria-label={`View details for ${lounge.name}`}
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
