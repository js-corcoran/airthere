'use client';

import { Award, Shield, Gift } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { LoyaltyCompensation as LoyaltyCompensationType } from '@/lib/types/disruption';

interface LoyaltyCompensationProps {
  compensation: LoyaltyCompensationType;
}

export function LoyaltyCompensation({ compensation }: LoyaltyCompensationProps) {
  return (
    <section aria-labelledby="loyalty-heading" className="space-y-3">
      <h3
        id="loyalty-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Compensation & Benefits
      </h3>
      <div className="bg-secondary-50 dark:bg-card rounded-[var(--radius-lg)] p-4 border border-secondary-200 dark:border-secondary-700">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
              <Award className="w-5 h-5 text-secondary-600 dark:text-secondary-300" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-800 dark:text-subtle-foreground">
                {compensation.milesAwarded.toLocaleString()} bonus miles
              </p>
              <p className="text-xs text-primary-500 dark:text-primary-400">
                Awarded for this disruption
              </p>
            </div>
          </div>

          {compensation.statusProtected && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-success-100 dark:bg-success-800 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success-600 dark:text-success-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-800 dark:text-subtle-foreground">
                  Elite status protected
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400">
                  Your tier status is unaffected by this disruption
                </p>
              </div>
            </div>
          )}

          {compensation.voucherValue > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-info-100 dark:bg-info-800 flex items-center justify-center">
                <Gift className="w-5 h-5 text-info-600 dark:text-info-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-800 dark:text-subtle-foreground">
                  ${compensation.voucherValue} travel voucher
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400">
                  Valid for 12 months on any booking
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
