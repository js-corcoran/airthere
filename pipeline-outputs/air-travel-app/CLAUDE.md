# AirThere — Claude Code Project Brief
## Build-Ready Frontend Prototype | Design Mode | 2026-03-29

---

## What You're Building

**AirThere** is the world's first anticipatory travel operating system — a comprehensive mobile app and web platform that orchestrates the complete air travel journey across all seven phases, from inspiration through post-trip analytics.

This is a **Design Mode** implementation: a pixel-perfect, production-quality **frontend prototype** with realistic mock data, built with Next.js 14, Tailwind CSS v4, Shadcn UI, and TypeScript. Backend APIs come later (documented in Step 6 Dev Spec Mode B). Your mission: deliver all 20 screens with flawless interactions, accessibility compliance, and authentic travel data that demonstrates the complete user experience.

**The North Star:** "AirThere is the invisible intelligence that removes friction, anxiety, and cognitive load from the entire air travel journey — serving premium travelers with white-glove autonomy, business travelers with speed and control, and families with honest transparency and unified coordination."

---

## Quick Start (5 Minutes)

1. **Read these files in order** (30 minutes total):
   - `CLAUDE.md` (this file)
   - `07-shards/00-screen-inventory.md` (build order + dependencies)
   - `07.5-design-direction/design-direction.md` (visual system — AUTHORITATIVE)
   - `07.5-design-direction/design-tokens.json` (token reference values)

2. **Initialize project** (from Shard 01 instructions):
   ```bash
   cd ~/airapp
   npx create-next-app@latest . --typescript --app --no-eslint --no-git
   # Install: tailwind, shadcn-ui, react-hook-form, zod, date-fns
   npm install react-hook-form zod date-fns lucide-react
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Start with Shard 01:**
   - Read `07-shards/01-onboarding-shard.md`
   - This shard includes full tech stack setup, folder structure, and global layouts
   - Build this first (2-3 days)

4. **Continue sequentially** per `00-screen-inventory.md` build order

---

## Tech Stack (Locked)

| Layer | Technology | Version | Purpose | Config |
|-------|-----------|---------|---------|--------|
| **Framework** | Next.js | 14 (App Router) | Server + Client components, SSR | `next.config.js` |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS, design tokens | `tailwind.config.ts` + `07.5-design-direction/tailwind-theme.css` |
| **Components** | Shadcn UI | latest | Accessible component library | Installed locally, themed with `07.5-design-direction/shadcn-theme.css` |
| **Language** | TypeScript | latest | Type safety, strict mode | `tsconfig.json` in strict mode |
| **Forms** | React Hook Form | latest | Form state, validation | Integrates with Zod |
| **Validation** | Zod | latest | Schema validation | Paired with React Hook Form |
| **Dates** | date-fns | latest | Date manipulation, formatting | Travel-specific logic (times, zones) |
| **Icons** | Lucide React | latest | 300+ icons, travel-themed | Used throughout UI |
| **Data Layer** | Mock Services | Custom | Swappable interfaces for mock data | `lib/services/` + `lib/mock-data/` |
| **Testing** | Vitest + RTL | latest | Unit + component tests | `npm run test` |
| **A11y Testing** | axe-core | latest | Accessibility audits | `npm run test:a11y` |
| **Deployment** | Vercel | — | Optimized for Next.js | `vercel.json` config included |

---

## All Documentation

**Read in this order for maximum context:**

| Step | Document | Path | Purpose | Read? |
|------|----------|------|---------|-------|
| 0 | Project Brief | `00-project-brief.md` | Vision, scope, constraints, success metrics | ✅ Context |
| 1 | Research Report | `01-research-report.md` | UX/CX research synthesis, problem validation | ✅ Context |
| 2 | Qualitative Insights | `02-qualitative-insights.md` | Thematic analysis, user needs, pain points | ✅ Context |
| 3 | Experience Strategy | `03-experience-strategy.md` | Personas, principles, journey maps, strategic objectives | ✅ Read |
| 4 | Product Requirements | `04-prd.md` | Feature list (F-001 to F-041), user stories, acceptance criteria | ✅ Read |
| 5 | UX Specification | `05-ux-spec.md` | Component specs, wireframes, interactions, global patterns | ✅ Reference |
| 6 | Developer Spec | `06-dev-spec.md` | Architecture, type system, API schema, build patterns | ⚠️ Reference as needed |
| 7 | Screen Inventory | `07-shards/00-screen-inventory.md` | **BUILD ORDER, DEPENDENCIES** | ✅ **READ IMMEDIATELY** |
| 7 | Screen Shards | `07-shards/NN-name-shard.md` (20 files) | Per-screen build packages with all code | ✅ **Use as you build** |
| 7.5 | Design Direction | `07.5-design-direction/design-direction.md` | **AUTHORITATIVE VISUAL SYSTEM** | ✅ **READ IMMEDIATELY** |
| 7.5 | Design Tokens | `07.5-design-direction/design-tokens.json` | Color values, spacing, typography scales | ✅ **Reference constantly** |
| 7.5 | Tailwind Theme | `07.5-design-direction/tailwind-theme.css` | Tailwind v4 config with design tokens | ✅ **Import into project** |
| 7.5 | Shadcn Theme | `07.5-design-direction/shadcn-theme.css` | Shadcn UI component overrides | ✅ **Import into project** |
| 8 | Gap Analysis | `08-gap-analysis.md` | Cross-document consistency audit (FYI) | ℹ️ Reference |
| 8 | Handoff Summary | `08-handoff-summary.md` | Build instructions, decisions, timeline | ✅ Reference |

**Key Handoff Documents:**
- `07.5-design-direction/design-direction.md` — Read in full before building ANY component
- `07-shards/00-screen-inventory.md` — Keep open while building (build order + dependencies)
- `07.5-design-direction/design-tokens.json` — Reference constantly for color/spacing/type values

---

## The Five Experience Principles (Your North Star)

Every component, every interaction, every decision must serve these five principles:

### 1. Anticipatory Calm
The best technology is felt, never seen. Proactive, predictive interactions that remove decisions from the traveler's cognitive load.
- **In Code:** Animations purposeful (never decorative), transitions smooth, form layouts intuitive, error messages rare and helpful.
- **In Design:** Abundant white space, zero visual clutter, actions obvious, every pixel serves purpose.

### 2. Radical Transparency
Every cost, every delay, every option visible. No drip pricing, no hidden fees, no algorithmic opacity.
- **In Code:** Show actual prices (no "+fees"), display all costs upfront, explain delays clearly, never manipulate options.
- **In Design:** Information hierarchy reflects importance, disruption info is prominent but calm, costs are crystal clear.

### 3. Family Integrity
The family unit is sacred. Never separate, never surprise. Guaranteed seating, group rebooking, shared itineraries.
- **In Code:** Family groups stay together, seating locks in place, rebooking maintains group, itineraries are shared.
- **In Design:** Family coordination tools visible, seating maps show family units, disruptions show group impact.

### 4. Graduated Trust
AI earns autonomy through demonstrated competence. Copilot → Curator → Autonomous Agent.
- **In Code:** Start with user input, show recommendations (copilot), then autonomous decisions (curator), then full automation (agent).
- **In Design:** Always show what AI is about to do before it does it. Give users override capability. Build trust through transparency.

### 5. Journey Continuity
One identity, one context, zero repetition across every channel and touchpoint.
- **In Code:** User state persists across screens, preferences are remembered, no re-explaining of information, context carries through.
- **In Design:** Visual consistency across all screens, navigation is intuitive, history is preserved, user context is visible.

---

## The Three Personas

Design for these three humans. Every screen has persona adaptations.

### PERSONA-01: Alexandra — Premium Traveler
**Demographics:** 45-62, UHNW ($5M+ liquid), C-suite, 15-30+ trips/year, $8,000-$30,000+ per ticket.
**Psychology:** Status marker, identity component. Invisible seamlessness expected. Zero tolerance for mediocrity.
**Key Needs:** Biometric-first, invisible context, autonomy with override, premium visual language, privacy.
**Success:** Seamless biometric check-in, personalized lounge recognition, anticipatory service, instant notifications.
**Design Tone:** Elegant restraint, sophisticated blue, premium whitespace, status symbols, subtle confidence.

### PERSONA-02: Marcus — Business Traveler
**Demographics:** 35-55, 12-25+ trips/year, corporate spend $15k-$40k/year, tech/finance/consulting.
**Psychology:** Control-seeking but time-starved. Wants perfect info without research time. Policy-conscious.
**Key Needs:** Sub-90-second booking, unified visibility, auto disruption recovery, lounge consistency, expense auto-reconciliation.
**Success:** Fast booking, no surprises, policy compliance, health integration, zero manual work.
**Design Tone:** Efficient, time-saving indicators, clear metrics, policy badges, quick-tap shortcuts.

### PERSONA-03: The Chen Family — Leisure/Family Traveler
**Demographics:** Parents 35-50, 2-4 kids (ages 3-16), 3-5 trips/year, $4k-$8k per trip, price-conscious.
**Psychology:** Transparency and honesty. Coordination efficiency. Family bonding focus. Guided support needed.
**Key Needs:** Total cost transparency, family group booking, seating guarantee, packing intelligence, coordination tools, deal alerts.
**Success:** Clear total cost, family seating guaranteed, shared trip planning, weather-specific recommendations, memory timeline.
**Design Tone:** Warm, family-centric, helpful guidance, clear cost breakdowns, child-friendly content, coordination visibility.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/                      # Auth group (onboarding, login)
│   │   ├── onboarding/
│   │   │   └── page.tsx             # SCR-001
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── (main)/                      # Main app group (tab navigation)
│   │   ├── home/
│   │   │   └── page.tsx             # SCR-002: Home/Today
│   │   ├── discover/
│   │   │   └── page.tsx             # SCR-003: Discover
│   │   ├── search/
│   │   │   ├── page.tsx             # SCR-004: Flight Search
│   │   │   └── results/
│   │   │       └── page.tsx         # SCR-005: Search Results
│   │   ├── booking/
│   │   │   ├── detail/
│   │   │   │   └── page.tsx         # SCR-006: Flight Detail
│   │   │   └── checkout/
│   │   │       └── page.tsx         # SCR-007: Booking Checkout
│   │   ├── trips/
│   │   │   ├── page.tsx             # SCR-008: Trip Dashboard
│   │   │   ├── documents/
│   │   │   │   └── page.tsx         # SCR-009: Document Vault
│   │   │   └── [tripId]/
│   │   │       ├── airport/
│   │   │       │   └── page.tsx     # SCR-010: Airport Live
│   │   │       ├── gate/
│   │   │       │   └── page.tsx     # SCR-011: Gate & Boarding
│   │   │       ├── inflight/
│   │   │       │   └── page.tsx     # SCR-012: In-Flight
│   │   │       ├── recovery/
│   │   │       │   └── page.tsx     # SCR-013: IROPS Recovery
│   │   │       └── recap/
│   │   │           └── page.tsx     # SCR-014: Trip Recap
│   │   ├── profile/
│   │   │   └── page.tsx             # SCR-015: Profile & Loyalty
│   │   ├── settings/
│   │   │   └── page.tsx             # SCR-017: Settings
│   │   ├── family/
│   │   │   └── page.tsx             # SCR-018: Family Hub
│   │   ├── notifications/
│   │   │   └── page.tsx             # SCR-019: Notifications
│   │   └── lounge/
│   │       └── page.tsx             # SCR-020: Lounge Finder
│   │
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
│
├── components/
│   ├── ui/                          # Shadcn UI (imported/themed)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── form.tsx
│   │   └── ... (all Shadcn components)
│   │
│   ├── layout/                      # Layout components
│   │   ├── BottomTabBar.tsx         # Persistent 5-tab navigation
│   │   ├── Header.tsx               # Top header with back/settings
│   │   ├── PageContainer.tsx        # Safe area, padding wrapper
│   │   └── AppLayout.tsx            # Main app wrapper
│   │
│   ├── navigation/                  # Navigation-specific
│   │   ├── TabBar.tsx
│   │   └── Breadcrumb.tsx
│   │
│   ├── cards/                       # Feature-specific cards
│   │   ├── TripCard.tsx             # Upcoming/past trips
│   │   ├── FlightCard.tsx           # Flight options
│   │   ├── DestinationCard.tsx      # Inspiration feeds
│   │   ├── AlertCard.tsx            # Disruption alerts
│   │   └── ... (feature cards)
│   │
│   ├── search/                      # Search flow components
│   │   ├── SearchForm.tsx           # Multi-field search
│   │   ├── ResultsList.tsx          # Results with filters
│   │   ├── SeatMap.tsx              # Interactive seat selection
│   │   └── FareExplorer.tsx         # Flexible dates
│   │
│   ├── booking/                     # Booking flow components
│   │   ├── PassengerForm.tsx        # Passenger details
│   │   ├── PaymentForm.tsx          # Payment info
│   │   ├── ReviewOrder.tsx          # Booking review
│   │   └── ConfirmationScreen.tsx   # Post-booking
│   │
│   ├── trip/                        # Trip management
│   │   ├── TripTimeline.tsx         # Journey timeline
│   │   ├── UpcomingTrips.tsx        # Dashboard hub
│   │   └── TripActions.tsx          # Quick actions
│   │
│   ├── airport/                     # Airport experience
│   │   ├── AirportLive.tsx          # Real-time status
│   │   ├── SecurityQueue.tsx        # Queue info
│   │   ├── GateInfo.tsx             # Gate details
│   │   └── LoungeFinder.tsx         # Lounge access
│   │
│   ├── ai/                          # AI/Copilot components
│   │   ├── AICopilot.tsx            # Copilot interface
│   │   ├── ChatMessage.tsx          # Message bubble
│   │   └── RecommendationCard.tsx   # AI suggestions
│   │
│   ├── family/                      # Family-specific
│   │   ├── FamilyHub.tsx            # Family coordination
│   │   ├── FamilySeatMap.tsx        # Group seating
│   │   └── FamilyItinerary.tsx      # Shared itinerary
│   │
│   ├── shared/                      # Reusable utilities
│   │   ├── StatusBadge.tsx          # Status indicators
│   │   ├── LoadingSkeleton.tsx      # Placeholder loading
│   │   ├── EmptyState.tsx           # Empty state UI
│   │   ├── ErrorBoundary.tsx        # Error handling
│   │   └── PriceDisplay.tsx         # Consistent price formatting
│   │
│   └── patterns/                    # Global interaction patterns
│       ├── BottomSheet.tsx
│       ├── Modal.tsx
│       ├── Tooltip.tsx
│       └── Gesture.tsx
│
├── lib/
│   ├── types/                       # TypeScript interfaces
│   │   ├── flight.ts                # Flight, Leg, Itinerary types
│   │   ├── user.ts                  # User, Persona, Preferences types
│   │   ├── trip.ts                  # Trip, Booking, Confirmation types
│   │   ├── airport.ts               # Airport, Gate, Lounge types
│   │   ├── disruption.ts            # Alert, Rebooking, IROPS types
│   │   └── loyalty.ts               # FrequentFlyer, Points, Tier types
│   │
│   ├── services/                    # Mock API service layer
│   │   ├── flights.ts               # FlightService interface + mock impl
│   │   ├── bookings.ts              # BookingService
│   │   ├── trips.ts                 # TripService
│   │   ├── users.ts                 # UserService
│   │   ├── airports.ts              # AirportService
│   │   ├── disruptions.ts           # DisruptionService
│   │   ├── loyalty.ts               # LoyaltyService
│   │   └── ai.ts                    # AICopilotService
│   │
│   ├── mock-data/                   # Realistic test data
│   │   ├── flights.ts               # 200+ flight records
│   │   ├── users.ts                 # Persona profiles + samples
│   │   ├── trips.ts                 # Upcoming, past, disrupted scenarios
│   │   ├── airports.ts              # 50+ major airports with gates/lounges
│   │   ├── disruptions.ts           # Weather, delay, cancellation scenarios
│   │   ├── loyalty.ts               # Frequent flyer program data
│   │   └── seed.ts                  # Data generation + seeding
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Auth state
│   │   ├── useTrips.ts              # Trip data
│   │   ├── useSearch.ts             # Search state + history
│   │   ├── useBooking.ts            # Booking flow state
│   │   └── usePersistence.ts        # localStorage + cache
│   │
│   ├── utils/                       # Utility functions
│   │   ├── format.ts                # Date, time, price formatting
│   │   ├── validation.ts            # Form validation rules
│   │   ├── calculation.ts           # Trip cost, duration calculations
│   │   ├── accessibility.ts         # ARIA utilities
│   │   └── storage.ts               # localStorage helpers
│   │
│   └── constants/                   # Constants
│       ├── routes.ts                # Route paths
│       ├── personas.ts              # Persona IDs, data
│       ├── features.ts              # Feature flags
│       └── colors.ts                # Token values (if not using tailwind)
│
├── styles/
│   ├── globals.css                  # Global styles, token imports
│   ├── variables.css                # CSS custom properties
│   └── design-system.css            # Design tokens as CSS vars (optional)
│
├── public/                          # Static assets
│   ├── images/                      # Travel imagery
│   ├── icons/                       # Custom icons (if any)
│   └── fonts/                       # Font files (if self-hosted)
│
└── __tests__/                       # Test files (mirror src/ structure)
    ├── components/
    ├── lib/
    └── e2e/
```

---

## Coding Conventions & Quality Standards

### TypeScript
- **Strict mode enabled** — No `any` types, all props fully typed
- **Interface over implementation** — Use interfaces for contracts
- **Discriminated unions** — For state management (e.g., `{ status: 'loading' } | { status: 'success'; data: T }`)
- **Example:**
  ```typescript
  interface FlightSearchProps {
    onSearch: (params: SearchParams) => Promise<void>;
    isLoading: boolean;
  }

  interface SearchParams {
    from: string;
    to: string;
    departDate: Date;
    returnDate?: Date;
    passengers: number;
  }
  ```

### Components
- **Server Components by default** — Client Components only when needed (interactivity, hooks)
- **Props fully typed** — Every component has explicit prop interface
- **Mobile-first responsive** — Use Tailwind `sm:`, `md:`, `lg:` breakpoints
- **Accessibility required** — Semantic HTML, ARIA labels, keyboard nav
- **States always handled** — Loading, error, empty states for every component
- **Example:**
  ```typescript
  interface FlightCardProps {
    flight: Flight;
    isSelected: boolean;
    onSelect: (flightId: string) => void;
  }

  export function FlightCard({
    flight,
    isSelected,
    onSelect,
  }: FlightCardProps) {
    return (
      <button
        onClick={() => onSelect(flight.id)}
        className={`card ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
        aria-pressed={isSelected}
      >
        {/* Content */}
      </button>
    );
  }
  ```

### Styling
- **Never use default Shadcn colors** — Apply AirThere theme from `design-tokens.json`
- **No placeholder grays (#ccc, gray-200)** — Use surface tokens (primary-50, primary-100, etc.)
- **OKLCH values are canonical** — Use `oklch(...)` in CSS, not hex approximations
- **Consistent border-radius** — From design tokens (usually 8px or 12px)
- **Dark mode for every component** — Test `dark:` variants
- **Example (correct):**
  ```tsx
  <button className="bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-300">
    Book Now
  </button>
  ```
- **Example (WRONG — do not use):**
  ```tsx
  <button className="bg-blue-600 text-white hover:bg-blue-700"> {/* Generic Tailwind color */}
    Book Now
  </button>
  ```

### Data & Mock Services
- **Service interface abstraction** — Every API has an interface; mock is swappable
- **Realistic data** — Use actual airline codes (AA, BA, SQ), airport codes (JFK, LHR, SIN), realistic prices
- **No Lorem Ipsum** — Use authentic travel content: real cities, real airlines, real routes
- **Example:**
  ```typescript
  interface FlightService {
    search(params: SearchParams): Promise<Flight[]>;
    getDetails(flightId: string): Promise<FlightDetails>;
  }

  class MockFlightService implements FlightService {
    async search(params: SearchParams): Promise<Flight[]> {
      // Return realistic mock data from lib/mock-data/flights.ts
      return getMockFlightsForRoute(params.from, params.to);
    }
  }
  ```

### Accessibility (WCAG 2.1 AA)
- **Semantic HTML** — `<button>`, `<input>`, `<label>`, not `<div onclick>`
- **ARIA labels** — Every complex component has `role`, `aria-label`, `aria-describedby`
- **Focus management** — Visible focus rings (never remove outline), logical tab order
- **Color contrast** — Minimum 4.5:1 for normal text, 3:1 for large text
- **Touch targets** — Minimum 44×44pt (12mm)
- **Keyboard navigation** — All interactions accessible via keyboard
- **Example:**
  ```tsx
  <button
    onClick={handleClick}
    className="focus:ring-2 focus:ring-primary-500 focus:outline-none"
    aria-label="Book this flight"
    aria-describedby="flight-price"
  >
    Book <span id="flight-price">$892</span>
  </button>
  ```

### Responsiveness
- **Mobile first** — Design for 320px, then enhance for larger screens
- **Test at breakpoints** — 320px, 768px (tablet), 1024px (desktop)
- **Touch-friendly** — 44pt targets, ample spacing
- **Flexible layouts** — Cards stack vertically on mobile, grid on desktop
- **Example:**
  ```tsx
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {flights.map(f => <FlightCard key={f.id} flight={f} />)}
  </div>
  ```

### Testing
```bash
npm run test              # Unit tests (Vitest)
npm run test:a11y        # Accessibility tests (axe-core)
npm run lint             # ESLint
npm run type-check       # TypeScript strict
```

Every component should have:
- Unit test (mocks, assertions, edge cases)
- Accessibility audit (axe-core)
- Responsive test (viewport sizes)

---

## Anti-Slop Directive

**Before you generate ANY code for a new screen, read `design-direction.md` AND `design-tokens.json` in full.**

"Slop" is derivative, generic UI that ignores the considered aesthetic identity. AirThere slop looks like:
- ❌ Default Shadcn colors (blue-600, gray-200) instead of AirThere tokens
- ❌ Placeholder grays (#ccc, #999) instead of the OKLCH surface palette
- ❌ Lorem Ipsum instead of real travel data
- ❌ Inconsistent border-radius (mix of 4px, 8px, 16px instead of unified system)
- ❌ Missing dark mode variants
- ❌ 40×40pt touch targets (too small; min 44pt)
- ❌ Copy that doesn't match AirThere's tone (should be calm, transparent, warm)
- ❌ Colors with 3:1 contrast instead of 4.5:1

**Quality gates before pushing code:**
1. ✅ All colors from `design-tokens.json`
2. ✅ All spacing from `design-tokens.json` (multiples of 4px)
3. ✅ All typography from design system (16px body, 20px heading, etc.)
4. ✅ Touch targets ≥44×44pt
5. ✅ Color contrast ≥4.5:1
6. ✅ Dark mode tested and working
7. ✅ ARIA labels present for complex components
8. ✅ Loading, error, empty states implemented
9. ✅ Authentic travel data (no Lorem Ipsum)
10. ✅ Copy matches tone (calm, transparent, warm, family-centric as appropriate)

---

## Key Constraints & Success Criteria

| Constraint | Target | Why |
|-----------|--------|-----|
| **WCAG 2.1 AA** | 100% compliance | Legal requirement + moral imperative |
| **Core Web Vitals** | LCP <2.5s, FID <100ms, CLS <0.1 | Performance baseline |
| **Mobile-first** | Works perfectly at 320px | Device-inclusive design |
| **Responsive** | Tested up to 1440px+ | Tablet + desktop support |
| **Offline support** | Critical travel info cached | Real-world reliability |
| **GDPR/CCPA** | Privacy-first data patterns | Legal compliance |
| **i18n-ready** | No hardcoded strings | Future internationalization |
| **NPS 60+** | Industry-leading | Year 1 success goal |
| **Booking <30% abandon** | Drop-off prevention | Revenue impact |
| **Family seating 98%** | Guaranteed placement | Core family promise |

---

## How to Start Right Now

### 1. Environment Setup (15 minutes)
```bash
cd ~/airapp
npx create-next-app@latest . --typescript --app
cd src
# You're now in the Next.js project
```

### 2. Install Dependencies (5 minutes)
```bash
npm install tailwindcss postcss autoprefixer
npm install -D @types/react @types/node
npm install shadcn-ui
npx shadcn-ui@latest init -d
npm install react-hook-form zod date-fns lucide-react
```

### 3. Configure Tailwind (from Shard 01)
Copy `07.5-design-direction/tailwind-theme.css` → `src/styles/tailwind-theme.css`
Update `tailwind.config.ts` to import the theme

### 4. Configure Shadcn (from Shard 01)
Copy `07.5-design-direction/shadcn-theme.css` → `src/styles/shadcn-theme.css`
Update component imports to use themed components

### 5. Read Shard 01 Instructions
Open `07-shards/01-onboarding-shard.md` — this file includes:
- Complete tech setup checklist
- File structure initialization
- Mock data service layer setup
- Global layout component code
- Bottom tab bar implementation
- Onboarding screen (SCR-001) full spec

### 6. Build Shard 01 (2-3 days)
Follow the 15 sections in 01-onboarding-shard.md:
1. Screen Overview
2. Route & File Location
3. Dependencies & Prerequisites
4. Component Hierarchy
5. Component Specifications (with code)
6. Layout & Wireframe
7. Interaction Patterns
8. State Management
9. Data Requirements & Mock Data
10. Persona Adaptations
11. Accessibility Requirements
12. Loading, Error & Empty States
13. Edge Cases & Error Handling
14. Testing Requirements
15. Build Checklist

### 7. Continue Sequentially
After Shard 01 is complete, move to Shard 02 per `00-screen-inventory.md` build order

---

## How Tests Work

```bash
# Unit tests (Vitest)
npm run test

# A11y tests (axe-core)
npm run test:a11y

# Full test (unit + a11y + lint + type-check)
npm run test:full

# Watch mode for development
npm run test:watch
```

**Every screen must include:**
- Unit tests for all components
- Accessibility audit (axe-core)
- Responsive snapshot tests (320px, 768px, 1024px)

---

## Launch Instructions

### For Claude Code (You Are Here)
```bash
cd ~/airapp
claude CLAUDE.md
# First prompt: "Read CLAUDE.md and 07-shards/00-screen-inventory.md, then start with Shard 01"
```

### For Cursor AI
1. Open folder: `~/airapp/pipeline-outputs/air-travel-app/`
2. `.cursorrules` file is pre-configured (same as CLAUDE.md)
3. Open `.cursorrules` in Cursor
4. Start with `07-shards/00-screen-inventory.md`

### For Production Deployment
1. Build: `npm run build`
2. Test: `npm run test` + `npm run test:a11y`
3. Deploy: `vercel deploy --prod`
4. Verify: Check Core Web Vitals on Vercel dashboard

---

## Team Collaboration

- **Designer:** Validate shards against `design-direction.md` as they're built. Create Figma mockups in parallel.
- **QA:** Test each shard for accessibility (axe-core), responsiveness (BrowserStack), functionality (test scenarios).
- **Product:** Prepare demo scripts, gather user feedback, track success metrics (NPS, booking abandonment, etc.).
- **Backend:** Start Mode B implementation (Supabase setup, GDS integration, payment processor integration) in parallel.

---

## What Success Looks Like

At the end of this build, you will have:
- ✅ 20 fully functional screens (SCR-001 through SCR-020)
- ✅ Complete booking flow (search → results → detail → checkout → confirmation)
- ✅ Trip management dashboard (upcoming, past, disrupted trips)
- ✅ Disruption recovery (IROPS with proactive alerts and rebooking)
- ✅ Accessible throughout (WCAG 2.1 AA)
- ✅ Mobile-optimized (responsive 320px to 1440px+)
- ✅ Realistic mock data (200+ flights, 50+ airports, actual airline codes)
- ✅ Persona-specific adaptations (three distinct UX paths for Alexandra, Marcus, Chen Family)
- ✅ Production-ready code (TypeScript strict, fully tested, documented)
- ✅ Demo-ready (NPS 60+ candidate, booking abandonment <30%)

The frontend prototype will be the foundation for everything: design validation, user testing, investor demos, backend integration, and eventually the production product.

---

**Last Updated:** 2026-03-29
**Next Milestone:** Shard 01 complete — target 2026-04-05
**Questions?** Reference `08-gap-analysis.md` (consistency audit) or `08-handoff-summary.md` (build decisions).

Good luck. AirThere is going to be beautiful.
