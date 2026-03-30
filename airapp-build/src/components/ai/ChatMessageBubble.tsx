'use client';

import { cn } from '@/lib/utils/cn';
import type { ChatMessage, SuggestionChipData, ActionCardData } from '@/lib/types/ai';
import { Plane, Clock, CheckCircle } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onSuggestionSelect?: (chip: SuggestionChipData) => void;
  onActionCardBook?: (card: ActionCardData) => void;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function ChatMessageBubble({ message, onSuggestionSelect, onActionCardBook }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  if (message.isTyping) {
    return (
      <div className="flex gap-3 mb-4" aria-label="Assistant is typing">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary-600 dark:text-primary-300">AT</span>
        </div>
        <div className="bg-surface-200 dark:bg-input rounded-2xl px-4 py-3 max-w-[80%]">
          <div className="flex gap-1.5" role="status" aria-label="Typing">
            <span className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-3 mb-4', isUser && 'flex-row-reverse')}>
      {/* Avatar (bot only) */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary-600 dark:text-primary-300">AT</span>
        </div>
      )}

      <div className={cn('max-w-[80%] space-y-2', isUser && 'items-end')}>
        {/* Message bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5',
            isUser
              ? 'bg-primary-600 dark:bg-primary-500 text-white'
              : 'bg-surface-200 dark:bg-input text-primary-800 dark:text-subtle-foreground',
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
        </div>

        {/* Timestamp */}
        <p className={cn(
          'text-[10px] px-1',
          isUser
            ? 'text-right text-primary-400 dark:text-primary-500'
            : 'text-primary-400 dark:text-primary-500',
        )}>
          {formatTimestamp(message.timestamp)}
        </p>

        {/* Suggestion chips */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.suggestions.map((chip) => (
              <button
                key={chip.id}
                onClick={() => onSuggestionSelect?.(chip)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium',
                  'border border-primary-200 dark:border-primary-700',
                  'bg-surface dark:bg-card',
                  'text-primary-700 dark:text-primary-300',
                  'hover:bg-primary-50 dark:hover:bg-surface-primary',
                  'transition-colors duration-[--duration-micro]',
                  'min-h-[var(--touch-min)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                )}
              >
                {chip.icon && <span aria-hidden="true">{chip.icon}</span>}
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Action cards */}
        {message.actionCards && message.actionCards.length > 0 && (
          <div className="space-y-2 mt-1">
            {message.actionCards.map((card) => (
              <ActionCardInline
                key={card.id}
                card={card}
                onBook={() => onActionCardBook?.(card)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionCardInline({ card, onBook }: { card: ActionCardData; onBook: () => void }) {
  return (
    <div className="bg-primary-50 dark:bg-surface-primary border border-primary-200 dark:border-primary-700 rounded-[var(--radius-lg)] p-3 space-y-2">
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-bold text-primary-800 dark:text-subtle-foreground">
          {card.title}
        </h4>
        {card.badge && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300">
            {card.badge}
          </span>
        )}
      </div>

      {card.details.route && (
        <div className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400">
          <Plane className="w-3 h-3" aria-hidden="true" />
          <span>{card.details.route}</span>
          {card.details.time && (
            <>
              <Clock className="w-3 h-3 ml-1" aria-hidden="true" />
              <span>{card.details.time}</span>
            </>
          )}
          {card.details.duration && <span>{card.details.duration}</span>}
          {card.details.stops !== undefined && (
            <span>{card.details.stops === 0 ? 'Nonstop' : `${card.details.stops} stop`}</span>
          )}
        </div>
      )}

      {card.details.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {card.details.highlights.map((h, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-[10px] text-success-700 dark:text-success-300 bg-success-50 dark:bg-success-900 px-2 py-0.5 rounded-full"
            >
              <CheckCircle className="w-2.5 h-2.5" aria-hidden="true" />
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="text-lg font-bold text-primary-800 dark:text-foreground">
          ${card.details.price.toLocaleString()}
        </span>
        <button
          onClick={onBook}
          className={cn(
            'px-4 py-2 rounded-[var(--radius-md)] text-xs font-semibold',
            'bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500',
            'text-white',
            'transition-colors duration-[--duration-micro]',
            'min-h-[var(--touch-min)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500',
          )}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
