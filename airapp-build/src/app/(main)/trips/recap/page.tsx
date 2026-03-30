'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { getRecapForPersona } from './data/mock-recap';
import type { TripRecapData } from './data/mock-recap';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { Sparkles, Search } from 'lucide-react';

import { TripSummaryHero } from './components/TripSummaryHero';
import { MemoriesCarousel } from './components/MemoriesCarousel';
import { ExpenseBreakdown } from './components/ExpenseBreakdown';
import { LoyaltyReconciliation } from './components/LoyaltyReconciliation';
import { TravelInsights } from './components/TravelInsights';
import { JetLagRecovery } from './components/JetLagRecovery';

type LoadingState = 'loading' | 'success' | 'error';

export default function TripRecapPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [recap, setRecap] = useState<TripRecapData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const data = getRecapForPersona(persona);
        setRecap(data);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  if (state === 'loading') return <PageSkeleton />;
  if (state === 'error' || !recap) {
    return (
      <ErrorState
        title="Unable to load trip recap"
        message="We're having trouble loading your trip summary. Please try again."
        onRetry={() => setState('loading')}
      />
    );
  }

  const ctaLabel =
    persona === 'premium'
      ? 'Discover Premium Destinations'
      : persona === 'business'
        ? 'Book Next Business Trip'
        : 'Plan Next Family Adventure';

  const ctaSubtext =
    persona === 'premium'
      ? 'Curated luxury getaways just for you'
      : persona === 'business'
        ? 'Find the best corporate rates'
        : 'Kid-friendly destinations your family will love';

  return (
    <main
      role="main"
      aria-label="Trip recap"
      className="min-h-screen bg-background dark:bg-background pb-24"
    >
      <div className="px-4 pt-4 space-y-6">
        {/* Trip Summary Hero */}
        <TripSummaryHero trip={recap.trip} />

        {/* Memories Carousel */}
        <MemoriesCarousel memories={recap.memories} />

        {/* Expense Breakdown */}
        <ExpenseBreakdown
          expenses={recap.expenses}
          totalCost={recap.trip.totalCost}
          currency={recap.trip.currency}
          persona={persona}
        />

        {/* Loyalty Reconciliation */}
        <LoyaltyReconciliation loyalty={recap.loyalty} persona={persona} />

        {/* Travel Insights */}
        <TravelInsights insights={recap.insights} />

        {/* Jet Lag Recovery */}
        <JetLagRecovery jetlag={recap.jetlag} />

        {/* Book Next Trip CTA */}
        <section aria-labelledby="next-trip-heading" className="space-y-3">
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-700 dark:from-secondary-600 dark:to-secondary-800 rounded-[var(--radius-lg)] p-5 text-white shadow-[var(--shadow-md)] relative overflow-hidden">
            {/* Decorative element */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white/80" aria-hidden="true" />
                <h3
                  id="next-trip-heading"
                  className="text-lg font-bold"
                >
                  Ready for another adventure?
                </h3>
              </div>
              <p className="text-sm text-white/80 mb-4">
                {ctaSubtext}
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] bg-white text-secondary-700 font-semibold text-sm hover:bg-white/90 transition-colors duration-[--duration-micro] min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[var(--shadow-sm)]"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                {ctaLabel}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
