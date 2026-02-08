"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function DarkLightToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme works only after client mounts (avoids hydration issues)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        p-2 rounded-lg border transition-colors
        ${
          isDark
            ? "border-white/20 bg-gray-800 text-white hover:bg-gray-700"
            : "border-gray-300 bg-white text-gray-900 hover:bg-gray-200"
        }
      `}
      title="Toggle dark/light mode"
      aria-label="Toggle dark/light mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
