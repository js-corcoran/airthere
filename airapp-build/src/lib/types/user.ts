export type PersonaType = 'premium' | 'business' | 'family';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  persona: PersonaType;
  avatar?: string;
  preferences: UserPreferences;
  familyMembers?: FamilyMember[];
  frequentAirports: string[];
  savedDestinations: string[];
  loyaltyPrograms: LoyaltyMembership[];
  onboardingComplete: boolean;
  createdAt: Date;
}

export interface UserPreferences {
  cabinClass: CabinClass;
  seatPreference: SeatPreference;
  mealPreference: string;
  notifications: NotificationPreferences;
  currency: string;
  language: string;
  darkMode: 'system' | 'light' | 'dark';
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  mealPreference?: string;
  seatPreference?: SeatPreference;
}

export interface LoyaltyMembership {
  airlineCode: string;
  programName: string;
  memberId: string;
  tier: string;
  points: number;
}

export interface NotificationPreferences {
  flightAlerts: boolean;
  priceDrops: boolean;
  disruptions: boolean;
  marketing: boolean;
}

export type CabinClass = 'economy' | 'premium-economy' | 'business' | 'first';
export type SeatPreference = 'window' | 'aisle' | 'middle' | 'no-preference';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  accentColor: string;
}
