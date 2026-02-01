import "./globals.css";
import type { ReactNode } from "react";
import ClientFooter from "./components/ClientFooter";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased selection:bg-yellow-500 selection:text-black">
        {/* MAIN CONTENT */}
        <main className="relative min-h-screen">{children}</main>

        {/* FOOTER COMPONENT */}
        <ClientFooter />
      </body>
    </html>
  );
}
