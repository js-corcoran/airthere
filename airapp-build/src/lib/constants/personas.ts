import { PersonaConfig } from '@/lib/types/user';

export const PERSONAS: PersonaConfig[] = [
  {
    id: 'premium',
    name: 'Premium Traveler',
    tagline: 'White-glove anticipatory service',
    description:
      'Invisible seamlessness for the discerning traveler. Biometric-first, autonomous management, and premium comfort at every touchpoint.',
    icon: '✦',
    features: [
      'Biometric seamless check-in',
      'Invisible automation & concierge',
      'Priority lounge access worldwide',
      'Personalized cabin preferences',
    ],
    accentColor: 'primary',
  },
  {
    id: 'business',
    name: 'Business Traveler',
    tagline: 'Speed, control, zero friction',
    description:
      'Sub-90-second booking, unified expense visibility, and auto disruption recovery. Every second of your time respected.',
    icon: '⚡',
    features: [
      'Sub-90-second booking flow',
      'Auto expense reconciliation',
      'Smart disruption recovery',
      'Policy compliance badges',
    ],
    accentColor: 'secondary',
  },
  {
    id: 'family',
    name: 'Family Traveler',
    tagline: 'Honest transparency, family first',
    description:
      'Total cost transparency, guaranteed family seating, shared itineraries, and coordinated group booking for stress-free family travel.',
    icon: '🏠',
    features: [
      'Total cost transparency upfront',
      'Guaranteed family seating together',
      'Shared trip planning & coordination',
      'Child-friendly content & activities',
    ],
    accentColor: 'success',
  },
];
