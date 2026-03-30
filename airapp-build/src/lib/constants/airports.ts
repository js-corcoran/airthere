import { Airport } from '@/lib/types/flight';

export const AIRPORTS: Record<string, Airport> = {
  JFK: { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', timezone: 'America/New_York' },
  LAX: { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  SFO: { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles' },
  ORD: { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  MIA: { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA', timezone: 'America/New_York' },
  LHR: { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK', timezone: 'Europe/London' },
  CDG: { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  FRA: { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin' },
  SIN: { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  DXB: { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  HND: { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  NRT: { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  SYD: { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  HKG: { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong' },
  ICN: { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul' },
  ATL: { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'USA', timezone: 'America/New_York' },
  DEN: { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'USA', timezone: 'America/Denver' },
  SEA: { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles' },
  BOS: { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'USA', timezone: 'America/New_York' },
  AMS: { code: 'AMS', name: 'Schiphol', city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  HNL: { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu' },
};

export const AIRPORT_LIST = Object.values(AIRPORTS);

export const POPULAR_ROUTES = [
  { from: 'JFK', to: 'LHR', label: 'New York → London' },
  { from: 'SFO', to: 'NRT', label: 'San Francisco → Tokyo' },
  { from: 'LAX', to: 'SIN', label: 'Los Angeles → Singapore' },
  { from: 'JFK', to: 'CDG', label: 'New York → Paris' },
  { from: 'SFO', to: 'LHR', label: 'San Francisco → London' },
  { from: 'ORD', to: 'FRA', label: 'Chicago → Frankfurt' },
  { from: 'MIA', to: 'DXB', label: 'Miami → Dubai' },
  { from: 'LAX', to: 'HND', label: 'Los Angeles → Tokyo' },
];
