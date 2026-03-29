'use client';

import { Mail, Phone, Lock, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AccountSecurity } from '@/lib/types/profile';

interface AccountSecuritySectionProps {
  security: AccountSecurity;
}

function daysAgo(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export function AccountSecuritySection({ security }: AccountSecuritySectionProps) {
  return (
    <section aria-labelledby="security-heading" className="space-y-3">
      <h3
        id="security-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Account Security
      </h3>
      <div className="bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] divide-y divide-surface-300 dark:divide-[oklch(32%_0.008_50)]">
        <InfoRow
          icon={<Mail className="w-4 h-4" aria-hidden="true" />}
          label="Email"
          value={security.email}
        />
        <InfoRow
          icon={<Phone className="w-4 h-4" aria-hidden="true" />}
          label="Phone"
          value={security.phone}
        />
        <InfoRow
          icon={<Lock className="w-4 h-4" aria-hidden="true" />}
          label="Password"
          value={`Changed ${daysAgo(security.passwordLastChanged)}`}
          status="valid"
        />
        <InfoRow
          icon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
          label="Two-Factor Auth"
          value={security.twoFactorEnabled
            ? `Enabled (${security.twoFactorMethod === 'app' ? 'Authenticator App' : 'SMS'})`
            : 'Not enabled'}
          status={security.twoFactorEnabled ? 'valid' : 'warning'}
        />

        <button
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-3',
            'text-sm font-medium text-primary-600 dark:text-primary-300',
            'hover:bg-surface-200 dark:hover:bg-[oklch(22%_0.005_50)]',
            'transition-colors duration-[--duration-micro]',
            'rounded-b-[var(--radius-lg)]',
            'min-h-[var(--touch-min)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
        >
          Change Settings
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: 'valid' | 'warning';
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-primary-500 dark:text-primary-400 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-800 dark:text-[oklch(90%_0.002_50)]">
          {label}
        </p>
        <p className="text-xs text-primary-500 dark:text-primary-400 truncate">
          {value}
        </p>
      </div>
      {status === 'valid' && (
        <span className="text-xs font-semibold text-success-600 dark:text-success-400">
          &#10003;
        </span>
      )}
      {status === 'warning' && (
        <span className="text-xs font-semibold text-warning-600 dark:text-warning-400">
          Setup
        </span>
      )}
    </div>
  );
}
