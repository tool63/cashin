// components/loading/TableSkeleton.tsx
"use client";

import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({ rows = 10, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full">
      {/* Table */}
      <div className="w-full border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className={`grid grid-cols-${columns} gap-4 px-6 py-3 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10`}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={`grid grid-cols-${columns} gap-4 px-6 py-4 items-center ${
              index % 2 === 0 ? "bg-gray-50 dark:bg-white/5" : "bg-transparent"
            }`}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
