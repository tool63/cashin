"use client";

import "../styles/globals.css";
import { ReactNode, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

// Dynamic components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16 w-full animate-pulse" />,
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-40 w-full animate-pulse" />,
  ssr: false,
});

const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"), {
  ssr: false,
});

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"), {
  ssr: false,
});

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";
import LoginPage from "@/app/@auth/login/page";
import SignupPage from "@/app/@auth/signup/page";

interface RootLayoutProps {
  children: ReactNode;
}

function LayoutErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 text-center">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try Again</button>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal logic from query param
  const authType = searchParams?.get("auth"); // "login" or "signup"
  const hasAuthModal = authType === "login" || authType === "signup";

  const { hideLayout, isDashboardPage } = useMemo(() => {
    const isAuthPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/reset");

    return {
      isDashboardPage: pathname.startsWith("/dashboard"),
      hideLayout: isAuthPage && !hasAuthModal,
    };
  }, [pathname, hasAuthModal]);

  useEffect(() => {
    if (!mounted) return;

    let active = true;
    setSeoLoading(true);

    buildSEO({
      route: pathname,
      locale: SEO_CONFIG.defaultLocale,
      noindex: hideLayout,
    })
      .then((result) => {
        if (active) setSeo(result);
      })
      .catch((err) => console.error("SEO error:", err))
      .finally(() => {
        if (active) setSeoLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname, hideLayout, mounted]);

  const fallbackRender = useCallback(
    ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
      <LayoutErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    ),
    []
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ThemeProviderWrapper>
            {mounted && <Background />}
            {mounted && seo && <SeoRenderer seo={seo} />}
            {mounted && seoLoading && <div className="h-1 bg-gradient-to-r" />}

            <div className="relative flex min-h-screen flex-col">
              {/* HEADER */}
              {!hideLayout && mounted && (
                <header className="fixed top-0 w-full">
                  <Suspense fallback={<div className="h-16 animate-pulse" />}>
                    <Header />
                  </Suspense>
                </header>
              )}

              {/* MAIN CONTENT */}
              <main className={hideLayout ? "flex-1" : isDashboardPage ? "pt-16" : "pt-20"}>
                {children}
              </main>

              {/* FOOTER */}
              {!hideLayout && mounted && (
                <Suspense fallback={<div className="h-40 animate-pulse" />}>
                  <Footer />
                </Suspense>
              )}

              {/* FLOATING CTA */}
              {!hideLayout && mounted && (
                <Suspense fallback={null}>
                  <FloatingCTA />
                </Suspense>
              )}
            </div>

            {/* MODAL LOGIC */}
            {hasAuthModal && (
              <ModalRoot isOpen onClose={() => window.history.replaceState({}, "", window.location.pathname)}>
                <AuthModal
                  onClose={() => window.history.replaceState({}, "", window.location.pathname)}
                >
                  {authType === "login" && <LoginPage />}
                  {authType === "signup" && <SignupPage />}
                </AuthModal>
              </ModalRoot>
            )}
          </ThemeProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
