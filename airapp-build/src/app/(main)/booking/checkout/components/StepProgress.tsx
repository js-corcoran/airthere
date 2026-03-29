'use client';

import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  return (
    <div className="flex items-center gap-1" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${currentStep} of ${totalSteps}: ${labels[currentStep - 1]}`}>
      {labels.map((label, i) => {
        const step = i + 1;
        const isComplete = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold',
                  'transition-colors duration-[--duration-short]',
                  isComplete
                    ? 'bg-success-500 text-white dark:bg-[oklch(60%_0.15_155)]'
                    : isCurrent
                      ? 'bg-primary-500 text-white dark:bg-[oklch(55%_0.194_262)]'
                      : 'bg-surface-200 text-primary-400 dark:bg-[oklch(25%_0.003_50)] dark:text-[oklch(50%_0.005_50)]'
                )}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span className={cn(
                'text-[10px] mt-1 text-center whitespace-nowrap',
                isCurrent
                  ? 'text-primary-700 font-medium dark:text-[oklch(85%_0.005_50)]'
                  : 'text-primary-400 dark:text-[oklch(50%_0.005_50)]'
              )}>
                {label}
              </span>
            </div>
            {step < totalSteps && (
              <div className={cn(
                'flex-1 h-px mx-1.5 mt-[-14px]',
                isComplete
                  ? 'bg-success-400 dark:bg-[oklch(55%_0.12_155)]'
                  : 'bg-surface-200 dark:bg-[oklch(28%_0.005_50)]'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
