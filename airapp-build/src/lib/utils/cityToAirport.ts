import { AIRPORT_LIST } from '@/lib/constants/airports';

/**
 * Resolve a city name or airport code to a valid airport code.
 * Checks exact airport code first, then fuzzy city name match.
 */
export function cityToAirportCode(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  const upper = trimmed.toUpperCase();

  // Direct airport code match
  const byCode = AIRPORT_LIST.find((a) => a.code === upper);
  if (byCode) return byCode.code;

  // City name match (case-insensitive)
  const lower = trimmed.toLowerCase();
  const byCity = AIRPORT_LIST.find((a) => a.city.toLowerCase() === lower);
  if (byCity) return byCity.code;

  // Partial city match
  const byPartial = AIRPORT_LIST.find((a) => a.city.toLowerCase().includes(lower));
  if (byPartial) return byPartial.code;

  return '';
}
