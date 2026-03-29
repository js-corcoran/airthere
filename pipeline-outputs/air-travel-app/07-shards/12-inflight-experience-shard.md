# In-Flight Experience — Build Shard
## AirThere | Screen SCR-012 | Shard 12

### 1. Screen Overview

**Purpose:** Comprehensive in-flight cabin experience screen showing flight progress, meal service timing, entertainment options, productivity tools, and wellness features. Serves as the primary cabin hub once aircraft is airborne, accessible via in-flight WiFi or offline mode (cached data).

**Role in Journey:** Central experience during flight phase (departure through landing). Provides continuous engagement post-boarding, replacing ground-based navigation with cabin-based services and entertainment coordination. Tracks flight progress with real-time map, manages meal preferences, enables productivity (work mode), and promotes wellness (hydration, movement, sleep).

**Entry Points:**
- Automatic activation when aircraft reaches cruise altitude (flight status = 'airborne')
- Manual tap from Home tab during flight day
- In-flight WiFi connection prompt on flight status change
- Boarding pass → "Flight in Progress" button

**Exit Points:**
- Landing notification → Trip Recap (SCR-014)
- Connection flight alert → Trip Dashboard (SCR-008)
- Cabin crew assistance → bottom sheet contact form
- Entertainment selection → stays on screen (immersive mode)

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/inflight/[flightId]/page.tsx
Alternative: (main)/cabin/page.tsx (singleton during flight)
```

**File Structure:**
```
src/
├── app/
│   └── (main)/
│       ├── inflight/
│       │   ├── [flightId]/
│       │   │   └── page.tsx (SCR-012)
│       │   └── layout.tsx (special full-screen layout)
├── components/
│   ├── inflight/
│   │   ├── CabinDashboard.tsx (main container)
│   │   ├── FlightProgressMap.tsx (real-time aircraft position)
│   │   ├── MealServiceCard.tsx (meal timing, preferences)
│   │   ├── EntertainmentHub.tsx (movie/TV/game browsing)
│   │   ├── ProductivityMode.tsx (work environment)
│   │   ├── WellnessFeatures.tsx (hydration, movement, sleep)
│   │   ├── FamilyEntertainment.tsx (age-gated content)
│   │   ├── CabinCrewAssistance.tsx (call button, messaging)
│   │   └── FlightStatusBanner.tsx (live status updates)
│   └── shared/
│       └── RealTimeFlightMap.tsx
└── lib/
    └── mock-data/
        ├── inflightData.ts
        └── entertainmentCatalog.ts
```

**Layout Group:** `(main)` — full-screen cabin experience layout (no bottom tab bar, special header)

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-010 (Airport Live View) — Airport departure status
- SCR-011 (Gate & Boarding) — Boarding completion confirmation
- SCR-008 (Trip Dashboard) — Itinerary context, connection info

**Shared components needed:**
- `RealTimeCountdown` — Timer for meal service, entertainment recommendations
- `PullToRefresh` — Refresh in-flight WiFi connectivity, flight progress
- `ToastContainer` — Service announcements, meal notifications
- `LoadingSkeletons` — Entertainment catalog loading
- `ContextualHeader` — Minimal header (can be hidden for immersive entertainment)
- `BottomSheet` — Cabin crew assistant, meal preferences, special requests

**Mock data requirements:**
- `inflightData.ts` — Flight progress, meal service times, cabin amenities
- `entertainmentCatalog.ts` — Movies, TV shows, games (realistic IMDB/Netflix data)
- `wellnessTips.ts` — Science-backed hydration, movement, sleep tips by flight duration/timezone
- `mealOptions.ts` — Meal preferences, dietary accommodations, allergen info

---

### 4. Component Hierarchy

```
CabinDashboard (page container — fullscreen)
├── ContextualHeader (minimal, hide on scroll down)
│   ├── FlightNumber & Route
│   ├── FlightStatus ("En Route", "Cruise", "Descent")
│   └── Time Remaining to Destination
│
├── FlightProgressMap (sticky or hero section)
│   ├── Real-Time Aircraft Position
│   ├── Route Visualization
│   ├── Altitude & Speed Display
│   ├── Time to Destination Countdown
│   └── Current Weather Conditions at Destination
│
├── PullToRefresh (wrapper for content below)
│   │
│   ├── [Quick Info Row] FlightStatusBanner
│   │   ├── Current Altitude
│   │   ├── Cabin Temperature
│   │   ├── Current Time (Destination Timezone)
│   │   └── WiFi Signal Strength
│   │
│   ├── [Meal Service] MealServiceCard
│   │   ├── Meal Status (e.g., "Breakfast service in 45 minutes")
│   │   ├── Menu Options (Passenger's previous preferences highlighted)
│   │   ├── Dietary Accommodations (Vegan, Gluten-Free, Allergy)
│   │   ├── [Pre-Order Now] Button
│   │   └── "Service timing varies by cabin class"
│   │
│   ├── [Entertainment] EntertainmentHub
│   │   ├── Recommended Content (based on passenger history)
│   │   │   ├── [Movie Poster] [Movie Poster] [TV Poster]
│   │   │   └── "Continue Watching" carousel
│   │   ├── Search/Browse Tabs
│   │   │   ├── Movies
│   │   │   ├── TV Shows
│   │   │   ├── Games
│   │   │   ├── Music
│   │   │   └── Podcasts
│   │   └── Content Details (on tap: title, length, rating, synopsis)
│   │
│   ├── [Productivity] ProductivityMode
│   │   ├── Status: WiFi Connected (110 Mbps) / WiFi Disconnected
│   │   ├── Quick Tools
│   │   │   ├── Email (if WiFi available)
│   │   │   ├── Documents (cached locally)
│   │   │   ├── Notes
│   │   │   └── Focus Mode (Do Not Disturb)
│   │   ├── Work Timer (focus session countdown)
│   │   └── "Productive time remaining: 4 hours 32 minutes"
│   │
│   ├── [Wellness] WellnessFeatures
│   │   ├── Hydration Reminder ("Drink water every 1 hour")
│   │   ├── Movement Suggestion ("Stand and stretch every 2 hours")
│   │   ├── Sleep Recommendation (based on flight duration and destination timezone)
│   │   │   ├── "Local arrival time: 7:15 AM. Recommended sleep: 5 hours"
│   │   │   ├── Sleep Timer
│   │   │   └── "Do not disturb" toggle
│   │   └── Jet Lag Tips
│   │
│   ├── [Family Services] FamilyEntertainment (PERSONA-03 only)
│   │   ├── Kids' Content by Age (Zoe: 10y, Max: 7y)
│   │   ├── Shared Activity (multiplayer games, watch together)
│   │   ├── Bathroom Break Timer (for small children)
│   │   └── "Meal Ready: 12 minutes for family to arrive at lavatory"
│   │
│   ├── [Service Requests] CabinCrewAssistance
│   │   ├── [Call Attendant] Button (primary action)
│   │   ├── Quick Requests
│   │   │   ├── 💧 Water
│   │   │   ├── 🛏️ Blanket
│   │   │   ├── 💊 Medication
│   │   │   └── 🤔 Other
│   │   ├── Special Requests Form
│   │   └── Estimated Wait Time
│   │
│   └── [Flight Facts] FlightFactsCard
│       ├── Aircraft Type
│       ├── Cruising Speed
│       ├── Current Altitude
│       ├── Outside Air Temperature
│       └── Fun facts about destination
│
├── Immersive Mode (when Entertainment selected)
│   └── [Full-screen video player with minimal UI]
│       └── Gesture: Swipe down to exit
│
└── ContextualHeader/Floating Action Button (always accessible)
    └── [?] Help / FAQ
    └── [Menu] Service requests, settings
```

---

### 5. Component Specifications

#### 5.1 FlightProgressMap

**TypeScript Interface:**
```typescript
interface FlightProgressMapProps {
  flight: {
    number: string;
    aircraft: string;
  };
  current: {
    latitude: number;
    longitude: number;
    altitude: number; // feet
    groundSpeed: number; // knots
    trackAngle: number; // degrees
  };
  departure: {
    airport: string; // IATA
    latitude: number;
    longitude: number;
    actualTime: ISO8601;
  };
  arrival: {
    airport: string; // IATA
    latitude: number;
    longitude: number;
    estimatedTime: ISO8601;
    weather?: {
      condition: string; // "Clear", "Rainy", "Cloudy"
      temperature: number; // Celsius
      wind: number; // knots
    };
  };
  route: Array<{ latitude: number; longitude: number }>;
  progress: {
    percentComplete: number; // 0-100
    timeElapsed: number; // seconds
    timeRemaining: number; // seconds
  };
}

interface FlightProgressMapState {
  currentTime: string; // Destination timezone
  flightStatus: 'climbing' | 'cruise' | 'descent' | 'approaching';
}
```

**Internal State:**
```typescript
const [mapCenter, setMapCenter] = useState<LatLng>(current);
const [selectedInfo, setSelectedInfo] = useState<'altitude' | 'speed' | 'position' | null>(null);

useEffect(() => {
  // Poll for aircraft position every 30 seconds
  const pollInterval = setInterval(async () => {
    const updated = await fetchFlightProgress(flightId);
    setMapCenter([updated.current.latitude, updated.current.longitude]);
  }, 30000);
  return () => clearInterval(pollInterval);
}, [flightId]);
```

**Shadcn UI Base:** Custom map component (use Leaflet or Mapbox as base)

**Tailwind Classes:**
```
- Container: w-full h-64 md:h-80 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-neutral-800 dark:to-neutral-900
- Aircraft Icon: w-8 h-8 text-primary-600 dark:text-primary-400
- Route Line: stroke-primary-400 stroke-width-2 opacity-70
- Info Badges: bg-white dark:bg-neutral-700 px-3 py-1 rounded-full text-sm font-mono
- Progress Bar: h-1 bg-neutral-200 dark:bg-neutral-700 w-full mt-2
- Progress Indicator: bg-primary-500 h-1 rounded-full
```

**Responsive Behavior:**
- Mobile: Full-width map, 160px height, position/altitude below map
- Tablet: 200px height, info integrated into map corners
- Desktop: 300px height, side panel with detailed flight info

#### 5.2 MealServiceCard

**TypeScript Interface:**
```typescript
interface MealServiceCardProps {
  cabinClass: 'first' | 'business' | 'premium_economy' | 'economy';
  mealService: {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    estimatedTime: ISO8601;
    duration: number; // minutes (service takes 30-45 min)
  };
  passengerPreferences: {
    dietary: 'vegan' | 'vegetarian' | 'gluten_free' | 'halal' | 'kosher' | 'standard';
    allergies: string[]; // ['peanuts', 'shellfish']
    previousChoices: string[]; // past meal selections
  };
  availableMeals?: Array<{
    id: string;
    name: string;
    description: string;
    dietary: string;
    allergens: string[];
    calories?: number;
  }>;
  beverageOptions?: Array<{
    type: 'non_alcoholic' | 'wine' | 'beer' | 'spirit';
    options: string[];
  }>;
}

interface MealServiceState {
  isPreOrdering: boolean;
  selectedMeal?: string;
  selectedBeverage?: string;
  specialRequests?: string;
}
```

**Internal State:**
```typescript
const [showOptions, setShowOptions] = useState(false);
const [selectedMeal, setSelectedMeal] = useState<string>(
  passengerPreferences.previousChoices[0] || null
);
const [specialRequests, setSpecialRequests] = useState('');

const timeUntilService = calculateMinutesBetween(now(), mealService.estimatedTime);
```

**Shadcn UI Base:** Card, Button, Select, Textarea

**Tailwind Classes:**
```
- Container: bg-amber-50 dark:bg-amber-900 rounded-lg p-4 border border-amber-200 dark:border-amber-700
- Header: flex justify-between items-center
- Meal Type Badge: bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium
- Timer: text-sm text-neutral-600 font-mono
- Meal Options Grid: grid grid-cols-1 md:grid-cols-2 gap-3 mt-3
- Meal Item: bg-white dark:bg-neutral-700 p-3 rounded border border-neutral-200 dark:border-neutral-600 cursor-pointer hover:border-primary-500
- Dietary Badge: text-xs bg-green-100 text-green-700 px-2 py-1 rounded
- Allergen Badge: text-xs bg-red-100 text-red-700 px-2 py-1 rounded
```

**Responsive Behavior:**
- Mobile: Single column meals, scroll horizontally for beverages
- Tablet: Two-column meal grid, beverage options in row
- Desktop: Two-column meals, three-column beverages

#### 5.3 EntertainmentHub

**TypeScript Interface:**
```typescript
interface EntertainmentHubProps {
  cabin: string;
  passenger: {
    age: number;
    watchingHistory: string[]; // movie/show IDs
    preferences: string[]; // genres
  };
  catalog: {
    movies: Movie[];
    shows: TVShow[];
    games: Game[];
    music: Playlist[];
    podcasts: Podcast[];
  };
  iamData?: {
    connected: boolean;
    bandwidth?: number; // Mbps
  };
  flightDuration: number; // minutes
}

interface Movie {
  id: string;
  title: string;
  genre: string[];
  runtime: number; // minutes
  rating: number; // 0-10
  posterUrl: string;
  synopsis: string;
  ageRestriction?: string; // 'PG', 'PG-13', 'R'
  isAvailable: boolean;
}

interface Game {
  id: string;
  title: string;
  genre: string;
  durationPerSession: number; // minutes
  isMultiplayer: boolean;
  ageRestriction?: string;
}
```

**Internal State:**
```typescript
const [activeTab, setActiveTab] = useState<'recommended' | 'movies' | 'shows' | 'games'>('recommended');
const [selectedContent, setSelectedContent] = useState<Movie | TVShow | Game | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [isPlaying, setIsPlaying] = useState(false);

const recommendedContent = passenger.watchingHistory.length > 0
  ? catalog.movies.filter(m => m.genre.some(g => passenger.preferences.includes(g)))
  : catalog.movies.slice(0, 5); // Popular if no history
```

**Shadcn UI Base:** Tabs, Card, Button, Input, Dialog

**Tailwind Classes:**
```
- Container: w-full bg-white dark:bg-neutral-900
- Tab Bar: flex gap-2 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 overflow-x-auto
- Tab Button: px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary-500 transition-colors
- Tab Active: border-primary-500 text-primary-600 dark:text-primary-400
- Content Grid: grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4
- Content Card: bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow
- Poster Image: w-full aspect-poster object-cover
- Title: text-sm font-semibold mt-2 px-2 truncate
- Genre Tag: text-xs text-neutral-600 dark:text-neutral-400 px-2
- Rating: flex items-center gap-1 text-xs font-medium px-2 py-1
```

**Responsive Behavior:**
- Mobile: 2-column grid, scroll vertically
- Tablet: 3-column grid
- Desktop: 4-column grid, search/filter in header

#### 5.4 ProductivityMode

**TypeScript Interface:**
```typescript
interface ProductivityModeProps {
  flight: {
    duration: number; // minutes total
    elapsed: number; // minutes elapsed
  };
  wifiStatus: {
    connected: boolean;
    bandwidth?: number; // Mbps
    connectedAt?: ISO8601;
  };
  documents?: Array<{
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'pptx' | 'txt';
    cachedLocally: boolean;
  }>;
  passenger?: {
    upcomingMeeting?: {
      title: string;
      time: ISO8601;
      duration: number; // minutes
      participants: number;
    };
  };
}

interface ProductivityState {
  isFocusMode: boolean;
  focusSessionMinutes: number;
  tasksCompleted: number;
  focusSessions: number; // Pomodoro-style counter
}
```

**Internal State:**
```typescript
const [isFocusMode, setIsFocusMode] = useState(false);
const [focusSessionMinutes, setFocusSessionMinutes] = useState(25); // Pomodoro default
const [breakTimeMinutes, setBreakTimeMinutes] = useState(5);
const [isRunning, setIsRunning] = useState(false);

useEffect(() => {
  if (!isRunning) return;
  const timer = setInterval(() => {
    setFocusSessionMinutes(prev => Math.max(0, prev - 1));
  }, 60000);
  return () => clearInterval(timer);
}, [isRunning]);
```

**Shadcn UI Base:** Card, Button, Toggle, Progress

**Tailwind Classes:**
```
- Container: bg-blue-50 dark:bg-neutral-800 rounded-lg p-4 border border-blue-200 dark:border-neutral-700
- WiFi Status: flex items-center gap-2 mb-4
- WiFi Icon: w-5 h-5
- Status Text: text-sm font-medium
- Quick Tools: grid grid-cols-4 gap-2 my-3
- Tool Button: aspect-square flex items-center justify-center flex-col gap-1 bg-white dark:bg-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-neutral-600 p-2
- Tool Icon: text-lg
- Tool Label: text-xs text-center font-medium
- Focus Session: bg-primary-500 text-white rounded-lg p-4 mt-3
- Timer Display: text-3xl font-bold font-mono text-center
- Controls: flex gap-2 justify-center mt-3
```

**Responsive Behavior:**
- Mobile: Full-width cards, 4 tool buttons in 2×2 grid
- Tablet: 2 columns, tool buttons in row
- Desktop: Side panel, vertical tool layout

#### 5.5 WellnessFeatures

**TypeScript Interface:**
```typescript
interface WellnessFeaturesProps {
  flight: {
    duration: number; // minutes total
    departureTime: ISO8601;
    arrivalTime: ISO8601;
    departureTimezone: string;
    arrivalTimezone: string;
  };
  passenger: {
    age: number;
    mobilityLevel: 'full' | 'limited' | 'restricted'; // for movement suggestions
  };
}

interface WellnessState {
  hydrationReminders: number; // how many remaining before arrival
  nextHydrationTime: ISO8601;
  movementReminders: number;
  nextMovementTime: ISO8601;
  sleepRecommendation: {
    hoursRecommended: number;
    sleepTimer: number; // minutes
    isDNDActive: boolean;
  };
}
```

**Internal State:**
```typescript
const timezoneShift = calculateTimezoneOffset(arrivalTimezone, departureTimezone);
const recommendedSleep = calculateOptimalSleep(flight.duration, timezoneShift, passenger.age);

const [hydrationCount, setHydrationCount] = useState(0);
const [movementCount, setMovementCount] = useState(0);
const [sleepActive, setSleepActive] = useState(false);

useEffect(() => {
  // Hydration reminder every 60 minutes
  const hydrationInterval = setInterval(() => {
    showToast('💧 Stay hydrated — drink water');
    setHydrationCount(prev => prev + 1);
  }, 3600000);

  // Movement reminder every 120 minutes
  const movementInterval = setInterval(() => {
    showToast('🚶 Time to stretch and move');
    setMovementCount(prev => prev + 1);
  }, 7200000);

  return () => {
    clearInterval(hydrationInterval);
    clearInterval(movementInterval);
  };
}, []);
```

**Shadcn UI Base:** Card, Button, Toggle, Progress, Slider

**Tailwind Classes:**
```
- Container: bg-gradient-to-b from-green-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-900 rounded-lg p-4
- Feature Row: flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0
- Feature Icon: text-2xl
- Feature Description: ml-3 flex-1
- Feature Label: text-sm font-semibold
- Feature Subtext: text-xs text-neutral-600 dark:text-neutral-400 mt-1
- Action Button: ml-auto px-3 py-1 text-xs
- Sleep Card: bg-blue-100 dark:bg-blue-900 rounded-lg p-3 mt-3
- Timer: text-2xl font-mono font-bold text-center my-2
```

---

### 6. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ UA 901 | Cruise | 4h 15m     │ Header (minimal)
├──────────────────────────────┤
│ [Flight Progress Map]        │
│ ┌────────────────────────┐   │
│ │  San Francisco → Lond  │   │
│ │   ✈ (at 35,000 ft)     │   │
│ │                        │   │
│ │   512 knots            │   │
│ └────────────────────────┘   │
│ ████████████░░░░░░ 65% done  │
│ Time remaining: 4h 15m       │
├──────────────────────────────┤
│ [Quick Info]                 │
│ 📏 35,450 ft | 🌡️ -57°C     │
│ 🕐 7:42 PM (London) |📶 4/5  │
├──────────────────────────────┤
│ [Meal Service]               │
│ 🍽️ Breakfast in 45 minutes   │
│ Previous: Vegetarian pasta   │
│ [Pre-Order] [Show Options]   │
├──────────────────────────────┤
│ [Entertainment]              │
│ Movies | TV | Games          │
│ ┌─────┐ ┌─────┐              │
│ │Movie│ │Show │              │
│ │     │ │     │              │
│ └─────┘ └─────┘              │
│ 🔍 Search / Browse...        │
├──────────────────────────────┤
│ [Productivity]               │
│ ☁️ WiFi: 95 Mbps (Good)      │
│ [📧] [📄] [📝] [🎯]          │
│                              │
│ Focus Session               │
│ 25:00 (paused)             │
│ [▶ Start] [⏸ Pause]        │
├──────────────────────────────┤
│ [Wellness]                   │
│ 💧 Hydrate (1h interval)     │
│ 🚶 Stretch (2h interval)     │
│ 😴 Sleep: 5.5 hours recom.   │
│ └─ Timer [⏱️] [🔇 DND]       │
├──────────────────────────────┤
│ [Service]                    │
│ [📞 Call Attendant]         │
│ 💧 🛏️ 💊 Other →           │
│                              │
└──────────────────────────────┘
```

**Tablet Wireframe (768px):**
```
┌──────────────────────────────────────┐
│ UA 901 | Cruise | 4h 15m | [Settings]│
├──────────────────┬───────────────────┤
│                  │                   │
│  Flight Map      │  Meal Service     │
│  (350px height)  │  ┌──────────────┐ │
│                  │  │ Breakfast    │ │
│  ████ 65% done   │  │ in 45 min    │ │
│  4h 15m remain   │  │              │ │
│                  │  │ [Pre-Order]  │ │
│                  │  └──────────────┘ │
├──────────────────┼───────────────────┤
│ Quick Status     │ Productivity      │
│ 35,450 ft        │ WiFi: 95 Mbps     │
│ -57°C            │ Focus: 25:00      │
│ 512 knots        │ [▶ Start]         │
│ 7:42 PM (London) │                   │
├──────────────────┼───────────────────┤
│ Entertainment    │ Wellness          │
│ [Movies/TV/Games]│ 💧 Hydrate        │
│ ┌──┐ ┌──┐        │ 🚶 Stretch        │
│ │  │ │  │        │ 😴 Sleep 5.5h     │
│ └──┘ └──┘        │ [⏱️] [🔇]         │
│ Search...        │                   │
├──────────────────┼───────────────────┤
│ Service Request  │ Flight Facts      │
│ [📞 Call]        │ Boeing 787-9      │
│ 💧 🛏️ 💊 Other  │ 512 knots cruise  │
│                  │ Dest: Clear, 18°C │
└──────────────────┴───────────────────┘
```

**Desktop Wireframe (1024px):**
```
┌─────────────────────────────────────────────────────┐
│ UA 901 SFO→LHR | Cruise | 4h 15m | [Settings]      │
├─────────────────┬─────────────────┬─────────────────┤
│                 │                 │                 │
│  Flight Map     │  Meal Service   │  Quick Status   │
│  (300px h)      │  ┌───────────┐  │  Alt: 35,450 ft │
│                 │  │ Breakfast │  │  Temp: -57°C    │
│  35% Complete   │  │ in 45 min │  │  Speed: 512 kts │
│  4h 15m remain  │  │ [Pre-Ord] │  │  Time: 7:42 PM  │
│                 │  └───────────┘  │  WiFi: 4/5      │
├─────────────────┼─────────────────┼─────────────────┤
│                 │                 │                 │
│  Entertainment  │  Productivity   │  Wellness       │
│  [Mov|TV|Games] │  ☁️ 95 Mbps    │  💧 Hydrate     │
│  ┌─┐ ┌─┐ ┌─┐   │  Focus: 25:00  │  🚶 Stretch     │
│  │ │ │ │ │ │   │  [▶] [Reset]   │  😴 5.5h sleep  │
│  └─┘ └─┘ └─┘   │                 │  [⏱️] [🔇 DND]  │
│  [Search...]    │  [Tools Grid]   │                 │
│                 │                 │                 │
├─────────────────┼─────────────────┴─────────────────┤
│ Service Request │ Flight Facts                      │
│ [📞 Call]       │ Aircraft: Boeing 787-9            │
│ 💧 🛏️ 💊 Other │ Cruising Speed: 512 knots        │
│                 │ Destination: Clear, 18°C         │
│                 │ Estimated Landing: 7:55 AM (+1d) │
└─────────────────┴───────────────────────────────────┘
```

---

### 7. Interaction Patterns

#### Gestures & Navigation
- **Swipe down on video:** Exit immersive mode, return to dashboard
- **Swipe left/right in entertainment:** Navigate between content categories (if using carousel)
- **Pull-to-refresh:** Refresh flight progress, entertainment recommendations
- **Tap content poster:** View details/synopsis, start playback
- **Long-press service request:** Quick actions (water, blanket, pillow)

#### Scroll Behavior
- **Header:** Hide on scroll down, reappear on scroll up (maximize content area)
- **Flight map:** Sticky at top (or scroll within container on mobile)
- **Sections:** Lazy-load entertainment content as user scrolls

#### Transitions & Animations
- **Aircraft icon:** Smooth movement along route every 30 seconds
- **Progress bar:** Gradual fill as flight progresses (no jumps)
- **Content reveal:** Stagger animation when section loads (meals, entertainment, wellness)
- **Focus timer:** Smooth countdown animation
- **Meal timing alert:** Toast slides in from top when service approaching

#### Bottom Sheet Triggers
- **Meal preferences:** Tap "Show Options" → Bottom sheet with full menu
- **Accessibility requests:** Tap "Other" service request → Bottom sheet form
- **Entertainment details:** Tap movie poster → Bottom sheet with full synopsis, cast, reviews
- **Sleep management:** Tap sleep card → Bottom sheet with sleep timer, music, guided meditations

---

### 8. State Management

**Local Component State:**
```typescript
const [flightProgress, setFlightProgress] = useState<FlightProgress>(initialData);
const [currentSection, setCurrentSection] = useState<'overview' | 'entertainment' | 'meal'>('overview');
const [selectedContent, setSelectedContent] = useState<Content | null>(null);
const [isFocusMode, setIsFocusMode] = useState(false);
const [focusMinutes, setFocusMinutes] = useState(25);
const [focusActive, setFocusActive] = useState(false);
```

**Global State Slices (Context API):**

1. **TripContext** — Current flight, connection info
2. **PassengerContext** — Dietary preferences, entertainment history, accessibility needs
3. **FlightStatusContext** — Real-time aircraft position, altitude, speed
4. **WiFiContext** — In-flight WiFi connection status

**URL State Parameters:**
```
?flightId=UA901&seatNumber=12A
```

**Derived State:**
```typescript
const timeRemaining = calculateTimeBetween(now(), arrivalTime);
const percentComplete = (timeElapsed / totalDuration) * 100;
const hydrationReminders = Math.ceil(timeRemaining / 60); // one per hour
const recommendedSleep = calculateSleep(timeRemaining, timezoneShift);
```

**Real-Time Data Polling:**
```typescript
useEffect(() => {
  // Poll every 30 seconds for flight progress
  const pollInterval = setInterval(async () => {
    const updated = await fetchFlightProgress(flightId);
    setFlightProgress(updated);
  }, 30000);

  // Hydration reminder every 60 minutes
  const hydrationInterval = setInterval(() => {
    showToast('Stay hydrated', { icon: '💧' });
  }, 3600000);

  return () => {
    clearInterval(pollInterval);
    clearInterval(hydrationInterval);
  };
}, [flightId]);
```

---

### 9. Data Requirements & Mock Data

**Data Shape Needed:**
```typescript
interface InflightScreenData {
  flight: {
    id: string;
    number: string;
    aircraft: string;
    status: 'airborne' | 'descent' | 'approaching' | 'landed';
    departure: { airport: string; time: ISO8601; timezone: string };
    arrival: { airport: string; time: ISO8601; timezone: string };
  };
  position: {
    latitude: number;
    longitude: number;
    altitude: number; // feet
    groundSpeed: number; // knots
    trackAngle: number; // degrees
  };
  entertainment: {
    movies: Movie[];
    shows: TVShow[];
    games: Game[];
    watchingHistory: string[];
    recommendations: string[];
  };
  meals: {
    services: MealService[];
    passengerPreferences: PassengerPreferences;
  };
  wellness: {
    flightDuration: number;
    timezoneShift: number;
    hydrationReminders: number;
    movementReminders: number;
    sleepRecommendation: number;
  };
  services: {
    wifiStatus: { connected: boolean; bandwidth?: number };
    crewAssistance: { available: boolean; estimated wait?: number };
  };
}
```

**Mock Data Example:**
```typescript
// lib/mock-data/inflightData.ts
export const mockInflightData: InflightScreenData = {
  flight: {
    id: 'UA901-20260330-SFO-LHR',
    number: 'UA 901',
    aircraft: 'Boeing 787-9',
    status: 'airborne',
    departure: { airport: 'SFO', time: '2026-03-30T11:00:00-07:00', timezone: 'PDT' },
    arrival: { airport: 'LHR', time: '2026-03-31T07:55:00+00:00', timezone: 'GMT' },
  },
  position: {
    latitude: 51.23,
    longitude: -20.45,
    altitude: 35450,
    groundSpeed: 512,
    trackAngle: 85,
  },
  entertainment: {
    movies: mockMovieCatalog.slice(0, 20),
    shows: mockTVCatalog.slice(0, 15),
    games: mockGameCatalog.slice(0, 10),
    watchingHistory: ['tt0133093', 'tt0468569'], // Matrix, Dark Knight
    recommendations: ['tt2488496', 'tt5433140'], // Star Wars, Oppenheimer
  },
  meals: {
    services: [
      {
        type: 'breakfast',
        time: '2026-03-30T13:00:00-05:00',
        duration: 45,
        cabins: ['first', 'business'],
      },
      {
        type: 'snack',
        time: '2026-03-30T16:00:00+00:00',
        duration: 20,
        cabins: ['all'],
      },
      {
        type: 'dinner',
        time: '2026-03-31T02:00:00+00:00',
        duration: 45,
        cabins: ['first', 'business', 'premium_economy'],
      },
    ],
    passengerPreferences: {
      dietary: 'vegetarian',
      allergies: ['peanuts'],
      previousChoices: ['Vegetarian pasta primavera', 'Chicken teriyaki'],
    },
  },
  wellness: {
    flightDuration: 11 * 60, // 11 hours
    timezoneShift: 8, // +8 hours at destination
    hydrationReminders: 11, // ~one per hour
    movementReminders: 6, // ~every 2 hours
    sleepRecommendation: 5.5, // adjusted for timezone
  },
  services: {
    wifiStatus: { connected: true, bandwidth: 95 },
    crewAssistance: { available: true, estimated wait: 2 },
  },
};
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Premium — Alexandra)

**UI Variations:**
- **Entertainment:** Premium content highlighted (Oscar winners, exclusive documentaries, luxury travel shows)
- **Meal Service:** Fine dining options, wine pairing recommendations, sommelier notes
- **Wellness:** Luxury spa features (guided meditations, premium sleep music), concierge wellness service
- **Productivity:** Executive briefings, market data, news curated for her interests
- **Service:** Direct concierge button, priority response, personalized crew attention

**Content:**
- Meal service at preferred time with notification
- Entertainment suggestions include "Award-winning documentaries" and "Travel inspiration"
- Sleep recommendations include "Premium sleep program: Aromatherapy, blackout shade activation"
- Wellness: "Executive wellness guide: Post-flight recovery suggestions for London arrival"

#### PERSONA-02 (Business — Marcus)

**UI Variations:**
- **Entertainment:** News, business podcasts, technical documentaries (minimal distraction)
- **Productivity:** Emphasize work tools (email, document editor, calendar), WiFi quality, focus timer
- **Meal Service:** Simple, efficient meals, minimal prep time
- **Wellness:** Fitness tracking, jet lag recovery tips, sleep optimization
- **Service:** Quick service requests (water, laptop table), noise-canceling headphone availability

**Content:**
- Entertainment tab shows "Continue Podcast" or "Business news briefing"
- Productivity displays: "Productivity window: 4h 15m until descent begins"
- Meal notification: "Service in 30 minutes — light meal available (15 min service)"
- Wellness: "Jet lag alert: Arrive 8am local. Recommended sleep: 5.5h. Sunlight exposure in morning."

#### PERSONA-03 (Family — Chen Family)

**UI Variations:**
- **Entertainment:** Kids' content separated by age (Zoe: 10y, Max: 7y), shared family games, multiplayer
- **Meal Service:** Kids' menus separate, dietary preferences for each family member shown
- **Wellness:** Kid-appropriate movement (in-seat games, stretching), bathroom break timing
- **Service:** Family-friendly requests (kids' meal prep timing, extended lavatory access)

**Content:**
- Entertainment shows: "Zoe's favorites" (animated shows, age-appropriate movies), "Max's cartoons", "Family games"
- Meal service: "Kids' meal timing: 15 min before adult service. Zoe: Pasta, Max: Chicken nuggets"
- Wellness: "Bathroom schedule for Max (7y): Recommend break every 90 minutes. Current: 1h 20m until next suggested break"
- Service: "Kids' entertainment pack ready. Headphones available. Lavatory: Family-accessible option at rear available"

---

### 11. Accessibility Requirements

**ARIA Roles & Labels:**
```typescript
<main role="main" aria-label="In-flight cabin experience">
  <section aria-label="Flight progress">
    {/* Aircraft position updates announced */}
    <div aria-live="polite" aria-label="Current altitude and speed">
      35,450 feet, 512 knots
    </div>
  </section>

  <section aria-label="Entertainment catalog">
    <div role="region" aria-label="Movie recommendations">
      {/* Movies listed */}
    </div>
  </section>

  <section aria-label="Meal service">
    {/* Meal timing and options */}
  </section>
</main>
```

**Focus Management:**
- Initial focus on flight status section
- Tab order: Flight map → Meal service → Entertainment → Productivity → Wellness → Service
- Skip link: "Skip to entertainment catalog"

**Keyboard Navigation:**
- Tab/Shift+Tab: Navigate sections
- Enter/Space: Play video, select meal, start focus timer
- Left/Right arrows: Navigate entertainment catalog
- Escape: Close fullscreen player

**Screen Reader Flow:**
```
"In-flight cabin experience
Flight UA 901 is airborne
Current altitude: 35,450 feet
Ground speed: 512 knots
Time to London: 4 hours 15 minutes
Progress: 65 percent complete

Meal service: Breakfast in 45 minutes
Your preference: Vegetarian
Available options: Vegetarian pasta, eggs and toast

Entertainment available: Movies, TV shows, games
Recommended: Oppenheimer (180 minutes), Barbie (114 minutes)

Productivity tools: Email, documents, focus timer
WiFi connected at 95 megabits per second

Wellness recommendations:
Hydrate every hour
Stretch every 2 hours
Recommended sleep: 5.5 hours

Call attendant available
"
```

**Touch Targets:** 44×44pt minimum for all interactive elements

**Color Contrast:**
- Text on backgrounds: 4.5:1 minimum
- Video player controls: Bright white on transparent dark overlay
- Status indicators: Color + icon + text (not color alone)

---

### 12. Loading, Error & Empty States

#### Loading State
```
Skeleton screens showing flight map, meal options, entertainment grid
Duration: 500-1000ms (mock API latency)
```

#### Error States
- **WiFi Disconnected:** Cache entertainment, disable email, show "Offline mode"
- **Entertainment Catalog Unavailable:** Show "Entertainment loading..." with auto-retry
- **Flight Position Update Failed:** Show last known position with timestamp "Last updated 2 min ago"

#### Empty States
- **No Entertainment Options:** "Entertainment not available on this aircraft. Enjoy the views!"
- **No Meal Service This Segment:** "No meal service scheduled. Complimentary beverages available via crew."

---

### 13. Edge Cases & Error Handling

- **Short flights (<3 hours):** Hide meal service, adjust wellness reminders
- **Red-eye flights:** Emphasize sleep features, adjust light recommendations
- **Family with young children:** Extend meal service window, more frequent bathroom break alerts
- **WiFi dropout mid-entertainment:** Pause video, show "Reconnecting..." with resume option
- **Passenger with mobility restrictions:** Modify movement suggestions (no standing, in-seat exercises only)

---

### 14. Testing Requirements

- Component render tests for all sections
- Real-time data update tests (flight position poll, countdown)
- Video playback tests (streaming, offline cache)
- Meal preference tests (dietary accommodations, allergen warnings)
- Wellness reminder tests (hydration, movement, sleep timing)
- Accessibility tests (screen reader, keyboard navigation, focus management)
- Responsive design tests (mobile, tablet, desktop layouts)

---

### 15. Build Checklist

- [ ] Route created: `(main)/inflight/[flightId]/page.tsx`
- [ ] FlightProgressMap component with real-time aircraft tracking
- [ ] MealServiceCard with pre-ordering functionality
- [ ] EntertainmentHub with catalog browsing and video playback
- [ ] ProductivityMode with focus timer and tools
- [ ] WellnessFeatures with hydration and movement reminders
- [ ] FamilyEntertainment with age-gated content (if applicable)
- [ ] CabinCrewAssistance with quick service requests
- [ ] Real-time polling for flight progress (every 30 seconds)
- [ ] Pull-to-refresh functionality
- [ ] Immersive video player mode
- [ ] Offline support (cache entertainment, disable live features)
- [ ] Persona adaptations applied (Alexandra, Marcus, Chen Family)
- [ ] Loading states implemented
- [ ] Error states implemented (WiFi, data failure)
- [ ] Accessibility verified
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] Tests passing (unit, integration, accessibility)

---

## Summary

SCR-012 (In-Flight Experience) transforms the aircraft cabin into an engaging, personalized hub. It provides real-time flight progress visualization, meal service coordination, curated entertainment, productivity tools, and wellness guidance. The screen supports all three personas with distinct content prioritization: Alexandra receives premium entertainment and fine dining, Marcus gets productivity tools and efficiency focus, and the Chen family receives kid-appropriate entertainment and family coordination features. Real-time data polling keeps flight information current, while offline caching ensures entertainment and core features remain available without WiFi. Comprehensive persona adaptations and accessibility support ensure the in-flight experience serves all travelers effectively.

