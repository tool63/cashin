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
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300 bg-white text-gray-900 dark:bg-black dark:text-white">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  )
}
