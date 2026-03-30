'use client';

import { cn } from '@/lib/utils/cn';
import type { AppNotification } from '../data/mock-notifications';

export type FilterCategory = 'all' | 'flights' | 'loyalty' | 'tips' | 'updates';

interface NotificationFiltersProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  notifications: AppNotification[];
}

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Flights', value: 'flights' },
  { label: 'Loyalty', value: 'loyalty' },
  { label: 'Tips', value: 'tips' },
  { label: 'Updates', value: 'updates' },
];

export function NotificationFilters({
  activeFilter,
  onFilterChange,
  notifications,
}: NotificationFiltersProps) {
  function getUnreadCount(category: FilterCategory): number {
    if (category === 'all') {
      return notifications.filter((n) => !n.isRead).length;
    }
    return notifications.filter(
      (n) => n.category === category && !n.isRead,
    ).length;
  }

  return (
    <div
      role="tablist"
      aria-label="Notification filters"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        const unreadCount = getUnreadCount(filter.value);

        return (
          <button
            key={filter.value}
            role="tab"
            aria-selected={isActive}
            aria-controls="notification-list"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap',
              'transition-colors duration-[--duration-micro]',
              'min-h-[var(--touch-min)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              isActive
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-surface-200 dark:bg-input text-primary-700 dark:text-muted-foreground hover:bg-surface-300 dark:hover:bg-muted',
            )}
          >
            {filter.label}
            {unreadCount > 0 && (
              <span
                className={cn(
                  'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-semibold',
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-primary-600 dark:bg-primary-500 text-white',
                )}
                aria-label={`${unreadCount} unread`}
              >
                {unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
