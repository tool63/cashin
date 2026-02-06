// app/providers.tsx
"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "./providers/LanguageProvider"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LanguageProvider>
  )
}
