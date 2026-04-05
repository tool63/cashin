// app/[country]/(marketing)/cashback-rewards/page.tsx

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

interface CashbackPlatform {
  name: string;
  icon: string;
  description: string;
  cashbackRate: string;
  categories: string[];
  payoutMethods: string[];
  minimumPayout: string;
  rating: number;
  steps: string[];
  tips: string[];
  link: string;
  isFeatured?: boolean;
  signupBonus?: string;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  storeCount: number;
  averageCashback: string;
}

interface Store {
  name: string;
  logo: string;
  cashbackRate: string;
  categories: string[];
  link: string;
  isPopular?: boolean;
}

interface SpecialOffer {
  title: string;
  description: string;
  cashbackRate: string;
  store: string;
  expiryDate: string;
  link: string;
  isLimited?: boolean;
}

interface ComparisonItem {
  platform: string;
  cashbackRate: string;
  payoutSpeed: string;
  minimumPayout: string;
  signupBonus: string;
  easeOfUse: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  platform: string;
  story: string;
  timeSaved: string;
}

interface Resource {
  title: string;
  description: string;
  readTime: string;
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
  categories?: Category[];
  topPlatformsTitle?: string;
  topPlatforms?: CashbackPlatform[];
  popularStoresTitle?: string;
  popularStores?: Store[];
  specialOffersTitle?: string;
  specialOffers?: SpecialOffer[];
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    items?: ComparisonItem[];
  };
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  cashbackCalculator?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  resourcesTitle?: string;
  resources?: Resource[];
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
    `cashback rewards ${lowerCountry}`,
    `cashback shopping ${lowerCountry}`,
    `earn cashback online ${lowerCountry}`,
    `best cashback apps ${lowerCountry}`,
    `cashback websites ${lowerCountry}`,
    `money back on purchases ${lowerCountry}`,
    `shopping rewards ${lowerCountry}`,
    `cashback deals ${lowerCountry}`,
    `get paid to shop ${lowerCountry}`,
    `cashback programs ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "rakuten cashback usa",
      "ibotta cashback usa",
      "top cashback usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "topcashback uk",
      "quidco cashback uk",
      "cashback deals uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "ebates canada",
      "great canadian rebates",
      "cashback canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cashrewards australia",
      "shopback australia",
      "cashback deals au"
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
    translation = await loadSectionTranslation(language, "cashback-rewards");
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
    `Cashback Rewards - Get Money Back on Every Purchase in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn cashback rewards on your everyday purchases in ${countryName}. Get money back from top stores, shop through cashback apps, and maximize your savings. Start earning cashback today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/cashback-rewards`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/cashback-rewards`,
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

export default async function CashbackRewardsPage({
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
  const tData = await loadSectionTranslation(language, "cashback-rewards");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Cashback Rewards - Get Money Back on Every Purchase`);
  const description = t(rawDescription, `Earn cashback rewards on your everyday purchases in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/cashback-rewards`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Cashback on Every Purchase"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Turn your everyday spending into savings! Earn cashback rewards when you shop at thousands of stores in ${countryName}. Get money back on everything from groceries to electronics - it's free money for shopping you already do.`
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
        name: "Clothing & Fashion",
        icon: "👕",
        description: "Cashback on apparel, shoes, and accessories",
        storeCount: 450,
        averageCashback: "6-10%",
      },
      {
        name: "Electronics",
        icon: "💻",
        description: "Laptops, phones, TVs, and gaming",
        storeCount: 320,
        averageCashback: "3-8%",
      },
      {
        name: "Home & Garden",
        icon: "🏠",
        description: "Furniture, decor, and tools",
        storeCount: 380,
        averageCashback: "5-12%",
      },
      {
        name: "Groceries",
        icon: "🛒",
        description: "Food, beverages, and household items",
        storeCount: 280,
        averageCashback: "2-10%",
      },
      {
        name: "Travel",
        icon: "✈️",
        description: "Flights, hotels, and vacation packages",
        storeCount: 200,
        averageCashback: "4-15%",
      },
      {
        name: "Health & Beauty",
        icon: "💄",
        description: "Skincare, makeup, and wellness",
        storeCount: 310,
        averageCashback: "5-12%",
      },
    ];
  }

  const topPlatformsData = {
    title: t(tData?.topPlatformsTitle, "🏆 Best Cashback Platforms"),
    platforms: (tData?.topPlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default top platforms if not in translation
  if (topPlatformsData.platforms.length === 0) {
    topPlatformsData.platforms = [
      {
        name: "Rakuten",
        icon: "💰",
        description: "Formerly Ebates - earn cashback at over 2,500 stores",
        cashbackRate: "Up to 40%",
        categories: ["Clothing", "Electronics", "Travel", "Home"],
        payoutMethods: ["PayPal", "Check", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.7,
        steps: [
          "Sign up for free Rakuten account",
          "Get $10 welcome bonus",
          "Shop through Rakuten links",
          "Earn cashback automatically",
          "Get paid quarterly"
        ],
        tips: [
          "Install browser extension for automatic cashback",
          "Stack with store coupons",
          "Refer friends for $25 bonus",
          "Check for double cashback events"
        ],
        link: "/cashback/rakuten",
        isFeatured: true,
        signupBonus: "$10",
      },
      {
        name: "TopCashback",
        icon: "⭐",
        description: "Highest paying cashback site - 100% of commissions paid to you",
        cashbackRate: "Up to 50%",
        categories: ["All categories", "Travel", "Electronics", "Clothing"],
        payoutMethods: ["PayPal", "Bank Transfer", "Gift Cards"],
        minimumPayout: "$1",
        rating: 4.6,
        steps: [
          "Create free TopCashback account",
          "Search for your store",
          "Click through to shop",
          "Complete your purchase",
          "Cashback added to account"
        ],
        tips: [
          "Compare cashback rates across platforms",
          "Use the mobile app for in-store cashback",
          "Withdraw as soon as you reach minimum",
          "Check for exclusive higher rates"
        ],
        link: "/cashback/topcashback",
        isFeatured: true,
        signupBonus: "$5",
      },
      {
        name: "Ibotta",
        icon: "📱",
        description: "Cashback on groceries, online shopping, and more",
        cashbackRate: "2-20%",
        categories: ["Groceries", "Online Shopping", "Pharmacy", "Liquor"],
        payoutMethods: ["PayPal", "Venmo", "Gift Cards"],
        minimumPayout: "$20",
        rating: 4.8,
        steps: [
          "Download Ibotta app",
          "Browse available offers",
          "Activate offers before shopping",
          "Upload receipt or link loyalty card",
          "Earn cashback instantly"
        ],
        tips: [
          "Activate offers before shopping",
          "Scan all receipts, even without offers",
          "Complete bonus challenges",
          "Use for in-store and online shopping"
        ],
        link: "/cashback/ibotta",
        isFeatured: true,
        signupBonus: "$10",
      },
      {
        name: "Fetch Rewards",
        icon: "📸",
        description: "Scan grocery receipts for instant points",
        cashbackRate: "1-10%",
        categories: ["Groceries", "Pet Supplies", "Household"],
        payoutMethods: ["Gift Cards", "Visa"],
        minimumPayout: "$3",
        rating: 4.7,
        steps: [
          "Download Fetch Rewards",
          "Scan any grocery receipt",
          "Earn points on eligible items",
          "Redeem for gift cards",
          "No minimum purchase required"
        ],
        tips: [
          "Scan every receipt, even small ones",
          "Refer friends for bonus points",
          "Look for special bonus offers",
          "Connect Amazon and email for points"
        ],
        link: "/cashback/fetch-rewards",
        isFeatured: false,
        signupBonus: "$2",
      },
    ];
  }

  const popularStoresData = {
    title: t(tData?.popularStoresTitle, "🛍️ Popular Stores with Cashback"),
    stores: (tData?.popularStores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  // Default popular stores if not in translation
  if (popularStoresData.stores.length === 0) {
    popularStoresData.stores = [
      {
        name: "Amazon",
        logo: "📦",
        cashbackRate: "1-10%",
        categories: ["Electronics", "Books", "Home", "Fashion"],
        link: "/store/amazon",
        isPopular: true,
      },
      {
        name: "Walmart",
        logo: "🎯",
        cashbackRate: "2-8%",
        categories: ["Groceries", "Electronics", "Home", "Clothing"],
        link: "/store/walmart",
        isPopular: true,
      },
      {
        name: "Target",
        logo: "📍",
        cashbackRate: "1-5%",
        categories: ["Groceries", "Clothing", "Home", "Beauty"],
        link: "/store/target",
        isPopular: true,
      },
      {
        name: "Best Buy",
        logo: "💻",
        cashbackRate: "1-6%",
        categories: ["Electronics", "Gaming", "Appliances"],
        link: "/store/best-buy",
        isPopular: false,
      },
      {
        name: "Nike",
        logo: "👟",
        cashbackRate: "4-12%",
        categories: ["Clothing", "Shoes", "Activewear"],
        link: "/store/nike",
        isPopular: false,
      },
      {
        name: "Sephora",
        logo: "💄",
        cashbackRate: "2-8%",
        categories: ["Beauty", "Skincare", "Makeup"],
        link: "/store/sephora",
        isPopular: false,
      },
    ];
  }

  const specialOffersData = {
    title: t(tData?.specialOffersTitle, "🔥 Limited Time Cashback Offers"),
    offers: (tData?.specialOffers || []).map((offer) => ({
      ...offer,
      title: t(offer.title, offer.title),
      description: t(offer.description, offer.description),
      store: t(offer.store, offer.store),
    })),
  };

  // Default special offers if not in translation
  if (specialOffersData.offers.length === 0) {
    specialOffersData.offers = [
      {
        title: "Double Cashback Weekend",
        description: "Get double cashback on all electronics purchases",
        cashbackRate: "Up to 16%",
        store: "Best Buy",
        expiryDate: "Dec 31, 2025",
        link: "/offer/double-cashback",
        isLimited: true,
      },
      {
        title: "Back to School Special",
        description: "Extra 5% cashback on school supplies",
        cashbackRate: "12%",
        store: "Walmart",
        expiryDate: "Sep 15, 2025",
        link: "/offer/back-to-school",
        isLimited: true,
      },
      {
        title: "Beauty Week",
        description: "10% cashback on all beauty products",
        cashbackRate: "10%",
        store: "Sephora",
        expiryDate: "Aug 30, 2025",
        link: "/offer/beauty-week",
        isLimited: true,
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Cashback Platforms"),
    description: t(tData?.comparison?.description, "Find the best platform for your shopping habits"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      platform: t(item.platform, item.platform),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        platform: "Rakuten",
        cashbackRate: "Up to 40%",
        payoutSpeed: "Quarterly",
        minimumPayout: "$5",
        signupBonus: "$10",
        easeOfUse: "Very Easy",
      },
      {
        platform: "TopCashback",
        cashbackRate: "Up to 50%",
        payoutSpeed: "1-2 weeks",
        minimumPayout: "$1",
        signupBonus: "$5",
        easeOfUse: "Easy",
      },
      {
        platform: "Ibotta",
        cashbackRate: "2-20%",
        payoutSpeed: "Instant",
        minimumPayout: "$20",
        signupBonus: "$10",
        easeOfUse: "Very Easy",
      },
      {
        platform: "Fetch Rewards",
        cashbackRate: "1-10%",
        payoutSpeed: "Instant",
        minimumPayout: "$3",
        signupBonus: "$2",
        easeOfUse: "Extremely Easy",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Cashback Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      story: t(story.story, story.story),
      platform: t(story.platform, story.platform),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah M.",
        earnings: "$850",
        platform: "Rakuten",
        story: "I earned $850 in cashback last year just by shopping through Rakuten. It's like getting paid to shop!",
        timeSaved: "1 year",
      },
      {
        name: "David L.",
        earnings: "$420",
        platform: "Ibotta",
        story: "Scanning grocery receipts takes 2 minutes. Earned $420 back on groceries I was buying anyway.",
        timeSaved: "6 months",
      },
      {
        name: "Jessica T.",
        earnings: "$1,200",
        platform: "TopCashback",
        story: "Combined cashback with credit card rewards and saved over $1,200 on holiday shopping.",
        timeSaved: "1 holiday season",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 Smart Cashback Tips"),
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
        title: "Stack Your Savings",
        description: "Use cashback apps + store coupons + credit card rewards for maximum savings.",
        icon: "💰",
      },
      {
        title: "Install Browser Extensions",
        description: "Automatic cashback alerts make sure you never miss an opportunity.",
        icon: "🔌",
      },
      {
        title: "Use Multiple Apps",
        description: "Different apps have different rates. Compare before shopping.",
        icon: "📱",
      },
      {
        title: "Refer Friends",
        description: "Most platforms offer generous referral bonuses - share your code!",
        icon: "👥",
      },
    ];
  }

  const cashbackCalculatorData = {
    title: t(tData?.cashbackCalculator?.title, "Calculate Your Cashback Earnings"),
    description: t(tData?.cashbackCalculator?.description, "See how much you could earn back on your yearly spending"),
    buttonText: t(tData?.cashbackCalculator?.buttonText, "Try Calculator"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Cashback Resources"),
    resources: (tData?.resources || []).map((resource) => ({
      ...resource,
      title: t(resource.title, resource.title),
      description: t(resource.description, resource.description),
    })),
  };

  // Default resources if not in translation
  if (resourcesData.resources.length === 0) {
    resourcesData.resources = [
      {
        title: "How to Maximize Cashback",
        description: "Advanced strategies for earning more cashback",
        readTime: "10 min",
        link: "/resource/maximize-cashback",
      },
      {
        title: "Best Cashback Apps Compared",
        description: "Which platform pays the most for your shopping",
        readTime: "8 min",
        link: "/resource/cashback-comparison",
      },
      {
        title: "Cashback vs Credit Card Rewards",
        description: "How to combine both for maximum savings",
        readTime: "7 min",
        link: "/resource/cashback-vs-rewards",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Cashback Rewards FAQ - ${countryName}`),
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
        a: "Cashback sites earn commissions from stores when you shop through their links. They share a portion of that commission with you as 'cashback'. It's free money for shopping you already do."
      },
      {
        q: "Is cashback really free money?",
        a: "Yes! Cashback sites don't charge you anything. They make money from store commissions, and you get a percentage back. Never pay to join a cashback program."
      },
      {
        q: "How long does cashback take?",
        a: "Most cashback takes 1-7 days to show as 'pending'. It becomes 'confirmed' after the store's return period (typically 30-90 days), then you can withdraw."
      },
      {
        q: "Can I use coupons with cashback?",
        a: "Yes! Stacking coupons with cashback maximizes savings. Just make sure to click through the cashback link first, then apply coupons at checkout."
      },
      {
        q: "How do I get paid?",
        a: "Most platforms pay via PayPal, direct deposit, or gift cards. Minimum payout thresholds range from $1-20 depending on the platform."
      },
      {
        q: "Is cashback taxable?",
        a: "Cashback is generally considered a rebate or discount, not taxable income. However, signup bonuses and referral earnings may be taxable. Consult a tax professional."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Cashback Today"),
    subtitle: t(tData?.final?.subtitle, "Join millions of smart shoppers who get paid for the purchases they already make"),
    buttonText: t(tData?.final?.buttonText, "Get Started Now"),
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
              href="/cashback-platforms"
              translationKey="start_saving"
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
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
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
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.storeCount}+ stores
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      Up to {category.averageCashback} back
                    </span>
                  </div>
                  <a
                    href={`/cashback/${category.name.toLowerCase().replace(/ /g, '-')}`}
                    className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                  >
                    Shop now →
                  </a>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Platforms Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="platforms-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="platforms-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topPlatformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{platform.icon}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        {platform.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{platform.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {platform.description}
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-lg font-bold text-green-600">{platform.cashbackRate}</p>
                      {platform.signupBonus && (
                        <p className="text-xs text-gray-500">+ {platform.signupBonus} signup bonus</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {platform.payoutMethods.slice(0, 3).map((method, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {method}
                        </span>
                      ))}
                    </div>
                    <PrimaryCTA
                      href={platform.link}
                      translationKey="join_free"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Popular Stores Section */}
      {popularStoresData.stores.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="stores-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="stores-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {popularStoresData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-gray-400 to-blue-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularStoresData.stores.map((store, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{store.logo}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {store.name}
                          {store.isPopular && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Popular</span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-500">{store.categories.slice(0, 2).join(", ")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{store.cashbackRate}</p>
                      <p className="text-xs text-gray-500">cashback</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Special Offers Section */}
      {specialOffersData.offers.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="offers-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="offers-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {specialOffersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specialOffersData.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800 relative"
                  >
                    {offer.isLimited && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                        Limited Time
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {index === 0 ? "⚡" : index === 1 ? "🎒" : "💄"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {offer.description}
                      </p>
                      <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2 mb-2">
                        <p className="text-2xl font-bold text-green-600">{offer.cashbackRate}</p>
                        <p className="text-xs text-gray-500">cashback</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {offer.store} • Expires {offer.expiryDate}
                      </p>
                      <PrimaryCTA
                        href={offer.link}
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

      {/* Comparison Section */}
      {comparisonData.items && comparisonData.items.length > 0 && (
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
                  {comparisonData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Platform</th>
                      <th className="px-6 py-3 text-left">Cashback Rate</th>
                      <th className="px-6 py-3 text-left">Payout Speed</th>
                      <th className="px-6 py-3 text-left">Min. Payout</th>
                      <th className="px-6 py-3 text-left">Signup Bonus</th>
                      <th className="px-6 py-3 text-left">Ease of Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.platform}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">{item.cashbackRate}</td>
                        <td className="px-6 py-4 text-gray-600">{item.payoutSpeed}</td>
                        <td className="px-6 py-4 text-gray-600">{item.minimumPayout}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{item.signupBonus}</td>
                        <td className="px-6 py-4 text-gray-600">{item.easeOfUse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="stories-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="stories-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {successStoriesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
                  >
                    <div className="text-4xl mb-3">💰</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Earned ${story.earnings} • {story.platform}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {story.timeSaved}
                      </p>
                    </div>
                  </div>
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
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Cashback Calculator Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="calculator-heading"
          >
            <h2
              id="calculator-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {cashbackCalculatorData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {cashbackCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/cashback-calculator"
              translationKey={cashbackCalculatorData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Resources Section */}
      {resourcesData.resources.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="resources-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="resources-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {resourcesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resourcesData.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.readTime} read
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        Read →
                      </span>
                    </div>
                  </a>
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
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/cashback-platforms"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
