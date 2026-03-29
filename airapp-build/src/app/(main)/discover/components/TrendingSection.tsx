'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { TrendingRegion, TrendingDestinationSummary } from '../types';
import { PersonaType } from '@/lib/types/user';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

interface TrendingSectionProps {
  regions: TrendingRegion[];
  persona: PersonaType;
}

const heatColors = {
  hot: {
    bg: 'bg-error-50 dark:bg-[oklch(20%_0.008_25)]',
    border: 'border-error-200 dark:border-[oklch(35%_0.060_25)]',
    text: 'text-error-600 dark:text-[oklch(68%_0.200_25)]',
    badge: 'bg-error-500 text-white',
    label: 'Hot',
  },
  warm: {
    bg: 'bg-warning-50 dark:bg-[oklch(20%_0.005_60)]',
    border: 'border-warning-200 dark:border-[oklch(35%_0.040_60)]',
    text: 'text-warning-600 dark:text-[oklch(58%_0.165_60)]',
    badge: 'bg-warning-500 text-white',
    label: 'Warm',
  },
  cool: {
    bg: 'bg-info-50 dark:bg-[oklch(20%_0.002_240)]',
    border: 'border-info-200 dark:border-[oklch(35%_0.020_240)]',
    text: 'text-info-600 dark:text-[oklch(55%_0.160_240)]',
    badge: 'bg-info-500 text-white',
    label: 'Cool',
  },
};

const sentimentIcons = {
  rising: { icon: TrendingUp, className: 'text-success-500 dark:text-[oklch(62%_0.165_142)]', label: 'Rising' },
  stable: { icon: Minus, className: 'text-primary-400 dark:text-[oklch(60%_0.005_50)]', label: 'Stable' },
  falling: { icon: TrendingDown, className: 'text-error-500 dark:text-[oklch(68%_0.200_25)]', label: 'Falling' },
};

function TrendingDestinationRow({ dest }: { dest: TrendingDestinationSummary }) {
  const sentiment = sentimentIcons[dest.sentiment];
  const SentimentIcon = sentiment.icon;

  return (
    <Link
      href={ROUTES.SEARCH}
      className="flex items-center gap-3 py-2.5 px-3 rounded-md
                 hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                 transition-colors duration-[--duration-micro]
                 min-h-[var(--touch-min)]
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      aria-label={`Search flights to ${dest.city}, ${dest.country} — ${sentiment.label} — from $${dest.priceFrom}`}
    >
      {/* Mini gradient thumbnail */}
      <div
        className={cn('w-10 h-10 rounded-md shrink-0', dest.imageGradient)}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)] truncate">
          {dest.city}
        </p>
        <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
          {dest.country}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <SentimentIcon className={cn('w-4 h-4', sentiment.className)} aria-hidden="true" />
        <span className="text-sm font-semibold text-secondary-600 dark:text-[oklch(72%_0.158_50)]">
          ${dest.priceFrom.toLocaleString()}
        </span>
        <ChevronRight className="w-4 h-4 text-primary-300 dark:text-[oklch(50%_0.005_50)]" aria-hidden="true" />
      </div>
    </Link>
  );
}

function RegionCard({ region, isExpanded, onToggle }: { region: TrendingRegion; isExpanded: boolean; onToggle: () => void }) {
  const heat = heatColors[region.heat];

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden transition-all duration-[--duration-short]',
        heat.bg,
        heat.border
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'min-h-[var(--touch-min)]'
        )}
        aria-expanded={isExpanded}
        aria-controls={`region-${region.id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{region.icon}</span>
          <div className="text-left">
            <h3 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {region.name}
            </h3>
            <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              {region.destinations.length} destinations · {(region.searchVolume / 1000).toFixed(0)}k searches
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', heat.badge)}>
            {heat.label}
          </span>
          <ChevronRight
            className={cn(
              'w-5 h-5 text-primary-400 dark:text-[oklch(60%_0.005_50)] transition-transform duration-[--duration-short]',
              isExpanded && 'rotate-90'
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {isExpanded && (
        <div
          id={`region-${region.id}`}
          role="region"
          aria-label={`${region.name} trending destinations`}
          className="px-2 pb-2 border-t border-surface-300/50 dark:border-[oklch(32%_0.008_50)]/50"
        >
          {region.destinations.map((dest) => (
            <TrendingDestinationRow key={dest.city} dest={dest} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TrendingSection({ regions, persona }: TrendingSectionProps) {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(regions[0]?.id ?? null);

  const sortedRegions = [...regions].sort((a, b) => b.trendScore - a.trendScore);

  return (
    <div className="space-y-3">
      {/* Trending header */}
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {persona === 'business' ? 'Trending Business Routes' : 'Trending Destinations'}
          </h2>
          <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5">
            Based on search trends this week
          </p>
        </div>
      </div>

      {/* Region cards */}
      <div className="px-4 space-y-3">
        {sortedRegions.map((region) => (
          <RegionCard
            key={region.id}
            region={region}
            isExpanded={expandedRegion === region.id}
            onToggle={() => setExpandedRegion(expandedRegion === region.id ? null : region.id)}
          />
        ))}
      </div>
    </div>
  );
}
