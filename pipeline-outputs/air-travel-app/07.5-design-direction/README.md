# AirThere — UI Design Direction Package
## Pipeline Step 7.5 of 10 | 2026-03-29

---

## Overview

This directory contains the **AUTHORITATIVE** design direction and token system for AirThere, superseding all earlier design specifications. These files define the complete visual identity, color system, typography, spacing, and component styling for the Next.js 14 + Tailwind CSS v4 + Shadcn UI tech stack.

---

## Files Included

### 1. **design-direction.md** (1,575 lines)
The comprehensive design philosophy and specification document covering:

- **Design Philosophy** — The "Anticipatory Calm" north star, visual inspiration (Apple, Singapore Airlines, Airbnb), and anti-patterns to avoid
- **Color System** — OKLCH color space with 10-shade palettes for primary (deep twilight blue), secondary (warm amber), success, warning, error, and info colors, plus dark mode variants
- **Typography** — Font families, size scales, weights (regular, medium, semibold, bold), line heights, and letter spacing with specific styles for all text types
- **Spacing & Layout** — 4px base unit grid, container margins, section spacing, component padding, and safe area handling
- **Component Specifications** — Detailed styling for buttons (primary, secondary, ghost), cards (standard, trip, flight, disruption variants), forms, inputs, bottom sheets, navigation, AI chat, status indicators
- **Iconography & Illustration** — Lucide icons system, custom icon requirements, empty state illustrations, and map styles
- **Motion & Animation** — Animation timing scale (micro to slow), easing functions, specific patterns for buttons, transitions, sheets, loading, and disruptions
- **Elevation & Shadows** — Four shadow levels with specific RGBA values for light and dark modes
- **Responsive Strategy** — Mobile-first approach with breakpoints at 320px, 768px, 1024px, and 1280px
- **Accessibility Design Tokens** — Focus ring styling, high contrast mode, touch targets (44×44px minimum), and color contrast ratios (4.5:1 for body text)
- **Anti-Slop Directive** — Non-negotiable rules for developers enforcing design system compliance with detailed checklist

### 2. **design-tokens.json** (221 lines)
Complete JSON representation of all design tokens:

- **Color Palettes** — All primary, secondary, success, warning, error, info, and surface colors in OKLCH and hexadecimal formats
- **Typography** — Font families, font sizes (with mobile/desktop variants), font weights, line heights, letter spacing
- **Spacing** — Complete spacing scale from 0 to 96px in 4px increments
- **Border Radius** — Values from none to full (9999px)
- **Shadows** — Light and dark mode shadow definitions
- **Animation** — Duration scale and easing functions
- **Breakpoints** — Responsive design breakpoints from mobile to desktop XL
- **Component-Specific Tokens** — Button and contrast ratio specifications

### 3. **tailwind-theme.css** (454 lines)
Tailwind CSS v4 theme configuration:

- **@theme Declaration** — All design tokens as CSS custom properties (primary, secondary, semantic colors, typography, spacing, border radius, shadows, animation, breakpoints)
- **Dark Mode Overrides** — @media (prefers-color-scheme: dark) rules for color adaptation
- **Utility Classes** — Pre-defined component styles (.btn-base, .btn-primary, .btn-secondary, .btn-ghost, .card, .input, .badge, .focus-ring)
- **Accessibility Rules** — Reduced motion support with @media (prefers-reduced-motion: reduce)

**Implementation:** Import this file in your Tailwind configuration or add to global CSS before other styles.

### 4. **shadcn-theme.css** (564 lines)
Shadcn UI component theme overrides:

- **Base Color Variables** — Light mode CSS variables for background, foreground, primary, secondary, destructive, muted, accent, popover, card, input, ring, border, and semantic colors (success, warning, error, info)
- **Dark Mode Overrides** — .dark class with adjusted lightness values for all colors
- **Component Styles** — Utility classes for buttons, cards, forms, dialogs, sheets, badges, alerts, separators, tabs, and skeletons
- **Travel-Specific Components** — Flight status badge styles (.flight-status-on-time, -delayed, -cancelled, etc.), trip cards, disruption alerts, button groups
- **Accessibility** — High contrast mode support and reduced motion compliance

**Implementation:** Import this file in your global CSS after Shadcn's base CSS.

---

## Key Design Decisions

### Color System: OKLCH (Not sRGB)
- **Why:** Perceptual uniformity. Two colors with the same OKLCH lightness value appear equally bright to human perception, ensuring accurate color contrast ratios and consistent visual weight across the entire palette.
- **Impact:** Accessibility compliance is built in, not added later. Dark mode color swaps are mathematically predictable and elegant.

### Primary Color: Deep Twilight Blue
- **oklch(57.5% 0.194 262)** — Not airline blue (#003580), which is beaten to death by 200+ airlines
- **Feeling:** Sophisticated, calm, travel-inspired (the moment day becomes night at 35,000 feet)
- **Contrast:** Provides excellent accessibility while maintaining premium aesthetic

### Secondary Color: Warm Amber
- **oklch(64% 0.158 50)** — Used exclusively for primary CTAs and highlights
- **Feeling:** Energetic, warm, arrival (the golden hour when travelers see their destination)
- **Impact:** Creates visual hierarchy; one warm accent per screen

### Typography: System Stack Only
- **No web fonts** — Faster loading, better rendering on all devices
- **Platform native:** San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android)
- **Monospace for precision:** Flight numbers, confirmation codes, prices feel "exact" via Courier

### Spacing: 4px Grid
- **Mathematical harmony** — All margins, padding, gaps are multiples of 4px
- **Predictability** — Developers never have to calculate arbitrary spacing
- **Responsive consistency** — Same scale across all breakpoints

### Components: Shadcn UI + Custom Themes
- **Buttons:** Three variants (primary warmth, secondary depth, ghost minimal)
- **Cards:** Multiple specialized types (TripCard, FlightCard, DisruptionCard)
- **Forms:** 48px minimum height on mobile (touch accessibility)
- **Modals:** Always modal-like (full height, focus trap)
- **Sheets:** Half-height for quick actions, full-height for complex flows

### Animation: Purposeful, Not Decorative
- **Micro (150ms):** Button press feedback
- **Short (300ms):** Component transitions (sheets, modals)
- **Normal (500ms):** Screen transitions
- **Never:** Parallax, auto-play carousels, perpetual loaders

### Dark Mode: Inverted, Not Afterthought
- **How:** OKLCH lightness values are mathematically inverted (98% → 12%, etc.)
- **Maintained:** Hue and chroma stay the same, colors remain family
- **Reduced opacity:** Shadows become darker in dark mode for OLED efficiency

---

## Implementation Instructions

### For Next.js 14 + Tailwind CSS v4

1. **Add tailwind-theme.css to your global styles:**
   ```css
   @import './07.5-design-direction/tailwind-theme.css';
   ```

2. **Configure Tailwind in tailwind.config.ts:**
   ```typescript
   import type { Config } from "tailwindcss"
   
   export default {
     content: [
       "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
       "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
       extend: {
         colors: {
           primary: {
             50: 'oklch(97% 0.002 262)',
             500: 'oklch(57.5% 0.194 262)',
             // ... all other colors from design-tokens.json
           },
         },
       },
     },
   } satisfies Config
   ```

3. **Add shadcn-theme.css to your global styles:**
   ```css
   @import './07.5-design-direction/shadcn-theme.css';
   ```

4. **Initialize Shadcn UI components:**
   ```bash
   npx shadcn-ui@latest init
   ```
   Choose:
   - Style: New York (or your preference)
   - Base color: Skip (we're overriding with AirThere theme)
   - CSS variables: Yes

### For Component Development

**CRITICAL:** Before writing ANY component code:

1. **Read design-direction.md in full** — Understand the philosophy, color system, typography, spacing
2. **Reference design-tokens.json** — Copy exact OKLCH values and hex codes
3. **Use tailwind-theme.css utilities** — Tailwind classes already styled (e.g., `className="btn-primary"`)
4. **Override Shadcn defaults** — shadcn-theme.css provides AirThere styling

**Never:**
- Use default Shadcn colors without applying AirThere theme
- Hardcode colors (#ccc, #ddd, #999) — use design tokens
- Make buttons smaller than 48px on mobile
- Skip dark mode testing
- Use Lorem Ipsum for placeholder content

---

## Design System Governance

### Authority & Updates
- **design-direction.md** is the AUTHORITATIVE source of truth
- **design-tokens.json** is the data representation
- **CSS files** are implementation layers

If there's a conflict between design direction and CSS, the design direction is correct. Update CSS to match.

### Changes & Versioning
- Any change to colors, typography, or spacing requires updating ALL FOUR FILES
- Version updates via git commit messages
- Breaking changes require stakeholder review

### Quality Bar
- **Accessibility:** WCAG 2.1 AA minimum (target AAA)
- **Performance:** Core Web Vitals green on all screens
- **Responsive:** Tested at 320px, 768px, 1024px, 1920px
- **Dark Mode:** Pixel-perfect in both light and dark

---

## Support & Questions

If a screen violates these specifications:
1. Check design-direction.md Section 11 (Anti-Slop Directive)
2. Verify all colors are from OKLCH palette
3. Ensure spacing is multiple of 4px
4. Test dark mode
5. Check keyboard navigation
6. Validate color contrast (4.5:1 for body text)

If specifications are ambiguous:
- Reference the inspirational UI patterns (UI example 1.png, 2.png, 3.png)
- Check the design system rationale in Section 1 (Design Philosophy)
- Reach out to design team for clarification before building

---

## Deliverables Checklist

- [x] design-direction.md — 1,575 lines, 5,000+ words of comprehensive design philosophy and specifications
- [x] design-tokens.json — Complete JSON token system with OKLCH and hex values
- [x] tailwind-theme.css — Tailwind CSS v4 theme with all color, typography, spacing, shadow, animation tokens
- [x] shadcn-theme.css — Shadcn UI component overrides with light/dark mode support and accessibility features
- [x] All files validated for syntax, completeness, and consistency
- [x] Dark mode implemented and tested
- [x] WCAG 2.1 AA accessibility built in
- [x] Anti-slop directive enforced
- [x] Component specifications detailed
- [x] Implementation instructions provided

---

**Status:** COMPLETE ✓

**Date:** 2026-03-29

**Next Step:** Design shard 01-onboarding-shard.md implementation using this design direction as the authoritative specification.

