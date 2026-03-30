import type { PersonaType } from '@/lib/types/user';

export interface AppNotification {
  id: string;
  type:
    | 'gate_change'
    | 'checkin'
    | 'delay'
    | 'cancellation'
    | 'loyalty'
    | 'tip'
    | 'boarding'
    | 'price_drop'
    | 'family';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string; // ISO 8601
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  tripId?: string;
  flightId?: string;
  category: 'flights' | 'loyalty' | 'tips' | 'updates';
}

const now = new Date();
function hoursAgo(h: number): string {
  return new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
}
function minutesAgo(m: number): string {
  return new Date(now.getTime() - m * 60 * 1000).toISOString();
}
function daysAgo(d: number): string {
  return new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
}

const premiumNotifications: AppNotification[] = [
  {
    id: 'prem-001',
    type: 'delay',
    priority: 'critical',
    title: '⚠ SQ25 Delayed 90 Minutes',
    message: 'Your JFK→SIN flight is delayed due to aircraft swap (A380 replacing A350-900ULR). New departure: 11:55 PM. Rebooking options available.',
    timestamp: minutesAgo(12),
    isRead: false,
    actionUrl: '/irops/FL-JFK-SIN-DEMO',
    actionLabel: 'View Options',
    tripId: 'trip-demo-001',
    flightId: 'SQ25',
    category: 'flights',
  },
  {
    id: 'prem-002',
    type: 'gate_change',
    priority: 'critical',
    title: 'Gate Change — SQ25',
    message: 'Your departure gate has moved from B22 to B38 due to aircraft swap. Updated boarding pass available.',
    timestamp: minutesAgo(15),
    isRead: false,
    actionUrl: '/airport/gate',
    actionLabel: 'View Gate',
    tripId: 'trip-demo-001',
    flightId: 'SQ25',
    category: 'flights',
  },
  {
    id: 'prem-003',
    type: 'tip',
    priority: 'high',
    title: 'SilverKris Lounge Access Confirmed',
    message: 'Your Singapore Airlines Business Class ticket grants access to the SilverKris Lounge in JFK Terminal 4. Open until 11:30 PM.',
    timestamp: minutesAgo(45),
    isRead: false,
    actionUrl: '/lounge',
    actionLabel: 'View Lounge',
    tripId: 'trip-demo-001',
    category: 'tips',
  },
  {
    id: 'prem-004',
    type: 'checkin',
    priority: 'high',
    title: 'Check-in Opens in 24h — SQ25',
    message: 'Online check-in for SQ25 to Singapore opens tomorrow. Your seat 14A (Business) is confirmed.',
    timestamp: hoursAgo(2),
    isRead: false,
    actionUrl: '/trips',
    actionLabel: 'View Trip',
    tripId: 'trip-demo-001',
    flightId: 'SQ25',
    category: 'flights',
  },
  {
    id: 'prem-005',
    type: 'tip',
    priority: 'medium',
    title: 'Upgrade Available — SQ25 First Class',
    message: 'First Class Suites on SQ25 available for 45,000 KrisFlyer miles or $2,800. Your balance: 47,500 miles.',
    timestamp: hoursAgo(4),
    isRead: false,
    actionUrl: '/trips',
    actionLabel: 'View Upgrade',
    tripId: 'trip-demo-001',
    category: 'flights',
  },
  {
    id: 'prem-006',
    type: 'loyalty',
    priority: 'medium',
    title: '18,400 KrisFlyer Miles Earned',
    message: 'Your Tokyo trip (NH0105 LAX→NRT) has been credited with 18,400 KrisFlyer miles. New balance: 47,500 miles.',
    timestamp: hoursAgo(8),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'prem-007',
    type: 'loyalty',
    priority: 'low',
    title: 'Star Alliance Gold — 72% to Next Tier',
    message: 'You need 13,200 more qualifying miles for Platinum status. Current progress: 72%.',
    timestamp: daysAgo(1),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'prem-008',
    type: 'price_drop',
    priority: 'medium',
    title: 'First Class Fare Drop — LHR to CDG',
    message: 'First class fares on your watched London–Paris route dropped 18%. Save up to £340.',
    timestamp: daysAgo(1),
    isRead: true,
    actionUrl: '/search',
    actionLabel: 'View Details',
    category: 'tips',
  },
  {
    id: 'prem-009',
    type: 'tip',
    priority: 'low',
    title: 'Singapore Weather: 31°C, Partly Cloudy',
    message: 'Singapore forecast for your arrival: 31°C with afternoon thundershowers. Pack an umbrella and light layers.',
    timestamp: daysAgo(1),
    isRead: true,
    tripId: 'trip-demo-001',
    category: 'tips',
  },
  {
    id: 'prem-010',
    type: 'tip',
    priority: 'low',
    title: 'Trip Recap Ready — Tokyo Getaway',
    message: 'Your Tokyo Spring Getaway trip recap is ready to view. See your travel insights, expenses, and loyalty points earned.',
    timestamp: daysAgo(2),
    isRead: true,
    actionUrl: '/trips/recap',
    actionLabel: 'View Recap',
    tripId: 'trip-demo-002',
    category: 'updates',
  },
];

const businessNotifications: AppNotification[] = [
  {
    id: 'biz-001',
    type: 'delay',
    priority: 'high',
    title: 'UA456 Delayed 25 Minutes',
    message: 'New departure 7:40 AM. Meeting at 2 PM still achievable.',
    timestamp: hoursAgo(1),
    isRead: false,
    actionLabel: 'View Updated Timeline',
    flightId: 'UA456',
    category: 'flights',
  },
  {
    id: 'biz-002',
    type: 'gate_change',
    priority: 'high',
    title: 'Gate Change: F14 → F18',
    message: 'UA456 SFO→ORD gate updated. 3 min walk.',
    timestamp: hoursAgo(2),
    isRead: false,
    actionLabel: 'View Map',
    flightId: 'UA456',
    category: 'flights',
  },
  {
    id: 'biz-003',
    type: 'tip',
    priority: 'medium',
    title: 'Expense Report Due Friday',
    message: 'Seattle trip (AS431) expenses not yet submitted. $2,860 pending.',
    timestamp: daysAgo(1),
    isRead: false,
    actionLabel: 'View Expenses',
    category: 'tips',
  },
  {
    id: 'biz-004',
    type: 'checkin',
    priority: 'medium',
    title: 'Check-in Open: UA456',
    message: 'Check in now for tomorrow\'s SFO→ORD flight. Seat 8C confirmed.',
    timestamp: daysAgo(1),
    isRead: true,
    actionLabel: 'Check In',
    flightId: 'UA456',
    category: 'flights',
  },
  {
    id: 'biz-005',
    type: 'tip',
    priority: 'medium',
    title: 'Meeting Conflicts with Boarding',
    message: 'Your 6:45 AM standup overlaps with UA456 boarding at 6:50 AM. Consider joining from the gate.',
    timestamp: daysAgo(1),
    isRead: false,
    actionLabel: 'View Calendar',
    category: 'tips',
  },
  {
    id: 'biz-006',
    type: 'loyalty',
    priority: 'low',
    title: 'Corporate Upgrade Available',
    message: 'Economy Plus upgrade on UA456 for $89. Policy-compliant.',
    timestamp: daysAgo(2),
    isRead: true,
    actionLabel: 'View Upgrade',
    category: 'loyalty',
  },
  {
    id: 'biz-007',
    type: 'tip',
    priority: 'low',
    title: 'United Club Wi-Fi Tip',
    message: 'SFO Terminal 3 United Club: 280 Mbps avg. Best for video calls.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'biz-008',
    type: 'tip',
    priority: 'low',
    title: 'TSA PreCheck Reminder',
    message: 'Your PreCheck is linked. Use the dedicated lane at SFO T3.',
    timestamp: daysAgo(3),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'biz-009',
    type: 'tip',
    priority: 'low',
    title: 'Itinerary Shared with EA',
    message: 'Chicago trip details sent to jessica.allen@venturecapital.com',
    timestamp: daysAgo(3),
    isRead: true,
    category: 'updates',
  },
  {
    id: 'biz-010',
    type: 'loyalty',
    priority: 'low',
    title: 'Platinum Status: 82,300 / 100,000',
    message: 'You\'re 17,700 miles from 1K status. Chicago trip adds ~1,800.',
    timestamp: daysAgo(4),
    isRead: true,
    actionLabel: 'View Progress',
    category: 'loyalty',
  },
];

const familyNotifications: AppNotification[] = [
  {
    id: 'fam-001',
    type: 'checkin',
    priority: 'high',
    title: 'Family Check-in: All 4 Passengers',
    message: 'HA11 LAX→HNL check-in opens in 2 days. Check in all 4 travelers at once.',
    timestamp: hoursAgo(1),
    isRead: false,
    actionLabel: 'Set Reminder',
    flightId: 'HA11',
    category: 'flights',
  },
  {
    id: 'fam-002',
    type: 'family',
    priority: 'medium',
    title: 'Kids Meals Confirmed',
    message: 'Sophie: Chicken Nuggets. Lucas: Mac & Cheese. Confirmed for HA11.',
    timestamp: daysAgo(1),
    isRead: true,
    flightId: 'HA11',
    category: 'updates',
  },
  {
    id: 'fam-003',
    type: 'family',
    priority: 'medium',
    title: 'Seats Confirmed: Row 24A-D',
    message: 'Family seating block confirmed. Window + middle for parents, aisle side for kids.',
    timestamp: daysAgo(1),
    isRead: true,
    flightId: 'HA11',
    category: 'flights',
  },
  {
    id: 'fam-004',
    type: 'tip',
    priority: 'medium',
    title: 'Packing Checklist: 60% Complete',
    message: '7 of 12 items checked. Don\'t forget sunscreen and swim floaties for Lucas.',
    timestamp: daysAgo(1),
    isRead: false,
    actionLabel: 'View Checklist',
    category: 'tips',
  },
  {
    id: 'fam-005',
    type: 'tip',
    priority: 'low',
    title: 'Honolulu Weather: 82\u00b0F & Sunny',
    message: 'Perfect beach weather all week. UV index high — pack SPF 50+.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-006',
    type: 'tip',
    priority: 'low',
    title: 'Travel Insurance Active',
    message: 'Family coverage confirmed for all 4 travelers. Policy #TI-889234.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'updates',
  },
  {
    id: 'fam-007',
    type: 'boarding',
    priority: 'low',
    title: 'Early Boarding Eligible',
    message: 'Families with children under 6 board after Group A. Lucas (age 5) qualifies.',
    timestamp: daysAgo(3),
    isRead: true,
    flightId: 'HA11',
    category: 'flights',
  },
  {
    id: 'fam-008',
    type: 'tip',
    priority: 'low',
    title: 'Car Seat Rental Reminder',
    message: 'Keiki Car Seat Rentals delivers to Hilton Hawaiian Village. Reserve now.',
    timestamp: daysAgo(3),
    isRead: false,
    actionLabel: 'View Options',
    category: 'tips',
  },
  {
    id: 'fam-009',
    type: 'tip',
    priority: 'low',
    title: 'Kid Activity Pack Available',
    message: 'Download coloring pages & travel games for Sophie and Lucas.',
    timestamp: daysAgo(4),
    isRead: true,
    actionLabel: 'Download',
    category: 'tips',
  },
  {
    id: 'fam-010',
    type: 'tip',
    priority: 'low',
    title: 'Hotel Check-in Instructions',
    message: 'Hilton Hawaiian Village: Check-in 3 PM. Early check-in available from 1 PM for $25.',
    timestamp: daysAgo(4),
    isRead: true,
    category: 'updates',
  },
];

export function getNotificationsForPersona(
  persona: PersonaType,
): AppNotification[] {
  switch (persona) {
    case 'premium':
      return premiumNotifications;
    case 'business':
      return businessNotifications;
    case 'family':
      return familyNotifications;
    default:
      return premiumNotifications;
  }
}
