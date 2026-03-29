# AirThere — UI Design Direction
## Pipeline Step 7.5 of 10 | 2026-03-29
## AUTHORITATIVE — Supersedes all earlier design token definitions

---

## 1. Design Philosophy (800+ words)

### The North Star Emotion: Anticipatory Calm

AirThere's visual identity must embody a single, non-negotiable emotional core: **Anticipatory Calm** — the feeling that intelligence is working on your behalf before you even know you need it. This is not the frenzied energy of a discount airline app. This is not the cold corporate sterility of legacy airline interfaces. This is the calm competence of a private aviation concierge who has already thought through your needs, who moves with purpose and clarity, and who makes complexity invisible.

The visual language must say: "We've got this. You can breathe. Everything is handled."

### Visual Inspiration: The Intersection of Three Worlds

**1. Apple's Clarity Philosophy**
Apple's design language demonstrates that sophistication comes from *subtraction*, not addition. Abundant white space. Considered typography. Zero visual clutter. Actions are obvious because there are only essential actions. Every pixel serves a purpose. This becomes AirThere's baseline: premium restraint, not premium ornamentation.

**2. Singapore Airlines' Elegance & Precision**
Singapore Airlines represents the gold standard in airline brand sophistication. Their visual language combines deep, sophisticated blues with restrained gold accents, refined typography, and an almost architectural approach to spacing. There's no cheap ornamentation — every element is proportional, considered, and purposeful. AirThere must echo this sophistication without copying Singapore Airlines' specific color palette.

**3. Airbnb's Warmth & Humanity**
Airbnb brought warmth into travel. Their design feels accessible without being casual, approachable without being cheap. They use generous spacing, photography that showcases real humans and real moments, and a color palette that feels inviting rather than corporate. For AirThere, this represents the reminder that travel is *human* — connecting people to places and experiences, not just moving bodies between airports.

### The Anti-Patterns: What AirThere Must NOT Be

**Airline App Clichés We Must Reject:**
1. **Aggressive Blues** — The ubiquitous "airline blue" (#003580 and variants). This blue has been beaten to death by 200+ airlines. It reads as generic, cautious, and corporate. AirThere's blue must feel more sophisticated: deeper, more complex, with undertones of twilight rather than sky.

2. **Cheap "Premium" Effects** — Fake glass morphism, harsh gradients, neon accent colors, glowing buttons. These read as a startup trying too hard to seem premium. Real premium is subtle, restrained, and confident.

3. **Skeuomorphic Boarding Passes** — Realistic-looking digital boarding passes with fake perforations and shadows. This is 2012 thinking. Modern design abstracts these concepts into elegant digital representations.

4. **Over-Iconography** — Every action labeled with an icon AND text AND a tooltip. This creates visual noise. Trust the icons. Use white space.

5. **Dark Mode as Default** — Dark mode should be a *choice*, not the marketing default. AirThere's light mode is the canonical experience. Dark mode is an accessibility accommodation.

6. **Placeholder Grays** — Generic neutral grays (#ddd, #999) that feel like unfinished design. Every gray must be intentional and part of the OKLCH color system.

### Core Design Principles

**Principle 1: Invisible Technology**
The best technology is felt, never seen. Users should never think about the design system while using AirThere. They should think only about their trip, their family, their journey. This means:
- Animations are purposeful, never decorative
- Transitions are smooth but never draw attention
- Form layouts are so intuitive users don't think about filling them out
- Error messages are rare and helpful, never accusatory

**Principle 2: Radical Information Transparency**
Every cost is visible. Every delay is explained. Every option is presented without manipulation. The visual hierarchy must reflect this: important information is prominent, not hidden in footnotes. Disruption information stands out not through aggressive color but through clear, calm presentation that acknowledges the problem and presents solutions.

**Principle 3: Premium Restraint**
Premium is not "more stuff." Premium is the confidence to use abundant white space, to leave surfaces uncluttered, to trust that generous breathing room signals luxury. Every element on screen must justify its existence. Decoration is zero.

**Principle 4: Context-Aware Adaptation**
The design adapts to context without requiring the user to think about it. Different screens, different journey phases, different personas — each sees the right design for their needs, but the system feels unified. A premium traveler and a leisure traveler should both feel like they're in the "right" experience.

**Principle 5: Accessibility is Beauty**
WCAG 2.1 AA compliance is not a constraint; it's a feature. High contrast improves legibility for everyone. Clear focus indicators help all users navigate. Sufficient spacing between targets reduces errors for everyone. The most beautiful design is one that serves everyone equally well.

---

## 2. Color System (1,000+ words)

### OKLCH Color Space: Why It Matters

AirThere uses the OKLCH (Lightness, Chroma, Hue) color space exclusively. Unlike sRGB or HSL, OKLCH provides **perceptual uniformity**: two colors with the same lightness value actually appear the same brightness to human perception, regardless of their hue. This is crucial for:

1. **Accessibility** — Ensuring color contrast ratios are accurate and predictable
2. **Consistency** — Colors maintain their visual weight across the entire palette
3. **Internationalization** — OKLCH is display-agnostic and works across all devices
4. **Dark Mode** — Lightness swaps are mathematically predictable and elegant

### Primary Palette: "Horizon"

**Primary Brand Color — Deep Twilight Blue**

```
OKLCH: oklch(57.5% 0.194 262)
HEX: #0F4C8F (approximate conversion)
CSS Variable: --color-primary-500
```

This is AirThere's signature color. It's deeper, more sophisticated, and more travel-inspired than typical airline blue. It evokes the moment when day becomes night at 35,000 feet — that calm transition moment before the cabin lights dim and the world below disappears. It's the color of the night sky, not the daytime sky.

**Primary Variants (for Surfaces and Text):**

```
PRIMARY-50 (Almost white):  oklch(97% 0.002 262) — #F9FBFD
PRIMARY-100:               oklch(92% 0.010 262) — #E8EEF7
PRIMARY-200:               oklch(85% 0.030 262) — #C8D8E8
PRIMARY-300:               oklch(78% 0.070 262) — #A8C4D6
PRIMARY-400:               oklch(68% 0.125 262) — #5B94C3
PRIMARY-500:               oklch(57.5% 0.194 262) — #0F4C8F (canonical)
PRIMARY-600:               oklch(50% 0.210 262) — #003B7A
PRIMARY-700:               oklch(43% 0.200 262) — #002D63
PRIMARY-800:               oklch(35% 0.180 262) — #00204A
PRIMARY-900:               oklch(25% 0.140 262) — #001433
```

**Usage Rules:**
- Surfaces: PRIMARY-50 to PRIMARY-200 (backgrounds and cards)
- Interactive States: PRIMARY-400 to PRIMARY-600 (buttons, hover states)
- Text Emphasis: PRIMARY-700 to PRIMARY-900 (headings, important text)
- Dark Mode: Reverse the scale (PRIMARY-900 becomes background, PRIMARY-100 becomes text)

### Secondary Palette: "Arrival" (Warm Accents)

**Warm Accent — Anticipatory Gold**

```
OKLCH: oklch(64% 0.158 50)
HEX: #D4A145 (approximate conversion)
CSS Variable: --color-secondary-500
```

This warm, sophisticated amber is used for highlights, calls-to-action, premium indicators, and moments of celebration (booking confirmation, upgrade notification). It evokes the golden hour at arrival — that moment when travelers see their destination and excitement builds. It's not a corporate yellow; it's warm, energetic, and welcoming.

**Secondary Variants:**

```
SECONDARY-50:     oklch(95% 0.004 50) — #FBF8F4
SECONDARY-100:    oklch(90% 0.020 50) — #F2E8D8
SECONDARY-200:    oklch(82% 0.070 50) — #E5D3A8
SECONDARY-300:    oklch(75% 0.110 50) — #D9B96E
SECONDARY-400:    oklch(70% 0.140 50) — #D4A145 (canonical)
SECONDARY-500:    oklch(64% 0.158 50) — #CCAB4D
SECONDARY-600:    oklch(55% 0.160 50) — #B88A2D
SECONDARY-700:    oklch(48% 0.150 50) — #A0691F
SECONDARY-800:    oklch(40% 0.130 50) — #804D15
SECONDARY-900:    oklch(30% 0.100 50) — #5A340B
```

**Usage Rules:**
- CTAs: SECONDARY-500 to SECONDARY-600 (primary action buttons)
- Highlights: SECONDARY-400 to SECONDARY-500 (premium badges, important data)
- Light Backgrounds: SECONDARY-50 to SECONDARY-100 (confirmation messages, celebration moments)
- Dark Accents: SECONDARY-700 to SECONDARY-800 (text on light backgrounds, emphasis)

### Semantic Colors

**Success — Calm Green (Flights On Time, Bookings Confirmed)**

```
SUCCESS-50:       oklch(95% 0.008 142) — #F0F9F5
SUCCESS-100:      oklch(90% 0.025 142) — #D4EFDC
SUCCESS-200:      oklch(80% 0.070 142) — #A3D9BC
SUCCESS-300:      oklch(68% 0.150 142) — #52B56D
SUCCESS-400:      oklch(65% 0.160 142) — #2EA853
SUCCESS-500:      oklch(62% 0.165 142) — #1B9C3D (canonical)
SUCCESS-600:      oklch(55% 0.155 142) — #0D8C2D
SUCCESS-700:      oklch(45% 0.140 142) — #066B1F
SUCCESS-800:      oklch(35% 0.110 142) — #004D15
SUCCESS-900:      oklch(25% 0.080 142) — #00330B
```

On-time notifications, booking confirmations, and positive status changes use SUCCESS-500 or SUCCESS-600. Keep it calm, not celebratory.

**Warning — Warm Amber (Delays, Price Changes, Minor Disruptions)**

```
WARNING-50:       oklch(96% 0.005 60) — #FFFBF0
WARNING-100:      oklch(92% 0.025 60) — #FCF0DC
WARNING-200:      oklch(85% 0.080 60) — #F5D9A3
WARNING-300:      oklch(78% 0.130 60) — #ECC26F
WARNING-400:      oklch(71% 0.165 60) — #E8B84A
WARNING-500:      oklch(67% 0.175 60) — #E0A334 (canonical)
WARNING-600:      oklch(58% 0.165 60) — #C98A1A
WARNING-700:      oklch(48% 0.145 60) — #A86F0A
WARNING-800:      oklch(40% 0.120 60) — #804C00
WARNING-900:      oklch(28% 0.090 60) — #5A3400
```

Delays, price changes, and minor disruptions use WARNING-500. The tone is cautious but not alarming — like a yellow flag, not a red one.

**Error/Disruption — Warm Coral (Cancellations, Critical Alerts)**

```
ERROR-50:         oklch(96% 0.008 25) — #FEF5F3
ERROR-100:        oklch(92% 0.035 25) — #FCD8D0
ERROR-200:        oklch(85% 0.080 25) — #F5A899
ERROR-300:        oklch(75% 0.150 25) — #ED8878
ERROR-400:        oklch(68% 0.200 25) — #E5654D
ERROR-500:        oklch(62% 0.228 25) — #D94B3A (canonical)
ERROR-600:        oklch(55% 0.215 25) — #C53627
ERROR-700:        oklch(48% 0.190 25) — #A82A17
ERROR-800:        oklch(40% 0.160 25) — #8A1A0B
ERROR-900:        oklch(28% 0.120 25) — #5C0D04
```

Cancellations, payment failures, and critical alerts use ERROR-500 or ERROR-600. Warm rather than pure red, because even disruptions deserve calm, human communication.

**Info — Calm Blue-Gray (Informational Messages, Minor Alerts)**

```
INFO-50:          oklch(96% 0.002 240) — #F0F8FB
INFO-100:         oklch(92% 0.012 240) — #D9EDFF
INFO-200:         oklch(86% 0.040 240) — #B0D9F5
INFO-300:         oklch(78% 0.085 240) — #7FBF E8
INFO-400:         oklch(70% 0.125 240) — #5BA5DB
INFO-500:         oklch(62% 0.155 240) — #3B8BCC (canonical)
INFO-600:         oklch(55% 0.160 240) — #2A76B8
INFO-700:         oklch(48% 0.150 240) — #1A5C9E
INFO-800:         oklch(40% 0.130 240) — #0F4682
INFO-900:         oklch(28% 0.100 240) — #082E5A
```

Gate changes, informational notices, and non-critical alerts use INFO-500. Light and reassuring.

### Surface Colors: The Foundation

**Backgrounds and Base Surfaces**

```
BACKGROUND:       oklch(98% 0.001 50) — #FFFDF9
  Purpose: Main background, nearly white but with warm undertone
  Why not pure white? Pure #FFFFFF feels sterile and creates harsh
  contrast. A warm, near-white background is easier on eyes and feels
  more premium. The warmth (hue 50) connects to the Arrival palette.

SURFACE:          oklch(97% 0.002 50) — #FEF9F4
  Purpose: Cards, containers, elevated surfaces
  Slight elevation (darker than background) via lightness difference

SURFACE-200:      oklch(94% 0.003 50) — #FADFD1
  Purpose: Subtle elevation, hover states for cards

SURFACE-300:      oklch(91% 0.005 50) — #F5CFC0
  Purpose: Borders, dividers, very subtle backgrounds

OVERLAY-DARK:     rgba(0, 0, 0, 0.6)
  Purpose: Scrim behind modals, bottom sheets
  Usage: Full coverage behind all dismissible overlays

OVERLAY-LIGHT:    rgba(0, 0, 0, 0.1)
  Purpose: Subtle scrim, reduced-prominence overlays
  Usage: Very subtle darkening of background
```

### Dark Mode Colors: "Night Flight"

Dark mode must maintain the brand identity while reducing brightness for OLED/nighttime viewing. The approach:

1. **Swap Lightness** — Invert the OKLCH lightness values (98% becomes 2%, etc.)
2. **Maintain Hue & Chroma** — Keep the color families intact
3. **Reduce Chroma Slightly** — Less saturated dark mode is easier on eyes
4. **Add Warmth** — Dark backgrounds tend to feel cold; add slight warmth

**Dark Mode Palette (Generated from Light Mode):**

```
DARK-BG:          oklch(12% 0.002 50) — #1A1410
DARK-SURFACE:     oklch(18% 0.003 50) — #2D2620
DARK-SURFACE-2:   oklch(25% 0.005 50) — #423A32
DARK-SURFACE-3:   oklch(32% 0.008 50) — #564E45

DARK-TEXT:        oklch(95% 0.002 50) — #F5F1ED
DARK-TEXT-2:      oklch(85% 0.005 50) — #D9D4CE
DARK-TEXT-3:      oklch(70% 0.008 50) — #B0A59A

DARK-PRIMARY-500: oklch(65% 0.194 262) — #5B94C3
DARK-SECONDARY:   oklch(72% 0.158 50) — #E0C164
```

**Dark Mode CSS:**
```css
.dark {
  --color-background: oklch(12% 0.002 50);
  --color-surface: oklch(18% 0.003 50);
  --color-text: oklch(95% 0.002 50);
  /* All other colors inverted */
}
```

### Color Usage Rules

**Hierarchy & Emphasis:**
- **Primary Actions:** Use SECONDARY-500 (warm amber) for the single most important CTA per screen
- **Secondary Actions:** Use PRIMARY-500 (deep blue) for supporting actions
- **Text Hierarchy:** PRIMARY-900 (darkest blue) for headings, PRIMARY-800 for body, PRIMARY-700 for secondary text
- **Disabled States:** Use SURFACE-300 for backgrounds, SURFACE-200 for text

**Never:**
- Use pure black (#000000) for text or backgrounds
- Use more than one secondary accent color per screen
- Layer multiple gradients (one gradient maximum per screen)
- Use red or orange except for error/warning states
- Use colors outside the defined OKLCH palette

---

## 3. Typography System (700+ words)

### Font Families

**Body & UI — System Stack with Fallback**

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
             sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

This system stack provides the best typography on every device:
- **macOS/iOS:** San Francisco (Apple's native font)
- **Windows:** Segoe UI (Microsoft's native font)
- **Android:** Roboto (via system defaults)
- **Generic:** Helvetica Neue as fallback

This stack is superior to single-font selections because it uses each platform's native font, reducing file size and improving rendering. All fonts in this stack have excellent readability and include full emoji support.

**No custom web fonts.** Web fonts add 50-200KB to initial load. The system stack is faster, more readable, and accessible to all users regardless of connection speed.

### Type Scale

All font sizes are based on a **rational scale** rooted in 16px (body text) and a 1.25 multiplier (major third). This creates harmonious proportions where each size has a clear relationship to others.

**Display Sizes (Large Headlines):**
```
Display 1 (48px/56px):  Used for page heroes, onboarding headlines
Display 2 (40px/48px):  Used for major section headings, trip names
Display 3 (32px/40px):  Used for screen titles, important status
```

**Heading Sizes (Content Organization):**
```
Heading 1 (28px/36px):  Primary screen headlines
Heading 2 (24px/32px):  Major content sections
Heading 3 (20px/28px):  Subsection titles, card titles
Heading 4 (18px/26px):  Smaller content groupings
Heading 5 (16px/24px):  Tertiary labels
Heading 6 (14px/20px):  Very small labels, metadata
```

**Body Sizes (Content):**
```
Body Large (16px/24px):  Default body text, form inputs
Body (14px/20px):        Secondary text, descriptions, labels
Body Small (12px/16px):  Captions, metadata, timestamps
Body XS (11px/16px):     Very small labels, footer text
```

**Monospace (Flight Numbers, Prices, Confirmation Codes):**
```
Monospace (16px/24px):   "Courier New", Courier, monospace
```
Use Courier for any data that should feel "exact" — flight numbers, confirmation codes, baggage tags, prices in the booking flow. Monospace signals "this is precise data, not marketing text."

### Font Weights

Only four weights are used across the entire app. This reduces file size and improves consistency.

```
Regular (400):    Default for all body text and most UI
Medium (500):     Form labels, emphasis within paragraphs, buttons
Semibold (600):   Subheadings, card titles, highlighted data
Bold (700):       Page headlines, important notifications
```

**Usage:**
- Paragraphs: Regular (400)
- Labels: Medium (500)
- Headings H3-H6: Semibold (600)
- Headings H1-H2: Bold (700)
- Buttons: Medium (500) or Semibold (600)

### Line Height & Letter Spacing

**Line Heights (for readability and breathing room):**

```
Display (28-40px text):  1.2 line-height
Heading (16-28px text):  1.3 line-height
Body (14-16px text):     1.5 line-height
Body Small (11-12px):    1.4 line-height
```

Generous line heights improve scannability and reduce cognitive load. Larger text can use tighter line height; smaller text needs more breathing room.

**Letter Spacing (tracking):**

```
Display Headlines:       -0.5px to -1.0px (negative for sophistication)
Headings:                -0.25px (subtle tightening)
Body Text:               0px (natural spacing)
Captions & Labels:       0.25px (slight opening for clarity)
All Caps Text:           0.5px (required for readability when in caps)
```

### Specific Text Styles

**Headlines (H1 - Page Titles)**
- Font Size: 28px (mobile), 32px (tablet), 40px (desktop)
- Line Height: 1.3
- Font Weight: Bold (700)
- Letter Spacing: -0.5px
- Color: PRIMARY-900
- Example: "Your Trip to London — March 15–20"

**Secondary Headlines (H2 - Section Titles)**
- Font Size: 24px (mobile), 28px (tablet), 32px (desktop)
- Line Height: 1.3
- Font Weight: Semibold (600)
- Letter Spacing: -0.25px
- Color: PRIMARY-800
- Example: "Upcoming Trips"

**Tertiary Headlines (H3 - Card Titles)**
- Font Size: 18px
- Line Height: 1.3
- Font Weight: Semibold (600)
- Letter Spacing: 0px
- Color: PRIMARY-800
- Example: "British Airways BA-112"

**Body Text (Default)**
- Font Size: 16px
- Line Height: 1.5
- Font Weight: Regular (400)
- Color: PRIMARY-800
- Example: "Your flight departs at 10:45 AM from Terminal 3. Gate information will be available 2 hours before departure."

**Body Secondary (Descriptions, Metadata)**
- Font Size: 14px
- Line Height: 1.5
- Font Weight: Regular (400)
- Color: PRIMARY-700
- Example: "Baggage included in price"

**Caption Text (Smallest, for metadata)**
- Font Size: 12px
- Line Height: 1.4
- Font Weight: Regular (400)
- Color: PRIMARY-600
- Example: "Last updated 2 minutes ago"

**Form Labels**
- Font Size: 14px
- Line Height: 1.5
- Font Weight: Medium (500)
- Color: PRIMARY-800
- Example: "Departure Date"

**Flight Numbers & Confirmation Codes**
- Font Size: 16px
- Font Family: Monospace
- Font Weight: Semibold (600)
- Color: PRIMARY-500
- Letter Spacing: 0.5px
- Example: "BA-112" or "ABCD1234EF"

### Accessibility Requirements for Typography

- **Minimum Font Size:** Never smaller than 12px for body text (11px only for very minor metadata)
- **Color Contrast:** All text must meet WCAG AA minimum (4.5:1 for normal text, 3:1 for large text)
- **Text Resizing:** All text must remain readable when resized up to 200%
- **No Text as Image:** All text must be semantic HTML, never rasterized in images
- **Font Loading:** System fonts load instantly; no web font delays

---

## 4. Spacing & Layout (500+ words)

### Base Unit Grid: 4px

All spacing in AirThere is based on a 4px grid. Every margin, padding, gap, and size increment is a multiple of 4px. This creates mathematical harmony and makes responsive design predictable.

**Spacing Scale:**

```
0px — No spacing (no margin/padding)
4px — xs (1 unit)
8px — sm (2 units)
12px — md-sm (3 units)
16px — md (4 units)
20px — md-lg (5 units)
24px — lg (6 units)
32px — xl (8 units)
40px — 2xl (10 units)
48px — 3xl (12 units)
56px — 4xl (14 units)
64px — 5xl (16 units)
80px — 6xl (20 units)
96px — 7xl (24 units)
```

### Container & Screen Margins

**Mobile (320px - 767px):**
- Horizontal padding: 16px (md)
- Safe area: 16px minimum on all sides (including notch areas)
- Maximum content width: 100% - 32px

**Tablet (768px - 1023px):**
- Horizontal padding: 24px (lg)
- Safe area: 24px minimum
- Maximum content width: 100% - 48px

**Desktop (1024px+):**
- Horizontal padding: 32px (xl)
- Safe area: 32px minimum
- Maximum content width: 1200px (centered)

### Section Spacing

Vertical spacing between major content sections:

```
Between sections:    32px (xl) to 48px (3xl)
Between subsections: 24px (lg) to 32px (xl)
Between components:  16px (md) to 24px (lg)
Between list items:  12px (md-sm) to 16px (md)
```

### Component Internal Padding

**Buttons:**
```
Small:      8px (vertical) × 12px (horizontal)
Medium:     12px × 16px (default)
Large:      16px × 24px (for primary CTAs)
```

**Cards:**
```
Default:    16px (md) all sides
Large:      20px (md-lg) all sides
Compact:    12px (md-sm) all sides
```

**Input Fields:**
```
Height:     48px (minimum touch target)
Padding:    12px (md-sm) horizontal, centered vertically
Border:     1px (not part of height calculation)
```

**Bottom Sheets:**
```
Header padding:      16px (md)
Content padding:     16px (md) left/right, 24px (lg) bottom
Handle bar:          5px height, 40px width
```

### Safe Areas (Notch & Bottom Bar)

**iOS Notch:**
- Add padding-top: max(16px, env(safe-area-inset-top))
- Add padding-left/right: max(16px, env(safe-area-inset-left/right))

**Android Bottom Navigation Bar:**
- Add padding-bottom: max(16px, env(safe-area-inset-bottom))
- Tab bar should sit above content, not overlay

**Bottom Tab Navigation:**
- Height: 64px (56px icon/text + 8px padding)
- Ensure 44px minimum touch target for each tab
- Label text: 10-11px below icon

---

## 5. Component Style Specifications (1,800+ words)

### Buttons

AirThere uses Shadcn Button component as the base, with custom styling.

**Primary Button (Warm Amber)**

```
Background:        SECONDARY-500 (oklch(64% 0.158 50))
Text:              #FFFFFF (white, for maximum contrast)
Border Radius:     8px
Height:            48px (mobile), 44px (desktop)
Padding:           12px (vertical) × 24px (horizontal)
Font:              Medium (500), 16px
Letter Spacing:    0px
Border:            None

States:
  Default:         SECONDARY-500
  Hover:           SECONDARY-600 (oklch(55% 0.160 50))
  Active:          SECONDARY-700 (oklch(48% 0.150 50))
  Disabled:        SURFACE-300 with TEXT-300 (grayed out)
  Loading:         SECONDARY-500 with spinner overlay

Shadows:
  Default:         0 1px 3px rgba(0, 0, 0, 0.1)
  Hover:           0 4px 8px rgba(0, 0, 0, 0.15)
  Active:          Inset 0 2px 4px rgba(0, 0, 0, 0.2)
```

Usage: Single primary CTA per screen. Use for "Book Flight," "Confirm Booking," "Continue," etc.

**Secondary Button (Deep Blue)**

```
Background:        PRIMARY-500 (oklch(57.5% 0.194 262))
Text:              #FFFFFF
Border Radius:     8px
Height:            48px (mobile), 44px (desktop)
Padding:           12px × 24px
Font:              Medium (500), 16px
Border:            None

States:
  Default:         PRIMARY-500
  Hover:           PRIMARY-600 (oklch(50% 0.210 262))
  Active:          PRIMARY-700 (oklch(43% 0.200 262))
  Disabled:        SURFACE-300 with TEXT-300
```

Usage: Secondary actions, navigation, "Cancel," "Back," "View Details," etc.

**Ghost Button (No Background)**

```
Background:        Transparent
Text:              PRIMARY-600
Border:            1px solid PRIMARY-300 (oklch(78% 0.070 262))
Border Radius:     8px
Height:            44px
Padding:           10px × 20px (accounting for 1px border)
Font:              Regular (400), 16px

States:
  Default:         Transparent background, PRIMARY-600 text
  Hover:           PRIMARY-50 background, PRIMARY-700 text
  Active:          PRIMARY-100 background, PRIMARY-700 text
  Disabled:        SURFACE-300 background, SURFACE-200 text
```

Usage: Tertiary actions, toggles, "Save for Later," "Delete," "Cancel," etc.

**Button Sizes**

```
Small (XS):        36px height, 8px padding, 14px font
Small (S):         40px height, 10px padding, 14px font
Medium (M):        44px height (desktop), 12px padding, 16px font
Large (L):         48px height (mobile), 12px padding, 16px font
```

### Cards

AirThere uses Shadcn Card component, customized for travel data.

**Standard Card**

```
Background:        SURFACE (oklch(97% 0.002 50))
Border:            1px solid SURFACE-300 (oklch(91% 0.005 50))
Border Radius:     12px
Padding:           16px (md)
Shadow:            0 1px 3px rgba(0, 0, 0, 0.08)
Transition:        All 200ms ease

States:
  Default:         As above
  Hover:           Shadow increases to 0 4px 12px rgba(0, 0, 0, 0.12)
  Pressed:         Shadow reduces to 0 0 0 rgba(0, 0, 0, 0)
  Selected:        Border becomes PRIMARY-500, shadow increases
```

**Card Variants**

**TripCard (Upcoming Trip Summary)**
```
Layout:
  ┌─────────────────────────────────┐
  │ [Destination/Title]    [Duration]
  │ [Departure → Arrival]  [Dates]
  │ [Status Badge]         [Price]
  └─────────────────────────────────┘

Font:
  Title:    Semibold (600), 18px, PRIMARY-900
  Route:    Regular (400), 14px, PRIMARY-700
  Status:   Medium (500), 12px, matching semantic color
  Price:    Monospace, Semibold (600), 16px, PRIMARY-500

Padding:   16px (md)
Border:    PRIMARY-200 if selected, SURFACE-300 otherwise
```

**FlightCard (Single Flight Option in Results)**
```
Layout:
  ┌──────────────────────────────────┐
  │ [Airline] [Flight #]  [Duration]  │
  │ [Departure] → [Arrival]           │
  │ [Stops / Direct]  [Price]         │
  │ [Seat Availability]               │
  └──────────────────────────────────┘

Font:
  Times:    Semibold (600), 18px, PRIMARY-900
  Route:    Regular (400), 14px, PRIMARY-700
  Metadata: Regular (400), 12px, PRIMARY-600

Padding:   16px (md)
```

**DisruptionCard (Alert / Status Update)**
```
Layout:
  ┌──────────────────────────────────┐
  │ [WARNING/ERROR ICON] [Status Title]
  │ [Impact Description]
  │ [Action Button]
  └──────────────────────────────────┘

Background: ERROR-50 (for cancellations), WARNING-50 (for delays)
Border:     2px solid matching semantic color
Font:
  Title:    Semibold (600), 16px, matching semantic color
  Body:     Regular (400), 14px, PRIMARY-800

Padding:   16px (md)
```

### Form Inputs

**Text Input (Search, Text Fields)**

```
Height:            48px (mobile), 44px (desktop)
Padding:           12px (md-sm) × 16px (md)
Border:            1px solid SURFACE-300
Border Radius:     8px
Background:        BACKGROUND
Font:              Regular (400), 16px, PRIMARY-900
Placeholder Color: PRIMARY-500 with 50% opacity

States:
  Default:         SURFACE-300 border, BACKGROUND bg
  Focused:         PRIMARY-500 border (2px), BACKGROUND bg, no shadow
  Error:           ERROR-500 border, ERROR-50 background
  Disabled:        SURFACE-300 border, SURFACE-200 background
  Filled:          SURFACE-200 background, PRIMARY-700 text

Focus Ring:        None (use border color change instead)
```

**Date Picker**

```
Format:            Mobile native (date input type)
Height:            48px
Font:              Monospace, Regular (400), 16px
Placeholder:       "Select date"
Selected Date:     SECONDARY-500 background, white text
```

**Search Bar (Special Treatment)**

```
Height:            48px
Padding:           12px × 16px
Border:            2px solid PRIMARY-200
Border Radius:     12px (more rounded than standard inputs)
Background:        BACKGROUND with subtle PRIMARY-50 tint
Shadow:            0 2px 8px rgba(15, 76, 143, 0.08)
Icon:              Magnifying glass, PRIMARY-500, 20px, left-aligned

States:
  Focused:         Border becomes PRIMARY-500, shadow increases
  With Text:       Text remains visible, icon dims slightly
  Empty:           Placeholder text visible, icon active
```

The search bar is more prominent than typical inputs because it's primary navigation.

**Passenger Counter (Spinner)**

```
Layout:            [−] [Count] [+]
Height:            44px
Button Size:       40px × 40px
Button Border:     SURFACE-300
Center Field:      Monospace, Regular (400), 16px, centered
Spacing:           4px between buttons and center field

States:
  Button Hover:    SURFACE-200 background
  Button Disabled: SURFACE-300 background, TEXT-300 text
  Min Reached:     − button disabled and grayed
  Max Reached:     + button disabled and grayed
```

### Bottom Sheets

**Half-Height Sheet (Non-Blocking Workflows)**

```
Height:            50% of viewport (mobile)
Border Radius:     20px top-left and top-right
Background:        BACKGROUND
Shadow:            0 -4px 12px rgba(0, 0, 0, 0.1)
Handle:            5px × 40px, SURFACE-300, centered, 12px from top

Content Padding:   16px (md)
Animation:         Slide up 300ms, cubic-bezier(0.4, 0, 0.2, 1)
Scrim:             rgba(0, 0, 0, 0.4), behind sheet
Dismiss:           Swipe down, tap scrim, or back button
```

**Full-Height Sheet (Modal-Like)**

```
Height:            100% of viewport
Border Radius:     20px top-left and top-right
Padding:           16px × 16px (with safe area)
Close Button:      Top-right, PRIMARY-500, 24px icon
Animation:         Slide up 300ms, cubic-bezier(0.4, 0, 0.2, 1)
Scrim:             rgba(0, 0, 0, 0.6), blocks interaction
Dismiss:           Close button, back button (no swipe)
```

### Status Indicators & Badges

**Flight Status Badge (On Time, Delayed, Cancelled, Boarding, Departed, Arrived)**

```
On Time:           GREEN / SUCCESS-600
                   Background: SUCCESS-50, Text: SUCCESS-700
                   Icon: Check circle

Delayed:           AMBER / WARNING-600
                   Background: WARNING-50, Text: WARNING-700
                   Icon: Clock

Cancelled:         RED / ERROR-600
                   Background: ERROR-50, Text: ERROR-700
                   Icon: X circle

Boarding:          BLUE / PRIMARY-600
                   Background: PRIMARY-50, Text: PRIMARY-700
                   Icon: Boarding pass / arrow

Departed:          BLUE / PRIMARY-600
                   Background: PRIMARY-100, Text: PRIMARY-700
                   Icon: Airplane

Arrived:           GREEN / SUCCESS-600
                   Background: SUCCESS-100, Text: SUCCESS-700
                   Icon: Checkmark

Height:            32px
Padding:           4px (vertical) × 12px (horizontal)
Font:              Medium (500), 12px
Border Radius:     16px (fully rounded)
Icon Size:         16px
```

### Navigation

**Bottom Tab Navigation Bar**

```
Height:            64px (including safe area)
Background:        BACKGROUND
Border:            1px top SURFACE-300
Fixed Position:    Bottom of viewport, above safe area
Shadow:            0 -2px 8px rgba(0, 0, 0, 0.06)

Tab Layout:        5 equal-width tabs
Tab Height:        48px (content area)
Icon Size:         24px
Label Font:        Regular (400), 10px
Label Color:       PRIMARY-600 (inactive), PRIMARY-900 (active)
Icon Color:        PRIMARY-600 (inactive), SECONDARY-500 (active)

States:
  Inactive:        Primary-600 text/icon, BACKGROUND bg
  Active:          SECONDARY-500 icon, PRIMARY-900 text, subtle bg
  Badge:           Red circle with white number, top-right of icon
```

### AI Interface (Chat Bubbles & Copilot)

**User Message Bubble**

```
Background:        PRIMARY-500 (oklch(57.5% 0.194 262))
Text:              White
Border Radius:     16px (with 4px indent on bottom-right)
Padding:           12px (md-sm) × 16px (md)
Alignment:         Right-aligned
Max Width:         80% of screen width
Font:              Regular (400), 16px, line-height 1.5
Shadow:            None (floats naturally)
```

**AI Message Bubble**

```
Background:        SURFACE-200 (oklch(94% 0.003 50))
Text:              PRIMARY-900
Border:            1px solid SURFACE-300
Border Radius:     16px (with 4px indent on bottom-left)
Padding:           12px (md-sm) × 16px (md)
Alignment:         Left-aligned
Max Width:         80% of screen width
Font:              Regular (400), 16px, line-height 1.5
Shadow:            None (floats naturally)
```

**Suggestion Chips (Quick Responses)**

```
Background:        PRIMARY-100 (oklch(92% 0.010 262))
Text:              PRIMARY-700
Border:            1px solid PRIMARY-200
Border Radius:     20px (fully rounded)
Padding:           8px (xs) × 12px (md-sm)
Font:              Regular (400), 14px
Spacing:           8px between chips (horizontal wrap)

States:
  Default:         As above
  Tapped:          Background becomes PRIMARY-200, text becomes PRIMARY-900
  Selected:        Background becomes PRIMARY-500, text becomes white
```

**Typing Indicator (Animated Dots)**

```
Three circles:     4px diameter each
Color:             PRIMARY-500
Spacing:           4px between circles
Animation:         Bounce, 800ms duration, infinite loop
Position:          Aligned with AI message left edge
```

---

## 6. Iconography & Illustration (400+ words)

### Icon System: Lucide Icons

AirThere uses **Lucide Icons** (lucide.dev) as the canonical icon set. Lucide is:
- **Modern and Refined:** Clean strokes, 24px grid, consistent visual language
- **Travel-Aware:** Already includes airplane, destination, map, and weather icons
- **Open Source:** No licensing restrictions, full control over styling
- **Accessible:** All icons have semantic meaning and can be labeled

**Icon Specifications:**

```
Size (Default):    24px (standard UI icon)
Size (Small):      16px (inline with text, labels)
Size (Large):      32px (primary CTAs, emphasis)
Size (Hero):       48px (page headers, empty states)

Stroke Width:      2px (consistent Lucide default)
Color:             PRIMARY-600 (neutral), SECONDARY-500 (emphasis),
                   matching semantic colors (success/warning/error)

Responsive:
  Mobile:          24px (default)
  Tablet:          28px (slightly larger for touch)
  Desktop:         32px (larger for pointer interaction)
```

### Custom Icon Requirements

Some travel-specific concepts require custom SVG icons:
- **Gate Indicator** — Gate/terminal icon with number overlay
- **Lounge Badge** — Premium lounge icon (wine glass + door)
- **Biometric** — Face or fingerprint icon (Apple Face ID style)
- **Baggage Counter** — Baggage icon with count overlay
- **Seat Map** — Airplane cabin grid with seat positions
- **Disruption Severity** — 3-level alert system (warning, critical, emergency)

These custom icons should match Lucide's visual language: 2px stroke, 24px grid, filled vs. outline variants.

### Illustration Style for Empty States

**Not:** Generic sad faces, floating clouds, or cheap stock art

**Yes:** Travel-inspired minimalist illustrations that reinforce AirThere's brand:

- **Empty Trip List:** Illustration of a blank calendar with an airplane silhouette
- **No Loyalty Points:** Illustration of an empty wallet with a subtle heart beat
- **No Disruptions:** Illustration of a calm airplane with a clear sky
- **Search No Results:** Illustration of binoculars with a question mark
- **Offline State:** Illustration of an airplane in airplane mode

**Illustration Specifications:**
```
Color Palette:     Use PRIMARY and SECONDARY colors only
Stroke:            2px minimum for visibility
Style:             Minimalist, 2-3 colors per illustration
Line Art vs Fill:  Mix of outlined and filled shapes
Consistency:       All illustrations use 24px grid, 2px strokes
Animation:         Optional subtle animation (2-3 second loop)
Size:              96px - 144px (depending on context)
```

### Map & Wayfinding Style

**Airport Terminal Maps:**
```
Background:        BACKGROUND
Terminal Outline:  PRIMARY-200
Gates:             PRIMARY-400 circles with labels
Current Position:  SECONDARY-500 dot with 8px radius
Directions:        PRIMARY-500 arrow path, 2px stroke
Accessibility:     All areas labeled, colors + patterns (not color-only)
```

**Flight Route Maps:**
```
Background:        SURFACE-200
Continents/Land:   PRIMARY-100
Ocean:             PRIMARY-50
Route Line:        SECONDARY-500, 3px stroke
Origin:            GREEN / SUCCESS-500 circle
Destination:       PRIMARY-500 circle
Stops:             WARNING-500 diamonds
```

---

## 7. Motion & Animation (500+ words)

### Animation Philosophy

Animation in AirThere serves four purposes:
1. **Feedback** — Confirm that the user's action was registered
2. **Transition** — Provide visual continuity as content changes
3. **Affordance** — Signal that an element is interactive or has changed
4. **Delight** — Create moments of human connection (sparingly)

**NOT Used For:**
- Decoration (gratuitous spinning, bouncing, or floating)
- Distraction (auto-playing carousels, perpetual loaders)
- Slowdown (animations that make the UI feel sluggish)

### Timing & Easing Functions

**Duration Scale:**

```
Micro (150ms):     Feedback for user interactions (button press, toggle)
Short (300ms):     Component transitions (sheet open/close, fade in/out)
Normal (500ms):    Screen transitions (page navigation)
Long (800ms):      Major state changes (complex form submission)
Slow (1000ms+):    Celebratory moments (booking confirmed, trip booked)
```

**Easing Functions (CSS cubic-bezier values):**

```
Ease In/Out:       cubic-bezier(0.4, 0, 0.2, 1)
                   Default for most transitions, feels natural

Ease Out (Bounce): cubic-bezier(0.34, 1.56, 0.64, 1)
                   Celebratory moments (booking confirmation)

Ease In (Settle):  cubic-bezier(0.42, 0, 1, 1)
                   Drawer open, sheet slide up

Linear:            cubic-bezier(0, 0, 1, 1)
                   Very rare, only for continuous animations
                   like loaders
```

### Specific Animation Patterns

**Button Press Feedback**

```
When user presses a button:
1. Immediate (0ms):    Scale 100%, opacity 100%
2. Short (150ms):      Scale 98%, opacity 100% (subtle press)
3. Release (150ms):    Scale 100%, opacity 100%, ease out

Easing:  cubic-bezier(0.4, 0, 0.2, 1)
Duration: 150ms total
Effect:  Confirms interaction without distraction
```

**Page/Screen Transitions**

```
Navigate Forward (entering new screen):
- New screen fades in over 300ms from 0.95 opacity to 1
- Previous screen stays in place
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

Navigate Backward (returning to previous screen):
- Previous screen slides in from left over 300ms
- New screen fades out and slides right over 300ms
- Both happen simultaneously
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

**Bottom Sheet Entrance**

```
Initial State:     Sheet is below viewport (translateY: 100%)
On Open:           Slide up 300ms to translateY(0)
                   Scrim fades in simultaneously
Easing:            cubic-bezier(0.4, 0, 0.2, 1)

On Close:          Slide down 250ms to translateY(100%)
                   Scrim fades out simultaneously
Easing:            cubic-bezier(0.4, 0, 0.2, 1)
```

**Loading Skeleton Shimmer**

```
Background Color:  SURFACE-200
Shimmer Width:     100px (full width on mobile)
Shimmer Color:     Gradient: transparent → rgba(255, 255, 255, 0.5) → transparent
Shimmer Duration:  1200ms, infinite loop
Easing:            cubic-bezier(0.4, 0, 0.2, 1)
Direction:         Left to right (simulate light reflection)

Effect:  Subtle pulse that doesn't distract, indicates loading
```

**Disruption Notification Entry (Alert for Delays/Cancellations)**

```
Initial State:     Scale 0.95, opacity 0
Entry (400ms):     Scale 1, opacity 1
                   Slide down slightly simultaneously
                   Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce)

Attention After 2s: Color pulse (brighten → dim) 1 time over 400ms
Exit (300ms):      Scale 0.95, opacity 0
                   Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

**Toggle/Switch Animation**

```
Trigger:           User taps toggle switch
Animation Duration: 200ms
Easing:            cubic-bezier(0.4, 0, 0.2, 1)

Thumb Movement:    Slides from left to right (or vice versa)
Track Color:       Fades from SURFACE-300 to SUCCESS-500 (on)
                   Or fades from SURFACE-300 to SURFACE-300 (off)
```

### Accessibility: Respect Prefers-Reduced-Motion

**Always include:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

For users with vestibular disorders or motion sensitivity, all animations are disabled. The UI still functions perfectly; it just doesn't move.

### Parallax & Scroll Animations: NOT USED

AirThere does not use:
- Parallax scrolling (unreliable on mobile, disorienting)
- Scroll-linked animations (janky performance)
- Autoplay carousels (respects user control)
- Perpetual loaders (use skeleton screens instead)

---

## 8. Elevation & Shadow System (300+ words)

### Shadow Levels

Shadows create depth hierarchy. AirThere uses four levels:

**Level 1 (Subtle) — Cards, Inputs, Subtle Elevation**

```
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04)

Usage: Default cards, form inputs, inactive elements
Effect: Barely perceptible, suggests "floating just above surface"
```

**Level 2 (Moderate) — Hover States, Modals**

```
Box Shadow: 0 4px 8px rgba(0, 0, 0, 0.12),
            0 2px 4px rgba(0, 0, 0, 0.06)

Usage: Button hover states, modal backgrounds, expanded cards
Effect: Clear elevation, "raised above page"
```

**Level 3 (Strong) — Active States, Focused Elements**

```
Box Shadow: 0 8px 16px rgba(0, 0, 0, 0.16),
            0 4px 8px rgba(0, 0, 0, 0.08)

Usage: Active buttons, focused input fields, priority content
Effect: Strong elevation, "lifted and emphasized"
```

**Level 4 (Maximum) — Topmost Elements, Dropdowns**

```
Box Shadow: 0 16px 32px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.1)

Usage: Dropdown menus, modal dialogs, notification toasts
Effect: Maximum elevation, "on top of everything"
```

### Dark Mode Shadow Adaptation

In dark mode, shadows become *less* visible (because the background is already dark). Adjust shadows for dark mode:

```css
.dark {
  /* Reduce shadow opacity */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3),
              0 1px 2px rgba(0, 0, 0, 0.2);
}
```

---

## 9. Responsive Strategy (400+ words)

### Mobile-First Approach

All designs start mobile-first (320px viewport). Desktop variants are enhancements, not regressions.

**Design Breakpoints:**

```
Mobile (320px - 767px):     Single column, full-width cards, large touch targets
Tablet (768px - 1023px):    Two-column grid, larger padding, refined typography
Desktop (1024px - 1279px):  Three-column grid, max-width containers, desktop navigation
Large (1280px+):            Same as desktop, just with more whitespace
```

### Component Adaptation

**Cards:**
- Mobile: Full width (100% - 32px padding), stacked vertically
- Tablet: 2-column grid, 2-column layout for related cards
- Desktop: 3-column grid, side-by-side comparison layout

**Forms:**
- Mobile: Single column, 100% width inputs, large buttons (48px)
- Desktop: Multi-column grid, smaller inputs, standard button heights (44px)

**Navigation:**
- Mobile: Bottom tab bar (persistent, takes 64px)
- Tablet: Bottom tab bar OR side navigation (depending on use case)
- Desktop: Horizontal top navigation OR persistent left sidebar

**Lists:**
- Mobile: Single column, 16px padding, 12px gaps
- Tablet: Two-column, 24px padding
- Desktop: Three+ column grid, 32px padding

### Image & Media Responsive

**Responsive Images:**

```html
<img
  srcset="image-320w.jpg 320w,
          image-768w.jpg 768w,
          image-1024w.jpg 1024w"
  sizes="(max-width: 320px) 320px,
         (max-width: 768px) 768px,
         1024px"
  src="image-1024w.jpg"
  alt="Descriptive alt text"
/>
```

Always provide multiple resolutions to avoid downloading oversized images on mobile.

**Background Images:**

```css
@media (max-width: 767px) {
  .hero { background-image: url('hero-mobile.jpg'); }
}
@media (min-width: 768px) {
  .hero { background-image: url('hero-tablet.jpg'); }
}
@media (min-width: 1024px) {
  .hero { background-image: url('hero-desktop.jpg'); }
}
```

### Safe Area Handling

**On iPhone with Notch/Dynamic Island:**

```css
.main-content {
  padding-top: max(16px, env(safe-area-inset-top));
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

Always use max() with safe-area-inset values to ensure minimum padding even on devices without notches.

---

## 10. Accessibility Design Tokens (400+ words)

### Focus Ring Styling

All interactive elements require visible focus indicators for keyboard navigation.

```
Focus Ring Color:   PRIMARY-500 (oklch(57.5% 0.194 262))
Focus Ring Width:   2px
Focus Ring Offset:  2px (outside element border)
Focus Ring Style:   Solid outline

CSS:
element:focus {
  outline: 2px solid oklch(57.5% 0.194 262);
  outline-offset: 2px;
}
```

Never remove outline without providing an alternative visible focus indicator.

### High Contrast Mode

Windows High Contrast Mode requires specific adjustments:

```css
@media (prefers-contrast: more) {
  /* Increase color contrast to 7:1+ */
  body { color: #000; background: #fff; }

  /* Add visible borders to focus indicators */
  *:focus { border: 2px solid #000; }

  /* Increase touch target sizes */
  button { min-height: 48px; min-width: 48px; }
}
```

### Touch Target Minimums

All interactive elements must be at least 44×44pt (CSS pixels) for touch targets.

```
Button:              48px height, 24px padding (mobile)
Input Field:         48px height
Checkbox/Radio:      24×24px minimum
Link (inline):       At least 44px tall line height
Icon Button:         40×40px minimum
Tab (navigation):    48×48px minimum
```

### Color Contrast Ratios

**WCAG AA Compliance (Minimum):**
- Normal text (14px): 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio
- UI components (borders, icons): 3:1 contrast ratio

**WCAG AAA Compliance (Target):**
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

**Testing:**
Use WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/

Every text + background color combination must be validated.

### Keyboard Navigation

All functionality must be accessible via keyboard:
- Tab: Move focus to next element
- Shift+Tab: Move focus to previous element
- Enter/Space: Activate button or toggle
- Arrow Keys: Navigate lists, tabs, radio button groups
- Escape: Close modals, sheets, dropdowns

### Semantic HTML & ARIA

**Always use semantic elements:**

```html
<!-- GOOD -->
<button>Book Flight</button>
<input type="text" aria-label="Departure City" />
<nav>Navigation</nav>
<section aria-label="Trip Details">...</section>

<!-- BAD -->
<div role="button" onclick="...">Book Flight</div>
<div contenteditable>Enter city</div>
```

**ARIA Labels for Complex Components:**

```html
<div role="dialog" aria-label="Seat Selection" aria-modal="true">
  <h2 id="seat-title">Select Your Seat</h2>
  <div aria-labelledby="seat-title" aria-live="polite">
    <!-- Content -->
  </div>
</div>
```

---

## 11. Anti-Slop Directive (500+ words)

### THE NON-NEGOTIABLE RULE

**Before generating ANY UI code, ANY developer or AI agent must:**

1. **Read design-direction.md (this file) IN FULL**
2. **Read design-tokens.json IN FULL**
3. **Read the matching screen shard file IN FULL**

If you skip this step, your code WILL be slop. You WILL violate the design system. Your code WILL need to be thrown away and rewritten.

This is non-negotiable.

### Specific Anti-Slop Rules

**Color Usage:**
- NEVER use default Shadcn colors without applying AirThere theme
- NEVER use generic placeholder colors (#ccc, #999, #ddd)
- EVERY color must come from the OKLCH palette defined above
- If you need a color, check design-tokens.json first
- If it's not there, the design is incomplete and must be reviewed

**Button Styling:**
- NEVER make a button without following the specifications above
- NEVER use border-radius that differs from 8px (or 20px for badges)
- NEVER use text-only buttons without border-radius adjustments
- NEVER create buttons without proper state variants (hover, active, disabled)

**Form Inputs:**
- NEVER use an input without a label (invisible or visible)
- NEVER make an input smaller than 48px height on mobile
- NEVER skip error state styling
- NEVER use red alone for error indication (also use icon, text, or pattern)

**Typography:**
- NEVER use font sizes not on the type scale
- NEVER use line-heights not specified above
- NEVER use font weights outside (400, 500, 600, 700)
- NEVER use custom fonts (system stack only)

**Spacing:**
- NEVER use spacing values that aren't multiples of 4px
- NEVER manually set margins/padding without referencing the spacing scale
- NEVER create inconsistent gaps between components
- NEVER assume padding from Shadcn defaults — override explicitly

**Dark Mode:**
- NEVER assume light mode works in dark mode
- NEVER use static colors that look bad in dark mode
- EVERY color value must be tested in both light and dark modes
- NEVER use opacity as the only dark mode solution

**Component Props:**
- NEVER render a Shadcn component without typing all props
- NEVER omit optional props that affect accessibility (aria-label, role, etc.)
- NEVER create prop interfaces that aren't exported
- NEVER hardcode data — use component props instead

**Data Presentation:**
- NEVER use Lorem Ipsum as placeholder content
- Use REALISTIC travel data: flight numbers, route codes, actual prices, real times
- If the mockData doesn't exist, create it in the same file
- NEVER show time without timezone context
- NEVER show prices without currency

**Responsive Design:**
- NEVER design desktop-first then try to mobile afterward
- Start with the 320px mobile design, enhance for larger screens
- NEVER hide critical information at mobile breakpoints
- NEVER assume touch targets are larger on desktop

**Accessibility:**
- NEVER render a component without testing keyboard navigation
- NEVER use color alone to convey information
- NEVER set focus-visible: none without replacing with custom focus ring
- NEVER skip alt text on images
- NEVER create a form without proper label associations

### Build Checklist (Every Component)

Before committing code:

```
□ All colors from OKLCH palette in design-tokens.json
□ All typography follows type scale (sizes, weights, line-heights)
□ All spacing is multiple of 4px
□ All buttons match button specification (height, padding, border-radius)
□ All inputs are 48px minimum height on mobile
□ All form labels are properly associated
□ Dark mode tested and working
□ Keyboard navigation tested (Tab, Shift+Tab, Enter, Arrow keys)
□ Touch targets minimum 44×44pt
□ Color contrast >4.5:1 for body text
□ Focus ring visible and styled correctly
□ No placeholder grays (#ccc, #ddd)
□ No Lorem Ipsum content
□ All data is realistic travel content
□ All props typed with interfaces
□ Component exported and documented
□ Responsive design tested at 320px, 768px, 1024px
```

If ANY checkbox is unchecked, the code is incomplete. Do not commit.

### The Slop That Gets You Fired

**Unforgivable Sins:**
1. Using default Shadcn blue without theme override
2. Hardcoding colors (#4b5563, #e5e7eb, etc.) instead of using tokens
3. Form inputs smaller than 48px on mobile
4. Missing focus indicators or visible outlines
5. Using "skeleton" loading state without actual animation
6. Buttons without proper hover/active/disabled states
7. Dark mode that looks like it was added as an afterthought
8. Lorem Ipsum or placeholder text in production builds
9. Components that break at 320px or 1920px
10. Cards with no shadow or border differentiation from background

If you create any of these, expect code review to reject it immediately.

---

## 12. Summary: Design System as Sacred Contract

This design direction is the contract between design and engineering. It is not negotiable, not flexible, and not optional.

- **For Designers:** This is the source of truth. Reference it in design critiques. Hold developers accountable to it.
- **For Developers:** This is your specification. Follow it exactly. If something is unclear, ask for clarification before building.
- **For Product Managers:** This is the baseline for quality. Any screen that violates this system is incomplete and should not ship.

Every pixel, every color, every animation has been intentionally chosen to embody the AirThere brand: Anticipatory Calm. Premium yet accessible. Sophisticated yet warm. Technology felt, never seen.

Build to this standard. Build to this vision. Build excellence.

---

**Last Updated:** 2026-03-29
**Authored for:** AirThere Product Design Pipeline, Step 7.5
**Authority Level:** SUPERSEDES all earlier design specifications
**Implementation Target:** Next.js 14 + Tailwind CSS v4 + Shadcn UI

---

**END OF design-direction.md**
