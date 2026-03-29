import type { ChatMessage, ConversationFlow, SuggestionChipData, ActionCardData } from '@/lib/types/ai';
import type { PersonaType } from '@/lib/types/user';

// ─── Welcome messages per persona ──────────────────────────────────
const WELCOME_MESSAGES: Record<PersonaType, string> = {
  premium: "Good evening, Alexandra. I'm your personal travel concierge. How may I assist you today?",
  business: "Hi Marcus. I'm ready to help you find the fastest option. What do you need?",
  family: "Hi there! I'm your family travel assistant. Ask me anything about flights, hotels, or your upcoming trips.",
};

// ─── Suggested prompts per persona ─────────────────────────────────
export const SUGGESTED_PROMPTS: Record<PersonaType, SuggestionChipData[]> = {
  premium: [
    { id: 'sp-1', label: 'First class to Tokyo', icon: '✈', value: 'Find me first class flights to Tokyo next week' },
    { id: 'sp-2', label: 'Upgrade my seat', icon: '⬆', value: 'Can I upgrade my seat on my London flight?' },
    { id: 'sp-3', label: 'Lounge access', icon: '🛋', value: 'What lounge access do I have at JFK?' },
    { id: 'sp-4', label: 'Trip status', icon: '📋', value: 'What is the status of my upcoming trip?' },
  ],
  business: [
    { id: 'sp-1', label: 'Quick flight search', icon: '✈', value: 'Find me flights to London next Friday, business class' },
    { id: 'sp-2', label: 'Trip status', icon: '📋', value: 'Check my trip status' },
    { id: 'sp-3', label: 'Policy check', icon: '✓', value: 'Is my London booking policy-compliant?' },
    { id: 'sp-4', label: 'Expense summary', icon: '💼', value: 'Show me my travel expense summary' },
  ],
  family: [
    { id: 'sp-1', label: 'Family flights', icon: '✈', value: 'Find flights to Orlando for a family of 4' },
    { id: 'sp-2', label: 'Total trip cost', icon: '💰', value: 'What will our London trip cost in total?' },
    { id: 'sp-3', label: 'Family seating', icon: '👨‍👩‍👧‍👦', value: 'Can we sit together on our next flight?' },
    { id: 'sp-4', label: 'Packing tips', icon: '🧳', value: 'Help me prepare for our family trip' },
  ],
};

// ─── Mock AI response patterns ─────────────────────────────────────
interface MockResponse {
  text: string;
  suggestions?: SuggestionChipData[];
  actionCards?: ActionCardData[];
}

const RESPONSE_PATTERNS: Record<string, MockResponse> = {
  'flights to london': {
    text: "I found 3 great options for you to London. Here are the best flights:",
    suggestions: [
      { id: 'flight-1', label: 'UA 901 | 11:00 AM | $890', icon: '✈', value: 'UA901' },
      { id: 'flight-2', label: 'BA 178 | 2:15 PM | $920', icon: '✈', value: 'BA178' },
      { id: 'flight-3', label: 'AA 100 | 6:45 PM | $750', icon: '✈', value: 'AA100' },
    ],
  },
  'flights to tokyo': {
    text: "I've found premium options to Tokyo for you. All include lounge access:",
    actionCards: [
      {
        id: 'ac-1', type: 'flight', title: 'Best Value First Class', badge: 'Recommended',
        details: { route: 'SFO → NRT', time: '1:20 PM', duration: '11h 15m', stops: 0, price: 8900, currency: 'USD', highlights: ['First Class Suite', 'Nonstop', 'Priority Lounge'] },
        confidence: 95,
      },
    ],
  },
  'flights to orlando': {
    text: "Great choice for a family trip! I found family-friendly flights to Orlando. All prices shown are the total for 4 passengers:",
    actionCards: [
      {
        id: 'ac-2', type: 'flight', title: 'Best for Families', badge: 'Family Seating Guaranteed',
        details: { route: 'SFO → MCO', time: '8:00 AM', duration: '5h 20m', stops: 0, price: 1580, currency: 'USD', highlights: ['4 seats together', 'Kids meals included', 'Nonstop'] },
        confidence: 92,
      },
      {
        id: 'ac-3', type: 'flight', title: 'Budget Friendly', badge: 'Save $340',
        details: { route: 'SFO → MCO', time: '6:15 AM', duration: '7h 45m', stops: 1, price: 1240, currency: 'USD', highlights: ['4 seats together', '1 stop in Dallas', 'Checked bags included'] },
        confidence: 85,
      },
    ],
  },
  'trip status': {
    text: "Your London Business Trip is confirmed and on track. Here's a quick summary:\n\n• Flight: UA 901, SFO → LHR, April 15\n• Status: On Time\n• Hotel: The Savoy, 3 nights\n• Return: April 18, BA 286\n\nEverything looks good. Need me to check anything else?",
  },
  'upgrade': {
    text: "I checked availability for your London flight (UA 901). Good news — business class upgrade is available for 25,000 miles or $1,200. Your current MileagePlus balance: 48,500 miles. Would you like me to apply the upgrade?",
    suggestions: [
      { id: 'up-1', label: 'Use 25,000 miles', icon: '✈', value: 'upgrade-miles' },
      { id: 'up-2', label: 'Pay $1,200', icon: '💳', value: 'upgrade-cash' },
      { id: 'up-3', label: 'Not now', icon: '✕', value: 'upgrade-decline' },
    ],
  },
  'lounge': {
    text: "At JFK Terminal 7, you have access to:\n\n• United Polaris Lounge — Open until 10 PM\n• British Airways Galleries First — Open until 9:30 PM\n• Star Alliance Lounge — Open until 11 PM\n\nYour boarding time is 9:45 PM, so the Polaris Lounge would be perfect. Shall I provide directions?",
  },
  'trip cost': {
    text: "Here's the complete cost breakdown for your London trip (family of 4):\n\n✈ Flights: $3,160 (4 × $790)\n🏨 Hotel: $1,200 (3 nights × $400)\n🚗 Airport transfers: $180\n🎫 Activities: $320 (estimated)\n🍽 Meals: $450 (estimated)\n\n**Total estimated: $5,310**\n\nNo hidden fees. This includes all taxes and service charges. Want me to find ways to save?",
  },
  'family seating': {
    text: "I checked your upcoming flight to London. Great news — I've secured 4 seats together in row 32 (A, B, C, D). That's a window and aisle for the adults, with both kids in the middle.\n\nSeating is guaranteed and locked in. No one can break up your group. Want me to check meal options for the kids?",
  },
  'policy': {
    text: "I've reviewed your London booking against your company's travel policy:\n\n✓ Business class — approved for flights over 6 hours\n✓ Hotel rate — within per-diem limit ($400/night)\n✓ Booking advance — meets 7-day requirement\n✓ Preferred airline — United (corporate discount applied)\n\nAll clear. Expenses will auto-reconcile to your corporate card.",
  },
  'expense': {
    text: "Here's your travel expense summary for Q1 2026:\n\n• Total spend: $12,450\n• Flights: $8,200\n• Hotels: $2,800\n• Ground transport: $950\n• Meals: $500\n\nYou're at 62% of your quarterly budget ($20,000). All receipts are auto-captured and reconciled.",
  },
  'default': {
    text: "I'd be happy to help with that. I can assist with flight searches, trip planning, booking management, and real-time travel support. What would you like to explore?",
    suggestions: [
      { id: 'def-1', label: 'Search flights', icon: '✈', value: 'find flights' },
      { id: 'def-2', label: 'My trips', icon: '📋', value: 'trip status' },
      { id: 'def-3', label: 'Get help', icon: '❓', value: 'help' },
    ],
  },
};

function matchResponse(input: string): MockResponse {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(RESPONSE_PATTERNS)) {
    if (key === 'default') continue;
    if (lower.includes(key)) return response;
  }
  return RESPONSE_PATTERNS['default'];
}

// ─── Public API ────────────────────────────────────────────────────
export function getWelcomeMessage(persona: PersonaType): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: WELCOME_MESSAGES[persona],
    timestamp: new Date().toISOString(),
  };
}

export function getMockAIResponse(userMessage: string, persona: PersonaType): ChatMessage {
  const response = matchResponse(userMessage);

  // Persona tone adjustment
  let content = response.text;
  if (persona === 'premium' && !content.includes('Alexandra')) {
    content = content.replace(/^(I|Here|Great|Your)/, (match) => match);
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    suggestions: response.suggestions,
    actionCards: response.actionCards,
  };
}

// ─── Pre-built conversation flows ──────────────────────────────────
export const DEMO_CONVERSATIONS: Record<string, ConversationFlow> = {
  'booking-help': {
    id: 'booking-help',
    name: 'Booking Assistance',
    description: 'Help finding and booking flights',
    messages: [
      getWelcomeMessage('business'),
      { id: 'bh-1', role: 'user', content: 'Find me flights to London next Friday, business class', timestamp: '2026-04-10T10:00:00Z' },
      { ...getMockAIResponse('flights to london', 'business'), id: 'bh-2', timestamp: '2026-04-10T10:00:02Z' },
    ],
  },
  'disruption': {
    id: 'disruption',
    name: 'Disruption Query',
    description: 'Handling a disrupted flight',
    messages: [
      getWelcomeMessage('family'),
      { id: 'dq-1', role: 'user', content: 'Our flight to London got cancelled. What happens now?', timestamp: '2026-04-15T09:15:00Z' },
      {
        id: 'dq-2', role: 'assistant', timestamp: '2026-04-15T09:15:02Z',
        content: "I see that your flight UA 901 has been cancelled due to weather. Don't worry — I've already found the best rebooking option for your family of 4.\n\nAll four of you are confirmed together on UA 902, departing tomorrow at 11:45 AM. Same business class seats, no additional cost.\n\nI've also arranged a hotel room at the Marriott near SFO (voucher provided) and airport shuttle. Would you like me to confirm everything?",
        suggestions: [
          { id: 'dq-s1', label: 'Confirm rebooking', icon: '✓', value: 'confirm-rebook' },
          { id: 'dq-s2', label: 'See other options', icon: '↻', value: 'other-options' },
          { id: 'dq-s3', label: 'Talk to agent', icon: '💬', value: 'contact-agent' },
        ],
      },
    ],
  },
};
