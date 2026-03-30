'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { PersonaType } from '@/lib/types/user';
import { format } from 'date-fns';

interface HomeHeroProps {
  persona: PersonaType;
  isTravelDay: boolean;
  userName: string;
  nextDepartureTime?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getPersonaSubtext(persona: PersonaType, isTravelDay: boolean): string {
  if (isTravelDay) return 'Travel day — your journey awaits';
  switch (persona) {
    case 'premium':
      return 'Your world, seamlessly connected';
    case 'business':
      return 'Ready when you are';
    case 'family':
      return "Let's plan your next adventure";
  }
}

export function HomeHero({ persona, isTravelDay, userName, nextDepartureTime }: HomeHeroProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(format(new Date(), 'h:mm a'));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const firstName = userName.split(' ')[0];

  return (
    <div
      className={cn(
        'px-4 pt-2 pb-4',
        isTravelDay
          ? 'bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-800 dark:to-primary-700'
          : 'bg-background'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            className={cn(
              'text-xl font-bold tracking-[-0.25px]',
              isTravelDay
                ? 'text-white'
                : 'text-primary-900 dark:text-foreground'
            )}
          >
            {getGreeting()}, {firstName}
          </h2>
          <p
            className={cn(
              'text-sm mt-0.5',
              isTravelDay
                ? 'text-primary-100'
                : 'text-primary-500 dark:text-caption-foreground'
            )}
          >
            {getPersonaSubtext(persona, isTravelDay)}
          </p>
        </div>
        <span
          className={cn(
            'text-sm font-medium tabular-nums',
            isTravelDay
              ? 'text-primary-200'
              : 'text-primary-400 dark:text-caption-foreground'
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
}
