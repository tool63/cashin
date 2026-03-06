// app/layout.tsx
"use client";

import "../styles/globals.css";
import { ReactNode, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from 'next/dynamic';

// Add type declarations for gtag and dataLayer
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Dynamic imports for code splitting
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16 w-full bg-transparent animate-pulse" />,
  ssr: false, // Disable SSR for header to prevent hydration issues
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-40 w-full bg-transparent animate-pulse" />,
  ssr: false, // Disable SSR for footer to prevent hydration issues
});

const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"), {
  ssr: false,
});

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false, // Disable SSR for background
});

const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"), {
  ssr: false,
});

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

interface RootLayoutProps {
  children: ReactNode;
  auth?: ReactNode;
}

/* =========================================================
   Error Fallback (Enterprise UX)
========================================================= */
function LayoutErrorFallback({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  // Log the error to console for debugging
  console.error("Layout Error:", error);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || 'We encountered an unexpected error. Please try again.'}
        </p>
        <div className="space-x-4">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Loading Indicators
========================================================= */
const SEOLoadingSkeleton = () => (
  <div className="fixed top-0 left-0 w-full z-50">
    <div className="h-0.5 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 animate-pulse" />
  </div>
);

// Create a client-only wrapper for pathname-dependent content
function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="h-16 w-full bg-transparent" />
        <div className="animate-pulse p-8">
          <div className="h-8 bg-gray-200/20 dark:bg-gray-700/20 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200/20 dark:bg-gray-700/20 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200/20 dark:bg-gray-700/20 rounded w-2/3"></div>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     Layout Visibility + Route Detection (Memoized)
  ========================================================= */
  const { hideLayout, hasAuthModal, isDashboardPage } = useMemo(() => {
    const isAuth =
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/reset") ||
      pathname.startsWith("/forgot-password");

    return {
      isDashboardPage: pathname.startsWith("/dashboard"),
      hideLayout: isAuth && !auth,
      hasAuthModal: !!auth,
    };
  }, [pathname, auth]);

  /* =========================================================
     SEO Engine (Client-Safe & Cached)
  ========================================================= */
  useEffect(() => {
    if (!mounted) return; // Only run SEO after mount
    
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
      } catch (e) {
        // Invalid cache, ignore
      }
    }

    buildSEO({ 
      route: pathname, 
      locale: SEO_CONFIG.defaultLocale,
      noindex: hideLayout,
    })
      .then((result) => {
        if (active) {
          setSeo(result);
          try {
            sessionStorage.setItem(`seo-${pathname}`, JSON.stringify(result));
          } catch (e) {
            // Cache storage failed, ignore
          }
        }
      })
      .catch((err) => {
        console.error("SEO build failed:", err);

        if (active) {
          setSeo({
            metadata: {
              title: SEO_CONFIG.defaultTitle,
              description: SEO_CONFIG.defaultDescription,
            },
            structuredData: [],
            canonical: SEO_CONFIG.siteUrl,
            hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
            pageType: {
              type: "unknown",
              hierarchy: ["unknown"],
              metadata: {},
              matches: null,
            },
            links: [],
            preconnect: SEO_CONFIG.preconnect,
          });
        }
      })
      .finally(() => {
        if (active) setSeoLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname, hideLayout, mounted]);

  /* =========================================================
     SEO Performance Metrics
  ========================================================= */
  useEffect(() => {
    if (!seo?.metrics || !mounted) return;

    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'seo_metrics', {
          score: seo.metrics.seoScore ?? 'n/a',
          page_type: seo.pageType?.type,
          generation_time: seo.metrics.generationTime,
        });
      }
      
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'seo_metrics',
          seo_score: seo.metrics.seoScore ?? 'n/a',
          page_type: seo.pageType?.type,
          generation_time: seo.metrics.generationTime,
        });
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log("[SEO Metrics]", {
        score: seo.metrics.seoScore ?? "n/a",
        pageType: seo.pageType?.type,
        generationTime: seo.metrics.generationTime,
        linksCount: seo.links?.length || 0,
        preconnectCount: seo.preconnect?.length || 0,
      });
    }
  }, [seo, mounted]);

  /* =========================================================
     Scroll Restoration
  ========================================================= */
  useEffect(() => {
    if (mounted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, mounted]);

  /* =========================================================
     Error Boundary fallback
  ========================================================= */
  const fallbackRender = useCallback(
    ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
      <LayoutErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    ),
    []
  );

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.cashog.com" />
        <link rel="preconnect" href="https://api.cashog.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      
      <body className="min-h-screen overflow-x-hidden text-gray-900 dark:text-white bg-transparent">

        <ErrorBoundary 
          fallbackRender={fallbackRender}
          onReset={() => window.location.reload()}
        >
          <ThemeProviderWrapper>
            {/* Background Layer - Only render on client */}
            {mounted && (
              <Suspense fallback={null}>
                <Background />
              </Suspense>
            )}

            {/* SEO Metadata */}
            {mounted && seo && (
              <Suspense fallback={null}>
                <SeoRenderer seo={seo} />
              </Suspense>
            )}

            {/* Loading Indicator */}
            {mounted && seoLoading && <SEOLoadingSkeleton />}

            {/* Main Content Wrapper */}
            <ClientOnly>
              <div className="relative z-10 flex min-h-screen flex-col bg-transparent">

                {/* Header */}
                {!hideLayout && mounted && (
                  <header className="fixed top-0 left-0 z-40 w-full border-b border-gray-200/30 dark:border-gray-800/30 bg-transparent backdrop-blur-xl">
                    <Suspense fallback={<div className="h-16 animate-pulse bg-transparent" />}>
                      <Header />
                    </Suspense>
                  </header>
                )}

                {/* Main Content */}
                <main
                  className={`flex-1 w-full bg-transparent ${
                    hideLayout
                      ? "min-h-screen flex items-center justify-center px-4"
                      : isDashboardPage
                      ? "pt-16"
                      : "pt-20"
                  }`}
                >
                  <div className="w-full h-full bg-transparent">
                    {children}
                  </div>
                </main>

                {/* Footer */}
                {!hideLayout && mounted && (
                  <Suspense fallback={<div className="h-40 animate-pulse bg-transparent" />}>
                    <Footer />
                  </Suspense>
                )}
                
                {/* Floating CTA */}
                {!hideLayout && mounted && (
                  <Suspense fallback={null}>
                    <FloatingCTA />
                  </Suspense>
                )}
              </div>
            </ClientOnly>

            {/* Auth Modal */}
            {hasAuthModal && auth}
          </ThemeProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
