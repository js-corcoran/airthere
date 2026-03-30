'use client';

import { Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { FamilyRebookingInfo } from '@/lib/types/disruption';

interface FamilyRebookingConfirmProps {
  familyInfo: FamilyRebookingInfo;
  onConfirm: () => void;
}

export function FamilyRebookingConfirm({ familyInfo, onConfirm }: FamilyRebookingConfirmProps) {
  const { members, originalSeating, newSeating, seatingIntegrityMaintained } = familyInfo;

  return (
    <section aria-labelledby="family-rebook-heading" className="space-y-3">
      <h3
        id="family-rebook-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Family Seating
      </h3>
      <div className={cn(
        'rounded-[var(--radius-lg)] p-4 border',
        seatingIntegrityMaintained
          ? 'bg-info-50 dark:bg-surface-info border-info-300 dark:border-info-700'
          : 'bg-warning-50 dark:bg-surface-warning border-warning-400 dark:border-warning-600',
      )}>
        <div className="flex items-center gap-2 mb-4">
          {seatingIntegrityMaintained ? (
            <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
          )}
          <span className={cn(
            'font-bold text-sm',
            seatingIntegrityMaintained
              ? 'text-success-700 dark:text-success-300'
              : 'text-warning-700 dark:text-warning-300'
          )}>
            {seatingIntegrityMaintained
              ? 'All family members seated together'
              : 'Family seating requires review'}
          </span>
        </div>

        <div className="space-y-2">
          {members.map((member, idx) => {
            const origSeat = originalSeating.find(s => s.memberName === member.name);
            const newSeat = newSeating.find(s => s.memberName === member.name);

            return (
              <div
                key={member.id}
                className={cn(
                  'flex items-center justify-between py-2.5 px-3',
                  'rounded-[var(--radius-md)]',
                  'bg-white/60 dark:bg-surface-elevated',
                  'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                  idx !== members.length - 1 && 'mb-1'
                )}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                    member.age < 13
                      ? 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200'
                      : 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200'
                  )}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-800 dark:text-subtle-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-primary-500 dark:text-primary-400">
                      {member.age < 13 ? `Age ${member.age}` : 'Adult'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-primary-400 dark:text-primary-500 line-through font-mono">
                    {origSeat?.seat}
                  </span>
                  <span className="text-primary-400 dark:text-primary-500" aria-hidden="true">&rarr;</span>
                  <span className="font-mono font-semibold text-primary-800 dark:text-subtle-foreground">
                    {newSeat?.seat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onConfirm}
          className={cn(
            'w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)]',
            'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
            'text-white font-semibold text-sm',
            'transition-colors duration-[--duration-micro]',
            'min-h-[var(--touch-preferred)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
          aria-label="Confirm family rebooking"
        >
          <Users className="w-4 h-4" aria-hidden="true" />
          Confirm Family Rebooking
        </button>
      </div>
    </section>
  );
}
