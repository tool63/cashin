"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

/* ================= SECTION TITLE ================= */
export function SectionTitle({
  icon,
  text,
}: {
  icon: string
  text: string
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
        <span>{icon}</span>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg"
    >
      <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold text-emerald-400">
        {value}
      </p>
      {description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </motion.div>
  )
}

/* ================= BADGE ================= */
export function Badge({
  children,
}: {
  children: ReactNode
}) {
  return (
    <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      {children}
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
    <div className="flex gap-4 items-start">
      <div className="text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}
