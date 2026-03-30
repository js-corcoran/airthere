'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Settings, CheckCheck, BellOff, X } from 'lucide-react';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import {
  getNotificationsForPersona,
  type AppNotification,
} from './data/mock-notifications';
import { NotificationCard } from './components/NotificationCard';
import {
  NotificationFilters,
  type FilterCategory,
} from './components/NotificationFilters';

type LoadingState = 'loading' | 'success' | 'error';

/** Group notifications by relative date label */
function groupByDate(
  notifications: AppNotification[],
): { label: string; items: AppNotification[] }[] {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart.getTime() - 86400000);
  const weekStart = new Date(todayStart.getTime() - 6 * 86400000);

  const groups: Record<string, AppNotification[]> = {
    Today: [],
    Yesterday: [],
    'Earlier This Week': [],
    Older: [],
  };

  for (const n of notifications) {
    const ts = new Date(n.timestamp);
    if (ts >= todayStart) {
      groups['Today'].push(n);
    } else if (ts >= yesterdayStart) {
      groups['Yesterday'].push(n);
    } else if (ts >= weekStart) {
      groups['Earlier This Week'].push(n);
    } else {
      groups['Older'].push(n);
    }
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

export default function NotificationsPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Notification preference state (local demo only)
  const [prefs, setPrefs] = useState({
    flightAlerts: true,
    gateChanges: true,
    loyaltyUpdates: true,
    travelTips: true,
    priceDrops: true,
    marketing: false,
  });

  useEffect(() => {
    setState('loading');
    const timer = setTimeout(() => {
      try {
        const data = getNotificationsForPersona(persona);
        setNotifications(data);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  const handleMarkRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const handleAction = useCallback((url: string) => {
    // In a real app, this would navigate via router.push
    // For the prototype, we just log it
    console.log('Navigate to:', url);
  }, []);

  // Filter and search
  const filteredNotifications = useMemo(() => {
    let result = notifications;

    // Category filter
    if (activeFilter !== 'all') {
      result = result.filter((n) => n.category === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q),
      );
    }

    // Sort by timestamp, newest first
    return [...result].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [notifications, activeFilter, searchQuery]);

  const grouped = useMemo(
    () => groupByDate(filteredNotifications),
    [filteredNotifications],
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (state === 'loading') return <PageSkeleton />;
  if (state === 'error') {
    return (
      <ErrorState
        title="Unable to load notifications"
        message="We're having trouble loading your notifications. Please try again."
        onRetry={() => setState('loading')}
      />
    );
  }

  return (
    <main
      role="main"
      aria-label="Notifications center"
      className="min-h-screen bg-background dark:bg-background pb-24"
    >
      <div className="px-4 pt-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-900 dark:text-foreground">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold bg-primary-600 dark:bg-primary-500 text-white"
                aria-label={`${unreadCount} unread notifications`}
              >
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mark All Read */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                aria-label="Mark all notifications as read"
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)]',
                  'text-xs font-medium text-primary-600 dark:text-primary-400',
                  'hover:bg-surface-200 dark:hover:bg-surface-elevated',
                  'transition-colors duration-[--duration-micro]',
                  'min-h-[var(--touch-min)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                )}
              >
                <CheckCheck className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Mark All Read</span>
              </button>
            )}

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              aria-label="Notification settings"
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)]',
                'text-primary-600 dark:text-primary-400',
                'hover:bg-surface-200 dark:hover:bg-surface-elevated',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-min)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
            >
              <Settings className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="sticky top-0 z-10 bg-background dark:bg-background pb-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 dark:text-faint-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              role="searchbox"
              aria-label="Search notifications"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-[var(--radius-lg)]',
                'border border-surface-300 dark:border-muted',
                'bg-surface dark:bg-card',
                'text-sm text-primary-900 dark:text-foreground',
                'placeholder:text-primary-400 dark:placeholder:text-faint-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
                'min-h-[var(--touch-min)]',
                'transition-colors duration-[--duration-micro]',
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:text-faint-foreground dark:hover:text-soft-foreground"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          notifications={notifications}
        />

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-surface-200 dark:bg-input flex items-center justify-center mb-4">
              <BellOff
                className="w-7 h-7 text-primary-400 dark:text-faint-foreground"
                aria-hidden="true"
              />
            </div>
            <h2 className="text-base font-semibold text-primary-900 dark:text-foreground mb-1">
              No notifications
            </h2>
            <p className="text-sm text-primary-500 dark:text-caption-foreground max-w-xs">
              {searchQuery
                ? `No notifications match "${searchQuery}". Try a different search.`
                : activeFilter !== 'all'
                  ? `No ${activeFilter} notifications right now. Check back later.`
                  : "You're all caught up! We'll notify you when something important happens."}
            </p>
          </div>
        ) : (
          <div
            id="notification-list"
            role="list"
            aria-label="Notifications"
            className="space-y-6"
          >
            {grouped.map((group) => (
              <section key={group.label} aria-labelledby={`group-${group.label}`}>
                <h2
                  id={`group-${group.label}`}
                  className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-caption-foreground mb-3"
                >
                  {group.label}
                </h2>
                <div className="space-y-2.5">
                  {group.items.map((notification, i) => (
                    <div
                      key={notification.id}
                      className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <NotificationCard
                        notification={notification}
                        onMarkRead={handleMarkRead}
                        onAction={handleAction}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings Bottom Sheet */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Notification settings"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-overlay-dark"
            onClick={() => setShowSettings(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="relative w-full max-w-md bg-background dark:bg-card rounded-t-2xl sm:rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-primary-900 dark:text-foreground">
                Notification Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close notification settings"
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full',
                  'text-primary-500 dark:text-caption-foreground',
                  'hover:bg-surface-200 dark:hover:bg-input',
                  'transition-colors duration-[--duration-micro]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                )}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-1">
              <SettingsToggle
                label="Flight Alerts"
                description="Gate changes, delays, and cancellations"
                checked={prefs.flightAlerts}
                onChange={(v) => setPrefs((p) => ({ ...p, flightAlerts: v }))}
              />
              <SettingsToggle
                label="Gate Changes"
                description="Immediate alerts when your gate changes"
                checked={prefs.gateChanges}
                onChange={(v) => setPrefs((p) => ({ ...p, gateChanges: v }))}
              />
              <SettingsToggle
                label="Loyalty Updates"
                description="Points, miles, and tier status changes"
                checked={prefs.loyaltyUpdates}
                onChange={(v) => setPrefs((p) => ({ ...p, loyaltyUpdates: v }))}
              />
              <SettingsToggle
                label="Travel Tips"
                description="Personalized tips and recommendations"
                checked={prefs.travelTips}
                onChange={(v) => setPrefs((p) => ({ ...p, travelTips: v }))}
              />
              <SettingsToggle
                label="Price Drops"
                description="Alerts when fares drop on watched routes"
                checked={prefs.priceDrops}
                onChange={(v) => setPrefs((p) => ({ ...p, priceDrops: v }))}
              />
              <SettingsToggle
                label="Marketing"
                description="Promotions and special offers"
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className={cn(
                'w-full mt-6 px-4 py-2.5 rounded-[var(--radius-md)]',
                'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
                'text-white text-sm font-semibold',
                'transition-colors duration-[--duration-micro]',
                'min-h-[var(--touch-preferred)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings Toggle (inline sub-component)                             */
/* ------------------------------------------------------------------ */

interface SettingsToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function SettingsToggle({
  label,
  description,
  checked,
  onChange,
}: SettingsToggleProps) {
  const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-input last:border-b-0">
      <div className="pr-4">
        <label
          htmlFor={id}
          className="text-sm font-medium text-primary-900 dark:text-foreground cursor-pointer"
        >
          {label}
        </label>
        <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
          {description}
        </p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={`${label}: ${checked ? 'enabled' : 'disabled'}`}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          checked
            ? 'bg-primary-600 dark:bg-primary-500'
            : 'bg-surface-300 dark:bg-muted',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow',
            'transform transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}
