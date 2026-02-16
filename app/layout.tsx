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
        {/* Default SEO */}
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="bg-[#12141F] text-white min-h-screen relative overflow-x-hidden">

        <ThemeProviderWrapper>

          {/* ============================
              Animated Gradient Background
              (Slight separation with darker base)
          ============================ */}
          <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-15"></div>
          <div className="absolute w-72 h-72 bg-green-400/25 rounded-full blur-3xl animate-float top-20 left-10"></div>
          <div className="absolute w-96 h-96 bg-yellow-400/25 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

          {/* Optional: subtle radial gradient for more depth */}
          <div className="absolute inset-0 bg-gradient-radial from-[#12141F] via-[#111827] to-[#12141F] opacity-20 pointer-events-none"></div>

          {/* ================= HEADER ================= */}
          <Header />

          {/* ================= MAIN CONTENT ================= */}
          <main className="relative z-10 min-h-[calc(100vh-160px)]">
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
