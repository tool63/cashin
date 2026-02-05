// app/layout.tsx

import "../styles/globals.css"
import { ReactNode } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FloatingCTA from "../components/FloatingCTA"
import Providers from "./providers"

export const metadata = {
  title: "PayUp",
  description: "Earn rewards, cash out, and get paid",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="transition-colors duration-300"
    >
      <body
        className="
          min-h-screen
          bg-white text-black
          dark:bg-black dark:text-white
          antialiased
        "
      >
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
