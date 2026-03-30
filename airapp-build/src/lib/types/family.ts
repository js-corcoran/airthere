export interface FamilyMemberProfile {
  id: string;
  name: string;
  age: number;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'extended';
  avatar?: string;
  dietary?: string;
  accessibility?: string[];
  medicalInfo?: {
    allergies: string[];
    medications: string[];
    doctorContact?: string;
    insuranceInfo?: string;
  };
  documents: {
    passportStatus: 'valid' | 'expiring' | 'expired' | 'missing';
    passportExpiry?: string;
    visaStatus: 'approved' | 'pending' | 'required' | 'not_needed';
    insuranceStatus: 'active' | 'inactive';
  };
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  assignedTo?: string;
}

export interface FamilySeating {
  flightNumber: string;
  route: string;
  seats: Array<{
    seat: string;
    memberName: string;
    memberType: 'adult' | 'child';
  }>;
  confirmed: boolean;
}

export interface EntertainmentRecommendation {
  memberId: string;
  memberName: string;
  age: number;
  recommendations: string[];
}

export interface DayOfTravelEvent {
  time: string;
  label: string;
  assignedTo?: string;
  completed: boolean;
}

export interface FamilyChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export interface FamilyData {
  familyName: string;
  members: FamilyMemberProfile[];
  checklist: ChecklistItem[];
  seating: FamilySeating[];
  entertainment: EntertainmentRecommendation[];
  dayOfTravel: DayOfTravelEvent[];
  chatMessages: FamilyChatMessage[];
  tripName: string;
  tripDates: string;
}
