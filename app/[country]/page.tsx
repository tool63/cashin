import { cookies } from "next/headers";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import {
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

import HeroSection from "@/components/homepage/HeroSection";
import FAQ from "@/components/animations/FAQ";
import CircleBorder from "@/components/animations/CircleBorder";

import { generateJsonLd } from "@/components/SEO/schema";

/* ================= LANGUAGE ================= */

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

/* ================= TYPES ================= */

type HomepageTranslation = {
  hero?: {
    headline?: string;
    subtext?: string;
    trust_badges?: string[];
  };
  faq?: {
    title?: string;
    items?: { q: string; a: string }[];
  };
};

/* ================= PAGE ================= */

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
  const countryName = getCountry(country).name;

  const language = getLanguage(country);

  // ✅ Load translations
  const translations = await loadAllTranslations(language);

  const homepage = (translations?.homepage || {}) as HomepageTranslation;

  /* ================= SEO ================= */

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* ================= HERO DATA ================= */

  const heroData = homepage?.hero || {};

  /* ================= FAQ ================= */

  const rawFaqs = homepage?.faq?.items || [];

  const faqTitle =
    homepage?.faq?.title ||
    "Frequently Asked Questions";

  const faqs = rawFaqs.map((item) => ({
    q: item.q.replace("{country}", countryName),
    a: item.a.replace("{country}", countryName),
  }));

  /* ================= RENDER ================= */

  return (
    <main>
      {/* JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* HERO SECTION WITH CYCLING BORDER */}
      <div className="py-16 px-4">
        <CircleBorder>
          <HeroSection
            data={heroData}
            translations={translations}
            countryName={countryName}
          />
        </CircleBorder>
      </div>

      {/* FAQ SECTION WITH CYCLING BORDER */}
      <div className="py-16 px-4">
        <CircleBorder>
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-6">
              {faqTitle}
            </h2>

            <FAQ faqs={faqs} />
          </div>
        </CircleBorder>
      </div>
    </main>
  );
}
