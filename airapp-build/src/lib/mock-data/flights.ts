import { Flight, FlightPricing } from '@/lib/types/flight';
import { AIRLINES } from '@/lib/constants/airlines';
import { AIRPORTS } from '@/lib/constants/airports';

function makeFlightId(airline: string, num: number): string {
  return `${airline}${String(num).padStart(4, '0')}`;
}

function makePricing(base: number): FlightPricing {
  return {
    economy: Math.round(base),
    premiumEconomy: Math.round(base * 1.6),
    business: Math.round(base * 3.8),
    first: Math.round(base * 6.5),
    currency: 'USD',
  };
}

const ROUTES: Array<{
  from: string;
  to: string;
  airlines: string[];
  baseFare: number;
  baseDuration: number;
}> = [
  { from: 'JFK', to: 'LHR', airlines: ['BA', 'AA', 'DL', 'UA'], baseFare: 680, baseDuration: 420 },
  { from: 'SFO', to: 'NRT', airlines: ['UA', 'JL', 'NH', 'SQ'], baseFare: 890, baseDuration: 660 },
  { from: 'LAX', to: 'SIN', airlines: ['SQ', 'UA', 'CX', 'DL'], baseFare: 920, baseDuration: 1080 },
  { from: 'JFK', to: 'CDG', airlines: ['AF', 'DL', 'AA', 'UA'], baseFare: 620, baseDuration: 450 },
  { from: 'SFO', to: 'LHR', airlines: ['BA', 'UA', 'DL'], baseFare: 780, baseDuration: 600 },
  { from: 'ORD', to: 'FRA', airlines: ['LH', 'UA', 'AA'], baseFare: 720, baseDuration: 510 },
  { from: 'LAX', to: 'DXB', airlines: ['EK', 'UA', 'DL'], baseFare: 1050, baseDuration: 960 },
  { from: 'MIA', to: 'LHR', airlines: ['BA', 'AA', 'DL'], baseFare: 740, baseDuration: 540 },
  { from: 'JFK', to: 'DXB', airlines: ['EK', 'DL', 'UA'], baseFare: 980, baseDuration: 780 },
  { from: 'LAX', to: 'HND', airlines: ['NH', 'JL', 'DL', 'AA'], baseFare: 860, baseDuration: 690 },
];

function generateFlightsForRoute(
  from: string,
  to: string,
  airlines: string[],
  baseFare: number,
  baseDuration: number,
  date: string
): Flight[] {
  const flights: Flight[] = [];
  const departureTimes = [
    '06:15', '07:45', '08:30', '09:50', '10:20',
    '11:45', '13:10', '14:30', '15:55', '17:20',
    '18:45', '20:15', '21:30', '22:50', '23:45',
  ];

  for (let i = 0; i < Math.min(departureTimes.length, airlines.length * 4); i++) {
    const airline = AIRLINES[airlines[i % airlines.length]];
    const depTime = departureTimes[i % departureTimes.length];
    const stops = i < 5 ? 0 : i < 10 ? 1 : 2;
    const durationVariation = stops * 120 + Math.floor((i * 37) % 90) - 30;
    const duration = baseDuration + durationVariation;
    const fareVariation = (((i * 73) % 200) - 80);
    const fare = baseFare + fareVariation + stops * -50;

    const depDate = new Date(`${date}T${depTime}:00`);
    const arrDate = new Date(depDate.getTime() + duration * 60 * 1000);

    const fromAirport = AIRPORTS[from];
    const toAirport = AIRPORTS[to];

    flights.push({
      id: `FL-${from}-${to}-${i}`,
      airline,
      flightNumber: makeFlightId(airline.code, 100 + i * 7),
      departure: {
        airport: from,
        city: fromAirport?.city ?? from,
        time: depDate.toISOString(),
        terminal: String(Math.floor(i % 4) + 1),
        gate: `${String.fromCharCode(65 + (i % 6))}${10 + i}`,
      },
      arrival: {
        airport: to,
        city: toAirport?.city ?? to,
        time: arrDate.toISOString(),
        terminal: String(Math.floor((i + 2) % 5) + 1),
      },
      duration,
      stops,
      stopoverAirports: stops === 1 ? ['ORD'] : stops === 2 ? ['ORD', 'DEN'] : [],
      aircraft: ['Boeing 777-300ER', 'Airbus A350-900', 'Boeing 787-9', 'Airbus A380'][i % 4],
      amenities: i % 3 === 0
        ? ['wifi', 'entertainment', 'meals', 'power', 'flatbed']
        : i % 3 === 1
          ? ['wifi', 'entertainment', 'meals', 'power']
          : ['wifi', 'entertainment', 'meals'],
      pricing: makePricing(Math.max(fare, 299)),
      seatsAvailable: 3 + Math.floor((i * 17) % 45),
      operationalStatus: 'on-time',
    });
  }

  return flights;
}

export function getMockFlights(from: string, to: string, date: string): Flight[] {
  const route = ROUTES.find((r) => r.from === from && r.to === to);
  if (route) {
    return generateFlightsForRoute(from, to, route.airlines, route.baseFare, route.baseDuration, date);
  }
  // Fallback: generate generic flights
  return generateFlightsForRoute(from, to, ['UA', 'DL', 'AA'], 750, 480, date);
}

export function getFlightById(flightId: string, from: string, to: string, date: string): Flight | undefined {
  const flights = getMockFlights(from, to, date);
  return flights.find((f) => f.id === flightId);
}

// Pre-built default set for home screen displays
export const FEATURED_FLIGHTS = getMockFlights('JFK', 'LHR', '2026-04-15');
