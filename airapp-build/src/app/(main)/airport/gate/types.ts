import { PersonaType } from '@/lib/types/user';

export type BoardingPhase =
  | 'gate_assigned'
  | 'pre_boarding'
  | 'group_1'
  | 'group_2'
  | 'group_3'
  | 'boarding_complete'
  | 'doors_closed';

export interface BoardingPhaseStep {
  id: BoardingPhase;
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  time?: string;
}

export interface GateBoardingInfo {
  flightNumber: string;
  airline: string;
  route: { from: string; to: string; fromCity: string; toCity: string };
  departureTime: string;
  estimatedTime: string;
  arrivalTime: string;
  status: 'on_time' | 'delayed' | 'boarding' | 'boarding_complete' | 'departed';
  delayMinutes: number;
  gate: string;
  terminal: string;
  aircraft: string;
  seatNumber: string;
  boardingGroup: string;
  confirmationNumber: string;
  currentPhase: BoardingPhase;
  boardingProgress: number;
}

export interface ConnectionInfo {
  hasConnection: boolean;
  nextFlight?: {
    flightNumber: string;
    departure: string;
    from: string;
    to: string;
    gate?: string;
  };
  connectionMinutes?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  recommendedAction?: string;
}

export interface GateAmenity {
  type: 'restroom' | 'food' | 'charging' | 'family' | 'lounge';
  name: string;
  distance: string;
  icon: string;
}

export interface PassengerBoardingPass {
  name: string;
  seat: string;
  boardingGroup: string;
  confirmationNumber: string;
  isChild?: boolean;
}
