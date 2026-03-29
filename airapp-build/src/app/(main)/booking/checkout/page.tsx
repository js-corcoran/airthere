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
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

import { StepProgress } from './components/StepProgress';
import { PassengerForm, PassengerData } from './components/PassengerForm';
import { PaymentForm, PaymentData } from './components/PaymentForm';
import { ReviewSummary } from './components/ReviewSummary';
import { BookingConfirmation } from './components/BookingConfirmation';

const STEP_LABELS = ['Passengers', 'Payment', 'Review'];

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

  const totalPrice = useMemo(() => {
    if (!flight) return 0;
    const key = cabinClass === 'premium-economy' ? 'premiumEconomy' : cabinClass;
    const base = flight.pricing[key as keyof typeof flight.pricing] as number;
    return (base + (bundle?.price ?? 0)) * passengerCount;
  }, [flight, cabinClass, bundle, passengerCount]);

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

  const validateStep2 = (): boolean => {
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
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      handleConfirm();
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);
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
      <div className="px-4 py-3 border-b border-surface-200 dark:border-[oklch(25%_0.005_50)]">
        <StepProgress currentStep={step} totalSteps={3} labels={STEP_LABELS} />
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
          <PaymentForm
            data={payment}
            onChange={setPayment}
            errors={errors}
          />
        )}
        {step === 3 && (
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
      <div className="fixed bottom-16 left-0 right-0 z-30 px-4 py-3 bg-background/95 dark:bg-[oklch(14%_0.003_50)]/95 backdrop-blur-sm border-t border-surface-200 dark:border-[oklch(25%_0.005_50)]">
        <div className="max-w-[640px] mx-auto flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium
                         text-primary-600 dark:text-[oklch(75%_0.005_50)]
                         border border-surface-300 dark:border-[oklch(32%_0.008_50)]
                         hover:bg-surface-50 dark:hover:bg-[oklch(20%_0.003_50)]
                         transition-colors duration-[--duration-short]
                         min-h-[var(--touch-preferred)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div className="flex-1" />
          <div className="text-right mr-3">
            <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">Total</p>
            <p className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
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
                : 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-[oklch(55%_0.194_262)] dark:hover:bg-[oklch(60%_0.194_262)]'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming...
              </>
            ) : step === 3 ? (
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
