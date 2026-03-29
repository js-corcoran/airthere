import {
  InflightData,
  FlightProgress,
  MealService,
  EntertainmentItem,
  WellnessData,
  ProductivityData,
  CabinServiceRequest,
} from '@/lib/types/inflight';

export const MOCK_FLIGHT_PROGRESS: FlightProgress = {
  flightNumber: 'UA 901',
  aircraft: 'Boeing 787-9 Dreamliner',
  route: {
    from: 'SFO',
    fromCity: 'San Francisco',
    to: 'LHR',
    toCity: 'London',
  },
  current: {
    latitude: 54.2,
    longitude: -28.5,
    altitude: 35450,
    groundSpeed: 512,
    outsideTemp: -57,
  },
  progress: {
    percentComplete: 65,
    timeElapsed: 28800,
    timeRemaining: 15300,
  },
  status: 'cruise',
  destinationWeather: {
    condition: 'Partly Cloudy',
    temperature: 14,
  },
  departureTime: '11:30 AM PST',
  arrivalTime: '7:55 AM GMT+1',
  cabinTemp: 22,
  wifiStrength: 4,
  destinationLocalTime: '7:42 PM',
};

export const MOCK_MEAL_SERVICE: MealService = {
  type: 'breakfast',
  estimatedTime: '6:30 AM',
  minutesUntil: 45,
  options: [
    {
      id: 'MEAL001',
      name: 'English Breakfast',
      description: 'Scrambled eggs, sausage, grilled tomato, toast with butter and jam',
      dietary: 'standard',
      allergens: ['gluten', 'egg', 'dairy'],
      calories: 520,
    },
    {
      id: 'MEAL002',
      name: 'Vegetarian Frittata',
      description: 'Herb frittata with roasted vegetables, avocado, and mixed greens',
      dietary: 'vegetarian',
      allergens: ['egg', 'dairy'],
      calories: 380,
    },
    {
      id: 'MEAL003',
      name: 'Fresh Fruit & Granola Bowl',
      description: 'Seasonal berries, mango, Greek yogurt, house-made granola, and honey',
      dietary: 'vegetarian',
      allergens: ['dairy', 'nuts'],
      calories: 310,
    },
    {
      id: 'MEAL004',
      name: 'Asian Congee',
      description: 'Rice porridge with ginger, scallions, soy-marinated egg, and crispy shallots',
      dietary: 'standard',
      allergens: ['egg', 'soy'],
      calories: 290,
    },
  ],
  passengerDietary: 'standard',
  passengerAllergies: [],
  previousChoice: 'English Breakfast',
};

export const MOCK_ENTERTAINMENT: EntertainmentItem[] = [
  { id: 'ENT001', title: 'The Grand Budapest Hotel', genre: ['Comedy', 'Drama'], runtime: 99, rating: 8.1, ageRestriction: 'PG-13', type: 'movie', description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.', isNew: false },
  { id: 'ENT002', title: 'Dune: Part Three', genre: ['Sci-Fi', 'Adventure'], runtime: 166, rating: 8.7, ageRestriction: 'PG-13', type: 'movie', description: 'The epic conclusion to the Dune saga as Paul Atreides faces his ultimate destiny.', isNew: true },
  { id: 'ENT003', title: 'Spirited Away', genre: ['Animation', 'Fantasy'], runtime: 125, rating: 8.6, ageRestriction: 'PG', type: 'movie', description: 'A young girl discovers a world of spirits and must find courage to save her parents.', isNew: false },
  { id: 'ENT004', title: 'Planet Earth III', genre: ['Documentary', 'Nature'], runtime: 50, rating: 9.2, type: 'show', description: 'Sir David Attenborough returns with stunning footage of Earth\'s most remarkable wildlife.', isNew: true },
  { id: 'ENT005', title: 'The White Lotus', genre: ['Drama', 'Comedy'], runtime: 55, rating: 8.0, ageRestriction: 'R', type: 'show', description: 'Social satire set at an exclusive tropical resort, exploring the lives of vacationing guests.', isNew: false },
  { id: 'ENT006', title: 'Tetris Challenge', genre: ['Puzzle'], runtime: 15, rating: 7.5, type: 'game', description: 'The classic puzzle game with new multiplayer modes for in-flight competition.' },
  { id: 'ENT007', title: 'Sky Trivia', genre: ['Trivia', 'Educational'], runtime: 20, rating: 7.8, type: 'game', description: 'Test your knowledge of aviation, geography, and world cultures at 35,000 feet.' },
  { id: 'ENT008', title: 'Calm Skies Meditation', genre: ['Wellness', 'Meditation'], runtime: 30, rating: 8.4, type: 'podcast', description: 'Guided meditation designed specifically for air travelers to reduce anxiety and promote relaxation.' },
  { id: 'ENT009', title: 'Inside Out 3', genre: ['Animation', 'Comedy'], runtime: 96, rating: 8.3, ageRestriction: 'PG', type: 'movie', description: 'Riley faces new emotions as she navigates young adulthood and discovers who she really is.', isNew: true },
  { id: 'ENT010', title: 'Lo-Fi Flight Beats', genre: ['Music', 'Ambient'], runtime: 120, rating: 8.0, type: 'music', description: 'Curated lo-fi beats and ambient soundscapes perfect for relaxation or focused work at altitude.' },
];

export const MOCK_WELLNESS: WellnessData = {
  hydrationInterval: 60,
  hydrationCount: 3,
  movementInterval: 120,
  movementCount: 1,
  recommendedSleep: 5.5,
  jetLagTips: [
    'Set your watch to London time now to begin adjusting',
    'Avoid caffeine for the last 4 hours of flight',
    'Expose yourself to morning light upon arrival',
    'Take a short 20-minute nap if tired, but avoid long sleep on arrival day',
  ],
  timezoneShift: 8,
};

export const MOCK_PRODUCTIVITY: ProductivityData = {
  wifiConnected: true,
  wifiBandwidth: 95,
  focusSessionMinutes: 25,
  documents: [
    { id: 'DOC001', name: 'Q1 Report.pdf', type: 'pdf', cached: true },
    { id: 'DOC002', name: 'London Itinerary.pdf', type: 'pdf', cached: true },
    { id: 'DOC003', name: 'Meeting Notes.docx', type: 'docx', cached: false },
  ],
};

export const MOCK_SERVICE_REQUESTS: CabinServiceRequest[] = [
  { id: 'SVC001', type: 'water', label: 'Water', icon: 'droplets' },
  { id: 'SVC002', type: 'blanket', label: 'Blanket', icon: 'bed-single' },
  { id: 'SVC003', type: 'medication', label: 'Medication', icon: 'pill' },
  { id: 'SVC004', type: 'other', label: 'Other', icon: 'message-circle' },
];

export const MOCK_FLIGHT_FACTS = [
  { label: 'Aircraft', value: 'Boeing 787-9 Dreamliner' },
  { label: 'Cruising Speed', value: '512 knots (590 mph)' },
  { label: 'Current Altitude', value: '35,450 ft' },
  { label: 'Outside Temperature', value: '-57°C (-71°F)' },
  { label: 'Distance Remaining', value: '1,847 nautical miles' },
  { label: 'Route', value: 'North Atlantic Track' },
];

export const MOCK_INFLIGHT_DATA: InflightData = {
  flight: MOCK_FLIGHT_PROGRESS,
  meal: MOCK_MEAL_SERVICE,
  entertainment: MOCK_ENTERTAINMENT,
  wellness: MOCK_WELLNESS,
  productivity: MOCK_PRODUCTIVITY,
  serviceRequests: MOCK_SERVICE_REQUESTS,
  flightFacts: MOCK_FLIGHT_FACTS,
};
