# AirThere — Screen Inventory & Build Order
## Pipeline Step 7 of 10 | 2026-03-29

---

## Executive Summary

This document defines the complete screen inventory for AirThere, the world's first anticipatory travel operating system. The inventory includes 20 screens across seven journey phases: Inspiration & Discovery, Search & Booking, Pre-Trip Management, Airport Experience, In-Flight Experience, Disruption Recovery, and Post-Trip Analytics.

This document also establishes the **recommended build order** based on dependency analysis, complexity assessment, and persona-specific requirements. The build order prioritizes core journey flows (Onboarding → Home → Search → Results → Booking → Trip Management) while flagging advanced features (AI Copilot, Family Hub) for later iterations.

All screens are designed for **Design Mode** (frontend prototype with mock data), following the Next.js 14 + Tailwind CSS v4 + Shadcn UI technical architecture defined in Step 6.

---

## Build Order (Recommended Sequence)

| Order | Screen ID | Screen Name | Shard File | Key Dependencies | Complexity | Priority |
|-------|-----------|------------|-----------|-----------------|-----------|----------|
| 1 | SCR-001 | Onboarding / Welcome | 01-onboarding-shard.md | None (entry point) | Medium | P0 |
| 2 | SCR-002 | Home / Today View | 02-home-today-shard.md | SCR-001, mock data | High | P0 |
| 3 | SCR-004 | Search (Flight Search) | 04-flight-search-shard.md | SCR-002 | High | P0 |
| 4 | SCR-005 | Search Results / Fare Explorer | 05-search-results-shard.md | SCR-004 | High | P0 |
| 5 | SCR-006 | Flight Detail / Seat Selection | 06-flight-detail-shard.md | SCR-005 | High | P0 |
| 6 | SCR-007 | Booking Flow / Checkout | 07-booking-checkout-shard.md | SCR-006 | High | P0 |
| 7 | SCR-008 | Trip Dashboard | 08-trip-dashboard-shard.md | SCR-007 | High | P0 |
| 8 | SCR-003 | Discover / Inspiration Feed | 03-discover-inspiration-shard.md | SCR-002 | Medium | P1 |
| 9 | SCR-010 | Airport Live | 10-airport-live-shard.md | SCR-008 | High | P0 |
| 10 | SCR-011 | Gate & Boarding | 11-gate-boarding-shard.md | SCR-010 | Medium | P0 |
| 11 | SCR-013 | IROPS / Disruption Recovery | 13-irops-recovery-shard.md | SCR-008 | High | P0 |
| 12 | SCR-016 | AI Copilot | 16-ai-copilot-shard.md | SCR-002 | High | P1 |
| 13 | SCR-015 | Profile & Loyalty | 15-profile-loyalty-shard.md | SCR-001 | Medium | P1 |
| 14 | SCR-018 | Family Hub | 18-family-hub-shard.md | SCR-015 | Medium | P1 |
| 15 | SCR-009 | Document Vault | 09-document-vault-shard.md | SCR-008 | Low | P1 |
| 16 | SCR-012 | In-Flight Experience | 12-inflight-experience-shard.md | SCR-011 | Medium | P1 |
| 17 | SCR-014 | Trip Recap / Post-Trip | 14-trip-recap-shard.md | SCR-008 | Medium | P2 |
| 18 | SCR-019 | Notifications Center | 19-notifications-shard.md | SCR-002 | Low | P1 |
| 19 | SCR-020 | Lounge Finder | 20-lounge-finder-shard.md | SCR-010 | Low | P2 |
| 20 | SCR-017 | Settings & Preferences | 17-settings-shard.md | SCR-015 | Low | P2 |

---

## Build Order Rationale

### Phase 1: Foundation (Shards 01-07)
**Goal:** Establish core onboarding, home screen, and complete booking flow.
- **Why this sequence:** Users must onboard (SCR-001) before accessing home. Home requires trip data. Search depends on home navigation. Results depend on search. Booking flow depends on results selection. Trip dashboard is the hub for all post-booking functionality.
- **Timeline:** 2-3 weeks (2 developers)
- **Delivers:** End-to-end booking experience with realistic mock data

### Phase 2: Core Experience (Shards 08-10)
**Goal:** Add trip management and airport experience.
- **Why this sequence:** Trip dashboard (SCR-008) aggregates post-booking data. Airport live (SCR-010) and boarding (SCR-011) extend trip management to day-of-travel.
- **Timeline:** 1-2 weeks
- **Delivers:** Complete journey coverage through boarding

### Phase 3: Resilience & Recovery (Shard 13)
**Goal:** Add disruption handling and IROPS recovery.
- **Why this sequence:** IROPS (SCR-013) requires working trip dashboard and booking architecture.
- **Timeline:** 1-2 weeks
- **Delivers:** Proactive disruption alerts and autonomous rebooking

### Phase 4: Intelligence & Personalization (Shards 03, 16, 15)
**Goal:** Add AI copilot, inspiration feeds, and profile/loyalty.
- **Why this sequence:** Discovery (SCR-003) supports inspiration. Copilot (SCR-016) integrates across screens. Profile (SCR-015) is foundational for loyalty and preferences.
- **Timeline:** 2-3 weeks
- **Delivers:** Personalization, AI-powered assistance, loyalty integration

### Phase 5: Family & Advanced Features (Shards 14, 09, 12, 18-20)
**Goal:** Add family-specific features, post-trip analytics, and advanced discovery.
- **Why this sequence:** These are higher-complexity, lower-priority features that depend on core screens.
- **Timeline:** 2-3 weeks
- **Delivers:** Family coordination, document management, in-flight experience, settings

---

## Tech Stack Setup (Required in First Shard: 01-onboarding-shard.md)

The first shard (SCR-001) must include a "Section 0: Tech Stack Setup" covering:

### Project Initialization
- Next.js 14 project structure with App Router
- TypeScript strict mode configuration
- Tailwind CSS v4 with custom design tokens
- Shadcn UI component library setup
- ESLint and Prettier configuration

### Global Layout & Navigation
- Root layout component with metadata
- Bottom tab navigation bar (persistent across screens)
- Auth layout (for onboarding/login flows)
- Main app layout (with tab bar + header)
- Route protection middleware

### Mock Data Service Layer
- Mock service interfaces (swappable with real APIs)
- Mock data generators for all entities:
  - 200+ flight records with realistic airlines, routes, pricing
  - User profiles for three personas + sample users
  - 50+ airports with gates, lounges, security data
  - Trip scenarios (upcoming, past, disrupted)
  - Disruption data (weather, delays, cancellations)
  - Loyalty program data (frequent flyer points, balances)
- Data seed strategy for consistent testing

### Performance & Quality Baseline
- Core Web Vitals targets (LCP <2.5s, FID <100ms, CLS <0.1)
- Responsive design breakpoints (320px, 768px, 1024px, 1280px)
- Dark mode support (optional for Design Mode)
- Accessibility baseline (WCAG 2.1 AA)
- Error boundary setup
- Logging/analytics skeleton

---

## File Structure

```
07-shards/
├── 00-screen-inventory.md                    # This file
├── 01-onboarding-shard.md                   # SCR-001: Onboarding + Tech Setup
├── 02-home-today-shard.md                   # SCR-002: Home / Today View
├── 03-discover-inspiration-shard.md         # SCR-003: Discover / Inspiration Feed
├── 04-flight-search-shard.md                # SCR-004: Flight Search
├── 05-search-results-shard.md               # SCR-005: Search Results / Fare Explorer
├── 06-flight-detail-shard.md                # SCR-006: Flight Detail / Seat Selection
├── 07-booking-checkout-shard.md             # SCR-007: Booking Flow / Checkout
├── 08-trip-dashboard-shard.md               # SCR-008: Trip Dashboard
├── 09-document-vault-shard.md               # SCR-009: Document Vault
├── 10-airport-live-shard.md                 # SCR-010: Airport Live
├── 11-gate-boarding-shard.md                # SCR-011: Gate & Boarding
├── 12-inflight-experience-shard.md          # SCR-012: In-Flight Experience
├── 13-irops-recovery-shard.md               # SCR-013: IROPS / Disruption Recovery
├── 14-trip-recap-shard.md                   # SCR-014: Trip Recap / Post-Trip
├── 15-profile-loyalty-shard.md              # SCR-015: Profile & Loyalty
├── 16-ai-copilot-shard.md                   # SCR-016: AI Copilot
├── 17-settings-shard.md                     # SCR-017: Settings & Preferences
├── 18-family-hub-shard.md                   # SCR-018: Family Hub
├── 19-notifications-shard.md                # SCR-019: Notifications Center
└── 20-lounge-finder-shard.md                # SCR-020: Lounge Finder
```

---

## Shard Structure (Each File Contains)

Each shard file follows this 15-section structure:

```markdown
# [Screen Name] — Build Shard
## AirThere | Screen [SCR-XXX] | Shard [NN]

### 1. Screen Overview
- Purpose, role in journey, user entry/exit flows

### 2. Route & File Location
- Next.js route path, file path, layout group

### 3. Dependencies & Prerequisites
- Which shards must be built first, shared components, mock data

### 4. Component Hierarchy
- Full component tree with nesting, parent/child relationships

### 5. Component Specifications
- For each component: name, props interface, state, Shadcn UI base, Tailwind classes

### 6. Layout & Wireframe
- ASCII wireframe, responsive breakpoints, spacing/grid

### 7. Interaction Patterns
- Click/tap handlers, swipe gestures, scroll behavior, animations

### 8. State Management
- Local component state, global state slices, URL state, derived state

### 9. Data Requirements & Mock Data
- Data shape, mock examples, TypeScript interfaces, API swap strategy

### 10. Persona Adaptations
- PERSONA-01 (Alexandra), PERSONA-02 (Marcus), PERSONA-03 (Chen Family)

### 11. Accessibility Requirements
- ARIA roles, focus management, keyboard navigation, screen reader flow, touch targets

### 12. Loading, Error & Empty States
- Skeleton screens, error state design, empty state, offline state

### 13. Edge Cases & Error Handling
- Missing data, network failures, validation errors, boundary conditions

### 14. Testing Requirements
- Component tests, assertions, mock data, accessibility tests

### 15. Build Checklist
- Route created, layout integrated, components built, mock data connected, etc.
```

---

## Persona-First Design Considerations

### PERSONA-01: Premium Traveler ("Alexandra")
- **Design Principle:** Invisible seamlessness, white-glove service
- **Screens emphasizing:** SCR-001 (biometric setup), SCR-010 (lounge access), SCR-016 (copilot concierge)
- **Differentiation:** Premium visual language, status symbols, autonomy with override

### PERSONA-02: Business Traveler ("Marcus")
- **Design Principle:** Speed, control, policy compliance
- **Screens emphasizing:** SCR-004 (sub-90-second search), SCR-006 (quick booking), SCR-013 (disruption recovery)
- **Differentiation:** Efficiency metrics, policy indicators, travel time optimization

### PERSONA-03: Leisure/Family Traveler ("Chen Family")
- **Design Principle:** Transparency, family coordination, guided support
- **Screens emphasizing:** SCR-002 (family status), SCR-006 (family seating guarantee), SCR-018 (family hub)
- **Differentiation:** Total cost visibility, family-group tools, child-specific content

---

## Journey Phase Mapping

### Phase 1: Inspiration & Discovery
- SCR-001: Onboarding (entry point, persona detection)
- SCR-002: Home / Today View (inspiration feeds)
- SCR-003: Discover / Inspiration Feed (AI-powered destination cards, deals)

### Phase 2: Search & Booking
- SCR-004: Flight Search (multi-modal search interface)
- SCR-005: Search Results (fare explorer, flexible dates, filters)
- SCR-006: Flight Detail / Seat Selection (seat map, family grouping)
- SCR-007: Booking Flow / Checkout (payment, trip protection, confirmation)

### Phase 3: Pre-Trip Management
- SCR-008: Trip Dashboard (hub for all trips, next actions)
- SCR-009: Document Vault (secure document storage)

### Phase 4: Airport Experience
- SCR-010: Airport Live (real-time airport status, security, gates)
- SCR-011: Gate & Boarding (boarding progress, digital pass)

### Phase 5: In-Flight Experience
- SCR-012: In-Flight (cabin dashboard, entertainment, meals, productivity)

### Phase 6: Disruption Recovery
- SCR-013: IROPS / Disruption Recovery (proactive alerts, rebooking)

### Phase 7: Post-Trip & Loyalty
- SCR-014: Trip Recap (memory capture, expense reconciliation)
- SCR-015: Profile & Loyalty (profile management, frequent flyer data)

### Cross-Cutting Features
- SCR-016: AI Copilot (conversational assistance across all screens)
- SCR-017: Settings & Preferences (user preferences, feature toggles)
- SCR-018: Family Hub (family-specific coordination tools)
- SCR-019: Notifications Center (notification history and management)
- SCR-020: Lounge Finder (lounge discovery and access)

---

## Design System Consistency

All screens follow a unified design system with:

### Color System (Tailwind CSS v4)
- **Primary:** oklch(57.5% 0.194 262) — Deep blue
- **Secondary:** oklch(64% 0.158 50) — Warm amber
- **Success:** oklch(68% 0.150 142) — Vibrant green
- **Warning:** oklch(67% 0.165 60) — Warm amber/orange
- **Error:** oklch(62% 0.228 25) — Red
- **Neutral:** oklch grayscale from 95% (almost white) to 20% (almost black)

### Typography Scale
- **Display:** 48px / 56px (h1), 32px / 40px (h2), 24px / 32px (h3)
- **Heading:** 20px / 28px (h4), 18px / 26px (h5), 16px / 24px (h6)
- **Body:** 16px / 24px (default), 14px / 20px (secondary), 12px / 16px (caption)
- **Font Family:** System stack (Inter, Segoe, Helvetica for fallback)

### Spacing
- **Unit:** 4px base grid (multiples of 4: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64)
- **Padding:** 16px default container padding (mobile), 24px (tablet), 32px (desktop)
- **Gap:** 8px (compact), 12px (default), 16px (comfortable)

### Responsive Breakpoints
- **Mobile:** 320px-767px (single column, full-width cards)
- **Tablet:** 768px-1023px (2-column layouts, larger touch targets)
- **Desktop:** 1024px+ (3+ column layouts, desktop-optimized spacing)

### Component Library
- **Buttons:** Shadcn Button component (variants: default, secondary, ghost, destructive)
- **Cards:** Shadcn Card component (flexible, shadow variants)
- **Forms:** Shadcn Form + React Hook Form (validation, error messaging)
- **Modals:** Shadcn Dialog (centered, prevents outside interaction)
- **Sheets:** Shadcn Sheet (bottom-sheet for mobile, side-sheet for desktop)
- **Loading:** Custom skeleton screens (animated pulse, layout-aware)

---

## Quality Bar

### Code Quality
- TypeScript strict mode throughout
- 100% props typed with interfaces
- Comprehensive error handling
- Unit test coverage >80% (in later phases)

### Accessibility (WCAG 2.1 AA)
- Semantic HTML (no div soup)
- ARIA labels for complex components
- Focus management in modals/sheets
- Color contrast >4.5:1 for normal text
- Touch targets >44×44pt minimum
- Keyboard navigation fully supported

### Performance
- Lighthouse Green on all core screens
- LCP <2.5s (Largest Contentful Paint)
- FID <100ms (First Input Delay)
- CLS <0.1 (Cumulative Layout Shift)
- Bundle size <200KB (initial load)

### Responsive Design
- Mobile-first approach
- Tested on 320px-1920px viewport width
- Touch-friendly spacing and targets
- Gesture support (swipe, pull-to-refresh)

---

## Velocity Tracking

Track build velocity using this formula:

**Shards per Week = (Lines of Code / 400) / Weeks**

- **Design Mode expectation:** 2-3 shards/week with 1 full-time developer
- **Team velocity:** 4-5 shards/week with 2 developers
- **Timeline to Completion:** 4-5 weeks for all 20 screens (2 developers)

---

## Next Steps

1. **Engineer:** Start with Shard 01 (Onboarding). Complete tech setup before moving to Shard 02.
2. **Designer:** Validate Shard 01 wireframes against brand guidelines. Prepare Shard 02 designs in parallel.
3. **QA:** Set up test infrastructure (Vitest, React Testing Library) as Shard 01 is being built.
4. **Product:** Prepare mock data generators and test scenarios for Phase 1 (Shards 01-07).

---

**Last Updated:** 2026-03-29
**Next Milestone:** Shard 01 (Onboarding) complete — target 2026-04-05
