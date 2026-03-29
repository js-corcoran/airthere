'use client';

import { AlertTriangle, AlertOctagon, Clock, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Disruption } from '@/lib/types/disruption';

interface DisruptionSeverityBannerProps {
  disruption: Disruption;
}

const SEVERITY_CONFIG = {
  critical: {
    bg: 'bg-error-100 dark:bg-[oklch(25%_0.06_25)]',
    border: 'border-error-500',
    text: 'text-error-800 dark:text-error-100',
    icon: AlertOctagon,
    iconColor: 'text-error-600 dark:text-error-300',
  },
  high: {
    bg: 'bg-error-50 dark:bg-[oklch(22%_0.04_25)]',
    border: 'border-error-400',
    text: 'text-error-800 dark:text-error-200',
    icon: AlertTriangle,
    iconColor: 'text-error-500 dark:text-error-300',
  },
  medium: {
    bg: 'bg-warning-50 dark:bg-[oklch(22%_0.04_60)]',
    border: 'border-warning-500',
    text: 'text-warning-900 dark:text-warning-100',
    icon: Clock,
    iconColor: 'text-warning-600 dark:text-warning-300',
  },
  low: {
    bg: 'bg-info-50 dark:bg-[oklch(20%_0.03_240)]',
    border: 'border-info-400',
    text: 'text-info-800 dark:text-info-200',
    icon: Clock,
    iconColor: 'text-info-500 dark:text-info-300',
  },
};

const TYPE_LABELS: Record<string, string> = {
  cancellation: 'Flight Cancelled',
  delay: 'Flight Delayed',
  diversion: 'Flight Diverted',
  oversold: 'Flight Oversold',
};

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHrs = Math.floor(diffMin / 60);
  return `${diffHrs}h ${diffMin % 60}m ago`;
}

export function DisruptionSeverityBanner({ disruption }: DisruptionSeverityBannerProps) {
  const config = SEVERITY_CONFIG[disruption.severity];
  const Icon = disruption.type === 'diversion' ? Navigation : config.icon;
  const headline = TYPE_LABELS[disruption.type] ?? 'Disruption Detected';

  const delayText = disruption.impact.isCancelled
    ? null
    : disruption.impact.delayMinutes > 0
      ? `Delayed ${Math.floor(disruption.impact.delayMinutes / 60)}h ${disruption.impact.delayMinutes % 60}m`
      : null;

  const diversionText = disruption.impact.alternateAirport
    ? `Diverted to ${disruption.impact.alternateAirport}`
    : null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'border-l-4 rounded-r-[var(--radius-lg)] p-4',
        config.bg,
        config.border,
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5 shrink-0', config.iconColor)}>
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={cn('text-xl font-bold', config.text)}>
            {headline}
          </h2>
          <p className={cn('text-sm mt-1 font-medium', config.text, 'opacity-80')}>
            {disruption.affectedFlight.flightNumber} &middot; {disruption.affectedFlight.route}
          </p>
          {delayText && (
            <p className={cn('text-sm mt-0.5 font-semibold', config.text)}>
              {delayText}
            </p>
          )}
          {diversionText && (
            <p className={cn('text-sm mt-0.5 font-semibold', config.text)}>
              {diversionText}
            </p>
          )}
          <p className={cn('text-xs mt-2', config.text, 'opacity-60')}>
            Detected {formatTimestamp(disruption.detectedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
