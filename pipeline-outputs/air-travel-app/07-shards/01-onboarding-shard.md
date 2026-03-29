# Onboarding / Welcome — Build Shard
## AirThere | Screen SCR-001 | Shard 01

---

## 0. Tech Stack Setup (Required for Design Mode)

### 0.1 Project Initialization

This shard includes critical project setup required before any other screens can be built.

#### Next.js 14 Configuration
```typescript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.airliners.net'],
    deviceSizes: [320, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### Tailwind CSS v4 Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(97.5% 0.020 262)',
          100: 'oklch(95% 0.040 262)',
          200: 'oklch(90% 0.080 262)',
          300: 'oklch(82% 0.120 262)',
          400: 'oklch(72% 0.160 262)',
          500: 'oklch(57.5% 0.194 262)',
          600: 'oklch(50% 0.180 262)',
          700: 'oklch(42% 0.160 262)',
          800: 'oklch(35% 0.130 262)',
          900: 'oklch(28% 0.100 262)',
          950: 'oklch(20% 0.070 262)',
        },
        secondary: {
          50: 'oklch(97% 0.020 50)',
          100: 'oklch(94% 0.040 50)',
          200: 'oklch(88% 0.080 50)',
          300: 'oklch(80% 0.120 50)',
          400: 'oklch(70% 0.150 50)',
          500: 'oklch(64% 0.158 50)',
          600: 'oklch(57% 0.140 50)',
          700: 'oklch(48% 0.120 50)',
          800: 'oklch(40% 0.100 50)',
          900: 'oklch(32% 0.080 50)',
          950: 'oklch(24% 0.060 50)',
        },
        success: {
          50: 'oklch(97% 0.020 142)',
          500: 'oklch(68% 0.150 142)',
          600: 'oklch(60% 0.140 142)',
          900: 'oklch(32% 0.080 142)',
        },
        warning: {
          50: 'oklch(97% 0.025 60)',
          500: 'oklch(67% 0.165 60)',
          600: 'oklch(59% 0.150 60)',
          900: 'oklch(32% 0.085 60)',
        },
        error: {
          50: 'oklch(97% 0.020 25)',
          500: 'oklch(62% 0.228 25)',
          600: 'oklch(54% 0.200 25)',
          900: 'oklch(28% 0.100 25)',
        },
        neutral: {
          50: 'oklch(97% 0 0)',
          100: 'oklch(94% 0 0)',
          200: 'oklch(90% 0 0)',
          300: 'oklch(85% 0 0)',
          400: 'oklch(70% 0 0)',
          500: 'oklch(55% 0 0)',
          600: 'oklch(45% 0 0)',
          700: 'oklch(35% 0 0)',
          800: 'oklch(25% 0 0)',
          900: 'oklch(15% 0 0)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': ['12px', { lineHeight: '16px' }],
        'xs': ['14px', { lineHeight: '20px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '26px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['40px', { lineHeight: '48px' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '56px',
        '7xl': '64px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'pulse': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in-bottom': 'slideInBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
};

export default config;
```

#### ESLint & Prettier
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@next/next/no-html-link-for-pages": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ]
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### 0.2 Global Layout & Navigation

#### Root Layout (src/app/layout.tsx)
```typescript
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'AirThere – Your Travel Operating System',
  description: 'The world\'s first anticipatory travel operating system. One identity, unified experience, anticipatory calm.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-50 text-neutral-900">
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
```

#### Auth Layout (src/app/(auth)/layout.tsx)
```typescript
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <main className="w-full max-w-md px-4">{children}</main>
    </div>
  );
}
```

#### Main App Layout (src/app/(main)/layout.tsx)
```typescript
'use client';

import { ReactNode, useState } from 'react';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { ContextualHeader } from '@/components/navigation/ContextualHeader';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-white">
      <ContextualHeader visible={headerVisible} />
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      <BottomTabBar />
      <Toaster />
    </div>
  );
}
```

### 0.3 Mock Services Layer

#### Mock Service Interfaces (src/lib/services/index.ts)
```typescript
// Define all service interfaces for swappability

export interface IFlightService {
  search(params: FlightSearchParams): Promise<Flight[]>;
  getDetails(flightId: string): Promise<FlightDetails>;
  getStatus(flightNumber: string): Promise<FlightStatus>;
}

export interface IBookingService {
  createBooking(booking: BookingInput): Promise<Booking>;
  getConfirmation(confirmationNumber: string): Promise<BookingConfirmation>;
}

export interface ITripService {
  getTrips(): Promise<Trip[]>;
  getTripDetails(tripId: string): Promise<Trip>;
  updateTrip(tripId: string, updates: Partial<Trip>): Promise<Trip>;
}

export interface IUserService {
  getProfile(): Promise<UserProfile>;
  updatePreferences(prefs: UserPreferences): Promise<UserProfile>;
}

export interface IAirportService {
  getLiveStatus(airportCode: string): Promise<AirportStatus>;
  getSecurityQueues(airportCode: string): Promise<SecurityQueue[]>;
}

export interface IDisruptionService {
  getAlerts(): Promise<DisruptionAlert[]>;
  getRebookingOptions(tripId: string): Promise<RebookingOption[]>;
}

export interface ILoyaltyService {
  getBalance(program: string): Promise<LoyaltyBalance>;
  updatePoints(program: string, delta: number): Promise<LoyaltyBalance>;
}

// Service factory
const services = {
  flight: new MockFlightService(),
  booking: new MockBookingService(),
  trip: new MockTripService(),
  user: new MockUserService(),
  airport: new MockAirportService(),
  disruption: new MockDisruptionService(),
  loyalty: new MockLoyaltyService(),
};

export default services;
```

#### Mock Data Generators (src/lib/mock-data/)
```typescript
// src/lib/mock-data/index.ts
export * from './flights';
export * from './users';
export * from './trips';
export * from './airports';
export * from './disruptions';
export * from './loyalty';
```

```typescript
// src/lib/mock-data/flights.ts
import { Flight, FlightDetails } from '@/lib/types/flight';

const AIRLINES = [
  { code: 'UA', name: 'United', logo: '🤍' },
  { code: 'AA', name: 'American', logo: '🔴' },
  { code: 'DL', name: 'Delta', logo: '🔵' },
  { code: 'BA', name: 'British Airways', logo: '🌐' },
];

const AIRPORTS = [
  { code: 'SFO', name: 'San Francisco', tz: 'America/Los_Angeles' },
  { code: 'LHR', name: 'London Heathrow', tz: 'Europe/London' },
  { code: 'CDG', name: 'Paris Charles de Gaulle', tz: 'Europe/Paris' },
  { code: 'NRT', name: 'Tokyo Narita', tz: 'Asia/Tokyo' },
  { code: 'NYC', name: 'New York JFK', tz: 'America/New_York' },
];

export function generateMockFlights(
  departureCode: string,
  arrivalCode: string,
  departureDate: string,
  passengerCount: number = 1
): Flight[] {
  // Generate 15-20 realistic flight options
  const flights: Flight[] = [];

  for (let i = 0; i < 18; i++) {
    const airline = AIRLINES[i % AIRLINES.length];
    const departTime = new Date(`${departureDate}T${String(6 + (i % 18)).padStart(2, '0')}:00:00`);
    const duration = 300 + Math.random() * 600; // 5-15 hours
    const arriveTime = new Date(departTime.getTime() + duration * 60000);

    flights.push({
      id: `FL-${i}`,
      airline: airline.code,
      flightNumber: `${airline.code}${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
      departureCode,
      arrivalCode,
      departTime,
      arriveTime,
      duration,
      stops: i < 6 ? 0 : i < 12 ? 1 : 2,
      aircraft: 'B777',
      cabinClasses: ['economy', 'premium-economy', 'business', 'first'],
      baseFare: 400 + Math.random() * 3600,
      totalPrice: (400 + Math.random() * 3600) * passengerCount,
      seatsAvailable: Math.floor(Math.random() * 100) + 10,
      amenities: ['wifi', 'meals', 'entertainment'],
    });
  }

  return flights;
}

export function generateMockFlightDetails(flightId: string): FlightDetails {
  return {
    // ...detailed flight information
  };
}
```

```typescript
// src/lib/mock-data/users.ts
import { UserProfile, UserPreferences } from '@/lib/types/user';

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Alexandra Sterling',
  email: 'alexandra@example.com',
  persona: 'premium',
  preferences: {
    seatPreference: 'window-premium',
    mealPreference: 'vegetarian',
    loungeMemberships: ['oneworld', 'lufthansa-senator'],
    frequentFlyerPrograms: {
      'ua': 'MP003847',
      'ba': 'GB283947',
    },
  },
};

export function generateMockUser(persona: 'premium' | 'business' | 'family'): UserProfile {
  // Generate user profile based on persona
  // ...
}
```

### 0.4 Project Structure Setup

Create complete directory structure:

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── onboarding/page.tsx
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── home/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── search/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── trips/page.tsx
│   │   ├── profile/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── cards/
│   ├── search/
│   ├── booking/
│   └── shared/
├── lib/
│   ├── mock-data/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── stores/
└── styles/
```

---

## 1. Screen Overview

**Screen ID:** SCR-001
**Screen Name:** Onboarding / Welcome
**Purpose:** Introduce AirThere's value proposition and establish initial traveler identity through a four-step onboarding flow.

### Journey Role
SCR-001 is the first-time user entry point. Returning users skip directly to Home (SCR-002). The onboarding flow serves three critical functions:

1. **Value Proposition Introduction:** Communicate AirThere's unique benefits (anticipatory calm, unified experience, family safety)
2. **Persona Detection:** Determine if user is Premium (Alexandra), Business (Marcus), or Family (Chen Family) to enable persona-specific personalization
3. **Identity & Biometric Setup:** Begin biometric enrollment (face or fingerprint) for seamless future interactions

### User Journey
```
App Launch (First-Time)
    ↓
SCR-001: Onboarding Welcome
    ↓
Step 1: Value Prop Slides (swipeable)
    ↓
Step 2: Persona Selection
    ↓
Step 3: Biometric Enrollment (optional)
    ↓
Step 4: Preferences Capture (airline preferences, frequent flyer)
    ↓
Home (SCR-002) or Search (SCR-004)
```

### Entry & Exit Points
- **Entry:** App launch (first-time only), app reinstall after uninstall
- **Exit (Primary):** Complete flow → Home (SCR-002)
- **Exit (Alternative):** "Skip to Browse" → Search (SCR-004)
- **Exit (Mid-flow):** Swipe back → previous step

---

## 2. Route & File Location

### Next.js Route Path
```
(auth)/onboarding/page.tsx
```

### File Structure
```
src/
└── app/
    └── (auth)/
        ├── onboarding/
        │   ├── page.tsx                  # Main onboarding page
        │   ├── layout.tsx                # Onboarding-specific layout
        │   ├── components/
        │   │   ├── WelcomeStep.tsx       # Step 0: Welcome
        │   │   ├── ValuePropSlides.tsx   # Step 1: Value proposition slides
        │   │   ├── PersonaSelector.tsx   # Step 2: Persona selection
        │   │   ├── BiometricEnrollment.tsx # Step 3: Biometric enrollment
        │   │   ├── PreferencesForm.tsx   # Step 4: Preferences capture
        │   │   ├── OnboardingProgressBar.tsx # Progress indicator
        │   │   └── OnboardingFooter.tsx  # Step navigation buttons
        │   ├── hooks/
        │   │   └── useOnboarding.ts      # State management for flow
        │   ├── types/
        │   │   └── index.ts              # Onboarding-specific types
        │   └── constants/
        │       └── slides.ts             # Value prop slide content
        └── layout.tsx                    # Auth layout wrapper
```

### Layout Group
- **Group:** (auth) — Auth route group (no bottom tab bar, full-screen experience)
- **Shared Layout:** Inherits from src/app/(auth)/layout.tsx
- **Visibility:** Tab bar hidden during onboarding

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **Tech Setup (Section 0):** Must complete before any component build
- **Design System:** Tailwind CSS color tokens, typography scale
- **UI Library:** Shadcn UI Button, Card, Input, Dialog components
- **Type Definitions:** User, UserProfile, UserPreferences types

### Shared Components Required
- `Button` (Shadcn): Primary and secondary variants
- `Card` (Shadcn): Persona selection cards
- `Input` (Shadcn): Text input for name, email
- `Dialog` (Shadcn): Biometric enrollment modal
- `Progress` (Shadcn): Step progress indicator
- `Skeleton` (Shadcn): Loading placeholders

### Mock Data Requirements
- `generateMockUser()` — Create user profile with persona
- Persona descriptions and icons
- Value proposition slide content
- Airline and frequent flyer program lists

### No Downstream Dependencies
- SCR-001 is entry point; nothing depends on it
- Can be built immediately after tech setup

---

## 4. Component Hierarchy

### Full Component Tree

```
OnboardingPage (page.tsx)
├── OnboardingLayout (semantic wrapper)
│   ├── ProgressBar (step indicator: 0/4, 1/4, 2/4, 3/4)
│   ├── StepContainer (full-screen, scrollable)
│   │   ├── WelcomeStep (Step 0: Welcome hero)
│   │   │   ├── HeroImage (full-bleed background)
│   │   │   ├── HeadlineGroup
│   │   │   │   ├── Heading (h1, centered)
│   │   │   │   └── Subheading (p, centered)
│   │   │   └── ButtonGroup
│   │   │       ├── PrimaryButton (Get Started)
│   │   │       └── SecondaryButton (Skip to Browse)
│   │   │
│   │   ├── ValuePropSlides (Step 1: Carousel, swipeable)
│   │   │   ├── SlideIndicators (dot indicators, tap to jump)
│   │   │   └── Slide[] (repeating)
│   │   │       ├── SlideIcon/Image (top, 40% of viewport)
│   │   │       ├── SlideHeading (h2, benefit statement)
│   │   │       ├── SlideBody (p, explanatory text)
│   │   │       └── SlideFeatures (ul, 3-4 feature bullets)
│   │   │
│   │   ├── PersonaSelector (Step 2: Three-option selection)
│   │   │   ├── SelectorHeading (h2: Choose Your Experience)
│   │   │   └── PersonaCard[] (3 cards: Alexandra, Marcus, Chen)
│   │   │       ├── PersonaIcon (large, color-coded)
│   │   │       ├── PersonaName (h3)
│   │   │       ├── PersonaDescription (p)
│   │   │       ├── PersonaFeatures (ul, key benefits)
│   │   │       └── SelectButton (hidden until persona selected)
│   │   │
│   │   ├── BiometricEnrollment (Step 3: Camera capture)
│   │   │   ├── EnrollmentHeading (h2)
│   │   │   ├── EnrollmentDescription (p)
│   │   │   ├── BiometricCameraView (video element, face outline)
│   │   │   ├── CaptureButton (Capture Face)
│   │   │   ├── SkipButton (Skip, Unlock Later)
│   │   │   └── FeedbackMessage (Align face, Good, Complete)
│   │   │
│   │   └── PreferencesForm (Step 4: Profile completion)
│   │       ├── FormHeading (h2)
│   │       ├── NameInput (text input, label)
│   │       ├── EmailInput (email input, label)
│   │       ├── AirlinePreference (select dropdown)
│   │       ├── FrequentFlyerInput (text input, optional)
│   │       └── TermsCheckbox (GDPR + Terms)
│   │
│   └── OnboardingFooter (sticky bottom)
│       ├── BackButton (← Previous, skip on Step 0)
│       ├── NextButton (Next or Complete)
│       └── ProgressText (Step X of 4)
└── Modals (conditional)
    └── PermissionsModal (Camera access request)
```

### Component Relationships

**Parent → Child:**
- `OnboardingPage` → All steps (via conditional rendering + scroll)
- `WelcomeStep` → HeroImage, HeadlineGroup, ButtonGroup
- `ValuePropSlides` → SlideIndicators, Slide[]
- `PersonaSelector` → PersonaCard[] (3 instances)
- `BiometricEnrollment` → BiometricCameraView, CaptureButton
- `PreferencesForm` → Input[] (4), Checkbox, Buttons

**Shared Props:**
- All steps receive `onNext`, `onBack`, `currentStep` from parent
- All inputs connected to `OnboardingContext` for state management

---

## 5. Component Specifications

### Component: WelcomeStep

**Props Interface:**
```typescript
interface WelcomeStepProps {
  onGetStarted: () => void;
  onSkip: () => void;
  persona?: 'premium' | 'business' | 'family';
}
```

**Internal State:**
```typescript
// No local state; all state managed by parent via context
```

**Tailwind Classes:**
```typescript
const styles = {
  container: 'h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden',
  heroImage: 'absolute inset-0 z-0 w-full h-3/5 object-cover',
  content: 'relative z-10 flex flex-col items-center justify-center h-full max-w-md text-center',
  heading: 'text-3xl font-bold text-neutral-900 leading-tight mb-3',
  subheading: 'text-base text-neutral-600 mb-8 leading-relaxed',
  buttonGroup: 'flex flex-col gap-3 w-full mt-8',
  primaryButton: 'w-full py-3 font-medium rounded-lg',
  secondaryButton: 'w-full py-3 text-center text-primary-600 font-medium',
};
```

**Responsive Behavior:**
- Mobile: Full viewport, buttons at bottom
- Tablet (768px+): Smaller max-width, larger typography
- Desktop: Centered, constrained width

**Shadcn UI Base:**
```typescript
<Button variant="default" size="lg" className="w-full">
  Let's Get Started
</Button>

<Button variant="ghost" size="lg" className="w-full">
  Skip to Browse
</Button>
```

---

### Component: ValuePropSlides

**Props Interface:**
```typescript
interface ValuePropSlidesProps {
  onComplete: () => void;
  persona?: string;
}

interface Slide {
  id: string;
  icon: string; // emoji or SVG path
  headline: string;
  body: string;
  features: string[];
}
```

**Internal State:**
```typescript
const [currentSlide, setCurrentSlide] = useState(0);
const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
```

**Tailwind Classes:**
```typescript
const styles = {
  carousel: 'relative h-screen overflow-hidden',
  slideContainer: 'flex transition-transform duration-300',
  slide: 'min-w-full h-screen flex flex-col items-center justify-center px-6 py-12',
  icon: 'text-6xl mb-8',
  headline: 'text-2xl font-bold text-neutral-900 mb-4 max-w-sm',
  body: 'text-base text-neutral-600 mb-8 max-w-sm text-center leading-relaxed',
  features: 'list-none pl-0 space-y-2 max-w-sm text-sm text-neutral-700',
  featureItem: 'flex items-start gap-2',
  featureIcon: 'text-primary-500 font-bold mt-1',
  indicators: 'flex justify-center gap-2 py-4',
  indicator: 'h-2 w-2 rounded-full cursor-pointer transition-all',
  indicatorActive: 'w-6 bg-primary-500',
  indicatorInactive: 'bg-neutral-300',
};
```

**Responsive Behavior:**
- Mobile: Full-width carousel, tap to navigate
- Tablet+: Same behavior, larger spacing
- Swipe gesture supported on mobile

**Shadcn UI Base:** None (custom carousel)

---

### Component: PersonaSelector

**Props Interface:**
```typescript
interface PersonaSelectorProps {
  onSelect: (persona: Persona) => void;
  selectedPersona?: Persona;
}

interface Persona {
  id: 'premium' | 'business' | 'family';
  name: string;
  icon: string;
  description: string;
  features: string[];
  color: string; // Tailwind color class
}
```

**Internal State:**
```typescript
const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
```

**Tailwind Classes:**
```typescript
const styles = {
  container: 'flex flex-col items-center justify-center min-h-screen px-4 py-8',
  heading: 'text-2xl font-bold text-neutral-900 mb-2 text-center',
  subheading: 'text-base text-neutral-600 mb-8 text-center max-w-sm',
  grid: 'grid grid-cols-1 gap-4 w-full max-w-md',
  card: 'p-6 rounded-lg border-2 border-neutral-200 cursor-pointer transition-all hover:border-primary-500 hover:shadow-md',
  cardSelected: 'border-primary-500 bg-primary-50 shadow-md',
  icon: 'text-4xl mb-4',
  name: 'text-lg font-semibold text-neutral-900 mb-2',
  description: 'text-sm text-neutral-600 mb-4 leading-relaxed',
  features: 'list-none pl-0 space-y-1 text-xs text-neutral-700',
};
```

**Responsive Behavior:**
- Mobile: Full-width cards, vertical stack
- Tablet+: May expand to 2-column grid (but prefer 1-column for clarity)
- Touch target: 56px+ minimum height per card

**Shadcn UI Base:** `Card` component

---

### Component: BiometricEnrollment

**Props Interface:**
```typescript
interface BiometricEnrollmentProps {
  onCapture: (biometricData: BiometricCapture) => void;
  onSkip: () => void;
  supportedMethods: ('face' | 'fingerprint')[];
}

interface BiometricCapture {
  method: 'face' | 'fingerprint';
  timestamp: Date;
  verified: boolean;
}
```

**Internal State:**
```typescript
const [cameraActive, setCameraActive] = useState(false);
const [captureStatus, setCaptureStatus] = useState<'idle' | 'ready' | 'capturing' | 'success' | 'error'>('idle');
const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
```

**Tailwind Classes:**
```typescript
const styles = {
  container: 'flex flex-col items-center justify-center min-h-screen px-4 py-8',
  heading: 'text-2xl font-bold text-neutral-900 mb-2 text-center',
  description: 'text-base text-neutral-600 mb-8 text-center max-w-sm',
  cameraView: 'relative w-full max-w-sm aspect-square mb-8 bg-neutral-900 rounded-lg overflow-hidden',
  video: 'w-full h-full object-cover',
  faceOutline: 'absolute inset-0 flex items-center justify-center',
  ovalPath: 'stroke-primary-500 stroke-2 fill-none w-48 h-64',
  statusText: 'absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium',
  captureButton: 'px-8 py-3 bg-primary-500 text-white rounded-lg font-medium mb-4',
  skipButton: 'px-8 py-2 text-primary-600 font-medium',
};
```

**Responsive Behavior:**
- Mobile: Full-width camera, 1:1 aspect ratio
- Tablet+: Constrained max-width (400px)
- Rotate support: Portrait only for face capture

**Shadcn UI Base:** `Button` component

---

### Component: PreferencesForm

**Props Interface:**
```typescript
interface PreferencesFormProps {
  onComplete: (preferences: PreferencesInput) => void;
}

interface PreferencesInput {
  name: string;
  email: string;
  airlinePreference?: string;
  frequentFlyerPrograms?: Record<string, string>;
  acceptTerms: boolean;
}
```

**Internal State:**
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<PreferencesInput>();
```

**Tailwind Classes:**
```typescript
const styles = {
  container: 'flex flex-col items-center justify-center min-h-screen px-4 py-8',
  heading: 'text-2xl font-bold text-neutral-900 mb-2 text-center',
  description: 'text-base text-neutral-600 mb-8 text-center max-w-sm',
  form: 'w-full max-w-md space-y-6',
  formGroup: 'flex flex-col',
  label: 'text-sm font-medium text-neutral-900 mb-2',
  input: 'px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
  inputError: 'border-error-500 focus:ring-error-500',
  errorText: 'text-xs text-error-500 mt-1',
  checkboxGroup: 'flex items-start gap-2 mt-4',
  checkbox: 'mt-1 h-5 w-5 cursor-pointer accent-primary-500',
  checkboxLabel: 'text-xs text-neutral-600 leading-relaxed',
  button: 'w-full py-3 font-medium rounded-lg',
};
```

**Responsive Behavior:**
- Mobile: Full-width form
- Tablet+: Constrained max-width (400px)
- Touch target: 44px+ minimum for inputs

**Shadcn UI Base:** `Input`, `Form`, `Checkbox`

---

## 6. Layout & Wireframe

### Welcome Step (Step 0) — Mobile Layout

```
┌─────────────────────────────────────┐
│   [Hero Image - Full Bleed]         │  ← 60% of viewport height
│   [Travel/Airport Photography]      │
│   (Parallax animation on scroll)    │
├─────────────────────────────────────┤
│                                     │
│  Where Every Journey Begins         │  ← h1, 28px, bold
│  With Calm                          │
│                                     │
├─────────────────────────────────────┤
│  AirThere is your travel operating  │
│  system — one identity, unified     │
│  experience, anticipatory calm.     │  ← p, 16px, neutral-600
│                                     │
│  (Persona-specific subheading)      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  [Let's Get Started Button]         │  ← Full-width, primary color
│                                     │
│  [Skip to Browse Link]              │  ← Full-width, ghost style
│                                     │
└─────────────────────────────────────┘
```

### Value Prop Slides (Step 1) — Mobile Layout

```
┌─────────────────────────────────────┐
│  ✈️ (or illustration icon)          │  ← 48px, centered
│                                     │
│  Anticipatory Calm                  │  ← h2, 24px, bold
│                                     │
│  AirThere thinks ahead. Disruptions │
│  are managed before they affect     │  ← p, 16px, neutral-600
│  your journey. Get alerts 72 hours  │
│  before issues arise.               │
│                                     │
│  ✓ Proactive alerts                 │  ← 12px, bullets
│  ✓ Autonomous rebooking             │
│  ✓ Family integrity protected       │
│                                     │
├─────────────────────────────────────┤
│  ● ○ ○ ○ ○                          │  ← Slide indicators, tap-able
├─────────────────────────────────────┤
│                                     │
│  [Next] or [Swipe Left]             │
│                                     │
└─────────────────────────────────────┘
```

### Persona Selector (Step 2) — Mobile Layout

```
┌─────────────────────────────────────┐
│                                     │
│  Choose Your Experience             │  ← h2, 24px, bold, centered
│                                     │
│  Personalization unlocks AirThere's │
│  full power. Select your profile.   │  ← p, 16px, neutral-600
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐   │
│  │  💎 PREMIUM                  │   │  ← Card, border-2, hover:shadow
│  │  Alexandra                   │   │
│  │                              │   │
│  │  White-glove anticipatory    │   │
│  │  service for the discerning  │   │
│  │  traveler.                   │   │
│  │                              │   │
│  │  ✓ Biometric seamlessness    │   │
│  │  ✓ Invisible automation      │   │
│  │  ✓ Lounge priority access    │   │
│  │                              │   │
│  │  [Select This Persona]       │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  ⚡ BUSINESS                  │   │
│  │  Marcus                      │   │
│  │  [Similar structure]         │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  👨‍👩‍👧‍👦 FAMILY               │   │
│  │  Chen Family                 │   │
│  │  [Similar structure]         │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Biometric Enrollment (Step 3) — Mobile Layout

```
┌─────────────────────────────────────┐
│                                     │
│  Seamless Identity                  │  ← h2, 24px, bold
│                                     │
│  One-time biometric enrollment      │
│  unlocks frictionless airport check  │
│  in, gate recognition, and more.    │  ← p, 16px
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  📷 CAMERA VIEW             │    │  ← 1:1 aspect, rounded, dark bg
│  │  ┌───────────────────────┐  │    │
│  │  │    ◯                  │  │    │  ← Face outline SVG
│  │  │   ◯   ◯               │  │    │
│  │  │    ◯                  │  │    │
│  │  └───────────────────────┘  │    │
│  │  "Align your face"          │    │  ← Status text, bottom
│  └─────────────────────────────┘    │
│                                     │
│  [Capture Face]                     │  ← Primary button
│                                     │
│  [Skip, Unlock Later]               │  ← Secondary button
│                                     │
└─────────────────────────────────────┘
```

### Preferences Form (Step 4) — Mobile Layout

```
┌─────────────────────────────────────┐
│                                     │
│  Create Your Profile                │  ← h2, 24px, bold
│                                     │
│  A little info helps us personalize │
│  your experience.                   │  ← p, 16px
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Full Name *                        │  ← label, 12px, bold
│  [________________________]          │  ← input, 44px height
│                                     │
│  Email Address *                    │  ← label
│  [________________________]          │  ← input
│                                     │
│  Preferred Airline                  │  ← label
│  [Dropdown: Select...]              │  ← select/combo
│                                     │
│  Frequent Flyer Program             │  ← label, optional
│  [________________________]          │  ← input
│                                     │
│  ☐ I agree to Terms of Service      │  ← checkbox + label
│    and Privacy Policy               │
│                                     │
├─────────────────────────────────────┤
│  [Complete & Go to Home]            │  ← Primary button
└─────────────────────────────────────┘
```

### Responsive Breakpoints

**Mobile (320px-767px):**
- Full viewport width, no margin
- Single-column layout
- 16px horizontal padding
- Typography scaled for small screens
- Touch targets: 44px minimum

**Tablet (768px-1023px):**
- Max-width constrained to 640px
- Centered on screen
- 24px horizontal padding
- Larger typography (scale up 1.1x)
- Touch targets: 48px minimum

**Desktop (1024px+):**
- Max-width constrained to 640px
- Centered on screen
- 32px horizontal padding
- Full-size typography
- Non-touch optimized

---

## 7. Interaction Patterns

### Navigation Flow

**Primary Flow (Recommended Path):**
1. Welcome Step (0) → Tap "Let's Get Started" → Step 1
2. Value Prop Slides (1) → Swipe left 5 times or tap "Next" → Step 2
3. Persona Selector (2) → Tap persona card → Step 3
4. Biometric Enrollment (3) → Tap "Capture Face" or "Skip" → Step 4
5. Preferences Form (4) → Fill form, tap "Complete" → Home (SCR-002)

**Alternative Path (Skip Onboarding):**
1. Welcome Step (0) → Tap "Skip to Browse" → Search (SCR-004)

### Gesture Interactions

**Swipe Left/Right (Slides)**
- Swipe left: Move to next slide (Step 1)
- Swipe right: Move to previous slide (Step 1)
- Snap to slide position (velocity-based)
- Haptic feedback on snap (medium intensity)

**Tap/Click Interactions**
- Tap "Let's Get Started" → Scroll down to Step 1
- Tap "Skip to Browse" → Navigation to Search
- Tap persona card → Highlight with primary color, border-2
- Tap "Capture Face" → Trigger camera capture
- Tap form inputs → Focus ring (2px solid primary-500)
- Tap checkbox → Toggle checked state

**Pull-to-Refresh:** Not available on onboarding

### Button States

**Primary Button (Let's Get Started, Capture Face, Complete)**
```typescript
// Default state
background: primary-500, text: white, height: 44px, font-weight: 600

// Hover state (desktop)
background: primary-600, shadow: shadow-md

// Active state (pressing)
background: primary-700

// Disabled state (form validation)
background: neutral-300, opacity: 0.6, cursor: not-allowed
```

**Secondary Button (Skip, Skip Biometric)**
```typescript
// Default state
background: transparent, text: primary-600, border: none, font-weight: 500

// Hover state
text: primary-700, text-decoration: underline

// Active state
text: primary-800
```

### Scroll & Animation Behaviors

**Slide Transitions (Step 1 - Value Props):**
```typescript
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateX(-100% * currentSlide);
```

**Fade-In Animations (New Steps):**
```typescript
opacity: 0;
animation: fadeIn 0.3s ease-in forwards;
```

**Parallax Hero Image:**
```typescript
// Subtle parallax on scroll (respects prefers-reduced-motion)
transform: translateY(scrollOffset * 0.5px);
```

**Persona Card Selection:**
```typescript
// Smooth color & border transition
transition: all 0.2s ease-in-out;
border-color: neutral-200 → primary-500;
background-color: white → primary-50;
box-shadow: none → shadow-md;
```

**Biometric Face Outline Animation:**
```typescript
// Pulse effect while waiting for capture
animation: pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

### Loading & Progress

**Progress Bar:**
```typescript
// Top of screen, shows current step
width: (currentStep + 1) / 4 * 100%;
transition: width 0.3s ease-in-out;
height: 3px;
background: primary-500;
```

**Step Indicators (Slides):**
```typescript
// Dots at bottom of slide
opacity: 0.5 (inactive)
opacity: 1 (active)
width: 8px (inactive)
width: 24px (active)
transition: all 0.3s ease-in-out;
```

---

## 8. State Management

### Local Component State

**OnboardingPage (Main Container):**
```typescript
const [currentStep, setCurrentStep] = useState(0); // 0-4
const [isLoading, setIsLoading] = useState(false);
const [personaSelected, setPersonaSelected] = useState<Persona | null>(null);
const [biometricCaptured, setBiometricCaptured] = useState(false);
```

**ValuePropSlides:**
```typescript
const [currentSlide, setCurrentSlide] = useState(0); // 0-4
const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
```

**PreferencesForm (React Hook Form):**
```typescript
const { register, handleSubmit, formState: { errors, isDirty }, watch } = useForm<PreferencesInput>({
  defaultValues: {
    name: '',
    email: '',
    airlinePreference: '',
    frequentFlyerPrograms: {},
    acceptTerms: false,
  },
});

const name = watch('name');
const email = watch('email');
```

**BiometricEnrollment:**
```typescript
const [cameraActive, setCameraActive] = useState(false);
const [captureStatus, setCaptureStatus] = useState<'idle' | 'ready' | 'capturing' | 'success' | 'error'>('idle');
const [biometricData, setBiometricData] = useState<BiometricCapture | null>(null);
const videoRef = useRef<HTMLVideoElement>(null);
```

### Global State (Context)

**OnboardingContext:**
```typescript
interface OnboardingContextType {
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;

  // Data collection
  persona: Persona | null;
  setPersona: (persona: Persona) => void;

  biometricData: BiometricCapture | null;
  setBiometricData: (data: BiometricCapture) => void;

  preferences: Partial<PreferencesInput>;
  setPreferences: (prefs: Partial<PreferencesInput>) => void;

  // Navigation
  completeOnboarding: () => Promise<void>;
  skipOnboarding: () => Promise<void>;

  // Loading
  isLoading: boolean;
  error: string | null;
}

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Custom hook
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
```

### URL State

**Route Parameters:** None on onboarding
**Query Parameters:** None on onboarding
**Hash Fragments:** Not used

### Derived State

```typescript
// Which step is visible
const isStepVisible = (step: number) => currentStep === step;

// Is next button enabled?
const isNextEnabled = useMemo(() => {
  if (currentStep === 0) return true; // Welcome always has Next
  if (currentStep === 1) return true; // Slides always have Next
  if (currentStep === 2) return personaSelected !== null; // Persona required
  if (currentStep === 3) return true; // Biometric optional
  if (currentStep === 4) return isDirty && !Object.keys(errors).length; // Form valid
  return false;
}, [currentStep, personaSelected, isDirty, errors]);

// Form is complete?
const isFormValid = useMemo(() => {
  return name.trim().length > 0 &&
         email.includes('@') &&
         acceptTerms === true;
}, [name, email, acceptTerms]);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes (TypeScript Interfaces)

```typescript
// src/lib/types/user.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  persona: 'premium' | 'business' | 'family';
  profileImage?: string;
  biometric?: {
    method: 'face' | 'fingerprint';
    enrolledDate: Date;
    verified: boolean;
  };
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  airlinePreference?: string;
  frequentFlyerPrograms: Record<string, string>; // { 'UA': 'MP000123', 'BA': 'GB123456' }
  seatPreference?: 'aisle' | 'window' | 'middle';
  mealPreference?: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface Persona {
  id: 'premium' | 'business' | 'family';
  name: string;
  icon: string; // emoji
  description: string;
  features: string[];
  color: string; // tailwind color name
  heroImage: string; // URL
}

export interface BiometricCapture {
  method: 'face' | 'fingerprint';
  timestamp: Date;
  verified: boolean;
  enrollmentId?: string;
}
```

### Mock Data

```typescript
// src/lib/mock-data/personas.ts
export const PERSONAS: Record<string, Persona> = {
  premium: {
    id: 'premium',
    name: 'Premium',
    icon: '💎',
    description: 'White-glove anticipatory service for the discerning traveler.',
    features: [
      'Biometric seamlessness',
      'Invisible automation',
      'Lounge priority access',
      'Personal concierge availability',
    ],
    color: 'from-blue-500 to-indigo-600',
    heroImage: 'https://images.unsplash.com/photo-1436262174933-eb188fdfdf66',
  },
  business: {
    id: 'business',
    name: 'Business',
    icon: '⚡',
    description: 'Speed, control, and policy compliance for the time-starved executive.',
    features: [
      '90-second bookings',
      'Policy compliance guaranteed',
      'Multi-trip visibility',
      'Automatic disruption recovery',
    ],
    color: 'from-orange-500 to-red-600',
    heroImage: 'https://images.unsplash.com/photo-1522521776907-e282b0cd396f',
  },
  family: {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Transparency, family coordination, and guided logistics support.',
    features: [
      'Family seating guarantee',
      'Total cost clarity',
      'Family coordination tools',
      'Packing & prep guidance',
    ],
    color: 'from-green-500 to-emerald-600',
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
  },
};

// src/lib/mock-data/slides.ts
export const VALUE_PROP_SLIDES = [
  {
    id: 'slide-0',
    icon: '✈️',
    headline: 'Anticipatory Calm',
    body: 'AirThere thinks ahead. Disruptions are managed before they affect your journey.',
    features: [
      'Proactive alerts 72 hours before issues',
      'Autonomous rebooking without lifting a finger',
      'Family integrity protected through all changes',
    ],
  },
  {
    id: 'slide-1',
    icon: '🔐',
    headline: 'Biometric Seamlessness',
    body: 'One face. One identity. From enrollment to gate to destination.',
    features: [
      'Frictionless airport check-in',
      'Secure document vault',
      'Privacy-first design',
    ],
  },
  {
    id: 'slide-2',
    icon: '👨‍👩‍👧',
    headline: 'Family Integrity',
    body: 'When you book together, you stay together—through every disruption.',
    features: [
      '98% adjacent seating guarantee',
      'Family coordination dashboard',
      'Child-specific safety features',
    ],
  },
  {
    id: 'slide-3',
    icon: '🤖',
    headline: 'AI Copilot',
    body: 'Conversational assistance for every phase of your journey.',
    features: [
      'Natural language flight search',
      'Booking without friction',
      'Real-time travel optimization',
    ],
  },
  {
    id: 'slide-4',
    icon: '💰',
    headline: 'Transparent Pricing',
    body: 'No hidden fees. No dark patterns. Total cost clarity upfront.',
    features: [
      'All-in pricing from the start',
      'Fee breakdown on demand',
      'Price-match guarantees',
    ],
  },
];

// src/lib/mock-data/users.ts
export function generateMockUser(
  persona: 'premium' | 'business' | 'family'
): UserProfile {
  const personas = {
    premium: {
      name: 'Alexandra Sterling',
      email: 'alexandra@example.com',
      airlinePreference: 'BA',
      frequentFlyer: { 'BA': 'GB283947', 'UA': 'MP003847' },
    },
    business: {
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      airlinePreference: 'UA',
      frequentFlyer: { 'UA': 'MP234892', 'AA': 'AE928374' },
    },
    family: {
      name: 'Chen Family',
      email: 'chen.family@example.com',
      airlinePreference: 'DL',
      frequentFlyer: { 'DL': 'SK293847' },
    },
  };

  const data = personas[persona];

  return {
    id: `user-${Math.random().toString(36).slice(2, 9)}`,
    name: data.name,
    email: data.email,
    persona,
    preferences: {
      airlinePreference: data.airlinePreference,
      frequentFlyerPrograms: data.frequentFlyer,
      seatPreference: persona === 'premium' ? 'window' : 'aisle',
      notifications: { email: true, push: true },
    },
    createdAt: new Date(),
  };
}
```

### API Swap Strategy

**Design Mode:** Use mock data (no real API calls)

```typescript
// src/lib/services/userService.ts
export interface IUserService {
  createUser(profile: UserProfile): Promise<UserProfile>;
  getProfile(): Promise<UserProfile>;
}

// Mock implementation
export class MockUserService implements IUserService {
  async createUser(profile: UserProfile): Promise<UserProfile> {
    return {
      ...profile,
      id: `user-${Date.now()}`,
      createdAt: new Date(),
    };
  }

  async getProfile(): Promise<UserProfile> {
    // Return mock data
    return generateMockUser('premium');
  }
}

// Real implementation (placeholder)
export class RealUserService implements IUserService {
  async createUser(profile: UserProfile): Promise<UserProfile> {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
    return response.json();
  }

  async getProfile(): Promise<UserProfile> {
    const response = await fetch('/api/user/profile');
    return response.json();
  }
}

// Factory
const useRealAPI = process.env.NEXT_PUBLIC_API_MODE === 'real';
export const userService = useRealAPI ? new RealUserService() : new MockUserService();
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")

**Headline Variation (Step 0):**
- Default: "Where Every Journey Begins With Calm"
- Alexandra: "Where Seamlessness Begins With You"

**Icon/Visual Language:**
- Emoji: 💎 (diamond)
- Color scheme: Deep blue + gold accents
- Imagery: First-class cabin, luxury lounges, premium hotels

**Value Prop Focus (Step 1):**
- Lead with: "Biometric Seamlessness" (not Anticipatory Calm)
- Emphasize: "One face. One identity. Invisible automation."
- Highlight: Privacy, autonomy, white-glove service

**Persona Card (Step 2):**
```
💎 PREMIUM
Alexandra

White-glove anticipatory service for the discerning traveler.

✓ Biometric seamlessness (face, fingerprint)
✓ Autonomous capability with override option
✓ Concierge availability 24/7
✓ Privacy-first design
```

**Preferences Form (Step 4):**
- Pre-fill airline preference with premium carriers (BA, Lufthansa)
- Highlight frequent flyer program (suggest multiple programs)
- Add optional field: "Loyalty programs you value"

### PERSONA-02: Business ("Marcus")

**Headline Variation (Step 0):**
- Default: "Where Every Journey Begins With Calm"
- Marcus: "Where Speed Meets Control"

**Icon/Visual Language:**
- Emoji: ⚡ (lightning bolt)
- Color scheme: Warm orange + amber
- Imagery: Business class, airport lounges, meeting rooms

**Value Prop Focus (Step 1):**
- Lead with: "90-Second Bookings" (not Anticipatory Calm)
- Emphasize: "Policy compliance. Control. Efficiency."
- Highlight: Speed, automation, policy enforcement

**Persona Card (Step 2):**
```
⚡ BUSINESS
Marcus

Speed, control, and policy compliance for the time-starved executive.

✓ 90-second policy-compliant bookings
✓ Multi-trip visibility dashboard
✓ Automatic disruption recovery
✓ Expense auto-reconciliation
```

**Preferences Form (Step 4):**
- Pre-fill airline preference with business-friendly carriers (UA, AA)
- Add field: "Corporate travel policy URL" (optional)
- Highlight frequent flyer programs (suggest top-tier programs)

### PERSONA-03: Family ("Chen Family")

**Headline Variation (Step 0):**
- Default: "Where Every Journey Begins With Calm"
- Family: "Where Family Stays Together"

**Icon/Visual Language:**
- Emoji: 👨‍👩‍👧‍👦 (family)
- Color scheme: Vibrant green + emerald
- Imagery: Family vacations, kids on planes, group bookings

**Value Prop Focus (Step 1):**
- Lead with: "Family Integrity" (not Anticipatory Calm)
- Emphasize: "Family seating guaranteed. Total cost clarity. Guided support."
- Highlight: Family coordination, transparency, child safety

**Persona Card (Step 2):**
```
👨‍👩‍👧‍👦 FAMILY
Chen Family

Transparency, family coordination, and guided logistics support.

✓ Family seating guarantee (98% adjacent)
✓ Total cost visibility upfront
✓ Family coordination dashboard
✓ Packing & destination prep guidance
```

**Preferences Form (Step 4):**
- Add field: "Number of children in family"
- Add field: "Children's ages"
- Suggest family-friendly airlines
- Highlight: Group booking benefits

---

## 11. Accessibility Requirements

### ARIA Labels & Roles

**Step Container:**
```html
<section role="main" aria-label="Onboarding Step: Welcome">
  <!-- Step content -->
</section>
```

**Progress Bar:**
```html
<progress
  role="progressbar"
  aria-label="Onboarding progress"
  aria-valuenow="1"
  aria-valuemin="0"
  aria-valuemax="4"
  value="1"
  max="4"
/>
```

**Slide Indicators:**
```html
<div role="tablist" aria-label="Slide selection">
  <button role="tab" aria-selected="true" aria-label="Slide 1">●</button>
  <button role="tab" aria-selected="false" aria-label="Slide 2">○</button>
</div>
```

**Persona Cards:**
```html
<article role="option" aria-selected="false" aria-label="Premium persona">
  <!-- Card content -->
</article>
```

**Form Inputs:**
```html
<label htmlFor="name-input">Full Name *</label>
<input
  id="name-input"
  type="text"
  required
  aria-required="true"
  aria-describedby="name-error"
/>
<span id="name-error" role="alert" className="error-text">
  {errors.name?.message}
</span>
```

### Focus Management

**Initial Focus:** First interactive element (CTA button on Welcome)

```typescript
const welcomeButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  welcomeButtonRef.current?.focus();
}, []);
```

**Modal/Sheet Focus Trap:** Not applicable (full-screen flow)

**Focus Visible Indicator:**
```css
.button:focus-visible {
  outline: 2px solid primary-500;
  outline-offset: 2px;
}
```

**Focus Order:** Top to bottom, left to right (Tab key)
```
1. Get Started Button
2. Skip to Browse Button
→ (next step)
1. Previous Button
2. Slide Indicators (tab through each)
3. Next Button
```

### Keyboard Navigation

**Tab Key:**
- Cycles through interactive elements
- Wraps around at end (loop back to first)
- Focus visible on all targets

**Enter Key:**
- Activates focused button
- Submits form (if on submit button)

**Space Key:**
- Toggles checkbox (Step 4)
- Activates button (if button)

**Escape Key:**
- Dismiss biometric modal (Step 3)
- Go back to previous step (Step 1-4)

**Arrow Keys:** Not used (no menus)

**Implementation:**
```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    handleBack();
  }
  if (e.key === 'ArrowRight' && currentStep === 1) {
    e.preventDefault();
    handleSlideNext();
  }
  if (e.key === 'ArrowLeft' && currentStep === 1) {
    e.preventDefault();
    handleSlidePrev();
  }
};
```

### Screen Reader Flow

**Welcome Step:**
> "Heading level 1: Where Every Journey Begins With Calm. Paragraph: AirThere is your travel operating system — one identity, unified experience, anticipatory calm. Button: Let's Get Started. Button: Skip to Browse."

**Value Prop Slides:**
> "Heading level 2: Anticipatory Calm. Paragraph: AirThere thinks ahead. Disruptions are managed before they affect your journey. List with 3 items: Proactive alerts, Autonomous rebooking, Family integrity. Tablist: Slide selection. 5 tabs: Slide 1 selected, Slide 2, Slide 3, Slide 4, Slide 5."

**Persona Selector:**
> "Heading level 2: Choose Your Experience. Paragraph: [description]. Tablist with 3 options: Premium persona, Business persona, Family persona. Artcle: Premium persona. Heading level 3: Premium. Heading level 4: Alexandra. Paragraph: [description]. List with 4 items."

### Touch Targets

**Minimum Size:** 44×44pt (iOS) / 48×48dp (Android)

**Implementation:**
```typescript
// Button: 44pt height
<button className="py-3 px-4"> {/* py-3 = 12px * 2 + 20px = 44px */}

// Card: 56pt minimum height
<article className="p-6"> {/* Padding expands touch target */}

// Checkbox: 20px size + 12px padding = 44pt
<input type="checkbox" className="w-5 h-5" />
<div className="flex gap-3"> {/* Gap creates spacing */}
```

### Color Contrast

**Text Contrast:** 4.5:1 minimum (WCAG AA)

| Element | Foreground | Background | Ratio | AA? |
|---------|-----------|-----------|-------|-----|
| Body text | neutral-900 | white | 16:1 | ✓ |
| Secondary text | neutral-600 | white | 7:1 | ✓ |
| Button text | white | primary-500 | 7:1 | ✓ |
| Error text | error-600 | white | 5.5:1 | ✓ |

**Test Tool:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Motion & Animation

**Respect prefers-reduced-motion:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationStyle = prefersReducedMotion
  ? {}
  : { animation: 'fadeIn 0.3s ease-in' };
```

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML

- Use `<button>` for buttons (not `<div>`)
- Use `<form>` for forms (not custom inputs)
- Use `<label>` with `htmlFor` for form inputs
- Use heading hierarchy (h1 → h2 → h3, no skipping levels)
- Use `<section>`, `<article>`, `<nav>` for structure

---

## 12. Loading, Error & Empty States

### Skeleton Screen (Initial Load)

If onboarding takes >200ms to render (unlikely in Design Mode):

```typescript
<div className="h-screen flex flex-col items-center justify-center px-4">
  {/* Hero image skeleton */}
  <div className="w-full h-1/2 bg-neutral-200 rounded-lg animate-pulse mb-8" />

  {/* Headline skeleton */}
  <div className="h-8 w-40 bg-neutral-200 rounded-lg animate-pulse mb-4" />

  {/* Subheading skeleton */}
  <div className="h-5 w-56 bg-neutral-200 rounded-lg animate-pulse mb-2" />
  <div className="h-5 w-48 bg-neutral-200 rounded-lg animate-pulse mb-8" />

  {/* Button skeletons */}
  <div className="h-12 w-full max-w-md bg-neutral-200 rounded-lg animate-pulse mb-4" />
  <div className="h-12 w-full max-w-md bg-neutral-200 rounded-lg animate-pulse" />
</div>
```

### Error State

**Scenario:** Biometric enrollment fails

```typescript
<div className="flex flex-col items-center justify-center py-8">
  <div className="text-4xl mb-4">⚠️</div>
  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
    Camera Access Denied
  </h3>
  <p className="text-sm text-neutral-600 text-center mb-6 max-w-sm">
    We need camera access to capture your biometric data. Please check your device
    permissions and try again.
  </p>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium">
    Try Again
  </button>
  <button className="px-6 py-2 text-primary-600 font-medium">
    Skip This Step
  </button>
</div>
```

**Scenario:** Form validation error

```typescript
<span role="alert" className="text-xs text-error-500 mt-1 font-medium">
  Please enter a valid email address (e.g., name@example.com)
</span>
```

### Empty/Offline State

**Offline (No Network):**

```typescript
<div className="flex flex-col items-center justify-center py-8">
  <div className="text-4xl mb-4">📡</div>
  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
    No Network Connection
  </h3>
  <p className="text-sm text-neutral-600 text-center mb-6 max-w-sm">
    Onboarding requires an internet connection. Please check your network and try again.
  </p>
  <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium">
    Retry
  </button>
</div>
```

---

## 13. Edge Cases & Error Handling

### Missing Data
- **User skips biometric:** Store `biometric: null`, don't enforce
- **User skips airline preference:** Allow empty string, provide default later
- **User's device doesn't support biometric:** Show fallback (PIN enrollment or skip)

### Network Failures
- **API timeout during user creation:** Show retry button, preserve form data
- **Upload failure during form submission:** Cache form data locally, retry when online
- **Geolocation fails:** Not required for onboarding, skip gracefully

### Validation Errors
- **Email validation:** Real-time feedback (red text), prevent form submission
- **Name too short (<2 chars):** Show error: "Please enter your full name"
- **Passwords don't match:** Show error below second password field
- **Required field empty:** Show error with red border on input

### Boundary Conditions
- **User rapidly swipes between slides:** Debounce swipe handler (300ms)
- **User goes back to Welcome after skipping:** Allow, return to Step 0
- **User completes onboarding twice:** Show "Already completed" message, redirect to Home
- **Browser tab closed mid-onboarding:** Save progress to localStorage, resume on reopen

---

## 14. Testing Requirements

### Component Tests (Vitest + React Testing Library)

**Test Suite: WelcomeStep**
```typescript
describe('WelcomeStep', () => {
  it('renders welcome headline', () => {
    const { getByRole } = render(<WelcomeStep {...props} />);
    expect(getByRole('heading')).toHaveTextContent('Where Every Journey Begins');
  });

  it('calls onGetStarted when primary button clicked', async () => {
    const onGetStarted = vi.fn();
    const { getByText } = render(<WelcomeStep onGetStarted={onGetStarted} {...props} />);
    await userEvent.click(getByText('Let\'s Get Started'));
    expect(onGetStarted).toHaveBeenCalled();
  });

  it('calls onSkip when secondary button clicked', async () => {
    const onSkip = vi.fn();
    const { getByText } = render(<WelcomeStep onSkip={onSkip} {...props} />);
    await userEvent.click(getByText('Skip to Browse'));
    expect(onSkip).toHaveBeenCalled();
  });

  it('adapts headline for premium persona', () => {
    const { getByRole } = render(<WelcomeStep persona="premium" {...props} />);
    expect(getByRole('heading')).toHaveTextContent('Where Seamlessness Begins');
  });
});
```

**Test Suite: PersonaSelector**
```typescript
describe('PersonaSelector', () => {
  it('renders three persona cards', () => {
    const { getByLabelText } = render(<PersonaSelector {...props} />);
    expect(getByLabelText(/premium/i)).toBeInTheDocument();
    expect(getByLabelText(/business/i)).toBeInTheDocument();
    expect(getByLabelText(/family/i)).toBeInTheDocument();
  });

  it('highlights selected persona', async () => {
    const { getByLabelText } = render(<PersonaSelector {...props} />);
    const premiumCard = getByLabelText(/premium/i);
    await userEvent.click(premiumCard);
    expect(premiumCard).toHaveClass('border-primary-500');
  });

  it('calls onSelect with selected persona', async () => {
    const onSelect = vi.fn();
    const { getByLabelText } = render(<PersonaSelector onSelect={onSelect} {...props} />);
    await userEvent.click(getByLabelText(/business/i));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'business' }));
  });
});
```

**Test Suite: PreferencesForm**
```typescript
describe('PreferencesForm', () => {
  it('validates required fields', async () => {
    const { getByText, getByLabelText } = render(<PreferencesForm {...props} />);
    await userEvent.click(getByText('Complete'));
    expect(getByText('Please enter your full name')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const { getByLabelText } = render(<PreferencesForm {...props} />);
    await userEvent.type(getByLabelText(/email/i), 'invalid-email');
    expect(getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const onComplete = vi.fn();
    const { getByLabelText, getByText } = render(<PreferencesForm onComplete={onComplete} {...props} />);

    await userEvent.type(getByLabelText(/name/i), 'John Doe');
    await userEvent.type(getByLabelText(/email/i), 'john@example.com');
    await userEvent.click(getByLabelText(/terms/i));
    await userEvent.click(getByText('Complete'));

    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
      acceptTerms: true,
    }));
  });
});
```

### Key Assertions
- ✓ Step navigation works (forward, backward, skip)
- ✓ Persona selection persists across steps
- ✓ Form validation prevents invalid submissions
- ✓ Error messages appear on validation failure
- ✓ Loading states show during API calls
- ✓ Touch targets are >44×44pt
- ✓ Focus order is correct

### Mock Data for Tests
```typescript
// src/lib/mock-data/__tests__/mockData.ts
export const MOCK_PERSONA = {
  id: 'premium',
  name: 'Premium',
  icon: '💎',
  description: 'Test premium persona',
  features: ['Feature 1', 'Feature 2'],
  color: 'primary',
};

export const MOCK_USER_PROFILE = {
  id: 'user-test',
  name: 'Test User',
  email: 'test@example.com',
  persona: 'premium',
};

export const MOCK_FORM_INPUT = {
  name: 'John Doe',
  email: 'john@example.com',
  acceptTerms: true,
};
```

### Accessibility Tests (Axe)
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<OnboardingPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 15. Build Checklist

- [ ] **Tech Setup Complete**
  - [ ] Next.js 14 project initialized
  - [ ] TypeScript strict mode enabled
  - [ ] Tailwind CSS v4 configured
  - [ ] Shadcn UI components installed
  - [ ] ESLint & Prettier configured

- [ ] **Directory Structure Created**
  - [ ] `src/app/(auth)/onboarding/` directory
  - [ ] `src/components/` subdirectories
  - [ ] `src/lib/mock-data/` and `src/lib/services/`
  - [ ] All supporting directories

- [ ] **Route Created**
  - [ ] `(auth)/onboarding/page.tsx` created
  - [ ] `(auth)/layout.tsx` created
  - [ ] Route accessible at `/onboarding`

- [ ] **Mock Data Implemented**
  - [ ] PERSONAS data structure
  - [ ] VALUE_PROP_SLIDES array
  - [ ] Mock user generator function
  - [ ] Airline data

- [ ] **Components Built & Tested**
  - [ ] WelcomeStep component
  - [ ] ValuePropSlides component
  - [ ] PersonaSelector component
  - [ ] BiometricEnrollment component
  - [ ] PreferencesForm component
  - [ ] OnboardingProgressBar component
  - [ ] OnboardingFooter component

- [ ] **State Management**
  - [ ] OnboardingContext created
  - [ ] useOnboarding hook implemented
  - [ ] Form state with React Hook Form

- [ ] **Responsive Design**
  - [ ] Mobile (320px) layout tested
  - [ ] Tablet (768px) layout tested
  - [ ] Desktop (1024px) layout tested
  - [ ] Orientation changes handled

- [ ] **Persona Adaptations**
  - [ ] Premium persona headline variations
  - [ ] Business persona headline variations
  - [ ] Family persona headline variations
  - [ ] Persona-specific defaults in form

- [ ] **Accessibility**
  - [ ] ARIA labels on all interactive elements
  - [ ] Focus management working
  - [ ] Keyboard navigation complete
  - [ ] Screen reader tested
  - [ ] Touch targets >44×44pt
  - [ ] Color contrast 4.5:1+
  - [ ] Motion respects prefers-reduced-motion
  - [ ] Axe accessibility audit passing

- [ ] **Loading States**
  - [ ] Skeleton screens implemented
  - [ ] Loading indicators on buttons
  - [ ] Smooth transitions between steps

- [ ] **Error Handling**
  - [ ] Form validation errors displayed
  - [ ] Network error handling
  - [ ] Biometric permission errors
  - [ ] Graceful error recovery

- [ ] **Testing**
  - [ ] Unit tests for all components
  - [ ] Integration test for full flow
  - [ ] Form validation tests
  - [ ] Accessibility tests passing
  - [ ] >80% code coverage

- [ ] **Performance**
  - [ ] Lighthouse score >90
  - [ ] LCP <2.5s
  - [ ] No layout shifts (CLS < 0.1)
  - [ ] Smooth animations (60 FPS)

- [ ] **Documentation**
  - [ ] Component prop documentation
  - [ ] Mock data usage documented
  - [ ] Type definitions exported

---

## Next Steps After This Shard

1. **Build SCR-002 (Home / Today View):** Depends on working auth from SCR-001
2. **Connect Mock Services:** Wire up mock data to Home screen
3. **Test End-to-End:** Complete onboarding → Home flow
4. **Gather Feedback:** Validate persona adaptations with stakeholders

---

**Shard Status:** Ready for build
**Estimated Build Time:** 2-3 days (1 developer)
**Last Updated:** 2026-03-29
