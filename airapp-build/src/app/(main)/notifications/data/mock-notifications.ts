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
    type: 'gate_change',
    priority: 'critical',
    title: 'Gate Change — BA 178',
    message:
      'Your departure gate has moved from A12 to B7. Updated boarding pass available.',
    timestamp: minutesAgo(2),
    isRead: false,
    actionUrl: '/trips/ba178',
    actionLabel: 'View Gate',
    tripId: 'trip-prem-1',
    flightId: 'BA178',
    category: 'flights',
  },
  {
    id: 'prem-002',
    type: 'checkin',
    priority: 'high',
    title: 'Check-in Opens in 24h',
    message:
      'Online check-in for BA 178 to London Heathrow opens tomorrow at 09:15.',
    timestamp: minutesAgo(45),
    isRead: false,
    actionUrl: '/trips/ba178/checkin',
    actionLabel: 'Check In Now',
    tripId: 'trip-prem-1',
    flightId: 'BA178',
    category: 'flights',
  },
  {
    id: 'prem-003',
    type: 'tip',
    priority: 'medium',
    title: 'First Class Lounge Now Open',
    message:
      'The Concorde Room at Terminal 5 is now open. Present your boarding pass for complimentary access.',
    timestamp: hoursAgo(1),
    isRead: false,
    category: 'tips',
  },
  {
    id: 'prem-004',
    type: 'loyalty',
    priority: 'low',
    title: '12,000 Avios Posted',
    message:
      'Your Executive Club account has been credited with 12,000 Avios from your recent JFK–LHR flight.',
    timestamp: hoursAgo(3),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'prem-005',
    type: 'boarding',
    priority: 'low',
    title: 'Priority Boarding Enabled',
    message:
      'As a Gold Executive Club member, you have priority boarding access for BA 178.',
    timestamp: hoursAgo(5),
    isRead: true,
    category: 'flights',
  },
  {
    id: 'prem-006',
    type: 'tip',
    priority: 'low',
    title: 'Chauffeur Service Confirmed',
    message:
      'Your complimentary chauffeur transfer from Heathrow to your London hotel is confirmed for arrival.',
    timestamp: hoursAgo(8),
    isRead: true,
    category: 'updates',
  },
  {
    id: 'prem-007',
    type: 'tip',
    priority: 'medium',
    title: 'Spa Appointment Available',
    message:
      'A 30-minute treatment slot has opened at the Elemis Spa in T5. Would you like to reserve?',
    timestamp: daysAgo(1),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'prem-008',
    type: 'loyalty',
    priority: 'low',
    title: 'Tier Status Renewal',
    message:
      'You need 5,600 more tier points to retain Gold status. Your renewal date is in 4 months.',
    timestamp: daysAgo(1),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'prem-009',
    type: 'price_drop',
    priority: 'medium',
    title: 'First Class Fare Drop — LHR to CDG',
    message:
      'First class fares on your watched London–Paris route dropped 18%. Save up to £340.',
    timestamp: daysAgo(1),
    isRead: false,
    actionUrl: '/search?route=lhr-cdg',
    actionLabel: 'View Details',
    category: 'tips',
  },
  {
    id: 'prem-010',
    type: 'tip',
    priority: 'low',
    title: 'Sleep Well at 38,000ft',
    message:
      'Your first class suite includes Temperley London pyjamas and White Company bedding. Cabin crew will make up your bed after dinner.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'prem-011',
    type: 'loyalty',
    priority: 'low',
    title: 'Partner Offer: The Savoy',
    message:
      'Earn triple Avios on your next stay at The Savoy London. Offer valid through April.',
    timestamp: daysAgo(3),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'prem-012',
    type: 'tip',
    priority: 'low',
    title: 'Dining Pre-Order Open',
    message:
      'Pre-select your first class dining choices for BA 178. Menu features seasonal British fare.',
    timestamp: daysAgo(3),
    isRead: true,
    actionUrl: '/trips/ba178/dining',
    actionLabel: 'View Menu',
    category: 'updates',
  },
];

const businessNotifications: AppNotification[] = [
  {
    id: 'biz-001',
    type: 'delay',
    priority: 'critical',
    title: 'Flight UA 901 Delayed 45 min',
    message:
      'Your SFO–ORD flight is now departing at 14:45 due to air traffic control delays. New arrival 20:30 CDT.',
    timestamp: minutesAgo(5),
    isRead: false,
    actionUrl: '/trips/ua901',
    actionLabel: 'View Details',
    tripId: 'trip-biz-1',
    flightId: 'UA901',
    category: 'flights',
  },
  {
    id: 'biz-002',
    type: 'gate_change',
    priority: 'critical',
    title: 'Gate Changed — C15 to D12',
    message:
      'UA 901 has been reassigned from Gate C15 to Gate D12. Estimated walk time: 8 minutes.',
    timestamp: minutesAgo(12),
    isRead: false,
    actionUrl: '/trips/ua901',
    actionLabel: 'View Gate',
    tripId: 'trip-biz-1',
    flightId: 'UA901',
    category: 'flights',
  },
  {
    id: 'biz-003',
    type: 'checkin',
    priority: 'high',
    title: 'Check-in Reminder — UA 901',
    message:
      'Check-in is open for your 14:00 flight to Chicago O\'Hare. Check in now to secure your preferred seat.',
    timestamp: minutesAgo(30),
    isRead: false,
    actionUrl: '/trips/ua901/checkin',
    actionLabel: 'Check In Now',
    tripId: 'trip-biz-1',
    flightId: 'UA901',
    category: 'flights',
  },
  {
    id: 'biz-004',
    type: 'loyalty',
    priority: 'medium',
    title: '8,500 PQP Posted',
    message:
      'Your MileagePlus account has been credited with 8,500 Premier qualifying points from your LAX–NRT trip.',
    timestamp: hoursAgo(2),
    isRead: false,
    category: 'loyalty',
  },
  {
    id: 'biz-005',
    type: 'tip',
    priority: 'low',
    title: 'TSA PreCheck Lane Open',
    message:
      'TSA PreCheck lanes at SFO Terminal 3 are currently open with estimated wait time of 4 minutes.',
    timestamp: hoursAgo(3),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'biz-006',
    type: 'tip',
    priority: 'low',
    title: 'Policy Compliance: Trip Within Budget',
    message:
      'Your upcoming Chicago trip totals $1,245 — 12% under the per-trip policy limit.',
    timestamp: hoursAgo(6),
    isRead: true,
    category: 'updates',
  },
  {
    id: 'biz-007',
    type: 'tip',
    priority: 'low',
    title: 'Expense Report Ready',
    message:
      'Your March expense report with 3 trips is ready for download and submission.',
    timestamp: daysAgo(1),
    isRead: true,
    actionUrl: '/profile/expenses',
    actionLabel: 'View Report',
    category: 'updates',
  },
  {
    id: 'biz-008',
    type: 'boarding',
    priority: 'medium',
    title: 'Group 2 Boarding — UA 901',
    message:
      'Premier Gold members board in Group 2. Boarding begins approximately 30 minutes before departure.',
    timestamp: daysAgo(1),
    isRead: true,
    tripId: 'trip-biz-1',
    flightId: 'UA901',
    category: 'flights',
  },
  {
    id: 'biz-009',
    type: 'price_drop',
    priority: 'medium',
    title: 'Fare Alert: SFO–LHR Business',
    message:
      'Business class fares on SFO–LHR dropped 22% for May dates. Save up to $980 round trip.',
    timestamp: daysAgo(1),
    isRead: false,
    actionUrl: '/search?route=sfo-lhr',
    actionLabel: 'View Fares',
    category: 'tips',
  },
  {
    id: 'biz-010',
    type: 'loyalty',
    priority: 'low',
    title: '1K Status Progress',
    message:
      'You\'ve earned 62,400 of 75,000 PQP needed for 1K status. 12,600 PQP remaining.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'biz-011',
    type: 'tip',
    priority: 'low',
    title: 'United Club Access',
    message:
      'As a Premier Gold member, you have 2 remaining one-time United Club passes this year.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'biz-012',
    type: 'tip',
    priority: 'low',
    title: 'Upgrade Waitlist',
    message:
      'You\'re #3 on the complimentary upgrade waitlist for UA 901. Upgrades clear at the gate.',
    timestamp: daysAgo(3),
    isRead: true,
    tripId: 'trip-biz-1',
    flightId: 'UA901',
    category: 'flights',
  },
  {
    id: 'biz-013',
    type: 'tip',
    priority: 'low',
    title: 'Wi-Fi Pre-Purchase Discount',
    message:
      'Pre-purchase in-flight Wi-Fi for UA 901 and save 30%. Stay productive at 35,000 feet.',
    timestamp: daysAgo(3),
    isRead: true,
    actionUrl: '/trips/ua901/wifi',
    actionLabel: 'Buy Wi-Fi',
    category: 'updates',
  },
];

const familyNotifications: AppNotification[] = [
  {
    id: 'fam-001',
    type: 'checkin',
    priority: 'high',
    title: 'Family Check-in Available',
    message:
      'Check-in is open for all 4 passengers on SW 2847 to Orlando. Check in together to keep your seats.',
    timestamp: minutesAgo(8),
    isRead: false,
    actionUrl: '/trips/sw2847/checkin',
    actionLabel: 'Check In Now',
    tripId: 'trip-fam-1',
    flightId: 'SW2847',
    category: 'flights',
  },
  {
    id: 'fam-002',
    type: 'gate_change',
    priority: 'medium',
    title: 'Gate B22 Assigned',
    message:
      'SW 2847 is departing from Gate B22. It\'s about a 12-minute walk from security — plan extra time with the kids.',
    timestamp: minutesAgo(25),
    isRead: false,
    tripId: 'trip-fam-1',
    flightId: 'SW2847',
    category: 'flights',
  },
  {
    id: 'fam-003',
    type: 'boarding',
    priority: 'high',
    title: 'Family Boarding in 30 min',
    message:
      'Family boarding for SW 2847 begins at 10:15. Families with children under 6 board between Groups A and B.',
    timestamp: minutesAgo(40),
    isRead: false,
    actionUrl: '/trips/sw2847',
    actionLabel: 'View Details',
    tripId: 'trip-fam-1',
    flightId: 'SW2847',
    category: 'flights',
  },
  {
    id: 'fam-004',
    type: 'family',
    priority: 'medium',
    title: 'Seating Confirmed: Row 14 A–D',
    message:
      'Great news! Your family of 4 is seated together in Row 14, seats A through D.',
    timestamp: hoursAgo(1),
    isRead: false,
    tripId: 'trip-fam-1',
    flightId: 'SW2847',
    category: 'flights',
  },
  {
    id: 'fam-005',
    type: 'tip',
    priority: 'low',
    title: 'Kids\' Activity Kits at Gate',
    message:
      'Free activity kits with coloring books and crayons are available at the gate counter. Ask a team member!',
    timestamp: hoursAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-006',
    type: 'tip',
    priority: 'low',
    title: 'Weather at Orlando: 82\u00b0F, Sunny',
    message:
      'Orlando is expecting warm, sunny weather today. Don\'t forget sunscreen and hats for the kids!',
    timestamp: hoursAgo(4),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-007',
    type: 'tip',
    priority: 'low',
    title: 'Pack Snacks for the Kids',
    message:
      'Southwest offers complimentary snacks, but bringing familiar favorites can help keep little ones happy during the flight.',
    timestamp: hoursAgo(6),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-008',
    type: 'family',
    priority: 'medium',
    title: 'Family Restroom Near Gate',
    message:
      'There\'s a family restroom with changing station near Gate B20 — just 2 gates from your departure.',
    timestamp: daysAgo(1),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-009',
    type: 'loyalty',
    priority: 'low',
    title: '4,200 Rapid Rewards Points',
    message:
      'Your Rapid Rewards account was credited with 4,200 points from your last round trip.',
    timestamp: daysAgo(1),
    isRead: true,
    category: 'loyalty',
  },
  {
    id: 'fam-010',
    type: 'tip',
    priority: 'low',
    title: 'Kids Fly Free Promo',
    message:
      'Companion Pass holders: children under 11 earn bonus points this month. Check the details.',
    timestamp: daysAgo(1),
    isRead: false,
    actionUrl: '/loyalty/promos',
    actionLabel: 'View Details',
    category: 'loyalty',
  },
  {
    id: 'fam-011',
    type: 'tip',
    priority: 'medium',
    title: 'Play Area Near Gate B',
    message:
      'There\'s a children\'s play area near Gate B15 — a great way to burn energy before boarding.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'tips',
  },
  {
    id: 'fam-012',
    type: 'family',
    priority: 'low',
    title: 'Car Seat Policy Reminder',
    message:
      'FAA-approved car seats are welcome on board. Southwest does not charge for checking car seats or strollers.',
    timestamp: daysAgo(2),
    isRead: true,
    category: 'updates',
  },
  {
    id: 'fam-013',
    type: 'price_drop',
    priority: 'medium',
    title: 'Summer Fares to San Diego',
    message:
      'Family-friendly fares to San Diego dropped 15% for July. A great beach trip with the kids!',
    timestamp: daysAgo(3),
    isRead: true,
    actionUrl: '/search?route=mco-san',
    actionLabel: 'View Fares',
    category: 'tips',
  },
  {
    id: 'fam-014',
    type: 'tip',
    priority: 'low',
    title: 'Download Entertainment',
    message:
      'Download movies and shows to your devices before the flight. Southwest offers free in-flight Wi-Fi for streaming.',
    timestamp: daysAgo(3),
    isRead: true,
    category: 'tips',
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
