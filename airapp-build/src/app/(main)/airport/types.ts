import { FlightStatus } from '@/lib/types/flight';
import { PersonaType } from '@/lib/types/user';

export type AirportTab = 'flight' | 'wayfinding' | 'lounges' | 'biometric';

export interface AirportFlightInfo {
  flightNumber: string;
  airline: string;
  route: { from: string; to: string; fromCity: string; toCity: string };
  departureTime: string;
  arrivalTime: string;
  status: FlightStatus;
  gate: GateInfo;
  terminal: string;
  aircraft: string;
  boardingGroup?: string;
  seatNumber?: string;
}

export interface GateInfo {
  number: string;
  terminal: string;
  boardingStartTime: string;
  boardingGroups: string[];
  currentBoardingGroup: string | null;
  boardingProgress: number;
  previousGate?: string;
  walkingTimeMinutes: number;
}

export interface AirportAlert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
}

export interface SecurityCheckpoint {
  id: string;
  name: string;
  terminal: string;
  waitTimeMinutes: number;
  status: 'low' | 'moderate' | 'high';
  hasTSAPrecheck: boolean;
  hasClear: boolean;
}

export interface AirportLounge {
  id: string;
  name: string;
  terminal: string;
  nearGate: string;
  distanceMeters: number;
  walkingTimeMinutes: number;
  hours: { open: string; close: string };
  amenities: string[];
  queueTimeMinutes: number;
  capacity: { current: number; max: number };
  accessLevel: 'membership' | 'paid' | 'elite' | 'free';
  accessReason?: string;
  hasAccess: boolean;
}

export interface WayfindingDestination {
  id: string;
  type: 'gate' | 'lounge' | 'restroom' | 'food' | 'shop' | 'security';
  name: string;
  terminal: string;
  distanceMeters: number;
  walkingTimeMinutes: number;
  coordinates: { x: number; y: number };
}

export interface NearbyFlight {
  flightNumber: string;
  airline: string;
  destination: string;
  gate: string;
  departureTime: string;
  status: FlightStatus;
}

export interface BiometricStatus {
  enrolled: boolean;
  checkInComplete: boolean;
  boardingPassReady: boolean;
  lastVerified?: string;
}

export interface AirportWeather {
  temperature: number;
  unit: 'F' | 'C';
  condition: string;
  icon: string;
}
