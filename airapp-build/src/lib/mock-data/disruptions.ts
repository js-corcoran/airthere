import {
  DisruptionScenario,
  RebookingFlight,
  HotelVoucherOption,
  TransportOption,
  ContactMethod,
} from '@/lib/types/disruption';
import { PersonaType } from '@/lib/types/user';

const CONTACT_METHODS: ContactMethod[] = [
  { type: 'chat', label: 'Live Chat', waitTime: '~2 min', available: true },
  { type: 'call', label: 'Phone Support', waitTime: '~15 min', available: true },
  { type: 'email', label: 'Email', waitTime: '~2 hours', available: true },
  { type: 'desk', label: 'Airport Help Desk', waitTime: 'Gate C12', available: true },
];

const PREMIUM_CONTACT_METHODS: ContactMethod[] = [
  { type: 'chat', label: 'Priority Concierge Chat', waitTime: 'Instant', available: true },
  { type: 'call', label: 'Direct Concierge Line', waitTime: 'No wait', available: true },
  { type: 'email', label: 'Priority Email', waitTime: '~30 min', available: true },
  { type: 'desk', label: 'First Class Help Desk', waitTime: 'Gate A1', available: true },
];

const HOTEL_OPTIONS: HotelVoucherOption[] = [
  {
    id: 'hotel-001',
    name: 'Marriott SFO Airport',
    rating: 4,
    distanceFromAirport: '0.5 mi',
    pricePerNight: 220,
    voucherCovers: true,
    coverageAmount: 250,
    amenities: ['WiFi', 'Breakfast', 'Airport Shuttle', 'Fitness Center'],
  },
  {
    id: 'hotel-002',
    name: 'Hyatt Regency SFO',
    rating: 4,
    distanceFromAirport: '1.2 mi',
    pricePerNight: 195,
    voucherCovers: true,
    coverageAmount: 250,
    amenities: ['WiFi', 'Restaurant', 'Pool', 'Business Center'],
  },
  {
    id: 'hotel-003',
    name: 'The Ritz-Carlton Half Moon Bay',
    rating: 5,
    distanceFromAirport: '18 mi',
    pricePerNight: 650,
    voucherCovers: false,
    coverageAmount: 250,
    amenities: ['WiFi', 'Spa', 'Ocean View', 'Fine Dining', 'Golf'],
  },
];

const TRANSPORT_OPTIONS: TransportOption[] = [
  { id: 'trans-001', type: 'shuttle', name: 'Airport Shuttle', description: 'Complimentary hotel shuttle service', cost: 0, covered: true, coverageAmount: 0 },
  { id: 'trans-002', type: 'rideshare', name: 'Rideshare Credit', description: 'Uber/Lyft credit to hotel', cost: 35, covered: true, coverageAmount: 75 },
  { id: 'trans-003', type: 'rental', name: 'Rental Car', description: 'Enterprise compact (24-hour)', cost: 45, covered: true, coverageAmount: 50 },
  { id: 'trans-004', type: 'taxi', name: 'Taxi / Car Service', description: 'Licensed taxi to hotel', cost: 55, covered: true, coverageAmount: 100 },
];

const REBOOKING_ALTERNATIVES: RebookingFlight[] = [
  {
    id: 'rb-alt-001',
    flightNumber: 'UA 903',
    airline: 'United Airlines',
    departure: { airport: 'SFO', city: 'San Francisco', time: '2:15 PM', date: '2026-04-16', terminal: '3', gate: 'E7' },
    arrival: { airport: 'LHR', city: 'London', time: '8:45 AM', date: '2026-04-17' },
    duration: 630,
    stops: 0,
    cabinClass: 'business',
    seatsAvailable: 6,
    additionalCost: 0,
    connectionRisk: 'low',
  },
  {
    id: 'rb-alt-002',
    flightNumber: 'BA 286',
    airline: 'British Airways',
    departure: { airport: 'SFO', city: 'San Francisco', time: '6:30 PM', date: '2026-04-16', terminal: 'I', gate: 'A3' },
    arrival: { airport: 'LHR', city: 'London', time: '1:05 PM', date: '2026-04-17' },
    duration: 635,
    stops: 0,
    cabinClass: 'business',
    seatsAvailable: 3,
    additionalCost: 0,
    connectionRisk: 'low',
  },
  {
    id: 'rb-alt-003',
    flightNumber: 'AA 136',
    airline: 'American Airlines',
    departure: { airport: 'SFO', city: 'San Francisco', time: '9:00 AM', date: '2026-04-17', terminal: '2', gate: 'D12' },
    arrival: { airport: 'LHR', city: 'London', time: '5:30 AM', date: '2026-04-18' },
    duration: 630,
    stops: 1,
    cabinClass: 'business',
    seatsAvailable: 8,
    additionalCost: -150,
    connectionRisk: 'low',
  },
  {
    id: 'rb-alt-004',
    flightNumber: 'DL 4780',
    airline: 'Delta Air Lines',
    departure: { airport: 'SFO', city: 'San Francisco', time: '11:20 AM', date: '2026-04-17', terminal: '1', gate: 'B8' },
    arrival: { airport: 'LHR', city: 'London', time: '6:50 AM', date: '2026-04-18' },
    duration: 690,
    stops: 1,
    cabinClass: 'business',
    seatsAvailable: 5,
    additionalCost: 0,
    connectionRisk: 'medium',
  },
];

// ─── Scenario: Cancellation (Critical) ─────────────────────────────
export const cancellationScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-001',
    flightId: 'UA901',
    type: 'cancellation',
    severity: 'critical',
    detectedAt: '2026-04-15T09:12:00Z',
    rootCause: {
      type: 'weather',
      description: 'Severe thunderstorm activity across San Francisco Bay Area. Lightning detected within 5 miles of runway complex. All departures suspended until storm system passes.',
      expectedResolution: '2026-04-15T18:00:00Z',
    },
    impact: {
      originalDeparture: '2026-04-15T11:00:00Z',
      delayMinutes: 0,
      isCancelled: true,
    },
    affectedFlight: {
      flightNumber: 'UA 901',
      airline: 'United Airlines',
      route: 'SFO → LHR',
      cabinClass: 'business',
    },
  },
  automaticRebooking: {
    recommendedFlight: {
      id: 'rb-auto-001',
      flightNumber: 'UA 902',
      airline: 'United Airlines',
      departure: { airport: 'SFO', city: 'San Francisco', time: '11:45 AM', date: '2026-04-16', terminal: '3', gate: 'E4' },
      arrival: { airport: 'LHR', city: 'London', time: '7:15 AM', date: '2026-04-17' },
      duration: 630,
      stops: 0,
      cabinClass: 'business',
      seatsAvailable: 12,
      additionalCost: 0,
      connectionRisk: 'low',
    },
    isPreApproved: true,
    familyIntegrityMaintained: true,
    noAdditionalCost: true,
    trustLevel: 'high',
    comparison: {
      timeDifference: 'Departs same time tomorrow',
      cabinClassMaintained: true,
      seatUpgradePossible: false,
      priceDifference: 0,
    },
  },
  alternatives: REBOOKING_ALTERNATIVES,
  familyInfo: {
    members: [
      { name: 'John Chen', age: 42, id: 'fm-001' },
      { name: 'Amy Chen', age: 40, id: 'fm-002' },
      { name: 'Zoe Chen', age: 12, id: 'fm-003' },
      { name: 'Max Chen', age: 8, id: 'fm-004' },
    ],
    originalSeating: [
      { memberName: 'John Chen', seat: '12A' },
      { memberName: 'Amy Chen', seat: '12B' },
      { memberName: 'Zoe Chen', seat: '12C' },
      { memberName: 'Max Chen', seat: '12D' },
    ],
    newSeating: [
      { memberName: 'John Chen', seat: 'F4' },
      { memberName: 'Amy Chen', seat: 'F5' },
      { memberName: 'Zoe Chen', seat: 'F6' },
      { memberName: 'Max Chen', seat: 'F7' },
    ],
    seatingIntegrityMaintained: true,
  },
  hotelVoucher: {
    value: 250,
    checkIn: '2026-04-15T14:00:00Z',
    checkOut: '2026-04-16T11:00:00Z',
    options: HOTEL_OPTIONS,
  },
  transportOptions: TRANSPORT_OPTIONS,
  contactMethods: CONTACT_METHODS,
  loyaltyCompensation: {
    milesAwarded: 5000,
    statusProtected: true,
    voucherValue: 200,
    voucherCurrency: 'USD',
  },
};

// ─── Scenario: Major Delay (High) ──────────────────────────────────
export const majorDelayScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-002',
    flightId: 'AA100',
    type: 'delay',
    severity: 'high',
    detectedAt: '2026-04-20T06:30:00Z',
    rootCause: {
      type: 'mechanical',
      description: 'Aircraft undergoing unscheduled maintenance inspection. Engine sensor replacement required. Estimated repair completion by 2:00 PM.',
      expectedResolution: '2026-04-20T14:00:00Z',
    },
    impact: {
      originalDeparture: '2026-04-20T08:00:00Z',
      estimatedDeparture: '2026-04-20T14:30:00Z',
      delayMinutes: 390,
      isCancelled: false,
    },
    affectedFlight: {
      flightNumber: 'AA 100',
      airline: 'American Airlines',
      route: 'JFK → LHR',
      cabinClass: 'business',
    },
  },
  automaticRebooking: {
    recommendedFlight: {
      id: 'rb-auto-002',
      flightNumber: 'BA 178',
      airline: 'British Airways',
      departure: { airport: 'JFK', city: 'New York', time: '10:00 AM', date: '2026-04-20', terminal: '7', gate: 'B22' },
      arrival: { airport: 'LHR', city: 'London', time: '10:15 PM', date: '2026-04-20' },
      duration: 435,
      stops: 0,
      cabinClass: 'business',
      seatsAvailable: 4,
      additionalCost: 0,
      connectionRisk: 'low',
    },
    isPreApproved: false,
    familyIntegrityMaintained: true,
    noAdditionalCost: true,
    trustLevel: 'medium',
    comparison: {
      timeDifference: 'Arrives 4.5 hours earlier than delayed flight',
      cabinClassMaintained: true,
      seatUpgradePossible: true,
      priceDifference: 0,
    },
  },
  alternatives: [
    {
      id: 'rb-alt-005',
      flightNumber: 'DL 1',
      airline: 'Delta Air Lines',
      departure: { airport: 'JFK', city: 'New York', time: '12:30 PM', date: '2026-04-20', terminal: '4', gate: 'A15' },
      arrival: { airport: 'LHR', city: 'London', time: '12:40 AM', date: '2026-04-21' },
      duration: 430,
      stops: 0,
      cabinClass: 'business',
      seatsAvailable: 7,
      additionalCost: 0,
      connectionRisk: 'low',
    },
    {
      id: 'rb-alt-006',
      flightNumber: 'VS 4',
      airline: 'Virgin Atlantic',
      departure: { airport: 'JFK', city: 'New York', time: '6:00 PM', date: '2026-04-20', terminal: '4', gate: 'C8' },
      arrival: { airport: 'LHR', city: 'London', time: '6:30 AM', date: '2026-04-21' },
      duration: 450,
      stops: 0,
      cabinClass: 'business',
      seatsAvailable: 2,
      additionalCost: 0,
      connectionRisk: 'low',
    },
  ],
  contactMethods: CONTACT_METHODS,
  loyaltyCompensation: {
    milesAwarded: 3000,
    statusProtected: true,
    voucherValue: 100,
    voucherCurrency: 'USD',
  },
};

// ─── Scenario: Minor Delay (Low) ───────────────────────────────────
export const minorDelayScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-003',
    flightId: 'SQ321',
    type: 'delay',
    severity: 'low',
    detectedAt: '2026-05-10T13:00:00Z',
    rootCause: {
      type: 'air_traffic',
      description: 'Temporary air traffic congestion in approach corridor. Expected to clear shortly.',
      expectedResolution: '2026-05-10T14:15:00Z',
    },
    impact: {
      originalDeparture: '2026-05-10T14:00:00Z',
      estimatedDeparture: '2026-05-10T14:35:00Z',
      delayMinutes: 35,
      isCancelled: false,
    },
    affectedFlight: {
      flightNumber: 'SQ 321',
      airline: 'Singapore Airlines',
      route: 'SIN → SFO',
      cabinClass: 'first',
    },
  },
  alternatives: [],
  contactMethods: PREMIUM_CONTACT_METHODS,
};

// ─── Scenario: Diversion (High) ────────────────────────────────────
export const diversionScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-004',
    flightId: 'UA456',
    type: 'diversion',
    severity: 'high',
    detectedAt: '2026-04-25T16:00:00Z',
    rootCause: {
      type: 'weather',
      description: 'Destination airport (DEN) closed due to severe hailstorm. Aircraft diverted to Colorado Springs (COS). Monitoring conditions for when DEN reopens.',
      expectedResolution: '2026-04-25T20:00:00Z',
    },
    impact: {
      originalDeparture: '2026-04-25T12:00:00Z',
      delayMinutes: 0,
      isCancelled: false,
      alternateAirport: 'COS',
    },
    affectedFlight: {
      flightNumber: 'UA456',
      airline: 'United Airlines',
      route: 'SFO → DEN',
      cabinClass: 'economy',
    },
  },
  alternatives: [],
  transportOptions: [
    { id: 'trans-div-001', type: 'shuttle', name: 'Bus to Denver', description: 'Complimentary coach bus to Denver (est. 75 min)', cost: 0, covered: true, coverageAmount: 0 },
    { id: 'trans-div-002', type: 'rental', name: 'Rental Car to Denver', description: 'One-way rental, 70 miles', cost: 65, covered: true, coverageAmount: 75 },
    { id: 'trans-div-003', type: 'rideshare', name: 'Rideshare to Denver', description: 'Uber/Lyft to Denver (est. 90 min)', cost: 85, covered: true, coverageAmount: 100 },
  ],
  contactMethods: CONTACT_METHODS,
};

// ─── Business persona: minor 25-min delay ──────────────────────────
export const businessMinorDelayScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-biz-001',
    flightId: 'UA456',
    type: 'delay',
    severity: 'low',
    detectedAt: '2026-04-03T06:50:00Z',
    rootCause: {
      type: 'mechanical',
      description: 'Late inbound aircraft',
      expectedResolution: '2026-04-03T07:35:00Z',
    },
    impact: {
      originalDeparture: '2026-04-03T07:15:00Z',
      estimatedDeparture: '2026-04-03T07:40:00Z',
      delayMinutes: 25,
      isCancelled: false,
    },
    affectedFlight: {
      flightNumber: 'UA456',
      airline: 'United Airlines',
      route: 'SFO → ORD',
      cabinClass: 'economy',
    },
  },
  alternatives: [],
  contactMethods: CONTACT_METHODS,
};

// ─── Family persona: no disruption — clean trip ─────────────────────
export const familyNoDisruptionScenario: DisruptionScenario = {
  disruption: {
    id: 'dis-fam-clean',
    flightId: 'HA0011',
    type: 'delay',
    severity: 'low',
    detectedAt: '2026-04-03T07:00:00Z',
    rootCause: {
      type: 'unknown',
      description: 'All your flights are running on time. No action needed.',
    },
    impact: {
      originalDeparture: '2026-04-03T08:30:00Z',
      estimatedDeparture: '2026-04-03T08:30:00Z',
      delayMinutes: 0,
      isCancelled: false,
    },
    affectedFlight: {
      flightNumber: 'HA0011',
      airline: 'Hawaiian Airlines',
      route: 'LAX → HNL',
      cabinClass: 'economy',
    },
  },
  alternatives: [],
  contactMethods: CONTACT_METHODS,
};

// ─── Persona-specific data getters ──────────────────────────────────
export function getDisruptionScenario(
  scenarioId: string,
  persona: PersonaType
): DisruptionScenario {
  const baseScenarios: Record<string, DisruptionScenario> = {
    cancellation: cancellationScenario,
    'major-delay': majorDelayScenario,
    'minor-delay': minorDelayScenario,
    diversion: diversionScenario,
    'business-delay': businessMinorDelayScenario,
    'family-clean': familyNoDisruptionScenario,
  };

  const scenario = baseScenarios[scenarioId] ?? cancellationScenario;

  // Persona adaptations
  if (persona === 'premium') {
    return {
      ...scenario,
      contactMethods: PREMIUM_CONTACT_METHODS,
      loyaltyCompensation: scenario.loyaltyCompensation
        ? {
            ...scenario.loyaltyCompensation,
            milesAwarded: scenario.loyaltyCompensation.milesAwarded * 2,
            voucherValue: scenario.loyaltyCompensation.voucherValue * 1.5,
          }
        : undefined,
    };
  }

  if (persona === 'family') {
    return {
      ...scenario,
      familyInfo: scenario.familyInfo ?? cancellationScenario.familyInfo,
    };
  }

  return scenario;
}

export function getDefaultScenarioForPersona(persona: PersonaType): DisruptionScenario {
  switch (persona) {
    case 'premium':
      return getDisruptionScenario('cancellation', 'premium');
    case 'business':
      return businessMinorDelayScenario;
    case 'family':
    default:
      return familyNoDisruptionScenario;
  }
}
