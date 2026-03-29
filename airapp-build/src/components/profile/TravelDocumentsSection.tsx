'use client';

import { BookOpen, Stamp, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { TravelDocuments } from '@/lib/types/profile';

interface TravelDocumentsSectionProps {
  documents: TravelDocuments;
}

function statusColor(status: string): string {
  switch (status) {
    case 'valid':
    case 'active':
      return 'text-success-600 dark:text-success-400';
    case 'expiring':
      return 'text-warning-600 dark:text-warning-400';
    case 'expired':
    case 'none':
      return 'text-error-600 dark:text-error-400';
    default:
      return 'text-primary-500 dark:text-primary-400';
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function TravelDocumentsSection({ documents }: TravelDocumentsSectionProps) {
  return (
    <section aria-labelledby="documents-heading" className="space-y-3">
      <h3
        id="documents-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Travel Documents
      </h3>
      <div className="bg-surface dark:bg-[oklch(18%_0.003_50)] rounded-[var(--radius-lg)] border border-surface-300 dark:border-[oklch(32%_0.008_50)] divide-y divide-surface-300 dark:divide-[oklch(32%_0.008_50)]">
        {/* Passport */}
        {documents.passport && (
          <div className="flex items-center gap-3 px-4 py-3">
            <BookOpen className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                Passport
              </p>
              <p className="text-xs text-primary-500 dark:text-primary-400">
                Expires {formatDate(documents.passport.expiryDate)}
              </p>
            </div>
            <span className={cn('text-xs font-semibold capitalize', statusColor(documents.passport.status))}>
              {documents.passport.status}
            </span>
          </div>
        )}

        {/* Visas */}
        {documents.visas.length > 0 ? (
          documents.visas.map((visa, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Stamp className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-800 dark:text-[oklch(90%_0.002_50)]">
                  {visa.country} Visa
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400">
                  {visa.type} &middot; Expires {formatDate(visa.expiryDate)}
                </p>
              </div>
              <span className={cn('text-xs font-semibold capitalize', statusColor(visa.status))}>
                {visa.status}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-3 px-4 py-3">
            <Stamp className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
            <p className="text-sm text-primary-500 dark:text-primary-400">
              No visas on file
            </p>
          </div>
        )}

        {/* Insurance */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Shield className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary-800 dark:text-[oklch(90%_0.002_50)]">
              Travel Insurance
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              {documents.insurance.provider}
            </p>
          </div>
          <span className={cn('text-xs font-semibold capitalize', statusColor(documents.insurance.status))}>
            {documents.insurance.status}
          </span>
        </div>

        {/* Manage button */}
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
          Manage Documents
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
