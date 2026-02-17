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
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/reset");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body
        className={`
          transition-colors duration-300 
          bg-[#0B0F1A] text-white
          ${isAuthPage ? "h-screen overflow-hidden" : "min-h-screen overflow-x-hidden"}
        `}
      >
        <ThemeProviderWrapper>

          {/* ================= HEADER ================= */}
          {!isAuthPage && (
            <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-white/10">
              <Header />
            </div>
          )}

          {/* ================= MAIN CONTENT ================= */}
          <main
            className={`relative w-full ${
              isAuthPage
                ? "h-full flex items-center justify-center px-4 sm:px-6"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* ================= FOOTER ================= */}
          {!isAuthPage && <Footer />}
          {!isAuthPage && <FloatingCTA />}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
