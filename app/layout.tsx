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
      <Providers>
        <body className="bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
          <Header />
          {children}
          <Footer />
          <FloatingCTA />
        </body>
      </Providers>
    </html>
  )
}
