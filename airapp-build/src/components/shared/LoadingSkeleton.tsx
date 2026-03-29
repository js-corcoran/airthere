'use client';

import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-surface-200',
        className
      )}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-sm space-y-3" aria-hidden="true">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}

export function FlightCardSkeleton() {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-sm" aria-hidden="true">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-1">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-24" />
        <div className="space-y-1 text-right">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/3 mt-3" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="p-4 space-y-4" role="status" aria-label="Loading content">
      <Skeleton className="h-8 w-48 mb-6" />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
