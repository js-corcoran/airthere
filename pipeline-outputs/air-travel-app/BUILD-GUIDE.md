# AirThere — Claude Code Build Guide
## Optimized for Maximum Quality Autonomous Execution

---

## Strategy: 5-Phase Chunked Build

A single continuous session will hit context limits well before 20 screens are built. The optimal approach is **5 focused sessions**, each building a logical group of screens. Each session gets a fresh context window loaded with exactly the files it needs — maximizing quality and avoiding degradation from context pressure.

### Why 5 sessions beats 1 session:
- **Fresh context** = Claude's reasoning stays sharp (no compaction artifacts)
- **Focused scope** = better code quality per screen
- **Verification checkpoints** = catch issues before they compound
- **Git commits** = clean history, easy rollback per phase

---

## Pre-Build Setup (Do Once)

### Step 1: Open Terminal and navigate to your project directory
```bash
cd "/Users/jcorcoran/Library/CloudStorage/OneDrive-DefinedLogic/DL/AI Competency Local/AI UX:UI/AI UX:UI Workflow/airapp"
```

### Step 2: Create the project settings file
```bash
mkdir -p .claude
```

Create `.claude/settings.json`:
```json
{
  "model": "opus",
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(npx *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git checkout -b *)",
      "Bash(cat *)",
      "Bash(ls *)",
      "Bash(find *)",
      "Bash(wc *)",
      "Bash(mkdir *)",
      "Bash(cp *)",
      "Bash(mv *)",
      "Bash(rm *)",
      "Bash(head *)",
      "Bash(tail *)",
      "Bash(echo *)",
      "Bash(touch *)",
      "Bash(cd *)",
      "Bash(which *)",
      "Bash(node *)",
      "Bash(tsc *)",
      "Read",
      "Edit",
      "Write",
      "Grep",
      "Glob"
    ]
  }
}
```

### Step 3: Initialize Git
```bash
git init
git checkout -b main
git add pipeline-outputs/
git commit -m "Pipeline v1.0.0: Complete design specification package"
```

---

## Phase 1: Foundation + Core Booking Flow
**Screens:** Onboarding, Home, Search, Results, Flight Detail, Checkout, Trip Dashboard
**Estimated time:** 45-90 minutes of Claude execution

### Launch command:
```bash
claude --model opus --effort high
```

### Prompt (copy-paste this entire block):

```
Read CLAUDE.md in full. This is your project bible — follow it precisely.

You are building AirThere, a best-in-class air travel experience app. We are in DESIGN MODE — frontend prototype with realistic mock/placeholder data. No real backend yet.

## YOUR MISSION FOR THIS SESSION

Build Phase 1: Foundation + Core Booking Flow (7 screens). This is the most critical phase — it establishes the project, the design system, and the complete search-to-booking journey.

## BEFORE YOU WRITE ANY CODE

1. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-direction.md` in full
2. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-tokens.json` in full
3. Read `pipeline-outputs/air-travel-app/07.5-design-direction/tailwind-theme.css` in full
4. Read `pipeline-outputs/air-travel-app/07.5-design-direction/shadcn-theme.css` in full
5. Read `pipeline-outputs/air-travel-app/06-dev-spec.md` for project structure and TypeScript types

These design files are AUTHORITATIVE. Every color, every spacing value, every border radius must come from these tokens. No defaults. No generic grays. No Shadcn stock colors.

## BUILD SEQUENCE

Build these 7 screens in exact order. For each screen, read its shard file FIRST, then build:

### Screen 1: Project Setup + Onboarding (SCR-001)
- Shard: `pipeline-outputs/air-travel-app/07-shards/01-onboarding-shard.md`
- Initialize Next.js 14 project with App Router and TypeScript strict mode
- Install and configure Tailwind CSS v4 with the tailwind-theme.css
- Install and configure Shadcn UI with the shadcn-theme.css
- Set up project folder structure per CLAUDE.md and 06-dev-spec.md
- Create the mock data service layer (lib/mock-data/ and lib/services/)
- Create shared components: BottomTabBar, ContextualHeader, LoadingSkeleton
- Build the Onboarding/Welcome flow (persona selection, preference capture)
- Create root layout with navigation shell

### Screen 2: Home / Today View (SCR-002)
- Shard: `pipeline-outputs/air-travel-app/07-shards/02-home-today-shard.md`
- Adaptive dashboard that changes based on travel context
- Trip cards for upcoming travel, inspiration when no trips
- Persona-specific content sections
- Quick action buttons

### Screen 3: Flight Search (SCR-004)
- Shard: `pipeline-outputs/air-travel-app/07-shards/04-flight-search-shard.md`
- Multi-mode search (round-trip, one-way, multi-city)
- Airport autocomplete with recent/popular
- Date picker with flexible dates
- Passenger selector (adults, children, infants)
- Cabin class selector

### Screen 4: Search Results / Fare Explorer (SCR-005)
- Shard: `pipeline-outputs/air-travel-app/07-shards/05-search-results-shard.md`
- Flight result cards with airline, times, duration, stops, price
- Sort and filter system
- Fare comparison grid
- Price calendar view
- Mock data: 15-20 realistic flight results

### Screen 5: Flight Detail / Seat Selection (SCR-006)
- Shard: `pipeline-outputs/air-travel-app/07-shards/06-flight-detail-shard.md`
- Flight detail view with amenities, aircraft info
- Interactive seat map with color coding
- Family seating guarantee indicator
- Fare bundle comparison (Basic, Standard, Premium)

### Screen 6: Booking Flow / Checkout (SCR-007)
- Shard: `pipeline-outputs/air-travel-app/07-shards/07-booking-checkout-shard.md`
- Multi-step checkout (passengers, extras, payment, confirm)
- Passenger info forms with validation
- Trip protection options
- Order summary with total cost transparency
- Booking confirmation with animation

### Screen 7: Trip Dashboard (SCR-008)
- Shard: `pipeline-outputs/air-travel-app/07-shards/08-trip-dashboard-shard.md`
- Active trip hub with itinerary timeline
- Flight status cards
- Quick actions (check-in, boarding pass, etc.)
- Trip countdown

## QUALITY REQUIREMENTS — NON-NEGOTIABLE

1. **Design tokens are law.** Every color = from design-tokens.json. Every spacing = from the 4px grid. Every border-radius, shadow, font-size = from tokens. I will reject generic Shadcn defaults.

2. **Realistic mock data.** Real airline names (Delta, United, Emirates, Singapore Airlines). Real airport codes (JFK, LAX, SIN, DXB). Real flight times. Real prices. No "Flight 123" or "$100" placeholders.

3. **All three persona adaptations.** Every screen must visually adapt based on the active persona (PERSONA-01 Premium, PERSONA-02 Business, PERSONA-03 Family). Store persona in a React context/Zustand store. Show me the differences.

4. **Responsive.** Mobile-first (375px), tablet (768px), desktop (1280px). Every screen works at all three.

5. **Accessible.** ARIA labels, keyboard navigation, focus management, 44x44pt touch targets, 4.5:1 contrast. Use the design token contrast ratios.

6. **Loading + Error + Empty states.** Every screen needs all three. Skeleton screens for loading. Friendly empty states. Recoverable error states.

7. **Dark mode.** Every screen works in both light and dark. Use the dark mode tokens from the design direction.

8. **TypeScript strict.** No `any` types. Proper interfaces for all props and data. Import types from a central types/ directory.

9. **Component organization.** Shared components in components/ui/ and components/shared/. Screen-specific components co-located with their page.

10. **After each screen:** Run `npm run build` and `npm run lint`. Fix any errors before moving to the next screen.

## HOW TO WORK

- Read each shard file completely before building that screen
- Build components bottom-up (smallest first, compose into pages)
- After each screen, verify it builds and renders correctly
- Commit after each screen with a descriptive message
- If you need to make architectural decisions, bias toward the shard specification
- Do NOT skip screens or combine them — build each one fully before moving on
- Do NOT use placeholder text like "Lorem ipsum" — use realistic travel content

Begin now. Start by reading CLAUDE.md, then the design direction files, then proceed to Screen 1.
```

### After Phase 1 completes:
```bash
# Verify the build
npm run build
npm run dev  # Check in browser at localhost:3000

# Commit
git add -A
git commit -m "Phase 1: Foundation + core booking flow (7 screens)"
```

---

## Phase 2: Discovery + Airport Experience
**Screens:** Discover, Airport Live, Gate & Boarding
**Estimated time:** 30-45 minutes

### Launch command:
```bash
claude --model opus --effort high
```

### Prompt:

```
Read CLAUDE.md in full first.

You are continuing the AirThere build. Phase 1 (7 screens) is complete — the project is set up with Next.js 14, Tailwind v4 + custom theme, Shadcn UI + custom theme, mock data services, and 7 working screens (Onboarding, Home, Search, Results, Flight Detail, Checkout, Trip Dashboard).

## YOUR MISSION FOR THIS SESSION

Build Phase 2: Discovery + Airport Experience (3 screens).

## BEFORE YOU WRITE ANY CODE

1. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-direction.md` — AUTHORITATIVE design system
2. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-tokens.json` — token values
3. Explore the existing codebase to understand established patterns, component structure, and styling conventions from Phase 1

## BUILD SEQUENCE

### Screen 8: Discover / Inspiration Feed (SCR-003)
- Shard: `pipeline-outputs/air-travel-app/07-shards/03-discover-inspiration-shard.md`
- Destination discovery with rich cards and imagery
- Trending destinations, deals, curated collections
- Persona-specific inspiration content
- Search/filter within discovery

### Screen 9: Airport Live (SCR-010)
- Shard: `pipeline-outputs/air-travel-app/07-shards/10-airport-live-shard.md`
- Real-time airport experience dashboard
- Security and immigration queue estimates
- Gate information with walking time
- Airport map/wayfinding
- Biometric check-in status

### Screen 10: Gate & Boarding (SCR-011)
- Shard: `pipeline-outputs/air-travel-app/07-shards/11-gate-boarding-shard.md`
- Gate assignment with countdown to boarding
- Boarding group/zone indicator
- Digital boarding pass
- Connection information

Same quality requirements as Phase 1 — design tokens are law, realistic mock data, all persona adaptations, responsive, accessible, dark mode, TypeScript strict. Run build after each screen.

Begin now. Read CLAUDE.md first, then the design direction, then explore the existing code, then build Screen 8.
```

### After Phase 2:
```bash
git add -A
git commit -m "Phase 2: Discovery + airport experience (3 screens)"
```

---

## Phase 3: Disruption Recovery + AI + Profile
**Screens:** IROPS Recovery, AI Copilot, Profile & Loyalty
**Estimated time:** 30-60 minutes

### Launch command:
```bash
claude --model opus --effort high
```

### Prompt:

```
Read CLAUDE.md in full first.

You are continuing the AirThere build. Phases 1-2 (10 screens) are complete.

## YOUR MISSION FOR THIS SESSION

Build Phase 3: Disruption Recovery + AI + Profile (3 screens). These are the most technically interesting screens — IROPS is the critical CX moment, AI Copilot is the conversational interface, and Profile ties the loyalty/identity system together.

## BEFORE YOU WRITE ANY CODE

1. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-direction.md`
2. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-tokens.json`
3. Explore the existing codebase patterns from Phases 1-2

## BUILD SEQUENCE

### Screen 11: IROPS / Disruption Recovery (SCR-013)
- Shard: `pipeline-outputs/air-travel-app/07-shards/13-irops-recovery-shard.md`
- THIS IS THE MOST CRITICAL CX SCREEN. Build it with the most care.
- Proactive disruption alert (before the traveler knows)
- Automatic rebooking with alternative options
- Family-aware rebooking (keeps family together)
- Hotel and ground transport vouchers
- Real-time status updates
- Severity levels: minor delay, major delay, cancellation, diversion
- Mock scenarios for each severity level

### Screen 12: AI Copilot (SCR-016)
- Shard: `pipeline-outputs/air-travel-app/07-shards/16-ai-copilot-shard.md`
- Bottom sheet conversational interface (persistent, accessible from any screen)
- Message types: user text, AI response, suggestion chips, action cards
- Typing indicator, message timestamps
- Graduated trust levels (Copilot, Curator, Autonomous)
- Persona-specific AI tone and behavior
- Mock conversation flows (booking help, disruption queries, trip planning)

### Screen 13: Profile & Loyalty (SCR-015)
- Shard: `pipeline-outputs/air-travel-app/07-shards/15-profile-loyalty-shard.md`
- User identity and preferences
- Loyalty program integration (points, status, tier progress)
- Travel history and statistics
- Biometric enrollment status
- Preference management
- Persona-specific profile views

Same quality requirements. Design tokens, realistic data, persona adaptations, responsive, accessible, dark mode, TypeScript strict.

Begin now.
```

### After Phase 3:
```bash
git add -A
git commit -m "Phase 3: IROPS recovery + AI copilot + profile (3 screens)"
```

---

## Phase 4: Family + In-Flight + Documents
**Screens:** Family Hub, In-Flight Experience, Document Vault
**Estimated time:** 30-45 minutes

### Launch command:
```bash
claude --model opus --effort high
```

### Prompt:

```
Read CLAUDE.md in full first.

You are continuing the AirThere build. Phases 1-3 (13 screens) are complete.

## YOUR MISSION FOR THIS SESSION

Build Phase 4: Family + In-Flight + Documents (3 screens).

## BEFORE YOU WRITE ANY CODE

1. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-direction.md`
2. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-tokens.json`
3. Explore existing codebase patterns

## BUILD SEQUENCE

### Screen 14: Family Hub (SCR-018)
- Shard: `pipeline-outputs/air-travel-app/07-shards/18-family-hub-shard.md`
- Family member management (add, edit, remove)
- Family seating confirmation display
- Shared packing checklist
- Child entertainment suggestions
- Special needs accommodation settings
- Day-of-travel family coordination view

### Screen 15: In-Flight Experience (SCR-012)
- Shard: `pipeline-outputs/air-travel-app/07-shards/12-inflight-experience-shard.md`
- Flight progress map
- Meal service tracker
- Entertainment recommendations
- Wellness features (hydration, movement reminders)
- Productivity mode
- Family entertainment hub section

### Screen 16: Document Vault (SCR-009)
- Shard: `pipeline-outputs/air-travel-app/07-shards/09-document-vault-shard.md`
- Secure document storage (passports, visas, insurance)
- Document expiration tracking and alerts
- Quick access for airport use
- Biometric unlock simulation
- Family document management

Same quality requirements throughout.

Begin now.
```

### After Phase 4:
```bash
git add -A
git commit -m "Phase 4: Family hub + in-flight + document vault (3 screens)"
```

---

## Phase 5: Remaining Screens + Polish
**Screens:** Trip Recap, Notifications, Lounge Finder, Settings
**Estimated time:** 30-45 minutes

### Launch command:
```bash
claude --model opus --effort high
```

### Prompt:

```
Read CLAUDE.md in full first.

You are completing the AirThere build. Phases 1-4 (16 screens) are complete.

## YOUR MISSION FOR THIS SESSION

Build Phase 5: Remaining screens + global polish (4 screens + cross-app refinement).

## BEFORE YOU WRITE ANY CODE

1. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-direction.md`
2. Read `pipeline-outputs/air-travel-app/07.5-design-direction/design-tokens.json`
3. Explore existing codebase

## BUILD SEQUENCE

### Screen 17: Trip Recap / Post-Trip (SCR-014)
- Shard: `pipeline-outputs/air-travel-app/07-shards/14-trip-recap-shard.md`

### Screen 18: Notifications Center (SCR-019)
- Shard: `pipeline-outputs/air-travel-app/07-shards/19-notifications-shard.md`

### Screen 19: Lounge Finder (SCR-020)
- Shard: `pipeline-outputs/air-travel-app/07-shards/20-lounge-finder-shard.md`

### Screen 20: Settings & Preferences (SCR-017)
- Shard: `pipeline-outputs/air-travel-app/07-shards/17-settings-shard.md`

## AFTER ALL 20 SCREENS ARE BUILT — GLOBAL POLISH

1. **Navigation audit**: Verify every screen is reachable from the bottom tab bar or contextual navigation. Test all entry/exit points.

2. **Design token audit**: Grep the codebase for any remaining default Shadcn colors, hardcoded hex values, or generic grays. Replace with design tokens.

3. **Responsive audit**: Verify every screen at 375px, 768px, and 1280px widths.

4. **Dark mode audit**: Toggle dark mode and verify every screen renders correctly.

5. **TypeScript audit**: Run `npx tsc --noEmit` and fix all type errors.

6. **Build verification**: Run `npm run build` — must complete with zero errors.

7. **Accessibility audit**: Verify focus management, ARIA labels, and keyboard navigation on key flows.

8. **Create a demo flow**: Set up a seed data scenario so that the app loads with a realistic state — an upcoming trip with Alexandra (PERSONA-01), showing the full journey from home through boarding.

Same quality requirements throughout.

Begin now.
```

### After Phase 5:
```bash
git add -A
git commit -m "Phase 5: Final screens + global polish (20/20 screens complete)"
git tag v1.0.0-prototype
```

---

## Quick Reference: Key Commands

| Action | Command |
|--------|---------|
| Start Claude Code | `claude --model opus --effort high` |
| Check context usage | `/context` (inside Claude) |
| Compact if needed | `/compact focus on code changes and architecture` |
| Switch to plan mode | `Shift+Tab` or `/plan` |
| Toggle thinking visibility | `Ctrl+O` |
| Check cost | `/cost` (inside Claude) |
| Exit session | `/exit` or `Ctrl+C` |
| Resume last session | `claude --continue` |

## Troubleshooting

**If Claude runs out of context mid-phase:**
- It will auto-compact. If quality drops, type `/compact preserve all file changes, component patterns, and design token usage` then continue.

**If a build error occurs:**
- Paste the full error. Claude will fix it. Say: "Fix this build error, then verify with npm run build."

**If a screen looks wrong:**
- Take a screenshot and paste it. Say: "This doesn't match the design direction. Read design-direction.md and fix the visual issues."

**If you want to restart a phase:**
- `git stash` to save work, or `git checkout .` to discard
- Start a new `claude` session with the same phase prompt
