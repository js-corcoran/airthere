'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { MealService, MealOption } from '@/lib/types/inflight';
import { UtensilsCrossed, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface MealServiceCardProps {
  meal: MealService;
}

export function MealServiceCard({ meal }: MealServiceCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [preOrdered, setPreOrdered] = useState(false);

  const handlePreOrder = () => {
    if (selectedMeal) {
      setPreOrdered(true);
    }
  };

  return (
    <section
      className={cn(
        'rounded-lg border shadow-sm p-4',
        'bg-secondary-50 border-secondary-200',
        'dark:bg-[oklch(18%_0.010_50)] dark:border-[oklch(32%_0.020_50)]'
      )}
      aria-label="Meal service"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-secondary-600 dark:text-[oklch(72%_0.158_50)]" aria-hidden="true" />
          <h2 className="text-base font-semibold text-primary-900 dark:text-[oklch(95%_0.002_50)]">
            Meal Service
          </h2>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
            'bg-primary-100 text-primary-700',
            'dark:bg-[oklch(25%_0.010_262)] dark:text-[oklch(85%_0.010_262)]'
          )}
        >
          {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
        </span>
      </div>

      {/* Timing */}
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="w-4 h-4 text-primary-500 dark:text-[oklch(60%_0.005_50)]" aria-hidden="true" />
        <span className="text-sm text-primary-700 dark:text-[oklch(85%_0.005_50)]">
          {preOrdered ? 'Pre-order confirmed' : `Service in ${meal.minutesUntil} minutes`}
        </span>
      </div>

      {/* Previous choice */}
      {meal.previousChoice && !preOrdered && (
        <p className="text-xs text-primary-500 dark:text-[oklch(60%_0.005_50)] mb-3">
          Last time: {meal.previousChoice}
        </p>
      )}

      {/* Pre-order confirmation */}
      {preOrdered && (
        <div
          className={cn(
            'flex items-center gap-2 p-3 rounded-md mb-3',
            'bg-success-50 border border-success-200',
            'dark:bg-[oklch(15%_0.008_142)] dark:border-success-800'
          )}
        >
          <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-success-800 dark:text-success-200">
              {meal.options.find((o) => o.id === selectedMeal)?.name}
            </p>
            <p className="text-xs text-success-600 dark:text-success-400">
              Pre-order confirmed. Your meal will be served first.
            </p>
          </div>
        </div>
      )}

      {/* Toggle options */}
      {!preOrdered && (
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={cn(
            'w-full py-2.5 text-sm font-medium rounded-md',
            'bg-secondary-500 text-white',
            'hover:bg-secondary-600 active:bg-secondary-700',
            'transition-colors duration-[--duration-micro]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-min)]'
          )}
        >
          {showOptions ? 'Hide Menu' : 'Pre-Order Now'}
        </button>
      )}

      {/* Meal options */}
      {showOptions && !preOrdered && (
        <div className="mt-3 space-y-2">
          {meal.options.map((option, i) => {
            const hasAllergenConflict = option.allergens.some((a) =>
              meal.passengerAllergies.includes(a)
            );
            return (
              <button
                key={option.id}
                onClick={() => setSelectedMeal(option.id)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={cn(
                  'w-full text-left p-3 rounded-md border transition-all duration-[--duration-micro]',
                  'opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                  selectedMeal === option.id
                    ? 'border-secondary-500 bg-secondary-50 dark:bg-[oklch(20%_0.015_50)] dark:border-secondary-400 ring-1 ring-secondary-500'
                    : 'border-surface-300 bg-background dark:bg-[oklch(15%_0.002_50)] dark:border-[oklch(32%_0.008_50)]',
                  'hover:border-secondary-400 dark:hover:border-secondary-600',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'min-h-[var(--touch-min)]'
                )}
                aria-pressed={selectedMeal === option.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary-900 dark:text-[oklch(95%_0.002_50)]">
                      {option.name}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-[oklch(70%_0.008_50)] mt-0.5">
                      {option.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {option.dietary !== 'standard' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300">
                          {option.dietary}
                        </span>
                      )}
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-200 text-primary-600 dark:bg-[oklch(25%_0.005_50)] dark:text-[oklch(70%_0.008_50)]">
                        {option.calories} cal
                      </span>
                    </div>
                  </div>
                  {hasAllergenConflict && (
                    <AlertTriangle className="w-4 h-4 text-warning-500 shrink-0 mt-0.5" aria-label="Contains your allergens" />
                  )}
                </div>
              </button>
            );
          })}

          {/* Confirm */}
          {selectedMeal && (
            <button
              onClick={handlePreOrder}
              className={cn(
                'w-full py-2.5 text-sm font-medium rounded-md mt-2',
                'bg-primary-500 text-white',
                'hover:bg-primary-600 active:bg-primary-700',
                'transition-colors duration-[--duration-micro]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'min-h-[var(--touch-min)]'
              )}
            >
              Confirm Pre-Order
            </button>
          )}
        </div>
      )}
    </section>
  );
}
