// app/[country]/(marketing)/promo-codes/page.tsx

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

interface Coupon {
  code: string;
  description: string;
  discount: string;
  expiryDate: string;
  store: string;
  storeLogo: string;
  verified: boolean;
  link: string;
}

interface Store {
  name: string;
  logo: string;
  couponCount: number;
  categories: string[];
  link: string;
}

interface Category {
  name: string;
  icon: string;
  couponCount: number;
  stores: string[];
}

interface TranslationSection {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    searchPlaceholder?: string;
  };
  categoriesTitle?: string;
  categories?: Category[];
  featuredCouponsTitle?: string;
  featuredCoupons?: Coupon[];
  topStoresTitle?: string;
  topStores?: Store[];
  categoriesNav?: Array<{
    name: string;
    icon: string;
    link: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  howItWorksTitle?: string;
  howItWorks?: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  todayDealsTitle?: string;
  todayDeals?: Coupon[];
  trendingSearchesTitle?: string;
  trendingSearches?: string[];
  newsLetterTitle?: string;
  newsLetter?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    placeholder?: string;
  };
  priceMatchTitle?: string;
  priceMatch?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
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
    buttonText?: string;
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

// Helper to replace placeholders
const replacePlaceholders = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

// Dynamic keywords based on country
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `promo codes ${lowerCountry}`,
    `coupon codes ${lowerCountry}`,
    `discount codes ${lowerCountry}`,
    `voucher codes ${lowerCountry}`,
    `save money shopping ${lowerCountry}`,
    `store coupons ${lowerCountry}`,
    `online promo codes ${lowerCountry}`,
    `shopping discounts ${lowerCountry}`,
    `best coupon codes ${lowerCountry}`,
    `free shipping codes ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "usa promo codes",
      "american coupon codes",
      "amazon promo codes"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "uk promo codes",
      "british voucher codes",
      "asos promo codes"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "canada promo codes",
      "canadian coupon codes",
      "walmart canada promo"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "australia promo codes",
      "australian voucher codes",
      "catch promo codes"
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
    translation = await loadSectionTranslation(language, "promo-codes");
  } catch (error) {
    // Use defaults
  }

  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const rawTitle = translation?.seo?.title;
  const rawDescription = translation?.seo?.description;

  const seoTitle = replaceCountry(
    rawTitle,
    `Promo Codes & Coupons - Save Money with Discount Codes in {country} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find the best promo codes and coupons for top stores in {country}. Save money with exclusive discount codes, free shipping offers, and verified vouchers updated daily.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/promo-codes`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/promo-codes`,
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

export default async function PromoCodesPage({
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
  const tData = await loadSectionTranslation(language, "promo-codes");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Promo Codes & Coupons - Save Money`);
  const description = t(rawDescription, `Find the best promo codes and coupons for top stores in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/promo-codes`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Find the Best Promo Codes & Coupons"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Save money instantly with verified discount codes from thousands of stores in ${countryName}. Get exclusive promo codes, free shipping offers, and cashback deals.`
    ),
    searchPlaceholder: t(tData?.hero?.searchPlaceholder, "Search for stores or promo codes..."),
  };

  const categoriesData = {
    title: t(tData?.categoriesTitle, "Shop by Category"),
    categories: (tData?.categories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
    })),
  };

  // Default categories if not in translation
  if (categoriesData.categories.length === 0) {
    categoriesData.categories = [
      { name: "Fashion", icon: "👕", couponCount: 1245, stores: ["Nike", "ASOS", "Zara", "H&M"] },
      { name: "Electronics", icon: "📱", couponCount: 892, stores: ["Best Buy", "Amazon", "Apple", "Newegg"] },
      { name: "Beauty", icon: "💄", couponCount: 756, stores: ["Sephora", "Ulta", "Nordstrom", "Dermstore"] },
      { name: "Home & Garden", icon: "🏠", couponCount: 634, stores: ["Wayfair", "Home Depot", "Lowe's", "IKEA"] },
      { name: "Travel", icon: "✈️", couponCount: 523, stores: ["Expedia", "Booking.com", "Airbnb", "Kayak"] },
      { name: "Groceries", icon: "🛒", couponCount: 445, stores: ["Walmart", "Target", "Kroger", "Instacart"] },
      { name: "Toys & Games", icon: "🎮", couponCount: 378, stores: ["Amazon", "Walmart", "GameStop", "Target"] },
      { name: "Health & Wellness", icon: "💪", couponCount: 312, stores: ["CVS", "Walgreens", "Vitamin Shoppe", "iHerb"] },
    ];
  }

  const featuredCouponsData = {
    title: t(tData?.featuredCouponsTitle, "Today's Top Coupons"),
    coupons: (tData?.featuredCoupons || []).map((coupon) => ({
      ...coupon,
      description: t(coupon.description, coupon.description),
      store: t(coupon.store, coupon.store),
    })),
  };

  // Default featured coupons if not in translation
  if (featuredCouponsData.coupons.length === 0) {
    featuredCouponsData.coupons = [
      {
        code: "SAVE20",
        description: "20% off your first purchase",
        discount: "20% OFF",
        expiryDate: "Dec 31, 2024",
        store: "Nike",
        storeLogo: "👟",
        verified: true,
        link: "/coupon/nike-save20",
      },
      {
        code: "FREESHIP",
        description: "Free shipping on orders $50+",
        discount: "Free Shipping",
        expiryDate: "Dec 31, 2024",
        store: "Amazon",
        storeLogo: "📦",
        verified: true,
        link: "/coupon/amazon-freeship",
      },
      {
        code: "BEAUTY15",
        description: "15% off sitewide",
        discount: "15% OFF",
        expiryDate: "Nov 30, 2024",
        store: "Sephora",
        storeLogo: "💄",
        verified: true,
        link: "/coupon/sephora-beauty15",
      },
      {
        code: "TECH10",
        description: "$10 off $100+ electronics",
        discount: "$10 OFF",
        expiryDate: "Dec 15, 2024",
        store: "Best Buy",
        storeLogo: "🛒",
        verified: true,
        link: "/coupon/bestbuy-tech10",
      },
      {
        code: "TRAVEL50",
        description: "$50 off first booking",
        discount: "$50 OFF",
        expiryDate: "Jan 31, 2025",
        store: "Expedia",
        storeLogo: "✈️",
        verified: true,
        link: "/coupon/expedia-travel50",
      },
      {
        code: "HOME10",
        description: "10% off furniture",
        discount: "10% OFF",
        expiryDate: "Dec 31, 2024",
        store: "Wayfair",
        storeLogo: "🏠",
        verified: true,
        link: "/coupon/wayfair-home10",
      },
    ];
  }

  const topStoresData = {
    title: t(tData?.topStoresTitle, "Top Stores with Coupons"),
    stores: (tData?.topStores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  // Default top stores if not in translation
  if (topStoresData.stores.length === 0) {
    topStoresData.stores = [
      { name: "Amazon", logo: "📦", couponCount: 342, categories: ["Electronics", "Home", "Fashion"], link: "/store/amazon" },
      { name: "Walmart", logo: "🛒", couponCount: 289, categories: ["Groceries", "Electronics", "Home"], link: "/store/walmart" },
      { name: "Target", logo: "🎯", couponCount: 267, categories: ["Fashion", "Home", "Beauty"], link: "/store/target" },
      { name: "Nike", logo: "👟", couponCount: 156, categories: ["Fashion", "Sports"], link: "/store/nike" },
      { name: "Best Buy", logo: "💻", couponCount: 143, categories: ["Electronics", "Gaming"], link: "/store/bestbuy" },
      { name: "Sephora", logo: "💄", couponCount: 128, categories: ["Beauty", "Skincare"], link: "/store/sephora" },
      { name: "Home Depot", logo: "🔨", couponCount: 112, categories: ["Home", "Tools"], link: "/store/homedepot" },
      { name: "ASOS", logo: "👕", couponCount: 98, categories: ["Fashion", "Accessories"], link: "/store/asos" },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "How to Save More with Promo Codes"),
    tips: (tData?.tips || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default tips if not in translation
  if (tipsData.tips.length === 0) {
    tipsData.tips = [
      {
        title: "Copy & Apply at Checkout",
        description: "Simply copy the promo code and paste it at the store's checkout page.",
        icon: "📋",
      },
      {
        title: "Stack with Cashback",
        description: "Use promo codes with our cashback offers for double savings.",
        icon: "💰",
      },
      {
        title: "Check Expiry Dates",
        description: "Always check the expiry date before using a promo code.",
        icon: "📅",
      },
      {
        title: "Sign Up for Emails",
        description: "Get exclusive codes delivered to your inbox by joining store newsletters.",
        icon: "📧",
      },
    ];
  }

  const howItWorksData = {
    title: t(tData?.howItWorksTitle, "How Promo Codes Work"),
    steps: (tData?.howItWorks || []).map((step) => ({
      ...step,
      title: t(step.title, step.title),
      description: t(step.description, step.description),
    })),
  };

  // Default steps if not in translation
  if (howItWorksData.steps.length === 0) {
    howItWorksData.steps = [
      {
        step: 1,
        title: "Find a Code",
        description: "Browse our list of verified promo codes for your favorite store.",
      },
      {
        step: 2,
        title: "Copy the Code",
        description: "Click to copy the promo code to your clipboard.",
      },
      {
        step: 3,
        title: "Shop & Apply",
        description: "Go to the store and paste the code at checkout.",
      },
      {
        step: 4,
        title: "Save Money",
        description: "Enjoy your discount instantly on your purchase.",
      },
    ];
  }

  const todayDealsData = {
    title: t(tData?.todayDealsTitle, "Today's Best Deals"),
    deals: (tData?.todayDeals || []).map((deal) => ({
      ...deal,
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  const trendingSearchesData = {
    title: t(tData?.trendingSearchesTitle, "Trending Searches"),
    searches: (tData?.trendingSearches || []).map((search) => t(search, search)),
  };

  // Default trending searches if not in translation
  if (trendingSearchesData.searches.length === 0) {
    trendingSearchesData.searches = [
      "Amazon promo codes",
      "Walmart coupons",
      "Nike discount codes",
      "Sephora promo codes",
      "Best Buy coupons",
      "Target promo codes",
      "eBay voucher codes",
      "Etsy coupon codes",
    ];
  }

  const newsletterData = {
    title: t(tData?.newsLetter?.title, "Get Exclusive Promo Codes"),
    subtitle: t(tData?.newsLetter?.subtitle, "Subscribe to get the best deals delivered to your inbox"),
    buttonText: t(tData?.newsLetter?.buttonText, "Subscribe Now"),
    placeholder: t(tData?.newsLetter?.placeholder, "Enter your email address"),
  };

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Deal?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best promo codes and coupons"),
    buttonText: t(tData?.priceMatch?.buttonText, "Report Better Code"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Promo Codes FAQ - ${countryName}`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  // Default FAQ if not in translation
  if (faqData.items.length === 0) {
    faqData.items = [
      {
        q: "Are these promo codes verified?",
        a: "Yes! We verify all promo codes before listing them. However, some codes may expire or have terms that change.",
      },
      {
        q: "Why isn't my promo code working?",
        a: "Check the expiry date, minimum purchase requirements, and eligible products. Some codes are for new customers only.",
      },
      {
        q: "Can I use promo codes with cashback?",
        a: "Yes! Most promo codes can be combined with our cashback offers for double savings. Some exclusions may apply.",
      },
      {
        q: "How often are promo codes updated?",
        a: "We update our promo codes daily to ensure you have access to the latest discounts and deals.",
      },
      {
        q: "Do you have promo codes for all stores?",
        a: "We have codes for thousands of stores. If you don't see one, check back soon or sign up for alerts.",
      },
      {
        q: "Are there promo codes for first-time buyers?",
        a: "Yes! Many stores offer special discounts for first-time customers. Look for 'new customer' codes.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving with Promo Codes Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart shoppers saving money with our verified promo codes"),
    buttonText: t(tData?.final?.buttonText, "Browse All Codes"),
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

      {/* Hero Section with Search */}
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
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={heroData.searchPlaceholder}
                  className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-green-500 text-white px-6 py-2 rounded-full hover:from-yellow-500 hover:to-green-600 transition-all duration-300">
                  🔍 Search
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Categories Section */}
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
                {categoriesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoriesData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {category.couponCount}+ active coupons
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.stores.slice(0, 3).map((store, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {store}
                      </span>
                    ))}
                    {category.stores.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs text-gray-500">
                        +{category.stores.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Coupons Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="coupons-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="coupons-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {featuredCouponsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCouponsData.coupons.map((coupon, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-green-100 dark:border-green-900"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{coupon.storeLogo}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {coupon.store}
                        </h3>
                        {coupon.verified && (
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {coupon.discount}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {coupon.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg font-mono text-sm">
                      {coupon.code}
                    </div>
                    <button className="text-green-600 dark:text-green-400 font-semibold text-sm hover:underline">
                      Copy Code
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Expires: {coupon.expiryDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Stores Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="stores-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="stores-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topStoresData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {topStoresData.stores.map((store, index) => (
                <a
                  key={index}
                  href={store.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {store.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {store.couponCount} codes
                  </p>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* How It Works Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="howitworks-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="howitworks-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {howItWorksData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howItWorksData.steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Shopping Tips Section */}
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
                {tipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {tip.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Trending Searches Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="trending-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="trending-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {trendingSearchesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {trendingSearchesData.searches.map((search, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-500 hover:text-white transition-all duration-300"
                >
                  {search}
                </button>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Newsletter Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="newsletter-heading"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {newsletterData.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {newsletterData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder={newsletterData.placeholder}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-green-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-yellow-500 hover:to-green-600 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Price Match Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="price-match-heading"
          >
            <h2
              id="price-match-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {priceMatchData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {priceMatchData.description}
            </p>
            <PrimaryCTA
              href="/report-code"
              translationKey={priceMatchData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

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
              href="/promo-codes/all"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
