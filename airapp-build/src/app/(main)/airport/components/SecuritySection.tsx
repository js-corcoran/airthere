'use client';

import { cn } from '@/lib/utils/cn';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import { SecurityCheckpoint } from '../types';

interface SecuritySectionProps {
  checkpoints: SecurityCheckpoint[];
}

const statusConfig = {
  low: { label: 'Low Wait', className: 'text-success-600 dark:text-[oklch(65%_0.160_142)]', barColor: 'bg-success-500' },
  moderate: { label: 'Moderate', className: 'text-warning-600 dark:text-[oklch(58%_0.165_60)]', barColor: 'bg-warning-500' },
  high: { label: 'Busy', className: 'text-error-600 dark:text-[oklch(55%_0.215_25)]', barColor: 'bg-error-500' },
};

export function SecuritySection({ checkpoints }: SecuritySectionProps) {
  return (
    <section aria-labelledby="security-heading" className="space-y-2">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
        <h3 id="security-heading" className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Security Checkpoints
        </h3>
      </div>
      <div className="space-y-2">
        {checkpoints.map((cp, i) => {
          const status = statusConfig[cp.status];
          return (
            <div
              key={cp.id}
              className="flex items-center gap-3 p-3 rounded-lg
                         bg-surface dark:bg-[oklch(18%_0.003_50)]
                         border border-surface-300 dark:border-[oklch(32%_0.008_50)]
                         opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                  {cp.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {cp.hasTSAPrecheck && (
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-success-600 dark:text-[oklch(65%_0.160_142)]">
                      <CheckCircle className="w-3 h-3" aria-hidden="true" />
                      TSA Pre✓
                    </span>
                  )}
                  {cp.hasClear && (
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-info-600 dark:text-[oklch(55%_0.160_240)]">
                      <CheckCircle className="w-3 h-3" aria-hidden="true" />
                      CLEAR
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary-400 dark:text-[oklch(60%_0.005_50)]" aria-hidden="true" />
                  <span className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                    {cp.waitTimeMinutes}
                  </span>
                  <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)]">min</span>
                </div>
                <span className={cn('text-[10px] font-medium', status.className)}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
