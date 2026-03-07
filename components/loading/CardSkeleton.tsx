import Skeleton from "./Skeleton";

interface CardSkeletonProps {
  cards?: number;
}

export default function CardSkeleton({ cards = 6 }: CardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 dark:border-white/10 p-4 space-y-4 bg-white dark:bg-white/5"
        >
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
