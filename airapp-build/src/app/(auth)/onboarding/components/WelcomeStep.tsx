'use client';

import { Plane } from 'lucide-react';

interface WelcomeStepProps {
  onGetStarted: () => void;
  onSkip: () => void;
}

export function WelcomeStep({ onGetStarted, onSkip }: WelcomeStepProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Hero gradient background */}
      <div
        className="absolute inset-0 z-0
                    bg-gradient-to-b from-primary-100 via-primary-50 to-background
                    dark:from-primary-900 dark:via-[oklch(18%_0.003_50)] dark:to-[oklch(12%_0.002_50)]"
        aria-hidden="true"
      />

      {/* Decorative airplane */}
      <div className="absolute top-[15%] right-[10%] opacity-10 dark:opacity-5" aria-hidden="true">
        <Plane className="w-40 h-40 text-primary-500 rotate-[-15deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-md text-center">
        {/* Logo */}
        <div
          className="w-16 h-16 rounded-2xl bg-secondary-500 flex items-center justify-center mb-8
                      shadow-md"
        >
          <span className="text-white font-bold text-2xl tracking-tight">A</span>
        </div>

        <h1 className="text-[28px] md:text-[32px] font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] leading-tight mb-3 tracking-[-0.5px]">
          Where Every Journey
          <br />
          Begins With Calm
        </h1>

        <p className="text-base text-primary-700 dark:text-[oklch(85%_0.005_50)] mb-8 leading-relaxed max-w-xs">
          AirThere is your travel operating system — one identity, unified experience,
          anticipatory calm.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
          <button
            onClick={onGetStarted}
            className="w-full py-3 px-6 bg-secondary-500 text-white font-medium rounded-md text-base
                       hover:bg-secondary-600 active:bg-secondary-700
                       transition-all duration-[--duration-short]
                       shadow-sm hover:shadow-md hover:-translate-y-0.5
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-preferred)]"
          >
            Let&apos;s Get Started
          </button>

          <button
            onClick={onSkip}
            className="w-full py-3 px-6 text-primary-600 dark:text-[oklch(65%_0.194_262)] font-medium rounded-md text-base
                       hover:text-primary-700 hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                       active:bg-surface-300
                       transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-min)]"
          >
            Skip to Browse
          </button>
        </div>
      </div>
    </div>
  );
}
