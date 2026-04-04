// app/[country]/(marketing)/shopping-rewards/mobile/page.tsx

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

interface Store {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  categories: string[];
  features: string[];
  link: string;
}

interface TranslationSection {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
  };
  categoryTitle?: string;
  categories?: Array<{
    name: string;
    icon: string;
    description: string;
    storeCount: number;
  }>;
  featuredStoresTitle?: string;
  featuredStores?: Store[];
  topDealsTitle?: string;
  topDeals?: Array<{
    title: string;
    description: string;
    originalPrice: string;
    salePrice: string;
    cashbackRate: string;
    store: string;
    image: string;
    link: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  compareTitle?: string;
  compare?: {
    description?: string;
    stores?: Array<{
      name: string;
      cashbackRate: string;
      shippingTime: string;
      returnPolicy: string;
      warranty: string;
      rating: number;
    }>;
  };
  carriersTitle?: string;
  carriers?: Array<{
    name: string;
    logo: string;
    cashbackRate: string;
    description: string;
    plans: string[];
    link: string;
  }>;
  tradeInTitle?: string;
  tradeIn?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  unlockedVsCarrier?: {
    title?: string;
    description?: string;
    benefits?: Array<{
      title: string;
      description: string;
    }>;
  };
  brandSpotlightTitle?: string;
  brandSpotlight?: Array<{
    name: string;
    logo: string;
    description: string;
    cashbackRate: string;
    featuredProducts: string[];
    link: string;
  }>;
  accessoriesTitle?: string;
  accessories?: Array<{
    name: string;
    logo: string;
    cashbackRate: string;
    description: string;
    categories: string[];
    link: string;
  }>;
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
    `mobile phone cashback ${lowerCountry}`,
    `smartphone deals ${lowerCountry}`,
    `iphone cashback ${lowerCountry}`,
    `samsung cashback ${lowerCountry}`,
    `buy phone with cashback ${lowerCountry}`,
    `mobile carrier deals ${lowerCountry}`,
    `phone upgrade cashback ${lowerCountry}`,
    `best smartphone deals ${lowerCountry}`,
    `5g phone deals ${lowerCountry}`,
    `trade in phone ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "verizon cashback",
      "t-mobile deals",
      "at&t cashback",
      "best buy mobile"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "ee cashback",
      "vodafone deals",
      "o2 cashback",
      "carphone warehouse"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "rogers cashback",
      "bell deals",
      "telus cashback"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "telstra cashback",
      "optus deals",
      "vodafone australia"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-mobile");
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
    `Mobile Phone Cashback - Earn Up to 15% Back on Smartphones in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Shop mobile phones with cashback in ${countryName}. Earn up to 15% back on iPhones, Samsung Galaxy, Google Pixel, and more. Get the best deals on smartphones and plans.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/mobile`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/mobile`,
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

export default async function MobileRewardsPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-mobile");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Mobile Phone Cashback - Earn Up to 15% Back`);
  const description = t(rawDescription, `Shop mobile phones with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/mobile`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Mobile Phones"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Upgrade your phone and save money. Earn up to 15% cashback on the latest smartphones from Apple, Samsung, Google, and more in ${countryName}. Plus earn cashback on mobile plans and accessories.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Shop by Category"),
    categories: (tData?.categories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
      description: t(category.description, category.description),
    })),
  };

  // Default categories if not in translation
  if (categoryData.categories.length === 0) {
    categoryData.categories = [
      {
        name: "iPhone",
        icon: "📱",
        description: "Latest iPhone models and accessories",
        storeCount: 25,
      },
      {
        name: "Samsung Galaxy",
        icon: "📱",
        description: "Galaxy S, Z Fold, and Note series",
        storeCount: 22,
      },
      {
        name: "Google Pixel",
        icon: "📱",
        description: "Pixel phones with pure Android",
        storeCount: 18,
      },
      {
        name: "OnePlus",
        icon: "📱",
        description: "Flagship killers and fast charging",
        storeCount: 15,
      },
      {
        name: "Mobile Plans",
        icon: "📡",
        description: "Postpaid, prepaid, and family plans",
        storeCount: 20,
      },
      {
        name: "Accessories",
        icon: "🎧",
        description: "Cases, chargers, headphones, and more",
        storeCount: 35,
      },
    ];
  }

  const featuredStoresData = {
    title: t(tData?.featuredStoresTitle, "Top Mobile Phone Stores"),
    stores: (tData?.featuredStores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
      description: t(store.description, store.description),
    })),
  };

  // Default featured stores if not in translation
  if (featuredStoresData.stores.length === 0) {
    featuredStoresData.stores = [
      {
        name: "Apple",
        logo: "🍎",
        cashbackRate: "Up to 5%",
        description: "iPhone, iPad, Mac, and official accessories",
        categories: ["iPhone", "iPad", "Accessories", "Watches"],
        features: ["Student discount", "Trade-in program", "Free engraving"],
        link: "/store/apple",
      },
      {
        name: "Samsung",
        logo: "⭐",
        cashbackRate: "Up to 8%",
        description: "Galaxy smartphones, tablets, and wearables",
        categories: ["Galaxy S", "Galaxy Z", "Tablets", "Watches"],
        features: ["Pre-order bonuses", "Trade-in deals", "Financing"],
        link: "/store/samsung",
      },
      {
        name: "Google Store",
        logo: "🔵",
        cashbackRate: "Up to 6%",
        description: "Pixel phones, Nest devices, and accessories",
        categories: ["Pixel", "Nest", "Accessories"],
        features: ["Free shipping", "Device protection", "Trade-in"],
        link: "/store/google",
      },
      {
        name: "Best Buy Mobile",
        logo: "🛒",
        cashbackRate: "Up to 8%",
        description: "Unlocked phones and carrier deals",
        categories: ["All brands", "Unlocked phones", "Carrier plans"],
        features: ["Price match", "Geek Squad", "Free shipping"],
        link: "/store/best-buy-mobile",
      },
      {
        name: "Amazon Mobile",
        logo: "📦",
        cashbackRate: "Up to 10%",
        description: "Unlocked phones and accessories with fast shipping",
        categories: ["Unlocked phones", "Cases", "Chargers"],
        features: ["Prime shipping", "30-day returns", "Price tracking"],
        link: "/store/amazon-mobile",
      },
      {
        name: "OnePlus",
        logo: "⚡",
        cashbackRate: "Up to 7%",
        description: "Fast and smooth flagship killers",
        categories: ["OnePlus phones", "Accessories", "Buds"],
        features: ["Free shipping", "Student discount", "Trade-in"],
        link: "/store/oneplus",
      },
    ];
  }

  const topDealsData = {
    title: t(tData?.topDealsTitle, "Hot Mobile Phone Deals"),
    deals: (tData?.topDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Mobile Shopping Tips"),
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
        title: "Trade In Your Old Phone",
        description: "Get extra value by trading in your old device when buying new.",
        icon: "🔄",
      },
      {
        title: "Compare Carrier Deals",
        description: "Check promotions from different carriers before committing.",
        icon: "📊",
      },
      {
        title: "Consider Unlocked",
        description: "Unlocked phones offer flexibility to switch carriers anytime.",
        icon: "🔓",
      },
      {
        title: "Check Refurbished",
        description: "Certified refurbished phones can save you hundreds.",
        icon: "✅",
      },
    ];
  }

  const compareData = {
    title: t(tData?.compareTitle, "Compare Cashback Rates"),
    description: t(tData?.compare?.description, "See how much you can earn at top mobile stores"),
    stores: (tData?.compare?.stores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  const carriersData = {
    title: t(tData?.carriersTitle, "Mobile Carrier Cashback"),
    carriers: (tData?.carriers || []).map((carrier) => ({
      ...carrier,
      name: t(carrier.name, carrier.name),
      description: t(carrier.description, carrier.description),
    })),
  };

  const tradeInData = {
    title: t(tData?.tradeIn?.title, "Trade In Your Old Phone"),
    description: t(tData?.tradeIn?.description, "Get extra cashback when you trade in your old device"),
    buttonText: t(tData?.tradeIn?.buttonText, "Check Trade-In Value"),
  };

  const unlockedVsCarrierData = {
    title: t(tData?.unlockedVsCarrier?.title, "Unlocked vs Carrier Phones"),
    description: t(tData?.unlockedVsCarrier?.description, "Which is right for you?"),
    benefits: (tData?.unlockedVsCarrier?.benefits || []).map((benefit) => ({
      ...benefit,
      title: t(benefit.title, benefit.title),
      description: t(benefit.description, benefit.description),
    })),
  };

  const brandSpotlightData = {
    title: t(tData?.brandSpotlightTitle, "Brand Spotlight"),
    brands: (tData?.brandSpotlight || []).map((brand) => ({
      ...brand,
      name: t(brand.name, brand.name),
      description: t(brand.description, brand.description),
    })),
  };

  const accessoriesData = {
    title: t(tData?.accessoriesTitle, "Mobile Accessories"),
    accessories: (tData?.accessories || []).map((accessory) => ({
      ...accessory,
      name: t(accessory.name, accessory.name),
      description: t(accessory.description, accessory.description),
    })),
  };

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Price?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best cashback rates on mobile phones"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Prices"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Mobile Phone Cashback FAQ - ${countryName}`),
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
        q: "Can I earn cashback on mobile phone plans?",
        a: "Yes! Many carriers offer cashback on new plans, upgrades, and even monthly bills. Check individual carrier terms for details.",
      },
      {
        q: "Do trade-in phones qualify for cashback?",
        a: "Yes, the net purchase price after trade-in typically qualifies for cashback. Some stores also offer additional cashback on trade-ins.",
      },
      {
        q: "How long does mobile cashback take to confirm?",
        a: "Mobile phone cashback typically takes 30-60 days to confirm due to return periods and carrier plan verification.",
      },
      {
        q: "Can I combine carrier promotions with cashback?",
        a: "Yes! Most carrier promotions like BOGO deals or port-in credits can be combined with our cashback for maximum savings.",
      },
      {
        q: "Are pre-orders eligible for cashback?",
        a: "Yes, pre-orders are typically eligible for cashback. The cashback will be confirmed after the phone ships and the return period passes.",
      },
      {
        q: "What's better: unlocked or carrier phone?",
        a: "Unlocked phones offer flexibility to switch carriers, while carrier phones may have better upfront deals. Compare total cost including cashback.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Mobile Phones Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart shoppers earning cashback on their mobile upgrades"),
    buttonText: t(tData?.final?.buttonText, "Shop Mobile Phones Now"),
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
              href="/stores"
              translationKey="shop_now"
              observer={true}
            />
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
                {categoryData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.categories.map((category, index) => (
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
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.storeCount}+ stores
                    </span>
                    <a
                      href={`/category/${category.name.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-')}`}
                      className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                    >
                      Shop now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Stores Section */}
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
                {featuredStoresData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStoresData.stores.map((store, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{store.logo}</div>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-bold">
                      {store.cashbackRate}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {store.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {store.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {store.categories.slice(0, 3).map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-1 mb-4">
                    {store.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-green-500 mr-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <PrimaryCTA
                    href={store.link}
                    translationKey="shop_now"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Deals Section */}
      {topDealsData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="deals-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="deals-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {topDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "📱"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {deal.title}
                        </h3>
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {deal.store}
                        </span>
                      </div>
                      <PrimaryCTA
                        href={deal.link}
                        translationKey="get_deal"
                        observer={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

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
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Compare Section */}
      {compareData.stores && compareData.stores.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="compare-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="compare-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {compareData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Store</th>
                      <th className="px-6 py-3 text-left">Cashback Rate</th>
                      <th className="px-6 py-3 text-left">Shipping</th>
                      <th className="px-6 py-3 text-left">Returns</th>
                      <th className="px-6 py-3 text-left">Warranty</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.stores.map((store, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {store.name}
                        </td>
                        <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold">
                          {store.cashbackRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.shippingTime}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.returnPolicy}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.warranty}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{store.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/store/${store.name.toLowerCase()}`}
                            translationKey="shop"
                            observer={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Mobile Carriers Section */}
      {carriersData.carriers.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="carriers-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="carriers-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {carriersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carriersData.carriers.map((carrier, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{carrier.logo}</div>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                        {carrier.cashbackRate}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {carrier.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {carrier.description}
                    </p>
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Popular Plans:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {carrier.plans.slice(0, 3).map((plan, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                          >
                            {plan}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PrimaryCTA
                      href={carrier.link}
                      translationKey="view_plans"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Trade In Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="tradein-heading"
          >
            <h2
              id="tradein-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {tradeInData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {tradeInData.description}
            </p>
            <PrimaryCTA
              href="/trade-in"
              translationKey={tradeInData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Unlocked vs Carrier Section */}
      {unlockedVsCarrierData.benefits.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="comparison-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="comparison-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {unlockedVsCarrierData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {unlockedVsCarrierData.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {unlockedVsCarrierData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Brand Spotlight Section */}
      {brandSpotlightData.brands.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="brands-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="brands-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {brandSpotlightData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {brandSpotlightData.brands.map((brand, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-5xl">{brand.logo}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {brand.name}
                          </h3>
                          <div className="text-blue-600 dark:text-blue-400 font-semibold">
                            {brand.cashbackRate} cashback
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {brand.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Featured Products:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brand.featuredProducts.map((product, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PrimaryCTA
                      href={brand.link}
                      translationKey="shop_brand"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Accessories Section */}
      {accessoriesData.accessories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="accessories-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="accessories-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {accessoriesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accessoriesData.accessories.map((accessory, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-5xl mb-4">{accessory.logo}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {accessory.name}
                    </h3>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">
                      {accessory.cashbackRate}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {accessory.description}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {accessory.categories.slice(0, 2).map((cat, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <PrimaryCTA
                      href={accessory.link}
                      translationKey="shop_now"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

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
              href="/price-compare"
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
              href="/stores"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
