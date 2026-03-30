'use client';

import { cn } from '@/lib/utils/cn';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
      role="alert"
    >
      <div className="w-12 h-12 rounded-full bg-error-50 dark:bg-error-900 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-error-500" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-primary-900 dark:text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-primary-700 dark:text-muted-foreground max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-primary-500 text-white font-medium rounded-md
                     hover:bg-primary-600 active:bg-primary-700
                     transition-colors duration-[--duration-short]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                     min-h-[var(--touch-min)]"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
