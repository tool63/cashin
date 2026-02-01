import "./globals.css";
import type { ReactNode } from "react";
import ClientFooter from "./components/ClientFooter";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <main className="min-h-screen">{children}</main>
        <ClientFooter />
      </body>
    </html>
  );
}
