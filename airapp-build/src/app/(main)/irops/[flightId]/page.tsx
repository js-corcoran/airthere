'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { getDefaultScenarioForPersona } from '@/lib/mock-data/disruptions';
import type { DisruptionScenario, RebookingFlight } from '@/lib/types/disruption';
import { Plane, Building2, Car } from 'lucide-react';

import { DisruptionSeverityBanner } from '@/components/irops/DisruptionSeverityBanner';
import { RootCauseExplanation } from '@/components/irops/RootCauseExplanation';
import { DisruptionTimeline } from '@/components/irops/DisruptionTimeline';
import { AutomaticRebooking } from '@/components/irops/AutomaticRebooking';
import { FamilyRebookingConfirm } from '@/components/irops/FamilyRebookingConfirm';
import { RebookingOptions } from '@/components/irops/RebookingOptions';
import { HotelVoucher } from '@/components/irops/HotelVoucher';
import { TransportVoucher } from '@/components/irops/TransportVoucher';
import { AirlineContact } from '@/components/irops/AirlineContact';
import { LoyaltyCompensation } from '@/components/irops/LoyaltyCompensation';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';

type LoadingState = 'loading' | 'success' | 'error';

export default function IROPSRecoveryPage() {
  const params = useParams();
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [scenario, setScenario] = useState<DisruptionScenario | null>(null);

  // Rebooking state
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState<string | undefined>(undefined);
  const [familyConfirmed, setFamilyConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rebookingApproved, setRebookingApproved] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<string | undefined>(undefined);

  // Unified flow state
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [flightSelectionMode, setFlightSelectionMode] = useState<'auto' | 'alternatives' | null>('auto');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const data = getDefaultScenarioForPersona(persona);
        setScenario(data);
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona, params.flightId]);

  // Unified confirmation — all selections at once
  const handleConfirmAll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRebookingApproved(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDeclineAuto = () => {
    setSelectedFlight(null);
    setFlightSelectionMode('alternatives');
    setShowAlternatives(true);
  };

  const handleSelectAlternative = (flight: RebookingFlight) => {
    setSelectedFlight(flight.id);
    setSelectedAlternative(flight.id);
    setFlightSelectionMode('alternatives');
  };

  const handleFamilyConfirm = () => {
    setFamilyConfirmed(true);
  };

  if (state === 'loading') return <PageSkeleton />;
  if (state === 'error' || !scenario) {
    return (
      <ErrorState
        title="Unable to load disruption details"
        message="We're having trouble loading your flight disruption information. Please try again."
        onRetry={() => setState('loading')}
      />
    );
  }

  const { disruption, automaticRebooking, alternatives, familyInfo, hotelVoucher, transportOptions, contactMethods, loyaltyCompensation } = scenario;

  // Compute whether all required selections are made
  const allSelectionsComplete =
    selectedFlight !== null &&
    (!hotelVoucher || selectedHotel !== null) &&
    (!transportOptions?.length || selectedTransport !== undefined);

  // Persona-specific messaging
  const personaBanner = persona === 'premium'
    ? 'Your concierge team has been notified and is standing by.'
    : persona === 'business'
      ? 'This rebooking is policy-compliant. Expenses will auto-track.'
      : persona === 'family'
        ? 'Your entire family has been rebooked together.'
        : null;

  return (
    <main
      role="main"
      aria-label="Flight disruption recovery"
      className="min-h-screen bg-background dark:bg-background pb-24"
    >
      {/* Severity banner */}
      <div className="px-4 pt-4">
        <DisruptionSeverityBanner disruption={disruption} />
      </div>

      {/* Success state — unified confirmation */}
      {rebookingApproved && (
        <div className="px-4 mt-4">
          <div
            role="status"
            className="bg-success-50 dark:bg-surface-success border border-success-400 dark:border-success-600 rounded-[var(--radius-lg)] p-4 text-center"
          >
            <p className="text-lg font-bold text-success-700 dark:text-success-300 mb-1">
              Recovery Package Confirmed
            </p>
            <p className="text-sm text-success-600 dark:text-success-400 mb-3">
              Your complete recovery plan has been booked.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-success-700 dark:text-success-300">
              <span className="flex items-center justify-center gap-1.5">
                <Plane className="w-3.5 h-3.5" aria-hidden="true" />
                New flight confirmed
              </span>
              {hotelVoucher && selectedHotel && (
                <span className="flex items-center justify-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Hotel accommodation booked
                </span>
              )}
              {transportOptions && transportOptions.length > 0 && selectedTransport && (
                <span className="flex items-center justify-center gap-1.5">
                  <Car className="w-3.5 h-3.5" aria-hidden="true" />
                  Ground transport arranged
                </span>
              )}
            </div>
            <p className="text-xs text-success-600 dark:text-success-400 mt-3">
              Check your Trip Dashboard for the latest details.
            </p>
          </div>
        </div>
      )}

      {/* Persona banner */}
      {personaBanner && !rebookingApproved && (
        <div className="px-4 mt-3">
          <p className="text-xs text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-surface-primary rounded-[var(--radius-md)] px-3 py-2 border border-primary-100 dark:border-primary-800">
            {personaBanner}
          </p>
        </div>
      )}

      {/* Main content sections */}
      <div className="px-4 mt-6 space-y-6">
        <RootCauseExplanation disruption={disruption} />

        <DisruptionTimeline disruption={disruption} />

        {/* Automatic rebooking (shown if available and not yet approved) */}
        {automaticRebooking && !rebookingApproved && !showAlternatives && (
          <AutomaticRebooking
            rebooking={automaticRebooking}
            onSelect={() => {
              setSelectedFlight(automaticRebooking.recommendedFlight.id);
              setFlightSelectionMode('auto');
            }}
            onDecline={handleDeclineAuto}
            isSelected={flightSelectionMode === 'auto' && selectedFlight !== null}
          />
        )}

        {/* Family rebooking confirmation (for family persona) */}
        {familyInfo && persona === 'family' && !familyConfirmed && !rebookingApproved && (
          <FamilyRebookingConfirm
            familyInfo={familyInfo}
            onConfirm={handleFamilyConfirm}
          />
        )}

        {/* Alternative flights (shown on decline or if no auto-rebooking) */}
        {(showAlternatives || !automaticRebooking) && alternatives.length > 0 && !rebookingApproved && (
          <RebookingOptions
            alternatives={alternatives}
            onSelect={handleSelectAlternative}
            selectedId={selectedAlternative}
          />
        )}

        {/* Hotel voucher (for overnight disruptions) */}
        {hotelVoucher && (
          <HotelVoucher
            voucherValue={hotelVoucher.value}
            checkIn={hotelVoucher.checkIn}
            checkOut={hotelVoucher.checkOut}
            options={hotelVoucher.options}
            onSelect={(id) => setSelectedHotel(id)}
          />
        )}

        {/* Ground transport */}
        {transportOptions && transportOptions.length > 0 && (
          <TransportVoucher
            options={transportOptions}
            onSelect={(id) => setSelectedTransport(id)}
            selectedId={selectedTransport}
          />
        )}

        {/* Unified Confirmation CTA — only shows when all available selections are made */}
        {allSelectionsComplete && !rebookingApproved && (
          <div className="sticky bottom-20 z-10">
            <div className="bg-surface dark:bg-card rounded-[var(--radius-lg)] p-4 border-2 border-primary-500 dark:border-primary-400 shadow-lg">
              <div className="text-center mb-3">
                <p className="text-sm font-bold text-primary-900 dark:text-foreground">
                  Recovery Package Ready
                </p>
                <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                  {hotelVoucher && transportOptions?.length
                    ? 'Flight, hotel, and transport selected'
                    : hotelVoucher
                      ? 'Flight and hotel selected'
                      : transportOptions?.length
                        ? 'Flight and transport selected'
                        : 'Flight selected'
                  }
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-3 text-xs text-primary-600 dark:text-primary-400">
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" aria-hidden="true" />
                  Flight
                </span>
                {hotelVoucher && selectedHotel && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Hotel
                  </span>
                )}
                {transportOptions && transportOptions.length > 0 && selectedTransport && (
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" aria-hidden="true" />
                    Transport
                  </span>
                )}
              </div>

              <button
                onClick={handleConfirmAll}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-success-600 hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600 text-white font-bold text-base transition-colors duration-[--duration-micro] min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  'Confirm Recovery Package'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loyalty compensation */}
        {loyaltyCompensation && (
          <LoyaltyCompensation compensation={loyaltyCompensation} />
        )}

        {/* Airline contact */}
        <AirlineContact contactMethods={contactMethods} />
      </div>
    </main>
  );
}
