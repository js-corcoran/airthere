'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { CabinClass } from '@/lib/types/user';
import { Flight, SeatInfo } from '@/lib/types/flight';
import { getFlightById } from '@/lib/mock-data/flights';
import { generateSeats, FARE_BUNDLES } from '@/lib/mock-data/seats';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import { FlightSummary } from './components/FlightSummary';
import { AmenitiesList } from './components/AmenitiesList';
import { FareBundleSelector } from './components/FareBundleSelector';
import { SeatMap } from './components/SeatMap';

function BookingDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { persona } = usePersona();

  const flightId = searchParams.get('flightId') ?? '';
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';
  const departDate = searchParams.get('departDate') ?? '';
  const cabinClass = (searchParams.get('cabinClass') ?? 'economy') as CabinClass;
  const adults = Number(searchParams.get('adults') ?? '1');
  const children = Number(searchParams.get('children') ?? '0');
  const infants = Number(searchParams.get('infants') ?? '0');
  const passengerCount = adults + children + infants;

  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBundle, setSelectedBundle] = useState('standard');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = useMemo(() => generateSeats(30), []);

  useEffect(() => {
    if (!flightId || !from || !to || !departDate) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const found = getFlightById(flightId, from, to, departDate);
      setFlight(found ?? null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [flightId, from, to, departDate]);

  const bundle = FARE_BUNDLES.find((b) => b.id === selectedBundle);
  const seatUpgradeCost = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    return sum + (seat?.price ?? 0);
  }, 0);

  const basePrice = flight
    ? (() => {
        const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
        return flight.pricing[key as keyof typeof flight.pricing] as number;
      })()
    : 0;

  const totalPerPerson = basePrice + (bundle?.price ?? 0) + seatUpgradeCost;
  const grandTotal = totalPerPerson * passengerCount;

  const canProceed = selectedSeats.length === passengerCount || !bundle?.includes.seatSelection;

  const handleContinue = () => {
    const params = new URLSearchParams({
      flightId,
      from,
      to,
      departDate,
      cabinClass,
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      bundle: selectedBundle,
      seats: selectedSeats.join(','),
    });
    router.push(`${ROUTES.BOOKING_CHECKOUT}?${params.toString()}`);
  };

  if (loading) return <PageSkeleton />;

  if (!flight) {
    return (
      <ErrorState
        message="Flight not found. It may no longer be available."
        onRetry={() => router.push(ROUTES.SEARCH)}
      />
    );
  }

  return (
    <div className="pb-28">
      <div className="px-4 space-y-5 mt-3 max-w-[640px] mx-auto">
        {/* Flight Summary */}
        <FlightSummary
          flight={flight}
          cabinClass={cabinClass}
          passengerCount={passengerCount}
          persona={persona}
        />

        {/* Amenities */}
        <AmenitiesList amenities={flight.amenities} />

        {/* Fare Bundles */}
        <FareBundleSelector
          bundles={FARE_BUNDLES}
          selectedId={selectedBundle}
          basePrice={basePrice}
          onChange={setSelectedBundle}
        />

        {/* Seat Selection */}
        {bundle?.includes.seatSelection && (
          <SeatMap
            seats={seats}
            maxSelections={passengerCount}
            selectedSeats={selectedSeats}
            onSelectionChange={setSelectedSeats}
            persona={persona}
          />
        )}

        {!bundle?.includes.seatSelection && (
          <div className="px-3 py-3 rounded-lg bg-surface-50 dark:bg-[oklch(20%_0.003_50)] border border-surface-200 dark:border-[oklch(25%_0.005_50)]">
            <p className="text-sm text-primary-600 dark:text-[oklch(75%_0.005_50)]">
              Seat selection is available with Standard or Premium fares.
              Upgrade your fare to choose your preferred seat.
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] uppercase tracking-wider">
            Price Breakdown
          </h3>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-primary-600 dark:text-[oklch(75%_0.005_50)]">
                Base fare × {passengerCount}
              </span>
              <span className="text-primary-900 dark:text-[oklch(92%_0.002_50)] tabular-nums">
                ${(basePrice * passengerCount).toLocaleString()}
              </span>
            </div>
            {(bundle?.price ?? 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary-600 dark:text-[oklch(75%_0.005_50)]">
                  {bundle?.name} fare upgrade × {passengerCount}
                </span>
                <span className="text-primary-900 dark:text-[oklch(92%_0.002_50)] tabular-nums">
                  +${((bundle?.price ?? 0) * passengerCount).toLocaleString()}
                </span>
              </div>
            )}
            {seatUpgradeCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary-600 dark:text-[oklch(75%_0.005_50)]">
                  Seat upgrades
                </span>
                <span className="text-primary-900 dark:text-[oklch(92%_0.002_50)] tabular-nums">
                  +${(seatUpgradeCost * passengerCount).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-surface-300 dark:border-[oklch(28%_0.005_50)]">
              <span className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                Total
              </span>
              <span className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-30 px-4 py-3 bg-background/95 dark:bg-[oklch(14%_0.003_50)]/95 backdrop-blur-sm border-t border-surface-200 dark:border-[oklch(25%_0.005_50)]">
        <div className="max-w-[640px] mx-auto flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">Total</p>
            <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
              ${grandTotal.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={!canProceed}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm',
              'transition-all duration-[--duration-short]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-preferred)]',
              canProceed
                ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-[oklch(55%_0.194_262)] dark:hover:bg-[oklch(60%_0.194_262)]'
                : 'bg-surface-200 text-surface-400 cursor-not-allowed dark:bg-[oklch(25%_0.003_50)] dark:text-[oklch(45%_0.005_50)]'
            )}
          >
            Continue to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BookingDetailContent />
    </Suspense>
  );
}
