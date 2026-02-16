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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-screen w-screen transition-colors duration-300">
      <body className="relative h-screen w-screen overflow-x-hidden bg-[#0B0F1A] text-white transition-colors duration-300">
        <ThemeProviderWrapper>

          {/* ===== GLOBAL ANIMATED BACKGROUND ===== */}
          <div className="bg-animated">
            <div className="gradient"></div>
            <div className="blob1"></div>
            <div className="blob2"></div>
            <div className="radial"></div>
          </div>

          {/* ===== SEO ===== */}
          <Meta title="Cashog" description="Earn rewards, cash out, and get paid" />

          {/* ===== HEADER ===== */}
          <Header />

          {/* ===== MAIN CONTENT ===== */}
          <main className="relative z-10 flex-1 min-h-screen">
            {children}
          </main>

          {/* ===== FOOTER ===== */}
          <Footer />

          {/* ===== FLOATING CTA ===== */}
          <FloatingCTA />

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
