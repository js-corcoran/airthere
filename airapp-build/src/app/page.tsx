'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const onboarded = localStorage.getItem('airthere-onboarded');
    if (onboarded === 'true') {
      router.replace(ROUTES.HOME);
    } else {
      router.replace(ROUTES.ONBOARDING);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3" role="status" aria-label="Loading AirThere">
        <div className="w-12 h-12 rounded-xl bg-secondary-500 flex items-center justify-center">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="text-sm text-primary-500 dark:text-caption-foreground animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
}
