export interface FlightProgress {
  flightNumber: string;
  aircraft: string;
  route: {
    from: string;
    fromCity: string;
    to: string;
    toCity: string;
  };
  current: {
    latitude: number;
    longitude: number;
    altitude: number;
    groundSpeed: number;
    outsideTemp: number;
  };
  progress: {
    percentComplete: number;
    timeElapsed: number;
    timeRemaining: number;
  };
  status: 'climbing' | 'cruise' | 'descent' | 'approaching';
  destinationWeather: {
    condition: string;
    temperature: number;
  };
  departureTime: string;
  arrivalTime: string;
  cabinTemp: number;
  wifiStrength: number;
  destinationLocalTime: string;
}

export interface MealOption {
  id: string;
  name: string;
  description: string;
  dietary: string;
  allergens: string[];
  calories: number;
}

export interface MealService {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  estimatedTime: string;
  minutesUntil: number;
  options: MealOption[];
  passengerDietary: string;
  passengerAllergies: string[];
  previousChoice?: string;
}

export interface EntertainmentItem {
  id: string;
  title: string;
  genre: string[];
  runtime: number;
  rating: number;
  ageRestriction?: string;
  type: 'movie' | 'show' | 'game' | 'music' | 'podcast';
  description: string;
  isNew?: boolean;
}

export interface WellnessData {
  hydrationInterval: number;
  hydrationCount: number;
  movementInterval: number;
  movementCount: number;
  recommendedSleep: number;
  jetLagTips: string[];
  timezoneShift: number;
}

export interface ProductivityData {
  wifiConnected: boolean;
  wifiBandwidth: number;
  focusSessionMinutes: number;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    cached: boolean;
  }>;
}

export interface CabinServiceRequest {
  id: string;
  type: 'water' | 'blanket' | 'medication' | 'other';
  label: string;
  icon: string;
}

export interface InflightData {
  flight: FlightProgress;
  meal: MealService;
  entertainment: EntertainmentItem[];
  wellness: WellnessData;
  productivity: ProductivityData;
  serviceRequests: CabinServiceRequest[];
  flightFacts: Array<{ label: string; value: string }>;
}
