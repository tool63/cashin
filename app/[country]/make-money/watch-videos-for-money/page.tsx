// app/[country]/(marketing)/watch-videos-for-money/page.tsx

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

interface VideoPlatform {
  name: string;
  logo: string;
  payoutRate: string;
  description: string;
  payoutMethods: string[];
  minimumPayout: string;
  rating: number;
  link: string;
  isFeatured?: boolean;
}

interface EarningMethod {
  title: string;
  description: string;
  earningPotential: string;
  timeRequired: string;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: string;
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
    platformCount: number;
  }>;
  featuredPlatformsTitle?: string;
  featuredPlatforms?: VideoPlatform[];
  highestPayingTitle?: string;
  highestPaying?: VideoPlatform[];
  earningMethodsTitle?: string;
  earningMethods?: EarningMethod[];
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
      payoutRate: string;
      timeToEarn: string;
      minimumPayout: string;
      rating: number;
    }>;
  };
  popularContentTitle?: string;
  popularContent?: Array<{
    category: string;
    examples: string[];
    earningTip: string;
  }>;
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
    `watch videos earn money ${lowerCountry}`,
    `get paid to watch videos ${lowerCountry}`,
    `video watching rewards ${lowerCountry}`,
    `earn money watching videos ${lowerCountry}`,
    `paid video platforms ${lowerCountry}`,
    `watch ads earn cash ${lowerCountry}`,
    `video streaming rewards ${lowerCountry}`,
    `passive income videos ${lowerCountry}`,
    `watch movies get paid ${lowerCountry}`,
    `video earning sites ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "swagbucks watch videos usa",
      "inboxdollars videos usa",
      "earn honey videos usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "watch videos earn money uk",
      "swagbucks uk videos",
      "inboxpounds videos"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "watch videos earn money canada",
      "swagbucks canada videos",
      "earn honey canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "watch videos earn money australia",
      "swagbucks australia videos",
      "paid videos au"
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
    translation = await loadSectionTranslation(language, "watch-videos-for-money");
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
    `Watch Videos for Money - Get Paid to Watch Videos in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn real money by watching videos in ${countryName}. Get paid for watching ads, trailers, movie clips, and more. Join legitimate platforms and start earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/watch-videos-for-money`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/watch-videos-for-money`,
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

export default async function WatchVideosForMoneyPage({
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
  const tData = await loadSectionTranslation(language, "watch-videos-for-money");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Watch Videos for Money - Get Paid to Watch Videos`);
  const description = t(rawDescription, `Earn real money by watching videos in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/watch-videos-for-money`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Paid to Watch Videos"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Turn your screen time into real cash! Watch videos, movie trailers, ads, and content you love - and get paid for it in ${countryName}. Start earning today with zero investment.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Ways to Earn"),
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
        name: "Watch Ads",
        icon: "📺",
        description: "Get paid for watching short video ads",
        platformCount: 25,
      },
      {
        name: "Movie Trailers",
        icon: "🎬",
        description: "Earn watching previews and clips",
        platformCount: 18,
      },
      {
        name: "Music Videos",
        icon: "🎵",
        description: "Get paid for listening and watching",
        platformCount: 12,
      },
      {
        name: "News Clips",
        icon: "📰",
        description: "Earn staying informed",
        platformCount: 15,
      },
      {
        name: "Gaming Content",
        icon: "🎮",
        description: "Watch gameplay and earn",
        platformCount: 20,
      },
      {
        name: "Educational Videos",
        icon: "📚",
        description: "Learn and get paid",
        platformCount: 10,
      },
    ];
  }

  const featuredPlatformsData = {
    title: t(tData?.featuredPlatformsTitle, "🌟 Top Platforms to Watch Videos for Money"),
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
        payoutRate: "$0.01 - $0.05 per video",
        description: "Watch videos, earn SB points, redeem for cash or gift cards",
        payoutMethods: ["PayPal", "Amazon", "Visa"],
        minimumPayout: "$5",
        rating: 4.5,
        link: "/platform/swagbucks",
        isFeatured: true,
      },
      {
        name: "InboxDollars",
        logo: "📧",
        payoutRate: "$0.01 - $0.10 per video",
        description: "Get paid to watch videos, take surveys, and read emails",
        payoutMethods: ["Check", "PayPal", "Gift Cards"],
        minimumPayout: "$30",
        rating: 4.3,
        link: "/platform/inboxdollars",
        isFeatured: true,
      },
      {
        name: "MyPoints",
        logo: "⭐",
        payoutRate: "$0.02 - $0.08 per video",
        description: "Earn points watching videos, shopping online, and more",
        payoutMethods: ["PayPal", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.4,
        link: "/platform/mypoints",
        isFeatured: true,
      },
    ];
  }

  const highestPayingData = {
    title: t(tData?.highestPayingTitle, "💎 Highest Paying Video Platforms"),
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
        name: "Earnably",
        logo: "💵",
        payoutRate: "$0.05 - $0.15 per video",
        description: "Premium rates for watching promotional videos",
        payoutMethods: ["PayPal", "Bitcoin", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.6,
        link: "/platform/earnably",
      },
      {
        name: "Gain.gg",
        logo: "🎮",
        payoutRate: "$0.03 - $0.12 per video",
        description: "Watch videos, play games, complete offers",
        payoutMethods: ["PayPal", "Cryptocurrency"],
        minimumPayout: "$5",
        rating: 4.7,
        link: "/platform/gain",
      },
      {
        name: "Hideout.tv",
        logo: "🎬",
        payoutRate: "$0.02 - $0.10 per video",
        description: "Watch curated video content and earn points",
        payoutMethods: ["PayPal", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.5,
        link: "/platform/hideout",
      },
    ];
  }

  const earningMethodsData = {
    title: t(tData?.earningMethodsTitle, "🎯 Ways to Maximize Your Earnings"),
    methods: (tData?.earningMethods || []).map((method) => ({
      ...method,
      title: t(method.title, method.title),
      description: t(method.description, method.description),
    })),
  };

  // Default earning methods if not in translation
  if (earningMethodsData.methods.length === 0) {
    earningMethodsData.methods = [
      {
        title: "Watch Multiple Platforms",
        description: "Run videos on different platforms simultaneously to multiply earnings",
        earningPotential: "$50-100/month",
        timeRequired: "1-2 hours/day",
        difficulty: "Easy",
        icon: "📱",
        link: "/guide/multiple-platforms",
      },
      {
        title: "Complete Daily Goals",
        description: "Meet daily watch requirements for bonus rewards",
        earningPotential: "$20-50 extra/month",
        timeRequired: "30-60 min/day",
        difficulty: "Easy",
        icon: "🎯",
        link: "/guide/daily-goals",
      },
      {
        title: "Refer Friends",
        description: "Earn commission from friends' video watching",
        earningPotential: "$50-200+/month",
        timeRequired: "5 min setup",
        difficulty: "Easy",
        icon: "👥",
        link: "/guide/referrals",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Video Earning Tips"),
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
        title: "Use Auto-Play Features",
        description: "Many platforms offer auto-play for continuous earning while you do other tasks.",
        icon: "▶️",
      },
      {
        title: "Create a Schedule",
        description: "Set aside dedicated time each day for video watching to build a consistent income stream.",
        icon: "⏰",
      },
      {
        title: "Stack with Other Apps",
        description: "Watch videos while using other earning apps to maximize your time.",
        icon: "📚",
      },
      {
        title: "Cash Out Strategically",
        description: "Wait for bonus promotions or cash out to high-value gift cards for extra value.",
        icon: "💡",
      },
    ];
  }

  const earningsCalculatorData = {
    title: t(tData?.earningsCalculator?.title, "Calculate Your Video Earnings"),
    description: t(tData?.earningsCalculator?.description, "See how much you could earn monthly by watching videos"),
    buttonText: t(tData?.earningsCalculator?.buttonText, "Try Calculator"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Compare Video Platforms"),
    description: t(tData?.compare?.description, "Find the best platform for your video watching habits"),
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
        payoutRate: "$0.01-0.05/video",
        timeToEarn: "$1-2/hour",
        minimumPayout: "$5",
        rating: 4.5,
      },
      {
        name: "InboxDollars",
        payoutRate: "$0.01-0.10/video",
        timeToEarn: "$1-3/hour",
        minimumPayout: "$30",
        rating: 4.3,
      },
      {
        name: "Earnably",
        payoutRate: "$0.05-0.15/video",
        timeToEarn: "$2-5/hour",
        minimumPayout: "$5",
        rating: 4.6,
      },
    ];
  }

  const popularContentData = {
    title: t(tData?.popularContentTitle, "🔥 Popular Content Categories"),
    categories: (tData?.popularContent || []).map((category) => ({
      ...category,
      category: t(category.category, category.category),
      earningTip: t(category.earningTip, category.earningTip),
    })),
  };

  // Default popular content if not in translation
  if (popularContentData.categories.length === 0) {
    popularContentData.categories = [
      {
        category: "Entertainment News",
        examples: ["Celebrity gossip", "Movie updates", "TV show highlights"],
        earningTip: "Higher pay for trending topics",
      },
      {
        category: "Product Reviews",
        examples: ["Tech gadgets", "Beauty products", "Household items"],
        earningTip: "Complete offers after watching for bonus",
      },
      {
        category: "How-To Videos",
        examples: ["DIY projects", "Cooking tutorials", "Fitness guides"],
        earningTip: "Watch related content for consistent earning",
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
        name: "David K.",
        amount: "250",
        story: "I watch videos during my lunch break and while commuting. Earned $250 last month without any extra effort!",
        platform: "Swagbucks",
      },
      {
        name: "Maria S.",
        amount: "180",
        story: "Being a stay-at-home mom, watching videos is perfect. I've made $180 this month during nap time.",
        platform: "InboxDollars",
      },
      {
        name: "James W.",
        amount: "320",
        story: "I use auto-play features while working. Made $320 in my best month just from video watching!",
        platform: "Multiple Platforms",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Video Earning Guides"),
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
        title: "Beginner's Guide to Video Earnings",
        description: "Everything you need to know to start earning today",
        readTime: "8 min",
        link: "/guide/video-earning-basics",
      },
      {
        title: "Maximizing Passive Income",
        description: "Set up automated video watching for consistent earnings",
        readTime: "10 min",
        link: "/guide/passive-video-income",
      },
      {
        title: "Avoiding Video Earning Scams",
        description: "How to identify legitimate platforms and avoid wasting time",
        readTime: "6 min",
        link: "/guide/video-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Watch Videos for Money FAQ - ${countryName}`),
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
        q: "Can I really get paid to watch videos?",
        a: "Yes! Legitimate platforms pay users to watch videos as it helps them with advertising metrics and user engagement. You won't get rich, but it's a great way to earn extra cash."
      },
      {
        q: "How much can I earn watching videos?",
        a: "Most users earn $50-200/month watching videos casually. Dedicated users can earn $300-500+ by using multiple platforms and maximizing earning opportunities."
      },
      {
        q: "Do I need to watch every video?",
        a: "Many platforms allow videos to play automatically. You can let them run in the background while doing other tasks, though some require occasional interaction."
      },
      {
        q: "How do I get paid?",
        a: "Most platforms offer PayPal cash, gift cards (Amazon, Walmart, Target), or direct deposit. Minimum payout thresholds typically range from $5-30."
      },
      {
        q: "Is this available in my country?",
        a: "Availability varies by platform. Most major platforms work in the US, UK, Canada, Australia, and select European countries. Check each platform's terms."
      },
      {
        q: "Are these platforms safe to use?",
        a: "Yes, we only recommend established, legitimate platforms with positive user reviews. Always use a dedicated email and never share sensitive information."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Money Watching Videos Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of users who turned their screen time into real cash"),
    buttonText: t(tData?.final?.buttonText, "Start Watching Now"),
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
              href="/video-platforms"
              translationKey="start_watching"
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
                className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
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
                      {category.platformCount}+ platforms
                    </span>
                    <a
                      href={`/video-category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline"
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
                className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
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
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center p-8">
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
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-3">
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {platform.payoutRate}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">per video</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {platform.payoutMethods.slice(0, 2).map((method, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {method}
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

      {/* Highest Paying Platforms Section */}
      {highestPayingData.platforms.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highestPayingData.platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-6">
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
                          {platform.payoutRate}
                        </p>
                        <p className="text-xs text-gray-500">per video</p>
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

      {/* Earning Methods Section */}
      {earningMethodsData.methods.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="methods-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="methods-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {earningMethodsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {earningMethodsData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-5xl mb-3">{method.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {method.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Potential:</span>
                        <span className="font-semibold text-green-600">{method.earningPotential}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span>{method.timeRequired}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Difficulty:</span>
                        <span className={`font-semibold ${
                          method.difficulty === "Easy" ? "text-green-600" : 
                          method.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"
                        }`}>
                          {method.difficulty}
                        </span>
                      </div>
                    </div>
                    <PrimaryCTA
                      href={method.link}
                      translationKey="learn_more"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Popular Content Section */}
      {popularContentData.categories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="content-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="content-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {popularContentData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularContentData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {category.category}
                    </h3>
                    <ul className="space-y-1 mb-3">
                      {category.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          • {example}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        💡 Tip: {category.earningTip}
                      </p>
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
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Platform</th>
                      <th className="px-6 py-3 text-left">Payout Rate</th>
                      <th className="px-6 py-3 text-left">Hourly Rate</th>
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
                        <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">
                          {item.payoutRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.timeToEarn}
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
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md"
                  >
                    <div className="text-4xl mb-3">🎬</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-red-600 dark:text-red-400">
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
                className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {earningsCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/video-earnings-calculator"
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
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-red-600 dark:text-red-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/video-platforms"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
