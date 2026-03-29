import {
  FamilyData,
  FamilyMemberProfile,
  ChecklistItem,
  FamilySeating,
  EntertainmentRecommendation,
  DayOfTravelEvent,
  FamilyChatMessage,
} from '@/lib/types/family';

export const MOCK_FAMILY_MEMBERS: FamilyMemberProfile[] = [
  {
    id: 'MEM001',
    name: 'John Chen',
    age: 45,
    relationship: 'self',
    dietary: undefined,
    accessibility: undefined,
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2034-08-15',
      visaStatus: 'approved',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM002',
    name: 'Amy Chen',
    age: 42,
    relationship: 'spouse',
    dietary: 'Vegetarian',
    accessibility: undefined,
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2032-03-22',
      visaStatus: 'approved',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM003',
    name: 'Zoe Chen',
    age: 10,
    relationship: 'child',
    dietary: 'No shellfish',
    accessibility: undefined,
    medicalInfo: {
      allergies: ['Shellfish'],
      medications: [],
      doctorContact: undefined,
      insuranceInfo: undefined,
    },
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2029-11-10',
      visaStatus: 'approved',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM004',
    name: 'Max Chen',
    age: 7,
    relationship: 'child',
    dietary: undefined,
    accessibility: undefined,
    medicalInfo: {
      allergies: ['Peanuts'],
      medications: ['Inhaler for asthma'],
      doctorContact: 'Dr. Smith, (555) 123-4567',
      insuranceInfo: 'Blue Shield — ID: BSM123456789',
    },
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2030-06-01',
      visaStatus: 'approved',
      insuranceStatus: 'active',
    },
  },
];

export const MOCK_CHECKLIST: ChecklistItem[] = [
  { id: 'CHK001', task: 'Passports submitted', completed: true, assignedTo: 'Amy' },
  { id: 'CHK002', task: 'Vaccinations current', completed: true, assignedTo: 'Amy' },
  { id: 'CHK003', task: 'Travel insurance purchased', completed: true, assignedTo: 'John' },
  { id: 'CHK004', task: 'Packing started', completed: false, assignedTo: 'Amy' },
  { id: 'CHK005', task: 'Airport transportation arranged', completed: false, assignedTo: 'John' },
  { id: 'CHK006', task: 'Hotel confirmations sent', completed: false, assignedTo: 'Amy' },
  { id: 'CHK007', task: 'Luggage tags attached', completed: false, assignedTo: 'John' },
];

export const MOCK_SEATING: FamilySeating[] = [
  {
    flightNumber: 'UA 901',
    route: 'SFO to LHR',
    seats: [
      { seat: 'F4', memberName: 'John', memberType: 'adult' },
      { seat: 'F5', memberName: 'Amy', memberType: 'adult' },
      { seat: 'F6', memberName: 'Zoe', memberType: 'child' },
      { seat: 'F7', memberName: 'Max', memberType: 'child' },
    ],
    confirmed: true,
  },
  {
    flightNumber: 'UA 234',
    route: 'LHR to SFO (Return)',
    seats: [
      { seat: '12A', memberName: 'John', memberType: 'adult' },
      { seat: '12B', memberName: 'Amy', memberType: 'adult' },
      { seat: '12C', memberName: 'Zoe', memberType: 'child' },
      { seat: '12D', memberName: 'Max', memberType: 'child' },
    ],
    confirmed: true,
  },
];

export const MOCK_ENTERTAINMENT: EntertainmentRecommendation[] = [
  { memberId: 'MEM001', memberName: 'John', age: 45, recommendations: ['Business documentaries', 'Tech podcasts', 'News updates'] },
  { memberId: 'MEM002', memberName: 'Amy', age: 42, recommendations: ['Travel shows', 'Cooking series', 'Novel audiobooks'] },
  { memberId: 'MEM003', memberName: 'Zoe', age: 10, recommendations: ['PG-rated films', 'Nature documentaries', 'Trivia games'] },
  { memberId: 'MEM004', memberName: 'Max', age: 7, recommendations: ['Animated films', 'Cartoon series', 'Drawing games'] },
];

export const MOCK_DAY_OF_TRAVEL: DayOfTravelEvent[] = [
  { time: '8:00 AM', label: 'Depart from home', assignedTo: 'John', completed: false },
  { time: '8:45 AM', label: 'Arrive at SFO airport', assignedTo: undefined, completed: false },
  { time: '9:00 AM', label: 'Check-in at kiosk', assignedTo: 'Amy', completed: false },
  { time: '9:30 AM', label: 'Drop checked bags', assignedTo: 'John', completed: false },
  { time: '10:00 AM', label: 'Security checkpoint', assignedTo: undefined, completed: false },
  { time: '10:45 AM', label: 'Lounge access', assignedTo: undefined, completed: false },
  { time: '11:00 AM', label: 'Boarding begins', assignedTo: undefined, completed: false },
  { time: '11:30 AM', label: 'Departure', assignedTo: undefined, completed: false },
];

export const MOCK_CHAT_MESSAGES: FamilyChatMessage[] = [
  { id: 'MSG001', sender: 'Amy', message: "Remember Max's inhaler in the carry-on", timestamp: '2:34 PM' },
  { id: 'MSG002', sender: 'John', message: 'Got it. Packed in the side pocket.', timestamp: '2:36 PM' },
  { id: 'MSG003', sender: 'Zoe', message: 'When do we board?', timestamp: '3:01 PM' },
  { id: 'MSG004', sender: 'Amy', message: '11:00 AM, Group 3. Plenty of time!', timestamp: '3:02 PM' },
  { id: 'MSG005', sender: 'John', message: 'Airport car confirmed for 8:00 AM pickup', timestamp: '4:15 PM' },
];

export const MOCK_FAMILY_DATA: FamilyData = {
  familyName: 'The Chen Family',
  members: MOCK_FAMILY_MEMBERS,
  checklist: MOCK_CHECKLIST,
  seating: MOCK_SEATING,
  entertainment: MOCK_ENTERTAINMENT,
  dayOfTravel: MOCK_DAY_OF_TRAVEL,
  chatMessages: MOCK_CHAT_MESSAGES,
  tripName: 'London Family Trip',
  tripDates: 'Mar 30 — Apr 6, 2026',
};
