'use client';

import { cn } from '@/lib/utils/cn';
import { TripDocument } from '@/lib/types/document';
import { X, Download, FileText, Shield, Calendar, Hash } from 'lucide-react';

interface DocumentViewerProps {
  document: TripDocument;
  onClose: () => void;
}

export function DocumentViewer({ document: doc, onClose }: DocumentViewerProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-dark"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${doc.name}`}
    >
      <div
        className={cn(
          'w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-xl',
          'bg-background dark:bg-background',
          'animate-[fadeIn_var(--duration-short)]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-300 dark:border-muted">
          <h2 className="text-base font-bold text-primary-900 dark:text-foreground truncate pr-2">
            {doc.name}
          </h2>
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-md hover:bg-surface-200 dark:hover:bg-input',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center shrink-0'
            )}
            aria-label="Close viewer"
          >
            <X className="w-5 h-5 text-primary-700 dark:text-muted-foreground" />
          </button>
        </div>

        {/* Document preview placeholder */}
        <div
          className={cn(
            'flex flex-col items-center justify-center py-16 mx-4 my-4 rounded-lg',
            'bg-surface-200 dark:bg-surface-elevated',
            'border-2 border-dashed border-primary-200 dark:border-primary'
          )}
        >
          <FileText className="w-12 h-12 text-primary-500 dark:text-primary-400 mb-3" aria-hidden="true" />
          <p className="text-sm text-primary-700 dark:text-caption-foreground">
            Document Preview
          </p>
          <p className="text-xs text-primary-600 dark:text-faint-foreground mt-1">
            {doc.fileSize ? `${(doc.fileSize / 1024).toFixed(0)} KB` : 'No file size'}
          </p>
        </div>

        {/* Metadata */}
        <div className="px-4 pb-4 space-y-2">
          {doc.holderName && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-600 dark:text-faint-foreground">Holder</span>
              <span className="text-primary-900 dark:text-foreground font-medium">{doc.holderName}</span>
            </div>
          )}
          {doc.metadata.documentNumber && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-primary-600 dark:text-faint-foreground">
                <Hash className="w-3.5 h-3.5" aria-hidden="true" /> Number
              </span>
              <span className="text-primary-900 dark:text-foreground font-mono text-xs">{doc.metadata.documentNumber}</span>
            </div>
          )}
          {doc.expirationDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-primary-600 dark:text-faint-foreground">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> Expires
              </span>
              <span className="text-primary-900 dark:text-foreground">{doc.expirationDate}</span>
            </div>
          )}
          {doc.encrypted && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-primary-600 dark:text-faint-foreground">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Security
              </span>
              <span className="text-success-600 dark:text-success-400 font-medium">AES-256 Encrypted</span>
            </div>
          )}
        </div>

        {/* Download action */}
        <div className="px-4 pb-4">
          <button
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-md',
              'bg-primary-500 text-white font-medium text-sm',
              'hover:bg-primary-600 active:bg-primary-700',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-preferred)]'
            )}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
}
