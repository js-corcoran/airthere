'use client';

import { cn } from '@/lib/utils/cn';
import { TripDocument } from '@/lib/types/document';
import { Eye, Share2, Trash2, Upload, FileText, Globe, Shield, Bookmark, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DocumentCardProps {
  document: TripDocument;
  onView?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  onShare?: (documentId: string) => void;
  onUpload?: (documentId: string) => void;
}

const TYPE_ICONS: Record<string, typeof FileText> = {
  passport: Globe,
  visa: Globe,
  insurance: Shield,
  booking: Bookmark,
  custom: FileText,
};

const TYPE_COLORS: Record<string, string> = {
  passport: 'text-primary-600 dark:text-[oklch(70%_0.125_262)]',
  visa: 'text-info-600 dark:text-info-400',
  insurance: 'text-success-600 dark:text-success-400',
  booking: 'text-secondary-600 dark:text-[oklch(72%_0.158_50)]',
  custom: 'text-primary-500 dark:text-[oklch(60%_0.005_50)]',
};

function getExpirationInfo(expirationDate?: string): { label: string; variant: 'ok' | 'warning' | 'expired' } | null {
  if (!expirationDate) return null;
  const exp = new Date(expirationDate);
  const now = new Date();
  const daysUntil = Math.floor((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { label: `Expired ${Math.abs(daysUntil)} days ago`, variant: 'expired' };
  if (daysUntil < 30) return { label: `Expires in ${daysUntil} days`, variant: 'warning' };
  if (daysUntil < 180) return { label: `Expires ${exp.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`, variant: 'ok' };
  return { label: `Valid until ${exp.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`, variant: 'ok' };
}

export function DocumentCard({ document: doc, onView, onDelete, onShare, onUpload }: DocumentCardProps) {
  const Icon = TYPE_ICONS[doc.type] || FileText;
  const iconColor = TYPE_COLORS[doc.type] || TYPE_COLORS.custom;
  const expInfo = getExpirationInfo(doc.expirationDate);
  const isNotUploaded = doc.status === 'required';

  return (
    <div
      className={cn(
        'rounded-lg p-4 border shadow-sm',
        'transition-shadow duration-[--duration-micro] hover:shadow-md',
        doc.status === 'expired'
          ? 'bg-error-50 border-error-300 dark:bg-[oklch(18%_0.008_25)] dark:border-error-800'
          : doc.status === 'expiring-soon'
            ? 'bg-warning-50 border-warning-300 dark:bg-[oklch(18%_0.005_60)] dark:border-warning-800'
            : 'bg-surface border-surface-300 dark:bg-[oklch(18%_0.003_50)] dark:border-[oklch(32%_0.008_50)]'
      )}
      role="article"
      aria-label={`${doc.name}${doc.holderName ? ` for ${doc.holderName}` : ''}, ${doc.status}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn('shrink-0 mt-0.5', iconColor)}>
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] truncate">
                {doc.name}
              </h3>
              {doc.holderName && (
                <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
                  {doc.holderName}
                </p>
              )}
            </div>

            {/* Status badge */}
            {doc.required && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-600 dark:bg-[oklch(25%_0.010_262)] dark:text-[oklch(70%_0.010_262)] shrink-0 font-medium">
                Required
              </span>
            )}
          </div>

          {/* Expiration / status */}
          <div className="flex items-center gap-1.5 mt-1.5">
            {isNotUploaded ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-warning-500" aria-hidden="true" />
                <span className="text-xs font-medium text-warning-700 dark:text-warning-300">
                  Not uploaded
                </span>
              </>
            ) : expInfo ? (
              <>
                {expInfo.variant === 'ok' && <CheckCircle2 className="w-3.5 h-3.5 text-success-500 dark:text-success-400" aria-hidden="true" />}
                {expInfo.variant === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-warning-500" aria-hidden="true" />}
                {expInfo.variant === 'expired' && <AlertTriangle className="w-3.5 h-3.5 text-error-500" aria-hidden="true" />}
                <span
                  className={cn(
                    'text-xs font-medium',
                    expInfo.variant === 'ok' && 'text-success-700 dark:text-success-300',
                    expInfo.variant === 'warning' && 'text-warning-700 dark:text-warning-300',
                    expInfo.variant === 'expired' && 'text-error-700 dark:text-error-300'
                  )}
                >
                  {expInfo.label}
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-success-500 dark:text-success-400" aria-hidden="true" />
                <span className="text-xs text-success-700 dark:text-success-300">Uploaded</span>
              </>
            )}
          </div>

          {/* Document number */}
          {doc.metadata.documentNumber && (
            <p className="text-[10px] text-primary-400 dark:text-[oklch(50%_0.005_50)] mt-1 font-mono">
              {doc.metadata.documentNumber}
            </p>
          )}

          {/* Encryption badge */}
          {doc.encrypted && !isNotUploaded && (
            <div className="flex items-center gap-1 mt-1">
              <Shield className="w-3 h-3 text-primary-400 dark:text-[oklch(50%_0.005_50)]" aria-hidden="true" />
              <span className="text-[10px] text-primary-400 dark:text-[oklch(50%_0.005_50)]">
                Encrypted
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1.5 mt-3">
            {isNotUploaded ? (
              <button
                onClick={() => onUpload?.(doc.id)}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md',
                  'bg-secondary-500 text-white',
                  'hover:bg-secondary-600 active:bg-secondary-700',
                  'transition-colors duration-[--duration-micro]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'min-h-[var(--touch-min)]'
                )}
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                Upload Now
              </button>
            ) : (
              <>
                <button
                  onClick={() => onView?.(doc.id)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md',
                    'bg-surface-200 text-primary-700',
                    'dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]',
                    'hover:bg-surface-300 dark:hover:bg-[oklch(30%_0.008_50)]',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-min)]'
                  )}
                  aria-label={`View ${doc.name}`}
                >
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  View
                </button>
                <button
                  onClick={() => onShare?.(doc.id)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md',
                    'bg-surface-200 text-primary-700',
                    'dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(85%_0.005_50)]',
                    'hover:bg-surface-300 dark:hover:bg-[oklch(30%_0.008_50)]',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-min)]'
                  )}
                  aria-label={`Share ${doc.name}`}
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Share
                </button>
                <button
                  onClick={() => onDelete?.(doc.id)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md',
                    'text-error-600 hover:bg-error-50',
                    'dark:text-error-400 dark:hover:bg-[oklch(20%_0.008_25)]',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-min)]'
                  )}
                  aria-label={`Delete ${doc.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
