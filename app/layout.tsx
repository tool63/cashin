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

          {/* ============================
              Global Animated Gradient Background
          ============================ */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

            {/* Main gradient overlay */}
            <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20"></div>

            {/* Floating green circle */}
            <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>

            {/* Floating yellow circle */}
            <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

            {/* Optional center radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]"></div>

          </div>

          {/* SEO */}
          <Meta title="Cashog" description="Earn rewards, cash out, and get paid" />

          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="relative z-10 flex-1 min-h-[calc(100vh-160px)]">
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
