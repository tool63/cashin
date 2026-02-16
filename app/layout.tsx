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
      className="transition-colors duration-300"
    >
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0F172A]">

        <ThemeProviderWrapper>

          {/* ================= PREMIUM GLOBAL BACKGROUND ================= */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

            {/* Soft Green Radial Glow (Top Left) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.15),_transparent_40%)]"></div>

            {/* Soft Yellow Radial Glow (Bottom Right) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.12),_transparent_40%)]"></div>

            {/* Floating Glow Orb 1 */}
            <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float top-20 left-10"></div>

            {/* Floating Glow Orb 2 */}
            <div className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

          </div>

          {/* ================= FIXED HEADER ================= */}
          <Header />

          {/* ================= MAIN CONTENT ================= */}
          {/* Header height = h-20 (80px) so we offset content */}
          <main className="relative z-10 pt-20">
            {children}
          </main>

          {/* ================= FOOTER ================= */}
          <Footer />

          {/* ================= GLOBAL FLOATING CTA ================= */}
          <FloatingCTA />

        </ThemeProviderWrapper>

      </body>
    </html>
  );
}
