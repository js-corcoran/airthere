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
        flightNumber: 'UA456',
        airline: 'United Airlines',
        route: { from: 'SFO', to: 'ORD', fromCity: 'San Francisco', toCity: 'Chicago' },
        departureTime: '7:15 AM',
        estimatedTime: '7:40 AM',
        arrivalTime: '1:47 PM',
        status: 'delayed',
        delayMinutes: 25,
        gate: 'F14',
        terminal: 'Terminal 3',
        aircraft: 'Boeing 737 MAX 9',
        seatNumber: '8C',
        boardingGroup: 'Group 2 (Economy Plus)',
        confirmationNumber: 'UA8M4P',
        currentPhase: 'gate_assigned',
        boardingProgress: 0,
      };
    case 'family':
    default:
      return {
        flightNumber: 'HA0011',
        airline: 'Hawaiian Airlines',
        route: { from: 'LAX', to: 'HNL', fromCity: 'Los Angeles', toCity: 'Honolulu' },
        departureTime: '8:30 AM',
        estimatedTime: '8:30 AM',
        arrivalTime: '11:45 AM',
        status: 'on_time',
        delayMinutes: 0,
        gate: '51A',
        terminal: 'Terminal 5',
        aircraft: 'Airbus A321neo',
        seatNumber: '24A-D',
        boardingGroup: 'Families w/ children',
        confirmationNumber: 'HA5R2K',
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
      pre_boarding: 'Pre-Board (1K/GS)',
      group_1: 'Group 1 (First)',
      group_2: 'Group 2 (Econ Plus)',
      group_3: 'Groups 3-5',
      boarding_complete: 'Boarding Complete',
      doors_closed: 'Doors Closed',
    },
    family: {
      gate_assigned: 'Gate Assigned',
      pre_boarding: 'Pre-Board',
      group_1: 'Families w/ Children',
      group_2: 'Group A',
      group_3: 'Groups B-C',
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
  if (persona === 'premium') {
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
  // Business (SFO→ORD) and Family (LAX→HNL) are direct — no connections
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
        { type: 'lounge', name: 'United Club', distance: '3 min walk', icon: '✨' },
        { type: 'food', name: 'CNN Newsstand', distance: '1 min walk', icon: '📰' },
      ];
    case 'family':
    default:
      return [
        { type: 'family', name: 'Family Restroom', distance: '1 min walk', icon: '👶' },
        ...common,
        { type: 'food', name: 'McDonald\'s', distance: '2 min walk', icon: '🍔' },
        { type: 'food', name: 'Hudson News (kids books)', distance: '2 min walk', icon: '📚' },
        { type: 'family', name: 'Play Area', distance: '3 min walk', icon: '🎮' },
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
        { name: 'Marcus Webb', seat: '8C', boardingGroup: 'Group 2 (Economy Plus)', confirmationNumber: 'UA8M4P' },
      ];
    case 'family':
    default:
      return [
        { name: 'Wei Chen', seat: '24A', boardingGroup: 'Families w/ children', confirmationNumber: 'HA5R2K' },
        { name: 'Lin Chen', seat: '24B', boardingGroup: 'Families w/ children', confirmationNumber: 'HA5R2K' },
        { name: 'Sophie Chen', seat: '24C', boardingGroup: 'Families w/ children', confirmationNumber: 'HA5R2K', isChild: true },
        { name: 'Lucas Chen', seat: '24D', boardingGroup: 'Families w/ children', confirmationNumber: 'HA5R2K', isChild: true },
      ];
  }
}
