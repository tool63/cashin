// components/loading/TableSkeleton.tsx
"use client";

import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export default function TableSkeleton({ rows = 10 }: TableSkeletonProps) {
  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-[#070A14]">
      {/* Sidebar Skeleton */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/10 p-4">
        <div className="mb-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header / Top Bar */}
        <div className="border-b border-gray-200 dark:border-white/10 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-64 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>

        {/* Search Bar Area */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <Skeleton className="h-10 w-full max-w-md rounded-lg" />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="w-full border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16 mx-auto" />
              <Skeleton className="h-4 w-20 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>

            {/* Table Rows */}
            {Array.from({ length: rows }).map((_, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 gap-4 px-6 py-4 items-center ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-white/5" : "bg-transparent"
                }`}
              >
                <div className="col-span-2 flex items-center gap-3">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-1">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-5 w-12 mx-auto" />
                <Skeleton className="h-5 w-16 mx-auto" />
                <Skeleton className="h-5 w-20 mx-auto" />
                <Skeleton className="h-5 w-14 ml-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar at Bottom */}
        <div className="border-t border-gray-200 dark:border-white/10 px-6 py-3 flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </main>
    </div>
  );
}
