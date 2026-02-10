"use client";

import "../styles/globals.css";
import { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Meta from "@/components/seo/SeoEngine";

interface RootLayoutProps {
  children: ReactNode;
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-gray-100 dark:bg-[#070A14] transition-colors duration-300"
    >
      <head>
        {/* SEO */}
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="min-h-screen text-black dark:text-white">
        {/* Wrap everything with ThemeProvider */}
        <ThemeProviderWrapper>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="min-h-[calc(100vh-160px)]">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating CTA */}
          <FloatingCTA />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
