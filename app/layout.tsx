// app/layout.tsx
"use client";

import "../styles/globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Meta from "@/components/seo/SeoEngine";

interface RootLayoutProps {
  children: ReactNode;
  auth: ReactNode; // Parallel auth slot
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname();

  /* =============================
     AUTH PAGE LOGIC
  ============================= */
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/reset");

  const hasAuthModal = !!auth;
  const hideLayout = isAuthPage && !hasAuthModal; // hide header/footer only for direct auth pages

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body
        className="
          bg-primary
          text-[var(--text-primary)]
          transition-colors duration-500
          overflow-x-hidden
        "
      >
        <ThemeProviderWrapper>

          {/* ================= GLOBAL OPENING STYLE LAYER ================= */}
          {!hideLayout && (
            <>
              {/* Gradient background */}
              <div
                className="
                  fixed inset-0
                  bg-gradient-to-br 
                  from-yellow-400/20 
                  via-green-400/30 
                  to-green-500/20
                  dark:from-yellow-500/10 
                  dark:via-green-700/20 
                  dark:to-green-800/20
                  transition-colors duration-700
                  pointer-events-none
                  z-0
                "
              />

              {/* Glow blobs */}
              <div className="fixed w-80 h-80 bg-green-400/25 rounded-full blur-[120px] top-10 left-10 animate-blobMove pointer-events-none z-0" />
              <div className="fixed w-96 h-96 bg-yellow-400/25 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 pointer-events-none z-0" />

              {/* Frosted overlay */}
              <div className="fixed inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none z-0" />
            </>
          )}

          {/* ================= HEADER ================= */}
          {!hideLayout && (
            <div className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-primary/80 border-b border-theme">
              <Header />
            </div>
          )}

          {/* ================= MAIN CONTENT ================= */}
          <main
            className={`relative w-full z-10 ${
              hideLayout
                ? "min-h-screen flex items-center justify-center px-4"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* ================= FOOTER + CTA ================= */}
          {!hideLayout && <Footer />}
          {!hideLayout && <FloatingCTA />}

          {/* ================= AUTH MODAL SLOT ================= */}
          {hasAuthModal && auth}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
