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

/* ── Persona-aware In-Flight Data ── */

const PREMIUM_FLIGHT: FlightProgress = {
  flightNumber: 'SQ 25',
  aircraft: 'Airbus A380-800',
  route: { from: 'JFK', fromCity: 'New York', to: 'SIN', toCity: 'Singapore' },
  current: { latitude: 28.5, longitude: 68.2, altitude: 38000, groundSpeed: 528, outsideTemp: -62 },
  progress: { percentComplete: 42, timeElapsed: 28800, timeRemaining: 39600 },
  status: 'cruise',
  destinationWeather: { condition: 'Thunderstorms', temperature: 31 },
  departureTime: '10:25 PM EST',
  arrivalTime: '5:05 PM SGT+1',
  cabinTemp: 21,
  wifiStrength: 5,
  destinationLocalTime: '10:42 AM',
};

const PREMIUM_MEAL: MealService = {
  type: 'dinner',
  estimatedTime: '1:00 AM EST',
  minutesUntil: 30,
  options: [
    { id: 'PM001', name: 'Lobster Thermidor', description: 'Maine lobster in cognac cream sauce, truffle mashed potato, asparagus', dietary: 'standard', allergens: ['shellfish', 'dairy'], calories: 680 },
    { id: 'PM002', name: 'Wagyu Beef Tenderloin', description: 'A5 wagyu, foie gras jus, roasted root vegetables, red wine reduction', dietary: 'standard', allergens: ['dairy'], calories: 720 },
    { id: 'PM003', name: 'Seared Tofu Katsu', description: 'Crispy tofu in panko crust with miso glaze, edamame, jasmine rice', dietary: 'vegetarian', allergens: ['soy', 'gluten'], calories: 410 },
    { id: 'PM004', name: 'Book the Cook: Peranakan Laksa', description: 'Pre-ordered Singapore-style laksa with tiger prawns and rice noodles', dietary: 'standard', allergens: ['shellfish', 'gluten'], calories: 550 },
  ],
  passengerDietary: 'standard',
  passengerAllergies: [],
  previousChoice: 'Lobster Thermidor',
};

const BUSINESS_FLIGHT: FlightProgress = {
  flightNumber: 'UA456',
  aircraft: 'Boeing 737 MAX 9',
  route: { from: 'SFO', fromCity: 'San Francisco', to: 'ORD', toCity: 'Chicago' },
  current: { latitude: 40.8, longitude: -102.3, altitude: 36000, groundSpeed: 485, outsideTemp: -54 },
  progress: { percentComplete: 55, timeElapsed: 7200, timeRemaining: 5400 },
  status: 'cruise',
  destinationWeather: { condition: 'Clear', temperature: 8 },
  departureTime: '7:40 AM PST',
  arrivalTime: '1:47 PM CST',
  cabinTemp: 22,
  wifiStrength: 3,
  destinationLocalTime: '11:42 AM',
};

const BUSINESS_MEAL: MealService = {
  type: 'snack',
  estimatedTime: '10:30 AM PST',
  minutesUntil: 20,
  options: [
    { id: 'BM001', name: 'Bistro Box', description: 'Artisan cheese, crackers, dried fruit, dark chocolate, mixed nuts', dietary: 'vegetarian', allergens: ['dairy', 'nuts', 'gluten'], calories: 420 },
    { id: 'BM002', name: 'Turkey & Avocado Wrap', description: 'Smoked turkey, avocado, pepper jack, chipotle aioli on wheat tortilla', dietary: 'standard', allergens: ['dairy', 'gluten'], calories: 380 },
  ],
  passengerDietary: 'standard',
  passengerAllergies: [],
};

const BUSINESS_PRODUCTIVITY: ProductivityData = {
  wifiConnected: true,
  wifiBandwidth: 75,
  focusSessionMinutes: 25,
  documents: [
    { id: 'DOC-B1', name: 'Strategy Deck Q2.pptx', type: 'pptx', cached: true },
    { id: 'DOC-B2', name: 'Meeting Agenda — Chicago.pdf', type: 'pdf', cached: true },
    { id: 'DOC-B3', name: 'Client Proposal Draft.docx', type: 'docx', cached: false },
  ],
};

const FAMILY_FLIGHT: FlightProgress = {
  flightNumber: 'HA 11',
  aircraft: 'Airbus A321neo',
  route: { from: 'LAX', fromCity: 'Los Angeles', to: 'HNL', toCity: 'Honolulu' },
  current: { latitude: 27.1, longitude: -142.5, altitude: 34000, groundSpeed: 498, outsideTemp: -49 },
  progress: { percentComplete: 60, timeElapsed: 14400, timeRemaining: 9000 },
  status: 'cruise',
  destinationWeather: { condition: 'Sunny', temperature: 28 },
  departureTime: '8:30 AM PST',
  arrivalTime: '11:45 AM HST',
  cabinTemp: 23,
  wifiStrength: 2,
  destinationLocalTime: '9:15 AM',
};

const FAMILY_MEAL: MealService = {
  type: 'lunch',
  estimatedTime: '11:00 AM PST',
  minutesUntil: 35,
  options: [
    { id: 'FM001', name: 'Kids Mac & Cheese', description: 'Creamy mac & cheese with steamed broccoli and apple slices', dietary: 'vegetarian', allergens: ['dairy', 'gluten'], calories: 340 },
    { id: 'FM002', name: 'Chicken Teriyaki Bowl', description: 'Grilled chicken, steamed rice, edamame, teriyaki sauce', dietary: 'standard', allergens: ['soy'], calories: 450 },
    { id: 'FM003', name: 'Hawaiian Poke Bowl', description: 'Fresh ahi tuna, sushi rice, seaweed salad, mango, sesame', dietary: 'standard', allergens: ['fish', 'soy', 'sesame'], calories: 480 },
    { id: 'FM004', name: 'PB&J Snack Pack', description: 'Peanut butter & jelly sandwich, animal crackers, fruit cup, juice box', dietary: 'standard', allergens: ['peanuts', 'gluten'], calories: 310 },
  ],
  passengerDietary: 'standard',
  passengerAllergies: [],
};

const FAMILY_WELLNESS: WellnessData = {
  hydrationInterval: 45,
  hydrationCount: 4,
  movementInterval: 90,
  movementCount: 2,
  recommendedSleep: 0,
  jetLagTips: [
    'Hawaii is 3 hours behind LA — minimal jet lag expected!',
    'Keep kids hydrated with water instead of sugary drinks',
    'Pack a small activity bag for the last hour of flight',
    'Apply reef-safe sunscreen before landing for beach time',
  ],
  timezoneShift: 3,
};

export function getInflightDataForPersona(persona: string): InflightData {
  switch (persona) {
    case 'premium':
      return {
        flight: PREMIUM_FLIGHT,
        meal: PREMIUM_MEAL,
        entertainment: MOCK_ENTERTAINMENT,
        wellness: MOCK_WELLNESS,
        productivity: MOCK_PRODUCTIVITY,
        serviceRequests: [
          { id: 'SVC-P1', type: 'water', label: 'Champagne', icon: 'wine' },
          { id: 'SVC-P2', type: 'blanket', label: 'Turn-Down', icon: 'bed-single' },
          { id: 'SVC-P3', type: 'other', label: 'Amenity Kit', icon: 'gift' },
          { id: 'SVC-P4', type: 'other', label: 'Cabin Crew', icon: 'message-circle' },
        ],
        flightFacts: [
          { label: 'Aircraft', value: 'Airbus A380-800 (Suites Class)' },
          { label: 'Cruising Speed', value: '528 knots (608 mph)' },
          { label: 'Current Altitude', value: '38,000 ft' },
          { label: 'Outside Temperature', value: '-62°C (-80°F)' },
          { label: 'Distance Remaining', value: '5,840 nautical miles' },
          { label: 'Route', value: 'Polar Route via Arctic' },
        ],
      };
    case 'business':
      return {
        flight: BUSINESS_FLIGHT,
        meal: BUSINESS_MEAL,
        entertainment: MOCK_ENTERTAINMENT,
        wellness: { ...MOCK_WELLNESS, timezoneShift: 2, jetLagTips: ['Chicago is 2 hours ahead — minimal adjustment needed', 'Arrive refreshed for your 2 PM meeting', 'Light snack on landing, save appetite for client dinner'] },
        productivity: BUSINESS_PRODUCTIVITY,
        serviceRequests: MOCK_SERVICE_REQUESTS,
        flightFacts: [
          { label: 'Aircraft', value: 'Boeing 737 MAX 9' },
          { label: 'Cruising Speed', value: '485 knots (558 mph)' },
          { label: 'Current Altitude', value: '36,000 ft' },
          { label: 'Outside Temperature', value: '-54°C (-65°F)' },
          { label: 'Distance Remaining', value: '820 nautical miles' },
          { label: 'Route', value: 'Direct SFO–ORD' },
        ],
      };
    case 'family':
    default:
      return {
        flight: FAMILY_FLIGHT,
        meal: FAMILY_MEAL,
        entertainment: MOCK_ENTERTAINMENT,
        wellness: FAMILY_WELLNESS,
        productivity: { wifiConnected: true, wifiBandwidth: 40, focusSessionMinutes: 15, documents: [] },
        serviceRequests: [
          { id: 'SVC-F1', type: 'water', label: 'Juice Box', icon: 'cup-soda' },
          { id: 'SVC-F2', type: 'blanket', label: 'Blanket', icon: 'bed-single' },
          { id: 'SVC-F3', type: 'other', label: 'Activity Pack', icon: 'palette' },
          { id: 'SVC-F4', type: 'other', label: 'Cabin Crew', icon: 'message-circle' },
        ],
        flightFacts: [
          { label: 'Aircraft', value: 'Airbus A321neo' },
          { label: 'Cruising Speed', value: '498 knots (573 mph)' },
          { label: 'Current Altitude', value: '34,000 ft' },
          { label: 'Outside Temperature', value: '-49°C (-56°F)' },
          { label: 'Distance Remaining', value: '1,020 nautical miles' },
          { label: 'Route', value: 'Pacific — LAX to HNL' },
        ],
      };
  }
}
