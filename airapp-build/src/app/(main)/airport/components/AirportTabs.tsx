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
      className="flex gap-1 px-4 py-2 border-b border-surface-300 dark:border-muted
                 bg-surface dark:bg-card"
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
              'relative flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-md',
              'transition-all duration-[--duration-short]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              isActive
                ? 'text-primary-900 dark:text-foreground bg-primary-50 dark:bg-input'
                : 'text-primary-600 dark:text-faint-foreground hover:text-primary-700 dark:hover:text-muted-foreground'
            )}
          >
            <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} aria-hidden="true" />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-secondary-500 dark:bg-secondary-400 rounded-full"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
