'use client';

import { cn } from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';
import { Trip } from '@/lib/types/trip';
import Link from 'next/link';
import {
  X, Plane, Clock, MapPin, Users, Hotel, FileText,
  CheckCircle2, AlertCircle, ArrowRight, Download, Share2, BookOpen,
  AlertTriangle, Navigation, DoorOpen, FolderOpen, UsersRound
} from 'lucide-react';

interface TripDetailSheetProps {
  trip: Trip;
  onClose: () => void;
  persona?: string;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export function TripDetailSheet({ trip, onClose, persona }: TripDetailSheetProps) {
  const router = useRouter();
  const flight = trip.flights[0];
  const isCompleted = trip.status === 'completed';
  const isDisrupted = trip.status === 'disrupted';
  const isUpcoming = trip.status === 'upcoming' || trip.status === 'active';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-overlay-dark z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="fixed inset-0 z-50 bg-background dark:bg-background overflow-y-auto animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-b border-surface-200 dark:border-input px-4 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-input transition-colors"
            aria-label="Close trip details"
          >
            <X className="w-5 h-5 text-primary-600 dark:text-soft-foreground" />
          </button>
          <h2 className="text-base font-semibold text-primary-900 dark:text-foreground">
            {trip.name}
          </h2>
          <button className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-input transition-colors" aria-label="Share trip">
            <Share2 className="w-5 h-5 text-primary-600 dark:text-soft-foreground" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-5 pb-8 max-w-[640px] mx-auto">
          {/* Route Hero */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
                  {trip.departure.airport}
                </p>
                <p className="text-xs text-primary-500 dark:text-faint-foreground">{trip.departure.city}</p>
              </div>
              <Plane className="w-5 h-5 text-primary-400 mx-2" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-900 dark:text-foreground">
                  {trip.arrival.airport}
                </p>
                <p className="text-xs text-primary-500 dark:text-faint-foreground">{trip.arrival.city}</p>
              </div>
            </div>
            <p className="text-sm text-primary-600 dark:text-caption-foreground">
              {formatDate(trip.departure.date)} – {formatDate(trip.arrival.date)}
            </p>
            <p className="text-xs text-primary-400 dark:text-faint-foreground mt-1">
              Confirmation: {trip.confirmationNumber}
            </p>
          </div>

          {/* Flight Itinerary */}
          <section aria-label="Flight itinerary">
            <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" />
              Flight Details
            </h3>
            {trip.flights.map((tf) => (
              <div
                key={tf.id}
                className="p-4 rounded-xl border border-surface-300 dark:border-input space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-surface-100 dark:bg-input flex items-center justify-center text-xs font-bold text-primary-700 dark:text-soft-foreground">
                      {tf.flight.airline.code}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
                        {tf.flight.airline.name} {tf.flight.flightNumber}
                      </p>
                      <p className="text-xs text-primary-400 dark:text-faint-foreground">{tf.flight.aircraft}</p>
                    </div>
                  </div>
                  <div className={cn(
                    'px-2 py-0.5 rounded-full text-[11px] font-semibold',
                    tf.status === 'on-time'
                      ? 'bg-success-100 text-success-700 dark:bg-surface-success dark:text-success-200'
                      : tf.status === 'delayed'
                        ? 'bg-warning-100 text-warning-700 dark:bg-surface-warning dark:text-warning-300'
                        : 'bg-surface-200 text-primary-500 dark:bg-input dark:text-faint-foreground'
                  )}>
                    {tf.status === 'on-time' ? 'On Time' : tf.status}
                  </div>
                </div>

                {/* Times */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
                      {formatTime(tf.flight.departure.time)}
                    </p>
                    <p className="text-xs font-medium text-primary-500 dark:text-faint-foreground">
                      {tf.flight.departure.airport}
                    </p>
                    {tf.flight.departure.terminal && (
                      <p className="text-[11px] text-primary-400 dark:text-faint-foreground">
                        T{tf.flight.departure.terminal}
                        {tf.flight.departure.gate && ` · Gate ${tf.flight.departure.gate}`}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-xs text-primary-400 dark:text-faint-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDuration(tf.flight.duration)}
                    </div>
                    <div className="w-full h-px bg-surface-300 dark:bg-muted" />
                    <p className="text-xs text-success-600 dark:text-success-300">
                      {tf.flight.stops === 0 ? 'Nonstop' : `${tf.flight.stops} stop`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-900 dark:text-foreground tabular-nums">
                      {formatTime(tf.flight.arrival.time)}
                    </p>
                    <p className="text-xs font-medium text-primary-500 dark:text-faint-foreground">
                      {tf.flight.arrival.airport}
                    </p>
                    {tf.flight.arrival.terminal && (
                      <p className="text-[11px] text-primary-400 dark:text-faint-foreground">
                        T{tf.flight.arrival.terminal}
                      </p>
                    )}
                  </div>
                </div>

                {/* Seat */}
                {tf.seat && (
                  <div className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-caption-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary-400" />
                    Seat {tf.seat}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Hotel */}
          {trip.hotel && (
            <section aria-label="Hotel information">
              <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5" />
                Accommodation
              </h3>
              <div className="p-4 rounded-xl border border-surface-300 dark:border-input space-y-2">
                <p className="text-sm font-semibold text-primary-900 dark:text-foreground">
                  {trip.hotel.name}
                </p>
                <p className="text-xs text-primary-500 dark:text-faint-foreground">
                  {trip.hotel.city} · Check-in {formatDate(trip.hotel.checkIn)} · Check-out {formatDate(trip.hotel.checkOut)}
                </p>
                <p className="text-xs text-primary-400 dark:text-faint-foreground">
                  Conf: {trip.hotel.confirmationNumber}
                </p>
              </div>
            </section>
          )}

          {/* Travelers */}
          <section aria-label="Travelers">
            <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Travelers ({trip.passengers.length})
            </h3>
            <div className="space-y-2">
              {trip.passengers.map((pax) => (
                <div
                  key={pax.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input"
                >
                  <div>
                    <p className="text-sm font-medium text-primary-900 dark:text-foreground">
                      {pax.name}
                    </p>
                    <p className="text-xs text-primary-400 dark:text-faint-foreground capitalize">{pax.type}</p>
                  </div>
                  <div className="text-right">
                    {pax.seat && (
                      <p className="text-xs text-primary-500 dark:text-faint-foreground">Seat {pax.seat}</p>
                    )}
                    {pax.meal && (
                      <p className="text-[11px] text-primary-400 dark:text-faint-foreground">{pax.meal}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section aria-label="Documents">
            <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Documents
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input">
                <CheckCircle2 className="w-4 h-4 text-success-500 dark:text-success-400 shrink-0" />
                <span className="text-sm text-primary-700 dark:text-soft-foreground flex-1">Booking Confirmation</span>
                <Download className="w-4 h-4 text-primary-400 dark:text-faint-foreground" />
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input">
                <CheckCircle2 className="w-4 h-4 text-success-500 dark:text-success-400 shrink-0" />
                <span className="text-sm text-primary-700 dark:text-soft-foreground flex-1">E-Ticket Receipt</span>
                <Download className="w-4 h-4 text-primary-400 dark:text-faint-foreground" />
              </div>
              {!flight?.checkedIn && (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-warning-50 dark:bg-surface-warning border border-warning-200 dark:border-warning-800">
                  <AlertCircle className="w-4 h-4 text-warning-500 dark:text-warning-400 shrink-0" />
                  <span className="text-sm text-warning-700 dark:text-warning-300 flex-1">Boarding pass available after check-in</span>
                </div>
              )}
            </div>
          </section>

          {/* Price Summary */}
          <div className="p-4 rounded-xl bg-primary-50 dark:bg-surface-primary border border-primary-200 dark:border-primary">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Total Trip Cost</span>
              <span className="text-xl font-bold text-primary-900 dark:text-foreground tabular-nums">
                ${trip.totalCost.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Disrupted Trip — Recovery CTA */}
          {isDisrupted && (
            <div className="space-y-3">
              <Link
                href={`/irops/${flight?.flight.id ?? 'FL-JFK-SIN-DEMO'}`}
                onClick={onClose}
                className="w-full py-3 rounded-lg font-semibold text-sm bg-error-600 text-white hover:bg-error-700 dark:bg-error-500 dark:hover:bg-error-400 transition-colors min-h-[var(--touch-preferred)] flex items-center justify-center gap-2"
                aria-label="View recovery options for disrupted flight"
              >
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                View Recovery Options
              </Link>
            </div>
          )}

          {/* Quick Navigation Links */}
          {(isUpcoming || isDisrupted) && (
            <section aria-label="Trip quick links">
              <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/airport"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-min)]"
                  aria-label="Airport Live"
                >
                  <Navigation className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Airport Live</span>
                </Link>
                <Link
                  href="/airport/gate"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-min)]"
                  aria-label="Gate and Boarding"
                >
                  <DoorOpen className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Gate & Boarding</span>
                </Link>
                <Link
                  href="/trips/documents"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-min)]"
                  aria-label="Documents"
                >
                  <FolderOpen className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Documents</span>
                </Link>
                <Link
                  href="/family"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-50 dark:bg-surface-100 border border-surface-200 dark:border-input hover:bg-surface-100 dark:hover:bg-input transition-colors min-h-[var(--touch-min)]"
                  aria-label="Family Hub"
                >
                  <UsersRound className="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary-700 dark:text-soft-foreground">Family Hub</span>
                </Link>
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="space-y-2">
            {isCompleted ? (
              <Link
                href="/trips/recap"
                onClick={onClose}
                className="w-full py-3 rounded-lg font-semibold text-sm bg-secondary-500 text-white hover:bg-secondary-600 transition-colors min-h-[var(--touch-preferred)] dark:bg-secondary-500 dark:hover:bg-secondary-600 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                View Trip Recap
              </Link>
            ) : (
              <>
                <button className="w-full py-3 rounded-lg font-semibold text-sm bg-primary-500 text-white hover:bg-primary-600 transition-colors min-h-[var(--touch-preferred)] dark:bg-primary-500 dark:hover:bg-primary-400">
                  {flight?.checkedIn ? 'View Boarding Pass' : 'Check In'}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2.5 rounded-lg text-sm font-medium border border-surface-300 dark:border-muted text-primary-600 dark:text-soft-foreground hover:bg-surface-50 dark:hover:bg-surface-100 transition-colors min-h-[var(--touch-min)]">
                    Modify Booking
                  </button>
                  <button className="py-2.5 rounded-lg text-sm font-medium border border-error-300 dark:border-error-700 text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-surface-error transition-colors min-h-[var(--touch-min)]">
                    Cancel Trip
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
