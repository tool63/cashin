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

import HeroSection from "@/components/homepage/HeroSection";
import TypingText from "@/components/typing/home";
import FAQ from "@/components/animations/FAQ";
import CircleBorder from "@/components/animations/CircleBorder";

import { generateJsonLd } from "@/components/SEO/schema";

/* ================= HELPER: LOAD SECTION ================= */

async function loadSectionTranslation(
  language: string,
  section: string
) {
  try {
    const file = await import(
      `@/app/locales/${language}/${section}.json`
    );
    return file.default;
  } catch {
    return {};
  }
}

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

  /* ================= LOAD TRANSLATIONS ================= */

  const hero = await loadSectionTranslation(language, "herohome");
  const typing = await loadSectionTranslation(language, "typinghome");
  const faq = await loadSectionTranslation(language, "faqhome");

  /* ================= SEO ================= */

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* ================= HERO ================= */

  const heroData = {
    headline: hero?.headline?.replace(/\{country\}/g, countryName),
    subtext: hero?.subtext?.replace(/\{country\}/g, countryName),
    trust_badges: hero?.trust_badges?.map((b: string) =>
      b.replace(/\{country\}/g, countryName)
    ),
  };

  /* ================= FAQ ================= */

  const faqTitle =
    faq?.title || "Frequently Asked Questions";

  const faqs =
    faq?.items?.map((item: any) => ({
      q: item.q.replace(/\{country\}/g, countryName),
      a: item.a.replace(/\{country\}/g, countryName),
    })) || [];

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

      {/* HERO */}
      <div className="py-16 px-4">
        <CircleBorder>
          <HeroSection
            data={heroData}
            translations={typing}   {/* 👈 only typing passed */}
            countryName={countryName}
          />
        </CircleBorder>
      </div>

      {/* FAQ */}
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
