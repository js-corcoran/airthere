# Family Hub — Build Shard
## AirThere | Screen SCR-018 | Shard 18

### 1. Screen Overview

**Purpose:** Family group management, coordination, and shared trip planning. Enables PERSONA-03 (Chen Family) to manage multiple family members' preferences, coordinate seating, track shared checklist items, coordinate special needs, and maintain family integrity through disruptions.

**Role in Journey:** Activated when family group is identified (2+ travelers). Serves as coordination hub for family trip planning, shared document management, special needs documentation, and communication across family members. Prevents family separation in booking and disruptions.

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/family/page.tsx
(main)/family/[tripId]/page.tsx (family-specific trip view)
```

---

### 3. Component Hierarchy

```
FamilyHub (page container)
├── FamilyHeader
│   ├── Family Name ("The Chen Family")
│   ├── Family Members Count ("4 members")
│   ├── [Manage Members] [Invite] [Settings]
│
├── FamilyMembersList
│   ├── Member Cards (one per family member)
│   │   ├── Avatar & Name
│   │   ├── Age (if minor)
│   │   ├── Dietary Preferences
│   │   ├── Accessibility Needs
│   │   ├── Travel Documents Status
│   │   └── [Edit] [View Profile]
│
├── SharedChecklist
│   ├── "Pre-Trip Checklist"
│   ├── Checklist Items
│   │   ├── [✓] Passports submitted
│   │   ├── [✓] Vaccinations current
│   │   ├── [□] Travel insurance purchased
│   │   ├── [□] Hotel confirmations sent
│   │   ├── [□] Packing started
│   │   └── [□] Airport transportation arranged
│   ├── Assigned To (if multi-person task)
│   │   └── "Amy" (person responsible)
│   └── [Edit Checklist] [Print Checklist]
│
├── SpecialNeedsDocumentation
│   ├── Child Medical Info (max (7 year old)
│   │   ├── Allergies: [Peanut allergy] ⚠️
│   │   ├── Medications: [Inhaler for asthma]
│   │   ├── Doctor Contact: [Dr. Smith, (555) 123-4567]
│   │   └── Insurance Info: [Blue Shield Member ID]
│   ├── Accessibility Accommodations
│   │   ├── Wheelchair spacing needed
│   │   ├── Service dog documentation
│   │   └── Companion needed
│
├── SharedDocuments
│   ├── "Family Travel Binder"
│   ├── Documents
│   │   ├── Passports: [John] [Amy] [Zoe] [Max]
│   │   ├── Visas: [UK Visitor Visa - All]
│   │   ├── Travel Insurance: [Policy PDF]
│   │   ├── Hotel Confirmations: [3 nights London]
│   │   ├── Activity Bookings: [Tower of London]
│   │   └── Restaurant Reservations: [3 reservations]
│   └── [Add Document]
│
├── SeatingVisualization
│   ├── "Confirmed Family Seating"
│   ├── Cabin Layout Diagram
│   │   ├── F4: John (Adult)
│   │   ├── F5: Amy (Adult)
│   │   ├── F6: Zoe (Child, 10y)
│   │   ├── F7: Max (Child, 7y)
│   │   └── "All together ✓ Confirmed"
│   ├── Connection Flight Seating
│   │   ├── "Return flight: Seats 12A-D confirmed"
│   │   └── "Family together ✓"
│
├── EntertainmentCoordination
│   ├── "In-Flight Entertainment Planning"
│   ├── Recommended Content by Age
│   │   ├── John: [Business documentaries]
│   │   ├── Amy: [Travel shows]
│   │   ├── Zoe (10y): [Age-appropriate films, series]
│   │   ├── Max (7y): [Animated films, cartoons]
│   ├── Shared Activities
│   │   ├── [Multiplayer games]
│   │   ├── [Movies to watch together]
│   │   └── "Watch together" time suggestions
│
├── DayOfTravelCoordination
│   ├── "Day of Travel: March 30"
│   ├── Timeline
│   │   ├── 8:00 AM - Departure from home
│   │   ├── 8:45 AM - Arrive at airport
│   │   ├── 9:00 AM - Check-in at kiosk
│   │   ├── 10:00 AM - Security checkpoint
│   │   ├── 10:45 AM - Lounge access
│   │   ├── 11:00 AM - Boarding
│   │   └── 11:30 AM - Departure
│   ├── Assigned Responsibilities
│   │   ├── John: "Transport to airport"
│   │   ├── Amy: "Manage carry-on bags, medications"
│   │   ├── Zoe: "Entertainment bag, headphones"
│   │   ├── Max: "Comfort items, blanket"
│   │   └── "All: On-time at each checkpoint"
│
└── CommunicationTools
    ├── "Family Trip Chat"
    ├── Message History (last 5 messages)
    │   └── "Amy: Remember Max's inhaler in carry-on"
    │   └── "John: Got it. Packed in side pocket."
    ├── [Message Family] [Share Trip Link]
    ├── Notification Settings
    │   ├── [☐] All notifications
    │   ├── [☑] Urgent updates only (disruptions, timing changes)
    │   ├── [☑] Daily trip summary
    └── [Send to Family] [Print Itinerary]
```

---

### 4. Component Specifications

#### 4.1 FamilyMemberCard

**TypeScript Interface:**
```typescript
interface FamilyMember {
  id: string;
  name: string;
  age?: number;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'extended';
  avatar?: string;
  dietary?: string;
  accessibility?: string[];
  medicalInfo?: {
    allergies: string[];
    medications: string[];
    doctorContact?: string;
  };
  documents?: {
    passportStatus: 'valid' | 'expiring' | 'expired' | 'missing';
    visaStatus: 'approved' | 'pending' | 'required' | 'not_needed';
    insuranceStatus: 'active' | 'inactive';
  };
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  tripId: string;
  onEdit: (memberId: string) => void;
}
```

**Shadcn UI Base:** Card, Avatar, Badge, Button

**Tailwind Classes:**
```
- Container: bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700
- Header: flex items-center gap-3
- Avatar: w-12 h-12 rounded-full
- Details: ml-3 flex-1
- Name: font-bold text-lg
- Age Badge: text-xs bg-white dark:bg-neutral-700 px-2 py-1 rounded
- Info Rows: text-xs text-neutral-600 dark:text-neutral-400 mt-2
- Status Icons: flex gap-1 mt-2
- Document Badge:
  - Valid: bg-green-100 text-green-700
  - Expiring: bg-amber-100 text-amber-700
  - Missing: bg-red-100 text-red-700
```

---

### 5. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ Family Hub                   │
│ The Chen Family | 4 members  │
│ [Manage] [Invite] [Settings] │
├──────────────────────────────┤
│ FAMILY MEMBERS               │
│                              │
│ [👨] John (45)               │
│ Dietary: None                │
│ Passport: ✓ Valid (2034)    │
│ [Edit]                       │
│                              │
│ [👩] Amy (42)                │
│ Dietary: Vegetarian          │
│ Passport: ✓ Valid (2032)    │
│ [Edit]                       │
│                              │
│ [👧] Zoe (10)                │
│ Dietary: No shellfish ⚠️    │
│ Passport: ✓ Valid (2029)    │
│ [Edit]                       │
│                              │
│ [👦] Max (7)                 │
│ Dietary: None                │
│ Medical: Asthma (inhaler) ⚠️ │
│ Passport: ✓ Valid (2030)    │
│ [Edit]                       │
│                              │
├──────────────────────────────┤
│ PRE-TRIP CHECKLIST          │
│ Trip: London, Mar 30-Apr 6   │
│                              │
│ [✓] Passports submitted      │
│ [✓] Vaccinations current     │
│ [✓] Travel insurance bought  │
│ [□] Packing started          │
│ [□] Airport transport ready  │
│ [□] Hotel confirmations sent │
│ [□] Luggage tags attached    │
│                              │
│ Assigned to: Amy (3), John(2)│
│ [Edit Checklist] [Print]     │
│                              │
├──────────────────────────────┤
│ SPECIAL NEEDS                │
│                              │
│ Max: Asthma Medication       │
│ ⚠️ Inhaler in carry-on       │
│ Doctor: Dr. Smith            │
│ (555) 123-4567               │
│ Insurance: Blue Shield       │
│ ID: BSM123456789             │
│ [Edit]                       │
│                              │
│ Zoe: Shellfish Allergy       │
│ ⚠️ Avoid shrimp, crab        │
│ Severity: Moderate (EpiPen)  │
│ [Edit] [View Details]        │
│                              │
├──────────────────────────────┤
│ FAMILY SEATING (Confirmed)  │
│                              │
│ London Flight - UA 901       │
│ Seats: F4, F5, F6, F7        │
│ [John] [Amy]                 │
│ [Zoe]  [Max]                 │
│ ✓ All together               │
│                              │
│ Return Flight - UA 234       │
│ Seats: 12A, 12B, 12C, 12D    │
│ ✓ All together confirmed     │
│                              │
├──────────────────────────────┤
│ ENTERTAINMENT PLANNING      │
│                              │
│ In-Flight Options:           │
│ John: Business documentaries │
│ Amy: Travel shows            │
│ Zoe (10y): PG films          │
│ Max (7y): Cartoons           │
│ [Movie night together]       │
│ [Multiplayer games]          │
│ [Recommended for all]        │
│                              │
├──────────────────────────────┤
│ DAY OF TRAVEL: MAR 30       │
│                              │
│ 8:00 AM - Leave home         │
│ John responsible             │
│ 8:45 AM - Airport arrival    │
│ Everyone on time?            │
│ 9:00 AM - Check-in           │
│ Amy managing luggage         │
│ 10:00 AM - Security          │
│ John + kids first            │
│ 10:45 AM - Lounge            │
│ [View lounge map]            │
│ 11:00 AM - Boarding          │
│ All together → SCR-011       │
│                              │
├──────────────────────────────┤
│ FAMILY COMMUNICATION        │
│                              │
│ Recent Messages:             │
│ Amy: "Max's inhaler packed?" │
│ John: "Yes, carry-on side"   │
│ Zoe: "When boarding?"        │
│ Amy: "11:00 AM, Group 3"     │
│                              │
│ [Message Family]             │
│ [Share Trip Link]            │
│ [Print Itinerary]            │
│                              │
│ Notifications:               │
│ [☑] Urgent updates only      │
│ [☑] Daily summary            │
│ [☐] All notifications        │
│                              │
└──────────────────────────────┘
```

---

### 6. Interaction Patterns

- **Tap member card:** View/edit member details
- **Checkbox on checklist:** Mark item complete
- **Assign task:** Long-press to assign to family member
- **View documents:** Tap to expand or download
- **Message family:** Bottom sheet with message composing
- **Print itinerary:** Generate family-friendly PDF

---

### 7. State Management

**Local Component State:**
```typescript
const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialMembers);
const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
const [showChat, setShowChat] = useState(false);
```

**Global State:**
- FamilyContext (family members, relationships)
- TripContext (shared trip data)

---

### 8. Data Requirements & Mock Data

**Mock Family Data:**
```typescript
export const mockFamilyData = {
  familyName: 'The Chen Family',
  members: [
    {
      id: 'MEM001',
      name: 'John Chen',
      age: 45,
      relationship: 'self',
      dietary: null,
      documents: { passportStatus: 'valid', visaStatus: 'approved' }
    },
    // ... 3 more members
  ],
  checklist: [
    { id: 'CHK001', task: 'Passports submitted', completed: true, assignedTo: 'Amy' },
    // ... more items
  ],
};
```

---

### 9. Persona Adaptations

Only applicable to PERSONA-03 (Chen Family). Emphasizes family coordination, special needs, and family seating guarantee.

---

### 10. Accessibility Requirements

- Family member medical info accessible via screen reader
- Checklist keyboard navigable
- Medical alert badges high-contrast
- Document links properly labeled
- Seating diagram alt-text describing family grouping

---

### 11. Build Checklist

- [ ] Route created: `(main)/family/page.tsx`
- [ ] FamilyMemberCard component with medical/document info
- [ ] SharedChecklist component with task management
- [ ] SpecialNeedsDocumentation component
- [ ] SeatingVisualization component
- [ ] EntertainmentCoordination component
- [ ] DayOfTravelTimeline component
- [ ] FamilyCommunicationTools (messaging, notifications)
- [ ] Shared document management
- [ ] Mock family data connected
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-018 (Family Hub) embodies Principle 3 (Family Integrity) by providing comprehensive family group management. By centralizing family member profiles, shared checklist coordination, special needs documentation, seating visualization, and communication tools, AirThere reduces the invisible labor burden Amy carries during trip planning. The family hub ensures all family members are considered in every booking and disruption decision, with family seating guaranteed and protected throughout the journey. Accessible to PERSONA-03 when family groups are identified.

