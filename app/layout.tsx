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

      <body className="relative min-h-screen overflow-x-hidden
                       bg-[#f3f4f6] dark:bg-[#0B0F1A] text-black dark:text-white">
        <ThemeProviderWrapper>

          {/* ================= HEADER ================= */}
          <Header />

          {/* ================= BODY GRADIENT /30 ================= */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute inset-0 animate-gradient
                            bg-gradient-to-r from-yellow-400/30 via-green-400/30 to-green-500/30"></div>
            <div className="absolute w-72 h-72 bg-green-400/30 rounded-3xl blur-3xl animate-float top-20 left-10"></div>
            <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-3xl blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <main className="relative z-10 min-h-[calc(100vh-160px)] pt-16">
            {children}
          </main>

          <Footer />
          <FloatingCTA />

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
