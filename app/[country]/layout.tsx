// app/[country]/layout.tsx
"use client";

import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";
import LanguageProvider from "./providers/LanguageProvider"; // fixed import

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <LanguageProvider>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
