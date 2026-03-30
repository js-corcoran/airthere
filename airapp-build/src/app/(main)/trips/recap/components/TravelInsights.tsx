'use client';

import { Plane, Globe, MapPin, Moon, Clock } from 'lucide-react';
import type { TripRecapData } from '../data/mock-recap';

interface TravelInsightsProps {
  insights: TripRecapData['insights'];
}

const ICON_MAP: Record<string, React.ElementType> = {
  plane: Plane,
  globe: Globe,
  'map-pin': MapPin,
  moon: Moon,
  clock: Clock,
};

export function TravelInsights({ insights }: TravelInsightsProps) {
  return (
    <section aria-labelledby="insights-heading" className="space-y-3">
      <h3
        id="insights-heading"
        className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]"
      >
        Travel Insights
      </h3>

      <div
        className="grid grid-cols-2 gap-3"
        role="list"
        aria-label="Trip statistics"
      >
        {insights.map((stat, idx) => {
          const Icon = ICON_MAP[stat.icon] || Plane;
          // Last item spans full width if odd count
          const isLast = idx === insights.length - 1;
          const isOddTotal = insights.length % 2 !== 0;

          return (
            <div
              key={stat.label}
              role="listitem"
              className={`bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] p-4 flex flex-col items-center text-center opacity-0 animate-[cardEnter_0.4s_ease-out_forwards] ${
                isLast && isOddTotal ? 'col-span-2' : ''
              }`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-[oklch(20%_0.01_262)] flex items-center justify-center mb-2">
                <Icon
                  className="w-5 h-5 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)]">
                {stat.label}
              </p>
              {stat.detail && (
                <p className="text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5">
                  {stat.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
