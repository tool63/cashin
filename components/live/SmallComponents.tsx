"use client"

import React from "react"
import clsx from "clsx"

type LiveCardProps = {
  children: React.ReactNode
  className?: string
}

export function LiveCard({ children, className }: LiveCardProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-xl border",
        "border-black/10 dark:border-white/10",
        "bg-white/80 dark:bg-black/50 backdrop-blur",
        "px-4 py-2 text-sm shadow-sm",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  )
}

/* Optional section wrapper (use if needed) */
export function LiveSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
