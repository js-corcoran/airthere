'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { AIRPORT_LIST, POPULAR_ROUTES } from '@/lib/constants/airports';
import { MapPin, Clock, X } from 'lucide-react';
import { Airport } from '@/lib/types/flight';

interface AirportSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
  placeholder: string;
  excludeAirport?: string;
}

export function AirportSelector({ value, onChange, label, placeholder, excludeAirport }: AirportSelectorProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<Airport[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedAirport = AIRPORT_LIST.find((a) => a.code === value);

  useEffect(() => {
    if (query.length > 0) {
      const q = query.toLowerCase();
      const results = AIRPORT_LIST.filter(
        (a) =>
          a.code !== excludeAirport &&
          (a.code.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q))
      ).slice(0, 8);
      setFiltered(results);
    } else {
      setFiltered(
        AIRPORT_LIST.filter((a) => a.code !== excludeAirport).slice(0, 6)
      );
    }
  }, [query, excludeAirport]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(airport.code);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-medium text-primary-700 dark:text-muted-foreground mb-1.5 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? query : selectedAirport ? `${selectedAirport.code} — ${selectedAirport.city}` : ''}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            if (selectedAirport) setQuery('');
          }}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-label={label}
          aria-autocomplete="list"
          className={cn(
            'w-full px-4 py-3 pr-10 border rounded-md text-base bg-background',
            'transition-colors duration-[--duration-short]',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'dark:bg-card dark:text-foreground',
            'border-surface-300 dark:border-muted',
            'min-h-[var(--touch-preferred)]',
            'placeholder:text-primary-400 dark:placeholder:text-faint-foreground'
          )}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                       hover:bg-surface-200 dark:hover:bg-input
                       transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
            aria-label="Clear selection"
          >
            <X className="w-4 h-4 text-primary-400" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-surface dark:bg-card
                      border border-surface-300 dark:border-muted
                      rounded-lg shadow-lg max-h-64 overflow-y-auto"
          role="listbox"
        >
          {query.length === 0 && (
            <div className="px-3 py-2 text-xs font-medium text-primary-400 dark:text-faint-foreground uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" /> Popular airports
            </div>
          )}
          {filtered.length > 0 ? (
            filtered.map((airport) => (
              <button
                key={airport.code}
                onClick={() => handleSelect(airport)}
                role="option"
                aria-selected={value === airport.code}
                className={cn(
                  'w-full px-3 py-3 flex items-center gap-3 text-left',
                  'hover:bg-primary-50 dark:hover:bg-input',
                  'transition-colors duration-[--duration-micro]',
                  'focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-500',
                  'min-h-[var(--touch-min)]',
                  value === airport.code && 'bg-primary-50 dark:bg-primary-900'
                )}
              >
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-primary-900 dark:text-foreground">
                    {airport.code}
                  </span>
                  <span className="text-sm text-primary-600 dark:text-soft-foreground ml-2">
                    {airport.city}, {airport.country}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-primary-500 dark:text-caption-foreground text-center">
              No airports found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
