export const ROUTES = {
  ONBOARDING: '/onboarding',
  LOGIN: '/login',
  HOME: '/home',
  DISCOVER: '/discover',
  SEARCH: '/search',
  SEARCH_RESULTS: '/search/results',
  BOOKING_DETAIL: '/booking/detail',
  BOOKING_CHECKOUT: '/booking/checkout',
  TRIPS: '/trips',
  TRIP_DETAIL: (tripId: string) => `/trips/${tripId}`,
  PROFILE: '/profile',
} as const;
