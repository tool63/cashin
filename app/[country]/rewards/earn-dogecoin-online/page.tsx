// app/[country]/(marketing)/earn-dogecoin-online/page.tsx

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

/* ================= TYPES ================= */

interface TranslationSection {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
  };
  statsTitle?: string;
  stats?: {
    dogeEarned?: string;
    dogeEarnedLabel?: string;
    avgPayout?: string;
    avgPayoutLabel?: string;
    activeUsers?: string;
    activeUsersLabel?: string;
    totalPaid?: string;
    totalPaidLabel?: string;
  };
  methodsTitle?: string;
  methodsSubtitle?: string;
  earningMethods?: Array<{
    icon: string;
    title: string;
    description: string;
    timeEstimate: string;
    difficulty: "Easy" | "Medium" | "Hard";
    rewardRange: string;
  }>;
  featuredOffersTitle?: string;
  featuredOffersSubtitle?: string;
  featuredOffers?: Array<{
    title: string;
    reward: string;
    timeEstimate: string;
    difficulty: "Easy" | "Medium" | "Hard";
    spotsLeft: number;
    company: string;
    rating: string;
  }>;
  benefitsTitle?: string;
  benefits?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
  }>;
  testimonialsTitle?: string;
  testimonials?: Array<{
    name: string;
    country: string;
    earnings: string;
    quote: string;
    avatar: string;
  }>;
  faq?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  final?: {
    title?: string;
    subtitle?: string;
  };
}

/* ================= HELPERS ================= */

async function loadSectionTranslation(
  language: string,
  section: string
): Promise<TranslationSection> {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch (error) {
    console.warn(`Missing translation: ${section} (${language})`);
    return {};
  }
}

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

// Helper to replace {country} placeholder
const replaceCountryPlaceholder = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

// Dynamic keywords based on country type
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `earn dogecoin online ${lowerCountry}`,
    `get free dogecoin ${lowerCountry}`,
    `earn doge online ${lowerCountry}`,
    `free dogecoin earning sites ${lowerCountry}`,
    `earn cryptocurrency online ${lowerCountry}`,
    `dogecoin earning games ${lowerCountry}`,
    `get paid in dogecoin ${lowerCountry}`,
    `earn doge coin ${lowerCountry}`,
    `free doge no investment ${lowerCountry}`,
    `dogecoin rewards ${lowerCountry}`,
    `earn dogecoin playing games ${lowerCountry}`,
    `crypto earning sites ${lowerCountry}`,
    `dogecoin faucet ${lowerCountry}`,
    `earn $10 in dogecoin ${lowerCountry}`,
    `get dogecoin for free ${lowerCountry}`,
    `earn doge free ${lowerCountry}`,
    `dogecoin earning apps ${lowerCountry}`,
    `free dogecoin instantly ${lowerCountry}`,
    `legit dogecoin earning sites ${lowerCountry}`,
    `much wow dogecoin earn ${lowerCountry}`,
  ];

  // Add country-specific variations
  if (countryCode === "us") {
    baseKeywords.push(
      "earn dogecoin usa",
      "free dogecoin for americans",
      "crypto earnings usa",
      "dogecoin rewards usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "earn dogecoin uk",
      "free dogecoin uk",
      "crypto earnings uk",
      "dogecoin rewards uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "earn dogecoin canada",
      "free dogecoin canada",
      "crypto earnings canada",
      "dogecoin rewards canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "earn dogecoin australia",
      "free dogecoin australia",
      "crypto earnings australia",
      "dogecoin rewards australia"
    );
  } else if (countryCode === "de") {
    baseKeywords.push(
      "dogecoin verdienen deutschland",
      "kostenlos dogecoin bekommen",
      "krypto verdienen",
      "dogecoin belohnungen"
    );
  } else if (countryCode === "in") {
    baseKeywords.push(
      "earn dogecoin india",
      "free dogecoin india",
      "crypto earning india",
      "dogecoin rewards india"
    );
  }

  return baseKeywords;
};

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
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);

  let translation: TranslationSection = {};
  try {
    translation = await loadSectionTranslation(language, "earn-dogecoin-online");
  } catch (error) {
    // Use defaults
  }

  // Helper to replace {country} in metadata
  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const rawTitle = translation?.seo?.title;
  const rawDescription = translation?.seo?.description;

  const seoTitle = replaceCountry(
    rawTitle,
    `Earn Dogecoin Online in ${countryName} - Get Free DOGE Rewards | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn Dogecoin online in ${countryName} by playing games, completing offers & tasks. Get paid in DOGE instantly with low fees. Such wow! Start earning crypto for free today!`
  );

  // Generate dynamic keywords
  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-dogecoin-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-dogecoin-online`,
      siteName: "Cashog",
      type: "website",
      locale: language === "es" ? "es_ES" : language === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ================= PAGE COMPONENT ================= */

export default async function EarnDogecoinOnlinePage({
  params,
}: {
  params: Promise<{ country?: string }> | { country?: string };
}) {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Country Not Supported</h1>
          <p className="mt-2">Please check your region settings.</p>
        </div>
      </main>
    );
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);

  // Load translations
  const tData = await loadSectionTranslation(language, "earn-dogecoin-online");

  // Helper function to replace country placeholder
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Dogecoin Online in ${countryName} - Get Free DOGE`);
  const description = t(rawDescription, `Earn Dogecoin online in ${countryName} by playing games and completing offers.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-dogecoin-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, `Earn Dogecoin Online in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Get free Dogecoin (DOGE) by playing games, completing offers & tasks. Join 100,000+ users who've already earned 100,000,000+ DOGE in cryptocurrency rewards! Such wow!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Trusted by Thousands"),
    dogeEarned: tData?.stats?.dogeEarned || "100,000,000+",
    dogeEarnedLabel: tData?.stats?.dogeEarnedLabel || "DOGE Earned",
    avgPayout: tData?.stats?.avgPayout || "$15",
    avgPayoutLabel: tData?.stats?.avgPayoutLabel || "Average Payout",
    activeUsers: tData?.stats?.activeUsers || "100K+",
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Users",
    totalPaid: tData?.stats?.totalPaid || "$3M+",
    totalPaidLabel: tData?.stats?.totalPaidLabel || "Total Value Paid",
  };

  const earningMethodsData = (tData?.earningMethods || []).map((method) => ({
    ...method,
    title: t(method.title, method.title),
    description: t(method.description, method.description),
  }));

  const featuredOffersData = (tData?.featuredOffers || []).map((offer) => ({
    ...offer,
    title: t(offer.title, offer.title),
  }));

  const benefitsData = (tData?.benefits || []).map((benefit) => ({
    ...benefit,
    title: t(benefit.title, benefit.title),
    description: t(benefit.description, benefit.description),
  }));

  const tipsData = (tData?.tips || []).map((tip, index) => ({
    number: index + 1,
    title: t(tip.title, tip.title),
    description: t(tip.description, tip.description),
  }));

  const testimonialsData = (tData?.testimonials || []).map((testimonial) => ({
    ...testimonial,
    quote: t(testimonial.quote, testimonial.quote),
  }));

  const faqData = {
    title: t(tData?.faq?.title, `Earn Dogecoin Online in ${countryName} - FAQ`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Earning Dogecoin in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 100,000+ users already earning Dogecoin in ${countryName}. Sign up for free and start earning the people's crypto today! Much wow!`
    ),
  };

  const difficultyColors = {
    Easy: "text-green-600 bg-green-50 dark:bg-green-900/20",
    Medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
    Hard: "text-red-600 bg-red-50 dark:bg-red-900/20",
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
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="hero-heading"
          >
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white"
            >
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <PrimaryCTA
              href="/signup"
              translationKey="start_earning_dogecoin"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="stats-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="stats-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {statsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {statsData.dogeEarned}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.dogeEarnedLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {statsData.avgPayout}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.avgPayoutLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {statsData.activeUsers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.activeUsersLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {statsData.totalPaid}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.totalPaidLabel}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Earning Methods Grid */}
      {earningMethodsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="methods-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="methods-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.methodsTitle, "Ways to Earn Dogecoin Online")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.methodsSubtitle, "Choose the method that works best for you")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {earningMethodsData.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="text-5xl mb-4" aria-hidden="true">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Reward Range:
                        </span>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                          {method.rewardRange}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Time:
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {method.timeEstimate}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Difficulty:
                        </span>
                        <span
                          className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                            difficultyColors[method.difficulty]
                          }`}
                        >
                          {method.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Featured Offers */}
      {featuredOffersData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="featured-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="featured-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.featuredOffersTitle, "Top Dogecoin Earning Opportunities")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.featuredOffersSubtitle, "Limited spots - start earning DOGE today")}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {featuredOffersData.map((offer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {offer.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              difficultyColors[offer.difficulty]
                            }`}
                          >
                            {offer.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
                            ⭐ {offer.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {offer.company}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            ⏱️ {offer.timeEstimate}
                          </span>
                          <span className="text-orange-600 dark:text-orange-400">
                            🎯 {offer.spotsLeft.toLocaleString()} spots left
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {offer.reward}
                        </div>
                        <PrimaryCTA
                          href="/signup"
                          translationKey="earn_dogecoin"
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
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="benefits-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="benefits-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.benefitsTitle, "Why Earn Dogecoin With Us")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitsData.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-3" aria-hidden="true">
                      {benefit.icon}
                    </div>
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
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="tips-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="tips-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.tipsTitle, "Tips to Maximize Your Dogecoin Earnings")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {tipsData.map((tip) => (
                  <div key={tip.number} className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg"
                      aria-label={`Tip ${tip.number}`}
                    >
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
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="testimonials-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="testimonials-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.testimonialsTitle, "Real Users, Real Dogecoin Earnings")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        aria-hidden="true"
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.country}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
                      Earned {testimonial.earnings} in Dogecoin
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
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="final-heading"
          >
            <h2
              id="final-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {finalData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-gold-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/signup"
              translationKey="start_earning_dogecoin"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
