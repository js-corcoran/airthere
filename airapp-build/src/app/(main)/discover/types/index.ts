import { PersonaType } from '@/lib/types/user';

export interface DiscoverDestination {
  id: string;
  city: string;
  country: string;
  region: DiscoverRegion;
  highlights: string[];
  priceFrom: number;
  imageGradient: string;
  persona: PersonaType[];
  tags: string[];
  rating: number;
  trendingRank?: number;
  dealBadge?: {
    discount: number;
    originalPrice: number;
    discountedPrice: number;
    expiresAt: Date;
  };
  personalizationReason?: string;
}

export interface DealAlert {
  id: string;
  route: { from: string; to: string; fromCity: string; toCity: string };
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  airline: string;
  cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
  departDate: string;
  returnDate?: string;
  expiresAt: Date;
  popularity: 'hot' | 'warm' | 'cool';
  persona: PersonaType[];
}

export interface TrendingRegion {
  id: string;
  name: string;
  heat: 'hot' | 'warm' | 'cool';
  destinations: TrendingDestinationSummary[];
  trendScore: number;
  searchVolume: number;
  icon: string;
}

export interface TrendingDestinationSummary {
  city: string;
  country: string;
  sentiment: 'rising' | 'stable' | 'falling';
  priceFrom: number;
  imageGradient: string;
}

export type DiscoverTab = 'recommended' | 'trending' | 'deals' | 'wishlist';

export type DiscoverRegion =
  | 'europe'
  | 'asia'
  | 'north-america'
  | 'south-america'
  | 'middle-east'
  | 'oceania'
  | 'africa';

export interface DiscoverFilters {
  budget: [number, number];
  regions: DiscoverRegion[];
  tags: string[];
}

export const DEFAULT_FILTERS: DiscoverFilters = {
  budget: [0, 10000],
  regions: [],
  tags: [],
};
