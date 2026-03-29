'use client';

import { cn } from '@/lib/utils/cn';
import { EntertainmentRecommendation } from '@/lib/types/family';
import { Tv, Film, Gamepad2, Users } from 'lucide-react';

interface EntertainmentPlanningProps {
  recommendations: EntertainmentRecommendation[];
}

function getAgeIcon(age: number) {
  if (age < 10) return Gamepad2;
  if (age < 18) return Film;
  return Tv;
}

export function EntertainmentPlanning({ recommendations }: EntertainmentPlanningProps) {
  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-[oklch(18%_0.003_50)]',
        'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
      )}
      aria-label="In-flight entertainment planning"
    >
      <div className="flex items-center gap-2 mb-3">
        <Tv className="w-5 h-5 text-secondary-500 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Entertainment Planning
        </h2>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const Icon = getAgeIcon(rec.age);
          return (
            <div
              key={rec.memberId}
              className={cn(
                'rounded-md p-3 border',
                'bg-background dark:bg-[oklch(15%_0.002_50)]',
                'border-surface-300 dark:border-[oklch(32%_0.008_50)]'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-secondary-600 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
                <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                  {rec.memberName}
                </span>
                {rec.age < 18 && (
                  <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
                    ({rec.age}y)
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {rec.recommendations.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-200 text-primary-700 dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared activities */}
      <div className="mt-4 pt-3 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)]">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
          <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            Shared Activities
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Family movie night', 'Multiplayer trivia', 'Drawing challenge'].map((activity) => (
            <button
              key={activity}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full font-medium',
                'bg-secondary-100 text-secondary-700',
                'dark:bg-[oklch(25%_0.020_50)] dark:text-[oklch(85%_0.110_50)]',
                'hover:bg-secondary-200 dark:hover:bg-[oklch(30%_0.030_50)]',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)] flex items-center'
              )}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
