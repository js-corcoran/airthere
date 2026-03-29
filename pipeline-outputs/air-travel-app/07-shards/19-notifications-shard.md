# Notifications Center — Build Shard
## AirThere | Screen SCR-019 | Shard 19

### 1. Screen Overview

**Purpose:** Unified notifications hub showing all trip-related alerts (check-in reminders, gate changes, disruptions, loyalty updates, travel tips). Accessible from home screen and persistent in notification tray. Supports filtering, search, and customizable frequency (real-time, daily digest, critical only).

**Role in Journey:** Continuous engagement layer across all journey phases. Proactive notification delivery of time-sensitive information (gate changes, disruption alerts, check-in reminders) enables travelers to stay informed without constant app checking.

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/notifications/page.tsx
```

---

### 3. Component Hierarchy

```
NotificationsCenter (page container)
├── Header
│   ├── "Notifications"
│   ├── Filter Tabs: [All] [Trips] [Loyalty] [Tips] [Updates]
│   └── [Settings] [Mark all as read]
│
├── NotificationsList (scrollable, with pull-to-refresh)
│   ├── NotificationCard (grouped by date or type)
│   │   ├── High Priority (Red Background)
│   │   │   ├── Icon (alert triangle)
│   │   │   ├── Title ("Gate Changed")
│   │   │   ├── Message ("Gate changed from C15 to D12")
│   │   │   ├── Timestamp ("2 minutes ago")
│   │   │   ├── CTA Button ([View Gate Info])
│   │   │   └── [Dismiss] [Mark as read]
│   │   │
│   │   ├── Medium Priority (Amber Background)
│   │   │   ├── Icon (info)
│   │   │   ├── Title ("Check-in Opens")
│   │   │   ├── Message ("24-hour check-in window now open for UA 901")
│   │   │   ├── Timestamp ("5 minutes ago")
│   │   │   ├── CTA Button ([Check In Now])
│   │   │   └── [Dismiss]
│   │   │
│   │   ├── Low Priority (Blue Background)
│   │   │   ├── Icon (lightbulb)
│   │   │   ├── Title ("Travel Tip")
│   │   │   ├── Message ("Arrive 3 hours early for international flight")
│   │   │   ├── Timestamp ("1 hour ago")
│   │   │   └── [Dismiss]
│   │   │
│   │   └── Loyalty Update (Gold Background)
│   │       ├── Icon (star)
│   │       ├── Title ("Miles Posted")
│   │       ├── Message ("8,500 miles posted to United MileagePlus")
│   │       ├── Timestamp ("3 hours ago")
│   │       └── [View Account]
│   │
│   └── Empty State (if no notifications)
│       ├── "All caught up!"
│       ├── "You have no new notifications"
│       └── Emoji/illustration
│
├── SearchBar (sticky at top, below header)
│   └── "Search notifications..."
│
└── NotificationSettings (accessible via [Settings] button)
    ├── Frequency
    │   ├── [◉] Real-time (all)
    │   ├── [○] Daily digest
    │   ├── [○] Critical only
    │
    ├── By Category
    │   ├── [☑] Gate & Boarding Changes
    │   ├── [☑] Disruptions
    │   ├── [☑] Check-in Reminders
    │   ├── [☑] Loyalty Updates
    │   ├── [☐] Travel Tips
    │   ├── [☐] Marketing Messages
    │
    ├── Do Not Disturb
    │   ├── [Enable] Set times (10pm - 7am)
    │
    └── [Save Settings]
```

---

### 4. Component Specifications

#### 4.1 NotificationCard

**TypeScript Interface:**
```typescript
interface Notification {
  id: string;
  type: 'disruption' | 'gate_change' | 'checkin' | 'loyalty' | 'tip' | 'marketing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: ISO8601;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  tripId?: string;
  flightId?: string;
  imageUrl?: string;
}

interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onAction: (url: string) => void;
  onMarkAsRead: (id: string) => void;
}
```

**Shadcn UI Base:** Card, Button, Badge

**Tailwind Classes:**
```
- Container:
  - Critical: bg-red-50 dark:bg-red-900 border-l-4 border-red-600
  - High: bg-amber-50 dark:bg-amber-900 border-l-4 border-amber-600
  - Medium: bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600
  - Low: bg-neutral-50 dark:bg-neutral-800 border-l-4 border-neutral-400
- Icon: text-2xl
- Title: font-bold text-lg
- Message: text-sm text-neutral-700 dark:text-neutral-300 mt-1
- Timestamp: text-xs text-neutral-600 dark:text-neutral-400 mt-2
- CTA Button: mt-3 (varies by priority)
- Dismiss Button: ml-auto px-2 py-1 text-xs
```

---

### 5. Layout & Wireframe

**Mobile Wireframe (320px):**
```
┌──────────────────────────────┐
│ Notifications          │ ⚙️  │ Header
│ [All] [Trips] [Loyalty]      │ Filters
│                              │
│ [Search notifications...]    │ Search
├──────────────────────────────┤
│ TODAY                        │ Date Separator
│                              │
│ 🚫 Gate Changed              │ Critical
│ ┌──────────────────────────┐ │
│ │ Gate changed from C15→D12 │ │
│ │ 2 minutes ago            │ │
│ │ [View Gate Info] [Dismiss]│ │
│ └──────────────────────────┘ │
│                              │
│ ✈️ Check-in Opens            │ High Priority
│ ┌──────────────────────────┐ │
│ │ 24h check-in window open │ │
│ │ for UA 901               │ │
│ │ 5 minutes ago            │ │
│ │ [Check In Now] [Dismiss] │ │
│ └──────────────────────────┘ │
│                              │
│ ⭐ Miles Posted               │ Loyalty
│ ┌──────────────────────────┐ │
│ │ 8,500 miles posted to    │ │
│ │ United MileagePlus       │ │
│ │ 1 hour ago               │ │
│ │ [View Account] [Dismiss] │ │
│ └──────────────────────────┘ │
│                              │
│ 💡 Travel Tip                │ Low Priority
│ ┌──────────────────────────┐ │
│ │ Arrive 3 hours early for │ │
│ │ international flights    │ │
│ │ 3 hours ago              │ │
│ │ [Dismiss]                │ │
│ └──────────────────────────┘ │
│                              │
│ YESTERDAY                    │ Date Separator
│                              │
│ ✈️ Boarding Status Update     │
│ "Boarding Group 2 called"    │
│ [Dismiss]                    │
│                              │
│ 🛫 Flight Status             │
│ "Flight departed on time"    │
│ [Dismiss]                    │
│                              │
└──────────────────────────────┘
```

---

### 6. Interaction Patterns

- **Tap notification:** Navigate to relevant screen (gate info, check-in, loyalty account)
- **Swipe left to dismiss:** Remove notification from list
- **Mark as read:** Dot indicator on unread notifications
- **Filter by category:** Tab bar at top
- **Search:** Filter notifications by keyword
- **Settings:** Customize frequency, categories, DND times

---

### 7. State Management

**Local Component State:**
```typescript
const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
const [filter, setFilter] = useState<'all' | 'trips' | 'loyalty' | 'tips'>('all');
const [searchQuery, setSearchQuery] = useState('');
const [showSettings, setShowSettings] = useState(false);

const filteredNotifications = notifications
  .filter(n => filter === 'all' || n.type.includes(filter))
  .filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));
```

---

### 8. Data Requirements & Mock Data

**Mock Notifications:**
```typescript
export const mockNotifications: Notification[] = [
  {
    id: 'NOTIF001',
    type: 'gate_change',
    priority: 'critical',
    title: 'Gate Changed',
    message: 'Gate changed from C15 to D12',
    timestamp: new Date().toISOString(),
    isRead: false,
    actionUrl: '/airport/SFO/gate/D12',
    actionLabel: 'View Gate Info',
    flightId: 'UA901',
  },
  // ... more notifications
];
```

---

### 9. Accessibility Requirements

- Notification cards keyboard navigable
- Priority indicated by color + icon + text
- Timestamps relative ("2 minutes ago") with absolute fallback
- Screen reader announces unread count
- Action buttons properly labeled and accessible

---

### 10. Build Checklist

- [ ] Route created: `(main)/notifications/page.tsx`
- [ ] NotificationCard component with priority styling
- [ ] NotificationsList with pull-to-refresh
- [ ] Filter tabs for categories
- [ ] Search functionality
- [ ] Dismiss/mark as read actions
- [ ] Settings modal/sheet
- [ ] Push notification integration (mock)
- [ ] Real-time notification polling
- [ ] Mock data connected
- [ ] Accessibility verified
- [ ] Tests passing

---

## Summary

SCR-019 (Notifications Center) serves as the unified hub for all trip-related alerts, enabling proactive information delivery without requiring constant app checking. By combining critical alerts (gate changes, disruptions), timely reminders (check-in, pre-departure), loyalty updates, and travel tips, AirThere keeps travelers informed across all journey phases. Customizable notification frequency (real-time, daily digest, critical only) and do-not-disturb scheduling ensure notifications enhance rather than disrupt the travel experience.

