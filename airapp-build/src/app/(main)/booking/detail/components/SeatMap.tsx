'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { SeatInfo } from '@/lib/types/flight';

interface SeatMapProps {
  seats: SeatInfo[];
  maxSelections: number;
  selectedSeats: string[];
  onSelectionChange: (seats: string[]) => void;
  persona?: string;
}

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];

function getSeatColor(seat: SeatInfo, isSelected: boolean): string {
  if (isSelected) {
    return 'bg-primary-500 text-white dark:bg-primary-500 border-primary-500 dark:border-primary-500';
  }
  if (!seat.available) {
    return 'bg-surface-200 dark:bg-input text-surface-400 dark:text-faint-foreground cursor-not-allowed border-surface-200 dark:border-input';
  }
  if (seat.category === 'extra-legroom' || seat.category === 'exit-row') {
    return 'bg-secondary-50 dark:bg-surface-success text-secondary-700 dark:text-success-300 border-secondary-300 dark:border-success hover:bg-secondary-100 dark:hover:bg-surface-success';
  }
  if (seat.familyFriendly) {
    return 'bg-info-50 dark:bg-surface-info text-info-700 dark:text-info-300 border-info-200 dark:border-info hover:bg-info-100 dark:hover:bg-surface-info';
  }
  return 'bg-background dark:bg-surface-100 text-primary-700 dark:text-soft-foreground border-surface-300 dark:border-muted hover:bg-primary-50 dark:hover:bg-surface-primary';
}

export function SeatMap({ seats, maxSelections, selectedSeats, onSelectionChange, persona }: SeatMapProps) {
  const rows = Math.max(...seats.map((s) => s.row));

  const handleSeatClick = (seat: SeatInfo) => {
    if (!seat.available) return;

    if (selectedSeats.includes(seat.id)) {
      onSelectionChange(selectedSeats.filter((id) => id !== seat.id));
    } else if (selectedSeats.length < maxSelections) {
      onSelectionChange([...selectedSeats, seat.id]);
    }
  };

  const getSeat = (row: number, col: string): SeatInfo | undefined => {
    return seats.find((s) => s.row === row && s.column === col);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-primary-700 dark:text-soft-foreground uppercase tracking-wider">
          Select {maxSelections > 1 ? `${maxSelections} Seats` : 'Your Seat'}
        </h3>
        <p className="text-xs text-primary-500 dark:text-faint-foreground">
          {selectedSeats.length}/{maxSelections} selected
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border border-surface-300 dark:border-muted bg-background dark:bg-surface-100" />
          <span className="text-[11px] text-primary-500 dark:text-faint-foreground">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-primary-500 dark:bg-primary-500" />
          <span className="text-[11px] text-primary-500 dark:text-faint-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-surface-200 dark:bg-input" />
          <span className="text-[11px] text-primary-500 dark:text-faint-foreground">Taken</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border border-secondary-300 dark:border-success bg-secondary-50 dark:bg-surface-success" />
          <span className="text-[11px] text-primary-500 dark:text-faint-foreground">Extra legroom +$50</span>
        </div>
        {persona === 'family' && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-info-200 dark:border-info bg-info-50 dark:bg-surface-info" />
            <span className="text-[11px] text-primary-500 dark:text-faint-foreground">Family friendly</span>
          </div>
        )}
      </div>

      {/* Seat Grid */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="min-w-[280px] max-w-[360px] mx-auto" role="grid" aria-label="Aircraft cabin seating">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_repeat(3,_minmax(0,_1fr))_0.6fr_repeat(3,_minmax(0,_1fr))] gap-1 mb-2">
            <div />
            {COLUMNS.slice(0, 3).map((col) => (
              <div key={col} className="text-center text-[10px] font-medium text-primary-400 dark:text-faint-foreground">
                {col}
              </div>
            ))}
            <div /> {/* Aisle */}
            {COLUMNS.slice(3).map((col) => (
              <div key={col} className="text-center text-[10px] font-medium text-primary-400 dark:text-faint-foreground">
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: rows }, (_, i) => i + 1).map((rowNum) => (
            <div
              key={rowNum}
              className="grid grid-cols-[1fr_repeat(3,_minmax(0,_1fr))_0.6fr_repeat(3,_minmax(0,_1fr))] gap-1 mb-1"
              role="row"
            >
              <div className="flex items-center justify-center text-[10px] text-primary-400 dark:text-faint-foreground tabular-nums">
                {rowNum}
              </div>
              {COLUMNS.slice(0, 3).map((col) => {
                const seat = getSeat(rowNum, col);
                if (!seat) return <div key={col} />;
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={col}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.available}
                    role="gridcell"
                    aria-label={`Seat ${seat.id}, ${seat.available ? (isSelected ? 'selected' : 'available') : 'unavailable'}${seat.price > 0 ? `, +$${seat.price}` : ''}`}
                    className={cn(
                      'aspect-square rounded-sm border text-[10px] font-medium flex items-center justify-center',
                      'transition-all duration-[--duration-micro]',
                      'focus-visible:outline-2 focus-visible:outline-primary-500',
                      getSeatColor(seat, isSelected)
                    )}
                  >
                    {isSelected ? '✓' : ''}
                  </button>
                );
              })}
              <div className="flex items-center justify-center">
                <div className="w-px h-full bg-surface-200 dark:bg-input" />
              </div>
              {COLUMNS.slice(3).map((col) => {
                const seat = getSeat(rowNum, col);
                if (!seat) return <div key={col} />;
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={col}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.available}
                    role="gridcell"
                    aria-label={`Seat ${seat.id}, ${seat.available ? (isSelected ? 'selected' : 'available') : 'unavailable'}${seat.price > 0 ? `, +$${seat.price}` : ''}`}
                    className={cn(
                      'aspect-square rounded-sm border text-[10px] font-medium flex items-center justify-center',
                      'transition-all duration-[--duration-micro]',
                      'focus-visible:outline-2 focus-visible:outline-primary-500',
                      getSeatColor(seat, isSelected)
                    )}
                  >
                    {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
