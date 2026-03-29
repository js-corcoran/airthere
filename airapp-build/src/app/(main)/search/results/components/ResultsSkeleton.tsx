import { Skeleton } from '@/components/shared/LoadingSkeleton';

export function ResultsSkeleton() {
  return (
    <div className="space-y-3 px-4 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-surface-200 dark:border-[oklch(25%_0.005_50)] space-y-3"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex justify-between pt-2 border-t border-surface-100 dark:border-[oklch(22%_0.003_50)]">
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="w-4 h-4 rounded" />
              ))}
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
