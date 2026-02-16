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
      className="h-screen w-screen transition-colors duration-300"
    >
      <body className="relative h-screen w-screen overflow-x-hidden bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProviderWrapper>

          {/* ============================
              GLOBAL ANIMATED BACKGROUND
          ============================ */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

            {/* Main Gradient */}
            <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>

            {/* Floating Glow 1 */}
            <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>

            {/* Floating Glow 2 */}
            <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

            {/* Center Radial Glow for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]"></div>

          </div>

          {/* ================= SEO ================= */}
          <Meta title={defaultTitle} description={defaultDescription} />

          {/* ================= HEADER ================= */}
          <Header />

          {/* ================= MAIN CONTENT ================= */}
          <main className="relative z-10 flex-1 min-h-[calc(100vh-160px)]">
            {children}
          </main>

          {/* ================= FOOTER ================= */}
          <Footer />

          {/* ================= GLOBAL CTA ================= */}
          <FloatingCTA />

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
