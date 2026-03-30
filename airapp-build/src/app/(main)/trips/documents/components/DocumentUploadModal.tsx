'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { X, Upload, Camera, Image, FileText } from 'lucide-react';

interface DocumentUploadModalProps {
  documentType?: string;
  onUpload: (name: string, type: string) => void;
  onClose: () => void;
}

export function DocumentUploadModal({ documentType, onUpload, onClose }: DocumentUploadModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState(documentType || 'custom');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    if (!name.trim()) return;
    setUploading(true);
    // Simulate upload
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onUpload(name, type);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-overlay-dark"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Upload document"
    >
      <div
        className={cn(
          'w-full max-h-[80vh] overflow-y-auto rounded-t-2xl p-5 pb-24',
          'bg-background dark:bg-background',
          'animate-[slideUp_var(--duration-short)_var(--ease-in-out)]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle & close */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-1 bg-surface-300 dark:bg-muted rounded-full" />
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-md hover:bg-surface-200 dark:hover:bg-input',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
            )}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-primary-700 dark:text-muted-foreground" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-primary-900 dark:text-foreground mb-4">
          Upload Document
        </h2>

        {uploading ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-full border-4 border-primary-200 dark:border-primary border-t-primary-500 dark:border-t-primary-400 animate-spin mb-4" />
            <p className="text-sm font-medium text-primary-900 dark:text-foreground mb-2">
              Uploading & Encrypting...
            </p>
            <div className="w-48 h-1.5 bg-surface-200 dark:bg-input rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 dark:bg-primary-400 rounded-full transition-all duration-[--duration-short]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-primary-600 dark:text-faint-foreground mt-1">
              {progress}%
            </p>
          </div>
        ) : (
          <>
            {/* Document name */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-primary-900 dark:text-foreground mb-1.5 block">
                Document Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., UK Visitor Visa"
                className={cn(
                  'w-full px-3 py-2.5 text-sm rounded-md border',
                  'bg-background border-surface-300',
                  'dark:bg-card dark:border-muted',
                  'text-primary-900 dark:text-foreground',
                  'placeholder:text-primary-500 dark:placeholder:text-faint-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'min-h-[var(--touch-min)]'
                )}
              />
            </label>

            {/* Document type */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-primary-900 dark:text-foreground mb-1.5 block">
                Document Type
              </span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={cn(
                  'w-full px-3 py-2.5 text-sm rounded-md border',
                  'bg-background border-surface-300',
                  'dark:bg-card dark:border-muted',
                  'text-primary-900 dark:text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'min-h-[var(--touch-min)]'
                )}
              >
                <option value="passport">Passport</option>
                <option value="visa">Visa</option>
                <option value="insurance">Insurance</option>
                <option value="booking">Booking Confirmation</option>
                <option value="custom">Other</option>
              </select>
            </label>

            {/* Upload sources */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Camera, label: 'Camera' },
                { icon: Image, label: 'Gallery' },
                { icon: FileText, label: 'Files' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 p-4 rounded-lg',
                    'border-2 border-dashed border-primary-300',
                    'dark:border-primary',
                    'hover:bg-surface-200 dark:hover:bg-surface-elevated',
                    'transition-colors duration-[--duration-micro]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    'min-h-[var(--touch-preferred)]'
                  )}
                >
                  <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <span className="text-xs font-medium text-primary-700 dark:text-muted-foreground">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleUpload}
              disabled={!name.trim()}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 rounded-md',
                'bg-secondary-500 text-white font-medium text-sm',
                'hover:bg-secondary-600 active:bg-secondary-700',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-preferred)]',
                'disabled:opacity-40 disabled:cursor-not-allowed'
              )}
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              Upload & Encrypt
            </button>
          </>
        )}
      </div>
    </div>
  );
}
