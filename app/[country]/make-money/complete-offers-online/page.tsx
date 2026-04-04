// app/[country]/(marketing)/complete-offers-online/page.tsx

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

interface OfferPlatform {
  name: string;
  logo: string;
  earningPotential: string;
  description: string;
  offerTypes: string[];
  payoutMethods: string[];
  minimumPayout: string;
  rating: number;
  link: string;
  isFeatured?: boolean;
}

interface OfferType {
  title: string;
  description: string;
  averagePayout: string;
  timeRequired: string;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: string;
  tips: string[];
}

interface Offer {
  title: string;
  description: string;
  reward: string;
  requirements: string;
  platform: string;
  category: string;
  link: string;
  isLimited?: boolean;
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
    offerCount: number;
  }>;
  featuredPlatformsTitle?: string;
  featuredPlatforms?: OfferPlatform[];
  offerTypesTitle?: string;
  offerTypes?: OfferType[];
  topOffersTitle?: string;
  topOffers?: Offer[];
  highestPayingTitle?: string;
  highestPaying?: OfferPlatform[];
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  earningsCalculator?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  compareTitle?: string;
  compare?: {
    description?: string;
    items?: Array<{
      name: string;
      earningPotential: string;
      timeToComplete: string;
      minimumPayout: string;
      rating: number;
    }>;
  };
  successStoriesTitle?: string;
  successStories?: Array<{
    name: string;
    amount: string;
    story: string;
    platform: string;
  }>;
  buyingGuidesTitle?: string;
  buyingGuides?: Array<{
    title: string;
    description: string;
    readTime: string;
    link: string;
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
    `complete offers earn money ${lowerCountry}`,
    `paid offers online ${lowerCountry}`,
    `get paid to complete offers ${lowerCountry}`,
    `offer walls earn cash ${lowerCountry}`,
    `sign up offers get paid ${lowerCountry}`,
    `free trial offers money ${lowerCountry}`,
    `paid survey offers ${lowerCountry}`,
    `earn money completing tasks ${lowerCountry}`,
    `offer completion rewards ${lowerCountry}`,
    `get paid for signups ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "paid offers usa",
      "swagbucks offers usa",
      "rewarded offers usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "paid offers uk",
      "swagbucks offers uk",
      "rewarded offers uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "paid offers canada",
      "swagbucks offers canada",
      "rewarded offers canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "paid offers australia",
      "swagbucks offers australia",
      "rewarded offers au"
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
    translation = await loadSectionTranslation(language, "complete-offers-online");
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
    `Complete Offers Online - Get Paid to Complete Offers in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn real money by completing online offers in ${countryName}. Get paid for signups, free trials, surveys, and more. Join legitimate platforms and start earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/complete-offers-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/complete-offers-online`,
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

export default async function CompleteOffersOnlinePage({
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
  const tData = await loadSectionTranslation(language, "complete-offers-online");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Complete Offers Online - Get Paid to Complete Offers`);
  const description = t(rawDescription, `Earn real money by completing online offers in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/complete-offers-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Paid to Complete Offers Online"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Turn your spare time into cash! Complete simple offers, sign up for free trials, take surveys, and earn real money in ${countryName}. Start earning today with zero investment.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Offer Categories"),
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
        name: "Free Trials",
        icon: "🎁",
        description: "Get paid for testing free subscriptions",
        offerCount: 45,
      },
      {
        name: "Email Submissions",
        icon: "📧",
        description: "Simple sign-up offers",
        offerCount: 120,
      },
      {
        name: "Download Apps",
        icon: "📱",
        description: "Install and try new apps",
        offerCount: 78,
      },
      {
        name: "Surveys",
        icon: "📋",
        description: "Share your opinions",
        offerCount: 95,
      },
      {
        name: "Video Offers",
        icon: "🎬",
        description: "Watch short videos",
        offerCount: 62,
      },
      {
        name: "Shopping Offers",
        icon: "🛍️",
        description: "Cashback on purchases",
        offerCount: 48,
      },
    ];
  }

  const featuredPlatformsData = {
    title: t(tData?.featuredPlatformsTitle, "🌟 Best Offer Platforms"),
    platforms: (tData?.featuredPlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default featured platforms if not in translation
  if (featuredPlatformsData.platforms.length === 0) {
    featuredPlatformsData.platforms = [
      {
        name: "Swagbucks",
        logo: "💰",
        earningPotential: "$50-200/month",
        description: "Complete offers, take surveys, watch videos for SB points",
        offerTypes: ["Free Trials", "Signups", "Surveys", "Shopping"],
        payoutMethods: ["PayPal", "Amazon", "Visa"],
        minimumPayout: "$5",
        rating: 4.5,
        link: "/platform/swagbucks",
        isFeatured: true,
      },
      {
        name: "InboxDollars",
        logo: "📧",
        earningPotential: "$40-150/month",
        description: "Get paid for offers, surveys, emails, and more",
        offerTypes: ["Email Submissions", "Surveys", "Paid Offers"],
        payoutMethods: ["Check", "PayPal", "Gift Cards"],
        minimumPayout: "$30",
        rating: 4.3,
        link: "/platform/inboxdollars",
        isFeatured: true,
      },
      {
        name: "PrizeRebel",
        logo: "🏆",
        earningPotential: "$60-250/month",
        description: "Complete offers and surveys for points",
        offerTypes: ["Free Trials", "Surveys", "Download Offers"],
        payoutMethods: ["PayPal", "Amazon", "Cryptocurrency"],
        minimumPayout: "$5",
        rating: 4.6,
        link: "/platform/prizerebel",
        isFeatured: true,
      },
    ];
  }

  const offerTypesData = {
    title: t(tData?.offerTypesTitle, "📋 Types of Paid Offers"),
    types: (tData?.offerTypes || []).map((type) => ({
      ...type,
      title: t(type.title, type.title),
      description: t(type.description, type.description),
    })),
  };

  // Default offer types if not in translation
  if (offerTypesData.types.length === 0) {
    offerTypesData.types = [
      {
        title: "Free Trial Offers",
        description: "Sign up for free trials of services you actually want to try",
        averagePayout: "$2-15",
        timeRequired: "2-5 minutes",
        difficulty: "Easy",
        icon: "🎁",
        tips: ["Cancel before trial ends", "Use a dedicated email", "Track expiration dates"],
      },
      {
        title: "Email Signups",
        description: "Submit your email for newsletters and offers",
        averagePayout: "$0.50-3",
        timeRequired: "1-2 minutes",
        difficulty: "Easy",
        icon: "📧",
        tips: ["Use a separate email account", "Complete profile info", "Confirm email when required"],
      },
      {
        title: "Download & Install",
        description: "Download and install mobile apps or desktop software",
        averagePayout: "$1-10",
        timeRequired: "3-10 minutes",
        difficulty: "Medium",
        icon: "📱",
        tips: ["Open app after install", "Complete registration", "Keep app for 30 days"],
      },
      {
        title: "Survey Offers",
        description: "Share your opinions on products and services",
        averagePayout: "$1-5",
        timeRequired: "10-30 minutes",
        difficulty: "Medium",
        icon: "📋",
        tips: ["Be honest with answers", "Complete profile surveys", "Qualify for higher paying surveys"],
      },
    ];
  }

  const topOffersData = {
    title: t(tData?.topOffersTitle, "🔥 Hot Offers Right Now"),
    offers: (tData?.topOffers || []).map((offer) => ({
      ...offer,
      title: t(offer.title, offer.title),
      description: t(offer.description, offer.description),
      platform: t(offer.platform, offer.platform),
    })),
  };

  // Default top offers if not in translation
  if (topOffersData.offers.length === 0) {
    topOffersData.offers = [
      {
        title: "Disney+ Free Trial",
        description: "Sign up for 7-day free trial",
        reward: "$10",
        requirements: "Valid email, cancel before billing",
        platform: "Swagbucks",
        category: "Free Trial",
        link: "/offer/disney-plus",
        isLimited: true,
      },
      {
        title: "Newsletter Signup",
        description: "Subscribe to daily deals newsletter",
        reward: "$2",
        requirements: "Valid email address",
        platform: "InboxDollars",
        category: "Email",
        link: "/offer/newsletter",
        isLimited: false,
      },
      {
        title: "Mobile Game Install",
        description: "Download and reach level 5",
        reward: "$5",
        requirements: "Install, play to level 5",
        platform: "PrizeRebel",
        category: "App Install",
        link: "/offer/mobile-game",
        isLimited: true,
      },
    ];
  }

  const highestPayingData = {
    title: t(tData?.highestPayingTitle, "💎 Highest Paying Offer Platforms"),
    platforms: (tData?.highestPaying || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default highest paying platforms if not in translation
  if (highestPayingData.platforms.length === 0) {
    highestPayingData.platforms = [
      {
        name: "Freecash",
        logo: "💵",
        earningPotential: "$100-500/month",
        description: "Complete offers, play games, earn crypto",
        offerTypes: ["High Value Offers", "Games", "Surveys"],
        payoutMethods: ["PayPal", "Bitcoin", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.7,
        link: "/platform/freecash",
      },
      {
        name: "GG2U",
        logo: "🎮",
        earningPotential: "$80-300/month",
        description: "Get paid for offers, surveys, and tasks",
        offerTypes: ["Offers", "Surveys", "Games"],
        payoutMethods: ["PayPal", "Amazon", "Visa"],
        minimumPayout: "$7",
        rating: 4.6,
        link: "/platform/gg2u",
      },
      {
        name: "RewardXP",
        logo: "⭐",
        earningPotential: "$70-250/month",
        description: "Complete offers and watch videos",
        offerTypes: ["Offer Walls", "Video Loyalty", "Surveys"],
        payoutMethods: ["PayPal", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.5,
        link: "/platform/rewardxp",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Offer Completion Tips"),
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
        title: "Use a Dedicated Email",
        description: "Create a separate email account for offers to avoid spam in your primary inbox.",
        icon: "📧",
      },
      {
        title: "Read Requirements Carefully",
        description: "Always read offer terms to ensure you complete all steps correctly for credit.",
        icon: "📖",
      },
      {
        title: "Track Your Offers",
        description: "Keep a spreadsheet of completed offers, expected payouts, and dates.",
        icon: "📊",
      },
      {
        title: "Clear Cookies Regularly",
        description: "Clear browser cookies between offers to ensure proper tracking and credit.",
        icon: "🍪",
      },
    ];
  }

  const earningsCalculatorData = {
    title: t(tData?.earningsCalculator?.title, "Calculate Your Offer Earnings"),
    description: t(tData?.earningsCalculator?.description, "See how much you could earn monthly by completing offers"),
    buttonText: t(tData?.earningsCalculator?.buttonText, "Try Calculator"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Compare Offer Platforms"),
    description: t(tData?.compare?.description, "Find the best platform for your offer completion goals"),
    items: (tData?.compare?.items || []).map((item) => ({
      ...item,
      name: t(item.name, item.name),
    })),
  };

  // Default compare items if not in translation
  if (!compareData.items || compareData.items.length === 0) {
    compareData.items = [
      {
        name: "Swagbucks",
        earningPotential: "$50-200/month",
        timeToComplete: "2-3 days",
        minimumPayout: "$5",
        rating: 4.5,
      },
      {
        name: "PrizeRebel",
        earningPotential: "$60-250/month",
        timeToComplete: "1-2 days",
        minimumPayout: "$5",
        rating: 4.6,
      },
      {
        name: "Freecash",
        earningPotential: "$100-500/month",
        timeToComplete: "1-2 days",
        minimumPayout: "$5",
        rating: 4.7,
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Success Stories"),
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
        name: "Rachel T.",
        amount: "350",
        story: "I complete offers during my commute. Earned $350 last month just from free trials and signups!",
        platform: "Swagbucks",
      },
      {
        name: "Tom H.",
        amount: "500",
        story: "Focusing on high-value offers and games, I consistently make $500+ per month.",
        platform: "Freecash",
      },
      {
        name: "Lisa M.",
        amount: "280",
        story: "Stay-at-home mom - I earn $280/month completing offers while kids nap. Perfect side income!",
        platform: "PrizeRebel",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Offer Completion Guides"),
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
        title: "Beginner's Guide to Offers",
        description: "Everything you need to know to start completing offers today",
        readTime: "8 min",
        link: "/guide/offers-basics",
      },
      {
        title: "Maximizing Offer Earnings",
        description: "Advanced strategies for higher payouts and efficiency",
        readTime: "12 min",
        link: "/guide/maximize-offers",
      },
      {
        title: "Avoiding Offer Scams",
        description: "How to identify legitimate offers and avoid wasting time",
        readTime: "7 min",
        link: "/guide/offer-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Complete Offers Online FAQ - ${countryName}`),
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
        q: "How do I get paid for completing offers?",
        a: "Most platforms pay through PayPal, gift cards (Amazon, Visa, Walmart), or cryptocurrency. You'll earn points or cash that can be redeemed once you reach the minimum payout threshold."
      },
      {
        q: "How much can I earn from offers?",
        a: "Earnings vary widely. Casual users earn $50-100/month. Dedicated users who complete high-value offers can earn $300-500+ monthly."
      },
      {
        q: "Do I need to spend money to complete offers?",
        a: "No! Many offers are completely free (email signups, app downloads, surveys). Some offers require purchases, but these are optional and typically pay more."
      },
      {
        q: "How long do offers take to credit?",
        a: "Crediting time varies: instant for simple signups, 1-7 days for app installs, and up to 30-60 days for purchase-based offers (due to return periods)."
      },
      {
        q: "Can I complete offers from multiple platforms?",
        a: "Yes! Using multiple platforms is the best way to maximize your earnings, as each platform has different offers available."
      },
      {
        q: "Are these offers legitimate?",
        a: "We only recommend legitimate platforms with verified payment histories. However, always read offer terms and never provide sensitive information like your Social Security number."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning by Completing Offers Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of users who turned simple tasks into real cash"),
    buttonText: t(tData?.final?.buttonText, "Browse Offers Now"),
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
              href="/offer-platforms"
              translationKey="start_earning"
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
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
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
                      {category.offerCount}+ offers
                    </span>
                    <a
                      href={`/offers/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                    >
                      Browse →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Platforms Section */}
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
                {featuredPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlatformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {platform.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                      🌟 Featured
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center p-8">
                    <div className="text-6xl">{platform.logo}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {platform.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{platform.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {platform.description}
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {platform.earningPotential}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">earning potential</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {platform.offerTypes.slice(0, 2).map((type, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {type}
                        </span>
                      ))}
                      <span className="text-xs text-gray-500">
                        Min: {platform.minimumPayout}
                      </span>
                    </div>
                    <PrimaryCTA
                      href={platform.link}
                      translationKey="join_now"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Offer Types Section */}
      {offerTypesData.types.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="types-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="types-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {offerTypesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offerTypesData.types.map((type, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{type.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {type.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Avg. Payout</p>
                            <p className="font-semibold text-green-600">{type.averagePayout}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Time Required</p>
                            <p className="font-semibold">{type.timeRequired}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Pro Tips:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {type.tips.map((tip, idx) => (
                              <li key={idx}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Top Offers Section */}
      {topOffersData.offers.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="offers-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="offers-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {topOffersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topOffersData.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                  >
                    {offer.isLimited && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                        Limited Time
                      </div>
                    )}
                    <div className="bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center p-6">
                      <div className="text-5xl">
                        {offer.category === "Free Trial" ? "🎁" : offer.category === "Email" ? "📧" : "📱"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {offer.description}
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-2 text-center">
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {offer.reward}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {offer.requirements}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        Platform: {offer.platform}
                      </p>
                      <PrimaryCTA
                        href={offer.link}
                        translationKey="complete_offer"
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

      {/* Highest Paying Platforms Section */}
      {highestPayingData.platforms.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="highest-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="highest-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {highestPayingData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highestPayingData.platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800"
                  >
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-6">
                      <div className="text-5xl">{platform.logo}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {platform.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{platform.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {platform.description}
                      </p>
                      <div className="text-center mb-3">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {platform.earningPotential}
                        </p>
                        <p className="text-xs text-gray-500">earning potential</p>
                      </div>
                      <PrimaryCTA
                        href={platform.link}
                        translationKey="join_now"
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

      {/* Compare Section */}
      {compareData.items && compareData.items.length > 0 && (
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
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Platform</th>
                      <th className="px-6 py-3 text-left">Monthly Potential</th>
                      <th className="px-6 py-3 text-left">Credit Time</th>
                      <th className="px-6 py-3 text-left">Min. Payout</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                          {item.earningPotential}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.timeToComplete}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.minimumPayout}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/platform/${item.name.toLowerCase().replace(/ /g, '-')}`}
                            translationKey="view"
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

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
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
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md"
                  >
                    <div className="text-4xl mb-3">⭐</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Earned ${story.amount} • {story.platform}
                      </p>
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
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Earnings Calculator Section */}
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
              {earningsCalculatorData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {earningsCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/offer-earnings-calculator"
              translationKey={earningsCalculatorData.buttonText}
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
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/offer-platforms"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
