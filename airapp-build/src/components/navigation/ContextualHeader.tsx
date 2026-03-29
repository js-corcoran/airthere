'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const TITLE_MAP: Record<string, string> = {
  '/home': 'AirThere',
  '/discover': 'Discover',
  '/search': 'Search Flights',
  '/search/results': 'Flight Results',
  '/booking/detail': 'Flight Details',
  '/booking/checkout': 'Checkout',
  '/trips': 'My Trips',
  '/profile': 'Profile',
};

interface ContextualHeaderProps {
  title?: string;
  showBack?: boolean;
  className?: string;
}

export function ContextualHeader({ title, showBack, className }: ContextualHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const displayTitle = title ?? TITLE_MAP[pathname ?? ''] ?? 'AirThere';
  const isSubPage = showBack ?? (pathname?.split('/').filter(Boolean).length ?? 0) > 1;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-background/95 dark:bg-[oklch(12%_0.002_50)]/95 backdrop-blur-sm',
        'border-b border-surface-300 dark:border-[oklch(32%_0.008_50)]',
        'pt-[env(safe-area-inset-top)]',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isSubPage && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)] -ml-2
                         rounded-md transition-colors duration-[--duration-micro]
                         hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-primary-700 dark:text-[oklch(85%_0.005_50)]" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] truncate">
            {displayTitle}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)]
                       rounded-md transition-colors duration-[--duration-micro]
                       hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-primary-700 dark:text-[oklch(85%_0.005_50)]" />
          </button>
          <button
            className="flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)]
                       rounded-md transition-colors duration-[--duration-micro]
                       hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-primary-700 dark:text-[oklch(85%_0.005_50)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
