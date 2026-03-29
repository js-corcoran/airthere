'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { Trip } from '@/lib/types/trip';
import { MOCK_TRIPS, getTripsForPersona } from '@/lib/mock-data/trips';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Luggage } from 'lucide-react';

import { TripDashboardCard } from './components/TripDashboardCard';
import { TripDetailSheet } from './components/TripDetailSheet';

type TabId = 'upcoming' | 'past';

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
  const pastTrips = trips.filter((t) => t.status === 'completed' || t.status === 'cancelled');

  const displayedTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  if (loading) return <PageSkeleton />;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Luggage className="w-5 h-5 text-primary-500 dark:text-[oklch(65%_0.194_262)]" />
          <h1 className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            My Trips
          </h1>
        </div>
        <p className="text-sm text-primary-500 dark:text-[oklch(60%_0.005_50)]">
          {persona === 'premium'
            ? 'Your premium travel itineraries'
            : persona === 'business'
              ? 'Business travel at a glance'
              : 'Family adventures'}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex rounded-lg bg-surface-100 dark:bg-[oklch(15%_0.003_50)] p-1 gap-1" role="tablist" aria-label="Trip tabs">
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
                ? 'bg-background text-primary-900 shadow-sm dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(95%_0.002_50)]'
                : 'text-primary-500 dark:text-[oklch(60%_0.005_50)]'
            )}
          >
            Upcoming ({upcomingTrips.length})
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
                ? 'bg-background text-primary-900 shadow-sm dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(95%_0.002_50)]'
                : 'text-primary-500 dark:text-[oklch(60%_0.005_50)]'
            )}
          >
            Past ({pastTrips.length})
          </button>
        </div>
      </div>

      {/* Trip List */}
      <div className="px-4 space-y-3">
        {displayedTrips.length > 0 ? (
          displayedTrips.map((trip) => (
            <TripDashboardCard
              key={trip.id}
              trip={trip}
              onClick={setSelectedTrip}
              persona={persona}
            />
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
