import { PersonaType } from './user';

export interface ProfileData {
  user: ProfileUser;
  loyalty: LoyaltyData;
  documents: TravelDocuments;
  preferences: ProfilePreferences;
  security: AccountSecurity;
  travelStats: TravelStats;
}

export interface ProfileUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  persona: PersonaType;
  memberSince: string;
  biometric: {
    faceIdEnrolled: boolean;
    fingerprintEnrolled: boolean;
  };
}

export interface LoyaltyData {
  eliteTier: string;
  totalPoints: number;
  pointsToNextTier: number;
  nextTier: string;
  qualifiedFlights: number;
  flightsToNextTier: number;
  tierExpiry: string;
  programs: FrequentFlyerProgram[];
  benefits: string[];
}

export interface FrequentFlyerProgram {
  id: string;
  airline: string;
  airlineCode: string;
  programName: string;
  accountNumber: string;
  balance: number;
  unit: 'miles' | 'points';
  eliteStatus?: string;
  lastActivity: string;
}

export interface TravelDocuments {
  passport?: {
    number: string;
    country: string;
    expiryDate: string;
    status: 'valid' | 'expiring' | 'expired';
  };
  visas: Array<{
    country: string;
    type: string;
    expiryDate: string;
    status: 'valid' | 'expiring' | 'expired';
  }>;
  insurance: {
    provider: string;
    policyNumber: string;
    status: 'active' | 'expired' | 'none';
    expiryDate?: string;
  };
}

export interface ProfilePreferences {
  dietary: string;
  accessibility: string[];
  communication: string[];
  language: string;
  seatPreference: string;
  mealPreference: string;
}

export interface AccountSecurity {
  email: string;
  phone: string;
  passwordLastChanged: string;
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'app' | 'sms';
}

export interface TravelStats {
  totalTrips: number;
  totalFlights: number;
  totalMiles: number;
  countriesVisited: number;
  favoriteAirline: string;
  favoriteRoute: string;
  yearToDate: {
    trips: number;
    miles: number;
    spent: number;
  };
}
