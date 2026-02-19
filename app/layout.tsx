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

export default function RootLayout({
  children,
  auth,
}: RootLayoutProps) {
  const pathname = usePathname();

  // Detect if full-page auth route is accessed directly
  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/reset");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="transition-colors duration-300 bg-[#0B0F1A] text-white overflow-x-hidden overscroll-x-none">
        <ThemeProviderWrapper>

          {/* Header (hidden on direct auth route pages) */}
          {!isAuthRoute && (
            <div className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-white/10">
              <Header />
            </div>
          )}

          {/* Main Content */}
          <main
            className={`relative w-full ${
              isAuthRoute
                ? "h-full px-4 sm:px-6 flex items-center justify-center"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* Footer & Floating CTA (hidden on auth routes) */}
          {!isAuthRoute && <Footer />}
          {!isAuthRoute && <FloatingCTA />}

          {/* Parallel Auth Modal Slot */}
          {auth}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
