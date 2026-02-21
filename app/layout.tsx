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

      <body className="relative min-h-screen bg-primary text-primary transition-colors duration-500 overflow-x-hidden">
        <ThemeProviderWrapper>

          {/* ================= CORE GLOBAL BACKGROUND ================= */}
          <Background />

          {/* ================= PAGE WRAPPER ================= */}
          <div className="relative z-10 flex flex-col min-h-screen">

            {/* ================= HEADER ================= */}
            {!hideLayout && (
              <div className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-primary/70 border-b border-theme">
                <Header />
              </div>
            )}

            {/* ================= MAIN CONTENT ================= */}
            <main
              className={`flex-1 w-full ${
                hideLayout
                  ? "min-h-screen flex items-center justify-center px-4"
                  : "pt-20"
              }`}
            >
              {children}
            </main>

            {/* ================= FOOTER ================= */}
            {!hideLayout && <Footer />}

            {/* ================= FLOATING CTA ================= */}
            {!hideLayout && <FloatingCTA />}
          </div>

          {/* ================= AUTH MODAL SLOT ================= */}
          {hasAuthModal && auth}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
