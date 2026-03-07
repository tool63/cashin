import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export default function TableSkeleton({ rows = 10 }: TableSkeletonProps) {
  return (
    <div className="w-full divide-y divide-gray-200 dark:divide-white/10">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-4 px-6 py-4 items-center"
        >
          {/* Offer */}
          <div className="col-span-2 flex items-center gap-2">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-1">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-4 h-4 rounded-full" />
            </div>
          </div>

          {/* Country */}
          <Skeleton className="h-5 w-12 mx-auto" />

          {/* Completions */}
          <Skeleton className="h-5 w-16 mx-auto" />

          {/* Payout */}
          <Skeleton className="h-5 w-14 ml-auto" />
        </div>
      ))}
    </div>
  );
}
