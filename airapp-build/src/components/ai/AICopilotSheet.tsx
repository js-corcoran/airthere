'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { usePersona } from '@/stores/usePersonaStore';
import { getWelcomeMessage, getMockAIResponse, SUGGESTED_PROMPTS } from '@/lib/mock-data/aiResponses';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';
import { TrustIndicator } from './TrustIndicator';
import type { ChatMessage, TrustLevel, SuggestionChipData, ActionCardData } from '@/lib/types/ai';

interface AICopilotSheetProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

export function AICopilotSheet({ isOpen, onClose, embedded }: AICopilotSheetProps) {
  const { persona } = usePersona();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [trustLevel] = useState<TrustLevel>(
    persona === 'premium' ? 'curator' : 'copilot'
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Initialize with welcome message
  useEffect(() => {
    if (!initialized.current) {
      setMessages([getWelcomeMessage(persona)]);
      initialized.current = true;
    }
  }, [persona]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback((text: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Show typing indicator
    const typingMessage: ChatMessage = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getMockAIResponse(text, persona);
      setMessages(prev => prev.filter(m => m.id !== 'typing').concat(aiResponse));
      setIsLoading(false);
    }, 1200);
  }, [persona]);

  const handleSuggestionSelect = useCallback((chip: SuggestionChipData) => {
    handleSend(chip.value);
  }, [handleSend]);

  const handleActionCardBook = useCallback((card: ActionCardData) => {
    const bookMsg: ChatMessage = {
      id: `user-book-${Date.now()}`,
      role: 'user',
      content: `Book ${card.title}`,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, bookMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const confirmMsg: ChatMessage = {
        id: `confirm-${Date.now()}`,
        role: 'assistant',
        content: `Booking confirmed for ${card.title}. Confirmation details have been sent to your email. You can view your updated itinerary in the Trips tab.`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, confirmMsg]);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (!isOpen && !embedded) return null;

  const suggestedPrompts = SUGGESTED_PROMPTS[persona];
  const showPrompts = messages.length <= 1;

  const containerClasses = embedded
    ? 'flex flex-col h-full'
    : cn(
        'fixed inset-x-0 bottom-0 z-50',
        'bg-background dark:bg-[oklch(12%_0.002_50)]',
        'rounded-t-2xl shadow-xl border-t border-surface-300 dark:border-[oklch(32%_0.008_50)]',
        'transition-all duration-[--duration-normal] ease-[--ease-in-out]',
        expanded ? 'top-0' : 'top-[35%]',
        'flex flex-col',
      );

  return (
    <div
      className={containerClasses}
      role="dialog"
      aria-label="AirThere Copilot Assistant"
      aria-modal={!embedded}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-300 dark:border-[oklch(32%_0.008_50)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-300">AT</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-primary-800 dark:text-[oklch(90%_0.002_50)]">
              AirThere Copilot
            </h2>
            <TrustIndicator level={trustLevel} compact />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!embedded && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn(
                'flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)]',
                'rounded-md transition-colors duration-[--duration-micro]',
                'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
              aria-label={expanded ? 'Minimize' : 'Expand to full screen'}
            >
              {expanded ? (
                <Minimize2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              )}
            </button>
          )}
          {!embedded && (
            <button
              onClick={onClose}
              className={cn(
                'flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)]',
                'rounded-md transition-colors duration-[--duration-micro]',
                'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
              aria-label="Close copilot"
            >
              <X className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-1"
        role="log"
        aria-live="polite"
        aria-label="Conversation history"
      >
        {messages.map((message, i) => (
          <div
            key={message.id}
            className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ChatMessageBubble
              message={message}
              onSuggestionSelect={handleSuggestionSelect}
              onActionCardBook={handleActionCardBook}
            />
          </div>
        ))}

        {/* Suggested prompts (when conversation is empty) */}
        {showPrompts && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-primary-500 dark:text-primary-400 font-medium">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSend(prompt.value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium',
                    'border border-primary-200 dark:border-primary-700',
                    'bg-surface dark:bg-[oklch(18%_0.003_50)]',
                    'text-primary-700 dark:text-primary-300',
                    'hover:bg-primary-50 dark:hover:bg-[oklch(22%_0.01_262)]',
                    'transition-colors duration-[--duration-micro]',
                    'min-h-[var(--touch-min)]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  )}
                >
                  {prompt.icon && <span aria-hidden="true">{prompt.icon}</span>}
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />

      {/* Footer trust level */}
      <div className="px-4 py-2 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)] shrink-0">
        <TrustIndicator level={trustLevel} />
      </div>
    </div>
  );
}
