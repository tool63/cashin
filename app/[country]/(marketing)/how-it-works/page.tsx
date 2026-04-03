import { cookies } from "next/headers";
import Link from "next/link";

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

import CircleBorder from "@/components/animations/CircleBorder";
import { generateJsonLd } from "@/components/SEO/schema";

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

/* ================= COMPONENTS ================= */

function StepCard({
  number,
  title,
  description,
  icon,
  isLast = false,
}: {
  number: number;
  title: string;
  description: string;
  icon?: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Step Number & Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
            {icon ? (
              <span className="text-2xl md:text-3xl">{icon}</span>
            ) : (
              <span className="text-2xl md:text-3xl font-bold text-white">
                {number}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-400 to-transparent" />
      )}
    </div>
  );
}

function VideoSection({ videoUrl, title, description }: { videoUrl?: string; title: string; description: string }) {
  if (!videoUrl) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          src={videoUrl}
          title="How it works video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function EarningMethodsGrid({ methods }: { methods: Array<{ icon: string; title: string; description: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {methods.map((method, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="text-4xl mb-4">{method.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {method.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {method.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function CTABanner({ title, subtitle, ctaText, countryName }: { title: string; subtitle: string; ctaText: string; countryName: string }) {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-primary-100 mb-6 max-w-2xl mx-auto">{subtitle}</p>
      <Link
        href={`/${countryName.toLowerCase()}/signup`}
        className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
      >
        {ctaText}
      </Link>
    </div>
  );
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

  const ctaData = {
    title: howItWorks?.cta?.title?.replace(/\{country\}/g, countryName),
    subtitle: howItWorks?.cta?.subtitle?.replace(/\{country\}/g, countryName),
    buttonText: howItWorks?.cta?.buttonText?.replace(/\{country\}/g, countryName),
  };

  /* ================= RENDER ================= */
  return (
    <main className="flex flex-col items-center w-full">
      {/* Structured Data */}
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
      <section className="w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            {heroData.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {heroData.subtitle}
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 md:space-y-16">
              {stepsData.map((step: any, index: number) => (
                <StepCard
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isLast={index === stepsData.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {videoData.url && (
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <VideoSection
              videoUrl={videoData.url}
              title={videoData.title}
              description={videoData.description}
            />
          </div>
        </section>
      )}

      {/* Earning Methods Grid */}
      {methodsData.length > 0 && (
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {howItWorks?.methodsTitle?.replace(/\{country\}/g, countryName) || "Multiple Ways to Earn"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {howItWorks?.methodsSubtitle?.replace(/\{country\}/g, countryName) || "Choose the earning method that works best for you"}
              </p>
            </div>
            <EarningMethodsGrid methods={methodsData} />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {howItWorks?.faq?.items?.length > 0 && (
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {howItWorks?.faq?.title?.replace(/\{country\}/g, countryName) || "Frequently Asked Questions"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {howItWorks.faq.items.map((item: any, index: number) => (
                <details
                  key={index}
                  className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {item.question?.replace(/\{country\}/g, countryName)}
                    </h3>
                    <div className="text-primary-600 dark:text-primary-400 group-open:rotate-45 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                    {item.answer?.replace(/\{country\}/g, countryName)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      {ctaData.title && (
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <CTABanner
              title={ctaData.title}
              subtitle={ctaData.subtitle}
              ctaText={ctaData.buttonText}
              countryName={countryName}
            />
          </div>
        </section>
      )}
    </main>
  );
}
