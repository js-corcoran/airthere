import { Trip } from '@/lib/types/trip';
import { AIRLINES } from '@/lib/constants/airlines';

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-001',
    name: 'London Business Trip',
    status: 'upcoming',
    departure: { airport: 'SFO', city: 'San Francisco', date: '2026-04-15' },
    arrival: { airport: 'LHR', city: 'London', date: '2026-04-16' },
    flights: [
      {
        id: 'tf-001',
        flight: {
          id: 'FL-SFO-LHR-0',
          airline: AIRLINES.BA,
          flightNumber: 'BA0286',
          departure: { airport: 'SFO', city: 'San Francisco', time: '2026-04-15T17:20:00Z', terminal: 'I', gate: 'G96' },
          arrival: { airport: 'LHR', city: 'London', time: '2026-04-16T11:30:00Z', terminal: '5' },
          duration: 610,
          stops: 0,
          aircraft: 'Boeing 777-300ER',
          amenities: ['wifi', 'entertainment', 'meals', 'flatbed', 'lounge-access'],
          pricing: { economy: 892, premiumEconomy: 1428, business: 5240, first: 8920, currency: 'USD' },
          seatsAvailable: 8,
          operationalStatus: 'on-time',
        },
        status: 'on-time',
        seat: '14A',
        checkedIn: false,
      },
    ],
    passengers: [{ id: 'p1', name: 'Alexandra Sterling', type: 'adult', seat: '14A', meal: 'Vegetarian' }],
    hotel: { name: 'The Savoy', city: 'London', checkIn: '2026-04-16', checkOut: '2026-04-20', confirmationNumber: 'SAV-392847' },
    totalCost: 7640,
    currency: 'USD',
    confirmationNumber: 'AT-BA-7X3K9R',
    createdAt: '2026-03-20',
  },
  {
    id: 'trip-002',
    name: 'Tokyo Family Vacation',
    status: 'upcoming',
    departure: { airport: 'LAX', city: 'Los Angeles', date: '2026-05-20' },
    arrival: { airport: 'HND', city: 'Tokyo', date: '2026-05-21' },
    flights: [
      {
        id: 'tf-002',
        flight: {
          id: 'FL-LAX-HND-3',
          airline: AIRLINES.NH,
          flightNumber: 'NH0105',
          departure: { airport: 'LAX', city: 'Los Angeles', time: '2026-05-20T11:30:00Z', terminal: 'B', gate: 'B42' },
          arrival: { airport: 'HND', city: 'Tokyo', time: '2026-05-21T15:20:00Z', terminal: '3' },
          duration: 710,
          stops: 0,
          aircraft: 'Boeing 787-9',
          amenities: ['wifi', 'entertainment', 'meals', 'power'],
          pricing: { economy: 1240, premiumEconomy: 1984, business: 6120, first: 9800, currency: 'USD' },
          seatsAvailable: 22,
          operationalStatus: 'on-time',
        },
        status: 'on-time',
        checkedIn: false,
      },
    ],
    passengers: [
      { id: 'p2', name: 'Sarah Chen', type: 'adult' },
      { id: 'p3', name: 'David Chen', type: 'adult' },
      { id: 'p4', name: 'Emily Chen', type: 'child' },
      { id: 'p5', name: 'Lucas Chen', type: 'child' },
    ],
    totalCost: 5960,
    currency: 'USD',
    confirmationNumber: 'AT-NH-2M8F4P',
    createdAt: '2026-03-10',
  },
  {
    id: 'trip-003',
    name: 'New York Tech Summit',
    status: 'upcoming',
    departure: { airport: 'SFO', city: 'San Francisco', date: '2026-04-08' },
    arrival: { airport: 'JFK', city: 'New York', date: '2026-04-08' },
    flights: [
      {
        id: 'tf-003',
        flight: {
          id: 'FL-SFO-JFK-1',
          airline: AIRLINES.UA,
          flightNumber: 'UA0524',
          departure: { airport: 'SFO', city: 'San Francisco', time: '2026-04-08T07:00:00Z', terminal: '3', gate: 'F12' },
          arrival: { airport: 'JFK', city: 'New York', time: '2026-04-08T15:42:00Z', terminal: '7' },
          duration: 342,
          stops: 0,
          aircraft: 'Airbus A350-900',
          amenities: ['wifi', 'entertainment', 'meals', 'power'],
          pricing: { economy: 389, premiumEconomy: 622, business: 2180, first: 4200, currency: 'USD' },
          seatsAvailable: 34,
          operationalStatus: 'on-time',
        },
        status: 'on-time',
        seat: '3C',
        checkedIn: false,
      },
    ],
    passengers: [{ id: 'p6', name: 'Marcus Johnson', type: 'adult', seat: '3C', meal: 'Standard' }],
    totalCost: 2180,
    currency: 'USD',
    confirmationNumber: 'AT-UA-9K2D7L',
    createdAt: '2026-03-25',
  },
];

export function getTripsForPersona(persona: 'premium' | 'business' | 'family'): Trip[] {
  switch (persona) {
    case 'premium':
      return [MOCK_TRIPS[0]];
    case 'business':
      return [MOCK_TRIPS[2]];
    case 'family':
      return [MOCK_TRIPS[1]];
  }
}
