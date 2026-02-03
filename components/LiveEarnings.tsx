// components/LiveEarnings.tsx
"use client"

import { motion } from "framer-motion"
import { SectionTitle } from "./SmallComponents"

export default function LiveEarnings() {
  const earnings: string[] = ["$2.45", "$6.10", "$12.00"]

  return (
    <section className="py-16 bg-black/5 dark:bg-white/5">
      <SectionTitle icon="💸" text="Live Earnings" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {earnings.map((amount, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex justify-between items-center"
          >
            <span className="font-medium">
              User #{1200 + index}
            </span>

            <span className="text-emerald-400 font-semibold">
              {amount}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
