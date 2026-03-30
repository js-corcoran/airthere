'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { Trip } from '@/lib/types/trip';
import { MOCK_TRIPS, getTripsForPersona } from '@/lib/mock-data/trips';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Luggage, Navigation, ArrowRight } from 'lucide-react';

import { TripDashboardCard } from './components/TripDashboardCard';
import { TripDetailSheet } from './components/TripDetailSheet';

type TabId = 'upcoming' | 'disrupted' | 'past';

export default function TripsPage() {
  const { persona } = usePersona();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('upcoming');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const personaTrips = getTripsForPersona(persona);
      setTrips(personaTrips);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [persona]);

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming' || t.status === 'active');
  const disruptedTrips = trips.filter((t) => t.status === 'disrupted');
  const pastTrips = trips.filter((t) => t.status === 'completed' || t.status === 'cancelled');

  const displayedTrips =
    activeTab === 'upcoming'
      ? upcomingTrips
      : activeTab === 'disrupted'
        ? disruptedTrips
        : pastTrips;

  if (loading) return <PageSkeleton />;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Luggage className="w-5 h-5 text-primary-500 dark:text-primary-500 dark:text-primary-400" />
          <h1 className="text-xl font-bold text-primary-900 dark:text-foreground">
            My Trips
          </h1>
        </div>
        <p className="text-sm text-primary-600 dark:text-faint-foreground">
          {persona === 'premium'
            ? 'Your premium travel itineraries'
            : persona === 'business'
              ? 'Business travel at a glance'
              : 'Family adventures'}
        </p>
      </div>

      {/* Airport Quick-Action — shown when upcoming/active trips exist */}
      {upcomingTrips.length > 0 && (
        <div className="px-4 mb-3">
          <Link
            href="/airport"
            className="flex items-center gap-3 p-3 rounded-xl
                       bg-primary-50 dark:bg-surface-primary
                       border border-primary-200 dark:border-primary
                       hover:shadow-sm hover:-translate-y-0.5
                       transition-all duration-[--duration-short]"
            aria-label="Go to Airport Live"
          >
            <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
              <Navigation className="w-4.5 h-4.5 text-primary-600 dark:text-primary-300" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary-900 dark:text-foreground">Go to Airport</p>
              <p className="text-xs text-primary-700 dark:text-caption-foreground">Live gate, security & lounge info</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex rounded-lg bg-surface-100 dark:bg-background p-1 gap-1" role="tablist" aria-label="Trip tabs">
          <button
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-md text-center',
              'transition-all duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              activeTab === 'upcoming'
                ? 'bg-background text-primary-900 shadow-sm dark:bg-input dark:text-foreground'
                : 'text-primary-600 dark:text-faint-foreground'
            )}
          >
            Upcoming ({upcomingTrips.length})
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'disrupted'}
            onClick={() => setActiveTab('disrupted')}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-md text-center',
              'transition-all duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              activeTab === 'disrupted'
                ? 'bg-background text-primary-900 shadow-sm dark:bg-input dark:text-foreground'
                : 'text-primary-600 dark:text-faint-foreground'
            )}
          >
            <span className="flex items-center justify-center gap-1.5">
              Disrupted
              <span className={cn(
                'inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[18px] leading-none',
                disruptedTrips.length > 0
                  ? 'bg-error-100 text-error-600 dark:bg-surface-error dark:text-error-300'
                  : 'bg-surface-200 text-primary-600 dark:bg-input dark:text-faint-foreground'
              )}>
                {disruptedTrips.length}
              </span>
            </span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'past'}
            onClick={() => setActiveTab('past')}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-md text-center',
              'transition-all duration-[--duration-micro]',
              'focus-visible:outline-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-min)]',
              activeTab === 'past'
                ? 'bg-background text-primary-900 shadow-sm dark:bg-input dark:text-foreground'
                : 'text-primary-600 dark:text-faint-foreground'
            )}
          >
            Past ({pastTrips.length})
          </button>
        </div>
      </div>

      {/* Trip List */}
      <div className="px-4 space-y-3">
        {displayedTrips.length > 0 ? (
          displayedTrips.map((trip, i) => (
            <div key={trip.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
              <TripDashboardCard
                trip={trip}
                onClick={setSelectedTrip}
                persona={persona}
              />
            </div>
          ))
        ) : activeTab === 'upcoming' ? (
          <EmptyState
            icon="✈️"
            title="No upcoming trips"
            description="Ready for your next adventure? Search for flights to get started."
            action={{
              label: 'Search Flights',
              onClick: () => router.push(ROUTES.SEARCH),
            }}
          />
        ) : activeTab === 'disrupted' ? (
          <EmptyState
            icon="🌊"
            title="No disruptions — smooth sailing!"
            description="All your trips are on track. We'll alert you if anything changes."
          />
        ) : (
          <EmptyState
            icon="📋"
            title="No past trips"
            description="Your completed trips will appear here."
          />
        )}
      </div>

      {/* Trip Detail Sheet */}
      {selectedTrip && (
        <TripDetailSheet
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
          persona={persona}
        />
      )}
    </div>
  );
}
