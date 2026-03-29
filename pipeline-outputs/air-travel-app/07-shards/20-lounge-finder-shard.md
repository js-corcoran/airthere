# Lounge Finder — Build Shard
## AirThere | Screen SCR-020 | Shard 20

### 1. Screen Overview

**Purpose:** Interactive airport lounge discovery, amenity browsing, access validation, and wayfinding. Enables premium travelers (PERSONA-01) and frequent business travelers (PERSONA-02) to discover lounge options, verify access eligibility, reserve seating (where available), and navigate to lounge locations.

**Role in Journey:** Accessible during airport phase (SCR-010). Provides pre-flight premium experience coordination, ensuring lounge access is recognized and optimized. Validates access eligibility based on loyalty tier, ticket class, or premium membership.

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/airport/[airportCode]/lounges/page.tsx
(main)/airport/[airportCode]/lounge/[loungeId]/page.tsx (detail view)
```

---

### 3. Component Hierarchy

```
LoungeFinderScreen (page container)
├── Header
│   ├── "Airport Lounges"
│   ├── Airport: "San Francisco (SFO), Terminal 3"
│   └── [Map] [Filter]
│
├── AccessibilityStatus (sticky)
│   ├── "✓ You have access to 5 lounges"
│   ├── Eligible lounges highlighted
│   └── Access reason: "United Gold Elite + Business Class ticket"
│
├── LoungeFinder (interactive map or list)
│   ├── Map View
│   │   ├── Terminal layout map
│   │   ├── Lounge locations pinned with icons
│   │   ├── Color coding: Green (access granted), Blue (available for upgrade), Gray (no access)
│   │   ├── Current location indicator (user)
│   │   └── [Get Directions] on tap
│   │
│   └── List View
│       ├── LoungeCards (sorted by access status, distance)
│       │   ├── Name ("United Club")
│       │   ├── Distance from gate ("200 ft away")
│       │   ├── Distance from security ("500 ft away")
│       │   ├── Access status badge
│       │   │   ├── Green ✓: "Included with your ticket"
│       │   │   ├── Blue ◇: "Available for $45 single visit pass"
│       │   │   ├── Gray ✗: "Not available"
│       │   ├── Open until time
│       │   ├── Star rating
│       │   ├── Quick amenity icons (WiFi, Food, Shower, etc.)
│       │   └── [View Details] [Get Directions]
│
├── LoungeDetailSheet (on card tap)
│   ├── Hero Image (lounge interior)
│   ├── Name & Star Rating
│   ├── Operating Hours
│   ├── Access Information
│   │   ├── Your status: "✓ Included with United Gold Elite"
│   │   ├── Access restrictions: "If applicable (first/business only)"
│   │   ├── Upgrade option: "Single visit pass available: $45"
│   │   └── [Buy Pass] (if eligible)
│   │
│   ├── Location & Directions
│   │   ├── Terminal: "T3"
│   │   ├── Gate: "C15 (near your departure gate)"
│   │   ├── Walking distance: "2 minutes from security"
│   │   ├── Walking distance: "5 minutes from gate"
│   │   └── [Get Turn-by-Turn Directions]
│   │
│   ├── Amenities Checklist
│   │   ├── [✓] WiFi (500 Mbps)
│   │   ├── [✓] Power outlets (USB & standard)
│   │   ├── [✓] Premium dining (hot meals)
│   │   ├── [✓] Beverages (alcoholic & non-alcoholic)
│   │   ├── [✓] Lounge seating (quiet area available)
│   │   ├── [✓] Shower facilities
│   │   ├── [✓] Quiet/rest area
│   │   ├── [✓] Meeting rooms available
│   │   ├── [✓] Business center (printer, copier)
│   │   ├── [✓] Kids' entertainment area
│   │   └── [✗] Spa services
│   │
│   ├── Current Status
│   │   ├── "Currently 43% capacity"
│   │   ├── "Average wait for seating: 5 minutes"
│   │   ├── Occupancy graph (time-based)
│   │   └── "Expected to clear up at 2:15 PM"
│   │
│   ├── Guest Count
│   │   ├── "You can bring 2 guests"
│   │   ├── [Invite guests]
│   │   └── "Notify: Amy (spouse)"
│   │
│   ├── Experience Reviews (last 5)
│   │   ├── "⭐⭐⭐⭐⭐ Clean and quiet, excellent service"
│   │   ├── "⭐⭐⭐⭐ Great WiFi, limited food options today"
│   │   └── [View All Reviews]
│   │
│   ├── Nearby Dining (if applicable)
│   │   ├── "Restaurants within 5-minute walk"
│   │   ├── Menu previews from Yelp/Google
│   │   └── [Reserve Table]
│   │
│   └── Actions
│       ├── [✓ Go There Now] (primary, enables wayfinding)
│       ├── [✓ Reserve Seating] (if available)
│       ├── [Notify companions]
│       └── [Share lounge link]
│
├── ReservationConfirmation (if seating reserved)
│   ├── "Seating reserved"
│   ├── "Table: Quiet area, 2 seats"
│   ├── "Reserved until: 2:00 PM"
│   ├── QR code for lounge agent
│   └── [Cancel Reservation]
│
└── WayfindingMode (when "Go There Now" tapped)
    ├── Turn-by-turn navigation
    ├── Animated path overlay on terminal map
    ├── Text directions below map
    ├── Distance remaining
    ├── Estimated time to arrival
    └── [Arrived] (button to close navigation)
```

---

### 4. Component Specifications

#### 4.1 LoungeCard

**TypeScript Interface:**
```typescript
interface Lounge {
  id: string;
  name: string;
  airport: string;
  terminal: string;
  location: { latitude: number; longitude: number };
  hours: { open: string; close: string };
  rating: number; // 0-5
  amenities: string[];
  images: string[];
  access: {
    userCanAccess: boolean;
    accessType: 'included' | 'upgrade' | 'not_available';
    reason: string;
    upgradePrice?: number;
  };
  currentCapacity: number; // 0-100%
  estimatedWaitTime: number; // minutes
  guestPolicy: {
    allowGuests: boolean;
    maxGuests: number;
  };
}

interface LoungeCardProps {
  lounge: Lounge;
  distanceFromGate?: number; // meters
  distanceFromSecurity?: number; // meters
  onViewDetails: (loungeId: string) => void;
  onGetDirections: (loungeId: string) => void;
}
```

**Shadcn UI Base:** Card, Button, Badge, Progress

**Tailwind Classes:**
```
- Container: bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-neutral-200 dark:border-neutral-700
- Header: flex justify-between items-start
- Name: text-lg font-bold
- Distance: text-sm text-neutral-600 dark:text-neutral-400
- Access Badge:
  - Included: bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm
  - Upgrade: bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm
  - Not Available: bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm
- Amenity Icons: flex gap-1 text-lg mt-2
- Capacity Bar: h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2
- Capacity Fill: h-2 bg-primary-500 rounded-full
```

---

### 5. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ Airport Lounges       │Filter │ Header
│ SFO Terminal 3               │
├──────────────────────────────┤
│ ✓ Access to 5 lounges        │ Status
│ United Gold Elite + Business │
├──────────────────────────────┤
│ [Map View] [List View]       │ Toggle
├──────────────────────────────┤
│ LIST VIEW                    │
│                              │
│ 🌟 United Club               │ Card 1
│ ✓ Included with your ticket  │
│ 200 ft from gate             │
│ ⭐⭐⭐⭐⭐ (4.8)              │
│ WiFi • Power • Food • Shower │
│ Capacity: ████░░░░ 43%       │
│ [View Details] [Go There]    │
│                              │
│ 🌟 Amex Centurion Lounge     │ Card 2
│ ✓ Included (Platinum Card)   │
│ 500 ft from security         │
│ ⭐⭐⭐⭐⭐ (4.9)              │
│ WiFi • Power • Fine Dining   │
│ Shower • Spa Services        │
│ Capacity: ██░░░░░░░░ 15%     │
│ [View Details] [Go There]    │
│                              │
│ 🌟 Virgin Upper Class Lounge │ Card 3
│ ◇ $45 single visit pass      │
│ 350 ft from gate             │
│ ⭐⭐⭐⭐ (4.6)               │
│ WiFi • Power • Food • Shower │
│ [View Details] [Buy Pass]    │
│                              │
│ 🏢 Admiral's Club             │ Card 4
│ ✗ Not available (Econ ticket)│
│ [View Details] [Upgrade?]    │
│                              │
├──────────────────────────────┤
│ LOUNGE DETAIL (Bottom Sheet) │
│                              │
│ [Hero Image]                 │
│ United Club                  │
│ ⭐⭐⭐⭐⭐ 4.8 (124 reviews)  │
│ Terminal 3, Gate C15 area    │
│                              │
│ ✓ INCLUDED WITH YOUR TICKET  │
│ United Gold Elite            │
│                              │
│ Location & Directions        │
│ 200 ft from Gate C15          │
│ 500 ft from Security         │
│ [Get Directions]             │
│                              │
│ Amenities                    │
│ [✓] WiFi [✓] Power           │
│ [✓] Hot Food [✓] Beverages   │
│ [✓] Seating [✓] Shower       │
│ [✓] Quiet Area [✓] Business  │
│ [✗] Spa [✗] Day Beds         │
│                              │
│ Current Status               │
│ Capacity: ████░░░░ 43%      │
│ Wait: 5 minutes              │
│ "Busy now, clears at 2:15 PM"│
│                              │
│ Reviews                      │
│ "⭐⭐⭐⭐⭐ Clean, great WiFi" │
│ "⭐⭐⭐⭐ Good food options" │
│                              │
│ [✓ Go There] [Reserve Seat]  │
│                              │
└──────────────────────────────┘
```

---

### 6. Interaction Patterns

- **Tap lounge card:** Open detail sheet with full amenities, reviews, directions
- **Swipe up detail sheet:** View full information
- **Tap Get Directions:** Enable wayfinding mode with turn-by-turn navigation
- **Tap Reserve Seating:** Request seat reservation (if available)
- **Tap Map View:** Switch from list to interactive terminal map
- **Toggle Access Filter:** Show only lounges with access granted

---

### 7. State Management

**Local Component State:**
```typescript
const [lounges, setLounges] = useState<Lounge[]>(initialLounges);
const [selectedLounge, setSelectedLounge] = useState<Lounge | null>(null);
const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
const [showWayfinding, setShowWayfinding] = useState(false);
const [selectedSeating, setSelectedSeating] = useState<{ reservedUntil: ISO8601 } | null>(null);
```

---

### 8. Data Requirements & Mock Data

**Mock Lounge Data:**
```typescript
export const mockLounges: Lounge[] = [
  {
    id: 'LOUNGE001',
    name: 'United Club',
    airport: 'SFO',
    terminal: 'T3',
    location: { latitude: 37.6213, longitude: -122.3790 },
    hours: { open: '05:00', close: '22:00' },
    rating: 4.8,
    amenities: ['wifi', 'power', 'hot_food', 'beverages', 'seating', 'shower', 'quiet_area', 'business_center'],
    images: ['united-club-1.jpg', 'united-club-2.jpg'],
    access: {
      userCanAccess: true,
      accessType: 'included',
      reason: 'United Gold Elite + Business Class'
    },
    currentCapacity: 43,
    estimatedWaitTime: 5,
    guestPolicy: { allowGuests: true, maxGuests: 2 }
  },
  // ... more lounges
];
```

---

### 9. Persona Adaptations

#### PERSONA-01 (Alexandra)
- **Top Lounges:** Centurion Lounge, First Class Lounges (premium, exclusive)
- **Amenities Emphasis:** Spa, shower, fine dining, concierge
- **Notifications:** Lounge occupancy alerts, premium experiences

#### PERSONA-02 (Marcus)
- **Top Lounges:** Business-focused (United Club, American Club)
- **Amenities Emphasis:** WiFi quality, power outlets, work areas, meeting rooms
- **Integration:** Automatically checks in to lounge when entering airport

#### PERSONA-03 (Chen Family)
- **Family Lounge:** Priority access to family lounges with kids' areas
- **Amenities:** Kids' entertainment, family restrooms, family dining areas
- **Accessibility:** Family-accessible amenities highlighted

---

### 10. Accessibility Requirements

**ARIA:**
- Lounge list: Semantic list with proper heading hierarchy
- Access status: Clearly announced (included/upgrade/not available)
- Amenity icons: Alt text describing amenities
- Wayfinding: Turn-by-turn directions announced via screen reader

**Focus Management:**
- Initial focus on lounge list
- Tab through lounges
- Detailed view accessible via keyboard

**Keyboard Navigation:**
- Arrow keys: Navigate lounge list
- Enter/Space: Open detail view
- Escape: Close detail view

---

### 11. Build Checklist

- [ ] Route created: `(main)/airport/[airportCode]/lounges/page.tsx`
- [ ] LoungeCard component with access status
- [ ] LoungeFinder map and list views
- [ ] LoungeDetailSheet component
- [ ] Amenity checklist component
- [ ] Wayfinding/turn-by-turn navigation
- [ ] Seating reservation flow (if applicable)
- [ ] Access eligibility validation
- [ ] Real-time capacity/occupancy updates
- [ ] Review display and ratings
- [ ] Mock lounge data connected
- [ ] Persona-specific content variations
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-020 (Lounge Finder) enables premium travelers and frequent business travelers to discover and access airport lounges seamlessly. By validating access eligibility, displaying amenities, showing real-time capacity, and enabling turn-by-turn wayfinding, AirThere ensures lounge experiences are optimized based on traveler status. The interactive map view, detailed amenity lists, and occupancy metrics help travelers make informed decisions about lounge visits. Persona-specific adaptations ensure Alexandra discovers premium lounges with spa services, Marcus finds productive work spaces, and the Chen family accesses family-friendly accommodations.

