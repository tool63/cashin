export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070A14]">
      {/* Logo or title */}
      <div className="h-12 w-48 rounded bg-gray-300 dark:bg-gray-700 mb-8 animate-pulse"></div>

      {/* Content skeleton */}
      <div className="space-y-4 w-80">
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-2 gap-4 mt-8 w-80">
        <div className="h-20 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-20 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      </div>
    </div>
  );
}
