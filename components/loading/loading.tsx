import { ReactNode } from "react";

// Skeleton row for tables
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

// Generic section skeleton
export function SectionSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-36 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
}

// Full-page skeleton for homepage or any page
export default function GlobalLoading({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-[#070A14] animate-pulse px-4 py-10 space-y-10">
      {/* Optional logo / header placeholder */}
      <div className="h-12 w-48 rounded bg-gray-300 dark:bg-gray-700 mb-8"></div>

      {/* Placeholder sections */}
      <SectionSkeleton count={3} />
      <SectionSkeleton count={4} />
      <SectionSkeleton count={3} />

      {/* Render optional children (like table skeleton) */}
      {children}
    </div>
  );
}
