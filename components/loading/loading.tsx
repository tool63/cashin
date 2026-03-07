// components/loading/loading.tsx

// ================================
// Full Page Loader (App Router)
// ================================
export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#070A14] animate-pulse px-4 py-10 space-y-10">
      
      {/* Logo / Header Skeleton */}
      <div className="h-12 w-48 rounded-xl bg-gray-300 dark:bg-gray-700" />

      {/* Section Skeleton Blocks */}
      <div className="space-y-6 w-full max-w-6xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </div>
  );
}

// ================================
// Table Skeleton (Offers / Admin)
// ================================
export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="w-full divide-y divide-gray-200 dark:divide-white/10 animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`grid grid-cols-5 gap-4 px-6 py-4 ${
            index % 2 === 0 
              ? "bg-white/50 dark:bg-[#0B0E1A]/50" 
              : "bg-transparent"
          }`}
        >
          {/* Offer Name + Badges */}
          <div className="col-span-2 flex items-center gap-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Country */}
          <div className="text-center">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
          </div>

          {/* Completions */}
          <div className="text-center">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
          </div>

          {/* Payout */}
          <div className="text-right">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-14 ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
