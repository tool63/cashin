import "@/styles/globals.css";
import { ReactNode } from "react";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface CountryLayoutProps {
  children: ReactNode;
  params: { country: string };
}

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "en",
  uk: "en",
  ca: "en",
  au: "en",
  in: "en",
  fr: "fr",
  de: "de",
};

export default function CountryLayout({
  children,
  params,
}: CountryLayoutProps) {
  const lang = COUNTRY_LANGUAGE_MAP[params.country] || "en";

  return (
    <html lang={lang}>
      <head>
        <title>Cashog</title>
      </head>

      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider>
            <Header />

            <main className="min-h-screen pt-20 bg-bg-secondary dark:bg-bg-primary">
              {children}
            </main>

            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
