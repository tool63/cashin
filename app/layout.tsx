import "../styles/globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FloatingCTA from "../components/FloatingCTA"
import Providers from "./providers"

export const metadata = {
  title: "PayUp",
  description: "Earn rewards, cash out, and get paid",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-[#0B0F1A] dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <Header />
          {children}
          <Footer />
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  )
}
