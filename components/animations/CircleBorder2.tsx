"use client";

import { motion } from "framer-motion";

export default function CircleBorder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full rounded-2xl p-[2px] overflow-hidden">

      {/* 🔥 BORDER BASE (SOFT + PREMIUM) */}
      <div className="absolute inset-0 rounded-2xl">

        {/* DARK MODE GRADIENT */}
        <div className="hidden dark:block absolute inset-0 rounded-2xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #22c55e, #16a34a, #4ade80, #22c55e)",
          }}
        />

        {/* LIGHT MODE GRADIENT (SOFTER + MORE PREMIUM) */}
        <div className="block dark:hidden absolute inset-0 rounded-2xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #e5e7eb, #86efac, #d1fae5, #e5e7eb)",
          }}
        />

        {/* Slow rotation */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 12, // ⬅️ slower = premium feel
          }}
        />
      </div>

      {/* 🔥 SOFT GLOW (LIGHT + DARK DIFFERENT) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">

        {/* Dark glow */}
        <div className="hidden dark:block absolute inset-0 blur-xl opacity-40 bg-green-500 rounded-2xl" />

        {/* Light glow (very subtle, premium) */}
        <div className="block dark:hidden absolute inset-0 blur-2xl opacity-20 bg-green-200 rounded-2xl" />
      </div>

      {/* 🧠 INNER CONTENT */}
      <div className="relative z-10 w-full h-full rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl p-6 md:p-10">
        {children}
      </div>

    </div>
  );
}
