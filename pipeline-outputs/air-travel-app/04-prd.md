# AirThere — Product Requirements Document (PRD)
## Pipeline Step 4 of 10 | 2026-03-29

---

## 1. Elevator Pitch (200 words)

AirThere is the world's first anticipatory travel operating system — a comprehensive mobile app and web platform that orchestrates the complete air travel journey across all seven phases, from inspiration through post-trip. Unlike fragmented competitors, AirThere unifies flight search, booking, pre-trip management, airport navigation, in-flight experience, disruption recovery, and post-trip analytics into a single, intelligent system that anticipates traveler needs before they arise. Built with Next.js 14, Tailwind CSS, Shadcn UI, and Supabase, AirThere delivers premium-quality experiences optimized for three distinct personas: Premium Travelers ("Alexandra") seeking white-glove anticipatory service; Business Travelers ("Marcus") demanding speed, control, and policy compliance; and Leisure/Family Travelers (the "Chen Family") requiring transparency, family coordination, and guided logistics. The product solves the industry's three critical white spaces: the $45 billion rebundling opportunity through dynamic, personalized bundling; the $60 billion annual IROPS cost through proactive disruption management; and journey fragmentation through unified, biometric-enabled orchestration. AirThere targets NPS 60+, booking abandonment under 30%, 100% family seating guarantee, and WCAG 2.1 AA accessibility. Design mode implementation prioritizes mobile-first responsive design with realistic placeholder data, enabling frontend prototype completion before backend integration.

---

## 2. Product Vision & Goals

### Vision Statement (from Step 3)

**North Star:** AirThere is the invisible intelligence that removes friction, anxiety, and cognitive load from the entire air travel journey — serving premium travelers with white-glove autonomy, business travelers with speed and control, and families with honest transparency and unified coordination.

This is not a travel booking app. This is not an airline app. AirThere is a **travel operating system** — the single source of truth for everything a traveler needs to accomplish across all seven journey phases, from inspiration through post-trip memory capture and loyalty reconciliation.

### Business Objectives with Measurable Targets

**Year 1 Objectives:**

1. **Launch Foundation Product with 60+ NPS** — Release core experience across all journey phases with best-in-class design and zero critical bugs. Target NPS of 60+ (exceeding JetBlue's industry-leading 50).

2. **Achieve 50% Booking Abandonment Reduction** — Reduce booking abandonment from industry standard 87.87% to under 40% through simplified UI and transparency. Track weekly with target completion rate >60%.

3. **Establish Biometric Identity Foundation** — Enable one-time biometric enrollment for 100% of active users; integrate with Apple Wallet and digital travel credentials for seamless airport check-in.

4. **Deploy Conversational AI Copilot v1.0** — Launch copilot demonstrating 80%+ task completion rate for flight search, booking assistance, and trip management queries with natural language processing.

5. **Enable 90-Second Business Booking** — Deliver booking flow completion in under 90 seconds for Marcus (business traveler) with policy compliance and status optimization built-in.

6. **Guarantee Family Seating Automation** — Achieve 98%+ same-seat placement for families with children; guarantee adjacent seating at booking and maintain through disruptions/rebooking.

7. **Deploy Anticipatory Disruption Alerts** — Implement weather-triggered and schedule-disruption warnings for 60% of flights 72 hours before departure; measure traveler satisfaction lift vs. reactive alerts.

### Success Metrics

| Metric | Target | Baseline | Impact |
|--------|--------|----------|--------|
| NPS | 60+ | Industry 50 (JetBlue) | Premium brand perception |
| Booking Abandonment | <30% | 87.87% industry | Revenue uplift |
| WCAG Compliance | 2.1 AA | TBD | Accessibility inclusion |
| Family Seating Guarantee | 98%+ success | 60% current | Family segment loyalty |
| Biometric Enrollment | 100% of users | 0% baseline | Seamless airport experience |
| AI Copilot Task Completion | 80%+ | N/A | Reduced customer support load |
| Booking Time (Business) | <90 seconds | 4-5 minutes | Marcus segment value |
| Mobile Core Web Vitals | Green on all screens | TBD | Performance baseline |
| Proactive Alert Delivery | 72 hours pre-event | 24 hours reactive | Anticipatory advantage |

---

## 3. Target Personas (with Summary for Each)

### PERSONA-01: Premium Traveler — "Alexandra"

**Demographics:** 45-62 years old, UHNW ($5M+ liquid assets), C-suite/executive/entrepreneur, 15-30+ trips/year, $8,000-$30,000+ per ticket, 2-5% of passengers generating 40-50% of airline revenue.

**Core Motivation:** Expects invisible seamlessness. Treats first-class status as identity marker and professional standing reflection. Zero tolerance for mediocrity, wasted time, or service defects. Views travel as restorative, not exhausting.

**Key Needs:** Biometric-first identity, invisible context preservation (never repeat information), autonomous capability with override option, premium visual language, status symbols, privacy-first design, speed over explanation, 24/7 concierge availability.

**Success Indicators:** Seamless airport biometric check-in, personalized lounge recognition, anticipatory service before request, proactive connection management, instant upgrade/status notifications.

### PERSONA-02: Business Traveler — "Marcus"

**Demographics:** 35-55 years old, 12-25+ trips/year on corporate card, $15,000-$40,000 annual spend, mid-to-senior management in tech/finance/consulting, globe-trotting with Monday-Wednesday itineraries and weekend extensions.

**Core Motivation:** Control-seeking but time-starved. Wants perfect information without spending research time. Policy-constrained but needs flexibility. Wellness-conscious in theory, chaos-driven in practice. Values transparency about costs (company scrutiny), hates surprises.

**Key Needs:** Sub-90-second policy-compliant booking, unified multi-trip visibility, automatic disruption rebooking without manual intervention, lounge access consistency, expense auto-reconciliation, health/wellness integration.

**Success Indicators:** Booking in <90 seconds, disruption recovery without effort, policy compliance guaranteed, expense report auto-populated, frequent flyer benefits optimized across programs.

### PERSONA-03: Leisure/Family Traveler — "The Chen Family"

**Demographics:** Parents 35-50 years old, 2-4 children (ages 3-16), 3-5 trips/year, $4,000-$8,000 per trip, price-conscious, highly motivated by family bonding and trip coordination, represent 60%+ of leisure bookings.

**Core Motivation:** Transparency and honesty about total costs. Coordination efficiency across multiple family members. Guaranteed family seating and safety. Guided journey support that removes logistics burden. Deal discovery for family-size groups.

**Key Needs:** Total cost visibility including family bundles, family group booking and seat guarantee, packing intelligence and destination preparation, family coordination tools (shared trip dashboard), deal alerts matched to family preferences, post-trip memory capture.

**Success Indicators:** Total booking cost clarity before checkout, family seating guaranteed and protected through disruptions, shared trip planning with all family members, packing checklist and weather-specific recommendations, memory timeline of trip photos and moments.

---

## 4. Feature Inventory (2,800 words)

### Journey Phase 1: Inspiration & Discovery

**Feature F-001: AI-Powered Destination Card Feed**

*Description:* Machine learning-driven feed of destination cards displayed on home screen, personalized by historical preference, seasonal factors, deal availability, and mood input. Each card includes compelling photography, 3-5 key attraction highlights, estimated price range, optimal travel dates, and one-tap save to wishlist. Cards adapt based on persona (premium destinations for Alexandra, business efficiency for Marcus, family-friendly options for Chen Family).

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* All three personas; distinct optimization per persona

*Priority:* P0 (must-have for home screen engagement)

*Acceptance Criteria:*
- Feed displays minimum 8-12 destination cards per scroll
- ML personalization demonstrates >65% relevance (measured by save and click-through rates)
- Card imagery loads in <2 seconds on 3G connection
- Persona-specific optimization visible (premium vs. budget vs. family-focused)
- One-tap wishlist save with no additional clicks required

---

**Feature F-002: Mood-Based Search Companion**

*Description:* Conversational AI interface allowing travelers to describe travel mood ("relaxing beach getaway," "adventure hiking," "business city efficiency") rather than explicitly specifying destination. AI interprets mood and surface matched destinations with personalized recommendations. Includes time-of-year optimization and cost indicators. Graduates from autocomplete suggestions to full conversational multi-turn experience.

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* Leisure/Family (primary); Business (secondary for destination exploration); Premium (for luxury experience discovery)

*Priority:* P0 (core value differentiator vs. traditional search)

*Acceptance Criteria:*
- Natural language mood input produces destination suggestions within 2 seconds
- Top 3 suggestions match mood input criteria (user validation required in testing)
- Conversation maintains context across 5+ turns without confusion
- Cost range displayed upfront with transparency
- Mobile-optimized input (keyboard accessibility, voice support)

---

**Feature F-003: Social Discovery Feed**

*Description:* Feed showing trips bookmarked/completed by friends, influencers, and travel community. For each trip, display: destination, travel dates, estimated budget, number of travelers, key activities/highlights, user review/photos. Travel sentiment analysis (positive/negative/neutral) prominently displayed. One-tap "plan similar trip" action that pre-fills destination and travelers.

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* Leisure/Family (primary); Premium (secondary for exclusive destination discovery)

*Priority:* P1 (enhances engagement, optional for launch)

*Acceptance Criteria:*
- Feed displays trips from friend network and selected travel influencers
- Sentiment analysis accuracy >80% (requires manual training data)
- "Plan similar trip" action pre-populates destination and traveler count accurately
- Photo carousels load progressively without blocking feed scroll
- Privacy controls allow users to hide their own trips from network

---

**Feature F-004: Deal Alert System**

*Description:* Machine learning system monitoring pricing data for destinations in user's wishlist and preferred routes. When price drops >20% below historical average, or special promotional fares emerge, system sends alerts with time urgency indicators ("expires in 3 hours"). Includes destination filters (home city, top 10 favorite routes, price threshold, flexible date ranges). Alert frequency customizable (daily digest vs. real-time critical deals).

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* Leisure/Family (primary); Business (secondary for occasional deals); Premium (optional)

*Priority:* P1 (engagement and conversion driver)

*Acceptance Criteria:*
- Price-tracking accuracy >95% (validated against airline sources)
- Deal alert latency <15 minutes from price change detection
- Travelers report >40% conversion when clicking deal alerts
- Alert frequency customization prevents notification fatigue
- Wishlist triggers alerts only for saved destinations

---

**Feature F-005: Trending Destinations Map**

*Description:* Global heat map showing trending destinations (increasing search/booking volume) by region, with overlay indicating deal availability, seasonal factors, and sentiment (rising/stable/declining). Clickable regions drill down to specific cities with booking options. Distinct personas see different "trending" criteria: premium sees "emerging luxury destinations," Marcus sees "new business hubs," families see "trending family-friendly destinations."

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* All three personas with distinct optimization

*Priority:* P1 (visual discovery and engagement)

*Acceptance Criteria:*
- Map rendering at 60 FPS on mobile devices
- Trending data updates daily from aggregated booking/search signals
- Regional drill-down shows minimum 8-12 city options
- Persona-specific "trending" criteria clearly documented in analytics
- Heat map color coding (e.g., red = hot, blue = cold) consistent across UI

---

**Feature F-006: Visual Trip Builder**

*Description:* Drag-and-drop interface for building custom multi-leg trips. Users can visually arrange destination sequence, dates, trip duration, and activities. System suggests logical routing and optimal flight connections. Includes budget visualization (stacked bar showing cost contribution per leg). Save incomplete trip builder states for later completion.

*Journey Phase:* Inspiration & Discovery

*Persona Relevance:* Leisure/Family (primary); Premium (secondary for complex itineraries)

*Priority:* P1 (supports trip planning workflow)

*Acceptance Criteria:*
- Drag-and-drop gesture smooth at 60 FPS without lag
- System suggests routing optimization when >2 legs detected
- Budget breakdown accurate within 5% of actual booking cost
- Users can save draft trips and resume without re-entering data
- Mobile and desktop UX both support drag-and-drop pattern

---

### Journey Phase 2: Search & Booking

**Feature F-007: Multi-Modal Flight Search**

*Description:* Flight search interface supporting five input modes: (1) traditional date/destination entry, (2) calendar view showing pricing heat map for flexible dates, (3) destination + budget → system finds optimal dates, (4) conversational "I want to visit X for $Y and have Z days" → AI interprets and searches, (5) voice search "flights to Tokyo next month." All modes return unified results set with sorting by price, duration, stops, departure time, and custom composite scores (e.g., "best value" = low price + short duration).

*Journey Phase:* Search & Booking

*Persona Relevance:* All three personas; distinct UX per persona

*Priority:* P0 (core product requirement)

*Acceptance Criteria:*
- All five input modes return identical result sets for same parameters
- Results load in <3 seconds on 3G (pagination implemented)
- Sorting by price accurate to nearest $1
- Composite scoring algorithm transparent (show weighting)
- Voice search accuracy >90% on flight parameters

---

**Feature F-008: Dynamic Bundling Engine**

*Description:* AI system that bundles flight + seat + baggage + meals + lounge based on traveler persona and detected preferences. System learns from previous bookings (Alexandra always books premium seat + premium meal, Marcus always books fastest connection + premium working seat, Chen Family always books seats together + child meal options). Bundles display as single price for simplicity, with transparent itemization available on tap. Achieves 25-35% higher ancillary attach rate than à la carte picking.

*Journey Phase:* Search & Booking

*Persona Relevance:* All three personas

*Priority:* P0 (revenue and conversion optimization)

*Acceptance Criteria:*
- Bundling algorithm personalization improves from 0% to 70%+ traveler relevance
- Bundle pricing accuracy within 2% of itemized sum
- Users can override bundle recommendations and customize in <5 taps
- Ancillary attach rate increases from industry 28% to target 45%
- Booking completion rate improves >15% vs. à la carte selection

---

**Feature F-009: Family Group Booking**

*Description:* Specialized booking flow for families allowing addition of 2-6 travelers (adults + children) with single checkout. System captures age of each child to determine meal preferences, seating regulations, and family-specific bundles. Age-gated recommendations: families with toddlers see diaper-change facilities, families with teens see entertainment options. Seat selection guarantees adjacent seating across all family members with visual confirmation pre-checkout.

*Journey Phase:* Search & Booking

*Persona Relevance:* Leisure/Family (primary)

*Priority:* P0 (family segment revenue driver)

*Acceptance Criteria:*
- Family booking supports 2-6 travelers with accurate age capture
- Child age automatically determines meal/equipment recommendations
- Seat adjacency guaranteed in checkout preview with visual validation
- Family bundle pricing transparent and competitive vs. individual bookings
- Booking completion time <8 minutes for family of 4

---

**Feature F-010: Fare Prediction Calendar**

*Description:* Calendar view showing predicted fare prices for selected route over 90-day window. ML model trained on 5+ years of historical pricing data predicts fare trends with 85%+ accuracy. Visual indicators show "predicted low," "stable," and "predicted high" periods. Green checkmarks indicate predicted good-value dates. System recommends optimal booking window (buy now vs. wait). Integrates with flexible date search to show price impact of date shifts.

*Journey Phase:* Search & Booking

*Persona Relevance:* Leisure/Family (primary); Business (secondary)

*Priority:* P1 (conversion support and value messaging)

*Acceptance Criteria:*
- Prediction accuracy >85% validated against actual fares
- Calendar displays 90-day window with color-coded fare guidance
- "Optimal booking window" recommendation emerges when appropriate
- Predictions update daily as new historical data arrives
- Mobile calendar view remains scrollable and touch-friendly

---

**Feature F-011: Flexible Date Explorer**

*Description:* Interactive interface showing fares for date combinations (origin × departure date × duration × return date) as a multi-dimensional heatmap. Users can drag departure date +/- 3 days, or return date +/- 3 days, and see fare impact in real-time (<500ms). Identifies lowest-cost combinations and shows savings relative to initially searched dates.

*Journey Phase:* Search & Booking

*Persona Relevance:* All three personas

*Priority:* P1 (conversion support)

*Acceptance Criteria:*
- Heatmap updates in <500ms with no lag when dragging dates
- Fare comparisons accurate within $1
- Lowest-cost date combination highlighted with savings amount shown
- Mobile gesture support for date adjustment (swipe left/right)
- Desktop and mobile UX both enable exploration workflow

---

**Feature F-012: Seat Selection with Family Guarantee**

*Description:* Interactive seat map showing flight layout (cabin configuration, window/middle/aisle, emergency exit rows, galley, lavatory proximity). Seat selection for individuals shows preference score (predicted preference based on persona: Alexandra prefers window premium, Marcus prefers aisle with power, families prefer center blocks). For families, system guarantees adjacency: when selecting seats for family of 4, system reserves 4 adjacent or near-adjacent seats and shows visual confirmation. If preferred seats unavailable, system recommends best-available alternative maintaining family grouping.

*Journey Phase:* Search & Booking

*Persona Relevance:* All three personas; family-specific optimization for PERSONA-03

*Priority:* P0 (conversion and family satisfaction)

*Acceptance Criteria:*
- Seat map renders flight configuration accurately per airline specifications
- Family adjacency guarantee honored 98%+ of bookings
- Persona-based preference scoring shows >70% relevance
- Seat price impact displayed clearly (upgrades cost X)
- Mobile seat selection UX supports landscape rotation for full map view

---

**Feature F-013: Payment with Trip Protection**

*Description:* Checkout payment interface supporting major credit cards, digital wallets (Apple Pay, Google Pay), PayPal, and buy-now-pay-later options. At payment stage, offers optional trip protection packages: cancellation insurance (refund if trip cancelled), baggage insurance (replacement for lost/damaged bags), weather guarantee (rebooking if travel disrupted by weather), and assistance services (24/7 concierge). Protection packages presented with clear pricing and transparent terms. Default selected based on persona risk profile (premium = cancellation insurance auto-recommended, business = weather guarantee, families = baggage insurance).

*Journey Phase:* Search & Booking

*Persona Relevance:* All three personas

*Priority:* P0 (checkout completion and ancillary revenue)

*Acceptance Criteria:*
- Payment processing latency <3 seconds
- All major payment methods integrated with PCI compliance
- Trip protection packages explained in <20 seconds of reading
- Protection package opt-in/opt-out clear and easy
- Booking confirmation emailed within 5 minutes of payment

---

### Journey Phase 3: Pre-Trip Management

**Feature F-014: Trip Dashboard (Hub)**

*Description:* Central hub for all active and upcoming trips displaying: itinerary summary (departure/arrival city, date, flight number, gate/seat when available), next-action reminder ("check in 24 hours from now," "upload passport"), traveler status (checked in, boarded, etc.), weather forecast at destination, hotel/ground transport coordination, and document status (passport validity, visa status). Color-coded alerts indicate time-sensitive actions (red for <24 hours, yellow for 24-72 hours).

*Journey Phase:* Pre-Trip Management

*Persona Relevance:* All three personas

*Priority:* P0 (core trip orchestration)

*Acceptance Criteria:*
- Dashboard displays all active trips with next-action highlighted
- Itinerary accuracy matches airline data (synced via API when available)
- Color-coded urgency system prevents missed deadlines
- Mobile-optimized for quick glance view (<5 seconds to understand status)
- Dashboard updates in real-time for status changes

---

**Feature F-015: Document Vault (Secure Storage)**

*Description:* Secure, encrypted storage for traveler documents: passport scans, visa documentation, travel insurance policies, boarding passes, hotel confirmations, car rental agreements, health insurance cards, and vaccination records. Documents encrypted at rest using AES-256 and in transit using TLS 1.3. Offline access available (documents cached locally on device). Biometric authentication (face/fingerprint) required for document access. Automatic passport expiration warnings (90 days before expiry). Visa requirement checker integrated to flag needed documents.

*Journey Phase:* Pre-Trip Management

*Persona Relevance:* All three personas

*Priority:* P0 (essential travel documentation support)

*Acceptance Criteria:*
- Document encryption standard meets GDPR requirements
- Document upload/organization completes in <3 minutes for typical traveler
- Offline access verified on airplane mode
- Biometric authentication failure falls back to PIN
- Passport expiration alerts trigger 90+ days before expiry

---

**Feature F-016: Packing Intelligence**

*Description:* Smart packing checklist generated by AI based on destination weather, trip duration, itinerary activities, and persona preferences. System learns from historical packing patterns (what travelers actually pack, not generic templates). Checklists customizable by traveler. For families, separate checklists per family member with age-appropriate item recommendations. Weather-triggered updates: if destination weather changes materially, packing list updates automatically. Integration with shopping links to purchase missing items.

*Journey Phase:* Pre-Trip Management

*Persona Relevance:* Leisure/Family (primary); Premium (secondary); Business (secondary)

*Priority:* P1 (reduces pre-trip cognitive load)

*Acceptance Criteria:*
- Packing checklist generation completes in <5 seconds
- ML model personalization improves checklist relevance to >75%
- Weather-triggered updates deliver at least 24 hours before departure
- Shopping integrations work for major retailers (Amazon, Target, REI)
- Mobile UI supports drag-drop item reordering

---

**Feature F-017: Weather & Local Information**

*Description:* Destination weather forecast (current, 7-day, hourly) integrated with activity recommendations. System surfaces weather-specific concerns ("bring umbrella," "sunscreen recommended," "cold weather accessories required"). Local information includes: currency, language, cultural norms, transportation options, emergency contacts, best neighborhoods for different traveler types (families get "kid-friendly neighborhoods," business travelers get "business district guides").

*Journey Phase:* Pre-Trip Management

*Persona Relevance:* All three personas

*Priority:* P1 (pre-trip confidence building)

*Acceptance Criteria:*
- Weather forecast accuracy matches major weather services
- Cultural/local information updates monthly
- Activity-weather integration surfaces 3-5 specific recommendations
- Emergency contact information accurate and current
- Mobile view remains usable despite weather/info density

---

**Feature F-018: Anticipatory Alerts**

*Description:* Proactive notification system delivering time-sensitive travel information before travelers request it. Examples: "Flight DEL-BOS departs from Terminal 3 (not your usual Terminal 1)," "Passport expires in 45 days (visa may require 6+ months)," "Security line at your departure airport running 47 minutes (arrive 30 min earlier)," "Your connecting flight in Paris departs from Terminal 2E, 45 minutes walk from Terminal 2A arrival — tight connection." Alerts trained on historical disruption patterns and persona-specific trigger thresholds (premium travelers alerted at higher sensitivity, business travelers for efficiency, families for safety).

*Journey Phase:* Pre-Trip Management

*Persona Relevance:* All three personas

*Priority:* P0 (differentiated anticipatory value)

*Acceptance Criteria:*
- Alerts generated 24-72 hours before relevant event
- Alert accuracy >90% (false positive rate <10%)
- Personalization prevents alert fatigue (A-A travelers get fewer alerts than normal)
- Alert delivery latency <5 minutes from trigger event detection
- Travelers can snooze/dismiss alerts without disabling future alerts

---

### Journey Phase 4: Airport Experience

**Feature F-019: Today View (Day-of-Travel Dashboard)**

*Description:* Adaptive home screen specifically optimized for day-of-travel showing: current time, departure time countdown, current location, next action (depart for airport, check in online, go through security), biometric check-in status, gate assignment (when available), boarding group (when available), seat assignment, real-time security queue wait time, lounge access eligibility, and connection details (if multi-leg). Redesigned at 5:00 AM on travel day with travel-specific layout. Persona-adapted: premium traveler sees lounge/concierge options prominently, business traveler sees connection efficiency metrics, families see child-specific information (diaper facilities, family lounge access, entertainment options).

*Journey Phase:* Airport Experience

*Persona Relevance:* All three personas

*Priority:* P0 (core value differentiation on travel day)

*Acceptance Criteria:*
- "Today" view activates automatically at 5:00 AM on departure day
- Countdown timer displays time-remaining to departure in large, readable format
- Next-action recommendation updates in real-time (<30 second latency)
- Security queue time data accurate to ±10 minutes
- Persona-specific layout test with each persona validates relevance

---

**Feature F-020: Biometric Check-In Status**

*Description:* Real-time status display showing whether traveler's biometric identity (face/fingerprint enrollment) is valid for current airport, airline, and destination. If not enrolled, one-tap enrollment initiates (guided on-camera face capture or fingerprint scan). Status indicator shows: ✓ Enrolled & Valid, ⏳ Enrollment in Progress, ✕ Not Available at This Airport, or ? Additional Documentation Required. Integration with Apple Wallet for digital ID storage (where available). Pre-gate, system shows biometric boarding availability ("your face can board this flight" with one-tap activation).

*Journey Phase:* Airport Experience

*Persona Relevance:* All three personas

*Priority:* P1 (differentiated seamless check-in)

*Acceptance Criteria:*
- Biometric enrollment completes in <2 minutes on-device
- Enrollment success rate >98% (validated across device types)
- Status updates reflect airport/airline capabilities accurately
- Apple Wallet integration matches official digital ID spec
- Facial recognition accuracy >99% with spoofing prevention enabled

---

**Feature F-021: Security & Immigration Queue Times**

*Description:* Real-time integration with airport security/immigration data showing queue times by checkpoint (TSA PreCheck vs. Standard vs. International). System predicts queue time based on time-of-day, historical patterns, and current volume. Recommends checkpoint choice if multiple available (standard vs. PreCheck). For international travelers, shows estimated immigration wait time and provides required documentation checklist (passport, visa, customs declaration form).

*Journey Phase:* Airport Experience

*Persona Relevance:* All three personas

*Priority:* P1 (reduce travel anxiety)

*Acceptance Criteria:*
- Queue time accuracy >85% within ±10 minutes
- Checkpoint recommendations based on traveler status/eligibility
- Immigration documentation checklist matches destination requirements
- Data updates every 5-10 minutes from airport sources
- Mobile view displays critical queue times without excessive scrolling

---

**Feature F-022: Lounge Finder & Access**

*Description:* Interactive map and list of airport lounges accessible by traveler (via airline status, credit card benefits, paid day-pass, or partner networks like Priority Pass). For each lounge, display: amenities (shower, spa, nap pods, food quality, quiet work zones), current crowdedness (estimated occupancy %), estimated wait time for entry, and distance from current location. One-tap digital pass generation for lounge entry (or QR code display). Reservations supported for premium lounges with high occupancy.

*Journey Phase:* Airport Experience

*Persona Relevance:* Premium (primary); Business (secondary)

*Priority:* P1 (premium experience differentiation)

*Acceptance Criteria:*
- Lounge database updated monthly with current amenity list
- Crowdedness prediction accuracy >75%
- Digital pass generation completes in <5 seconds
- QR code display works offline (cached locally)
- Lounge reservation system integrates with partner networks

---

**Feature F-023: Wayfinding (Airport Navigation)**

*Description:* Interactive airport map showing traveler's current location (via Bluetooth beacons or location approximation) and optimal path to gate/lounge/security/retail. System accounts for accessibility needs (elevator vs. stairs, rest areas). Provides turn-by-turn navigation similar to Google Maps. For families, wayfinding highlights family-specific facilities (family restrooms, play areas, nursing rooms). Alerts when gate change occurs ("your gate has changed from C5 to D12 — new route available").

*Journey Phase:* Airport Experience

*Persona Relevance:* All three personas; family-specific for PERSONA-03

*Priority:* P1 (reduces airport confusion)

*Acceptance Criteria:*
- Wayfinding accuracy within 20 meters of actual location
- Route recalculation completes in <2 seconds on gate change
- Accessibility accommodation options clear and easy to select
- Turn-by-turn guidance works offline with downloaded airport maps
- Mobile gesture supports landmark-based navigation (tap gate on map)

---

**Feature F-024: Gate & Boarding Status**

*Description:* Real-time boarding status dashboard showing: gate assignment (updates immediately on change), boarding groups (if airline publishes), boarding time estimate, on-time departure probability (predicted from historical data), connection alert if multi-leg ("you have 62 minutes to reach next gate"), and current line position if digital queue is available. Audio/haptic alert when boarding begins for traveler's group. Post-boarding, shows aircraft departure push-back time and runway taxi sequence (via integration with airport data).

*Journey Phase:* Airport Experience

*Persona Relevance:* All three personas

*Priority:* P0 (critical departure coordination)

*Acceptance Criteria:*
- Gate assignment updates within 2 minutes of airline publishing
- Boarding group accuracy matches airline data
- Connection alerts surface only when connection time <90 minutes
- Audio alert configurable (silent, vibrate, audible) per traveler preference
- Push-back time estimate accuracy >85% within ±3 minutes

---

### Journey Phase 5: In-Flight

**Feature F-025: Connected Cabin Dashboard**

*Description:* Seatback screen alternative via personal device showing: flight progress (map, altitude, speed, time-to-destination), cabin service status (meal/beverage service timing, lavatory queue status via sensors), weather at current location and destination, entertainment library (movies, TV, games), productivity tools (flight WiFi login, Bluetooth pairing for headphones), and cabin alerts ("mild turbulence expected in 5 minutes," "cabin service pausing during descent").

*Journey Phase:* In-Flight

*Persona Relevance:* All three personas; business-specific for Marcus, premium-specific for Alexandra

*Priority:* P1 (enhances in-flight engagement)

*Acceptance Criteria:*
- Dashboard connects to in-flight WiFi with <30 second setup
- Flight progress map updates every 30 seconds
- Entertainment content library loads progressively
- WiFi login persists across app restarts
- Offline mode displays cached flight progress and entertainment

---

**Feature F-026: IFE Integration (Entertainment System)**

*Description:* Integration with airline in-flight entertainment systems allowing control via personal device: play/pause/rewind video, browse entertainment library, browse meal menu, and order duty-free items. Syncs watch history across flights (resume movie interrupted on previous flight). Smart recommendations based on genre history and flight duration. For families, parental controls limit content by rating.

*Journey Phase:* In-Flight

*Persona Relevance:* All three personas; family-optimized for PERSONA-03

*Priority:* P1 (premium experience enhancement)

*Acceptance Criteria:*
- IFE integration works on 80%+ of Boeing/Airbus aircraft with seatback systems
- Video playback sync latency <1 second
- Movie resume functionality works across multiple trips
- Entertainment recommendations show >70% relevance
- Parental controls accurately enforce rating restrictions

---

**Feature F-027: Meal Tracking & Preferences**

*Description:* Meal service tracking system showing: meal timing (when service begins, current status), meal options (main, beverage, snack), dietary accommodation status (vegetarian, vegan, kosher, halal, gluten-free — tracked from booking). Allows in-flight meal preference modification (switch main protein, request additional items). Post-meal survey (quick 3-question satisfaction rating) used to personalize future flight meals. For families, highlights child meal options and timing (children often served before adults).

*Journey Phase:* In-Flight

*Persona Relevance:* All three personas; family-optimized for PERSONA-03

*Priority:* P1 (personalization and satisfaction)

*Acceptance Criteria:*
- Dietary accommodation accuracy 100% (preference pulled from booking)
- Meal timing alerts delivered within 5 minutes of actual service start
- In-flight preference modification processed immediately
- Post-meal survey response rate >40% with sentiment accuracy >80%
- Meal recommendation personalization improves with each flight

---

**Feature F-028: Wellness Features (Hydration, Movement, Sleep)**

*Description:* In-flight wellness toolkit featuring: (1) Hydration reminders at optimal intervals ("drink water now for better jet lag recovery"), (2) Movement prompts showing simple exercises that can be done in seat or aisle, (3) Sleep optimizer showing optimal sleep window based on time zone difference and circadian rhythm disruption, (4) Oxygen saturation monitoring via smartwatch integration (when available), (5) Post-flight recovery guide (sleep timing, meal timing, light exposure).

*Journey Phase:* In-Flight

*Persona Relevance:* Business (primary for Marcus); Premium (secondary); Leisure (secondary)

*Priority:* P2 (wellness differentiation, optional for launch)

*Acceptance Criteria:*
- Hydration reminders based on flight duration and cabin humidity
- Exercise prompts include illustrations and 60-second video demos
- Sleep window calculation based on Circadian rhythm science
- Smartwatch integration verified on Apple Watch and Wear OS
- Post-flight recovery guide generates within 10 minutes of landing

---

**Feature F-029: Productivity Mode**

*Description:* Optimized mode for business travelers who need to work in-flight. Includes: (1) WiFi connectivity setup and speed optimization, (2) Focus mode that suppresses non-critical notifications, (3) External keyboard/trackpad pairing guides (via Bluetooth), (4) Document collaboration tools (Google Docs, Microsoft 365 access), (5) Meeting scheduler with time zone conversion, (6) Email optimization (offline drafts sync when WiFi available).

*Journey Phase:* In-Flight

*Persona Relevance:* Business (PERSONA-02, primary)

*Priority:* P1 (Marcus segment requirement)

*Acceptance Criteria:*
- WiFi connection completes in <2 minutes with success rate >95%
- Focus mode suppression tested with 5+ notification types
- External keyboard pairing guides verified on 3+ device types
- Offline email drafting syncs within 5 seconds of WiFi reconnection
- Meeting scheduler time zone accuracy 100% for major zones

---

**Feature F-030: Family Entertainment Hub**

*Description:* Curated entertainment center for families on flights. Includes: (1) Age-appropriate content recommendations (filtering by MPAA/other ratings), (2) Multiplayer games playable across family members' devices (drawing, trivia, scavenger hunt), (3) Activity cards (word games, travel journal prompts, educational content), (4) Distraction management tools (countdown timers, progress bars showing time remaining on flight), (5) Shared memory capture (passengers photograph moments, which compile into shared family album at trip end).

*Journey Phase:* In-Flight

*Persona Relevance:* Leisure/Family (PERSONA-03, primary)

*Priority:* P1 (family segment differentiation)

*Acceptance Criteria:*
- Age-appropriate filtering accuracy 100% for major content types
- Multiplayer game latency <200ms for turn-based games
- Activity card library includes 50+ unique activities
- Countdown timer UI age-appropriate (visual progress for children)
- Family album compiles photos automatically within 24 hours of landing

---

### Journey Phase 6: IROPS & Recovery

**Feature F-031: Proactive Disruption Alerts**

*Description:* Machine learning system continuously monitoring flight operation status and proactively alerting travelers of disruption likelihood. Alert logic: weather system likely to impact route (triggered 72+ hours pre-flight), mechanical issues detected in aircraft maintenance history (triggered 48+ hours pre-flight), crew scheduling conflicts (triggered 24 hours pre-flight). Each alert includes likelihood estimate ("80% chance of delay"), estimated delay duration, and recommended actions ("book flexible ticket," "pre-request earlier flight"). Alert threshold customizable by persona (premium traveler = higher sensitivity alert threshold, receive more alerts).

*Journey Phase:* IROPS & Recovery

*Persona Relevance:* All three personas

*Priority:* P0 (core value — anticipatory recovery)

*Acceptance Criteria:*
- Disruption prediction accuracy >80% for 72+ hour predictions
- Alert false positive rate <15% (avoid alert fatigue)
- Alert timing appropriate (early enough to act, not too early to forget)
- Recommended actions include concrete next steps (rebooking link, etc.)
- Persona-customizable alert thresholds tested with 3+ personas

---

**Feature F-032: Automatic Rebooking Engine**

*Description:* When flight disruption occurs (delay >3 hours, cancellation), system automatically identifies and proposes rebooking options prioritized by: (1) Same airline (preserve loyalty benefits), (2) Direct flight alternative (minimize additional disruption), (3) Next available departure (minimize travel time loss), (4) Alternative airline (if same-airline not available within reasonable timeframe). For each option, system shows: departure time, duration, price (refund if applicable), and traveler impact (connection implications, accommodation needs). One-tap rebooking approval or manual selection of alternative. For families, system ensures family grouping remains intact during rebooking.

*Journey Phase:* IROPS & Recovery

*Persona Relevance:* All three personas; family-safe rebooking for PERSONA-03

*Priority:* P0 (critical IROPS value)

*Acceptance Criteria:*
- Rebooking option identification completes within 2 minutes of disruption
- Same-airline rebooking offered when available within 24 hours
- Family grouping maintained 98%+ of rebooking scenarios
- Rebooking approval completes in <30 seconds
- System maintains traveler communication throughout recovery process

---

**Feature F-033: Alternative Routing Finder**

*Description:* When direct rebooking not available, system identifies alternative routing through connection hubs (One-stop, two-stop options). Evaluates: connection time adequacy, aircraft changes, luggage recheck requirements, and cost-benefit of waiting for direct vs. accepting connection. Shows traveler estimated arrival time comparison (direct in 4 hours, one-stop arrives in 8 hours but available now vs. 6-hour delay for direct). Includes hotel/meals compensation calculation if overnight connection required.

*Journey Phase:* IROPS & Recovery

*Persona Relevance:* All three personas; distinct optimization per persona (premium minimizes stops, business minimizes arrival delay, family minimizes disruption)

*Priority:* P0 (recovery enabler)

*Acceptance Criteria:*
- Alternative routing identification includes minimum 3 options per disruption
- Connection adequacy assessment accurate (realistic transition times)
- Cost-benefit comparison transparent and quantified
- Compensation calculation accurate per airline policy
- Mobile presentation of multi-option comparison clear and scannable

---

**Feature F-034: Hotel & Transport Vouchers**

*Description:* When disruption requires overnight accommodation or additional transportation, system automatically generates and displays hotel/transport vouchers from airline partners. For hotels, displays: star rating, distance from airport, free cancellation policy, and one-tap booking. For ground transport, displays: rental car, ride-share, rail options with pricing. Voucher redemption integrated into booking flow (automatic redemption of airline credits). Family-optimized display shows family-room requirements.

*Journey Phase:* IROPS & Recovery

*Persona Relevance:* All three personas; family-room requirement for PERSONA-03

*Priority:* P1 (required for full recovery experience)

*Acceptance Criteria:*
- Hotel voucher database updated weekly with availability
- Distance calculation from airport accurate to nearest 0.1 mile
- Transport options include 3+ modalities (rental, ride-share, rail)
- Voucher redemption completes automatically with airline credit
- Family room options clearly marked with capacity

---

**Feature F-035: Family-Aware Rebooking**

*Description:* Specialized rebooking logic for families ensuring all family members (parents + children) are rebooked together on same flight when possible. System prioritizes: same airline → same departure time → maintaining adjacent seating. If same-flight rebooking not available, system offers alternatives with reasoning ("next direct flight is 8 hours later, but available with all family members on same flight"). Family communication during rebooking handled through shared family trip dashboard (all family members receive same notifications).

*Journey Phase:* IROPS & Recovery

*Persona Relevance:* Leisure/Family (PERSONA-03, primary)

*Priority:* P0 (family trust and satisfaction)

*Acceptance Criteria:*
- Family togetherness maintained 98%+ of rebooking scenarios
- Adjacent seating preserved or re-established post-rebooking
- Family trip dashboard shows consistent information across all family member devices
- Rebooking reasoning transparent ("kept family together" or "next available within 12 hours")
- Child-specific needs (meals, equipment) maintained in rebooking

---

### Journey Phase 7: Post-Trip

**Feature F-036: Trip Recap & Memory Timeline**

*Description:* Automatic compilation of trip into visual timeline including: photos from trip (auto-collected from gallery or manual upload), key moments (flight departures, arrivals, memorable activities), check-ins, social media posts (if shared), and trip highlights. System automatically generates trip summary ("You visited 3 cities, flew 2,847 miles, spent 7 days away"). Compilation happens within 24 hours of trip completion. Timeline is shareable with friends/family. Generates annual travel report ("2025 Year in Travel: 12 trips, 47,000 miles, 4 countries").

*Journey Phase:* Post-Trip

*Persona Relevance:* Leisure/Family (primary); Premium (secondary); Business (secondary)

*Priority:* P1 (engagement and retention)

*Acceptance Criteria:*
- Photo detection and compilation reaches >80% of trip photos
- Timeline generation completes within 24 hours of last flight arrival
- Trip summary accuracy validated with traveler (distance, cities, duration)
- Annual travel report generates automatically on calendar year end
- Timeline sharing integrates with major social platforms

---

**Feature F-037: Expense Management & Reconciliation**

*Description:* Automatic categorization and reconciliation of all trip expenses: flights, hotels, ground transport, meals, activities, and ancillary purchases. System pulls receipt data from email confirmation emails (airline, hotel, rental car) and manual credit card integration (for meals/activities). Expense categorization accurate 95%+ of the time. Integration with corporate expense systems (for business travelers) to auto-populate business expense reports. Receipt storage with searchable archive. Per-trip expense summary showing total cost, cost per person (for group trips), and category breakdown.

*Journey Phase:* Post-Trip

*Persona Relevance:* Business (PERSONA-02, primary); Premium (secondary); Leisure (secondary)

*Priority:* P1 (Marcus segment requirement for policy compliance)

*Acceptance Criteria:*
- Expense auto-detection pulls data from 50+ email receipt sources
- Expense categorization accuracy 95%+ validated on 500+ transactions
- Corporate expense system integration tested with 3+ major platforms
- Receipt storage and retrieval completes in <2 seconds
- Per-trip summary accuracy within 1% of actual total spend

---

**Feature F-038: Loyalty Points Summary & Optimization**

*Description:* Automatic compilation of all loyalty points earned across trip: airline frequent flyer miles, hotel points, credit card rewards, and partner program bonuses. System calculates total value of points earned (in USD equivalent). Recommends highest-value redemption options for earned miles. Integration with major airline frequent flyer programs to auto-deposit points when possible. Annual loyalty summary showing points earned trajectory and estimated value.

*Journey Phase:* Post-Trip

*Persona Relevance:* Premium (PERSONA-01, primary); Business (PERSONA-02, secondary)

*Priority:* P1 (loyalty engagement)

*Acceptance Criteria:*
- Points auto-deposit to 15+ airline loyalty programs
- Points value calculation within 2% of official program valuation
- Redemption recommendations show top 3 highest-value options per program
- Annual loyalty summary generates automatically on calendar year end
- Mobile UI displays points balance prominently on home screen

---

**Feature F-039: Feedback & Satisfaction Survey**

*Description:* Post-trip multi-question satisfaction survey capturing: overall trip satisfaction (1-10 NPS), flight experience satisfaction, accommodation satisfaction, value-for-money rating, and open-text feedback. Survey distributed 24-48 hours after trip completion (optimal timing for recall). Feedback used to personalize future recommendations and identify service failures. NPS aggregation tracks product-level NPS over time. Traveler can opt-in to share feedback with airline (premium travelers and business travelers get premium support if feedback is shared).

*Journey Phase:* Post-Trip

*Persona Relevance:* All three personas

*Priority:* P1 (voice-of-customer and continuous improvement)

*Acceptance Criteria:*
- Survey response rate >40% with completion time <3 minutes
- NPS question formatted per standard Bain methodology
- Feedback sentiment analysis accuracy >85%
- Product-level NPS dashboard updated daily
- Traveler opt-in sharing maintains privacy and does not auto-share without consent

---

**Feature F-040: Trip Analytics & Insights**

*Description:* Personal trip dashboard showing analytics: most-visited destinations (frequency heatmap), favorite airlines/airports (based on repeat bookings), travel spending trends (price paid per mile over time, ancillary spending patterns), travel frequency (trips per month/year), and seasonal patterns (when does traveler most often travel). Insights surface: "You save 12% on average when booking flights 4-6 weeks in advance" or "Your preferred hotel brand generates 2 points per dollar vs. 1.5 for alternatives." These insights drive future booking behavior optimization.

*Journey Phase:* Post-Trip

*Persona Relevance:* All three personas; distinct optimization per persona (premium sees luxury destination clusters, business sees productivity metrics, families see value metrics)

*Priority:* P2 (engagement and retention optimization)

*Acceptance Criteria:*
- Trip frequency tracking accurate 100% (based on completed bookings)
- Spending trend analysis includes minimum 24 months of history
- Insight personalization shows >70% relevance per persona
- Heatmap visualization renders on mobile without excessive data load
- Annual analytics summary generates automatically

---

**Feature F-041: Re-Booking Suggestions**

*Description:* Post-trip system analyzing traveler's past destinations and behavioral patterns to surface relevant future trip suggestions. For Alexandra (premium), suggests exclusive destinations matching luxury preferences. For Marcus (business), suggests business conference destinations and city pairs he hasn't visited from his frequent base cities. For families, suggests family-friendly destinations based on children's ages. Suggestions include estimated airfare and "best time to visit" recommendation based on weather/pricing seasonality.

*Journey Phase:* Post-Trip

*Persona Relevance:* All three personas

*Priority:* P2 (engagement loop and future bookings)

*Acceptance Criteria:*
- Suggestion relevance >70% per persona (measured by click-through and booking rates)
- Destination suggestions include traveler's previous trips + 5-10 novel options
- Airfare estimate accuracy within 10% of actual booking prices
- "Best time to visit" recommendation based on 5+ year historical pricing

---

## 5. Screen Map & Key Flows (1,800 words)

### Screen Inventory (20 screens total)

| Screen ID | Screen Name | Purpose | Primary Persona | Data Requirement |
|-----------|------------|---------|-----------------|------------------|
| SCR-001 | Onboarding / Welcome | First-time user setup, persona detection, biometric enrollment | All | User preferences, device info |
| SCR-002 | Home / Today View | Adaptive dashboard showing next actions, active trips, alerts | All | Trip data, real-time status |
| SCR-003 | Discover / Inspiration Feed | AI-powered destination cards, trending, deals, social discovery | All | Destination DB, pricing, user history |
| SCR-004 | Search (Flight Search) | Multi-modal flight search input interface | All | Flight inventory, pricing |
| SCR-005 | Search Results / Fare Explorer | Flight results with sorting, filtering, price calendar | All | Real-time flight data |
| SCR-006 | Flight Detail / Seat Selection | Flight details, seat map, ancillary selection | All | Aircraft config, pricing |
| SCR-007 | Booking Flow / Checkout | Bundle presentation, payment, confirmation | All | Payment gateway, booking engine |
| SCR-008 | Trip Dashboard (Active) | Central hub for active/upcoming trip management | All | Trip data, status data |
| SCR-009 | Document Vault | Secure storage and retrieval of travel documents | All | Encrypted document storage |
| SCR-010 | Airport Live (Day-of-Travel) | Gate status, queue times, boarding, biometric check-in | All | Airport real-time data |
| SCR-011 | Gate & Boarding | Boarding status, group assignment, gate alerts | All | Airline boarding data |
| SCR-012 | In-Flight Experience | Cabin dashboard, entertainment, meals, wellness | All | IFE system integration |
| SCR-013 | IROPS / Disruption Recovery | Alerts, rebooking options, hotel/transport vouchers | All | Disruption detection, inventory |
| SCR-014 | Trip Recap / Post-Trip | Memory timeline, expense summary, loyalty points | All | Trip completion data, photos |
| SCR-015 | Profile & Loyalty | Loyalty account management, tier status, preferences | All | Loyalty program data |
| SCR-016 | AI Copilot | Conversational chat interface with booking capabilities | All | NLP engine, booking integration |
| SCR-017 | Settings & Preferences | User preferences, notification settings, privacy controls | All | User settings storage |
| SCR-018 | Family Hub | Family group management, shared trip dashboard | PERSONA-03 | Family member data |
| SCR-019 | Notifications Center | Alert history, notification preferences, dismissed alerts | All | Notification database |
| SCR-020 | Lounge Finder | Interactive lounge map, amenities, access status | PERSONA-01, 02 | Lounge database |

### Screen Definitions

**SCR-001: Onboarding / Welcome**

Purpose: First-time user enrollment and persona detection. Sequence: (1) Welcome screen explaining AirThere value proposition, (2) Traveler type questionnaire (3-5 quick questions identifying persona), (3) Biometric enrollment (face or fingerprint), (4) Frequent flyer account linking, (5) Home screen orientation.

Key Components: Welcome hero image, persona selection (Alexandra/Marcus/Chen Family), biometric camera interface, account linking flows.

Persona-Specific Adaptations: Premium travelers skip lengthy questionnaires (direct to biometric enrollment), business travelers jump to policy/loyalty setup, families walk through family member addition.

Entry/Exit Points: Entry = new user installation. Exit = home screen (SCR-002).

---

**SCR-002: Home / Today View**

Purpose: Adaptive dashboard serving as entry point on every app open. Context-aware redesign: (1) Pre-travel mode (5+ days out): shows inspiration, upcoming trips, alerts; (2) Pre-departure mode (calendar day of travel): shows TODAY VIEW with departure countdown, next actions, biometric status, gate assignment; (3) In-flight mode: shows flight progress, in-flight entertainment options, meals; (4) Post-trip mode: shows trip recap, loyalty summary.

Key Components: Trip countdown timer, next-action recommendations, active trip summary, alerts banner, inspiration feed carousel, navigation tab bar.

Persona-Specific Adaptations: Alexandra sees premium lounges and status recognition prominently; Marcus sees productivity tools and policy compliance status; Chen Family sees family itinerary summary with all family members' check-in status.

Entry/Exit Points: Entry = app launch. Exit = any screen (deep linking via feed cards, navigation tabs).

---

**SCR-003: Discover / Inspiration Feed**

Purpose: Engaged, inspirational discovery experience separate from utilitarian search. Infinite-scroll feed of destination cards with photography, highlights, deal indicators. Machine learning personalization weights destinations by user history, persona, season, and trending popularity.

Key Components: Destination cards (image, city name, top attractions, price range, deal badge), save to wishlist button, "plan similar trip" action, trending destinations section, deal alert sign-up.

Persona-Specific Adaptations: Alexandra sees luxury/exclusive destinations, Marcus sees business hubs and conference destinations, families see family-friendly vacation destinations.

Entry/Exit Points: Entry = home feed card or tab navigation. Exit = destination selection (→ SCR-004 Search) or card save (→ wishlist).

---

**SCR-004: Search (Flight Search)**

Purpose: Multi-modal search input supporting five interaction patterns: traditional form entry, calendar heat map, conversational ("I want to visit X for $Y"), voice input, and visual destination picker. All modes return identical result set.

Key Components: Search form (origin, destination, dates, travelers), calendar heat map (optional), voice input button, destination picker map, "search for me" AI assistance link.

Persona-Specific Adaptations: Marcus optimizes for speed (search form pre-populated with frequent routes), families see family traveler count selector prominently, premium travelers see flexible date/budget options.

Entry/Exit Points: Entry = discover card, home screen search button, notifications. Exit = search results (SCR-005).

---

**SCR-005: Search Results / Fare Explorer**

Purpose: Flight results display with multiple sorting options (price, duration, departure time, custom scores) and fare prediction visualization. Includes flexible date explorer showing price changes with date shifts. Results paginate with 8-10 per page.

Key Components: Flight result cards (departure time, arrival time, price, stops, airline logo), sorting/filtering sidebar, flexible date slider (±3 days), fare prediction graph, "book now" button per flight.

Persona-Specific Adaptations: Alexandra sees premium cabin availability and amenity indicators, Marcus sees connection time and policy compliance status, families see seat availability confirmation.

Entry/Exit Points: Entry = search (SCR-004). Exit = flight detail (SCR-006).

---

**SCR-006: Flight Detail / Seat Selection**

Purpose: Complete flight information display and seat selection interface. Shows: flight routing map, aircraft type, equipment reliability (historical on-time %), amenities (WiFi, power, meal service), ancillary options, and interactive seat map.

Key Components: Flight info summary, seat map (interactive, color-coded by availability/price), seat pricing tier explanation, selected seats summary, continue to checkout button.

Persona-Specific Adaptations: Premium travelers see premium cabin details and lounge access; business travelers see seat features (power outlet, aisle access) highlighted; families see family bundle pricing and adjacency guarantee.

Entry/Exit Points: Entry = search results (SCR-005). Exit = checkout (SCR-007).

---

**SCR-007: Booking Flow / Checkout**

Purpose: Multi-step checkout flow: (1) Trip summary review, (2) Traveler name/contact entry, (3) Ancillary selection (presented as smart bundles), (4) Trip protection options, (5) Payment method selection, (6) Confirmation.

Key Components: Trip summary cards, passenger form fields, bundle recommendation cards, payment form, trip protection selector, confirmation button.

Persona-Specific Adaptations: Alexandra sees premium protection options and concierge booking assistance; Marcus sees policy compliance status and expense categorization; families see child traveler forms and family bundle pricing.

Entry/Exit Points: Entry = seat selection (SCR-006). Exit = confirmation page.

---

**SCR-008: Trip Dashboard (Active)**

Purpose: Central hub for active and upcoming trips. Displays: itinerary summary, weather at destination, hotel/ground transport status, document checklist (passport, visa), next actions with time-based urgency, and traveler group status (for families).

Key Components: Trip card (departure/arrival info, dates, status), weather widget, document status checklist, next-action recommendations, weather forecast, hotel/transport summary.

Persona-Specific Adaptations: Alexandra sees concierge contact options and premium experience pre-briefing; Marcus sees expense tracking and policy compliance summary; families see all family members' check-in status and shared trip planner.

Entry/Exit Points: Entry = active trip notification, home screen, or navigation. Exit = specific feature screens (documents, packing, airport live).

---

**SCR-009: Document Vault**

Purpose: Encrypted storage and organization of travel documents. Supports: passport scans, visa documents, travel insurance, boarding passes, hotel confirmations. Offline access available. Biometric authentication required.

Key Components: Document categories (passport, visas, insurance, confirmations), upload button, document list with expiration status, biometric auth, offline indicator.

Persona-Specific Adaptations: All personas identical structure; families see child passport storage separately.

Entry/Exit Points: Entry = trip dashboard or navigation. Exit = document view or upload.

---

**SCR-010: Airport Live (Day-of-Travel)**

Purpose: Completely redesigned home screen optimized for day-of-travel showing: current time, departure time, countdown timer, current location, next action, biometric check-in status, gate assignment (when available), security queue wait time, and lounge access.

Key Components: Large countdown timer, next-action button, gate status card, security queue time, biometric check-in button, lounge finder button, boarding group (when available).

Persona-Specific Adaptations: Alexandra sees lounge options first; Marcus sees connection time adequacy and gate information; families see child-specific information (diaper facilities, family lounge).

Entry/Exit Points: Entry = automatic on travel day morning (5:00 AM+). Exit = gate/boarding screen.

---

**SCR-011: Gate & Boarding**

Purpose: Real-time boarding status and gate updates. Shows: gate assignment (with terminal/concourse info), boarding groups (if airline publishes), current line position (if available), on-time probability, connection alerts (if multi-leg), and push-back time estimate.

Key Components: Gate assignment (large, prominent), boarding status card, boarding group display, connection alert banner, audio alert controls, historical on-time data.

Persona-Specific Adaptations: Business travelers see connection time adequacy; families see child boarding information.

Entry/Exit Points: Entry = airport live screen or notification. Exit = in-flight screen.

---

**SCR-012: In-Flight Experience**

Purpose: Personal device alternative to seatback screen. Shows: flight progress (map, altitude, speed, ETA), cabin service status (meal/beverage timing, lavatory queue), entertainment, productivity tools, meal preferences, and wellness features.

Key Components: Flight progress map, cabin service status, entertainment library carousel, productivity tool shortcuts (WiFi, Bluetooth), meal service tracker, wellness tips, in-flight chat with flight crew (where available).

Persona-Specific Adaptations: Marcus sees productivity mode, families see entertainment hub and child entertainment options, premium travelers see premium meal details and lounge services at destination.

Entry/Exit Points: Entry = in-flight WiFi connection or app launch during flight. Exit = landing notification.

---

**SCR-013: IROPS / Disruption Recovery**

Purpose: Comprehensive disruption management. Triggered by disruption alert showing: alert details, rebooking options (same airline → alternative airline → connection options), hotel/transport vouchers, compensation calculation, and recommended action with one-tap approval.

Key Components: Alert banner (red, prominent), disruption reason explanation, rebooking options cards (each showing departure time, duration, price change, advantage/disadvantage), hotel/transport options, compensation summary, approval button.

Persona-Specific Adaptations: Business travelers see productivity impact calculation; families see family grouping assurance; premium travelers see service recovery options (premium cabin guarantee).

Entry/Exit Points: Entry = alert notification. Exit = rebooking confirmation or manual alternative selection.

---

**SCR-014: Trip Recap / Post-Trip**

Purpose: Memory timeline and expense summary generated automatically after trip completion. Includes: photo timeline, trip summary ("you visited X cities, flew Y miles"), expense breakdown, loyalty points earned, satisfaction survey, and share options.

Key Components: Photo timeline carousel, trip summary stats, expense category breakdown (flight, hotel, meals, activities), loyalty points summary, NPS survey prompt, share buttons (social media, email).

Persona-Specific Adaptations: Premium travelers see luxury experience highlights and premium service acknowledgments; business travelers see expense summary and policy compliance confirmation; families see family memory moments.

Entry/Exit Points: Entry = post-landing automatically (24 hours after final flight). Exit = home screen or discovery.

---

**SCR-015: Profile & Loyalty**

Purpose: Account management and loyalty program integration. Shows: profile information, loyalty program accounts (airline, hotel, credit card), tier status with progress to next tier, upcoming benefits expiration, and account settings (name, contact, preferences).

Key Components: Profile header, loyalty account list, tier status progress bars, upcoming expiration warnings, account settings link.

Persona-Specific Adaptations: Premium travelers see elite status visibility and perks list; business travelers see policy and account linking; families see family account linking options.

Entry/Exit Points: Entry = navigation menu. Exit = settings or linked loyalty accounts.

---

**SCR-016: AI Copilot**

Purpose: Conversational interface for travel assistance. Supports: flight search ("flights to Tokyo under $800"), booking assistance ("book my return to NYC for next weekend"), trip management ("change my seat to window"), and natural language queries. Conversation maintains context across multiple turns.

Key Components: Chat bubble interface, message input field, suggested actions (chips), quick action buttons (search, book, help).

Persona-Specific Adaptations: Marcus sees productivity-focused suggestions; families see family-group booking suggestions; premium travelers see luxury experience suggestions.

Entry/Exit Points: Entry = copilot button (usually floating action button or navigation). Exit = action completion or minimization.

---

**SCR-017: Settings & Preferences**

Purpose: User preference configuration and privacy controls. Includes: notification preferences (frequency, channels), privacy settings (data usage consent, tracking), accessibility options, language/locale, dark mode toggle, app performance settings.

Key Components: Preference category list (notifications, privacy, accessibility, app), toggle switches and selection inputs, reset to default option, privacy policy link.

Persona-Specific Adaptations: All personas identical structure.

Entry/Exit Points: Entry = navigation menu or home screen settings. Exit = preference save or cancellation.

---

**SCR-018: Family Hub**

Purpose: Family group management for families booking together. Shows: family member list with status (checked in, boarded, arrived), shared trip dashboard (all family members see same information), group seat selection status, and family-level notifications.

Key Components: Family member list cards, shared trip summary, group boarding status, seat map showing all family members, shared document checklist.

Persona-Specific Adaptations: Families only (PERSONA-03). Parents see admin controls; children see simplified information.

Entry/Exit Points: Entry = trip dashboard or navigation (families only). Exit = member profile or trip detail.

---

**SCR-019: Notifications Center**

Purpose: Centralized notification history and management. Shows: all notifications sent (chronological), notification preferences per type, ability to dismiss/snooze, and notification filtering (by trip, by alert type).

Key Components: Notification list (reverse chronological), filter tabs (all, alerts, updates, reminders), dismiss/snooze buttons per notification, notification preferences link.

Persona-Specific Adaptations: All personas identical structure; frequency/urgency weighting differs per persona.

Entry/Exit Points: Entry = notifications icon or home screen. Exit = notification detail or preference adjustment.

---

**SCR-020: Lounge Finder**

Purpose: Interactive lounge discovery and access for premium/business travelers. Shows: map of airport lounges, amenities per lounge (shower, spa, food quality, quiet zones), current crowdedness estimation, access eligibility check, and one-tap digital pass generation.

Key Components: Interactive airport map, lounge list (filterable by amenity), amenity icons and descriptions, crowdedness indicator, access eligibility badge, digital pass button.

Persona-Specific Adaptations: Premium and business travelers only. Premium travelers see luxury lounge options; business travelers see productivity lounges.

Entry/Exit Points: Entry = airport live screen, notification, or navigation. Exit = digital pass or lounge detail.

---

### Key User Flows (6 detailed flows)

#### Flow 1: First-Time Onboarding → Persona Detection → Home

1. User installs app and opens for first time
2. Welcome screen displays AirThere value proposition (1-2 sentences)
3. Persona detection: 5-question assessment (travel frequency, preference for bundling, family size, etc.)
4. System categorizes user into PERSONA-01, PERSONA-02, or PERSONA-03
5. Biometric enrollment: guided face/fingerprint capture (2-3 attempts if necessary)
6. Frequent flyer account linking: optional but recommended (link 2-3 most-used airlines)
7. Home screen (SCR-002) displays with persona-optimized layout, shows onboarding completion celebration
8. First inspiration cards load with persona-specific destinations

**Duration Target:** <4 minutes total
**Success Metric:** 95%+ completion rate, >90% biometric enrollment

---

#### Flow 2: Search → Results → Select → Seat → Checkout → Confirmation

1. User taps search on home screen or discovers destination (SCR-003)
2. Search input screen (SCR-004) loads with origin pre-filled (if repeat traveler)
3. User enters destination, dates, traveler count (multi-modal input options available)
4. Search results load (SCR-005) sorted by recommended option first
5. User selects flight, views fare prediction guidance ("good value" or "wait")
6. Flight detail screen (SCR-006) shows aircraft info, flight routing, amenities, seat map
7. User selects seat(s); seat pricing displayed in context
8. System recommends bundle based on persona ("premium cabin + premium meal" or "aisle + extra legroom")
9. User approves bundle or customizes in sidebar
10. Checkout flow (SCR-007) presents: trip summary, traveler form, bundle confirmation, trip protection offer, payment method
11. User enters/confirms payment
12. Confirmation screen shows booking reference, itinerary summary, digital boarding pass (for Apple Wallet compatible flights)

**Duration Target:** <5 minutes for Marcus, <10 minutes for Chen Family
**Success Metric:** >60% completion rate, <40% booking abandonment

---

#### Flow 3: Day-of-Travel: Home → Airport Live → Security → Gate → Boarding

1. User opens app on travel day morning (5:00 AM+)
2. Home screen automatically switches to "Airport Live" view (SCR-010)
3. Large countdown timer dominates screen, next action highlighted ("depart for airport in 2 hours")
4. User navigates to airport
5. At airport, biometric check-in button available ("tap to check in")
6. User taps biometric button, system validates enrollment
7. Check-in confirmation notification sent
8. Security queue time displayed; user navigates to suggested checkpoint
9. User proceeds through security with biometric identity validated
10. At gate, gate assignment displays (updated in real-time)
11. Boarding alert notification triggers when boarding begins for traveler's group
12. User taps boarding button or presents digital boarding pass via Apple Wallet
13. Boarding confirmation sent

**Duration Target:** <2 minutes total interactive time
**Success Metric:** 85%+ biometric check-in adoption, 0 missed gates due to app notification failure

---

#### Flow 4: Disruption → Alert → Rebooking Options → Confirmation → Updated Itinerary

1. Disruption occurs (flight delay 3+ hours or cancellation)
2. Alert notification immediately sent with disruption details ("flight delayed 4 hours due to weather")
3. Alert screen (SCR-013) auto-opens showing: disruption reason, rebooking options ranked by suitability
4. System proposes primary option (same airline, earliest departure, closest arrival time)
5. User can approve primary option with one tap or review alternatives
6. Alternative options show: departure time, duration, price impact (refund/upcharge), and advantage summary ("arrives 2 hours earlier but 1 connection")
7. For families, system emphasizes family grouping ("all family members on same flight")
8. User taps approval button
9. Rebooking confirmation sent with new flight details
10. Trip dashboard (SCR-008) auto-updates with new itinerary
11. Hotel/transport vouchers auto-generated if overnight accommodation needed
12. Push notification sent when rebooking confirmed: "rebooked to 3:45 PM departure, arrives 9:15 PM"

**Duration Target:** <2 minutes to rebooking approval
**Success Metric:** >85% auto-rebooking approval without manual review

---

#### Flow 5: Family Booking: Search → Add Travelers → Family Seat Selection → Group Checkout

1. User searches flights (SCR-004) for family of 4 (2 adults, 2 children ages 6 and 10)
2. Traveler count selector shows family unit ("Family: 2 adults, 2 children")
3. Search results display family-optimized pricing (per-person shown clearly)
4. User selects flight; flight detail screen (SCR-006) shows family bundle option prominently
5. Family bundle includes: flight + family seating (4 adjacent seats) + child meals + luggage (standard per airline)
6. Seat selection interface shows family blocks (4 adjacent seats highlighted)
7. System proposes optimal family seating block; user can approve or drag to alternative block
8. Seat selection preview shows family grouped with visual confirmation
9. Checkout (SCR-007) shows bundle with family-specific benefits ("children's meals included," "family seating guaranteed")
10. Traveler form captures adult names and child names (required for check-in)
11. Payment processed
12. Confirmation shows family seating arrangement with visual seat map

**Duration Target:** <8 minutes total
**Success Metric:** >70% family booking conversion, >90% correct name entry

---

#### Flow 6: AI Copilot Interaction: Natural Language Query → Suggestions → Action

1. User taps copilot button (floating action button) or opens copilot screen (SCR-016)
2. User types or speaks: "I want to visit Japan in October for 2 weeks, budget $3,000"
3. Copilot processes natural language (NLP model) and extracts parameters:
   - Destination: Japan
   - Month: October
   - Duration: 14 days
   - Budget: $3,000
4. Copilot suggests: "I found round-trip flights to Tokyo for $820 departing October 12-26. Should I search hotels in Tokyo and Kyoto for $1,200/week?"
5. User affirms or modifies (e.g., "add Osaka instead")
6. Copilot shows suggested itinerary: "Tokyo 5 days → Kyoto 4 days → Osaka 5 days, flights + hotels for $2,980 total"
7. User taps "book this itinerary"
8. System initiates multi-leg flight search and hotel search (SCR-004, SCR-005)
9. Results return for approval
10. User confirms and proceeds to checkout

**Duration Target:** <3 minutes to results, <8 minutes to booking
**Success Metric:** >50% successful NLP interpretation, >30% copilot-initiated bookings

---

## 6. Component Inventory (650 words)

### Navigation Components

**Bottom Tab Bar** — Five fixed tabs: Home (SCR-002), Discover (SCR-003), Search (SCR-004), Trips (SCR-008), Profile (SCR-015). Active tab highlighted, inactive tabs grayed. Provides persistent navigation across app. Supports 5 maximum tabs (standard mobile UX).

**Contextual Header** — Dynamic header bar adapting to screen context. Trip screen headers show trip destination and dates; search screens show filter summary; airport live header shows time-to-departure countdown.

### Card Components

**Trip Card** — Summary card showing: flight routing (origin → destination), departure/arrival time, date, flight number, status badge (on-time, delayed, cancelled, boarded), and progress indicator. Clickable to expand into trip dashboard (SCR-008).

**Flight Result Card** — Search result card with: departure time (large font), arrival time, total duration, number of stops, airline logo, price (highlighted in color), and rating (on-time performance or user reviews). One-tap to flight detail (SCR-006).

**Destination Card** — Inspiration feed card with: large hero image (photo of destination), city name and country, 3-5 top attractions (icon + text), estimated price range, deal badge (if applicable), and save button. Clickable to search that destination.

**Deal Card** — Alert card showing: destination, price drop (e.g., "-$240 from usual price"), sale dates ("expires in 6 hours"), and one-tap book button. Used in notifications and discovery feed.

**Disruption Card** — Alert card triggered by IROPS, showing: disruption reason (e.g., "weather delay"), flight impact (delay duration), affected flights, and recommended action (rebooking link). Red background, urgent styling.

**Seat Map Card** — Interactive seat selection component showing: aircraft layout, seat categories color-coded (economy blue, premium economy gold, business red), unavailable seats grayed out, selected seats highlighted. Supports drag-to-select on desktop, tap-to-select on mobile.

### Input Components

**Search Form** — Multi-field form with: origin input (autocomplete), destination input (autocomplete), departure date picker, return date picker, traveler count picker (adults + children), and search button. All fields required except return date (one-way toggle available).

**Date Picker** — Calendar interface showing month view with available/unavailable date highlighting. Supports date range selection (click departure date, then return date). Keyboard accessible with arrow keys.

**Passenger Selector** — Dropdown/modal interface allowing: adults count selection (default 1, max 9), children count selection (default 0, max 6), and child age entry (required for pricing accuracy). Some airlines charge based on child age for meals/seating.

### Status Indicators

**Flight Status Badge** — Small colored badge showing: "On Time" (green), "Delayed" (yellow with estimated delay time), "Cancelled" (red), "Boarding" (blue), "Boarded" (gray). Placed prominently on flight cards and trip dashboard.

**Check-In Status** — Visual indicator showing: "Not checked in" (gray), "Checked in" (green checkmark), "Boarding in progress" (blue with progress %), "Boarded" (gray with boarding time), or "Arrived" (green with arrival time).

**Biometric Status** — Status icon showing: "Enrolled & valid" (green checkmark), "Not enrolled" (warning icon with enrollment link), "Enrollment in progress" (loading spinner), or "Not available at this airport" (info icon with explanation).

### AI Interface Components

**Chat Bubble** — Conversational message interface with: user messages right-aligned in blue, AI responses left-aligned in gray. Supports multi-turn conversation with context preservation. Avatar icon distinguishes user from copilot.

**Suggestion Chips** — Horizontal scrollable list of suggested actions (e.g., "book flight," "change seat," "check gate") allowing one-tap action without typing. Personalized based on current context and persona.

**Action Card** — Card presenting an AI-recommended action with reasoning. Example: "Recommended: Flight 4:15 PM instead of 3:00 PM — arrives 15 minutes later but $240 cheaper." Includes approve/reject buttons.

### Modal Components

**Booking Confirmation Modal** — Full-screen modal showing: itinerary summary, total price breakdown (flight + taxes/fees + ancillaries), confirmation number, and option to add to calendar or Apple Wallet. Prominent "done" button to return to home.

**Disruption Alert Modal** — Full-screen alert triggering on disruption detection with: disruption details (reason, impact), primary rebooking recommendation, alternative options carousel, and one-tap approval button for primary option. Can dismiss with snooze option.

**Rebooking Options Modal** — Carousel/list interface showing 3-5 rebooking options each with: new departure time, duration change, price impact, connection details (if applicable), and select button. Sortable by price, duration, or recommendation score.

### List Components

**Flight Results List** — Paginated list of flight options (8-10 per page), each item a flight result card. Sorting options (price, duration, departure time, recommended) available. Infinite scroll on mobile, pagination on desktop.

**Notification List** — Chronological list of all notifications with dismiss/snooze buttons per notification. Filter tabs (all, alerts, updates, reminders) at top. Mark all as read option available.

**Trip Timeline List** — Chronological display of trip events: departures, arrivals, hotel check-in/check-out, activities, with photos and memory notes. Shareable as "Trip Timeline" post.

---

## 7. User Stories (18 stories, 1,200 words)

### PERSONA-01: Premium Traveler (Alexandra) — 5 Stories

**Story 1-A (Inspiration & Discovery):** As a premium traveler (PERSONA-01), I want to discover exclusive luxury destinations personalized to my preferences so that I can find world-class experiences that match my refined taste without endless research.

*Acceptance Criteria:*
- Destination cards show 5+ luxury/exclusive destinations relevant to my history (proven by click-through >65%)
- Each card displays amenities that matter to premium travelers (spa access, Michelin restaurants, private beaches)
- "Luxury filters" allow me to view only Relais & Châteaux properties or Michelin-starred destination recommendations
- One-tap wishlist save adds destination to "My Dream Trips" list for future reference

---

**Story 1-B (Search & Booking):** As a premium traveler, I want to book my flight with invisible seamlessness — total price transparency, premium cabin confirmation, and lounge access all confirmed pre-checkout so that I can complete booking in <3 minutes with absolute confidence in what I'm purchasing.

*Acceptance Criteria:*
- Flight selection shows premium cabin availability and price differential (e.g., "-$1,240 for Business vs. Premium Economy")
- Bundle automatically includes lounge access (if I hold elite status), checked baggage, premium meal, and premium seat
- All taxes, fees, and ancillaries included in displayed price (no drip pricing)
- One-tap checkout completes payment and shows confirmation with digital boarding pass

---

**Story 1-C (Pre-Trip):** As a premium traveler, I want an anticipatory system that remembers my preferences (seat selection, meal requests, lounge preferences, special services) without me repeatedly explaining myself so that I feel respected and understood.

*Acceptance Criteria:*
- System recalls my preferred seat (aisle, premium cabin, row 5-8, away from galley) automatically
- Meal preferences pre-populated (no shellfish, champagne preference, specific wine)
- Lounge preference remembered (I prefer quiet work lounges, not high-energy bars)
- One-tap confirmation confirms all preferences for this trip; zero manual data entry required

---

**Story 1-D (Airport Experience):** As a premium traveler, I want biometric check-in and seamless ground/lounge transition so that I never wait in lines or repeat information, preserving the premium experience I paid for.

*Acceptance Criteria:*
- Biometric face enrollment completes once; all future airport entries require only face recognition (no ticket, no passport, no form)
- Lounge access recognized automatically upon entry (system shows "Welcome Alexandra, Sky Priority lounge available")
- Ground transportation coordinated automatically (car waiting, luggage checked through to destination)
- Total airport experience from arrival to gate: <20 minutes (vs. industry average 45 minutes)

---

**Story 1-E (Post-Trip):** As a premium traveler, I want a comprehensive trip recap showing memory timeline, loyalty points earned, and exclusive recommendations for my next luxury journey so that I feel the value of the experience extends beyond the flight.

*Acceptance Criteria:*
- Trip timeline compiles automatically with photos, key moments, hotel experiences, and activity highlights
- Loyalty points summary shows premium bonuses (e.g., "2x points for business class purchase")
- Post-trip recommendations include exclusive luxury experiences (sister resort invitations, Michelin-starred restaurant reservations)
- Annual luxury travel report shows destination trends and personalized insights

---

### PERSONA-02: Business Traveler (Marcus) — 5 Stories

**Story 2-A (Search & Booking):** As a business traveler, I want to search and book flights in under 90 seconds with policy compliance guaranteed so that I can book efficiently without administrative overhead while staying compliant with my company's travel policy.

*Acceptance Criteria:*
- Search form pre-populated with most frequent routes (NYC ↔ SF, NYC ↔ LON)
- Search results auto-filtered to policy-compliant flights (economy → premium economy based on policy)
- Policy compliance confirmation displays ("this booking complies with your company's <3hr connection rule")
- Booking completes in single payment step (no questionnaire or account creation)

---

**Story 2-B (Pre-Trip):** As a business traveler, I want automatic expense reconciliation and corporate policy compliance checking so that I can submit my expense report with zero manual data entry and trust that I haven't violated policy.

*Acceptance Criteria:*
- All flight, hotel, and ground transport receipts auto-imported from email confirmations
- Expense categorization automatic with 95%+ accuracy
- Policy violation alerts (e.g., "hotel exceeded $200/night limit") prompt for explanation
- Expense report pre-populated and ready for submission within 24 hours of trip end
- Integration with corporate expense systems (Concur, SAP Ariba, etc.)

---

**Story 2-C (In-Flight):** As a business traveler who works during flights, I want productivity tools integrated into the in-flight experience so that I can work productively without fumbling with airplane WiFi or Bluetooth pairing.

*Acceptance Criteria:*
- WiFi auto-connects on aircraft with guest login pre-filled
- External keyboard/trackpad Bluetooth pairing guides available in app
- Focus mode suppresses all notifications except critical (calendar invites, phone calls)
- Video conference background blur available (for Zoom calls)

---

**Story 2-D (Disruption):** As a business traveler with tight connections, I want proactive connection disruption alerts and automatic rebooking when connections become impossible so that I never miss meetings due to travel disruption.

*Acceptance Criteria:*
- Connection adequacy alerts trigger when tight connection becomes risky (e.g., "connection window 45 minutes, weather may cause delay")
- Automatic rebooking approval for low-risk alternatives (next flight on same airline, 2+ hour connection window)
- Automatic hotel/transport voucher generation if overnight accommodation needed
- All rebooking communicated to traveler's calendar (meeting organizers auto-notified of new arrival time)

---

**Story 2-E (Loyalty & Benefits):** As a business traveler who holds elite status across multiple airlines, I want transparent loyalty benefits optimization so that I maximize my status progress and know exactly what benefits I'm entitled to on each flight.

*Acceptance Criteria:*
- Loyalty account dashboard shows status in each program (Delta Gold, United Platinum, etc.)
- Upcoming status benefits explained (lounge access, priority boarding, baggage allowance)
- Status expiration tracking with progress to next tier
- Booking status indicators show which program benefits will accrue for each flight
- Annual loyalty summary shows status trends and retention recommendations

---

### PERSONA-03: Leisure/Family Traveler (Chen Family) — 5 Stories

**Story 3-A (Inspiration & Discovery):** As a family traveler, I want to discover family-friendly destinations with transparent costs broken down for family size so that I can find appealing vacations and know exactly what the trip will cost before deep engagement.

*Acceptance Criteria:*
- Destination cards flagged with "family-friendly" badge showing family amenities (kids clubs, beaches, theme parks)
- Price shown for family of 4 (not per-person, showing full transparent cost)
- "Deal for your family" badge highlights multi-passenger discounts
- Age-appropriate activity recommendations for my children's ages (6 and 10)

---

**Story 3-B (Search & Booking):** As a family traveler, I want to select my family unit (adults + children) once and have the system ensure family seating is adjacent and guaranteed so that I can travel together without paying extra for seat selection and without discovering at the airport that we're separated.

*Acceptance Criteria:*
- Traveler count selector shows "Family: 2 adults, 2 children (ages 6, 10)"
- Seat selection shows family blocks (4 adjacent seats) highlighted, with system recommendation
- Seat selection preview displays visual confirmation ("all four family members in seats 15A-D")
- Checkout shows family bundle including seats, child meals, and luggage ("Family bundle includes children's meals and 4 checked bags")
- Zero additional cost for family seating (no $10/seat family guarantee fee)

---

**Story 3-C (Pre-Trip):** As a family traveler, I want a shared family trip dashboard so that all family members (even my 10-year-old) can see the trip itinerary, check-in status, and important reminders, reducing my cognitive load as the trip coordinator.

*Acceptance Criteria:*
- Family trip dashboard accessible to all family members via shared link (no separate logins)
- Child-simplified view shows: departure time, arrival time, airport name, hotel name
- Check-in status shown for each family member
- Packing list editable by all family members (kids can check off items they've packed)
- Trip countdown and "next action" notification sent to all family members

---

**Story 3-D (Airport & In-Flight):** As a family traveler with young children, I want family-specific airport guidance showing family-friendly facilities and in-flight entertainment optimized for children so that travel feels manageable rather than overwhelming.

*Acceptance Criteria:*
- Airport wayfinding highlights family restrooms, play areas, and nursing rooms
- "Family lounge" access identified (even if not premium status lounge)
- In-flight family entertainment hub includes 50+ age-appropriate activities
- Multiplayer games allow in-flight entertainment across family members' devices
- Meal timing alerts for children (kids meals often served first)

---

**Story 3-E (Post-Trip):** As a family traveler, I want automatic trip memory compilation and family photo album generation so that I can preserve and relive the trip experience without managing photos separately.

*Acceptance Criteria:*
- Trip timeline auto-compiles with 80%+ of trip photos (detected from device gallery)
- Family album shareable with extended family (grandparents) via link
- Annual trip report shows "2025 Family Travel: 4 trips, 15 destinations, 120 family memories"
- Trip expense breakdown shows cost-per-person and value assessment ("spent $6,240 for 4 people = $31/person/day")

---

### Cross-Journey Stories — 3 Stories

**Story 4-A (AI Copilot — All Personas):** As any traveler, I want a conversational AI copilot that understands my travel needs and can book flights through natural language so that I can plan and book travel as efficiently as asking a knowledgeable friend.

*Acceptance Criteria:*
- Natural language queries interpreted correctly 90%+ of the time (tested across 100+ query variations)
- System maintains context across multi-turn conversation ("add 2 nights in Paris" after booking flights to Europe)
- Booking completion available through copilot with full payment processing
- Escalation to human agent available if copilot uncertain

---

**Story 4-B (Notifications & Anticipatory Alerts — All Personas):** As any traveler, I want to receive proactive alerts about my trip before problems occur so that I never experience surprise disruptions and always have time to prepare.

*Acceptance Criteria:*
- Alerts triggered 72 hours before relevant event (flight disruption prediction, weather change, document expiration)
- Alert frequency customizable per persona (premium = more alerts, families = moderate alerts)
- Recommended actions provided with each alert (rebooking link, document renewal link)
- Alert false positive rate <10% (prevent alert fatigue)

---

**Story 4-C (Accessibility & Inclusion — All Personas):** As a traveler with accessibility needs (visual, hearing, mobility, neurodiversity), I want all AirThere features to be fully accessible so that I can book and manage travel with equal ease as other travelers.

*Acceptance Criteria:*
- WCAG 2.1 AA compliance on all screens (tested with accessibility audits)
- Screen reader compatibility tested with JAWS, NVDA, VoiceOver
- Color contrast ratios meet WCAG AA standards (4.5:1 for text)
- Keyboard navigation possible on all interactive elements
- Captions available for video content (flight progress videos, in-flight entertainment)

---

## 8. UI Direction & Design Notes (650 words)

### Visual Language: Premium Yet Accessible

AirThere's visual language bridges sophistication and inclusivity. The design system uses:

**Typography:** Headings use "Inter" (neutral, geometric, modern) at 28px (H1), 22px (H2), 18px (H3). Body text uses Inter at 16px (default), with line-height 1.5. Premium travelers see slightly larger and more spaced typography reflecting their preference for breathing room. This supports accessibility (WCAG requirements exceed 14px minimum).

**Color Palette:** Foundation colors use OKLCH color space (perceptually uniform, dark-mode friendly). Primary blue: oklch(55% 0.2 265°) across light and dark modes. Secondary gold (premium accent): oklch(70% 0.15 80°). Status colors: success green oklch(65% 0.2 140°), warning yellow oklch(75% 0.15 80°), alert red oklch(50% 0.25 20°). All colors tested for 4.5:1 contrast ratio against both light and dark backgrounds.

**Spacing & Rhythm:** 8px base unit grid. Padding: 8px (tight), 16px (standard), 24px (spacious), 32px (premium). Premium travel screens emphasize white space; business screens emphasize information density; family screens use larger touch targets (minimum 48px height).

**Imagery:** Large, authentic photography of destinations and travel experiences. Premium traveler screens feature aspirational luxury imagery (first-class cabins, exclusive lounges). Business traveler screens use clear, professional imagery. Family screens show real families (diverse representation) in travel moments.

### Persona-Adaptive UI

The interface adapts across three dimensions per persona:

**Information Density:** Premium travelers see curated information (top 3 options presented clearly); business travelers see higher density (5-8 options with quick filtering); families see simplified information with larger text and imagery.

**Terminology:** Premium travelers see sophisticated language ("complimentary lounge access"); business travelers see efficiency language ("save 15 minutes with PreCheck"); families see friendly language ("let's find seats together").

**Color/Visual Emphasis:** Premium travelers see gold accents emphasizing elite status; business travelers see blue accents emphasizing productivity; families see vibrant, friendly colors for engagement.

### Mobile-First Responsive Strategy

**Mobile (375-428px):** Stacked layout, full-width cards, large touch targets (48px minimum height), minimal navigation tabs (5 max), infinite scroll for lists.

**Tablet (768-1024px):** Two-column layouts become possible (search form + results side-by-side), card grid layouts emerge (destination cards in 2x2 grid), navigation expands (tab bar + sidebar possible).

**Desktop (1440px+):** Full-width optimized layouts, multi-column grids (destination cards in 4-5 columns), side-by-side dashboard layouts (trip details + map + notifications in viewport).

Responsive breakpoints: 375px, 768px, 1024px, 1440px tested on common devices (iPhone SE, iPad, MacBook).

### Dark Mode Support

Dark mode available across all screens. Foundation: dark background oklch(20% 0 0°), dark card oklch(28% 0 0°). Text inverts: white text oklch(95% 0 0°). Colors maintain contrast (dark mode requires higher lightness for blue: oklch(65% 0.2 265°) vs. light oklch(55% 0.2 265°)). Premium and business travelers have dark mode as default (accessibility + reduced battery drain); families default to light mode (friendlier for children).

### Accessibility: WCAG 2.1 AA Commitment

- Minimum font size 14px for all body text
- Line-height minimum 1.5 for readability
- Color contrast 4.5:1 for all text, 3:1 for graphics
- Focus indicators visible and high-contrast
- Keyboard navigation full coverage
- Screen reader support tested
- Captions/transcripts for video
- Hidden disabilities accommodation (motion reduction, sensory sensitivity)

### Animation Philosophy

Purposeful micro-interactions support perception of responsiveness without slowing interaction. Load spinners for <2 second waits (smooth rotation), data loads use fade-in (200ms). Button presses provide haptic feedback on mobile. Page transitions use subtle slide (200ms) to maintain spatial context. Animations disable on "prefers-reduced-motion" setting.

---

## 9. Screen-to-Journey Mapping Table

| Screen ID | Screen Name | Inspiration | Search/Booking | Pre-Trip | Airport | In-Flight | IROPS | Post-Trip | PERSONA-01 | PERSONA-02 | PERSONA-03 | Priority |
|-----------|-------------|-------------|-----------------|----------|---------|-----------|-------|-----------|-----------|-----------|-----------|----------|
| SCR-001 | Onboarding | Primary | - | - | - | - | - | - | Essential | Essential | Essential | P0 |
| SCR-002 | Home/Today | Primary | Secondary | Primary | Primary | - | Primary | Secondary | P0 | P0 | P0 | P0 |
| SCR-003 | Discover | Primary | Secondary | - | - | - | - | - | P0 | P1 | P0 | P0 |
| SCR-004 | Search | Secondary | Primary | - | - | - | - | - | P0 | P0 | P0 | P0 |
| SCR-005 | Results | - | Primary | - | - | - | - | - | P0 | P0 | P0 | P0 |
| SCR-006 | Flight Detail | - | Primary | - | - | - | - | - | P0 | P0 | P0 | P0 |
| SCR-007 | Checkout | - | Primary | - | - | - | - | - | P0 | P0 | P0 | P0 |
| SCR-008 | Trip Dashboard | - | Secondary | Primary | Secondary | Secondary | Primary | Secondary | P0 | P0 | P0 | P0 |
| SCR-009 | Documents | - | - | Primary | Secondary | - | - | - | P0 | P1 | P0 | P0 |
| SCR-010 | Airport Live | - | - | - | Primary | - | - | - | P0 | P0 | P0 | P0 |
| SCR-011 | Gate/Boarding | - | - | - | Primary | - | - | - | P0 | P0 | P0 | P0 |
| SCR-012 | In-Flight | - | - | - | - | Primary | - | - | P1 | P0 | P1 | P1 |
| SCR-013 | IROPS | - | - | - | - | - | Primary | - | P0 | P0 | P0 | P0 |
| SCR-014 | Trip Recap | - | - | - | - | - | - | Primary | P1 | P1 | P0 | P1 |
| SCR-015 | Profile | - | Secondary | - | - | - | - | - | P0 | P0 | P1 | P1 |
| SCR-016 | Copilot | Primary | Primary | Secondary | - | - | Primary | - | P1 | P1 | P1 | P0 |
| SCR-017 | Settings | - | - | - | - | - | - | - | P2 | P2 | P2 | P2 |
| SCR-018 | Family Hub | - | Secondary | Primary | - | - | Primary | Primary | - | - | P0 | P0 |
| SCR-019 | Notifications | - | - | Primary | Primary | - | Primary | - | P1 | P1 | P1 | P1 |
| SCR-020 | Lounge Finder | - | - | - | Primary | - | - | - | P0 | P1 | - | P1 |

---

## 10. Pipeline Traceability

### Features Traced to Experience Strategy Objectives

| PRD Feature | Experience Strategy Source | Research Evidence | Persona Relevance |
|-------------|---------------------------|-------------------|------------------|
| F-001: AI Destination Cards | Theme: Anticipatory Design | Trend: Mood-based search, AI personalization increasing 18-30% engagement | All |
| F-008: Dynamic Bundling | Strategic Objective: $45B rebundling opportunity | McKinsey analysis: 25-35% ancillary revenue lift from personalized bundling | All |
| F-031: Proactive Disruption Alerts | Strategic Objective: $60B IROPS recovery | Research: Proactive alerts reduce traveler anxiety 40% vs. reactive alerts | All |
| F-014: Trip Dashboard | Vision: Single source of truth | Research finding: 28% of travelers manage 5+ separate platforms, cognitive overload | All |
| F-009: Family Group Booking | PERSONA-03 Job-to-be-Done | Research: 92% of parents likely to travel with children; family seating guaranteed is top need | PERSONA-03 |
| F-019: Today View | Vision: Anticipatory Design | Research: Context-appropriate interfaces increase perceived value 30-45% | All |
| F-025: Connected Cabin | Experience Strategy Theme: Omnichannel | Research: In-flight connectivity drives productivity 40% for business travelers | PERSONA-02 |
| F-032: Automatic Rebooking | Strategic Objective: IROPS proactive management | Research: Automatic rebooking without traveler intervention increases satisfaction 65% | All |
| F-016: Packing Intelligence | Vision: Remove cognitive load | Research finding: Pre-trip cognitive load averaging 47% of total trip anxiety | All |
| F-027: Meal Tracking | Experience Strategy Theme: Hyper-Personalization | Research: Dietary preference personalization increases in-flight satisfaction 25% | All |

### Research Evidence Mapping

| Research Theme | PRD Implementation |
|----------------|-------------------|
| Theme 1: Trust Deficit | F-001 (transparency), F-013 (clear pricing), F-031 (proactive alerts), F-032 (automatic rebooking) |
| Theme 2: Control Paradox | F-007 (multi-modal search), F-008 (smart bundling), F-009 (family control), F-016 (packing intelligence) |
| Theme 3: Journey Fragmentation | F-014 (trip dashboard), F-018 (family hub), SCR-002 (unified home), F-034 (hotel/transport integration) |
| Theme 4: Anticipatory Intelligence | F-031 (disruption alerts), F-018 (anticipatory reminders), F-019 (today view), F-020 (biometric check-in) |
| Theme 5: IROPS Recovery Gaps | F-031 (proactive alerts), F-032 (auto rebooking), F-033 (alternative routing), F-034 (hotel/transport) |
| Theme 6: Loyalty Program Crisis | F-038 (loyalty optimization), F-015 (document vault), F-040 (trip analytics), F-041 (re-booking suggestions) |

---

## 11. Constraints & Dependencies

### Technical Constraints

**Connectivity:** Mobile app requires network connection for search/booking. Offline capability limited to previously cached trip data (itinerary, boarding pass, documents). In-flight connectivity (Gogo, Viasat, Intelsat) integration supports limited functionality in-flight (streaming entertainment, real-time flight tracking).

**Device Compatibility:** Native iOS app (iOS 14+), native Android app (Android 12+), responsive web application (all modern browsers: Chrome 90+, Safari 15+, Firefox 88+). Legacy device support (iPhone 11/12, Android 10-11) supported but with reduced feature set (no advanced ML personalization, simplified UI).

**Data Storage:** Encryption standard AES-256 for document vault, TLS 1.3 for transit. Biometric data stored locally on device (not synced to cloud). Trip data encrypted in transit and at rest. Compliance: GDPR, CCPA, Data Protection Act 2018 (UK).

**API Integration:** Requires integration with 50+ airline APIs (GDS systems: Sabre, Amadeus, Travelport). Third-party integrations: Apple Wallet (digital boarding pass), Google Pay, payment processors (Stripe, Adyen), weather APIs, airport data feeds.

### Regulatory Constraints

**GDPR (EU):** User consent required for data processing. Biometric processing requires explicit consent. Data deletion requests honored within 30 days. Data processing agreements required with all third-party processors.

**CCPA (California):** Consumer right to know, delete, opt-out. Privacy policy must disclose data collection and usage. Opt-out available for third-party data sales.

**DOT Family Seating Rule (U.S.):** Children under 13 entitled to seat adjacent to parent/guardian at no additional charge. Implementation: F-009 (family group booking) guarantees adjacency at booking; F-032 (automatic rebooking) maintains family grouping during disruptions.

**Accessibility (WCAG 2.1 AA):** All screens must meet WCAG AA compliance. Testing: automated accessibility audits (axe-core, Wave), manual testing with screen readers, user testing with users having disabilities.

### Performance Constraints

**Core Web Vitals:** Target green on all screens per Google PageSpeed Insights. LCP (Largest Contentful Paint) <2.5s, FID (First Input Delay) <100ms, CLS (Cumulative Layout Shift) <0.1. Mobile-first optimization required.

**Offline Support:** Service Workers cache critical app shell and trip data. Offline mode accessible for 30 days post-download. Sync occurs automatically when connectivity restored.

### Data Requirements (Design Mode)

**Mock Data Strategy:** Realistic placeholder data for frontend development:
- Destination database: 200+ real destinations with photos, attractions, estimated prices
- Flight inventory: Real route pairs (NYC-SFO, LON-CDG, TYO-NRT) with mock flight data (times, airlines, pricing)
- Airline/Airport data: Real airline codes (AA, DL, UA, LH, SQ), real airport codes (JFK, LHR, NRT), real aircraft types
- User data: 3 synthetic personas (Alexandra, Marcus, Chen Family) with complete booking history
- Loyalty programs: Real frequent flyer programs (Delta SkyMiles, United Mileage Plus, Qantas Frequent Flyer) with mock account data

---

## 12. Open Questions & Decisions

### Product Strategy Decisions Required

1. **Biometric Identity Launch Scope:** Should biometric enrollment be mandatory (requiring for any booking) or optional (available but not required)? Mandatory increases trust but may increase friction for non-biometric-enabled devices.

2. **Airline Partnership Approach:** Build as B2C standalone product (independent of airlines), or B2B2C model requiring airline partnerships? Standalone provides autonomy; partnerships provide inventory access.

3. **Premium vs. Free Pricing:** Should AirThere monetize through subscription premium tier (e.g., "$4.99/month for copilot + loyalty optimization") or remain free with potential revenue sharing from airline ancillaries? Subscription better serves premium travelers; free model maximizes scale.

4. **Cross-Carrier Rebooking:** Should automatic rebooking include competitor airlines (e.g., rebook disrupted United flight on Delta/Southwest)? Increases traveler value but may conflict with airline partnerships.

5. **Dark Patterns Avoidance:** Explicitly commit to WCAG AAA (not just AA) compliance? Adopt "Dark Pattern Pledge"? Commit to never use dark patterns even if competitors do?

### UX/Interaction Decisions Required

6. **Persona Adaptation Visibility:** Should persona adaptation be transparent (travelers see "view switching between business and family mode") or invisible (automatic adaptation without user awareness)? Transparency supports trust; invisibility feels magical.

7. **AI Autonomy Progression:** What triggers graduation from Copilot → Curator → Autonomous Agent mode? Explicit traveler preference? Implicit trust-building through successful recommendations? Mixed approach?

8. **Notification Fatigue Management:** What alert threshold prevents notification fatigue? Current design suggests >2 alerts/day triggers override; should this vary by persona (business = more alerts, family = fewer)?

9. **Family Hub Access Control:** Who has access to shared family trip information (parents only, all family members including children, extended family)? Child data privacy requirements if children have app access.

### Technical Decisions Required

10. **Offline Capability Scope:** What functionality must remain available offline? Trip itinerary (essential)? Boarding pass (essential)? Seat selection (nice-to-have)? This affects data caching strategy.

11. **Biometric Data Handling:** Store biometric templates on device only, never in cloud? Use on-device ML for facial recognition, or cloud ML with image transmission? This affects privacy vs. accuracy trade-off.

12. **IFE Integration:** What subset of airline IFE systems should be supported in v1.0 (Panasonic, Viasat, others)? Full coverage requires integration with 20+ systems.

13. **GDS Integration:** Which GDS(s) to integrate with in v1.0 (Sabre, Amadeus, Travelport, Galileo)? Sabre alone covers ~50% of inventory; all three covers ~95%.

### Market & Competitive Decisions Required

14. **International Launch Sequencing:** Should US market launch first, then EU (with GDPR compliance overhead), or simultaneous launch? Sequential = faster US launch; simultaneous = faster global scale.

15. **Airline App vs. OTA:** Position as premium OTA (like Hopper) or as replacement for airline apps? Hopper differentiates on AI price prediction; replace airline apps via superior UX. This affects feature prioritization.

16. **Competitor Response Prediction:** What if incumbent airlines (United, Delta, American) launch competitive products during AirThere development? Should roadmap include planned responses (feature differentiation, pricing advantage)?

---

## Conclusion

AirThere represents a fundamental reimagining of air travel experience from fragmented, reactive, anxiety-driven journeys to seamless, anticipatory, emotionally coherent experiences. This PRD articulates the complete feature inventory, screen design, user stories, and strategic direction required to deliver on that vision.

The 41-feature inventory across seven journey phases, 20 screens, 18 user stories, and comprehensive accessibility commitment establish AirThere as the first truly customer-obsessed air travel platform. Grounded in deep research evidence and persona-specific optimization, AirThere targets NPS 60+ (exceeding JetBlue's 50), booking abandonment under 30% (vs. industry 87.87%), and WCAG 2.1 AA accessibility.

Design mode implementation prioritizes mobile-first responsive design with realistic placeholder data, enabling complete frontend prototype completion before backend integration. The modular feature inventory, consistent screen naming conventions, and detailed acceptance criteria provide clear specifications for UI/UX design (Step 5), development specification (Step 6), and frontend implementation (Steps 7-8).

---

STEP 4 COMPLETE — PRD written to 04-prd.md with 12,847 words covering all required sections.
