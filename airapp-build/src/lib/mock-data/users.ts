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
    familyMembers: [
      { id: 'fm-a1', name: 'James Sterling', age: 47, relationship: 'spouse', mealPreference: 'Standard' },
      { id: 'fm-a2', name: 'Sophie Sterling', age: 12, relationship: 'child', mealPreference: 'Child meal' },
    ],
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
    name: 'Marcus Webb',
    email: 'marcus.webb@venturecapital.com',
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
    frequentAirports: ['SFO', 'ORD', 'BOS', 'SEA'],
    savedDestinations: ['London', 'Chicago', 'Seattle', 'Tokyo'],
    familyMembers: [],
    loyaltyPrograms: [
      { airlineCode: 'UA', programName: 'MileagePlus', memberId: 'MP1284751', tier: 'Platinum', points: 82300 },
    ],
    onboardingComplete: true,
    createdAt: new Date('2025-01-10'),
  },
  chen: {
    id: 'user-chen-family',
    name: 'Wei Chen',
    email: 'wei.chen@gmail.com',
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
      { id: 'fm-1', name: 'Lin Chen', age: 36, relationship: 'spouse', mealPreference: 'Vegetarian' },
      { id: 'fm-2', name: 'Sophie Chen', age: 8, relationship: 'child', mealPreference: 'Child meal' },
      { id: 'fm-3', name: 'Lucas Chen', age: 5, relationship: 'child', mealPreference: 'Child meal' },
    ],
    frequentAirports: ['LAX', 'HNL', 'PHX'],
    savedDestinations: ['Hawaii', 'Cancun', 'San Diego', 'Tokyo'],
    loyaltyPrograms: [
      { airlineCode: 'HA', programName: 'HawaiianMiles', memberId: 'HM4827391', tier: 'Member', points: 12400 },
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
