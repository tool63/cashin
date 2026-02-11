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
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full divide-y divide-gray-200 dark:divide-gray-800 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 px-4 py-3"
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
}
