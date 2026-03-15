import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = "https://payup-pi.vercel.app";
const HREFLANG_MAP: Record<string, string> = {
  us: "en-US",
  uk: "en-GB",
  ca: "en-CA",
  au: "en-AU",
  fr: "fr-FR",
  de: "de-DE",
  in: "en-IN",
};

interface LayoutProps {
  children: ReactNode;
  params: { country: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const country = params.country.toLowerCase();

  const languages: Record<string, string> = {};
  Object.entries(HREFLANG_MAP).forEach(([c, lang]) => {
    languages[lang] = `${BASE_URL}/${c}`;
  });

  return {
    title: {
      default: `Earn Rewards Online - Cashog (${country.toUpperCase()})`,
      template: `%s - Cashog (${country.toUpperCase()})`,
    },
    description:
      "Earn rewards by completing surveys, installing apps, playing games, and watching videos on Cashog.",
    alternates: {
      canonical: `${BASE_URL}/${country}`,
      languages,
    },
  };
}

export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();
  const htmlLang = HREFLANG_MAP[country] || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider country={country}>
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
