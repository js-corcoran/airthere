'use client';

import { cn } from '@/lib/utils/cn';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  if (currentStep === 0) return null;

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className="h-1 bg-surface-200 dark:bg-[oklch(25%_0.005_50)]"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label={`Onboarding step ${currentStep} of ${totalSteps}`}
      >
        <div
          className={cn(
            'h-full bg-primary-500 dark:bg-[oklch(65%_0.194_262)]',
            'transition-[width] duration-[--duration-short] ease-[--ease-in-out]'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center py-2">
        <span className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
