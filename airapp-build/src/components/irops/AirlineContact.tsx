'use client';

import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ContactMethod } from '@/lib/types/disruption';

interface AirlineContactProps {
  contactMethods: ContactMethod[];
}

const METHOD_CONFIG: Record<string, { icon: typeof Phone; color: string }> = {
  chat: { icon: MessageSquare, color: 'text-success-600 dark:text-success-400' },
  call: { icon: Phone, color: 'text-info-600 dark:text-info-400' },
  email: { icon: Mail, color: 'text-primary-600 dark:text-primary-400' },
  desk: { icon: MapPin, color: 'text-secondary-600 dark:text-secondary-400' },
};

const METHOD_LABELS: Record<string, string> = {
  chat: 'Start Chat',
  call: 'Call Now',
  email: 'Send Email',
  desk: 'Get Directions',
};

export function AirlineContact({ contactMethods }: AirlineContactProps) {
  return (
    <section aria-labelledby="contact-heading" className="space-y-3">
      <h3
        id="contact-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Need Help?
      </h3>
      <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border border-surface-300 dark:border-muted">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {contactMethods.map((method, i) => {
            const config = METHOD_CONFIG[method.type] ?? METHOD_CONFIG.chat;
            const Icon = config.icon;

            return (
              <button
                key={method.type}
                disabled={!method.available}
                style={{ animationDelay: `${i * 60}ms` }}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-[var(--radius-md)] text-left',
                  'border border-surface-300 dark:border-muted',
                  'transition-colors duration-[--duration-micro]',
                  'min-h-[var(--touch-preferred)]',
                  'hover:bg-surface-200 dark:hover:bg-surface-elevated',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                )}
                aria-label={`${method.label}: ${method.waitTime} wait`}
              >
                <div className={cn('shrink-0', config.color)}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-800 dark:text-subtle-foreground">
                    {method.label}
                  </p>
                  <p className="text-xs text-primary-500 dark:text-primary-400">
                    {method.waitTime}
                  </p>
                </div>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-300 shrink-0">
                  {METHOD_LABELS[method.type]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
