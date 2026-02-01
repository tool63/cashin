// app/layout.tsx
import '../styles/globals.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Next.js 14 Starter',
  description: 'A minimal Next.js 14 project',
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
