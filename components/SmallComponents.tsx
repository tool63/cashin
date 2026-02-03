"use client"

import { ReactNode } from "react"

/* ---------- STAT COMPONENT ---------- */
interface StatProps {
  title: string
  value: string
  description?: string
}

export const Stat = ({ title, value, description }: StatProps) => {
  return (
    <div className="bg-white/5 dark:bg-black/10 border border-black/10 dark:border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold my-2">{value}</h3>
      {description && <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>}
    </div>
  )
}

/* ---------- BADGE COMPONENT ---------- */
interface BadgeProps {
  children: ReactNode
}

export const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium text-sm">
      {children}
    </span>
  )
}

/* ---------- FEATURE COMPONENT ---------- */
interface FeatureProps {
  icon: ReactNode
  title: string
  description?: string
}

export const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-white/5 dark:bg-black/10 border border-black/10 dark:border-white/10 rounded-xl p-6 text-center flex flex-col items-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{description}</p>}
    </div>
  )
}

/* ---------- SECTION TITLE COMPONENT ---------- */
interface SectionTitleProps {
  icon: string
  text: string
}

export const SectionTitle = ({ icon, text }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}
