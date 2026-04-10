// app/loading.tsx
"use client";

import TableSkeleton from "@/components/loading/TableSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-[#070A14]">
      <TableSkeleton rows={10} />
    </div>
  );
}
