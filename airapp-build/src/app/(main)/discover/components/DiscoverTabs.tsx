'use client';

import { cn } from '@/lib/utils/cn';
import { DiscoverTab } from '../types';

interface DiscoverTabsProps {
  activeTab: DiscoverTab;
  onTabChange: (tab: DiscoverTab) => void;
  wishlistCount: number;
}

const TABS: { id: DiscoverTab; label: string }[] = [
  { id: 'recommended', label: 'For You' },
  { id: 'trending', label: 'Trending' },
  { id: 'deals', label: 'Deals' },
  { id: 'wishlist', label: 'Wishlist' },
];

export function DiscoverTabs({ activeTab, onTabChange, wishlistCount }: DiscoverTabsProps) {
  return (
    <div
      className="flex gap-1 px-4 py-2 border-b border-surface-300 dark:border-[oklch(32%_0.008_50)]
                 bg-surface dark:bg-[oklch(18%_0.003_50)]"
      role="tablist"
      aria-label="Discover tabs"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative flex-1 py-2.5 px-3 text-sm font-medium rounded-md',
              'transition-all duration-[--duration-short]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              isActive
                ? 'text-primary-900 dark:text-[oklch(95%_0.002_50)] bg-primary-50 dark:bg-[oklch(25%_0.005_50)]'
                : 'text-primary-500 dark:text-[oklch(70%_0.008_50)] hover:text-primary-700 dark:hover:text-[oklch(85%_0.005_50)]'
            )}
          >
            {tab.label}
            {tab.id === 'wishlist' && wishlistCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center
                           bg-error-500 text-white text-[10px] font-bold rounded-full"
                aria-label={`${wishlistCount} saved`}
              >
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
            {tab.id === 'deals' && (
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success-500 rounded-full"
                aria-hidden="true"
              />
            )}
            {isActive && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-secondary-500 dark:bg-[oklch(72%_0.158_50)] rounded-full"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
