// app/[country]/(marketing)/trust-safety/page.tsx

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

export default async function TrustSafetyPage({
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
  const trustSafety = await loadSectionTranslation(language, "trust-safety");

  /* ================= SEO ================= */
  const title = trustSafety?.seo?.title || `Trust & Safety - Secure Platform in ${countryName}`;
  const description = trustSafety?.seo?.description || `Learn how we keep your data and earnings secure in ${countryName}. SSL encryption, GDPR compliance, and 24/7 monitoring.`;

  const structuredData = generateJsonLd({
    path: `/${country}/trust-safety`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: trustSafety?.hero?.title?.replace(/\{country\}/g, countryName),
    subtitle: trustSafety?.hero?.subtitle?.replace(/\{country\}/g, countryName),
  };

  const statsData = {
    title: trustSafety?.statsTitle?.replace(/\{country\}/g, countryName),
    users: trustSafety?.stats?.users?.replace(/\{country\}/g, countryName),
    usersLabel: trustSafety?.stats?.usersLabel,
    countries: trustSafety?.stats?.countries?.replace(/\{country\}/g, countryName),
    countriesLabel: trustSafety?.stats?.countriesLabel,
    uptime: trustSafety?.stats?.uptime?.replace(/\{country\}/g, countryName),
    uptimeLabel: trustSafety?.stats?.uptimeLabel,
    secured: trustSafety?.stats?.secured?.replace(/\{country\}/g, countryName),
    securedLabel: trustSafety?.stats?.securedLabel,
  };

  const securityFeaturesData = (trustSafety?.securityFeatures || []).map((feature: any) => ({
    icon: feature?.icon,
    title: feature?.title?.replace(/\{country\}/g, countryName),
    description: feature?.description?.replace(/\{country\}/g, countryName),
  }));

  const trustBadgesData = (trustSafety?.trustBadges || []).map((badge: any) => ({
    icon: badge?.icon,
    title: badge?.title?.replace(/\{country\}/g, countryName),
    description: badge?.description?.replace(/\{country\}/g, countryName),
  }));

  const principlesData = (trustSafety?.principles || []).map((principle: any, index: number) => ({
    number: index + 1,
    title: principle?.title?.replace(/\{country\}/g, countryName),
    description: principle?.description?.replace(/\{country\}/g, countryName),
    icon: principle?.icon,
  }));

  const certificationsData = (trustSafety?.certifications || []).map((cert: any) => ({
    icon: cert?.icon,
    name: cert?.name?.replace(/\{country\}/g, countryName),
    description: cert?.description?.replace(/\{country\}/g, countryName),
  }));

  const faqData = {
    title: trustSafety?.faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(trustSafety?.faq?.items)
      ? trustSafety.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: trustSafety?.final?.title?.replace(/\{country\}/g, countryName),
    subtitle: trustSafety?.final?.subtitle?.replace(/\{country\}/g, countryName),
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

      {/* Stats Highlights */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {statsData.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.users}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.usersLabel}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.countries}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.countriesLabel}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.uptime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.uptimeLabel}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.secured}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.securedLabel}
              </div>
            </div>
          </div>
        </section>
      </OpeningStyle>

      {/* Security Features Grid */}
      {securityFeaturesData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {trustSafety?.securityTitle?.replace(/\{country\}/g, countryName) || "Security Features"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {trustSafety?.securitySubtitle?.replace(/\{country\}/g, countryName) || "Your security is our top priority"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeaturesData.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Trust Badges */}
      {trustBadgesData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {trustSafety?.trustTitle?.replace(/\{country\}/g, countryName) || "Why You Can Trust Us"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadgesData.map((badge: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Our Principles */}
      {principlesData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {trustSafety?.principlesTitle?.replace(/\{country\}/g, countryName) || "Our Core Principles"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {principlesData.map((principle: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    {principle.icon || principle.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Certifications */}
      {certificationsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {trustSafety?.certificationsTitle?.replace(/\{country\}/g, countryName) || "Certifications & Compliance"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {certificationsData.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-5xl mb-3">{cert.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <OpeningStyle delay={0.1}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <FAQ title={faqData.title} faqs={faqData.items} />
          </div>
        </OpeningStyle>
      )}

      {/* Final Section */}
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
