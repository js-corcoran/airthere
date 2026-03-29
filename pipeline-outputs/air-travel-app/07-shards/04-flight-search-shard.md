# Flight Search / Multi-Modal Search — Build Shard
## AirThere | Screen SCR-004 | Shard 04

---

## 1. Screen Overview

**Screen ID:** SCR-004
**Screen Name:** Flight Search / Multi-Modal Search
**Purpose:** Primary flight search interface supporting five input modes: (1) traditional date/destination entry, (2) calendar view showing pricing heatmap, (3) destination + budget optimization, (4) conversational AI mode, (5) voice search. All modes return unified results.

### Journey Role
Core P0 feature. Entry point from Home or Discover tabs. Results flow to SCR-005 (Search Results).

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/search/page.tsx
```

### File Structure
```
src/
└── app/
    └── (main)/
        ├── search/
        │   ├── page.tsx
        │   ├── components/
        │   │   ├── SearchModeSelector.tsx     # Toggle between 5 modes
        │   │   ├── TraditionalSearchForm.tsx  # Mode 1: Date/destination
        │   │   ├── CalendarPricingView.tsx    # Mode 2: Calendar heatmap
        │   │   ├── BudgetOptimizer.tsx        # Mode 3: Budget search
        │   │   ├── ConversationalMode.tsx     # Mode 4: Chat interface
        │   │   ├── VoiceSearchButton.tsx      # Mode 5: Voice input
        │   │   ├── PassengerSelector.tsx      # Adult/child/infant count
        │   │   ├── CabinClassSelector.tsx     # Economy/Business/First
        │   │   ├── SearchSubmitButton.tsx
        │   │   └── SearchLoadingSkeleton.tsx
        │   ├── hooks/
        │   │   ├── useSearchForm.ts
        │   │   ├── useVoiceSearch.ts
        │   │   └── useSearchHistory.ts
        │   └── types/
        │       └── index.ts
        └── layout.tsx
```

### Layout Group
- **Group:** (main) — Main app with tab bar
- **Shared Layout:** MainLayout

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-002 or SCR-003:** User navigates to search from home/discover
- **Mock Data Services:** flightService.search()
- **Design System:** Tailwind colors, typography

### Shared Components Required
- `Button`, `Input`, `Select`, `Skeleton` (Shadcn)
- `AirportSelector` (autocomplete, custom)
- `DatePicker`, `Slider` (custom/Shadcn)
- `Keyboard` (mobile soft keyboard handling)

### Mock Data Requirements
- 50+ airports with IATA codes, names, time zones
- 200+ mock flight results for common routes
- Pricing heatmap data (90-day window)
- Search history for suggestions

---

## 4. Component Hierarchy

```
SearchPage
├── SearchHeader (sticky, with back button)
├── SearchModeSelector (tabs: Traditional, Calendar, Budget, Chat, Voice)
├── MainSearchForm (conditional based on selected mode)
│   ├── TraditionalSearchForm (Mode 1)
│   │   ├── AirportSelector (from)
│   │   ├── AirportSelector (to)
│   │   ├── DatePicker (departure)
│   │   ├── DatePicker (return, if round-trip)
│   │   ├── PassengerSelector
│   │   ├── CabinClassSelector
│   │   └── SearchButton
│   │
│   ├── CalendarPricingView (Mode 2)
│   │   ├── MonthSelector (← →)
│   │   ├── CalendarHeatmap (30-day grid)
│   │   │   ├── DayCell[30] (color-coded by price)
│   │   │   └── PriceTooltip (on hover)
│   │   └── SearchButton
│   │
│   ├── BudgetOptimizer (Mode 3)
│   │   ├── BudgetSlider ($0-$5000)
│   │   ├── DaysSlider (1-30 days)
│   │   ├── AirportSelector (from)
│   │   ├── OptimizeButton ("Find Best Deal")
│   │   └── ResultSuggestions (Top 3 destination suggestions)
│   │
│   ├── ConversationalMode (Mode 4)
│   │   ├── ChatHistory
│   │   ├── ChatInput (with suggestions)
│   │   └── VoiceButton (toggle)
│   │
│   └── VoiceSearchMode (Mode 5)
│       ├── RecordButton (animated mic)
│       ├── Transcript (real-time)
│       ├── PermissionRequest (if needed)
│       └── SearchButton
│
└── RecentSearches (suggested destinations/routes)
```

---

## 5. Component Specifications

### Component: TraditionalSearchForm

**Props Interface:**
```typescript
interface TraditionalSearchFormProps {
  initialFrom?: string;
  initialTo?: string;
  initialDates?: { departure: Date; return?: Date };
  initialPassengers?: { adults: number; children: number; infants: number };
  initialCabin?: 'economy' | 'premium' | 'business' | 'first';
  onSearch: (params: FlightSearchParams) => void;
}

interface FlightSearchParams {
  from: string; // IATA code
  to: string;
  departDate: Date;
  returnDate?: Date;
  passengers: { adults: number; children: number; infants: number };
  cabinClass: string;
  isRoundTrip: boolean;
}
```

**Internal State:**
```typescript
const {register, handleSubmit, watch, formState: {errors}} = useForm<FlightSearchParams>({
  defaultValues: {
    from: initialFrom || '',
    to: initialTo || '',
    passengers: initialPassengers || { adults: 1, children: 0, infants: 0 },
    cabinClass: initialCabin || 'economy',
  },
});

const [isRoundTrip, setIsRoundTrip] = useState(true);
const from = watch('from');
const to = watch('to');
```

**Tailwind Classes:**
```typescript
const styles = {
  form: 'space-y-4 px-4 py-6',
  formGroup: 'flex flex-col',
  label: 'text-sm font-medium text-neutral-900 mb-1',
  input: 'px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500',
  roundTripToggle: 'flex items-center gap-2 my-3',
  rowLayout: 'grid grid-cols-2 gap-3',
  searchButton: 'mt-6 py-3 bg-primary-500 text-white rounded-lg font-bold',
};
```

---

### Component: CalendarPricingView

**Props Interface:**
```typescript
interface CalendarPricingViewProps {
  from: string;
  to: string;
  startDate: Date;
  priceData: Record<string, number>; // YYYY-MM-DD → price
  onSelectDate: (date: Date) => void;
  onSearch: (params: FlightSearchParams) => void;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  calendar: 'mx-4 my-4 p-4 bg-white rounded-lg border border-neutral-200',
  monthHeader: 'flex justify-between items-center mb-4',
  monthTitle: 'text-lg font-semibold',
  monthNav: 'flex gap-2',
  dayGrid: 'grid grid-cols-7 gap-1',
  dayHeader: 'text-center text-xs font-bold text-neutral-600 py-2',
  dayCell: 'aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer',
  dayLow: 'bg-success-100 text-success-900',
  dayMedium: 'bg-warning-100 text-warning-900',
  dayHigh: 'bg-error-100 text-error-900',
};
```

---

### Component: AirportSelector

**Props Interface:**
```typescript
interface AirportSelectorProps {
  value: string;
  onChange: (airportCode: string) => void;
  placeholder?: string;
  excludeAirport?: string; // For from/to swap validation
}
```

**Internal State:**
```typescript
const [inputValue, setInputValue] = useState('');
const [suggestions, setSuggestions] = useState<Airport[]>([]);
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  if (inputValue.length >= 1) {
    const results = AIRPORTS.filter(a =>
      a.code.includes(inputValue.toUpperCase()) ||
      a.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(results);
  }
}, [inputValue]);
```

**Tailwind Classes:**
```typescript
const styles = {
  container: 'relative',
  input: 'px-4 py-2 border border-neutral-300 rounded-lg w-full',
  dropdown: 'absolute top-full left-0 right-0 bg-white border border-neutral-300 rounded-lg mt-1 shadow-lg z-50',
  dropdownItem: 'px-4 py-3 hover:bg-primary-50 cursor-pointer border-b border-neutral-200',
  dropdownItemSelected: 'bg-primary-100',
};
```

---

## 6. Layout & Wireframe

### Traditional Mode — Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Search            [Filter]        │ ← Header
├─────────────────────────────────────┤
│ [Traditional] [Calendar] [Budget]   │ ← Mode tabs
│ [Chat] [Voice]                      │
├─────────────────────────────────────┤
│                                     │
│ From *                              │
│ [San Francisco (SFO) ▼]             │ ← Dropdown
│                                     │
│ To *                                │
│ [London (LHR) ▼]                    │
│                                     │
│ ☐ Round Trip                        │ ← Toggle
│                                     │
│ Departure *                         │
│ [Mar 30, 2026 ▼]                    │
│                                     │
│ Return                              │
│ [Apr 6, 2026 ▼]                     │
│                                     │
│ Passengers                          │
│ [1 Adult, 0 Children ▼]             │
│                                     │
│ Cabin Class                         │
│ [Economy ▼]                         │
│                                     │
│ [Search Flights]                    │ ← CTA
│                                     │
└─────────────────────────────────────┘
```

### Calendar Mode — Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Search            [Filter]        │
├─────────────────────────────────────┤
│ [Traditional] [Calendar] [Budget]   │
├─────────────────────────────────────┤
│                                     │
│ San Francisco → London              │
│ March 2026          [← →]           │
│                                     │
│ │ S │ M │ T │ W │ T │ F │ S │      │
│ │   │   │   │   │   │  1│  2│      │
│ │  3│  4│  5│  6│  7│  8│  9│      │
│ │ 10│ 11│ 12│ 13│ 14│ 15│ 16│      │  ← Heatmap (green=cheap, red=expensive)
│ │ 17│ 18│ 19│ 20│ 21│ 22│ 23│      │
│ │ 24│ 25│ 26│ 27│ 28│ 29│ 30│      │
│ │ 31│   │   │   │   │   │   │      │
│                                     │
│ From $850 - To $2,500               │
│                                     │
│ [Search Flights]                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Airport Selector Autocomplete
- Type to filter
- Tap suggestion to select
- Show IATA code + city name
- MRU (Most Recently Used) section

### Date Picker
- Tap date field to open modal
- Calendar grid with selection
- Disable past dates
- Show minimum stay constraints

### Round Trip Toggle
- Tap checkbox to toggle
- When disabled, hide return date
- When enabled, show return date

### Mode Switching
- Tap mode tab to switch (preserve input)
- Smooth transition animation

### Voice Search
- Hold to record
- Show transcript in real-time
- Auto-detect flight parameters (destination, dates)

---

## 8. State Management

### Local Component State

```typescript
const [searchMode, setSearchMode] = useState('traditional');
const [isRoundTrip, setIsRoundTrip] = useState(true);
const [passengers, setPassengers] = useState({adults: 1, children: 0, infants: 0});
const [cabinClass, setCabinClass] = useState('economy');
const [isSearching, setIsSearching] = useState(false);
```

### URL State (for deep linking)

```typescript
// ?from=SFO&to=LHR&date=2026-03-30&returnDate=2026-04-06&passengers=1,0,0&cabin=economy
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface Airport {
  code: string;
  name: string;
  country: string;
  timezone: string;
  major: boolean;
}

export interface PricingData {
  [date: string]: number; // YYYY-MM-DD → price
}
```

### Mock Data

```typescript
export const AIRPORTS: Airport[] = [
  { code: 'SFO', name: 'San Francisco', country: 'US', timezone: 'America/Los_Angeles', major: true },
  { code: 'LHR', name: 'London Heathrow', country: 'UK', timezone: 'Europe/London', major: true },
  // ... 50+ more
];

export function generatePricingHeatmap(from: string, to: string): PricingData {
  const data: PricingData = {};
  let basePrice = 500 + Math.random() * 1000;
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const variance = Math.sin(i / 30) * 200 + Math.random() * 100;
    data[dateStr] = Math.round(basePrice + variance);
  }
  return data;
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Pre-fill: First/Business cabin
- Highlight: Direct flights, premium airlines
- Default mode: Traditional (fastest)

### PERSONA-02: Business ("Marcus")
- Pre-fill: Business cabin, shortest duration
- Highlight: 90-second completion messaging
- Default mode: Traditional + policy overlay

### PERSONA-03: Family ("Chen Family")
- Show: Multi-passenger pricing
- Highlight: Family seating availability
- Default mode: Traditional with family defaults

---

## 11. Accessibility Requirements

### ARIA Labels

**Airport Selector:**
```html
<input aria-label="Departure airport" aria-describedby="from-hint" />
<p id="from-hint">Enter airport code or city name</p>
```

**Mode Tabs:**
```html
<div role="tablist" aria-label="Search modes">
  <button role="tab" aria-selected="true">Traditional</button>
</div>
```

---

## 12. Loading, Error & Empty States

### Loading State
```typescript
<div className="space-y-4 px-4 py-6">
  {[1,2,3,4].map(i => (
    <div key={i} className="space-y-2">
      <div className="h-4 bg-neutral-200 rounded animate-pulse w-20" />
      <div className="h-10 bg-neutral-200 rounded animate-pulse" />
    </div>
  ))}
</div>
```

### Validation Error
```typescript
<span className="text-xs text-error-500 mt-1">
  Please select a different destination
</span>
```

---

## 13. Edge Cases & Error Handling

- **Same from/to airport:** Show validation error, prevent search
- **Past date selected:** Disable past dates in picker
- **Invalid IATA code:** Show "Airport not found" suggestion
- **Network timeout during search:** Show retry button
- **Voice permission denied:** Show fallback to text input
- **Microphone not available:** Hide voice mode entirely

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('TraditionalSearchForm', () => {
  it('validates from/to airports are different', async () => {
    const { getByText } = render(<TraditionalSearchForm />);
    await userEvent.type(getByLabelText(/From/), 'SFO');
    await userEvent.type(getByLabelText(/To/), 'SFO');
    await userEvent.click(getByText('Search'));
    expect(getByText(/different destination/)).toBeInTheDocument();
  });

  it('submits valid search params', async () => {
    const onSearch = vi.fn();
    const { getByText } = render(<TraditionalSearchForm onSearch={onSearch} />);
    // ... fill form
    await userEvent.click(getByText('Search'));
    expect(onSearch).toHaveBeenCalledWith(expect.objectContaining({
      from: 'SFO',
      to: 'LHR',
    }));
  });
});

describe('AirportSelector', () => {
  it('shows suggestions on input', async () => {
    const { getByRole } = render(<AirportSelector />);
    const input = getByRole('textbox');
    await userEvent.type(input, 'San');
    expect(getByText('San Francisco')).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] Five search modes implemented (Traditional, Calendar, Budget, Chat, Voice)
- [ ] Airport autocomplete working (50+ airports)
- [ ] Date pickers with heatmap pricing
- [ ] Passenger & cabin class selectors
- [ ] Form validation complete
- [ ] Search submission to SCR-005
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All persona adaptations applied
- [ ] Accessibility audit passing (ARIA labels, keyboard nav, focus management)
- [ ] Error handling & edge cases covered
- [ ] Loading states implemented
- [ ] Voice search integrated (if supported)
- [ ] URL state management for deep linking
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 3-4 days
**Dependencies:** SCR-002 complete
**Complexity:** High (5 modes, multiple validations)
**Next Milestone:** SCR-005 (Search Results) integration
