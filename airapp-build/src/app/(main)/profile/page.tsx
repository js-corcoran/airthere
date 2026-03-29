'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { getProfileForPersona } from '@/lib/mock-data/profile';
import type { ProfileData } from '@/lib/types/profile';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { LoyaltyOverview } from '@/components/profile/LoyaltyOverview';
import { FrequentFlyerPrograms } from '@/components/profile/FrequentFlyerPrograms';
import { EliteStatusCard } from '@/components/profile/EliteStatusCard';
import { PreferencesQuickAccess } from '@/components/profile/PreferencesQuickAccess';
import { TravelDocumentsSection } from '@/components/profile/TravelDocumentsSection';
import { TravelStatsSection } from '@/components/profile/TravelStatsSection';
import { AccountSecuritySection } from '@/components/profile/AccountSecuritySection';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';

type LoadingState = 'loading' | 'success' | 'error';

export default function ProfilePage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const data = getProfileForPersona(persona);
        setProfile(data);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  if (state === 'loading') return <PageSkeleton />;
  if (state === 'error' || !profile) {
    return (
      <ErrorState
        title="Unable to load profile"
        message="We're having trouble loading your profile. Please try again."
        onRetry={() => setState('loading')}
      />
    );
  }

  const { user, loyalty, documents, preferences, security, travelStats } = profile;

  return (
    <main
      role="main"
      aria-label="User profile"
      className="min-h-screen bg-background dark:bg-[oklch(12%_0.002_50)] pb-24"
    >
      <div className="px-4 pt-4 space-y-6">
        {/* Profile header with avatar and tier */}
        <ProfileHeader
          user={user}
          loyalty={loyalty}
          onEdit={() => setShowEditModal(true)}
        />

        {/* Loyalty overview */}
        <LoyaltyOverview loyalty={loyalty} />

        {/* Travel stats */}
        <TravelStatsSection stats={travelStats} />

        {/* Frequent flyer programs */}
        <FrequentFlyerPrograms programs={loyalty.programs} />

        {/* Elite status and benefits */}
        <EliteStatusCard loyalty={loyalty} />

        {/* Quick preferences */}
        <PreferencesQuickAccess preferences={preferences} />

        {/* Travel documents */}
        <TravelDocumentsSection documents={documents} />

        {/* Account security */}
        <AccountSecuritySection security={security} />

        {/* Biometric enrollment CTA (for unenrolled users) */}
        {(!user.biometric.faceIdEnrolled || !user.biometric.fingerprintEnrolled) && (
          <section aria-labelledby="biometric-cta" className="space-y-3">
            <div className="bg-primary-50 dark:bg-[oklch(18%_0.01_262)] rounded-[var(--radius-lg)] p-4 border border-primary-200 dark:border-primary-700">
              <h3
                id="biometric-cta"
                className="text-sm font-semibold text-primary-800 dark:text-primary-200 mb-1"
              >
                Enable Biometric Check-in
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 mb-3">
                Skip the lines. Enroll Face ID or Fingerprint for faster airport check-in, boarding, and lounge access.
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white text-sm font-medium transition-colors duration-[--duration-micro] min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Set Up Biometrics
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Edit Profile Modal (placeholder) */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Edit profile"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowEditModal(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md bg-background dark:bg-[oklch(18%_0.003_50)] rounded-t-2xl sm:rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-4">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue={user.firstName}
                  className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-surface dark:bg-[oklch(22%_0.005_50)] text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)] focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
                  aria-label="First name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue={user.lastName}
                  className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-surface dark:bg-[oklch(22%_0.005_50)] text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)] focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
                  aria-label="Last name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-surface dark:bg-[oklch(22%_0.005_50)] text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)] focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
                  aria-label="Email"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-surface dark:bg-[oklch(22%_0.005_50)] text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)] focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600 min-h-[var(--touch-min)]"
                  aria-label="Phone"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300 text-sm font-medium hover:bg-primary-50 dark:hover:bg-[oklch(22%_0.005_50)] transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white text-sm font-semibold transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
