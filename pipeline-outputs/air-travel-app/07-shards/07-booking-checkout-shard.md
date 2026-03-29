# Booking Flow / Checkout — Build Shard
## AirThere | Screen SCR-007 | Shard 07

---

## 1. Screen Overview

**Screen ID:** SCR-007
**Screen Name:** Booking Flow / Checkout
**Purpose:** Multi-step booking flow (6 steps) including flight review, seat confirmation, passenger info, dynamic bundling, payment, and booking confirmation. Achieves sub-90-second booking for Marcus (business traveler).

---

## 2. Route & File Location

### Next.js Route Path
```
(main)/booking/checkout/page.tsx
(main)/booking/confirmation/page.tsx
```

---

## 3. Dependencies & Prerequisites

### Upstream Dependencies
- **SCR-006 (Flight Detail):** User selects flight and seats
- **Mock Data Services:** bookingService.createBooking()

### Shared Components Required
- `Button`, `Card`, `Input`, `Form`, `Skeleton` (Shadcn)
- `StepProgressBar` (custom, shows 6 steps)
- `BottomSheet` (bundle recommendations)
- `BundleOptionCard` (seat + meal + lounge combo)

### Mock Data Requirements
- Passenger form templates
- Bundle recommendations (based on persona)
- Payment gateway integration (mock)
- Trip protection packages

---

## 4. Component Hierarchy

```
BookingPage
├── BookingHeader (sticky)
│   ├── StepProgressBar (Step 1/6, 2/6, etc.)
│   ├── Title (contextual per step)
│   └── SaveDraftButton
├── MainContent (6-step form)
│   ├── Step 1: FlightReview
│   │   ├── SelectedFlight (read-only summary)
│   │   ├── SelectedSeats (read-only list)
│   │   └── EditButton (back to SCR-006)
│   │
│   ├── Step 2: BundleSelection
│   │   ├── BundleOption[] (3-5 personalized bundles)
│   │   │   ├── Seat tier (economy, premium, first)
│   │   │   ├── Meal options
│   │   │   ├── Lounge access
│   │   │   ├── Bundle price
│   │   │   └── SelectButton
│   │   └── CustomizeButton (skip to à la carte)
│   │
│   ├── Step 3: PassengerInfo
│   │   ├── PassengerForm[] (one per passenger)
│   │   │   ├── NameInput (required)
│   │   │   ├── DateOfBirthInput (required)
│   │   │   ├── EmailInput (required)
│   │   │   ├── PhoneInput (optional)
│   │   │   └── SpecialRequestsInput (optional)
│   │   └── AddPassengerButton (if <4 passengers)
│   │
│   ├── Step 4: TripProtection
│   │   ├── ProtectionOption[] (3-4 options)
│   │   │   ├── CancellationInsurance (checkbox)
│   │   │   ├── BaggageInsurance (checkbox)
│   │   ├── WeatherGuarantee (checkbox)
│   │   └── ConciergeCoverage (checkbox)
│   │
│   ├── Step 5: PaymentMethod
│   │   ├── PaymentMethodSelector
│   │   │   ├── CreditCard
│   │   │   ├── ApplePay
│   │   │   ├── GooglePay
│   │   │   ├── PayPal
│   │   │   └── BNPL
│   │   ├── BillingAddressForm (if credit card)
│   │   └── TermsCheckbox
│   │
│   └── Step 6: ReviewAndConfirm
│       ├── BookingSummary (read-only)
│       │   ├── Flight details
│       │   ├── Passengers
│       │   ├── Seats
│       │   ├── Bundles
│       │   ├── Protection
│       │   └── Total price (large, prominent)
│       └── FinalBookButton (submit)
│
└── StepNavigation (bottom, sticky)
    ├── BackButton (disabled on step 1)
    ├── NextButton (enabled if step valid)
    └── SaveDraftButton
```

---

## 5. Component Specifications

### Component: BundleOptionCard

**Props Interface:**
```typescript
interface BundleOptionCardProps {
  bundle: {
    id: string;
    name: string; // "Economy Basic", "Premium Plus", etc.
    seatClass: string;
    inclusions: string[];
    basePrice: number;
    totalPrice: number;
    savings?: number;
    recommended?: boolean;
  };
  onSelect: (bundleId: string) => void;
}
```

**Tailwind Classes:**
```typescript
const styles = {
  card: 'p-4 border-2 border-neutral-200 rounded-lg cursor-pointer transition-all hover:border-primary-500',
  cardSelected: 'border-primary-500 bg-primary-50',
  cardRecommended: 'ring-2 ring-secondary-500',
  header: 'flex justify-between items-start mb-3',
  name: 'font-semibold text-neutral-900',
  badge: 'bg-secondary-500 text-white px-2 py-1 rounded text-xs',
  inclusions: 'space-y-1 mb-3 text-sm',
  inclusionItem: 'flex items-start gap-2',
  price: 'text-xl font-bold text-primary-600',
  savings: 'text-xs text-success-600 font-medium',
};
```

---

### Component: StepProgressBar

**Props Interface:**
```typescript
interface StepProgressBarProps {
  currentStep: number; // 1-6
  totalSteps: number;
  stepLabels: string[];
}
```

---

## 6. Layout & Wireframe

### Step 1: Flight Review — Mobile

```
┌──────────────────────────────────────┐
│ ◼ 1/6 ◻ ◻ ◻ ◻ ◻      Review Flight   │
├──────────────────────────────────────┤
│                                      │
│ ✓ Your Flight Selected               │
│                                      │
│ United UA 901                        │
│ SFO → LHR                            │
│ Mar 30, 2026 | 11:00 AM - 8:45 AM  │
│ 10h 45m | Nonstop | $850            │
│                                      │
│ Seat: 12A (Premium Economy)         │
│ Meal: Vegetarian                    │
│                                      │
│ [Edit Selection]                    │
│                                      │
├──────────────────────────────────────┤
│ [Back]              [Next: Bundles] │
└──────────────────────────────────────┘
```

### Step 2: Bundle Selection — Mobile

```
┌──────────────────────────────────────┐
│ ◼ ◼ 2/6 ◻ ◻ ◻ ◻   Choose Bundle    │
├──────────────────────────────────────┤
│                                      │
│ We recommend the Perfect Pairing   │
│ based on your travel pattern.      │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ ⭐ Economy Basic (RECOMMENDED) │  │
│ │ $850                           │  │
│ │                                │  │
│ │ ✓ Seat                         │  │
│ │ ✓ Standard meal                │  │
│ │ ✓ WiFi                         │  │
│ │                                │  │
│ │ [Select This]                  │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ Premium Plus                   │  │
│ │ $950 (Save $50)               │  │
│ │                                │  │
│ │ ✓ Premium seat upgrade        │  │
│ │ ✓ Full meal + lounge pass     │  │
│ │ ✓ WiFi + streaming            │  │
│ │                                │  │
│ │ [Select This]                  │  │
│ └────────────────────────────────┘  │
│                                      │
│ [Back]      [Next: Passengers] →   │
└──────────────────────────────────────┘
```

### Step 5: Payment — Mobile

```
┌──────────────────────────────────────┐
│ ◼ ◼ ◼ ◼ ◼ 5/6     Payment Details    │
├──────────────────────────────────────┤
│                                      │
│ Payment Method                       │
│                                      │
│ ○ Credit Card                        │
│ ◉ Apple Pay                          │
│ ○ Google Pay                         │
│ ○ PayPal                             │
│ ○ Buy Now, Pay Later                │
│                                      │
│ Billing Address                      │
│ [Same as profile address ✓]         │
│                                      │
│ Address Line 1                       │
│ [123 Main Street________________]   │
│                                      │
│ City / State / ZIP                   │
│ [San Francisco, CA 94102___________] │
│                                      │
│ ☐ I agree to AirThere's Terms of    │
│   Service and Privacy Policy         │
│                                      │
│ [Back]      [Review & Confirm] →   │
└──────────────────────────────────────┘
```

### Confirmation Page — Mobile

```
┌──────────────────────────────────────┐
│                   ✓ Booking Confirmed│
├──────────────────────────────────────┤
│                                      │
│      🎉 Your Trip is Booked! 🎉     │
│                                      │
│ Confirmation #: BK-UA-23948         │
│                                      │
│ United UA 901                        │
│ SFO → LHR                            │
│ Mar 30, 2026 at 11:00 AM            │
│ Seat: 12A                            │
│                                      │
│ Passenger: Alexandra Sterling       │
│                                      │
│ Total: $850                          │
│                                      │
│ ✓ Confirmation email sent to        │
│   alexandra@example.com              │
│                                      │
│ [View Booking]                       │
│ [Add to Calendar]                    │
│ [Download Boarding Pass]             │
│                                      │
│ Next: Check in 24 hours before     │
│ departure. Tap below to set reminder │
│                                      │
│ [Set Check-in Reminder]              │
│                                      │
│ [Done] → Home                        │
│                                      │
└──────────────────────────────────────┘
```

---

## 7. Interaction Patterns

### Step Navigation
- Tap "Next" → Validate step, move to next step
- Tap "Back" → Go to previous step (preserve input)
- Show progress bar animation (grow)
- Auto-save draft after each step (localStorage)

### Bundle Selection
- Tap bundle card → Highlight it
- Show detailed breakdown (what's included)
- Update total price live
- "Recommended" badge for ML-suggested option

### Form Validation
- Real-time field validation (email, phone, DOB)
- Show error message in red below field
- Disable Next button if any required field invalid

### Payment Method
- Tap payment method → Show specific form (Apple Pay vs. card)
- Auto-fill from saved methods (if available)
- PCI compliance indicators ("Secure checkout", "Lock icon")

---

## 8. State Management

### Multi-Step Form State

```typescript
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
  flightId: '',
  seatSelection: [],
  bundleId: '',
  passengers: [],
  tripProtection: {cancellation: false, baggage: false},
  paymentMethod: '',
  billingAddress: {},
});

const [errors, setErrors] = useState<Record<string, string>>({});
const [isSubmitting, setIsSubmitting] = useState(false);
```

### Draft Persistence

```typescript
useEffect(() => {
  localStorage.setItem('bookingDraft', JSON.stringify(formData));
}, [formData]);
```

---

## 9. Data Requirements & Mock Data

### Data Shapes

```typescript
export interface BookingInput {
  flightId: string;
  seatSelections: {seatNumber: string; passengerIndex: number}[];
  bundleId: string;
  passengers: PassengerInfo[];
  tripProtection: TripProtection;
  paymentMethod: PaymentMethod;
  billingAddress: Address;
}

export interface Booking {
  id: string;
  confirmationNumber: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  ... rest of booking data
}
```

### Mock Data

```typescript
export function generateMockBundles(persona: string): Bundle[] {
  if (persona === 'premium') {
    return [{id: 'bundle-1', name: 'First Class', seatClass: 'first', totalPrice: 2500}];
  }
  if (persona === 'business') {
    return [{id: 'bundle-2', name: 'Business Direct', seatClass: 'business', totalPrice: 1800}];
  }
  return [{id: 'bundle-3', name: 'Economy Basic', seatClass: 'economy', totalPrice: 850}];
}

export function generateMockConfirmation(booking: BookingInput): Booking {
  return {
    id: `bk-${Date.now()}`,
    confirmationNumber: `BK-UA-${String(Math.random() * 99999).padStart(5, '0')}`,
    status: 'confirmed',
    createdAt: new Date(),
    ...booking,
  };
}
```

---

## 10. Persona Adaptations

### PERSONA-01: Premium ("Alexandra")
- Auto-select: Premium bundles, first-class seat if available
- Trip protection: All options checked (cancellation, concierge)
- Messaging: "Your premium experience awaits"

### PERSONA-02: Business ("Marcus")
- **90-second booking:** Show timer, remove optional fields
- Auto-select: Business class, nonstop routing
- Trip protection: Weather guarantee + policy compliance checker
- Messaging: "Secure your policy-compliant booking"

### PERSONA-03: Family ("Chen Family")
- Bundle emphasis: Family meal options, child seats together
- Trip protection: Highlight baggage insurance
- Special requests: Pre-fill common family needs (bassinet, high chair)

---

## 11. Accessibility Requirements

### ARIA Labels

**Step Progress:**
```html
<div role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="6" aria-label="Booking step 2 of 6">
```

**Form Validation:**
```html
<input aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" role="alert">Please enter valid email</span>
```

---

## 12. Loading, Error & Empty States

### Submission Loading
```typescript
<button disabled={isSubmitting} className="opacity-50 cursor-not-allowed">
  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
</button>
```

### Payment Error
```typescript
<div role="alert" className="p-4 bg-error-50 border border-error-200 rounded-lg text-error-700">
  Payment declined. Please try a different card or payment method.
</div>
```

---

## 13. Edge Cases & Error Handling

- **Payment decline:** Show retry option with alt. payment methods
- **Passenger data invalid:** Don't submit, highlight invalid fields
- **Session timeout:** Auto-save draft, prompt restore on return
- **Booking conflict:** Another user books same seat → Show alert, offer alternative
- **Price change during booking:** Show warning, prompt to re-confirm

---

## 14. Testing Requirements

### Component Tests

```typescript
describe('BundleOptionCard', () => {
  it('shows recommended badge', () => {
    const { getByText } = render(
      <BundleOptionCard bundle={{...mockBundle, recommended: true}} />
    );
    expect(getByText('RECOMMENDED')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <BundleOptionCard bundle={mockBundle} onSelect={onSelect} />
    );
    await userEvent.click(container.querySelector('article')!);
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('BookingFlow', () => {
  it('completes 6-step flow successfully', async () => {
    const { getByText } = render(<BookingFlow {...props} />);

    // Step 1: Review
    await userEvent.click(getByText('Next'));
    expect(getByText(/2\/6/)).toBeInTheDocument();

    // Step 2: Bundles
    await userEvent.click(getByText('Select This'));
    await userEvent.click(getByText('Next'));

    // ... continue through steps

    // Step 6: Confirm
    expect(getByText('Confirm Booking')).toBeInTheDocument();
  });

  it('validates passenger form before next step', async () => {
    const { getByText, getByLabelText } = render(<BookingFlow {...props} />);
    // Skip to Step 3: Passengers
    // Leave name empty
    // Try to go to next step
    await userEvent.click(getByText('Next'));
    expect(getByText(/name is required/i)).toBeInTheDocument();
  });
});
```

---

## 15. Build Checklist

- [ ] 6-step form flow with state management
- [ ] Flight review step (read-only summary)
- [ ] Bundle selection with personalized recommendations
- [ ] Passenger information form with validation
- [ ] Trip protection options
- [ ] Payment method selector (5 methods)
- [ ] Review & confirm summary
- [ ] Form validation on each step
- [ ] Draft auto-save to localStorage
- [ ] All persona adaptations applied
- [ ] Confirmation page with booking details
- [ ] Download boarding pass functionality
- [ ] Add to calendar functionality
- [ ] Email confirmation integration (mock)
- [ ] Accessibility audit passing
- [ ] Error handling & edge cases
- [ ] 90-second booking for Marcus validated
- [ ] Unit tests for all steps
- [ ] Integration tests for full flow

---

**Estimated Build Time:** 4-5 days
**Dependencies:** SCR-006 complete
**Complexity:** Very High (6-step form, payment, validation)
**Success Metric:** Marcus persona completes in <90 seconds
