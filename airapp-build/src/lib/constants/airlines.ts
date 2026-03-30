import { Airline } from '@/lib/types/flight';

export const AIRLINES: Record<string, Airline> = {
  UA: { code: 'UA', name: 'United Airlines', logo: '/images/logos/united.svg' },
  AA: { code: 'AA', name: 'American Airlines', logo: '/images/logos/american.svg' },
  DL: { code: 'DL', name: 'Delta Air Lines', logo: '/images/logos/delta.svg' },
  BA: { code: 'BA', name: 'British Airways', logo: '/images/logos/ba.svg' },
  SQ: { code: 'SQ', name: 'Singapore Airlines', logo: '/images/logos/singapore.svg' },
  EK: { code: 'EK', name: 'Emirates', logo: '/images/logos/emirates.svg' },
  LH: { code: 'LH', name: 'Lufthansa', logo: '/images/logos/lufthansa.svg' },
  QF: { code: 'QF', name: 'Qantas', logo: '/images/logos/qantas.svg' },
  CX: { code: 'CX', name: 'Cathay Pacific', logo: '/images/logos/cathay.svg' },
  NH: { code: 'NH', name: 'ANA', logo: '/images/logos/ana.svg' },
  JL: { code: 'JL', name: 'Japan Airlines', logo: '/images/logos/jal.svg' },
  AF: { code: 'AF', name: 'Air France', logo: '/images/logos/airfrance.svg' },
  HA: { code: 'HA', name: 'Hawaiian Airlines', logo: '/images/logos/hawaiian.svg' },
  AS: { code: 'AS', name: 'Alaska Airlines', logo: '/images/logos/alaska.svg' },
  WN: { code: 'WN', name: 'Southwest Airlines', logo: '/images/logos/southwest.svg' },
};

export const AIRLINE_LIST = Object.values(AIRLINES);
