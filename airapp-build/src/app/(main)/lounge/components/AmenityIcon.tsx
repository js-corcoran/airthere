'use client';

import { cn } from '@/lib/utils/cn';
import {
  Wifi,
  ShowerHead,
  Coffee,
  Monitor,
  Sofa,
  Baby,
  Dumbbell,
  Plug,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  wifi: Wifi,
  shower: ShowerHead,
  coffee: Coffee,
  monitor: Monitor,
  sofa: Sofa,
  baby: Baby,
  dumbbell: Dumbbell,
  plug: Plug,
};

interface AmenityIconProps {
  name: string;
  available: boolean;
  icon: string;
  size?: 'sm' | 'md';
}

export function AmenityIcon({ name, available, icon, size = 'sm' }: AmenityIconProps) {
  const Icon = ICON_MAP[icon] ?? Coffee;
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5';

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1',
        available
          ? 'text-primary-700 dark:text-muted-foreground'
          : 'text-primary-300 dark:text-faint-foreground'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-[var(--radius-md)] p-2',
          available
            ? 'bg-surface-200 dark:bg-input'
            : 'bg-surface-100 dark:bg-surface-100'
        )}
      >
        <Icon className={iconSize} aria-hidden="true" />
      </div>
      <span
        className={cn(
          'text-[10px] leading-tight text-center',
          available
            ? 'text-primary-600 dark:text-soft-foreground'
            : 'text-primary-300 dark:text-faint-foreground line-through'
        )}
      >
        {name}
      </span>
    </div>
  );
}

/** Inline amenity chip for use in cards */
export function AmenityChip({ name, available, icon }: Omit<AmenityIconProps, 'size'>) {
  const Icon = ICON_MAP[icon] ?? Coffee;

  if (!available) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full',
        'text-primary-600 dark:text-soft-foreground',
        'bg-surface-200 dark:bg-input'
      )}
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      {name}
    </span>
  );
}
