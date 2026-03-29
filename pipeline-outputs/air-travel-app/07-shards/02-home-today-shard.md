# Home / Today View — Build Shard
## AirThere | Screen SCR-002 | Shard 02

---

## 1. Screen Overview

**Screen ID:** SCR-002
**Screen Name:** Home / Today View
**Purpose:** Contextual home screen that transforms based on travel status. On non-travel days, shows destination inspiration feed. On travel days (5:00 AM to landing), shows day-of-travel dashboard with countdown timer, next actions, and real-time flight status.

### Journey Role
SCR-002 is the primary entry point after onboarding. It's the screen users see when launching the app. The home screen serves as the psychological "hub" of the travel operating system—the place where users understand their current status and next priority actions.

**Two Distinct Modes:**
1. **Non-Travel Day Mode:** Inspiration feed showing recommended destinations, upcoming trip summaries, deal alerts
2. **Travel Day Mode (5:00 AM+):** Real-time flight status, countdown timer, security queue times, gate updates

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/home/page.tsx
```

### File Structure
```
src/
└── app/
    └── (main)/
        ├── home/
        │   ├── page.tsx                           # Home page
        │   ├── layout.tsx                         # Home-specific layout (if needed)
        │   ├── components/
        │   │   ├── HomeHero.tsx                   # Adaptive header
        │   │   ├── NonTravelDayView.tsx           # Inspiration feed layout
        │   │   ├── TravelDayView.tsx              # Travel day layout
        │   │   ├── CountdownHero.tsx              # Large countdown display
        │   │   ├── UpcomingTripsCarousel.tsx      # Next trip preview
        │   │   ├── DestinationCard.tsx            # Reusable destination card
        │   │   ├── NextActionCard.tsx             # Action reminder card
        │   │   ├── QuickStatusGrid.tsx            # 3-column status cards
        │   │   ├── AlertsSection.tsx              # Real-time alerts
        │   │   └── HomeLoadingSkeleton.tsx        # Loading state
        │   ├── hooks/
        │   │   ├── useHomeMode.ts                 # Detect travel day
        │   │   ├── useUpcomingTrips.ts            # Fetch trips
        │   │   ├── useCountdown.ts                # Countdown timer
        │   │   └── useTravelDayStatus.ts          # Real-time flight status
        │   ├── types/
        │   │   └── index.ts                       # Home-specific types
        │   └── constants/
        │       └── homeContent.ts                 # Destination card content
        └── layout.tsx                             # Main app layout with nav
```

### Layout Group
- **Group:** (main) — Main app route group (includes bottom tab bar)
- **Shared Layout:** Inherits MainLayout with BottomTabBar
- **Visibility:** Tab bar visible, header adaptive (hide on scroll down)

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-001 (Onboarding):** User must be authenticated
- **Tech Setup (Section 0):** Mock services, design tokens
- **Mock Data Services:** tripService, flightService, userService
- **Components from Step 0:** BottomTabBar, ContextualHeader, LoadingSkeleton

### Shared Components Required
- `Button` (Shadcn): CTA buttons
- `Card` (Shadcn): Trip cards, destination cards
- `Skeleton` (Shadcn): Loading placeholders
- `PullToRefresh` (custom): Swipe-to-refresh gesture
- `Carousel` (custom): Horizontal scroll for upcoming trips
- `CountdownTimer` (custom): Real-time countdown display

### Mock Data Requirements
- `generateMockTrips()` — Create upcoming trips with realistic data
- `generateMockDestinations()` — Create inspiration destination cards
- `generateFlightStatus()` — Create real-time flight status updates
- Real-time alerts (security queues, weather, gate changes)

### Downstream Dependencies
- **SCR-003 (Discover):** Link to full inspiration feed
- **SCR-004 (Search):** Link from destination cards
- **SCR-008 (Trip Dashboard):** Link from trip cards

---

## 4. Component Hierarchy

### Full Component Tree

```
HomePage (page.tsx)
├── HomePageContainer (flex column, full-screen)
│   ├── HomeHero (adaptive header)
│   │   ├── GreetingText (personalized, e.g., "Hello, Alexandra")
│   │   ├── TimeDisplay (current time: 9:41)
│   │   └── StatusText (contextual: "No travel today" or "Depart in 3h 22m")
│   │
│   ├── MainContent (scrollable, pb-24 for tab bar)
│   │   ├── NonTravelDayView OR TravelDayView (conditional)
│   │   │
│   │   ├── NonTravelDayView (if !isTravelDay)
│   │   │   ├── UpcomingTripsSection
│   │   │   │   ├── SectionHeading ("Your Next Trips")
│   │   │   │   └── TripsCarousel
│   │   │   │       ├── TripCard[] (horizontal scroll)
│   │   │   │       │   ├── Route (SFO → LHR)
│   │   │   │       │   ├── Date (Mar 30)
│   │   │   │       │   ├── Flight# (UA 901)
│   │   │   │       │   ├── DepartTime (11:00 AM)
│   │   │   │       │   └── MoreActionsButton
│   │   │   │       └── EmptyState (if no upcoming trips)
│   │   │   │
│   │   │   └── InspirationSection
│   │   │       ├── SectionHeading ("Inspiration for You")
│   │   │       ├── SectionDescription ("Personalized based on your preferences")
│   │   │       └── DestinationCardGrid (2-column on mobile, 3+ on desktop)
│   │   │           ├── DestinationCard[] (repeating)
│   │   │           │   ├── ImageCarousel (landscape photo)
│   │   │           │   ├── Destination (h3, city name)
│   │   │           │   ├── HighlightsPreview (3-5 bullets)
│   │   │           │   ├── PriceRange ("From $1,299")
│   │   │           │   ├── SaveButton (heart icon, toggle)
│   │   │           │   └── TapToSearch (→ SCR-004)
│   │   │           └── LoadMoreButton (infinite scroll)
│   │   │
│   │   └── TravelDayView (if isTravelDay, shows at 5:00 AM)
│   │       ├── CountdownHero (full-width gradient card)
│   │       │   ├── Route (San Francisco → London)
│   │       │   ├── Airline (United UA 901)
│   │       │   ├── DepartTime (11:00 AM)
│   │       │   ├── Gate (C15, updates real-time)
│   │       │   ├── Seat (12A)
│   │       │   └── CountdownTimer (large: 3h 22m)
│   │       │
│   │       ├── NextActionCard
│   │       │   ├── ActionIcon (✅)
│   │       │   ├── ActionText ("Check-in opens in 23 hours")
│   │       │   ├── ActionTiming (countdown to check-in)
│   │       │   └── ActionButton (Check In Now — grayed if not available)
│   │       │
│   │       ├── QuickStatusGrid (3-column grid)
│   │       │   ├── SeatCard (12A)
│   │       │   ├── LoungeCard (Ready)
│   │       │   ├── DocumentsCard (✓)
│   │       │   └── PointsCard (+3,500)
│   │       │
│   │       └── AlertsSection
│   │           ├── SectionHeading ("Real-Time Alerts")
│   │           ├── AlertItem[] (each alert has icon, message, action)
│   │           │   ├── AlertIcon (ℹ️, ⚠️, 🔴)
│   │           │   ├── AlertMessage
│   │           │   └── AlertAction (link to detail screen)
│   │           └── ScrollIndicator (if more alerts off-screen)
│   │
│   └── PullToRefresh (wrapper, updates all data)
│       ├── RefreshThreshold (60px)
│       ├── LoadingAnimation (rotate icon)
│       └── SuccessMessage ("Refreshed 2 min ago")
│
└── FloatingButtons (conditional, sticky)
    └── NotificationBadge (if unread notifications)
```

### Component Relationships

**Parent → Child:**
- `HomePage` → HomeHero, MainContent
- `MainContent` → NonTravelDayView OR TravelDayView
- `NonTravelDayView` → UpcomingTripsSection, InspirationSection
- `TravelDayView` → CountdownHero, NextActionCard, QuickStatusGrid, AlertsSection
- `DestinationCardGrid` → DestinationCard[] (n items)
- `QuickStatusGrid` → StatusCard[] (4 items)

**Shared Props:**
- `currentUser` (UserProfile) passed from context
- `upcomingTrips` (Trip[]) from tripService
- `destinations` (Destination[]) from discoveryService
- `isTravelDay` (boolean) computed from trip dates

---

## 5. Component Specifications

### Component: HomeHero

**Props Interface:**
```typescript
interface HomeHeroProps {
  persona?: 'premium' | 'business' | 'family';
  isTravelDay: boolean;
  userName: string;
  currentTime: Date;
  nextDepartureTime?: Date;
}
```

**Internal State:**
```typescript
const [timeString, setTimeString] = useState(formatTime(currentTime));

useEffect(() => {
  const interval = setInterval(() => {
    setTimeString(formatTime(new Date()));
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

**Tailwind Classes:**
```typescript
const styles = {
  header: 'sticky top-0 z-40 bg-white border-b border-neutral-200 px-4 py-4',
  content: 'flex flex-col sm:flex-row sm:justify-between sm:items-center',
  greeting: 'text-lg font-semibold text-neutral-900',
  subtext: 'text-sm text-neutral-600 flex items-center gap-2',
  travelDayHeader: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
  travelDayText: 'text-base font-bold text-white',
  departCountdown: 'text-primary-100 text-sm',
};
```

**Responsive Behavior:**
- Mobile: Single-column, time below greeting
- Tablet+: Two-column with time on right
- Hide on scroll down (controlled by parent scroll handler)

**Shadcn UI Base:** None (custom layout)

---

### Component: CountdownHero

**Props Interface:**
```typescript
interface CountdownHeroProps {
  trip: Trip;
  departureTime: Date;
  status: 'upcoming' | 'boarding' | 'departed' | 'landed';
  gate?: string;
  seat?: string;
  realTimeUpdates?: {
    gateChanged?: boolean;
    delayMinutes?: number;
    boarding?: boolean;
  };
}
```

**Internal State:**
```typescript
const [countdown, setCountdown] = useState<{hours: number; minutes: number; seconds: number}>();

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = departureTime.getTime() - now.getTime();
    if (diff > 0) {
      setCountdown({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
  }, 1000);
  return () => clearInterval(interval);
}, [departureTime]);
```

**Tailwind Classes:**
```typescript
const styles = {
  hero: 'bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 mx-4 my-6 text-white shadow-lg',
  route: 'text-base font-medium opacity-90 mb-2',
  airline: 'text-sm opacity-75 mb-4',
  details: 'grid grid-cols-2 gap-4 mb-6 text-sm',
  detailItem: 'flex flex-col',
  detailLabel: 'text-xs opacity-75 uppercase',
  detailValue: 'text-lg font-semibold',
  countdownContainer: 'flex flex-col items-center justify-center py-8 border-t border-primary-400',
  countdownNumber: 'text-6xl font-bold leading-none',
  countdownLabel: 'text-sm opacity-75 mt-2',
  gateWarning: 'absolute top-4 right-4 bg-warning-500 px-3 py-1 rounded-full text-xs font-semibold',
};
```

**Responsive Behavior:**
- Mobile: Full-width, large countdown text (48px)
- Tablet+: Slightly constrained, countdown remains large
- Adapt for portrait/landscape rotation

**Shadcn UI Base:** None (custom)

---

### Component: DestinationCard

**Props Interface:**
```typescript
interface DestinationCardProps {
  id: string;
  destination: string;
  highlights: string[];
  priceRange: string;
  imageUrl: string;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onSearch?: (destination: string) => void;
  persona?: 'premium' | 'business' | 'family';
}
```

**Internal State:**
```typescript
const [saved, setSaved] = useState(isSaved || false);
const [imageLoading, setImageLoading] = useState(true);
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200',
  image: 'w-full h-40 object-cover bg-neutral-200 animate-pulse',
  imageLoaded: 'animate-none',
  content: 'p-4',
  destination: 'text-base font-semibold text-neutral-900 mb-2',
  highlights: 'text-xs text-neutral-600 space-y-1 mb-3',
  highlightItem: 'flex items-start gap-2',
  highlightBullet: 'mt-1 flex-shrink-0 text-primary-500',
  priceRange: 'text-sm font-medium text-primary-600 mb-3',
  buttonGroup: 'flex gap-2',
  saveButton: 'flex-1 py-2 px-3 rounded-lg border border-neutral-300 text-sm font-medium',
  saveButtonSaved: 'bg-primary-50 border-primary-300 text-primary-600',
  searchButton: 'flex-1 py-2 px-3 rounded-lg bg-primary-500 text-white text-sm font-medium',
};
```

**Responsive Behavior:**
- Mobile: Full-width card, 2-column grid
- Tablet: 2-column grid
- Desktop: 3+ column grid

**Shadcn UI Base:** `Card` component

---

### Component: NextActionCard

**Props Interface:**
```typescript
interface NextActionCardProps {
  icon: '✅' | '📱' | '🎫' | '⚠️' | '❌';
  action: string;
  timing: string;
  timeValue?: Date;
  primaryAction?: { label: string; handler: () => void; disabled?: boolean };
  secondaryAction?: { label: string; handler: () => void };
}
```

**Internal State:**
```typescript
const [timeRemaining, setTimeRemaining] = useState<string>(timing);

useEffect(() => {
  if (timeValue) {
    const interval = setInterval(() => {
      const diff = timeValue.getTime() - new Date().getTime();
      setTimeRemaining(formatTimeDiff(diff));
    }, 1000);
    return () => clearInterval(interval);
  }
}, [timeValue]);
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'mx-4 my-4 p-4 rounded-lg border-l-4 border-primary-500 bg-primary-50',
  cardWarning: 'border-warning-500 bg-warning-50',
  cardError: 'border-error-500 bg-error-50',
  header: 'flex items-center gap-3 mb-2',
  icon: 'text-2xl flex-shrink-0',
  actionText: 'text-sm font-medium text-neutral-900',
  timing: 'text-xs text-neutral-600 mt-1',
  button: 'mt-3 py-2 px-4 rounded-lg text-sm font-medium',
  buttonDisabled: 'opacity-50 cursor-not-allowed',
};
```

**Responsive Behavior:**
- Mobile: Full-width, button stack vertically
- Tablet+: Button inline if room

**Shadcn UI Base:** `Button` component

---

## 6. Layout & Wireframe

### Non-Travel Day — Mobile Layout

```
┌─────────────────────────────────────┐
│ Hello, Alexandra        9:41        │  ← HomeHero
│ No travel today                     │
├─────────────────────────────────────┤
│ Your Next Trips                     │  ← SectionHeading
│ ┌──────────┐ ┌──────────┐          │
│ │SFO → LHR │ │NYC → CDG │          │  ← TripCard carousel
│ │Mar 30    │ │Apr 5     │          │
│ │UA 901    │ │AA 213    │          │
│ └──────────┘ └──────────┘          │
│ ← Swipe for more →                 │
├─────────────────────────────────────┤
│ Inspiration for You                 │  ← SectionHeading
│ Personalized based on your travel   │
│ preferences                         │
├─────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ 🏝️ Bali, Indonesia               │ │  ← DestinationCard 1
│ │ [Photo: Beach sunset]             │ │
│ │                                  │ │
│ │ Tropical beaches & temples       │ │
│ │ • Ubud rice terraces             │ │
│ │ • Bali temples                   │ │
│ │ • Beach clubs & nightlife        │ │
│ │                                  │ │
│ │ From $1,299                      │ │
│ │ [♡ Save] [Search →]              │ │
│ └──────────────────────────────────┘ │
│                                     │
│ ┌──────────────────────────────────┐ │
│ │ 🏔️ Swiss Alps, Switzerland       │ │  ← DestinationCard 2
│ │ [Photo: Mountain vista]          │ │
│ │ ... [Similar structure]          │ │
│ └──────────────────────────────────┘ │
│                                     │
│ [Load More Destinations]            │
│                                     │
└─────────────────────────────────────┘
```

### Travel Day (5:00 AM+) — Mobile Layout

```
┌─────────────────────────────────────┐
│ 🛫 Depart in 3h 22m                 │  ← TravelDayHeader
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ San Francisco → London          │ │  ← CountdownHero
│ │ United UA 901                   │ │
│ │                                 │ │
│ │ Depart: 11:00 AM  │  Gate: C15  │ │
│ │ Seat: 12A                       │ │
│ │                                 │ │
│ │  ┌───────────────────────────┐  │ │
│ │  │ 3                         │  │ │
│ │  │ HOURS                     │  │ │
│ │  └───────────────────────────┘  │ │
│ │         22 MINUTES               │ │
│ │         45 SECONDS               │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ ✅ Check-in opens in 23h            │  ← NextActionCard
│ [Check In Now] (disabled)           │
├─────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐         │
│ │ Seat │ │Lounge│ │Docs  │         │  ← QuickStatusGrid
│ │  12A │ │Ready │ │  ✓   │         │
│ └──────┘ └──────┘ └──────┘         │
├─────────────────────────────────────┤
│ Real-Time Alerts                    │  ← AlertsSection
│                                     │
│ ℹ️ Security line: 47 min wait       │
│ ⚠️ Weather: Light turbulence...     │
│ 🔵 Gate: Updated to C15             │
│                                     │
└─────────────────────────────────────┘
```

### Tablet (768px+) — Two-Column Layout

```
┌─────────────────────────────────────────────────┐
│ Hello, Alexandra                       9:41      │
│ No travel today                                 │
├─────────────────────────────────────────────────┤
│ Your Next Trips                                 │
│ [Trip Card] [Trip Card] [Trip Card] ← 3-col    │
├─────────────────────────────────────────────────┤
│ Inspiration for You                             │
│ ┌─────────────────┐ ┌─────────────────┐         │
│ │[Destination 1]  │ │[Destination 2]  │         │  ← 2-col grid
│ └─────────────────┘ └─────────────────┘         │
│ ┌─────────────────┐ ┌─────────────────┐         │
│ │[Destination 3]  │ │[Destination 4]  │         │
│ └─────────────────┘ └─────────────────┘         │
└─────────────────────────────────────────────────┘
```

### Desktop (1024px+) — Three-Column Layout

Similar to tablet, but 3+ columns for destination cards.

---

## 7. Interaction Patterns

### Swipe/Scroll Behaviors

**Upcoming Trips Carousel (Horizontal Scroll):**
- Drag left/right to scroll
- Snap to card boundaries
- Haptic feedback on snap
- Show scroll indicator (if more cards)

**Destination Cards (Vertical Scroll):**
- Standard vertical scroll
- Pull-to-refresh gesture (60px threshold)
- Infinite scroll: Load more cards as user scrolls near bottom
- Smooth scroll animation

**Scroll-Linked Animations:**
- Hide header on scroll down (if user scrolling through content)
- Show header on scroll up or pull-to-refresh

### Tap/Click Interactions

**Trip Card Tap:**
- Tap anywhere on card → Navigate to Trip Dashboard (SCR-008)
- Visual feedback: Slight scale animation (1.02x)

**Destination Card Tap:**
- Tap card (not button) → Navigate to Search (SCR-004) with destination pre-filled
- Tap "Save" (heart) → Toggle saved state (visual feedback: color change + animation)
- Tap "Search" button → Navigate to Search with destination

**Next Action Button:**
- Tap primary button → Navigate to relevant screen or trigger action
- Tap secondary button → Alternative action (e.g., "Skip this step")
- Disabled button: No response, grayed out

**Alert Item Tap:**
- Tap alert → Navigate to relevant detail screen (e.g., Airport Live if security queue)

### Loading & Refresh

**Pull-to-Refresh:**
```
User pulls down 60px threshold
    ↓
Loading state: Icon rotates, message "Refreshing..."
    ↓
API calls complete (or mock timeout ~500ms)
    ↓
Success state: "Refreshed 2 minutes ago"
    ↓
Auto-dismiss after 2s
```

**Infinite Scroll:**
- When user scrolls near bottom (within 200px), fetch next page
- Show loading skeleton while fetching
- Append new cards to grid

### State Animations

**Save Button Toggle:**
```typescript
// Heart icon animation: scale + color change
opacity: 0.5 → 1.0
transform: scale(1) → scale(1.2) → scale(1)
color: neutral-600 → primary-500
```

**Trip Tap Feedback:**
```typescript
// Slight press animation
transform: scale(1) → scale(0.98) on press
transform: scale(0.98) → scale(1) on release
```

---

## 8. State Management

### Local Component State

**HomePage:**
```typescript
const [isTravelDay, setIsTravelDay] = useState(false);
const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
const [destinations, setDestinations] = useState<Destination[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [headerVisible, setHeaderVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
```

**DestinationCard:**
```typescript
const [saved, setSaved] = useState(isSaved || false);
const [imageLoading, setImageLoading] = useState(true);
```

**CountdownHero:**
```typescript
const [countdown, setCountdown] = useState<{hours: number; minutes: number; seconds: number}>();
const [realTimeUpdates, setRealTimeUpdates] = useState(realTimeUpdates || {});
```

### Global State (Context)

**UserContext (from Shard 01):**
```typescript
const { user, currentTrip } = useAuth();
```

**TripContext:**
```typescript
const { upcomingTrips, activeTrip, refetchTrips } = useTrips();
```

### URL State

**Query Parameters:** None on home screen
**Hash Fragments:** Not used
**URL Routing:** Navigation handled by Next.js Link component

### Derived State

```typescript
// Is it a travel day?
const isTravelDay = useMemo(() => {
  if (!activeTrip) return false;
  const now = new Date();
  const departTime = new Date(activeTrip.departureTime);
  const arriveTime = new Date(activeTrip.arrivalTime);
  const fiveAMToday = new Date();
  fiveAMToday.setHours(5, 0, 0, 0);
  return now >= fiveAMToday && now <= arriveTime;
}, [activeTrip]);

// What's the next action?
const nextAction = useMemo(() => {
  if (!activeTrip) return null;
  const now = new Date();
  const checkInTime = new Date(activeTrip.departureTime.getTime() - 24 * 60 * 60 * 1000);
  if (now < checkInTime) {
    return { action: 'check-in', timeValue: checkInTime };
  }
  const boardingTime = new Date(activeTrip.departureTime.getTime() - 30 * 60 * 1000);
  if (now < boardingTime) {
    return { action: 'boarding', timeValue: boardingTime };
  }
  return null;
}, [activeTrip]);

// Countdown until departure
const countdown = useMemo(() => {
  if (!activeTrip) return null;
  const diff = activeTrip.departureTime.getTime() - new Date().getTime();
  if (diff <= 0) return null;
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  };
}, [activeTrip]);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
// src/lib/types/trip.ts
export interface Trip {
  id: string;
  user_id: string;
  booking_id: string;
  departureTime: Date;
  arrivalTime: Date;
  origin: Airport;
  destination: Airport;
  airline: Airline;
  flightNumber: string;
  aircraft: string;
  cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
  seat?: string;
  gate?: string;
  status: 'upcoming' | 'boarding' | 'departed' | 'landed' | 'cancelled';
  passengers: Passenger[];
  documents: Document[];
  alerts?: Alert[];
}

export interface Destination {
  id: string;
  name: string;
  highlights: string[];
  priceRange: string;
  imageUrl: string;
  country: string;
  continent: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  trending: boolean;
  isSaved?: boolean;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  action?: { label: string; path: string };
  timestamp: Date;
}
```

### Mock Data

```typescript
// src/lib/mock-data/trips.ts
export function generateMockTrips(): Trip[] {
  return [
    {
      id: 'trip-001',
      user_id: 'user-001',
      booking_id: 'BK-UA-23948',
      departureTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      arrivalTime: new Date(new Date().getTime() + 3.5 * 24 * 60 * 60 * 1000),
      origin: AIRPORTS.SFO,
      destination: AIRPORTS.LHR,
      airline: AIRLINES.UA,
      flightNumber: 'UA 901',
      aircraft: 'B777',
      cabinClass: 'business',
      seat: '12A',
      gate: 'C15',
      status: 'upcoming',
      passengers: [{ name: 'Alexandra Sterling', age: 45 }],
      documents: [{ type: 'passport', verified: true }],
    },
    // ... more trips
  ];
}

export function generateMockDestinations(): Destination[] {
  return [
    {
      id: 'dest-001',
      name: 'Bali, Indonesia',
      highlights: [
        'Ubud rice terraces',
        'Bali temples',
        'Beach clubs & nightlife',
      ],
      priceRange: 'From $1,299',
      imageUrl: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60',
      country: 'Indonesia',
      continent: 'Asia',
      sentiment: 'positive',
      trending: true,
    },
    // ... more destinations
  ];
}
```

### API Swap Strategy

```typescript
// src/lib/services/tripService.ts
export interface ITripService {
  getUpcomingTrips(): Promise<Trip[]>;
  getActiveTrip(): Promise<Trip | null>;
  getTripDetails(tripId: string): Promise<Trip>;
  refetchTrips(): Promise<void>;
}

// Mock implementation
export class MockTripService implements ITripService {
  async getUpcomingTrips(): Promise<Trip[]> {
    // Simulate 300ms API latency
    await new Promise(r => setTimeout(r, 300));
    return generateMockTrips();
  }

  async getActiveTrip(): Promise<Trip | null> {
    const trips = await this.getUpcomingTrips();
    const now = new Date();
    return trips.find(t => {
      const fiveAMToday = new Date();
      fiveAMToday.setHours(5, 0, 0, 0);
      return now >= fiveAMToday && now <= t.arrivalTime;
    }) || null;
  }

  // ...other methods
}

// Real implementation (placeholder)
export class RealTripService implements ITripService {
  async getUpcomingTrips(): Promise<Trip[]> {
    const response = await fetch('/api/trips');
    return response.json();
  }

  // ...other methods
}

const useMockAPI = process.env.NEXT_PUBLIC_API_MODE !== 'real';
export const tripService = useMockAPI ? new MockTripService() : new RealTripService();
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")

**Destination Cards Variation:**
- Show luxury destinations (Paris, Tokyo, Maldives)
- Highlight: First-class availability, premium hotels
- Price: $5,000+
- Emojis: 💎 (luxury)

**Quick Status Grid:**
- Emphasize: Lounge access, elite status, upgrades
- Show: Current elite tier, points balance, upgrade options

**Countdown Hero:**
- Color: Gold accents (premium aesthetic)
- Highlight: Gate, seat preference (aisle first-class)
- Emphasize: Lounge access available

**Next Actions:**
- Highlight: Biometric check-in, lounge early access
- Concierge availability 24/7

### PERSONA-02: Business ("Marcus")

**Destination Cards Variation:**
- Show business hubs (NYC, London, Singapore, Tokyo)
- Highlight: Flight duration, connection efficiency, lounge access
- Price: $2,000+
- Icons: ⚡ (efficiency)

**Quick Status Grid:**
- Emphasize: Connection time remaining, policy compliance
- Show: Loyalty points, work seat availability

**Countdown Hero:**
- Highlight: Flight duration, connection time
- Emphasize: Policy-compliant booking, time zones

**Next Actions:**
- Highlight: Policy compliance, connection adequacy
- Productivity: Work space availability in lounge

### PERSONA-03: Family ("Chen Family")

**Destination Cards Variation:**
- Show family-friendly destinations (Hawaii, Cancun, national parks)
- Highlight: Family activities, kids' friendly
- Price: $1,500+ (multi-person pricing shown)
- Icons: 👨‍👩‍👧‍👦 (family)

**Quick Status Grid:**
- Emphasize: Family seating confirmed, all kids on flight
- Show: Family lounge access, entertainment availability

**Countdown Hero:**
- Highlight: Family seating, bathroom locations, entertainment
- Emphasize: All family members on same flight

**Next Actions:**
- Highlight: Family seating confirmation, child entertainment
- Check-in: All family members together

---

## 11. Accessibility Requirements

### ARIA Labels

**Section Headers:**
```html
<section aria-labelledby="upcoming-trips-heading">
  <h2 id="upcoming-trips-heading">Your Next Trips</h2>
  {/* Cards */}
</section>
```

**Trip Card:**
```html
<article aria-label="Trip to London, March 30, United UA 901">
  {/* Card content */}
</article>
```

**Countdown Timer:**
```html
<div
  role="timer"
  aria-label="Departure countdown: 3 hours 22 minutes"
  aria-live="polite"
  aria-atomic="false"
>
  3h 22m
</div>
```

**Alert Section:**
```html
<section aria-live="polite" aria-label="Real-time alerts">
  {/* Alerts update dynamically */}
</section>
```

### Focus Management

**Initial Focus:** Top of page (HomeHero)
**Focus Visible:** 2px solid outline, offset 2px
**Tab Order:** Header → Trip Cards → Destination Cards → Alerts

### Keyboard Navigation

**Tab Key:**
- Cycles through all interactive elements
- Trip cards are focusable
- Destination "Save" buttons are focusable
- Alert action links are focusable

**Enter Key:**
- Activates trip card (navigate to SCR-008)
- Activates destination "Search" button
- Activates alert action

**Escape Key:**
- Not applicable on home screen

---

## 12. Loading, Error & Empty States

### Skeleton Screen (Initial Load)

```typescript
<div className="px-4 py-4 space-y-4">
  {/* Header skeleton */}
  <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse" />

  {/* Trips carousel skeleton */}
  <div className="flex gap-4">
    <div className="h-32 w-40 bg-neutral-200 rounded animate-pulse flex-shrink-0" />
    <div className="h-32 w-40 bg-neutral-200 rounded animate-pulse flex-shrink-0" />
  </div>

  {/* Destination cards skeleton */}
  <div className="grid grid-cols-2 gap-4">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="space-y-2">
        <div className="h-32 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-20" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-16" />
      </div>
    ))}
  </div>
</div>
```

### Error State

**Trip Load Fails:**
```typescript
<div className="mx-4 my-8 p-6 rounded-lg border border-error-200 bg-error-50">
  <div className="text-2xl mb-2">⚠️</div>
  <h3 className="font-semibold text-neutral-900 mb-2">Unable to Load Trips</h3>
  <p className="text-sm text-neutral-600 mb-4">Something went wrong. Please try again.</p>
  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium">
    Retry
  </button>
</div>
```

### Empty State

**No Upcoming Trips:**
```typescript
<div className="mx-4 my-8 p-6 text-center">
  <div className="text-4xl mb-4">✈️</div>
  <h3 className="text-lg font-semibold text-neutral-900 mb-2">No trips booked yet</h3>
  <p className="text-sm text-neutral-600 mb-6">Discover your next adventure</p>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium">
    Explore Destinations
  </button>
</div>
```

---

## 13. Edge Cases & Error Handling

### Missing Data
- **No upcoming trips:** Show empty state with CTA to Discover
- **No active trip on travel day:** Show non-travel day view
- **Missing gate/seat info:** Show as "TBD" or "Pending"
- **Missing destination image:** Show placeholder color

### Network Failures
- **Trip fetch fails:** Show error with retry button
- **Destination fetch fails:** Show partial results with retry
- **Real-time updates fail:** Show last-known status with timestamp

### Boundary Conditions
- **Rapid refresh requests:** Debounce (only allow 1 refresh per 5s)
- **Scroll during refresh:** Lock scroll, unlock after refresh completes
- **Pull-to-refresh at top of page:** Show indicator, don't refresh if already at top
- **Time zone edge cases:** Use user's local time for all calculations

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('HomePage', () => {
  it('renders non-travel day view', () => {
    const { getByText } = render(<HomePage isTravelDay={false} />);
    expect(getByText('Your Next Trips')).toBeInTheDocument();
    expect(getByText('Inspiration for You')).toBeInTheDocument();
  });

  it('renders travel day view when travel day', () => {
    const { getByText } = render(<HomePage isTravelDay={true} />);
    expect(getByText(/Depart in/)).toBeInTheDocument();
  });

  it('updates countdown timer every second', async () => {
    const { getByText } = render(<HomePage isTravelDay={true} />);
    const initialText = getByText(/3h 22m/);
    await waitFor(() => {
      expect(getByText(/3h 22m/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});

describe('DestinationCard', () => {
  it('toggles saved state on heart click', async () => {
    const { getByRole } = render(<DestinationCard isSaved={false} {...props} />);
    await userEvent.click(getByRole('button', { name: /save/i }));
    expect(getByRole('button', { name: /saved/i })).toBeInTheDocument();
  });

  it('navigates to search with destination on Search click', async () => {
    const onSearch = vi.fn();
    const { getByRole } = render(<DestinationCard onSearch={onSearch} {...props} />);
    await userEvent.click(getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('Bali, Indonesia');
  });
});
```

### Integration Tests
- ✓ Onboarding → Home flow complete
- ✓ Trip card → Trip Dashboard navigation
- ✓ Destination card → Search navigation
- ✓ Pull-to-refresh updates all data

### Accessibility Tests
- ✓ All headings in correct hierarchy
- ✓ ARIA labels on dynamic content
- ✓ Focus order is logical
- ✓ Touch targets >44×44pt

---

## 15. Build Checklist

- [ ] Components built and tested
  - [ ] HomeHero (adaptive header)
  - [ ] CountdownHero (travel day display)
  - [ ] DestinationCard (with save toggle)
  - [ ] NextActionCard
  - [ ] QuickStatusGrid
  - [ ] AlertsSection

- [ ] State management
  - [ ] Trip detection (isTravelDay logic)
  - [ ] Countdown timer updating
  - [ ] Real-time alerts
  - [ ] Pull-to-refresh integration

- [ ] Mock data integrated
  - [ ] generateMockTrips()
  - [ ] generateMockDestinations()
  - [ ] Real-time status updates

- [ ] Persona adaptations applied
  - [ ] Alexandra: Luxury destinations, elite status
  - [ ] Marcus: Business hubs, efficiency metrics
  - [ ] Family: Family destinations, seating emphasis

- [ ] Responsive design tested
  - [ ] Mobile (320px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px)

- [ ] Accessibility verified
  - [ ] ARIA labels complete
  - [ ] Focus management working
  - [ ] Keyboard navigation tested
  - [ ] Touch targets verified
  - [ ] Color contrast checked

- [ ] Loading & error states
  - [ ] Skeleton screens implemented
  - [ ] Error recovery working
  - [ ] Empty states showing

- [ ] Performance optimized
  - [ ] Images lazy-loaded
  - [ ] Countdown timer efficient
  - [ ] Scroll performance smooth

---

**Estimated Build Time:** 3-4 days (1 developer)
**Dependencies:** Shard 01 (Onboarding) complete
**Next Milestone:** SCR-004 (Flight Search) — requires SCR-002 complete
