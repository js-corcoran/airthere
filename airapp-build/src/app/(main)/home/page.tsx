'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { getTripsForPersona } from '@/lib/mock-data/trips';
import { Trip } from '@/lib/types/trip';
import { PersonaType } from '@/lib/types/user';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { HomeHero } from './components/HomeHero';
import { TripCard } from './components/TripCard';
import { DestinationCard } from './components/DestinationCard';
import { CountdownHero } from './components/CountdownHero';
import { QuickActions } from './components/QuickActions';
import { DESTINATIONS } from './components/destinations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { AlertTriangle, ArrowRight, Clock, Sun, Users, Check } from 'lucide-react';

type LoadingState = 'loading' | 'success' | 'error';

export default function HomePage() {
  const { persona, setPersona, user } = usePersona();
  const router = useRouter();
  const [state, setState] = useState<LoadingState>('loading');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showDemoSheet, setShowDemoSheet] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const t = getTripsForPersona(persona);
        setTrips(t);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  const userName = user?.name ?? 'Traveler';
  const hasDisruptedTrip = persona === 'premium' && trips.some((t) => t.status === 'disrupted');
  const isTravelDay = true; // All personas have upcoming trips to show
  const travelDayTrip = trips.find(t => t.status === 'upcoming' || t.status === 'disrupted') ?? trips[0];

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.persona.includes(persona)
  );

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error') {
    return (
      <ErrorState
        message="We couldn't load your home screen. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => setState('success'), 600);
        }}
      />
    );
  }

  return (
    <div className="pb-4">
      {/* Demo Mode Pill - top right of Home screen */}
      <div className="fixed top-3 right-3 z-40">
        <button
          onClick={() => setShowDemoSheet(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                     bg-primary-900/90 dark:bg-surface-primary/90
                     backdrop-blur-sm text-white text-xs font-medium
                     shadow-lg hover:bg-primary-800 dark:hover:bg-muted
                     transition-colors duration-[--duration-micro]
                     min-h-[var(--touch-min)]"
          aria-label="Switch demo persona"
        >
          <Users className="w-3.5 h-3.5" />
          Demo Mode
        </button>
      </div>

      {/* Demo Mode Bottom Sheet */}
      {showDemoSheet && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Switch persona"
             onKeyDown={(e) => { if (e.key === 'Escape') setShowDemoSheet(false); }}>
          <div className="absolute inset-0 bg-overlay-dark" onClick={() => setShowDemoSheet(false)} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 bg-background dark:bg-card rounded-t-2xl p-5 pb-8 shadow-xl">
            <h2 className="text-base font-semibold text-primary-900 dark:text-foreground mb-1">
              Switch Persona
            </h2>
            <p className="text-xs text-primary-500 dark:text-caption-foreground mb-4">
              Preview the app as a different traveler
            </p>
            <div className="space-y-2">
              {([
                { key: 'premium' as const, name: 'Alexandra Sterling', role: 'Premium Traveler', desc: 'First class · Star Alliance Gold · Disrupted JFK→SIN' },
                { key: 'business' as const, name: 'Marcus Webb', role: 'Business Traveler', desc: 'Economy Plus · MileagePlus Platinum · SFO→ORD tomorrow' },
                { key: 'family' as const, name: 'Chen Family', role: 'Family (4 travelers)', desc: 'Economy · Hawaii in 5 days · Kids meals confirmed' },
              ]).map((p) => (
                <button
                  key={p.key}
                  onClick={() => { setPersona(p.key); setShowDemoSheet(false); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-[--duration-micro]
                    min-h-[var(--touch-preferred)]
                    ${persona === p.key
                      ? 'border-primary-500 bg-primary-50 dark:bg-surface-primary dark:border-primary-400'
                      : 'border-surface-300 dark:border-muted hover:bg-surface-100 dark:hover:bg-surface-elevated'
                    }`}
                  aria-pressed={persona === p.key}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${persona === p.key ? 'text-primary-700 dark:text-primary-300' : 'text-primary-800 dark:text-subtle-foreground'}`}>
                        {p.name}
                      </span>
                      <span className="ml-2 text-xs text-primary-400 dark:text-faint-foreground">{p.role}</span>
                    </div>
                    {persona === p.key && <Check className="w-4 h-4 text-primary-500" />}
                  </div>
                  <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <HomeHero
        persona={persona}
        isTravelDay={isTravelDay}
        userName={userName}
      />

      {/* Persona-specific Alert Banners */}
      {hasDisruptedTrip && (
        <div className="px-4 mb-4">
          <Link
            href="/irops/FL-JFK-SIN-DEMO"
            className="block p-4 rounded-xl bg-error-50 dark:bg-surface-error border border-error-200 dark:border-error shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]"
            aria-label="Flight SQ25 delayed 90 minutes — tap for recovery options"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-error-100 dark:bg-surface-error flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-error-600 dark:text-error-400" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-error-800 dark:text-error-200">
                  Flight SQ25 Delayed — 90 Minutes
                </p>
                <p className="text-xs text-error-600 dark:text-error-400 mt-0.5">
                  JFK → SIN · Aircraft swap to A380 · Rebooking options available
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-error-400 shrink-0 mt-0.5" aria-hidden="true" />
            </div>
          </Link>
        </div>
      )}

      {persona === 'business' && (
        <div className="px-4 mb-4">
          <Link
            href="/airport"
            className="block p-4 rounded-xl bg-info-50 dark:bg-surface-info border border-info-200 dark:border-info shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]"
            aria-label="UA456 to Chicago departing tomorrow with 25-minute delay"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-info-100 dark:bg-surface-info flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-info-700 dark:text-info-400" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-info-900 dark:text-info-100">
                  UA456 to Chicago — Departing Tomorrow
                </p>
                <p className="text-xs text-info-700 dark:text-caption-foreground mt-0.5">
                  25-min delay · Gate F14 · Meeting at 2 PM still on track
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-info-500 shrink-0 mt-0.5" aria-hidden="true" />
            </div>
          </Link>
        </div>
      )}

      {persona === 'family' && (
        <div className="px-4 mb-4">
          <Link
            href="/trips"
            className="block p-4 rounded-xl bg-success-50 dark:bg-surface-success border border-success-100 dark:border-success shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[--duration-short]"
            aria-label="Hawaii trip in 5 days — all 4 passengers confirmed"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-surface-success flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5 text-success-700 dark:text-success-300" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-success-900 dark:text-success-100">
                  Hawaii in 5 Days!
                </p>
                <p className="text-xs text-success-700 dark:text-caption-foreground mt-0.5">
                  All 4 passengers · Seats 24A-D confirmed · Packing 60% done
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-success-500 shrink-0 mt-0.5" aria-hidden="true" />
            </div>
          </Link>
        </div>
      )}

      <QuickActions persona={persona} />

      {/* Travel Day View */}
      {isTravelDay && travelDayTrip && (
        <CountdownHero trip={travelDayTrip} />
      )}

      {/* Upcoming Trips */}
      <section className="px-4 mt-4" aria-labelledby="trips-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="trips-heading" className="text-lg font-semibold text-primary-900 dark:text-foreground">
            Your Next Trips
          </h2>
          {trips.length > 0 && (
            <button
              onClick={() => router.push(ROUTES.TRIPS)}
              className="text-xs font-medium text-primary-500 dark:text-primary-400
                         hover:text-primary-600 transition-colors
                         min-h-[var(--touch-min)] flex items-center"
            >
              View all
            </button>
          )}
        </div>

        {trips.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {trips.map((trip, index) => (
              <div key={trip.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${index * 60}ms` }}>
                <TripCard trip={trip} className="snap-start" />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="✈️"
            title="No upcoming trips"
            description="Search for flights to plan your next adventure."
            action={{
              label: 'Search Flights',
              onClick: () => router.push(ROUTES.SEARCH),
            }}
          />
        )}
      </section>

      {/* Persona-specific section header */}
      <section className="px-4 mt-6" aria-labelledby="inspiration-heading">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 id="inspiration-heading" className="text-lg font-semibold text-primary-900 dark:text-foreground">
              {persona === 'premium'
                ? 'Curated for You'
                : persona === 'business'
                  ? 'Popular Business Routes'
                  : 'Family-Friendly Destinations'}
            </h2>
            <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
              {persona === 'premium'
                ? 'Handpicked destinations matching your preferences'
                : persona === 'business'
                  ? 'Top destinations for your upcoming meetings'
                  : 'Great places for the whole family'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredDestinations.map((dest, index) => (
            <div key={dest.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${index * 60}ms` }}>
              <DestinationCard
                destination={dest}
                persona={persona}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
