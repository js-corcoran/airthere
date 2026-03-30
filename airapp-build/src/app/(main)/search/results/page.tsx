'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { CabinClass } from '@/lib/types/user';
import { Flight, PassengerCount } from '@/lib/types/flight';
import { getMockFlights } from '@/lib/mock-data/flights';
import { AIRPORTS } from '@/lib/constants/airports';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';

import { FlightCard } from './components/FlightCard';
import { SortControl, SortOption } from './components/SortControl';
import { FilterSheet, FlightFilters } from './components/FilterSheet';
import { FlexibleDateBar } from './components/FlexibleDateBar';
import { ResultsSkeleton } from './components/ResultsSkeleton';

function getTimeOfDay(iso: string): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date(iso).getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18) return 'evening';
  return 'night';
}

function getPrice(flight: Flight, cabinClass: CabinClass): number {
  const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
  return flight.pricing[key as keyof typeof flight.pricing] as number;
}

function getDefaultSort(persona: string): SortOption {
  if (persona === 'business') return 'duration';
  return 'price';
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { persona } = usePersona();

  // Parse search params
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';
  const departDate = searchParams.get('departDate') ?? '';
  const cabinClass = (searchParams.get('cabinClass') ?? 'economy') as CabinClass;
  const adults = Number(searchParams.get('adults') ?? '1');
  const children = Number(searchParams.get('children') ?? '0');
  const infants = Number(searchParams.get('infants') ?? '0');
  const passengerCount = adults + children + infants;

  const fromAirport = AIRPORTS[from];
  const toAirport = AIRPORTS[to];

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>(getDefaultSort(persona));
  const [currentDate, setCurrentDate] = useState(departDate);
  const [filters, setFilters] = useState<FlightFilters>({
    stops: new Set(),
    airlines: new Set(),
    timeOfDay: new Set(),
    maxPrice: 10000,
  });

  // Load flights
  useEffect(() => {
    if (!from || !to || !currentDate) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const results = getMockFlights(from, to, currentDate);
      setFlights(results);
      // Set max price to slightly above highest price
      const maxP = Math.max(...results.map((f) => getPrice(f, cabinClass)));
      setFilters((prev) => ({ ...prev, maxPrice: Math.ceil(maxP / 100) * 100 }));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [from, to, currentDate, cabinClass]);

  // Available airlines for filter
  const availableAirlines = useMemo(() => {
    const seen = new Map<string, string>();
    flights.forEach((f) => {
      if (!seen.has(f.airline.code)) {
        seen.set(f.airline.code, f.airline.name);
      }
    });
    return Array.from(seen.entries()).map(([code, name]) => ({ code, name }));
  }, [flights]);

  // Max price limit for slider
  const maxPriceLimit = useMemo(() => {
    if (flights.length === 0) return 10000;
    return Math.ceil(Math.max(...flights.map((f) => getPrice(f, cabinClass))) / 100) * 100;
  }, [flights, cabinClass]);

  // Active filter count
  const activeFilterCount =
    filters.stops.size +
    filters.airlines.size +
    filters.timeOfDay.size +
    (filters.maxPrice < maxPriceLimit ? 1 : 0);

  // Apply filters and sort
  const filteredFlights = useMemo(() => {
    let results = [...flights];

    // Filter by stops
    if (filters.stops.size > 0) {
      results = results.filter((f) => {
        if (f.stops >= 2 && filters.stops.has(2)) return true;
        return filters.stops.has(f.stops);
      });
    }

    // Filter by airline
    if (filters.airlines.size > 0) {
      results = results.filter((f) => filters.airlines.has(f.airline.code));
    }

    // Filter by time of day
    if (filters.timeOfDay.size > 0) {
      results = results.filter((f) => filters.timeOfDay.has(getTimeOfDay(f.departure.time)));
    }

    // Filter by price
    results = results.filter((f) => getPrice(f, cabinClass) <= filters.maxPrice);

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return getPrice(a, cabinClass) - getPrice(b, cabinClass);
        case 'duration':
          return a.duration - b.duration;
        case 'departure':
          return new Date(a.departure.time).getTime() - new Date(b.departure.time).getTime();
        case 'arrival':
          return new Date(a.arrival.time).getTime() - new Date(b.arrival.time).getTime();
        default:
          return 0;
      }
    });

    return results;
  }, [flights, filters, sortBy, cabinClass]);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
  };

  const handleSelectFlight = (flight: Flight) => {
    const params = new URLSearchParams({
      flightId: flight.id,
      from,
      to,
      departDate: currentDate,
      cabinClass,
      adults: String(adults),
      children: String(children),
      infants: String(infants),
    });
    router.push(`${ROUTES.BOOKING_DETAIL}?${params.toString()}`);
  };

  if (!from || !to) {
    return (
      <ErrorState
        message="Missing search parameters. Please start a new search."
        onRetry={() => router.push(ROUTES.SEARCH)}
      />
    );
  }

  return (
    <div className="pb-8">
      {/* Route Summary */}
      <div className="px-4 pt-2 pb-3 bg-gradient-to-b from-primary-50 to-background dark:from-[oklch(18%_0.01_262)] dark:to-[oklch(14%_0.003_50)]">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {fromAirport?.city ?? from}
          </span>
          <ArrowRight className="w-4 h-4 text-primary-400" />
          <span className="font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {toAirport?.city ?? to}
          </span>
        </div>
        <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] mt-0.5">
          {passengerCount} passenger{passengerCount !== 1 ? 's' : ''} · {cabinClass.replace('-', ' ')}
        </p>
      </div>

      {/* Flexible Date Bar */}
      {currentDate && (
        <div className="px-4 border-b border-surface-200 dark:border-[oklch(25%_0.005_50)]">
          <FlexibleDateBar selectedDate={currentDate} onDateChange={handleDateChange} />
        </div>
      )}

      {loading ? (
        <ResultsSkeleton />
      ) : (
        <div className="px-4 pt-3">
          {/* Sort + Filter Controls */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <SortControl
              value={sortBy}
              onChange={setSortBy}
              totalResults={filteredFlights.length}
            />
            <FilterSheet
              filters={filters}
              onChange={setFilters}
              availableAirlines={availableAirlines}
              maxPriceLimit={maxPriceLimit}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Persona-specific banner */}
          {persona === 'business' && filteredFlights.length > 0 && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-primary-50 dark:bg-[oklch(20%_0.015_262)] border border-primary-200 dark:border-[oklch(30%_0.05_262)]">
              <p className="text-xs text-primary-700 dark:text-[oklch(80%_0.08_262)]">
                Sorted by shortest duration for efficient business travel
              </p>
            </div>
          )}
          {persona === 'family' && filteredFlights.length > 0 && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-success-50 dark:bg-[oklch(20%_0.02_155)] border border-success-200 dark:border-[oklch(30%_0.05_155)]">
              <p className="text-xs text-success-700 dark:text-[oklch(80%_0.08_155)]">
                Prices shown for {passengerCount} passengers · Family seating highlighted
              </p>
            </div>
          )}

          {/* Results */}
          {filteredFlights.length > 0 ? (
            <div className="space-y-3">
              {filteredFlights.map((flight, index) => (
                <div key={flight.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${index * 60}ms` }}>
                  <FlightCard
                    flight={flight}
                    cabinClass={cabinClass}
                    passengerCount={passengerCount}
                    onSelect={handleSelectFlight}
                    persona={persona}
                  />
                </div>
              ))}
            </div>
          ) : flights.length > 0 ? (
            <EmptyState
              icon="🔍"
              title="No flights match your filters"
              description="Try adjusting your filters to see more results."
              action={{
                label: 'Reset Filters',
                onClick: () =>
                  setFilters({
                    stops: new Set(),
                    airlines: new Set(),
                    timeOfDay: new Set(),
                    maxPrice: maxPriceLimit,
                  }),
              }}
            />
          ) : (
            <EmptyState
              icon="✈️"
              title="No flights found"
              description="We couldn't find flights for this route. Try different dates or airports."
              action={{
                label: 'New Search',
                onClick: () => router.push(ROUTES.SEARCH),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <SearchResultsContent />
    </Suspense>
  );
}
