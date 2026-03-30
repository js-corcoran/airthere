'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { TripDocument } from '@/lib/types/document';
import { getDocumentsForPersona } from '@/lib/mock-data/documents';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText, Plus, ShieldCheck, Plane } from 'lucide-react';

import { BiometricUnlock } from './components/BiometricUnlock';
import { DocumentCard } from './components/DocumentCard';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentViewer } from './components/DocumentViewer';

type LoadingState = 'loading' | 'success' | 'error';

export default function DocumentVaultPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [isLocked, setIsLocked] = useState(true);
  const [tripDocuments, setTripDocuments] = useState<TripDocument[]>([]);
  const [generalDocuments, setGeneralDocuments] = useState<TripDocument[]>([]);
  const [tripLabel, setTripLabel] = useState('');
  const [viewingDoc, setViewingDoc] = useState<TripDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const data = getDocumentsForPersona(persona);
        setTripDocuments(data.tripDocuments);
        setGeneralDocuments(data.generalDocuments);
        setTripLabel(data.tripLabel);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  const handleUnlock = () => setIsLocked(false);

  const handleView = (docId: string) => {
    const doc = [...tripDocuments, ...generalDocuments].find((d) => d.id === docId);
    if (doc) setViewingDoc(doc);
  };

  const handleDelete = (docId: string) => {
    setTripDocuments((prev) => prev.filter((d) => d.id !== docId));
    setGeneralDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleUpload = (name: string, type: string) => {
    const newDoc: TripDocument = {
      id: `new-${Date.now()}`,
      type: type as TripDocument['type'],
      name,
      required: false,
      status: 'uploaded',
      uploadDate: new Date().toISOString().split('T')[0],
      encrypted: true,
      metadata: {},
    };
    setTripDocuments((prev) => [...prev, newDoc]);
    setShowUploadModal(false);
  };

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error') {
    return (
      <ErrorState
        message="Unable to load your documents. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => {
            const data = getDocumentsForPersona(persona);
            setTripDocuments(data.tripDocuments);
            setGeneralDocuments(data.generalDocuments);
            setTripLabel(data.tripLabel);
            setState('success');
          }, 600);
        }}
      />
    );
  }

  // Locked state
  if (isLocked) {
    return <BiometricUnlock isLocked={isLocked} onUnlock={handleUnlock} />;
  }

  const requiredCount = tripDocuments.filter((d) => d.required).length;
  const uploadedRequiredCount = tripDocuments.filter((d) => d.required && d.status !== 'required').length;
  const allRequiredUploaded = requiredCount === uploadedRequiredCount;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
            <h1 className="text-xl font-bold text-primary-900 dark:text-foreground">
              Document Vault
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-success-600 dark:text-success-400">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Unlocked</span>
          </div>
        </div>
        <p className="text-sm text-primary-600 dark:text-faint-foreground">
          Secure, encrypted storage for travel documents
        </p>

        {/* Required docs status */}
        <div
          className={cn(
            'mt-3 px-3 py-2.5 rounded-md flex items-center justify-between',
            allRequiredUploaded
              ? 'bg-success-50 border border-success-200 dark:bg-surface-success dark:border-success-800'
              : 'bg-warning-50 border border-warning-200 dark:bg-card dark:border-warning-800'
          )}
        >
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <span className="text-sm font-medium text-primary-900 dark:text-foreground">
              {tripLabel}
            </span>
          </div>
          <span
            className={cn(
              'text-xs font-medium',
              allRequiredUploaded
                ? 'text-success-700 dark:text-success-300'
                : 'text-warning-700 dark:text-warning-300'
            )}
          >
            {uploadedRequiredCount}/{requiredCount} required
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Trip documents */}
        <section aria-label="Trip documents">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-primary-700 dark:text-muted-foreground uppercase tracking-wider">
              Trip Documents
            </h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md',
                'bg-secondary-500 text-white',
                'hover:bg-secondary-600 active:bg-secondary-700',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add
            </button>
          </div>

          {tripDocuments.length > 0 ? (
            <ul className="space-y-3" role="list" aria-label="Travel documents">
              {tripDocuments.map((doc, i) => (
                <li key={doc.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                  <DocumentCard
                    document={doc}
                    onView={handleView}
                    onDelete={handleDelete}
                    onShare={() => {}}
                    onUpload={() => setShowUploadModal(true)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="📄"
              title="No trip documents"
              description="Upload passports, visas, and insurance for your upcoming trip."
              action={{
                label: 'Upload Document',
                onClick: () => setShowUploadModal(true),
              }}
            />
          )}
        </section>

        {/* General documents */}
        {generalDocuments.length > 0 && (
          <section aria-label="General documents">
            <h2 className="text-sm font-semibold text-primary-700 dark:text-muted-foreground uppercase tracking-wider mb-2">
              General Documents
            </h2>
            <ul className="space-y-3" role="list" aria-label="General documents">
              {generalDocuments.map((doc, i) => (
                <li key={doc.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                  <DocumentCard
                    document={doc}
                    onView={handleView}
                    onDelete={handleDelete}
                    onShare={() => {}}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Modals */}
      {viewingDoc && (
        <DocumentViewer
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}

      {showUploadModal && (
        <DocumentUploadModal
          onUpload={handleUpload}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}
