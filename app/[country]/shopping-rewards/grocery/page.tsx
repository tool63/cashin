// app/[country]/(marketing)/shopping-rewards/grocery/page.tsx

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
  mealPlanning?: {
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
    `grocery cashback ${lowerCountry}`,
    `cashback on groceries ${lowerCountry}`,
    `shop groceries with cashback ${lowerCountry}`,
    `best grocery deals ${lowerCountry}`,
    `online grocery shopping rewards ${lowerCountry}`,
    `cashback grocery stores ${lowerCountry}`,
    `save on food delivery ${lowerCountry}`,
    `grocery discounts ${lowerCountry}`,
    `meal delivery cashback ${lowerCountry}`,
    `supermarket cashback ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "instacart cashback usa",
      "walmart grocery cashback",
      "kroger cashback"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "grocery deals uk",
      "tesco cashback uk",
      "sainsbury cashback"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "grocery deals canada",
      "loblaws cashback",
      "metro grocery canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "grocery deals australia",
      "woolworths cashback",
      "coles cashback"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-grocery");
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
    `Grocery Cashback - Earn Up to 15% Back on Groceries in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Shop groceries with cashback in ${countryName}. Earn up to 15% back at top stores like Instacart, Walmart, Kroger, Whole Foods, and more. Get the best deals on fresh food, pantry staples, and meal delivery.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/grocery`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/grocery`,
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

export default async function GroceryRewardsPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-grocery");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Grocery Cashback - Earn Up to 15% Back`);
  const description = t(rawDescription, `Shop groceries with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/grocery`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Groceries"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Save money on every shopping trip. Earn up to 15% cashback at top grocery stores and food delivery services in ${countryName}. From fresh produce to pantry essentials and meal kits.`
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
        name: "Fresh Produce",
        icon: "🍎",
        description: "Fruits, vegetables, and organic options",
        storeCount: 35,
      },
      {
        name: "Pantry Staples",
        icon: "🥫",
        description: "Canned goods, pasta, rice, and baking supplies",
        storeCount: 42,
      },
      {
        name: "Meat & Seafood",
        icon: "🥩",
        description: "Fresh meat, poultry, fish, and plant-based alternatives",
        storeCount: 28,
      },
      {
        name: "Dairy & Eggs",
        icon: "🥛",
        description: "Milk, cheese, yogurt, butter, and eggs",
        storeCount: 31,
      },
      {
        name: "Beverages",
        icon: "🥤",
        description: "Coffee, tea, juice, soda, and water",
        storeCount: 38,
      },
      {
        name: "Meal Kits",
        icon: "📦",
        description: "Pre-portioned ingredients and recipes",
        storeCount: 22,
      },
    ];
  }

  const featuredStoresData = {
    title: t(tData?.featuredStoresTitle, "Top Grocery Stores"),
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
        name: "Instacart",
        logo: "🛒",
        cashbackRate: "Up to 10%",
        description: "Same-day delivery from your favorite stores",
        categories: ["All Groceries", "Fresh", "Organic"],
        features: ["Same-day delivery", "Pickup available", "Membership perks"],
        link: "/store/instacart",
      },
      {
        name: "Walmart Grocery",
        logo: "🎯",
        cashbackRate: "Up to 6%",
        description: "Everyday low prices on groceries",
        categories: ["Fresh", "Pantry", "Household"],
        features: ["Free pickup", "Delivery pass", "Rollback prices"],
        link: "/store/walmart-grocery",
      },
      {
        name: "Kroger",
        logo: "🛍️",
        cashbackRate: "Up to 5%",
        description: "America's largest grocery store",
        categories: ["Fresh", "Pharmacy", "Deli"],
        features: ["Fuel points", "Digital coupons", "Boost membership"],
        link: "/store/kroger",
      },
      {
        name: "Whole Foods",
        logo: "🌿",
        cashbackRate: "Up to 8%",
        description: "Natural and organic grocery leader",
        categories: ["Organic", "Prepared Foods", "Produce"],
        features: ["Amazon Prime discounts", "Quality standards", "Hot bar"],
        link: "/store/whole-foods",
      },
      {
        name: "HelloFresh",
        logo: "🍽️",
        cashbackRate: "Up to 15%",
        description: "Meal kit delivery service",
        categories: ["Meal Kits", "Quick Recipes", "Family Meals"],
        features: ["Easy recipes", "Portion control", "Skip anytime"],
        link: "/store/hellofresh",
      },
      {
        name: "Target Grocery",
        logo: "📍",
        cashbackRate: "Up to 7%",
        description: "Groceries and household essentials",
        categories: ["Fresh", "Pantry", "Household"],
        features: ["Drive up", "Circle rewards", "Price match"],
        link: "/store/target-grocery",
      },
    ];
  }

  const topDealsData = {
    title: t(tData?.topDealsTitle, "Hot Grocery Deals"),
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
        title: "Buy One Get One Free",
        description: "Select snacks and beverages",
        originalPrice: "$5.99",
        salePrice: "BOGO",
        cashbackRate: "10%",
        store: "Kroger",
        image: "🥨",
        link: "/deal/bogo-snacks",
      },
      {
        title: "Organic Produce Box",
        description: "Mixed seasonal vegetables delivered",
        originalPrice: "$39",
        salePrice: "$29",
        cashbackRate: "12%",
        store: "Whole Foods",
        image: "🥬",
        link: "/deal/organic-box",
      },
      {
        title: "Meal Kit Trial Offer",
        description: "First box including shipping",
        originalPrice: "$69",
        salePrice: "$39",
        cashbackRate: "15%",
        store: "HelloFresh",
        image: "🍳",
        link: "/deal/hellofresh-trial",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Grocery Shopping Tips"),
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
        title: "Plan Your Meals",
        description: "Create a weekly meal plan to avoid impulse purchases and reduce food waste.",
        icon: "📋",
      },
      {
        title: "Use Digital Coupons",
        description: "Combine cashback with store apps and digital coupons for extra savings.",
        icon: "📱",
      },
      {
        title: "Buy in Bulk",
        description: "Stock up on non-perishables when they're on sale with cashback.",
        icon: "📦",
      },
      {
        title: "Compare Unit Prices",
        description: "Check price per ounce or pound to find the best value deals.",
        icon: "💰",
      },
    ];
  }

  const compareData = {
    title: t(tData?.compareTitle, "Compare Cashback Rates"),
    description: t(tData?.compare?.description, "See how much you can earn at top grocery stores"),
    stores: (tData?.compare?.stores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  // Default compare data if not in translation
  if (!compareData.stores || compareData.stores.length === 0) {
    compareData.stores = [
      {
        name: "Instacart",
        cashbackRate: "Up to 10%",
        shippingTime: "Same-day",
        returnPolicy: "Store policy",
        rating: 4.5,
      },
      {
        name: "Walmart",
        cashbackRate: "Up to 6%",
        shippingTime: "2-3 days",
        returnPolicy: "90 days",
        rating: 4.4,
      },
      {
        name: "Kroger",
        cashbackRate: "Up to 5%",
        shippingTime: "1-2 days",
        returnPolicy: "30 days",
        rating: 4.3,
      },
      {
        name: "HelloFresh",
        cashbackRate: "Up to 15%",
        shippingTime: "Weekly delivery",
        returnPolicy: "7 days",
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
        title: "Summer BBQ Event",
        description: "Up to 20% off grilling essentials",
        endDate: "Aug 31, 2025",
        link: "/promos/bbq-event",
      },
      {
        title: "Back to School Snacks",
        description: "15% off lunchbox favorites + cashback",
        endDate: "Sep 15, 2025",
        code: "SCHOOL15",
        link: "/promos/back-to-school",
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
        name: "Organic Valley",
        logo: "🥛",
        description: "Organic dairy and eggs from family farms",
        cashbackRate: "Up to 8%",
        featuredProducts: ["Milk", "Eggs", "Butter", "Cheese"],
        link: "/brand/organic-valley",
      },
      {
        name: "Beyond Meat",
        logo: "🌱",
        description: "Plant-based meat alternatives",
        cashbackRate: "Up to 10%",
        featuredProducts: ["Beyond Burger", "Sausages", "Ground Beef"],
        link: "/brand/beyond-meat",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Grocery Buying Guides"),
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
        title: "Healthy Eating on a Budget",
        description: "Nutritious grocery shopping without breaking the bank",
        readTime: "7 min",
        link: "/guide/healthy-budget",
      },
      {
        title: "Understanding Food Labels",
        description: "Decode organic, non-GMO, and other certifications",
        readTime: "5 min",
        link: "/guide/food-labels",
      },
      {
        title: "Meal Prep Mastery",
        description: "Save time and money with weekly meal preparation",
        readTime: "8 min",
        link: "/guide/meal-prep",
      },
    ];
  }

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Price?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best cashback rates on groceries"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Prices"),
  };

  const mealPlanningData = {
    title: t(tData?.mealPlanning?.title, "Need Meal Planning Help?"),
    description: t(tData?.mealPlanning?.description, "Get weekly meal plans and shopping lists tailored to your preferences"),
    buttonText: t(tData?.mealPlanning?.buttonText, "Start Planning"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Grocery Cashback FAQ - ${countryName}`),
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
        q: "Which grocery stores offer the highest cashback?",
        a: "Cashback rates vary by store and season. HelloFresh often offers up to 15%, Instacart up to 10%, and Whole Foods up to 8%. Check our store listings for current rates."
      },
      {
        q: "Can I earn cashback on grocery delivery fees?",
        a: "Delivery fees and tips are typically not eligible for cashback. However, the cashback applies to the product cost before taxes and delivery charges."
      },
      {
        q: "How long does grocery cashback take to confirm?",
        a: "Grocery cashback typically takes 15-30 days to confirm due to shorter return periods for food items. This protects against returns and adjustments."
      },
      {
        q: "What about perishable items?",
        a: "Cashback applies to all eligible grocery items, including perishables. However, refunds for spoiled items will reduce your cashback."
      },
      {
        q: "Can I use grocery store loyalty cards?",
        a: "Yes! You can use store loyalty cards and still earn cashback. Just make sure to click through our link before shopping."
      },
      {
        q: "Do meal kit subscriptions offer recurring cashback?",
        a: "Yes! Most meal kit services offer cashback on every delivery. Check individual store terms as some have limits on total cashback per account."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Groceries Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart shoppers earning cashback on their everyday grocery purchases"),
    buttonText: t(tData?.final?.buttonText, "Shop Groceries Now"),
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
                className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
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
                      className="text-orange-600 dark:text-orange-400 text-sm font-semibold hover:underline"
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
                className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
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
                    <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-bold">
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
                        <span className="text-orange-500 mr-1">✓</span>
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
                  className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "🛒"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {deal.title}
                        </h3>
                        <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs font-bold">
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
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400 ml-2">
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
                className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
                  className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
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
                        <td className="px-6 py-4 text-orange-600 dark:text-orange-400 font-bold">
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
                  className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
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
                          <div className="text-orange-600 dark:text-orange-400 font-semibold">
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
                  className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full mb-8"
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

      {/* Meal Planning Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="meal-planning-heading"
          >
            <h2
              id="meal-planning-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {mealPlanningData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {mealPlanningData.description}
            </p>
            <PrimaryCTA
              href="/meal-planner"
              translationKey={mealPlanningData.buttonText}
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
              className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full mb-8"
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
