'use client';

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
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        lounge.hasAccess
          ? 'border-success-200 dark:border-[oklch(35%_0.040_142)]'
          : 'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
    >
      {/* Access indicator */}
      {lounge.hasAccess && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-success-50 dark:bg-[oklch(20%_0.008_142)]">
          <CheckCircle className="w-3.5 h-3.5 text-success-500 dark:text-[oklch(62%_0.165_142)]" aria-hidden="true" />
          <span className="text-xs font-medium text-success-700 dark:text-[oklch(65%_0.160_142)]">
            You have access
          </span>
          {lounge.accessReason && (
            <span className="text-[10px] text-success-600 dark:text-[oklch(55%_0.155_142)]">
              — {lounge.accessReason}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {lounge.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>{lounge.terminal}, near Gate {lounge.nearGate}</span>
              <span aria-hidden="true">·</span>
              <span>{lounge.walkingTimeMinutes} min walk</span>
            </div>
          </div>
          {!lounge.hasAccess && (
            <span className="flex items-center gap-1 text-xs font-medium text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              <Lock className="w-3 h-3" aria-hidden="true" />
              {lounge.accessReason}
            </span>
          )}
        </div>

        {/* Hours + queue */}
        <div className="flex items-center gap-4 mb-3 text-xs">
          <span className="flex items-center gap-1 text-primary-700 dark:text-[oklch(80%_0.005_50)]">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {lounge.hours.open} — {lounge.hours.close}
          </span>
          <span className={cn(
            'flex items-center gap-1 font-medium',
            lounge.queueTimeMinutes <= 5
              ? 'text-success-600 dark:text-[oklch(65%_0.160_142)]'
              : lounge.queueTimeMinutes <= 15
                ? 'text-warning-600 dark:text-[oklch(58%_0.165_60)]'
                : 'text-error-600 dark:text-[oklch(55%_0.215_25)]'
          )}>
            Queue: {lounge.queueTimeMinutes} min
          </span>
        </div>

        {/* Capacity bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]">Capacity</span>
            <span className={cn(
              'font-medium',
              isBusy
                ? 'text-error-600 dark:text-[oklch(55%_0.215_25)]'
                : 'text-primary-600 dark:text-[oklch(75%_0.005_50)]'
            )}>
              {lounge.capacity.current}/{lounge.capacity.max}
            </span>
          </div>
          <div className="h-1.5 bg-surface-200 dark:bg-[oklch(25%_0.005_50)] rounded-full overflow-hidden">
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
                className="flex items-center gap-1 text-[10px] text-primary-600 dark:text-[oklch(75%_0.005_50)]
                           bg-surface-200 dark:bg-[oklch(25%_0.005_50)] px-2 py-1 rounded-full"
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
        <h2 className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          {persona === 'premium' ? 'Your Premium Lounges' : 'Airport Lounges'}
        </h2>
        <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5">
          {accessibleLounges.length > 0
            ? `You have access to ${accessibleLounges.length} lounge${accessibleLounges.length !== 1 ? 's' : ''}`
            : 'Explore available lounges'}
        </p>
      </div>

      {/* Accessible lounges */}
      {accessibleLounges.length > 0 && (
        <div className="space-y-3">
          {accessibleLounges.map((lounge) => (
            <LoungeCard key={lounge.id} lounge={lounge} persona={persona} />
          ))}
        </div>
      )}

      {/* Other lounges */}
      {otherLounges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)]">
            {accessibleLounges.length > 0 ? 'Other Lounges (Paid)' : 'Available Lounges'}
          </h3>
          {otherLounges.map((lounge) => (
            <LoungeCard key={lounge.id} lounge={lounge} persona={persona} />
          ))}
        </div>
      )}
    </section>
  );
}
