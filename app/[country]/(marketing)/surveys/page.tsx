// app/[country]/(marketing)/surveys/page.tsx

import { cookies } from "next/headers";
import { Metadata } from "next";

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

/* ================= METADATA ================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country?: string }> | { country?: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return {
      title: "Country Not Found | Cashog",
      robots: { index: false },
    };
  }

  const country = countryParam as CountryCode;
  const countryName = getCountry(country).name;

  // Try to load translations for SEO
  const language = getLanguage(country);
  let surveysTranslation = {};
  try {
    surveysTranslation = await loadSectionTranslation(language, "surveys");
  } catch (error) {
    // Use defaults if translation fails
  }

  const seoTitle = (surveysTranslation as any)?.seo?.title || 
    `Paid Surveys in ${countryName} - Earn $5-$50 Per Survey | Cashog`;
  
  const seoDescription = (surveysTranslation as any)?.seo?.description || 
    `Join 200,000+ members earning real cash in ${countryName}. Take paid surveys from top brands. Get paid via PayPal or gift cards. Free to join today!`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: `paid surveys ${countryName}, earn money surveys ${countryName}, online surveys paid cash ${countryName}, survey sites ${countryName}, get paid for opinions ${countryName}`,
    alternates: {
      canonical: `https://cashog.com/${country}/surveys`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/surveys`,
      siteName: "Cashog",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

/* ================= PAGE ================= */

export default async function SurveysPage({
  params,
}: {
  params: Promise<{ country?: string }> | { country?: string };
}) {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null;
  }

  const country = countryParam as CountryCode;
  const countryName = getCountry(country).name;
  const language = getLanguage(country);

  /* ================= LOAD TRANSLATIONS ================= */
  const surveys = await loadSectionTranslation(language, "surveys");

  /* ================= SEO OPTIMIZED (50-60 chars) ================= */
  const title = surveys?.seo?.title || `Paid Surveys in ${countryName} - Earn $5-$50 Per Survey`;
  const description = surveys?.seo?.description || `Join 200,000+ members earning real cash in ${countryName}. Take paid surveys from top brands. Get paid via PayPal or gift cards. Free to join today!`;

  const structuredData = generateJsonLd({
    path: `/${country}/surveys`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: surveys?.hero?.title?.replace(/\{country\}/g, countryName) || `Get Paid For Your Opinion in ${countryName}`,
    subtitle: surveys?.hero?.subtitle?.replace(/\{country\}/g, countryName) || `Join 200,000+ members earning real cash. Share your thoughts, influence brands, and get paid instantly. No experience needed!`,
  };

  const statsData = {
    title: surveys?.statsTitle?.replace(/\{country\}/g, countryName) || "Trusted by Thousands",
    surveysCompleted: surveys?.stats?.surveysCompleted || "5M+",
    surveysCompletedLabel: surveys?.stats?.surveysCompletedLabel || "Paid Surveys Completed",
    avgPayout: surveys?.stats?.avgPayout || "$3.50",
    avgPayoutLabel: surveys?.stats?.avgPayoutLabel || "Average Payout",
    activeUsers: surveys?.stats?.activeUsers || "200K+",
    activeUsersLabel: surveys?.stats?.activeUsersLabel || "Active Members",
    brands: surveys?.stats?.brands || "500+",
    brandsLabel: surveys?.stats?.brandsLabel || "Brand Partners",
  };

  const surveyCategoriesData = (surveys?.surveyCategories || []).map((category: any) => ({
    icon: category?.icon,
    title: category?.title?.replace(/\{country\}/g, countryName),
    description: category?.description?.replace(/\{country\}/g, countryName),
    avgReward: category?.avgReward,
    timeRequired: category?.timeRequired,
    frequency: category?.frequency,
  }));

  const featuredSurveysData = (surveys?.featuredSurveys || []).map((survey: any) => ({
    title: survey?.title?.replace(/\{country\}/g, countryName),
    reward: survey?.reward,
    timeEstimate: survey?.timeEstimate,
    difficulty: survey?.difficulty,
    spotsLeft: survey?.spotsLeft,
    company: survey?.company,
  }));

  const benefitsData = (surveys?.benefits || []).map((benefit: any) => ({
    icon: benefit?.icon,
    title: benefit?.title?.replace(/\{country\}/g, countryName),
    description: benefit?.description?.replace(/\{country\}/g, countryName),
  }));

  const tipsData = (surveys?.tips || []).map((tip: any, index: number) => ({
    number: index + 1,
    title: tip?.title?.replace(/\{country\}/g, countryName),
    description: tip?.description?.replace(/\{country\}/g, countryName),
  }));

  const testimonialsData = (surveys?.testimonials || []).map((testimonial: any) => ({
    name: testimonial?.name,
    country: testimonial?.country,
    earnings: testimonial?.earnings,
    quote: testimonial?.quote?.replace(/\{country\}/g, countryName),
    avatar: testimonial?.avatar,
  }));

  const faqData = {
    title: surveys?.faq?.title?.replace(/\{country\}/g, countryName) || `Paid Surveys in ${countryName} - FAQ`,
    items: Array.isArray(surveys?.faq?.items)
      ? surveys.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: surveys?.final?.title?.replace(/\{country\}/g, countryName) || `Ready to Start Earning in ${countryName}?`,
    subtitle: surveys?.final?.subtitle?.replace(/\{country\}/g, countryName) || `Join 200,000+ members already getting paid. Sign up for free and take your first paid survey today!`,
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
                  {statsData.surveysCompleted}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.surveysCompletedLabel}
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
                  {statsData.brands}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.brandsLabel}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Survey Categories Grid */}
      {surveyCategoriesData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {surveys?.categoriesTitle?.replace(/\{country\}/g, countryName) || "Popular Survey Categories"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {surveys?.categoriesSubtitle?.replace(/\{country\}/g, countryName) || "Share your opinion and get paid in these categories"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveyCategoriesData.map((category: any, index: number) => (
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
                        <span className="text-gray-500 dark:text-gray-400">Frequency:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{category.frequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Featured Surveys */}
      {featuredSurveysData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {surveys?.featuredTitle?.replace(/\{country\}/g, countryName) || "High-Paying Surveys Available Now"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {surveys?.featuredSubtitle?.replace(/\{country\}/g, countryName) || "Limited spots - complete these surveys today"}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {featuredSurveysData.map((survey: any, index: number) => {
                  const difficultyColors = {
                    Easy: 'text-green-600 bg-green-50 dark:bg-green-900/20',
                    Medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
                    Hard: 'text-red-600 bg-red-50 dark:bg-red-900/20',
                  };
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {survey.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[survey.difficulty]}`}>
                              {survey.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {survey.company}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <span className="text-gray-500 dark:text-gray-400">⏱️ {survey.timeEstimate}</span>
                            <span className="text-orange-600 dark:text-orange-400">🎯 {survey.spotsLeft} spots left</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {survey.reward}
                          </div>
                          <PrimaryCTA
                            href="/signup"
                            translationKey="start_now"
                            observer={false}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                  {surveys?.benefitsTitle?.replace(/\{country\}/g, countryName) || "Why Take Paid Surveys"}
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

      {/* Tips Section */}
      {tipsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {surveys?.tipsTitle?.replace(/\{country\}/g, countryName) || "Tips to Maximize Your Earnings"}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {tipsData.map((tip: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {tip.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {tip.description}
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
                  {surveys?.testimonialsTitle?.replace(/\{country\}/g, countryName) || "Real Members, Real Earnings"}
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
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      Earned {testimonial.earnings}
                    </p>
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
