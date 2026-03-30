'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import {
  Wifi,
  Coffee,
  ShowerHead,
  Utensils,
  Wine,
  Moon,
  Baby,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  Lock,
} from 'lucide-react';
import { AirportLounge } from '../types';
import { PersonaType } from '@/lib/types/user';

interface LoungeSectionProps {
  lounges: AirportLounge[];
  persona: PersonaType;
}

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Food: Utensils,
  'Fine Dining': Utensils,
  Bar: Wine,
  Shower: ShowerHead,
  Spa: ShowerHead,
  'Quiet Zone': Moon,
  'Nap Rooms': Moon,
  'Nap Pods': Moon,
  'Kids Area': Baby,
  'Family Room': Users,
  Snacks: Coffee,
  Drinks: Coffee,
};

function LoungeCard({ lounge, persona }: { lounge: AirportLounge; persona: PersonaType }) {
  const capacityPercent = Math.round((lounge.capacity.current / lounge.capacity.max) * 100);
  const isBusy = capacityPercent > 80;

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden',
        'bg-surface dark:bg-card',
        lounge.hasAccess
          ? 'border-success-200 dark:border-success'
          : 'border-surface-300 dark:border-muted'
      )}
    >
      {/* Access indicator */}
      {lounge.hasAccess && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-success-50 dark:bg-surface-success">
          <CheckCircle className="w-3.5 h-3.5 text-success-500 dark:text-success-500" aria-hidden="true" />
          <span className="text-xs font-medium text-success-700 dark:text-success-400">
            You have access
          </span>
          {lounge.accessReason && (
            <span className="text-[10px] text-success-600 dark:text-success-600">
              — {lounge.accessReason}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-base font-semibold text-primary-900 dark:text-foreground">
              {lounge.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-primary-500 dark:text-caption-foreground">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>{lounge.terminal}, near Gate {lounge.nearGate}</span>
              <span aria-hidden="true">·</span>
              <span>{lounge.walkingTimeMinutes} min walk</span>
            </div>
          </div>
          {!lounge.hasAccess && (
            <span className="flex items-center gap-1 text-xs font-medium text-primary-500 dark:text-caption-foreground">
              <Lock className="w-3 h-3" aria-hidden="true" />
              {lounge.accessReason}
            </span>
          )}
        </div>

        {/* Hours + queue */}
        <div className="flex items-center gap-4 mb-3 text-xs">
          <span className="flex items-center gap-1 text-primary-700 dark:text-soft-foreground">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {lounge.hours.open} — {lounge.hours.close}
          </span>
          <span className={cn(
            'flex items-center gap-1 font-medium',
            lounge.queueTimeMinutes <= 5
              ? 'text-success-600 dark:text-success-400'
              : lounge.queueTimeMinutes <= 15
                ? 'text-warning-600 dark:text-warning-600'
                : 'text-error-600 dark:text-error-600'
          )}>
            Queue: {lounge.queueTimeMinutes} min
          </span>
        </div>

        {/* Capacity bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-primary-500 dark:text-caption-foreground">Capacity</span>
            <span className={cn(
              'font-medium',
              isBusy
                ? 'text-error-600 dark:text-error-600'
                : 'text-primary-600 dark:text-soft-foreground'
            )}>
              {lounge.capacity.current}/{lounge.capacity.max}
            </span>
          </div>
          <div className="h-1.5 bg-surface-200 dark:bg-input rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-[--duration-normal]',
                isBusy ? 'bg-error-500' : capacityPercent > 60 ? 'bg-warning-500' : 'bg-success-500'
              )}
              style={{ width: `${capacityPercent}%` }}
              role="progressbar"
              aria-valuenow={lounge.capacity.current}
              aria-valuemax={lounge.capacity.max}
              aria-label="Lounge capacity"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {lounge.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] ?? Coffee;
            return (
              <span
                key={amenity}
                className="flex items-center gap-1 text-[10px] text-primary-600 dark:text-soft-foreground
                           bg-surface-200 dark:bg-input px-2 py-1 rounded-full"
              >
                <Icon className="w-3 h-3" aria-hidden="true" />
                {amenity}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function LoungeSection({ lounges, persona }: LoungeSectionProps) {
  const accessibleLounges = lounges.filter((l) => l.hasAccess);
  const otherLounges = lounges.filter((l) => !l.hasAccess);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
          {persona === 'premium' ? 'Your Premium Lounges' : 'Airport Lounges'}
        </h2>
        <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
          {accessibleLounges.length > 0
            ? `You have access to ${accessibleLounges.length} lounge${accessibleLounges.length !== 1 ? 's' : ''}`
            : 'Explore available lounges'}
        </p>
      </div>

      {/* Accessible lounges */}
      {accessibleLounges.length > 0 && (
        <div className="space-y-3">
          {accessibleLounges.map((lounge, i) => (
            <div key={lounge.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
              <LoungeCard lounge={lounge} persona={persona} />
            </div>
          ))}
        </div>
      )}

      {/* Other lounges */}
      {otherLounges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-primary-700 dark:text-soft-foreground">
            {accessibleLounges.length > 0 ? 'Other Lounges (Paid)' : 'Available Lounges'}
          </h3>
          {otherLounges.map((lounge, i) => (
            <div key={lounge.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
              <LoungeCard lounge={lounge} persona={persona} />
            </div>
          ))}
        </div>
      )}

      {/* Link to full Lounge Finder */}
      <Link
        href="/lounge"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[var(--radius-md)] border border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-300 text-sm font-medium hover:bg-primary-50 dark:hover:bg-surface-elevated transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        Explore All Lounges
      </Link>
    </section>
  );
}
