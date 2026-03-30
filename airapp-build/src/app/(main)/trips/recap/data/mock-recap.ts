import type { PersonaType } from '@/lib/types/user';

export interface TripRecapData {
  trip: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    origin: { city: string; country: string };
    destinations: { city: string; country: string }[];
    totalCost: number;
    currency: string;
  };
  expenses: { category: string; amount: number; color: string }[];
  loyalty: {
    status: 'posted' | 'pending';
    items: { label: string; points: number }[];
    newBalance: number;
    program: string;
  };
  memories: { id: string; gradient: string; caption: string }[];
  insights: { icon: string; label: string; value: string; detail?: string }[];
  jetlag: {
    shift: number;
    direction: string;
    tips: { icon: string; title: string; description: string }[];
  };
}

// ---------- Premium (Alexandra) ----------
const premiumRecap: TripRecapData = {
  trip: {
    id: 'recap-premium-001',
    title: 'Trip to London',
    startDate: '2026-03-30',
    endDate: '2026-04-06',
    origin: { city: 'New York', country: 'USA' },
    destinations: [
      { city: 'London', country: 'United Kingdom' },
      { city: 'Bath', country: 'United Kingdom' },
    ],
    totalCost: 4850,
    currency: 'USD',
  },
  expenses: [
    { category: 'Flights', amount: 1800, color: 'bg-primary-500' },
    { category: 'Hotels', amount: 1600, color: 'bg-secondary-500' },
    { category: 'Transport', amount: 320, color: 'bg-info-500' },
    { category: 'Activities', amount: 550, color: 'bg-success-500' },
    { category: 'Dining', amount: 430, color: 'bg-warning-500' },
    { category: 'Other', amount: 150, color: 'bg-error-400' },
  ],
  loyalty: {
    status: 'posted',
    items: [
      { label: 'Flight miles', points: 6000 },
      { label: 'Hotel points', points: 2000 },
      { label: 'VIP elite bonus', points: 500 },
    ],
    newBalance: 125342,
    program: 'AirThere Rewards',
  },
  memories: [
    { id: 'm1', gradient: 'from-primary-400 to-primary-700', caption: 'Tower Bridge at sunset' },
    { id: 'm2', gradient: 'from-secondary-400 to-secondary-700', caption: 'Afternoon tea at The Ritz' },
    { id: 'm3', gradient: 'from-success-400 to-success-700', caption: 'Bath Roman Baths' },
    { id: 'm4', gradient: 'from-info-400 to-info-700', caption: 'West End show night' },
    { id: 'm5', gradient: 'from-warning-400 to-warning-700', caption: 'Borough Market brunch' },
  ],
  insights: [
    { icon: 'plane', label: 'Miles traveled', value: '5,358', detail: 'JFK \u2192 LHR roundtrip' },
    { icon: 'globe', label: 'Countries visited', value: '2', detail: 'USA, United Kingdom' },
    { icon: 'map-pin', label: 'New cities', value: '2', detail: 'London, Bath' },
    { icon: 'moon', label: 'Nights away', value: '7', detail: 'Mar 30 \u2013 Apr 6' },
    { icon: 'clock', label: 'Time zone shift', value: '+8h', detail: 'EST \u2192 GMT' },
  ],
  jetlag: {
    shift: 8,
    direction: 'east',
    tips: [
      {
        icon: 'sun',
        title: 'Get morning sunlight',
        description: 'Expose yourself to bright light between 7\u201310 AM to reset your circadian clock faster.',
      },
      {
        icon: 'utensils',
        title: 'Shift meals gradually',
        description: 'Eat dinner no later than 7 PM local time for the next 3 days to anchor your body clock.',
      },
      {
        icon: 'bed',
        title: 'Sleep schedule',
        description: 'Target bedtime 10\u201311 PM tonight. Avoid naps longer than 20 minutes before 3 PM.',
      },
    ],
  },
};

// ---------- Business (Marcus) ----------
const businessRecap: TripRecapData = {
  trip: {
    id: 'trip-biz-003',
    title: 'Seattle Client Pitch',
    startDate: '2026-03-22',
    endDate: '2026-03-24',
    origin: { city: 'Denver', country: 'USA' },
    destinations: [
      { city: 'Seattle', country: 'USA' },
    ],
    totalCost: 2860,
    currency: 'USD',
  },
  expenses: [
    { category: 'Flights', amount: 1420, color: 'bg-primary-500' },
    { category: 'Hotels', amount: 890, color: 'bg-secondary-500' },
    { category: 'Dining', amount: 280, color: 'bg-warning-500' },
    { category: 'Ground Transport', amount: 170, color: 'bg-info-500' },
    { category: 'Tips', amount: 60, color: 'bg-success-500' },
    { category: 'Misc', amount: 40, color: 'bg-error-400' },
  ],
  loyalty: {
    status: 'posted',
    items: [
      { label: 'MileagePlus miles', points: 1420 },
    ],
    newBalance: 98450,
    program: 'United MileagePlus',
  },
  memories: [
    { id: 'm1', gradient: 'from-primary-400 to-primary-700', caption: 'Client meeting success' },
    { id: 'm2', gradient: 'from-secondary-400 to-secondary-700', caption: 'Pike Place Market lunch' },
    { id: 'm3', gradient: 'from-success-400 to-success-700', caption: 'Mount Rainier view' },
  ],
  insights: [
    { icon: 'plane', label: 'Miles traveled', value: '2,080', detail: 'DEN \u2192 SEA roundtrip' },
    { icon: 'globe', label: 'Countries visited', value: '1', detail: 'USA' },
    { icon: 'map-pin', label: 'Cities', value: '1', detail: 'Seattle' },
    { icon: 'moon', label: 'Nights away', value: '2', detail: 'Mar 22 \u2013 24' },
    { icon: 'briefcase', label: 'Productivity', value: '2 calls, 4 docs', detail: '2 video calls from lounge, 4 docs reviewed on flight' },
  ],
  jetlag: {
    shift: 1,
    direction: 'west',
    tips: [
      {
        icon: 'sun',
        title: 'Minimal adjustment needed',
        description: 'Only 1 hour time difference. No significant jet lag expected.',
      },
      {
        icon: 'utensils',
        title: 'Stay on schedule',
        description: 'Keep your regular meal and sleep schedule for a smooth transition back.',
      },
      {
        icon: 'bed',
        title: 'Business-ready',
        description: 'You should be fully adjusted immediately. No recovery time needed before Monday.',
      },
    ],
  },
};

// ---------- Family (Chen) ----------
const familyRecap: TripRecapData = {
  trip: {
    id: 'trip-fam-002',
    title: 'Cancun Spring Break',
    startDate: '2025-12-28',
    endDate: '2026-01-04',
    origin: { city: 'Phoenix', country: 'USA' },
    destinations: [
      { city: 'Cancun', country: 'Mexico' },
    ],
    totalCost: 3920,
    currency: 'USD',
  },
  expenses: [
    { category: 'Flights', amount: 980, color: 'bg-primary-500' },
    { category: 'Hotels', amount: 1600, color: 'bg-secondary-500' },
    { category: 'Dining', amount: 520, color: 'bg-warning-500' },
    { category: 'Activities', amount: 480, color: 'bg-success-500' },
    { category: 'Ground Transport', amount: 180, color: 'bg-info-500' },
    { category: 'Souvenirs', amount: 160, color: 'bg-error-400' },
  ],
  loyalty: {
    status: 'posted',
    items: [
      { label: 'No miles earned (Southwest Rapid Rewards)', points: 0 },
    ],
    newBalance: 0,
    program: 'Southwest Rapid Rewards',
  },
  memories: [
    { id: 'm1', gradient: 'from-primary-400 to-primary-700', caption: 'Family beach day' },
    { id: 'm2', gradient: 'from-secondary-400 to-secondary-700', caption: 'Snorkeling adventure' },
    { id: 'm3', gradient: 'from-success-400 to-success-700', caption: 'Mayan ruins visit' },
    { id: 'm4', gradient: 'from-info-400 to-info-700', caption: 'Kids pool party' },
    { id: 'm5', gradient: 'from-warning-400 to-warning-700', caption: 'Sunset dinner' },
  ],
  insights: [
    { icon: 'plane', label: 'Miles traveled', value: '2,360', detail: 'PHX \u2192 CUN roundtrip' },
    { icon: 'globe', label: 'Countries visited', value: '2', detail: 'USA, Mexico' },
    { icon: 'map-pin', label: 'Cities', value: '1', detail: 'Cancun' },
    { icon: 'moon', label: 'Nights away', value: '7', detail: 'Dec 28 \u2013 Jan 4' },
    { icon: 'wallet', label: 'Budget review', value: '$280 under', detail: 'Came in $280 under budget!' },
  ],
  jetlag: {
    shift: 2,
    direction: 'east',
    tips: [
      {
        icon: 'sun',
        title: 'Get the whole family outside',
        description: 'Minimal time difference. A morning walk or playground visit will help everyone settle in.',
      },
      {
        icon: 'utensils',
        title: 'Back to routine',
        description: 'Return to regular mealtimes right away. Kids will adjust quickly with their normal schedule.',
      },
      {
        icon: 'bed',
        title: 'Bedtime routine',
        description: 'Keep the usual bedtime routine. Aim for 8 PM for kids, 10 PM for adults. No significant adjustment needed.',
      },
    ],
  },
};

const recapMap: Record<PersonaType, TripRecapData> = {
  premium: premiumRecap,
  business: businessRecap,
  family: familyRecap,
};

export function getRecapForPersona(persona: PersonaType): TripRecapData {
  return recapMap[persona];
}
