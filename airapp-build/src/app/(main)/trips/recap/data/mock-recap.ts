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
    id: 'recap-business-001',
    title: 'London Business Trip',
    startDate: '2026-03-30',
    endDate: '2026-04-06',
    origin: { city: 'Chicago', country: 'USA' },
    destinations: [
      { city: 'London', country: 'United Kingdom' },
      { city: 'Bath', country: 'United Kingdom' },
    ],
    totalCost: 5200,
    currency: 'USD',
  },
  expenses: [
    { category: 'Flights', amount: 2100, color: 'bg-primary-500' },
    { category: 'Hotels', amount: 1750, color: 'bg-secondary-500' },
    { category: 'Transport', amount: 380, color: 'bg-info-500' },
    { category: 'Activities', amount: 200, color: 'bg-success-500' },
    { category: 'Dining', amount: 520, color: 'bg-warning-500' },
    { category: 'Other', amount: 250, color: 'bg-error-400' },
  ],
  loyalty: {
    status: 'posted',
    items: [
      { label: 'Flight miles', points: 6000 },
      { label: 'Hotel points', points: 2000 },
      { label: 'Corporate bonus', points: 750 },
    ],
    newBalance: 98450,
    program: 'AirThere Business Rewards',
  },
  memories: [
    { id: 'm1', gradient: 'from-primary-400 to-primary-700', caption: 'Client meeting \u2013 Canary Wharf' },
    { id: 'm2', gradient: 'from-secondary-400 to-secondary-700', caption: 'Team dinner \u2013 The Ivy' },
    { id: 'm3', gradient: 'from-success-400 to-success-700', caption: 'Conference keynote' },
    { id: 'm4', gradient: 'from-info-400 to-info-700', caption: 'Evening at Bath' },
    { id: 'm5', gradient: 'from-warning-400 to-warning-700', caption: 'Departure lounge' },
  ],
  insights: [
    { icon: 'plane', label: 'Miles traveled', value: '5,358', detail: 'ORD \u2192 LHR roundtrip' },
    { icon: 'globe', label: 'Countries visited', value: '2', detail: 'USA, United Kingdom' },
    { icon: 'map-pin', label: 'New cities', value: '2', detail: 'London, Bath' },
    { icon: 'moon', label: 'Nights away', value: '7', detail: 'Mar 30 \u2013 Apr 6' },
    { icon: 'clock', label: 'Time zone shift', value: '+8h', detail: 'CST \u2192 GMT' },
  ],
  jetlag: {
    shift: 8,
    direction: 'east',
    tips: [
      {
        icon: 'sun',
        title: 'Morning light exposure',
        description: 'Step outside 7\u201310 AM. Natural light is the strongest zeitgeber for resetting your clock before Monday meetings.',
      },
      {
        icon: 'utensils',
        title: 'Align meal timing',
        description: 'Eat meals on local schedule immediately. Avoid heavy meals after 7 PM to support recovery.',
      },
      {
        icon: 'bed',
        title: 'Optimize sleep for productivity',
        description: 'Set bedtime at 10:30 PM tonight. Use blue-light blocking after 8 PM. You should be fully adjusted in 3\u20134 days.',
      },
    ],
  },
};

// ---------- Family (Chen) ----------
const familyRecap: TripRecapData = {
  trip: {
    id: 'recap-family-001',
    title: 'Family Trip to London',
    startDate: '2026-03-30',
    endDate: '2026-04-06',
    origin: { city: 'San Francisco', country: 'USA' },
    destinations: [
      { city: 'London', country: 'United Kingdom' },
      { city: 'Bath', country: 'United Kingdom' },
    ],
    totalCost: 9600,
    currency: 'USD',
  },
  expenses: [
    { category: 'Flights', amount: 3600, color: 'bg-primary-500' },
    { category: 'Hotels', amount: 2800, color: 'bg-secondary-500' },
    { category: 'Transport', amount: 640, color: 'bg-info-500' },
    { category: 'Activities', amount: 1200, color: 'bg-success-500' },
    { category: 'Dining', amount: 960, color: 'bg-warning-500' },
    { category: 'Other', amount: 400, color: 'bg-error-400' },
  ],
  loyalty: {
    status: 'pending',
    items: [
      { label: 'Flight miles', points: 6000 },
      { label: 'Hotel points', points: 2000 },
      { label: 'Family bonus', points: 300 },
    ],
    newBalance: 45200,
    program: 'AirThere Family Rewards',
  },
  memories: [
    { id: 'm1', gradient: 'from-primary-400 to-primary-700', caption: 'Kids at Buckingham Palace' },
    { id: 'm2', gradient: 'from-secondary-400 to-secondary-700', caption: 'Harry Potter Studio Tour' },
    { id: 'm3', gradient: 'from-success-400 to-success-700', caption: 'Punting in Bath' },
    { id: 'm4', gradient: 'from-info-400 to-info-700', caption: 'London Eye family photo' },
    { id: 'm5', gradient: 'from-warning-400 to-warning-700', caption: 'Fish & chips at the pub' },
  ],
  insights: [
    { icon: 'plane', label: 'Miles traveled', value: '5,358', detail: 'SFO \u2192 LHR roundtrip' },
    { icon: 'globe', label: 'Countries visited', value: '2', detail: 'USA, United Kingdom' },
    { icon: 'map-pin', label: 'New cities', value: '2', detail: 'London, Bath' },
    { icon: 'moon', label: 'Nights away', value: '7', detail: 'Mar 30 \u2013 Apr 6' },
    { icon: 'clock', label: 'Time zone shift', value: '+8h', detail: 'PST \u2192 GMT' },
  ],
  jetlag: {
    shift: 8,
    direction: 'east',
    tips: [
      {
        icon: 'sun',
        title: 'Get the whole family outside',
        description: 'Morning sunlight (7\u201310 AM) helps everyone adjust. Plan a neighborhood walk or playground visit.',
      },
      {
        icon: 'utensils',
        title: 'Meal timing for kids',
        description: 'Stick to regular local mealtimes. Kids adjust faster \u2014 expect 2\u20133 days. Offer healthy snacks if they\u2019re hungry off-schedule.',
      },
      {
        icon: 'bed',
        title: 'Bedtime routine',
        description: 'Keep the usual bedtime routine. Aim for 8 PM for kids, 10 PM for adults. Allow short naps (max 20 min) if needed.',
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
