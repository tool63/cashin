"use client";

import "../styles/globals.css";
import { ReactNode, useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";

// Dynamic components with proper loading states
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16 w-full bg-[#0E111B]" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-40 w-full bg-[#0E111B]" />,
});

const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"));

const Background = dynamic(() => import("@/components/Background"));

const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"));

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";

// Lazy load auth pages
const LoginPage = dynamic(() => import("@/app/@auth/login/page"));
const SignupPage = dynamic(() => import("@/app/@auth/signup/page"));
const ResetPage = dynamic(() => import("@/app/@auth/reset/page"));

interface RootLayoutProps {
  children: ReactNode;
}

// Simple error fallback
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E111B] p-4">
      <div className="text-center">
        <h1 className="text-xl text-white mb-2">Something went wrong</h1>
        <p className="text-gray-400 text-sm">{error.message}</p>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal logic
  const authType = searchParams?.get("auth");
  const hasAuthModal = authType === "login" || authType === "signup" || authType === "reset";

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const url = params.toString() ? `?${params}` : window.location.pathname;
    window.history.replaceState({}, "", url);
    router.refresh();
  };

  // Check if current page is auth page
  const isAuthPage = pathname?.startsWith("/login") || 
                     pathname?.startsWith("/signup") || 
                     pathname?.startsWith("/reset");
  
  const isDashboardPage = pathname?.startsWith("/dashboard");

  // SEO effect
  useEffect(() => {
    if (!mounted) return;

    buildSEO({
      route: pathname || "/",
      locale: SEO_CONFIG.defaultLocale,
      noindex: isAuthPage,
    })
      .then(setSeo)
      .catch(() => setSeo(null));
  }, [pathname, mounted, isAuthPage]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = hasAuthModal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hasAuthModal]);

  // Render auth content
  const renderAuthContent = () => {
    switch (authType) {
      case "login": return <LoginPage />;
      case "signup": return <SignupPage />;
      case "reset": return <ResetPage />;
      default: return null;
    }
  };

  // Don't render anything until mounted
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#0E111B] text-white">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProviderWrapper>
            {/* Background - only when not on auth page */}
            {!isAuthPage && <Background />}
            
            {/* SEO */}
            {seo && <SeoRenderer seo={seo} />}

            {/* Main Content */}
            <div className="relative flex min-h-screen flex-col">
              {/* Header - hide on auth pages */}
              {!isAuthPage && (
                <header className="fixed top-0 w-full z-40 bg-[#0E111B]/80 backdrop-blur-xl border-b border-[#2A2F3E]">
                  <Suspense fallback={<div className="h-16" />}>
                    <Header />
                  </Suspense>
                </header>
              )}

              {/* Main */}
              <main className={`flex-1 ${!isAuthPage ? (isDashboardPage ? "pt-16" : "pt-20") : ""}`}>
                {children}
              </main>

              {/* Footer - hide on auth pages */}
              {!isAuthPage && (
                <Suspense fallback={<div className="h-40" />}>
                  <Footer />
                </Suspense>
              )}

              {/* Floating CTA - hide on auth pages */}
              {!isAuthPage && (
                <Suspense fallback={null}>
                  <FloatingCTA />
                </Suspense>
              )}
            </div>

            {/* Auth Modal */}
            {hasAuthModal && (
              <ModalRoot isOpen onClose={closeModal}>
                <AuthModal onClose={closeModal}>
                  <Suspense fallback={<div className="h-96 bg-[#0E111B]" />}>
                    {renderAuthContent()}
                  </Suspense>
                  
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
