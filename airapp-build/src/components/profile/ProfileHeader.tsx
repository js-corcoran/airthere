'use client';

import { Edit3, FileText, ScanFace, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ProfileUser, LoyaltyData } from '@/lib/types/profile';

interface ProfileHeaderProps {
  user: ProfileUser;
  loyalty: LoyaltyData;
  onEdit: () => void;
}

function tierColor(tier: string): string {
  const t = tier.toLowerCase();
  if (t.includes('pps') || t.includes('platinum') || t.includes('diamond') || t.includes('1k'))
    return 'bg-secondary-400 text-primary-900';
  if (t.includes('gold'))
    return 'bg-secondary-300 text-primary-900';
  if (t.includes('silver'))
    return 'bg-primary-200 text-primary-800';
  return 'bg-primary-100 text-primary-700';
}

export function ProfileHeader({ user, loyalty, onEdit }: ProfileHeaderProps) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const memberYear = new Date(user.memberSince).getFullYear();

  return (
    <section aria-labelledby="profile-header" className="space-y-3">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-[var(--radius-xl)] p-5 text-white">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold shrink-0">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h2 id="profile-header" className="text-xl font-bold truncate">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                tierColor(loyalty.eliteTier),
              )}>
                {loyalty.eliteTier}
              </span>
            </div>
            <p className="text-xs text-white/70 mt-1">
              Member since {memberYear}
            </p>
          </div>
        </div>

        {/* Biometric status */}
        <div className="flex items-center gap-4 mt-4 text-xs text-white/80">
          <span className="flex items-center gap-1">
            <ScanFace className="w-3.5 h-3.5" aria-hidden="true" />
            Face ID {user.biometric.faceIdEnrolled ? '✓' : '—'}
          </span>
          <span className="flex items-center gap-1">
            <Fingerprint className="w-3.5 h-3.5" aria-hidden="true" />
            Fingerprint {user.biometric.fingerprintEnrolled ? '✓' : '—'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onEdit}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)]',
              'bg-white/15 hover:bg-white/25 text-white text-sm font-medium',
              'transition-colors duration-[--duration-micro]',
              'min-h-[var(--touch-min)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            )}
          >
            <Edit3 className="w-4 h-4" aria-hidden="true" />
            Edit Profile
          </button>
          <button
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)]',
              'bg-white/15 hover:bg-white/25 text-white text-sm font-medium',
              'transition-colors duration-[--duration-micro]',
              'min-h-[var(--touch-min)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            )}
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            Documents
          </button>
        </div>
      </div>
    </section>
  );
}
