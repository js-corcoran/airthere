'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  Navigation,
  MapPin,
  Coffee,
  ShoppingBag,
  Shield,
  Armchair,
  Bath,
  ChevronRight,
  Footprints,
  Clock,
} from 'lucide-react';
import { WayfindingDestination } from '../types';

interface WayfindingSectionProps {
  destinations: WayfindingDestination[];
  gateNumber: string;
}

const typeConfig: Record<string, { icon: typeof MapPin; label: string; color: string }> = {
  gate: { icon: MapPin, label: 'Gates', color: 'text-primary-500 dark:text-primary-400' },
  lounge: { icon: Armchair, label: 'Lounges', color: 'text-secondary-500 dark:text-secondary-500' },
  restroom: { icon: Bath, label: 'Restrooms', color: 'text-info-500 dark:text-info-500' },
  food: { icon: Coffee, label: 'Food & Drink', color: 'text-warning-600 dark:text-warning-600' },
  shop: { icon: ShoppingBag, label: 'Shops', color: 'text-success-500 dark:text-success-500' },
  security: { icon: Shield, label: 'Security', color: 'text-error-500 dark:text-error-500' },
};

function AirportMapVisualization({
  destinations,
  selectedId,
  onSelect,
}: {
  destinations: WayfindingDestination[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="relative w-full h-64 rounded-xl overflow-hidden
                 bg-gradient-to-br from-primary-50 to-surface-200
                 dark:from-surface-primary dark:to-surface-elevated
                 border border-surface-300 dark:border-muted"
      role="img"
      aria-label="Airport terminal map showing points of interest"
    >
      {/* Terminal shape */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Terminal outline */}
        <path
          d="M10,70 L10,40 Q10,20 30,20 L70,20 Q90,20 90,40 L90,70 Q90,80 80,80 L20,80 Q10,80 10,70"
          fill="none"
          stroke="oklch(85% 0.030 262)"
          strokeWidth="0.5"
          className="dark:stroke-primary"
        />
        {/* Concourse lines */}
        <line x1="50" y1="20" x2="50" y2="80" stroke="oklch(91% 0.005 50)" strokeWidth="0.3" className="dark:stroke-input" />
        <line x1="30" y1="50" x2="70" y2="50" stroke="oklch(91% 0.005 50)" strokeWidth="0.3" className="dark:stroke-input" />

        {/* User location */}
        <circle cx="25" cy="60" r="3" fill="oklch(57.5% 0.194 262)" className="animate-pulse" />
        <circle cx="25" cy="60" r="6" fill="oklch(57.5% 0.194 262)" opacity="0.2" className="animate-pulse" />

        {/* Destination pins */}
        {destinations.map((dest) => {
          const isSelected = selectedId === dest.id;
          return (
            <g key={dest.id}>
              {isSelected && (
                <line
                  x1="25" y1="60"
                  x2={dest.coordinates.x} y2={dest.coordinates.y}
                  stroke="oklch(64% 0.158 50)"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                  className="dark:stroke-secondary-400"
                />
              )}
              <circle
                cx={dest.coordinates.x}
                cy={dest.coordinates.y}
                r={isSelected ? 4 : 2.5}
                fill={isSelected ? 'oklch(64% 0.158 50)' : 'oklch(68% 0.125 262)'}
                className={cn('cursor-pointer', isSelected && 'animate-pulse')}
                onClick={() => onSelect(dest.id)}
              />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex items-center gap-3 text-[10px] text-primary-600 dark:text-soft-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" /> You
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary-500" /> Selected
        </span>
      </div>
    </div>
  );
}

export function WayfindingSection({ destinations, gateNumber }: WayfindingSectionProps) {
  const [selectedDest, setSelectedDest] = useState<string | null>('way-gate');
  const selected = destinations.find((d) => d.id === selectedDest);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-primary-900 dark:text-foreground">
          Airport Navigation
        </h2>
        <p className="text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
          Find your way around the terminal
        </p>
      </div>

      {/* Map visualization */}
      <AirportMapVisualization
        destinations={destinations}
        selectedId={selectedDest}
        onSelect={setSelectedDest}
      />

      {/* Selected destination info */}
      {selected && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary-50 dark:bg-surface-100 border border-secondary-200 dark:border-muted">
          <Navigation className="w-5 h-5 text-secondary-500 dark:text-secondary-500" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary-900 dark:text-foreground">
              {selected.name}
            </p>
            <div className="flex items-center gap-3 text-xs text-primary-500 dark:text-caption-foreground mt-0.5">
              <span className="flex items-center gap-1">
                <Footprints className="w-3 h-3" aria-hidden="true" />
                {selected.distanceMeters}m
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {selected.walkingTimeMinutes} min walk
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Destination list */}
      <div className="space-y-1">
        {destinations.map((dest, i) => {
          const config = typeConfig[dest.type];
          const Icon = config.icon;
          const isSelected = selectedDest === dest.id;

          return (
            <button
              key={dest.id}
              onClick={() => setSelectedDest(dest.id)}
              style={{ animationDelay: `${i * 60}ms` }}
              className={cn(
                'w-full flex items-center gap-3 py-2.5 px-3 rounded-md text-left',
                'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]',
                isSelected
                  ? 'bg-primary-50 dark:bg-surface-primary'
                  : 'hover:bg-surface-200 dark:hover:bg-input'
              )}
              aria-pressed={isSelected}
              aria-label={`Navigate to ${dest.name}, ${dest.walkingTimeMinutes} minute walk`}
            >
              <Icon className={cn('w-5 h-5 shrink-0', config.color)} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-900 dark:text-foreground truncate">
                  {dest.name}
                </p>
                <p className="text-xs text-primary-500 dark:text-caption-foreground">
                  {dest.distanceMeters}m · {dest.walkingTimeMinutes} min walk
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary-300 dark:text-faint-foreground shrink-0" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
