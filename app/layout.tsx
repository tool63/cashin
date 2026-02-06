// app/layout.tsx
import "../styles/globals.css"
import { ReactNode } from "react"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingCTA from "@/components/cta/FloatingCTA"
import Providers from "./providers"
import Meta from "@/components/Meta"

export interface RootLayoutProps {
  children: ReactNode
}

// Default site meta
const defaultTitle = "PayUp"
const defaultDescription = "Earn rewards, cash out, and get paid"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="transition-colors duration-300"
    >
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body
        className="
          min-h-screen
          bg-white text-black
          dark:bg-black dark:text-white
          antialiased
        "
      >
        {/* 🔥 ALL CLIENT LOGIC GOES INSIDE PROVIDERS */}
        <Providers>
          <Header />

          <main className="min-h-[calc(100vh-160px)] relative z-0">
            {children}
          </main>

          <Footer />
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  )
}
