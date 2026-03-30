'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { FamilyChatMessage } from '@/lib/types/family';
import { MessageCircle, Send, Share2, Printer } from 'lucide-react';

interface FamilyChatProps {
  messages: FamilyChatMessage[];
}

export function FamilyChat({ messages }: FamilyChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-surface dark:bg-card',
        'border-surface-300 dark:border-muted'
      )}
      aria-label="Family communication"
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-5 h-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
        <h2 className="text-base font-semibold text-primary-900 dark:text-foreground">
          Family Trip Chat
        </h2>
      </div>

      {/* Messages */}
      <div className="space-y-2 mb-4" role="log" aria-label="Recent messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'rounded-md px-3 py-2',
              'bg-background dark:bg-background',
              'border border-surface-300 dark:border-muted'
            )}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-primary-700 dark:text-muted-foreground">
                {msg.sender}
              </span>
              <span className="text-xs text-primary-600 dark:text-faint-foreground">
                {msg.timestamp}
              </span>
            </div>
            <p className="text-sm text-primary-800 dark:text-subtle-foreground">
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      {/* Composer */}
      {showComposer && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className={cn(
              'flex-1 px-3 py-2 text-sm rounded-md border',
              'bg-background border-surface-300',
              'dark:bg-background dark:border-muted',
              'text-primary-900 dark:text-foreground',
              'placeholder:text-primary-500 dark:placeholder:text-faint-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'min-h-[var(--touch-min)]'
            )}
            aria-label="Message to family"
          />
          <button
            className={cn(
              'p-2 rounded-md bg-primary-500 text-white',
              'hover:bg-primary-600 active:bg-primary-700',
              'transition-colors duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowComposer(!showComposer)}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md',
            'bg-primary-500 text-white',
            'hover:bg-primary-600 active:bg-primary-700',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-min)]'
          )}
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Message Family
        </button>
        <button
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md',
            'border border-primary-300 text-primary-700',
            'dark:border-primary dark:text-muted-foreground',
            'hover:bg-surface-200 dark:hover:bg-input',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-min)]'
          )}
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          Share Trip
        </button>
        <button
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md',
            'border border-primary-300 text-primary-700',
            'dark:border-primary dark:text-muted-foreground',
            'hover:bg-surface-200 dark:hover:bg-input',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-min)]'
          )}
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          Print Itinerary
        </button>
      </div>
    </section>
  );
}
