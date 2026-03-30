'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Clock, ArrowRight, X } from 'lucide-react';
import { CabinClass } from '@/lib/types/user';
import { PassengerCount } from '@/lib/types/flight';

export interface RecentSearch {
  id: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: PassengerCount;
  cabinClass: CabinClass;
  tripType: 'round-trip' | 'one-way' | 'multi-city';
  timestamp: number;
}

const STORAGE_KEY = 'flightSearchHistory';
const MAX_RECENT = 5;

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentSearch[];
  } catch {
    return [];
  }
}

export function saveSearch(search: Omit<RecentSearch, 'id' | 'timestamp'>): void {
  const existing = getRecentSearches();
  const newEntry: RecentSearch = {
    ...search,
    id: `${search.from}-${search.to}-${Date.now()}`,
    timestamp: Date.now(),
  };
  // Remove duplicate routes
  const filtered = existing.filter(
    (s) => !(s.from === search.from && s.to === search.to)
  );
  const updated = [newEntry, ...filtered].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

interface RecentSearchesProps {
  onSelect: (search: RecentSearch) => void;
}

export function RecentSearches({ onSelect }: RecentSearchesProps) {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setSearches(getRecentSearches());
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearches([]);
  };

  if (searches.length === 0) return null;

  return (
    <section aria-labelledby="recent-searches-heading">
      <div className="flex items-center justify-between mb-2">
        <h3
          id="recent-searches-heading"
          className="text-xs font-medium text-primary-500 dark:text-[oklch(65%_0.005_50)] uppercase tracking-wider flex items-center gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          Recent Searches
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-primary-400 dark:text-[oklch(55%_0.005_50)] hover:text-primary-600 transition-colors
                     min-h-[var(--touch-min)] flex items-center"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {searches.map((search, index) => {
          const total = search.passengers.adults + search.passengers.children + search.passengers.infants;
          return (
            <button
              key={search.id}
              style={{ animationDelay: `${index * 60}ms` }}
              onClick={() => onSelect(search)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                'bg-surface-50 dark:bg-[oklch(18%_0.003_50)]',
                'border border-surface-200 dark:border-[oklch(28%_0.005_50)]',
                'hover:bg-surface-100 dark:hover:bg-[oklch(22%_0.003_50)]',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                  <span>{search.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                  <span>{search.to}</span>
                </div>
                <p className="text-xs text-primary-500 dark:text-[oklch(65%_0.005_50)] mt-0.5">
                  {search.departDate} · {total} pax · {search.cabinClass}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
