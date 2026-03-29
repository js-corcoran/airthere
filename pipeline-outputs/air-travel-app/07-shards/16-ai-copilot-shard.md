# AI Copilot — Build Shard
## AirThere | Screen SCR-016 | Shard 16

### 1. Screen Overview

**Purpose:** Conversational AI assistant for flight search, booking assistance, trip management, and real-time support. Bottom sheet interface providing natural language interaction with graduated autonomy (Copilot → Curator → Autonomous Agent) as trust builds through successful interactions. Handles complex queries, multi-turn conversations, and task execution.

**Role in Journey:** Accessible from any screen via floating action button or swipe-up gesture. Serves as conversational alternative to traditional form-based search and booking. Learns traveler preferences and decision patterns to provide increasingly autonomous assistance. Integrates Claude API for natural language understanding and generation.

**Entry Points:**
- Floating action button (always visible, bottom-right)
- Swipe-up from bottom (gesture-based)
- Home tab "Ask me anything" prompt
- Contextual suggestions in other screens

**Exit Points:**
- Flight booking → Booking Confirmation (SCR-007)
- Trip management → Trip Dashboard (SCR-008)
- Disruption handling → IROPS Recovery (SCR-013)
- Continue conversation (stays open in bottom sheet)

---

### 2. Route & File Location

**Next.js Route Path:**
```
(main)/ai/copilot/page.tsx (full-screen view, optional)
Components used as bottom sheet from any screen
```

**File Structure:**
```
src/
├── components/
│   ├── ai/
│   │   ├── AICopilotSheet.tsx (bottom sheet container)
│   │   ├── ChatMessage.tsx (individual message bubble)
│   │   ├── ChatInput.tsx (text input + voice button)
│   │   ├── SuggestionChip.tsx (quick action suggestions)
│   │   ├── ActionCard.tsx (bookable flight/hotel card)
│   │   ├── TrustIndicator.tsx (copilot/curator/autonomous mode)
│   │   └── ConversationHistory.tsx (session messages)
│   └── shared/
│       └── FloatingActionButton.tsx
└── lib/
    ├── services/
    │   └── aiService.ts (Claude API integration)
    └── mock-data/
        └── aiResponses.ts (mock conversational responses)
```

---

### 3. Dependencies & Prerequisites

**Shards that must be completed first:**
- SCR-004 (Flight Search) — Search result integration
- SCR-006 (Booking Flow) — Booking integration
- SCR-008 (Trip Dashboard) — Trip context

**Shared components:**
- BottomSheet primitive (Shadcn)
- Card, Button, Badge
- ToastContainer (for action confirmations)

---

### 4. Component Hierarchy

```
AICopilotSheet (page-level bottom sheet)
├── Header
│   ├── "AirThere Copilot"
│   ├── Trust Level Indicator (Copilot/Curator/Autonomous)
│   └── [Close] [Expand to Full Screen]
│
├── ConversationHistory (scrollable message list)
│   ├── Welcome Message (first message if new conversation)
│   │   └── "Hi John! I'm your travel assistant. Ask me anything about flights, hotels, or your trips."
│   │
│   ├── User Message
│   │   ├── Message text ("Find me flights to London next week")
│   │   ├── Timestamp
│   │   └── Alignment: right
│   │
│   ├── Bot Message
│   │   ├── Message text (conversational response)
│   │   ├── Timestamp
│   │   ├── Alignment: left
│   │   └── Avatar (AirThere logo)
│   │
│   ├── Message with Suggestions (if query resolves to multiple options)
│   │   ├── "Found 3 flights for you"
│   │   ├── SuggestionChips:
│   │   │   ├── [✈ United UA 901 | 11:00 AM]
│   │   │   ├── [✈ Delta DL 250 | 2:15 PM]
│   │   │   └── [✈ American AA 100 | 6:45 PM]
│   │   └── "Which interests you?"
│   │
│   ├── Message with Action Card (for bookable options)
│   │   ├── Card Header: "Best Value"
│   │   ├── Flight Details
│   │   │   ├── Route & Time
│   │   │   ├── Duration & Stops
│   │   │   ├── Price
│   │   │   └── Seat Availability
│   │   ├── Comparison: "Departs 30 min earlier, $50 cheaper"
│   │   └── [Book Now] [See Other Options]
│   │
│   ├── Message with Confirmation (after action taken)
│   │   ├── "✓ Booking confirmed"
│   │   ├── Confirmation details
│   │   └── "Itinerary sent to your email"
│   │
│   └── Message with Options (for clarification)
│       ├── "Did you mean..."
│       ├── [Option A]
│       ├── [Option B]
│       └── [Option C]
│
├── ChatInput
│   ├── Text Input Field
│   │   ├── Placeholder: "Ask me anything..."
│   │   ├── Auto-expand as user types
│   │   └── Max 1000 characters
│   ├── Buttons
│   │   ├── [🎙️ Voice] (opens microphone)
│   │   ├── [📎 Attach] (attach files/photos)
│   │   └── [📤 Send] (submit message)
│   └── Suggested Prompts (if empty input)
│       ├── "Find me a flight to..."
│       ├── "Book a hotel in..."
│       ├── "Check my trip status"
│       └── "Help me prepare for my flight"
│
└── Footer
    ├── Trust Level: "Copilot mode: I recommend, you decide"
    ├── Data Usage: "Messages used to improve experience. Learn more"
    └── Feedback: [👍 Helpful] [👎 Not helpful]
```

---

### 5. Component Specifications

#### 5.1 AICopilotSheet

**TypeScript Interface:**
```typescript
interface AICopilotSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrip?: Trip;
  trustLevel: 'copilot' | 'curator' | 'autonomous';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: ISO8601;
  actionSuggestions?: Array<{
    type: 'flight' | 'hotel' | 'rebook' | 'confirmation';
    data: any;
  }>;
}

interface ConversationState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentQuery: string;
  conversationContext: {
    recentFlights: Flight[];
    previousSearches: SearchQuery[];
    preferences: UserPreferences;
  };
}
```

**Internal State:**
```typescript
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [trustLevel, setTrustLevel] = useState<'copilot' | 'curator'>('copilot');

const handleSendMessage = async (text: string) => {
  setIsLoading(true);
  const response = await aiService.chat({
    message: text,
    context: conversationContext,
    trustLevel,
  });
  setMessages([...messages, { role: 'assistant', content: response.text, actionSuggestions: response.actions }]);
  setIsLoading(false);
};
```

**Shadcn UI Base:** Sheet (bottom sheet primitive), Card, Button, Input, Badge

**Tailwind Classes:**
```
- Sheet Container: bg-white dark:bg-neutral-900 rounded-t-2xl
- Message Container: h-96 overflow-y-auto p-4 space-y-4
- User Message: bg-primary-500 text-white rounded-2xl px-4 py-2 max-w-xs ml-auto
- Bot Message: bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-2 max-w-xs mr-auto
- Input Container: flex gap-2 p-4 border-t border-neutral-200 dark:border-neutral-700
- Suggestion Chip: bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-blue-100
```

**Responsive Behavior:**
- Mobile: Full-width bottom sheet, 60vh height initially, expand to fullscreen option
- Tablet: Bottom sheet wider (max 500px), fixed height 70vh
- Desktop: Sidebar chat panel (400px width)

#### 5.2 ChatMessage

**TypeScript Interface:**
```typescript
interface ChatMessageProps {
  message: ChatMessage;
  isUser: boolean;
  hasActionSuggestions: boolean;
}
```

**Shadcn UI Base:** Card

**Tailwind Classes (dynamic based on role):**
```
- Container: flex gap-3 mb-4
- Avatar: w-8 h-8 rounded-full (bot only)
- Message Bubble:
  - User: bg-primary-500 text-white rounded-2xl px-4 py-2
  - Bot: bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-2
- Text: text-sm leading-relaxed
- Timestamp: text-xs opacity-70 mt-1
```

#### 5.3 SuggestionChip

**TypeScript Interface:**
```typescript
interface SuggestionChipProps {
  label: string;
  icon?: string;
  data: any;
  onSelect: (data: any) => void;
}
```

**Shadcn UI Base:** Button (variant="outline")

**Tailwind Classes:**
```
- Container: flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer hover:shadow-md transition-all
- Icon: text-lg
- Label: text-sm font-medium
- Selected State: bg-primary-100 dark:bg-primary-900 border-primary-500
```

#### 5.4 ActionCard (Flight/Hotel Suggestion)

**TypeScript Interface:**
```typescript
interface ActionCardProps {
  cardType: 'flight' | 'hotel' | 'experience';
  title: string;
  details: {
    route?: string;
    time?: string;
    price: number;
    highlights: string[];
  };
  confidence: number; // 0-100 (trust score)
  onBook: () => void;
  onDecline: () => void;
}
```

**Shadcn UI Base:** Card, Button

**Tailwind Classes:**
```
- Container: bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4 my-3 border border-blue-200 dark:border-blue-700
- Header: flex justify-between items-start mb-3
- Title: font-bold text-lg
- Badge: text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded
- Details Grid: grid grid-cols-2 gap-3 my-3 text-sm
- Price: text-2xl font-bold text-primary-600
- Buttons: flex gap-2 mt-3
```

---

### 6. Layout & Wireframe

**Mobile Wireframe (Bottom Sheet - 60vh):**
```
┌─────────────────────────────┐
│ AirThere Copilot │ ─╱ │ ⬆️  │ Header
├─────────────────────────────┤
│ Conversation History        │
│                             │
│ "Hi John! I'm your travel  │ Bot Message
│  assistant..."              │
│                             │
│              "Find me       │ User Message
│               flights to    │ (right-aligned)
│               London"       │
│                             │
│ "Great! Found 3 flights for│ Bot Message
│  you next week:"            │
│ [✈ UA 901 | 11:00 AM]      │ Suggestions
│ [✈ DL 250 | 2:15 PM]       │
│ [✈ AA 100 | 6:45 PM]       │
│ Which one interests you?    │
│                             │
├─────────────────────────────┤
│ [Ask me anything...]  │🎙│📤│ Input
│                             │
│ 🔵 Copilot mode: I         │ Footer
│    recommend, you decide    │
└─────────────────────────────┘
```

**Desktop Wireframe (Sidebar - 400px):**
```
┌────────────────────────┐
│ AirThere Copilot │ ─╱  │
├────────────────────────┤
│ Conversation History   │
│ (scrollable, 500px h)  │
│                        │
│ "Hi John! What can I   │
│  help you with?"       │
│                        │
│ "Find flights to       │
│  London"               │
│                        │
│ "Found 3 options:"     │
│ [UA 901 | 11:00 AM]    │
│ [DL 250 | 2:15 PM]     │
│ [AA 100 | 6:45 PM]     │
│                        │
├────────────────────────┤
│ [Ask me anything...] 🎙│ Input
│                        │
│ Trust: Copilot Mode    │ Footer
└────────────────────────┘
```

---

### 7. Interaction Patterns

#### Natural Language Queries
- **Flight Search:** "Find me flights from SFO to LHR next Friday"
- **Booking:** "Book me on the noon flight, business class"
- **Trip Management:** "What's the status of my London trip?"
- **Disruption:** "I heard there's bad weather in Denver tomorrow"
- **Preferences:** "I always want window seats and vegetarian meals"

#### Graduated Autonomy
- **Copilot Mode:** Recommends options, waits for user approval
- **Curator Mode:** Pre-approves low-risk decisions, asks for high-stakes confirmations
- **Autonomous Agent Mode:** Books, rebooking, reserves without asking (for trusted patterns)

#### Gesture Controls
- **Swipe up from bottom:** Open copilot sheet
- **Swipe down in sheet:** Close sheet
- **Tap suggestion chip:** Select option
- **Tap voice button:** Start voice input (speech-to-text)
- **Hold and drag:** Resize bottom sheet

---

### 8. State Management

**Local Component State:**
```typescript
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [conversationContext, setConversationContext] = useState({
  recentFlights: [],
  previousSearches: [],
  preferences: {},
});
const [trustLevel, setTrustLevel] = useState<'copilot' | 'curator' | 'autonomous'>('copilot');
```

**Global State:**
- TripContext (current trip context)
- PreferencesContext (user preferences)
- BookingContext (booking state if booking in progress)

**Conversation Context:**
- Recent search history
- Preferred airlines, routes, cabin classes
- Dietary and accessibility preferences
- Loyalty program accounts
- Trip patterns (frequency, seasonality, budget)

---

### 9. Data Requirements & Mock Data

**AI Service Interface:**
```typescript
interface AIServiceRequest {
  message: string;
  context: ConversationContext;
  trustLevel: 'copilot' | 'curator' | 'autonomous';
}

interface AIServiceResponse {
  text: string; // Conversational response
  actions?: Array<{
    type: 'search' | 'book' | 'rebook' | 'contact';
    data: any;
  }>;
  suggestions?: SuggestionChip[];
  actionCards?: ActionCard[];
  requiresConfirmation: boolean;
}
```

**Mock Responses (Design Mode):**
```typescript
export const mockAIResponses = {
  'find flights to london': {
    text: "Great! I found 3 flights to London next week. Which interests you most?",
    suggestions: [
      { label: '✈ UA 901 | 11:00 AM | $890', data: { flightId: 'UA901' } },
      { label: '✈ DL 250 | 2:15 PM | $920', data: { flightId: 'DL250' } },
      { label: '✈ AA 100 | 6:45 PM | $750', data: { flightId: 'AA100' } },
    ],
  },
  'book me on the noon flight': {
    text: "I'll book you on the noon flight in your preferred cabin class (business). Should I proceed?",
    actionCards: [{
      type: 'flight',
      title: 'Confirm Booking',
      details: { route: 'SFO-LHR', time: '12:00 PM', price: 2850 },
    }],
    requiresConfirmation: true,
  },
};
```

---

### 10. Persona Adaptations

#### PERSONA-01 (Alexandra)
- **Tone:** Formal, respectful, executive-focused
- **Suggestions:** Premium cabin emphasis, first-class options
- **Autonomy:** Curator mode enabled earlier (after 2-3 interactions)
- **Context:** Lounge access, status benefits, concierge services

#### PERSONA-02 (Marcus)
- **Tone:** Direct, time-efficient, policy-conscious
- **Suggestions:** Time-optimized routing, policy-compliant options
- **Autonomy:** Curator mode for policy-compliant bookings
- **Context:** Business productivity, expense tracking, connection efficiency

#### PERSONA-03 (Chen Family)
- **Tone:** Warm, family-conscious, guided
- **Suggestions:** Family-friendly destinations, family-size accommodations
- **Autonomy:** Copilot mode maintained (family decisions important)
- **Context:** Family seating guarantee, kids' entertainment, travel guidance

---

### 11. Accessibility Requirements

**ARIA:**
```typescript
<div role="dialog" aria-label="AirThere Copilot Assistant">
  <div role="log" aria-live="polite" aria-label="Conversation history">
    {/* Messages */}
  </div>
  <input
    type="text"
    aria-label="Message input"
    placeholder="Ask me anything..."
  />
</div>
```

**Focus Management:**
- Initial focus on message input field
- Message history scrollable via keyboard (Page Up/Down)
- Tab through suggestions and action cards
- Voice button accessible via keyboard

**Keyboard Navigation:**
- Tab/Shift+Tab: Navigate interactive elements
- Enter: Send message
- Space: Activate suggestions, buttons
- Arrow keys: Navigate through conversation history
- Escape: Close bottom sheet

**Screen Reader:**
"AirThere Copilot Assistant, conversational interface. Messages list below. Type message in input field and press Enter to send."

---

### 12. Loading, Error & Empty States

**Loading:** "Thinking..." indicator while API processes
**Error:** "I'm having trouble understanding. Can you rephrase?"
**Empty:** Welcome message with example queries
**API Failure:** "Service temporarily unavailable. Try again in a moment."

---

### 13. Edge Cases & Error Handling

- **Ambiguous query:** Ask clarifying question ("Did you mean flights for 1 or 4 passengers?")
- **Query outside scope:** Offer alternatives ("I can't book hotels yet, but I can find flights and manage your trip")
- **Connection loss:** Show cached conversation, retry when connected
- **Booking failure:** Explain reason ("This cabin is full on that flight. Try the next option?")
- **Trust violation:** Fall back to Copilot mode ("I need your approval for this booking")

---

### 14. Testing Requirements

- Message sending and receiving
- Natural language understanding (query intent detection)
- Suggestion chip selection
- Flight booking through conversation
- Voice input transcription
- Trust level progression
- Error handling and recovery
- Persona-specific tone variations
- Accessibility compliance (keyboard, screen reader)
- Integration with booking/trip systems

---

### 15. Build Checklist

- [ ] Route/component created: `AICopilotSheet.tsx`
- [ ] ChatMessage component for message bubbles
- [ ] ChatInput component with voice support
- [ ] SuggestionChip component for quick actions
- [ ] ActionCard component for bookable items
- [ ] ConversationHistory component (scrollable)
- [ ] Bottom sheet integration
- [ ] Floating action button
- [ ] AI service integration (Claude API mock)
- [ ] Natural language intent detection
- [ ] Flight search integration with results
- [ ] Booking flow integration
- [ ] Voice input (speech-to-text)
- [ ] Trust level tracking and progression
- [ ] Conversation context persistence
- [ ] Persona-specific tone adaptation
- [ ] Loading states
- [ ] Error states with recovery
- [ ] Accessibility verified (ARIA, keyboard, screen reader)
- [ ] Tests passing

---

## Summary

SCR-016 (AI Copilot) transforms travel booking from form-based friction into natural, conversational assistance. By integrating Claude API for natural language understanding and supporting graduated autonomy (Copilot → Curator → Autonomous Agent), AirThere enables travelers to search, book, and manage trips through conversation. Persona-specific tone adaptation ensures Alexandra receives executive-level service, Marcus gets efficiency and policy compliance, and the Chen family receives warm, family-conscious guidance. The conversational interface serves as accessible alternative to traditional search forms, particularly valuable for complex queries, multi-turn conversations, and decision-making under uncertainty.

