'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Clock, Flame, ArrowRight, Bookmark, Plane } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { DealAlert } from '../types';

interface DealAlertCardProps {
  deal: DealAlert;
  onSave?: (id: string) => void;
}

function formatTimeRemaining(expiresAt: Date): string {
  const diff = expiresAt.getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

function formatCabinClass(cabin: string): string {
  return cabin.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const popularityConfig = {
  hot: { icon: Flame, label: 'Hot Deal', className: 'text-error-500 dark:text-error-400' },
  warm: { icon: Flame, label: 'Popular', className: 'text-warning-500 dark:text-warning-500' },
  cool: { icon: Bookmark, label: 'Deal', className: 'text-info-500 dark:text-info-500' },
};

export function DealAlertCard({ deal, onSave }: DealAlertCardProps) {
  const [timeLeft, setTimeLeft] = useState(formatTimeRemaining(deal.expiresAt));
  const [isSaved, setIsSaved] = useState(false);
  const config = popularityConfig[deal.popularity];
  const PopularityIcon = config.icon;
  const discountPercent = Math.round((deal.savings / deal.originalPrice) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(deal.expiresAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [deal.expiresAt]);

  return (
    <div
      className={cn(
        'bg-surface dark:bg-card',
        'rounded-lg border border-surface-300 dark:border-muted',
        'shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]',
        'overflow-hidden'
      )}
    >
      {/* Accent top bar */}
      <div
        className={cn(
          'h-1',
          deal.popularity === 'hot' ? 'bg-error-500' : deal.popularity === 'warm' ? 'bg-warning-500' : 'bg-info-500'
        )}
        aria-hidden="true"
      />

      <div className="p-4">
        {/* Header: route + popularity */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-semibold text-primary-900 dark:text-foreground">
                {deal.route.fromCity}
              </span>
              <ArrowRight className="w-4 h-4 text-primary-400 dark:text-faint-foreground" aria-label="to" />
              <span className="text-base font-semibold text-primary-900 dark:text-foreground">
                {deal.route.toCity}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-500 dark:text-caption-foreground">
              <Plane className="w-3 h-3" aria-hidden="true" />
              <span>{deal.airline}</span>
              <span aria-hidden="true">·</span>
              <span>{formatCabinClass(deal.cabinClass)}</span>
            </div>
          </div>

          <span className={cn('flex items-center gap-1 text-xs font-bold', config.className)}>
            <PopularityIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {config.label}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-3 mb-3">
          <span className="text-sm text-primary-400 dark:text-faint-foreground line-through">
            ${deal.originalPrice.toLocaleString()}
          </span>
          <span className="text-2xl font-bold text-success-600 dark:text-success-400">
            ${deal.discountedPrice.toLocaleString()}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-success-50 dark:bg-surface-success text-success-700 dark:text-success-400 text-xs font-bold">
            Save {discountPercent}%
          </span>
        </div>

        {/* Date range */}
        <p className="text-xs text-primary-700 dark:text-soft-foreground mb-3">
          {deal.route.from} → {deal.route.to} · {deal.departDate}
          {deal.returnDate ? ` — ${deal.returnDate}` : ' · One way'}
        </p>

        {/* Expiration + actions */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-200 dark:border-input">
          <span className={cn(
            'flex items-center gap-1.5 text-xs font-medium',
            timeLeft === 'Expired'
              ? 'text-error-500 dark:text-error-400'
              : 'text-warning-600 dark:text-warning-600'
          )}>
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {timeLeft}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                onSave?.(deal.id);
              }}
              className={cn(
                'px-3 py-2 rounded-md text-xs font-medium transition-colors duration-[--duration-short]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                isSaved
                  ? 'bg-primary-100 dark:bg-surface-primary text-primary-700 dark:text-soft-foreground'
                  : 'bg-surface-200 dark:bg-input text-primary-700 dark:text-muted-foreground hover:bg-surface-300 dark:hover:bg-muted'
              )}
              aria-label={isSaved ? 'Saved' : 'Save deal'}
              aria-pressed={isSaved}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <Link
              href={ROUTES.SEARCH}
              className="px-4 py-2 rounded-md text-xs font-medium bg-secondary-500 dark:bg-secondary-500
                         text-white hover:bg-secondary-600 dark:hover:bg-secondary-600
                         transition-colors duration-[--duration-short]
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                         min-h-[var(--touch-min)] flex items-center"
              aria-label={`Book flight from ${deal.route.fromCity} to ${deal.route.toCity} for $${deal.discountedPrice}`}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
