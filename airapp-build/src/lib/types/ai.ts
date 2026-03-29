export type TrustLevel = 'copilot' | 'curator' | 'autonomous';
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  suggestions?: SuggestionChipData[];
  actionCards?: ActionCardData[];
  isTyping?: boolean;
}

export interface SuggestionChipData {
  id: string;
  label: string;
  icon?: string;
  value: string;
}

export interface ActionCardData {
  id: string;
  type: 'flight' | 'hotel' | 'rebook' | 'confirmation';
  title: string;
  badge?: string;
  details: {
    route?: string;
    time?: string;
    duration?: string;
    stops?: number;
    price: number;
    currency?: string;
    highlights: string[];
  };
  confidence: number;
}

export interface ConversationFlow {
  id: string;
  name: string;
  description: string;
  messages: ChatMessage[];
}

export interface AIServiceRequest {
  message: string;
  trustLevel: TrustLevel;
}

export interface AIServiceResponse {
  text: string;
  suggestions?: SuggestionChipData[];
  actionCards?: ActionCardData[];
  requiresConfirmation: boolean;
}
