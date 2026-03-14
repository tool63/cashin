"use client";

import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./providers/LanguageProvider";

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Theme and Language Providers */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {/* Header + Content + Footer */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
