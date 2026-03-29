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
    return 'bg-primary-500 text-white dark:bg-[oklch(55%_0.194_262)] border-primary-500 dark:border-[oklch(55%_0.194_262)]';
  }
  if (!seat.available) {
    return 'bg-surface-200 dark:bg-[oklch(25%_0.003_50)] text-surface-400 dark:text-[oklch(40%_0.005_50)] cursor-not-allowed border-surface-200 dark:border-[oklch(25%_0.003_50)]';
  }
  if (seat.category === 'extra-legroom' || seat.category === 'exit-row') {
    return 'bg-secondary-50 dark:bg-[oklch(22%_0.02_155)] text-secondary-700 dark:text-[oklch(75%_0.1_155)] border-secondary-300 dark:border-[oklch(40%_0.08_155)] hover:bg-secondary-100 dark:hover:bg-[oklch(28%_0.03_155)]';
  }
  if (seat.familyFriendly) {
    return 'bg-info-50 dark:bg-[oklch(22%_0.02_240)] text-info-700 dark:text-[oklch(75%_0.08_240)] border-info-200 dark:border-[oklch(35%_0.05_240)] hover:bg-info-100 dark:hover:bg-[oklch(28%_0.03_240)]';
  }
  return 'bg-background dark:bg-[oklch(20%_0.003_50)] text-primary-700 dark:text-[oklch(80%_0.005_50)] border-surface-300 dark:border-[oklch(32%_0.008_50)] hover:bg-primary-50 dark:hover:bg-[oklch(25%_0.01_262)]';
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
        <h3 className="text-xs font-medium text-primary-700 dark:text-[oklch(80%_0.005_50)] uppercase tracking-wider">
          Select {maxSelections > 1 ? `${maxSelections} Seats` : 'Your Seat'}
        </h3>
        <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)]">
          {selectedSeats.length}/{maxSelections} selected
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border border-surface-300 dark:border-[oklch(32%_0.008_50)] bg-background dark:bg-[oklch(20%_0.003_50)]" />
          <span className="text-[11px] text-primary-500 dark:text-[oklch(60%_0.005_50)]">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-primary-500 dark:bg-[oklch(55%_0.194_262)]" />
          <span className="text-[11px] text-primary-500 dark:text-[oklch(60%_0.005_50)]">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-surface-200 dark:bg-[oklch(25%_0.003_50)]" />
          <span className="text-[11px] text-primary-500 dark:text-[oklch(60%_0.005_50)]">Taken</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border border-secondary-300 dark:border-[oklch(40%_0.08_155)] bg-secondary-50 dark:bg-[oklch(22%_0.02_155)]" />
          <span className="text-[11px] text-primary-500 dark:text-[oklch(60%_0.005_50)]">Extra legroom +$50</span>
        </div>
        {persona === 'family' && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-info-200 dark:border-[oklch(35%_0.05_240)] bg-info-50 dark:bg-[oklch(22%_0.02_240)]" />
            <span className="text-[11px] text-primary-500 dark:text-[oklch(60%_0.005_50)]">Family friendly</span>
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
              <div key={col} className="text-center text-[10px] font-medium text-primary-400 dark:text-[oklch(50%_0.005_50)]">
                {col}
              </div>
            ))}
            <div /> {/* Aisle */}
            {COLUMNS.slice(3).map((col) => (
              <div key={col} className="text-center text-[10px] font-medium text-primary-400 dark:text-[oklch(50%_0.005_50)]">
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
              <div className="flex items-center justify-center text-[10px] text-primary-400 dark:text-[oklch(50%_0.005_50)] tabular-nums">
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
                <div className="w-px h-full bg-surface-200 dark:bg-[oklch(25%_0.005_50)]" />
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
