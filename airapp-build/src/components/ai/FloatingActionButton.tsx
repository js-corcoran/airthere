'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FloatingActionButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function FloatingActionButton({ onClick, isOpen }: FloatingActionButtonProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-24 right-4 z-40',
        'w-14 h-14 rounded-full',
        'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400',
        'text-white shadow-lg',
        'flex items-center justify-center',
        'transition-all duration-[--duration-short]',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        'animate-[fadeIn_0.3s_ease-in-out]',
      )}
      aria-label="Open AI Copilot"
    >
      <MessageCircle className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}
