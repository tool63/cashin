// app/[country]/(marketing)/shopping-rewards/daily-deals/page.tsx

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

interface Deal {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  cashbackRate: string;
  store: string;
  image: string;
  category: string;
  link: string;
  expiresIn?: string;
  isLimited?: boolean;
}

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
    dealCount: number;
  }>;
  featuredDealsTitle?: string;
  featuredDeals?: Deal[];
  flashSalesTitle?: string;
  flashSales?: Deal[];
  trendingNowTitle?: string;
  trendingNow?: Deal[];
  topStoresTitle?: string;
  topStores?: Store[];
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  dealAlert?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  priceDropTitle?: string;
  priceDrop?: Array<{
    product: string;
    store: string;
    previousPrice: string;
    currentPrice: string;
    savings: string;
    link: string;
  }>;
  seasonalEventsTitle?: string;
  seasonalEvents?: Array<{
    name: string;
    date: string;
    description: string;
    expectedSavings: string;
    link: string;
  }>;
  couponSpotlightTitle?: string;
  couponSpotlight?: Array<{
    code: string;
    description: string;
    store: string;
    discount: string;
    expiryDate: string;
    link: string;
  }>;
  buyingGuidesTitle?: string;
  buyingGuides?: Array<{
    title: string;
    description: string;
    readTime: string;
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
    `daily deals ${lowerCountry}`,
    `best deals today ${lowerCountry}`,
    `cashback deals ${lowerCountry}`,
    `limited time offers ${lowerCountry}`,
    `flash sales ${lowerCountry}`,
    `deal alerts ${lowerCountry}`,
    `shopping deals ${lowerCountry}`,
    `discount offers ${lowerCountry}`,
    `clearance sales ${lowerCountry}`,
    `weekly deals ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "today's deals usa",
      "amazon daily deals",
      "walmart clearance"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "daily deals uk",
      "amazon uk deals",
      "argos clearance"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "daily deals canada",
      "amazon ca deals",
      "best buy canada deals"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "daily deals australia",
      "amazon au deals",
      "catch deals"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-daily-deals");
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
    `Daily Deals - Best Cashback Offers Today in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover the best daily deals with cashback in ${countryName}. Save up to 70% off plus earn extra cashback on electronics, fashion, home goods, groceries, and more. Updated daily!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/daily-deals`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/daily-deals`,
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

export default async function DailyDealsPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-daily-deals");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Daily Deals - Best Cashback Offers Today`);
  const description = t(rawDescription, `Discover the best daily deals with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/daily-deals`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Today's Best Daily Deals"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Save big with hand-picked deals updated daily. Get up to 70% off plus earn cashback at top stores in ${countryName}. New deals added every day - don't miss out!`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Shop Deals by Category"),
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
        name: "Electronics",
        icon: "💻",
        description: "Laptops, phones, TVs, and gaming",
        dealCount: 156,
      },
      {
        name: "Fashion",
        icon: "👕",
        description: "Clothing, shoes, and accessories",
        dealCount: 243,
      },
      {
        name: "Home & Garden",
        icon: "🏠",
        description: "Furniture, decor, and tools",
        dealCount: 189,
      },
      {
        name: "Groceries",
        icon: "🛒",
        description: "Food, beverages, and meal kits",
        dealCount: 97,
      },
      {
        name: "Beauty",
        icon: "💄",
        description: "Skincare, makeup, and haircare",
        dealCount: 134,
      },
      {
        name: "Toys & Games",
        icon: "🎮",
        description: "Toys, games, and collectibles",
        dealCount: 78,
      },
    ];
  }

  const featuredDealsData = {
    title: t(tData?.featuredDealsTitle, "🔥 Featured Deals of the Day"),
    deals: (tData?.featuredDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  // Default featured deals if not in translation
  if (featuredDealsData.deals.length === 0) {
    featuredDealsData.deals = [
      {
        title: "Samsung 55\" 4K Smart TV",
        description: "Crystal clear picture with smart features",
        originalPrice: "$699",
        salePrice: "$499",
        cashbackRate: "8%",
        store: "Best Buy",
        image: "📺",
        category: "Electronics",
        link: "/deal/samsung-tv",
        expiresIn: "2 days",
        isLimited: true,
      },
      {
        title: "Nike Air Max Sneakers",
        description: "Comfortable and stylish running shoes",
        originalPrice: "$160",
        salePrice: "$112",
        cashbackRate: "10%",
        store: "Nike",
        image: "👟",
        category: "Fashion",
        link: "/deal/nike-air-max",
        expiresIn: "1 day",
        isLimited: false,
      },
      {
        title: "Instant Pot Duo 7-in-1",
        description: "Pressure cooker, slow cooker, and more",
        originalPrice: "$129",
        salePrice: "$79",
        cashbackRate: "6%",
        store: "Amazon",
        image: "🍲",
        category: "Home & Garden",
        link: "/deal/instant-pot",
        expiresIn: "3 days",
        isLimited: true,
      },
    ];
  }

  const flashSalesData = {
    title: t(tData?.flashSalesTitle, "⚡ Flash Sales - Limited Time"),
    deals: (tData?.flashSales || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  // Default flash sales if not in translation
  if (flashSalesData.deals.length === 0) {
    flashSalesData.deals = [
      {
        title: "Wireless Earbuds",
        description: "Bluetooth 5.0 with charging case",
        originalPrice: "$79",
        salePrice: "$39",
        cashbackRate: "12%",
        store: "Target",
        image: "🎧",
        category: "Electronics",
        link: "/deal/earbuds",
        expiresIn: "4 hours",
        isLimited: true,
      },
      {
        title: "Leather Backpack",
        description: "Genuine leather laptop backpack",
        originalPrice: "$89",
        salePrice: "$49",
        cashbackRate: "8%",
        store: "Macy's",
        image: "🎒",
        category: "Fashion",
        link: "/deal/backpack",
        expiresIn: "6 hours",
        isLimited: true,
      },
      {
        title: "Air Fryer",
        description: "4.5 quart digital air fryer",
        originalPrice: "$99",
        salePrice: "$59",
        cashbackRate: "7%",
        store: "Walmart",
        image: "🍟",
        category: "Home & Garden",
        link: "/deal/air-fryer",
        expiresIn: "3 hours",
        isLimited: true,
      },
    ];
  }

  const trendingNowData = {
    title: t(tData?.trendingNowTitle, "📈 Trending Now"),
    deals: (tData?.trendingNow || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  // Default trending deals if not in translation
  if (trendingNowData.deals.length === 0) {
    trendingNowData.deals = [
      {
        title: "Robot Vacuum",
        description: "Smart mapping and app control",
        originalPrice: "$399",
        salePrice: "$249",
        cashbackRate: "10%",
        store: "Best Buy",
        image: "🤖",
        category: "Home & Garden",
        link: "/deal/robot-vacuum",
        expiresIn: "",
        isLimited: false,
      },
      {
        title: "Skincare Gift Set",
        description: "Anti-aging serum and moisturizer",
        originalPrice: "$120",
        salePrice: "$84",
        cashbackRate: "15%",
        store: "Sephora",
        image: "💆",
        category: "Beauty",
        link: "/deal/skincare-set",
        expiresIn: "",
        isLimited: false,
      },
      {
        title: "LEGO Star Wars Set",
        description: "Collector's edition building kit",
        originalPrice: "$199",
        salePrice: "$149",
        cashbackRate: "8%",
        store: "LEGO",
        image: "🧱",
        category: "Toys & Games",
        link: "/deal/lego-starwars",
        expiresIn: "",
        isLimited: false,
      },
    ];
  }

  const topStoresData = {
    title: t(tData?.topStoresTitle, "Top Stores with Active Deals"),
    stores: (tData?.topStores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
      description: t(store.description, store.description),
    })),
  };

  // Default top stores if not in translation
  if (topStoresData.stores.length === 0) {
    topStoresData.stores = [
      {
        name: "Amazon",
        logo: "📦",
        cashbackRate: "Up to 10%",
        description: "Today's lightning deals and limited-time offers",
        categories: ["Electronics", "Home", "Fashion"],
        features: ["Free shipping", "Prime early access", "Price protection"],
        link: "/store/amazon-deals",
      },
      {
        name: "Best Buy",
        logo: "💻",
        cashbackRate: "Up to 8%",
        description: "Daily deals on electronics and appliances",
        categories: ["Electronics", "Gaming", "TVs"],
        features: ["Price match", "Free shipping", "Member deals"],
        link: "/store/bestbuy-deals",
      },
      {
        name: "Walmart",
        logo: "🎯",
        cashbackRate: "Up to 6%",
        description: "Rollback prices and clearance events",
        categories: ["Everything", "Groceries", "Home"],
        features: ["Free pickup", "Free delivery", "Price match"],
        link: "/store/walmart-deals",
      },
      {
        name: "Target",
        logo: "📍",
        cashbackRate: "Up to 7%",
        description: "Weekly deals and circle offers",
        categories: ["Home", "Beauty", "Toys"],
        features: ["Drive up", "Circle rewards", "Price match"],
        link: "/store/target-deals",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Deal Hunting Tips"),
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
        title: "Act Fast on Flash Sales",
        description: "Limited-time deals sell out quickly. Add to cart immediately if you see a great price.",
        icon: "⚡",
      },
      {
        title: "Stack Cashback",
        description: "Always click through our links to earn cashback on top of sale prices.",
        icon: "💰",
      },
      {
        title: "Compare Prices",
        description: "Use price comparison tools to ensure you're getting the best deal.",
        icon: "📊",
      },
      {
        title: "Sign Up for Alerts",
        description: "Get notified when your favorite products go on sale.",
        icon: "🔔",
      },
    ];
  }

  const dealAlertData = {
    title: t(tData?.dealAlert?.title, "Never Miss a Deal"),
    description: t(tData?.dealAlert?.description, "Sign up for free deal alerts and get the best offers delivered to your inbox"),
    buttonText: t(tData?.dealAlert?.buttonText, "Get Deal Alerts"),
  };

  const priceDropData = {
    title: t(tData?.priceDropTitle, "📉 Recent Price Drops"),
    items: (tData?.priceDrop || []).map((item) => ({
      ...item,
      product: t(item.product, item.product),
      store: t(item.store, item.store),
    })),
  };

  // Default price drops if not in translation
  if (priceDropData.items.length === 0) {
    priceDropData.items = [
      {
        product: "iPad 10.9-inch",
        store: "Apple",
        previousPrice: "$449",
        currentPrice: "$399",
        savings: "$50",
        link: "/deal/ipad",
      },
      {
        product: "Dyson V8 Vacuum",
        store: "Dyson",
        previousPrice: "$399",
        currentPrice: "$299",
        savings: "$100",
        link: "/deal/dyson-v8",
      },
      {
        product: "Keurig Coffee Maker",
        store: "Keurig",
        previousPrice: "$149",
        currentPrice: "$99",
        savings: "$50",
        link: "/deal/keurig",
      },
    ];
  }

  const seasonalEventsData = {
    title: t(tData?.seasonalEventsTitle, "📅 Upcoming Sale Events"),
    events: (tData?.seasonalEvents || []).map((event) => ({
      ...event,
      name: t(event.name, event.name),
      description: t(event.description, event.description),
    })),
  };

  // Default seasonal events if not in translation
  if (seasonalEventsData.events.length === 0) {
    seasonalEventsData.events = [
      {
        name: "Prime Day",
        date: "July 15-16, 2025",
        description: "Exclusive deals for Amazon Prime members",
        expectedSavings: "Up to 60% off",
        link: "/event/prime-day",
      },
      {
        name: "Black Friday",
        date: "November 28, 2025",
        description: "Biggest shopping event of the year",
        expectedSavings: "Up to 80% off",
        link: "/event/black-friday",
      },
      {
        name: "Cyber Monday",
        date: "December 1, 2025",
        description: "Online-only deals and doorbusters",
        expectedSavings: "Up to 70% off",
        link: "/event/cyber-monday",
      },
    ];
  }

  const couponSpotlightData = {
    title: t(tData?.couponSpotlightTitle, "🎟️ Active Coupons & Codes"),
    coupons: (tData?.couponSpotlight || []).map((coupon) => ({
      ...coupon,
      description: t(coupon.description, coupon.description),
      store: t(coupon.store, coupon.store),
    })),
  };

  // Default coupons if not in translation
  if (couponSpotlightData.coupons.length === 0) {
    couponSpotlightData.coupons = [
      {
        code: "SAVE20",
        description: "20% off your first purchase",
        store: "ASOS",
        discount: "20% OFF",
        expiryDate: "Dec 31, 2025",
        link: "/coupon/asos",
      },
      {
        code: "WELCOME15",
        description: "15% off sitewide for new customers",
        store: "Wayfair",
        discount: "15% OFF",
        expiryDate: "Dec 31, 2025",
        link: "/coupon/wayfair",
      },
      {
        code: "FRESH10",
        description: "$10 off first grocery order",
        store: "Instacart",
        discount: "$10 OFF",
        expiryDate: "Dec 31, 2025",
        link: "/coupon/instacart",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Deal Hunting Guides"),
    guides: (tData?.buyingGuides || []).map((guide) => ({
      ...guide,
      title: t(guide.title, guide.title),
      description: t(guide.description, guide.description),
    })),
  };

  // Default buying guides if not in translation
  if (buyingGuidesData.guides.length === 0) {
    buyingGuidesData.guides = [
      {
        title: "How to Spot a Real Deal",
        description: "Learn to distinguish genuine savings from marketing gimmicks",
        readTime: "6 min",
        link: "/guide/spot-real-deals",
      },
      {
        title: "Best Times to Buy Everything",
        description: "Seasonal buying guide for every product category",
        readTime: "10 min",
        link: "/guide/best-times-to-buy",
      },
      {
        title: "Price Tracking Tools",
        description: "Use technology to never overpay again",
        readTime: "5 min",
        link: "/guide/price-tracking",
      },
    ];
  }

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Price Elsewhere?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best deals with cashback"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Prices"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Daily Deals FAQ - ${countryName}`),
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
        q: "How often are deals updated?",
        a: "We update our deals daily, with flash sales refreshed every few hours. Check back often for the latest offers!"
      },
      {
        q: "Can I earn cashback on deal prices?",
        a: "Yes! Most deals are eligible for cashback. Just click through our link before purchasing to earn cashback on top of sale prices."
      },
      {
        q: "What's a flash sale?",
        a: "Flash sales are limited-time offers that typically last 24 hours or less. They often have the deepest discounts but sell out quickly."
      },
      {
        q: "How do I know if a deal is legitimate?",
        a: "We verify all deals before posting. Look for price history and compare with other stores to ensure you're getting real savings."
      },
      {
        q: "Can I combine multiple coupons?",
        a: "It depends on the store. Some allow stacking, others don't. Check the store's coupon policy for details."
      },
      {
        q: "What happens if a deal expires?",
        a: "Expired deals are removed from our site. Sign up for deal alerts to get notified before time-sensitive offers end."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Today's Best Deals"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart shoppers who never pay full price"),
    buttonText: t(tData?.final?.buttonText, "Browse All Deals"),
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
              href="/deals"
              translationKey="browse_deals"
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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
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
                      {category.dealCount}+ deals
                    </span>
                    <a
                      href={`/deals/${category.name.toLowerCase()}`}
                      className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
                    >
                      View deals →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Deals Section */}
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
                {featuredDealsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDealsData.deals.map((deal, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {deal.isLimited && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                      Limited Time
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-8">
                    <div className="text-6xl">{deal.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {deal.title}
                      </h3>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
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
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-2">
                          {deal.salePrice}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {deal.store}
                      </span>
                    </div>
                    {deal.expiresIn && (
                      <p className="text-xs text-orange-500 mb-2">
                        ⏰ Expires in {deal.expiresIn}
                      </p>
                    )}
                    <PrimaryCTA
                      href={deal.link}
                      translationKey="shop_deal"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Flash Sales Section */}
      {flashSalesData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="flash-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="flash-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {flashSalesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashSalesData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800 relative"
                  >
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      ⚡ FLASH SALE
                    </div>
                    <div className="bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center p-8 pt-16">
                      <div className="text-6xl">{deal.image}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                        {deal.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-xl font-bold text-red-600 dark:text-red-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-green-600">
                          +{deal.cashbackRate}
                        </span>
                      </div>
                      {deal.expiresIn && (
                        <p className="text-xs font-bold text-red-500 mb-2">
                          ⏰ Ends in {deal.expiresIn}
                        </p>
                      )}
                      <PrimaryCTA
                        href={deal.link}
                        translationKey="shop_now"
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

      {/* Trending Now Section */}
      {trendingNowData.deals.length > 0 && (
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
                  {trendingNowData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingNowData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {deal.title}
                        </h3>
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
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
                        translationKey="shop_deal"
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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topStoresData.stores.map((store, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{store.logo}</div>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-bold inline-block">
                      {store.cashbackRate}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                    {store.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-3">
                    {store.description}
                  </p>
                  <PrimaryCTA
                    href={store.link}
                    translationKey="view_deals"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Price Drop Section */}
      {priceDropData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="pricedrop-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="pricedrop-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {priceDropData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-4">
                {priceDropData.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {item.product}
                        </h3>
                        <p className="text-sm text-gray-500">{item.store}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 line-through">
                          {item.previousPrice}
                        </span>
                        <p className="text-xl font-bold text-green-600">
                          {item.currentPrice}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                          ↓ {item.savings} off
                        </span>
                      </div>
                      <PrimaryCTA
                        href={item.link}
                        translationKey="shop_now"
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

      {/* Seasonal Events Section */}
      {seasonalEventsData.events.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="events-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="events-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {seasonalEventsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {seasonalEventsData.events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="text-5xl mb-4">
                      {index === 0 ? "🎯" : index === 1 ? "🖤" : "💻"}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {event.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {event.description}
                    </p>
                    <p className="text-green-600 font-bold mb-4">
                      {event.expectedSavings}
                    </p>
                    <PrimaryCTA
                      href={event.link}
                      translationKey="remind_me"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Coupon Spotlight Section */}
      {couponSpotlightData.coupons.length > 0 && (
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
                  {couponSpotlightData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {couponSpotlightData.coupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md border-2 border-dashed border-blue-300 dark:border-blue-700"
                  >
                    <div className="text-center">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-3 mb-4 inline-block">
                        <code className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                          {coupon.code}
                        </code>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {coupon.store}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {coupon.description}
                      </p>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        {coupon.discount}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Expires: {coupon.expiryDate}
                      </p>
                      <PrimaryCTA
                        href={coupon.link}
                        translationKey="get_code"
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
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Deal Alert Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="alert-heading"
          >
            <h2
              id="alert-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {dealAlertData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {dealAlertData.description}
            </p>
            <PrimaryCTA
              href="/deal-alerts"
              translationKey={dealAlertData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Buying Guides Section */}
      {buyingGuidesData.guides.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="guides-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="guides-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {buyingGuidesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {buyingGuidesData.guides.map((guide, index) => (
                  <a
                    key={index}
                    href={guide.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        Read guide →
                      </span>
                    </div>
                  </a>
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
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
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
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/deals"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
