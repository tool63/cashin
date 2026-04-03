// app/[country]/(marketing)/loyalty/page.tsx

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
    membersEnrolled?: string;
    membersEnrolledLabel?: string;
    avgRewards?: string;
    avgRewardsLabel?: string;
    activeMembers?: string;
    activeMembersLabel?: string;
    rewardsDistributed?: string;
    rewardsDistributedLabel?: string;
  };
  tiersTitle?: string;
  tiersSubtitle?: string;
  loyaltyTiers?: Array<{
    icon: string;
    tier: string;
    minPoints: string;
    benefits: string[];
    color: string;
  }>;
  howToEarnTitle?: string;
  howToEarnSubtitle?: string;
  earningMethods?: Array<{
    icon: string;
    title: string;
    points: string;
    description: string;
    frequency: string;
  }>;
  rewardsTitle?: string;
  rewardsSubtitle?: string;
  availableRewards?: Array<{
    icon: string;
    title: string;
    points: string;
    description: string;
    popular?: boolean;
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
    points: string;
    quote: string;
    avatar: string;
    tier: string;
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
    `loyalty rewards program ${lowerCountry}`,
    `earn points get paid ${lowerCountry}`,
    `cashback rewards program ${lowerCountry}`,
    `loyalty program earn money ${lowerCountry}`,
    `points to cash program ${lowerCountry}`,
    `reward points redeem cash ${lowerCountry}`,
    `best loyalty program ${lowerCountry}`,
    `earn points for tasks ${lowerCountry}`,
    `membership rewards ${lowerCountry}`,
    `vip loyalty program ${lowerCountry}`,
    `earn redeem points ${lowerCountry}`,
    `cash rewards program ${lowerCountry}`,
    `loyalty points system ${lowerCountry}`,
    `get paid for loyalty ${lowerCountry}`,
    `reward program cash payout ${lowerCountry}`,
    `points earning platform ${lowerCountry}`,
    `loyalty cashback ${lowerCountry}`,
    `vip rewards program ${lowerCountry}`,
    `earn points redeem cash ${lowerCountry}`,
    `best cashback loyalty program ${lowerCountry}`,
  ];

  // Add country-specific variations
  if (countryCode === "us") {
    baseKeywords.push(
      "loyalty rewards program usa",
      "earn points get paid usa",
      "best cashback program usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "loyalty rewards program uk",
      "earn points get paid uk",
      "best loyalty program uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "loyalty rewards program canada",
      "earn points get paid canada",
      "cashback rewards canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "loyalty rewards program australia",
      "earn points get paid australia",
      "best loyalty program australia"
    );
  } else if (countryCode === "de") {
    baseKeywords.push(
      "treueprogramm punkte sammeln deutschland",
      "punkte gegen geld deutschland",
      "cashback programm deutschland"
    );
  } else if (countryCode === "fr") {
    baseKeywords.push(
      "programme de fidélité récompenses france",
      "gagner des points argent france",
      "cashback fidélité france"
    );
  } else if (countryCode === "es") {
    baseKeywords.push(
      "programa de fidelidad recompensas españa",
      "ganar puntos por dinero españa",
      "programa cashback españa"
    );
  } else if (countryCode === "in") {
    baseKeywords.push(
      "loyalty rewards program india",
      "earn points get paid india",
      "cashback loyalty program india"
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
    translation = await loadSectionTranslation(language, "loyalty");
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
    `Loyalty Rewards Program in ${countryName} - Earn Points & Get Paid | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Join Cashog's loyalty program in ${countryName} and earn points for every action. Redeem points for cash, gift cards, and exclusive rewards. Free to join!`
  );

  // Generate dynamic keywords
  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/loyalty`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/loyalty`,
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

export default async function LoyaltyPage({
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
  const tData = await loadSectionTranslation(language, "loyalty");

  // Helper function to replace country placeholder
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Loyalty Rewards Program in ${countryName}`);
  const description = t(rawDescription, `Earn points and get paid in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/loyalty`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, `Earn Points, Get Rewarded in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Join 200,000+ loyal members in ${countryName} earning points for every action. Redeem points for cash, gift cards, and exclusive rewards. The more you engage, the more you earn!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Loyalty Program Statistics"),
    membersEnrolled: tData?.stats?.membersEnrolled || "200K+",
    membersEnrolledLabel: tData?.stats?.membersEnrolledLabel || "Members Enrolled",
    avgRewards: tData?.stats?.avgRewards || "$350",
    avgRewardsLabel: tData?.stats?.avgRewardsLabel || "Avg Rewards/Year",
    activeMembers: tData?.stats?.activeMembers || "85K+",
    activeMembersLabel: tData?.stats?.activeMembersLabel || "Active Members",
    rewardsDistributed: tData?.stats?.rewardsDistributed || "$12M+",
    rewardsDistributedLabel: tData?.stats?.rewardsDistributedLabel || "Rewards Distributed",
  };

  const loyaltyTiersData = (tData?.loyaltyTiers || []).map((tier) => ({
    ...tier,
    tier: t(tier.tier, tier.tier),
    benefits: tier.benefits.map(benefit => t(benefit, benefit)),
  }));

  const earningMethodsData = (tData?.earningMethods || []).map((method) => ({
    ...method,
    title: t(method.title, method.title),
    description: t(method.description, method.description),
  }));

  const availableRewardsData = (tData?.availableRewards || []).map((reward) => ({
    ...reward,
    title: t(reward.title, reward.title),
    description: t(reward.description, reward.description),
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
    title: t(tData?.faq?.title, `Loyalty Rewards Program in ${countryName} - FAQ`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Earning Rewards in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 200,000+ loyal members already earning rewards in ${countryName}. Sign up for free and start collecting points today!`
    ),
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
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <PrimaryCTA
              href="/signup"
              translationKey="join_loyalty_program"
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
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.membersEnrolled}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.membersEnrolledLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.avgRewards}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.avgRewardsLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.activeMembers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.activeMembersLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.rewardsDistributed}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.rewardsDistributedLabel}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Loyalty Tiers Section */}
      {loyaltyTiersData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="tiers-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="tiers-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.tiersTitle, "Loyalty Tiers")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.tiersSubtitle, "The more points you earn, the higher your tier and better your rewards")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loyaltyTiersData.map((tier, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${tier.color} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center`}
                  >
                    <div className="text-6xl mb-4" aria-hidden="true">
                      {tier.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {tier.tier}
                    </h3>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
                      {tier.minPoints}
                    </div>
                    <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {tier.benefits.map((benefit, idx) => (
                        <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          ✓ {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* How to Earn Section */}
      {earningMethodsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="earn-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="earn-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.howToEarnTitle, "How to Earn Points")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.howToEarnSubtitle, "Earn points for every action you take on Cashog")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {earningMethodsData.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl" aria-hidden="true">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {method.title}
                        </h3>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {method.points}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {method.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Available Rewards Section */}
      {availableRewardsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="rewards-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="rewards-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.rewardsTitle, "Redeem Your Points")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.rewardsSubtitle, "Exchange your hard-earned points for amazing rewards")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRewardsData.map((reward, index) => (
                  <div
                    key={index}
                    className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
                      reward.popular 
                        ? 'border-yellow-400 dark:border-yellow-500 ring-2 ring-yellow-400/50' 
                        : 'border-gray-100 dark:border-gray-700'
                    }`}
                  >
                    {reward.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-5xl mb-4 text-center" aria-hidden="true">
                      {reward.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                      {reward.title}
                    </h3>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 text-center mb-3">
                      {reward.points}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                      {reward.description}
                    </p>
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
                  {t(tData?.benefitsTitle, "Why Join Our Loyalty Program")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitsData.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
                  {t(tData?.tipsTitle, "Tips to Maximize Your Points")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {tipsData.map((tip) => (
                  <div key={tip.number} className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg"
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
                  {t(tData?.testimonialsTitle, "What Loyal Members Say")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
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
                        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
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
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-green-500 text-white">
                        {testimonial.tier} Tier
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      Earned {testimonial.points} points
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
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/signup"
              translationKey="start_earning_points"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
