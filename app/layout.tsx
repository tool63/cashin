"use client";

import "../styles/globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";

interface RootLayoutProps {
  children: ReactNode;
  auth?: ReactNode;
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname();

  // Detect auth pages (login, signup, reset)
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/reset");

  const hasAuthModal = !!auth;
  const hideLayout = isAuthPage && !hasAuthModal;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="bg-primary text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden">
        <ThemeProviderWrapper>
          {/* ============================
              GLOBAL BACKGROUND
          ============================ */}
          <Background />

          {/* ============================
              HEADER (visible on non-auth pages)
          ============================ */}
          {!hideLayout && (
            <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-primary/80 border-b border-theme">
              <Header />
            </header>
          )}

          {/* ============================
              MAIN CONTENT
          ============================ */}
          <main
            className={`relative w-full ${
              hideLayout
                ? "min-h-screen flex items-center justify-center px-4"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* ============================
              FOOTER + FLOATING CTA
          ============================ */}
          {!hideLayout && <Footer />}
          {!hideLayout && <FloatingCTA />}

          {/* ============================
              AUTH MODAL (if any)
          ============================ */}
          {hasAuthModal && auth}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
