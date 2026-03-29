import { Flight, FlightStatus } from './flight';

export interface Trip {
  id: string;
  name: string;
  status: TripStatus;
  departure: {
    airport: string;
    city: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    date: string;
  };
  flights: TripFlight[];
  passengers: TripPassenger[];
  hotel?: HotelBooking;
  totalCost: number;
  currency: string;
  confirmationNumber: string;
  createdAt: string;
}

export interface TripFlight {
  id: string;
  flight: Flight;
  status: FlightStatus;
  seat?: string;
  checkedIn: boolean;
  boardingPass?: string;
  baggageTag?: string;
}

export interface TripPassenger {
  id: string;
  name: string;
  type: 'adult' | 'child' | 'infant';
  seat?: string;
  meal?: string;
  specialAssistance?: string;
}

export interface HotelBooking {
  name: string;
  city: string;
  checkIn: string;
  checkOut: string;
  confirmationNumber: string;
}

export type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled' | 'disrupted';

export interface BookingInput {
  flightId: string;
  passengers: TripPassenger[];
  cabinClass: string;
  fareBundle: string;
  seatSelections: Record<string, string>;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: string;
  tripProtection: boolean;
  totalAmount: number;
}

export interface BookingConfirmation {
  confirmationNumber: string;
  bookingReference: string;
  status: 'confirmed' | 'pending' | 'failed';
  flight: Flight;
  passengers: TripPassenger[];
  totalPaid: number;
  currency: string;
  receiptUrl: string;
}
