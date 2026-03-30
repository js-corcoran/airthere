'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Navigation, DoorOpen, Plane, ChevronRight } from 'lucide-react';

type JourneyStep = 'airport' | 'gate' | 'inflight';

interface JourneyBreadcrumbProps {
  currentStep: JourneyStep;
  flightId: string;
}

const STEPS: {
  id: JourneyStep;
  label: string;
  icon: typeof Navigation;
  getHref: (flightId: string) => string;
}[] = [
  { id: 'airport', label: 'Airport', icon: Navigation, getHref: () => '/airport' },
  { id: 'gate', label: 'Gate', icon: DoorOpen, getHref: () => '/airport/gate' },
  { id: 'inflight', label: 'In-Flight', icon: Plane, getHref: (fid) => `/inflight/${fid}` },
];

export function JourneyBreadcrumb({ currentStep, flightId }: JourneyBreadcrumbProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Journey progress" className="px-4 py-2.5">
      <ol className="flex items-center justify-center gap-0.5">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isCurrent = step.id === currentStep;
          const isPast = i < currentIndex;

          return (
            <li key={step.id} className="flex items-center">
              {i > 0 && (
                <ChevronRight
                  className={cn(
                    'w-3.5 h-3.5 mx-0.5 shrink-0',
                    isPast || isCurrent
                      ? 'text-primary-400 dark:text-primary-500'
                      : 'text-surface-300 dark:text-muted'
                  )}
                  aria-hidden="true"
                />
              )}
              <Link
                href={step.getHref(flightId)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium',
                  'transition-all duration-[--duration-micro]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  isCurrent
                    ? 'bg-primary-500 text-white dark:bg-primary-500 dark:text-white shadow-sm'
                    : isPast
                      ? 'bg-primary-100 text-primary-700 dark:bg-surface-primary dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800'
                      : 'bg-surface-100 text-primary-400 dark:bg-surface-100 dark:text-faint-foreground hover:bg-surface-200 dark:hover:bg-surface-elevated'
                )}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`${step.label}${isCurrent ? ' (current)' : ''}`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
