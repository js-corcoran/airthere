'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { GateCountdownHero } from './components/GateCountdownHero';
import { BoardingPhaseIndicator } from './components/BoardingPhaseIndicator';
import { DigitalBoardingPass } from './components/DigitalBoardingPass';
import { ConnectionWarningCard } from './components/ConnectionWarningCard';
import { GateAmenitiesSection } from './components/GateAmenitiesSection';
import {
  getGateBoardingInfo,
  getBoardingPhases,
  getConnectionInfo,
  getGateAmenities,
  getBoardingPasses,
} from './data/gate-data';
import {
  GateBoardingInfo,
  BoardingPhaseStep,
  ConnectionInfo,
  GateAmenity,
  PassengerBoardingPass,
} from './types';

type LoadingState = 'loading' | 'success' | 'error';

export default function GateBoardingPage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [boardingInfo, setBoardingInfo] = useState<GateBoardingInfo | null>(null);
  const [phases, setPhases] = useState<BoardingPhaseStep[]>([]);
  const [connection, setConnection] = useState<ConnectionInfo | null>(null);
  const [amenities, setAmenities] = useState<GateAmenity[]>([]);
  const [boardingPasses, setBoardingPasses] = useState<PassengerBoardingPass[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const info = getGateBoardingInfo(persona);
        setBoardingInfo(info);
        setPhases(getBoardingPhases(info.currentPhase, persona));
        setConnection(getConnectionInfo(persona));
        setAmenities(getGateAmenities(persona));
        setBoardingPasses(getBoardingPasses(persona));
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error' || !boardingInfo || !connection) {
    return (
      <ErrorState
        message="We couldn't load gate information. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => setState('success'), 600);
        }}
      />
    );
  }

  return (
    <div className="pb-4">
      {/* Live status pill */}
      <div className="px-4 py-2 flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                         bg-primary-100 dark:bg-[oklch(25%_0.010_262)]
                         text-primary-700 dark:text-[oklch(80%_0.005_50)]">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" aria-hidden="true" />
          Live · Updates every 30 seconds
        </span>
      </div>

      <div className="px-4 space-y-4">
        {/* Countdown hero card */}
        <GateCountdownHero info={boardingInfo} />

        {/* Gate change alert (business persona) */}
        {persona === 'business' && boardingInfo.gate === 'C15' && (
          <div
            className="flex items-start gap-3 p-3 rounded-lg
                       bg-warning-50 dark:bg-[oklch(20%_0.005_60)]
                       border border-warning-200 dark:border-[oklch(35%_0.040_60)]"
            role="alert"
          >
            <span className="text-warning-500 dark:text-[oklch(67%_0.175_60)] mt-0.5 shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-medium text-warning-800 dark:text-[oklch(58%_0.165_60)]">
                Gate Changed
              </p>
              <p className="text-xs text-warning-700 dark:text-[oklch(50%_0.145_60)] mt-0.5">
                Your gate has changed from C10 to C15. Updated 2 minutes ago.
              </p>
            </div>
          </div>
        )}

        {/* Delay notice (family persona) */}
        {boardingInfo.delayMinutes > 0 && (
          <div
            className="flex items-start gap-3 p-3 rounded-lg
                       bg-warning-50 dark:bg-[oklch(20%_0.005_60)]
                       border border-warning-200 dark:border-[oklch(35%_0.040_60)]"
            role="alert"
          >
            <span className="text-warning-500 mt-0.5 shrink-0">⏳</span>
            <div>
              <p className="text-sm font-medium text-warning-800 dark:text-[oklch(58%_0.165_60)]">
                Flight Delayed {boardingInfo.delayMinutes} Minutes
              </p>
              <p className="text-xs text-warning-700 dark:text-[oklch(50%_0.145_60)] mt-0.5">
                New estimated departure: {boardingInfo.estimatedTime}. We&apos;ll keep you updated.
              </p>
            </div>
          </div>
        )}

        {/* Boarding phase indicator */}
        <BoardingPhaseIndicator
          phases={phases}
          passengerGroup={boardingInfo.boardingGroup}
        />

        {/* Digital boarding pass(es) */}
        <DigitalBoardingPass
          passes={boardingPasses}
          flightNumber={boardingInfo.flightNumber}
          route={{ from: boardingInfo.route.from, to: boardingInfo.route.to }}
          departureTime={boardingInfo.estimatedTime}
        />

        {/* Connection warning */}
        <ConnectionWarningCard connection={connection} />

        {/* Flight details */}
        <section className="rounded-lg border border-surface-300 dark:border-[oklch(32%_0.008_50)]
                            bg-surface dark:bg-[oklch(18%_0.003_50)] p-4">
          <h3 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)] mb-3">
            Flight Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Aircraft</p>
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">{boardingInfo.aircraft}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Confirmation</p>
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)] font-mono">{boardingInfo.confirmationNumber}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Gate</p>
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">{boardingInfo.gate} · {boardingInfo.terminal}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-[oklch(60%_0.005_50)] uppercase tracking-wider">Status</p>
              <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)] capitalize">
                {boardingInfo.status.replace('_', ' ')}
              </p>
            </div>
          </div>
        </section>

        {/* Nearby amenities */}
        <GateAmenitiesSection
          amenities={amenities}
          gate={boardingInfo.gate}
          terminal={boardingInfo.terminal}
        />

        {/* Family-specific reminder */}
        {persona === 'family' && (
          <div className="p-3 rounded-lg bg-info-50 dark:bg-[oklch(20%_0.002_240)] border border-info-200 dark:border-[oklch(35%_0.020_240)]">
            <p className="text-xs text-info-700 dark:text-[oklch(70%_0.125_240)] font-medium">
              🎒 Family Boarding Tip
            </p>
            <p className="text-xs text-info-600 dark:text-[oklch(55%_0.160_240)] mt-1">
              Families with children under 6 can board during the pre-boarding phase.
              Have all family boarding passes ready at the gate. Children&apos;s entertainment bags can
              go in the overhead bin — the crew will help you get settled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
