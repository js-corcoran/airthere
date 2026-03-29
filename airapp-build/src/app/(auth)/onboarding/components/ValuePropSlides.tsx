'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { Shield, Zap, Users, Globe, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  icon: typeof Shield;
  headline: string;
  body: string;
  features: string[];
}

const SLIDES: Slide[] = [
  {
    id: 'calm',
    icon: Sparkles,
    headline: 'Anticipatory Calm',
    body: 'AirThere thinks ahead. Disruptions are managed before they affect your journey. Relax — we handle the unexpected so you never have to.',
    features: [
      'Proactive alerts 72 hours before issues arise',
      'Autonomous rebooking when plans change',
      'Family itineraries always protected',
    ],
  },
  {
    id: 'transparency',
    icon: Shield,
    headline: 'Radical Transparency',
    body: 'Every cost visible. Every delay explained. No hidden fees, no drip pricing, no surprises. What you see is exactly what you pay.',
    features: [
      'Total cost shown upfront, always',
      'Real-time delay explanations',
      'No hidden fees or surcharges',
    ],
  },
  {
    id: 'speed',
    icon: Zap,
    headline: 'Lightning Fast Booking',
    body: 'Search, compare, and book in under 90 seconds. Intelligent defaults learn your preferences so every booking is faster than the last.',
    features: [
      'Smart search with learned preferences',
      'One-tap rebooking from past trips',
      'Instant seat selection with fare bundles',
    ],
  },
  {
    id: 'family',
    icon: Users,
    headline: 'Family Integrity',
    body: 'The family unit is sacred. Guaranteed seating together, shared itineraries, and coordinated group management — stress-free travel for everyone.',
    features: [
      'Guaranteed family seating together',
      'Shared itineraries and coordination',
      'Child-friendly content and activities',
    ],
  },
  {
    id: 'journey',
    icon: Globe,
    headline: 'Journey Continuity',
    body: 'One identity across every touchpoint. Your preferences, your history, your context — carried seamlessly from search to landing.',
    features: [
      'Preferences remembered everywhere',
      'Seamless handoff between devices',
      'Context-aware at every journey phase',
    ],
  },
];

interface ValuePropSlidesProps {
  onComplete: () => void;
}

export function ValuePropSlides({ onComplete }: ValuePropSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      onComplete();
    }
  }, [currentSlide, onComplete]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === SLIDES.length - 1;

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center mb-8
                      transition-colors duration-[--duration-short]"
        >
          <Icon className="w-8 h-8 text-primary-600 dark:text-primary-300" aria-hidden="true" />
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-[28px] font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-4 text-center tracking-[-0.25px]">
          {slide.headline}
        </h2>

        {/* Body */}
        <p className="text-base text-primary-700 dark:text-[oklch(85%_0.005_50)] mb-8 text-center leading-relaxed max-w-sm">
          {slide.body}
        </p>

        {/* Feature list */}
        <ul className="space-y-3 w-full max-w-sm mb-8" role="list">
          {slide.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-primary-800 dark:text-[oklch(85%_0.005_50)]">
              <span className="text-success-500 font-bold mt-0.5 shrink-0" aria-hidden="true">
                ✓
              </span>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 py-4" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            role="tab"
            aria-selected={idx === currentSlide}
            aria-label={`Slide ${idx + 1}: ${s.headline}`}
            className={cn(
              'h-2 rounded-full transition-all duration-[--duration-short] min-w-[8px]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              idx === currentSlide
                ? 'w-6 bg-primary-500 dark:bg-[oklch(65%_0.194_262)]'
                : 'w-2 bg-surface-300 dark:bg-[oklch(32%_0.008_50)]'
            )}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 w-full max-w-sm mt-4">
        {currentSlide > 0 && (
          <button
            onClick={goPrev}
            className="flex-1 py-3 text-primary-600 dark:text-[oklch(65%_0.194_262)] font-medium rounded-md text-base
                       hover:bg-surface-200 dark:hover:bg-[oklch(25%_0.005_50)]
                       transition-colors duration-[--duration-short]
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                       min-h-[var(--touch-min)]"
          >
            Previous
          </button>
        )}
        <button
          onClick={goNext}
          className={cn(
            'flex-1 py-3 font-medium rounded-md text-base',
            'transition-colors duration-[--duration-short]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-preferred)]',
            isLast
              ? 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm'
              : 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm'
          )}
        >
          {isLast ? 'Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
}
