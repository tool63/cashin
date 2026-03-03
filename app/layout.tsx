"use client";

import "../styles/globals.css";
import { ReactNode, useMemo, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Background from "@/components/Background";

import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

interface RootLayoutProps {
  children: ReactNode;
  auth?: ReactNode;
}

/* =========================================================
   Error Fallback (Enterprise UX)
========================================================= */
function LayoutErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We encountered an unexpected error. Please refresh the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname() || "/";

  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Avoid theme flash (client only render)
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
    let active = true;
    setSeoLoading(true);

    buildSEO({ route: pathname, locale: SEO_CONFIG.defaultLocale })
      .then((result) => {
        if (active) setSeo(result);
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
          });
        }
      })
      .finally(() => {
        if (active) setSeoLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  /* =========================================================
     Scroll Restoration (UX Best Practice)
  ========================================================= */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* =========================================================
     Error Boundary fallback (memoized)
  ========================================================= */
  const fallbackRender = useCallback(
    ({ error }: { error: Error }) => <LayoutErrorFallback error={error} />,
    []
  );

  // Prevent hydration flash (SEO-safe)
  if (!mounted) return null;

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden text-gray-900 transition-colors duration-500 dark:text-white bg-white dark:bg-[#070A14]">

        {/* Tiny loading indicator (optional UX) */}
        {seoLoading && (
          <div className="fixed top-0 left-0 w-full h-0.5 bg-blue-600 animate-pulse z-50" />
        )}

        {/* =====================================================
            SEO Metadata & Structured Data
        ===================================================== */}
        {seo && <SeoRenderer seo={seo} />}

        <ThemeProviderWrapper>
          {/* =====================================================
              Global Background Layer
          ===================================================== */}
          <Background />

          {/* =====================================================
              Page Wrapper
          ===================================================== */}
          <div className="relative z-10 flex min-h-screen flex-col">

            {/* =====================================================
                Header (Hidden on Auth Pages)
            ===================================================== */}
            {!hideLayout && (
              <header className="fixed top-0 left-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur-xl dark:border-gray-800 dark:bg-black/70">
                <Header />
              </header>
            )}

            {/* =====================================================
                Main Content (Error Boundary Scoped)
            ===================================================== */}
            <ErrorBoundary fallbackRender={fallbackRender}>
              <main
                className={`flex-1 w-full ${
                  hideLayout
                    ? "min-h-screen flex items-center justify-center px-4"
                    : isDashboardPage
                    ? "pt-16"
                    : "pt-20"
                }`}
              >
                {children}
              </main>
            </ErrorBoundary>

            {/* =====================================================
                Footer & CTA (Hidden on Auth Pages)
            ===================================================== */}
            {!hideLayout && <Footer />}
            {!hideLayout && <FloatingCTA />}
          </div>

          {/* =====================================================
              Auth Modal (Parallel Route Support)
          ===================================================== */}
          {hasAuthModal && auth}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
