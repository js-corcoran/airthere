# IROPS / Disruption Recovery — Build Shard
## AirThere | Screen SCR-013 | Shard 13

### 1. Screen Overview

**Purpose:** The most critical CX moment in air travel — proactive disruption detection and recovery orchestration. This screen handles flight delays, cancellations, diversions, and rebooking with anticipatory intelligence, family-aware rebooking, and autonomous decision-making (within graduated trust levels). Serves as the command center during operational irregularities.

**Role in Journey:** Activated when flight encounters disruption (weather, mechanical, air traffic delay, cancellation). Provides proactive alert before traveler is aware, automatically generates rebooking options, handles family integrity protection, and manages hotel/transport vouchers. The difference between panic-inducing disruption and calm resolution.

**Entry Points:**
- Push notification "Weather alert: Your flight has 20% delay risk"
- Automatic activation on flight status change (cancelled/delayed)
- Manual tap from Home/Trips tab to view disruption status
- Connection alert escalation (if connection jeopardized)

**Exit Points:**
- Rebooking approved → Trip Dashboard (SCR-008) with updated itinerary
- Manual rebooking selection → Booking Confirmation (SCR-007)
- Contact airline agent → bottom sheet with contact options
- Dispute resolution → Support ticket creation

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/irops/[flightId]/page.tsx
Alternative: (main)/disruptions/[disruptionId]/page.tsx
```

**File Structure:**
```
src/
├── app/
│   └── (main)/
│       ├── irops/
│       │   ├── [flightId]/
│       │   │   └── page.tsx (SCR-013)
│       │   └── layout.tsx
├── components/
│   ├── irops/
│   │   ├── DisruptionAlert.tsx (main container)
│   │   ├── DisruptionSeverity.tsx (visual indicator)
│   │   ├── RebookingOptions.tsx (alternative flights)
│   │   ├── AutomaticRebooking.tsx (pre-approved suggestions)
│   │   ├── FamilyRebookingConfirm.tsx (family integrity check)
│   │   ├── AlternativeRouting.tsx (multi-leg alternatives)
│   │   ├── HotelVoucher.tsx (accommodation options)
│   │   ├── TransportVoucher.tsx (ground transport)
│   │   ├── DisruptionTimeline.tsx (when will resolution be clear)
│   │   └── AirlineContact.tsx (escalation options)
│   └── shared/
│       └── ProgressBar.tsx
└── lib/
    └── mock-data/
        └── disruptionScenarios.ts
```

**Layout Group:** `(main)` — requires authentication

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-010 (Airport Live View) — Real-time airport status, disruption data
- SCR-008 (Trip Dashboard) — Itinerary context, connection info
- SCR-011 (Gate & Boarding) — Gate assignment (if already assigned)

**Shared components:**
- `BottomTabBar` — Persistent navigation
- `ToastContainer` — Instant disruption alerts
- `ContextualHeader` — Adaptive header (may be hidden due to critical alert)
- `PullToRefresh` — Refresh disruption status
- `BottomSheet` — Airline contact form, hotel selection, additional options
- `Modal` — Rebooking confirmation, family integrity warning

**Mock data:**
- `disruptionScenarios.ts` — Weather delays, mechanical issues, cancellations, diversions
- `rebookingOptions.ts` — Alternative flights with cost/time tradeoffs
- `hotelVouchers.ts` — Hotel accommodation options near airport/destination
- `transportVouchers.ts` — Ground transport alternatives

---

### 4. Component Hierarchy

```
DisruptionAlert (page container)
├── DisruptionSeverity (top banner, high alert priority)
│   ├── Icon (red, amber, or blue depending on severity)
│   ├── Headline ("Flight Cancelled", "Delayed 3 hours", "Diverted to Denver")
│   ├── Timestamp (when disruption was detected)
│   └── Current Status Indicator
│
├── [Timeline] DisruptionTimeline
│   ├── Original Flight Departure Time
│   ├── Current Status (Delay: +3h | Cancelled | Diverted)
│   ├── Expected Resolution Time (when will rebooking be ready)
│   └── Visual Timeline Progress
│
├── [Root Cause] RootCauseExplanation
│   ├── Cause Type (weather, mechanical, air traffic control)
│   ├── Detailed Explanation in plain language
│   ├── "Why this affects you" context
│   └── Expected duration
│
├── [Automatic Recommendation] AutomaticRebooking
│   ├── "We've found you a better flight" or "We're rebooking you automatically"
│   ├── Recommended Flight Details
│   │   ├── Flight number, time, route
│   │   ├── Seat assignment (same cabin class as original)
│   │   └── Connection timing (if multi-leg)
│   ├── Comparison Indicators
│   │   ├── "Departs 30 minutes earlier"
│   │   ├── "Same cabin class (business)"
│   │   ├── "No additional cost"
│   │   └── "Family seating maintained"
│   ├── Trust Indicator (graduated UI based on persona)
│   │   └── "Approved for auto-rebooking based on your preferences"
│   └── [Approve] [Decline - Show Options] buttons
│
├── [Family Integrity Check] FamilyRebookingConfirm (if applicable)
│   ├── "Family seating analysis"
│   ├── Visual seat confirmation
│   │   ├── "Original: 12A, 12B, 12C, 12D (together)"
│   │   ├── "New flight: F4, F5, F6, F7 (still together)"
│   ├── Family member status
│   │   └── John, Amy, Zoe, Max (all on new flight)
│   └── [Confirm Family Rebooking]
│
├── [Alternative Options] RebookingOptions
│   ├── Tabs: All Options | Same Day | Next Day | Same Route | Any Route
│   ├── Sortable Columns: Time | Duration | Stops | Price | Departure Time
│   ├── Flight Cards (1-5 best options)
│   │   ├── Flight Number & Airline
│   │   ├── Departure & Arrival Time
│   │   ├── Duration & Stops
│   │   ├── Price (with "No additional cost" or "$+250")
│   │   ├── Connection Risk (if multi-leg: "90 min connection - adequate")
│   │   ├── Seat Availability (cabin class)
│   │   └── [Select] button
│   │
│   ├── Expansion: Alternative Routing (if needed)
│   │   ├── "Get to destination via Denver instead (next day, $150 less)"
│   │   ├── Multi-leg timeline
│   │   └── [View Details]
│   │
│   └── "We're monitoring availability - more options may appear"
│
├── [If Overnight] HotelVoucher
│   ├── Voucher Header ("Hotel accommodation provided")
│   ├── Hotel Options (up to 3 options)
│   │   ├── Hotel Name & Star Rating
│   │   ├── Distance from Airport/Hotel
│   │   ├── Price (marked as "Covered by voucher" or "$+X cost to you")
│   │   ├── Amenities (WiFi, breakfast, shuttle)
│   │   └── [Book]
│   ├── Voucher Details
│   │   ├── "Voucher value: $250 (single room)"
│   │   ├── Check-in/check-out times
│   │   └── "Meals not included — dinner on you"
│   └── Alternative: "Prefer alternative accommodation? We'll reimburse up to $X"
│
├── [Ground Transport] TransportVoucher
│   ├── Voucher Header ("Ground transport provided")
│   ├── Transport Options
│   │   ├── Airport Shuttle (free)
│   │   ├── Rental Car (covered up to $50/day)
│   │   ├── Rideshare Credit (covered up to $75)
│   │   └── Taxi/Limo (covered up to $100)
│   └── Instructions for Claiming
│
├── [Contact Options] AirlineContact
│   ├── "Need to speak with an agent?"
│   ├── Contact Methods (in priority order)
│   │   ├── 📱 Chat (2 min wait) [Start Chat]
│   │   ├── 📞 Call (estimated 15 min wait) [Call Now]
│   │   ├── ✉️ Email (response in 2 hours) [Send Email]
│   │   └── 🏪 Airport Help Desk (nearby location) [Get Location]
│   └── Escalation: "Complex situation? Request supervisor"
│
├── [Loyalty Impact] LoyaltyStatus (if applicable)
│   ├── "Delay compensation calculation"
│   ├── Miles/points awarded
│   ├── Status protection (elite status maintained)
│   └── Goodwill compensation (travel voucher value)
│
└── [Action Summary] ActionSummary
    ├── Primary CTA: [Approve Automatic Rebooking] (prominent, high visibility)
    ├── Alternative: [View Other Options]
    └── Or: [Speak with Agent]
```

---

### 5. Component Specifications

#### 5.1 DisruptionAlert (Main Container)

**TypeScript Interface:**
```typescript
interface DisruptionAlertProps {
  flightId: string;
  disruption: {
    type: 'delay' | 'cancellation' | 'diversion' | 'oversold';
    severity: 'low' | 'medium' | 'high' | 'critical';
    detectedAt: ISO8601;
    rootCause: {
      type: 'weather' | 'mechanical' | 'crew' | 'air_traffic' | 'security' | 'oversold' | 'unknown';
      description: string;
      expectedResolution?: ISO8601;
    };
    impact: {
      originalDeparture: ISO8601;
      estimatedDeparture?: ISO8601;
      delay: number; // minutes (if delay)
      isCancelled: boolean;
      alternateAirport?: string; // if diverted
    };
  };
  automaticRebooking?: {
    recommendedFlight: Flight;
    isPreApproved: boolean;
    familyIntegrityMaintained: boolean;
    noAdditionalCost: boolean;
  };
  alternatives: Flight[];
  passenger: {
    loyaltyTier: string;
    compensationEligible: boolean;
  };
}

interface RebookingState {
  selectedFlight?: Flight;
  isApproved: boolean;
  requiresFamilyConfirmation: boolean;
  needsHotel: boolean;
  needsTransport: boolean;
  isProcessing: boolean;
}
```

**Internal State:**
```typescript
const [selectedRebooking, setSelectedRebooking] = useState<Flight | null>(
  automaticRebooking?.recommendedFlight || null
);
const [showAlternatives, setShowAlternatives] = useState(false);
const [familyConfirmed, setFamilyConfirmed] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);

const shouldShowAutomatic = automaticRebooking &&
  automaticRebooking.isPreApproved &&
  automaticRebooking.familyIntegrityMaintained;
```

**Shadcn UI Base:** Card, Button, Alert, Dialog

**Tailwind Classes:**
```
- Container: bg-white dark:bg-neutral-900 min-h-screen
- Severity Banner:
  - High: bg-red-100 dark:bg-red-900 border-l-4 border-red-600
  - Medium: bg-amber-100 dark:bg-amber-900 border-l-4 border-amber-600
  - Low: bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-600
- Headline: text-2xl font-bold text-red-900 dark:text-red-100 (for high severity)
- Content Spacing: p-6 md:p-8
- CTA Button: bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-lg
```

#### 5.2 AutomaticRebooking

**TypeScript Interface:**
```typescript
interface AutomaticRebookingProps {
  originalFlight: Flight;
  recommendedFlight: Flight;
  isPreApproved: boolean;
  familyIntegrityMaintained: boolean;
  noAdditionalCost: boolean;
  trustLevel: 'low' | 'medium' | 'high'; // based on passenger history
  onApprove: () => void;
  onDecline: () => void;
}

interface RebookingComparison {
  timeDifference: number; // minutes (positive = earlier)
  cabinClassMaintained: boolean;
  seatUpgradePossible: boolean;
  connectionImpactImproved: boolean;
}
```

**Shadcn UI Base:** Card, Button, Badge

**Tailwind Classes:**
```
- Container: bg-green-50 dark:bg-green-900 rounded-lg p-4 border-2 border-green-500
- Header: flex items-center gap-2
- Icon: text-2xl (✓ checkmark)
- Title: font-bold text-green-900 dark:text-green-100
- Flight Details: grid grid-cols-2 gap-3 my-4
- Comparison Badges: grid grid-cols-1 md:grid-cols-2 gap-2
- Badge: bg-green-100 dark:bg-green-800 px-3 py-2 rounded text-sm text-green-900 dark:text-green-100
- Buttons: flex gap-3
```

**Responsive Behavior:**
- Mobile: Full-width card, vertical button layout
- Tablet+: Comparison side-by-side, horizontal buttons

#### 5.3 FamilyRebookingConfirm

**TypeScript Interface:**
```typescript
interface FamilyRebookingConfirmProps {
  family: Array<{
    name: string;
    age: number;
    id: string;
  }>;
  originalSeating: Array<{ memberName: string; seat: string }>;
  newSeating: Array<{ memberName: string; seat: string }>;
  seatingIntegrityMaintained: boolean;
  onConfirm: () => void;
  onReview: () => void;
}
```

**Shadcn UI Base:** Card, Button, List

**Tailwind Classes:**
```
- Container: bg-blue-50 dark:bg-blue-900 rounded-lg p-4 border border-blue-500
- Family List: space-y-2
- Member Row: flex items-center justify-between py-2 border-b border-blue-200 dark:border-blue-700 last:border-b-0
- Member Info: flex items-center gap-3
- Avatar: w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-sm font-bold
- Seating: text-sm font-mono text-neutral-600 dark:text-neutral-400
- Status Icon: text-lg (✓ for intact, ⚠️ for split)
- Confirmation Button: bg-green-600 hover:bg-green-700
```

#### 5.4 RebookingOptions

**TypeScript Interface:**
```typescript
interface RebookingOptionsProps {
  alternatives: Flight[];
  originalFlight: Flight;
  selectedFlight?: Flight;
  sortBy: 'departure_time' | 'duration' | 'price' | 'best_value';
  filterBy: 'same_day' | 'next_day' | 'any' | 'same_route' | 'any_route';
  onSelect: (flight: Flight) => void;
  familySize?: number;
}

interface FlightOption {
  flight: Flight;
  comparisonMetrics: {
    timeDifference: number;
    priceDifference: number;
    connectionRisk: 'low' | 'medium' | 'high';
    seatAvailability: number; // count in original cabin
  };
}
```

**Shadcn UI Base:** Tabs, List, Button

**Tailwind Classes:**
```
- Container: space-y-4
- Tab Bar: flex gap-2 border-b mb-4
- Flight Card: bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-md transition-shadow
- Card Header: flex justify-between items-start mb-3
- Flight Number: font-bold text-lg
- Price Badge: text-sm font-semibold text-green-600 dark:text-green-400
- Details Grid: grid grid-cols-2 md:grid-cols-4 gap-3 text-sm
- Detail Item: flex items-center gap-2
- Icon: text-neutral-600 dark:text-neutral-400
- Comparison Badges: flex gap-2 mt-3 flex-wrap
- Select Button: px-4 py-2 bg-primary-600 text-white rounded
```

#### 5.5 HotelVoucher

**TypeScript Interface:**
```typescript
interface HotelVoucherProps {
  voucherValue: number; // dollars
  checkInDate: ISO8601;
  checkOutDate: ISO8601;
  hotelOptions: Array<{
    id: string;
    name: string;
    rating: number;
    distanceFromAirport: number; // km
    distanceFromHotel?: number;
    pricePerNight: number;
    amenities: string[];
    voucherCovers: boolean;
    coverageAmount?: number;
  }>;
  onSelect: (hotelId: string) => void;
}
```

**Shadcn UI Base:** Card, Button, Badge

**Tailwind Classes:**
```
- Container: bg-blue-50 dark:bg-blue-900 rounded-lg p-4
- Voucher Info: mb-4
- Voucher Value: text-lg font-bold text-blue-900 dark:text-blue-100
- Hotel Grid: grid grid-cols-1 md:grid-cols-2 gap-3
- Hotel Card: bg-white dark:bg-neutral-800 p-3 rounded border border-blue-200 dark:border-blue-700 hover:shadow-md
- Rating: flex gap-1 text-yellow-500
- Amenity Badges: flex gap-2 flex-wrap mt-2 text-xs
- Book Button: bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm
```

---

### 6. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ 🚫 YOUR FLIGHT IS CANCELLED  │ Alert Banner (Red)
│ Detected 2 minutes ago       │
├──────────────────────────────┤
│                              │
│ WHAT HAPPENED                │
│ Weather at San Francisco     │
│ Lightning storm preventing   │
│ departures. Expect clarity   │
│ by 6:00 PM.                  │
│                              │
├──────────────────────────────┤
│ 📈 TIMELINE                  │
│ Original departure: 11:00 AM │
│ Status: Cancelled            │
│ Est. resolution: 6:00 PM     │
│ ████████░░░░░ Investigating  │
│                              │
├──────────────────────────────┤
│ ✓ WE'VE REBOOKED YOU        │
│                              │
│ UA 902 | 11:45 AM (tomorrow) │
│ SFO → LHR                    │
│ Business Class (maintained)  │
│ Seats: 12A, 12B, 12C, 12D   │
│ (Family together)            │
│ No additional cost           │
│                              │
│ ✓ Family seating confirmed   │
│                              │
│ [✓ APPROVE REBOOKING]       │
│ [View Other Options]         │
│                              │
├──────────────────────────────┤
│ 🏨 HOTEL PROVIDED           │
│ Marriott near SFO           │
│ Check-in: Today 2:00 PM     │
│ Voucher: $250 (single room) │
│ [Book Hotel]                │
│                              │
├──────────────────────────────┤
│ 🚗 GROUND TRANSPORT         │
│ Airport shuttle: Free       │
│ Rideshare credit: $75       │
│ [View Options]              │
│                              │
├──────────────────────────────┤
│ 💬 SPEAK WITH AGENT         │
│ Chat (2 min) | Call (15 min)│
│ [Start Chat] [Call Now]     │
│                              │
└──────────────────────────────┘
```

**Tablet Wireframe (768px):**
```
┌────────────────────────────────────┐
│ 🚫 Your flight is cancelled        │
├────────────────────┬───────────────┤
│ What Happened      │ Timeline      │
│ Weather at SFO     │ Original: 11AM│
│ Lightning storm    │ Status: Canc. │
│ Est. clarity: 6PM  │ Resolution: 6PM
│                    │ ████░░░░░░░░ │
├────────────────────┼───────────────┤
│ We've Rebooked You │ Family Check  │
│ UA 902 | 11:45 AM  │ ✓ All together│
│ SFO → LHR          │ Seats: 12A-D │
│ Business | No cost │ (confirmed)  │
│                    │ [Confirm]    │
│ [✓ Approve] [...]  │              │
├────────────────────┼───────────────┤
│ Alternative Routes │ Hotel + Trans │
│ [Same Day] [Next]  │ Marriott $250 │
│ UA 903 | 2:15 PM   │ Shuttle Free │
│ UA 905 | 6:30 PM   │ Rideshare $75│
│ [Select]           │ [Book]       │
└────────────────────┴───────────────┘
```

---

### 7. Interaction Patterns

- **Approve Automatic Rebooking:** One-tap action, shows confirmation → Trip Dashboard updated
- **Decline & View Options:** Shows alternative flight grid, sortable by time/price/duration
- **Select Alternative Flight:** Expands details (connections, seat map, pricing breakdown)
- **Family Confirmation:** Required modal if family members not confirmed, prevents rebooking until approved
- **Hotel Selection:** Bottom sheet with hotel options, booking flow
- **Contact Agent:** Bottom sheet with contact methods (chat, call, email)

---

### 8. State Management

**Local Component State:**
```typescript
const [selectedAlternative, setSelectedAlternative] = useState<Flight | null>(null);
const [familyConfirmed, setFamilyConfirmed] = useState(false);
const [isApproving, setIsApproving] = useState(false);
const [hotelSelected, setHotelSelected] = useState<string | null>(null);
const [showAlternatives, setShowAlternatives] = useState(false);
```

**Global State:**
- TripContext (update on rebooking approval)
- PassengerContext (loyalty compensation)
- FamilyContext (family member approval)

---

### 9. Data Requirements & Mock Data

**Disruption Scenarios:**
```typescript
export const mockDisruptionScenarios = {
  weatherDelay: { /* 3-hour delay due to thunderstorm */ },
  cancellation: { /* Flight cancelled, rebooking tomorrow */ },
  diversion: { /* Diverted to alternate airport */ },
  oversold: { /* Flight oversold, volunteers sought */ },
};

export const mockRebookingOptions = [
  {
    flightId: 'UA902',
    time: 'Tomorrow 11:45 AM',
    duration: '11h',
    stops: 0,
    price: 0, // No additional cost
    seatAvailability: 4,
    connectionRisk: 'low',
  },
  // ... more options
];
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Alexandra — Premium)
- **Auto-Rebooking:** First-class alternative offered automatically
- **Lounge Access:** Complimentary lounge access during disruption
- **Concierge:** Direct concierge phone line, no wait
- **Compensation:** Elite status protection + mileage bonus + travel voucher

#### PERSONA-02 (Marcus — Business)
- **Policy Compliance:** Rebooking option clearly marked as compliant
- **Productivity:** Hotel offer includes business center
- **Expense:** Auto-tracked for reimbursement
- **Compensation:** Return-flight voucher

#### PERSONA-03 (Chen Family)
- **Family Integrity:** Emphasis on "all 4 of you together"
- **Hotel:** Family room option with kids' amenities
- **Entertainment:** Advice on keeping kids entertained during disruption
- **Compensation:** Family-focused travel voucher (entire family use)

---

### 11. Accessibility Requirements

**ARIA:**
```typescript
<main role="main" aria-label="Flight disruption recovery">
  <section aria-live="assertive" aria-label="Disruption alert">
    {/* High-priority alerts announced immediately */}
  </section>
  <section aria-label="Automatic rebooking recommendation" role="region">
    {/* Rebooking details */}
  </section>
</main>
```

**Focus Management:**
- Initial focus on primary CTA button
- Tab order: Alert → Recommendation → Alternatives → Hotel → Contact → Loyalty
- Focus trap in modal dialogs (family confirmation)

**Keyboard Navigation:**
- Tab/Shift+Tab: Navigate sections
- Enter/Space: Approve rebooking, select alternative
- Escape: Close modals (except critical family confirmation)

**Screen Reader:**
Clear announcement of disruption type, impact, and recommended action before alternatives.

**Color Contrast:**
- Red alert (4.5:1 contrast minimum)
- Green approval (3:1 contrast)
- All text on colored backgrounds meets WCAG AA

---

### 12. Loading, Error & Empty States

**Loading:** Skeleton showing disruption details while rebooking options load
**Error:** "Cannot retrieve rebooking options" → Provide airline contact number
**Empty:** If no rebooking possible same-day, show "Next available option is tomorrow"

---

### 13. Edge Cases & Error Handling

- **Family members on different reservations:** Consolidate rebooking, warn if manual intervention needed
- **Oversold situation:** Show options (accept compensation, move to next flight, volunteer standby)
- **Multi-leg connections:** Intelligently rebook entire itinerary, not just affected segment
- **Loyalty status protection:** Clarify that elite status maintained despite disruption
- **International flight disruption:** Show visa implications if rerouting to different country

---

### 14. Testing Requirements

- Component render tests for all disruption types
- Rebooking approval state tests
- Family integrity validation tests
- Hotel/transport voucher tests
- Alternative routing logic tests
- Accessibility tests (ARIA, keyboard navigation, screen reader)
- Integration tests with Trip Dashboard updates

---

### 15. Build Checklist

- [ ] Route created: `(main)/irops/[flightId]/page.tsx`
- [ ] DisruptionAlert component with severity indicator
- [ ] AutomaticRebooking component with pre-approval logic
- [ ] FamilyRebookingConfirm modal for family integrity
- [ ] RebookingOptions with sortable flight list
- [ ] AlternativeRouting for multi-leg disruptions
- [ ] HotelVoucher with booking integration
- [ ] TransportVoucher with claim instructions
- [ ] AirlineContact bottom sheet with escalation
- [ ] Real-time disruption monitoring (poll every 30 seconds)
- [ ] Automatic approval flow (for high trust)
- [ ] Manual rebooking flow (decline automatic)
- [ ] Family status updates (all members confirmed)
- [ ] Loyalty compensation calculation
- [ ] Persona adaptations applied (Alexandra, Marcus, Chen)
- [ ] Loading states implemented
- [ ] Error states with recovery options
- [ ] Accessibility verified (ARIA, keyboard, screen reader)
- [ ] Tests passing

---

## Summary

SCR-013 (IROPS Disruption Recovery) is AirThere's most critical competitive advantage — transforming panic-inducing disruptions into calm, automated recovery. By combining anticipatory alerts, automatic intelligent rebooking, family-aware decision-making, and graduated trust levels, AirThere delivers control to travelers during their most anxious moments. The screen serves as the command center for operational irregularities, intelligently handling weather delays, cancellations, diversions, and oversold situations with family integrity as sacred requirement. Real-time polling ensures disruption detection happens before traveler awareness, while multi-option presentation maintains traveler autonomy alongside AI-assisted decision-making.

