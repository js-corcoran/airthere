'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePersona } from '@/stores/usePersonaStore';
import { getDefaultScenarioForPersona } from '@/lib/mock-data/disruptions';
import type { DisruptionScenario, RebookingFlight } from '@/lib/types/disruption';

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

  const handleApproveRebooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRebookingApproved(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDeclineRebooking = () => {
    setShowAlternatives(true);
  };

  const handleSelectAlternative = (flight: RebookingFlight) => {
    setSelectedAlternative(flight.id);
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
      className="min-h-screen bg-background dark:bg-[oklch(12%_0.002_50)] pb-24"
    >
      {/* Severity banner */}
      <div className="px-4 pt-4">
        <DisruptionSeverityBanner disruption={disruption} />
      </div>

      {/* Success state */}
      {rebookingApproved && (
        <div className="px-4 mt-4">
          <div
            role="status"
            className="bg-success-50 dark:bg-[oklch(18%_0.03_142)] border border-success-400 dark:border-success-600 rounded-[var(--radius-lg)] p-4 text-center"
          >
            <p className="text-lg font-bold text-success-700 dark:text-success-300 mb-1">
              Rebooking Confirmed
            </p>
            <p className="text-sm text-success-600 dark:text-success-400">
              Your itinerary has been updated. Check your Trip Dashboard for the latest details.
            </p>
          </div>
        </div>
      )}

      {/* Persona banner */}
      {personaBanner && !rebookingApproved && (
        <div className="px-4 mt-3">
          <p className="text-xs text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-[oklch(18%_0.01_262)] rounded-[var(--radius-md)] px-3 py-2 border border-primary-100 dark:border-primary-800">
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
            onApprove={handleApproveRebooking}
            onDecline={handleDeclineRebooking}
            isProcessing={isProcessing}
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
