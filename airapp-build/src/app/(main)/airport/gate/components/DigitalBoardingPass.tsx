'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { CreditCard, Maximize2, X, User, Baby } from 'lucide-react';
import { PassengerBoardingPass } from '../types';

interface DigitalBoardingPassProps {
  passes: PassengerBoardingPass[];
  flightNumber: string;
  route: { from: string; to: string };
  departureTime: string;
}

function QRCodePlaceholder({ size }: { size: 'sm' | 'lg' }) {
  const gridSize = size === 'lg' ? 8 : 5;
  const cellSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

  return (
    <div className={cn('mx-auto rounded-lg bg-white dark:bg-[oklch(95%_0.002_50)] p-3', size === 'lg' ? 'w-64 h-64' : 'w-32 h-32')}>
      <div className={cn('grid gap-0.5', `grid-cols-${gridSize}`)} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div
            key={i}
            className={cn(
              cellSize,
              'rounded-[1px]',
              Math.random() > 0.4
                ? 'bg-primary-900 dark:bg-[oklch(15%_0.140_262)]'
                : 'bg-transparent'
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SingleBoardingPass({
  pass,
  flightNumber,
  route,
  departureTime,
  onExpand,
}: {
  pass: PassengerBoardingPass;
  flightNumber: string;
  route: { from: string; to: string };
  departureTime: string;
  onExpand: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border border-primary-200 dark:border-[oklch(35%_0.030_262)]
                 bg-gradient-to-b from-primary-50 to-surface
                 dark:from-[oklch(20%_0.010_262)] dark:to-[oklch(18%_0.003_50)]
                 shadow-sm"
    >
      {/* Header strip */}
      <div className="bg-primary-600 dark:bg-[oklch(40%_0.200_262)] px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider">Boarding Pass</span>
        </div>
        <button
          onClick={onExpand}
          className="w-8 h-8 flex items-center justify-center rounded-md
                     hover:bg-white/20 transition-colors duration-[--duration-micro]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Expand boarding pass"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        {/* Passenger */}
        <div className="flex items-center gap-2 mb-3">
          {pass.isChild ? (
            <Baby className="w-4 h-4 text-secondary-500 dark:text-[oklch(64%_0.158_50)]" aria-hidden="true" />
          ) : (
            <User className="w-4 h-4 text-primary-500 dark:text-[oklch(65%_0.194_262)]" aria-hidden="true" />
          )}
          <span className="text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            {pass.name}
          </span>
          {pass.isChild && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-100 dark:bg-[oklch(30%_0.020_50)] text-secondary-700 dark:text-[oklch(64%_0.158_50)] font-medium">
              Child
            </span>
          )}
        </div>

        {/* Route */}
        <div className="flex items-center justify-between mb-3 text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
          <span>{route.from}</span>
          <div className="flex-1 flex items-center justify-center px-3">
            <div className="h-px flex-1 bg-primary-200 dark:bg-[oklch(35%_0.030_262)]" />
            <span className="px-2 text-xs font-normal text-primary-500 dark:text-[oklch(70%_0.008_50)]">
              {flightNumber}
            </span>
            <div className="h-px flex-1 bg-primary-200 dark:bg-[oklch(35%_0.030_262)]" />
          </div>
          <span>{route.to}</span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Seat</p>
            <p className="text-xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">{pass.seat}</p>
          </div>
          <div>
            <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Group</p>
            <p className="text-xs font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mt-1">{pass.boardingGroup}</p>
          </div>
          <div>
            <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Departs</p>
            <p className="text-xs font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mt-1">{departureTime}</p>
          </div>
        </div>

        {/* QR code */}
        <QRCodePlaceholder size="sm" />
        <p className="text-center text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] mt-2">
          Tap to expand · Show to gate agent
        </p>
        <p className="text-center text-[10px] text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-1 font-medium">
          Confirmation: {pass.confirmationNumber}
        </p>
      </div>
    </div>
  );
}

export function DigitalBoardingPass({
  passes,
  flightNumber,
  route,
  departureTime,
}: DigitalBoardingPassProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="boarding-pass-heading">
      <h3 id="boarding-pass-heading" className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-3">
        {passes.length > 1 ? `Boarding Passes (${passes.length})` : 'Digital Boarding Pass'}
      </h3>

      <div className="space-y-3">
        {passes.map((pass, idx) => (
          <SingleBoardingPass
            key={idx}
            pass={pass}
            flightNumber={flightNumber}
            route={route}
            departureTime={departureTime}
            onExpand={() => setExpandedIndex(idx)}
          />
        ))}
      </div>

      {/* Expanded overlay */}
      {expandedIndex !== null && (
        <>
          <div className="fixed inset-0 z-50 bg-overlay-dark" onClick={() => setExpandedIndex(null)} aria-hidden="true" />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded boarding pass"
          >
            <div className="bg-white dark:bg-[oklch(18%_0.003_50)] rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                  {passes[expandedIndex].name}
                </h3>
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             bg-surface-200 dark:bg-[oklch(25%_0.005_50)]
                             hover:bg-surface-300 dark:hover:bg-[oklch(32%_0.008_50)]
                             transition-colors duration-[--duration-micro]
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-primary-700 dark:text-[oklch(85%_0.005_50)]" />
                </button>
              </div>

              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                  {route.from} → {route.to}
                </p>
                <p className="text-sm text-primary-500 dark:text-[oklch(70%_0.008_50)]">
                  {flightNumber} · Seat {passes[expandedIndex].seat}
                </p>
              </div>

              <QRCodePlaceholder size="lg" />

              <p className="text-center text-xs text-primary-500 dark:text-[oklch(70%_0.008_50)] mt-3">
                Show this QR code to the gate agent
              </p>
              <p className="text-center text-xs text-primary-400 dark:text-[oklch(60%_0.005_50)] mt-1">
                {passes[expandedIndex].confirmationNumber}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
