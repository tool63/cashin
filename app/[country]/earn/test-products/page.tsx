// app/[country]/(marketing)/test-products/page.tsx

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
    productsTested?: string;
    productsTestedLabel?: string;
    avgPayout?: string;
    avgPayoutLabel?: string;
    activeUsers?: string;
    activeUsersLabel?: string;
    totalPaid?: string;
    totalPaidLabel?: string;
  };
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  productCategories?: Array<{
    icon: string;
    title: string;
    description: string;
    avgReward: string;
    timeRequired: string;
    keepProduct: string;
  }>;
  featuredProductsTitle?: string;
  featuredProductsSubtitle?: string;
  featuredProducts?: Array<{
    title: string;
    reward: string;
    timeEstimate: string;
    category: string;
    spotsLeft: number;
    brand: string;
    rating: string;
    keepProduct: string;
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
    `test products get paid ${lowerCountry}`,
    `paid product testing ${lowerCountry}`,
    `get paid to test products ${lowerCountry}`,
    `product tester jobs ${lowerCountry}`,
    `test products for money ${lowerCountry}`,
    `free products to test ${lowerCountry}`,
    `product testing from home ${lowerCountry}`,
    `paid product reviews ${lowerCountry}`,
    `become a product tester ${lowerCountry}`,
    `test new products for cash ${lowerCountry}`,
    `product testing companies ${lowerCountry}`,
    `legit product testing sites ${lowerCountry}`,
    `get free products to review ${lowerCountry}`,
    `paid to try products ${lowerCountry}`,
    `consumer product testing ${lowerCountry}`,
    `product evaluation jobs ${lowerCountry}`,
    `test products keep them ${lowerCountry}`,
    `highest paid product testing ${lowerCountry}`,
    `online product tester ${lowerCountry}`,
    `get paid for product feedback ${lowerCountry}`,
    `home product testing ${lowerCountry}`,
    `free sample testing jobs ${lowerCountry}`,
    `product tester paypal ${lowerCountry}`,
    `test electronics for money ${lowerCountry}`,
  ];

  // Add country-specific variations
  if (countryCode === "us") {
    baseKeywords.push(
      "product testing usa",
      "paid product tester jobs for americans",
      "best product testing sites usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "product testing uk",
      "paid product tester uk",
      "earn pounds testing products"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "product testing canada",
      "canadian product tester jobs",
      "earn cad testing products"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "product testing australia",
      "product tester jobs australia",
      "earn aud testing products"
    );
  } else if (countryCode === "de") {
    baseKeywords.push(
      "produkttester deutschland",
      "bezahlte produkt tests",
      "geld verdienen als produkttester"
    );
  } else if (countryCode === "fr") {
    baseKeywords.push(
      "testeur de produits france",
      "payer pour tester des produits",
      "gagner de l'argent en testant des produits"
    );
  } else if (countryCode === "es") {
    baseKeywords.push(
      "probador de productos españa",
      "pagan por probar productos",
      "ganar dinero probando productos"
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
    translation = await loadSectionTranslation(language, "test-products");
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
    `Test Products in ${countryName} - Earn $10-$100 + Keep Free Products | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Join 60,000+ product testers in ${countryName}. Test electronics, beauty, home & food products. Keep products for free + get paid via PayPal. Limited spots available!`
  );

  // Generate dynamic keywords
  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/test-products`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/test-products`,
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

export default async function TestProductsPage({
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
  const tData = await loadSectionTranslation(language, "test-products");

  // Helper function to replace country placeholder
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Test Products in ${countryName} - Earn Money & Keep Free Products`);
  const description = t(rawDescription, `Test products and earn money in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/test-products`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, `Get Paid to Test Products in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Join 60,000+ product testers in ${countryName}. Test electronics, beauty products, home goods & food items. Keep the products for free AND get paid via PayPal! Limited spots available.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Product Testing Statistics"),
    productsTested: tData?.stats?.productsTested || "500K+",
    productsTestedLabel: tData?.stats?.productsTestedLabel || "Products Tested",
    avgPayout: tData?.stats?.avgPayout || "$25",
    avgPayoutLabel: tData?.stats?.avgPayoutLabel || "Average Payout",
    activeUsers: tData?.stats?.activeUsers || "60K+",
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Testers",
    totalPaid: tData?.stats?.totalPaid || "$12M+",
    totalPaidLabel: tData?.stats?.totalPaidLabel || "Total Paid",
  };

  const productCategoriesData = (tData?.productCategories || []).map((category) => ({
    ...category,
    title: t(category.title, category.title),
    description: t(category.description, category.description),
  }));

  const featuredProductsData = (tData?.featuredProducts || []).map((product) => ({
    ...product,
    title: t(product.title, product.title),
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
    title: t(tData?.faq?.title, `Test Products in ${countryName} - FAQ`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Testing in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 60,000+ product testers already getting paid in ${countryName}. Sign up for free and test your first product today!`
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
              translationKey="start_testing_now"
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
                  {statsData.productsTested}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.productsTestedLabel}
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

      {/* Product Categories Grid */}
      {productCategoriesData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="categories-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="categories-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.categoriesTitle, "Product Testing Categories")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.categoriesSubtitle, "Test these types of products and get paid")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategoriesData.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="text-5xl mb-4" aria-hidden="true">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Avg Reward:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {category.avgReward}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Time Required:
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {category.timeRequired}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Keep Product:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {category.keepProduct}
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

      {/* Featured Products */}
      {featuredProductsData.length > 0 && (
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
                  {t(tData?.featuredProductsTitle, "Products Available for Testing Now")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.featuredProductsSubtitle, "Limited spots - test these products today")}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {featuredProductsData.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {product.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                            {product.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            ⭐ {product.rating}
                          </span>
                          {product.keepProduct === "Yes" && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                              Keep Product
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Brand: {product.brand}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            ⏱️ {product.timeEstimate}
                          </span>
                          <span className="text-orange-600 dark:text-orange-400">
                            🎯 {product.spotsLeft.toLocaleString()} spots left
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {product.reward}
                        </div>
                        <PrimaryCTA
                          href="/signup"
                          translationKey="apply_now"
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
                  {t(tData?.benefitsTitle, "Why Become a Product Tester")}
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
                  {t(tData?.tipsTitle, "Tips to Become a Successful Product Tester")}
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
                  {t(tData?.testimonialsTitle, "What Our Product Testers Say")}
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
              translationKey="start_testing_now"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
