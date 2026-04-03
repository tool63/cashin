// app/[country]/(marketing)/start-earning/page.tsx

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

export default async function StartEarningPage({
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
  const startEarning = await loadSectionTranslation(language, "startearning");

  /* ================= SEO ================= */
  const title = startEarning?.seo?.title || `Start Earning Money Online in ${countryName} - Join Now`;
  const description = startEarning?.seo?.description || `Start earning real money online in ${countryName} today. Complete simple tasks, take surveys, and get paid instantly. Free to join!`;

  const structuredData = generateJsonLd({
    path: `/${country}/start-earning`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: startEarning?.hero?.title?.replace(/\{country\}/g, countryName),
    subtitle: startEarning?.hero?.subtitle?.replace(/\{country\}/g, countryName),
  };

  const categoriesData = (startEarning?.categories || []).map((category: any) => ({
    icon: category?.icon,
    title: category?.title?.replace(/\{country\}/g, countryName),
    description: category?.description?.replace(/\{country\}/g, countryName),
    earningPotential: category?.earningPotential?.replace(/\{country\}/g, countryName),
    timeRequired: category?.timeRequired,
    tasks: category?.tasks || [],
    isPopular: category?.isPopular || false,
  }));

  const quickTasksData = (startEarning?.quickTasks || []).map((task: any) => ({
    task: task?.task?.replace(/\{country\}/g, countryName),
    reward: task?.reward,
    timeEstimate: task?.timeEstimate,
    difficulty: task?.difficulty,
  }));

  const bonusesData = (startEarning?.bonuses || []).map((bonus: any) => ({
    amount: bonus?.amount,
    condition: bonus?.condition?.replace(/\{country\}/g, countryName),
    badge: bonus?.badge,
  }));

  const testimonialsData = (startEarning?.testimonials || []).map((testimonial: any) => ({
    name: testimonial?.name,
    earnings: testimonial?.earnings,
    quote: testimonial?.quote?.replace(/\{country\}/g, countryName),
    avatar: testimonial?.avatar,
  }));

  const stepsData = (startEarning?.steps || []).map((step: any, index: number) => ({
    number: index + 1,
    title: step?.title?.replace(/\{country\}/g, countryName),
    description: step?.description?.replace(/\{country\}/g, countryName),
  }));

  const faqData = {
    title: startEarning?.faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(startEarning?.faq?.items)
      ? startEarning.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: startEarning?.final?.title?.replace(/\{country\}/g, countryName),
    subtitle: startEarning?.final?.subtitle?.replace(/\{country\}/g, countryName),
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
              {startEarning?.statsTitle?.replace(/\{country\}/g, countryName) || "Platform Statistics"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {startEarning?.stats?.activeUsers || "50K+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {startEarning?.stats?.activeUsersLabel || "Active Users"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {startEarning?.stats?.paidOut || "$2.5M+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {startEarning?.stats?.paidOutLabel || "Paid Out"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {startEarning?.stats?.availability || "24/7"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {startEarning?.stats?.availabilityLabel || "Task Availability"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {startEarning?.stats?.withdrawals || "Instant"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {startEarning?.stats?.withdrawalsLabel || "Withdrawals"}
              </div>
            </div>
          </div>
        </section>
      </OpeningStyle>

      {/* Earning Categories */}
      {categoriesData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {startEarning?.categoriesTitle?.replace(/\{country\}/g, countryName) || "Choose Your Earning Path"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {startEarning?.categoriesSubtitle?.replace(/\{country\}/g, countryName) || "Find the perfect earning method that matches your skills and schedule"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesData.map((category: any, index: number) => (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 ${
                    category.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {category.isPopular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-5xl mb-4 text-center">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                    {category.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">💰 Earning Potential:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{category.earningPotential}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">⏱️ Time Required:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{category.timeRequired}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Popular tasks:</p>
                    <ul className="space-y-1">
                      {category.tasks.slice(0, 3).map((task: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="text-green-500">✓</span> {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <PrimaryCTA
                    href="/signup"
                    translationKey="start_now"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Quick Tasks Section */}
      {quickTasksData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {startEarning?.quickTasksTitle?.replace(/\{country\}/g, countryName) || "Quick Tasks You Can Start Today"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {startEarning?.quickTasksSubtitle?.replace(/\{country\}/g, countryName) || "No experience needed - start earning in minutes"}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {quickTasksData.map((task: any, index: number) => {
                const difficultyColors = {
                  Easy: 'text-green-600 bg-green-50 dark:bg-green-900/20',
                  Medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
                  Hard: 'text-red-600 bg-red-50 dark:bg-red-900/20',
                };
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{task.task}</h4>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">⏱️ {task.timeEstimate}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[task.difficulty]}`}>
                          {task.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">{task.reward}</div>
                      <PrimaryCTA
                        href="/signup"
                        translationKey="start_now"
                        observer={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Welcome Bonuses */}
      {bonusesData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {startEarning?.bonusesTitle?.replace(/\{country\}/g, countryName) || "Exclusive Welcome Bonuses"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {startEarning?.bonusesSubtitle?.replace(/\{country\}/g, countryName) || "Get started with these special offers"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {bonusesData.map((bonus: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-yellow-200 dark:border-gray-700 text-center"
                >
                  {bonus.badge && (
                    <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {bonus.badge}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{bonus.amount}</div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{bonus.condition}</p>
                  <PrimaryCTA
                    href="/signup"
                    translationKey="claim_offer"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* How to Start - Steps */}
      {stepsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {startEarning?.stepsTitle?.replace(/\{country\}/g, countryName) || "How to Start Earning"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {startEarning?.stepsSubtitle?.replace(/\{country\}/g, countryName) || "Get started in 3 simple steps"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stepsData.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.number}
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
      )}

      {/* Testimonials */}
      {testimonialsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {startEarning?.testimonialsTitle?.replace(/\{country\}/g, countryName) || "Real Success Stories"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {startEarning?.testimonialsSubtitle?.replace(/\{country\}/g, countryName) || "See how others are earning in {country}"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonialsData.map((testimonial: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">Earned {testimonial.earnings}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
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
            translationKey="create_account"
            observer={true}
          />
        </section>
      </OpeningStyle>
    </main>
  );
}
