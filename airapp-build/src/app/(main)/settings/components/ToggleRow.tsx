'use client';

import { useId } from 'react';

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: ToggleRowProps) {
  const id = useId();
  const descriptionId = description ? `${id}-desc` : undefined;

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex-1 min-w-0">
        <label
          id={id}
          className="text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)] cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p
            id={descriptionId}
            className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5 leading-snug"
          >
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative flex-shrink-0 inline-flex items-center
          w-11 h-6 rounded-full
          transition-colors duration-[--duration-micro]
          min-h-[var(--touch-min)] min-w-[var(--touch-min)]
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${
            checked
              ? 'bg-primary-600 dark:bg-primary-500'
              : 'bg-surface-300 dark:bg-[oklch(32%_0.008_50)]'
          }
        `}
      >
        <span
          aria-hidden="true"
          className={`
            inline-block w-4 h-4 rounded-full bg-white shadow-sm
            transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}
