# Airport Live — Build Shard
## AirThere | Screen SCR-010 | Shard 10

---

## 1. Screen Overview

**Screen ID:** SCR-010
**Screen Name:** Airport Live
**Purpose:** Real-time airport experience dashboard showing flight status, gate info, security queue times, lounge access, wayfinding, and biometric check-in capabilities. Accessible on travel day or with active trip.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/airport/page.tsx
(main)/airport/[airportCode]/page.tsx
```

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-008 (Trip Dashboard):** Access airport live from trip detail
- **SCR-002 (Home - Travel Day):** Quick link to airport live

### Shared Components Required
- `Button`, `Card`, `Skeleton`, `Badge` (Shadcn)
- `Map` component (SVG-based airport wayfinding)
- `LiveStatusUpdater` (real-time polling)

### Mock Data Requirements
- Gate assignments (real-time updates)
- Security queue times (by checkpoint)
- Lounge availability (hours, amenities)
- Airport terminal maps (wayfinding)
- Flight status (on-time, delayed, cancelled)

---

## 4. Component Hierarchy

```
AirportLivePage
├── AirportHeader
│   ├── AirportName (SFO, LAX, LHR, etc.)
│   ├── CurrentTime (real-time)
│   └── TemperatureWeather
├── TabNavigation (Flight, Wayfinding, Lounges, Biometric)
├── MainContent (tab-based)
│   ├── FlightStatusTab
│   │   ├── YourFlightCard (large, prominent)
│   │   │   ├── FlightNumber + Status
│   │   │   ├── Gate + Terminal
│   │   │   ├── DepartureCountdown
│   │   │   ├── Boarding status
│   │   │   └── AlternateGateWarning (if changed)
│   │   ├── AlertsSection
│   │   │   └── Alert[] (security queue, weather, etc.)
│   │   ├── RecentFlightsSection (nearby departures)
│   │   └── OtherFlightsSearch
│   │
│   ├── WayfindingTab
│   │   ├── DestinationSelector (gate, lounge, bathroom, etc.)
│   │   ├── AirportMap (SVG, interactive)
│   │   │   └── UserLocation + Directions
│   │   ├── TurnsDirections (if navigating)
│   │   └── DistanceETA
│   │
│   ├── LoungesTab
│   │   ├── LoungeBrowser[] (accessible lounges)
│   │   │   ├── LoungeCard
│   │   │   ├── Name + Hours
│   │   │   ├── Amenities (WiFi, food, shower)
│   │   │   ├── QueueTime
│   │   │   ├── AccessStatus ("You have access via BA Gold")
│   │   │   └── DirectionsButton
│   │   └── LoungeFinder (full directory)
│   │
│   └── BiometricTab
│       ├── BiometricCheckInFlow
│       │   ├── Instructions
│       │   ├── CameraView (face capture)
│       │   ├── SuccessIndicator
│       │   └── DigitalBoardingPass
│       └── ManualCheckInFallback (if biometric fails)
│
└── FloatingActionButton
    └── QuickActions (biometric, boarding pass, directions to gate)
```

---

## 5. Component Specifications

### Component: FlightStatusCard

**Props Interface:**
```typescript
interface FlightStatusCardProps {
  flight: Flight;
  gateInfo: GateInfo;
  boardingStatus: 'not-started' | 'boarding' | 'completed' | 'departed';
  departureCountdown: {hours: number; minutes: number; seconds: number};
  alerts: Alert[];
  onBoardingPassTap?: () => void;
}

interface GateInfo {
  number: string;
  terminal: string;
  boardingStartTime: Date;
  boardingGroups: string[];
  currentBoardingGroup: string;
  boardingProgress: number; // 0-100%
}
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border-2 border-primary-300 mb-4',
  header: 'flex justify-between items-start mb-4',
  flightNumber: 'text-2xl font-bold text-primary-900',
  status: 'px-3 py-1 rounded-full text-xs font-bold text-white',
  statusOnTime: 'bg-success-500',
  statusBoarding: 'bg-primary-500 animate-pulse',
  statusDelayed: 'bg-warning-500',
  countdown: 'text-center my-4',
  countdownNumber: 'text-4xl font-bold text-primary-900',
  countdownLabel: 'text-sm text-primary-700 mt-2',
  gateInfo: 'flex justify-between items-center py-3 border-t border-primary-200',
  gateNumber: 'text-lg font-semibold',
  boardingProgress: 'h-2 bg-primary-200 rounded-full overflow-hidden',
};
```

---

### Component: AirportWayfindingMap

**Props Interface:**
```typescript
interface AirportWayfindingMapProps {
  airport: Airport;
  userLocation?: {x: number; y: number};
  destination?: {type: string; location: {x: number; y: number}};
  showDirections?: boolean;
}
```

---

### Component: LoungeBrowser

**Props Interface:**
```typescript
interface LoungeBrowserProps {
  lounges: Lounge[];
  userAccessibleLounges: string[]; // lounge IDs user has access to
  onSelectLounge: (loungeId: string) => void;
}

interface Lounge {
  id: string;
  name: string;
  hours: {open: string; close: string};
  amenities: string[];
  queueTime: number; // minutes
  capacity: {current: number; max: number};
  location: {terminal: string; gate: string};
  accessLevel: 'free' | 'paid' | 'membership' | 'elite';
}
```

---

## 6. Layout & Wireframe

### Flight Status Tab — Mobile (Travel Day)

```
┌──────────────────────────────────────┐
│ San Francisco (SFO)        71°F 🌤️  │
├──────────────────────────────────────┤
│ [Flight] [Wayfinding] [Lounges] [Bio]│
├──────────────────────────────────────┤
│                                      │
│ ┌────────────────────────────────┐  │
│ │ United UA 901          ON TIME │  │
│ │                                │  │
│ │ Gate: C15 | Terminal 3         │  │
│ │                                │  │
│ │ Depart in:                     │  │
│ │    3h 22m                      │  │
│ │       Boarding Starts 10:30 AM │  │
│ │                                │  │
│ │ Boarding: Group 3/5 (50%)      │  │
│ │ ▓▓▓▓░░░░░░░░░░░░               │  │
│ │                                │  │
│ │ [View Boarding Pass]           │  │
│ └────────────────────────────────┘  │
│                                      │
│ Alerts & Updates                     │
│ • Gate changed from C10 to C15       │
│ • Security: 45 min wait at T3        │
│ • WiFi: Download updated boarding pass │
│                                      │
│ Other Nearby Flights                │
│ • American AA 214 to LAX (Gate C18) │
│ • Southwest WN 521 to Denver (D5)   │
│                                      │
└──────────────────────────────────────┘
```

### Wayfinding Tab — Mobile

```
┌──────────────────────────────────────┐
│ Where to?         [I'm at Security] │
│ [Search: Gate, Lounge, Bathroom...] │
├──────────────────────────────────────┤
│                                      │
│ [Airport Map SVG - Interactive]     │
│                                      │
│ • Your location (blue dot)          │
│ • Gate C15 destination (red)        │
│ • Route highlighted in blue         │
│                                      │
│ Directions:                          │
│ 1. Continue straight                │
│ 2. Turn right toward Concourse C    │
│ 3. Gate C15 on your left            │
│                                      │
│ Distance: 250m | Time: 3 min        │
│ [Biometric Check-In Ready!]         │
│                                      │
└──────────────────────────────────────┘
```

### Lounges Tab — Mobile

```
┌──────────────────────────────────────┐
│ Lounges at SFO                       │
│ You have access to 2 lounges        │
├──────────────────────────────────────┤
│                                      │
│ ┌────────────────────────────────┐  │
│ │ ✓ United Club Plus            │  │
│ │ Terminal 3, Gate C15 (50m)     │  │
│ │ Hours: 5 AM - 11 PM            │  │
│ │ Queue: 10 min wait             │  │
│ │                                │  │
│ │ WiFi ✓  Showers ✓  Food ✓      │  │
│ │ Shower  (9 available)          │  │
│ │                                │  │
│ │ [Get Directions]  [View More]  │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ ✓ United Red Carpet Club      │  │
│ │ Terminal 2, Gate B5 (500m)     │  │
│ │ Hours: 6 AM - 10 PM            │  │
│ │ Queue: 25 min wait             │  │
│ │ [Details]                      │  │
│ └────────────────────────────────┘  │
│                                      │
│ Other lounges (paid):                │
│ • Amex Centurion (500m away)        │
│ • Priority Pass (various locations) │
│                                      │
└──────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Flight Status Monitoring
- Real-time polling (every 30 seconds)
- Gate change notification (banner alert)
- Boarding progress animation
- Status change sounds (optional)

### Wayfinding
- Tap destination → Show route on map
- Turn-by-turn navigation with haptic feedback
- Real-time position updates (GPS or manual)
- Tap destination button → Snap to that location

### Lounge Browser
- Tap lounge card → Show details (amenities, hours, queue)
- Tap "Get Directions" → Activate wayfinding mode
- Show "Access confirmed" if user eligible

### Biometric Check-In
- Tap biometric tab → Instructions appear
- Face capture flow
- "Check-in complete" confirmation
- Digital boarding pass displays

---

## 8. State Management

### Local Component State

```typescript
const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
const [activeTab, setActiveTab] = useState('flight');
const [userLocation, setUserLocation] = useState<{x: number; y: number} | null>(null);
const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
const [flightStatus, setFlightStatus] = useState<Flight | null>(null);
const [gateInfo, setGateInfo] = useState<GateInfo | null>(null);
const [alerts, setAlerts] = useState<Alert[]>([]);
const [lounges, setLounges] = useState<Lounge[]>([]);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface Airport {
  code: string;
  name: string;
  terminals: Terminal[];
  lounges: Lounge[];
  mapImage: string; // SVG path or URL
  gates: Gate[];
}

export interface Terminal {
  name: string;
  gates: Gate[];
  amenities: {security: boolean; bathroom: boolean; food: boolean};
}

export interface Gate {
  number: string;
  terminal: string;
  coordinates: {x: number; y: number};
  capacity: number;
}
```

### Mock Data

```typescript
export function generateMockAirportStatus(airportCode: string, flight: Flight): AirportStatus {
  return {
    airport: AIRPORTS[airportCode],
    flight,
    gate: {number: 'C15', terminal: 'T3', boardingStartTime: flight.departureTime},
    alerts: [
      {id: '1', type: 'info', message: `Gate changed from C10 to C15`},
      {id: '2', type: 'warning', message: 'Security queue: 45 min wait'},
    ],
    lounges: [
      {
        id: 'lounge-1',
        name: 'United Club Plus',
        hours: {open: '5:00 AM', close: '11:00 PM'},
        amenities: ['WiFi', 'Food', 'Shower'],
        queueTime: 10,
        capacity: {current: 45, max: 50},
        location: {terminal: 'T3', gate: 'C15'},
        accessLevel: 'membership',
      },
    ],
  };
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Emphasis: Premium lounge access, VIP parking, car service
- Show: Priority security lane info

### PERSONA-02: Business ("Marcus")
- Emphasis: Connection time adequacy, business centers
- Show: Flight delay impact on next flight

### PERSONA-03: Family ("Chen Family")
- Show: Family bathroom locations, kids' amenities
- Emphasis: Family lounge access, child-friendly features

---

## 11. Accessibility Requirements

### ARIA Labels

**Flight Status:**
```html
<div role="status" aria-live="polite" aria-label="Flight UA 901 status: on-time, boarding gate C15">
```

**Wayfinding Map:**
```html
<svg role="img" aria-label="Airport map with route to gate C15">
```

---

## 12. Loading, Error & Empty States

### Real-Time Status Loading
```typescript
<div className="animate-pulse">
  <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2" />
  <div className="h-4 bg-neutral-200 rounded w-2/3" />
</div>
```

### GPS Not Available
```typescript
<div className="p-4 bg-warning-50 rounded-lg">
  <p className="text-sm text-warning-900">
    Location not available. Tap to set your current location manually.
  </p>
</div>
```

---

## 13. Edge Cases & Error Handling

- **Gate not yet assigned:** Show "Gate TBD" with countdown to assignment
- **Flight cancelled:** Show cancellation notice, link to rebooking (SCR-013)
- **No lounge access:** Show paid lounge options or free alternatives
- **Biometric fails:** Fall back to manual boarding pass
- **GPS unavailable:** Show manual location selector

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('FlightStatusCard', () => {
  it('displays gate change alert', () => {
    const { getByText } = render(
      <FlightStatusCard
        flight={mockFlight}
        gateInfo={{number: 'C15', ...}}
        alerts={[{type: 'info', message: 'Gate changed from C10 to C15'}]}
      />
    );
    expect(getByText(/gate changed/i)).toBeInTheDocument();
  });

  it('updates countdown every second', async () => {
    const { getByText } = render(<FlightStatusCard {...props} />);
    const initial = getByText(/3h 22m/);
    expect(initial).toBeInTheDocument();
  });
});

describe('AirportWayfindingMap', () => {
  it('shows route from user to destination', () => {
    const { container } = render(
      <AirportWayfindingMap
        airport={mockAirport}
        userLocation={{x: 100, y: 100}}
        destination={{type: 'gate', location: {x: 500, y: 200}}}
      />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] Real-time flight status polling
- [ ] Gate assignment display with change alerts
- [ ] Boarding progress visualization
- [ ] Security queue time display
- [ ] Airport wayfinding map (SVG-based)
- [ ] Turn-by-turn directions
- [ ] Lounge browser with access verification
- [ ] Biometric check-in flow
- [ ] Weather and alerts integration
- [ ] Location tracking (GPS + manual)
- [ ] Responsive design (mobile-first)
- [ ] All persona adaptations applied
- [ ] Accessibility audit passing
- [ ] Real-time status update simulation (mock)
- [ ] Error handling (GPS unavailable, flight cancelled, etc.)
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 3-4 days
**Dependencies:** SCR-008 (Trip Dashboard) complete
**Complexity:** High (real-time updates, maps, biometric)
**Real-Time Features:** Gate updates, security queue, flight status
