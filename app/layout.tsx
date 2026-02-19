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
  auth: ReactNode; // Parallel route slot for auth modals
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname();

  // Check if we're on an auth page OR if the auth slot is active
  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/reset");
  
  // Check if the auth slot has content (modal is open)
  const hasAuthModal = auth !== null && auth !== undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="transition-colors duration-300 bg-[#0B0F1A] text-white overflow-x-hidden overscroll-x-none">
        <ThemeProviderWrapper>
          {/* Only hide header if it's a direct auth page, not just a modal */}
          {!isAuthRoute && (
            <div className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-white/10">
              <Header />
            </div>
          )}

          <main
            className={`relative w-full ${
              // If it's a direct auth page (not just a modal), center the content
              isAuthRoute && !hasAuthModal
                ? "h-full px-4 sm:px-6 flex items-center justify-center"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* Hide footer and CTA for direct auth pages, but show them when modal is open */}
          {!isAuthRoute && <Footer />}
          {!isAuthRoute && <FloatingCTA />}

          {/* Parallel Auth Modal Slot - always render if present */}
          {hasAuthModal && auth}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
