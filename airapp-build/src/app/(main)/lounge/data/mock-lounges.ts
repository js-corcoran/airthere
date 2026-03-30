import { PersonaType } from '@/lib/types/user';

export interface Lounge {
  id: string;
  name: string;
  airportCode: string;
  terminal: string;
  gateArea: string;
  rating: number;
  reviewCount: number;
  hours: { open: string; close: string };
  amenities: { name: string; available: boolean; icon: string }[];
  access: {
    type: 'included' | 'upgrade' | 'not_available';
    reason: string;
    upgradePrice?: number;
  };
  capacity: { current: number; max: number; percentage: number };
  waitTime: number; // minutes
  walkingDistance: string; // e.g., "5 min walk"
  guestPolicy: { allowed: boolean; maxGuests: number };
  description: string;
}

const ALL_LOUNGES: Lounge[] = [
  {
    id: 'lounge-united-club',
    name: 'United Club',
    airportCode: 'SFO',
    terminal: 'Terminal 3',
    gateArea: 'Gate C12 area',
    rating: 4.8,
    reviewCount: 2341,
    hours: { open: '5:00 AM', close: '11:00 PM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Dining', available: true, icon: 'coffee' },
      { name: 'Business Center', available: true, icon: 'monitor' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Shower', available: false, icon: 'shower' },
      { name: 'Family Area', available: false, icon: 'baby' },
      { name: 'Spa', available: false, icon: 'dumbbell' },
    ],
    access: {
      type: 'included',
      reason: 'United Gold Elite member',
    },
    capacity: { current: 43, max: 100, percentage: 43 },
    waitTime: 5,
    walkingDistance: '5 min walk',
    guestPolicy: { allowed: true, maxGuests: 1 },
    description:
      'The United Club at SFO Terminal 3 offers a quiet retreat with complimentary snacks, premium beverages, WiFi, and a dedicated business center. Enjoy runway views while you relax before your flight.',
  },
  {
    id: 'lounge-amex-centurion',
    name: 'Amex Centurion Lounge',
    airportCode: 'SFO',
    terminal: 'Terminal 3',
    gateArea: 'Gate E2 area',
    rating: 4.9,
    reviewCount: 3876,
    hours: { open: '6:00 AM', close: '10:00 PM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Dining', available: true, icon: 'coffee' },
      { name: 'Shower', available: true, icon: 'shower' },
      { name: 'Spa', available: true, icon: 'dumbbell' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Business Center', available: true, icon: 'monitor' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Family Area', available: false, icon: 'baby' },
    ],
    access: {
      type: 'included',
      reason: 'Platinum Card member',
    },
    capacity: { current: 15, max: 100, percentage: 15 },
    waitTime: 0,
    walkingDistance: '8 min walk',
    guestPolicy: { allowed: true, maxGuests: 2 },
    description:
      'The acclaimed Centurion Lounge features chef-curated dining, a full spa, craft cocktails, and premium workspace. A tranquil oasis designed for discerning travelers who expect the finest.',
  },
  {
    id: 'lounge-sfo-intl-first',
    name: 'SFO International First Lounge',
    airportCode: 'SFO',
    terminal: "Int'l Terminal",
    gateArea: 'Gate G area',
    rating: 4.7,
    reviewCount: 1892,
    hours: { open: '6:00 AM', close: '12:00 AM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Dining', available: true, icon: 'coffee' },
      { name: 'Shower', available: true, icon: 'shower' },
      { name: 'Business Center', available: true, icon: 'monitor' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Bar', available: true, icon: 'coffee' },
      { name: 'Spa', available: false, icon: 'dumbbell' },
      { name: 'Family Area', available: false, icon: 'baby' },
    ],
    access: {
      type: 'included',
      reason: 'First Class ticket',
    },
    capacity: { current: 28, max: 100, percentage: 28 },
    waitTime: 0,
    walkingDistance: '12 min walk',
    guestPolicy: { allowed: true, maxGuests: 1 },
    description:
      'An exclusive retreat for First Class passengers offering gourmet dining, premium bar, private shower suites, and panoramic runway views. The highest level of pre-flight comfort at SFO.',
  },
  {
    id: 'lounge-admirals-club',
    name: "Admiral's Club",
    airportCode: 'SFO',
    terminal: 'Terminal 2',
    gateArea: 'Gate D5 area',
    rating: 4.2,
    reviewCount: 1567,
    hours: { open: '5:30 AM', close: '10:30 PM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Dining', available: true, icon: 'coffee' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Shower', available: false, icon: 'shower' },
      { name: 'Business Center', available: false, icon: 'monitor' },
      { name: 'Spa', available: false, icon: 'dumbbell' },
      { name: 'Family Area', available: false, icon: 'baby' },
    ],
    access: {
      type: 'upgrade',
      reason: 'Day pass available',
      upgradePrice: 45,
    },
    capacity: { current: 67, max: 100, percentage: 67 },
    waitTime: 15,
    walkingDistance: '10 min walk',
    guestPolicy: { allowed: true, maxGuests: 1 },
    description:
      "The Admiral's Club provides a comfortable space with complimentary snacks, beverages, and WiFi. Located in Terminal 2 with convenient access to American Airlines gates.",
  },
  {
    id: 'lounge-sky-club',
    name: 'Sky Club',
    airportCode: 'SFO',
    terminal: 'Terminal 1',
    gateArea: 'Gate B3 area',
    rating: 4.5,
    reviewCount: 2103,
    hours: { open: '5:00 AM', close: '11:00 PM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Dining', available: true, icon: 'coffee' },
      { name: 'Shower', available: true, icon: 'shower' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Business Center', available: false, icon: 'monitor' },
      { name: 'Spa', available: false, icon: 'dumbbell' },
      { name: 'Family Area', available: false, icon: 'baby' },
    ],
    access: {
      type: 'not_available',
      reason: 'Economy ticket — Delta SkyMiles required',
    },
    capacity: { current: 55, max: 100, percentage: 55 },
    waitTime: 8,
    walkingDistance: '15 min walk',
    guestPolicy: { allowed: true, maxGuests: 2 },
    description:
      'Delta Sky Club offers premium food and beverage, shower facilities, and a relaxed atmosphere. Access is available to Delta SkyMiles members and eligible ticket holders.',
  },
  {
    id: 'lounge-sanctuary-family',
    name: 'The Sanctuary',
    airportCode: 'SFO',
    terminal: 'Terminal 3',
    gateArea: 'Gate C8 area',
    rating: 4.3,
    reviewCount: 945,
    hours: { open: '6:00 AM', close: '9:00 PM' },
    amenities: [
      { name: 'WiFi', available: true, icon: 'wifi' },
      { name: 'Family Dining', available: true, icon: 'coffee' },
      { name: 'Kids Area', available: true, icon: 'baby' },
      { name: 'Power Outlets', available: true, icon: 'plug' },
      { name: 'Seating', available: true, icon: 'sofa' },
      { name: 'Shower', available: false, icon: 'shower' },
      { name: 'Business Center', available: false, icon: 'monitor' },
      { name: 'Spa', available: false, icon: 'dumbbell' },
    ],
    access: {
      type: 'included',
      reason: 'Family travel pass',
    },
    capacity: { current: 30, max: 100, percentage: 30 },
    waitTime: 0,
    walkingDistance: '4 min walk',
    guestPolicy: { allowed: true, maxGuests: 4 },
    description:
      'A family-friendly lounge with dedicated kids play area, family dining options, and quiet nursing rooms. Perfect for families traveling with young children. Stroller parking available.',
  },
];

/** Returns lounges ordered and filtered based on persona */
export function getLoungesForPersona(persona: PersonaType): Lounge[] {
  const lounges = ALL_LOUNGES.map((lounge) => {
    // Clone and adjust access per persona
    const adjusted = { ...lounge, access: { ...lounge.access } };

    switch (persona) {
      case 'premium':
        // Premium users get access to top-tier lounges
        if (lounge.id === 'lounge-united-club') {
          adjusted.access = { type: 'included', reason: 'United Gold Elite + Business Class' };
        } else if (lounge.id === 'lounge-amex-centurion') {
          adjusted.access = { type: 'included', reason: 'Amex Platinum Card holder' };
        } else if (lounge.id === 'lounge-sfo-intl-first') {
          adjusted.access = { type: 'included', reason: 'First Class ticket holder' };
        } else if (lounge.id === 'lounge-admirals-club') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 45 };
        } else if (lounge.id === 'lounge-sky-club') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 39 };
        } else if (lounge.id === 'lounge-sanctuary-family') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 25 };
        }
        break;

      case 'business':
        // Business persona gets United Club, can upgrade for others
        if (lounge.id === 'lounge-united-club') {
          adjusted.access = { type: 'included', reason: 'United Gold Elite member' };
        } else if (lounge.id === 'lounge-amex-centurion') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 65 };
        } else if (lounge.id === 'lounge-sfo-intl-first') {
          adjusted.access = { type: 'not_available', reason: 'First Class ticket required' };
        } else if (lounge.id === 'lounge-admirals-club') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 45 };
        } else if (lounge.id === 'lounge-sky-club') {
          adjusted.access = { type: 'not_available', reason: 'Delta SkyMiles membership required' };
        } else if (lounge.id === 'lounge-sanctuary-family') {
          adjusted.access = { type: 'upgrade', reason: 'Day pass available', upgradePrice: 25 };
        }
        break;

      case 'family':
        // Family persona gets The Sanctuary, limited access elsewhere
        if (lounge.id === 'lounge-sanctuary-family') {
          adjusted.access = { type: 'included', reason: 'Family travel pass' };
        } else if (lounge.id === 'lounge-united-club') {
          adjusted.access = { type: 'upgrade', reason: 'Family day pass', upgradePrice: 35 };
        } else if (lounge.id === 'lounge-amex-centurion') {
          adjusted.access = { type: 'not_available', reason: 'Amex Platinum Card required' };
        } else if (lounge.id === 'lounge-sfo-intl-first') {
          adjusted.access = { type: 'not_available', reason: 'First Class ticket required' };
        } else if (lounge.id === 'lounge-admirals-club') {
          adjusted.access = { type: 'upgrade', reason: 'Family day pass', upgradePrice: 50 };
        } else if (lounge.id === 'lounge-sky-club') {
          adjusted.access = { type: 'not_available', reason: 'Delta SkyMiles membership required' };
        }
        break;
    }

    return adjusted;
  });

  // Sort: included first, then upgrade, then not_available
  const order: Record<string, number> = { included: 0, upgrade: 1, not_available: 2 };
  lounges.sort((a, b) => order[a.access.type] - order[b.access.type]);

  // Persona-specific ordering within included tier
  if (persona === 'premium') {
    // Centurion and First Lounge at top
    const premium = ['lounge-amex-centurion', 'lounge-sfo-intl-first'];
    lounges.sort((a, b) => {
      if (a.access.type === b.access.type) {
        const aP = premium.indexOf(a.id);
        const bP = premium.indexOf(b.id);
        if (aP >= 0 && bP < 0) return -1;
        if (aP < 0 && bP >= 0) return 1;
      }
      return 0;
    });
  } else if (persona === 'family') {
    // The Sanctuary at top for family
    lounges.sort((a, b) => {
      if (a.id === 'lounge-sanctuary-family') return -1;
      if (b.id === 'lounge-sanctuary-family') return 1;
      return order[a.access.type] - order[b.access.type];
    });
  } else if (persona === 'business') {
    // United Club prominent for business
    lounges.sort((a, b) => {
      if (a.id === 'lounge-united-club') return -1;
      if (b.id === 'lounge-united-club') return 1;
      return order[a.access.type] - order[b.access.type];
    });
  }

  return lounges;
}

/** Returns the count of accessible lounges for a persona */
export function getAccessibleCount(persona: PersonaType): number {
  return getLoungesForPersona(persona).filter((l) => l.access.type === 'included').length;
}

/** Returns the access summary reason for the persona */
export function getAccessReason(persona: PersonaType): string {
  switch (persona) {
    case 'premium':
      return 'United Gold Elite + Business Class + Amex Platinum';
    case 'business':
      return 'United Gold Elite member';
    case 'family':
      return 'Family travel pass holder';
  }
}
