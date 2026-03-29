'use client';

import { cn } from '@/lib/utils/cn';
import { Plane, MapPinned, Armchair, Fingerprint } from 'lucide-react';
import { AirportTab } from '../types';

interface AirportTabsProps {
  activeTab: AirportTab;
  onTabChange: (tab: AirportTab) => void;
}

const TABS: { id: AirportTab; label: string; icon: typeof Plane }[] = [
  { id: 'flight', label: 'Flight', icon: Plane },
  { id: 'wayfinding', label: 'Navigate', icon: MapPinned },
  { id: 'lounges', label: 'Lounges', icon: Armchair },
  { id: 'biometric', label: 'Check-In', icon: Fingerprint },
];

export function AirportTabs({ activeTab, onTabChange }: AirportTabsProps) {
  return (
    <div
      className="flex gap-1 px-4 py-2 border-b border-surface-300 dark:border-[oklch(32%_0.008_50)]
                 bg-surface dark:bg-[oklch(18%_0.003_50)]"
      role="tablist"
      aria-label="Airport experience tabs"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-md',
              'transition-all duration-[--duration-short]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              isActive
                ? 'text-primary-900 dark:text-[oklch(95%_0.002_50)] bg-primary-50 dark:bg-[oklch(25%_0.005_50)]'
                : 'text-primary-400 dark:text-[oklch(60%_0.005_50)] hover:text-primary-700 dark:hover:text-[oklch(85%_0.005_50)]'
            )}
          >
            <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} aria-hidden="true" />
            <span className="text-[10px] font-medium">{tab.label}</span>
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
