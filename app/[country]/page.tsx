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

import FAQ from "@/components/animations/FAQ";
import CircleBorder from "@/components/animations/CircleBorder"; // ✅ added

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

      {/* FAQ SECTION WITH CIRCLE BORDER */}
      <div className="py-16 px-4">
        <CircleBorder>
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <FAQ
              faqs={[
                {
                  q: `How can I earn money online in ${countryName}?`,
                  a: `You can earn money online in ${countryName} by completing simple tasks such as surveys, app installs, watching videos, and testing services. Many users start earning within minutes and withdraw their first payment the same day.`,
                },
                {
                  q: `Is it really possible to earn money without investment?`,
                  a: `Yes, absolutely. You don’t need to invest any money to start earning. Platforms like this are completely free to join and pay users for their time and engagement with partner offers.`,
                },
                {
                  q: `How much money can I make daily?`,
                  a: `Your earnings depend on how active you are. Some users earn a few dollars per day casually, while more active users can earn significantly more by completing multiple high-paying tasks consistently.`,
                },
                {
                  q: `How do I withdraw my earnings?`,
                  a: `You can withdraw your earnings through multiple payment methods such as mobile wallets, bank transfers, or gift cards depending on availability in ${countryName}. Withdrawals are usually fast and secure.`,
                },
                {
                  q: `Is this platform safe and legit?`,
                  a: `Yes, the platform is designed to be secure and trustworthy. Thousands of users worldwide are earning daily. Always follow the guidelines and avoid suspicious activities to keep your account safe.`,
                },
                {
                  q: `How quickly will I receive my payment?`,
                  a: `Most payments are processed instantly or within a few hours. In some cases, it may take up to 24 hours depending on the payment method and verification requirements.`,
                },
              ]}
            />
          </div>
        </CircleBorder>
      </div>
    </main>
  );
}
