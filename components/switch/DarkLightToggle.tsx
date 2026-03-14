"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function DarkLightToggle() {

  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      p-2 rounded-xl
      border border-gray-200 dark:border-white/10
      bg-white/70 dark:bg-white/10
      backdrop-blur-md
      hover:scale-105
      transition
      "
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  )
}
