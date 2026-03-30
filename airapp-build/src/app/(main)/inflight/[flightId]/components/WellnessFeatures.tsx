'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { WellnessData } from '@/lib/types/inflight';
import { Droplets, PersonStanding, Moon, BellOff, Lightbulb, Clock } from 'lucide-react';

interface WellnessFeaturesProps {
  data: WellnessData;
  flightDurationMinutes: number;
}

export function WellnessFeatures({ data, flightDurationMinutes }: WellnessFeaturesProps) {
  const [dndActive, setDndActive] = useState(false);
  const [sleepTimerActive, setSleepTimerActive] = useState(false);
  const [showJetLagTips, setShowJetLagTips] = useState(false);

  const features = [
    {
      icon: Droplets,
      label: 'Hydration',
      description: `Drink water every ${data.hydrationInterval} minutes`,
      detail: `${data.hydrationCount} reminders sent`,
      color: 'text-info-500 dark:text-info-400',
    },
    {
      icon: PersonStanding,
      label: 'Movement',
      description: `Stand and stretch every ${data.movementInterval} minutes`,
      detail: `${data.movementCount} reminder${data.movementCount !== 1 ? 's' : ''} sent`,
      color: 'text-success-500 dark:text-success-400',
    },
    {
      icon: Moon,
      label: 'Sleep',
      description: `${data.recommendedSleep} hours recommended`,
      detail: `Timezone shift: ${data.timezoneShift > 0 ? '+' : ''}${data.timezoneShift}h`,
      color: 'text-primary-500 dark:text-[oklch(65%_0.194_262)]',
    },
  ];

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-gradient-to-b from-success-50 to-info-50',
        'dark:from-[oklch(18%_0.005_142)] dark:to-[oklch(18%_0.005_240)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="Wellness features"
    >
      <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-3">
        Wellness
      </h2>

      {/* Features */}
      <div className="space-y-1">
        {features.map(({ icon: Icon, label, description, detail, color }, i) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-3 py-3 border-b last:border-b-0',
              'border-surface-300 dark:border-[oklch(32%_0.008_50)]',
              'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]'
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Icon className={cn('w-6 h-6 shrink-0', color)} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                {label}
              </p>
              <p className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)]">
                {description}
              </p>
              <p className="text-[10px] text-primary-400 dark:text-[oklch(50%_0.005_50)] mt-0.5">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sleep timer card */}
      <div
        className={cn(
          'mt-3 rounded-md p-3',
          'bg-primary-100 dark:bg-[oklch(22%_0.010_262)]',
          'border border-primary-200 dark:border-[oklch(32%_0.015_262)]'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600 dark:text-[oklch(70%_0.125_262)]" aria-hidden="true" />
            <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              Sleep Timer
            </span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSleepTimerActive(!sleepTimerActive)}
              className={cn(
                'text-xs px-3 py-1 rounded-full font-medium',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)] flex items-center',
                sleepTimerActive
                  ? 'bg-primary-500 text-white'
                  : 'bg-surface-200 text-primary-700 dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]'
              )}
            >
              <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
              {sleepTimerActive ? 'Active' : 'Set'}
            </button>
            <button
              onClick={() => setDndActive(!dndActive)}
              className={cn(
                'text-xs px-3 py-1 rounded-full font-medium',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)] flex items-center',
                dndActive
                  ? 'bg-primary-500 text-white'
                  : 'bg-surface-200 text-primary-700 dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]'
              )}
              aria-label="Do not disturb"
            >
              <BellOff className="w-3 h-3 mr-1" aria-hidden="true" />
              DND
            </button>
          </div>
        </div>
        <p className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)]">
          Arrival in local time: 7:55 AM. Recommended sleep: {data.recommendedSleep}h
        </p>
      </div>

      {/* Jet lag tips */}
      <button
        onClick={() => setShowJetLagTips(!showJetLagTips)}
        className={cn(
          'mt-3 w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-left',
          'bg-background dark:bg-[oklch(15%_0.002_50)]',
          'border border-surface-300 dark:border-[oklch(32%_0.008_50)]',
          'hover:bg-surface-200 dark:hover:bg-[oklch(20%_0.005_50)]',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'min-h-[var(--touch-min)]'
        )}
      >
        <Lightbulb className="w-4 h-4 text-secondary-500 dark:text-[oklch(72%_0.158_50)] shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium text-primary-700 dark:text-[oklch(85%_0.005_50)]">
          Jet Lag Tips ({data.timezoneShift > 0 ? '+' : ''}{data.timezoneShift}h shift)
        </span>
      </button>

      {showJetLagTips && (
        <ul className="mt-2 space-y-2 pl-2">
          {data.jetLagTips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-primary-700 dark:text-[oklch(85%_0.005_50)]"
            >
              <span className="w-4 h-4 rounded-full bg-secondary-100 dark:bg-[oklch(25%_0.020_50)] text-secondary-700 dark:text-[oklch(85%_0.110_50)] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
