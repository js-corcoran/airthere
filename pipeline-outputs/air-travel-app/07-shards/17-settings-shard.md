# Settings & Preferences — Build Shard
## AirThere | Screen SCR-017 | Shard 17

### 1. Screen Overview

**Purpose:** Comprehensive preferences management including dietary accommodations, accessibility needs, communication preferences, notification settings, privacy controls, and feature toggles. Enables one-time preference setup that cascades across all journey phases.

**Role in Journey:** Accessible from Profile (SCR-015) or Settings navigation. Ensures that preferences set once are honored everywhere (Principle 5: Journey Continuity — zero repetition).

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/profile/settings/page.tsx
(main)/settings/[category]/page.tsx
```

---

### 3. Component Hierarchy

```
SettingsScreen (page container)
├── SettingsHeader ("Preferences & Settings")
├── PreferenceCategories (tabs or expandable sections)
│   ├── Travel Preferences
│   │   ├── Dietary: [Vegetarian] [Gluten-Free] [Vegan] [Kosher] [Halal]
│   │   ├── Meal Preferences: [Aisle breakfast] [Window lounge]
│   │   ├── Seat Preferences: [Window] [Aisle] [Extra legroom]
│   │   ├── Cabin Class Preference: [Economy] [Premium Economy] [Business] [First]
│   │   └── Airline Preferences: [Preferred airlines] [Airline avoidance]
│   │
│   ├── Accessibility Needs
│   │   ├── Mobility: [Wheelchair access] [Reduced mobility] [Assistance needed]
│   │   ├── Hearing: [Hearing aid] [Prefer visual alerts]
│   │   ├── Vision: [Large text] [High contrast] [Screen reader]
│   │   ├── Cognitive: [Simple language] [Extra time for decisions]
│   │   └── Service Animals: [Service dog] [Details]
│   │
│   ├── Communication Preferences
│   │   ├── Notification Channels: [Email] [SMS] [Push] [In-app]
│   │   ├── Frequency: [Real-time] [Daily digest] [Only critical]
│   │   ├── Contact Methods: [Preferred phone] [Preferred email]
│   │   ├── Language: [English] [Spanish] [Mandarin]
│   │   └── Time Zone Offset: [Automatic] [Manual]
│   │
│   ├── Privacy & Data
│   │   ├── Data Sharing: [Opt-in] [Minimal] [Analytics only]
│   │   ├── Personalization: [Full ML] [Limited] [None]
│   │   ├── Marketing: [Opt-in] [Opt-out]
│   │   ├── Cookie Consent: [All] [Essential only]
│   │   └── Data Download: [Request copy of data] [Delete all data]
│   │
│   ├── Notification Settings
│   │   ├── Pre-Trip: [5 days before] [1 day] [None]
│   │   ├── Check-in Reminders: [24h before] [2h before] [None]
│   │   ├── Gate Changes: [Instant] [Summary]
│   │   ├── Disruptions: [All] [Major only] [None]
│   │   ├── Loyalty Updates: [All] [Milestones only] [None]
│   │   └── Do Not Disturb: [Set quiet hours]
│   │
│   ├── Feature Toggles
│   │   ├── AI Copilot: [Enabled] [Disabled]
│   │   ├── Automatic Rebooking: [Enabled] [Manual approval]
│   │   ├── Biometric Login: [Enabled] [Password only]
│   │   ├── Voice Commands: [Enabled] [Disabled]
│   │   └── Offline Mode: [Download for offline]
│   │
│   └── About & Support
│       ├── App Version
│       ├── [Terms of Service]
│       ├── [Privacy Policy]
│       ├── [Contact Support]
│       ├── [Send Feedback]
│       └── [Delete Account]
│
└── Save/Cancel Buttons (sticky at bottom)
    ├── [Save Changes]
    └── [Cancel]
```

---

### 4. Component Specifications

#### 4.1 PreferenceCategory

**TypeScript Interface:**
```typescript
interface PreferenceCategory {
  id: string;
  title: string;
  preferences: Array<{
    key: string;
    label: string;
    type: 'checkbox' | 'radio' | 'select' | 'multi-select' | 'text' | 'toggle';
    value: any;
    options?: Array<{ label: string; value: any }>;
    description?: string;
    required?: boolean;
  }>;
}

interface PreferencesState {
  travel: {
    dietary: string[];
    seatPreference: string;
    cabinClass: string;
    airlinePreferences: string[];
  };
  accessibility: {
    mobility: boolean;
    hearing: boolean;
    vision: boolean;
    cognitive: boolean;
    serviceAnimals: boolean;
  };
  communication: {
    channels: string[]; // email, sms, push
    frequency: 'realtime' | 'daily' | 'critical';
    language: string;
    timeZone: string;
  };
  privacy: {
    dataSharing: 'full' | 'minimal' | 'none';
    personalization: 'full' | 'limited' | 'none';
    marketing: boolean;
  };
  notifications: {
    preTrip: number; // days before
    checkIn: number; // hours before
    gateChanges: boolean;
    disruptions: boolean;
    loyaltyUpdates: boolean;
  };
  features: {
    aiCopilot: boolean;
    automaticRebooking: boolean;
    biometricLogin: boolean;
    voiceCommands: boolean;
    offlineMode: boolean;
  };
}
```

**Shadcn UI Base:** Card, Switch, Radio, Checkbox, Select, Button

**Tailwind Classes:**
```
- Section: bg-white dark:bg-neutral-900 rounded-lg p-6 mb-4 border border-neutral-200 dark:border-neutral-700
- Section Title: text-lg font-semibold mb-4
- Preference Item: flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0
- Label: text-sm font-medium
- Description: text-xs text-neutral-600 dark:text-neutral-400 mt-1
- Control: flex gap-2
- Save Button: bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold
```

---

### 5. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ ← Preferences & Settings     │ Header
├──────────────────────────────┤
│ TRAVEL PREFERENCES           │ Section
│                              │
│ Dietary Restrictions         │
│ [✓] Vegetarian [□] Vegan     │
│ [✓] Gluten-Free [□] Kosher   │
│ [□] Halal [□] None specified │
│                              │
│ Meal Preferences             │
│ Early breakfast [toggle on]  │
│ Aisle seat preference        │
│ [toggle off]                 │
│                              │
│ Seat Preference              │
│ ◉ Window ○ Aisle             │
│ ◉ Regular ○ Extra legroom    │
│                              │
│ Preferred Cabin              │
│ ○ Economy ◉ Premium Econ     │
│ ○ Business ○ First           │
│                              │
│ Preferred Airlines           │
│ [United] [American] [Delta]  │
│ [Tap to add/remove]          │
│                              │
├──────────────────────────────┤
│ ACCESSIBILITY NEEDS          │
│                              │
│ Mobility Assistance          │
│ [toggle off]                 │
│                              │
│ Hearing Accommodations       │
│ [toggle off]                 │
│                              │
│ Vision Accommodations        │
│ [toggle on] Large text       │
│ [toggle off] High contrast   │
│                              │
│ Service Animal               │
│ [toggle off]                 │
│                              │
├──────────────────────────────┤
│ COMMUNICATION                │
│                              │
│ Preferred Channels           │
│ [✓] Email  [✓] Push          │
│ [✓] SMS    [□] In-app        │
│                              │
│ Notification Frequency       │
│ ◉ Real-time ○ Daily digest   │
│ ○ Critical only              │
│                              │
│ Language                     │
│ [English ▼]                  │
│                              │
│ Time Zone                    │
│ [America/Los_Angeles ▼]      │
│                              │
├──────────────────────────────┤
│ PRIVACY & DATA               │
│                              │
│ Data Sharing                 │
│ ○ Full  ◉ Minimal  ○ None    │
│                              │
│ Personalization              │
│ ◉ Full  ○ Limited  ○ None    │
│                              │
│ Marketing Communications     │
│ [toggle off]                 │
│                              │
│ [Download My Data]           │
│ [Delete All Data]            │
│                              │
├──────────────────────────────┤
│ NOTIFICATIONS                │
│                              │
│ Pre-Trip Reminders           │
│ [5 days before ▼]            │
│                              │
│ Check-In Reminders           │
│ [24h before ▼]               │
│                              │
│ Gate Changes                 │
│ [toggle on]                  │
│                              │
│ Disruptions                  │
│ [toggle on]                  │
│                              │
│ Loyalty Updates              │
│ [toggle on]                  │
│                              │
│ Do Not Disturb               │
│ [toggle off] Set times       │
│                              │
├──────────────────────────────┤
│ FEATURES                     │
│                              │
│ AI Copilot                   │
│ [toggle on]                  │
│                              │
│ Automatic Rebooking          │
│ [toggle on]                  │
│                              │
│ Biometric Login              │
│ [toggle on]                  │
│                              │
│ Voice Commands               │
│ [toggle off]                 │
│                              │
│ Offline Mode                 │
│ [Download] (320 MB)          │
│                              │
├──────────────────────────────┤
│ ABOUT & SUPPORT              │
│                              │
│ App Version: 1.0.0           │
│ [Terms of Service]           │
│ [Privacy Policy]             │
│ [Contact Support]            │
│ [Send Feedback]              │
│ [Delete Account]             │
│                              │
├──────────────────────────────┤
│ [✓ Save Changes] [Cancel]   │ Actions
└──────────────────────────────┘
```

---

### 6. Interaction Patterns

- **Toggle switches:** On/off for boolean preferences
- **Radio buttons:** Select one from mutually exclusive options
- **Checkboxes:** Select multiple from list (dietary, accessibility, channels)
- **Select dropdowns:** For choice lists (language, timezone, reminder timing)
- **Text input:** For custom values (airline codes, contact info)
- **Tap to expand:** Additional options for complex preferences
- **Save/Cancel:** Sticky buttons at bottom (mobile) or inline (desktop)

---

### 7. State Management

**Local Component State:**
```typescript
const [preferences, setPreferences] = useState<PreferencesState>(loadedPreferences);
const [hasChanges, setHasChanges] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const handlePreferenceChange = (category: string, key: string, value: any) => {
  setPreferences(prev => ({
    ...prev,
    [category]: { ...prev[category], [key]: value }
  }));
  setHasChanges(true);
};
```

**Global State:**
- PreferencesContext (shared preferences across app)

**Persistence:**
- Save to localStorage (optimistic update)
- POST to API /api/user/preferences
- Show success toast on save

---

### 8. Data Requirements & Mock Data

**Mock Preferences:**
```typescript
export const mockUserPreferences: PreferencesState = {
  travel: {
    dietary: ['vegetarian', 'gluten_free'],
    seatPreference: 'window',
    cabinClass: 'business',
    airlinePreferences: ['united', 'american'],
  },
  accessibility: {
    mobility: false,
    hearing: false,
    vision: true,
    cognitive: false,
    serviceAnimals: false,
  },
  // ... rest of preferences
};
```

---

### 9. Persona Adaptations

#### PERSONA-01 (Alexandra)
- Dietary: Fine dining options, dietary restrictions
- Preferences: Premium cabin, specific airlines
- Privacy: Data privacy paramount, minimal sharing

#### PERSONA-02 (Marcus)
- Dietary: Efficient meals, business dining
- Preferences: Aisle seats for movement, time-optimized
- Notifications: Real-time for disruptions, daily digest for marketing

#### PERSONA-03 (Chen Family)
- Dietary: Kids' meal preferences, family-friendly
- Accessibility: Special accommodations for children
- Communication: Family email + SMS both preferred

---

### 10. Accessibility Requirements

- ARIA labels on all form inputs
- Keyboard navigation (Tab through all controls)
- Focus indicators visible
- Error messages associated with form fields
- Screen reader announces form sections and changes

---

### 11. Build Checklist

- [ ] Route created: `(main)/profile/settings/page.tsx`
- [ ] PreferenceCategory components for each section
- [ ] Form inputs (toggles, radios, checkboxes, selects)
- [ ] Save/Cancel button logic
- [ ] Preference persistence (localStorage + API)
- [ ] Success/error notifications
- [ ] Persona-specific adaptations
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-017 (Settings & Preferences) enables one-time preference setup that cascades across the entire journey, embodying Principle 5 (Journey Continuity — zero repetition). By centralizing dietary, accessibility, communication, and feature preferences, AirThere ensures consistent personalization from search through post-trip. Comprehensive preference coverage including dietary accommodations, accessibility needs, notification settings, and privacy controls ensures all travelers find options that serve them.

