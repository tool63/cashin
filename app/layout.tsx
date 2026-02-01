// app/layout.tsx
import "../styles/globals.css"; // your global styles
import Footer from "../components/Footer"; // make sure this path is correct
import { ReactNode } from "react";

export const metadata = {
  title: "Cashog",
  description: "Cashog - Earn online rewards, cashback, and crypto",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
