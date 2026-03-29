# Trip Recap / Post-Trip — Build Shard
## AirThere | Screen SCR-014 | Shard 14

### 1. Screen Overview

**Purpose:** Memory capture, expense reconciliation, loyalty reconciliation, and trip analytics. Transforms fragmented travel data into a cohesive trip narrative with automated photo curation, expense breakdown, loyalty points posting, and actionable travel insights. Appears immediately post-landing and remains accessible in trip history.

**Role in Journey:** Final phase of travel journey. Captures trip memories (photos), reconciles expenses (for expense reporting), posts loyalty points, and provides post-trip wellness guidance (jet lag recovery, hydration). Serves as the trip closure and memory permanence layer.

**Entry Points:**
- Automatic activation when flight lands (status = 'landed')
- Manual tap from Trip Dashboard (completed trips section)
- Home tab notification "Your trip to London is complete"

**Exit Points:**
- Save trip to memories → Digital album view
- Expense report → External export (Concur, Expensify, etc.)
- Next trip inspiration → Discover tab

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/trips/[tripId]/recap/page.tsx
(main)/trips/[tripId]/memories/page.tsx (album view)
```

**File Structure:**
```
src/
├── app/
│   └── (main)/
│       ├── trips/
│       │   └── [tripId]/
│       │       ├── recap/
│       │       │   └── page.tsx (SCR-014)
│       │       ├── memories/
│       │       │   └── page.tsx (album view)
│       │       └── layout.tsx
├── components/
│   ├── trip/
│   │   ├── TripRecap.tsx (main container)
│   │   ├── TripSummary.tsx (duration, destinations, cost)
│   │   ├── ExpenseBreakdown.tsx (flight, hotel, transport, etc.)
│   │   ├── LoyaltyReconciliation.tsx (points posted)
│   │   ├── MemoriesCarousel.tsx (auto-curated photos)
│   │   ├── TravelInsights.tsx (distance, countries, activities)
│   │   ├── JetLagRecovery.tsx (post-trip wellness)
│   │   ├── ShareTrip.tsx (social sharing)
│   │   └── BookNextTrip.tsx (inspiration)
│   └── shared/
│       └── PhotoCarousel.tsx
└── lib/
    └── mock-data/
        └── tripRecapData.ts
```

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-008 (Trip Dashboard) — Itinerary context
- SCR-012 (In-Flight Experience) — Entertainment history
- Payment/Booking data — Expenses

**Shared components:**
- Card, Button, Badge
- Photo carousel
- ShareDialog (for social sharing)
- ExportDialog (for expense report export)

---

### 4. Component Hierarchy

```
TripRecap (page container)
├── TripSummary (hero section)
│   ├── Trip Title ("Trip to London, Mar 30 - Apr 6, 2026")
│   ├── Duration & Dates
│   ├── Total Cost Summary
│   └── [Download Itinerary] [Share Trip]
│
├── MemoriesCarousel
│   ├── Auto-curated photos from flight + destination
│   ├── Create Album button
│   ├── Share button
│   └── "5 memories captured"
│
├── ExpenseBreakdown
│   ├── Flight Cost (+ taxes)
│   ├── Hotel Cost
│   ├── Ground Transport
│   ├── Activities/Dining
│   ├── Baggage/Fees
│   └── Total with visual bar chart
│
├── LoyaltyReconciliation
│   ├── "Your loyalty points have been posted"
│   ├── Points breakdown:
│   │   ├── Flight: 8,500 miles
│   │   ├── Hotel: 2,500 points
│   │   └── Elite status bonus: +500 miles
│   ├── Updated balance
│   └── [View Transactions]
│
├── TravelInsights
│   ├── Distance traveled: 5,358 miles
│   ├── Countries visited: 2
│   ├── New cities: London, Bath
│   ├── Nights away: 7
│   ├── Time zones crossed: +8 hours
│   └── "You've earned 2 countries toward a destination milestone"
│
├── JetLagRecovery
│   ├── "You arrived +8 hours ahead"
│   ├── Recovery guide
│   │   ├── Sunlight exposure timing
│   │   ├── Meal timing adjustment
│   │   ├── Sleep schedule suggestion
│   │   └── Activity recommendations
│   └── [View Full Guide]
│
└── NextTrip
    ├── "Ready for your next adventure?"
    ├── Inspired by this trip?
    │   └── Similar destinations
    └── [Explore Destinations] [View Wishlist]
```

---

### 5. Component Specifications

#### 5.1 TripSummary

**TypeScript Interface:**
```typescript
interface TripSummaryProps {
  trip: {
    id: string;
    title: string;
    startDate: ISO8601;
    endDate: ISO8601;
    origin: { city: string; country: string };
    destinations: Array<{ city: string; country: string }>;
    totalCost: number;
    currencyCode: string;
  };
  onShare: () => void;
  onDownload: () => void;
}
```

**Shadcn UI Base:** Card, Button, Badge

**Tailwind Classes:**
```
- Container: bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6 md:p-8
- Title: text-3xl font-bold
- Dates: text-sm opacity-90
- Cost: text-4xl font-bold mt-4
- Actions: flex gap-3 mt-4
```

---

### 6. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ Trip to London               │
│ Mar 30 - Apr 6, 2026         │
│ 7 nights                     │
│                              │
│ Total Cost: $4,850           │
│ [Share] [Download]           │
├──────────────────────────────┤
│ Your Memories                │
│ ┌────────────────────────┐   │
│ │   [Photo]              │   │
│ │   [Photo]              │   │
│ │   5 memories captured  │   │
│ └────────────────────────┘   │
│ [Create Album] [Share]       │
├──────────────────────────────┤
│ Expense Breakdown            │
│ Flights:    $2,400 ███░░░░  │
│ Hotel:      $1,600 ██░░░░░  │
│ Transport:    $450 █░░░░░░  │
│ Activities:   $300 ░░░░░░░  │
│ Other:        $100 ░░░░░░░  │
│ Total:      $4,850           │
│ [Export for Expense Report]  │
├──────────────────────────────┤
│ Your Loyalty Points          │
│ ✓ 8,500 miles posted         │
│ Flight:    6,000 miles       │
│ Hotel:     2,000 miles       │
│ Elite:     +500 bonus        │
│ Balance:   125,342 miles     │
│ [View All Transactions]      │
├──────────────────────────────┤
│ Travel Insights              │
│ 📍 5,358 miles traveled      │
│ 🌍 2 countries visited       │
│ 🏙️  2 new cities (London)   │
│ 🛏️  7 nights away            │
│ 🕐 +8 hours time shift       │
├──────────────────────────────┤
│ Jet Lag Recovery             │
│ You arrived 8 hours ahead.   │
│ Recovery tips:               │
│ • Get sunlight 6-8pm today   │
│ • Dinner at normal UK time   │
│ • Sleep at 10pm UK time      │
│ [Full Jet Lag Guide]         │
├──────────────────────────────┤
│ Ready for Next Adventure?    │
│ Inspired by London? We found │
│ similar destinations:        │
│ • Paris (4 hrs away)         │
│ • Amsterdam (3 hrs away)     │
│ [Explore Destinations]       │
└──────────────────────────────┘
```

---

### 7. Interaction Patterns

- **Swipe through memories carousel:** Photo navigation
- **Tap photo:** Expand fullscreen
- **Tap create album:** Navigate to memories editor
- **Tap export:** Download expense report
- **Tap jet lag guide:** Bottom sheet with detailed recovery plan

---

### 8. State Management

**Local Component State:**
```typescript
const [expandedExpense, setExpandedExpense] = useState<string | null>(null);
const [showJetLagGuide, setShowJetLagGuide] = useState(false);
const [selectedMemory, setSelectedMemory] = useState<number>(0);
```

---

### 9. Data Requirements & Mock Data

**Mock Trip Recap Data:**
```typescript
export const mockTripRecap = {
  trip: {
    id: 'TRIP001',
    title: 'Trip to London',
    startDate: '2026-03-30T11:00:00-07:00',
    endDate: '2026-04-06T15:30:00+00:00',
    origin: { city: 'San Francisco', country: 'USA' },
    destinations: [
      { city: 'London', country: 'UK' },
      { city: 'Bath', country: 'UK' },
    ],
    totalCost: 4850,
    currencyCode: 'USD',
  },
  expenses: {
    flight: 2400,
    hotel: 1600,
    transport: 450,
    activities: 300,
    dining: 200,
    misc: 100,
  },
  loyalty: {
    pointsPosted: {
      flight: 6000,
      hotel: 2000,
      elite: 500,
    },
    newBalance: 125342,
  },
  memories: {
    count: 5,
    photos: ['photo1.jpg', 'photo2.jpg', /* ... */],
  },
  insights: {
    distanceTraveled: 5358,
    countriesVisited: 2,
    newCities: ['London', 'Bath'],
    nightsAway: 7,
    timeZoneShift: 8,
  },
};
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Alexandra)
- **Expense:** Simplified (no per-item breakdown, luxury spending expected)
- **Memories:** Premium photo curation (professional photos prioritized)
- **Loyalty:** Points balance prominence, elite status maintained
- **Next Trip:** Luxury destinations similar to London

#### PERSONA-02 (Marcus)
- **Expense:** Detailed breakdown for expense report, export button prominent
- **Loyalty:** Policy compliance noted ("Flight within policy spending limits")
- **Wellness:** Jet lag recovery tied to next business activities
- **Next Trip:** Business destinations, future meeting locations

#### PERSONA-03 (Chen Family)
- **Expense:** Family total vs. per-person breakdown
- **Memories:** All family members' photos in album
- **Family Stats:** "Kids' new experiences: 2 museums, 5 attractions"
- **Next Trip:** Family-friendly destination recommendations

---

### 11. Accessibility Requirements

**ARIA:**
```typescript
<main role="main" aria-label="Trip recap and memories">
  <section aria-label="Trip summary">
    {/* Summary data */}
  </section>
  <section aria-label="Photo memories" role="region">
    {/* Photo carousel */}
  </section>
</main>
```

**Focus Management:**
- Initial focus on trip title
- Tab through: Summary → Memories → Expenses → Loyalty → Insights → Jet Lag → Next Trip

**Keyboard:**
- Arrow keys: Navigate photo carousel
- Enter/Space: Expand photo, export, share

**Screen Reader:**
- Photo carousel: "1 of 5 photos: [description if available]"
- Expense breakdown: "Flight $2,400 of total $4,850 (49 percent)"
- Loyalty: "8,500 miles posted from flight"

---

### 12. Loading, Error & Empty States

**Loading:** Skeleton showing trip structure while data loads
**Error:** "Unable to load trip recap" with retry button
**Empty Memories:** "No photos captured. Add manual memories" → Photo upload
**Empty Expenses:** "No expense data. This is your trip summary"

---

### 13. Edge Cases & Error Handling

- **Multiple trips in same period:** Show trip selector
- **Loyalty not yet posted:** Show "Points posting in 24-48 hours"
- **Mixed currency trips:** Convert to traveler's home currency
- **Incomplete expense data:** Show "Some expenses not yet recorded"
- **No destination context:** Show "Trip summary" instead of specific cities

---

### 14. Testing Requirements

- Trip summary rendering
- Expense breakdown calculations
- Loyalty points reconciliation
- Memory carousel navigation
- Jet lag recovery timing calculations
- Persona-specific content variations
- Export functionality
- Accessibility compliance

---

### 15. Build Checklist

- [ ] Route created: `(main)/trips/[tripId]/recap/page.tsx`
- [ ] TripSummary component with hero layout
- [ ] MemoriesCarousel component with photo navigation
- [ ] ExpenseBreakdown with bar chart visualization
- [ ] LoyaltyReconciliation component
- [ ] TravelInsights component with statistics
- [ ] JetLagRecovery component with guide
- [ ] NextTrip inspiration section
- [ ] Share functionality (social sharing)
- [ ] Export functionality (expense report)
- [ ] Mock data connected
- [ ] Persona adaptations applied
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-014 (Trip Recap) transforms post-trip fragmentation into cohesive memory capture, expense reconciliation, and loyalty posting. By automatically curating photos, breaking down expenses, posting loyalty points, and providing jet lag recovery guidance, AirThere extends value beyond the flight into the post-trip experience. The screen serves as trip closure and memory permanence, enabling travelers to preserve experiences, reconcile finances, and prepare for recovery. Persona-specific adaptations ensure Alexandra sees luxury experience summaries, Marcus gets expense report exports, and the Chen family sees family-inclusive memory albums.

