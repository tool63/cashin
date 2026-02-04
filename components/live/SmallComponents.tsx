"use client"

import React from "react"
import { ReactNode } from "react"

/* ================= LIVE WRAPPER ================= */
export function LiveWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

/* ================= SECTION TITLE ================= */
export function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
        <span>{icon}</span> {text}
      </h2>
      <div className="mt-2 w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
    </div>
  )
}

/* ================= STAT ================= */
export function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-6 rounded-xl shadow-md flex flex-col items-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-gray-600 dark:text-gray-400 mt-1">{title}</span>
    </div>
  )
}

/* ================= FEATURE ================= */
export function Feature({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-6 rounded-xl shadow-md flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  )
}
