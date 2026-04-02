"use client";

import { motion } from "framer-motion";

type Props = {
  rows?: number;
  className?: string; // ✅ ADD THIS
};

export default function Skeleton({ rows = 8, className }: Props) {
  return (
    <div className={`rounded-xl border overflow-hidden ${className || ""}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center px-4 py-4 border-b"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 w-2/3">
            <Shimmer className="h-4 w-48 rounded-md" />
            <div className="flex gap-2">
              <Shimmer className="h-3 w-3 rounded-full" />
              <Shimmer className="h-3 w-3 rounded-full" />
              <Shimmer className="h-3 w-3 rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-2">
            <Shimmer className="h-4 w-16 rounded-md" />
            <Shimmer className="h-3 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===================== SHIMMER ===================== */

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 dark:bg-white/10 ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
        animate={{ x: ["0%", "200%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
}
