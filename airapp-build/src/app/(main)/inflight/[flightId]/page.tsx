'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { cn } from '@/lib/utils/cn';
import { InflightData } from '@/lib/types/inflight';
import { MOCK_INFLIGHT_DATA } from '@/lib/mock-data/inflight';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { Plane, ArrowLeft } from 'lucide-react';

import { FlightProgressMap } from './components/FlightProgressMap';
import { FlightStatusBanner } from './components/FlightStatusBanner';
import { MealServiceCard } from './components/MealServiceCard';
import { EntertainmentHub } from './components/EntertainmentHub';
import { ProductivityMode } from './components/ProductivityMode';
import { WellnessFeatures } from './components/WellnessFeatures';
import { CabinCrewAssistance } from './components/CabinCrewAssistance';
import { FlightFactsCard } from './components/FlightFactsCard';

type LoadingState = 'loading' | 'success' | 'error';

function getStatusLabel(status: string) {
  switch (status) {
    case 'climbing': return 'Climbing';
    case 'cruise': return 'Cruise';
    case 'descent': return 'Descent';
    case 'approaching': return 'Approaching';
    default: return 'En Route';
  }
}

export default function InflightPage() {
  const params = useParams();
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [data, setData] = useState<InflightData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(MOCK_INFLIGHT_DATA);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [params.flightId]);

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error' || !data) {
    return (
      <ErrorState
        message="Unable to load in-flight data. Check your connection and try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => {
            setData(MOCK_INFLIGHT_DATA);
            setState('success');
          }, 600);
        }}
      />
    );
  }

  const hoursRemaining = Math.floor(data.flight.progress.timeRemaining / 3600);
  const minutesRemaining = Math.floor((data.flight.progress.timeRemaining % 3600) / 60);
  const timeRemainingMinutes = Math.floor(data.flight.progress.timeRemaining / 60);
  const flightDurationMinutes = Math.floor(
    (data.flight.progress.timeElapsed + data.flight.progress.timeRemaining) / 60
  );

  return (
    <div className="pb-4">
      {/* Cabin Header */}
      <div
        className={cn(
          'sticky top-0 z-30 px-4 py-3',
          'bg-primary-900/95 backdrop-blur-sm',
          'dark:bg-background/95'
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className={cn(
                'p-1.5 rounded-md hover:bg-white/10',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                'min-w-[var(--touch-min)] min-h-[var(--touch-min)] flex items-center justify-center'
              )}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-secondary-400" aria-hidden="true" />
                <span className="text-sm font-bold text-white">
                  {data.flight.flightNumber}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/80 font-medium">
                  {getStatusLabel(data.flight.status)}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                {data.flight.route.from} to {data.flight.route.to}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white font-mono">
              {hoursRemaining}h {minutesRemaining}m
            </p>
            <p className="text-xs text-white/60">remaining</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4 mt-4">
        {/* Flight Map */}
        <FlightProgressMap flight={data.flight} />

        {/* Quick Status */}
        <FlightStatusBanner flight={data.flight} />

        {/* Meal Service */}
        <MealServiceCard meal={data.meal} />

        {/* Entertainment */}
        <EntertainmentHub
          items={data.entertainment}
          flightDurationMinutes={flightDurationMinutes}
        />

        {/* Productivity */}
        <ProductivityMode
          data={data.productivity}
          timeRemainingMinutes={timeRemainingMinutes}
        />

        {/* Wellness */}
        <WellnessFeatures
          data={data.wellness}
          flightDurationMinutes={flightDurationMinutes}
        />

        {/* Cabin Crew */}
        <CabinCrewAssistance requests={data.serviceRequests} />

        {/* Flight Facts */}
        <FlightFactsCard facts={data.flightFacts} />
      </div>
    </div>
  );
}
