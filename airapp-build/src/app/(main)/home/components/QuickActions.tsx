'use client';

import { cn } from '@/lib/utils/cn';
import { PersonaType } from '@/lib/types/user';
import { Search, Globe, CalendarDays, Users, Wallet, Armchair, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

interface QuickAction {
  label: string;
  icon: typeof Search;
  href: string;
  color: string;
}

function getQuickActions(persona: PersonaType): QuickAction[] {
  const common: QuickAction[] = [
    { label: 'Search Flights', icon: Search, href: ROUTES.SEARCH, color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' },
    { label: 'My Trips', icon: CalendarDays, href: ROUTES.TRIPS, color: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300' },
  ];

  switch (persona) {
    case 'premium':
      return [
        ...common,
        { label: 'Lounge Finder', icon: Armchair, href: ROUTES.LOUNGE, color: 'bg-info-100 dark:bg-info-900 text-info-600 dark:text-info-300' },
        { label: 'AI Concierge', icon: Sparkles, href: ROUTES.AI_COPILOT, color: 'bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-300' },
      ];
    case 'business':
      return [
        ...common,
        { label: 'Expenses', icon: Wallet, href: ROUTES.PROFILE, color: 'bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-300' },
        { label: 'AI Copilot', icon: Sparkles, href: ROUTES.AI_COPILOT, color: 'bg-info-100 dark:bg-info-900 text-info-600 dark:text-info-300' },
      ];
    case 'family':
      return [
        ...common,
        { label: 'Family Hub', icon: Users, href: ROUTES.FAMILY, color: 'bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-300' },
        { label: 'Explore', icon: Globe, href: ROUTES.DISCOVER, color: 'bg-info-100 dark:bg-info-900 text-info-600 dark:text-info-300' },
      ];
  }
}

interface QuickActionsProps {
  persona: PersonaType;
}

export function QuickActions({ persona }: QuickActionsProps) {
  const actions = getQuickActions(persona);

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={cn(
                'flex flex-col items-center gap-1.5 p-3 rounded-lg',
                'transition-all duration-[--duration-short]',
                'hover:shadow-sm hover:-translate-y-0.5 active:scale-95',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-preferred)]'
              )}
              aria-label={action.label}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  action.color
                )}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-medium text-primary-700 dark:text-muted-foreground text-center leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
