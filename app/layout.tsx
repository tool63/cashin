"use client";

import "../styles/globals.css";
import { ReactNode } from "react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingCTA from "@/components/common/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper"; // updated
import Meta from "@/components/seo/SeoEngine";

interface RootLayoutProps {
  children: ReactNode;
}

const defaultTitle = "PayUp";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <ThemeProviderWrapper>
          <Header />

          <main className="min-h-[calc(100vh-160px)]">
            {children}
          </main>

          <Footer />
          <FloatingCTA />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
