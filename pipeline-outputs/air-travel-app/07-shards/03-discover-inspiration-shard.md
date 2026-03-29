# Discover / Inspiration Feed — Build Shard
## AirThere | Screen SCR-003 | Shard 03

---

## 1. Screen Overview

**Screen ID:** SCR-003
**Screen Name:** Discover / Inspiration Feed
**Purpose:** AI-powered discovery interface showing personalized destination recommendations, trending destinations, deal alerts, and social inspiration. Users explore travel ideas, save destinations to wishlist, and discover trending travel experiences.

### Journey Role
SCR-003 is the dedicated discovery and inspiration screen accessible from the bottom tab bar. It's a secondary (P1) feature that amplifies engagement and discovery without blocking core booking flow. Separate from Home (SCR-002) to allow focused discovery experience without travel-day distraction.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/discover/page.tsx
```

### File Structure
```
src/
└── app/
    └── (main)/
        ├── discover/
        │   ├── page.tsx
        │   ├── components/
        │   │   ├── DiscoverHeader.tsx
        │   │   ├── DestinationCardFeed.tsx
        │   │   ├── DealAlertCard.tsx
        │   │   ├── TrendingMap.tsx
        │   │   ├── DiscoverFilter.tsx
        │   │   └── DiscoverLoadingSkeleton.tsx
        │   ├── hooks/
        │   │   ├── useDiscoverFeed.ts
        │   │   └── useTrendingDestinations.ts
        │   └── types/
        │       └── index.ts
        └── layout.tsx
```

### Layout Group
- **Group:** (main) — Main app with bottom tab bar
- **Shared Layout:** MainLayout

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-002 (Home):** User authenticated, trip data available
- **Mock Data Services:** destinationService, dealService, trendingService
- **Design System:** Colors, typography, spacing

### Shared Components Required
- `Button`, `Card`, `Skeleton` (Shadcn)
- `DestinationCard` (from SCR-002)
- `PullToRefresh`, `Carousel` (custom)

### Mock Data Requirements
- 100+ destination cards with realistic data
- Deal alerts with price drops, expirations
- Trending destinations by region
- User search history for personalization

---

## 4. Component Hierarchy

```
DiscoverPage
├── DiscoverHeader
│   ├── SearchBar (autocomplete for destinations)
│   ├── FilterButton (open filter sheet)
│   └── NotificationBell (deal alerts)
├── TabNavigation (Recommended, Trending, Deals, Wishlist)
├── MainContent (conditional tab content)
│   ├── RecommendedTab
│   │   ├── PersonalizedDestinationFeed
│   │   │   └── DestinationCard[] (infinite scroll)
│   │   └── MLRecommendationExplanation
│   ├── TrendingTab
│   │   ├── TrendingMap (heat map visualization)
│   │   └── DrilldownDestinationList
│   ├── DealsTab
│   │   ├── DealSortControl (by savings, expiration)
│   │   └── DealAlertCard[] (infinite scroll)
│   └── WishlistTab
│       └── SavedDestinationCard[] (grid or list)
└── FilterSheet (bottom sheet)
    ├── BudgetSlider
    ├── DateRangeSelector
    ├── RegionMultiselect
    └── ApplyFiltersButton
```

---

## 5. Component Specifications

### Component: DestinationCard (Extended from SCR-002)

**Additional Props:**
```typescript
interface DestinationCardProps {
  // ... existing props from SCR-002
  dealBadge?: {
    discount: number;
    originalPrice: number;
    discountedPrice: number;
    expiresAt: Date;
  };
  trendingBadge?: boolean;
  savingAmount?: number;
  personalizationExplanation?: string; // "Based on your interest in beaches"
}
```

**Tailwind Classes:**
```typescript
const dealBadgeStyle = 'absolute top-3 right-3 bg-warning-500 text-white px-2 py-1 rounded text-xs font-bold';
const trendingBadgeStyle = 'absolute top-3 left-3 bg-success-500 text-white px-2 py-1 rounded-full text-xs';
```

---

### Component: DealAlertCard

**Props Interface:**
```typescript
interface DealAlertCardProps {
  id: string;
  route: {from: string; to: string};
  originalPrice: number;
  discountedPrice: number;
  savingAmount: number;
  expiresAt: Date;
  popularity: 'hot' | 'warm' | 'cool';
  onSave?: () => void;
  onBook?: () => void;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'bg-white rounded-lg p-4 border-l-4 border-warning-500 shadow-sm mb-3',
  header: 'flex justify-between items-start mb-2',
  route: 'text-base font-semibold text-neutral-900',
  pricing: 'flex gap-4 mb-3',
  originalPrice: 'text-sm text-neutral-600 line-through',
  discountedPrice: 'text-lg font-bold text-success-500',
  saving: 'text-xs text-success-600 font-medium',
  expiration: 'text-xs text-warning-600 mb-3',
  buttons: 'flex gap-2',
};
```

---

### Component: TrendingMap

**Props Interface:**
```typescript
interface TrendingMapProps {
  regions: TrendingRegion[];
  onRegionSelect: (region: string) => void;
  selectedRegion?: string;
}

interface TrendingRegion {
  name: string;
  heat: 'hot' | 'warm' | 'cool'; // For color coding
  destinations: string[];
  trendScore: number;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  mapContainer: 'w-full h-96 bg-neutral-100 rounded-lg overflow-hidden relative',
  heatmapRegion: 'absolute cursor-pointer transition-all hover:opacity-80',
  regionHot: 'bg-red-500 opacity-60',
  regionWarm: 'bg-orange-500 opacity-50',
  regionCool: 'bg-blue-500 opacity-40',
  regionLabel: 'text-xs font-semibold text-white pointer-events-none',
};
```

---

## 6. Layout & Wireframe

### Tab Navigation

```
┌─────────────────────────────────────┐
│ Discover                            │
│ [Search box] [Filter] [🔔]          │
├─────────────────────────────────────┤
│ [Recommended] [Trending] [Deals] [Wishlist]  ← Tabs
├─────────────────────────────────────┤
│ [Tab Content - scrollable]          │
│                                     │
│ • Recommended: Personalized feed    │
│ • Trending: Heat map + drilldown    │
│ • Deals: Price-drop alerts          │
│ • Wishlist: Saved destinations      │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Tab Switching
- Tap tab to switch (animated transition)
- Preserve scroll position when returning to tab
- Tab indicator animated underline

### Filter Sheet
- Swipe down to dismiss
- Save filter selections
- "Reset filters" button

### Infinite Scroll
- Load more destinations as user scrolls
- Show loading skeleton while fetching

---

## 8. State Management

### Local Component State

```typescript
const [activeTab, setActiveTab] = useState('recommended');
const [destinations, setDestinations] = useState<Destination[]>([]);
const [deals, setDeals] = useState<DealAlert[]>([]);
const [trendingRegions, setTrendingRegions] = useState<TrendingRegion[]>([]);
const [savedDestinations, setSavedDestinations] = useState<string[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [filters, setFilters] = useState({
  budget: [0, 5000],
  dateRange: [Date.now(), Date.now() + 90 * 24 * 60 * 60 * 1000],
  regions: [],
});
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface DealAlert {
  id: string;
  route: { from: string; to: string };
  originalPrice: number;
  discountedPrice: number;
  airline?: string;
  flightNumber?: string;
  departDate: Date;
  returnDate?: Date;
  travelClass: 'economy' | 'premium';
  expiresAt: Date;
  savings: number;
}

export interface TrendingDestination {
  name: string;
  region: string;
  heat: 'hot' | 'warm' | 'cool';
  trendScore: number;
  searchVolume: number;
  sentiment: 'rising' | 'stable' | 'falling';
}
```

### Mock Data

```typescript
export function generateMockDeals(): DealAlert[] {
  return [
    {
      id: 'deal-001',
      route: { from: 'SFO', to: 'CDG' },
      originalPrice: 1200,
      discountedPrice: 850,
      airline: 'BA',
      departDate: new Date('2026-04-15'),
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
      savings: 350,
      travelClass: 'economy',
    },
    // ... more deals
  ];
}

export function generateMockTrendingDestinations(): TrendingRegion[] {
  return [
    {
      name: 'Europe',
      heat: 'hot',
      destinations: ['Paris', 'Barcelona', 'Venice', 'Amsterdam'],
      trendScore: 9.2,
    },
    // ... more regions
  ];
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")

**Recommended Tab:**
- Show luxury destinations (Paris, Tokyo, Maldives)
- Highlight: First-class availability, 5-star hotels
- Deal trigger: Discount below usual first-class price

**Trending Tab:**
- Show emerging luxury destinations
- "Exclusive experiences" emphasis

### PERSONA-02: Business ("Marcus")

**Recommended Tab:**
- Business hubs (NYC, London, Singapore)
- Highlight: Direct flights, lounge access
- Deal trigger: Business-class discounts

**Deals Tab:**
- Sort by: "Quick escapes" (weekend trips)
- Highlight: Connection efficiency

### PERSONA-03: Family ("Chen Family")

**Recommended Tab:**
- Family destinations (Orlando, Hawaii, Cancun)
- Highlight: Family activities, kids' friendly
- Price shown as: "Per family" (multi-person)

**Deals Tab:**
- Sort by: "Family package" deals
- Multi-child pricing emphasis

---

## 11. Accessibility Requirements

### ARIA Labels

**Tab Navigation:**
```html
<div role="tablist" aria-label="Discover tabs">
  <button role="tab" aria-selected="true" aria-controls="recommended-panel">
    Recommended
  </button>
</div>
<section id="recommended-panel" role="tabpanel" aria-labelledby="recommended-tab">
  {/* Content */}
</section>
```

**Trending Map:**
```html
<svg role="img" aria-label="World heat map of trending destinations">
  {/* SVG content */}
</svg>
```

---

## 12. Loading, Error & Empty States

### Skeleton Screen
```typescript
// Grid of skeleton cards
<div className="grid grid-cols-2 gap-4">
  {[1,2,3,4].map(i => (
    <div key={i} className="space-y-2">
      <div className="h-40 bg-neutral-200 rounded animate-pulse" />
      <div className="h-4 bg-neutral-200 rounded animate-pulse w-20" />
    </div>
  ))}
</div>
```

### Empty Wishlist State
```typescript
<div className="flex flex-col items-center justify-center py-16">
  <div className="text-4xl mb-4">❤️</div>
  <h3 className="font-semibold text-neutral-900 mb-2">No saved destinations</h3>
  <p className="text-sm text-neutral-600 mb-6">
    Tap the heart icon on any destination to save it for later
  </p>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium">
    Explore Destinations
  </button>
</div>
```

---

## 13. Edge Cases & Error Handling

- **No deals available:** Show "No deals right now" message with refresh button
- **Trending data unavailable:** Show alternative view (static destination list)
- **Filter produces zero results:** Show "No destinations match your filters" with reset option
- **Rapid tab switches:** Debounce data fetches (300ms)

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('DealAlertCard', () => {
  it('shows deal savings prominently', () => {
    const { getByText } = render(
      <DealAlertCard
        route={{from: 'SFO', to: 'LHR'}}
        originalPrice={1200}
        discountedPrice={850}
        savingAmount={350}
        {...props}
      />
    );
    expect(getByText('Save $350')).toBeInTheDocument();
  });

  it('shows expiration time', () => {
    const expiresIn3Hours = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const { getByText } = render(
      <DealAlertCard expiresAt={expiresIn3Hours} {...props} />
    );
    expect(getByText(/3 hours left/)).toBeInTheDocument();
  });
});

describe('TrendingMap', () => {
  it('renders regional heat map', () => {
    const regions = [
      { name: 'Europe', heat: 'hot', destinations: [], trendScore: 9 },
      { name: 'Asia', heat: 'warm', destinations: [], trendScore: 7 },
    ];
    const { container } = render(<TrendingMap regions={regions} />);
    expect(container.querySelector('[aria-label*="heat map"]')).toBeInTheDocument();
  });

  it('calls onRegionSelect when region clicked', async () => {
    const onRegionSelect = vi.fn();
    const { getByText } = render(
      <TrendingMap regions={[...]} onRegionSelect={onRegionSelect} />
    );
    await userEvent.click(getByText('Europe'));
    expect(onRegionSelect).toHaveBeenCalledWith('Europe');
  });
});
```

---

## 15. Build Checklist

- [ ] Tab navigation implemented
- [ ] Recommended feed personalized with ML
- [ ] Trending heat map visualization
- [ ] Deal alerts with expiration timers
- [ ] Wishlist persistence (localStorage)
- [ ] Filter sheet with controls
- [ ] Infinite scroll pagination
- [ ] Responsive design tested
- [ ] Accessibility audit passing
- [ ] Performance optimized (images lazy-loaded)
- [ ] All persona adaptations applied
- [ ] Error & empty states implemented
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 2-3 days
**Dependencies:** SCR-002 (Home) complete
**Priority:** P1 (engagement feature, non-blocking)
