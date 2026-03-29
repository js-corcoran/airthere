# Gate & Boarding — Build Shard
## AirThere | Screen SCR-011 | Shard 11

### 1. Screen Overview

**Purpose:** Real-time gate and boarding status screen showing live flight status, gate assignment (when available), boarding progress, and traveler next-actions. This screen serves as the final pre-departure checkpoint, keeping travelers informed as they transition from airport security to departure gate.

**Role in Journey:** Bridge between Airport Live View (SCR-010) and In-Flight Experience (SCR-012). Activated when traveler arrives at their assigned gate area or proactively surfaces via push notification when gate is assigned/changed. Provides real-time boarding phase indicators (gate assignment → boarding announcement → pre-boarding → group boarding → final boarding → doors close).

**Entry Points:**
- Tap gate information card from Airport Live View (SCR-010)
- Push notification "Gate assigned: C15" (click to open)
- Home tab flight status card during travel day
- Boarding pass scan at gate (if biometric not available)

**Exit Points:**
- Boarding progression → In-Flight Cabin (SCR-012)
- Gate change notification → Automatically reload gate info
- Connection warning → Trip Dashboard (SCR-008) to view next leg
- Disruption alert → IROPS Disruption Recovery (SCR-013)

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/airport/[airportCode]/gate/[gateNumber]/page.tsx
Alternative: (main)/flights/[flightId]/boarding/page.tsx
```

**File Structure in Project:**
```
src/
├── app/
│   └── (main)/
│       ├── airport/
│       │   └── [airportCode]/
│       │       ├── gate/
│       │       │   └── [gateNumber]/
│       │       │       └── page.tsx (SCR-011)
│       │       └── layout.tsx
│       └── inflight/
│           └── page.tsx (SCR-012)
├── components/
│   ├── airport/
│   │   ├── GateBoardingStatus.tsx (main container)
│   │   ├── BoardingPhaseIndicator.tsx
│   │   ├── DigitalBoardingPass.tsx
│   │   ├── ConnectionWarningCard.tsx
│   │   ├── GateChangeNotification.tsx
│   │   └── BoardingProgressTimeline.tsx
│   └── shared/
│       ├── RealTimeCountdown.tsx
│       └── AirportAlertBanner.tsx
└── lib/
    └── mock-data/
        └── boardingPhases.ts
```

**Layout Group:** `(main)` — requires authentication, displays bottom tab bar and header.

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-010 (Airport Live View) — Gate information originates here
- SCR-008 (Trip Dashboard) — Connection information, itinerary context
- SCR-002 (Home / Today View) — Travel day detection and countdown initialization

**Shared components needed:**
- `BottomTabBar` — Navigation persistence
- `ContextualHeader` — Adaptive header (hides on scroll down, reappears on pull)
- `PullToRefresh` — Real-time status refresh (gates change, boarding phases advance)
- `ToastContainer` — Gate change notifications, boarding group announcements
- `LoadingSkeletons` — Initial load state while fetching live gate data
- `RealTimeCountdown` — Countdown to gate closure/departure
- `DigitalBoardingPass` component (from Shadcn Card primitives)

**Mock data requirements:**
- `boardingPhases.ts` — Boarding state machine (gate_assigned → pre_boarding → group_1 → group_2 → group_3 → boarding_complete → doors_closed)
- `flightData.ts` — Live flight status, gate assignments, delay information
- `airportData.ts` — Gate locations, nearby amenities, restroom/phone locations
- Connection flight data (for connection warning scenarios)

---

### 4. Component Hierarchy

```
GateBoardingStatus (page container)
├── ContextualHeader
│   ├── AirportCode & Time
│   └── [Live Status Pill] "Boarding in progress"
│
├── PullToRefresh (wrapper)
│   │
│   ├── [Hero Section] GateCountdownCard
│   │   ├── RouteDisplay (SFO → LHR)
│   │   ├── FlightNumber (UA 901)
│   │   ├── ScheduledTime & EstimatedTime
│   │   ├── GateAssignment (with gate layout mini-map)
│   │   ├── LargeCountdownTimer
│   │   └── StatusBadge ("On Time", "Delayed", "Boarding")
│   │
│   ├── [Alert Section] GateChangeNotification (if applicable)
│   │   └── "Gate changed from C15 to D12 — updated location"
│   │
│   ├── [Current Phase] BoardingPhaseIndicator
│   │   ├── Phase Timeline (visual indicator)
│   │   │   ├── ✓ Gate Assigned
│   │   │   ├── ◎ Pre-Boarding (Elite passengers)
│   │   │   ├── ◎ Group 1
│   │   │   ├── ◎ Group 2
│   │   │   └── ◎ Group 3
│   │   └── "Currently boarding Group 2 — your boarding group: Group 3"
│   │
│   ├── [Digital Pass] DigitalBoardingPass
│   │   ├── QR Code (large, tap to expand)
│   │   ├── Boarding Pass Details
│   │   │   ├── Passenger Name
│   │   │   ├── Confirmation #
│   │   │   ├── Seat Assignment (12A, highlighted)
│   │   │   └── Boarding Group (Group 3)
│   │   └── "Tap to show to gate agent"
│   │
│   ├── [Flight Info] FlightDetailsCard
│   │   ├── Aircraft Type (Boeing 787-9)
│   │   ├── Expected Taxi & Pushback Time
│   │   ├── Seat Map (cabin layout visual)
│   │   └── Baggage Info (X bags checked, carry-on capacity)
│   │
│   ├── [Connection Alert] ConnectionWarningCard (if applicable)
│   │   ├── "Connection Alert"
│   │   ├── Next Flight Details (SFO → DEN, UA 234, 2:15 PM)
│   │   ├── Connection Time Remaining (1h 45m)
│   │   ├── Recommended Action
│   │   │   └── "Tight connection — inform gate agent for assistance"
│   │   └── [View Connection] button → Trip Dashboard
│   │
│   ├── [Gate Info] GateLocationCard
│   │   ├── Gate Number (C15)
│   │   ├── Terminal (T3)
│   │   ├── Distance from Security (2min walk)
│   │   ├── Nearby Restrooms (50ft northeast)
│   │   ├── Charging Stations (near gate)
│   │   └── Lounge Access (3 minutes away)
│   │
│   └── [Nearby] NearbyAmenitiesSection
│       ├── Restroom icon — "50 ft away"
│       ├── Food & Beverage — "Panda Express, Starbucks (2 min)"
│       ├── Charging — "USB outlets at gate"
│       └── Family Services — "Family lounge 3 min away"
│
├── BottomTabBar
│   ├── Home
│   ├── Discover
│   ├── Search
│   ├── Trips (active)
│   └── Profile
```

**Component Nesting:**
- All components use Shadcn UI primitives (Card, Button, Badge, Alert)
- Real-time countdown uses custom `RealTimeCountdown` hook
- Gate information polling happens in parent container with React.useEffect
- Boarding phase state managed via Context API (shared with Airport Live View)

---

### 5. Component Specifications

#### 5.1 GateCountdownCard

**TypeScript Interface:**
```typescript
interface GateCountdownCardProps {
  flightId: string;
  departure: {
    airport: string;
    time: ISO8601;
    estimatedTime: ISO8601;
    gate: string | null;
  };
  arrival: {
    airport: string;
    time: ISO8601;
  };
  airline: {
    code: string;
    name: string;
  };
  flightNumber: string;
  aircraft: string;
  status: 'on_time' | 'delayed' | 'boarding' | 'boarding_complete' | 'departed';
  isLate: number; // minutes
}

interface GateCountdownCardState {
  secondsToGate: number; // updates every second
  gateAssignmentTime: ISO8601; // when gate was assigned
  countdownDisplay: string; // formatted display "3h 22m"
}
```

**Internal State:**
```typescript
const [countdown, setCountdown] = useState<number>(calculateSecondsTo(departure.estimatedTime));
const [gateAssigned, setGateAssigned] = useState<boolean>(!!departure.gate);
const [status, setStatus] = useState<string>(props.status);

useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(prev => Math.max(0, prev - 1));
  }, 1000);
  return () => clearInterval(interval);
}, [departure.estimatedTime]);
```

**Shadcn UI Base:** Card, Badge, Button

**Tailwind Classes:**
```
- Container: bg-gradient-to-b from-primary-500 to-primary-600 rounded-lg p-6 text-white shadow-lg
- Countdown Display: text-5xl font-bold font-mono tracking-tight
- Gate Assignment: text-2xl font-semibold mt-4
- Status Badge: bg-primary-800 px-3 py-1 rounded-full text-sm
- Responsive: md:p-8 lg:text-6xl (countdown larger on desktop)
```

**Responsive Behavior:**
- Mobile (320px): 48px countdown font, 6px padding, full width
- Tablet (768px): 64px countdown font, 8px padding, max-width 600px centered
- Desktop (1024px): 72px countdown font, 10px padding, card in right sidebar

#### 5.2 BoardingPhaseIndicator

**TypeScript Interface:**
```typescript
interface BoardingPhaseIndicatorProps {
  currentPhase: 'gate_assigned' | 'pre_boarding' | 'group_1' | 'group_2' | 'group_3' | 'boarding_complete';
  passengerGroup?: string; // 'elite' | 'group_1' | 'group_2' | 'group_3'
  startTime: ISO8601;
  estimatedGroupTime?: ISO8601; // when passenger's group will board
  boardingRate: number; // passengers per minute
}

interface PhaseStep {
  id: string;
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  time?: ISO8601;
}
```

**Internal State:**
```typescript
const phases: PhaseStep[] = [
  { id: 'gate_assigned', label: 'Gate Assigned', status: 'completed', time: props.startTime },
  { id: 'pre_boarding', label: 'Pre-Boarding', status: currentPhase >= 'pre_boarding' ? 'completed' : 'pending' },
  { id: 'group_1', label: 'Group 1 (Premium)', status: currentPhase >= 'group_1' ? 'completed' : 'pending' },
  { id: 'group_2', label: 'Group 2 (Standard)', status: currentPhase >= 'group_2' ? 'completed' : 'pending' },
  { id: 'group_3', label: 'Group 3 (Zones 5-9)', status: currentPhase >= 'group_3' ? 'completed' : 'pending' },
  { id: 'boarding_complete', label: 'Boarding Complete', status: currentPhase === 'boarding_complete' ? 'completed' : 'pending' },
];
```

**Shadcn UI Base:** Custom timeline component (could be built from Separator + Badge)

**Tailwind Classes:**
```
- Container: w-full py-6 px-4 bg-white dark:bg-neutral-900 rounded-lg
- Step Item: flex items-center gap-3 py-3
- Step Indicator: w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
  - Completed: bg-success-500 text-white
  - In Progress: bg-primary-500 text-white animate-pulse
  - Pending: bg-neutral-200 text-neutral-600 dark:bg-neutral-700
- Step Label: text-sm font-medium
- Connector Line: h-6 w-0.5 bg-neutral-300 dark:bg-neutral-600 my-0
```

**Responsive Behavior:**
- Mobile: Vertical layout, full width, no connectors (too narrow)
- Tablet+: Connectors between steps visible
- Desktop: Two-column layout (phases left, time/info right)

#### 5.3 DigitalBoardingPass

**TypeScript Interface:**
```typescript
interface DigitalBoardingPassProps {
  passenger: {
    name: string;
    id: string; // Passenger ID
  };
  booking: {
    confirmationNumber: string;
    bookingReference: string;
  };
  flight: {
    number: string;
    departure: string; // time
    arrival: string; // time
    aircraft: string;
  };
  route: {
    from: string; // IATA code
    to: string; // IATA code
  };
  seat: {
    number: string; // 12A
    group: string; // Group 1, Group 2, etc.
    boardingSequence?: number;
  };
  barcode: {
    format: 'qr' | 'barcode';
    data: string; // Encoded boarding pass data
  };
  status: 'valid' | 'scanned' | 'expired';
}

interface DigitalBoardingPassState {
  isExpanded: boolean; // QR code full-screen view
  isScanMode: boolean; // Gate agent scanning
}
```

**Internal State:**
```typescript
const [isExpanded, setIsExpanded] = useState(false);
const [showBarcode, setShowBarcode] = useState(false); // Toggle between barcode types

const handleTapToShow = () => {
  setIsExpanded(true);
  // Haptic feedback
  navigator.vibrate?.(50);
};
```

**Shadcn UI Base:** Card, Dialog (for fullscreen expand)

**Tailwind Classes:**
```
- Container: bg-gradient-to-b from-blue-50 to-blue-100 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-6 shadow-md
- Pass Header: flex justify-between items-center border-b border-blue-200 pb-4
- Airline Logo: w-12 h-12
- Route Text: text-2xl font-bold tracking-tight
- Passenger Info: mt-4 text-sm text-neutral-700 dark:text-neutral-300
- Seat Number: text-4xl font-bold text-primary-600 my-4
- QR Code Container: bg-white p-4 rounded flex items-center justify-center
- Barcode: text-center font-mono text-xs mt-4 text-neutral-500
- Tap Indicator: text-xs text-neutral-600 text-center mt-4 italic "Tap to show to gate agent"
```

**Responsive Behavior:**
- Mobile: Full width card, QR code 120×120px
- Tablet: Constrained to 400px width, QR code 140×140px
- Desktop: Sidebar position, QR code 160×160px
- Fullscreen expand (on tap): Cover entire screen with large QR code (300×300px)

#### 5.4 ConnectionWarningCard

**TypeScript Interface:**
```typescript
interface ConnectionWarningCardProps {
  currentFlight: {
    number: string;
    arrival: ISO8601;
    to: string;
  };
  nextFlight: {
    number: string;
    departure: ISO8601;
    from: string;
    to: string;
  };
  connectionMinutes: number;
  riskLevel: 'low' | 'medium' | 'high'; // based on connection time & delays
  recommendedAction?: string;
  isMonitored: boolean; // AirThere is monitoring this connection
}

interface ConnectionWarningState {
  minutesRemaining: number; // countdown to next flight departure
  riskUpdate: string; // "Current delay: +15 minutes, connection still viable"
}
```

**Internal State:**
```typescript
const [timeRemaining, setTimeRemaining] = useState(
  calculateMinutesBetween(currentFlight.arrival, nextFlight.departure)
);

const riskMessage = {
  low: "Comfortable connection time",
  medium: "Tight connection — keep monitoring",
  high: "Risk of missing connection — inform gate agent",
};

useEffect(() => {
  // Poll for delay updates every 30s
  const pollInterval = setInterval(() => {
    fetchFlightStatus(currentFlight.number).then(updateRiskLevel);
  }, 30000);
  return () => clearInterval(pollInterval);
}, []);
```

**Shadcn UI Base:** Alert, Button

**Tailwind Classes:**
```
- Container: bg-amber-50 dark:bg-amber-900 border-l-4 border-amber-500 p-4 rounded
- Severity (high): bg-red-50 dark:bg-red-900 border-red-500
- Severity (low): bg-green-50 dark:bg-green-900 border-green-500
- Header: font-bold text-amber-900 dark:text-amber-100 text-sm uppercase tracking-wide
- Content: text-sm text-amber-800 dark:text-amber-200 mt-2
- Action Button: bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm mt-3
```

**Responsive Behavior:**
- Mobile: Full width, 4px left border
- Tablet+: Max width 500px, 6px left border
- Fullscreen: Dismissible with X button (but alert remains until connection completes)

#### 5.5 GateLocationCard

**TypeScript Interface:**
```typescript
interface GateLocationCardProps {
  gate: string;
  terminal: string;
  airline: string;
  airport: {
    code: string;
    name: string;
  };
  walkingDistance: {
    toGate: number; // meters from current location or security
    toRestroom?: number;
    toFood?: number;
    toCharging?: number;
  };
  amenities: {
    type: 'restroom' | 'food' | 'charging' | 'family_lounge' | 'shower';
    distance: number; // meters
    name?: string; // e.g., "Starbucks", "Mother's Room"
  }[];
  accessibility: {
    wheelchairAccess: boolean;
    movingWalkway: boolean;
    elevator: boolean;
  };
}

interface GateLocationState {
  userLocation?: [lat: number, lon: number];
  nearestAmenity?: string;
  estimatedWalkTime: number; // seconds
}
```

**Internal State:**
```typescript
const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
  // Request user location (for proximity to gate)
  navigator.geolocation?.getCurrentPosition(
    (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
    () => {} // silent fail if permission denied
  );
}, []);

const nearestAmenity = amenities.reduce((nearest, current) =>
  current.distance < nearest.distance ? current : nearest
);
```

**Shadcn UI Base:** Card, Badge

**Tailwind Classes:**
```
- Container: bg-blue-50 dark:bg-neutral-800 rounded-lg p-4 border border-blue-200 dark:border-neutral-700
- Gate Badge: text-3xl font-bold text-primary-600 mb-2
- Info Row: flex items-center gap-3 py-2 text-sm
- Icon: w-5 h-5 text-neutral-600 dark:text-neutral-400
- Amenity List: grid grid-cols-2 gap-3 mt-4 md:grid-cols-3
- Amenity Item: text-center text-xs
```

**Responsive Behavior:**
- Mobile: Single column layout, icons + text stacked
- Tablet: Two-column amenity grid
- Desktop: Three-column grid, compact layout

---

### 6. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ ← SFO | 9:41 | Boarding      │ Header
├──────────────────────────────┤
│  [Pull to refresh indicator] │
├──────────────────────────────┤
│                              │
│  San Francisco → London      │ Countdown Hero
│         UA 901               │
│  Depart: 10:45 AM            │
│  Gate: C15                   │
│                              │
│      1h 34m                  │
│     [Large Timer]            │
│                              │
│  ✓ Gate Assigned             │
│                              │
├──────────────────────────────┤
│ Gate changed from C15 → D12  │ Alert (if applicable)
│ Updated 2 min ago            │
├──────────────────────────────┤
│ ✓ Gate Assigned              │ Boarding Phases
│ ◎ Pre-Boarding               │
│ ◎ Group 1 (Premium)          │
│ ◎ Group 2 (Standard)         │
│ ◎ Group 3 (Zones 5-9)        │
│                              │
│ Currently boarding Group 2   │
│ Your group: Group 3          │
├──────────────────────────────┤
│ [Digital Boarding Pass]      │
│  ┌────────────────────────┐  │
│  │  QR CODE               │  │
│  │  [120×120 pixels]      │  │
│  └────────────────────────┘  │
│  12A | Group 3               │
│  Confirmation: ABC123        │
│ Tap to show to gate agent    │
├──────────────────────────────┤
│ Connection Alert             │ (if applicable)
│ Next Flight: UA 234 → Denver │
│ Depart: 2:15 PM (1h 45m)    │
│ [View Connection]            │
├──────────────────────────────┤
│ Gate: C15, Terminal 3        │ Gate Location
│ Distance from security: 2min │
│ Restrooms: 50ft away         │
│ Charging: At gate            │
├──────────────────────────────┤
│ Amenities                    │
│ 🚽 Restroom | 2 min          │
│ 🍔 Food | Panda (3 min)      │
│ 🔌 Charging | At gate        │
│                              │
├──────────────────────────────┤
│ [Home] [Discover] [Search]   │ Bottom Tab Bar
│ [Trips] [Profile]            │
└──────────────────────────────┘
```

**Tablet Wireframe (768px):**
```
┌─────────────────────────────────────────┐
│ ← SFO | 9:41 | Boarding | [Settings]    │
├─────────────────────────────────────────┤
│                                         │
│  San Francisco → London | UA 901        │ Countdown
│  Depart: 10:45 AM | Gate: C15           │ (larger display)
│                 1h 34m                  │
│                                         │
│ ✓ Gate Assigned                         │
│                                         │
├────────────────┬────────────────────────┤
│ Boarding Phases│ Digital Boarding Pass  │
│ ✓ Gate Assign. │ ┌──────────────────┐  │
│ ◎ Pre-Board.   │ │  QR CODE         │  │
│ ◎ Group 1      │ │ [140×140 pixels] │  │
│ ◎ Group 2      │ │                  │  │
│ ◎ Group 3      │ └──────────────────┘  │
│                │ Passenger: John Doe  │
│ Your: Group 3  │ Seat: 12A | Group 3  │
│                │ Conf: ABC123456      │
│                │                      │
├────────────────┼────────────────────────┤
│ Connection Alrt│ Gate Location Info    │
│ UA 234 → Denver│ Gate: C15, Terminal 3 │
│ 1h 45m remain  │ 2 min from security  │
│ [View]         │ Amenities nearby:    │
│                │ • Restroom (50ft)    │
│                │ • Food (Panda, 3min) │
│                │ • Charging (gate)    │
└────────────────┴────────────────────────┘
[Home][Discover][Search][Trips][Profile]
```

**Desktop Wireframe (1024px):**
```
┌──────────────────────────────────────────────────────┐
│ ← SFO | 9:41 | Boarding | [Settings] | [Help]        │
├──────────────────────────────┬──────────────────────┤
│                              │ Digital Boarding Pass│
│ San Francisco → London       │ ┌──────────────────┐│
│ UA 901                       │ │  QR CODE         ││
│ Depart: 10:45 AM, Gate: C15  │ │ [160×160 pixels] ││
│                              │ │                  ││
│         1h 34m               │ └──────────────────┘│
│        [Large Timer]         │ John Doe          │
│                              │ Seat 12A | Group 3 │
│ ✓ Gate Assigned              │ Conf: ABC123456   │
│                              │ Tap to show       │
├──────────────────────────────┤──────────────────────┤
│ Boarding Phases              │ Gate Information    │
│ ✓ Gate Assigned              │ Gate: C15, T3       │
│ ◎ Pre-Boarding (Elite)       │ 2 min from security │
│ ◎ Group 1 (Premium)          │                     │
│ ◎ Group 2 (Standard)    →    │ Amenities:          │
│ ◎ Group 3 (Zones 5-9)        │ • Restroom (50ft)   │
│                              │ • Food (3min)       │
│ Your group: Group 3          │ • Charging (gate)   │
│ Estimated to board: 2:05 PM  │ • Family lounge     │
│                              │ • Shower            │
├──────────────────────────────┤──────────────────────┤
│ Connection Alert             │ Nearby Attractions   │
│ Next Flight: UA 234 → Denver │ • Museum (5 min)    │
│ Depart: 2:15 PM (1h 45m)    │ • Shopping (3 min)  │
│ [View Full Itinerary]        │                     │
├──────────────────────────────┴──────────────────────┤
│ [Home] [Discover] [Search] [Trips] [Profile]       │
└──────────────────────────────────────────────────────┘
```

**Responsive Breakpoints:**
- **Mobile (320-479px):** Single column, vertical stacking, large countdown timer
- **Tablet (480-767px):** Two-column layout starts to appear, amenities in 2-col grid
- **Desktop (768px+):** Three-column flexible layout, sidebar boarding pass, full amenities grid

---

### 7. Interaction Patterns

#### Real-Time Updates
- **Gate Change:** Toast notification "Gate changed from C15 to D12" with action "Go to new gate" → updates screen immediately
- **Boarding Phase Advancement:** Visual indicator animates to next phase, slight pulse effect with haptic feedback
- **Delay Update:** Countdown timer shows "+15 minutes" in red text, alerts traveler with subtle animation

#### Gestures & Controls
- **Pull-to-Refresh:** Pull screen down to refresh gate status, boarding phase, delays (overscroll behavior on mobile)
- **Tap Digital Boarding Pass:** Expands to fullscreen QR code with brightness boost for better scanning
- **Tap "View Connection":** Navigates to Trip Dashboard (SCR-008) with focus on next flight
- **Tap "View Gate Map":** Opens interactive airport terminal map with gate location highlighted
- **Long-press boarding pass:** Options to save to Apple Wallet, screenshot, share

#### Scroll Behavior
- **Header:** Hides on scroll down, reappears on scroll up or pull-to-refresh
- **Countdown Card:** Sticky at top, remains visible as user scrolls through phases and amenities below
- **Amenities Section:** Infinite scroll if many amenities exist (max 3 visible, scroll for more)

#### Transitions & Animations
- **Countdown Timer:** Smooth ticking animation (per second)
- **Boarding Phase:** Fade-in and checkmark animation when phase completed
- **Gate Change Alert:** Slide in from top with 0.3s cubic-bezier(0.4, 0, 0.2, 1) timing
- **QR Code Expansion:** 0.3s zoom animation from card center
- **Status Badge:** Subtle pulse animation when status changes

#### Bottom Sheet Triggers
- **Airport Wayfinding:** Tap "Get directions to gate" → Bottom sheet with turn-by-turn navigation
- **Accessibility Options:** Tap accessibility icon → Bottom sheet with wheelchair routes, elevators, accessible restrooms
- **Nearby Food:** Tap "Panda Express, 3 min" → Bottom sheet with menu preview, online ordering option

---

### 8. State Management

**Local Component State:**
```typescript
// GateBoardingStatus.tsx (parent)
const [flightData, setFlightData] = useState<Flight | null>(null);
const [boardingPhase, setBoardingPhase] = useState<BoardingPhase>('gate_assigned');
const [countdown, setCountdown] = useState<number>(0);
const [gateChangeAlerts, setGateChangeAlerts] = useState<Alert[]>([]);
const [isRefreshing, setIsRefreshing] = useState(false);
const [userLocation, setUserLocation] = useState<LatLng | null>(null);
```

**Global State Slices Needed (Context API):**

1. **AuthContext** — Current user, authentication token
2. **TripContext** — Current trip, active flight, connection info
3. **AirportContext** — Current airport code, terminal info, real-time delays
4. **BoardingPhaseContext** — Shared across Airport Live View (SCR-010) and this screen

**URL State Parameters:**
```
?flightId=UA901&date=2026-03-30&airportCode=SFO&gateNumber=C15
```

**Derived State:**
```typescript
const timeToGate = calculateMinutesBetween(now(), departure.time);
const isLate = departure.estimatedTime > departure.time;
const delayMinutes = isLate ? calculateMinutesDifference(departure.estimatedTime, departure.time) : 0;
const boardingCompletionEstimate = calculateBoardingTime(currentPhase, boardingRate, totalPassengers);
const connectionTight = calculateMinutesBetween(arrival.time, nextFlight.departure) < 45;
```

**Real-Time Data Polling:**
```typescript
useEffect(() => {
  // Poll gate status every 10 seconds
  const pollInterval = setInterval(async () => {
    const updated = await fetchFlightStatus(flightId);
    setFlightData(updated);

    // Check for gate change
    if (updated.gate !== flightData?.gate) {
      showToast(`Gate changed to ${updated.gate}`);
    }

    // Check for phase advancement
    if (updated.boardingPhase !== boardingPhase) {
      setBoardingPhase(updated.boardingPhase);
      navigator.vibrate?.(200); // Haptic feedback
    }
  }, 10000);

  return () => clearInterval(pollInterval);
}, [flightId, flightData, boardingPhase]);
```

---

### 9. Data Requirements & Mock Data

**Data Shape Needed:**
```typescript
interface GateBoardingScreenData {
  flight: {
    id: string;
    number: string;
    aircraft: string;
    airline: {
      code: string;
      name: string;
      logo: string;
    };
    status: 'scheduled' | 'delayed' | 'boarding' | 'boarding_complete' | 'departed';
    departure: {
      time: ISO8601;
      estimatedTime: ISO8601;
      airport: string; // IATA
      gate: string | null;
      terminal: string;
      securityLines: {
        checkpointName: string;
        waitTime: number; // minutes
      }[];
    };
    arrival: {
      time: ISO8601;
      airport: string;
      terminal?: string;
    };
    aircraft: {
      type: string; // "Boeing 787-9"
      configuration: string; // "3-3-2" seating
      cabins: {
        type: 'first' | 'business' | 'premium_economy' | 'economy';
        rows: number;
        seats: number;
      }[];
    };
  };
  boarding: {
    currentPhase: 'gate_assigned' | 'pre_boarding' | 'group_1' | 'group_2' | 'group_3' | 'boarding_complete';
    startTime: ISO8601;
    groups: {
      name: string;
      description: string;
      passengers: number;
      estimatedStartTime: ISO8601;
      estimatedEndTime: ISO8601;
    }[];
    boarded: number; // passengers boarded so far
    total: number; // total passengers
    boardingRate: number; // passengers per minute
  };
  passenger: {
    name: string;
    seatNumber: string;
    boardingGroup: string;
    confirmationNumber: string;
    hasMobileBoardingPass: boolean;
  };
  connections: {
    nextFlight?: {
      number: string;
      departure: ISO8601;
      airport: string;
      gate?: string;
    };
    connectionMinutes: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  amenities: {
    gate: {
      number: string;
      terminal: string;
      proximity: {
        restroom: number; // meters
        food: number;
        charging: number;
        familyLounge?: number;
        shower?: number;
      };
    };
    airport: {
      restrooms: { distance: number; accessible: boolean }[];
      restaurants: { name: string; distance: number; cuisine: string }[];
      charging: { type: 'usb' | 'outlet' | 'wireless'; distance: number }[];
      services: { type: string; distance: number }[];
    };
  };
}
```

**Mock Data Example:**
```typescript
// lib/mock-data/boardingData.ts
export const mockGateBoardingData: GateBoardingScreenData = {
  flight: {
    id: 'UA901-20260330-SFO-LHR',
    number: 'UA 901',
    aircraft: 'Boeing 787-9',
    airline: {
      code: 'UA',
      name: 'United Airlines',
      logo: '/airlines/ua.png'
    },
    status: 'boarding',
    departure: {
      time: new Date('2026-03-30T11:00:00-07:00').toISOString(),
      estimatedTime: new Date('2026-03-30T11:00:00-07:00').toISOString(), // on-time
      airport: 'SFO',
      gate: 'C15',
      terminal: 'T3',
      securityLines: [
        { checkpointName: 'South Checkpoint', waitTime: 18 },
        { checkpointName: 'North Checkpoint', waitTime: 12 },
      ]
    },
    arrival: {
      time: new Date('2026-03-31T07:55:00+00:00').toISOString(),
      airport: 'LHR',
      terminal: 'T3'
    },
    aircraft: {
      type: 'Boeing 787-9',
      configuration: '3-3-2',
      cabins: [
        { type: 'first', rows: 8, seats: 8 },
        { type: 'business', rows: 28, seats: 62 },
        { type: 'premium_economy', rows: 20, seats: 60 },
        { type: 'economy', rows: 80, seats: 240 },
      ]
    }
  },
  boarding: {
    currentPhase: 'group_2',
    startTime: new Date('2026-03-30T10:20:00-07:00').toISOString(),
    groups: [
      {
        name: 'Elite/Pre-Boarding',
        description: 'United 1K, Star Alliance Gold',
        passengers: 45,
        estimatedStartTime: new Date('2026-03-30T10:20:00-07:00').toISOString(),
        estimatedEndTime: new Date('2026-03-30T10:25:00-07:00').toISOString(),
      },
      {
        name: 'Group 1',
        description: 'Business Class, Premium Cabin',
        passengers: 70,
        estimatedStartTime: new Date('2026-03-30T10:25:00-07:00').toISOString(),
        estimatedEndTime: new Date('2026-03-30T10:35:00-07:00').toISOString(),
      },
      {
        name: 'Group 2',
        description: 'Premium Economy, Standard Cabin',
        passengers: 120,
        estimatedStartTime: new Date('2026-03-30T10:35:00-07:00').toISOString(),
        estimatedEndTime: new Date('2026-03-30T10:50:00-07:00').toISOString(),
      },
      {
        name: 'Group 3',
        description: 'Economy Zones 5-9',
        passengers: 267,
        estimatedStartTime: new Date('2026-03-30T10:50:00-07:00').toISOString(),
        estimatedEndTime: new Date('2026-03-30T11:00:00-07:00').toISOString(),
      },
    ],
    boarded: 215,
    total: 502,
    boardingRate: 25 // passengers per minute
  },
  passenger: {
    name: 'John Doe',
    seatNumber: '12A',
    boardingGroup: 'Group 3',
    confirmationNumber: 'ABC123',
    hasMobileBoardingPass: true,
  },
  connections: {
    nextFlight: {
      number: 'UA 234',
      departure: new Date('2026-03-31T09:00:00+00:00').toISOString(),
      airport: 'DEN',
      gate: undefined, // not assigned yet
    },
    connectionMinutes: 105,
    riskLevel: 'low',
  },
  amenities: {
    gate: {
      number: 'C15',
      terminal: 'T3',
      proximity: {
        restroom: 50,
        food: 180,
        charging: 0, // at gate
        familyLounge: 240,
      }
    },
    airport: {
      restrooms: [
        { distance: 50, accessible: true },
        { distance: 120, accessible: false },
      ],
      restaurants: [
        { name: 'Panda Express', distance: 180, cuisine: 'Chinese' },
        { name: 'Starbucks', distance: 140, cuisine: 'Café' },
      ],
      charging: [
        { type: 'outlet', distance: 0 },
        { type: 'wireless', distance: 80 },
      ],
      services: [
        { type: 'Family Lounge', distance: 240 },
        { type: 'Shower', distance: 420 },
      ],
    }
  }
};
```

**TypeScript Interfaces:**
```typescript
export type Flight = typeof mockGateBoardingData.flight;
export type BoardingPhase = typeof mockGateBoardingData.boarding.currentPhase;
export type Passenger = typeof mockGateBoardingData.passenger;
```

**How to Swap for Real API:**
Replace `lib/mock-data/boardingData.ts` with API calls to:
```
GET /api/flights/:flightId/boarding-status
GET /api/flights/:flightId/boarding-phases
GET /api/airports/:airportCode/gates/:gateNumber/amenities
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Premium — Alexandra)

**UI Variations:**
- **Countdown Card:** Use premium color scheme (gold accent, primary-700 background), display elite status badge
- **Boarding Phase:** "Pre-Boarding (Elite)" labeled prominently, show time as "2 minutes"
- **Digital Boarding Pass:** Premium styling with subtle watermark, display elite tier badge
- **Lounge Access:** Prominently display "Your lounge (American Express Centurion) is open. Go now!" with time remaining
- **Amenities:** Prioritize premium amenities (shower, quiet lounge, premium dining)

**Content:**
- Gate change notifications include "Your usual gate" vs. "Changed from your usual"
- Mention of "Priority boarding" and "Baggage priority" throughout
- Suggest professional/business lounges (American Express, Delta Sky Club)
- Display "Fast-track security" option (if available)

**Interaction Enhancements:**
- Biometric face unlock option for boarding pass (no need to tap/show)
- One-tap access to concierge for gate change assistance

#### PERSONA-02 (Business — Marcus)

**UI Variations:**
- **Countdown Card:** Minimal, data-heavy, show connection time to next flight
- **Boarding Phase:** Include "Time to board your group" countdown, suggest productivity time
- **Digital Boarding Pass:** Minimal, QR-code focused, easy screenshot/share with colleagues
- **Connection Info:** Prominent, show policy compliance badge ("This meets your policy"), show cost comparison if alternate connection exists
- **Amenities:** Prioritize work amenities (charging, quiet spaces, WiFi quality)

**Content:**
- Gate changes flagged with "Impact on next flight connection: None" or "Tight connection — recommend priority boarding"
- Show "Productivity time: 27 minutes until boarding your group" with suggestion to review meeting prep, emails
- Display business lounge access (United Club, etc.) with hours and amenities (WiFi speed, food quality)
- Expense tracking: Show "This flight contributes $X to monthly policy spend"

**Interaction Enhancements:**
- Quick link to "Book hotel near connection airport" if tight connection
- Calendar integration: Show "Next meeting: 3pm MST Denver (60 min buffer after landing)"

#### PERSONA-03 (Family — Chen Family)

**UI Variations:**
- **Countdown Card:** Simplified, large countdown (kids can see), show family seating confirmation "All 4 seats together: F4, F5, F6, F7"
- **Boarding Phase:** Show "Group 3 — you, Amy, David, Zoe, Max all board together" with kid-friendly icons
- **Digital Boarding Pass:** Show all 4 boarding passes in carousel, tap to switch between family members
- **Boarding Phase Progress:** Show "127 passengers boarded, ~2 families ahead of you" (family-aware language)
- **Amenities:** Prioritize family amenities (family restroom, family lounge, kid-friendly food)

**Content:**
- Family seating confirmation: "Your family is locked together: 12A, 12B, 12C, 12D"
- Bathroom proximity: "Family restroom 80 meters away" (important for kids)
- Food suggestions: "Zoe (10 years) typically enjoys: Chicken nuggets (available on flight), bring snacks she likes"
- Entertainment tip: "Kids can bring tablets on board — you'll receive WiFi password at gate"
- Accessibility: "Max (7 years) uses wheelchair — boarding assistance will be provided. Aisle 12 has accessible seating layout."

**Interaction Enhancements:**
- Family member carousel: Tap each family member to see their boarding pass, seat, preferences
- "Entertainment ready?" checklist before boarding: Movies, games, books selected? Headphones charged?
- Post-boarding countdown: "Get settled in seats, door closes in 12 minutes"

---

### 11. Accessibility Requirements

**ARIA Roles & Labels:**
```typescript
<main role="main" aria-label="Gate and Boarding Status">
  <section aria-label="Flight countdown">
    <time dateTime={departure.estimatedTime} aria-live="polite" aria-label="Time to departure">
      1 hour 34 minutes
    </time>
  </section>

  <section aria-label="Boarding phases" role="status">
    <ol aria-label="Boarding progress list">
      <li aria-current="step">Pre-Boarding</li>
      <li>Group 1 (Premium)</li>
      <li>Group 2 (Standard)</li>
      <li>Group 3 (Zones 5-9)</li>
    </ol>
  </section>

  <article aria-label="Digital boarding pass" role="document">
    <img src="qrcode.png" alt="QR code for boarding pass — tap to enlarge" />
  </article>
</main>
```

**Focus Management:**
- Initial focus on countdown card heading
- Tab order: Countdown → Boarding Phases → Digital Boarding Pass → Gate Info → Amenities
- Focus indicator: 2px outline with primary color, 2px offset
- Skip link: "Skip to gate information"

**Keyboard Navigation:**
- Tab/Shift+Tab: Navigate through sections
- Enter/Space: Expand digital boarding pass, open connections, view gate map
- R: Pull-to-refresh (custom hotkey)
- Escape: Close fullscreen QR code

**Screen Reader Flow:**
```
"Gate and Boarding Status — UA 901, San Francisco to London
Time to departure: 1 hour 34 minutes
Flight status: Boarding in progress
Gate: C15, Terminal 3

Boarding phases:
1. Gate assigned — completed
2. Pre-boarding — in progress
3. Group 1 premium — pending, estimated 10:25 AM
4. Group 2 standard — pending, estimated 10:35 AM
5. Group 3 zones 5-9 — pending, estimated 10:50 AM

You are in Group 3, estimated to board at 10:50 AM

Digital boarding pass for John Doe, seat 12A, boarding group 3
Confirmation number: ABC123
Tap or press Enter to enlarge QR code

Gate location: C15, Terminal 3, 2 minutes from security
Nearby amenities: Restroom 50 feet, Food 3 minutes, Charging at gate
"
```

**Touch Targets:**
- All buttons: 44×44pt minimum
- QR code expand button: 44×44pt
- "View Connection" button: 44×44pt
- Amenity tiles: 56×56pt minimum

**Color Contrast:**
- Countdown on dark background: white text on primary-600 = 7:1 ✓
- Boarding phase text: neutral-900 on white = 14:1 ✓
- Alert borders: colored + icon + text (color not sole indicator)
- Gate info: neutral-700 on blue-50 = 7:1 ✓

**Motion & Animation:**
- Countdown tick animation: reduced-motion friendly (no animation if prefers-reduced-motion)
- Boarding phase checkmark: fade-in instead of animation if prefers-reduced-motion
- QR code expansion: immediate zoom, no easing if prefers-reduced-motion

---

### 12. Loading, Error & Empty States

#### Loading State (Skeleton Screen)

**When:** Initial page load while fetching flight data, after pull-to-refresh

```typescript
<div className="animate-pulse space-y-4">
  <div className="h-32 bg-neutral-200 rounded-lg" /> {/* Countdown Card */}
  <div className="space-y-2">
    <div className="h-4 bg-neutral-200 rounded w-3/4" />
    <div className="h-4 bg-neutral-200 rounded w-1/2" />
  </div>
  <div className="h-48 bg-neutral-200 rounded-lg" /> {/* Boarding Phases */}
  <div className="h-40 bg-neutral-200 rounded-lg" /> {/* Boarding Pass */}
</div>
```

**Duration:** 500-800ms (mock delay) or until API returns

**Messaging:** None (skeleton is self-explanatory)

#### Error State

**Scenarios:**
1. **Gate Not Yet Assigned:** Gate data returns null
2. **Flight Cancelled:** Status = 'cancelled'
3. **Flight Diverted:** New airport, new gate
4. **Network Error:** API call fails

**Error State 1 — Gate Not Assigned:**
```
┌─────────────────────────────┐
│ ⚠ Gate Not Yet Assigned    │
│                             │
│ Your flight has not been    │
│ assigned to a gate yet.     │
│ Check back in 5 minutes.    │
│                             │
│ [Refresh Now] [OK]         │
│                             │
│ Status: On Time             │
│ Seat: 12A confirmed         │
│ Boarding starts: 10:20 AM   │
└─────────────────────────────┘
```

**Error State 2 — Flight Cancelled:**
```
┌─────────────────────────────┐
│ 🚫 Flight Cancelled         │
│                             │
│ UA 901 (SFO → LHR) has      │
│ been cancelled due to       │
│ weather. Rebooking options  │
│ are available.              │
│                             │
│ [View Options] [Contact]   │
│                             │
│ Original departure:         │
│ Today 11:00 AM from SFO     │
└─────────────────────────────┘
```

**Error State 3 — Network Error:**
```
┌─────────────────────────────┐
│ ⚠ Connection Error         │
│                             │
│ Unable to fetch gate info.  │
│ Last update: 2 minutes ago  │
│                             │
│ Seat: 12A (cached)         │
│ Boarding: ~10:50 AM        │
│                             │
│ [Retry] [Offline Mode]     │
└─────────────────────────────┘
```

**Recovery Actions:**
- "Refresh Now" button → retry API call
- "Offline Mode" → show cached data with "Last updated X minutes ago"
- Auto-retry every 15 seconds if error persists
- Show toast "Gate information updated" when error resolves

#### Empty State

**Scenario:** User navigates to gate screen before flight is booked or assigned

```
┌─────────────────────────────┐
│                             │
│        ✈️                   │
│                             │
│   No Active Flight          │
│                             │
│ You don't have an active    │
│ flight assigned yet.        │
│                             │
│ [Book a Flight] [Trips]    │
│                             │
└─────────────────────────────┘
```

#### Offline State

**When:** Device loses connectivity

```
┌─────────────────────────────┐
│ 📡 Offline Mode             │
│                             │
│ Using cached information.   │
│ Real-time data unavailable. │
│                             │
│ Departure: 10:45 AM         │
│ Gate: C15 (last known)      │
│ Boarding: ~10:50 AM         │
│                             │
│ Last updated: 3 min ago     │
│ [Refresh when online]       │
└─────────────────────────────┘
```

**Behavior:**
- Show all cached data with timestamp
- Disable pull-to-refresh, show "Offline — cannot refresh" message
- Remove real-time countdown updates (show static estimate)
- Toast on reconnect: "Connected — refreshing gate information"

---

### 13. Edge Cases & Error Handling

**Missing Gate Assignment:**
- If gate is null but flight status is "boarding," show "Gate not yet assigned" alert
- Provide fallback: "Monitor airport displays or ask gate agent"
- Auto-update every 10 seconds until gate is assigned

**Gate Change During Boarding:**
- Show toast notification "Gate changed from C15 to D12"
- Highlight new gate information prominently
- Update countdown based on new gate distance if location available

**Boarding Phase Mismatch:**
- If passenger boarding group (Group 3) is past in phase list but passenger not yet boarded:
  - Show warning: "Your group should have boarded — check with gate agent"
  - Provide gate agent contact info

**Connection in Jeopardy:**
- If current flight is delayed and connection time drops below 45 minutes:
  - Show red alert: "Your connection is at risk"
  - Provide option to rebook proactively
  - Show international customs/immigration time (if applicable)

**Family Member Missing From Boarding:**
- If family trip and one member's boarding pass is not scanned while others are:
  - Alert: "Zoe's boarding pass hasn't been scanned yet — is she boarding?"
  - Show family member status in boarding pass carousel

**Mobile Boarding Pass Expired:**
- If boarding pass QR code is older than flight departure time:
  - Show warning: "Your mobile boarding pass has expired"
  - Provide option to generate new pass or use gate agent assistance

**Location Permissions Denied:**
- If user denies location permission for gate wayfinding:
  - Show static gate directions (text-based) instead of map
  - Option to enable in Settings

**No Nearby Amenities:**
- If no amenities within reasonable distance of gate:
  - Show "No nearby amenities" with terminal map link
  - Suggest asking gate agent for recommendations

---

### 14. Testing Requirements

**Component Tests:**

```typescript
describe('GateCountdownCard', () => {
  it('displays flight information correctly', () => {
    const props = { /* test data */ };
    render(<GateCountdownCard {...props} />);
    expect(screen.getByText('UA 901')).toBeInTheDocument();
    expect(screen.getByText('C15')).toBeInTheDocument();
  });

  it('updates countdown every second', () => {
    const props = { /* test data */ };
    render(<GateCountdownCard {...props} />);
    const initial = screen.getByText(/1h 34m/);
    jest.advanceTimersByTime(1000);
    expect(screen.getByText(/1h 33m/)).toBeInTheDocument();
  });

  it('shows delayed status with red text', () => {
    const props = { isLate: 15, status: 'delayed' };
    render(<GateCountdownCard {...props} />);
    expect(screen.getByText(/\+15 min/).parentElement).toHaveClass('text-red-600');
  });

  it('handles gate change notification', () => {
    const { rerender } = render(<GateCountdownCard {...mockProps} />);
    expect(screen.getByText('C15')).toBeInTheDocument();
    rerender(<GateCountdownCard gate="D12" {...mockProps} />);
    expect(screen.queryByText('C15')).not.toBeInTheDocument();
    expect(screen.getByText('D12')).toBeInTheDocument();
  });
});

describe('BoardingPhaseIndicator', () => {
  it('renders all phases with correct status', () => {
    render(<BoardingPhaseIndicator currentPhase="group_2" />);
    expect(screen.getByText(/Gate Assigned.*✓/)).toBeInTheDocument();
    expect(screen.getByText(/Pre-Boarding/)).toBeInTheDocument();
    expect(screen.getByText(/Group 2.*in_progress/)).toBeInTheDocument();
  });

  it('displays passenger group and estimated boarding time', () => {
    render(<BoardingPhaseIndicator passengerGroup="group_3" estimatedGroupTime="10:50 AM" />);
    expect(screen.getByText(/Group 3/)).toBeInTheDocument();
    expect(screen.getByText(/10:50 AM/)).toBeInTheDocument();
  });
});

describe('DigitalBoardingPass', () => {
  it('renders QR code with correct data', () => {
    render(<DigitalBoardingPass {...mockPassData} />);
    expect(screen.getByAltText(/QR code/)).toBeInTheDocument();
  });

  it('expands to fullscreen on tap', () => {
    const { container } = render(<DigitalBoardingPass {...mockPassData} />);
    fireEvent.click(screen.getByText(/Tap to show/));
    expect(container.querySelector('[role="dialog"]')).toHaveClass('fixed inset-0');
  });

  it('displays passenger name and seat correctly', () => {
    render(<DigitalBoardingPass {...mockPassData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('12A')).toBeInTheDocument();
  });
});

describe('GateBoardingStatus (integration)', () => {
  it('fetches and displays gate data on mount', async () => {
    render(<GateBoardingStatus flightId="UA901" />);
    await waitFor(() => {
      expect(screen.getByText('C15')).toBeInTheDocument();
    });
  });

  it('handles pull-to-refresh gesture', async () => {
    const { container } = render(<GateBoardingStatus flightId="UA901" />);
    const pullElement = container.querySelector('[role="status"]');

    // Simulate pull-to-refresh
    fireEvent.pointerDown(pullElement, { clientY: 0 });
    fireEvent.pointerMove(pullElement, { clientY: 100 });
    fireEvent.pointerUp(pullElement);

    await waitFor(() => {
      expect(screen.getByText(/Refreshed/)).toBeInTheDocument();
    });
  });

  it('displays error state on API failure', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'));
    render(<GateBoardingStatus flightId="UA901" />);

    await waitFor(() => {
      expect(screen.getByText(/Connection Error/)).toBeInTheDocument();
    });
  });

  it('shows gate change alert when gate updates', async () => {
    const { rerender } = render(<GateBoardingStatus flightId="UA901" />);

    // Simulate gate change
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ gate: 'D12' })
    });

    rerender(<GateBoardingStatus flightId="UA901" />);

    await waitFor(() => {
      expect(screen.getByText(/Gate changed from C15 to D12/)).toBeInTheDocument();
    });
  });
});
```

**Key Assertions:**
- Countdown decreases every second
- Gate assignment displays correctly
- Boarding phase status updates on real-time changes
- Gate change notifications appear
- Digital boarding pass QR code is scannable
- Connection warnings appear for tight connections
- Mobile and desktop layouts render correctly
- Offline state shows cached data

**Accessibility Tests:**
```typescript
describe('GateBoardingStatus accessibility', () => {
  it('has proper heading hierarchy', () => {
    render(<GateBoardingStatus {...props} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Gate and Boarding Status');
  });

  it('countdown is announced with aria-live', () => {
    render(<GateBoardingStatus {...props} />);
    expect(screen.getByLabelText(/Time to departure/)).toHaveAttribute('aria-live', 'polite');
  });

  it('boarding phases are keyboard navigable', () => {
    render(<GateBoardingStatus {...props} />);
    const phases = screen.getByRole('list', { name: /Boarding progress/ });
    expect(phases).toBeInTheDocument();
    expect(phases.querySelectorAll('li')).toHaveLength(5);
  });

  it('digital boarding pass is expandable with keyboard', () => {
    render(<GateBoardingStatus {...props} />);
    const expandButton = screen.getByRole('button', { name: /Tap to show/ });
    fireEvent.keyDown(expandButton, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

---

### 15. Build Checklist

- [ ] **Route created:** `(main)/airport/[airportCode]/gate/[gateNumber]/page.tsx`
- [ ] **Layout integrated:** ContextualHeader, BottomTabBar visible
- [ ] **GateCountdownCard component:** Built with countdown timer, status indicator
- [ ] **BoardingPhaseIndicator component:** Renders all phases with visual status
- [ ] **DigitalBoardingPass component:** QR code rendering, tap-to-expand functionality
- [ ] **ConnectionWarningCard component:** Shows when next flight connection is tight
- [ ] **GateLocationCard component:** Gate number, terminal, distance info
- [ ] **NearbyAmenitiesSection component:** Restroom, food, charging, family lounge proximity
- [ ] **Pull-to-refresh:** Implemented, refetches gate status
- [ ] **Real-time polling:** Gate status updates every 10 seconds
- [ ] **Gate change detection:** Toast notification on gate change
- [ ] **Boarding phase updates:** Visual indicator advances with real-time data
- [ ] **Mock data connected:** `mockGateBoardingData` loaded from lib/mock-data
- [ ] **Persona adaptations applied:**
  - [ ] PERSONA-01 (Alexandra): Premium styling, elite badges, lounge info
  - [ ] PERSONA-02 (Marcus): Connection focus, productivity time, policy compliance
  - [ ] PERSONA-03 (Chen Family): Family seating confirmation, kid-friendly language
- [ ] **Loading state implemented:** Skeleton screen while fetching data
- [ ] **Error states implemented:** Gate not assigned, flight cancelled, network error
- [ ] **Empty state implemented:** No active flight message
- [ ] **Offline state implemented:** Cached data with timestamp
- [ ] **Accessibility verified:**
  - [ ] ARIA labels on main sections
  - [ ] Focus indicators visible
  - [ ] Keyboard navigation working (Tab, Enter, Escape)
  - [ ] Screen reader flow logical
  - [ ] Color contrast checked (4.5:1 minimum)
  - [ ] Touch targets 44×44pt
- [ ] **Responsive design verified:**
  - [ ] Mobile (320px): Countdown full width, vertical stacking
  - [ ] Tablet (768px): Two-column layout, larger countdown
  - [ ] Desktop (1024px): Three-column flexible layout
- [ ] **Animations implemented:**
  - [ ] Countdown ticks smoothly
  - [ ] Boarding phase checkmarks animate
  - [ ] Gate change alerts slide in
  - [ ] QR code expansion smooth
- [ ] **Tests passing:**
  - [ ] Unit tests for countdown logic
  - [ ] Component render tests
  - [ ] Integration tests for data fetching
  - [ ] Accessibility tests
- [ ] **Performance verified:** Core Web Vitals green (LCP <2.5s, FID <100ms, CLS <0.1)

---

## Summary

SCR-011 (Gate & Boarding) is the critical pre-departure checkpoint screen that bridges airport navigation and flight departure. It provides real-time gate assignment, boarding phase progression, digital boarding pass, and connection monitoring. The screen uses a countdown-hero layout with phased information presentation, supporting all three personas with distinct adaptations. Real-time polling every 10 seconds ensures travelers always have current gate and boarding information, while pull-to-refresh provides manual update capability. Comprehensive error handling, offline support, and accessibility features ensure reliability across all conditions.

