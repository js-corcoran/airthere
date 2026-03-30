'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  Fingerprint,
  CheckCircle,
  Camera,
  Shield,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import { BiometricStatus } from '../types';
import { PersonaType } from '@/lib/types/user';

interface BiometricSectionProps {
  status: BiometricStatus;
  flightNumber: string;
  persona: PersonaType;
}

export function BiometricSection({ status, flightNumber, persona }: BiometricSectionProps) {
  const [step, setStep] = useState<'overview' | 'scanning' | 'complete'>(
    status.checkInComplete ? 'complete' : 'overview'
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
          Biometric Check-In
        </h2>
        <p className="text-xs text-primary-700 dark:text-caption-foreground mt-0.5">
          {status.enrolled
            ? 'Use facial recognition for seamless boarding'
            : 'Enroll for contactless boarding'}
        </p>
      </div>

      {/* Enrollment status */}
      {!status.enrolled && (
        <div className="rounded-xl p-6 text-center
                        bg-gradient-to-br from-primary-50 to-surface
                        dark:from-surface-primary dark:to-card
                        border border-surface-300 dark:border-muted">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-surface-primary flex items-center justify-center">
            <Fingerprint className="w-8 h-8 text-primary-500 dark:text-primary-400" aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold text-primary-900 dark:text-foreground mb-2">
            Enable Biometric Boarding
          </h3>
          <p className="text-sm text-primary-600 dark:text-soft-foreground mb-4 max-w-xs mx-auto">
            Skip the line at the gate. Your face becomes your boarding pass.
            {persona === 'family' && ' Available for all family members over 13.'}
          </p>
          <button
            onClick={() => setStep('scanning')}
            className="px-6 py-3 rounded-lg bg-secondary-500 dark:bg-secondary-500
                       text-white font-medium
                       hover:bg-secondary-600 dark:hover:bg-secondary-600
                       transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-preferred)]"
          >
            Get Started
          </button>
          <p className="text-[10px] text-primary-600 dark:text-faint-foreground mt-3 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" aria-hidden="true" />
            Your biometric data is encrypted and never stored permanently
          </p>
        </div>
      )}

      {/* Scanning simulation */}
      {step === 'scanning' && (
        <div className="rounded-xl p-6 text-center
                        bg-gradient-to-br from-primary-50 to-primary-100
                        dark:from-surface-primary dark:to-surface-primary
                        border-2 border-primary-300 dark:border-primary">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-primary-400 dark:border-primary-500
                          flex items-center justify-center bg-primary-50 dark:bg-surface-primary
                          animate-pulse">
            <Camera className="w-12 h-12 text-primary-500 dark:text-primary-400" aria-hidden="true" />
          </div>
          <p className="text-base font-semibold text-primary-900 dark:text-foreground mb-2">
            Look at the camera
          </p>
          <p className="text-sm text-primary-600 dark:text-soft-foreground mb-4">
            Hold your face within the circle
          </p>
          <button
            onClick={() => setStep('complete')}
            className="px-6 py-3 rounded-lg bg-primary-500 dark:bg-primary-500
                       text-white font-medium
                       hover:bg-primary-600 dark:hover:bg-primary-600
                       transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-preferred)]"
          >
            Simulate Capture
          </button>
        </div>
      )}

      {/* Complete / boarding pass */}
      {(step === 'complete' || status.checkInComplete) && (
        <div className="space-y-4">
          {/* Success message */}
          <div className="rounded-lg p-4 bg-success-50 dark:bg-surface-success border border-success-200 dark:border-success">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success-500 dark:text-success-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-success-700 dark:text-success-400">
                  Biometric Check-In Complete
                </p>
                {status.lastVerified && (
                  <p className="text-xs text-success-600 dark:text-success-600">
                    Verified at {status.lastVerified}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Digital boarding pass */}
          <div className="rounded-xl overflow-hidden border-2 border-primary-300 dark:border-primary
                          bg-card">
            <div className="bg-primary-600 dark:bg-primary-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-bold">BOARDING PASS</span>
                </div>
                <span className="text-xs opacity-80">DIGITAL</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-primary-700 dark:text-caption-foreground mb-1">Flight</p>
              <p className="text-lg font-bold text-primary-900 dark:text-foreground mb-3">
                {flightNumber}
              </p>

              {/* QR placeholder */}
              <div className="w-32 h-32 mx-auto mb-3 rounded-lg
                              bg-gradient-to-br from-primary-900 to-primary-700
                              dark:from-primary-900 dark:to-primary-900
                              flex items-center justify-center">
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-4 h-4 rounded-sm',
                        Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-[10px] text-primary-600 dark:text-faint-foreground">
                Scan at gate for boarding
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Manual fallback */}
      {persona === 'family' && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-info-50 dark:bg-surface-info border border-info-200 dark:border-info">
          <AlertCircle className="w-4 h-4 mt-0.5 text-info-500 dark:text-info-500 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-info-700 dark:text-info-400">
              Children under 13
            </p>
            <p className="text-xs text-info-600 dark:text-info-600 mt-0.5">
              Biometric check-in is not available for children under 13. They will board using the family group lane with a parent's verified boarding pass.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
