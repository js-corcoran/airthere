import {
  GateBoardingInfo,
  ConnectionInfo,
  GateAmenity,
  PassengerBoardingPass,
  BoardingPhaseStep,
  BoardingPhase,
} from '../types';
import { PersonaType } from '@/lib/types/user';

export function getGateBoardingInfo(persona: PersonaType): GateBoardingInfo {
  switch (persona) {
    case 'premium':
      return {
        flightNumber: 'SQ 12',
        airline: 'Singapore Airlines',
        route: { from: 'SFO', to: 'SIN', fromCity: 'San Francisco', toCity: 'Singapore' },
        departureTime: '11:45 AM',
        estimatedTime: '11:45 AM',
        arrivalTime: '6:30 PM +1',
        status: 'boarding',
        delayMinutes: 0,
        gate: 'G96',
        terminal: 'International',
        aircraft: 'Airbus A380-800',
        seatNumber: '1A',
        boardingGroup: 'First/Suites',
        confirmationNumber: 'SQ7K29',
        currentPhase: 'pre_boarding',
        boardingProgress: 15,
      };
    case 'business':
      return {
        flightNumber: 'UA 901',
        airline: 'United Airlines',
        route: { from: 'SFO', to: 'LHR', fromCity: 'San Francisco', toCity: 'London' },
        departureTime: '3:15 PM',
        estimatedTime: '3:15 PM',
        arrivalTime: '9:30 AM +1',
        status: 'on_time',
        delayMinutes: 0,
        gate: 'C15',
        terminal: 'T3',
        aircraft: 'Boeing 787-9',
        seatNumber: '5A',
        boardingGroup: 'Group 2 (Business)',
        confirmationNumber: 'UA8M4P',
        currentPhase: 'gate_assigned',
        boardingProgress: 0,
      };
    case 'family':
    default:
      return {
        flightNumber: 'AA 180',
        airline: 'American Airlines',
        route: { from: 'JFK', to: 'LHR', fromCity: 'New York', toCity: 'London' },
        departureTime: '7:00 PM',
        estimatedTime: '7:25 PM',
        arrivalTime: '7:40 AM +1',
        status: 'delayed',
        delayMinutes: 25,
        gate: 'B22',
        terminal: 'T8',
        aircraft: 'Boeing 777-300ER',
        seatNumber: '32A-D',
        boardingGroup: 'Families w/ children',
        confirmationNumber: 'AA3R7X',
        currentPhase: 'gate_assigned',
        boardingProgress: 0,
      };
  }
}

export function getBoardingPhases(currentPhase: BoardingPhase, persona: PersonaType): BoardingPhaseStep[] {
  const phaseOrder: BoardingPhase[] = [
    'gate_assigned',
    'pre_boarding',
    'group_1',
    'group_2',
    'group_3',
    'boarding_complete',
    'doors_closed',
  ];
  const currentIdx = phaseOrder.indexOf(currentPhase);

  const labels: Record<string, Record<BoardingPhase, string>> = {
    premium: {
      gate_assigned: 'Gate Assigned',
      pre_boarding: 'First Class & Suites',
      group_1: 'Business Class',
      group_2: 'PPS Club & Star Gold',
      group_3: 'Economy',
      boarding_complete: 'Boarding Complete',
      doors_closed: 'Doors Closed',
    },
    business: {
      gate_assigned: 'Gate Assigned',
      pre_boarding: 'Pre-Board (1K, GS)',
      group_1: 'Group 1 (Polaris)',
      group_2: 'Group 2 (Business)',
      group_3: 'Groups 3-5',
      boarding_complete: 'Boarding Complete',
      doors_closed: 'Doors Closed',
    },
    family: {
      gate_assigned: 'Gate Assigned',
      pre_boarding: 'Families w/ children',
      group_1: 'Group 1 (First/Business)',
      group_2: 'Group 2',
      group_3: 'Groups 3-5',
      boarding_complete: 'Boarding Complete',
      doors_closed: 'Doors Closed',
    },
  };

  return phaseOrder.map((phase, idx) => ({
    id: phase,
    label: labels[persona]?.[phase] ?? phase,
    status: idx < currentIdx ? 'completed' : idx === currentIdx ? 'in_progress' : 'pending',
    time: idx === 0 ? '10:30 AM' : idx === currentIdx ? 'Now' : undefined,
  }));
}

export function getConnectionInfo(persona: PersonaType): ConnectionInfo {
  if (persona === 'business') {
    return {
      hasConnection: true,
      nextFlight: {
        flightNumber: 'BA 462',
        departure: '12:30 PM +1',
        from: 'LHR',
        to: 'CDG',
        gate: 'A14',
      },
      connectionMinutes: 180,
      riskLevel: 'low',
      recommendedAction: 'Comfortable connection time. Your bags are automatically transferred.',
    };
  }
  if (persona === 'family') {
    return {
      hasConnection: true,
      nextFlight: {
        flightNumber: 'BA 794',
        departure: '10:15 AM +1',
        from: 'LHR',
        to: 'EDI',
        gate: 'TBD',
      },
      connectionMinutes: 155,
      riskLevel: 'medium',
      recommendedAction: 'Monitor delay — inform gate agent if delay exceeds 30 minutes.',
    };
  }
  return { hasConnection: false };
}

export function getGateAmenities(persona: PersonaType): GateAmenity[] {
  const common: GateAmenity[] = [
    { type: 'restroom', name: 'Nearest Restroom', distance: '50 ft', icon: '🚻' },
    { type: 'charging', name: 'USB charging at gate', distance: 'At gate', icon: '🔌' },
  ];

  switch (persona) {
    case 'premium':
      return [
        { type: 'lounge', name: 'SilverKris Lounge', distance: '1 min walk', icon: '✨' },
        ...common,
        { type: 'food', name: 'Champagne Bar', distance: '2 min walk', icon: '🥂' },
      ];
    case 'business':
      return [
        ...common,
        { type: 'food', name: 'Peet\'s Coffee', distance: '1 min walk', icon: '☕' },
        { type: 'food', name: 'Napa Farms Market', distance: '2 min walk', icon: '🥗' },
      ];
    case 'family':
    default:
      return [
        { type: 'family', name: 'Family Restroom', distance: '2 min walk', icon: '👶' },
        ...common,
        { type: 'food', name: 'McDonald\'s', distance: '3 min walk', icon: '🍔' },
        { type: 'food', name: 'Starbucks', distance: '2 min walk', icon: '☕' },
      ];
  }
}

export function getBoardingPasses(persona: PersonaType): PassengerBoardingPass[] {
  switch (persona) {
    case 'premium':
      return [
        { name: 'Alexandra Chen-Whitfield', seat: '1A', boardingGroup: 'First/Suites', confirmationNumber: 'SQ7K29' },
      ];
    case 'business':
      return [
        { name: 'Marcus Rodriguez', seat: '5A', boardingGroup: 'Group 2 (Business)', confirmationNumber: 'UA8M4P' },
      ];
    case 'family':
    default:
      return [
        { name: 'David Chen', seat: '32A', boardingGroup: 'Families w/ children', confirmationNumber: 'AA3R7X' },
        { name: 'Mei Chen', seat: '32B', boardingGroup: 'Families w/ children', confirmationNumber: 'AA3R7X' },
        { name: 'Lily Chen', seat: '32C', boardingGroup: 'Families w/ children', confirmationNumber: 'AA3R7X', isChild: true },
        { name: 'James Chen', seat: '32D', boardingGroup: 'Families w/ children', confirmationNumber: 'AA3R7X', isChild: true },
      ];
  }
}
