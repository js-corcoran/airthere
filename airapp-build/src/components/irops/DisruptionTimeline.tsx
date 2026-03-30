'use client';

import { cn } from '@/lib/utils/cn';
import type { Disruption } from '@/lib/types/disruption';

interface DisruptionTimelineProps {
  disruption: Disruption;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getProgress(disruption: Disruption): number {
  if (disruption.impact.isCancelled) return 100;
  if (!disruption.rootCause.expectedResolution) return 50;
  const detected = new Date(disruption.detectedAt).getTime();
  const resolution = new Date(disruption.rootCause.expectedResolution).getTime();
  const now = Date.now();
  const total = resolution - detected;
  if (total <= 0) return 100;
  const elapsed = now - detected;
  return Math.min(100, Math.max(5, Math.round((elapsed / total) * 100)));
}

function getStatusLabel(disruption: Disruption): string {
  if (disruption.impact.isCancelled) return 'Cancelled';
  if (disruption.type === 'diversion') return 'Diverted';
  if (disruption.impact.delayMinutes > 180) return 'Major Delay';
  if (disruption.impact.delayMinutes > 60) return 'Delayed';
  return 'Minor Delay';
}

export function DisruptionTimeline({ disruption }: DisruptionTimelineProps) {
  const progress = getProgress(disruption);
  const statusLabel = getStatusLabel(disruption);

  return (
    <section aria-labelledby="timeline-heading" className="space-y-3">
      <h3
        id="timeline-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Timeline
      </h3>
      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-muted">
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-xs text-primary-500 dark:text-primary-400 mb-0.5">Original Departure</p>
            <p className="font-semibold text-primary-800 dark:text-muted-foreground">
              {formatTime(disruption.impact.originalDeparture)}
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              {formatDate(disruption.impact.originalDeparture)}
            </p>
          </div>
          <div>
            <p className="text-xs text-primary-500 dark:text-primary-400 mb-0.5">Status</p>
            <p className={cn(
              'font-semibold',
              disruption.impact.isCancelled
                ? 'text-error-600 dark:text-error-300'
                : 'text-warning-600 dark:text-warning-300'
            )}>
              {statusLabel}
            </p>
            {disruption.impact.estimatedDeparture && !disruption.impact.isCancelled && (
              <p className="text-xs text-primary-500 dark:text-primary-400">
                Est. {formatTime(disruption.impact.estimatedDeparture)}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-primary-500 dark:text-primary-400">
            <span>Detected</span>
            <span>{disruption.rootCause.expectedResolution ? 'Resolution' : 'Investigating'}</span>
          </div>
          <div
            className="h-2 rounded-full bg-surface-200 dark:bg-input overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Disruption resolution progress: ${progress}%`}
          >
            <div
              className={cn(
                'h-full rounded-full transition-all duration-[--duration-normal]',
                disruption.impact.isCancelled
                  ? 'bg-error-500'
                  : progress > 70
                    ? 'bg-success-500'
                    : 'bg-warning-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {disruption.rootCause.expectedResolution && (
          <p className="text-xs text-primary-500 dark:text-primary-400 mt-2">
            Expected resolution by {formatTime(disruption.rootCause.expectedResolution)} on{' '}
            {formatDate(disruption.rootCause.expectedResolution)}
          </p>
        )}
      </div>
    </section>
  );
}
