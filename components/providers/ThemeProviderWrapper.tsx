"use client"

import { ThemeProvider } from "next-themes"
import { useEffect, useState, ReactNode } from "react"

interface ThemeProviderWrapperProps {
  children: ReactNode
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false)

  // Prevents hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ThemeProvider
      attribute="class"         // Uses 'class' for dark/light switching
      defaultTheme="system"     // Default to system theme
      enableSystem              // Allow system preference
      disableTransitionOnChange // Smooth transition when switching themes
    >
      {children}
    </ThemeProvider>
  )
}
