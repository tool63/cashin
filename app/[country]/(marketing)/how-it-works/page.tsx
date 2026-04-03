// app/[country]/(marketing)/how-it-works/page.tsx

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

import { generateJsonLd } from "@/components/SEO/schema";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import OpeningStyle from "@/components/animations/openingstyle";
import FAQ from "@/components/animations/FAQ";

/* ================= HELPER ================= */

async function loadSectionTranslation(language: string, section: string) {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch (error) {
    console.warn(`Missing translation: ${section} (${language})`);
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

export default async function HowItWorksPage({
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
  const howItWorks = await loadSectionTranslation(language, "howitworks");

  /* ================= SEO ================= */
  const title = howItWorks?.seo?.title || `How It Works - Earn Money Online in ${countryName}`;
  const description = howItWorks?.seo?.description || `Learn how to earn real money online in ${countryName}. Simple steps, multiple earning methods, and instant payouts.`;

  const structuredData = generateJsonLd({
    path: `/${country}/how-it-works`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: howItWorks?.hero?.title?.replace(/\{country\}/g, countryName),
    subtitle: howItWorks?.hero?.subtitle?.replace(/\{country\}/g, countryName),
  };

  const stepsData = (howItWorks?.steps || []).map((step: any, index: number) => ({
    number: index + 1,
    title: step?.title?.replace(/\{country\}/g, countryName),
    description: step?.description?.replace(/\{country\}/g, countryName),
    icon: step?.icon,
  }));

  const videoData = {
    url: howItWorks?.video?.url,
    title: howItWorks?.video?.title?.replace(/\{country\}/g, countryName),
    description: howItWorks?.video?.description?.replace(/\{country\}/g, countryName),
  };

  const methodsData = (howItWorks?.earningMethods || []).map((method: any) => ({
    icon: method?.icon,
    title: method?.title?.replace(/\{country\}/g, countryName),
    description: method?.description?.replace(/\{country\}/g, countryName),
  }));

  const faqData = {
    title: howItWorks?.faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(howItWorks?.faq?.items)
      ? howItWorks.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: howItWorks?.final?.title?.replace(/\{country\}/g, countryName),
    subtitle: howItWorks?.final?.subtitle?.replace(/\{country\}/g, countryName),
  };

  /* ================= RENDER ================= */
  return (
    <main className="flex flex-col items-center w-full">
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Hero Section */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
            {heroData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <PrimaryCTA
            href="/signup"
            translationKey="start_earning_now"
            observer={true}
          />
        </section>
      </OpeningStyle>

      {/* Steps Section */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {howItWorks?.stepsTitle?.replace(/\{country\}/g, countryName) || "Simple Steps to Start Earning"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
              {howItWorks?.stepsSubtitle?.replace(/\{country\}/g, countryName) || "Get started in minutes with our easy process"}
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            {stepsData.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 flex items-center justify-center shadow-lg">
                      {step.icon ? (
                        <span className="text-2xl md:text-3xl">{step.icon}</span>
                      ) : (
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {step.number}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < stepsData.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-green-400 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>
      </OpeningStyle>

      {/* Video Section */}
      {videoData.url && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {videoData.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {videoData.description}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    src={videoData.url}
                    title="How it works video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Earning Methods Grid */}
      {methodsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {howItWorks?.methodsTitle?.replace(/\{country\}/g, countryName) || "Multiple Ways to Earn"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {howItWorks?.methodsSubtitle?.replace(/\{country\}/g, countryName) || "Choose the earning method that works best for you"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodsData.map((method: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-5xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Stats Highlights */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {howItWorks?.statsTitle?.replace(/\{country\}/g, countryName) || "Platform Statistics"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {howItWorks?.stats?.activeUsers || "50K+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {howItWorks?.stats?.activeUsersLabel || "Active Users"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {howItWorks?.stats?.paidOut || "$2.5M+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {howItWorks?.stats?.paidOutLabel || "Paid Out"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {howItWorks?.stats?.availability || "24/7"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {howItWorks?.stats?.availabilityLabel || "Task Availability"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {howItWorks?.stats?.withdrawals || "Instant"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {howItWorks?.stats?.withdrawalsLabel || "Withdrawals"}
              </div>
            </div>
          </div>
        </section>
      </OpeningStyle>

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <OpeningStyle delay={0.1}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <FAQ title={faqData.title} faqs={faqData.items} />
          </div>
        </OpeningStyle>
      )}

      {/* Final Section - Same style as Hero */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {finalData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {finalData.subtitle}
          </p>
          <PrimaryCTA
            href="/signup"
            translationKey="start_earning_now"
            observer={true}
          />
        </section>
      </OpeningStyle>
    </main>
  );
}
