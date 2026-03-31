import dynamic from "next/dynamic";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
  getCountryLanguage,
} from "@/app/core/countries";
import { loadAllTranslations } from "@/app/core/i18n/loader";

/* Layout */
import CircleBorder from "@/components/animations/CircleBorder";
import OpeningStyle from "@/components/animations/openingstyle";

/* Sections */
import HeroSection from "@/components/homepage/HeroSection";

/* FAQ */
import FAQ from "@/components/faq/FAQ";

/* SEO */
import { generateJsonLd } from "@/components/SEO/schema";

const SeoRenderer = dynamic(
  () => import("@/components/SEO/SeoRenderer"),
  { ssr: false }
);

/* =============================== */
function formatCountryName(code: string) {
  try {
    if (typeof Intl === "undefined" || !("DisplayNames" in Intl)) {
      return code.toUpperCase();
    }
    const regionNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    return regionNames.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

/* =============================== */
export default async function HomePage({
  params,
}: {
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null;
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);

  if (!countryData) return null;

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  /* 🌐 LANGUAGE (SAFE FIX) */
  const rawLanguage = getCountryLanguage(country);

  const supportedLanguages = ["en", "fr", "de", "es", "pt"] as const;

  const language: "en" | "fr" | "de" | "es" | "pt" =
    supportedLanguages.includes(rawLanguage as any)
      ? (rawLanguage as any)
      : "en";

  /* 🌐 TRANSLATIONS */
  const t = await loadAllTranslations(language);

  /* SEO */
  const title = `Earn Money Online in ${countryName} (${currentYear})`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* FAQ */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, many users in ${countryName} earn real money every day by completing simple online tasks such as surveys, downloading apps, and testing services.`,
    },
    {
      q: `How much can I realistically earn?`,
      a: `Most users earn between $50 to $500 per month depending on activity and consistency.`,
    },
    {
      q: `Is this platform safe and legit?`,
      a: `Yes, the platform is secure and trusted with encrypted transactions.`,
    },
    {
      q: `How do I start earning money quickly?`,
      a: `Create an account, complete tasks, and focus on high-paying offers.`,
    },
    {
      q: `What payment methods are available in ${countryName}?`,
      a: `PayPal, crypto, Payoneer, and gift cards.`,
    },
    {
      q: `How fast are withdrawals processed?`,
      a: `Usually within 24–48 hours.`,
    },
    {
      q: `Do I need to pay anything to join?`,
      a: `No, it's completely free.`,
    },
  ];

  /* =============================== */
  const Section = ({ children }: { children: React.ReactNode }) => (
    <OpeningStyle>
      <div className="w-full px-4 py-10 flex justify-center">
        <div className="w-full max-w-7xl">
          <CircleBorder>
            <div className="w-full">{children}</div>
          </CircleBorder>
        </div>
      </div>
    </OpeningStyle>
  );

  /* =============================== */
  return (
    <main>
      {/* SEO */}
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* HERO */}
      <Section>
        <HeroSection data={t.homepage.hero} />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="w-full max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t.homepage.faq?.title || "Frequently Asked Questions"}
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </Section>

      <div className="h-12" />
    </main>
  );
}
