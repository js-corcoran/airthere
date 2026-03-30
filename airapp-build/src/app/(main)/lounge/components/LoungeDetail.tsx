'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  X,
  Star,
  Clock,
  MapPin,
  Users,
  Footprints,
  Navigation,
  CalendarCheck,
  CheckCircle,
  ArrowUpCircle,
  XCircle,
} from 'lucide-react';
import { Lounge } from '../data/mock-lounges';
import { AmenityIcon } from './AmenityIcon';

interface LoungeDetailProps {
  lounge: Lounge;
  onClose: () => void;
}

export function LoungeDetail({ lounge, onClose }: LoungeDetailProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();
    // Prevent body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [handleKeyDown]);

  const isBusy = lounge.capacity.percentage > 70;
  const isModerate = lounge.capacity.percentage > 50;

  const accessIcon = {
    included: CheckCircle,
    upgrade: ArrowUpCircle,
    not_available: XCircle,
  }[lounge.access.type];
  const AccessIcon = accessIcon;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-overlay-dark"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${lounge.name} details`}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto',
          'bg-surface dark:bg-background',
          'rounded-t-[20px] shadow-[var(--shadow-md)]',
          'animate-in slide-in-from-bottom duration-300'
        )}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-300 dark:bg-muted" />
        </div>

        {/* Hero gradient */}
        <div
          className={cn(
            'relative px-4 pt-2 pb-4',
            lounge.access.type === 'included'
              ? 'bg-gradient-to-b from-success-50/50 to-transparent dark:from-surface-success/30 dark:to-transparent'
              : lounge.access.type === 'upgrade'
                ? 'bg-gradient-to-b from-info-50/50 to-transparent dark:from-surface-info/30 dark:to-transparent'
                : ''
          )}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className={cn(
              'absolute right-4 top-2 p-2 rounded-full',
              'bg-surface-200 dark:bg-input',
              'text-primary-700 dark:text-muted-foreground',
              'hover:bg-surface-300 dark:hover:bg-muted',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)] min-w-[var(--touch-min)]'
            )}
            aria-label="Close lounge details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Name + rating */}
          <h2 className="text-xl font-bold text-primary-900 dark:text-foreground pr-12">
            {lounge.name}
          </h2>
          <div
            className="flex items-center gap-1.5 mt-1"
            aria-label={`${lounge.rating} out of 5 stars, ${lounge.reviewCount} reviews`}
          >
            <Star className="w-4 h-4 text-warning-500 fill-warning-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary-900 dark:text-foreground">
              {lounge.rating}
            </span>
            <span className="text-xs text-primary-700 dark:text-caption-foreground">
              ({lounge.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Access badge */}
          <div className="flex items-center gap-2 mt-3">
            <AccessIcon
              className={cn(
                'w-4 h-4 flex-shrink-0',
                lounge.access.type === 'included'
                  ? 'text-success-600 dark:text-success-500'
                  : lounge.access.type === 'upgrade'
                    ? 'text-info-600 dark:text-info-400'
                    : 'text-primary-600 dark:text-faint-foreground'
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                'text-sm font-medium',
                lounge.access.type === 'included'
                  ? 'text-success-700 dark:text-success-400'
                  : lounge.access.type === 'upgrade'
                    ? 'text-info-700 dark:text-info-300'
                    : 'text-primary-600 dark:text-faint-foreground'
              )}
            >
              {lounge.access.type === 'included' && 'Access included'}
              {lounge.access.type === 'upgrade' &&
                `$${lounge.access.upgradePrice} upgrade available`}
              {lounge.access.type === 'not_available' && 'Access not available'}
              {' — '}
              {lounge.access.reason}
            </span>
          </div>
        </div>

        <div className="px-4 pb-24 space-y-5">
          {/* Description */}
          <p className="text-sm leading-relaxed text-primary-700 dark:text-muted-foreground">
            {lounge.description}
          </p>

          {/* Operating hours */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
                'bg-surface-200 dark:bg-input'
              )}
            >
              <Clock
                className="w-4.5 h-4.5 text-primary-600 dark:text-soft-foreground"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                Operating Hours
              </p>
              <p className="text-xs text-primary-700 dark:text-caption-foreground">
                {lounge.hours.open} - {lounge.hours.close}
              </p>
            </div>
          </div>

          {/* Real-time capacity */}
          <div>
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-2">
              Real-Time Capacity
            </h3>
            <div
              className={cn(
                'p-3 rounded-[var(--radius-md)]',
                'bg-surface-100 dark:bg-surface-100'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary-700 dark:text-caption-foreground">
                  {lounge.capacity.current} / {lounge.capacity.max} seats occupied
                </span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    isBusy
                      ? 'text-error-600 dark:text-error-600'
                      : isModerate
                        ? 'text-warning-600 dark:text-warning-600'
                        : 'text-success-600 dark:text-success-400'
                  )}
                >
                  {lounge.capacity.percentage}%
                </span>
              </div>
              <div
                className="h-2 bg-surface-200 dark:bg-input rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={lounge.capacity.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Lounge is ${lounge.capacity.percentage}% full`}
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
                  style={{ width: `${lounge.capacity.percentage}%` }}
                />
              </div>
              {lounge.waitTime > 0 && (
                <p className="text-xs text-warning-600 dark:text-warning-600 mt-2">
                  Estimated wait: {lounge.waitTime} minutes
                </p>
              )}
            </div>
          </div>

          {/* Full amenities grid */}
          <div>
            <h3 className="text-sm font-semibold text-primary-900 dark:text-foreground mb-3">
              Amenities
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {lounge.amenities.map((amenity) => (
                <AmenityIcon
                  key={amenity.name}
                  name={amenity.name}
                  available={amenity.available}
                  icon={amenity.icon}
                  size="md"
                />
              ))}
            </div>
          </div>

          {/* Guest policy */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
                'bg-surface-200 dark:bg-input'
              )}
            >
              <Users
                className="w-4.5 h-4.5 text-primary-600 dark:text-soft-foreground"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                Guest Policy
              </p>
              <p className="text-xs text-primary-700 dark:text-caption-foreground">
                {lounge.guestPolicy.allowed
                  ? `Up to ${lounge.guestPolicy.maxGuests} guest${lounge.guestPolicy.maxGuests !== 1 ? 's' : ''} allowed`
                  : 'No guests permitted'}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
                'bg-surface-200 dark:bg-input'
              )}
            >
              <MapPin
                className="w-4.5 h-4.5 text-primary-600 dark:text-soft-foreground"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                {lounge.terminal}, {lounge.gateArea}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Footprints
                  className="w-3 h-3 text-primary-700 dark:text-caption-foreground"
                  aria-hidden="true"
                />
                <span className="text-xs text-primary-700 dark:text-caption-foreground">
                  {lounge.walkingDistance} from your gate
                </span>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)]',
                'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
                'text-white text-sm font-semibold',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-preferred)]'
              )}
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              Go There Now
            </button>
            <button
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)]',
                'bg-secondary-500 hover:bg-secondary-600',
                'text-white text-sm font-semibold',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-preferred)]'
              )}
            >
              <CalendarCheck className="w-4 h-4" aria-hidden="true" />
              Reserve Seating
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
