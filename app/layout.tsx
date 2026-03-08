"use client";

import "../styles/globals.css";
import { ReactNode, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Dynamic imports (kept but not blocking layout)
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"), { ssr: false });
const Background = dynamic(() => import("@/components/Background"), { ssr: false });
const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"), { ssr: false });

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

interface RootLayoutProps {
  children: ReactNode;
}

/* ERROR FALLBACK */
function LayoutErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  console.error("Layout Error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/* SEO LOADING */
const SEOLoadingSkeleton = () => (
  <div className="fixed top-0 left-0 w-full z-50">
    <div className="h-0.5 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 animate-pulse" />
  </div>
);

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  const hideLayout = useMemo(() => {
    return (
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/reset") ||
      pathname.startsWith("/forgot-password")
    );
  }, [pathname]);

  /* SEO ENGINE */
  useEffect(() => {
    if (!mounted) return;

    let active = true;
    setSeoLoading(true);

    const cached = sessionStorage.getItem(`seo-${pathname}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (active) {
          setSeo(parsed);
          setSeoLoading(false);
          return;
        }
      } catch {}
    }

    buildSEO({ route: pathname, locale: SEO_CONFIG.defaultLocale, noindex: hideLayout })
      .then((result) => {
        if (active) {
          setSeo(result);
          sessionStorage.setItem(`seo-${pathname}`, JSON.stringify(result));
        }
      })
      .catch(() => {
        if (active) {
          setSeo({
            metadata: {
              title: SEO_CONFIG.defaultTitle,
              description: SEO_CONFIG.defaultDescription,
            },
            structuredData: [],
            canonical: SEO_CONFIG.siteUrl,
            hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
            pageType: { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null },
            links: [],
            preconnect: SEO_CONFIG.preconnect,
          });
        }
      })
      .finally(() => active && setSeoLoading(false));

    return () => {
      active = false;
    };
  }, [pathname, hideLayout, mounted]);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden text-gray-900 dark:text-white bg-transparent">
        <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
          <LayoutErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
        )}>
          <ThemeProviderWrapper>
            {mounted && <Background />}
            {mounted && seo && <SeoRenderer seo={seo} />}
            {mounted && seoLoading && <SEOLoadingSkeleton />}

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
              {!hideLayout && mounted && <Header />}

              <main className={hideLayout ? "min-h-screen flex items-center justify-center" : "pt-20"}>
                {children}
              </main>

              {!hideLayout && mounted && <Footer />}
              {!hideLayout && mounted && <FloatingCTA />}
            </div>
          </ThemeProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
