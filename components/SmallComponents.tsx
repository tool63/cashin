"use client"

import React from "react"

/* ---------- SECTION TITLE ---------- */
export function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

/* ---------- STAT COMPONENT ---------- */
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
    <div className="text-center p-4 bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      )}
    </div>
  )
}

/* ---------- BADGE COMPONENT ---------- */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium">
      {children}
    </span>
  )
}

/* ---------- FEATURE COMPONENT ---------- */
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
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{description}</p>
      )}
    </div>
  )
}
