import type { PersonaType } from '@/lib/types/user';

export interface UserSettings {
  travel: {
    seatPreference: 'window' | 'aisle' | 'middle' | 'no-preference';
    cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
    mealPreference: string;
    dietaryRestrictions: string[];
    preferredAirlines: string[];
  };
  notifications: {
    flightAlerts: boolean;
    gateChanges: boolean;
    checkInReminders: boolean;
    priceDrops: boolean;
    loyaltyUpdates: boolean;
    marketingEmails: boolean;
    pushEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
  };
  ai: {
    copilotEnabled: boolean;
    autonomyLevel: 'manual' | 'copilot' | 'curator' | 'autonomous';
    autoRebook: boolean;
    autoCheckin: boolean;
    smartSuggestions: boolean;
  };
  privacy: {
    dataSharing: 'minimal' | 'standard' | 'full';
    personalization: boolean;
    locationTracking: boolean;
    analyticsOptIn: boolean;
  };
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
    screenReaderOptimized: boolean;
  };
  account: {
    displayName: string;
    email: string;
    phone: string;
    currency: string;
    language: string;
    darkMode: 'system' | 'light' | 'dark';
  };
}

const premiumSettings: UserSettings = {
  travel: {
    seatPreference: 'window',
    cabinClass: 'first',
    mealPreference: 'standard',
    dietaryRestrictions: [],
    preferredAirlines: ['Singapore Airlines', 'British Airways'],
  },
  notifications: {
    flightAlerts: true,
    gateChanges: true,
    checkInReminders: false,
    priceDrops: false,
    loyaltyUpdates: true,
    marketingEmails: false,
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
  },
  ai: {
    copilotEnabled: true,
    autonomyLevel: 'autonomous',
    autoRebook: true,
    autoCheckin: true,
    smartSuggestions: true,
  },
  privacy: {
    dataSharing: 'minimal',
    personalization: true,
    locationTracking: false,
    analyticsOptIn: false,
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
  },
  account: {
    displayName: 'Alexandra Chen',
    email: 'alexandra.chen@email.com',
    phone: '+1 (415) 555-0192',
    currency: 'USD',
    language: 'en',
    darkMode: 'system',
  },
};

const businessSettings: UserSettings = {
  travel: {
    seatPreference: 'aisle',
    cabinClass: 'business',
    mealPreference: 'standard',
    dietaryRestrictions: ['Low sodium'],
    preferredAirlines: ['United', 'American', 'Delta'],
  },
  notifications: {
    flightAlerts: true,
    gateChanges: true,
    checkInReminders: true,
    priceDrops: true,
    loyaltyUpdates: true,
    marketingEmails: true,
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: true,
    quietHoursStart: '23:00',
    quietHoursEnd: '06:00',
  },
  ai: {
    copilotEnabled: true,
    autonomyLevel: 'copilot',
    autoRebook: true,
    autoCheckin: true,
    smartSuggestions: true,
  },
  privacy: {
    dataSharing: 'standard',
    personalization: true,
    locationTracking: true,
    analyticsOptIn: true,
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
  },
  account: {
    displayName: 'Marcus Johnson',
    email: 'marcus.johnson@acmecorp.com',
    phone: '+1 (212) 555-0847',
    currency: 'USD',
    language: 'en',
    darkMode: 'light',
  },
};

const familySettings: UserSettings = {
  travel: {
    seatPreference: 'no-preference',
    cabinClass: 'economy',
    mealPreference: 'standard',
    dietaryRestrictions: ['Nut allergy', 'Dairy-free'],
    preferredAirlines: ['Delta', 'United'],
  },
  notifications: {
    flightAlerts: true,
    gateChanges: true,
    checkInReminders: true,
    priceDrops: true,
    loyaltyUpdates: false,
    marketingEmails: true,
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: true,
    quietHoursStart: '21:00',
    quietHoursEnd: '07:00',
  },
  ai: {
    copilotEnabled: false,
    autonomyLevel: 'manual',
    autoRebook: false,
    autoCheckin: false,
    smartSuggestions: true,
  },
  privacy: {
    dataSharing: 'full',
    personalization: true,
    locationTracking: true,
    analyticsOptIn: true,
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
  },
  account: {
    displayName: 'Sarah & David Kim',
    email: 'kim.family@email.com',
    phone: '+1 (303) 555-0234',
    currency: 'USD',
    language: 'en',
    darkMode: 'system',
  },
};

export function getSettingsForPersona(persona: PersonaType): UserSettings {
  switch (persona) {
    case 'premium':
      return structuredClone(premiumSettings);
    case 'business':
      return structuredClone(businessSettings);
    case 'family':
      return structuredClone(familySettings);
    default:
      return structuredClone(businessSettings);
  }
}
