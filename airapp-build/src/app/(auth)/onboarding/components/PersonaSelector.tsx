'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { PERSONAS } from '@/lib/constants/personas';
import { PersonaType } from '@/lib/types/user';

interface PersonaSelectorProps {
  onSelect: (persona: PersonaType) => void;
  selectedPersona?: PersonaType;
}

export function PersonaSelector({ onSelect, selectedPersona }: PersonaSelectorProps) {
  const [selected, setSelected] = useState<PersonaType | undefined>(selectedPersona);

  const handleSelect = (id: PersonaType) => {
    setSelected(id);
  };

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <h2 className="text-2xl md:text-[28px] font-bold text-primary-900 dark:text-foreground mb-2 text-center tracking-[-0.25px]">
          Choose Your Experience
        </h2>
        <p className="text-base text-primary-700 dark:text-muted-foreground mb-8 text-center max-w-sm leading-relaxed">
          Personalization unlocks AirThere&apos;s full power. Select the profile that best matches your travel style.
        </p>

        <div className="grid grid-cols-1 gap-4 w-full" role="radiogroup" aria-label="Travel persona selection">
          {PERSONAS.map((persona, index) => {
            const isSelected = selected === persona.id;
            return (
              <button
                key={persona.id}
                style={{ animationDelay: `${index * 60}ms` }}
                onClick={() => handleSelect(persona.id)}
                role="radio"
                aria-checked={isSelected}
                className={cn(
                  'p-5 rounded-lg border-2 text-left transition-all duration-[--duration-short] opacity-0 animate-[cardEnter_0.4s_ease-out_forwards]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'min-h-[var(--touch-preferred)]',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 shadow-md'
                    : 'border-surface-300 dark:border-muted bg-surface dark:bg-card hover:border-primary-300 hover:shadow-sm hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{persona.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 dark:text-foreground">
                      {persona.name}
                    </h3>
                    <p className="text-xs text-primary-500 dark:text-caption-foreground font-medium uppercase tracking-wider">
                      {persona.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-primary-700 dark:text-muted-foreground mb-3 leading-relaxed">
                  {persona.description}
                </p>

                <ul className="space-y-1.5" role="list">
                  {persona.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-primary-700 dark:text-soft-foreground">
                      <span
                        className={cn(
                          'font-bold mt-0.5 shrink-0',
                          isSelected ? 'text-primary-500' : 'text-success-500'
                        )}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="w-full max-w-md mt-6">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={cn(
            'w-full py-3 font-medium rounded-md text-base transition-all duration-[--duration-short]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            'min-h-[var(--touch-preferred)]',
            selected
              ? 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm'
              : 'bg-surface-300 text-surface-200 cursor-not-allowed dark:bg-muted dark:text-faint-foreground'
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
