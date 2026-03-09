"use client";

import './globals.css';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import RootProviders from './providers/RootProviders';
import ThemeProviderWrapper from './providers/ThemeProviderWrapper';
import LanguageProvider from './providers/LanguageProvider';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Background from '@/components/Background';
import FloatingCTA from '@/components/cta/FloatingCTA';
import AuthLayout from '@/components/auth/AuthLayout';
import SeoRenderer from '@/components/SEO/SeoRenderer';
import { SEO_CONFIG } from '@/components/SEO/seoConfig';

interface RootLayoutProps {
  children: ReactNode;
  authPage?: boolean; // if true, wrap in AuthLayout
}

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
        <SeoRenderer config={SEO_CONFIG} />
      </head>
      <body className="relative min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <RootProviders>
          <ThemeProviderWrapper>
            <LanguageProvider>
              {authPage ? (
                // Render auth page layout
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
