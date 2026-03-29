'use client';

import { cn } from '@/lib/utils/cn';
import { FamilyMemberProfile } from '@/lib/types/family';
import { AlertTriangle, Phone, ShieldCheck, Heart } from 'lucide-react';

interface SpecialNeedsCardProps {
  members: FamilyMemberProfile[];
}

export function SpecialNeedsCard({ members }: SpecialNeedsCardProps) {
  const membersWithNeeds = members.filter(
    (m) => m.medicalInfo?.allergies?.length || m.medicalInfo?.medications?.length
  );

  if (membersWithNeeds.length === 0) return null;

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-warning-50 border-warning-200',
        'dark:bg-[oklch(18%_0.003_50)] dark:border-warning-800'
      )}
      aria-label="Special needs and medical information"
    >
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Special Needs & Medical
        </h2>
      </div>

      <div className="space-y-3">
        {membersWithNeeds.map((member) => (
          <div
            key={member.id}
            className={cn(
              'rounded-md p-3 border',
              'bg-background dark:bg-[oklch(15%_0.002_50)]',
              'border-warning-200 dark:border-[oklch(32%_0.008_50)]'
            )}
            role="article"
            aria-label={`Medical information for ${member.name}`}
          >
            <h3 className="font-medium text-sm text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-2">
              {member.name} ({member.age}y)
            </h3>

            {/* Allergies */}
            {member.medicalInfo?.allergies?.map((allergy) => (
              <div
                key={allergy}
                className="flex items-center gap-2 mb-1.5"
              >
                <AlertTriangle className="w-4 h-4 text-warning-600 dark:text-warning-400 shrink-0" aria-hidden="true" />
                <span className="text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                  Allergy: {allergy}
                </span>
              </div>
            ))}

            {/* Medications */}
            {member.medicalInfo?.medications?.map((med) => (
              <div
                key={med}
                className="flex items-center gap-2 mb-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-info-600 dark:text-info-400 shrink-0" aria-hidden="true" />
                <span className="text-sm text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                  {med}
                </span>
              </div>
            ))}

            {/* Doctor contact */}
            {member.medicalInfo?.doctorContact && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-warning-200 dark:border-[oklch(32%_0.008_50)]">
                <Phone className="w-4 h-4 text-primary-500 dark:text-[oklch(60%_0.005_50)] shrink-0" aria-hidden="true" />
                <span className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)]">
                  {member.medicalInfo.doctorContact}
                </span>
              </div>
            )}

            {/* Insurance */}
            {member.medicalInfo?.insuranceInfo && (
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-4 h-4 text-primary-500 dark:text-[oklch(60%_0.005_50)] shrink-0" aria-hidden="true" />
                <span className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)]">
                  {member.medicalInfo.insuranceInfo}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
