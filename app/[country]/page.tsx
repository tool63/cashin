import { cookies } from "next/headers";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import { COOKIE_KEYS, SUPPORTED_LANGUAGES } from "@/app/core/constants";
import { loadAllTranslations } from "@/app/core/i18n/loader";

import HeroSection from "@/components/homepage/HeroSection";
import FAQ from "@/components/faq/FAQ";

import { generateJsonLd } from "@/components/SEO/schema";

type Translations = {
  homepage?: {
    hero?: any;
    faq?: {
      title?: string;
    } | string;
  };
};

function getLanguage(country: CountryCode) {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as any)) return lang;
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as any)) return lang;
  }

  return getCountry(country).defaultLanguage;
}

export default async function HomePage({
  params,
}: {
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null; // layout already handles redirect
  }

  const country = countryParam as CountryCode;
  const countryName = getCountry(country).name;

  const language = getLanguage(country);
  const t = (await loadAllTranslations(language)) as Translations;

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection data={t?.homepage?.hero} />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          {typeof t?.homepage?.faq === "object" &&
          t.homepage?.faq?.title
            ? t.homepage.faq.title
            : "Frequently Asked Questions"}
        </h2>

        <FAQ
          faqs={[
            {
              q: `Is it possible to earn money in ${countryName}?`,
              a: "Yes, many users earn daily.",
            },
          ]}
        />
      </div>
    </main>
  );
}
