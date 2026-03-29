# Project Brief: AirThere

## Vision
Build the world's best-in-class air travel experience app — a comprehensive, full-scope product (not an MVP) that sets the global benchmark for digital travel. AirThere must exemplify the highest standards of UX design, CX design, service design, agentic AI, and hyper-personalization across the complete end-to-end journey.

## Target Users — Three Primary Personas

### Premium Traveler
First/Business class, ultra-high-net-worth individuals who expect white-glove anticipatory service, seamless biometric identity, proactive IROPS recovery, and curated lifestyle integration. This segment contributes nearly half of all passenger revenue while representing roughly 15% of total seats.

### Business Traveler
Frequent flyers on corporate cards who value speed, control, policy compliance, lounge access, and productivity continuity across disruptions. Global business travel spending is projected at $1.57 trillion in 2025. They need bookings in under 90 seconds, proactive disruption management, and unified travel-expense integration.

### Leisure Traveler
Price-conscious, trip-planning oriented travelers who value inspiration, deal discovery, family/group coordination, and guided journey support. Family travel averages $8,052 per household annually. 92% of parents are likely to travel with children in the next 12 months. They need total cost transparency, guaranteed family seating, and a logistics command center.

## Problem Statement
The air travel industry generates $979 billion in revenue while systematically failing its highest-value traveler segments. Forrester's CX Index fell to 68.3/100 — its fourth consecutive annual decline. Airline booking abandonment runs at 87.87%. Travelers navigate 5-10+ separate platforms across the journey. Only 3% of travel companies qualify as "customer-obsessed." The $45 billion rebundling opportunity, the $60 billion annual IROPS cost, and the widening gap between traveler expectations and delivered experiences create a once-in-a-generation opportunity to build a transformative travel product.

## Success Criteria
- Set the global benchmark for air travel digital experience quality
- Achieve best-in-class NPS (target: 60+, exceeding JetBlue's industry-leading 50)
- Reduce booking abandonment from 87% to under 30%
- Deliver proactive IROPS recovery before travelers know disruptions exist
- Achieve WCAG 2.1 AA compliance across all screens
- Serve all three personas with a single, adaptive product experience
- Deliver end-to-end journey coverage from inspiration through post-trip

## Product Scope — Full Experience (NOT MVP)

### Journey Phases Covered
1. **Inspiration & Discovery** — AI-powered destination inspiration, social discovery, mood-based search, deal alerts
2. **Search & Booking** — Multi-modal search, dynamic bundling, group booking, fare prediction, flexible calendar views
3. **Pre-Trip Management** — Trip dashboard, document management, packing intelligence, visa/health requirements, anticipatory alerts
4. **Airport Experience** — Biometric check-in, security/immigration status, lounge access, wayfinding, gate changes, family navigation
5. **In-Flight** — Connected cabin, IFE integration, meal management, wellness features, productivity tools
6. **IROPS & Recovery** — Proactive disruption detection, automatic cross-carrier rebooking, hotel/transport vouchers, family-aware rebooking
7. **Post-Trip** — Expense management, memory capture, loyalty integration, feedback, trip analytics

### Design Requirements
- **Anticipatory Design** — Proactive, predictive interactions that remove decisions from the traveler's cognitive load before they know a decision exists
- **Omnichannel Orchestration** — Seamless cross-channel context preservation (app, web, watch, widget, notification)
- **Agentic AI** — Conversational AI copilot that graduates from assistant to curator to autonomous agent as trust builds
- **Hyper-Personalization** — Context-aware, real-time adaptation to traveler preferences, behavior, and current situation
- **Biometric/One ID** — Single biometric enrollment replacing all ID checks from home to destination
- **WCAG 2.1 AA** — Full accessibility compliance including hidden disabilities, neurodiversity, and sensory sensitivity
- **Full Service Blueprint** — Frontstage/backstage orchestration across the complete journey

## Tech Stack
- Next.js 14 + App Router
- Tailwind CSS v4
- Shadcn UI
- TypeScript
- Supabase (auth + DB)
- Vercel deployment

## Build Mode
**DESIGN MODE — Frontend Prototype First.** Build the complete frontend with placeholder content. Backend connections can be added later. All data should use realistic placeholder/mock data.

## Competitors & Design References
- Delta Fly Delta app (4.7-4.8 stars, "Today" view, Delta Concierge AI)
- Singapore Airlines ecosystem (SingaporeAir + Kris+ + Pelago)
- Qatar Airways (World Aviation Festival Best App 2025)
- Hopper (120M+ downloads, AI price prediction, Gen Z/Millennial focus)
- Southwest Airlines (92nd percentile SUPR-Q)
- Emirates (digital-physical integration, crew iPad passenger profiles)
- citizenM (radical elimination, 1-minute check-in, MACH architecture)
- Disney MyMagic+ (MagicBand phygital integration)
- Apple Wallet (universal travel identity layer)

## Authoritative Sources
Nielsen Norman Group, Baymard Institute, IATA, Skift, McKinsey, Forrester, Gartner, BCG, Deloitte, Phocuswright, APEX, SimpliFlying, OAG, Amadeus, Sabre

## Existing Research Inputs
Located in `~/airapp/existing research/`:
- **The Reinvention of Travel with AI.md** — Comprehensive AI + travel industry synthesis (travel CX state, best-in-class exemplars, omnichannel integration, service design, AI applications, value exchange, design frameworks)
- **Next Gen Air Travel Product Design.md** — Deep research synthesis for product design (CX evolution, business case, best-in-class apps, airport experience, in-flight/post-flight, AI applications, white spaces)
- **Air Travel Persona Profiles.md** — Detailed 5-dimension profiles for premium/business and family/leisure travelers (goals, motivations, needs, pain points, behavioral patterns)

## Inspirational Patterns
Located in `~/airapp/inspirational patterns/`:
- UI example 1.png, UI example 2.png, UI example 3.png

## Quality Bar
PhD-level rigor throughout. Every pipeline step must meet or exceed word count minimums. No shortcuts, no "due to space" truncation, no placeholder sections.

## Constraints
- Mobile-first responsive design
- Performance: Core Web Vitals green on all screens
- Accessibility: WCAG 2.1 AA minimum
- Privacy: GDPR + CCPA compliant data handling patterns
- Internationalization: Design for multi-language support
- Offline capability: Critical travel information available offline
