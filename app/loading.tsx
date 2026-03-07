import { TableSkeleton } from "@/components/loading/loading";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-28 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="relative rounded-xl shadow-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-y-auto max-h-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 font-semibold sticky top-0 z-10 bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-green-500/10 dark:from-yellow-400/5 dark:via-green-400/5 dark:to-green-500/5 border-b border-gray-200 dark:border-white/10">
            <span className="text-left col-span-2">Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completions</span>
            <span className="text-right">Payout</span>
          </div>

          {/* Table Rows Skeleton */}
          <TableSkeleton rows={10} />
        </div>
      </div>

      {/* Stats Summary Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center"
          >
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
