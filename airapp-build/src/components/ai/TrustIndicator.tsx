'use client';

import { Shield, Eye, Zap } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { TrustLevel } from '@/lib/types/ai';

interface TrustIndicatorProps {
  level: TrustLevel;
  compact?: boolean;
}

const TRUST_CONFIG: Record<TrustLevel, {
  icon: typeof Shield;
  label: string;
  description: string;
  color: string;
  bg: string;
}> = {
  copilot: {
    icon: Shield,
    label: 'Copilot',
    description: 'I recommend, you decide',
    color: 'text-info-600 dark:text-info-400',
    bg: 'bg-info-50 dark:bg-[oklch(18%_0.02_240)]',
  },
  curator: {
    icon: Eye,
    label: 'Curator',
    description: 'I handle routine, you approve big decisions',
    color: 'text-secondary-600 dark:text-secondary-400',
    bg: 'bg-secondary-50 dark:bg-[oklch(18%_0.02_50)]',
  },
  autonomous: {
    icon: Zap,
    label: 'Autonomous',
    description: 'I act on your behalf within your preferences',
    color: 'text-success-600 dark:text-success-400',
    bg: 'bg-success-50 dark:bg-[oklch(18%_0.02_142)]',
  },
};

export function TrustIndicator({ level, compact }: TrustIndicatorProps) {
  const config = TRUST_CONFIG[level];
  const Icon = config.icon;

  if (compact) {
    return (
      <span className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium',
        config.bg, config.color,
      )}>
        <Icon className="w-3 h-3" aria-hidden="true" />
        {config.label}
      </span>
    );
  }

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)]',
      config.bg,
    )}>
      <Icon className={cn('w-3.5 h-3.5', config.color)} aria-hidden="true" />
      <span className={cn('text-xs font-medium', config.color)}>
        {config.label} mode: {config.description}
      </span>
    </div>
  );
}
