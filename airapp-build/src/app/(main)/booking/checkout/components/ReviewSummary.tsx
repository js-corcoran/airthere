'use client';

import { Flight } from '@/lib/types/flight';
import { CabinClass } from '@/lib/types/user';
import { PassengerData } from './PassengerForm';
import { PaymentData } from './PaymentForm';
import { Plane, User, CreditCard, Check } from 'lucide-react';

interface ReviewSummaryProps {
  flight: Flight;
  cabinClass: CabinClass;
  passengers: PassengerData[];
  payment: PaymentData;
  selectedSeats: string[];
  bundleName: string;
  totalPrice: number;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function ReviewSummary({
  flight,
  cabinClass,
  passengers,
  payment,
  selectedSeats,
  bundleName,
  totalPrice,
  termsAccepted,
  onTermsChange,
}: ReviewSummaryProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          Review Your Booking
        </h2>
        <p className="text-sm text-primary-500 dark:text-[oklch(60%_0.005_50)] mt-0.5">
          Please confirm all details before completing your booking
        </p>
      </div>

      {/* Flight */}
      <div className="p-4 rounded-xl border border-surface-300 dark:border-[oklch(28%_0.005_50)] space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)]">
          <Plane className="w-4 h-4" />
          Flight
        </div>
        <p className="text-sm text-primary-900 dark:text-[oklch(92%_0.002_50)] font-semibold">
          {flight.airline.name} {flight.flightNumber}
        </p>
        <p className="text-sm text-primary-600 dark:text-[oklch(75%_0.005_50)]">
          {flight.departure.airport} → {flight.arrival.airport} · {formatTime(flight.departure.time)} – {formatTime(flight.arrival.time)}
        </p>
        <p className="text-xs text-primary-400 dark:text-[oklch(55%_0.005_50)]">
          {cabinClass.replace('-', ' ')} · {bundleName} fare
          {selectedSeats.length > 0 && ` · Seat${selectedSeats.length > 1 ? 's' : ''} ${selectedSeats.join(', ')}`}
        </p>
      </div>

      {/* Passengers */}
      <div className="p-4 rounded-xl border border-surface-300 dark:border-[oklch(28%_0.005_50)] space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)]">
          <User className="w-4 h-4" />
          Passengers
        </div>
        {passengers.map((pax, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-primary-900 dark:text-[oklch(92%_0.002_50)]">
              {pax.firstName} {pax.lastName}
            </span>
            <span className="text-primary-400 dark:text-[oklch(55%_0.005_50)]">{pax.email}</span>
          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="p-4 rounded-xl border border-surface-300 dark:border-[oklch(28%_0.005_50)] space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)]">
          <CreditCard className="w-4 h-4" />
          Payment
        </div>
        <p className="text-sm text-primary-900 dark:text-[oklch(92%_0.002_50)]">
          {payment.method === 'card'
            ? `•••• •••• •••• ${payment.cardNumber.slice(-4) || '••••'}`
            : payment.method === 'apple-pay'
              ? 'Apple Pay'
              : 'Google Pay'}
        </p>
      </div>

      {/* Total */}
      <div className="p-4 rounded-xl bg-primary-50 dark:bg-[oklch(20%_0.015_262)] border border-primary-200 dark:border-[oklch(30%_0.05_262)]">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            Total
          </span>
          <span className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)] tabular-nums">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer min-h-[var(--touch-min)]">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500"
        />
        <span className="text-xs text-primary-600 dark:text-[oklch(75%_0.005_50)]">
          I agree to AirThere&apos;s Terms of Service and Privacy Policy. I understand that this is a
          non-refundable booking unless otherwise stated by my selected fare.
        </span>
      </label>
    </div>
  );
}
