'use client';

import { cn } from '@/lib/utils/cn';
import { AlertTriangle, ArrowRight, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { ConnectionInfo } from '../types';

interface ConnectionWarningCardProps {
  connection: ConnectionInfo;
}

const riskConfig = {
  low: {
    bg: 'bg-success-50 dark:bg-[oklch(20%_0.008_142)]',
    border: 'border-success-300 dark:border-[oklch(35%_0.040_142)]',
    accent: 'border-l-success-500',
    icon: CheckCircle,
    iconColor: 'text-success-500 dark:text-[oklch(62%_0.165_142)]',
    titleColor: 'text-success-800 dark:text-[oklch(65%_0.160_142)]',
  },
  medium: {
    bg: 'bg-warning-50 dark:bg-[oklch(20%_0.005_60)]',
    border: 'border-warning-300 dark:border-[oklch(35%_0.040_60)]',
    accent: 'border-l-warning-500',
    icon: AlertTriangle,
    iconColor: 'text-warning-500 dark:text-[oklch(67%_0.175_60)]',
    titleColor: 'text-warning-800 dark:text-[oklch(58%_0.165_60)]',
  },
  high: {
    bg: 'bg-error-50 dark:bg-[oklch(20%_0.008_25)]',
    border: 'border-error-300 dark:border-[oklch(35%_0.060_25)]',
    accent: 'border-l-error-500',
    icon: AlertTriangle,
    iconColor: 'text-error-500 dark:text-[oklch(62%_0.228_25)]',
    titleColor: 'text-error-800 dark:text-[oklch(55%_0.215_25)]',
  },
};

export function ConnectionWarningCard({ connection }: ConnectionWarningCardProps) {
  if (!connection.hasConnection || !connection.nextFlight) return null;

  const risk = riskConfig[connection.riskLevel ?? 'low'];
  const RiskIcon = risk.icon;

  return (
    <section
      className={cn(
        'rounded-lg border-l-4 p-4',
        risk.bg,
        risk.border,
        risk.accent
      )}
      role="alert"
      aria-labelledby="connection-heading"
    >
      <div className="flex items-start gap-3">
        <RiskIcon className={cn('w-5 h-5 mt-0.5 shrink-0', risk.iconColor)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h3 id="connection-heading" className={cn('text-sm font-semibold mb-2', risk.titleColor)}>
            Connection{connection.riskLevel === 'high' ? ' Alert' : ' Information'}
          </h3>

          {/* Next flight details */}
          <div className="flex items-center gap-2 mb-2 text-sm text-primary-900 dark:text-[oklch(95%_0.002_50)] font-medium">
            <span>{connection.nextFlight.from}</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary-400 dark:text-[oklch(60%_0.005_50)]" aria-label="to" />
            <span>{connection.nextFlight.to}</span>
            <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]">·</span>
            <span className="text-primary-500 dark:text-[oklch(70%_0.008_50)]">{connection.nextFlight.flightNumber}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-primary-600 dark:text-[oklch(75%_0.005_50)] mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              Departs {connection.nextFlight.departure}
            </span>
            {connection.connectionMinutes && (
              <span className="font-medium">
                {Math.floor(connection.connectionMinutes / 60)}h {connection.connectionMinutes % 60}m connection
              </span>
            )}
          </div>

          {connection.nextFlight.gate && (
            <p className="text-xs text-primary-600 dark:text-[oklch(75%_0.005_50)] mb-2">
              Gate: {connection.nextFlight.gate}
            </p>
          )}

          {connection.recommendedAction && (
            <p className="text-xs text-primary-700 dark:text-[oklch(80%_0.005_50)] italic mb-3">
              {connection.recommendedAction}
            </p>
          )}

          <Link
            href={ROUTES.TRIPS}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-500 dark:text-[oklch(65%_0.194_262)]
                       hover:text-primary-600 transition-colors duration-[--duration-micro]
                       min-h-[var(--touch-min)]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="View connection details in trip dashboard"
          >
            View Connection Details
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
