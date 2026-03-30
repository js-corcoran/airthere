'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { CabinClass } from '@/lib/types/user';
import { PassengerCount, FlightSearchParams } from '@/lib/types/flight';
import { ArrowUpDown, Search, Plane } from 'lucide-react';

import { TripTypeToggle } from './components/TripTypeToggle';
import { AirportSelector } from './components/AirportSelector';
import { DateSelector } from './components/DateSelector';
import { PassengerSelector } from './components/PassengerSelector';
import { CabinClassSelector } from './components/CabinClassSelector';
import { RecentSearches, RecentSearch, saveSearch } from './components/RecentSearches';

function getPersonaDefaults(persona: string): {
  cabinClass: CabinClass;
  passengers: PassengerCount;
} {
  switch (persona) {
    case 'premium':
      return {
        cabinClass: 'first',
        passengers: { adults: 1, children: 0, infants: 0 },
      };
    case 'business':
      return {
        cabinClass: 'business',
        passengers: { adults: 1, children: 0, infants: 0 },
      };
    case 'family':
      return {
        cabinClass: 'economy',
        passengers: { adults: 2, children: 2, infants: 0 },
      };
    default:
      return {
        cabinClass: 'economy',
        passengers: { adults: 1, children: 0, infants: 0 },
      };
  }
}

interface FormErrors {
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const { persona } = usePersona();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaults = getPersonaDefaults(persona);

  const [tripType, setTripType] = useState<FlightSearchParams['tripType']>('round-trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState(searchParams.get('to') ?? '');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState<PassengerCount>(defaults.passengers);
  const [cabinClass, setCabinClass] = useState<CabinClass>(defaults.cabinClass);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSearching, setIsSearching] = useState(false);

  const swapAirports = useCallback(() => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  }, [from, to]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!from) newErrors.from = 'Select a departure airport';
    if (!to) newErrors.to = 'Select a destination airport';
    if (from && to && from === to) newErrors.to = 'Destination must differ from origin';
    if (!departDate) newErrors.departDate = 'Select a departure date';
    if (tripType === 'round-trip' && !returnDate) {
      newErrors.returnDate = 'Select a return date';
    }
    if (tripType === 'round-trip' && departDate && returnDate && returnDate < departDate) {
      newErrors.returnDate = 'Return must be after departure';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!validate() || isSearching) return;

    setIsSearching(true);

    saveSearch({
      from,
      to,
      departDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengers,
      cabinClass,
      tripType,
    });

    const params = new URLSearchParams({
      from,
      to,
      departDate,
      tripType,
      cabinClass,
      adults: String(passengers.adults),
      children: String(passengers.children),
      infants: String(passengers.infants),
    });
    if (tripType === 'round-trip' && returnDate) {
      params.set('returnDate', returnDate);
    }

    router.push(`${ROUTES.SEARCH_RESULTS}?${params.toString()}`);
  };

  const handleRecentSelect = (search: RecentSearch) => {
    setFrom(search.from);
    setTo(search.to);
    setDepartDate(search.departDate);
    setReturnDate(search.returnDate ?? '');
    setPassengers(search.passengers);
    setCabinClass(search.cabinClass);
    setTripType(search.tripType);
    setErrors({});
  };

  return (
    <div className="pb-8">
      {/* Hero Banner */}
      <div className="px-4 pt-2 pb-4 bg-gradient-to-b from-primary-50 to-background dark:from-surface-primary dark:to-background">
        <div className="flex items-center gap-2 mb-1">
          <Plane className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <h1 className="text-xl font-bold text-primary-900 dark:text-foreground">
            Search Flights
          </h1>
        </div>
        <p className="text-sm text-primary-600 dark:text-dimmed-foreground">
          {persona === 'premium'
            ? 'Find your next premium experience'
            : persona === 'business'
              ? 'Book in under 90 seconds'
              : 'Plan your family adventure'}
        </p>
      </div>

      <div className="px-4 space-y-5 mt-4 max-w-[600px] mx-auto">
        {/* Trip Type */}
        <TripTypeToggle value={tripType} onChange={setTripType} />

        {/* Airports */}
        <div className="relative">
          <div className="space-y-3">
            <div>
              <AirportSelector
                value={from}
                onChange={(code) => {
                  setFrom(code);
                  if (errors.from) setErrors((e) => ({ ...e, from: undefined }));
                }}
                label="From"
                placeholder="Departure city or airport"
                excludeAirport={to}
              />
              {errors.from && (
                <p className="text-xs text-error-500 mt-1" role="alert">{errors.from}</p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1">
              <button
                onClick={swapAirports}
                disabled={!from && !to}
                className={cn(
                  'p-2 rounded-full border bg-background z-10',
                  'transition-all duration-[--duration-micro]',
                  'focus-visible:outline-2 focus-visible:outline-primary-500',
                  'min-h-[var(--touch-min)] min-w-[var(--touch-min)] flex items-center justify-center',
                  from || to
                    ? 'border-primary-300 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:border-primary-500 dark:hover:bg-input'
                    : 'border-surface-300 text-surface-300 cursor-not-allowed dark:border-muted dark:text-faint-foreground'
                )}
                aria-label="Swap departure and arrival airports"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            <div>
              <AirportSelector
                value={to}
                onChange={(code) => {
                  setTo(code);
                  if (errors.to) setErrors((e) => ({ ...e, to: undefined }));
                }}
                label="To"
                placeholder="Destination city or airport"
                excludeAirport={from}
              />
              {errors.to && (
                <p className="text-xs text-error-500 mt-1" role="alert">{errors.to}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className={cn(
          'grid gap-3',
          tripType === 'round-trip' ? 'grid-cols-2' : 'grid-cols-1'
        )}>
          <div>
            <DateSelector
              label="Depart"
              value={departDate}
              onChange={(d) => {
                setDepartDate(d);
                if (errors.departDate) setErrors((e) => ({ ...e, departDate: undefined }));
                // Clear return date if it's before new depart date
                if (returnDate && d > returnDate) setReturnDate('');
              }}
            />
            {errors.departDate && (
              <p className="text-xs text-error-500 mt-1" role="alert">{errors.departDate}</p>
            )}
          </div>
          {tripType === 'round-trip' && (
            <div>
              <DateSelector
                label="Return"
                value={returnDate}
                onChange={(d) => {
                  setReturnDate(d);
                  if (errors.returnDate) setErrors((e) => ({ ...e, returnDate: undefined }));
                }}
                minDate={departDate || undefined}
              />
              {errors.returnDate && (
                <p className="text-xs text-error-500 mt-1" role="alert">{errors.returnDate}</p>
              )}
            </div>
          )}
        </div>

        {/* Passengers & Cabin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PassengerSelector value={passengers} onChange={setPassengers} />
          <CabinClassSelector value={cabinClass} onChange={setCabinClass} persona={persona} />
        </div>

        {/* Family seating note */}
        {persona === 'family' && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-info-50 dark:bg-surface-info border border-info-200 dark:border-info">
            <span className="text-sm" aria-hidden="true">👨‍👩‍👧‍👦</span>
            <p className="text-xs text-info-700 dark:text-info-300">
              We&apos;ll prioritize flights with family seating options so you can sit together.
            </p>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={cn(
            'w-full py-3.5 rounded-lg font-semibold text-base',
            'flex items-center justify-center gap-2',
            'transition-all duration-[--duration-short]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-preferred)]',
            isSearching
              ? 'bg-primary-300 text-white cursor-not-allowed dark:bg-primary-700'
              : 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400'
          )}
        >
          <Search className="w-4.5 h-4.5" />
          {isSearching ? 'Searching...' : 'Search Flights'}
        </button>

        {/* Recent Searches */}
        <RecentSearches onSelect={handleRecentSelect} />
      </div>
    </div>
  );
}
