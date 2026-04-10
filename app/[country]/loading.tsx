// app/loading.tsx
"use client";

import TableSkeleton from "@/components/loading/TableSkeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-[#070A14] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto">
        <TableSkeleton rows={10} />
      </div>
    </div>
  );
}
