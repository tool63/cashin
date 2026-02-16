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
    <html lang="en" suppressHydrationWarning className="transition-colors duration-300">
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="bg-[#0B0F1A] text-white min-h-screen relative overflow-x-hidden">

        <ThemeProviderWrapper>

          {/* ============================
              FIXED HEADER
          ============================ */}
          <header className="fixed top-0 left-0 w-full z-50">
            <div className="w-full bg-gradient-to-r from-yellow-400/29 via-green-400/29 to-green-500/29 backdrop-blur-sm">
              <Header />
            </div>
          </header>

          {/* ================= MAIN CONTENT ================= */}
          <main className="relative z-10 min-h-[calc(100vh-160px)] pt-[80px]">
            {/* Padding top = header height */}

            {/* ================= BODY BACKGROUND (/30) ================= */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400/30 via-green-400/30 to-green-500/30"></div>
              <div className="absolute w-72 h-72 bg-green-400/30 rounded-3xl blur-3xl animate-float top-20 left-10"></div>
              <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-3xl blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>
            </div>

            {children}
          </main>

          {/* ================= FOOTER ================= */}
          <footer className="relative z-10">
            <div className="relative w-full bg-gradient-to-r from-yellow-400/29 via-green-400/29 to-green-500/29">
              <Footer />
            </div>
          </footer>

          {/* ================= GLOBAL CTA ================= */}
          <FloatingCTA />

        </ThemeProviderWrapper>

      </body>
    </html>
  );
}
