import { UserProfile } from '@/lib/types/user';

export const MOCK_USERS: Record<string, UserProfile> = {
  alexandra: {
    id: 'user-alexandra',
    name: 'Alexandra Sterling',
    email: 'alexandra@sterling-capital.com',
    persona: 'premium',
    avatar: '/images/avatars/alexandra.jpg',
    preferences: {
      cabinClass: 'business',
      seatPreference: 'aisle',
      mealPreference: 'Vegetarian',
      notifications: { flightAlerts: true, priceDrops: false, disruptions: true, marketing: false },
      currency: 'USD',
      language: 'en',
      darkMode: 'system',
    },
    frequentAirports: ['SFO', 'LHR', 'CDG', 'SIN'],
    savedDestinations: ['Paris', 'Tokyo', 'Dubai', 'Milan'],
    loyaltyPrograms: [
      { airlineCode: 'UA', programName: 'MileagePlus', memberId: 'MP0038472', tier: 'Global Services', points: 482000 },
      { airlineCode: 'BA', programName: 'Executive Club', memberId: 'GB2839471', tier: 'Gold', points: 128000 },
      { airlineCode: 'SQ', programName: 'KrisFlyer', memberId: 'SQ9283741', tier: 'PPS Club', points: 295000 },
    ],
    onboardingComplete: true,
    createdAt: new Date('2024-06-15'),
  },
  marcus: {
    id: 'user-marcus',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@techventures.io',
    persona: 'business',
    avatar: '/images/avatars/marcus.jpg',
    preferences: {
      cabinClass: 'business',
      seatPreference: 'aisle',
      mealPreference: 'Standard',
      notifications: { flightAlerts: true, priceDrops: true, disruptions: true, marketing: false },
      currency: 'USD',
      language: 'en',
      darkMode: 'system',
    },
    frequentAirports: ['SFO', 'JFK', 'LAX', 'ORD'],
    savedDestinations: ['London', 'New York', 'San Francisco'],
    loyaltyPrograms: [
      { airlineCode: 'UA', programName: 'MileagePlus', memberId: 'MP1284751', tier: '1K', points: 185000 },
      { airlineCode: 'DL', programName: 'SkyMiles', memberId: 'DL2938471', tier: 'Diamond', points: 220000 },
    ],
    onboardingComplete: true,
    createdAt: new Date('2025-01-10'),
  },
  chen: {
    id: 'user-chen-family',
    name: 'Sarah Chen',
    email: 'sarah.chen@family.com',
    persona: 'family',
    avatar: '/images/avatars/chen-family.jpg',
    preferences: {
      cabinClass: 'economy',
      seatPreference: 'window',
      mealPreference: 'Standard',
      notifications: { flightAlerts: true, priceDrops: true, disruptions: true, marketing: true },
      currency: 'USD',
      language: 'en',
      darkMode: 'system',
    },
    familyMembers: [
      { id: 'fm-1', name: 'David Chen', age: 42, relationship: 'spouse', mealPreference: 'Standard' },
      { id: 'fm-2', name: 'Emily Chen', age: 10, relationship: 'child', mealPreference: 'Child meal' },
      { id: 'fm-3', name: 'Lucas Chen', age: 7, relationship: 'child', mealPreference: 'Child meal' },
    ],
    frequentAirports: ['SFO', 'LAX', 'HND'],
    savedDestinations: ['Tokyo', 'Hawaii', 'Orlando', 'London'],
    loyaltyPrograms: [
      { airlineCode: 'UA', programName: 'MileagePlus', memberId: 'MP5729384', tier: 'Silver', points: 42000 },
    ],
    onboardingComplete: true,
    createdAt: new Date('2025-03-01'),
  },
};

export function getMockUserForPersona(persona: 'premium' | 'business' | 'family'): UserProfile {
  switch (persona) {
    case 'premium':
      return MOCK_USERS.alexandra;
    case 'business':
      return MOCK_USERS.marcus;
    case 'family':
      return MOCK_USERS.chen;
  }
}
