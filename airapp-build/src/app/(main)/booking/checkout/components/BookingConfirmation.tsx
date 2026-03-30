'use client';

import { cn } from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import { Flight } from '@/lib/types/flight';
import { PassengerData } from './PassengerForm';
import { Check, Calendar, Download, Bell, Home } from 'lucide-react';

interface BookingConfirmationProps {
  confirmationNumber: string;
  flight: Flight;
  passengers: PassengerData[];
  totalPrice: number;
  selectedSeats: string[];
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function BookingConfirmation({
  confirmationNumber,
  flight,
  passengers,
  totalPrice,
  selectedSeats,
}: BookingConfirmationProps) {
  const router = useRouter();

  return (
    <div className="text-center space-y-6 py-4">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-success-100 dark:bg-surface-success flex items-center justify-center">
          <Check className="w-8 h-8 text-success-600 dark:text-success-300" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-primary-900 dark:text-foreground">
          Booking Confirmed!
        </h1>
        <p className="text-sm text-primary-500 dark:text-faint-foreground mt-1">
          Your trip has been successfully booked
        </p>
      </div>

      {/* Confirmation Number */}
      <div className="inline-block px-4 py-2 rounded-lg bg-surface-100 dark:bg-surface-elevated border border-surface-200 dark:border-input">
        <p className="text-xs text-primary-500 dark:text-faint-foreground">Confirmation Number</p>
        <p className="text-lg font-mono font-bold text-primary-900 dark:text-foreground tracking-wider">
          {confirmationNumber}
        </p>
      </div>

      {/* Flight Details */}
      <div className="p-4 rounded-xl border border-surface-300 dark:border-input text-left space-y-3">
        <div>
          <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
            {flight.airline.name} {flight.flightNumber}
          </p>
          <p className="text-sm text-primary-600 dark:text-soft-foreground">
            {flight.departure.city} ({flight.departure.airport}) → {flight.arrival.city} ({flight.arrival.airport})
          </p>
          <p className="text-xs text-primary-400 dark:text-faint-foreground mt-1">
            {formatDate(flight.departure.time)} · {formatTime(flight.departure.time)} – {formatTime(flight.arrival.time)}
          </p>
          {selectedSeats.length > 0 && (
            <p className="text-xs text-primary-400 dark:text-faint-foreground">
              Seat{selectedSeats.length > 1 ? 's' : ''}: {selectedSeats.join(', ')}
            </p>
          )}
        </div>

        <div className="border-t border-surface-200 dark:border-input pt-2">
          <p className="text-xs text-primary-500 dark:text-faint-foreground">Passengers</p>
          {passengers.map((pax, i) => (
            <p key={i} className="text-sm text-primary-900 dark:text-foreground">
              {pax.firstName} {pax.lastName}
            </p>
          ))}
        </div>

        <div className="flex justify-between pt-2 border-t border-surface-200 dark:border-input">
          <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Total Paid</span>
          <span className="text-lg font-bold text-success-600 dark:text-success-300 tabular-nums">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Confirmation email */}
      <p className="text-xs text-primary-500 dark:text-faint-foreground">
        Confirmation sent to {passengers[0]?.email}
      </p>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => router.push(ROUTES.TRIPS)}
          className="w-full py-3 rounded-lg font-semibold text-sm bg-primary-500 text-white
                     hover:bg-primary-600 transition-colors duration-[--duration-short]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                     min-h-[var(--touch-preferred)]
                     dark:bg-primary-500 dark:hover:bg-primary-400
                     flex items-center justify-center gap-2"
        >
          View My Trips
        </button>

        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-preferred)]">
            <Calendar className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            <span className="text-[11px] text-primary-600 dark:text-soft-foreground">Calendar</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-preferred)]">
            <Download className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            <span className="text-[11px] text-primary-600 dark:text-soft-foreground">Pass</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-preferred)]">
            <Bell className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            <span className="text-[11px] text-primary-600 dark:text-soft-foreground">Remind</span>
          </button>
        </div>

        <button
          onClick={() => router.push(ROUTES.HOME)}
          className="w-full py-2.5 rounded-lg text-sm font-medium text-primary-500 dark:text-primary-400
                     hover:bg-surface-50 dark:hover:bg-surface-100 transition-colors
                     min-h-[var(--touch-min)] flex items-center justify-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
