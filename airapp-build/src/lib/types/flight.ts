import { CabinClass } from './user';

export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface FlightLeg {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  airline: Airline;
  flightNumber: string;
  aircraft: string;
  cabinClass: CabinClass;
}

export interface Flight {
  id: string;
  airline: Airline;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    terminal?: string;
    gate?: string;
  };
  duration: number;
  stops: number;
  stopoverAirports?: string[];
  aircraft: string;
  amenities: FlightAmenity[];
  pricing: FlightPricing;
  seatsAvailable: number;
  operationalStatus: FlightStatus;
  legs?: FlightLeg[];
}

export interface FlightPricing {
  economy: number;
  premiumEconomy: number;
  business: number;
  first: number;
  currency: string;
}

export type FlightAmenity = 'wifi' | 'entertainment' | 'power' | 'meals' | 'flatbed' | 'lounge-access';

export type FlightStatus = 'on-time' | 'delayed' | 'cancelled' | 'boarding' | 'departed' | 'arrived' | 'diverted';

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: PassengerCount;
  cabinClass: CabinClass;
  tripType: 'round-trip' | 'one-way' | 'multi-city';
  flexibleDates?: boolean;
}

export interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface SeatInfo {
  id: string;
  row: number;
  column: string;
  type: 'window' | 'middle' | 'aisle';
  available: boolean;
  price: number;
  category: 'standard' | 'extra-legroom' | 'premium' | 'exit-row';
  familyFriendly?: boolean;
}

export interface FareBundle {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium';
  price: number;
  features: string[];
  includes: {
    baggage: string;
    seatSelection: boolean;
    changes: string;
    cancellation: string;
    meals: boolean;
    loungeAccess: boolean;
    priorityBoarding: boolean;
  };
}
