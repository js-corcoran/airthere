'use client';

import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
      role="status"
    >
      {icon && (
        <span className="text-5xl mb-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <h3 className="text-xl font-semibold text-primary-900 dark:text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-primary-700 dark:text-muted-foreground max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-secondary-500 text-white font-medium rounded-md
                     hover:bg-secondary-600 active:bg-secondary-700
                     transition-colors duration-[--duration-short]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                     min-h-[var(--touch-min)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
