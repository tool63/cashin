"use client";

import "../styles/globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Meta from "@/components/seo/SeoEngine";
import ModalRoot from "@/components/modals/ModalRoot"; // Import ModalRoot

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
        className={`transition-colors duration-300 bg-[#0B0F1A] text-white overflow-x-hidden overscroll-x-none`}
      >
        <ThemeProviderWrapper>
          {/* Header - hidden on auth pages */}
          {!isAuthPage && (
            <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-white/10">
              <Header />
            </div>
          )}

          {/* Main Content */}
          <main
            className={`relative w-full ${
              isAuthPage
                ? "h-full px-4 sm:px-6"
                : "pt-20 min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {/* Footer & CTA - hidden on auth pages */}
          {!isAuthPage && <Footer />}
          {!isAuthPage && <FloatingCTA />}

          {/* Modal Root - handles auth modals on top of any page */}
          <ModalRoot />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
