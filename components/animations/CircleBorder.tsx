"use client";

import { motion } from "framer-motion";

export default function CircleBorder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full rounded-2xl p-[2px] overflow-hidden">

      {/* 🔥 Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #facc15, #22c55e, #10b981, #facc15)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 6,
        }}
      />

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl blur-md opacity-40 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500" />

      {/* Content */}
      <div className="relative z-10 w-full h-full bg-white dark:bg-black rounded-2xl p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}
