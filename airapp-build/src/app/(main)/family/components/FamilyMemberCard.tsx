'use client';

import { cn } from '@/lib/utils/cn';
import { FamilyMemberProfile } from '@/lib/types/family';
import { User, AlertTriangle, FileCheck, Edit2, ShieldCheck } from 'lucide-react';

interface FamilyMemberCardProps {
  member: FamilyMemberProfile;
  onEdit: (memberId: string) => void;
}

function getDocBadge(status: string) {
  switch (status) {
    case 'valid':
      return { label: 'Valid', className: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300' };
    case 'expiring':
      return { label: 'Expiring', className: 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300' };
    case 'expired':
      return { label: 'Expired', className: 'bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-300' };
    case 'missing':
      return { label: 'Missing', className: 'bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-300' };
    default:
      return { label: status, className: 'bg-surface-200 text-primary-700' };
  }
}

function getRelationshipLabel(rel: string, age: number) {
  if (rel === 'child') return `Child, ${age}y`;
  if (rel === 'spouse') return 'Spouse';
  if (rel === 'self') return 'Primary';
  if (rel === 'parent') return 'Parent';
  return rel;
}

export function FamilyMemberCard({ member, onEdit }: FamilyMemberCardProps) {
  const passport = getDocBadge(member.documents.passportStatus);
  const hasAlerts = member.medicalInfo?.allergies?.length || member.medicalInfo?.medications?.length;

  return (
    <div
      className={cn(
        'rounded-lg p-4 border shadow-sm',
        'bg-primary-50 border-primary-200',
        'dark:bg-[oklch(18%_0.003_50)] dark:border-[oklch(32%_0.008_50)]',
        'transition-all duration-[--duration-micro] hover:shadow-md hover:-translate-y-0.5'
      )}
      role="article"
      aria-label={`Family member: ${member.name}, age ${member.age}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
            'bg-primary-200 dark:bg-[oklch(30%_0.030_262)]'
          )}
          aria-hidden="true"
        >
          <User className="w-6 h-6 text-primary-600 dark:text-[oklch(70%_0.125_262)]" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {member.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-200 text-primary-700 dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]">
              {getRelationshipLabel(member.relationship, member.age)}
            </span>
          </div>

          {/* Dietary */}
          {member.dietary && (
            <p className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)] mt-1">
              Dietary: {member.dietary}
            </p>
          )}

          {/* Medical alerts */}
          {hasAlerts && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {member.medicalInfo?.allergies?.map((allergy) => (
                <span
                  key={allergy}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200"
                >
                  <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                  {allergy}
                </span>
              ))}
              {member.medicalInfo?.medications?.map((med) => (
                <span
                  key={med}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200"
                >
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  {med}
                </span>
              ))}
            </div>
          )}

          {/* Document status */}
          <div className="flex items-center gap-2 mt-2">
            <FileCheck className="w-3.5 h-3.5 text-primary-500 dark:text-[oklch(60%_0.005_50)]" aria-hidden="true" />
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', passport.className)}>
              Passport: {passport.label}
              {member.documents.passportExpiry && ` (${member.documents.passportExpiry.slice(0, 4)})`}
            </span>
          </div>
        </div>

        {/* Edit button */}
        <button
          onClick={() => onEdit(member.id)}
          className={cn(
            'shrink-0 p-2 rounded-md',
            'text-primary-500 hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
          )}
          aria-label={`Edit ${member.name}`}
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
