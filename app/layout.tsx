"use client";

import "../styles/globals.css";
import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import Background from "@/components/Background";

import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

/**
 * =====================================
 * ✅ SEO Metadata Generator (Server)
 * =====================================
 */
export async function generateMetadata() {
  const headersList = headers();
  const pathname =
    headersList.get("x-pathname") ||
    headersList.get("referer") ||
    "/";

  const seo = buildSEO({
    route: pathname,
    locale: SEO_CONFIG.defaultLocale,
  });

  return {
    ...seo.metadata,
    alternates: {
      canonical: seo.canonical,
      languages: seo.hreflang,
    },
    robots: seo.metadata?.robots,
  };
}

interface RootLayoutProps {
  children: ReactNode;
  auth?: ReactNode;
}

export default function RootLayout({ children, auth }: RootLayoutProps) {
  const pathname = usePathname();

  /**
   * =====================================
   * Layout Visibility + Route Detection
   * =====================================
   */
  const {
    hideLayout,
    hasAuthModal,
    isAuthPage,
    isDashboardPage,
  } = useMemo(() => {
    const isAuth =
      pathname?.startsWith("/login") ||
      pathname?.startsWith("/signup") ||
      pathname?.startsWith("/reset");

    const isDashboard = pathname?.startsWith("/dashboard");

    const hasAuthModal = !!auth;

    return {
      isAuthPage: isAuth,
      isDashboardPage: isDashboard,
      hideLayout: isAuth && !hasAuthModal,
      hasAuthModal,
    };
  }, [pathname, auth]);

  /**
   * =====================================
   * Structured Data Injection (Client Safe)
   * =====================================
   */
  const seo = useMemo(() => {
    return buildSEO({
      route: pathname || "/",
      locale: SEO_CONFIG.defaultLocale,
    });
  }, [pathname]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className="min-h-screen overflow-x-hidden text-gray-900 transition-colors duration-500 dark:text-white bg-white dark:bg-[#070A14]">

        {/* JSON-LD Structured Data */}
        {seo.structuredData?.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        <ThemeProviderWrapper>

          {/* =====================================
              Global Background Layer
          ====================================== */}
          <Background />

          {/* =====================================
              Page Wrapper
          ====================================== */}
          <div className="relative z-10 flex min-h-screen flex-col">

            {/* =====================================
                Header (Hidden on Full Auth Pages)
            ====================================== */}
            {!hideLayout && (
              <header className="fixed top-0 left-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur-xl dark:border-gray-800 dark:bg-black/70 supports-[backdrop-filter]:bg-white/60">
                <Header />
              </header>
            )}

            {/* =====================================
                Main Content
            ====================================== */}
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

            {/* =====================================
                Footer (Hidden on Auth Pages)
            ====================================== */}
            {!hideLayout && <Footer />}

            {/* =====================================
                Floating CTA (Hidden on Auth Pages)
            ====================================== */}
            {!hideLayout && <FloatingCTA />}
          </div>

          {/* =====================================
              Auth Modal (Parallel Route Support)
          ====================================== */}
          {hasAuthModal && auth}

        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
