"use client";

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import RootProviders from './providers/RootProviders';
import ThemeProviderWrapper from './providers/ThemeProviderWrapper';
import LanguageProvider from './providers/LanguageProvider';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Background from '@/components/Background';
import FloatingCTA from '@/components/cta/FloatingCTA';
import AuthLayout from './@auth/layout';
import SeoRenderer from '@/components/SEO/SeoRenderer';
import { SEO_CONFIG } from '@/components/SEO/seoConfig';
import { SEOOutput } from '@/components/SEO/seoEngine';

interface RootLayoutProps {
  children: ReactNode;
  authPage?: boolean; // if true, wrap in AuthLayout
}

// Convert SEO_CONFIG into SEOOutput format for SeoRenderer
const defaultSeo: SEOOutput = {
  metadata: {
    title: SEO_CONFIG.defaultTitle || SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription || '',
    keywords: SEO_CONFIG.defaultKeywords || [],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: SEO_CONFIG.siteUrl,
      title: SEO_CONFIG.defaultTitle || SEO_CONFIG.siteName,
      description: SEO_CONFIG.defaultDescription || '',
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.defaultLocale,
      images: [
        {
          url: SEO_CONFIG.defaultOgImage || '',
          width: 1200,
          height: 630,
          alt: SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle || '',
      images: SEO_CONFIG.defaultTwitterImage ? [SEO_CONFIG.defaultTwitterImage] : [],
      imageAlt: SEO_CONFIG.siteName,
    },
    viewport: 'width=device-width, initial-scale=1',
    other: {
      'theme-color': SEO_CONFIG.themeColor || '#000000',
    },
  },
  canonical: SEO_CONFIG.siteUrl,
  hreflang: Object.fromEntries(
    SEO_CONFIG.supportedLocales.map((loc) => [loc, SEO_CONFIG.siteUrl])
  ),
  pageType: { type: 'home' }, // ✅ fixed TypeScript error
  structuredData: [],
  preconnect: SEO_CONFIG.preconnect || [],
  links: [],
  prefetch: [],
  prerender: [],
};

// Page transition animation
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

// Header/Footer/FloatingCTA animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function RootLayout({ children, authPage = false }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* SEO Renderer */}
        <SeoRenderer seo={defaultSeo} />
      </head>
      <body className="relative min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <RootProviders>
          <ThemeProviderWrapper>
            <LanguageProvider>
              {authPage ? (
                <AuthLayout>{children}</AuthLayout>
              ) : (
                <>
                  <Background />

                  {/* Animated Header */}
                  <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <Header />
                  </motion.div>

                  {/* Animate page transitions */}
                  <AnimatePresence mode="wait">
                    <motion.main
                      key={typeof window !== 'undefined' ? window.location.pathname : 'root'}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageTransition}
                      className="relative z-10"
                    >
                      {children}
                    </motion.main>
                  </AnimatePresence>

                  {/* Animated Floating CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <FloatingCTA />
                  </motion.div>

                  {/* Animated Footer */}
                  <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <Footer />
                  </motion.div>
                </>
              )}
            </LanguageProvider>
          </ThemeProviderWrapper>
        </RootProviders>
      </body>
    </html>
  );
}
