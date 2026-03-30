'use client';

import { useState } from 'react';
import { Building2, Wifi, Coffee, Car, Dumbbell, Waves, Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { HotelVoucherOption } from '@/lib/types/disruption';

interface HotelVoucherProps {
  voucherValue: number;
  checkIn: string;
  checkOut: string;
  options: HotelVoucherOption[];
  onSelect: (hotelId: string) => void;
}

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Breakfast: Coffee,
  'Airport Shuttle': Car,
  'Fitness Center': Dumbbell,
  Pool: Waves,
  Restaurant: Coffee,
  'Business Center': Building2,
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function HotelVoucher({ voucherValue, checkIn, checkOut, options, onSelect }: HotelVoucherProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (hotelId: string) => {
    setSelectedId(hotelId);
    onSelect(hotelId);
  };

  return (
    <section aria-labelledby="hotel-heading" className="space-y-3">
      <h3
        id="hotel-heading"
        className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300"
      >
        Hotel Accommodation
      </h3>
      <div className="bg-info-50 dark:bg-[oklch(18%_0.02_240)] rounded-[var(--radius-lg)] p-4 border border-info-200 dark:border-info-700">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-info-600 dark:text-info-400" aria-hidden="true" />
          <span className="font-bold text-sm text-info-800 dark:text-info-200">
            Hotel accommodation provided
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-info-700 dark:text-info-300 mb-4">
          <div>
            <p className="font-medium">Check-in</p>
            <p>{formatDate(checkIn)}, {formatTime(checkIn)}</p>
          </div>
          <div>
            <p className="font-medium">Check-out</p>
            <p>{formatDate(checkOut)}, {formatTime(checkOut)}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-info-800 dark:text-info-100">
              Voucher value: ${voucherValue}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((hotel, i) => (
            <div key={hotel.id} className="opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
              <HotelCard
                hotel={hotel}
                voucherValue={voucherValue}
                isSelected={selectedId === hotel.id}
                onSelect={() => handleSelect(hotel.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HotelCard({
  hotel,
  voucherValue,
  isSelected,
  onSelect,
}: {
  hotel: HotelVoucherOption;
  voucherValue: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const outOfPocket = hotel.voucherCovers ? 0 : Math.max(0, hotel.pricePerNight - voucherValue);

  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] p-3 transition-all duration-[--duration-micro]',
        'border',
        isSelected
          ? 'border-primary-500 bg-white dark:bg-[oklch(22%_0.005_50)] shadow-sm'
          : 'border-info-200 dark:border-info-700 bg-white/60 dark:bg-[oklch(20%_0.003_50)]'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm font-semibold text-primary-800 dark:text-[oklch(90%_0.002_50)]">
            {hotel.name}
          </h4>
          <div className="flex items-center gap-1 mt-0.5">
            {Array.from({ length: hotel.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 text-secondary-500 fill-secondary-500"
                aria-hidden="true"
              />
            ))}
            <span className="text-xs text-primary-500 dark:text-primary-400 ml-1">
              {hotel.distanceFromAirport} from airport
            </span>
          </div>
        </div>
        <div className="text-right">
          {hotel.voucherCovers ? (
            <span className="text-xs font-semibold text-success-600 dark:text-success-400">
              Covered
            </span>
          ) : (
            <span className="text-xs font-semibold text-warning-600 dark:text-warning-400">
              +${outOfPocket} extra
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {hotel.amenities.slice(0, 4).map((amenity) => {
          const Icon = AMENITY_ICONS[amenity];
          return (
            <span
              key={amenity}
              className="flex items-center gap-1 text-[10px] text-primary-500 dark:text-primary-400 bg-surface-200 dark:bg-[oklch(25%_0.005_50)] px-2 py-0.5 rounded-full"
            >
              {Icon && <Icon className="w-2.5 h-2.5" aria-hidden="true" />}
              {amenity}
            </span>
          );
        })}
      </div>

      <button
        onClick={onSelect}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium',
          'transition-colors duration-[--duration-micro]',
          'min-h-[var(--touch-min)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          isSelected
            ? 'bg-success-600 text-white'
            : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white'
        )}
      >
        {isSelected ? (
          <>
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            Selected
          </>
        ) : (
          'Book This Hotel'
        )}
      </button>
    </div>
  );
}
