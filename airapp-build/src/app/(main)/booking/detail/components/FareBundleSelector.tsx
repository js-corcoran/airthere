'use client';

import { cn } from '@/lib/utils/cn';
import { FareBundle } from '@/lib/types/flight';
import { Check, X } from 'lucide-react';

interface FareBundleSelectorProps {
  bundles: FareBundle[];
  selectedId: string;
  basePrice: number;
  onChange: (bundleId: string) => void;
}

function FeatureRow({ label, included }: { label: string; included: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1">
      {included ? (
        <Check className="w-3.5 h-3.5 text-success-500 dark:text-success-300 shrink-0" />
      ) : (
        <X className="w-3.5 h-3.5 text-surface-300 dark:text-faint-foreground shrink-0" />
      )}
      <span className={cn(
        'text-xs',
        included
          ? 'text-primary-700 dark:text-soft-foreground'
          : 'text-primary-400 dark:text-faint-foreground line-through'
      )}>
        {label}
      </span>
    </div>
  );
}

export function FareBundleSelector({ bundles, selectedId, basePrice, onChange }: FareBundleSelectorProps) {
  return (
    <div>
      <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3">
        Choose Your Fare
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {bundles.map((bundle, i) => {
          const isSelected = selectedId === bundle.id;
          const isRecommended = bundle.tier === 'standard';
          return (
            <button
              key={bundle.id}
              onClick={() => onChange(bundle.id)}
              style={{ animationDelay: `${i * 60}ms` }}
              className={cn(
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                'relative flex flex-col p-3 rounded-xl border text-left',
                'transition-all duration-[--duration-short]',
                'focus-visible:outline-2 focus-visible:outline-primary-500',
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-surface-primary dark:border-primary-500 ring-1 ring-primary-500 dark:ring-primary-500'
                  : 'border-surface-300 dark:border-input bg-background dark:bg-card hover:border-primary-300 dark:hover:border-primary'
              )}
            >
              {isRecommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-semibold bg-secondary-500 text-white rounded-full whitespace-nowrap">
                  Best Value
                </span>
              )}
              <p className="text-sm font-semibold text-primary-900 dark:text-foreground mb-1">
                {bundle.name}
              </p>
              <p className="text-lg font-bold text-primary-900 dark:text-foreground mb-2 tabular-nums">
                {bundle.price === 0 ? 'Included' : `+$${bundle.price}`}
              </p>
              <div className="space-y-0.5">
                <FeatureRow label="Seat selection" included={bundle.includes.seatSelection} />
                <FeatureRow label={bundle.includes.baggage} included={true} />
                <FeatureRow label="Free changes" included={bundle.includes.changes !== 'Not allowed'} />
                <FeatureRow label="Meals" included={bundle.includes.meals} />
                <FeatureRow label="Lounge access" included={bundle.includes.loungeAccess} />
                <FeatureRow label="Priority boarding" included={bundle.includes.priorityBoarding} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
