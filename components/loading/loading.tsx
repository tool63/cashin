export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#070A14] animate-pulse px-4 py-10">
      {/* Logo / Title placeholder */}
      <div className="h-12 w-48 rounded bg-gray-300 dark:bg-gray-700 mb-8" />

      {/* Placeholder lines */}
      <div className="space-y-4 w-80">
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800"></div>
      </div>

      {/* Placeholder cards (generic for tasks, offers, etc.) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-80">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </div>
  );
}
