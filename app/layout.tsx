"use client";

import "../styles/globals.css";
import { ReactNode, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
import ResetPage from "@/app/@auth/reset/page";

interface RootLayoutProps {
  children: ReactNode;
}

function LayoutErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E111B]">
      <div className="p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button 
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal logic from query param
  const authType = searchParams?.get("auth"); // "login", "signup", or "reset"
  const hasAuthModal = authType === "login" || authType === "signup" || authType === "reset";

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    
    const query = params.toString();
    const url = query ? `?${query}` : window.location.pathname;
    
    // Use replace to avoid adding to history stack
    window.history.replaceState({}, "", url);
    
    // Also trigger router refresh for any server components
    router.refresh();
  }, [searchParams, router]);

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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (hasAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hasAuthModal]);

  const renderAuthContent = () => {
    switch (authType) {
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignupPage />;
      case "reset":
        return <ResetPage />;
      default:
        return null;
    }
  };

  const fallbackRender = useCallback(
    ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
      <LayoutErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    ),
    []
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#0E111B] text-white">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ThemeProviderWrapper>
            {/* Background Layer */}
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
            {mounted && seoLoading && (
              <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 animate-pulse z-50" />
            )}

            {/* Main Content */}
            <div className="relative flex min-h-screen flex-col bg-transparent">
              {/* HEADER - Only show when not in auth page or modal mode */}
              {!hideLayout && mounted && (
                <header className="fixed top-0 left-0 w-full z-40 bg-[#0E111B]/80 backdrop-blur-xl border-b border-[#2A2F3E]">
                  <Suspense fallback={<div className="h-16 animate-pulse" />}>
                    <Header />
                  </Suspense>
                </header>
              )}

              {/* MAIN CONTENT with proper padding */}
              <main 
                className={`flex-1 bg-transparent ${
                  hideLayout 
                    ? "min-h-screen flex items-center justify-center" 
                    : isDashboardPage 
                      ? "pt-16" 
                      : "pt-20"
                }`}
              >
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

            {/* AUTH MODAL - Rendered via portal */}
            {hasAuthModal && mounted && (
              <ModalRoot isOpen={true} onClose={closeModal}>
                <AuthModal onClose={closeModal}>
                  {renderAuthContent()}
                  
                  {/* Anti-fraud notice - only for signup */}
                  {authType === "signup" && (
                    <div className="px-6 pb-6">
                      <p className="text-xs text-gray-500 text-center">
                        Users are prohibited from using multiple accounts, completing offers on another user's account, 
                        or using any type of VPN, VPS, or Emulator software.
                      </p>
                    </div>
                  )}
                </AuthModal>
              </ModalRoot>
            )}
          </ThemeProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
