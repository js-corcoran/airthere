'use client';

import { cn } from '@/lib/utils/cn';
import { Info } from 'lucide-react';

interface FlightFactsCardProps {
  facts: Array<{ label: string; value: string }>;
}

export function FlightFactsCard({ facts }: FlightFactsCardProps) {
  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-card',
        'border-surface-300 dark:border-muted'
      )}
      aria-label="Flight facts"
    >
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-info-500 dark:text-info-400" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-foreground">
          Flight Facts
        </h2>
      </div>

      <dl className="space-y-2">
        {facts.map(({ label, value }, i) => (
          <div
            key={label}
            className="flex items-center justify-between py-1.5 border-b border-surface-300 dark:border-muted last:border-b-0 opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <dt className="text-xs text-primary-600 dark:text-faint-foreground">
              {label}
            </dt>
            <dd className="text-xs font-medium text-primary-900 dark:text-foreground text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
