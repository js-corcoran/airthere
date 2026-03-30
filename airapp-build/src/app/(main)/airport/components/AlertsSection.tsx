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
    bg: 'bg-info-50 dark:bg-[oklch(20%_0.002_240)]',
    border: 'border-info-200 dark:border-[oklch(35%_0.020_240)]',
    iconColor: 'text-info-500 dark:text-[oklch(62%_0.155_240)]',
    titleColor: 'text-info-700 dark:text-[oklch(70%_0.125_240)]',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-warning-50 dark:bg-[oklch(20%_0.005_60)]',
    border: 'border-warning-200 dark:border-[oklch(35%_0.040_60)]',
    iconColor: 'text-warning-500 dark:text-[oklch(67%_0.175_60)]',
    titleColor: 'text-warning-700 dark:text-[oklch(58%_0.165_60)]',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-success-50 dark:bg-[oklch(20%_0.008_142)]',
    border: 'border-success-200 dark:border-[oklch(35%_0.040_142)]',
    iconColor: 'text-success-500 dark:text-[oklch(62%_0.165_142)]',
    titleColor: 'text-success-700 dark:text-[oklch(55%_0.155_142)]',
  },
  error: {
    icon: XCircle,
    bg: 'bg-error-50 dark:bg-[oklch(20%_0.008_25)]',
    border: 'border-error-200 dark:border-[oklch(35%_0.060_25)]',
    iconColor: 'text-error-500 dark:text-[oklch(62%_0.228_25)]',
    titleColor: 'text-error-700 dark:text-[oklch(55%_0.215_25)]',
  },
};

export function AlertsSection({ alerts }: AlertsSectionProps) {
  if (alerts.length === 0) return null;

  return (
    <section aria-labelledby="alerts-heading" className="space-y-2">
      <h3 id="alerts-heading" className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
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
                <p className="text-xs text-primary-600 dark:text-[oklch(75%_0.005_50)] mt-0.5">
                  {alert.message}
                </p>
              </div>
              <span className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] shrink-0 mt-0.5">
                {alert.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
