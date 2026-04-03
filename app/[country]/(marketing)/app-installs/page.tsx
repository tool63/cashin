// app/[country]/(marketing)/app-installs/page.tsx

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
import CircleBorder from "@/components/animations/CircleBorder";
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

export default async function AppInstallsPage({
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
  const appInstalls = await loadSectionTranslation(language, "appinstalls");

  /* ================= SEO OPTIMIZED ================= */
  const title = appInstalls?.seo?.title || `Get Paid to Install Apps - Earn $0.50-$5 Per App Install in ${countryName}`;
  const description = appInstalls?.seo?.description || `Earn real money by installing and testing mobile apps. Get paid $0.50-$5 per app install. Complete simple tasks like app reviews and earn instantly. Free to join!`;

  const structuredData = generateJsonLd({
    path: `/${country}/app-installs`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: appInstalls?.hero?.title?.replace(/\{country\}/g, countryName) || `Get Paid to Install Apps in ${countryName}`,
    subtitle: appInstalls?.hero?.subtitle?.replace(/\{country\}/g, countryName) || `Earn $0.50-$5 per app install. Test new apps, leave reviews, and get paid instantly. No experience needed!`,
  };

  const statsData = {
    title: appInstalls?.statsTitle?.replace(/\{country\}/g, countryName) || "App Install Platform Stats",
    totalInstalls: appInstalls?.stats?.totalInstalls || "10M+",
    totalInstallsLabel: appInstalls?.stats?.totalInstallsLabel || "App Installs Completed",
    avgPayout: appInstalls?.stats?.avgPayout || "$2.50",
    avgPayoutLabel: appInstalls?.stats?.avgPayoutLabel || "Average Per Install",
    activeUsers: appInstalls?.stats?.activeUsers || "300K+",
    activeUsersLabel: appInstalls?.stats?.activeUsersLabel || "Active Earners",
    availableApps: appInstalls?.stats?.availableApps || "1,000+",
    availableAppsLabel: appInstalls?.stats?.availableAppsLabel || "Available Apps",
  };

  const appCategoriesData = (appInstalls?.appCategories || []).map((category: any) => ({
    icon: category?.icon,
    title: category?.title?.replace(/\{country\}/g, countryName),
    description: category?.description?.replace(/\{country\}/g, countryName),
    avgReward: category?.avgReward,
    timeRequired: category?.timeRequired,
    tasksPerWeek: category?.tasksPerWeek,
  }));

  const featuredAppsData = (appInstalls?.featuredApps || []).map((app: any) => ({
    icon: app?.icon,
    name: app?.name?.replace(/\{country\}/g, countryName),
    reward: app?.reward,
    timeEstimate: app?.timeEstimate,
    requirements: app?.requirements,
    spotsLeft: app?.spotsLeft,
    category: app?.category,
  }));

  const howItWorksData = (appInstalls?.howItWorks || []).map((step: any, index: number) => ({
    number: index + 1,
    title: step?.title?.replace(/\{country\}/g, countryName),
    description: step?.description?.replace(/\{country\}/g, countryName),
    icon: step?.icon,
  }));

  const benefitsData = (appInstalls?.benefits || []).map((benefit: any) => ({
    icon: benefit?.icon,
    title: benefit?.title?.replace(/\{country\}/g, countryName),
    description: benefit?.description?.replace(/\{country\}/g, countryName),
  }));

  const testimonialsData = (appInstalls?.testimonials || []).map((testimonial: any) => ({
    name: testimonial?.name,
    country: testimonial?.country,
    earnings: testimonial?.earnings,
    quote: testimonial?.quote?.replace(/\{country\}/g, countryName),
    avatar: testimonial?.avatar,
    appsInstalled: testimonial?.appsInstalled,
  }));

  const faqData = {
    title: appInstalls?.faq?.title?.replace(/\{country\}/g, countryName) || `Get Paid to Install Apps - FAQ`,
    items: Array.isArray(appInstalls?.faq?.items)
      ? appInstalls.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: appInstalls?.final?.title?.replace(/\{country\}/g, countryName) || `Ready to Start Earning with App Installs?`,
    subtitle: appInstalls?.final?.subtitle?.replace(/\{country\}/g, countryName) || `Join 300,000+ members already getting paid. Install apps, leave reviews, and earn instantly!`,
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
      <CircleBorder>
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
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
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
                  {statsData.totalInstalls}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.totalInstallsLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.avgPayout}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.avgPayoutLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.activeUsers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.activeUsersLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.availableApps}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.availableAppsLabel}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* How It Works Section */}
      {howItWorksData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {appInstalls?.howItWorksTitle?.replace(/\{country\}/g, countryName) || "How It Works"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {appInstalls?.howItWorksSubtitle?.replace(/\{country\}/g, countryName) || "Get paid in 3 simple steps"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {howItWorksData.map((step: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {step.icon || step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* App Categories Grid */}
      {appCategoriesData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {appInstalls?.categoriesTitle?.replace(/\{country\}/g, countryName) || "Popular App Categories"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {appInstalls?.categoriesSubtitle?.replace(/\{country\}/g, countryName) || "Choose from hundreds of apps to install and test"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appCategoriesData.map((category: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Avg Reward:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{category.avgReward}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Time:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{category.timeRequired}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Tasks/Week:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{category.tasksPerWeek}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Featured Apps */}
      {featuredAppsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {appInstalls?.featuredTitle?.replace(/\{country\}/g, countryName) || "🔥 Featured High-Paying Apps"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {appInstalls?.featuredSubtitle?.replace(/\{country\}/g, countryName) || "Limited spots - install these apps today"}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {featuredAppsData.map((app: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-4xl">{app.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {app.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                              {app.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {app.requirements}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <span className="text-gray-500 dark:text-gray-400">⏱️ {app.timeEstimate}</span>
                            <span className="text-orange-600 dark:text-orange-400">🎯 {app.spotsLeft} spots left</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {app.reward}
                        </div>
                        <PrimaryCTA
                          href="/signup"
                          translationKey="start_now"
                          observer={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Benefits Section */}
      {benefitsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {appInstalls?.benefitsTitle?.replace(/\{country\}/g, countryName) || "Why Install Apps With Us"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitsData.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Testimonials */}
      {testimonialsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {appInstalls?.testimonialsTitle?.replace(/\{country\}/g, countryName) || "Real Members, Real Earnings"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.map((testimonial: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.country}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                      <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        Earned {testimonial.earnings}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {testimonial.appsInstalled} apps installed
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
              <FAQ title={faqData.title} faqs={faqData.items} />
            </div>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Final CTA Section */}
      <CircleBorder>
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
      </CircleBorder>
    </main>
  );
}
