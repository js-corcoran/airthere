import type { ProfileData, FrequentFlyerProgram, TravelStats } from '@/lib/types/profile';
import type { PersonaType } from '@/lib/types/user';

// ─── Frequent Flyer Programs ───────────────────────────────────────
const PROGRAMS_PREMIUM: FrequentFlyerProgram[] = [
  { id: 'ffp-001', airline: 'Singapore Airlines', airlineCode: 'SQ', programName: 'KrisFlyer', accountNumber: 'KF-9928-7741', balance: 47500, unit: 'miles', eliteStatus: 'PPS Club', lastActivity: '2026-03-15' },
  { id: 'ffp-002', airline: 'Emirates', airlineCode: 'EK', programName: 'Skywards', accountNumber: 'EK-1187-5523', balance: 182000, unit: 'miles', eliteStatus: 'Platinum', lastActivity: '2026-03-01' },
  { id: 'ffp-003', airline: 'Cathay Pacific', airlineCode: 'CX', programName: 'Asia Miles', accountNumber: 'AM-4412-8890', balance: 96500, unit: 'miles', eliteStatus: 'Diamond', lastActivity: '2026-02-20' },
  { id: 'ffp-004', airline: 'British Airways', airlineCode: 'BA', programName: 'Executive Club', accountNumber: 'BA-7734-2201', balance: 78200, unit: 'points', eliteStatus: 'Gold', lastActivity: '2026-02-10' },
  { id: 'ffp-005', airline: 'United Airlines', airlineCode: 'UA', programName: 'MileagePlus', accountNumber: 'UA-3389-1145', balance: 62000, unit: 'miles', eliteStatus: '1K', lastActivity: '2026-01-28' },
];

const PROGRAMS_BUSINESS: FrequentFlyerProgram[] = [
  { id: 'ffp-001', airline: 'United Airlines', airlineCode: 'UA', programName: 'MileagePlus', accountNumber: 'MP-W8823456', balance: 82300, unit: 'miles', eliteStatus: 'Platinum', lastActivity: '2026-03-25' },
  { id: 'ffp-002', airline: 'Alaska Airlines', airlineCode: 'AS', programName: 'Mileage Plan', accountNumber: 'AS-6614782', balance: 18400, unit: 'miles', eliteStatus: 'MVP', lastActivity: '2026-03-10' },
  { id: 'ffp-003', airline: 'Delta Air Lines', airlineCode: 'DL', programName: 'SkyMiles', accountNumber: 'SM-5567234', balance: 9200, unit: 'miles', lastActivity: '2026-01-15' },
];

const PROGRAMS_FAMILY: FrequentFlyerProgram[] = [
  { id: 'ffp-001', airline: 'Hawaiian Airlines', airlineCode: 'HA', programName: 'HawaiianMiles', accountNumber: 'HM-C4412089', balance: 12400, unit: 'miles', lastActivity: '2026-03-01' },
  { id: 'ffp-002', airline: 'Southwest Airlines', airlineCode: 'WN', programName: 'Rapid Rewards', accountNumber: 'RR-9981234', balance: 8200, unit: 'points', lastActivity: '2026-02-10' },
];

// ─── Travel Stats ──────────────────────────────────────────────────
const STATS_PREMIUM: TravelStats = {
  totalTrips: 42,
  totalFlights: 89,
  totalMiles: 284000,
  countriesVisited: 31,
  favoriteAirline: 'Singapore Airlines',
  favoriteRoute: 'JFK — SIN',
  yearToDate: { trips: 8, miles: 72000, spent: 184000 },
};

const STATS_BUSINESS: TravelStats = {
  totalTrips: 78,
  totalFlights: 156,
  totalMiles: 198000,
  countriesVisited: 18,
  favoriteAirline: 'United Airlines',
  favoriteRoute: 'SFO — ORD',
  yearToDate: { trips: 6, miles: 48000, spent: 32000 },
};

const STATS_FAMILY: TravelStats = {
  totalTrips: 12,
  totalFlights: 28,
  totalMiles: 42000,
  countriesVisited: 6,
  favoriteAirline: 'Hawaiian Airlines',
  favoriteRoute: 'LAX — HNL',
  yearToDate: { trips: 2, miles: 8400, spent: 7200 },
};

// ─── Profile Data ──────────────────────────────────────────────────
const PROFILE_PREMIUM: ProfileData = {
  user: {
    id: 'USR-001',
    firstName: 'Alexandra',
    lastName: 'Whitfield',
    email: 'alexandra.w@privateoffice.com',
    phone: '+1 (415) 555-0100',
    persona: 'premium',
    memberSince: '2019-06-15',
    biometric: { faceIdEnrolled: true, fingerprintEnrolled: true },
  },
  loyalty: {
    eliteTier: 'Star Alliance Gold',
    totalPoints: 47500,
    pointsToNextTier: 13200,
    nextTier: 'Platinum',
    qualifiedFlights: 28,
    flightsToNextTier: 8,
    tierExpiry: '2027-03-31',
    programs: PROGRAMS_PREMIUM,
    benefits: [
      'Priority check-in & boarding',
      'Complimentary lounge access worldwide',
      'Free seat selection in all cabins',
      'Guaranteed first class upgrade waitlist',
      'Dedicated concierge line',
      '100% bonus miles on all flights',
    ],
  },
  documents: {
    passport: { number: '****7741', country: 'United States', expiryDate: '2033-08-20', status: 'valid' },
    visas: [
      { country: 'China', type: '10-Year Multiple Entry', expiryDate: '2030-05-12', status: 'valid' },
      { country: 'India', type: 'e-Business Visa', expiryDate: '2027-01-30', status: 'valid' },
    ],
    insurance: { provider: 'Chubb Platinum Travel', policyNumber: 'CPT-992841', status: 'active', expiryDate: '2027-01-01' },
  },
  preferences: {
    dietary: 'No restrictions',
    accessibility: [],
    communication: ['email'],
    language: 'English',
    seatPreference: 'Window',
    mealPreference: 'Chef\'s selection',
  },
  security: {
    email: 'alexandra.w@privateoffice.com',
    phone: '+1 (415) 555-0100',
    passwordLastChanged: '2026-02-15',
    twoFactorEnabled: true,
    twoFactorMethod: 'app',
  },
  travelStats: STATS_PREMIUM,
};

const PROFILE_BUSINESS: ProfileData = {
  user: {
    id: 'USR-002',
    firstName: 'Marcus',
    lastName: 'Webb',
    email: 'marcus.webb@venturecapital.com',
    phone: '+1 (628) 555-0200',
    persona: 'business',
    memberSince: '2021-01-10',
    biometric: { faceIdEnrolled: true, fingerprintEnrolled: false },
  },
  loyalty: {
    eliteTier: 'MileagePlus Platinum',
    totalPoints: 82300,
    pointsToNextTier: 17700,
    nextTier: '1K',
    qualifiedFlights: 4,
    flightsToNextTier: 1,
    tierExpiry: '2027-03-31',
    programs: PROGRAMS_BUSINESS,
    benefits: [
      'Free checked baggage (2 bags)',
      'Economy Plus access',
      'Priority boarding (Group 2)',
      '80% bonus miles',
      'Complimentary same-day standby',
      'Complimentary Premier upgrades',
    ],
  },
  documents: {
    passport: { number: '****4567', country: 'United States', expiryDate: '2034-05-15', status: 'valid' },
    visas: [
      { country: 'Global Entry', type: 'Trusted Traveler', expiryDate: '2031-08-12', status: 'valid' },
    ],
    insurance: { provider: 'Corporate Travel Policy', policyNumber: 'CTP-882104', status: 'active', expiryDate: '2026-12-31' },
  },
  preferences: {
    dietary: 'No restrictions',
    accessibility: [],
    communication: ['email', 'push'],
    language: 'English',
    seatPreference: 'Aisle',
    mealPreference: 'Standard',
  },
  security: {
    email: 'marcus.webb@venturecapital.com',
    phone: '+1 (628) 555-0200',
    passwordLastChanged: '2026-03-20',
    twoFactorEnabled: true,
    twoFactorMethod: 'app',
  },
  travelStats: STATS_BUSINESS,
};

const PROFILE_FAMILY: ProfileData = {
  user: {
    id: 'USR-003',
    firstName: 'Wei',
    lastName: 'Chen',
    email: 'wei.chen@gmail.com',
    phone: '+1 (310) 555-0300',
    persona: 'family',
    memberSince: '2022-08-20',
    biometric: { faceIdEnrolled: false, fingerprintEnrolled: false },
  },
  loyalty: {
    eliteTier: 'HawaiianMiles Member',
    totalPoints: 12400,
    pointsToNextTier: 12600,
    nextTier: 'Pualani Gold',
    qualifiedFlights: 6,
    flightsToNextTier: 4,
    tierExpiry: '2027-03-31',
    programs: PROGRAMS_FAMILY,
    benefits: [
      'Earn miles on every flight',
      'Family pooling eligible',
      'Basic seat selection',
    ],
  },
  documents: {
    passport: { number: '****1234', country: 'United States', expiryDate: '2034-05-15', status: 'valid' },
    visas: [
      { country: 'United States', type: 'Passport — Lin Chen', expiryDate: '2033-11-20', status: 'valid' },
      { country: 'United States', type: 'Passport — Sophie Chen', expiryDate: '2035-02-10', status: 'valid' },
      { country: 'United States', type: 'Passport — Lucas Chen', expiryDate: '2035-07-05', status: 'valid' },
    ],
    insurance: { provider: 'Family Travel Guard', policyNumber: 'FTG-889234', status: 'active', expiryDate: '2026-10-01' },
  },
  preferences: {
    dietary: 'No restrictions',
    accessibility: [],
    communication: ['email', 'push', 'sms'],
    language: 'English',
    seatPreference: 'Window (kids) / Aisle (adults)',
    mealPreference: 'Standard + Kids meals',
  },
  security: {
    email: 'wei.chen@gmail.com',
    phone: '+1 (310) 555-0300',
    passwordLastChanged: '2026-01-10',
    twoFactorEnabled: false,
  },
  travelStats: STATS_FAMILY,
};

export function getProfileForPersona(persona: PersonaType): ProfileData {
  switch (persona) {
    case 'premium': return PROFILE_PREMIUM;
    case 'business': return PROFILE_BUSINESS;
    case 'family': return PROFILE_FAMILY;
    default: return PROFILE_BUSINESS;
  }
}
