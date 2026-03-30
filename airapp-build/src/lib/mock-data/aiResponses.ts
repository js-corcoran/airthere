import type { ChatMessage, ConversationFlow, SuggestionChipData, ActionCardData } from '@/lib/types/ai';
import type { PersonaType } from '@/lib/types/user';

// ─── Welcome messages per persona ──────────────────────────────────
const WELCOME_MESSAGES: Record<PersonaType, string> = {
  premium: "Good evening, Alexandra. I'm your personal travel concierge. How may I assist you today?",
  business: "Hi Marcus. I'm ready to optimize your travel schedule. Your Chicago flight departs tomorrow — anything you need to prep?",
  family: "Hi Wei! I'm your family travel assistant. Hawaii is just 5 days away — the whole family is going to love it!",
};

// ─── Suggested prompts per persona ─────────────────────────────────
export const SUGGESTED_PROMPTS: Record<PersonaType, SuggestionChipData[]> = {
  premium: [
    { id: 'sp-1', label: 'First class to Tokyo', icon: '✈', value: 'Find me first class flights to Tokyo next week' },
    { id: 'sp-2', label: 'Upgrade my seat', icon: '⬆', value: 'Can I upgrade my seat on my London flight?' },
    { id: 'sp-3', label: 'Lounge access', icon: '🛋', value: 'What lounge access do I have at JFK?' },
    { id: 'sp-4', label: 'Delay options', icon: '⚠', value: 'What are my options for the delayed SQ25 flight?' },
  ],
  business: [
    { id: 'sp-1', label: 'Trip status', icon: '✈', value: 'What\'s the status of my Chicago flight?' },
    { id: 'sp-2', label: 'Earlier flight', icon: '⬆', value: 'Can I get on an earlier flight to ORD?' },
    { id: 'sp-3', label: 'Lounge Wi-Fi', icon: '📶', value: 'How fast is the United Club Wi-Fi?' },
    { id: 'sp-4', label: 'Expense summary', icon: '💼', value: 'Summarize my Seattle trip expenses' },
  ],
  family: [
    { id: 'sp-1', label: 'Kid restaurants', icon: '🍽', value: 'Kid-friendly restaurants near our hotel in Waikiki' },
    { id: 'sp-2', label: 'Snorkel rental', icon: '🤿', value: 'Where can we rent snorkel gear for kids in Honolulu?' },
    { id: 'sp-3', label: 'Stroller policy', icon: '👶', value: 'What\'s Hawaiian Airlines\' stroller policy?' },
    { id: 'sp-4', label: 'Packing help', icon: '🧳', value: 'What should we pack for Hawaii with two young kids?' },
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
  'disruption-demo': {
    id: 'disruption-demo',
    name: 'Flight Disruption Assistance',
    description: 'AI copilot helping with SQ25 delay',
    messages: [
      {
        id: 'dd-1',
        role: 'system' as const,
        content: 'Disruption detected: SQ25 JFK→SIN delayed 90 minutes due to aircraft swap.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: 'dd-2',
        role: 'assistant' as const,
        content: "Alexandra, I've detected a 90-minute delay on your SQ25 flight to Singapore. The airline is swapping from an A350-900ULR to an A380 — which means a larger aircraft with even better Business Class suites. Your seat 14A has been automatically remapped to seat 14A on the A380. I've identified 2 alternative flights if you'd prefer not to wait, and the SilverKris Lounge at JFK T4 is open for your use during the delay.",
        timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        suggestions: [
          { id: 'dd-s1', label: 'View alternatives', icon: '✈', value: 'Show me alternative flights' },
          { id: 'dd-s2', label: 'Lounge details', icon: '🛋', value: 'Tell me about the lounge' },
          { id: 'dd-s3', label: 'Keep current flight', icon: '✓', value: 'I\'ll keep my current flight' },
        ],
      },
      {
        id: 'dd-3',
        role: 'user' as const,
        content: 'Show me alternative flights',
        timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      },
      {
        id: 'dd-4',
        role: 'assistant' as const,
        content: "Here are your options:\n\n**Option 1 (Recommended):** Keep SQ25 — departs 11:55 PM, arrives SIN 6:35 PM+1. The A380 Business Class is actually an upgrade. No cost.\n\n**Option 2:** SQ23 tomorrow at 10:40 AM — arrives SIN 3:20 PM+1. Hotel voucher provided for tonight at the TWA Hotel (JFK). No cost.\n\n**Option 3:** CX841 via Hong Kong — departs 1:10 AM, arrives SIN 8:45 PM+1. One stop, Cathay Pacific Business. $0 rebooking fee.\n\nYour family members James and Sophie have been automatically included in all options. Shall I proceed with any of these?",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        actionCards: [
          {
            id: 'dd-ac1', type: 'rebook' as const, title: 'Keep SQ25 (Delayed)', badge: 'Recommended',
            details: { route: 'JFK → SIN', time: '11:55 PM', duration: '18h 40m', stops: 0, price: 0, currency: 'USD', highlights: ['A380 Business Suite upgrade', 'No additional cost', 'Same seats'] },
            confidence: 98,
          },
          {
            id: 'dd-ac2', type: 'rebook' as const, title: 'SQ23 Tomorrow Morning', badge: 'Hotel Included',
            details: { route: 'JFK → SIN', time: '10:40 AM +1', duration: '18h 40m', stops: 0, price: 0, currency: 'USD', highlights: ['TWA Hotel tonight', 'Fresh start tomorrow', 'Same aircraft type'] },
            confidence: 82,
          },
        ],
      },
    ],
  },
  'business-demo': {
    id: 'business-demo',
    name: 'Business Travel Assistant',
    description: 'AI copilot helping Marcus with his Chicago trip',
    messages: [
      {
        id: 'bd-1',
        role: 'system' as const,
        content: 'Marcus has a 25-minute delay on UA456 SFO→ORD tomorrow. He has a 2 PM meeting in Chicago.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      },
      {
        id: 'bd-2',
        role: 'assistant' as const,
        content: 'Your UA456 is delayed 25 minutes — new departure 7:40 AM, arrival 1:47 PM. Your 2 PM meeting at The Langham is still achievable with 13 minutes buffer. I recommend taking a Lyft from O\'Hare — estimated 22 minutes to downtown. Want me to pre-book the car?',
        timestamp: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
        suggestions: [
          { id: 'bd-s1', label: 'Pre-book Lyft', icon: '🚗', value: 'Pre-book Lyft' },
          { id: 'bd-s2', label: 'Check earlier flights', icon: '✈', value: 'Check earlier flights' },
          { id: 'bd-s3', label: 'Notify meeting attendees', icon: '📧', value: 'Notify meeting attendees' },
        ],
      },
      {
        id: 'bd-3',
        role: 'user' as const,
        content: 'How fast is the United Club Wi-Fi? I need to do a video call before boarding.',
        timestamp: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
      },
      {
        id: 'bd-4',
        role: 'assistant' as const,
        content: 'SFO Terminal 3 United Club averages 280 Mbps download, 45 Mbps upload — more than enough for HD video calls. The quiet zone near the back windows has the most reliable signal. Club opens at 5:30 AM, so you\'ll have about an hour before boarding.',
        timestamp: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
      },
    ],
  },
  'family-demo': {
    id: 'family-demo',
    name: 'Family Hawaii Trip Assistant',
    description: 'AI copilot helping the Chen family plan their Hawaii trip',
    messages: [
      {
        id: 'fd-1',
        role: 'system' as const,
        content: 'The Chen family (Wei, Lin, Sophie 8, Lucas 5) is flying to Honolulu in 5 days on HA11.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: 'fd-2',
        role: 'assistant' as const,
        content: 'Aloha! Your Hawaii trip is coming up in 5 days. Here\'s what I\'ve prepped:\n\n\u2022 Seats confirmed: Row 24A-D (family block)\n\u2022 Kids meals: Sophie gets chicken nuggets, Lucas gets mac & cheese\n\u2022 Packing checklist: 60% done — sunscreen and swim floaties still needed\n\nWould you like restaurant suggestions near the Hilton Hawaiian Village?',
        timestamp: new Date(Date.now() - 29 * 60 * 1000).toISOString(),
        suggestions: [
          { id: 'fd-s1', label: 'Kid-friendly restaurants', icon: '🍽', value: 'Kid-friendly restaurants' },
          { id: 'fd-s2', label: 'Beach gear rentals', icon: '🏖', value: 'Beach gear rentals' },
          { id: 'fd-s3', label: 'Stroller policy', icon: '👶', value: 'Stroller policy' },
        ],
      },
      {
        id: 'fd-3',
        role: 'user' as const,
        content: 'Kid-friendly restaurants near our hotel in Waikiki',
        timestamp: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
      },
      {
        id: 'fd-4',
        role: 'assistant' as const,
        content: 'Great picks near the Hilton Hawaiian Village:\n\n1. **Duke\'s Waikiki** — Right on the beach, keiki menu with fish tacos and grilled cheese. High chairs available. $$\n2. **Eggs \'n Things** — Famous pancakes, 5 min walk. Kids eat free on Tuesdays. $\n3. **Marukame Udon** — Fresh udon noodles, Sophie and Lucas will love watching them made. Quick & affordable. $\n4. **Teddy\'s Bigger Burgers** — Classic burgers with a kids combo. Outdoor seating. $$\n\nAll are within a 10-minute walk. Want me to save these to your trip?',
        timestamp: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
        suggestions: [
          { id: 'fd-s4', label: 'Save to trip', icon: '💾', value: 'Save to trip' },
          { id: 'fd-s5', label: 'More restaurants', icon: '🍽', value: 'More restaurants' },
          { id: 'fd-s6', label: 'Beach activities', icon: '🏄', value: 'Beach activities' },
        ],
      },
    ],
  },
};
