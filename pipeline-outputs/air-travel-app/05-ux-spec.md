# AirThere — UX Specification
## Pipeline Step 5 of 10 | 2026-03-29

---

## 1. Spec Overview

### Purpose & Scope

This document specifies the complete user experience for AirThere across all 20 screens, covering the full seven-phase air travel journey from inspiration through post-trip. Each screen specification includes wireframes, component breakdowns, interaction patterns, data requirements, persona-specific adaptations, accessibility requirements, and edge case handling.

This UX spec translates the Experience Strategy (Step 3) and PRD (Step 4) into implementable screen designs optimized for the Next.js 14 + Tailwind CSS + Shadcn UI tech stack. The spec assumes a mobile-first, responsive design approach with explicit support for tablet and desktop layouts.

### How to Use This Document

1. **For Designers:** Use wireframes and component specifications as the authoritative source for layout, spacing, and interaction patterns.
2. **For Developers:** Use component breakdowns to understand state management, data flow, and integration points. Each component references Shadcn UI where applicable.
3. **For Product Managers:** Use persona adaptations and acceptance criteria to validate that each screen serves all three personas effectively.
4. **For QA:** Use the accessibility checklist and states/edge cases sections to plan test scenarios.

Cross-references to PRD (Step 4) features are embedded throughout. Each screen maps to relevant journey phases and personas.

### Cross-References

- **Experience Strategy (Step 3):** Five Design Principles underpin all screens:
  - Principle 1: Anticipatory Calm (proactive information delivery before needs arise)
  - Principle 2: Radical Transparency (all costs, delays, data usage explicit)
  - Principle 3: Family Integrity (family unit is sacred, never separated)
  - Principle 4: Graduated Trust (AI earns autonomy through competence)
  - Principle 5: Journey Continuity (one identity, one context, zero repetition)

- **PRD (Step 4):** 37 features across 7 journey phases mapped to screens below

---

## 2. Global Design Patterns

### Navigation System

**Primary Navigation (Bottom Tab Bar)**

AirThere uses a persistent bottom tab bar with 5 tabs, visible on all screens except fullscreen modals:
- **Home** (House icon) — Today view on travel day; home feed otherwise. Activates day-of-travel dashboard (SCR-002) at 5:00 AM on departure date.
- **Discover** (Sparkle/compass icon) — Inspiration feed, destination discovery, trending map (SCR-003).
- **Search** (Magnifying glass icon) — Flight search interface (SCR-004).
- **Trips** (Briefcase icon) — Trip dashboard showing active and upcoming trips (SCR-008).
- **Profile** (Person icon) — User profile, loyalty, settings, preferences (SCR-015).

**Header Behavior**

Headers adapt by screen:
- **Static headers** (Search, Discover) show title and search/filter controls.
- **Adaptive headers** (Home on travel day, Trips, Profile) hide on scroll down, reappear on scroll up or pull-to-refresh.
- **Transparent headers** (Onboarding, certain modals) blend into hero imagery.

### Pull-to-Refresh Pattern

All feed-based screens (Discover, Trip Dashboard, Notifications Center) support pull-to-refresh:
- Pull threshold: 60px
- Loading state: Skeleton screens for 200-500ms (realistic API latency)
- Completion: "Refreshed 2 minutes ago" timestamp appears below tab bar
- Gesture feedback: Haptic pulse on release, fade-in animation for new content

### Loading States (Skeleton Screens)

Skeleton screens appear for:
- Initial page load (if >200ms API latency expected)
- Pull-to-refresh
- Pagination (infinite scroll)

Skeleton layout matches content structure exactly (e.g., flight search results show skeleton cards in exact result layout). Skeleton color: neutral-200 (#e5e7eb). Animation: subtle 1.2s pulse.

### Error States

Error states appear in context with recovery options:
- **Toast-style errors** (transient, <4s): Network timeouts, minor sync failures. Message + dismiss or retry button.
- **Modal errors** (persistent): Login failures, payment errors, critical data loss. Message + primary action (retry/change approach).
- **Inline errors** (form validation): Missing fields, invalid input. Red text below field + helper text.

### Empty States

Empty states include:
- Illustration or icon (not generic sad face — use travel-relevant imagery)
- Headline explaining why empty ("You haven't booked any trips yet")
- CTA prompting next action ("Explore destinations" → Discover tab)
- Optional: Inspirational message or tip

### Toast/Notification Patterns

Toasts appear in top-right (desktop) or bottom-center (mobile):
- **Success** (green): "Flight booked" + confirmation number
- **Warning** (amber): "Fare price increased by $25"
- **Error** (red): "Payment failed. Retry?"
- **Info** (blue): "Gate changed from C5 to D12"

Auto-dismiss: Success/info after 3s, warning after 5s, error persistent until dismissed.

### Bottom Sheet Pattern

Bottom sheets slide up from bottom for secondary workflows:
- **Half-height sheets** (non-blocking): Filter options, preference toggles, quick actions
- **Full-height sheets** (modal-like): Seat selection, document upload, preference forms
- **Draggable handle** (white bar, ~5px height) allows manual dismiss
- **Scrim** (semi-transparent dark overlay) behind sheet; tap to dismiss (unless critical flow)
- **Animation:** Easing: cubic-bezier(0.4, 0, 0.2, 1) over 300ms

### Modal Patterns

Modal dialogs reserved for:
- Confirmations requiring explicit approval (payment, rebooking)
- Critical alerts (disruption notifications, policy violations)
- Onboarding/consent flows

Modals block interaction with background; always include explicit dismiss option (close button + cancel button).

### Accessibility Patterns

**Focus Management:**
- Focus trap in modals (tab cycles within modal only)
- Focus visible indicators (outline: 2px solid, color: primary-500, offset: 2px)
- Initial focus set to primary CTA

**Screen Reader:**
- Reading order follows DOM top-to-bottom (no visual-only reordering via CSS)
- Form labels programmatically associated with inputs
- Complex tables annotated with aria-label
- Dynamic content updates announced via aria-live regions

**High Contrast Mode:**
- All text meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- Color is never the only indicator of state (use icons, text, patterns)
- Test with Windows High Contrast mode

**Motion Reduction:**
- Respect prefers-reduced-motion: all animations disabled
- Parallax and scroll-linked animations hidden
- Autoplay video/carousels paused

**Touch Targets:**
- Minimum 44×44pt for interactive elements (buttons, links, form fields)
- Touchable areas have minimum 8pt padding between targets
- No elements <24pt unless intentionally de-emphasized

---

## 3. Screen Specifications

---

### SCR-001: Onboarding / Welcome

**Purpose:** Introduce AirThere's value proposition and establish initial traveler identity (persona detection, biometric enrollment, preference setup). First-time users see this flow; returning users skip directly to Home.

**Entry Points:** App launch (first-time users only), reinstall after uninstall

**Exit Points:**
- Complete flow → Home (SCR-002)
- Skip authentication → Search (SCR-004)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Hero Image / Illustration]             │
│ Full Bleed, 60% of viewport height      │
├─────────────────────────────────────────┤
│ [Welcome Headline]                      │
│ "Where Every Journey Begins With Calm"  │
├─────────────────────────────────────────┤
│ [Subheadline]                           │
│ "AirThere is your travel operating      │
│  system — one identity, unified         │
│  experience, anticipatory calm."        │
├─────────────────────────────────────────┤
│ [Primary CTA Button]                    │
│ "Let's Get Started"                     │
│ (40px height, full width minus 16px)    │
├─────────────────────────────────────────┤
│ [Secondary CTA Button]                  │
│ "Skip to Browse"                        │
│ (text link style, no background)        │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Hero Image Component**
- Type: Full-bleed image or animated gradient background
- Content: Travel-inspired imagery (airport, aircraft, city horizon) with subtle animation (slow parallax on scroll)
- Responsive: Scales to fill 60% of viewport on mobile; 50% on tablet
- Accessibility: Purely decorative; aria-hidden="true"

**2. Welcome Headline**
- Typography: 28px / 34px (mobile) or 32px / 40px (desktop), font-weight: 700, letter-spacing: -0.5px
- Color: neutral-900 (#111827)
- Alignment: Center
- Content: Contextual based on persona detection (if available from analytics): "Premium travel awaits" vs. "Speed meets control" vs. "Family adventures start here"

**3. Subheadline**
- Typography: 16px / 24px, font-weight: 400, letter-spacing: 0
- Color: neutral-600 (#4b5563)
- Alignment: Center
- Margin-top: 12px
- Content: Static value proposition

**4. CTA Buttons**
- Primary button: Shadcn Button component (variant="default", size="lg")
- Secondary button: Shadcn Button component (variant="ghost", size="lg")
- Spacing: 12px gap between buttons
- Full width on mobile, constrained to 300px on desktop

**Interaction Patterns**

- **Tap "Let's Get Started":** Slide transition (left-to-right) to Step 1: Persona Selection
- **Tap "Skip to Browse":** Dismiss onboarding, go to Search
- **Swipe right from edge:** Native back gesture returns to previous step (if in multi-step flow)

**Data Requirements**

- Persona detection: Inferred from initial app session (device type, location, language) or explicit selection
- No API calls on welcome screen; all content static
- Offline: Fully functional offline (all content pre-bundled)

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Headline emphasizes "White-glove anticipatory service" and "invisible seamlessness"
- **PERSONA-02 (Marcus):** Headline emphasizes "90-second bookings" and "complete control"
- **PERSONA-03 (Chen Family):** Headline emphasizes "Family stays together" and "transparent pricing"

Persona selection happens in Step 1 of onboarding flow; welcome screen is persona-agnostic.

**Accessibility**

- Heading: h1 tag, semantic structure enforced
- Skip link (if applicable): "Skip to main content"
- Buttons: Keyboard accessible (Tab focus order: primary CTA → secondary CTA)
- Color contrast: Headline/subheadline on image meet 4.5:1 or have text shadow for contrast
- Motion: Hero image animation respects prefers-reduced-motion

**States & Edge Cases**

- **First-time user:** Show full welcome flow
- **Reinstall after data wipe:** Show welcome again
- **Returning user who closed app mid-onboarding:** Resume onboarding at last step
- **Low connectivity:** Show offline welcome (no imagery, text-only)

---

### SCR-002: Home / Today View

**Purpose:** Contextual home screen that transforms based on travel status. On non-travel days, shows destination inspiration feed (like Discover). On travel days (5:00 AM to landing), shows day-of-travel dashboard with countdown, next actions, and real-time flight status.

**Entry Points:** App launch (returning users), tab bar "Home" tap, wake-up notification on travel day

**Exit Points:**
- Tap trip card → Trip Dashboard (SCR-008)
- Tap destination card → Search (SCR-004)
- Tap "Airport Live" banner → Airport Live (SCR-010)

**Layout Specification**

*Non-Travel Day:*
```
┌─────────────────────────────────────────┐
│ [Header: "Hello, Alexandra"]             │
│ Time: 9:41 | Status: No travel today    │
├─────────────────────────────────────────┤
│ [Upcoming Trips Section]                 │
│ ┌────────────────────────────────────┐   │
│ │ SFO → LHR | Mar 30                 │   │
│ │ United UA 901 | 11:00 AM           │   │
│ │ [Tap for full trip dashboard]      │   │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Inspiration Feed - Destination Cards]  │
│ [Card 1] [Card 2]                       │
│ Swipe for more...                       │
└─────────────────────────────────────────┘
```

*Travel Day (5:00 AM+):*
```
┌─────────────────────────────────────────┐
│ [Header: Travel Day Indicator]           │
│ 🛫 Depart in 3 hours 22 minutes         │
├─────────────────────────────────────────┤
│ [Countdown Hero]                         │
│ ┌────────────────────────────────────┐   │
│ │    San Francisco → London          │   │
│ │    United UA 901                   │   │
│ │    Depart: 11:00 AM | Gate: C15    │   │
│ │    [Large countdown timer]          │   │
│ │    3 hours 22 minutes               │   │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Next Action Card]                      │
│ ✅ Check-in opens in 23 hours           │
│ [Tap to check in when available]        │
├─────────────────────────────────────────┤
│ [Quick Status Cards]                    │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Seat  │ │Lounge│ │Docs  │             │
│ │12A   │ │Ready │ │✓     │             │
│ └──────┘ └──────┘ └──────┘             │
├─────────────────────────────────────────┤
│ [Real-time Alerts Section]              │
│ • Security line: 47 min wait            │
│ • Terminal info updated                 │
│ • Weather: Slight turbulence expected   │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Adaptive Header**
- Non-travel day: "Hello, [Name]" + current time + status
- Travel day: "🛫 Depart in X hours Y minutes" + departure airport code
- Typography: 18px / 22px (desktop), 16px / 20px (mobile) for greeting
- Color: primary-700 for countdown text on travel day

**2. Upcoming Trips Section (Non-Travel Day)**
- Type: Horizontal carousel or stacked cards
- Cards show: Route (SFO → LHR), date, airline + flight #, departure time
- Card styling: Shadcn Card component with subtle shadow (shadow-sm)
- Tap action: Navigate to Trip Dashboard (SCR-008) for full details
- Empty state: "No trips booked yet" + CTA to Discover

**3. Inspiration Feed Cards (Non-Travel Day)**
- Type: Vertical scrolling feed, 2 cards per row on mobile, 3+ on desktop
- Each card: Destination photo (landscape), city name (18px bold), key highlights (3-5 line items, 12px text), price range ("From $1,299"), save button (heart icon)
- Card height: 240px on mobile, 280px on desktop
- Tap action: Save to wishlist (heart toggle) or tap card to search that destination (SCR-004)
- Personalization: ML-driven recommendations based on history, persona, season

**4. Countdown Hero (Travel Day)**
- Type: Full-width card with gradient background (primary-500 to primary-600)
- Displays: Route, airline, flight #, scheduled time, gate (when available), seat assignment
- Countdown timer: Extra-large display (48px number, 20px label), updates every second
- Color: White text on primary background for high contrast
- States:
  - "Depart in X hours Y minutes" (>1 hour before)
  - "Depart in X minutes" (<1 hour before)
  - "Boarding now" (at boarding time)
  - "Departed" (after departure)

**5. Next Action Card**
- Type: Shadcn Card with primary accent border
- Content: Icon + action + timing + CTA button
- Examples:
  - ✅ "Check-in opens in 23 hours" → [Check In Now] (grayed if not yet available)
  - 📱 "Biometric enrollment required" → [Enroll Now]
  - 🎫 "Boarding starts soon" → [View Boarding Status]
- Color coding: Green for completed actions, amber for upcoming, red for overdue

**6. Quick Status Cards**
- Type: Mini cards in 3-column grid (mobile) or 4+ column (desktop)
- Icons: Seat assignment, lounge access, document status, loyalty balance
- Content: One metric per card (12A, Ready, ✓, +3,500 points)
- Tap: Navigate to detailed screen (Seat Selection, Lounge Finder, Document Vault)
- Responsive: Stack vertically on small screens, grid on larger

**7. Real-time Alerts Section**
- Type: Scrollable list of relevant alerts (max 3 visible, more with scroll)
- Each alert: Icon + message + action link
- Color: Info (blue), warning (amber), error (red)
- Tap: Navigate to relevant detail screen or dismiss

**Interaction Patterns**

- **Swipe left/right on cards:** Navigate carousel (if horizontal layout)
- **Tap card:** Navigate to detail screen or perform action
- **Pull-to-refresh:** Reload trip status, alerts, countdown timer
- **Long-press on trip card:** Quick actions menu (check in, view seat map, view docs)
- **Travel day activation:** At 5:00 AM on departure date, layout completely transitions from inspiration to travel dashboard

**Data Requirements**

- Upcoming trips: Fetched from user booking history (cached, real-time sync on pull-to-refresh)
- Countdown timer: Calculated client-side from departure time (persists across app backgrounding)
- Destination cards: ML recommendation engine (real-time, personalization signals)
- Flight status: Real-time API integration (polling every 30s on travel day, every 5min on non-travel day)
- Alerts: Real-time push notifications + polling for status changes
- Offline: Show cached trips and last-known status; live countdown unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Travel day view emphasizes lounge access, status symbols (elite badges), connection efficiency. Countdown uses premium color scheme (gold accent). Inspiration feed shows luxury destinations, first-class availability.
- **PERSONA-02 (Marcus):** Travel day view emphasizes policy compliance, connection time remaining, lounge efficiency. Next actions prioritize productivity (work space availability). Alerts include flight duration and connection adequacy. Inspiration shows business hubs.
- **PERSONA-03 (Chen Family):** Travel day view shows family status (all kids on flight, seating confirmed). Next actions emphasize family-specific info (bathroom locations, family lounge). Alerts include child-specific info (entertainment availability, meal timing). Inspiration shows family-friendly destinations with multi-person pricing.

**Accessibility**

- Header: h1 or role="heading" aria-level="1"
- Countdown timer: aria-live="polite" announces updates every minute
- Cards: Keyboard navigable (Tab through cards, Enter to select), screen reader announces card title + action on focus
- Touch targets: All buttons 44×44pt minimum
- Color: Countdown on travel day has sufficient contrast (white on primary-500 meets 4.5:1); alerts use color + icon + text
- Motion: Carousel respects prefers-reduced-motion (shows as vertical list instead of swipe)

**States & Edge Cases**

- **No upcoming trips:** Show inspiration feed full-screen with CTA to search
- **Past 72-hour travel day (boarding in progress):** Show "Boarding now" state with gate info, live boarding status
- **Travel day with disruption:** Show disruption banner prominently at top with rebooking options
- **Multiple overlapping trips:** Show next departure prominently, others as secondary cards
- **Travel day with insufficient documents:** Show red alert "Passport upload required"
- **Biometric not enrolled:** Show CTA to enroll on travel day (not mandatory but recommended)
- **Offline on travel day:** Show cached flight info, countdown continues, status unavailable

---

### SCR-003: Discover / Inspiration Feed

**Purpose:** Inspire destination discovery through AI-personalized destination cards, social discovery, trending destinations map, and deal alerts. Primary entry point for leisure/family travelers in inspiration phase.

**Entry Points:** Tab bar "Discover" tap, onboarding flow "explore destinations" CTA

**Exit Points:**
- Tap destination card → Search (SCR-004) with destination pre-filled
- Tap "Save" heart → Wishlist (no screen; persists to profile)
- Tap trending map region → Search with region filters
- Tap deal alert → Search with suggested dates

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Discover Your Next Adventure"]│
│ [Filter/Sort controls: Mood, Budget]    │
├─────────────────────────────────────────┤
│ [Section 1: AI Destination Cards]       │
│ ┌────────────────────────────────────┐   │
│ │ [Destination Image]                │   │
│ │ Bali, Indonesia                    │   │
│ │ • Beaches & Temples                │   │
│ │ • March-April: Best weather        │   │
│ │ From $899                          │   │
│ │ [❤️] [→]                          │   │
│ └────────────────────────────────────┘   │
│ Swipe for more...                       │
├─────────────────────────────────────────┤
│ [Section 2: Trending Destinations]      │
│ [Interactive heat map showing regions]  │
│ [Tap region for city drill-down]        │
├─────────────────────────────────────────┤
│ [Section 3: Deals & Alerts]             │
│ • $129 flights to Vegas (expires 3h)    │
│ • Spring break deals (families)         │
├─────────────────────────────────────────┤
│ [Section 4: Social Discovery (if opt-in)]
│ Friends' trips, influencer destinations │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header with Filters**
- Typography: 24px / 28px heading ("Discover Your Next Adventure")
- Filter buttons: Mood ("Relaxing," "Adventure," "Cultural"), Budget slider (0-5000), Date picker
- Filter UI: Shadcn Sheet (bottom-sheet) on mobile, popover on desktop
- Applied filters badge: Show count ("2 filters applied")

**2. Destination Card Stack**
- Type: Swipeable horizontal carousel (mobile) or grid (desktop)
- Card layout:
  - Image: 100% width, ~160px height, object-fit cover
  - Destination name: 18px / 22px bold
  - Bullet points: 3-5 key attractions (12px, secondary color)
  - Price range: 14px, primary color ("From $1,299")
  - Action buttons: Save (heart), View Details (arrow)
- Card dimensions: 280px width (mobile), 320px (tablet)
- Tap behavior: Heart toggles save state; arrow navigates to Search with destination pre-filled
- Empty state: "No destinations match your filters" + reset filters CTA

**3. Trending Destinations Map**
- Type: Interactive global heat map (Leaflet or Mapbox integration)
- Heat scale: Blue (cold) → green → yellow → red (hot)
- Data: Daily-updated trending metrics (search volume, booking volume, deal availability)
- Tap region: Drill-down shows top 8-12 cities in that region
- Gesture: Pinch to zoom, pan to navigate
- Persona-specific: Alexandra sees "emerging luxury," Marcus sees "business hubs," families see "family-friendly"
- Mobile: Full-width below text, 200px height minimum; desktop: 400px+ height

**4. Deals & Alerts Section**
- Type: Vertical card list, each card: Icon + deal headline + "Expires in Xh" countdown + CTA
- Deal card content: Route (SFO → LAS), base fare + savings amount, travel dates, action (View)
- Tap: Navigate to Search with route and dates pre-filled
- Countdown updates in real-time; cards auto-remove when expired
- Empty state: "No active deals. Set up deal alerts in Profile."

**5. Social Discovery Feed (Optional, P1 feature)**
- Type: Similar to destination cards but showing friend trips
- Card content: Friend name(s), destination, dates, budget estimate, photo carousel, review/sentiment
- Tap "Plan similar trip": Navigate to Search with destination and traveler count pre-filled
- Privacy: Toggle in Settings to show/hide own trips from friends

**Interaction Patterns**

- **Swipe left/right on cards:** Navigate carousel (horizontal scroll)
- **Swipe up on page:** Pull-to-refresh, reloads trending data and deals
- **Tap heart:** Toggle save state (instant feedback; no API call until data syncs)
- **Tap filter button:** Open bottom sheet with filter options
- **Double-tap heart:** Quick-add to wishlist with toast confirmation

**Data Requirements**

- Destination cards: ML-personalized recommendations (real-time, personalization signals: history, persona, season, location)
- Trending map: Daily aggregated booking/search data (real-time source: airline booking APIs, aggregators)
- Deal alerts: Real-time price monitoring (backend monitors 50+ airlines + OTAs)
- Social feed: Friend network data (opt-in, requires friend connection)
- Offline: Show cached destination cards and trending map; deals unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Cards emphasize luxury properties, first-class availability, exclusive experiences, fine dining. Trending shows "emerging luxury destinations." Deals show premium fares/amenities.
- **PERSONA-02 (Marcus):** Cards emphasize business hubs, conference destinations, productivity-friendly hotels. Trending shows "new business centers." Deals show business-class and premium economy.
- **PERSONA-03 (Chen Family):** Cards emphasize family amenities, kid-friendly activities, educational experiences. Card shows "Perfect for families with kids ages 7-10." Trending shows "trending family destinations." Deals show family bundle pricing.

**Accessibility**

- Heading: h1 tag
- Map: Keyboard navigable (arrow keys to pan, +/- to zoom), screen reader announces current zoom level and selected region
- Card carousel: Tab through visible cards, arrow keys navigate carousel (with screen reader announcement of current position)
- Deals countdown: aria-live="polite" announces time updates
- Images: All images have descriptive alt text ("Beach sunset in Bali, Indonesia with temple silhouette")
- Color: Map heat scale includes pattern/texture differentiation (not just color)
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No deals available:** Show placeholder message "Check back soon for great deals"
- **Map at max zoom:** Disable zoom-in button
- **Limited connectivity:** Show cached destination cards; map unavailable; deals may be stale
- **User has saved 50+ destinations:** Show "Your wishlist is full" warning before adding more
- **First-time discover user:** Show onboarding tooltip highlighting mood filter and save feature
- **Zero search history:** Trending shows global trending (not personalized)

---

### SCR-004: Search (Flight Search)

**Purpose:** Multi-modal flight search interface supporting five input modes: date/destination entry, calendar view, destination + budget, conversational, voice search. Core booking funnel entry point.

**Entry Points:** Tab bar "Search" tap, Discover tap on destination card, onboarding CTA

**Exit Points:**
- Enter search params → Search Results (SCR-005)
- Voice input → search results
- Conversational input → search results

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Find Flights"]                │
│ [Tab bar: Standard | Calendar | Convo]  │
├─────────────────────────────────────────┤
│ [STANDARD VIEW]                         │
│ [Input 1: From airport]                 │
│ ┌────────────────────────────────────┐   │
│ │ SFO (San Francisco)                │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Swap icon]                             │
│                                          │
│ [Input 2: To airport]                   │
│ ┌────────────────────────────────────┐   │
│ │ [Tap to select destination]        │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Input 3: Depart date]                  │
│ ┌────────────────────────────────────┐   │
│ │ Mar 30, 2026                       │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Input 4: Return date (if round-trip)]  │
│ ┌────────────────────────────────────┐   │
│ │ Apr 6, 2026                        │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Input 5: Travelers]                    │
│ ┌────────────────────────────────────┐   │
│ │ 1 Adult                            │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Trip type toggle]                      │
│ (Round-trip | One-way | Multi-city)     │
│                                          │
│ [Search button]                         │
│ [Search]                                │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header & Mode Tabs**
- Header: 20px bold "Find Flights"
- Mode tabs: "Standard | Calendar | Mood" (Shadcn Tabs component)
- Active tab indicator: Underline (primary-600)
- Tab switching: Smooth transition, content fades in

**2. From/To Airport Inputs**
- Type: Shadcn ComboBox or autocomplete input
- Placeholder: "Depart from" / "Arriving at"
- Autocomplete suggestions: IATA codes (SFO, LHR) + city names + "Your frequent airports" (if user history available)
- Current value display: "SFO (San Francisco)" or icon + city name
- Tap action: Open dropdown with recent airports, frequent airports (top 3), search field
- Swap button: Circular icon button (↔) between From/To, swaps values instantly

**3. Date Inputs**
- Type: Shadcn date picker (calendar modal or native date input per platform)
- Format: "Mar 30, 2026" or locale-aware format
- Depart date: Minimum today, maximum 365 days ahead
- Return date: Only if round-trip selected, minimum depart date, maximum 365 days from depart
- Tap action: Open calendar popup showing 12-month view with unavailable dates grayed
- Shortcut buttons: "Tomorrow," "This weekend," "Next month" (optional, saves taps)

**4. Travelers Input**
- Type: Shadcn selector or increment/decrement buttons
- Display: Total count + breakdown (1 Adult, 2 Children, 1 Infant)
- Tap action: Open modal showing:
  - Adult count (+ / - buttons, min 1, max 8)
  - Child count (+ / - buttons, ages 2-11, min 0, max 6)
  - Infant count (+ / - buttons, ages 0-2, min 0, max 1)
  - Each child has age selector (critical for seating and meals)
- Validation: Total must be 1-8 passengers

**5. Trip Type Toggle**
- Type: Segmented button (Shadcn Radio Group styled as buttons)
- Options: Round-trip, One-way, Multi-city
- Default: Round-trip
- Effect: Changes visible inputs (one-way hides return date, multi-city shows leg addition)

**6. Search Button**
- Type: Shadcn Button (variant="default", size="lg")
- State: Enabled only when all required fields filled
- Tap action: Validate inputs, then navigate to Search Results (SCR-005)
- Loading state: Button shows spinner during API call (<2s expected)

**CALENDAR VIEW (Tab 2)**

```
┌─────────────────────────────────────────┐
│ [From/To airport inputs (same as above)]│
├─────────────────────────────────────────┤
│ [Calendar heatmap showing fares]        │
│ ┌────────────────────────────────────┐   │
│ │ March 2026                         │   │
│ │ S M T W T F S                      │   │
│ │ ... [color-coded dates] ...        │   │
│ │ Green = low fare, Red = high fare  │   │
│ └────────────────────────────────────┘   │
│ [Right/Left arrows to navigate months]   │
│ [Tap date to select depart]             │
│ [Second calendar for return date]       │
├─────────────────────────────────────────┤
│ [Search with selected dates button]     │
└─────────────────────────────────────────┘
```

**Calendar View Details:**
- Type: Custom calendar heatmap (not native date picker)
- Color scale: Green (best price) → yellow → orange → red (highest price)
- Cell content: Date number + price ("30 $899")
- Dates grayed: Past dates, dates unavailable for selected airport
- Tap date: Selection highlights; shows predicted price change vs. first date
- Dual calendar: Side-by-side calendars for depart and return (on tablet+), stacked on mobile
- Legend: "Green = good price, Red = high price"

**CONVERSATIONAL VIEW (Tab 3)**

```
┌─────────────────────────────────────────┐
│ [Copilot greeting]                      │
│ "Hi Alexandra! Tell me about your trip  │
│  and I'll find the perfect flight."     │
├─────────────────────────────────────────┤
│ [Chat history area (empty initially)]   │
├─────────────────────────────────────────┤
│ [Input field with microphone button]    │
│ ┌────────────────────────────────────┐   │
│ │ "NYC next week, Wednesday return" │🎤│
│ └────────────────────────────────────┘   │
│ [Send button]                           │
└─────────────────────────────────────────┘
```

**Conversational View Details:**
- Type: Chat interface with AI copilot
- Greeting: Persona-specific ("Hi Alexandra! Looking for your next first-class escape?")
- User input: Text field + microphone button (voice input)
- Copilot response: Shows interpreted parameters ("From: San Francisco, To: New York, Date: April 2 (Wednesday return April 9)")
- Multi-turn: User can refine ("Actually, I want to leave Friday instead")
- Confidence display: Shows interpreted parameters with edit options ("Is this correct? [Edit]")
- Fallback: If AI can't interpret, asks clarifying questions ("Which New York airport? JFK, LaGuardia, or Newark?")

**Interaction Patterns**

- **Tap from/to fields:** Open autocomplete with recent/frequent airports
- **Tap date fields:** Open calendar popup
- **Swipe left on tab bar:** Navigate to next tab (Calendar → Conversational)
- **Voice input (conversational):** Tap microphone, record, release to transcribe and submit
- **Pull-to-refresh:** Reloads recent searches and frequent airports
- **Tab navigation (keyboard):** Standard form navigation, Enter submits

**Data Requirements**

- Airport autocomplete: IATA/ICAO code list (cached, infrequently updated)
- Recent airports: Stored locally in preferences
- Frequent airports: Calculated from booking history (cached)
- Fare calendar data: Real-time price aggregation (API call on calendar tab switch or date range change)
- Voice transcription: Cloud-based speech-to-text API (requires internet)
- Conversational NLP: Cloud-based intent recognition (identifies destination, dates, passenger count)
- Offline: Standard and conversational views available with cached data; calendar unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Standard view pre-fills from frequent airports (LON, PAR, AUS). Calendar shows premium cabin pricing. Conversational mode includes luxury destination suggestions ("Or would you prefer first-class to Paris?").
- **PERSONA-02 (Marcus):** Standard view pre-fills from frequent airports and shows policy-compliant options badge. Calendar shows direct flight emphasis. Conversational mode suggests policy-optimized dates.
- **PERSONA-03 (Chen Family):** Standard view shows "4 travelers" as default (parents + 2 kids). Calendar emphasizes school holidays and family-friendly dates. Conversational mode asks about family needs ("Any special seating for kids?").

**Accessibility**

- All inputs: Label elements associated with inputs (label htmlFor)
- Airport search: Dropdown announces number of results ("3 airports found")
- Calendar heatmap: Keyboard navigable (arrow keys select date, Enter confirms)
- Voice input: Visual mic button with on/off state, transcript display for confirmation
- Color: Fare heatmap includes numeric values (not just colors); legend explains color meaning
- Touch targets: All buttons/inputs 44×44pt minimum
- Motion: Calendar transitions respect prefers-reduced-motion

**States & Edge Cases**

- **No internet (offline):** Show cached data, calendar unavailable, voice input disabled, show toast "Calendar data unavailable"
- **Airport code ambiguous (e.g., "NYC" has 3 airports):** Show disambiguation list in autocomplete
- **Selected date has no availability:** Show gray date in calendar, tooltip "No flights available this date"
- **User selects infant:** Show age input (< 2 years), display "1 Infant" in summary
- **Return date before depart date:** Show error "Return date must be after departure date"
- **User searches while another search in progress:** Cancel previous request, show new loading state
- **Conversational NLP fails to parse:** Show fallback form with clarifying question

---

### SCR-005: Search Results / Fare Explorer

**Purpose:** Display flight search results in multiple views (list, calendar, map) with sorting, filtering, and real-time price updates. Primary decision interface for flight selection.

**Entry Points:** Search (SCR-004) with parameters entered, saved search results recalled

**Exit Points:**
- Tap flight result → Flight Detail / Seat Selection (SCR-006)
- Tap calendar date → Results filtered to that date
- Tap price graph → Zooms to date range
- Back button → Search (SCR-004)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "SFO → LHR, Mar 30 - Apr 6"]   │
│ [View toggle: List | Calendar | Map]    │
├─────────────────────────────────────────┤
│ [Filters/Sort bar]                      │
│ [Stops: All ▼] [Time: Anytime ▼]        │
│ [Sort: Recommended ▼]                   │
├─────────────────────────────────────────┤
│ [Price range indicator]                 │
│ Low ┌────●────┐ High                    │
│ $899        $1,450                      │
├─────────────────────────────────────────┤
│ [Result 1: Best value]                  │
│ ┌────────────────────────────────────┐   │
│ │ ⭐ Best Value                       │   │
│ │ United UA 901                       │   │
│ │ 11:00 AM → 10:15 PM (13h 15m)       │   │
│ │ 1 stop (DUB, 2h 30m layover)        │   │
│ │ Business class available            │   │
│ │ $1,299 [Book]                       │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Result 2]                              │
│ ┌────────────────────────────────────┐   │
│ │ Virgin Atlantic VS 211              │   │
│ │ 1:30 PM → 12:45 AM (+1) (13h 15m)   │   │
│ │ 1 stop (IAD, 1h 45m layover)        │   │
│ │ Premium economy                     │   │
│ │ $899 [Book]                         │   │
│ └────────────────────────────────────┘   │
│ [Load more results...]                  │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header**
- Route display: "SFO → LHR" + dates "Mar 30 - Apr 6" (if round-trip)
- Edit button: Tap to return to Search (SCR-004)
- Trip summary: "1 Adult, round-trip" (collapsible on small screens)

**2. View Toggle**
- Type: Shadcn Tabs (List, Calendar, Map)
- List view: Default, shows flight cards
- Calendar view: Fare heatmap by date
- Map view: Route visualization with price pins (advanced, optional)

**3. Filters & Sort**
- Type: Bottom sheet (mobile) or popover (desktop)
- Filter options:
  - **Stops:** Nonstop, 1 stop, 2+ stops
  - **Departure time:** Anytime, Early morning (5-9am), Morning (9am-12pm), Afternoon (12-5pm), Evening (5pm-12am), Red-eye (12am-5am)
  - **Arrival time:** Similar ranges
  - **Duration:** Max flight time (slider: 8-20 hours)
  - **Cabin class:** Economy, Premium economy, Business, First
  - **Alliance:** Oneworld, Star Alliance, SkyTeam, other (if available)
  - **Airline:** Checkboxes for preferred airlines
- Sort options: Recommended, Lowest price, Shortest duration, Earliest departure, Highest rated
- Applied filters badge: Shows count

**4. Price Range Indicator**
- Type: Visual range slider showing lowest and highest available fares
- Display: "Low $899" on left, "High $1,450" on right with horizontal bar
- Tap: Slides filter to selected range (optional filtering by price)
- Real-time: Updates as filters applied

**5. Flight Result Cards**
- Type: Shadcn Card (clickable, tap navigates to Flight Detail)
- Layout (per card):
  - Badge (top-left): "Best Value" (lowest price for dates), "Shortest" (fewest hours), "Fastest" (least layover time), "Your usual" (matches past preferences)
  - Airline: Logo (20×20px) + name + flight # + cabin class
  - Times: Departure time (bold) → arrival time (bold) with date (+1 if overnight)
  - Duration: Total flight time in parentheses
  - Stops: "Nonstop" or "1 stop (DUB, 2h 30m layover)" or "2 stops"
  - Amenities: Icons for wifi, power, meal service, seat back IFE
  - Price: Large bold number (primary color) + "per person" + total for all passengers (if 2+)
  - CTA: "Book" button or "View details" link
- Card height: ~140px (mobile), ~120px (desktop)
- Hover state (desktop): Slight shadow increase, book button becomes more prominent
- Loading state: Show skeleton cards while loading

**6. Pagination**
- Type: Infinite scroll or "Load more results" button
- Trigger: Auto-load on scroll to bottom or manual load
- Loading indicator: Spinner + "Finding more flights..."
- No more results: "Showing all available flights (47 results)"

**CALENDAR VIEW (Tab 2)**

```
┌─────────────────────────────────────────┐
│ [Calendar heatmap showing outbound fares]
│ March 2026                              │
│ S M T W T F S                           │
│ ... [fare-colored dates] ...            │
│ [Tap date to filter results]            │
├─────────────────────────────────────────┤
│ [Calendar 2: Return fares]              │
│ April 2026                              │
│ S M T W T F S                           │
│ ... [fare-colored dates] ...            │
└─────────────────────────────────────────┘
```

**Calendar View Details:**
- Dual calendars: Left (outbound fares), right (return fares)
- Color scale: Green (best) → yellow → red (worst)
- Date cells show: Date + lowest fare ("30 $899")
- Tap date: Filters results to that date, shows all available flights
- Visual indicator: Selected dates highlighted with border

**Interaction Patterns**

- **Tap flight card:** Navigate to Flight Detail (SCR-006)
- **Tap filters button:** Open bottom sheet with filter/sort options
- **Tap sort dropdown:** Change sort order, results re-order instantly
- **Pull-to-refresh:** Reloads flight results (shows "Refreshing prices...")
- **Swipe between tabs:** Navigate between List/Calendar/Map views
- **Tap price badge:** Opens filter sidebar set to that price range
- **Long-press card:** Quick preview modal showing seat map and amenities

**Data Requirements**

- Flight results: API call to flight search engine (amadeus, sabre, ITA, aggregator)
- Price data: Real-time aggregation (updates every 2-5 minutes)
- Ancillary pricing: Seat, baggage, meals (cached per airline)
- Availability: Real-time (updates on filter change or manual refresh)
- Offline: Show cached results from previous search; refresh unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Results emphasize first/business class, direct flights, premium airline status. "Your usual" badge highlights flights matching past preferences. Amenities highlight premium cabins (spa, lounge, concierge). Price shows total (no per-person breakdown required for premium).
- **PERSONA-02 (Marcus):** Results sorted by "Policy-compliant" first, then lowest price. Connection time display emphasizes adequacy for next meeting. Amenities highlight productivity features (wifi, power, lounge). Show policy tags (✓ Compliant, ⚠ Requires approval).
- **PERSONA-03 (Chen Family):** Results show family-bundle pricing (seat selection + meal plan for 4). Badge "Family seating confirmed" for flights with adjacent seats available. Amenities highlight family-friendly features (kids meals, entertainment, family lounge). Show total price (not per-person) and payment plan options.

**Accessibility**

- Heading: h1 "Flight Results for SFO → LHR"
- Filters: Keyboard navigable (Tab through options, Space/Enter to toggle)
- Flight cards: Keyboard selectable (Tab through cards, Enter to book)
- Screen reader: Announces result count ("47 results found"), sort order, filter status
- Color: Fare heatmap includes numeric labels (not just colors)
- Touch targets: All buttons 44×44pt, card swipe area full height

**States & Edge Cases**

- **No results found:** Show message "No flights available for your criteria. Try adjusting filters (e.g., different dates, longer trip duration)."
- **One result found:** Still show "1 result" header; no pagination needed
- **Price changed since search:** Show toast "Prices updated. Cheapest fare is now $999 (was $899)"
- **Flight sold out:** Show card grayed out with "Sold out" label; hide book button
- **Selected cabin class unavailable on flight:** Show "Business sold out - Premium economy available $1,199"
- **Slow internet (>3s load time):** Show skeleton cards during loading
- **Network error mid-scroll:** Show error toast "Couldn't load more flights. Retry?"
- **User has 8+ passengers:** Show warning "Family size warning: Some airlines may split your group across multiple flights"

---

### SCR-006: Flight Detail / Seat Selection

**Purpose:** Detailed flight information including full itinerary, route map, seat map, ancillary options (baggage, meals, extras), and booking summary before checkout. Final review before proceeding to payment.

**Entry Points:** Tap flight result from Search Results (SCR-005)

**Exit Points:**
- Tap "Continue to Booking" → Booking Flow (SCR-007)
- Tap back/X → Search Results (SCR-005)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Flight Details"]              │
├─────────────────────────────────────────┤
│ [Flight Summary Hero]                   │
│ United UA 901                           │
│ SFO 11:00 AM → LHR 10:15 PM (+1)        │
│ 13h 15m, 1 stop (DUB)                   │
├─────────────────────────────────────────┤
│ [Route Map]                             │
│ [Simple line showing SFO-DUB-LHR]       │
├─────────────────────────────────────────┤
│ [Expandable: Outbound Flight Details]   │
│ ┌────────────────────────────────────┐   │
│ │ San Francisco (SFO)                │   │
│ │ 11:00 AM - Terminal 3              │   │
│ │ United UA 901 | B777-300ER         │   │
│ │ 8h 00m flight time                 │   │
│ │ ▼ [Expand for amenities]           │   │
│ │ ✓ Wifi | ✓ Power | ✓ Meal | ✗ IFE│   │
│ │                                    │   │
│ │ [Stopover in Dublin]               │   │
│ │ DUB 7:15 PM - 9:45 PM (2h 30m)    │   │
│ │ Terminal 2                         │   │
│ │                                    │   │
│ │ London (LHR) +1                    │   │
│ │ 10:15 PM - Terminal 3              │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ Return Flight (same format)        │   │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Seat Selection Section]                │
│ ┌────────────────────────────────────┐   │
│ │ [Seat map visual - aircraft layout]│   │
│ │ ┌──────────────────────────────┐   │   │
│ │ │ ▢ ▢ ▢   ▢ ▢ ▢               │   │   │
│ │ │ ▢ ▢ ▢   ▢ ▢ ▢               │   │   │
│ │ │ 🟢 ▢ ▢   ▢ ▢ ▢ (Selected: 12A)  │   │
│ │ │ ▢ ▢ ▢   ▢ ▢ ▢               │   │   │
│ │ │ ▢ ▢ ▢   ▢ ▢ ▢               │   │   │
│ │ │        ^ Emergency row (+ $50)   │   │
│ │ │ Legend: ▢ Available  ▢ Occupied  │   │
│ │ │         🟢 Selected  ▢ Paid only │   │
│ └──────────────────────────────────┘   │
│ [Seat price: $0 (economy) or +$50]      │
│ [Change seat button]                    │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Ancillary Options]                     │
│ ☐ Baggage: 2 bags included              │
│ ☐ Meal upgrade: $45                     │
│ ☐ Seat selection: $50                   │
│ ☐ Priority boarding: $30                │
├─────────────────────────────────────────┤
│ [Price Breakdown]                       │
│ Base fare (1x): $899                    │
│ Taxes & fees: $220                      │
│ Seat (12A): +$0                         │
│ Ancillaries: +$0                        │
│ ─────────────────                       │
│ Total: $1,119                           │
│ [Continue to Booking] [Save trip]       │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Flight Summary Hero**
- Type: Shadcn Card with accent border
- Content: Airline logo + flight # + cabin class
- Route: "SFO 11:00 AM → LHR 10:15 PM (+1)" (bold times)
- Duration: "13h 15m" + stops info "1 stop (DUB)"
- Background: Subtle gradient (primary-50 to primary-100)

**2. Route Map**
- Type: Simple SVG or static image showing route
- Display: Three dots (departure, stop/s, arrival) connected by arc lines
- Labels: City codes + airport names
- Interactive (optional): Tap for airport info popup
- Height: ~100px, full width

**3. Segment Details (Expandable Sections)**
- Type: Shadcn Accordion or custom expandable card
- Each segment shows:
  - Origin city + departure time + terminal
  - Airline + flight # + aircraft type (B777-300ER)
  - Flight duration
  - Amenities icons (wifi, power, meal, IFE, entertainment)
  - Destination city + arrival time + terminal
- For multi-leg: Repeat format for each leg
- Tap to expand: Shows full segment itinerary

**4. Seat Map**
- Type: Interactive SVG or canvas showing aircraft cabin layout
- Visual elements:
  - Cabin layout: Realistic row × seat configuration
  - Seat colors: Green = selected, gray = available, dark gray = occupied, light gray = paid-only (extra charge)
  - Seat labels: Row numbers + seat letters (1A, 1B, etc.)
  - Special areas: Emergency exit rows (highlighted, price callout), lavatories (blocked), galley (blocked)
  - Responsive: Rotate to landscape for full-width map on mobile
- Interaction:
  - Tap seat to select (if available)
  - Selected seat shows price change (e.g., "+$50 for exit row")
  - Deselect by tapping again
  - Locked seats (occupied/paid-only) show tooltip on hover "This seat is taken"
- For families: Visual grouping of family seats with lock icon showing "Family seating locked"
- Pitch/width information: Display for premium cabins ("Extra legroom: 38 in pitch")

**5. Ancillary Options (Checkboxes)**
- Type: Shadcn Checkbox list or custom toggle cards
- Options displayed:
  - Baggage: "2 bags (23kg each) included" or "Add baggage +$45"
  - Meal upgrades: "Standard meal" or "Premium meal (+$45)"
  - Seat selection: If included, show "Included" or if extra, show "+$50"
  - Priority boarding: "+$30"
  - Lounge access: "+$25"
  - Other airline-specific add-ons
- Each option shows:
  - Checkbox or toggle
  - Description
  - Price (if applicable)
  - Info icon: Tap to see details (e.g., what's included in baggage)
- Default selections: Pre-checked based on persona (Alexandra auto-selects premium, Marcus auto-selects wifi, families auto-select extra baggage)

**6. Price Breakdown**
- Type: Shadcn Card (neutral background)
- Line items:
  - "Base fare (1 Adult): $899"
  - "Taxes & fees: $220"
  - "Seat (12A): $0" or "+$50"
  - "Ancillaries: $0" or "+$xxx" (sum of selected add-ons)
  - Divider line
  - **"Total: $1,119"** (largest text, primary color)
- Per-person vs. total: For multi-passenger, show both ("$899 per person × 2 = $1,798")
- Currency: Localized to user location

**7. CTA Buttons**
- Primary: "Continue to Booking" → SCR-007
- Secondary: "Save trip" (heart icon, optional)
- Button state: Disabled if no seat selected (for flights requiring seat selection)

**Interaction Patterns**

- **Tap seat:** Select seat (changes to green), price updates instantly
- **Tap checkbox (ancillary):** Check/uncheck, price updates instantly
- **Tap "Change seat":** Re-open seat map if seat already selected
- **Swipe left/right on segment cards:** Navigate between outbound/return legs (if multi-leg)
- **Pinch/zoom on seat map:** Zoom in/out for detail (mobile)
- **Tap info icon:** Show popover with additional details

**Data Requirements**

- Flight details: From Search Results selection (no new API call, pass selected flight ID)
- Seat map: Real-time from airline API (seat availability per flight)
- Ancillary options: From airline catalog (baggage policies, meal options)
- Pricing: Real-time (seat prices, ancillary pricing per airline)
- Offline: Show cached flight details; seat map and ancillary pricing unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Seat map highlights premium cabins (business class seat map). Default selections: premium meal, priority boarding, lounge access. Ancillary prices shown without hesitation (no "$45 add-on" framing, just "Premium meal: $45"). Seat selection emphasizes "Your usual: window seat, row 2, aisle access."
- **PERSONA-02 (Marcus):** Seat map shows aisle seats prominently (window secondary). Default selections: None (policy-only). Ancillary options highlight productivity (wifi free if policy allows, power seat emphasized). Show policy compliance badge "Compliant with your policy."
- **PERSONA-03 (Chen Family):** Seat map highlights family seating. Visual grouping shows 4 adjacent seats with lock icon "Family seating locked for 4 passengers." Ancillary options default to child meals and extra baggage. Pricing shows total (not per-person).

**Accessibility**

- Heading: h1 "Flight Details"
- Seat map: Keyboard navigable (arrow keys move focus between seats, Space/Enter to select, screen reader announces seat availability)
- Seat map for screen readers: Alternative table view showing all seats with availability status
- Checkboxes: Standard HTML checkboxes with associated labels
- Price breakdown: Structured as definition list (dl/dt/dd) for semantic clarity
- Touch targets: All interactive elements 44×44pt minimum
- Color: Seat map uses color + pattern differentiation (not just color)

**States & Edge Cases**

- **Seat selection required but user skips:** Show error toast "Please select a seat to continue" on CTA tap
- **Selected seat no longer available (race condition):** Show error "This seat was just taken. Please select another." and highlight alternatives
- **No seats available:** Show message "This flight is full. Please select a different flight."
- **Airline has pre-assigned seating:** Show all seats pre-selected with note "Seating assigned automatically. Change seating +$25."
- **Family size > cabin width (e.g., family of 5, aircraft is 3-seat width):** Show warning "Not all family members can sit together on this flight. See options: [Adjacent rows] [Split cabins]"
- **Baggage included in fare:** Show "2 bags (23kg each) included" checkbox, checked and disabled
- **International flight with multiple cabin segments:** Show seat map for each segment separately (e.g., SFO-DUB map, DUB-LHR map)

---

### SCR-007: Booking Flow / Checkout

**Purpose:** Complete booking with payment, final confirmation, and trip protection options. Streamlined checkout designed for rapid completion (Marcus target: <90 seconds).

**Entry Points:** Continue to Booking from Flight Detail (SCR-006)

**Exit Points:**
- Payment success → Booking Confirmation (notification/screen)
- Payment failure → Error handling, retry options
- Cancel → Flight Detail (SCR-006)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Complete Your Booking"]       │
│ [Progress indicator: 3 of 3 steps]      │
├─────────────────────────────────────────┤
│ [Step 1: Passenger Information]         │
│ [Section header + edit button]          │
│ Adult 1: Alexandra Mitchell             │
│   [Passport: US US12345678]             │
│   [✓ Passport valid]                    │
│                                          │
│ [Edit Passengers button]                │
│                                          │
├─────────────────────────────────────────┤
│ [Step 2: Contact & Preferences]         │
│ Email: alexandra@example.com            │
│ Phone: +1-415-555-0100                  │
│ ☑ Send confirmations to email           │
│ ☑ Enroll in loyalty program             │
│ [Edit Contact button]                   │
├─────────────────────────────────────────┤
│ [Step 3: Trip Protection & Payment]     │
│ [Section: Add Trip Protection]          │
│ ☐ Cancellation Insurance: $150          │
│   "Full refund if trip cancelled"       │
│ ☐ Baggage Insurance: $75                │
│ ☐ Weather Guarantee: $125               │
│ [Learn more about each]                 │
│                                          │
│ [Section: Payment Method]               │
│ ◉ Apple Pay                             │
│ ○ Credit Card                           │
│ ○ Debit Card                            │
│ ○ PayPal                                │
│ ○ Buy now, pay later                    │
│                                          │
│ [Chosen: Apple Pay]                     │
│ [Tap to change payment method]          │
│                                          │
│ [Section: Booking Summary]              │
│ Flight: United UA 901                   │
│ Date: Mar 30 - Apr 6, 2026              │
│ Passenger: 1 Adult                      │
│ Total: $1,119                           │
│ [All fees included]                     │
│                                          │
│ ☑ I agree to terms & conditions         │
│ ☑ I agree to privacy policy             │
│                                          │
│ [Complete Booking] [Cancel]             │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Progress Indicator**
- Type: Numbered steps (Step 1 of 3, Step 2 of 3, Step 3 of 3)
- Visual: Horizontal line with circle indicators (filled/completed, current/active, future/upcoming)
- Mobile: Centered number with step label; desktop: left-aligned horizontal line

**2. Passenger Information Section**
- Type: Collapsible/expandable card
- Content displayed: Name + passport info for each passenger
- Passport status: Green check "Valid" or red X "Expires in 30 days"
- Edit button: Opens modal to add/edit passengers (triggered: "Edit Passengers")
- Modal content:
  - Full name, date of birth, nationality
  - Passport number, expiration date
  - Add/remove passengers button (if multi-passenger)
  - Validate button: Checks passport expiration, warns if <6 months to expiration

**3. Contact & Preferences Section**
- Type: Collapsible/expandable card
- Content: Email, phone number (auto-filled from profile if available)
- Checkboxes:
  - "Send booking confirmations and updates to my email"
  - "Enroll me in [Airline] frequent flyer program" (auto-selected if not already enrolled)
  - "Send me deals and inspiration offers" (optional)
- Edit button: Opens form to update contact info

**4. Trip Protection Section**
- Type: Shadcn Card with white background
- Header: "Protect Your Trip (Optional)"
- Options displayed as cards with:
  - Checkbox (left)
  - Protection name + description
  - Price (right, primary color)
  - "Learn more" link (modal with full terms)
- Options:
  - **Cancellation Insurance** (~10-15% of ticket price): "Full refund if you cancel for any reason"
  - **Baggage Insurance** (~7% of ticket price): "Protection for lost or damaged baggage"
  - **Weather Guarantee** (~10% of ticket price): "Rebooking if weather disrupts travel"
  - **Assistance Services** (~5% of ticket price): "24/7 concierge support"
- Default selection (persona-specific):
  - Alexandra: Cancellation insurance pre-checked
  - Marcus: Weather guarantee pre-checked
  - Chen Family: Baggage insurance pre-checked
- Total insurance cost updates dynamically

**5. Payment Method Section**
- Type: Shadcn RadioGroup styled as option cards
- Options:
  - Apple Pay (icon)
  - Google Pay (icon)
  - Credit/debit card (logo)
  - PayPal
  - Buy now, pay later (Afterpay, Klarna, etc.)
- Selected option: Radio button filled, slight background highlight
- Tap to change: Switches payment UI accordingly

**6. Booking Summary Section**
- Type: Summary card (neutral background)
- Content:
  - Flight details (airline, route, dates)
  - Passengers (count + names)
  - Seat assignments (e.g., "12A, 12B, 12C, 12D")
  - Ancillaries (e.g., "Extra baggage, premium meal")
  - Base fare, taxes/fees, ancillaries, insurance (if selected)
  - **TOTAL in large text** (primary color, 20px+)
- Inline note: "All fees included — no hidden charges"
- Tap note for transparency modal showing fee breakdown

**7. Terms & Conditions**
- Type: Two checkboxes (required to proceed)
- Checkbox 1: "I agree to the airline's terms and conditions" (link to full terms)
- Checkbox 2: "I agree to AirThere's privacy policy and terms" (link to policies)
- CTA button disabled until both checked

**8. CTA Buttons**
- Primary: "Complete Booking" (large, full-width on mobile)
- Secondary: "Cancel" (text link or secondary button)
- Primary button state: Disabled until terms accepted

**Interaction Patterns**

- **Tap section header:** Toggle collapse/expand (remembers state)
- **Tap "Edit Passengers":** Open modal to edit passenger details
- **Tap insurance option checkbox:** Toggle selection, price updates instantly
- **Tap "Learn more":** Open modal with insurance terms and conditions
- **Tap payment method option:** Select payment, update payment UI below
- **Tap "Complete Booking":** Validate all required fields, submit payment (show loading spinner during processing)
- **Pull-to-refresh:** Reload booking summary with real-time pricing

**Data Requirements**

- Passenger data: From user profile (cached, editable on checkout)
- Contact info: From user profile (editable)
- Loyalty program enrollment: API call to airline (real-time)
- Insurance pricing: From trip cost (calculated locally based on base fare)
- Payment processing: Integration with Stripe, Apple Pay SDK, PayPal SDK (production)
- Offline: Show cached booking; payment unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Simplest checkout (3-step); all info pre-filled. Insurance defaulted to cancellation. Payment shows Apple Pay prominently (expect premium card). No explanations of fees (assumes understanding). Concise copy, luxury tone.
- **PERSONA-02 (Marcus):** Target <90 seconds. Policy compliance badges on every step. Loyalty enrollment pre-selected. Show estimated frequent flyer points earned. Payment options biased to fastest methods (Apple Pay, Google Pay). Copy emphasizes speed and control.
- **PERSONA-03 (Chen Family):** Explicit total cost display ("$4,476 total for 4 people"). All passengers editable (family coordination). Child info optional (age, dietary restrictions). Insurance defaulted to baggage. Payment shows financing options prominently (buy now, pay later). Extra confirmation step: "Family seating locked for 4 passengers - all together in seats 12A, 12B, 12C, 12D"

**Accessibility**

- Heading: h1 "Complete Your Booking"
- Progress indicator: Semantic HTML (ol/li or aria-current="step" on active step)
- Sections: Collapsible sections with aria-expanded state announcement
- Checkboxes: Associated labels, proper HTML input elements
- Payment options: RadioGroup with screen reader announcement of current selection
- Terms links: Keyboard accessible, open modals with focus management
- Touch targets: All buttons 44×44pt minimum
- Color: No color-only indicators (use icons, text, patterns)
- Motion: Collapse/expand animations respect prefers-reduced-motion

**States & Edge Cases**

- **Passenger passport expires soon:** Show warning "Passport expires Apr 15 - check visa requirements for destination"
- **Passenger under 18:** Show guardian consent checkbox
- **Contact info missing:** Show error "Email required to complete booking"
- **No payment method available:** Show message "Add a payment method to complete booking" → Settings
- **Payment declined:** Show error "Payment failed: Card declined. Try another payment method." with retry option
- **Cart timeout (>15 min):** Show message "Your cart expired. Prices may have changed. [Confirm and continue] [Go back to search]"
- **Multiple passengers, inconsistent info:** Show warning on step 1 "Review passenger information — some fields incomplete"
- **Insurance decline (all unchecked):** Show confirmation "You have declined all protections. Are you sure?" before submitting
- **Children without special meals selected:** Show suggestion "Your children are ages 7 and 10 — we recommend selecting kids' meals (+$0 included)"

---

(Continuing with SCR-008 through SCR-020 in next section due to length constraints)

### SCR-008: Trip Dashboard

**Purpose:** Central hub for all active trips showing itinerary, next actions, real-time status, documents, and coordination tools. Primary screen for pre-trip and travel day orchestration.

**Entry Points:** Tab bar "Trips" tap, tap trip card from Home, notification tap

**Exit Points:**
- Tap flight segment → Flight status detail
- Tap document → Document Vault (SCR-009)
- Tap airport info → Airport Live (SCR-010)
- Tap weather → Weather detail modal
- Back → Home (SCR-002)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Your Trips"]                  │
│ [Filter: Upcoming | Past]               │
├─────────────────────────────────────────┤
│ [ACTIVE TRIP CARD]                      │
│ San Francisco → London                  │
│ United UA 901 | Mar 30 - Apr 6         │
│ ┌────────────────────────────────────┐   │
│ │ [Next action banner]                │   │
│ │ ✅ Check-in: Available now          │   │
│ │ [Check In Now button]               │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ [Itinerary at a glance]             │   │
│ │ Depart SFO: Mar 30, 11:00 AM        │   │
│ │ Arrive LHR: Mar 31, 10:15 PM        │   │
│ │ Seat: 12A | Hotel: Verified         │   │
│ │ [Expand for full itinerary]         │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ [Weather & destination info]        │   │
│ │ London: 52°F, Cloudy                │   │
│ │ Best packing: Rain jacket needed    │   │
│ │ [View full forecast]                │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ [Documents status]                  │   │
│ │ ✓ Passport (expires Aug 2027)       │   │
│ │ ✓ Visa (UK)                         │   │
│ │ ✗ Travel insurance (upload)         │   │
│ │ [Manage documents]                  │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ [Packing checklist]                 │   │
│ │ ✓ Passport (6/8 items packed)       │   │
│ │ ◐ Travel size toiletries            │   │
│ │ ◯ Umbrella                          │   │
│ │ [View full checklist] [Mark ready]  │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ [Quick actions]                     │   │
│ │ [Airport info] [Lounge] [Support]   │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [PAST TRIP CARD]                        │
│ New York → San Francisco                │
│ Mar 22-24, 2026                         │
│ [Trip recap available] [Review again]   │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header with Trip Filter**
- Title: "Your Trips"
- Filter tabs: "Upcoming" (default), "Past"
- Tap to filter between active/past trips

**2. Active Trip Card**
- Type: Shadcn Card with colored left border (primary color)
- Route & dates: Large, bold text (SFO → LHR, Mar 30 - Apr 6)
- Airline + flight #: Secondary text
- Expandable sections:
  - Next action (top): Colored banner (green = completed, amber = upcoming, red = overdue)
  - Itinerary snapshot: Departure/arrival times, seat assignment, hotel status
  - Weather & local info: Current temp, conditions, packing recommendations
  - Documents status: Checkmarks for required docs, warnings for missing
  - Packing checklist: Progress bar (6/8 items), expandable list
  - Quick actions: Buttons for Airport info, Lounge finder, Support

**3. Next Action Banner**
- Type: Colored badge/chip (green for completed, amber for upcoming, red for overdue)
- Content: Icon + action text + timing
- Examples:
  - ✅ "Check-in: Available now" (green)
  - ⏳ "Check-in opens in 18 hours" (amber)
  - 🔴 "Passport expires in 30 days" (red)
- CTA: Tap to perform action (check in, upload document, etc.)

**4. Itinerary Snapshot**
- Type: Expandable card showing abbreviated itinerary
- Content:
  - Departure city + time + date
  - Arrival city + time + date
  - Seat assignment
  - Hotel confirmation status
  - Ground transportation status
- Tap to expand: Shows full segment details, flight amenities, hotel info
- Timeline indicator: Simple visual showing departure → arrival with current date marked

**5. Weather & Destination Info**
- Type: Card with current weather + destination insights
- Weather display: Icon + temp + conditions + "Best time to visit" tip
- Content:
  - Current weather at destination
  - Packing recommendation ("Rain jacket needed")
  - Cultural tips ("Tipping not expected in UK")
  - Currency info ("£1 GBP = $1.27 USD")
  - Emergency contacts (hospital, embassy, local police numbers)
- Tap "View full forecast": Navigate to weather detail screen

**6. Documents Status**
- Type: Expandable list with status indicators
- Each document shows: Icon + type + status (✓ Valid, ✗ Missing, ⚠ Expires soon)
- Documents tracked:
  - Passport (with expiration date)
  - Visa (with country)
  - Travel insurance
  - Vaccination records
  - Hotel confirmations
  - Car rental confirmations
- Tap missing document: Open Document Vault (SCR-009) to upload
- Red warnings for critical missing docs

**7. Packing Checklist**
- Type: Collapsible list with progress bar
- Display: "6 of 8 items packed" progress bar
- Items: Grouped by category (Documents, Clothing, Toiletries, Tech, etc.)
- Each item: Checkbox (click to toggle), item name, count (if applicable)
- Personalization: Checklist customized by destination weather and activity type
- Tap "View full checklist": Expand to show all items
- Tap "Mark ready": Quick mark-all-complete button

**8. Quick Action Buttons**
- Type: Horizontal row of secondary buttons
- Actions:
  - [Airport info] → Airport Live (SCR-010)
  - [Lounge] → Lounge Finder (SCR-020)
  - [Support] → Contact support (opens chat or modal)
  - [Disruption alert settings] (if available)

**9. Past Trip Card**
- Type: Shadcn Card (grayed background)
- Content: Route, dates, trip rating/review prompt
- CTA: "View trip recap" → Trip Recap (SCR-014) or "Book again" → Search with details pre-filled

**Interaction Patterns**

- **Tap section header:** Toggle expand/collapse
- **Tap next action banner:** Perform action (check-in, upload document)
- **Swipe trip card left:** Quick actions menu (archive trip, share, etc.)
- **Pull-to-refresh:** Reload trip status, weather, flight status, documents
- **Tap past trip card:** Navigate to Trip Recap (SCR-014)
- **Long-press trip card:** Context menu (share, export, archive)

**Data Requirements**

- Trip itinerary: From booking confirmation (cached, synced on refresh)
- Flight status: Real-time from airline API (polling every 30s on travel day, every 5min off-day)
- Weather: Real-time weather API for destination
- Documents: User-uploaded files (cached locally, encrypted)
- Packing checklist: AI-generated based on destination, duration, activity type
- Offline: Show cached trip info; weather, flight status unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Dashboard emphasizes lounge access, concierge services, upgrade opportunities. Next action prioritizes status upgrades. Weather emphasizes luxury amenities at destination. Documents section shows frequent traveler shortcuts (trusted traveler programs, biometric enrollment status).
- **PERSONA-02 (Marcus):** Dashboard emphasizes connection times, policy compliance, disruption alerts. Next action prioritizes productivity setup (wifi login, work space booking). Documents include corporate travel policy compliance. Packing emphasizes productivity items (laptop charger, cable adapters).
- **PERSONA-03 (Chen Family):** Dashboard emphasizes family seating confirmation, kid-friendly activities, bathroom locations. Next action prioritizes family checklist (all kids' documents ready, medications packed). Weather includes kid-specific packing ("Rain gear for all kids"). Packing checklist shows per-child items (medications, comfort items, entertainment).

**Accessibility**

- Heading: h1 "Your Trips"
- Trip cards: Tab through cards, Enter to expand
- Checkboxes: Standard HTML inputs with labels
- Progress bar: aria-valuenow, aria-valuemin, aria-valuemax announced
- Weather icon: Descriptive alt text ("Cloudy weather icon")
- Color: Status indicators use color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No upcoming trips:** Show empty state "No upcoming trips. Plan your next adventure." with CTA to Discover (SCR-003)
- **Trip on travel day:** Dashboard automatically shows "Today" badge, highlights next action prominently
- **Multiple overlapping trips:** Show as stacked cards, highlight current/next departure prominently
- **Critical document missing:** Show red banner at top "Missing required document: Passport"
- **Flight has disruption:** Show disruption banner prominently with rebooking options
- **Passport information expired:** Show warning "Passport expired - cannot travel. Contact support."

---

### SCR-009: Document Vault

**Purpose:** Secure encrypted storage and management of traveler documents: passports, visas, travel insurance, health records, boarding passes. Biometric-protected access, offline availability, automatic expiration warnings.

**Entry Points:** Tab bar "Trips" → Trip Dashboard → "Manage documents", onboarding setup

**Exit Points:**
- View document image
- Back to Trip Dashboard (SCR-008)
- Navigate to Share/Export options

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Document Vault"]              │
│ [🔒 Secured with biometric]             │
├─────────────────────────────────────────┤
│ [Status: All required docs present]     │
│ ✓ 5 documents | ⚠ 1 expiring            │
├─────────────────────────────────────────┤
│ [Passport & ID Section]                 │
│ ┌────────────────────────────────────┐   │
│ │ Passport: US US12345678            │   │
│ │ ✓ Valid until Aug 15, 2027         │   │
│ │ [Tap to view image]                │   │
│ │ [Delete] [Share]                   │   │
│ └────────────────────────────────────┘   │
│ [Driver's License]                      │
│ ✓ Valid until Dec 2028                  │
├─────────────────────────────────────────┤
│ [Travel & Insurance Section]            │
│ [Travel Insurance]                      │
│ ✓ Policy #12-34567-A                    │
│ Valid for SFO-LHR trip                  │
│ [Tap to view policy]                    │
│ [Vaccination Record]                    │
│ ✓ COVID-19 (2 doses, booster)           │
│ [Add more documents] [+]                │
├─────────────────────────────────────────┤
│ [Visa & Entry Section]                  │
│ [UK Visitor Visa]                       │
│ ✓ Valid until Mar 2031                  │
│ Allows: 6-month stay, multiple entry    │
│                                          │
│ [+ Add visa] [+ Add entry permit]       │
├─────────────────────────────────────────┤
│ [Boarding Passes Section]               │
│ [Boarding Pass: UA 901, Mar 30]         │
│ ✓ Seat 12A | Boarded: Yes               │
│ Barcode: |||||||||||||||||              │
│ [Share via email] [Add to wallet]       │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header with Security Status**
- Title: "Document Vault"
- Security badge: 🔒 "Secured with biometric — face ID"
- Subtitle: "Encrypted storage, available offline"

**2. Status Summary**
- Card showing overall status: "All required documents present" (green) or "1 document missing" (red)
- Metrics: Count of documents, expiration warnings
- Color coding: Green = all good, amber = expiring soon, red = expired or missing

**3. Document Sections (Categorized)**
- **Passport & ID:** Passport, driver's license, national ID
- **Travel & Insurance:** Travel insurance policies, health insurance, vaccination records
- **Visa & Entry:** Visas, entry permits, travel passes
- **Boarding Passes:** All boarding passes for active trips (auto-populated)
- **Hotel & Transportation:** Hotel confirmations, car rental agreements (optional)

**4. Individual Document Card**
- Type: Shadcn Card with status indicator
- Content:
  - Icon (passport, document, etc.)
  - Document type
  - Key identifier (passport #, policy #, etc.)
  - Expiration date + status (✓ Valid, ⚠ Expires in 30 days, ✕ Expired)
  - Actions: Tap to view, delete, share
- Colors: Green border for valid, amber for expiring, red for expired
- Tap to expand: Shows full details, preview image

**5. Add Document Button**
- Type: Secondary button with + icon per section
- Tap action: Opens camera/upload modal
- Guided UX: "Take a photo of your document" or "Upload from device"

**6. Document Preview Modal**
- Type: Full-screen modal when tapping document
- Content: Large image of document (zoomable)
- Actions (bottom): Delete, Share, Download (if allowed)
- Close: Back button or swipe down

**Interaction Patterns**

- **Tap document card:** Expand to show full details + image preview
- **Tap "+ Add document":** Open camera/file upload modal
- **Tap "Share":** Generate shareable link or email option
- **Tap "Add to wallet":** Save boarding pass to Apple Wallet (iOS)
- **Swipe left on card:** Quick delete (with confirmation)
- **Long-press card:** Context menu (delete, share, export)
- **Biometric unlock (first access):** Face ID / fingerprint required

**Data Requirements**

- Document images: Uploaded by user (stored encrypted, AES-256)
- Document metadata: Extracted via OCR (passport expiration, visa dates, etc.)
- Biometric authentication: Local device (Face ID / Touch ID)
- Offline access: Documents synced to device, accessible offline
- Encryption: At rest (AES-256) and in transit (TLS 1.3)

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Vault emphasizes trusted traveler program docs (GOES, Global Entry, Clear), priority boarding passes. Status shows loyalty program benefits. Security shown as premium feature ("white-glove security").
- **PERSONA-02 (Marcus):** Vault includes corporate travel authorization docs, expense receipts. Status shows policy compliance. Boarding passes auto-synced to calendar.
- **PERSONA-03 (Chen Family):** Vault shows all family members' documents. Status shows "All family members ready." Child vaccination records, parental consent forms included.

**Accessibility**

- Heading: h1 "Document Vault"
- Biometric unlock: Announces "Face ID required to access documents"
- Document cards: Keyboard navigable (Tab through, Enter to expand)
- Images: Zoomable for vision accessibility
- OCR extraction: Extracted text available to screen readers
- Color: Status uses color + text + icons

**States & Edge Cases**

- **Biometric not enrolled:** Show setup prompt "Enable biometric unlock for security"
- **Document image unclear:** Show warning "Document image is blurry. Retake for better OCR"
- **Passport expires in <6 months:** Show warning "Your passport may require 6+ months validity for visa applications"
- **Visa expired:** Show red warning "Your visa has expired. Cannot travel."
- **Boarding pass expired:** Show grayed-out card with "Trip completed" label
- **Offline access requested:** Show cached documents; upload unavailable
- **No documents added:** Show empty state "Add your first document" with camera/upload CTA

---

### SCR-010: Airport Live

**Purpose:** Real-time airport information and navigation during travel day. Displays gate/boarding status, security queue times, lounge locations, wayfinding, and flight tracking from gate through departure.

**Entry Points:** Tab bar (custom toggle on travel day) or notification tap during travel day, tap "Airport info" from Trip Dashboard

**Exit Points:**
- Tap lounge card → Lounge Finder (SCR-020)
- Tap gate info → expanded gate info
- Back to Home or Trips

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: Live Airport Info]             │
│ [Airport: San Francisco (SFO)]          │
│ [Time: 9:41 AM | Status: On time]       │
├─────────────────────────────────────────┤
│ [Next Flight Card]                      │
│ United UA 901                           │
│ Depart: 11:00 AM (1h 19m remaining)     │
│ Gate: C15 (confirmed)                   │
│ Boarding: 10:45 AM (25 min)             │
│ [Boarding progress bar: 12% boarded]    │
├─────────────────────────────────────────┤
│ [Quick Status - 3 columns]              │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Secur │ │Check │ │Bagg  │             │
│ │47 min│ │Done  │ │Ready │             │
│ │wait  │ │      │ │      │             │
│ └──────┘ └──────┘ └──────┘             │
├─────────────────────────────────────────┤
│ [Lounge Access]                         │
│ American Express Centurion Lounge       │
│ Terminal 3, Concourse C, Gate Level    │
│ Current wait: 8 min | Amenities: Full   │
│ [Get directions] [Check in]             │
├─────────────────────────────────────────┤
│ [Security & Immigration Info]           │
│ ☑ TSA PreCheck eligible                 │
│ Recommended checkpoint: PreCheck (47min)│
│ Standard lane also available (62 min)   │
│ [Get directions] [Real-time queue video]
├─────────────────────────────────────────┤
│ [Airport Navigation]                    │
│ [Map/list of nearby facilities]         │
│ • Family restroom (250 ft away)         │
│ • Water fountain (150 ft away)          │
│ • Charging station (400 ft away)        │
│ [View full airport map]                 │
├─────────────────────────────────────────┤
│ [In-Flight Services]                    │
│ ☑ WiFi: Setup guide [Link]              │
│ ☑ In-flight entertainment: Available    │
│ ☑ Meal service: 12:30 PM                │
│ ☑ Bathroom: Lavs #1, #2 forward         │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header with Airport Status**
- Airport name + code + current time + overall status
- Real-time updates (refreshes every 30s)

**2. Next Flight Card**
- Type: Hero card with flight details
- Content: Airline + flight #, departure time + countdown, gate assignment, boarding time, boarding progress bar
- Color: Green if on-time, amber if delayed, red if cancelled
- Progress bar: Visual showing boarding percentage

**3. Quick Status Cards**
- Type: 3-column grid (Security wait time, Check-in status, Baggage status)
- Each card: Icon + metric + status
- Tap for details (e.g., security card expands to show PreCheck option)

**4. Lounge Access Card**
- Type: Card showing accessible lounge(s)
- Content: Lounge name, location (terminal, concourse, gate level), current occupancy %, wait time
- Actions: [Get directions], [Check in online], [View amenities], [Modify access]
- Multiple lounges: Show all accessible lounges with current wait times

**5. Security & Immigration Section**
- Type: Expandable card
- Content:
  - Trusted traveler program status (GOES, Global Entry, TSA PreCheck)
  - Available security lanes + estimated wait times
  - Recommendation: "Use PreCheck lane for shortest wait (47 min vs 62 min)"
  - Immigration info (if international): Required docs, estimated wait
  - Real-time queue video (if available)
- Actions: [Get directions to security], [View video of current queue]

**6. Airport Navigation Section**
- Type: Map or list view
- Shows nearby facilities: Family restroom, water fountain, charging station, retail, dining, information desk, customer service
- Distance to each (e.g., "250 ft away")
- Tap facility: Get directions (turn-by-turn navigation)
- Accessibility features: Elevator locations, accessible restrooms, accessible parking

**7. In-Flight Services Section**
- Type: Checklist of available services
- Content:
  - WiFi: ☑ with setup guide link
  - In-flight entertainment: ☑ with entertainment guide link
  - Meal service: ☑ with timing
  - Bathroom: ☑ with locations
  - Power outlets: ☑ with seat info
  - Others: Duty-free, spa, shower (premium cabins)

**Interaction Patterns**

- **Pull-to-refresh:** Reloads flight status, queue times, lounge info (shows "Updated 2 min ago")
- **Tap lounge card:** Expands to show amenities, current occupancy; tap "Get directions" for turn-by-turn navigation
- **Tap security card:** Expands to show PreCheck eligibility, queue video, documentation checklist
- **Tap facility on map:** Navigates to wayfinding/directions
- **Real-time updates:** Flight status, gate changes, boarding updates sent as notifications + update in-app

**Data Requirements**

- Flight status: Real-time API from airline (polling every 30s)
- Gate assignment: Real-time from airport API
- Boarding status: Real-time from airline
- Security queue times: Real-time from TSA API (if available) or aggregated data
- Lounge info: Real-time occupancy data from lounge partners
- Airport map: Downloaded offline (GeoJSON), updated monthly
- WiFi setup: Pre-populated for airline (API guides)
- Offline: Show cached flight/gate info; real-time data unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Emphasizes lounge access, premium facilities, concierge availability. Highlights exclusive lounges, priority lane. WiFi setup de-emphasized (assumes premium WiFi already available).
- **PERSONA-02 (Marcus):** Emphasizes security/immigration efficiency, productivity facilities (quiet zones, work pods). Shows TSA PreCheck info prominently. WiFi setup + VPN connection tips provided.
- **PERSONA-03 (Chen Family):** Emphasizes family restrooms, nursing rooms, play areas, kid-friendly amenities. Shows family-specific facilities prominently. Accessibility features highlighted (elevators, family companions areas).

**Accessibility**

- Heading: h1 "Airport Live"
- Map: Keyboard navigable (arrow keys pan, +/- zoom), screen reader announces facility names and distances
- Real-time data: aria-live="polite" announces gate changes, boarding updates
- Queue video: Described audio available (or text description of current queue status)
- Color: Status uses color + text + icons
- Touch targets: All buttons/cards 44×44pt minimum

**States & Edge Cases**

- **Gate not yet assigned:** Show message "Gate assignment pending. Check back soon (usually 1 hour before departure)"
- **Flight delayed/cancelled:** Show red alert "Flight delayed 2 hours / Cancelled" with rebooking options
- **Boarding in progress:** Show "Boarding group 3 now boarding. Your group boards at 11:00 AM."
- **Biometric check-in available:** Show prompt "Use face ID for seamless boarding? [Enable]"
- **Security PreCheck not available at this airport:** Show standard lane info only
- **Offline:** Show cached gate/flight info; real-time updates unavailable

---

### SCR-011: Gate & Boarding

**Purpose:** Real-time boarding status and gate information for current/next flight. Displays boarding group position, gate details, connection alerts, and boarding progress. Primary screen during airport experience.

**Entry Points:** Airport Live card tap, notification during boarding, home screen gate banner tap

**Exit Points:** Back to Airport Live, after boarding confirmation

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Boarding Status"]             │
│ United UA 901 | Gate C15                │
├─────────────────────────────────────────┤
│ [Large Flight Progress]                 │
│ Departure in: 45 minutes                │
│ [Progress bar: 45% boarded]             │
│ Group 4 of 5 | You: Group 3             │
├─────────────────────────────────────────┤
│ [Boarding Timeline]                     │
│ 🟢 ◉ ◯ ◯ ◯                              │
│ Checked │ Security │ Gate │ Boarding │ Aboard
│  Done   │   Done   │ Wait │   Soon   │        │
│ 9:30 AM │ 9:45 AM  │      │          │       │
├─────────────────────────────────────────┤
│ [Boarding Group & Queue]                │
│ Your boarding group: 3                  │
│ Groups 1 & 2 currently boarding         │
│ Estimated time until your group: 12 min│
│                                          │
│ [Queue position indicator]              │
│ 🟦 🟦 🟦 ◼ ◼ ◼ ◼ (8 passengers ahead)    │
├─────────────────────────────────────────┤
│ [Gate Details]                          │
│ Gate: C15                               │
│ Terminal: 3                             │
│ Aircraft: Boeing 777-300ER              │
│ Seat: 12A (Pre-boarded? No)             │
│ [View seat map]                         │
├─────────────────────────────────────────┤
│ [Connection Alert (if applicable)]      │
│ ⚠️  Tight connection!                    │
│ Next flight departs DUB in 3h 15m       │
│ Walking time SFO-DUB: 2h 30m            │
│ Tight but achievable if on time         │
├─────────────────────────────────────────┤
│ [Audio Alert Settings]                  │
│ 🔊 Audio notification when group called │
│ ☑ Vibrate | ☑ Sound | ☐ Silent          │
├─────────────────────────────────────────┤
│ [Ready to Board]                        │
│ [Have passport ready]                   │
│ [Have boarding pass visible]            │
│ [Boarding position: 12A]                │
│ [I'm ready to board] [Need more time]   │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header**
- Airline + flight # + gate assignment
- Real-time updates for gate changes

**2. Departure Countdown**
- Large prominent timer: "Departure in 45 minutes"
- Progress bar showing percentage of time elapsed
- Visual color change: Green (>30 min), amber (15-30 min), red (<15 min)

**3. Boarding Timeline**
- Type: Visual timeline with 5 stages: Check-in → Security → Gate → Boarding → Aboard
- Completed stages: Green circle (✓)
- Current stage: Orange circle (●)
- Upcoming stages: Gray circles (◯)
- Each stage shows time completed (e.g., "9:30 AM")
- Visual progress from left (check-in) to right (aboard)

**4. Boarding Group & Queue**
- Type: Card showing:
  - Your boarding group (e.g., "Group 3")
  - Groups currently boarding (e.g., "Groups 1 & 2")
  - Estimated wait time until your group (e.g., "12 minutes")
  - Queue position visualization: Colored blocks showing people ahead (🟦 = boarding, ◼ = ahead in queue)
  - Tap to expand: See full queue breakdown by group

**5. Gate Details**
- Type: Card showing:
  - Gate number + terminal + concourse
  - Aircraft type (B777-300ER)
  - Seat assignment + pre-boarding status
  - Tap to view seat map, catering info, aircraft amenities

**6. Connection Alert (if applicable)**
- Type: Amber alert card (if connection time <90 minutes)
- Content:
  - Icon: ⚠️ "Tight connection"
  - Next flight details: Airline, flight #, departure airport + time
  - Walking time estimate from arrival gate
  - Verdict: Green ("Tight but achievable if on time") or red ("High risk of missing connection")
  - Action: [Request priority rebooking if miss connection] [Change flight]

**7. Audio Alert Settings**
- Type: Preference toggles (Vibrate, Sound, Silent)
- Tap to enable/disable audio notification when boarding group called
- Preview: "Tap to hear alert sound"

**8. Ready to Board Section**
- Type: Final checklist before boarding
- Items:
  - "Have passport ready"
  - "Have boarding pass visible"
  - "Boarding position: 12A"
- CTA buttons:
  - [I'm ready to board] — Confirms readiness, may trigger biometric boarding
  - [Need more time] — Notification if user delayed

**Interaction Patterns**

- **Pull-to-refresh:** Reloads boarding status, group position, gate assignment
- **Tap boarding group card:** Expands to show detailed group breakdown + queue position
- **Tap gate details:** Expands to show aircraft info, catering, amenities
- **Tap audio alert settings:** Changes notification preference
- **Tap "I'm ready to board":** Activates biometric boarding (if available) or shows digital boarding pass
- **Real-time notifications:** Gate changes, boarding group calls, connection alerts sent as push + in-app update

**Data Requirements**

- Boarding status: Real-time from airline API (polling every 30s)
- Gate assignment: Real-time from airline
- Boarding group position: Real-time calculation from airline data
- Queue position: Aggregated from airport sensors (if available) or estimated
- Connection info: From itinerary (if multi-leg)
- Offline: Show cached flight info; real-time boarding status unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Emphasizes premium boarding lane, lounge last-call notification, seat position confirmation. Biometric boarding highlighted as "seamless boarding."
- **PERSONA-02 (Marcus):** Emphasizes connection time adequacy, gate-to-gate walking time. Productivity notification: "You have 3 hours until boarding — work time available."
- **PERSONA-03 (Chen Family):** Emphasizes family boarding position (all family members same group), bathroom location reminder, kid entertainment recommendations during wait.

**Accessibility**

- Heading: h1 "Boarding Status"
- Boarding timeline: Semantic ordered list with screen reader announcement of completed stages
- Audio alert: Description of alert sound provided ("3-tone chime")
- Queue visualization: Text alternative provided ("8 passengers ahead of you")
- Color: Status uses color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **Gate not yet assigned:** Show "Gate assignment pending. Check again in 30 minutes."
- **Gate changed:** Show alert "Gate changed from C15 to D12" with new gate details + directions
- **Boarding started:** Show "Group 1 boarding now. Your group boards in ~25 minutes."
- **Connection missed:** Show alert "You've missed your connection. Rebooking options available." with link to SCR-013
- **Flight cancelled:** Show red alert "Flight cancelled" with rebooking options
- **Boarding complete:** Show "Boarding complete. Preparing for departure."
- **Biometric boarding unavailable:** Show alternative "Display digital boarding pass on watch/phone"

---

### SCR-012: In-Flight Experience

**Purpose:** Connected cabin dashboard alternative providing flight progress, cabin service status, entertainment, productivity tools, wellness features, and meal management during flight.

**Entry Points:** Automatically available once flight departs, or accessible from menu during flight

**Exit Points:** Back to home or other screens after landing

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "In Flight"]                   │
│ United UA 901 | SFO → LHR               │
├─────────────────────────────────────────┤
│ [Flight Progress Map]                   │
│ ✈ Current position over Atlantic        │
│ Altitude: 39,000 ft | Speed: 485 mph    │
│ Time remaining: 11h 34m                 │
│ Outside temp: -62°F                     │
├─────────────────────────────────────────┤
│ [Entertainment Hub]                     │
│ 🎬 Movies (847) | 🎮 Games (156)        │
│ 📺 TV Shows (523) | 🎵 Music (10,000+) │
│ [Browse entertainment] [Resume: Movie]  │
├─────────────────────────────────────────┤
│ [Meal & Beverage Service]               │
│ Service status: Beverage service 30 min │
│ Meal options: [View menu]               │
│ Your selection: Chicken pasta           │
│ [Modify order] [Special requests]       │
├─────────────────────────────────────────┤
│ [Cabin Service Status]                  │
│ Lavatory: Available (5 min wait)        │
│ Cabin attendant call: Available         │
│ Duty-free shopping: Available [Browse]  │
├─────────────────────────────────────────┤
│ [Wellness Features]                     │
│ 🚶 Movement: Stretch every 1h           │
│ 💧 Hydration: Drink water now           │
│ 😴 Sleep optimizer: Best sleep 2-4 AM   │
│ [View wellness tips]                    │
├─────────────────────────────────────────┤
│ [Productivity Mode]                     │
│ WiFi: Connected (87 Mbps)               │
│ [Email] [Calendar] [Documents] [Work]  │
│ Battery: 78% | Focus mode: On           │
├─────────────────────────────────────────┤
│ [Family Hub (if family travel)]         │
│ Zoe: Watching "Encanto"                │
│ Max: Playing trivia game                │
│ [Family chat] [Share moments]           │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Flight Progress Section**
- Type: Interactive map showing current position, altitude, speed, outside temperature, time remaining
- Tap to expand: Show full route map with current position marker
- Real-time updates: Every 30 seconds

**2. Entertainment Hub**
- Type: Grid of media categories (Movies, TV, Games, Music)
- Each category shows count + preview thumbnail
- Tap category: Navigate to entertainment library with browsing/search
- "Resume" section: Shows last-watched content with play button
- Parental controls (for families): Rating filters, watch history

**3. Meal & Beverage Service**
- Type: Card showing meal service status + current orders
- Content:
  - Service countdown: "Beverage service in 30 minutes"
  - Meal menu: [View menu] link
  - Current selection: Shows selected meal + timing
  - Actions: [Modify order], [Special requests], [Dietary accommodations]
- Status updates: As service progresses

**4. Cabin Service Status**
- Type: Status checklist
- Items:
  - Lavatory availability (e.g., "Available, 5 min wait")
  - Cabin attendant call button status
  - Duty-free shopping available
  - Other services (if applicable)

**5. Wellness Features**
- Type: Card with movement, hydration, sleep recommendations
- Content:
  - Movement reminder: "Stretch every hour" (with exercises)
  - Hydration: "Drink water now" (optimal timing based on flight duration)
  - Sleep optimizer: "Best sleep window 2-4 AM (local destination time)"
  - Actions: [View wellness tips], [Set reminders]

**6. Productivity Mode (for business travelers)**
- Type: Card showing:
  - WiFi status + speed + signal
  - Quick action buttons: [Email], [Calendar], [Documents], [Work mode]
  - Battery level + charging info
  - Focus mode toggle (suppresses non-critical notifications)
- Content: Optimized for laptop/tablet use

**7. Family Hub (for families)**
- Type: Card showing activity of all family members
- Content:
  - Each family member: Name + current activity (e.g., "Zoe: Watching Encanto")
  - Family chat: Quick messaging between family members
  - [Share moments]: Capture and share photos/memories
  - Family tracker: Shows seat locations (optional, privacy-controlled)

**Interaction Patterns**

- **Tap entertainment category:** Navigate to library with search/browse
- **Tap flight map:** Expand to full-screen interactive map
- **Pull-to-refresh:** Reloads flight progress, service status
- **Tap meal card:** Opens meal menu editor to modify order
- **Tap wellness tips:** Expands to show detailed exercises/recommendations
- **Tap family member:** Shows their profile + shared content
- **Auto-update:** Flight progress, service status, wellness alerts update in real-time

**Data Requirements**

- Flight progress: Real-time API from airline (aircraft tracking)
- Entertainment library: From airline IFE system (downloaded/cached)
- Meal service status: From airline crew data (real-time)
- Cabin service status: From airline systems + passenger input
- WiFi speed test: Real-time connectivity test
- Family activity: Synced across family member devices (privacy-controlled)
- Offline: Show cached entertainment library, wellness tips; real-time data unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Emphasizes premium meal options, spa/wellness services, concierge availability. Entertainment hub shows curated "premium selections." Productivity tools de-emphasized (assumes leisure).
- **PERSONA-02 (Marcus):** Emphasizes productivity tools (email, work mode, calendar), WiFi quality, meeting time management. Wellness focused on productivity (exercise for alertness, not relaxation). Entertainment secondary.
- **PERSONA-03 (Chen Family):** Emphasizes Family Hub prominently, kids' entertainment options, family coordination. Meal service shows child meal options. Wellness includes family activities (games, trivia) to entertain kids.

**Accessibility**

- Heading: h1 "In Flight"
- Flight progress map: Keyboard navigable (arrow keys pan, +/- zoom), described with text labels
- Entertainment library: Keyboard searchable, ratings/descriptions provided
- Meal menu: Screen reader announces options with prices and dietary info
- Wellness tips: Exercises described in text + video (with captions)
- Color: Status indicators use color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **WiFi unavailable:** Show "WiFi not available on this flight" in productivity section
- **Entertainment unavailable:** Show "Entertainment library loading..." with offline available content
- **Meal service cancelled (crew issue):** Show notification "Meal service delayed due to turbulence"
- **Child profile:** Show age-appropriate content filters automatically
- **Flight over ocean (no map data):** Show ocean background with altitude/speed/temp

---

### SCR-013: IROPS / Disruption Recovery

**Purpose:** Proactive disruption management and recovery options when flights are delayed, cancelled, or disrupted. Automatic rebooking suggestions, compensation info, hotel/transport vouchers, family-aware recovery.

**Entry Points:** Notification during disruption, automatic display on Home when disruption detected, manual access from Trips tab

**Exit Points:**
- Select rebooking option → Book new flight (SCR-006)
- View compensation → Compensation detail screen
- Back to Trips (SCR-008)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Flight Disrupted"]            │
│ United UA 901 | SFO → LHR               │
├─────────────────────────────────────────┤
│ [Disruption Alert]                      │
│ 🔴 FLIGHT CANCELLED                     │
│ Reason: Mechanical issue                │
│ Timestamp: 6:30 AM PT                   │
│ Original departure: 11:00 AM            │
├─────────────────────────────────────────┤
│ [Automatic Rebooking Triggered]         │
│ ✓ Analyzing options...                  │
│ ✓ Checking same-airline availability    │
│ ✓ Identifying best rebooking options    │
│ ⏳ 2 of 3 complete                      │
├─────────────────────────────────────────┤
│ [Rebooking Option 1 - Recommended]      │
│ United UA 902 (SAME AIRLINE)            │
│ SFO 1:00 PM → LHR 9:00 PM (+1)         │
│ Direct flight, better than original     │
│ Family seating: Locked for 4            │
│ [Book this option] [Details]            │
├─────────────────────────────────────────┤
│ [Rebooking Option 2]                    │
│ Virgin Atlantic VS 211                  │
│ SFO 6:00 PM → LHR 4:00 AM (+1)          │
│ 1 stop (DUB, 2h layover)                │
│ Airline credit: $200 available           │
│ [Book this option] [Details]            │
├─────────────────────────────────────────┤
│ [Additional Options]                    │
│ [See 3 more options] [All airlines]     │
├─────────────────────────────────────────┤
│ [Compensation & Rights]                 │
│ Your entitlement (EU261 / DOT / CA):    │
│ Cash compensation: $250-$400             │
│ Hotel if overnight: Included             │
│ Meals: Airline covers                    │
│ [Learn more about your rights]          │
├─────────────────────────────────────────┤
│ [Hotel & Transport Options]             │
│ Hotel: 4-star hotel 1 mile from airport │
│ Estimated cost: $180 (covered)          │
│ [Book hotel] [View options]             │
│                                          │
│ Transport: Rental car or ride-share     │
│ [Book transport]                        │
├─────────────────────────────────────────┤
│ [Support & Updates]                     │
│ Dedicated rebooking agent: [Chat]       │
│ Auto-updates via push + email           │
│ Your confirmation: [View booking]       │
│ [Accept this rebooking] [Decline]       │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Disruption Alert Header**
- Type: Large colored alert (red for cancellation, amber for delay >3h)
- Content: Disruption type (cancelled, delayed, gate change, connection missed), reason, timestamp, original details
- Visual emphasis: Large icon + bold text

**2. Automatic Rebooking Status**
- Type: Progress indicator showing rebooking analysis in progress
- Steps: "Analyzing options" → "Checking same-airline availability" → "Identifying best rebooking"
- Visual: Progress bar with checkmarks for completed steps
- Real-time updates: As new options identified

**3. Rebooking Option Cards**
- Type: Shadcn Card (top card highlighted as "Recommended")
- Each card shows:
  - Airline + flight # + cabin class
  - Route + times + duration
  - Stop info (if applicable)
  - Family seating status (if traveling with family)
  - Price difference (if additional cost required)
  - Compensation eligibility (if better than original)
  - Actions: [Book this option], [See details]
- Cards sorted: Recommended (best value + on-time + family-safe) first
- Show top 3, expandable to "See more options"

**4. Compensation & Rights Section**
- Type: Informational card
- Content:
  - Applicable regulations: EU261, DOT, CA regulations (jurisdiction-dependent)
  - Entitlements: Cash compensation range, hotel coverage, meal coverage
  - Eligibility conditions: Airline responsibility vs. force majeure
  - CTA: [Learn more] → Detailed explanation modal
- Tone: Clear, non-legal language

**5. Hotel & Transport Options**
- Type: Card showing booking options if overnight stay required
- Hotels: Star rating, distance from airport, free cancellation, [Book]
- Transport: Options (rental car, ride-share, rail), pricing, [Book]
- Note: "Airline will reimburse eligible costs"

**6. Support & Updates Section**
- Type: Card showing available support
- Options:
  - Dedicated rebooking agent [Chat]
  - Automatic push + email updates
  - Confirmation number [View booking]
- CTA: [Accept rebooking], [Request different option], [Decline and get voucher]

**Interaction Patterns**

- **Tap rebooking card:** Expands to show full details (seat map, amenities, etc.)
- **Tap "Book this option":** Confirms rebooking, shows confirmation
- **Tap "Learn more about rights":** Opens modal with compensation explanation
- **Pull-to-refresh:** Reloads disruption status, new rebooking options
- **Real-time notifications:** Automatic rebooking completion, option updates, hotel availability
- **Chat with agent:** Opens support chat for manual assistance

**Data Requirements**

- Disruption detection: Real-time from airline API + flight tracking service
- Rebooking options: Automatic search across same airline + partner airlines
- Family seating: Constraint on rebooking (must maintain family adjacency)
- Compensation calculation: Jurisdiction-based (EU261, DOT, CA regulations)
- Hotel availability: Real-time search (airline partner network)
- Transport availability: Real-time search (rental car, ride-share APIs)
- Offline: Show cached disruption info; rebooking options unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Emphasizes premium rebooking options (first-class alternatives), concierge handling, compensation eligibility. Hotels show luxury options. Compensation prominently displayed (higher entitlements for premium fares).
- **PERSONA-02 (Marcus):** Emphasizes rebooking speed (<90 second decision required), policy compliance of new flight, connection adequacy. Compensation secondary to speed. Auto-approval of recommended option if policy-compliant.
- **PERSONA-03 (Chen Family):** Emphasizes family seating guarantee in rebooking, child-friendly aspects (hotel amenities, meal coverage), family communication (all family members notified). Compensation and hotel clearly explained.

**Accessibility**

- Heading: h1 "Flight Disrupted"
- Disruption alert: Semantic structure (section with aria-live for dynamic updates)
- Rebooking options: Keyboard navigable (Tab through options, Enter to book)
- Compensation info: Clear language, definitions of terms, link to detailed explanation
- Color: Status uses color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No rebooking options available:** Show "No immediate rebooking available. Hotel and support provided." with manual rebooking agent CTA
- **Force majeure event (weather, natural disaster):** Show "This disruption is due to weather beyond airline control. Compensation may not apply." with explanation
- **Flight oversold:** Show "Flight oversold. Volunteers sought for compensation." with voluntary bump offers
- **Missed connection due to disruption:** Show automatic rebooking with next available flight + hotel if overnight
- **Family split during rebooking:** Show warning "New flight splits family across seating. [See alternative options]"
- **User declines all options:** Show "Voucher issued for $X. Contact airline for usage or cash conversion request."
- **Multiple disruptions (cascading):** Show cascading rebooking updates as each leg recovers

---

### SCR-014: Trip Recap / Post-Trip

**Purpose:** Automatic trip compilation with photos, memories, expense summary, loyalty points earned, and invitation to share/review. Engagement and retention tool post-trip.

**Entry Points:** Automatic after last flight lands, manual access from Trips tab (past trips), notification

**Exit Points:**
- Share trip → Social media/email
- Book similar trip → Search (SCR-004)
- View expense details → Expense detail screen
- Back to Trips (SCR-008)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Your Trip to London"]         │
│ Mar 30 - Apr 6, 2026 | 7 days           │
├─────────────────────────────────────────┤
│ [Hero: Trip highlights photo carousel]  │
│ [4 photos from trip, swipeable]         │
│ [Photo count: "24 memories captured"]   │
├─────────────────────────────────────────┤
│ [Trip Stats]                            │
│ ┌────────────────────────────────────┐   │
│ │ 2,847 miles flown                  │   │
│ │ 2 flights | 1 stop (Dublin)        │   │
│ │ 7 days away | 4 countries visited  │   │
│ │ 8 cities explored                  │   │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Expense Summary]                       │
│ Total spend: $4,476                     │
│ Flights: $2,234 | Hotel: $1,400         │
│ Meals & activities: $842                │
│ [View detailed breakdown]               │
├─────────────────────────────────────────┤
│ [Loyalty & Status]                      │
│ ✈ 2,847 miles earned (United)           │
│ 📍 12,500 status points earned          │
│ 🏨 2 hotel nights earned (Hilton)       │
│ [View loyalty dashboard]                │
├─────────────────────────────────────────┤
│ [Flight Experience Rating]              │
│ United UA 901: ⭐⭐⭐⭐ 4/5              │
│ "Excellent crew, smooth flight"         │
│ [Write full review] [View reviews]      │
├─────────────────────────────────────────┤
│ [Memory Timeline]                       │
│ [Date-sorted chronological feed]        │
│ Mar 30: Departed SFO 11:00 AM          │
│   [Photo] [Photo] [Moment caption]     │
│ Mar 31: Arrived London                 │
│   [Photo] [Photo] [Check-in at hotel]  │
│ Apr 2: Explored museums                │
│   [Photo] [Photo] [Review]             │
│ ...more memories...                     │
├─────────────────────────────────────────┤
│ [Share & Engagement]                    │
│ [Share trip] [Add to timeline]          │
│ [Send postcards] [Create album]         │
│ [Export as PDF] [Share with friends]    │
├─────────────────────────────────────────┤
│ [Book Again]                            │
│ Loved London? [Plan return trip]        │
│ Similar destinations: [Paris] [Rome]    │
│ [Book now] [Save for later]             │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Trip Header**
- Destination + dates + duration
- Persona tag if notable (e.g., "Biz Trip," "Family Vacation," "Solo Adventure")

**2. Photo Carousel**
- Type: Horizontal swipeable carousel of 4-8 trip photos
- Photos auto-collected from: Device gallery, flight WiFi uploads, social media shares, hotel check-ins
- Count: "X memories captured"
- Tap to expand full photo with caption
- Swipe for next photo

**3. Trip Stats**
- Type: Info card showing:
  - Total miles flown
  - Number of flights + stops
  - Days away
  - Countries visited (if international)
  - Cities explored
  - Carbon footprint (if available)
- Visual: Icons + numbers, responsive layout

**4. Expense Summary**
- Type: Card showing total + category breakdown (Flights, Hotels, Meals, Activities, Transport)
- Display: Total in large text, categories as stacked bar chart
- Tap to expand: Detailed breakdown by date and vendor
- Export option: [Export as PDF] for tax/reimbursement purposes

**5. Loyalty & Status**
- Type: Card showing loyalty earnings
- Content:
  - Airline miles earned (by airline if multi-airline trip)
  - Status points/tier progress
  - Hotel nights earned
  - Credit card points (if linked)
- Actions: [View loyalty dashboard] → Link to SCR-015 Profile

**6. Flight Experience Rating**
- Type: Quick rating prompt + expandable review section
- Content:
  - Airline + flight # + star rating (1-5 stars)
  - Optional short comment ("Excellent crew, smooth flight")
  - [Write full review] → Opens review text editor
  - [View other reviews] → Shows crowd-sourced ratings for same flight

**7. Memory Timeline**
- Type: Chronological feed of trip moments
- Content:
  - Date headers (Mar 30, Mar 31, etc.)
  - Photos grouped by date
  - Check-in moments (flight departure, hotel arrival, attractions)
  - Captions (auto-generated or user-added)
  - Tap to expand full photo + view related moments
- Scrollable: Full trip history

**8. Share & Engagement**
- Type: Action buttons for trip sharing
- Options:
  - [Share trip] → Social media, email, messaging
  - [Send postcards] → Digital postcards to friends/family
  - [Create album] → Curated photo album (printed or digital)
  - [Export as PDF] → Trip summary PDF
  - [Share with friends] → AirThere network sharing

**9. Book Again**
- Type: Suggestion card
- Content: Destination + "Loved this trip?" with [Plan return trip] or [Explore similar] options
- AI recommendations: Similar destinations based on trip characteristics
- CTAs: [Book now], [Save for later]

**Interaction Patterns**

- **Swipe photo carousel:** Navigate through photos
- **Tap photo:** Expand to full-screen view with caption + date + location
- **Tap expense category:** Expand to show breakdown by date/vendor
- **Tap loyalty item:** Navigate to Profile (SCR-015) for details
- **Tap star rating:** Open review editor
- **Tap moment card:** Show related photos + metadata
- **Tap share button:** Open share modal with social platform options
- **Tap "Plan return trip":** Navigate to Search (SCR-004) with destination pre-filled

**Data Requirements**

- Trip summary: From booking confirmation + trip itinerary
- Photos: Auto-collected from device gallery (if permitted) + user uploads
- Trip stats: Calculated from itinerary (miles from route, cities from itinerary)
- Expense data: From bookings + user-added expenses (if any)
- Loyalty earnings: From airline/hotel partner APIs
- Reviews: User-generated ratings and comments (stored locally)
- Offline: Show cached trip summary + downloaded photos; real-time updates unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Emphasizes luxury experiences, premium amenities (first-class, fine dining), concierge services. Sharing shows "Prestigious trips" curated view. Loyalty dashboard prominently displayed (elite status achievements).
- **PERSONA-02 (Marcus):** Emphasizes efficiency metrics (miles earned, status points, cost-per-mile). Expense breakdown detailed (corporate reimbursement tracking). Review focuses on productivity and service reliability.
- **PERSONA-03 (Chen Family):** Emphasizes family memories, kid moments, family bonding experiences. Photo carousel includes candid family photos. Sharing options include family group messaging. Loyalty shows "Family miles" pool.

**Accessibility**

- Heading: h1 "Your Trip to London"
- Photo carousel: Keyboard navigable (arrow keys), screen reader announces photo count and current photo
- Stats: Semantic structure (dl for definition list)
- Expense chart: Text alternative provided ("Flights: 50%, Hotels: 31%, Meals: 19%")
- Timeline: Chronological structure with date headers (h2 for each date)
- Color: Charts use color + text labels
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No photos captured:** Show "No photos found. [Upload photos] to create memories."
- **Single-day trip:** Show simplified stats (no "days away" metric)
- **Domestic trip:** Don't show "countries visited" metric
- **Trip still in progress:** Don't show full recap; show "Trip in progress - recap available after landing"
- **No expenses recorded:** Show "No expense data available. [Add expenses] manually."
- **Loyalty not linked:** Show "Link loyalty account to see earnings" with setup CTA

---

### SCR-015: Profile & Loyalty

**Purpose:** User profile management, loyalty program integration, preferences, account settings. Central hub for identity, status, and customization.

**Entry Points:** Tab bar "Profile" tap, settings access

**Exit Points:**
- Edit profile → Profile edit modal
- Manage loyalty → Loyalty detail screen
- Settings → Settings (SCR-017)
- Back to Home

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: Profile]                       │
│ [Edit profile button]                   │
├─────────────────────────────────────────┤
│ [Profile Card]                          │
│ [Avatar - biometric face OR initials]   │
│ Alexandra Mitchell                      │
│ Premier Member | Platinum Status        │
│ 🏆 Elite Frequent Flyer                 │
│ Member since: March 2023                │
├─────────────────────────────────────────┤
│ [Quick Stats]                           │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Miles │ │Hotel │ │Stats │             │
│ │342k  │ │345   │ │45    │             │
│ │earned│ │nights│ │trips │             │
│ └──────┘ └──────┘ └──────┘             │
├─────────────────────────────────────────┤
│ [Loyalty Program Integration]           │
│ ┌────────────────────────────────────┐   │
│ │ United Airlines                    │   │
│ │ Premier Platinum | 342,500 miles   │   │
│ │ Status expires: March 2024         │   │
│ │ [View details] [Manage account]    │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ Hilton Honors                      │   │
│ │ Platinum | 345 qualifying nights   │   │
│ │ Elite status expires: March 2024   │   │
│ │ [View details] [Manage account]    │   │
│ └────────────────────────────────────┘   │
│ [+ Add loyalty account]                 │
│ [Link more programs]                    │
├─────────────────────────────────────────┤
│ [Travel Preferences]                    │
│ Preferred airlines: United, Virgin, BA  │
│ Preferred cabin: Business class         │
│ Seat preference: Window, forward cabin  │
│ Meal preference: Vegetarian, no dairy   │
│ [Edit preferences]                      │
├─────────────────────────────────────────┤
│ [Stored Payment Methods]                │
│ ✓ Visa ending in 6411 (default)         │
│ ✓ Apple Pay                             │
│ [+ Add payment method]                  │
│ [Manage payment methods]                │
├─────────────────────────────────────────┤
│ [Biometric & Security]                  │
│ ✓ Face ID enrolled                      │
│ ✓ Biometric boarding enabled            │
│ [Re-enroll] [Disable]                   │
│ [Manage security settings] [View logs]  │
├─────────────────────────────────────────┤
│ [Account Settings]                      │
│ [Notifications & alerts]                │
│ [Privacy & data settings]               │
│ [Connected accounts]                    │
│ [Settings] → SCR-017                    │
├─────────────────────────────────────────┤
│ [Support & Legal]                       │
│ [Help center] [Contact support]         │
│ [Terms of service] [Privacy policy]     │
│ [Accessibility settings]                │
│ [About AirThere]                        │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Profile Header Card**
- Type: Large hero card with background image or gradient
- Content:
  - Avatar (biometric face if enrolled, or initials fallback)
  - Name + status tier (Premium Member, Platinum Status, etc.)
  - Elite badge if applicable
  - Member since date
- Action: [Edit profile] button opens edit modal

**2. Quick Stats**
- Type: 3-column grid showing top metrics
- Metrics: Miles earned, hotel nights, trips completed
- Tap to expand: Shows year-over-year comparison, trending

**3. Loyalty Program Cards**
- Type: Shadcn Card for each program (United, Hilton, etc.)
- Each card shows:
  - Program logo + name
  - Membership tier + metrics (miles, nights, points)
  - Status expiration date
  - Progress bar (miles to next tier)
  - Actions: [View details], [Manage account]
- Tap to expand: Full loyalty account details, recent transactions, redemption options
- "Add loyalty account" CTA: Link new programs

**4. Travel Preferences**
- Type: Expandable section showing preferred settings
- Content:
  - Preferred airlines (top 3)
  - Preferred cabin class
  - Seat preferences (window/aisle, forward/aft, legroom)
  - Meal preferences (dietary restrictions, cuisines)
  - Hotel preferences (chain, room type, amenities)
- Edit action: [Edit preferences] → Opens preference editor modal

**5. Stored Payment Methods**
- Type: List of saved cards + digital wallets
- Each method shows:
  - Type (Visa, Mastercard, Apple Pay, etc.)
  - Last 4 digits + expiration
  - Default indicator (radio button)
- Actions: [Set as default], [Edit], [Delete]
- Add button: [+ Add payment method]
- Warning: Cards with near-expiration show amber warning

**6. Biometric & Security**
- Type: Card showing security status
- Content:
  - Face ID enrollment status (✓ Enrolled or ○ Not enrolled)
  - Biometric boarding eligibility
  - Recent login locations + devices
  - [Re-enroll], [Disable], [View security logs]
- Actions open security detail modals

**7. Account Settings**
- Type: Link list to sub-settings screens
- Items:
  - Notifications & alerts → SCR-017
  - Privacy & data → SCR-017
  - Connected accounts (Google, Facebook, LinkedIn)
  - Settings (full settings) → SCR-017

**8. Support & Legal**
- Type: Link list
- Items:
  - Help center (FAQ, knowledge base)
  - Contact support (chat, email, phone)
  - Terms of service
  - Privacy policy
  - Accessibility settings
  - About AirThere (version, company info)

**Interaction Patterns**

- **Tap profile name:** Edit profile (name, photo, email, phone)
- **Tap loyalty card:** Expand to show full details + recent transactions
- **Tap "Add loyalty account":** Open modal to link new program (requires account #)
- **Tap "Edit preferences":** Open modal to customize all travel preferences
- **Tap payment method:** Edit or delete
- **Tap security item:** Show/change security setting (re-enroll biometric, review login locations)
- **Tap settings link:** Navigate to detailed settings screen

**Data Requirements**

- User profile: Stored in user account (name, email, avatar)
- Loyalty programs: Linked APIs to 15+ airline/hotel partners
- Travel preferences: User-configured (cached locally)
- Payment methods: Stored securely via Stripe (not stored in AirThere directly)
- Biometric data: Stored locally on device only (not synced to server)
- Security logs: Server-side storage of logins + device info
- Offline: Show cached profile + preferences; loyalty data may be stale

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Loyalty cards show multiple elite programs (Amex Platinum, Centurion, various airlines). Preferences emphasize first-class, premium amenities. Security features highlighted (trusted device management).
- **PERSONA-02 (Marcus):** Loyalty cards show business programs. Quick stats emphasize "Miles to next upgrade." Preferences show work email, standard seat, productivity amenities. Connected accounts include corporate tools (Salesforce, Slack).
- **PERSONA-03 (Chen Family):** Profile shows family members (parents + children). Loyalty shows family miles pool. Preferences show child meal options, family seating. Avatar may show family photo.

**Accessibility**

- Heading: h1 "Profile"
- Tabs/sections: Semantic structure with clear headings (h2)
- Edit button: Keyboard accessible, opens modal with focus management
- Payment list: Tab through methods, radio buttons for default selection
- Security section: Clear descriptions of security features, visual status indicators
- Color: Status indicators use color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No loyalty programs linked:** Show "Link your first loyalty account" prompt with CTA to add program
- **Multiple family members on account:** Show "Family mode" with ability to switch between profiles
- **Loyalty status about to expire:** Show amber warning "United Platinum expires in 30 days"
- **No payment methods saved:** Show "Add a payment method to save time at checkout"
- **Biometric not supported on device:** Hide biometric section, show alternative security options
- **Premium member with trial expiring:** Show "Premium ends in 7 days. [Renew or downgrade]"

---

### SCR-016: AI Copilot

**Purpose:** Conversational AI assistant (Copilot) providing task assistance, recommendations, information, and autonomous capabilities. Available across app via persistent chat button or full-screen interface.

**Entry Points:** Floating chat button (always visible), home screen copilot card, voice activation

**Exit Points:**
- Close copilot → Return to previous screen
- Tap result → Navigate to relevant screen (Search, Trip, etc.)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: Close]                         │
│ AirThere Copilot                        │
├─────────────────────────────────────────┤
│ [Chat history]                          │
│ AirThere Copilot:                       │
│ "Hi Alexandra! Ready to find your       │
│  next adventure? I can help you search  │
│  flights, manage trips, or answer       │
│  travel questions."                     │
│ [Quick suggestion buttons]              │
│ [Search flights] [View trips] [Help]    │
│                                          │
│ User: "Find me flights to Paris next    │
│ week"                                   │
│                                          │
│ Copilot:                                │
│ "I found 23 flights from SFO to CDG     │
│  next week. Here are my top 3:          │
│  1. Air France 301 (direct, $899)       │
│  2. United 456 (1 stop, $799)           │
│  3. Delta 789 (direct, $920)"           │
│ [Show all results] [Book one of these]  │
│                                          │
│ User: "Actually, I want business class" │
│                                          │
│ Copilot:                                │
│ "Got it! Filtering for business class.  │
│  I found 8 business class options.      │
│  Most affordable: Air France 301 at     │
│  $2,450. Most convenient: United 456    │
│  at $2,550. [View details] [Book]"      │
├─────────────────────────────────────────┤
│ [Input field with microphone button]    │
│ ┌────────────────────────────────────┐   │
│ │ Ask me anything...               │ 🎤│
│ └────────────────────────────────────┘   │
│ [Send button / Voice input active]      │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Copilot Header**
- Title: "AirThere Copilot"
- Status indicator: "Ready to help" or "Thinking..." (while processing)
- Close button: Dismisses copilot overlay

**2. Chat History**
- Type: Scrollable conversation thread
- Messages styled as chat bubbles:
  - **Copilot messages** (left-aligned, primary color background, white text):
    - Greeting message (first interaction)
    - Responses to user queries
    - Suggested actions [buttons]
  - **User messages** (right-aligned, neutral background):
    - User text input
    - Voice transcription (if voice input used)

**3. Message Content**
- Type: Rich text with inline actions
- Content types:
  - **Text responses:** Natural language answers
  - **Search results:** List format with cards (flights, hotels, etc.)
  - **Action suggestions:** Inline buttons ([Book], [View details], [Modify search])
  - **Confirmations:** "I've booked flight XX901 for you. [View booking] [Modify]"
  - **Handoff to UI:** "I can help you manage disruptions. [Open IROPS manager]"

**4. Quick Suggestion Buttons**
- Type: Shadcn Button variant (outlined, small)
- Appear during:
  - Initial greeting: [Search flights], [View trips], [Help]
  - After user query: Contextual suggestions ([Modify search], [See more], [Book now])
- Tap action: Sends suggestion as user message, copilot responds

**5. Input Field**
- Type: Shadcn Input + send button + voice button
- Placeholder: "Ask me anything..." or "Tell me about your trip..."
- Voice button: Tap to record speech, auto-transcribes
- Send button: Submits text or voice input
- Text input supports multiple lines (Shift+Enter for newline)

**6. Input State Indicators**
- Loading state: "Copilot is thinking..." spinner
- Voice recording: Animated waveform, time counter, "Listening..." text
- Error state: "Couldn't understand. Try again?" with retry button

**Interaction Patterns**

- **Type message:** Natural language flight search, trip questions, recommendations
- **Tap suggestion button:** Sends button text as user message
- **Tap voice button:** Starts voice recording (visual feedback), tap again to stop
- **Tap link in copilot message:** Navigate to relevant screen (Search, Trip, Booking, etc.)
- **Long-press message:** Copy text, share, flag as helpful/unhelpful
- **Swipe up on copilot:** Collapse to minimize (shows floating button)

**Data Requirements**

- NLP intent recognition: Cloud-based (identifies search, booking, management intents)
- Flight search: Same backend as SCR-004
- Trip management: Accesses user's trip data
- Conversation history: Stored locally + server sync (enables conversation resumption)
- Voice transcription: Cloud-based speech-to-text API
- Offline: Text input and stored history available; live copilot responses unavailable

**Supported Copilot Tasks**

- **Search & Booking:** "Find flights to Tokyo under $1,500" → Executes search, shows results
- **Trip Management:** "What time is my next flight?" → Retrieves from Trip Dashboard
- **Recommendations:** "Suggest weekend getaways near SF" → Returns destination recommendations
- **Account Management:** "Link my United account" → Guides through loyalty linking
- **Disruption Help:** "My flight is delayed. What are my options?" → Shows rebooking options
- **Autonomous Booking:** "Book me flights to NYC next Tuesday" → Initiates booking with confirmation
- **Status Checks:** "Is my flight on time?" → Real-time status lookup
- **Information:** "What's the weather in Paris?" → Destination information
- **Support:** "How do I get a refund?" → Support guidance + escalation options

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Copilot uses premium tone, emphasizes concierge-like service. Autonomous booking with higher autonomy threshold (auto-approves trusted scenarios). Suggests luxury alternatives.
- **PERSONA-02 (Marcus):** Copilot emphasizes speed and efficiency ("Booking in <90 seconds"). Policy compliance warnings. Autonomous approval for compliant bookings. Efficiency metrics highlighted.
- **PERSONA-03 (Chen Family):** Copilot addresses family needs (seating, meals, activities). Family-aware responses ("Perfect for families with kids aged 7-10"). Asks family coordination questions ("Who's traveling with you?").

**Accessibility**

- Heading: h1 "AirThere Copilot"
- Chat history: Semantic structure (article with role="log"), screen reader announces new messages
- Messages: Clear speaker identification (Copilot vs. User)
- Buttons: Keyboard accessible (Tab through, Space/Enter to activate)
- Voice input: Visual feedback during recording, transcript display for confirmation
- Color: Message backgrounds provide contrast (not color-only differentiation)
- Motion: Voice animation respects prefers-reduced-motion

**States & Edge Cases**

- **First-time copilot user:** Show tutorial ("You can ask me to search flights, manage your trip, or answer questions")
- **Copilot uncertain of intent:** "I'm not sure what you mean. Could you rephrase? Or try: [Search flights], [View trips], [Get help]"
- **Copilot detects ambiguity:** "You mentioned Paris — did you mean Paris (CDG) or Ontario? Or other Parises?"
- **Voice transcription low-confidence:** "I heard something like 'flights to Paris.' Is that right? [Yes] [No, retry]"
- **User requests autonomous booking:** "I'll book SFO-CDG for you. Is this correct? [Confirm] [Cancel]"
- **Copilot in autonomous mode after trust earned:** Auto-books and confirms retroactively ("Flight booked: SFO-CDG next Tuesday. [View booking]")
- **Network error during copilot query:** "I'm having trouble connecting. [Retry] [Try again later]"
- **User escalates to human support:** "Connecting you with a travel agent..." → Opens support chat

---

### SCR-017: Settings & Preferences

**Purpose:** Comprehensive settings interface for notifications, privacy, data, accessibility, connectivity, and advanced options.

**Entry Points:** Profile (SCR-015) → Settings, gear icon from header (if available)

**Exit Points:**
- Back to Profile (SCR-015)
- Navigation to specific settings category

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Settings"]                    │
│ [Search settings: "Find setting..."]    │
├─────────────────────────────────────────┤
│ [Settings sections:]                    │
├─────────────────────────────────────────┤
│ Notifications & Alerts                  │
│ ☑ Push notifications                    │
│ ☑ Email updates                         │
│ ☑ Flight status alerts                  │
│ ☑ Deals and offers                      │
│ ☑ Disruption alerts (high sensitivity)  │
│ [Manage notification preferences] →     │
├─────────────────────────────────────────┤
│ Privacy & Data                          │
│ ☑ Personalization (uses your history)  │
│ ☑ Marketing communications              │
│ ☐ Third-party analytics                 │
│ [Data rights & GDPR requests] →         │
│ [Delete my account] →                   │
├─────────────────────────────────────────┤
│ Accessibility                           │
│ ☑ High contrast mode                    │
│ ☑ Larger text                           │
│ Large text size: 18px ▾                 │
│ ☑ Reduce motion                         │
│ ☑ Screen reader support                 │
│ [Accessibility guide] →                 │
├─────────────────────────────────────────┤
│ Connectivity & Offline                  │
│ ☑ Sync in background                    │
│ ☑ Download offline maps                 │
│ ☑ Cache trip documents                  │
│ [Manage offline storage] →              │
│ Offline storage used: 245 MB / 1 GB     │
├─────────────────────────────────────────┤
│ Biometric & Security                    │
│ ☑ Face ID for app unlock                │
│ ☑ Biometric payment confirmation        │
│ ☑ Biometric document access             │
│ [View login activity] →                 │
│ [Trusted devices] →                     │
│ [Security log] →                        │
├─────────────────────────────────────────┤
│ Display & Theme                         │
│ Theme: Auto (follows system) ▾          │
│ ☑ Dark mode                             │
│ Default font size: Regular ▾            │
│ Prefer reduced motion: On ▾             │
├─────────────────────────────────────────┤
│ Language & Region                       │
│ Language: English ▾                     │
│ Region: United States ▾                 │
│ Timezone: Pacific (UTC-7) ▾             │
│ Currency: USD ▾                         │
├─────────────────────────────────────────┤
│ Help & About                            │
│ [FAQ / Knowledge base] →                │
│ [Contact support] →                     │
│ [Terms of service] →                    │
│ [Privacy policy] →                      │
│ [Version: 2.4.1 (Build 847)]            │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Settings Search**
- Type: Shadcn Input field at top
- Placeholder: "Find setting..."
- Functionality: Real-time search/filter of all settings
- Results: Highlight matching settings, scroll to first match

**2. Notification Settings Section**
- Type: Expandable section with toggles
- Toggles:
  - General push notifications (on/off)
  - Email notifications (on/off)
  - Flight status alerts (on/off)
  - Deals and offers (on/off)
  - Disruption alerts + sensitivity level (low/medium/high)
- Each toggle has description ("Get push notifications for important updates")
- [Manage detailed preferences] → Advanced notification settings

**3. Privacy & Data Section**
- Type: Expandable section with toggles
- Toggles:
  - Personalization (uses history for recommendations, on/off)
  - Marketing communications (on/off)
  - Third-party analytics (on/off)
  - Location services (on/off/only-in-use)
- Links:
  - [Data rights & GDPR requests] → Self-service GDPR/CCPA request form
  - [Delete my account] → Account deletion flow with confirmation
- Description: Clear privacy-first messaging

**4. Accessibility Section**
- Type: Expandable section
- Toggles:
  - High contrast mode
  - Larger text
  - Reduce motion
  - Screen reader optimization
- Selectors:
  - Text size: Slider or buttons (Small, Regular, Large, XL)
  - Focus visibility: On/off
- Links:
  - [Accessibility guide] → Comprehensive accessibility documentation
  - [Report accessibility issue] → Feedback form

**5. Connectivity & Offline Section**
- Type: Expandable section
- Toggles:
  - Background sync
  - Download offline maps (when traveling)
  - Cache trip documents (for offline access)
- Info:
  - Offline storage usage (e.g., "245 MB / 1 GB used")
  - Last sync time (e.g., "Synced 2 minutes ago")
- Links:
  - [Manage offline storage] → View cached data, clear cache

**6. Biometric & Security Section**
- Type: Expandable section
- Toggles:
  - Face ID for app unlock
  - Biometric payment confirmation
  - Biometric document access
- Links:
  - [View login activity] → List of logins with device, location, time
  - [Trusted devices] → Manage devices that don't require re-authentication
  - [Security log] → Full audit log of account changes
  - [Two-factor authentication] → Setup/manage 2FA

**7. Display & Theme Section**
- Type: Expandable section
- Selectors:
  - Theme: Auto (follows system), Light, Dark
  - Font size: Regular, Large, XL
- Toggle:
  - Prefer reduced motion (respects system setting, can override)
- Description: "Affects all text and UI elements"

**8. Language & Region Section**
- Type: Expandable section
- Selectors:
  - Language: Dropdown (English, Spanish, French, German, Japanese, etc.)
  - Region: Dropdown (country)
  - Timezone: Dropdown (auto-detect available)
  - Currency: Dropdown (changes price displays)
- Info: "Changes interface language, date/time format, currency display"

**9. Help & About Section**
- Type: Link list (bottom)
- Links:
  - [FAQ / Knowledge base]
  - [Contact support]
  - [Terms of service]
  - [Privacy policy]
  - [Accessibility statement]
  - [Software licenses]
- App info: "Version 2.4.1 (Build 847)"

**Interaction Patterns**

- **Tap toggle:** Toggle on/off, immediate effect
- **Tap dropdown:** Open selector menu with current selection highlighted
- **Search:** Type to filter settings, matching settings highlighted
- **Tap section header:** Collapse/expand that section
- **Tap link:** Navigate to detail screen (login activity, trust devices, etc.)
- **Save:** Changes auto-save (no explicit save button needed)

**Data Requirements**

- User preferences: Stored in user account (synced across devices)
- Notification settings: Device-specific (iOS/Android push permissions)
- Offline data: Local device storage only
- Security log: Server-side audit log
- Offline: Settings shown from cache; changes synced when online

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Notification preferences set to "High sensitivity" by default. Biometric security emphasized. Privacy controls prominent (do not share data).
- **PERSONA-02 (Marcus):** Notifications default to business-critical only (disruptions, bookings). Offline storage set to maximize (needs offline access during travel). Time zone/calendar integration emphasized.
- **PERSONA-03 (Chen Family):** Family-oriented settings grouped. Content filters prominent (child-appropriate content). Location services for family tracking. Accessibility settings expanded (larger text, high contrast available).

**Accessibility**

- Heading: h1 "Settings"
- Search field: Keyboard searchable, results announced
- Toggles: Standard HTML checkboxes with labels
- Selectors: Dropdowns/radio groups keyboard navigable
- Section headers: h2 tags for semantic structure
- Color: Color not only indicator of toggle state (use icons, text)
- Touch targets: All buttons/toggles 44×44pt minimum

**States & Edge Cases**

- **Biometric not supported:** Hide biometric section, show "Not available on this device"
- **Location services disabled:** Show "Enable location in system settings to use location features"
- **Offline storage full:** Show warning "Offline storage full. [Manage storage] to free space"
- **Account deletion requested:** Show confirmation flow "This will permanently delete your account and all data. This cannot be undone. [Confirm deletion]"
- **Privacy request (GDPR/CCPA):** Show status "Your data request is being processed. [Track status]"
- **Settings search no results:** Show "No settings match 'xyz'. [Contact support for help]"

---

### SCR-018: Family Hub

**Purpose:** Shared trip planning and coordination space for family travelers. Allows all family members to contribute preferences, share documents, view shared trip status, and communicate during travel.

**Entry Points:** Trip Dashboard → Family Hub tab, onboarding for family travelers

**Exit Points:**
- Back to Trip Dashboard (SCR-008)
- View shared documents → Document Vault (SCR-009)

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Family Hub"]                  │
│ Trip: London | Mar 30 - Apr 6           │
│ Family: Amy, David, Zoe (10), Max (7)   │
├─────────────────────────────────────────┤
│ [Shared Trip Status]                    │
│ ✓ Flight booked                         │
│ ✓ Hotel confirmed                       │
│ ✓ All documents uploaded                │
│ ⏳ Packing: 18% complete                 │
│ ⏳ Itinerary: 40% planned                │
│ [View full checklist]                   │
├─────────────────────────────────────────┤
│ [Family Members & Tasks]                │
│ Amy (Organizer)                         │
│ ✓ Book flights (done)                   │
│ ✓ Book hotel (done)                     │
│ ⏳ Collect passports                     │
│ ⏳ Plan itinerary                        │
│ [Reassign task] [Send reminder]         │
│                                          │
│ David                                   │
│ ✓ Approve budget                        │
│ ⏳ Book ground transportation            │
│ [Send reminder]                         │
│                                          │
│ Zoe (Age 10)                            │
│ ✓ Passport uploaded                     │
│ ⏳ Choose attractions                    │
│ ◯ Pack belongings                       │
│ [Send reminder]                         │
│                                          │
│ Max (Age 7)                             │
│ ◯ Passport uploaded (help needed)       │
│ ⏳ Choose attractions                    │
│ ◯ Pack belongings                       │
│ [Send reminder]                         │
├─────────────────────────────────────────┤
│ [Shared Documents]                      │
│ ✓ Passport (all 4 members)              │
│ ✓ Visas (all adults)                    │
│ ⚠ Max's passport (needs upload)         │
│ ✓ Travel insurance                      │
│ ✓ Hotel confirmation                    │
│ [View all documents] [Upload missing]   │
├─────────────────────────────────────────┤
│ [Shared Itinerary]                      │
│ Attractions voted on:                   │
│ • Big Ben tour - Amy ✓, David ✓, Zoe ✓ │
│ • Westminster Abbey - Amy ✓, Zoe ✓      │
│ • Tower of London - All ✓✓✓✓            │
│ • West End show - Amy ✓, David ✓        │
│ [Add more attractions] [Vote]           │
│ [View full itinerary plan]              │
├─────────────────────────────────────────┤
│ [Family Chat]                           │
│ Amy: "Can everyone confirm their        │
│  passport dates? Need by Sunday."       │
│ David: "Just sent mine"                 │
│ Zoe: "Got mine. What time do we leave? │
│ Max: "I'm excited!!! 🎉"                │
│ [Type message...] [Send]                │
│ [View full conversation]                │
├─────────────────────────────────────────┤
│ [Trip Updates & Notifications]          │
│ Amy initiated trip planning             │
│ David joined trip                       │
│ Zoe joined trip                         │
│ Max joined trip                         │
│ Amy: Flight booked                      │
│ David: Hotel approved                   │
│ [View all updates]                      │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Trip Header**
- Destination, dates, family members listed
- Organizer badge for trip creator

**2. Shared Trip Status**
- Type: Progress checklist showing overall trip readiness
- Items: Flight booked, hotel confirmed, documents, packing, itinerary
- Progress bars: Visual completion percentage
- [View full checklist] → Detailed task breakdown

**3. Family Members & Tasks**
- Type: Expandable cards for each family member
- Each card shows:
  - Member name + age (if child)
  - Role badge (Organizer, Member)
  - Task list: Checkboxes showing completion status
  - Actions: [Reassign task], [Send reminder], [Message]
- Task list dynamically updated as members complete tasks
- Task assignment: Click task to reassign to different member

**4. Shared Documents**
- Type: List of required/shared documents
- Each document shows:
  - Document type (Passport, Visa, Insurance)
  - Status indicators (✓ all complete, ⚠ missing from X member, ○ not started)
  - Family member status (checkmarks showing who's uploaded)
- Actions: [View all documents], [Upload missing]
- Tap to expand: Shows which members have uploaded

**5. Shared Itinerary**
- Type: List of attractions/activities with voting
- Each item shows:
  - Activity name
  - Votes from each family member (✓ for yes, ○ for no/undecided, ✕ for no interest)
  - Vote count (e.g., "All 4 interested")
- Actions: [Add more attractions] → Opens modal to suggest attractions
- Voting: Tap checkmark to vote yes/no/maybe
- [View full itinerary plan] → Detailed day-by-day itinerary editor

**6. Family Chat**
- Type: Simple messaging thread for family coordination
- Messages: Text only (emojis supported), no images/attachments
- Sender display: "Amy", "David" with avatar or initials
- Read receipts: Optional (off by default)
- Notifications: Can be configured per member
- Input: Text field + send button
- [View full conversation] → Full chat history screen

**7. Trip Updates & Notifications**
- Type: Activity log showing trip progress
- Entries: "Amy initiated trip", "David joined", "Flight booked", "Zoe uploaded passport"
- Timestamp: Relative time ("2 hours ago")
- Chronological order: Newest first
- [View all updates] → Full activity feed

**Interaction Patterns**

- **Tap family member card:** Expand to show more details + history
- **Tap task checkbox:** Mark task complete/incomplete, send notification to other members
- **Tap document status:** Show which members have/haven't uploaded
- **Tap attraction vote:** Change vote (yes/no/maybe)
- **Type message:** Send in family chat, notifies all members
- **Tap reminder button:** Send reminder notification to that member
- **Pull-to-refresh:** Reload shared status, chat messages, updates

**Data Requirements**

- Trip data: Shared across family member accounts (real-time sync)
- Task assignments: Stored per trip (includes due dates if applicable)
- Documents: Shared folder in Document Vault (SCR-009)
- Chat messages: Stored per trip, visible to all family members
- Activity log: Server-side audit of trip events
- Offline: Show cached trip data + chat; updates unavailable

**Persona Adaptations**

- **All personas with families:** Family Hub is primary interface for trip coordination
- **Amy (family organizer):** Prominently featured; task assignment controls
- **David (supporting adult):** Can approve/delegate tasks
- **Children (Zoe, Max):** Simplified interface (voting on attractions, sharing messages)

**Accessibility**

- Heading: h1 "Family Hub"
- Family member cards: Keyboard navigable
- Tasks: Checkboxes with labels
- Voting interface: Radio buttons or toggles
- Chat: Semantic message structure (article/role="log")
- Color: Status indicators use color + text + icons
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **Solo traveler (no family):** Family Hub hidden or shows "No family members yet"
- **Child under 13:** Show simplified interface (no ability to book/pay, voting only)
- **Family member not yet joined trip:** Show invitation link ("Invite David with code LONDON2024")
- **Chat disabled by organizer:** Show message "Chat disabled for this trip"
- **Document not required:** Show greyed-out with "Not needed for this trip"
- **All tasks complete:** Show celebration message "You're all set for your trip!"

---

### SCR-019: Notifications Center

**Purpose:** Centralized notification hub showing all trip-related alerts, updates, messages, and recommendations with filtering and snooze options.

**Entry Points:** Notification badge on tab bar, notification tap, settings → notifications

**Exit Points:**
- Tap notification → Navigate to relevant screen (Trip, Flight, etc.)
- Back to Home or previous screen

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Notifications"]               │
│ [Filter: All | Trips | Messages]        │
│ [Mark all as read]                      │
├─────────────────────────────────────────┤
│ [Today]                                 │
│ ┌────────────────────────────────────┐   │
│ │ 🔴 Flight Disruption Alert         │   │
│ │ "Your flight UA901 delayed 2 hours"│   │
│ │ 9:45 AM | [View options] [Dismiss] │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ ✅ Boarding Started                │   │
│ │ "Groups 1 & 2 boarding now"        │   │
│ │ 9:30 AM | [View status] [Dismiss]  │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ 💬 Family Message                  │   │
│ │ "Amy: Don't forget passports!"     │   │
│ │ 8:15 AM | [View] [Reply] [Snooze]  │   │
│ └────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ [Yesterday]                             │
│ ┌────────────────────────────────────┐   │
│ │ 💰 Great Deal Available            │   │
│ │ "Flights to Paris: $449 (save $230)"│   │
│ │ 2:30 PM | [View deal] [Archive]    │   │
│ └────────────────────────────────────┘   │
│ ┌────────────────────────────────────┐   │
│ │ ℹ️ Trip Reminder                   │   │
│ │ "Your London trip starts tomorrow!"│   │
│ │ 10:00 AM | [View trip] [Dismiss]   │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Load more notifications...]            │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header with Filters**
- Title: "Notifications"
- Filter tabs: All, Trips, Messages, Deals (toggle or dropdown)
- Mark as read: [Mark all as read] button
- Search: Optional search field to find specific notifications

**2. Notification Cards**
- Type: Shadcn Card, grouped by date (Today, Yesterday, Last week, etc.)
- Each card shows:
  - Icon (colored): 🔴 alert, ✅ confirmation, 💬 message, 💰 deal, ℹ️ info
  - Type badge: "Flight Disruption Alert", "Boarding Started", "Family Message"
  - Message: Main notification text (1-2 lines)
  - Timestamp: Relative time ("9:45 AM", "2 days ago")
  - Actions: Contextual buttons ([View options], [View trip], [Reply], [Archive], [Snooze])
- Color: Status color-coded (red=urgent, amber=warning, blue=info, green=success)
- Tap card: Navigate to related screen (Trip Dashboard, Flight Detail, etc.)

**3. Action Buttons**
- Per notification type:
  - **Urgent (disruption):** [View options], [Contact support]
  - **Status (boarding, check-in):** [View status], [Take action]
  - **Messages:** [Reply], [View conversation]
  - **Deals:** [View deal], [Book now]
  - **Generic:** [View], [Archive], [Snooze]
- Snooze: [Snooze] → Show timing options (1 hour, 1 day, 1 week)
- Dismiss/Archive: Remove from view

**4. Grouping by Date**
- Section headers: "Today", "Yesterday", "Last week", "Earlier"
- Sticky headers: Date header remains visible while scrolling
- Most recent first

**5. Empty State**
- Message: "No notifications yet. [Browse deals] or [Manage preferences]"
- When all filtered out: "No notifications match your filter. [Clear filters]"

**Interaction Patterns**

- **Tap notification card:** Navigate to related screen (Trip, Flight, etc.)
- **Tap action button:** Perform action (view details, reply, archive)
- **Tap snooze:** Show snooze duration menu (1h, 1d, 1w, custom)
- **Swipe left on card:** Show quick actions (archive, mute, snooze)
- **Mark as read:** Auto-marks on viewing; manual [Mark all as read] available
- **Pull-to-refresh:** Reload notifications from server

**Data Requirements**

- Notifications: Real-time from backend (flight status, messages, deals, system alerts)
- Notification history: Server-side storage (persists across sessions)
- Notification preferences: User settings (enable/disable types)
- Offline: Show cached notifications; real-time updates unavailable
- Expiration: Old notifications auto-archived after 30 days

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Notifications emphasize status updates, upgrade opportunities, premium offers. Deals filter may be off by default (premium doesn't need to hunt deals). Disruptions prioritized.
- **PERSONA-02 (Marcus):** Notifications emphasize disruptions, policy compliance alerts, productivity reminders. Messages and deals secondary. Snooze less often used (prefers to see all updates).
- **PERSONA-03 (Chen Family):** Notifications include family messages prominently. Child-friendly confirmations ("Your trip is ready!", "Pack your passport!"). Family coordination alerts emphasized.

**Accessibility**

- Heading: h1 "Notifications"
- Date groupings: h2 tags for semantic structure
- Notification cards: Keyboard navigable (Tab through, Enter to select)
- Buttons: Labeled with accessible text
- Time: Formatted clearly (e.g., "9:45 AM", "2 days ago")
- Color: Status uses color + icon + text
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No notifications:** Show empty state with CTA to browse deals or manage preferences
- **Notification archived:** Can [Undo] for 5 seconds after archiving
- **Notification expired (30+ days old):** Auto-removed from view
- **User has 100+ unread notifications:** Show badge ("99+"), pagination or "Load more" button
- **Critical notification (disruption, missed connection):** Show permanent notification until user acts
- **Notification with time-sensitive action ("Expires in 3 hours"):** Show countdown timer

---

### SCR-020: Lounge Finder

**Purpose:** Interactive map and directory of airport lounges accessible by user, showing amenities, occupancy, wait times, and instant digital pass generation.

**Entry Points:** Airport Live → Lounge section, Tab bar custom button during travel day, Trips dashboard

**Exit Points:**
- View lounge details → Lounge detail modal
- Get directions → Wayfinding/navigation
- Back to Airport Live or previous screen

**Layout Specification**

```
┌─────────────────────────────────────────┐
│ [Header: "Airport Lounges"]             │
│ San Francisco (SFO), Terminal 3         │
│ [Filter by access type]                 │
├─────────────────────────────────────────┤
│ [Accessible Lounges (3 available)]      │
│ ┌────────────────────────────────────┐   │
│ │ American Express Centurion Lounge  │   │
│ │ ⭐⭐⭐⭐ (4.8/5 from 1,200 reviews)   │   │
│ │ Concourse C, Gate Level             │   │
│ │ Access: United Platinum, Amex Plat │   │
│ │ Current wait: 8 minutes            │   │
│ │ Occupancy: 35% full                │   │
│ │ Amenities:                         │   │
│ │ ✓ Hot meals | ✓ Showers | ✓ Spa   │   │
│ │ ✓ Nap pods | ✓ WiFi | ✓ Power     │   │
│ │ [Get directions] [Digital pass] → │   │
│ └────────────────────────────────────┘   │
│                                          │
│ ┌────────────────────────────────────┐   │
│ │ United Club                        │   │
│ │ ⭐⭐⭐⭐ (4.2/5 from 800 reviews)    │   │
│ │ Concourse A, Mezzanine             │   │
│ │ Access: United elite (you qualify!)│   │
│ │ Current wait: 15 minutes           │   │
│ │ Occupancy: 62% full                │   │
│ │ Amenities:                         │   │
│ │ ✓ Snacks | ✓ Coffee | ✓ WiFi       │   │
│ │ [Get directions] [Digital pass] → │   │
│ └────────────────────────────────────┘   │
│                                          │
│ [Other lounges (pay-per-visit)]         │
│ Airport lounge #1 - $28 [Buy pass]      │
│ Plaza Premium Lounge - $35 [Buy pass]   │
└─────────────────────────────────────────┘
```

**Component Breakdown**

**1. Header**
- Airport name, code, terminal
- Filter button: [Access type: All, My programs, Public, Pay lounges]

**2. Accessible Lounges Section**
- Type: Card list of lounges the user can access (via loyalty, credit card, status, etc.)
- Each card shows:
  - Lounge name + logo (if available)
  - Star rating + review count
  - Location (concourse, gate level)
  - Access indicators: "United Platinum", "Amex Centurion" (shows why user has access)
  - Real-time data:
    - Current wait time (e.g., "8 minutes")
    - Occupancy percentage (e.g., "35% full") + visual bar
  - Amenities: Icons for hot meals, shower, spa, nap pods, WiFi, power, etc.
  - Actions: [Get directions], [Digital pass]
- Sorted: By wait time (shortest first) or distance

**3. Lounge Detail Expansion**
- Tap card to expand: Full amenities list, recent reviews, photos, hours of operation
- Reviews: User-submitted ratings + comments (sample: "Clean, good food, quiet naps available")
- Photos: Interior photos of lounge

**4. Pay-Per-Visit Lounges**
- Type: Secondary section showing lounges available for purchase
- Each card shows:
  - Lounge name
  - Price
  - Star rating
  - [Buy pass] → Completes payment, issues digital pass

**5. Digital Pass Generation**
- Type: Modal showing
  - QR code for lounge entry
  - Reservation confirmation (if reservation made)
  - Expiration time (access until end of day)
  - Lounge name + terminal + gate level
  - [Show to staff at entry]
  - [Share pass] → Send via email/messaging
  - [Add to wallet] (Apple/Google Pay)

**6. Directions Integration**
- Tap [Get directions]: Opens wayfinding/navigation to lounge from current location
- Shows walking time + turn-by-turn navigation
- Accessible routes highlighted (if accessibility needs specified in settings)

**Interaction Patterns**

- **Tap lounge card:** Expand to full details
- **Tap [Get directions]:** Open wayfinding modal with turn-by-turn navigation
- **Tap [Digital pass]:** Generate QR code pass + reserve lounge (if reservation enabled)
- **Tap [Buy pass]:** Complete payment for pay-per-visit lounge
- **Filter by access type:** Show only lounges user has access to
- **Pull-to-refresh:** Reload wait times + occupancy data

**Data Requirements**

- Lounge database: List of lounges per airport (updated monthly)
- Amenities: Lounge configuration (meals, showers, etc.) per lounge
- Occupancy + wait time: Real-time from lounge partners or sensors
- User access: Linked loyalty programs + credit cards + status
- Reviews + ratings: Aggregated user ratings
- Hours: Operating hours per lounge
- Offline: Show cached lounge list; real-time occupancy unavailable

**Persona Adaptations**

- **PERSONA-01 (Alexandra):** Centurion and exclusive lounges prominently featured. Spa/premium amenities highlighted. Reviews emphasize luxury and quiet. May have priority lounge reservations.
- **PERSONA-02 (Marcus):** Club lounges and United Club prominently featured. Amenities emphasize productivity (WiFi, power, quiet zones, meeting rooms). Reviews focus on business efficiency.
- **PERSONA-03 (Chen Family):** Family lounges prominent (if available). Amenities highlight family facilities (kids' areas, bathrooms, children's meals). Reviews mention child-friendly atmosphere.

**Accessibility**

- Heading: h1 "Airport Lounges"
- Lounge cards: Keyboard navigable (Tab through, Enter to expand)
- Amenities: Icons + text labels (not icons only)
- Ratings: Numeric display (e.g., "4.8/5" not just 4.8 stars)
- QR code: Text alternative provided for screen readers
- Directions: Accessible navigation support (keyboard + audio)
- Touch targets: All buttons 44×44pt minimum

**States & Edge Cases**

- **No accessible lounges:** Show "You don't have access to any lounges. [View paid options] or [Upgrade to status]"
- **All lounges at capacity:** Show warning "All lounges are full. Wait time may be >30 min. Still interested? [Reserve spot]"
- **Lounge closed:** Show "Lounge is closed. Next opens at 5:00 AM."
- **User not in airport:** Show "Not currently at airport. Lounge info available from 2 hours before departure."
- **Real-time data unavailable:** Show last-known occupancy "Last updated 15 min ago (real-time unavailable)"
- **Digital pass generation failed:** Show error "Couldn't generate pass. [Retry] or [Show manual confirmation]"

---

## 4. Design Tokens (Preliminary)

**Note:** This section is preliminary and superseded by Step 7.5 (UI Design Direction). Includes foundational token structure.

### Spacing Scale
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px (used for padding, margins, gaps)

### Typography Scale
- 12px (caption), 14px (body small), 16px (body), 18px (heading 3), 20px (heading 2), 24px (heading 1), 28px, 32px, 36px (hero)
- Font family: System fonts (SF Pro Display on iOS, Roboto on Android)
- Line height: 1.2 (headings), 1.5 (body), 1.6 (large body)

### Color Palette (Concept)
- Primary: Blue (brand color, CTA buttons, active states)
- Secondary: Amber (warnings, deals, alerts)
- Success: Green (confirmations, completed actions)
- Error: Red (errors, disruptions, urgent alerts)
- Neutral: Gray scale (backgrounds, borders, text)

### Border Radius
- 4px (small elements), 8px (medium), 12px (large cards), 16px (hero elements)

### Shadow System
- Elevation 1: 0 1px 2px rgba(0, 0, 0, 0.05)
- Elevation 2: 0 4px 6px rgba(0, 0, 0, 0.1)
- Elevation 3: 0 10px 15px rgba(0, 0, 0, 0.15)

### Animation Timing
- Fast: 150ms (micro-interactions)
- Medium: 300ms (standard transitions)
- Slow: 500ms (hero animations)
- Easing: cubic-bezier(0.4, 0, 0.2, 1) (Material Design standard)

---

## 5. Accessibility Checklist

### WCAG 2.1 AA Requirements (All Screens)

- **1.1 Text Alternatives:** All images have alt text or aria-label
- **1.3 Adaptable:** Content is reflow-friendly (responsive design)
- **1.4 Distinguishable:**
  - Text contrast minimum 4.5:1 for body, 3:1 for large text
  - Color is never the only indicator of state
- **2.1 Keyboard Accessible:** All functionality keyboard navigable
- **2.4 Navigable:** Clear focus indicators (2px outline, offset 2px)
- **3.1 Readable:** Language identified (html lang attribute)
- **3.2 Predictable:** Consistent navigation patterns
- **3.3 Input Assistance:** Form labels, error messages, suggestions
- **4.1 Compatible:** Semantic HTML, ARIA roles where needed

### Screen Reader Compatibility
- All interactive elements have accessible names
- Form labels associated with inputs (label htmlFor)
- Headings use semantic structure (h1, h2, h3)
- Lists use semantic list markup (ul, ol, li)
- Images have descriptive alt text (not "image.png")
- Dynamic content updates announced (aria-live regions)
- Reading order matches visual order

### Keyboard Navigation
- Tab order logical (follows left-to-right, top-to-bottom)
- Focus visible on all interactive elements (44×44pt minimum)
- Skip links for navigation (skip to main content)
- No keyboard traps
- Modal focus contained (tab cycles within modal)

### Motion & Animation
- All animations respect prefers-reduced-motion preference
- Parallax and scroll-linked animations disabled
- Autoplay video disabled (play button required)
- Flashing/strobing content avoided (would cause seizures)

### Touch & Mobile
- All touch targets minimum 44×44pt
- Sufficient spacing between targets (8pt minimum)
- Touch-friendly form fields (larger than desktop equivalents)
- Gestures supplemented with keyboard/button alternatives

---

## 6. Pipeline Cross-Reference Table

| Screen ID | PRD Features | Experience Principle | Primary Persona | Journey Phase |
|-----------|-------------|---------------------|-----------------|---------------|
| SCR-001 | F-001 (Inspiration) | Principle 4 (Graduated Trust) | All | Inspiration |
| SCR-002 | F-001, F-018, F-019, F-020 | Principle 1 (Anticipatory Calm), Principle 5 (Continuity) | All | Inspiration + Airport |
| SCR-003 | F-001, F-002, F-003, F-004, F-005, F-006 | Principle 1 (Anticipatory), Principle 2 (Transparency) | PERSONA-03, PERSONA-01 | Inspiration |
| SCR-004 | F-007, F-002 | Principle 2 (Transparency), Principle 5 (Continuity) | All | Search & Booking |
| SCR-005 | F-007, F-008 | Principle 2 (Transparency), Principle 1 (Anticipatory) | All | Search & Booking |
| SCR-006 | F-011, F-012, F-013 | Principle 2 (Transparency), Principle 3 (Family Integrity) | All | Search & Booking |
| SCR-007 | F-013, F-008 | Principle 2 (Transparency), Principle 4 (Graduated Trust) | All | Search & Booking |
| SCR-008 | F-014, F-015, F-016, F-017, F-018 | Principle 1 (Anticipatory), Principle 5 (Continuity) | All | Pre-Trip |
| SCR-009 | F-015 | Principle 2 (Transparency), Principle 5 (Continuity) | All | Pre-Trip |
| SCR-010 | F-019, F-021, F-022, F-023, F-024 | Principle 1 (Anticipatory), Principle 5 (Continuity) | All | Airport |
| SCR-011 | F-024 | Principle 1 (Anticipatory), Principle 5 (Continuity) | All | Airport |
| SCR-012 | F-025, F-026, F-027, F-028, F-029, F-030 | Principle 1 (Anticipatory), Principle 5 (Continuity) | All | In-Flight |
| SCR-013 | F-031, F-032, F-033, F-034, F-035 | Principle 1 (Anticipatory), Principle 3 (Family Integrity) | All | IROPS |
| SCR-014 | F-036, F-037 | Principle 1 (Anticipatory), Principle 5 (Continuity) | PERSONA-03, PERSONA-01 | Post-Trip |
| SCR-015 | Loyalty, Preferences | Principle 5 (Continuity), Principle 4 (Graduated Trust) | All | Account Management |
| SCR-016 | F-002, F-007, All features via conversation | Principle 4 (Graduated Trust), Principle 5 (Continuity) | All | All phases |
| SCR-017 | Notification, Privacy, Data | Principle 2 (Transparency), Principle 5 (Continuity) | All | Account Management |
| SCR-018 | F-009, F-018, F-006, F-035 | Principle 3 (Family Integrity), Principle 5 (Continuity) | PERSONA-03 | Pre-Trip + IROPS |
| SCR-019 | F-018, F-031 | Principle 1 (Anticipatory), Principle 5 (Continuity) | All | All phases |
| SCR-020 | F-022 | Principle 1 (Anticipatory), Principle 5 (Continuity) | PERSONA-01, PERSONA-02 | Airport |

---

**END OF UX SPECIFICATION**

Document Word Count: ~28,500 words across 20 screens (1,425 words per screen average).

Status: Complete for all 20 screens with full specification including wireframes, component breakdowns, interaction patterns, data requirements, persona adaptations, accessibility specs, and edge cases.
