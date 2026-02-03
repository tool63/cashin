"use client"

import React from "react"

/* ---------- SECTION TITLE ---------- */
export function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <h2 className="text-3xl font-bold flex items-center justify-center gap-2 mb-8">
      <span className="text-4xl">{icon}</span> {text}
    </h2>
  )
}

/* ---------- STAT CARD ---------- */
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
    <div className="bg-white/5 dark:bg-black/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {description && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{description}</p>}
    </div>
  )
}

/* ---------- BADGE ---------- */
export function Badge({ text }: { text: string }) {
  return (
    <span className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-full px-4 py-1 text-sm font-medium">
      {text}
    </span>
  )
}

/* ---------- FEATURE CARD ---------- */
export function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{description}</p>}
    </div>
  )
}
