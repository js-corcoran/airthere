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
        flightNumber: 'UA 901',
        airline: 'United Airlines',
        route: { from: 'SFO', to: 'LHR', fromCity: 'San Francisco', toCity: 'London' },
        departureTime: '3:15 PM',
        arrivalTime: '9:30 AM +1',
        status: 'on-time',
        gate: {
          number: 'C15',
          terminal: 'Terminal 3',
          boardingStartTime: '2:30 PM',
          boardingGroups: ['Group 1 (Pre)', 'Group 2 (Business)', 'Group 3', 'Group 4', 'Group 5'],
          currentBoardingGroup: null,
          boardingProgress: 0,
          previousGate: 'C10',
          walkingTimeMinutes: 5,
        },
        terminal: 'T3',
        aircraft: 'Boeing 787-9',
        boardingGroup: 'Group 2 (Business)',
        seatNumber: '5A',
      };
    case 'family':
    default:
      return {
        flightNumber: 'AA 180',
        airline: 'American Airlines',
        route: { from: 'JFK', to: 'LHR', fromCity: 'New York', toCity: 'London' },
        departureTime: '7:00 PM',
        arrivalTime: '7:15 AM +1',
        status: 'delayed',
        gate: {
          number: 'B22',
          terminal: 'Terminal 8',
          boardingStartTime: '6:30 PM',
          boardingGroups: ['Families w/ children', 'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'],
          currentBoardingGroup: null,
          boardingProgress: 0,
          walkingTimeMinutes: 12,
        },
        terminal: 'T8',
        aircraft: 'Boeing 777-300ER',
        boardingGroup: 'Families w/ children',
        seatNumber: '32A-D',
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
          id: 'alert-gate-change',
          type: 'warning',
          title: 'Gate Changed',
          message: 'Your gate has changed from C10 to C15. Walking time: 5 min.',
          timestamp: '2 min ago',
        },
        ...common,
        {
          id: 'alert-wifi',
          type: 'info',
          title: 'WiFi Available',
          message: 'Connect to "SFO-Free-WiFi" for complimentary internet access.',
          timestamp: '20 min ago',
        },
      ];
    case 'family':
    default:
      return [
        {
          id: 'alert-delay',
          type: 'warning',
          title: 'Slight Delay',
          message: 'Your flight is delayed 25 minutes. New departure: 7:25 PM.',
          timestamp: '3 min ago',
        },
        ...common,
        {
          id: 'alert-family',
          type: 'info',
          title: 'Family Restroom',
          message: 'Family restrooms available near Gate B20 — 2 min walk from your gate.',
          timestamp: '10 min ago',
        },
        {
          id: 'alert-play-area',
          type: 'info',
          title: 'Kids Play Area',
          message: 'Children\'s play area open at Terminal 8, near Gate B18.',
          timestamp: '15 min ago',
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
    { id: 'sec-family', name: 'Family / Accessible Lane', terminal: 'T8', waitTimeMinutes: 20, status: 'moderate', hasTSAPrecheck: false, hasClear: false },
    { id: 'sec-main', name: 'Standard Checkpoint', terminal: 'T8', waitTimeMinutes: 45, status: 'high', hasTSAPrecheck: true, hasClear: true },
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
          terminal: 'T3',
          nearGate: 'C15',
          distanceMeters: 80,
          walkingTimeMinutes: 2,
          hours: { open: '5:00 AM', close: '11:00 PM' },
          amenities: ['WiFi', 'Food', 'Bar', 'Shower'],
          queueTimeMinutes: 10,
          capacity: { current: 45, max: 60 },
          accessLevel: 'membership',
          accessReason: 'United Club membership',
          hasAccess: true,
        },
        {
          id: 'lounge-united-polaris',
          name: 'United Polaris Lounge',
          terminal: 'T3',
          nearGate: 'C12',
          distanceMeters: 150,
          walkingTimeMinutes: 3,
          hours: { open: '6:00 AM', close: '10:30 PM' },
          amenities: ['Fine Dining', 'Shower', 'WiFi', 'Quiet Zone', 'Bar', 'Nap Pods'],
          queueTimeMinutes: 5,
          capacity: { current: 30, max: 50 },
          accessLevel: 'elite',
          accessReason: 'Business class ticket on UA 901',
          hasAccess: true,
        },
      ];
    case 'family':
    default:
      return [
        {
          id: 'lounge-admirals',
          name: 'Admirals Club',
          terminal: 'T8',
          nearGate: 'B24',
          distanceMeters: 100,
          walkingTimeMinutes: 2,
          hours: { open: '5:30 AM', close: '10:00 PM' },
          amenities: ['WiFi', 'Food', 'Kids Area', 'Family Room'],
          queueTimeMinutes: 20,
          capacity: { current: 55, max: 70 },
          accessLevel: 'paid',
          accessReason: 'Day pass available — $59/person',
          hasAccess: false,
        },
        {
          id: 'lounge-priority',
          name: 'Priority Pass Lounge',
          terminal: 'T8',
          nearGate: 'B30',
          distanceMeters: 250,
          walkingTimeMinutes: 5,
          hours: { open: '6:00 AM', close: '9:00 PM' },
          amenities: ['WiFi', 'Snacks', 'Drinks'],
          queueTimeMinutes: 25,
          capacity: { current: 40, max: 45 },
          accessLevel: 'paid',
          accessReason: 'Day pass — $35/person',
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
      return { temperature: 58, unit: 'F', condition: 'Clear', icon: '🌤️' };
  }
}
