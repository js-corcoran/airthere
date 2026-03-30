'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/stores/usePersonaStore';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { AirportHeader } from './components/AirportHeader';
import { AirportTabs } from './components/AirportTabs';
import { FlightStatusCard } from './components/FlightStatusCard';
import { AlertsSection } from './components/AlertsSection';
import { SecuritySection } from './components/SecuritySection';
import { NearbyFlightsSection } from './components/NearbyFlightsSection';
import { LoungeSection } from './components/LoungeSection';
import { WayfindingSection } from './components/WayfindingSection';
import { BiometricSection } from './components/BiometricSection';
import Link from 'next/link';
import { DoorOpen, Armchair } from 'lucide-react';
import {
  getAirportFlightInfo,
  getAirportAlerts,
  getSecurityCheckpoints,
  getAirportLounges,
  getNearbyFlights,
  getWayfindingDestinations,
  getBiometricStatus,
  getAirportWeather,
} from './data/airport-data';
import { AirportTab, AirportFlightInfo, AirportAlert, SecurityCheckpoint, AirportLounge, NearbyFlight, WayfindingDestination, BiometricStatus, AirportWeather } from './types';

type LoadingState = 'loading' | 'success' | 'error';

export default function AirportLivePage() {
  const { persona } = usePersona();
  const [state, setState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<AirportTab>('flight');
  const [flightInfo, setFlightInfo] = useState<AirportFlightInfo | null>(null);
  const [alerts, setAlerts] = useState<AirportAlert[]>([]);
  const [checkpoints, setCheckpoints] = useState<SecurityCheckpoint[]>([]);
  const [lounges, setLounges] = useState<AirportLounge[]>([]);
  const [nearbyFlights, setNearbyFlights] = useState<NearbyFlight[]>([]);
  const [wayfindingDests, setWayfindingDests] = useState<WayfindingDestination[]>([]);
  const [biometricStatus, setBiometricStatus] = useState<BiometricStatus | null>(null);
  const [weather, setWeather] = useState<AirportWeather | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setFlightInfo(getAirportFlightInfo(persona));
        setAlerts(getAirportAlerts(persona));
        setCheckpoints(getSecurityCheckpoints(persona));
        setLounges(getAirportLounges(persona));
        setNearbyFlights(getNearbyFlights());
        setWayfindingDests(getWayfindingDestinations());
        setBiometricStatus(getBiometricStatus(persona));
        setWeather(getAirportWeather(persona));
        setCurrentTime(
          new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        );
        setState('success');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [persona]);

  // Update clock every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (state === 'loading') return <PageSkeleton />;

  if (state === 'error' || !flightInfo || !weather || !biometricStatus) {
    return (
      <ErrorState
        message="We couldn't load airport information. Please try again."
        onRetry={() => {
          setState('loading');
          setTimeout(() => setState('success'), 600);
        }}
      />
    );
  }

  const airportCode = flightInfo.route.from;
  const airportNames: Record<string, string> = {
    SFO: 'San Francisco International Airport',
    JFK: 'John F. Kennedy International Airport',
    LHR: 'London Heathrow Airport',
    LAX: 'Los Angeles International Airport',
  };

  return (
    <div className="pb-4">
      {/* Airport header with weather */}
      <AirportHeader
        airportCode={airportCode}
        airportName={airportNames[airportCode] ?? `${airportCode} Airport`}
        weather={weather}
        currentTime={currentTime}
      />

      {/* Quick Navigation — Gate & Boarding + Lounge Finder */}
      <div className="px-4 py-3 flex gap-3">
        <Link
          href="/airport/gate"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-lg)] bg-primary-600 hover:bg-primary-700 dark:bg-[oklch(55%_0.194_262)] dark:hover:bg-[oklch(60%_0.194_262)] text-white text-sm font-medium transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Gate and Boarding information"
        >
          <DoorOpen className="w-4 h-4" aria-hidden="true" />
          Gate & Boarding
        </Link>
        <Link
          href="/lounge"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-lg)] border border-primary-300 dark:border-[oklch(40%_0.06_262)] text-primary-700 dark:text-[oklch(80%_0.06_262)] hover:bg-primary-50 dark:hover:bg-[oklch(22%_0.015_262)] text-sm font-medium transition-colors min-h-[var(--touch-preferred)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Lounge Finder"
        >
          <Armchair className="w-4 h-4" aria-hidden="true" />
          Lounge Finder
        </Link>
      </div>

      {/* Tabs */}
      <AirportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      <div className="mt-1">
        {/* ─── Flight Status Tab ─── */}
        {activeTab === 'flight' && (
          <div
            id="flight-panel"
            role="tabpanel"
            aria-labelledby="flight-tab"
            className="px-4 pt-3 space-y-4"
          >
            <FlightStatusCard flight={flightInfo} />
            <AlertsSection alerts={alerts} />
            <SecuritySection checkpoints={checkpoints} />
            <NearbyFlightsSection flights={nearbyFlights} />
          </div>
        )}

        {/* ─── Wayfinding Tab ─── */}
        {activeTab === 'wayfinding' && (
          <div
            id="wayfinding-panel"
            role="tabpanel"
            aria-labelledby="wayfinding-tab"
            className="px-4 pt-3"
          >
            <WayfindingSection
              destinations={wayfindingDests}
              gateNumber={flightInfo.gate.number}
            />
          </div>
        )}

        {/* ─── Lounges Tab ─── */}
        {activeTab === 'lounges' && (
          <div
            id="lounges-panel"
            role="tabpanel"
            aria-labelledby="lounges-tab"
            className="px-4 pt-3"
          >
            <LoungeSection lounges={lounges} persona={persona} />
          </div>
        )}

        {/* ─── Biometric Tab ─── */}
        {activeTab === 'biometric' && (
          <div
            id="biometric-panel"
            role="tabpanel"
            aria-labelledby="biometric-tab"
            className="px-4 pt-3"
          >
            <BiometricSection
              status={biometricStatus}
              flightNumber={flightInfo.flightNumber}
              persona={persona}
            />
          </div>
        )}
      </div>
    </div>
  );
}
