// app/[country]/(marketing)/shopping-rewards/home-garden/page.tsx

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
      rating: number;
    }>;
  };
  seasonalPromosTitle?: string;
  seasonalPromos?: Array<{
    title: string;
    description: string;
    endDate: string;
    code?: string;
    link: string;
  }>;
  brandSpotlightTitle?: string;
  brandSpotlight?: Array<{
    name: string;
    logo: string;
    description: string;
    cashbackRate: string;
    featuredProducts: string[];
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
  roomInspo?: {
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
    `home garden cashback ${lowerCountry}`,
    `cashback on furniture ${lowerCountry}`,
    `shop home decor with cashback ${lowerCountry}`,
    `best home deals ${lowerCountry}`,
    `garden supplies cashback ${lowerCountry}`,
    `home improvement rewards ${lowerCountry}`,
    `save on home goods ${lowerCountry}`,
    `furniture cashback ${lowerCountry}`,
    `kitchen appliances cashback ${lowerCountry}`,
    `outdoor living cashback ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "home depot cashback usa",
      "wayfair deals usa",
      "lowes cashback"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "home garden deals uk",
      "dunelm cashback uk",
      "b&q cashback"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "home garden deals canada",
      "home depot canada cashback",
      "wayfair canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "home garden deals australia",
      "bunnings cashback",
      "fantastic furniture deals"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-home-garden");
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
    `Home & Garden Cashback - Earn Up to 15% Back on Home Goods in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Shop home and garden with cashback in ${countryName}. Earn up to 15% back at top stores like Wayfair, Home Depot, IKEA, Lowe's, and more. Get the best deals on furniture, decor, appliances, and outdoor living.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/home-garden`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/home-garden`,
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

export default async function HomeGardenRewardsPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-home-garden");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Home & Garden Cashback - Earn Up to 15% Back`);
  const description = t(rawDescription, `Shop home and garden with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/home-garden`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Home & Garden"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Transform your space while saving money. Earn up to 15% cashback at top home and garden retailers in ${countryName}. From furniture and decor to tools and outdoor living.`
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
        name: "Furniture",
        icon: "🛋️",
        description: "Sofas, beds, tables, chairs, and storage",
        storeCount: 52,
      },
      {
        name: "Home Decor",
        icon: "🖼️",
        description: "Wall art, mirrors, pillows, and rugs",
        storeCount: 48,
      },
      {
        name: "Kitchen & Dining",
        icon: "🍳",
        description: "Cookware, appliances, dinnerware, and utensils",
        storeCount: 45,
      },
      {
        name: "Bed & Bath",
        icon: "🛏️",
        description: "Bedding, towels, mattresses, and organizers",
        storeCount: 38,
      },
      {
        name: "Garden & Outdoor",
        icon: "🌷",
        description: "Plants, tools, furniture, and grills",
        storeCount: 42,
      },
      {
        name: "Tools & DIY",
        icon: "🔧",
        description: "Power tools, hardware, and home improvement",
        storeCount: 35,
      },
    ];
  }

  const featuredStoresData = {
    title: t(tData?.featuredStoresTitle, "Top Home & Garden Stores"),
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
        name: "Wayfair",
        logo: "🏠",
        cashbackRate: "Up to 8%",
        description: "Everything home - furniture, decor, and more",
        categories: ["Furniture", "Decor", "Lighting"],
        features: ["Free shipping", "Price match", "30-day returns"],
        link: "/store/wayfair",
      },
      {
        name: "Home Depot",
        logo: "🔨",
        cashbackRate: "Up to 6%",
        description: "Home improvement, tools, and appliances",
        categories: ["Tools", "Hardware", "Outdoor"],
        features: ["Price guarantee", "Free pickup", "Pro rewards"],
        link: "/store/home-depot",
      },
      {
        name: "IKEA",
        logo: "📦",
        cashbackRate: "Up to 5%",
        description: "Affordable furniture and home accessories",
        categories: ["Furniture", "Storage", "Kitchen"],
        features: ["Click & collect", "Family rewards", "Easy assembly"],
        link: "/store/ikea",
      },
      {
        name: "Lowe's",
        logo: "🪴",
        cashbackRate: "Up to 6%",
        description: "Home improvement and garden supplies",
        categories: ["Tools", "Garden", "Appliances"],
        features: ["Military discount", "Free delivery", "Price match"],
        link: "/store/lowes",
      },
      {
        name: "Crate & Barrel",
        logo: "🍽️",
        cashbackRate: "Up to 7%",
        description: "Modern furniture and kitchenware",
        categories: ["Furniture", "Kitchen", "Decor"],
        features: ["Design services", "Wedding registry", "Free shipping"],
        link: "/store/crate-and-barrel",
      },
      {
        name: "Pottery Barn",
        logo: "🕯️",
        cashbackRate: "Up to 8%",
        description: "Premium home furnishings and decor",
        categories: ["Furniture", "Bedding", "Decor"],
        features: ["Design crew", "Key rewards", "Free swatches"],
        link: "/store/pottery-barn",
      },
    ];
  }

  const topDealsData = {
    title: t(tData?.topDealsTitle, "Hot Home & Garden Deals"),
    deals: (tData?.topDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  // Default deals if not in translation
  if (topDealsData.deals.length === 0) {
    topDealsData.deals = [
      {
        title: "Sofa Sale",
        description: "Comfortable sectionals starting at $399",
        originalPrice: "$899",
        salePrice: "$399",
        cashbackRate: "8%",
        store: "Wayfair",
        image: "🛋️",
        link: "/deal/sofa-sale",
      },
      {
        title: "Patio Furniture Clearance",
        description: "Prepare for summer with up to 50% off outdoor sets",
        originalPrice: "$599",
        salePrice: "$299",
        cashbackRate: "10%",
        store: "Home Depot",
        image: "🪑",
        link: "/deal/patio-clearance",
      },
      {
        title: "Kitchen Appliance Bundle",
        description: "Save big on refrigerator, stove, and dishwasher",
        originalPrice: "$2499",
        salePrice: "$1899",
        cashbackRate: "12%",
        store: "Lowe's",
        image: "🍳",
        link: "/deal/kitchen-bundle",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Home & Garden Shopping Tips"),
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
        title: "Measure Twice, Buy Once",
        description: "Always measure your space before buying furniture to ensure the perfect fit.",
        icon: "📏",
      },
      {
        title: "Stack Cashback",
        description: "Combine our cashback with store sales, coupons, and credit card rewards for maximum savings.",
        icon: "💰",
      },
      {
        title: "Check Assembly Requirements",
        description: "Review assembly needs before purchasing furniture to avoid surprises.",
        icon: "🔧",
      },
      {
        title: "Compare Delivery Options",
        description: "Check shipping costs and delivery times, especially for large items.",
        icon: "🚚",
      },
    ];
  }

  const compareData = {
    title: t(tData?.compareTitle, "Compare Cashback Rates"),
    description: t(tData?.compare?.description, "See how much you can earn at top home & garden stores"),
    stores: (tData?.compare?.stores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  // Default compare data if not in translation
  if (!compareData.stores || compareData.stores.length === 0) {
    compareData.stores = [
      {
        name: "Wayfair",
        cashbackRate: "Up to 8%",
        shippingTime: "5-10 days",
        returnPolicy: "30 days",
        rating: 4.6,
      },
      {
        name: "Home Depot",
        cashbackRate: "Up to 6%",
        shippingTime: "2-7 days",
        returnPolicy: "90 days",
        rating: 4.7,
      },
      {
        name: "IKEA",
        cashbackRate: "Up to 5%",
        shippingTime: "5-12 days",
        returnPolicy: "365 days",
        rating: 4.4,
      },
      {
        name: "Lowe's",
        cashbackRate: "Up to 6%",
        shippingTime: "3-8 days",
        returnPolicy: "90 days",
        rating: 4.6,
      },
    ];
  }

  const seasonalPromosData = {
    title: t(tData?.seasonalPromosTitle, "Seasonal Promotions"),
    promos: (tData?.seasonalPromos || []).map((promo) => ({
      ...promo,
      title: t(promo.title, promo.title),
      description: t(promo.description, promo.description),
    })),
  };

  // Default seasonal promos if not in translation
  if (seasonalPromosData.promos.length === 0) {
    seasonalPromosData.promos = [
      {
        title: "Spring Garden Event",
        description: "Up to 40% off plants, soil, and garden tools",
        endDate: "May 31, 2025",
        link: "/promos/spring-garden",
      },
      {
        title: "Labor Day Furniture Sale",
        description: "Extra 15% off + cashback on all furniture",
        endDate: "Sep 8, 2025",
        code: "LABOR15",
        link: "/promos/labor-day-furniture",
      },
    ];
  }

  const brandSpotlightData = {
    title: t(tData?.brandSpotlightTitle, "Brand Spotlight"),
    brands: (tData?.brandSpotlight || []).map((brand) => ({
      ...brand,
      name: t(brand.name, brand.name),
      description: t(brand.description, brand.description),
    })),
  };

  // Default brand spotlight if not in translation
  if (brandSpotlightData.brands.length === 0) {
    brandSpotlightData.brands = [
      {
        name: "Samsung Home",
        logo: "📺",
        description: "Smart appliances and home electronics",
        cashbackRate: "Up to 8%",
        featuredProducts: ["Smart Refrigerator", "Washer & Dryer", "Microwave"],
        link: "/brand/samsung-home",
      },
      {
        name: "Black+Decker",
        logo: "🔧",
        description: "Power tools and home improvement",
        cashbackRate: "Up to 10%",
        featuredProducts: ["Drill Set", "Lawn Mower", "Coffee Maker"],
        link: "/brand/black-decker",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Home & Garden Buying Guides"),
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
        title: "Choosing the Perfect Sofa",
        description: "Find the right style, size, and fabric for your living room",
        readTime: "8 min",
        link: "/guide/perfect-sofa",
      },
      {
        title: "Indoor Plant Care Guide",
        description: "Keep your houseplants thriving with these expert tips",
        readTime: "6 min",
        link: "/guide/indoor-plants",
      },
      {
        title: "Kitchen Remodel on a Budget",
        description: "Transform your kitchen without breaking the bank",
        readTime: "10 min",
        link: "/guide/kitchen-remodel",
      },
    ];
  }

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Price?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best cashback rates on home & garden items"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Prices"),
  };

  const roomInspoData = {
    title: t(tData?.roomInspo?.title, "Need Room Inspiration?"),
    description: t(tData?.roomInspo?.description, "Explore our curated room ideas and design tips to transform your space"),
    buttonText: t(tData?.roomInspo?.buttonText, "Get Inspired"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Home & Garden Cashback FAQ - ${countryName}`),
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
        q: "Which home & garden stores offer the highest cashback?",
        answer: "Cashback rates vary by store and season. Wayfair often offers up to 8%, Home Depot and Lowe's up to 6%, and Crate & Barrel up to 7%. Check our store listings for current rates."
      },
      {
        q: "Can I earn cashback on furniture delivery fees?",
        answer: "Delivery fees are typically not eligible for cashback. However, the cashback applies to the product cost before taxes and delivery charges."
      },
      {
        q: "How long does home & garden cashback take to confirm?",
        answer: "Home and garden cashback typically takes 45-90 days to confirm due to longer return periods for furniture and large appliances. This protects against returns and exchanges."
      },
      {
        q: "What happens if I return furniture?",
        answer: "If you return an item, the cashback will be deducted from your account. Wait until after the return period to withdraw cashback on large purchases."
      },
      {
        q: "Can I use gift cards with cashback?",
        answer: "Yes! You can use gift cards and still earn cashback on the portion paid with the gift card. Just make sure to click through our link first."
      },
      {
        q: "Do assembly services affect my cashback?",
        answer: "Assembly fees and installation services are usually not eligible for cashback, but they don't affect the cashback you earn on the product itself."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Home & Garden Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart shoppers earning cashback on their home improvement purchases"),
    buttonText: t(tData?.final?.buttonText, "Shop Home & Garden Now"),
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
                className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
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
                      href={`/category/${category.name.toLowerCase()}`}
                      className="text-teal-600 dark:text-teal-400 text-sm font-semibold hover:underline"
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
                className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
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
                    <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-bold">
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
                        <span className="text-teal-500 mr-1">✓</span>
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "🏠"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {deal.title}
                        </h3>
                        <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-xs font-bold">
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
                          <span className="text-lg font-bold text-teal-600 dark:text-teal-400 ml-2">
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
                className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Store</th>
                      <th className="px-6 py-3 text-left">Cashback Rate</th>
                      <th className="px-6 py-3 text-left">Shipping</th>
                      <th className="px-6 py-3 text-left">Returns</th>
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
                        <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-bold">
                          {store.cashbackRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.shippingTime}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.returnPolicy}
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
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
                          <div className="text-teal-600 dark:text-teal-400 font-semibold">
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full mb-8"
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

      {/* Room Inspiration Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="room-inspo-heading"
          >
            <h2
              id="room-inspo-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {roomInspoData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {roomInspoData.description}
            </p>
            <PrimaryCTA
              href="/room-inspiration"
              translationKey={roomInspoData.buttonText}
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
              className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto mt-4 rounded-full mb-8"
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
