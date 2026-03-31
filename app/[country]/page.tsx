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
import { getTranslations } from "next-intl/server";

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

  await loadAllTranslations(language);
  const t = await getTranslations("homepage");

  /* ================= SEO ================= */

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* ================= FAQ (i18n) ================= */

  const rawFaqs = t.raw("faq.items") as { q: string; a: string }[];

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

      {/* FAQ SECTION */}
      <div className="py-16 px-4">
        <CircleBorder>
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-6">
              {t("faq.title")}
            </h2>

            <FAQ faqs={faqs} />
          </div>
        </CircleBorder>
      </div>
    </main>
  );
}
