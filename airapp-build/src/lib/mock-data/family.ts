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
    name: 'Wei Chen',
    age: 38,
    relationship: 'self',
    dietary: undefined,
    accessibility: undefined,
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2030-08-15',
      visaStatus: 'not_needed',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM002',
    name: 'Lin Chen',
    age: 36,
    relationship: 'spouse',
    dietary: undefined,
    accessibility: undefined,
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2029-03-22',
      visaStatus: 'not_needed',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM003',
    name: 'Sophie Chen',
    age: 8,
    relationship: 'child',
    dietary: undefined,
    accessibility: undefined,
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2031-11-10',
      visaStatus: 'not_needed',
      insuranceStatus: 'active',
    },
  },
  {
    id: 'MEM004',
    name: 'Lucas Chen',
    age: 5,
    relationship: 'child',
    dietary: undefined,
    accessibility: ['Needs booster seat'],
    medicalInfo: undefined,
    documents: {
      passportStatus: 'valid',
      passportExpiry: '2031-06-01',
      visaStatus: 'not_needed',
      insuranceStatus: 'active',
    },
  },
];

export const MOCK_CHECKLIST: ChecklistItem[] = [
  { id: 'CHK001', task: 'Beach towels', completed: true, assignedTo: 'Lin' },
  { id: 'CHK002', task: 'Sunscreen SPF 50+', completed: false, assignedTo: 'Lin' },
  { id: 'CHK003', task: 'Swim floaties for Lucas', completed: false, assignedTo: 'Wei' },
  { id: 'CHK004', task: 'Kids snacks & juice boxes', completed: true, assignedTo: 'Lin' },
  { id: 'CHK005', task: 'Tablets + chargers', completed: true, assignedTo: 'Wei' },
  { id: 'CHK006', task: 'Reef-safe sunscreen', completed: false, assignedTo: 'Lin' },
  { id: 'CHK007', task: 'Waterproof phone case', completed: true, assignedTo: 'Wei' },
  { id: 'CHK008', task: 'Kids swimsuits x4', completed: true, assignedTo: 'Lin' },
  { id: 'CHK009', task: 'First aid kit', completed: true, assignedTo: 'Wei' },
  { id: 'CHK010', task: 'Stroller', completed: false, assignedTo: 'Wei' },
  { id: 'CHK011', task: 'Beach toys', completed: true, assignedTo: 'Lin' },
  { id: 'CHK012', task: 'Travel games & coloring books', completed: true, assignedTo: 'Lin' },
];

export const MOCK_SEATING: FamilySeating[] = [
  {
    flightNumber: 'HA0011',
    route: 'LAX to HNL',
    seats: [
      { seat: '24A', memberName: 'Wei', memberType: 'adult' },
      { seat: '24B', memberName: 'Lin', memberType: 'adult' },
      { seat: '24C', memberName: 'Sophie', memberType: 'child' },
      { seat: '24D', memberName: 'Lucas', memberType: 'child' },
    ],
    confirmed: true,
  },
];

export const MOCK_ENTERTAINMENT: EntertainmentRecommendation[] = [
  { memberId: 'MEM001', memberName: 'Wei', age: 38, recommendations: ['Travel documentaries', 'Tech podcasts', 'News updates'] },
  { memberId: 'MEM002', memberName: 'Lin', age: 36, recommendations: ['Travel shows', 'Cooking series', 'Novel audiobooks'] },
  { memberId: 'MEM003', memberName: 'Sophie', age: 8, recommendations: ['Disney movies', 'Drawing app', 'Kid audiobooks'] },
  { memberId: 'MEM004', memberName: 'Lucas', age: 5, recommendations: ['Animated shows', 'Coloring games', 'Kids music playlist'] },
];

export const MOCK_DAY_OF_TRAVEL: DayOfTravelEvent[] = [
  { time: '5:30 AM', label: 'Depart from home', assignedTo: 'Wei', completed: false },
  { time: '6:15 AM', label: 'Arrive at LAX airport', assignedTo: undefined, completed: false },
  { time: '6:30 AM', label: 'Check-in at kiosk', assignedTo: 'Lin', completed: false },
  { time: '6:45 AM', label: 'Drop checked bags', assignedTo: 'Wei', completed: false },
  { time: '7:00 AM', label: 'Security checkpoint', assignedTo: undefined, completed: false },
  { time: '7:30 AM', label: 'Grab breakfast near gate', assignedTo: undefined, completed: false },
  { time: '7:50 AM', label: 'Family pre-boarding begins', assignedTo: undefined, completed: false },
  { time: '8:30 AM', label: 'Departure', assignedTo: undefined, completed: false },
];

export const MOCK_CHAT_MESSAGES: FamilyChatMessage[] = [
  { id: 'MSG001', sender: 'Lin', message: "Don't forget Lucas's swim floaties!", timestamp: '7:15 PM' },
  { id: 'MSG002', sender: 'Wei', message: 'Got it. Adding to the carry-on bag.', timestamp: '7:18 PM' },
  { id: 'MSG003', sender: 'Sophie', message: 'Can I bring my coloring book on the plane?', timestamp: '7:25 PM' },
  { id: 'MSG004', sender: 'Lin', message: 'Of course! It\'s already packed in your backpack.', timestamp: '7:26 PM' },
  { id: 'MSG005', sender: 'Wei', message: 'Airport car confirmed for 5:30 AM pickup', timestamp: '8:00 PM' },
];

export const MOCK_FAMILY_DATA: FamilyData = {
  familyName: 'The Chen Family',
  members: MOCK_FAMILY_MEMBERS,
  checklist: MOCK_CHECKLIST,
  seating: MOCK_SEATING,
  entertainment: MOCK_ENTERTAINMENT,
  dayOfTravel: MOCK_DAY_OF_TRAVEL,
  chatMessages: MOCK_CHAT_MESSAGES,
  tripName: 'Hawaii Family Vacation',
  tripDates: 'Apr 3 — Apr 10, 2026',
};
