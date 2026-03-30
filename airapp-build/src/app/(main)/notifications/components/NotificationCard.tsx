'use client';

import { Plane, CreditCard, Info, Bell, Users, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AppNotification } from '../data/mock-notifications';

interface NotificationCardProps {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  onAction?: (url: string) => void;
}

function getPriorityStyles(priority: AppNotification['priority']): string {
  switch (priority) {
    case 'critical':
      return 'border-l-4 border-error-500 bg-error-50 dark:bg-surface-error';
    case 'high':
      return 'border-l-4 border-warning-500 bg-warning-50 dark:bg-surface-warning';
    case 'medium':
      return 'border-l-4 border-info-500 bg-info-50 dark:bg-surface-info';
    case 'low':
      return 'border-l-4 border-primary-300 bg-surface dark:bg-card';
  }
}

function getPriorityLabel(priority: AppNotification['priority']): string {
  switch (priority) {
    case 'critical':
      return 'Critical priority';
    case 'high':
      return 'High priority';
    case 'medium':
      return 'Medium priority';
    case 'low':
      return 'Low priority';
  }
}

function getTypeIcon(type: AppNotification['type']) {
  switch (type) {
    case 'gate_change':
    case 'delay':
    case 'cancellation':
    case 'boarding':
      return Plane;
    case 'checkin':
      return Plane;
    case 'loyalty':
      return CreditCard;
    case 'tip':
      return Info;
    case 'price_drop':
      return TrendingDown;
    case 'family':
      return Users;
    default:
      return Bell;
  }
}

function getIconColor(type: AppNotification['type']): string {
  switch (type) {
    case 'gate_change':
    case 'delay':
    case 'cancellation':
      return 'text-error-500';
    case 'checkin':
    case 'boarding':
      return 'text-warning-600';
    case 'loyalty':
      return 'text-secondary-500';
    case 'tip':
      return 'text-info-600';
    case 'price_drop':
      return 'text-success-600';
    case 'family':
      return 'text-primary-600 dark:text-primary-400';
    default:
      return 'text-primary-500';
  }
}

function formatRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function NotificationCard({
  notification,
  onMarkRead,
  onAction,
}: NotificationCardProps) {
  const Icon = getTypeIcon(notification.type);
  const iconColor = getIconColor(notification.type);
  const priorityStyles = getPriorityStyles(notification.priority);
  const priorityLabel = getPriorityLabel(notification.priority);

  function handleClick() {
    if (!notification.isRead) {
      onMarkRead(notification.id);
    }
  }

  function handleAction(e: React.MouseEvent) {
    e.stopPropagation();
    if (notification.actionUrl && onAction) {
      onAction(notification.actionUrl);
    }
    if (!notification.isRead) {
      onMarkRead(notification.id);
    }
  }

  return (
    <div
      role="listitem"
      className={cn(
        'relative rounded-[var(--radius-lg)] p-3.5 cursor-pointer',
        'transition-colors duration-[--duration-micro]',
        priorityStyles,
        !notification.isRead && 'ring-1 ring-primary-200 dark:ring-muted',
      )}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${!notification.isRead ? 'Unread notification. ' : ''}${priorityLabel}. ${notification.title}. ${notification.message}`}
    >
      {/* Screen-reader-only priority text */}
      <span className="sr-only">{priorityLabel}</span>

      <div className="flex gap-3">
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          <Icon className={cn('w-5 h-5', iconColor)} aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'text-sm font-semibold leading-snug',
                notification.isRead
                  ? 'text-primary-700 dark:text-muted-foreground'
                  : 'text-primary-900 dark:text-foreground',
              )}
            >
              {notification.title}
            </h3>

            <div className="flex items-center gap-2 shrink-0">
              {/* Unread dot */}
              {!notification.isRead && (
                <span
                  className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"
                  aria-label="Unread notification"
                />
              )}
              {/* Timestamp */}
              <time
                dateTime={notification.timestamp}
                className="text-xs text-primary-500 dark:text-caption-foreground whitespace-nowrap"
              >
                {formatRelativeTime(notification.timestamp)}
              </time>
            </div>
          </div>

          <p
            className={cn(
              'text-xs leading-relaxed mt-1',
              notification.isRead
                ? 'text-primary-500 dark:text-caption-foreground'
                : 'text-primary-700 dark:text-muted-foreground',
            )}
          >
            {notification.message}
          </p>

          {/* Action button */}
          {notification.actionLabel && notification.actionUrl && (
            <button
              onClick={handleAction}
              aria-label={`${notification.actionLabel} for ${notification.title}`}
              className={cn(
                'mt-2.5 inline-flex items-center px-3 py-1.5 rounded-[var(--radius-md)]',
                'text-xs font-semibold',
                'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
                'text-white',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-min)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
            >
              {notification.actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
