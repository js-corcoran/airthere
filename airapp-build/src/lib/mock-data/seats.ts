import { SeatInfo, FareBundle } from '@/lib/types/flight';

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function generateSeats(rows: number = 30): SeatInfo[] {
  const seats: SeatInfo[] = [];
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let row = 1; row <= rows; row++) {
    for (const col of COLUMNS) {
      const isWindow = col === 'A' || col === 'F';
      const isAisle = col === 'C' || col === 'D';
      const isExitRow = row === 12 || row === 25;
      const isExtraLegroom = row <= 4 || isExitRow;

      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        type: isWindow ? 'window' : isAisle ? 'aisle' : 'middle',
        available: pseudoRandom() > 0.22,
        price: isExtraLegroom ? 50 : 0,
        category: isExitRow ? 'exit-row' : isExtraLegroom ? 'extra-legroom' : 'standard',
        familyFriendly: row >= 15 && row <= 22,
      });
    }
  }

  return seats;
}

export const FARE_BUNDLES: FareBundle[] = [
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 0,
    features: ['Personal item', 'Standard seat'],
    includes: {
      baggage: 'Personal item only',
      seatSelection: false,
      changes: 'Not allowed',
      cancellation: 'Non-refundable',
      meals: false,
      loungeAccess: false,
      priorityBoarding: false,
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'standard',
    price: 75,
    features: ['Carry-on bag', 'Seat selection', 'Free changes'],
    includes: {
      baggage: 'Carry-on + personal item',
      seatSelection: true,
      changes: 'Free changes',
      cancellation: 'Cancel for credit',
      meals: false,
      loungeAccess: false,
      priorityBoarding: false,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 195,
    features: ['2 checked bags', 'Priority boarding', 'Meals', 'Lounge access'],
    includes: {
      baggage: '2 checked bags + carry-on',
      seatSelection: true,
      changes: 'Free changes',
      cancellation: 'Full refund',
      meals: true,
      loungeAccess: true,
      priorityBoarding: true,
    },
  },
];
