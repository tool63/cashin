"use client";

import "../styles/globals.css";
import { ReactNode, useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Meta from "@/components/seo/SeoEngine";
import { useModalStore } from "@/store/modalStore";

interface RootLayoutProps {
  children: ReactNode;
}

const defaultTitle = "Cashog";
const defaultDescription = "Earn rewards, cash out, and get paid";

export default function RootLayout({ children }: RootLayoutProps) {
  const { isAuthOpen } = useModalStore();

  // 🔒 Lock scroll when modal open
  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAuthOpen]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-gray-100 dark:bg-[#070A14] transition-colors duration-300"
    >
      <head>
        <Meta title={defaultTitle} description={defaultDescription} />
      </head>

      <body className="min-h-screen text-black dark:text-white relative overflow-x-hidden">
        <ThemeProviderWrapper>

          {/* Hide full layout when auth modal open */}
          {!isAuthOpen && <Header />}

          <main
            className={`${
              isAuthOpen
                ? "h-screen w-screen overflow-hidden"
                : "min-h-[calc(100vh-160px)]"
            }`}
          >
            {children}
          </main>

          {!isAuthOpen && <Footer />}
          {!isAuthOpen && <FloatingCTA />}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
