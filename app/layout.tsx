import "./globals.css";
import type { ReactNode } from "react";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
