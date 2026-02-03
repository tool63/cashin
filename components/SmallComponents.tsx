"use client"

import { motion } from "framer-motion"

/* ================= SECTION TITLE ================= */
export function SectionTitle({
  icon,
  text,
}: {
  icon?: string
  text: string
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
        {icon && <span>{icon}</span>}
        {text}
      </h2>
    </div>
  )
}

/* ================= STAT ================= */
export function Stat({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description?: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
    >
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {title}
      </p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </motion.div>
  )
}

/* ================= BADGE ================= */
export function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block px-4 py-1 text-sm rounded-full bg-emerald-500/10 text-emerald-400">
      {text}
    </span>
  )
}

/* ================= FEATURE ================= */
export function Feature({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}
