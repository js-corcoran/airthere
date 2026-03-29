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
import { ROUTES } from '@/lib/constants/routes';

type LoadingState = 'loading' | 'success' | 'error';

export default function HomePage() {
  const { persona, user } = usePersona();
  const router = useRouter();
  const [state, setState] = useState<LoadingState>('loading');
  const [trips, setTrips] = useState<Trip[]>([]);

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
  const isTravelDay = false; // Simulate non-travel day for now
  const travelDayTrip = trips[0];

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
      <HomeHero
        persona={persona}
        isTravelDay={isTravelDay}
        userName={userName}
      />

      <QuickActions persona={persona} />

      {/* Travel Day View */}
      {isTravelDay && travelDayTrip && (
        <CountdownHero trip={travelDayTrip} />
      )}

      {/* Upcoming Trips */}
      <section className="px-4 mt-4" aria-labelledby="trips-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="trips-heading" className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            Your Next Trips
          </h2>
          {trips.length > 0 && (
            <button
              onClick={() => router.push(ROUTES.TRIPS)}
              className="text-xs font-medium text-primary-500 dark:text-[oklch(65%_0.194_262)]
                         hover:text-primary-600 transition-colors
                         min-h-[var(--touch-min)] flex items-center"
            >
              View all
            </button>
          )}
        </div>

        {trips.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} className="snap-start" />
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
            <h2 id="inspiration-heading" className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
              {persona === 'premium'
                ? 'Curated for You'
                : persona === 'business'
                  ? 'Popular Business Routes'
                  : 'Family-Friendly Destinations'}
            </h2>
            <p className="text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-0.5">
              {persona === 'premium'
                ? 'Handpicked destinations matching your preferences'
                : persona === 'business'
                  ? 'Top destinations for your upcoming meetings'
                  : 'Great places for the whole family'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              persona={persona}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
