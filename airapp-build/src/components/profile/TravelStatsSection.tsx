'use client';

import { Plane, Globe, Map, Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { TravelStats } from '@/lib/types/profile';

interface TravelStatsSectionProps {
  stats: TravelStats;
}

export function TravelStatsSection({ stats }: TravelStatsSectionProps) {
  const statItems = [
    { label: 'Total Trips', value: stats.totalTrips.toLocaleString(), icon: Map },
    { label: 'Flights', value: stats.totalFlights.toLocaleString(), icon: Plane },
    { label: 'Miles Flown', value: `${(stats.totalMiles / 1000).toFixed(0)}k`, icon: Globe },
    { label: 'Countries', value: stats.countriesVisited.toString(), icon: Globe },
  ];

  return (
    <section aria-labelledby="stats-heading" className="space-y-3">
      <h3
        id="stats-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Travel Stats
      </h3>
      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-muted">
        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-surface-200 dark:bg-surface-elevated rounded-[var(--radius-md)] p-3 text-center opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400 mx-auto mb-1" aria-hidden="true" />
                <p className="text-lg font-bold text-primary-800 dark:text-subtle-foreground">
                  {item.value}
                </p>
                <p className="text-[10px] text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Favorites */}
        <div className="space-y-2 border-t border-surface-300 dark:border-muted pt-3">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-error-400 fill-error-400" aria-hidden="true" />
            <span className="text-xs text-primary-500 dark:text-primary-400">Favorite airline:</span>
            <span className="text-xs font-medium text-primary-800 dark:text-subtle-foreground">
              {stats.favoriteAirline}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
            <span className="text-xs text-primary-500 dark:text-primary-400">Top route:</span>
            <span className="text-xs font-medium text-primary-800 dark:text-subtle-foreground">
              {stats.favoriteRoute}
            </span>
          </div>
        </div>

        {/* Year to date */}
        <div className="mt-3 pt-3 border-t border-surface-300 dark:border-muted">
          <p className="text-xs font-medium text-primary-600 dark:text-primary-300 mb-2">
            2026 Year to Date
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-500 dark:text-primary-400">
            <span>{stats.yearToDate.trips} trips</span>
            <span>{(stats.yearToDate.miles / 1000).toFixed(0)}k miles</span>
            <span>${stats.yearToDate.spent.toLocaleString()} spent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
