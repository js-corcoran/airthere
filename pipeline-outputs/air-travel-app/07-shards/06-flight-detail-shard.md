# Flight Detail / Seat Selection — Build Shard
## AirThere | Screen SCR-006 | Shard 06

---

## 1. Screen Overview

**Screen ID:** SCR-006
**Screen Name:** Flight Detail / Seat Selection
**Purpose:** Detailed flight information and interactive seat map for flight selection. Users view flight details, select seats (with family seating guarantee for families), view amenities, and prepare for checkout.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/booking/[flightId]/page.tsx
```

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-005 (Search Results):** User selects a flight
- **Mock Data Services:** flightService.getDetails(), seatService.getAvailableSeats()

### Shared Components Required
- `Button`, `Card`, `Select`, `Skeleton` (Shadcn)
- `SeatMap`, `SeatMapFamily` (custom)
- `BottomSheet` (seat selection)

### Mock Data Requirements
- Detailed flight info (aircraft type, meal service, WiFi, etc.)
- Seat availability (180+ seat configurations)
- Pricing for seat upgrades

---

## 4. Component Hierarchy

```
FlightDetailPage
├── FlightHeader (sticky)
│   ├── AirlineInfo (logo, flight #, aircraft)
│   ├── BackButton
│   └── ShareButton
├── FlightSummaryCard
│   ├── Route (SFO → LHR)
│   ├── Departure/arrival times
│   ├── Duration + stops
│   ├── Price (large, prominent)
│   └── BookingGuarantee (family guarantee badge)
├── MainContent (scrollable)
│   ├── FlightAmenitiesSection
│   │   ├── WiFi availability
│   │   ├── Meal service
│   │   ├── Entertainment
│   │   ├── Seat width
│   │   └── Power outlets
│   ├── SeatSelectionSection
│   │   ├── SeatMapToggle (cabin view or grid)
│   │   ├── SeatMap (interactive)
│   │   │   └── Seat[] (clickable, color-coded)
│   │   ├── SeatLegend (available, selected, unavailable)
│   │   ├── SeatPricing (upgrade costs shown on tap)
│   │   └── FamilyGroupingIndicator
│   └── FlightDetailsSection
│       ├── Equipment (B777, Airbus A350, etc.)
│       ├── Stops (nonstop or list of stops)
│       └── Restrictions ("bags included", "changes allowed")
├── PassengerSummary
│   └── PassengerCount (1 adult, 0 children)
└── ContinueButton (→ SCR-007 Booking)
```

---

## 5. Component Specifications

### Component: SeatMap

**Props Interface:**
```typescript
interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onSelectSeat: (seatNumber: string, cost: number) => void;
  onDeselectSeat: (seatNumber: string) => void;
  cabinLayout: CabinLayout; // B777, A350, etc.
  passengers: {count: number; types: ('adult'|'child'|'infant')[]};
  familyMode?: boolean;
}

interface Seat {
  number: string; // 1A, 1B, etc.
  available: boolean;
  row: number;
  column: string;
  type: 'standard' | 'extra-legroom' | 'window' | 'aisle';
  upgradeCost?: number;
  wheelchair?: boolean;
}

interface CabinLayout {
  rows: number;
  columns: string[];
  configuration: string; // "3-3-3" for B777
}
```

**Tailwind Classes:**
```typescript
const styles = {
  map: 'grid gap-2 p-4 bg-neutral-50 rounded-lg overflow-x-auto',
  row: 'flex gap-4 justify-center',
  seat: 'w-8 h-8 flex items-center justify-center rounded text-xs font-semibold cursor-pointer transition-all',
  seatAvailable: 'bg-neutral-100 border border-neutral-300 text-neutral-900 hover:bg-primary-100',
  seatSelected: 'bg-primary-500 text-white border border-primary-600',
  seatUnavailable: 'bg-neutral-300 text-neutral-600 cursor-not-allowed opacity-50',
  seatExtraLegroom: 'ring-2 ring-secondary-500',
  seatLabel: 'flex items-center justify-center font-bold',
};
```

---

### Component: SeatMapFamily (Specialized)

**Props Interface:**
```typescript
interface SeatMapFamilyProps {
  // ... extends SeatMapProps
  familyMembers: {id: string; name: string; age: number}[];
  guaranteeAdjacentSeating?: boolean;
  onFamilyGroupSelect: (seatGroup: string[]) => void;
}
```

**Logic:**
- When 4 seats selected for family of 4, check adjacency
- Highlight valid groupings (2x2, 1x4, or two rows of 2)
- Show visual confirmation: "Family seating secured ✓"

---

### Component: FlightAmenitiesSection

**Props Interface:**
```typescript
interface FlightAmenitiesSectionProps {
  amenities: {
    wifi: 'available' | 'premium' | 'unavailable';
    meal: 'full' | 'snack' | 'none';
    entertainment: 'seatback' | 'streaming' | 'none';
    seatWidth: number; // inches
    aisle: 'full' | 'narrow';
    powerOutlets: 'all' | 'aisle' | 'none';
  };
  cabinClass: string;
}
```

---

## 6. Layout & Wireframe

### Desktop Seat Map View

```
┌─────────────────────────────────────────────────────┐
│ ← United UA 901        B777-300         [Share]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ San Francisco → London                              │
│ 11:00 AM → 8:45 AM +1  |  10h 45m  |  Nonstop     │
│                                                     │
│ Price: $850                                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Amenities:                                          │
│ 🌐 WiFi (Premium)   |   🍽️ Full meal   |  🎬 IFE  │
│ 18" Seat width      |   Aisle power     |          │
├─────────────────────────────────────────────────────┤
│ Select Your Seat:                                   │
│                                                     │
│  [1] A   B   C   |   D   E   F   [1]               │
│  [2] A   B   C   |   D   E   F   [2]               │
│  [3] A   B   C   |   D   E   F   [3]               │
│  ... (30 rows)                                      │
│                                                     │
│ ◼ Available  ◼ Selected  ◼ Unavailable  ◼ +$50     │
├─────────────────────────────────────────────────────┤
│ Equipment: Boeing 777-300                           │
│ Stops: Nonstop                                      │
│ Baggage: 1 checked bag included                     │
│                                                     │
│ Passenger: 1 adult                                  │
│                                                     │
│ [Continue to Checkout] →                           │
└─────────────────────────────────────────────────────┘
```

### Mobile Seat Map (Scrollable)

```
┌──────────────────────────┐
│ ← United UA 901   [Share]│
├──────────────────────────┤
│ SFO → LHR   $850         │
│ 11:00 AM → 8:45 AM      │
│ 10h 45m | Nonstop       │
├──────────────────────────┤
│ Select Your Seat:        │
│                          │
│ Seat Map (scrollable)    │
│ A B C | D E F            │
│ A B C | D E F            │
│ ... (rows 1-30)          │
│                          │
│ Legend:                  │
│ ◼ Available              │
│ ◼ Selected               │
│ ◼ Unavailable            │
├──────────────────────────┤
│ [Continue]               │
└──────────────────────────┘
```

---

## 7. Interaction Patterns

### Seat Selection
- Tap seat → Highlight (visual feedback)
- Show seat price (if upgrade required)
- Confirm selection in toast or modal
- Multiple selections for families (group mode)

### Family Seating Guarantee
- Automatically group adjacent seats
- Show "Family seating confirmed" badge
- Lock grouping (prevent re-arrangement)

### Seat Type Indicators
- Extra legroom: Ring around seat number
- Wheelchair accessible: WC icon
- Window/Aisle: Slight color variation

### Upgrades
- Tap premium seat → Show upgrade cost
- Tap checkbox to add upgrade
- Update total price in header

---

## 8. State Management

### Local Component State

```typescript
const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
const [seatUpgrades, setSeatUpgrades] = useState<Record<string, number>>({});
const [familyGroupVerified, setFamilyGroupVerified] = useState(false);
const [totalSeatPrice, setTotalSeatPrice] = useState(baseFare);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface CabinConfiguration {
  aircraftType: string;
  rows: number;
  columns: ['A', 'B', 'C', 'D', 'E', 'F']; // 6-seat width
  seats: Seat[];
}

export interface FlightDetails extends Flight {
  aircraft: string;
  amenities: Amenities;
  cabinConfiguration: CabinConfiguration;
  rules: {
    bagAllowance: string;
    changeAllowed: boolean;
    refundable: boolean;
  };
}
```

### Mock Data

```typescript
export function generateMockCabinConfig(aircraftType: string): CabinConfiguration {
  const configs = {
    'B777': { rows: 30, columns: ['A', 'B', 'C', 'D', 'E', 'F'], pattern: '3-3-3' },
    'A350': { rows: 32, columns: ['A', 'B', 'C', 'D', 'E', 'F'], pattern: '3-3-3' },
  };
  const config = configs[aircraftType as keyof typeof configs] || configs['B777'];

  const seats: Seat[] = [];
  for (let row = 1; row <= config.rows; row++) {
    for (const col of config.columns) {
      seats.push({
        number: `${row}${col}`,
        available: Math.random() > 0.2, // 80% available
        row,
        column: col,
        type: row <= 4 ? 'extra-legroom' : 'standard',
        upgradeCost: row <= 4 ? 50 : 0,
      });
    }
  }
  return { aircraftType, ...config, seats };
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Default: Window seat, premium cabin suggested
- Extra legroom: Auto-suggested, no additional cost messaging

### PERSONA-02: Business ("Marcus")
- Default: Aisle seat for easy access, exit row if available
- Show: Work desk availability for seats

### PERSONA-03: Family ("Chen Family")
- Emphasis: Family seating guarantee, seats together
- Child-specific: Show bathrooms near family seats
- Default: Center seats for easier supervision

---

## 11. Accessibility Requirements

### ARIA Labels

**Seat Map:**
```html
<section role="main" aria-label="Seat selection">
  <div role="grid" aria-label="Aircraft cabin seating">
    <button aria-label="Seat 1A, available, $0" role="gridcell">1A</button>
  </div>
</section>
```

---

## 12. Loading, Error & Empty States

### Loading
```typescript
<div className="h-96 bg-neutral-100 rounded-lg animate-pulse" />
```

### Seat Load Failure
```typescript
<div className="text-center py-8">
  <h3 className="font-semibold text-neutral-900 mb-2">Unable to Load Seat Map</h3>
  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">Retry</button>
</div>
```

---

## 13. Edge Cases & Error Handling

- **Family can't be seated together:** Show "No adjacent seats available" + alternative suggestions
- **Seat sold out:** Disable seat, show "This seat is no longer available"
- **Child seat restrictions:** Some airlines restrict children in exit rows—show warning
- **Wheelchair accessibility:** Show only accessible seats if needed

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('SeatMap', () => {
  it('selects seat on click', async () => {
    const onSelectSeat = vi.fn();
    const { getByText } = render(
      <SeatMap seats={mockSeats} onSelectSeat={onSelectSeat} {...props} />
    );
    await userEvent.click(getByText('1A'));
    expect(onSelectSeat).toHaveBeenCalledWith('1A', 0);
  });

  it('prevents selection of unavailable seats', async () => {
    const onSelectSeat = vi.fn();
    const { getByText } = render(
      <SeatMap seats={[{...mockSeat, number: '1A', available: false}]} {...props} />
    );
    const unavailableSeat = getByText('1A').closest('button');
    expect(unavailableSeat).toHaveAttribute('disabled');
  });
});

describe('SeatMapFamily', () => {
  it('validates adjacent seating for families', async () => {
    const onFamilyGroupSelect = vi.fn();
    const { getByText } = render(
      <SeatMapFamily
        familyMembers={[{id: '1', name: 'Parent', age: 40}, {id: '2', name: 'Child', age: 8}]}
        {...props}
      />
    );
    // Select seats 1A, 1B (adjacent)
    await userEvent.click(getByText('1A'));
    await userEvent.click(getByText('1B'));
    // Should confirm adjacent seating
    expect(getByText('Family seating confirmed')).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] Flight detail display (airline, times, duration)
- [ ] Interactive seat map with 180+ seat rendering
- [ ] Seat selection logic (single/multiple)
- [ ] Family seating grouping validation
- [ ] Seat upgrade pricing and selection
- [ ] Amenities display section
- [ ] Responsive seat map (mobile scrollable)
- [ ] All persona adaptations applied
- [ ] Accessibility audit passing
- [ ] Loading & error states
- [ ] Unit tests for seat selection
- [ ] Family seating tests
- [ ] Integration with SCR-007 checkout

---

**Estimated Build Time:** 3-4 days
**Dependencies:** SCR-005 complete
**Complexity:** Very High (seat map rendering, family logic)
