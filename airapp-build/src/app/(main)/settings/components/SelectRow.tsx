'use client';

import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectRowProps {
  label: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

export function SelectRow({
  label,
  description,
  value,
  options,
  onChange,
}: SelectRowProps) {
  const id = useId();
  const descriptionId = description ? `${id}-desc` : undefined;

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)]"
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
      <div className="relative flex-shrink-0">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={descriptionId}
          className="
            appearance-none
            pl-3 pr-8 py-2
            rounded-[var(--radius-md)]
            border border-surface-300 dark:border-[oklch(32%_0.008_50)]
            bg-surface dark:bg-[oklch(22%_0.005_50)]
            text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)]
            focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600
            min-h-[var(--touch-min)]
            cursor-pointer
            transition-colors duration-[--duration-micro]
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500 dark:text-[oklch(70%_0.008_50)] pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
