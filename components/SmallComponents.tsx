"use client"

import React from "react"

/* ---------- SECTION TITLE ---------- */
export function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{text}</h2>
    </div>
  )
}

/* ---------- STAT ---------- */
export function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/10 dark:bg-black/10 border border-black/10 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="mt-2 text-gray-600 dark:text-gray-400">{title}</span>
    </div>
  )
}

/* ---------- BADGE ---------- */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-gray-900 dark:text-white hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      {children}
    </div>
  )
}

/* ---------- FEATURE ---------- */
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
    <div className="bg-white/10 dark:bg-black/10 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <div className="text-4xl mb-4 text-emerald-500">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
    </div>
  )
}
