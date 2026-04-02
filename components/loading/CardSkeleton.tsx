"use client";

import Skeleton from "./Skeleton";

interface CardSkeletonProps {
  rows?: number;
}

export default function CardSkeleton({ rows = 6 }: CardSkeletonProps) {
  return (
    <div className="rounded-xl border overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center px-4 py-4 border-b"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 w-2/3">
            <Skeleton className="h-4 w-48 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
