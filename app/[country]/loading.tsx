// app/loading.tsx
"use client";

import TableSkeleton from "@/components/loading/TableSkeleton";

export default function Loading() {
  return <TableSkeleton rows={10} />;
}
