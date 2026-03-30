'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import Link from 'next/link';
import { Plane } from 'lucide-react';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { JourneyBreadcrumb } from '@/components/navigation/JourneyBreadcrumb';
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

  const flightIdMap: Record<string, string> = {
    premium: 'FL-JFK-SIN-DEMO',
    business: 'FL-SFO-ORD-BIZ',
    family: 'FL-LAX-HNL-FAM',
  };
  const flightId = flightIdMap[persona] ?? 'FL-JFK-SIN-DEMO';

  return (
    <div className="pb-4">
      {/* Journey Breadcrumb */}
      <JourneyBreadcrumb currentStep="gate" flightId={flightId} />

      {/* Live status pill */}
      <div className="px-4 py-2 flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                         bg-primary-100 dark:bg-surface-primary
                         text-primary-700 dark:text-soft-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" aria-hidden="true" />
          Live · Updates every 30 seconds
        </span>
      </div>

      <div className="px-4 space-y-4">
        {/* Countdown hero card */}
        <GateCountdownHero info={boardingInfo} />

        {/* Next Step CTA — visible without scrolling */}
        <Link
          href={`/inflight/${flightId}`}
          className="flex items-center justify-between p-3 rounded-lg
                     bg-secondary-50 dark:bg-surface-primary
                     border border-secondary-200 dark:border-primary
                     hover:bg-secondary-100 dark:hover:bg-surface-elevated
                     transition-colors min-h-[var(--touch-min)]"
          aria-label="Continue to in-flight experience after boarding"
        >
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-secondary-500 dark:text-secondary-400" aria-hidden="true" />
            <span className="text-sm font-medium text-secondary-700 dark:text-soft-foreground">
              Next: In-Flight Experience
            </span>
          </div>
          <span className="text-xs text-secondary-500 dark:text-faint-foreground">After boarding →</span>
        </Link>

        {/* Gate change alert (business persona) */}
        {persona === 'business' && boardingInfo.gate === 'C15' && (
          <div
            className="flex items-start gap-3 p-3 rounded-lg
                       bg-warning-50 dark:bg-surface-warning
                       border border-warning-200 dark:border-warning-800"
            role="alert"
          >
            <span className="text-warning-500 dark:text-warning-500 mt-0.5 shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-medium text-warning-800 dark:text-warning-600">
                Gate Changed
              </p>
              <p className="text-xs text-warning-700 dark:text-warning-700 mt-0.5">
                Your gate has changed from C10 to C15. Updated 2 minutes ago.
              </p>
            </div>
          </div>
        )}

        {/* Delay notice (family persona) */}
        {boardingInfo.delayMinutes > 0 && (
          <div
            className="flex items-start gap-3 p-3 rounded-lg
                       bg-warning-50 dark:bg-surface-warning
                       border border-warning-200 dark:border-warning-800"
            role="alert"
          >
            <span className="text-warning-500 mt-0.5 shrink-0">⏳</span>
            <div>
              <p className="text-sm font-medium text-warning-800 dark:text-warning-600">
                Flight Delayed {boardingInfo.delayMinutes} Minutes
              </p>
              <p className="text-xs text-warning-700 dark:text-warning-700 mt-0.5">
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
        <section className="rounded-lg border border-surface-300 dark:border-muted
                            bg-surface dark:bg-card p-4">
          <h3 className="text-base font-semibold text-primary-900 dark:text-foreground mb-3">
            Flight Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-primary-400 dark:text-faint-foreground uppercase tracking-wider">Aircraft</p>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">{boardingInfo.aircraft}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-faint-foreground uppercase tracking-wider">Confirmation</p>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground font-mono">{boardingInfo.confirmationNumber}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-faint-foreground uppercase tracking-wider">Gate</p>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground">{boardingInfo.gate} · {boardingInfo.terminal}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-400 dark:text-faint-foreground uppercase tracking-wider">Status</p>
              <p className="text-sm font-medium text-primary-900 dark:text-foreground capitalize">
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
          <div className="p-3 rounded-lg bg-info-50 dark:bg-surface-info border border-info-200 dark:border-info">
            <p className="text-xs text-info-700 dark:text-info-400 font-medium">
              🎒 Family Boarding Tip
            </p>
            <p className="text-xs text-info-600 dark:text-info-600 mt-1">
              Families with children under 6 can board during the pre-boarding phase.
              Have all family boarding passes ready at the gate. Children&apos;s entertainment bags can
              go in the overhead bin — the crew will help you get settled.
            </p>
          </div>
        )}

        {/* Start In-Flight Mode CTA */}
        <Link
          href={`/inflight/${flightId}`}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg
                     bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-500 dark:hover:bg-secondary-400
                     text-white text-sm font-semibold
                     transition-all duration-[--duration-short]
                     min-h-[var(--touch-preferred)]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500
                     shadow-md hover:shadow-lg"
          aria-label="Start in-flight experience"
        >
          <Plane className="w-4.5 h-4.5" aria-hidden="true" />
          Start In-Flight Mode
        </Link>
      </div>
    </div>
  );
}
