'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder = 'Ask me anything...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 border-t border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-surface dark:bg-[oklch(18%_0.003_50)]">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={1}
        maxLength={1000}
        aria-label="Message input"
        className={cn(
          'flex-1 resize-none rounded-[var(--radius-lg)] px-4 py-2.5 text-sm',
          'bg-surface-200 dark:bg-[oklch(22%_0.005_50)]',
          'text-primary-800 dark:text-[oklch(90%_0.002_50)]',
          'placeholder:text-primary-400 dark:placeholder:text-primary-500',
          'border border-transparent',
          'focus:border-primary-300 dark:focus:border-primary-600',
          'focus:outline-none focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-600',
          'disabled:opacity-50',
          'min-h-[var(--touch-min)]',
        )}
      />

      <button
        onClick={() => {/* Voice input placeholder */}}
        className={cn(
          'flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)] rounded-full',
          'text-primary-500 dark:text-primary-400',
          'hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        )}
        aria-label="Voice input"
      >
        <Mic className="w-5 h-5" aria-hidden="true" />
      </button>

      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className={cn(
          'flex items-center justify-center w-[var(--touch-min)] h-[var(--touch-min)] rounded-full',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          input.trim() && !isLoading
            ? 'bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-400'
            : 'bg-surface-200 dark:bg-[oklch(25%_0.005_50)] text-primary-400 dark:text-primary-500 cursor-not-allowed',
        )}
        aria-label="Send message"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
