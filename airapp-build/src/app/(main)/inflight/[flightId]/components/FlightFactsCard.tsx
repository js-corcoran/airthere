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
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="Flight facts"
    >
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-info-500 dark:text-info-400" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Flight Facts
        </h2>
      </div>

      <dl className="space-y-2">
        {facts.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-1.5 border-b border-surface-300 dark:border-[oklch(32%_0.008_50)] last:border-b-0"
          >
            <dt className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
              {label}
            </dt>
            <dd className="text-xs font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)] text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
