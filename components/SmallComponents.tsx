// components/SmallComponents.tsx
import React from "react"

/* ---------- SECTION TITLE ---------- */
export const SectionTitle = ({
  icon,
  text,
}: {
  icon?: string
  text: string
}) => (
  <div className="text-center mb-8 relative">
    <h2 className="inline-flex items-center justify-center text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </h2>

    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-[pulse_2s_ease-in-out_infinite]" />
  </div>
)

/* ---------- STAT ---------- */
export const Stat = ({
  title,
  value,
}: {
  title: string
  value: string
}) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-6">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
      {title}
    </p>
  </div>
)

/* ---------- BADGE ---------- */
export const Badge = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <span className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10">
    {children}
  </span>
)

/* ---------- FEATURE ---------- */
export const Feature = ({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center">
    <div className="flex justify-center mb-4 text-indigo-400">
      {icon}
    </div>
    <h4 className="font-semibold">{title}</h4>
  </div>
)
