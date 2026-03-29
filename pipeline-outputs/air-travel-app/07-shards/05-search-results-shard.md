# Search Results / Fare Explorer — Build Shard
## AirThere | Screen SCR-005 | Shard 05

---

## 1. Screen Overview

**Screen ID:** SCR-005
**Screen Name:** Search Results / Fare Explorer
**Purpose:** Display flight search results with interactive sorting, filtering, and fare comparison. Users can view prices across dates, filter by airline/duration/stops, and compare multiple flight options before selecting.

### Journey Role
Immediately after SCR-004 (Flight Search). Results flow to SCR-006 (Flight Detail / Seat Selection). P0 priority—core booking flow.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/search/results/page.tsx
```

### File Structure
```
src/
└── app/
    └── (main)/
        ├── search/
        │   └── results/
        │       ├── page.tsx
        │       ├── components/
        │       │   ├── SearchResultsHeader.tsx
        │       │   ├── SortControl.tsx
        │       │   ├── FilterPanel.tsx
        │       │   ├── FlightCard.tsx
        │       │   ├── FlightCardCompact.tsx
        │       │   ├── FareComparisonGrid.tsx
        │       │   ├── FlexibleDateBar.tsx
        │       │   └── ResultsLoadingSkeleton.tsx
        │       ├── hooks/
        │       │   ├── useFlightFilters.ts
        │       │   └── useFareComparison.ts
        │       └── types/
        │           └── index.ts
        └── layout.tsx
```

### Layout Group
- **Group:** (main)

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-004 (Flight Search):** User provides search params
- **Mock Data Services:** flightService.search()
- **Design System:** Colors, typography

### Shared Components Required
- `Button`, `Card`, `Skeleton`, `Badge` (Shadcn)
- `Slider` (price/duration filters, custom)
- `Checkbox` (airline, stops filters, Shadcn)

### Mock Data Requirements
- 15-20 realistic flight results per search
- Pricing heatmap for flexible date comparison
- Airline logos, flight times, connections

---

## 4. Component Hierarchy

```
SearchResultsPage
├── SearchResultsHeader (sticky)
│   ├── SummaryText ("15 flights found for SFO → LHR, Mar 30")
│   ├── BackButton
│   └── NewSearchButton
├── FlexibleDateBar (sticky, below header)
│   └── DayShifts (← [Dep Date] →, ±3 days)
├── MainContent
│   ├── SortControl (top, sticky)
│   │   └── Tabs: Price, Duration, Departure, Arrival, Custom score
│   ├── FilterPanel (collapsible or side-panel)
│   │   ├── PriceSlider ($0-$5000)
│   │   ├── DurationSlider (0-20 hours)
│   │   ├── StopsFilter (Nonstop, 1 stop, 2+ stops)
│   │   ├── AirlineCheckboxes
│   │   ├── TimeOfDayFilter
│   │   └── ApplyFiltersButton
│   └── FlightResults
│       └── FlightCard[] (infinite scroll)
│           ├── Airline + flight number
│           ├── Departure/arrival times
│           ├── Duration + stops
│           ├── Price (prominent, large font)
│           ├── Amenities (wifi, meals)
│           ├── Deal badge (if applicable)
│           └── SelectButton
└── FareComparisonView (alternative layout, toggle in header)
    └── FareComparisonGrid (date × airline matrix)
```

---

## 5. Component Specifications

### Component: FlightCard

**Props Interface:**
```typescript
interface FlightCardProps {
  flight: Flight;
  isSelected?: boolean;
  onSelect: (flightId: string) => void;
  dealBadge?: { discount: number; originalPrice: number };
  showAnimation?: boolean;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer mb-3',
  cardSelected: 'border-primary-500 bg-primary-50 shadow-md',
  header: 'flex justify-between items-start mb-3',
  airline: 'text-sm font-semibold text-neutral-900',
  price: 'text-2xl font-bold text-primary-600',
  timeRow: 'flex justify-between items-center mb-2',
  time: 'text-lg font-semibold text-neutral-900',
  timeAirport: 'text-xs text-neutral-600',
  duration: 'text-sm text-neutral-600 text-center',
  stops: 'text-sm font-medium text-warning-600',
  amenities: 'flex gap-2 mt-2 text-xs text-neutral-600',
  dealBadge: 'absolute top-3 right-3 bg-success-500 text-white px-2 py-1 rounded text-xs font-bold',
};
```

---

### Component: SortControl

**Props Interface:**
```typescript
interface SortControlProps {
  sortBy: 'price' | 'duration' | 'departure' | 'arrival' | 'custom';
  onSortChange: (sortBy: string) => void;
  totalResults: number;
}
```

---

### Component: FilterPanel

**Props Interface:**
```typescript
interface FilterPanelProps {
  filters: FlightFilters;
  onFiltersChange: (filters: FlightFilters) => void;
  availableAirlines: string[];
}

interface FlightFilters {
  priceRange: [number, number];
  durationRange: [number, number];
  stops: ('nonstop' | '1-stop' | '2+-stop')[];
  airlines: string[];
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[];
}
```

---

## 6. Layout & Wireframe

### List View — Mobile Layout

```
┌─────────────────────────────────────┐
│ ← 15 flights          [Grid/List]   │ ← Header
│ SFO → LHR, Mar 30                   │
├─────────────────────────────────────┤
│ ← [Mar 29] [Mar 30] [Mar 31] [Apr1]→│ ← Flexible date
├─────────────────────────────────────┤
│ Sort by:                            │
│ [Price ▼] [Duration] [Departure]    │ ← Tabs
│ [Arrival] [Custom]                  │
│                                     │
│ [Filter] (opens bottom sheet)       │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ United UA 901              $850 │ │  ← FlightCard 1
│ │                                 │ │
│ │ 11:00 AM  → 8:45 AM (+1)       │ │
│ │ SFO          LHR                │ │
│ │ 10h 45m    |    Nonstop        │ │
│ │                                 │ │
│ │ 🌐 WiFi   🍽️  Meals            │ │
│ │             [Select] →          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ British Airways BA 112    $920  │ │  ← FlightCard 2
│ │ (Save $50) [Badge: Deal]         │ │
│ │ ... [Similar structure]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Load More Flights] ↓ (infinite)    │
│                                     │
└─────────────────────────────────────┘
```

### Grid View (Fare Comparison) — Tablet Layout

```
┌─────────────────────────────────────────────────────┐
│ ← 15 flights          [List/Grid] [Download CSV]   │
├─────────────────────────────────────────────────────┤
│ Fares for SFO → LHR (March 2026)                   │
│                                                   │
│     │ United │ BA │ American │ Lufthansa │ Total  │
│─────┼────────┼────┼──────────┼───────────┼────────│
│ Mar │ $850   │$920│  $980    │   $1100   │ 4 opts │
│ 29  │ (1stop)│(2) │  (1)     │   (1)     │        │
│─────┼────────┼────┼──────────┼───────────┼────────│
│ Mar │ $890   │$850│  $1020   │   $980    │ 5 opts │
│ 30  │ (non)  │(1) │  (non)   │   (1)     │ ← Best│
│─────┼────────┼────┼──────────┼───────────┼────────│
│ Mar │ $920   │$950│  $1100   │   $1050   │ 4 opts │
│ 31  │ (1)    │(2) │  (1)     │   (1)     │        │
│─────┼────────┼────┼──────────┼───────────┼────────│
```

---

## 7. Interaction Patterns

### Sort by Selection
- Tap sort tab → Re-sort results in real-time
- Smooth animation (fade-out, re-order, fade-in)
- Indicate ascending/descending with arrow icon

### Filter Sheet
- Swipe up to open full filter panel
- Sliders update in real-time or on "Apply"
- Checkboxes toggle instantly
- "Reset filters" button clears all

### Flight Card Selection
- Tap card → Navigate to SCR-006 (Flight Detail)
- Visual feedback: highlight on tap
- Show seat map preview (optional)

### Flexible Date Navigation
- Tap date to jump to that date's results
- Swipe left/right to shift date window
- Show price change indicator (↑/↓)

---

## 8. State Management

### Local Component State

```typescript
const [sortBy, setSortBy] = useState('price');
const [filters, setFilters] = useState<FlightFilters>({
  priceRange: [0, 5000],
  durationRange: [0, 24],
  stops: ['nonstop', '1-stop', '2+-stop'],
  airlines: [],
  timeOfDay: [],
});
const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
const [viewMode, setViewMode] = useState('list'); // or 'grid'
const [isFilterOpen, setIsFilterOpen] = useState(false);
```

### URL State

```typescript
// ?sort=price&priceMin=0&priceMax=2000&stops=nonstop,1-stop
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface SearchResults {
  query: FlightSearchParams;
  flights: Flight[];
  meta: {
    totalResults: number;
    executionTimeMs: number;
    currency: string;
  };
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // minutes
  stops: number;
  stopCities?: string[];
  basePrice: number;
  totalPrice: number;
  seats: {available: number; sold: number};
  cabinClasses: CabinClass[];
  amenities: string[];
}
```

### Mock Data

```typescript
export function generateMockSearchResults(
  from: string,
  to: string,
  departDate: Date
): SearchResults {
  return {
    query: { from, to, departDate, passengers: {adults: 1, children: 0, infants: 0}, cabinClass: 'economy', isRoundTrip: false },
    flights: Array.from({length: 18}, (_, i) => ({
      id: `FL-${i}`,
      airline: AIRLINES[i % AIRLINES.length].code,
      flightNumber: `${AIRLINES[i % AIRLINES.length].code}${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
      departureTime: new Date(departDate.getTime() + (6 + (i % 18)) * 60 * 60 * 1000),
      arrivalTime: new Date(departDate.getTime() + (6 + (i % 18) + 300 + Math.random() * 600) * 60 * 1000),
      duration: 300 + Math.random() * 600,
      stops: i < 6 ? 0 : i < 12 ? 1 : 2,
      basePrice: 400 + Math.random() * 3600,
      totalPrice: 400 + Math.random() * 3600,
      seats: {available: Math.floor(Math.random() * 100) + 10, sold: Math.floor(Math.random() * 50)},
      cabinClasses: ['economy', 'premium-economy', 'business'],
      amenities: ['wifi', 'meals', 'entertainment'],
    })),
    meta: {
      totalResults: 18,
      executionTimeMs: 245,
      currency: 'USD',
    },
  };
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Default sort: Price (premium options first)
- Filter suggestions: First/Business class only
- Highlight: Nonstop flights, business amenities

### PERSONA-02: Business ("Marcus")
- Default sort: Duration (shortest first)
- Filter suggestions: Nonstop, during business hours
- Highlight: Connection time adequacy, lounge access

### PERSONA-03: Family ("Chen Family")
- Default sort: Price
- Filter suggestions: Multi-passenger pricing
- Highlight: Family seating availability, flight times (avoid red-eyes)

---

## 11. Accessibility Requirements

### ARIA Labels

**Sort Tabs:**
```html
<div role="tablist" aria-label="Sort flight results">
  <button role="tab" aria-selected="true">Price</button>
</div>
```

**Flight Result:**
```html
<article aria-label="United UA 901, 11:00 AM departure, $850, nonstop">
  {/* Card */}
</article>
```

---

## 12. Loading, Error & Empty States

### Skeleton Screen
```typescript
<div className="space-y-3">
  {[1,2,3,4,5].map(i => (
    <div key={i} className="p-4 bg-neutral-100 rounded-lg animate-pulse h-32" />
  ))}
</div>
```

### No Results
```typescript
<div className="text-center py-16">
  <div className="text-4xl mb-4">✈️</div>
  <h3 className="font-semibold text-neutral-900 mb-2">No flights found</h3>
  <p className="text-sm text-neutral-600 mb-6">Try adjusting your search or dates</p>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg">
    New Search
  </button>
</div>
```

---

## 13. Edge Cases & Error Handling

- **0 results after filtering:** Show "No flights match your filters" with reset button
- **Network timeout:** Show "Search timed out" with retry button
- **Search params changed mid-results:** Clear results, show new search message
- **Rapid sort changes:** Debounce (300ms) before re-sorting
- **Filter range invalid:** Reset to valid range (show error toast)

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('FlightCard', () => {
  it('displays flight info correctly', () => {
    const { getByText } = render(
      <FlightCard flight={{
        flightNumber: 'UA 901',
        departureTime: new Date('2026-03-30T11:00'),
        arrivalTime: new Date('2026-03-31T08:45'),
        duration: 645,
        stops: 0,
        totalPrice: 850,
        ...otherProps
      }} />
    );
    expect(getByText('UA 901')).toBeInTheDocument();
    expect(getByText('$850')).toBeInTheDocument();
  });

  it('calls onSelect when tapped', async () => {
    const onSelect = vi.fn();
    const { container } = render(<FlightCard onSelect={onSelect} {...props} />);
    await userEvent.click(container.querySelector('article')!);
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('SortControl', () => {
  it('changes sort order on tab click', async () => {
    const onSortChange = vi.fn();
    const { getByText } = render(<SortControl onSortChange={onSortChange} {...props} />);
    await userEvent.click(getByText('Duration'));
    expect(onSortChange).toHaveBeenCalledWith('duration');
  });
});
```

---

## 15. Build Checklist

- [ ] Flight card display with all info
- [ ] Sort controls (5 sort options)
- [ ] Filter panel with sliders/checkboxes
- [ ] Infinite scroll pagination
- [ ] Flexible date navigation
- [ ] Grid/list view toggle (fare comparison)
- [ ] Responsive design tested
- [ ] All persona adaptations applied
- [ ] Accessibility audit passing
- [ ] Loading & error states
- [ ] URL state management
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 3-4 days
**Dependencies:** SCR-004 complete
**Complexity:** High (sorting, filtering, infinite scroll)
