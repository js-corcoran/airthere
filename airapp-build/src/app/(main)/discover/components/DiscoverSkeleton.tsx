'use client';

import { Skeleton } from '@/components/shared/LoadingSkeleton';

export function DiscoverSkeleton() {
  return (
    <div role="status" aria-label="Loading discover content">
      {/* Search bar skeleton */}
      <div className="px-4 py-3">
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>

      {/* Tab bar skeleton */}
      <div className="flex gap-2 px-4 py-3 border-b border-surface-300 dark:border-[oklch(32%_0.008_50)]">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
      </div>

      {/* Content skeleton — destination cards grid */}
      <div className="p-4 space-y-4">
        {/* Featured card */}
        <Skeleton className="h-56 rounded-lg" />

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
