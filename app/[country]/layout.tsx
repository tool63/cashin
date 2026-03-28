import "@/styles/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";

import {
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 📝 COUNTRY-SPECIFIC METADATA
// ===============================
export async function generateMetadata({
  params,
}: {
  params: { country?: string };
}): Promise<Metadata> {
  const countryParam = params?.country?.toLowerCase();
  
  // Validate country
  if (!countryParam || !isValidCountryCode(countryParam)) {
    return {
      title: "Country Not Found | Cashog",
      robots: {
        index: false,
      },
    };
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const defaultLang = countryData.defaultLanguage;

  // Fix: Convert to string for comparison or use type assertion
  const getLocale = () => {
    const lang = defaultLang as string;
    if (lang === "bn") return "bn_BD";
    if (lang === "ur") return "ur_PK";
    if (lang === "ar") return "ar_SA";
    if (lang === "hi") return "hi_IN";
    return `${lang}_${country.toUpperCase()}`;
  };

  // Country-specific metadata with generic keywords
  return {
    title: {
      template: `%s ${countryName}`,
      default: `Earn Money Online in ${countryName} | Cashog`,
    },
    description: `Earn real money online in ${countryName} with Cashog. Complete paid surveys, install apps, play games, and get instant payouts. Join thousands of successful earners in ${countryName} today!`,
    keywords: [
      "earn money online",
      "make money online",
      "online earning",
      "paid surveys",
      "get paid",
      "cash app",
      "online jobs",
      "work from home",
      "earn cash",
      "money making apps",
      "Cashog",
      "earn money fast",
      "legitimate online income",
      "side hustle",
      "passive income",
      "online rewards",
      "get paid to play games",
      "get paid to take surveys",
      "instant payout",
      "real earning app",
    ].join(", "),
    authors: [{ name: "Cashog" }],
    creator: "Cashog",
    publisher: "Cashog",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://cashog.com/${country}`,
    },
    openGraph: {
      type: "website",
      locale: getLocale(),
      url: `https://cashog.com/${country}`,
      siteName: `Cashog ${countryName}`,
      title: `Earn Money Online in ${countryName} | Cashog`,
      description: `Start earning real money online in ${countryName} with Cashog. Complete simple tasks, surveys, and offers to get paid instantly. Trusted by thousands of users in ${countryName}.`,
      images: [
        {
          url: `https://cashog.com/og-image-${country}.jpg`,
          width: 1200,
          height: 630,
          alt: "Earn Money Online - Cashog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Earn Money Online in ${countryName} | Cashog`,
      description: `Start earning real money online in ${countryName} with Cashog. Join thousands of successful earners today!`,
      images: [`https://cashog.com/twitter-image-${country}.jpg`],
      creator: "@cashog",
      site: "@cashog",
    },
  };
}

// ===============================
// 🌍 COUNTRY → LANGUAGE
// ===============================
function getCountryLanguage(countryCode: CountryCode): SupportedLanguage {
  const country = getCountry(countryCode);
  return country.defaultLanguage as SupportedLanguage;
}

// ===============================
// 🌐 LANGUAGE DETECTION
// ===============================
function getInitialLanguage(
  country: CountryCode,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  // 1. User override (highest priority)
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (userOverride) {
    const normalized = userOverride.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // 2. Saved language
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // 3. Country default
  return getCountryLanguage(country);
}

// ===============================
// 🌐 LANGUAGE OVERRIDE FLAG
// ===============================
function isLanguageOverridden(cookieStore: ReturnType<typeof cookies>): boolean {
  return !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
}

// ===============================
// 🌐 RTL / LTR
// ===============================
function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtlLanguages = ["ar", "he", "ur", "fa"];
  return rtlLanguages.includes(lang) ? "rtl" : "ltr";
}

// ===============================
// 🚀 COUNTRY LAYOUT
// ===============================
export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { country?: string };
}) {
  const cookieStore = cookies();

  // -------------------------------
  // 🌍 VALIDATE COUNTRY (STRICT)
  // -------------------------------
  const countryParam = params?.country?.toLowerCase();

  // ❌ No country OR /global → redirect root
  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  // ❌ Invalid country → redirect root
  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);

  // -------------------------------
  // 🌐 LANGUAGE
  // -------------------------------
  const language = getInitialLanguage(country, cookieStore);
  const isOverridden = isLanguageOverridden(cookieStore);
  const dir = getDirection(language);

  // -------------------------------
  // 📦 LOAD TRANSLATIONS
  // -------------------------------
  const translations = await loadAllTranslations(language);

  // -------------------------------
  // 🎯 RENDER
  // -------------------------------
  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
              isOverridden={isOverridden}
            >
              <Header />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
              <FloatingCTA />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
