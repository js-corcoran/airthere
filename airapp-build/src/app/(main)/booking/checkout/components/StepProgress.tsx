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
                    ? 'bg-success-500 text-white dark:bg-success-500'
                    : isCurrent
                      ? 'bg-primary-500 text-white dark:bg-primary-500'
                      : 'bg-surface-200 text-primary-600 dark:bg-input dark:text-faint-foreground'
                )}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span className={cn(
                'text-[10px] mt-1 text-center whitespace-nowrap',
                isCurrent
                  ? 'text-primary-700 font-medium dark:text-muted-foreground'
                  : 'text-primary-600 dark:text-faint-foreground'
              )}>
                {label}
              </span>
            </div>
            {step < totalSteps && (
              <div className={cn(
                'flex-1 h-px mx-1.5 mt-[-14px]',
                isComplete
                  ? 'bg-success-400 dark:bg-success-600'
                  : 'bg-surface-200 dark:bg-input'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
