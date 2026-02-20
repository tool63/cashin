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
  auth: ReactNode;
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname();

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

          {/* ================= GLOBAL BACKGROUND ================= */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 transition-colors duration-500"
                 style={{ 
                   background: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`
                 }}>
            </div>

            {/* Glow blobs */}
            <div className="absolute w-80 h-80 rounded-full blur-[120px] top-10 left-10 animate-blobMove blob-green pointer-events-none"></div>
            <div className="absolute w-96 h-96 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 blob-yellow pointer-events-none"></div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none"></div>
          </div>

          {/* ================= HEADER ================= */}
          {!hideLayout && (
            <div className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-primary/80 border-b border-theme">
              <Header />
            </div>
          )}

          {/* ================= MAIN CONTENT ================= */}
          <main
            className={`relative w-full ${
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

          {hasAuthModal && auth}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
