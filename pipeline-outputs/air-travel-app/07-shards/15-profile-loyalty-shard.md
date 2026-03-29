# Profile & Loyalty — Build Shard
## AirThere | Screen SCR-015 | Shard 15

### 1. Screen Overview

**Purpose:** User identity, frequent flyer program management, loyalty points tracking, and profile preferences. Serves as the unified hub for personal information, loyalty account integration (across 15+ frequent flyer programs), points balance visibility, elite status tracking, and preference management (dietary, accessibility, communication).

**Role in Journey:** Persistent profile accessible from bottom tab bar. Enables traveler identity consistency (one biometric identity carries across all moments), frequent flyer account linking and optimization, loyalty visibility with automated earnings tracking, and preference persistence.

**Entry Points:**
- Bottom tab bar "Profile" tap
- Settings navigation from any screen
- Biometric enrollment flow (first-time setup)

**Exit Points:**
- Settings → SCR-017 (Settings & Preferences)
- Loyalty details → drill-down to program-specific screens
- Edit profile → modal form

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/profile/page.tsx
(main)/profile/[section]/page.tsx (loyalty programs, edit details, etc.)
```

**File Structure:**
```
src/
├── app/
│   └── (main)/
│       └── profile/
│           ├── page.tsx (SCR-015 — main profile)
│           ├── [section]/
│           │   ├── loyalty/page.tsx (loyalty detail view)
│           │   └── edit/page.tsx (edit profile form)
│           └── layout.tsx
├── components/
│   ├── profile/
│   │   ├── ProfileHeader.tsx (user identity, avatar, status)
│   │   ├── LoyaltyOverview.tsx (aggregate points across programs)
│   │   ├── FrequentFlyerPrograms.tsx (linked accounts)
│   │   ├── EliteStatusCard.tsx (tier, benefits, expiration)
│   │   ├── PreferencesQuickAccess.tsx (dietary, accessibility, communication)
│   │   ├── BiometricEnrollment.tsx (face/fingerprint setup)
│   │   ├── TravelDocuments.tsx (passport, visa, insurance)
│   │   └── AccountSettings.tsx (email, phone, password)
│   └── shared/
│       └── Avatar.tsx
└── lib/
    └── mock-data/
        └── profileData.ts
```

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-001 (Onboarding / Welcome) — Initial profile creation
- SCR-008 (Trip Dashboard) — Travel history context

**Shared components:**
- Card, Button, Badge, Avatar
- Modal (edit profile, biometric enrollment)
- BottomSheet (account settings, loyalty program details)

---

### 4. Component Hierarchy

```
ProfileScreen (page container)
├── ContextualHeader
│   ├── "Your Profile"
│   └── [Settings] [Help]
│
├── ProfileHeader
│   ├── Avatar (user photo or initials)
│   ├── Name
│   ├── Status (elite tier with badge)
│   ├── Biometric Status (Face ID, Fingerprint enrolled)
│   └── [Edit Profile] [Manage Documents]
│
├── LoyaltyOverview
│   ├── Total Points/Miles Aggregate
│   │   ├── "127,450 miles across your accounts"
│   │   ├── Visual progress bar (toward next tier)
│   │   └── "3,550 miles to Gold Elite status"
│   └── [View Detailed Loyalty]
│
├── FrequentFlyerPrograms
│   ├── Program Cards (5-10 most active)
│   │   ├── Airline Logo & Name
│   │   ├── Account #
│   │   ├── Balance (miles/points)
│   │   ├── Elite Status (if applicable)
│   │   ├── Last Activity (6 months ago)
│   │   └── [View Details]
│   ├── [Add Program]
│   └── "11 total programs linked"
│
├── EliteStatusCard (if applicable)
│   ├── "Your Current Status"
│   ├── Tier (Gold Elite, Platinum, etc.)
│   ├── Benefits (baggage waiver, lounge access, upgrades)
│   ├── Status Expiration (Mar 31, 2027)
│   ├── Progress to next tier
│   │   ├── "4 qualified flights completed"
│   │   ├── "1 more flight needed for Platinum"
│   │   └── Progress bar
│   └── [Status Protection Options]
│
├── PreferencesQuickAccess
│   ├── Dietary Preferences (Vegetarian, Gluten-Free)
│   ├── Accessibility Needs (mobility, hearing, visual)
│   ├── Communication Preference (email, SMS, push)
│   ├── Language
│   └── [Full Preferences] → SCR-017
│
├── TravelDocuments
│   ├── Passport Status (valid/expiring)
│   │   ├── "Expires: May 15, 2034 ✓ Valid"
│   ├── Visa Status (if applicable)
│   ├── Travel Insurance
│   ├── Medical Information
│   └── [Manage Documents] → SCR-014 (Document Vault)
│
├── BiometricStatus
│   ├── Face ID (Enrolled ✓ | Not Enrolled)
│   ├── Fingerprint (Enrolled ✓ | Not Enrolled)
│   ├── Explanation: "Faster airport check-in and boarding"
│   └── [Setup Biometric] (if not enrolled)
│
└── AccountSettings
    ├── Email
    ├── Phone
    ├── Password (Last changed X days ago)
    ├── Two-Factor Authentication (Enabled ✓)
    └── [Change Settings] → Modal
```

---

### 5. Component Specifications

#### 5.1 ProfileHeader

**TypeScript Interface:**
```typescript
interface ProfileHeaderProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    biometric: {
      faceIdEnrolled: boolean;
      fingerprintEnrolled: boolean;
    };
  };
  loyalty: {
    eliteTier: string;
    pointsBalance: number;
  };
  onEdit: () => void;
  onManageDocuments: () => void;
}
```

**Shadcn UI Base:** Card, Button, Avatar, Badge

**Tailwind Classes:**
```
- Container: bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6 md:p-8
- Avatar: w-16 h-16 rounded-full
- Name: text-2xl font-bold
- Status Badge: bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold
- Biometric Icons: text-sm opacity-80
```

---

### 6. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ Your Profile | [⚙️]           │ Header
├──────────────────────────────┤
│ [Avatar] John Doe             │ Profile Header
│          Gold Elite ⭐        │
│ john@example.com              │
│ Face ID ✓ | Fingerprint ✓     │
│ [Edit Profile] [Documents]    │
├──────────────────────────────┤
│ Loyalty Points                │ Loyalty Overview
│ 127,450 miles                 │
│ ███████░ 3,550 to Platinum    │
│ [View Detailed Loyalty]       │
├──────────────────────────────┤
│ Frequent Flyer Programs       │ FFP Cards
│ 11 total linked               │
│                               │
│ United MileagePlus            │
│ 48,500 miles | Gold status    │
│ [View]                        │
│                               │
│ American AAdvantage           │
│ 32,200 miles | Silver status  │
│ [View]                        │
│                               │
│ [Add Program]                 │
├──────────────────────────────┤
│ Your Benefits                 │
│ Gold Elite Status             │
│ ✓ Free checked baggage        │
│ ✓ Lounge access              │
│ ✓ 25% bonus miles            │
│ Expires: Mar 31, 2027         │
│ 4/5 flights to Platinum       │
│ [Status Protection]           │
├──────────────────────────────┤
│ Quick Preferences             │
│ Dietary: Vegetarian           │
│ Accessibility: Mobility       │
│ Language: English             │
│ [Full Preferences]            │
├──────────────────────────────┤
│ Travel Documents              │
│ 📕 Passport: Valid (May 2034) │
│ 🎫 Visa: Not needed           │
│ 🏥 Insurance: Active          │
│ [Manage]                      │
├──────────────────────────────┤
│ Account Security              │
│ Email: john@example.com       │
│ Phone: +1 (555) 123-4567      │
│ Password: Changed 30d ago ✓   │
│ 2FA: Enabled ✓                │
│ [Change Settings]             │
│                               │
└──────────────────────────────┘
```

---

### 7. Interaction Patterns

- **Tap Edit Profile:** Modal form with name, email, phone, photo
- **Tap Frequent Flyer Program Card:** Navigate to program-specific detail (account #, recent activity, benefits)
- **Tap View Detailed Loyalty:** Bottom sheet with all loyalty programs, redemption options
- **Tap Setup Biometric:** Biometric enrollment flow (camera access, face/fingerprint capture)
- **Tap Full Preferences:** Navigate to SCR-017 (Settings & Preferences)

---

### 8. State Management

**Local Component State:**
```typescript
const [user, setUser] = useState<User>(initialUserData);
const [showEditModal, setShowEditModal] = useState(false);
const [showBiometricEnrollment, setShowBiometricEnrollment] = useState(false);
```

**Global State:**
- AuthContext (user identity)
- LoyaltyContext (points balance, program accounts)
- PreferencesContext (dietary, accessibility, communication)

---

### 9. Data Requirements & Mock Data

**Mock Profile Data:**
```typescript
export const mockProfileData = {
  user: {
    id: 'USR001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/avatars/john-doe.png',
    biometric: {
      faceIdEnrolled: true,
      fingerprintEnrolled: true,
    },
  },
  loyalty: {
    eliteTier: 'Gold',
    pointsBalance: 127450,
    programsLinked: 11,
    programs: [
      {
        id: 'UMP001',
        airline: 'United',
        accountNumber: 'A1234567',
        balance: 48500,
        eliteStatus: 'Gold',
        lastActivity: '2026-02-15',
      },
      // ... more programs
    ],
  },
  documents: {
    passport: {
      expiryDate: '2034-05-15',
      status: 'valid',
    },
    visas: [],
    insurance: { status: 'active' },
  },
  preferences: {
    dietary: 'vegetarian',
    accessibility: ['mobility'],
    communication: ['email', 'push'],
    language: 'English',
  },
};
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Alexandra)
- **Elite Status:** Prominently displayed with premium benefits
- **Loyalty:** Aggregate miles shown, multiple premium programs linked
- **Documents:** Privacy emphasized (encrypted, biometric access only)
- **Preferences:** Luxury dining options, premium lounge preferences

#### PERSONA-02 (Marcus)
- **Loyalty:** Program accounts optimized for mileage accrual across different airlines
- **Elite Status:** Business class upgrades highlighted
- **Documents:** Corporate credit card info + expense tracking
- **Preferences:** Policy compliance visibility, calendar integration

#### PERSONA-03 (Chen Family)
- **Loyalty:** Family account linkage (primary + spouse + children)
- **Elite Status:** Family travel benefits (baggage for entire family)
- **Documents:** All family members' passports, visas, insurance
- **Preferences:** Child-friendly meal options, family seating preferences

---

### 11. Accessibility Requirements

**ARIA:**
```typescript
<main role="main" aria-label="User profile">
  <section aria-label="Profile information">
    {/* User details */}
  </section>
  <section aria-label="Loyalty accounts">
    {/* Loyalty programs */}
  </section>
</main>
```

**Focus Management:**
- Initial focus on profile section
- Tab through: Profile → Loyalty Overview → Programs → Status → Preferences → Documents → Account

**Keyboard:**
- Tab/Shift+Tab: Navigate sections
- Enter/Space: Edit profile, add program, setup biometric
- Arrow keys: Navigate loyalty program list

**Screen Reader:**
- "John Doe, Gold Elite status"
- "127,450 miles across 11 frequent flyer accounts"
- "United MileagePlus: 48,500 miles, Gold status, last activity February 15, 2026"

---

### 12. Loading, Error & Empty States

**Loading:** Skeleton showing profile structure
**Error:** "Unable to load profile data" with retry
**Empty FFP:** "No frequent flyer programs linked. [Add your first program]"
**Empty Documents:** "No travel documents uploaded. [Upload now]"

---

### 13. Edge Cases & Error Handling

- **Multiple user profiles:** Show account switcher
- **Loyalty points not yet posted:** Show "Posting in 24-48 hours"
- **Elite status expiring soon:** Show warning banner
- **Biometric enrollment failure:** Fallback to manual authentication
- **Document upload failure:** Show retry option

---

### 14. Testing Requirements

- Profile rendering with user data
- Loyalty points calculations and aggregation
- Frequent flyer program CRUD operations
- Biometric enrollment flow
- Edit profile functionality
- Document upload and storage
- Preference persistence
- Persona-specific content variations
- Accessibility compliance

---

### 15. Build Checklist

- [ ] Route created: `(main)/profile/page.tsx`
- [ ] ProfileHeader component with avatar and status
- [ ] LoyaltyOverview component with aggregate points
- [ ] FrequentFlyerPrograms component with program cards
- [ ] EliteStatusCard component with benefits
- [ ] PreferencesQuickAccess component
- [ ] BiometricStatus component with enrollment
- [ ] TravelDocuments component with storage links
- [ ] AccountSettings component with form
- [ ] Edit profile modal
- [ ] Add frequent flyer program flow
- [ ] Biometric enrollment flow
- [ ] Mock data connected
- [ ] Persona adaptations applied
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-015 (Profile & Loyalty) serves as the user identity and loyalty hub, unifying personal information, frequent flyer program management, and preference persistence across the travel journey. By integrating biometric identity, showing aggregate loyalty points, tracking elite status, and displaying travel documents, AirThere creates a single source of truth for traveler identity. Persona-specific adaptations ensure Alexandra sees premium benefits and privacy controls, Marcus gets expense tracking and policy compliance visibility, and the Chen family sees family-inclusive accounts and documentation.

