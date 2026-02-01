// app/layout.tsx
import './globals.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'My Next.js 14 App',
  description: 'Next.js 14 Project Example',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
