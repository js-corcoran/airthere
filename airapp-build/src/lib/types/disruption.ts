import { Flight, CabinClass } from './';

export type DisruptionType = 'delay' | 'cancellation' | 'diversion' | 'oversold';
export type DisruptionSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RootCauseType = 'weather' | 'mechanical' | 'crew' | 'air_traffic' | 'security' | 'oversold' | 'unknown';
export type ConnectionRisk = 'low' | 'medium' | 'high';

export interface Disruption {
  id: string;
  flightId: string;
  type: DisruptionType;
  severity: DisruptionSeverity;
  detectedAt: string;
  rootCause: {
    type: RootCauseType;
    description: string;
    expectedResolution?: string;
  };
  impact: {
    originalDeparture: string;
    estimatedDeparture?: string;
    delayMinutes: number;
    isCancelled: boolean;
    alternateAirport?: string;
  };
  affectedFlight: {
    flightNumber: string;
    airline: string;
    route: string;
    cabinClass: CabinClass;
  };
}

export interface AutomaticRebookingOption {
  recommendedFlight: RebookingFlight;
  isPreApproved: boolean;
  familyIntegrityMaintained: boolean;
  noAdditionalCost: boolean;
  trustLevel: 'low' | 'medium' | 'high';
  comparison: RebookingComparison;
}

export interface RebookingFlight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: number;
  stops: number;
  cabinClass: CabinClass;
  seatsAvailable: number;
  additionalCost: number;
  connectionRisk: ConnectionRisk;
}

export interface RebookingComparison {
  timeDifference: string;
  cabinClassMaintained: boolean;
  seatUpgradePossible: boolean;
  priceDifference: number;
}

export interface FamilyRebookingInfo {
  members: Array<{
    name: string;
    age: number;
    id: string;
  }>;
  originalSeating: Array<{ memberName: string; seat: string }>;
  newSeating: Array<{ memberName: string; seat: string }>;
  seatingIntegrityMaintained: boolean;
}

export interface HotelVoucherOption {
  id: string;
  name: string;
  rating: number;
  distanceFromAirport: string;
  pricePerNight: number;
  voucherCovers: boolean;
  coverageAmount: number;
  amenities: string[];
  imageUrl?: string;
}

export interface TransportOption {
  id: string;
  type: 'shuttle' | 'rental' | 'rideshare' | 'taxi';
  name: string;
  description: string;
  cost: number;
  covered: boolean;
  coverageAmount: number;
}

export interface ContactMethod {
  type: 'chat' | 'call' | 'email' | 'desk';
  label: string;
  waitTime: string;
  available: boolean;
}

export interface LoyaltyCompensation {
  milesAwarded: number;
  statusProtected: boolean;
  voucherValue: number;
  voucherCurrency: string;
}

export interface DisruptionScenario {
  disruption: Disruption;
  automaticRebooking?: AutomaticRebookingOption;
  alternatives: RebookingFlight[];
  familyInfo?: FamilyRebookingInfo;
  hotelVoucher?: {
    value: number;
    checkIn: string;
    checkOut: string;
    options: HotelVoucherOption[];
  };
  transportOptions?: TransportOption[];
  contactMethods: ContactMethod[];
  loyaltyCompensation?: LoyaltyCompensation;
}
