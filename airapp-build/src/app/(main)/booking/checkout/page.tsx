'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';
import { CabinClass } from '@/lib/types/user';
import { Flight } from '@/lib/types/flight';
import { getFlightById } from '@/lib/mock-data/flights';
import { FARE_BUNDLES } from '@/lib/mock-data/seats';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { ArrowLeft, ArrowRight, Loader2, Shield, Check } from 'lucide-react';

import { StepProgress } from './components/StepProgress';
import { PassengerForm, PassengerData } from './components/PassengerForm';
import { PaymentForm, PaymentData } from './components/PaymentForm';
import { ReviewSummary } from './components/ReviewSummary';
import { BookingConfirmation } from './components/BookingConfirmation';

const STEP_LABELS = ['Passengers', 'Trip Protection', 'Payment', 'Review'];

interface ProtectionOption {
  id: keyof TripProtectionState;
  title: string;
  price: number;
  description: string;
  icon: string;
}

interface TripProtectionState {
  cancellation: boolean;
  baggage: boolean;
  weatherGuarantee: boolean;
  conciergeCoverage: boolean;
}

const PROTECTION_OPTIONS: ProtectionOption[] = [
  {
    id: 'cancellation',
    title: 'Cancellation Protection',
    price: 49,
    description: 'Full refund if you cancel for any reason up to 24h before departure',
    icon: '🛡️',
  },
  {
    id: 'baggage',
    title: 'Baggage Insurance',
    price: 29,
    description: 'Coverage up to $3,000 for lost, damaged, or delayed baggage',
    icon: '🧳',
  },
  {
    id: 'weatherGuarantee',
    title: 'Weather Guarantee',
    price: 39,
    description: 'Free rebooking if severe weather disrupts your travel plans',
    icon: '🌦️',
  },
  {
    id: 'conciergeCoverage',
    title: 'Concierge Coverage',
    price: 89,
    description: '24/7 personal travel concierge for emergencies and changes',
    icon: '🎧',
  },
];

function generateConfirmationNumber(airline: string): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `BK-${airline}-${digits}`;
}

function createEmptyPassenger(): PassengerData {
  return { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', specialRequests: '' };
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { persona, user } = usePersona();

  const flightId = searchParams.get('flightId') ?? '';
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';
  const departDate = searchParams.get('departDate') ?? '';
  const cabinClass = (searchParams.get('cabinClass') ?? 'economy') as CabinClass;
  const adults = Number(searchParams.get('adults') ?? '1');
  const children = Number(searchParams.get('children') ?? '0');
  const infants = Number(searchParams.get('infants') ?? '0');
  const bundleId = searchParams.get('bundle') ?? 'standard';
  const seats = searchParams.get('seats') ?? '';
  const selectedSeats = seats ? seats.split(',') : [];
  const passengerCount = adults + children + infants;

  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [passengers, setPassengers] = useState<PassengerData[]>(() => {
    const paxList: PassengerData[] = [];
    for (let i = 0; i < passengerCount; i++) {
      if (i === 0 && user) {
        paxList.push({
          firstName: user.name.split(' ')[0] ?? '',
          lastName: user.name.split(' ').slice(1).join(' ') ?? '',
          email: user.email ?? '',
          phone: '',
          dateOfBirth: '',
          specialRequests: '',
        });
      } else {
        paxList.push(createEmptyPassenger());
      }
    }
    return paxList;
  });

  const [payment, setPayment] = useState<PaymentData>({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [tripProtection, setTripProtection] = useState<TripProtectionState>({
    cancellation: false,
    baggage: false,
    weatherGuarantee: false,
    conciergeCoverage: false,
  });

  const protectionTotal = PROTECTION_OPTIONS.reduce(
    (sum, opt) => sum + (tripProtection[opt.id] ? opt.price : 0),
    0
  );

  useEffect(() => {
    if (!flightId || !from || !to || !departDate) return;
    const timer = setTimeout(() => {
      const found = getFlightById(flightId, from, to, departDate);
      setFlight(found ?? null);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [flightId, from, to, departDate]);

  const bundle = FARE_BUNDLES.find((b) => b.id === bundleId);

  const basePrice = useMemo(() => {
    if (!flight) return 0;
    const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
    const base = flight.pricing[key as keyof typeof flight.pricing] as number;
    return (base + (bundle?.price ?? 0)) * passengerCount;
  }, [flight, cabinClass, bundle, passengerCount]);

  const totalPrice = basePrice + protectionTotal;

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    passengers.forEach((pax, i) => {
      if (!pax.firstName.trim()) newErrors[`pax${i}-firstName`] = 'Required';
      if (!pax.lastName.trim()) newErrors[`pax${i}-lastName`] = 'Required';
      if (!pax.email.trim() || !pax.email.includes('@')) newErrors[`pax${i}-email`] = 'Valid email required';
      if (!pax.dateOfBirth) newErrors[`pax${i}-dateOfBirth`] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (payment.method === 'card') {
      if (payment.cardNumber.length < 13) newErrors.cardNumber = 'Invalid card number';
      if (!payment.cardName.trim()) newErrors.cardName = 'Required';
      if (payment.expiry.length < 4) newErrors.expiry = 'Invalid';
      if (payment.cvv.length < 3) newErrors.cvv = 'Invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    // Step 2 = Trip Protection — no validation needed
    if (step === 3 && !validateStep3()) return;
    if (step === 4) {
      handleConfirm();
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleConfirm = () => {
    if (!termsAccepted) {
      setErrors({ terms: 'You must accept the terms' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setConfirmationNumber(generateConfirmationNumber(flight?.airline.code ?? 'AT'));
      setIsConfirmed(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (loading) return <PageSkeleton />;

  if (!flight) {
    return (
      <ErrorState
        message="Flight not found. Please start a new search."
        onRetry={() => router.push(ROUTES.SEARCH)}
      />
    );
  }

  if (isConfirmed) {
    return (
      <div className="px-4 max-w-[640px] mx-auto">
        <BookingConfirmation
          confirmationNumber={confirmationNumber}
          flight={flight}
          passengers={passengers}
          totalPrice={totalPrice}
          selectedSeats={selectedSeats}
        />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Progress Bar */}
      <div className="px-4 py-3 border-b border-surface-200 dark:border-input">
        <StepProgress currentStep={step} totalSteps={4} labels={STEP_LABELS} />
      </div>

      {/* Step Content */}
      <div className="px-4 mt-4 max-w-[640px] mx-auto">
        {step === 1 && (
          <PassengerForm
            passengers={passengers}
            onChange={setPassengers}
            errors={errors}
            persona={persona}
          />
        )}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
                  Trip Protection
                </h2>
              </div>
              <p className="text-sm text-primary-600 dark:text-faint-foreground mt-1">
                Protect your trip with optional coverage — select any that apply
              </p>
            </div>

            <div className="space-y-3" role="group" aria-label="Trip protection options">
              {PROTECTION_OPTIONS.map((option) => {
                const isSelected = tripProtection[option.id];
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-label={`${option.title} — $${option.price}`}
                    onClick={() =>
                      setTripProtection((prev) => ({
                        ...prev,
                        [option.id]: !prev[option.id],
                      }))
                    }
                    className={cn(
                      'w-full text-left p-4 rounded-xl border transition-all duration-[--duration-short]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                      'min-h-[var(--touch-preferred)]',
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:border-primary-500 dark:bg-surface-primary'
                        : 'border-surface-300 bg-background hover:border-primary-300 dark:border-input dark:bg-card dark:hover:border-primary'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-[--duration-micro]',
                        isSelected
                          ? 'bg-primary-500 border-primary-500 dark:bg-primary-500 dark:border-primary-500'
                          : 'border-surface-400 dark:border-muted'
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-primary-900 dark:text-foreground">
                            <span className="mr-1.5">{option.icon}</span>
                            {option.title}
                          </span>
                          <span className="text-sm font-bold text-primary-900 dark:text-foreground tabular-nums flex-shrink-0">
                            ${option.price}
                          </span>
                        </div>
                        <p className="text-xs text-primary-600 dark:text-faint-foreground mt-1 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Running Total */}
            <div className={cn(
              'p-4 rounded-xl border transition-colors duration-[--duration-short]',
              protectionTotal > 0
                ? 'bg-primary-50 border-primary-200 dark:bg-surface-primary dark:border-primary'
                : 'bg-surface-50 border-surface-200 dark:bg-background dark:border-input'
            )}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">
                  Protection Total
                </span>
                <span className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
                  {protectionTotal > 0 ? `+$${protectionTotal}` : '$0'}
                </span>
              </div>
              {protectionTotal > 0 && (
                <p className="text-xs text-primary-600 dark:text-faint-foreground mt-1">
                  Added to your booking total
                </p>
              )}
            </div>

            <p className="text-xs text-primary-600 dark:text-faint-foreground text-center">
              You can skip this step — protection can be added later from your trip details
            </p>
          </div>
        )}
        {step === 3 && (
          <PaymentForm
            data={payment}
            onChange={setPayment}
            errors={errors}
          />
        )}
        {step === 4 && (
          <ReviewSummary
            flight={flight}
            cabinClass={cabinClass}
            passengers={passengers}
            payment={payment}
            selectedSeats={selectedSeats}
            bundleName={bundle?.name ?? 'Standard'}
            totalPrice={totalPrice}
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
          />
        )}
      </div>

      {/* Sticky Navigation */}
      <div className="fixed bottom-16 left-0 right-0 z-30 px-4 py-3 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-t border-surface-200 dark:border-input">
        <div className="max-w-[640px] mx-auto flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium
                         text-primary-600 dark:text-soft-foreground
                         border border-surface-300 dark:border-muted
                         hover:bg-surface-50 dark:hover:bg-surface-100
                         transition-colors duration-[--duration-short]
                         min-h-[var(--touch-preferred)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div className="flex-1" />
          <div className="text-right mr-3">
            <p className="text-xs text-primary-600 dark:text-faint-foreground">Total</p>
            <p className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
              ${totalPrice.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm',
              'transition-all duration-[--duration-short]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              'min-h-[var(--touch-preferred)]',
              isSubmitting
                ? 'bg-primary-300 text-white cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming...
              </>
            ) : step === 4 ? (
              'Confirm Booking'
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}
