import './globals.css';
import { ReactNode } from 'react';
import ThemeProviderWrapper from './providers/ThemeProviderWrapper';
import { LanguageProvider } from './providers/LanguageProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Cashog</title>
      </head>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider>
            {/* Fixed header */}
            <Header />

            {/* Main content with padding for header */}
            <main className="min-h-screen pt-20 bg-bg-secondary dark:bg-bg-primary">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
