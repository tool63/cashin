"use client";

import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 space-y-3"
          >
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-white/5">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-white/5">
        <Skeleton className="h-6 w-32 mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full mb-3" />
        ))}
      </div>

    </div>
  );
}
