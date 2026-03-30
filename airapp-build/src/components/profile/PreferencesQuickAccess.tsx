'use client';

import { ChevronRight, Utensils, Accessibility, Bell, Globe } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ProfilePreferences } from '@/lib/types/profile';

interface PreferencesQuickAccessProps {
  preferences: ProfilePreferences;
}

export function PreferencesQuickAccess({ preferences }: PreferencesQuickAccessProps) {
  const items = [
    {
      icon: Utensils,
      label: 'Dietary',
      value: preferences.dietary || 'Not set',
    },
    {
      icon: Accessibility,
      label: 'Accessibility',
      value: preferences.accessibility.length > 0 ? preferences.accessibility.join(', ') : 'None specified',
    },
    {
      icon: Bell,
      label: 'Notifications',
      value: preferences.communication.join(', ') || 'Not set',
    },
    {
      icon: Globe,
      label: 'Language',
      value: preferences.language,
    },
  ];

  return (
    <section aria-labelledby="preferences-heading" className="space-y-3">
      <h3
        id="preferences-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Preferences
      </h3>
      <div className="bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] divide-y divide-surface-300 dark:divide-[oklch(32%_0.008_50)]">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              style={{ animationDelay: `${i * 60}ms` }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left',
                'hover:bg-surface-200 dark:hover:bg-[oklch(22%_0.005_50)]',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-preferred)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'first:rounded-t-[var(--radius-lg)] last:rounded-b-[var(--radius-lg)]',
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
              )}
              aria-label={`${item.label}: ${item.value}`}
            >
              <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                  {item.label}
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400 truncate capitalize">
                  {item.value}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary-400 dark:text-primary-500 shrink-0" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
