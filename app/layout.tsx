"use client";

import "../styles/globals.css";

import React, { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

import RootProviders from "./providers/RootProviders";

import SeoRenderer from "@/components/SEO/SeoRenderer";

import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));
const Background = dynamic(() => import("@/components/Background"));
const FloatingCTA = dynamic(() => import("@/components/cta/FloatingCTA"));

interface RootLayoutProps {
  children: ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E111B]">
      <div className="text-center">
        <h1 className="text-xl text-white mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-400 text-sm">
          {error.message}
        </p>
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {

  const seo = await buildSEO({
    route: "/",
    locale: SEO_CONFIG.defaultLocale,
  });

  return (
    <html
      lang={SEO_CONFIG.defaultLocale}
      suppressHydrationWarning
    >
      <body className="bg-[#0E111B] text-white min-h-screen antialiased">

        <ErrorBoundary FallbackComponent={ErrorFallback}>

          <RootProviders>

            {/* SEO Renderer */}
            {seo && <SeoRenderer seo={seo} />}

            {/* Background */}
            <Background />

            <div className="relative flex min-h-screen flex-col">

              {/* HEADER */}
              <header className="fixed top-0 w-full z-40 bg-[#0E111B]/80 backdrop-blur-xl border-b border-[#2A2F3E]">
                <Suspense fallback={<div className="h-16" />}>
                  <Header />
                </Suspense>
              </header>

              {/* MAIN CONTENT */}
              <main className="flex-1 pt-20">
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

          </RootProviders>

        </ErrorBoundary>

      </body>
    </html>
  );
}
