// Universal loader for all pages
export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#070A14] animate-pulse px-4 py-10 space-y-10">
      {/* Logo / Header placeholder */}
      <div className="h-12 w-48 rounded bg-gray-300 dark:bg-gray-700 mb-8"></div>

      {/* Generic section skeleton */}
      <div className="space-y-4 w-full max-w-5xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton row for tables (offers, etc.)
export function SkeletonRow() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b last:border-b-0">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
    </div>
  );
}
