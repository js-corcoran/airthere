'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Search, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';

interface TabItem {
  label: string;
  href: string;
  icon: typeof Home;
  matchPaths: string[];
}

const TABS: TabItem[] = [
  { label: 'Home', href: ROUTES.HOME, icon: Home, matchPaths: ['/home'] },
  { label: 'Discover', href: ROUTES.DISCOVER, icon: Compass, matchPaths: ['/discover'] },
  { label: 'Search', href: ROUTES.SEARCH, icon: Search, matchPaths: ['/search'] },
  { label: 'Trips', href: ROUTES.TRIPS, icon: Briefcase, matchPaths: ['/trips', '/booking', '/airport', '/irops', '/inflight', '/family', '/lounge'] },
  { label: 'Profile', href: ROUTES.PROFILE, icon: User, matchPaths: ['/profile', '/settings', '/notifications'] },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-surface dark:bg-[oklch(18%_0.003_50)]
                 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)]
                 shadow-[0_-1px_3px_rgba(0,0,0,0.08)]
                 dark:shadow-[0_-1px_3px_rgba(0,0,0,0.3)]
                 pb-[env(safe-area-inset-bottom)]"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {TABS.map((tab) => {
          const isActive = tab.matchPaths.some((p) => pathname?.startsWith(p));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[var(--touch-min)] min-h-[var(--touch-min)] px-3 py-1',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md',
                isActive
                  ? 'text-secondary-500 dark:text-[oklch(72%_0.158_50)]'
                  : 'text-primary-400 dark:text-[oklch(70%_0.008_50)]'
              )}
            >
              <Icon
                className={cn('w-5 h-5', isActive && 'stroke-[2.5]')}
                aria-hidden="true"
              />
              <span className="text-[10px] font-medium leading-none">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
