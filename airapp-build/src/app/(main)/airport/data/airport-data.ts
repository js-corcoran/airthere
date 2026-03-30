import {
  AirportFlightInfo,
  AirportAlert,
  SecurityCheckpoint,
  AirportLounge,
  NearbyFlight,
  WayfindingDestination,
  BiometricStatus,
  AirportWeather,
} from '../types';
import { PersonaType } from '@/lib/types/user';

export function getAirportFlightInfo(persona: PersonaType): AirportFlightInfo {
  switch (persona) {
    case 'premium':
      return {
        flightNumber: 'SQ 12',
        airline: 'Singapore Airlines',
        route: { from: 'SFO', to: 'SIN', fromCity: 'San Francisco', toCity: 'Singapore' },
        departureTime: '11:45 AM',
        arrivalTime: '6:30 PM +1',
        status: 'on-time',
        gate: {
          number: 'G96',
          terminal: 'International Terminal',
          boardingStartTime: '10:50 AM',
          boardingGroups: ['First/Suites', 'Business', 'PPS Club', 'Zone 1', 'Zone 2', 'Zone 3'],
          currentBoardingGroup: null,
          boardingProgress: 0,
          walkingTimeMinutes: 8,
        },
        terminal: 'International',
        aircraft: 'Airbus A380-800',
        boardingGroup: 'First/Suites',
        seatNumber: '1A',
      };
    case 'business':
      return {
        flightNumber: 'UA0456',
        airline: 'United Airlines',
        route: { from: 'SFO', to: 'ORD', fromCity: 'San Francisco', toCity: 'Chicago' },
        departureTime: '7:15 AM',
        arrivalTime: '1:22 PM',
        status: 'delayed',
        gate: {
          number: 'F14',
          terminal: 'Terminal 3',
          boardingStartTime: '6:45 AM',
          boardingGroups: ['Pre-Board (1K/GS)', 'Group 1 (First)', 'Group 2 (Economy Plus)', 'Group 3', 'Group 4', 'Group 5'],
          currentBoardingGroup: null,
          boardingProgress: 0,
          walkingTimeMinutes: 5,
        },
        terminal: 'Terminal 3',
        aircraft: 'Boeing 737 MAX 9',
        boardingGroup: 'Group 2 (Economy Plus)',
        seatNumber: '8C',
      };
    case 'family':
    default:
      return {
        flightNumber: 'HA0011',
        airline: 'Hawaiian Airlines',
        route: { from: 'LAX', to: 'HNL', fromCity: 'Los Angeles', toCity: 'Honolulu' },
        departureTime: '8:30 AM',
        arrivalTime: '11:45 AM',
        status: 'on-time',
        gate: {
          number: '51A',
          terminal: 'Terminal 5',
          boardingStartTime: '7:50 AM',
          boardingGroups: ['Pre-Board', 'Families w/ children', 'Group A', 'Group B', 'Group C'],
          currentBoardingGroup: null,
          boardingProgress: 0,
          walkingTimeMinutes: 8,
        },
        terminal: 'Terminal 5',
        aircraft: 'Airbus A321neo',
        boardingGroup: 'Families with children (pre-board)',
        seatNumber: '24A-D',
      };
  }
}

export function getAirportAlerts(persona: PersonaType): AirportAlert[] {
  const common: AirportAlert[] = [
    {
      id: 'alert-security',
      type: 'warning',
      title: 'Security Queue',
      message: 'Current wait time at your terminal: 35 minutes',
      timestamp: '10 min ago',
    },
  ];

  switch (persona) {
    case 'premium':
      return [
        {
          id: 'alert-lounge',
          type: 'success',
          title: 'SilverKris Lounge',
          message: 'Your First Class lounge is now open. Complimentary spa treatments available.',
          timestamp: '5 min ago',
        },
        ...common,
        {
          id: 'alert-fast-track',
          type: 'info',
          title: 'Fast Track Security',
          message: 'Use the Premium lane at Gate G — estimated wait: 5 minutes',
          timestamp: '15 min ago',
        },
      ];
    case 'business':
      return [
        {
          id: 'alert-delay',
          type: 'warning',
          title: '25-Minute Delay',
          message: 'UA0456 is delayed 25 minutes due to late inbound aircraft. New departure: 7:40 AM.',
          timestamp: '3 min ago',
        },
        ...common,
        {
          id: 'alert-lounge',
          type: 'success',
          title: 'United Club Access',
          message: 'Your MileagePlus Platinum status includes United Club access — 3 min walk from Gate F14.',
          timestamp: '10 min ago',
        },
      ];
    case 'family':
    default:
      return [
        {
          id: 'alert-early-board',
          type: 'info',
          title: 'Early Boarding Reminder',
          message: 'Families with children under 6 board after Pre-Board. Have all 4 boarding passes ready.',
          timestamp: '5 min ago',
        },
        ...common,
        {
          id: 'alert-kids-area',
          type: 'info',
          title: 'Kids Areas Near Gate',
          message: 'Play area and family restroom available near Gate 51A in Terminal 5.',
          timestamp: '10 min ago',
        },
      ];
  }
}

export function getSecurityCheckpoints(persona: PersonaType): SecurityCheckpoint[] {
  if (persona === 'premium') {
    return [
      { id: 'sec-premium', name: 'Premium Fast Track', terminal: 'International', waitTimeMinutes: 5, status: 'low', hasTSAPrecheck: true, hasClear: true },
      { id: 'sec-main', name: 'Main Checkpoint', terminal: 'International', waitTimeMinutes: 35, status: 'high', hasTSAPrecheck: true, hasClear: true },
    ];
  }
  if (persona === 'business') {
    return [
      { id: 'sec-tsa-pre', name: 'TSA PreCheck Lane', terminal: 'T3', waitTimeMinutes: 10, status: 'low', hasTSAPrecheck: true, hasClear: false },
      { id: 'sec-clear', name: 'CLEAR Lane', terminal: 'T3', waitTimeMinutes: 3, status: 'low', hasTSAPrecheck: false, hasClear: true },
      { id: 'sec-main', name: 'Standard Checkpoint', terminal: 'T3', waitTimeMinutes: 35, status: 'high', hasTSAPrecheck: false, hasClear: false },
    ];
  }
  return [
    { id: 'sec-family', name: 'Family / Accessible Lane', terminal: 'Terminal 5', waitTimeMinutes: 20, status: 'moderate', hasTSAPrecheck: false, hasClear: false },
    { id: 'sec-main', name: 'Standard Checkpoint', terminal: 'Terminal 5', waitTimeMinutes: 45, status: 'high', hasTSAPrecheck: true, hasClear: true },
  ];
}

export function getAirportLounges(persona: PersonaType): AirportLounge[] {
  switch (persona) {
    case 'premium':
      return [
        {
          id: 'lounge-silverkris',
          name: 'SilverKris First Class Lounge',
          terminal: 'International',
          nearGate: 'G96',
          distanceMeters: 50,
          walkingTimeMinutes: 1,
          hours: { open: '7:00 AM', close: '11:00 PM' },
          amenities: ['Spa', 'Shower', 'Fine Dining', 'Bar', 'WiFi', 'Quiet Zone', 'Nap Rooms'],
          queueTimeMinutes: 0,
          capacity: { current: 12, max: 30 },
          accessLevel: 'elite',
          accessReason: 'First Class ticket on SQ 12',
          hasAccess: true,
        },
        {
          id: 'lounge-centurion',
          name: 'Amex Centurion Lounge',
          terminal: 'International',
          nearGate: 'G91',
          distanceMeters: 200,
          walkingTimeMinutes: 3,
          hours: { open: '6:00 AM', close: '11:00 PM' },
          amenities: ['Food', 'Bar', 'WiFi', 'Shower', 'Spa'],
          queueTimeMinutes: 15,
          capacity: { current: 65, max: 80 },
          accessLevel: 'membership',
          accessReason: 'Amex Platinum card member',
          hasAccess: true,
        },
      ];
    case 'business':
      return [
        {
          id: 'lounge-united-club',
          name: 'United Club',
          terminal: 'Terminal 3',
          nearGate: 'F14',
          distanceMeters: 80,
          walkingTimeMinutes: 3,
          hours: { open: '5:00 AM', close: '11:00 PM' },
          amenities: ['WiFi', 'Food', 'Bar', 'Shower'],
          queueTimeMinutes: 10,
          capacity: { current: 45, max: 60 },
          accessLevel: 'membership',
          accessReason: 'MileagePlus Platinum — United Club included',
          hasAccess: true,
        },
        {
          id: 'lounge-amex-centurion',
          name: 'Amex Centurion Lounge',
          terminal: 'Terminal 3',
          nearGate: 'E2',
          distanceMeters: 200,
          walkingTimeMinutes: 5,
          hours: { open: '6:00 AM', close: '10:00 PM' },
          amenities: ['Fine Dining', 'Shower', 'WiFi', 'Spa', 'Bar'],
          queueTimeMinutes: 5,
          capacity: { current: 30, max: 80 },
          accessLevel: 'paid',
          accessReason: 'Upgrade available — $50',
          hasAccess: false,
        },
      ];
    case 'family':
    default:
      return [
        {
          id: 'lounge-uso',
          name: 'USO Lounge',
          terminal: 'Terminal 5',
          nearGate: '51A',
          distanceMeters: 150,
          walkingTimeMinutes: 3,
          hours: { open: '6:00 AM', close: '9:00 PM' },
          amenities: ['WiFi', 'Snacks', 'Kids Area', 'Family Room'],
          queueTimeMinutes: 10,
          capacity: { current: 25, max: 50 },
          accessLevel: 'paid',
          accessReason: 'No lounge access included. Day passes available from $25.',
          hasAccess: false,
        },
      ];
  }
}

export function getNearbyFlights(): NearbyFlight[] {
  return [
    { flightNumber: 'AA 214', airline: 'American', destination: 'Los Angeles (LAX)', gate: 'C18', departureTime: '3:45 PM', status: 'on-time' },
    { flightNumber: 'DL 1842', airline: 'Delta', destination: 'Seattle (SEA)', gate: 'C22', departureTime: '4:10 PM', status: 'on-time' },
    { flightNumber: 'UA 421', airline: 'United', destination: 'Denver (DEN)', gate: 'C8', departureTime: '4:30 PM', status: 'delayed' },
    { flightNumber: 'BA 286', airline: 'British Airways', destination: 'London (LHR)', gate: 'G92', departureTime: '5:00 PM', status: 'on-time' },
    { flightNumber: 'JL 1', airline: 'Japan Airlines', destination: 'Tokyo (NRT)', gate: 'G98', departureTime: '5:15 PM', status: 'on-time' },
  ];
}

export function getWayfindingDestinations(): WayfindingDestination[] {
  return [
    { id: 'way-gate', type: 'gate', name: 'Your Gate (C15)', terminal: 'T3', distanceMeters: 350, walkingTimeMinutes: 5, coordinates: { x: 75, y: 30 } },
    { id: 'way-lounge', type: 'lounge', name: 'United Club', terminal: 'T3', distanceMeters: 80, walkingTimeMinutes: 2, coordinates: { x: 45, y: 45 } },
    { id: 'way-restroom', type: 'restroom', name: 'Nearest Restroom', terminal: 'T3', distanceMeters: 40, walkingTimeMinutes: 1, coordinates: { x: 35, y: 50 } },
    { id: 'way-food-1', type: 'food', name: 'Peet\'s Coffee', terminal: 'T3', distanceMeters: 60, walkingTimeMinutes: 1, coordinates: { x: 40, y: 55 } },
    { id: 'way-food-2', type: 'food', name: 'Napa Farms Market', terminal: 'T3', distanceMeters: 120, walkingTimeMinutes: 2, coordinates: { x: 55, y: 40 } },
    { id: 'way-shop', type: 'shop', name: 'DFS Duty Free', terminal: 'T3', distanceMeters: 200, walkingTimeMinutes: 3, coordinates: { x: 60, y: 35 } },
    { id: 'way-security', type: 'security', name: 'TSA Checkpoint', terminal: 'T3', distanceMeters: 500, walkingTimeMinutes: 7, coordinates: { x: 15, y: 65 } },
  ];
}

export function getBiometricStatus(persona: PersonaType): BiometricStatus {
  switch (persona) {
    case 'premium':
      return { enrolled: true, checkInComplete: true, boardingPassReady: true, lastVerified: '10:15 AM today' };
    case 'business':
      return { enrolled: true, checkInComplete: false, boardingPassReady: false };
    case 'family':
    default:
      return { enrolled: false, checkInComplete: false, boardingPassReady: false };
  }
}

export function getAirportWeather(persona: PersonaType): AirportWeather {
  switch (persona) {
    case 'premium':
      return { temperature: 62, unit: 'F', condition: 'Partly Cloudy', icon: '⛅' };
    case 'business':
      return { temperature: 65, unit: 'F', condition: 'Sunny', icon: '☀️' };
    case 'family':
    default:
      return { temperature: 72, unit: 'F', condition: 'Sunny', icon: '☀️' };
  }
}
