// app/[country]/(marketing)/cashback/page.tsx

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

interface Category {
  name: string;
  icon: string;
  description: string;
  storeCount: number;
  avgCashback: string;
}

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  name: string;
  location: string;
  amount: string;
  text: string;
  avatar: string;
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
  stats?: {
    totalCashback?: string;
    activeUsers?: string;
    partnerStores?: string;
    satisfactionRate?: string;
  };
  howItWorksTitle?: string;
  howItWorks?: HowItWorksStep[];
  categoriesTitle?: string;
  categories?: Category[];
  featuredStoresTitle?: string;
  featuredStores?: Store[];
  topCashbackTitle?: string;
  topCashback?: Array<{
    store: string;
    logo: string;
    cashbackRate: string;
    category: string;
    link: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonialsTitle?: string;
  testimonials?: Testimonial[];
  calculatorTitle?: string;
  calculator?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  };
  compareTitle?: string;
  compare?: {
    description?: string;
    features?: Array<{
      name: string;
      cashog: string;
      others: string;
    }>;
  };
  mobileAppTitle?: string;
  mobileApp?: {
    title?: string;
    subtitle?: string;
    features?: string[];
    buttonText?: string;
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
    `cashback ${lowerCountry}`,
    `earn cashback ${lowerCountry}`,
    `cashback shopping ${lowerCountry}`,
    `money back on purchases ${lowerCountry}`,
    `cashback rewards ${lowerCountry}`,
    `shopping cashback ${lowerCountry}`,
    `best cashback site ${lowerCountry}`,
    `cashback deals ${lowerCountry}`,
    `online shopping cashback ${lowerCountry}`,
    `get paid to shop ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "cashback usa",
      "american cashback sites",
      "rakuten alternative"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "cashback uk",
      "british cashback sites",
      "quidco alternative"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "cashback canada",
      "canadian cashback sites",
      "ebates canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cashback australia",
      "australian cashback sites",
      "cashrewards alternative"
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
    translation = await loadSectionTranslation(language, "cashback");
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
    `Cashback Shopping - Earn Money Back on Every Purchase in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn cashback on every online purchase in ${countryName}. Sign up free and get paid to shop at 10,000+ stores. Up to 15% cashback + exclusive deals.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/cashback`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/cashback`,
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

export default async function CashbackPage({
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
  const tData = await loadSectionTranslation(language, "cashback");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Cashback Shopping - Earn Money Back`);
  const description = t(rawDescription, `Earn cashback on every online purchase in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/cashback`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Every Purchase"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Join over 500,000 smart shoppers in ${countryName} earning cashback at 10,000+ stores. Get paid to shop for fashion, electronics, beauty, travel, and more. It's completely free!`
    ),
  };

  const statsData = {
    totalCashback: t(tData?.stats?.totalCashback, "$50M+"),
    activeUsers: t(tData?.stats?.activeUsers, "500K+"),
    partnerStores: t(tData?.stats?.partnerStores, "10,000+"),
    satisfactionRate: t(tData?.stats?.satisfactionRate, "98%"),
  };

  const howItWorksData = {
    title: t(tData?.howItWorksTitle, "How Cashback Works"),
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
        title: "Sign Up Free",
        description: "Create your free Cashog account in seconds",
        icon: "📝",
      },
      {
        step: 2,
        title: "Shop Through Cashog",
        description: "Click your favorite store from our partner list",
        icon: "🛒",
      },
      {
        step: 3,
        title: "Earn Cashback",
        description: "Cashback is automatically added to your account",
        icon: "💰",
      },
      {
        step: 4,
        title: "Withdraw Your Money",
        description: "Get paid via PayPal, bank transfer, or gift cards",
        icon: "💵",
      },
    ];
  }

  const categoriesData = {
    title: t(tData?.categoriesTitle, "Shop by Category"),
    categories: (tData?.categories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
      description: t(category.description, category.description),
    })),
  };

  // Default categories if not in translation
  if (categoriesData.categories.length === 0) {
    categoriesData.categories = [
      { name: "Fashion", icon: "👕", description: "Clothing, shoes, accessories", storeCount: 2500, avgCashback: "8%" },
      { name: "Electronics", icon: "📱", description: "Laptops, phones, gaming", storeCount: 1800, avgCashback: "6%" },
      { name: "Beauty", icon: "💄", description: "Makeup, skincare, haircare", storeCount: 1200, avgCashback: "10%" },
      { name: "Home & Garden", icon: "🏠", description: "Furniture, decor, tools", storeCount: 1500, avgCashback: "7%" },
      { name: "Travel", icon: "✈️", description: "Flights, hotels, rentals", storeCount: 800, avgCashback: "5%" },
      { name: "Health & Wellness", icon: "💪", description: "Vitamins, fitness, pharmacy", storeCount: 900, avgCashback: "9%" },
      { name: "Toys & Games", icon: "🎮", description: "Games, puzzles, collectibles", storeCount: 700, avgCashback: "6%" },
      { name: "Groceries", icon: "🛒", description: "Food delivery, meal kits", storeCount: 600, avgCashback: "5%" },
    ];
  }

  const featuredStoresData = {
    title: t(tData?.featuredStoresTitle, "Top Cashback Stores"),
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
        name: "Amazon",
        logo: "📦",
        cashbackRate: "Up to 10%",
        description: "Millions of products with fast shipping",
        categories: ["Electronics", "Home", "Fashion"],
        features: ["Prime eligible", "30-day returns", "Price tracking"],
        link: "/store/amazon",
      },
      {
        name: "Walmart",
        logo: "🛒",
        cashbackRate: "Up to 8%",
        description: "Everyday low prices on everything",
        categories: ["Groceries", "Electronics", "Home"],
        features: ["Free pickup", "Free shipping", "Price match"],
        link: "/store/walmart",
      },
      {
        name: "Target",
        logo: "🎯",
        cashbackRate: "Up to 10%",
        description: "Style, home, electronics, and more",
        categories: ["Fashion", "Home", "Beauty"],
        features: ["Circle offers", "Drive Up", "RedCard savings"],
        link: "/store/target",
      },
      {
        name: "eBay",
        logo: "🔨",
        cashbackRate: "Up to 8%",
        description: "New and used items from around the world",
        categories: ["Electronics", "Fashion", "Collectibles"],
        features: ["Authenticity guarantee", "Best price", "Buyer protection"],
        link: "/store/ebay",
      },
      {
        name: "Best Buy",
        logo: "💻",
        cashbackRate: "Up to 6%",
        description: "Electronics, appliances, and more",
        categories: ["Electronics", "Gaming", "Appliances"],
        features: ["Price match", "Geek Squad", "Free shipping"],
        link: "/store/bestbuy",
      },
      {
        name: "Sephora",
        logo: "💄",
        cashbackRate: "Up to 12%",
        description: "Beauty products from top brands",
        categories: ["Makeup", "Skincare", "Fragrance"],
        features: ["Beauty Insider", "Free samples", "Free shipping"],
        link: "/store/sephora",
      },
    ];
  }

  const topCashbackData = {
    title: t(tData?.topCashbackTitle, "Highest Cashback Rates"),
    stores: (tData?.topCashback || []).map((store) => ({
      ...store,
      store: t(store.store, store.store),
    })),
  };

  const tipsData = {
    title: t(tData?.tipsTitle, "Maximize Your Cashback"),
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
        title: "Always Start Here",
        description: "Always start your shopping session by clicking through Cashog to ensure cashback tracking.",
        icon: "🎯",
      },
      {
        title: "Stack with Coupons",
        description: "Use store coupons and promo codes on top of cashback for maximum savings.",
        icon: "📚",
      },
      {
        title: "Check Exclusions",
        description: "Some categories may be excluded. Check store terms before purchasing.",
        icon: "📋",
      },
      {
        title: "Refer Friends",
        description: "Earn bonus cashback when friends join and start shopping through Cashog.",
        icon: "👥",
      },
    ];
  }

  const testimonialsData = {
    title: t(tData?.testimonialsTitle, "What Our Members Say"),
    testimonials: (tData?.testimonials || []).map((testimonial) => ({
      ...testimonial,
      name: t(testimonial.name, testimonial.name),
      location: t(testimonial.location, testimonial.location),
      text: t(testimonial.text, testimonial.text),
    })),
  };

  // Default testimonials if not in translation
  if (testimonialsData.testimonials.length === 0) {
    testimonialsData.testimonials = [
      {
        name: "Sarah Johnson",
        location: "New York",
        amount: "$1,247",
        text: "Cashog has completely changed how I shop online. I've earned over $1,000 cashback just by shopping as I normally would!",
        avatar: "SJ",
      },
      {
        name: "Michael Chen",
        location: "California",
        amount: "$892",
        text: "The cashback adds up so fast. I check Cashog before every purchase now. Best decision ever!",
        avatar: "MC",
      },
      {
        name: "Emily Rodriguez",
        location: "Texas",
        amount: "$2,103",
        text: "From electronics to everyday essentials, I earn cashback on everything. The payouts are fast and reliable.",
        avatar: "ER",
      },
    ];
  }

  const calculatorData = {
    title: t(tData?.calculator?.title, "Calculate Your Cashback"),
    description: t(tData?.calculator?.description, "See how much you could earn"),
    placeholder: t(tData?.calculator?.placeholder, "Enter monthly spending amount"),
    buttonText: t(tData?.calculator?.buttonText, "Calculate"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Why Cashog is Better"),
    description: t(tData?.compare?.description, "Compare Cashog with other cashback platforms"),
    features: (tData?.compare?.features || []).map((feature) => ({
      ...feature,
      name: t(feature.name, feature.name),
    })),
  };

  // Default compare features if not in translation
  if (compareData.features.length === 0) {
    compareData.features = [
      { name: "Cashback Rates", cashog: "Up to 15%", others: "Up to 10%" },
      { name: "Payout Speed", cashog: "2-3 days", others: "30-60 days" },
      { name: "Minimum Withdrawal", cashog: "$10", others: "$20+" },
      { name: "Free to Join", cashog: "✓", others: "✓" },
      { name: "Mobile App", cashog: "✓", others: "✓" },
      { name: "Referral Bonus", cashog: "$25", others: "$10" },
    ];
  }

  const mobileAppData = {
    title: t(tData?.mobileApp?.title, "Cashback on the Go"),
    subtitle: t(tData?.mobileApp?.subtitle, "Earn cashback from anywhere with our mobile app"),
    features: (tData?.mobileApp?.features || []).map((feature) => t(feature, feature)),
    buttonText: t(tData?.mobileApp?.buttonText, "Download the App"),
  };

  // Default mobile app features if not in translation
  if (mobileAppData.features.length === 0) {
    mobileAppData.features = [
      "Shop on your phone",
      "Track cashback in real-time",
      "Get in-store offers",
      "Instant payout alerts",
    ];
  }

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Rate?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best cashback rates"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Cashback"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Cashback FAQ - ${countryName}`),
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
        q: "How does cashback work?",
        a: "When you click through Cashog to a partner store and make a purchase, the store pays us a commission. We share that commission with you as cashback.",
      },
      {
        q: "Is Cashog really free?",
        a: "Yes! Cashog is completely free to join and use. There are no hidden fees or subscription costs.",
      },
      {
        q: "How long does cashback take?",
        a: "Cashback is typically confirmed within 30-90 days, depending on the store's return policy. Once confirmed, you can withdraw it immediately.",
      },
      {
        q: "How do I withdraw my cashback?",
        a: "You can withdraw via PayPal, bank transfer, or gift cards once you reach the $10 minimum withdrawal amount.",
      },
      {
        q: "Can I use coupons with cashback?",
        a: "Yes! You can stack store coupons and promo codes with our cashback for even more savings.",
      },
      {
        q: "What if my cashback doesn't track?",
        a: "If cashback doesn't appear within 7 days, you can submit a missing cashback claim with your order details.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Cashback Today"),
    subtitle: t(tData?.final?.subtitle, "Join over 500,000 smart shoppers already earning cashback"),
    buttonText: t(tData?.final?.buttonText, "Sign Up Free"),
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
              translationKey="sign_up_free"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {statsData.totalCashback}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Total Cashback Earned
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {statsData.activeUsers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Active Members
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {statsData.partnerStores}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Partner Stores
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {statsData.satisfactionRate}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Member Satisfaction
                </div>
              </div>
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
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.storeCount}+ stores
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      {category.avgCashback} avg
                    </span>
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
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{store.logo}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {store.name}
                      </h3>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {store.cashbackRate}
                    </div>
                  </div>
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

      {/* Top Cashback Section */}
      {topCashbackData.stores.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="top-cashback-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="top-cashback-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {topCashbackData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {topCashbackData.stores.map((store, index) => (
                  <a
                    key={index}
                    href={store.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-4xl mb-2">{store.logo}</div>
                    <div className="font-semibold text-green-600 dark:text-green-400 text-lg">
                      {store.cashbackRate}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {store.store}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Tips Section */}
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

      {/* Testimonials Section */}
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
                {testimonialsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialsData.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ${testimonial.amount}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Calculator Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="calculator-heading"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
              <h2
                id="calculator-heading"
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {calculatorData.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {calculatorData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="number"
                  placeholder={calculatorData.placeholder}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-green-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-yellow-500 hover:to-green-600 transition-all duration-300">
                  {calculatorData.buttonText}
                </button>
              </div>
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Based on average 8% cashback rate
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Compare Section */}
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
                <thead className="bg-gradient-to-r from-yellow-400 to-green-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Feature</th>
                    <th className="px-6 py-3 text-left">Cashog</th>
                    <th className="px-6 py-3 text-left">Other Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                        {feature.cashog}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {feature.others}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Mobile App Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="mobile-heading"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  id="mobile-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {mobileAppData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mt-4 rounded-full mb-6"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {mobileAppData.subtitle}
                </p>
                <ul className="space-y-3 mb-8">
                  {mobileAppData.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="text-green-500 mr-2 text-xl">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <PrimaryCTA
                  href="/download"
                  translationKey={mobileAppData.buttonText}
                  observer={false}
                />
              </div>
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-yellow-400 to-green-500 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-gray-900 rounded-2xl p-4 w-64 text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-white font-bold text-xl">Cashog App</div>
                    <div className="text-gray-400 text-sm mt-2">Cashback in your pocket</div>
                  </div>
                </div>
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
              href="/compare-cashback"
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
              href="/signup"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
