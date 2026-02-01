import "../styles/globals.css";
import Footer from "../components/Footer";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
