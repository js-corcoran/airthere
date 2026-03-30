'use client';

import { CheckCircle, ArrowRight, Clock, Plane, DollarSign, Users, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AutomaticRebookingOption } from '@/lib/types/disruption';

interface AutomaticRebookingProps {
  rebooking: AutomaticRebookingOption;
  onSelect: () => void;
  onDecline: () => void;
  isSelected: boolean;
}

export function AutomaticRebooking({ rebooking, onSelect, onDecline, isSelected }: AutomaticRebookingProps) {
  const { recommendedFlight, comparison, noAdditionalCost, familyIntegrityMaintained } = rebooking;

  return (
    <section aria-labelledby="auto-rebook-heading" className="space-y-3">
      <h3
        id="auto-rebook-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Recommended Rebooking
      </h3>
      <div className={cn(
        'rounded-[var(--radius-lg)] p-4 border-2 transition-all duration-[--duration-micro]',
        isSelected
          ? 'bg-success-50 dark:bg-surface-success border-success-500 dark:border-success-400'
          : 'bg-success-50 dark:bg-surface-success border-success-400 dark:border-success-600'
      )}>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
          <span className="font-bold text-success-800 dark:text-success-200">
            {rebooking.isPreApproved ? "We've rebooked you" : "We've found you a better flight"}
          </span>
        </div>

        {/* Flight details */}
        <div className="bg-white/60 dark:bg-surface-elevated rounded-[var(--radius-md)] p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-primary-800 dark:text-subtle-foreground">
              {recommendedFlight.flightNumber}
            </span>
            <span className="text-xs text-primary-500 dark:text-primary-400">
              {recommendedFlight.airline}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex-1">
              <p className="font-semibold text-primary-900 dark:text-foreground">
                {recommendedFlight.departure.time}
              </p>
              <p className="text-xs text-primary-500 dark:text-primary-400">
                {recommendedFlight.departure.airport}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400">
                {recommendedFlight.departure.date}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 px-2">
              <Plane className="w-4 h-4 text-primary-600 dark:text-primary-400 rotate-90" aria-hidden="true" />
              <span className="text-xs text-primary-600 dark:text-primary-400">
                {Math.floor(recommendedFlight.duration / 60)}h {recommendedFlight.duration % 60}m
              </span>
              <span className="text-xs text-primary-600 dark:text-primary-400">
                {recommendedFlight.stops === 0 ? 'Nonstop' : `${recommendedFlight.stops} stop`}
              </span>
            </div>

            <div className="flex-1 text-right">
              <p className="font-semibold text-primary-900 dark:text-foreground">
                {recommendedFlight.arrival.time}
              </p>
              <p className="text-xs text-primary-500 dark:text-primary-400">
                {recommendedFlight.arrival.airport}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400">
                {recommendedFlight.arrival.date}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <CompareBadge
            icon={<Clock className="w-3.5 h-3.5" aria-hidden="true" />}
            text={comparison.timeDifference}
          />
          {comparison.cabinClassMaintained && (
            <CompareBadge
              icon={<Plane className="w-3.5 h-3.5" aria-hidden="true" />}
              text={`${recommendedFlight.cabinClass} class maintained`}
            />
          )}
          {noAdditionalCost && (
            <CompareBadge
              icon={<DollarSign className="w-3.5 h-3.5" aria-hidden="true" />}
              text="No additional cost"
            />
          )}
          {familyIntegrityMaintained && (
            <CompareBadge
              icon={<Users className="w-3.5 h-3.5" aria-hidden="true" />}
              text="Family seating maintained"
            />
          )}
        </div>

        {/* Action buttons — change based on selection state */}
        {isSelected ? (
          <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-success-100 dark:bg-success-900/40 border border-success-300 dark:border-success-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
              <span className="text-sm font-bold text-success-700 dark:text-success-300">
                Flight Selected
              </span>
            </div>
            <button
              onClick={onDecline}
              className="flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200 transition-colors min-h-[var(--touch-min)]"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              Change
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSelect}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)]',
                'bg-success-600 hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600',
                'text-white font-bold text-sm',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-preferred)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-500',
              )}
              aria-label="Select this flight"
            >
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              Select This Flight
            </button>
            <button
              onClick={onDecline}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)]',
                'bg-transparent border border-primary-300 dark:border-primary-600',
                'text-primary-700 dark:text-primary-300 font-medium text-sm',
                'hover:bg-primary-50 dark:hover:bg-surface-elevated',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-preferred)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              View Other Options
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function CompareBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-success-100 dark:bg-surface-success px-3 py-2 rounded-[var(--radius-md)] text-success-800 dark:text-success-200">
      {icon}
      <span className="text-xs font-medium capitalize">{text}</span>
    </div>
  );
}
