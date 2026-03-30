'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { MOCK_FAMILY_DATA } from '@/lib/mock-data/family';
import { FamilyData, ChecklistItem } from '@/lib/types/family';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Users, Settings, UserPlus, Plane } from 'lucide-react';

import { FamilyMemberCard } from './components/FamilyMemberCard';
import { SharedChecklist } from './components/SharedChecklist';
import { SpecialNeedsCard } from './components/SpecialNeedsCard';
import { SeatingVisualization } from './components/SeatingVisualization';
import { EntertainmentPlanning } from './components/EntertainmentPlanning';
import { DayOfTravelTimeline } from './components/DayOfTravelTimeline';
import { FamilyChat } from './components/FamilyChat';

type LoadingState = 'loading' | 'success' | 'error';

export default function FamilyHubPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [family, setFamily] = useState<FamilyData | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setFamily(MOCK_FAMILY_DATA);
        setChecklist(MOCK_FAMILY_DATA.checklist);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  const handleToggleChecklist = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEditMember = (memberId: string) => {
    // Design mode: no-op, shows interaction is wired up
  };

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error' || !family) {
    return (
      <ErrorState
        message="Unable to load family information. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => {
            setFamily(MOCK_FAMILY_DATA);
            setChecklist(MOCK_FAMILY_DATA.checklist);
            setState('success');
          }, 600);
        }}
      />
    );
  }

  // Non-family persona: show prompt to set up family group
  if (persona !== 'family') {
    return (
      <EmptyState
        icon="👨‍👩‍👧‍👦"
        title="Family Hub"
        description="Add family members to your profile to unlock coordinated trip planning, shared checklists, and family seating management."
        action={{
          label: 'Set Up Family Group',
          onClick: () => {},
        }}
      />
    );
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-secondary-500 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
          <h1 className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {family.familyName}
          </h1>
        </div>
        <p className="text-sm text-primary-500 dark:text-[oklch(60%_0.005_50)]">
          {family.members.length} members
        </p>

        {/* Trip context */}
        <div
          className={cn(
            'mt-3 px-3 py-2.5 rounded-md flex items-center gap-2',
            'bg-secondary-50 border border-secondary-200',
            'dark:bg-[oklch(18%_0.010_50)] dark:border-[oklch(32%_0.020_50)]'
          )}
        >
          <Plane className="w-4 h-4 text-secondary-600 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
          <div>
            <span className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {family.tripName}
            </span>
            <span className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] ml-2">
              {family.tripDates}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          {[
            { label: 'Manage', icon: Settings },
            { label: 'Invite', icon: UserPlus },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md',
                'border border-primary-300 text-primary-700',
                'dark:border-[oklch(40%_0.030_262)] dark:text-[oklch(85%_0.005_50)]',
                'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content sections */}
      <div className="px-4 space-y-4">
        {/* Family Members */}
        <section aria-label="Family members">
          <h2 className="text-sm font-semibold text-primary-700 dark:text-[oklch(85%_0.005_50)] uppercase tracking-wider mb-2">
            Family Members
          </h2>
          <div className="space-y-3">
            {family.members.map((member, i) => (
              <div
                key={member.id}
                className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <FamilyMemberCard
                  member={member}
                  onEdit={handleEditMember}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Pre-Trip Checklist */}
        <SharedChecklist
          items={checklist}
          tripLabel={`${family.tripName} — ${family.tripDates}`}
          onToggle={handleToggleChecklist}
        />

        {/* Special Needs */}
        <SpecialNeedsCard members={family.members} />

        {/* Seating */}
        <SeatingVisualization seating={family.seating} />

        {/* Entertainment */}
        <EntertainmentPlanning recommendations={family.entertainment} />

        {/* Day of Travel */}
        <DayOfTravelTimeline
          events={family.dayOfTravel}
          travelDate="March 30, 2026"
        />

        {/* Communication */}
        <FamilyChat messages={family.chatMessages} />
      </div>
    </div>
  );
}
