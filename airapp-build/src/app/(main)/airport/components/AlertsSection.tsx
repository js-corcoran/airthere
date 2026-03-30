'use client';

import { cn } from '@/lib/utils/cn';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AirportAlert } from '../types';

interface AlertsSectionProps {
  alerts: AirportAlert[];
}

const alertConfig = {
  info: {
    icon: Info,
    bg: 'bg-info-50 dark:bg-surface-info',
    border: 'border-info-200 dark:border-info',
    iconColor: 'text-info-500 dark:text-info-500',
    titleColor: 'text-info-700 dark:text-info-400',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-warning-50 dark:bg-surface-warning',
    border: 'border-warning-200 dark:border-warning-800',
    iconColor: 'text-warning-500 dark:text-warning-500',
    titleColor: 'text-warning-700 dark:text-warning-600',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-success-50 dark:bg-surface-success',
    border: 'border-success-200 dark:border-success',
    iconColor: 'text-success-500 dark:text-success-500',
    titleColor: 'text-success-700 dark:text-success-600',
  },
  error: {
    icon: XCircle,
    bg: 'bg-error-50 dark:bg-surface-error',
    border: 'border-error-200 dark:border-error',
    iconColor: 'text-error-500 dark:text-error-500',
    titleColor: 'text-error-700 dark:text-error-600',
  },
};

export function AlertsSection({ alerts }: AlertsSectionProps) {
  if (alerts.length === 0) return null;

  return (
    <section aria-labelledby="alerts-heading" className="space-y-2">
      <h3 id="alerts-heading" className="text-sm font-semibold text-primary-900 dark:text-foreground">
        Alerts & Updates
      </h3>
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border',
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                config.bg,
                config.border
              )}
              style={{ animationDelay: `${i * 60}ms` }}
              role="alert"
            >
              <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', config.iconColor)} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium', config.titleColor)}>
                  {alert.title}
                </p>
                <p className="text-xs text-primary-600 dark:text-soft-foreground mt-0.5">
                  {alert.message}
                </p>
              </div>
              <span className="text-[10px] text-primary-600 dark:text-faint-foreground shrink-0 mt-0.5">
                {alert.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
