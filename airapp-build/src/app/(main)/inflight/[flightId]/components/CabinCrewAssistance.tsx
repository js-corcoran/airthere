'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { CabinServiceRequest } from '@/lib/types/inflight';
import { PhoneCall, Droplets, BedSingle, Pill, MessageCircle, CheckCircle2, Clock } from 'lucide-react';

interface CabinCrewAssistanceProps {
  requests: CabinServiceRequest[];
}

const ICON_MAP: Record<string, typeof Droplets> = {
  droplets: Droplets,
  'bed-single': BedSingle,
  pill: Pill,
  'message-circle': MessageCircle,
};

export function CabinCrewAssistance({ requests }: CabinCrewAssistanceProps) {
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequest = (type: string) => {
    setActiveRequest(type);
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 4000);
  };

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-card',
        'border-surface-300 dark:border-muted'
      )}
      aria-label="Cabin crew assistance"
    >
      <h2 className="text-base font-semibold text-primary-900 dark:text-foreground mb-3">
        Service Requests
      </h2>

      {/* Call attendant */}
      <button
        onClick={() => handleRequest('call')}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-3 mb-3 rounded-md',
          'bg-secondary-500 text-white font-medium text-sm',
          'hover:bg-secondary-600 active:bg-secondary-700',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'min-h-[var(--touch-min)]'
        )}
      >
        <PhoneCall className="w-5 h-5" aria-hidden="true" />
        Call Attendant
      </button>

      {/* Request confirmation */}
      {requestSent && (
        <div
          className={cn(
            'flex items-center gap-2 p-3 rounded-md mb-3',
            'bg-success-50 border border-success-200',
            'dark:bg-surface-success dark:border-success-800'
          )}
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-success-800 dark:text-success-200">
              Request sent
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-success-600 dark:text-success-400" aria-hidden="true" />
              <p className="text-xs text-success-600 dark:text-success-400">
                Estimated wait: 3-5 minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick requests */}
      <div className="grid grid-cols-4 gap-2">
        {requests.map((req, i) => {
          const Icon = ICON_MAP[req.icon] || MessageCircle;
          return (
            <button
              key={req.id}
              onClick={() => handleRequest(req.type)}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg',
                'bg-background dark:bg-background',
                'border border-surface-300 dark:border-muted',
                'hover:bg-surface-200 dark:hover:bg-surface-elevated',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]'
              )}
              style={{ animationDelay: `${i * 60}ms` }}
              aria-label={`Request ${req.label}`}
            >
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span className="text-[10px] font-medium text-primary-700 dark:text-muted-foreground">
                {req.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
