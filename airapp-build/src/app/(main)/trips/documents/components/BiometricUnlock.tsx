'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Fingerprint, Lock, Unlock, ShieldCheck } from 'lucide-react';

interface BiometricUnlockProps {
  isLocked: boolean;
  onUnlock: () => void;
}

export function BiometricUnlock({ isLocked, onUnlock }: BiometricUnlockProps) {
  const [authenticating, setAuthenticating] = useState(false);

  const handleUnlock = () => {
    setAuthenticating(true);
    // Simulate biometric auth
    setTimeout(() => {
      setAuthenticating(false);
      onUnlock();
    }, 1200);
  };

  if (!isLocked) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-success-600 dark:text-success-400">
        <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Vault unlocked</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4',
        'animate-[fadeIn_var(--duration-short)]'
      )}
      role="status"
      aria-label="Document vault locked"
    >
      <div
        className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mb-6',
          'bg-primary-100 dark:bg-surface-primary',
          authenticating && 'animate-pulse'
        )}
      >
        {authenticating ? (
          <div className="w-10 h-10 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
        ) : (
          <Lock className="w-10 h-10 text-primary-500 dark:text-primary-400" />
        )}
      </div>

      <h2 className="text-lg font-bold text-primary-900 dark:text-foreground mb-2">
        Document Vault Locked
      </h2>
      <p className="text-sm text-primary-600 dark:text-caption-foreground text-center mb-6 max-w-xs">
        Your documents are encrypted and secure. Authenticate to access them.
      </p>

      <button
        onClick={handleUnlock}
        disabled={authenticating}
        className={cn(
          'flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm',
          'bg-primary-500 text-white',
          'hover:bg-primary-600 active:bg-primary-700',
          'transition-colors duration-[--duration-micro]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'min-h-[var(--touch-preferred)]',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
      >
        <Fingerprint className="w-5 h-5" aria-hidden="true" />
        {authenticating ? 'Authenticating...' : 'Unlock with Biometrics'}
      </button>

      <div className="flex items-center gap-1.5 mt-4 text-xs text-primary-400 dark:text-faint-foreground">
        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
        <span>AES-256 encrypted</span>
      </div>
    </div>
  );
}
