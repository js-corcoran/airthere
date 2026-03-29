# Trip Dashboard — Build Shard
## AirThere | Screen SCR-008 | Shard 08

---

## 1. Screen Overview

**Screen ID:** SCR-008
**Screen Name:** Trip Dashboard
**Purpose:** Central hub displaying all active, upcoming, and past trips. Users view itineraries, manage bookings, access documents, and coordinate family trips.

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/trips/page.tsx
(main)/trips/[tripId]/page.tsx
```

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-007 (Booking Confirmation):** User completes booking → added to trips
- **Mock Data Services:** tripService.getTrips(), tripService.getTripDetails()

### Shared Components Required
- `Button`, `Card`, `Skeleton`, `Tabs` (Shadcn)
- `TripCard` (from SCR-002, extended)
- `ItineraryTimeline` (custom)
- `DocumentUploadModal` (custom)

### Mock Data Requirements
- Multiple trips (upcoming, past, disrupted)
- Detailed itinerary data (flights, hotels, ground transport)
- Document requirements by destination
- Real-time alerts and status updates

---

## 4. Component Hierarchy

```
TripDashboardPage
├── DashboardHeader
│   ├── Title ("Your Trips")
│   ├── TabNavigation (Upcoming, Past, Disrupted)
│   └── SearchBar (search trips by destination)
├── MainContent (tab-based)
│   ├── UpcomingTripsTab
│   │   ├── TripCard[] (sorted by departure date, upcoming first)
│   │   │   ├── TripSummary (route, dates, status)
│   │   │   ├── NextActionBadge (check-in reminder, documents needed)
│   │   │   ├── TapForDetails (→ Trip Detail)
│   │   │   └── QuickActionsMenu
│   │   └── EmptyState (if no trips)
│   │
│   ├── PastTripsTab
│   │   ├── TripCard[] (sorted by departure date, most recent first)
│   │   └── RecapLink ("View trip recap" → SCR-014)
│   │
│   └── DisruptedTripsTab
│       ├── AlertCard[] (disruption details)
│       └── RebookingLink ("View rebooking options" → SCR-013)
│
└── TripDetailModal (overlay, accessed from TripCard tap)
    ├── ItineraryTimeline
    │   ├── FlightLeg (departure time, arrival, gate, seat)
    │   ├── Hotel (check-in, address, confirmation)
    │   ├── GroundTransport (pickup, dropoff, vehicle)
    │   └── Activity (restaurant reservation, tour, etc.)
    ├── DocumentsSection
    │   ├── PassportStatus (expiration date, validity)
    │   ├── VisaRequirements (required docs list)
    │   ├── BookingConfirmations (flight, hotel, car)
    │   ├── TravelInsurance
    │   └── CustomDocuments (upload your own)
    ├── TravelersSection
    │   ├── TravelerCard[] (each traveler, contact info)
    │   ├── EmergencyContact
    │   └── InsuranceInfo
    └── ActionsSection
        ├── CheckInButton (if available)
        ├── ViewBoardingPassButton
        ├── ModifyBookingButton
        ├── CancelTripButton
        └── ShareTripButton
```

---

## 5. Component Specifications

### Component: TripCard (Extended)

**Props Interface:**
```typescript
interface TripCardProps {
  trip: Trip;
  showNextAction?: boolean;
  onClick?: (tripId: string) => void;
  showDetails?: boolean;
}
```

**Extended Tailwind Classes:**
```typescript
const styles = {
  badge: 'absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold',
  badgeUpcoming: 'bg-primary-500 text-white',
  badgePast: 'bg-neutral-300 text-neutral-900',
  badgeDisrupted: 'bg-error-500 text-white',
  nextActionBadge: 'mt-2 px-3 py-1 rounded bg-warning-50 text-warning-900 text-xs font-medium',
};
```

---

### Component: ItineraryTimeline

**Props Interface:**
```typescript
interface ItineraryTimelineProps {
  trip: Trip;
  expandedLeg?: string;
  onLegExpand?: (legId: string) => void;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  timeline: 'relative space-y-4 py-4',
  leg: 'relative pl-8 pb-4 border-l-2 border-primary-200',
  legActive: 'border-l-2 border-primary-500',
  legIcon: 'absolute -left-4 w-6 h-6 rounded-full bg-white border-2 border-primary-200',
  legTime: 'text-sm font-medium text-neutral-900',
  legDescription: 'text-sm text-neutral-600 mt-1',
};
```

---

## 6. Layout & Wireframe

### Upcoming Trips Tab — Mobile

```
┌──────────────────────────────────────┐
│ Your Trips          🔍              │
├──────────────────────────────────────┤
│ [Upcoming] [Past] [Disrupted]        │
├──────────────────────────────────────┤
│                                      │
│ ┌────────────────────────────────┐  │
│ │ SFO → LHR          🛫 UPCOMING │  │
│ │ Mar 30 - Apr 6, 2026           │  │
│ │                                │  │
│ │ United UA 901                  │  │
│ │ Check-in: Opens in 23h         │  │
│ │                                │  │
│ │ ⚠️ Passport expires in 60 days  │  │
│ │ 📄 Upload visa documentation   │  │
│ │                                │  │
│ │ [View Details] →               │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ NYC → CDG          🛫 UPCOMING │  │
│ │ Apr 5 - Apr 12, 2026           │  │
│ │ [Tap for details]              │  │
│ └────────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

### Trip Detail Modal — Full-Screen

```
┌──────────────────────────────────────┐
│ ← SFO → LHR        [Share] [More]   │
├──────────────────────────────────────┤
│ San Francisco to London              │
│ Mar 30 - Apr 6, 2026 (7 days)       │
│                                      │
├──────────────────────────────────────┤
│ Flight Details                       │
│ ● Mar 30 11:00 AM                   │
│   San Francisco (SFO)                │
│   [Seat 12A selected]               │
│   Gate: C15                          │
│                                      │
│   ✈️ United UA 901                   │
│   Duration: 10h 45m | Nonstop      │
│                                      │
│ ● Mar 30 8:45 PM                    │
│   London Heathrow (LHR)             │
│   [Luggage arrives 9:30 PM]         │
│                                      │
├──────────────────────────────────────┤
│ Documents                            │
│ ✓ Passport (Valid until 2028-06)    │
│ ⚠️ Visa required (not uploaded)     │
│   [Upload UK Visa] →                │
│ ✓ Travel Insurance                  │
│ ✓ Booking Confirmation              │
│                                      │
├──────────────────────────────────────┤
│ Travelers (2)                        │
│ • Alexandra Sterling (Booking ref)  │
│ • Guest 2 (Seat 12B)                │
│ Emergency contact: +1-555-0100     │
│                                      │
├──────────────────────────────────────┤
│ Actions:                             │
│ [Check In]  [View Pass]  [Modify]   │
│ [Cancel]    [Share]      [More...]  │
│                                      │
└──────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Tab Switching
- Tap tab → Switch view, preserve scroll position
- Badge indicators show counts (e.g., "Upcoming (3)", "Past (12)")

### Trip Card Tap
- Tap card → Open full-screen trip detail modal
- Tap "View Details" button → Same action

### Quick Actions Menu
- Tap "..." → Bottom sheet with more actions
- Options: Check in, modify, cancel, share, contact support

### Document Upload
- Tap "Upload [Document]" → File picker or camera
- Show upload progress and confirmation

### Expand Itinerary Leg
- Tap leg → Show details (gate, seat, confirmation #)
- Tap again → Collapse

---

## 8. State Management

### Local Component State

```typescript
const [activeTab, setActiveTab] = useState('upcoming');
const [trips, setTrips] = useState<Trip[]>([]);
const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
const [expandedLegId, setExpandedLegId] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface Trip {
  id: string;
  user_id: string;
  booking_id: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled' | 'disrupted';
  legs: TravelLeg[];
  travelers: Traveler[];
  documents: TripDocument[];
  alerts: Alert[];
  nextAction?: NextAction;
  startDate: Date;
  endDate: Date;
}

export interface TravelLeg {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'activity';
  startTime: Date;
  endTime?: Date;
  origin: Location;
  destination: Location;
  confirmationNumber: string;
  details: any;
}

export interface TripDocument {
  id: string;
  type: 'passport' | 'visa' | 'insurance' | 'booking' | 'custom';
  name: string;
  required: boolean;
  status: 'required' | 'uploaded' | 'expired' | 'expiring-soon';
  expirationDate?: Date;
  fileUrl?: string;
}
```

### Mock Data

```typescript
export function generateMockTrips(): Trip[] {
  return [
    {
      id: 'trip-001',
      user_id: 'user-001',
      booking_id: 'BK-UA-23948',
      status: 'upcoming',
      startDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
      legs: [
        {
          id: 'leg-1',
          type: 'flight',
          startTime: new Date('2026-03-30T11:00'),
          endTime: new Date('2026-03-31T08:45'),
          origin: {code: 'SFO', name: 'San Francisco'},
          destination: {code: 'LHR', name: 'London'},
          confirmationNumber: 'BK-UA-23948',
          details: {airline: 'UA', flightNumber: 'UA 901', seat: '12A'},
        },
      ],
      travelers: [{name: 'Alexandra Sterling', email: 'alexandra@example.com'}],
      documents: [
        {id: 'd1', type: 'passport', name: 'Passport', required: true, status: 'required'},
        {id: 'd2', type: 'visa', name: 'UK Visa', required: true, status: 'required'},
      ],
      alerts: [{id: 'a1', type: 'warning', message: 'Passport expires in 60 days'}],
      nextAction: {label: 'Check-in opens in 23h', action: 'check-in'},
    },
    // ... more trips
  ];
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Show: Lounge access, upgrade opportunities
- Emphasis: VIP services, status tier

### PERSONA-02: Business ("Marcus")
- Show: Policy compliance status, expense tracking
- Emphasis: Connection times, business center access

### PERSONA-03: Family ("Chen Family")
- Show: Family members together status, child accommodations
- Emphasis: Family seating confirmation, child meal orders

---

## 11. Accessibility Requirements

### ARIA Labels

**Tabs:**
```html
<div role="tablist" aria-label="Trip view options">
  <button role="tab" aria-selected="true" aria-controls="upcoming">Upcoming</button>
</div>
```

**Timeline:**
```html
<ol role="list" aria-label="Trip itinerary">
  <li aria-label="Flight departure 11:00 AM">...</li>
</ol>
```

---

## 12. Loading, Error & Empty States

### Skeleton Screen
```typescript
<div className="space-y-3">
  {[1,2,3].map(i => (
    <div key={i} className="h-40 bg-neutral-100 rounded-lg animate-pulse" />
  ))}
</div>
```

### Empty State
```typescript
<div className="text-center py-16">
  <div className="text-4xl mb-4">✈️</div>
  <h3 className="font-semibold text-neutral-900 mb-2">No upcoming trips</h3>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg">
    Book a Trip
  </button>
</div>
```

---

## 13. Edge Cases & Error Handling

- **Trip load fails:** Show error with retry button
- **Document upload fails:** Show "Upload failed" with retry
- **Check-in not available yet:** Show countdown timer
- **Trip cancelled by airline:** Show cancellation notice + rebooking options

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('TripDashboard', () => {
  it('displays upcoming trips sorted by departure', () => {
    const { getAllByText } = render(
      <TripDashboard trips={[
        {...trip1, startDate: new Date('2026-04-30')},
        {...trip2, startDate: new Date('2026-03-30')},
      ]} />
    );
    const cards = getAllByText(/SFO/);
    expect(cards[0]).toHaveTextContent('Mar 30'); // Most recent first
  });

  it('switches tabs correctly', async () => {
    const { getByText } = render(<TripDashboard />);
    await userEvent.click(getByText('Past'));
    expect(getByText(/No past trips/i)).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] Tab navigation (Upcoming, Past, Disrupted)
- [ ] Trip card display with status badges
- [ ] Trip detail modal with full itinerary
- [ ] Document upload functionality
- [ ] Quick actions menu
- [ ] Itinerary timeline visualization
- [ ] Traveler information display
- [ ] Real-time alert integration
- [ ] Next action reminders
- [ ] Responsive design tested
- [ ] All persona adaptations applied
- [ ] Accessibility audit passing
- [ ] Loading & error states
- [ ] Unit & integration tests passing

---

**Estimated Build Time:** 3-4 days
**Dependencies:** SCR-007 complete
**Complexity:** High (multiple views, real-time updates)
