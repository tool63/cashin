"use client";

import React, { ReactNode, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { usePathname } from "next/navigation";

// Dynamic Imports
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));
const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"));
const Background = dynamic(() => import("@/components/Background"));
const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"));

// Theme Provider
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";

// SEO Engine
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

interface RootLayoutProps {
  children: ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E111B]">
      <div className="text-center">
        <h1 className="text-xl text-white mb-2">Something went wrong</h1>
        <p className="text-gray-400 text-sm">{error.message}</p>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  const isDashboardPage = pathname?.startsWith("/dashboard");

  // Mount check for client-only components
  useEffect(() => {
    setMounted(true);
  }, []);

  // Build SEO dynamically
  useEffect(() => {
    if (!mounted) return;

    buildSEO({
      route: pathname || "/",
      locale: SEO_CONFIG.defaultLocale,
    })
      .then(setSeo)
      .catch(() => setSeo(null));
  }, [pathname, mounted]);

  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-[#0E111B]">
          <div className="min-h-screen" />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0E111B] text-white">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProviderWrapper>
            {/* Background */}
            <Background />

            {/* SEO */}
            {mounted && seo && <SeoRenderer seo={seo} />}

            <div className="relative flex min-h-screen flex-col">
              {/* HEADER */}
              <header className="fixed top-0 w-full z-40 bg-[#0E111B]/80 backdrop-blur-xl border-b border-[#2A2F3E]">
                <Suspense fallback={<div className="h-16" />}>
                  <Header />
                </Suspense>
              </header>

              {/* MAIN */}
              <main
                className={`flex-1 ${
                  isDashboardPage ? "pt-16" : "pt-20"
                }`}
              >
                {children}
              </main>

              {/* FOOTER */}
              <Suspense fallback={<div className="h-40" />}>
                <Footer />
              </Suspense>

              {/* FLOATING CTA */}
              <Suspense fallback={null}>
                <FloatingCTA />
              </Suspense>
            </div>
          </ThemeProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
