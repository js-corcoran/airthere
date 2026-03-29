'use client';

import { cn } from '@/lib/utils/cn';
import { DayOfTravelEvent } from '@/lib/types/family';
import { Calendar, CheckCircle2, Circle, User } from 'lucide-react';

interface DayOfTravelTimelineProps {
  events: DayOfTravelEvent[];
  travelDate: string;
}

export function DayOfTravelTimeline({ events, travelDate }: DayOfTravelTimelineProps) {
  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="Day of travel timeline"
    >
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="w-5 h-5 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Day of Travel
        </h2>
      </div>
      <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] mb-4 ml-7">
        {travelDate}
      </p>

      <ol className="relative ml-3" aria-label="Travel schedule">
        {events.map((event, i) => {
          const isLast = i === events.length - 1;
          return (
            <li key={`${event.time}-${event.label}`} className="flex gap-3 pb-4 last:pb-0">
              {/* Timeline connector */}
              <div className="flex flex-col items-center shrink-0">
                {event.completed ? (
                  <CheckCircle2
                    className="w-5 h-5 text-success-500 dark:text-success-400"
                    aria-label="Completed"
                  />
                ) : (
                  <Circle
                    className="w-5 h-5 text-primary-300 dark:text-[oklch(40%_0.030_262)]"
                    aria-label="Pending"
                  />
                )}
                {!isLast && (
                  <div className="w-0.5 flex-1 min-h-[16px] bg-primary-200 dark:bg-[oklch(30%_0.010_262)] mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 -mt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-primary-600 dark:text-[oklch(70%_0.125_262)]">
                    {event.time}
                  </span>
                  <span
                    className={cn(
                      'text-sm',
                      event.completed
                        ? 'text-primary-400 dark:text-[oklch(50%_0.005_50)] line-through'
                        : 'text-primary-900 dark:text-[oklch(95%_0.002_50)]'
                    )}
                  >
                    {event.label}
                  </span>
                </div>
                {event.assignedTo && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3 text-primary-400 dark:text-[oklch(50%_0.005_50)]" aria-hidden="true" />
                    <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
                      {event.assignedTo}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
