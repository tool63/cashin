"use client";

import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";
import CountryProvider from "./providers/LanguageProvider"; // default import

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Theme provider for dark/light toggle */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Country context provider */}
          <CountryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CountryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
