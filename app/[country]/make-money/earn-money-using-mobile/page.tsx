// app/[country]/(marketing)/earn-money-using-mobile/page.tsx

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

interface MobileApp {
  name: string;
  icon: string;
  description: string;
  platforms: string[];
  earningMethods: string[];
  earningPotential: string;
  payoutMethods: string[];
  minimumPayout: string;
  rating: number;
  steps: string[];
  tips: string[];
  link: string;
  isFeatured?: boolean;
  isBeginnerFriendly?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  appCount: number;
}

interface QuickEarning {
  title: string;
  description: string;
  reward: string;
  timeRequired: string;
  app: string;
  link: string;
  isLimited?: boolean;
}

interface ComparisonItem {
  app: string;
  earningPotential: string;
  timeToEarn: string;
  payoutSpeed: string;
  easeOfUse: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  app: string;
  story: string;
  timeSpent: string;
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
  topAppsTitle?: string;
  topApps?: MobileApp[];
  beginnerAppsTitle?: string;
  beginnerApps?: MobileApp[];
  quickEarningsTitle?: string;
  quickEarnings?: QuickEarning[];
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
  earningsTracker?: {
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
    `earn money using mobile ${lowerCountry}`,
    `make money on phone ${lowerCountry}`,
    `mobile earning apps ${lowerCountry}`,
    `get paid using smartphone ${lowerCountry}`,
    `phone money making apps ${lowerCountry}`,
    `earn cash on mobile ${lowerCountry}`,
    `best earning apps ${lowerCountry}`,
    `mobile money making ${lowerCountry}`,
    `apps that pay real money ${lowerCountry}`,
    `smartphone earning methods ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "earning apps usa",
      "make money on phone usa",
      "mobile money apps usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "earning apps uk",
      "make money on phone uk",
      "mobile money apps uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "earning apps canada",
      "make money on phone canada",
      "mobile money apps canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "earning apps australia",
      "make money on phone australia",
      "mobile money apps australia"
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
    translation = await loadSectionTranslation(language, "earn-money-using-mobile");
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
    `Earn Money Using Mobile - Best Phone Earning Apps in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Make money from your smartphone in ${countryName}. Discover the best mobile apps that pay real cash, gift cards, and rewards. Start earning on your phone today - anywhere, anytime.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-using-mobile`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-using-mobile`,
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

export default async function EarnMoneyUsingMobilePage({
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
  const tData = await loadSectionTranslation(language, "earn-money-using-mobile");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Using Mobile - Best Phone Earning Apps`);
  const description = t(rawDescription, `Make money from your smartphone in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-using-mobile`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money Using Your Mobile Phone"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Turn your smartphone into a money-making machine! Discover the best mobile apps that pay real cash in ${countryName}. From surveys and tasks to cashback and games - start earning anywhere, anytime.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Mobile Earning Categories"),
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
        name: "Survey Apps",
        icon: "📋",
        description: "Get paid for your opinions",
        appCount: 25,
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn on everyday purchases",
        appCount: 18,
      },
      {
        name: "Game Apps",
        icon: "🎮",
        description: "Play games and earn rewards",
        appCount: 22,
      },
      {
        name: "Task Apps",
        icon: "✅",
        description: "Complete small tasks for cash",
        appCount: 15,
      },
      {
        name: "Scanning Apps",
        icon: "📸",
        description: "Scan receipts and products",
        appCount: 12,
      },
      {
        name: "Investment Apps",
        icon: "📈",
        description: "Grow money with micro-investing",
        appCount: 10,
      },
    ];
  }

  const topAppsData = {
    title: t(tData?.topAppsTitle, "🔥 Best Mobile Apps That Pay Real Money"),
    apps: (tData?.topApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default top apps if not in translation
  if (topAppsData.apps.length === 0) {
    topAppsData.apps = [
      {
        name: "Swagbucks",
        icon: "💰",
        description: "Earn points (SB) for surveys, shopping, watching videos, and more",
        platforms: ["iOS", "Android"],
        earningMethods: ["Surveys", "Shopping", "Videos", "Games", "Search"],
        earningPotential: "$50-200/month",
        payoutMethods: ["PayPal", "Amazon", "Visa", "Walmart"],
        minimumPayout: "$5",
        rating: 4.5,
        steps: [
          "Download Swagbucks app",
          "Create free account",
          "Complete your profile",
          "Choose earning activities",
          "Redeem points for cash or gift cards"
        ],
        tips: [
          "Complete daily goals for bonuses",
          "Use the shopping portal for cashback",
          "Watch videos while doing other tasks",
          "Complete your profile fully for more surveys"
        ],
        link: "/mobile-app/swagbucks",
        isFeatured: true,
        isBeginnerFriendly: true,
      },
      {
        name: "Mistplay",
        icon: "🎮",
        description: "Get paid to play mobile games",
        platforms: ["Android"],
        earningMethods: ["Playing Games", "Leveling Up", "Daily Bonuses"],
        earningPotential: "$30-100/month",
        payoutMethods: ["Amazon", "Visa", "PayPal", "Google Play"],
        minimumPayout: "$5",
        rating: 4.3,
        steps: [
          "Download Mistplay app",
          "Create account",
          "Browse available games",
          "Play games and earn units",
          "Redeem for gift cards"
        ],
        tips: [
          "Try new games for bonus points",
          "Play daily for streak bonuses",
          "Focus on games you enjoy",
          "Check for limited-time events"
        ],
        link: "/mobile-app/mistplay",
        isFeatured: true,
        isBeginnerFriendly: true,
      },
      {
        name: "Fetch Rewards",
        icon: "📸",
        description: "Earn points by scanning grocery receipts",
        platforms: ["iOS", "Android"],
        earningMethods: ["Receipt Scanning", "Special Offers", "Referrals"],
        earningPotential: "$20-50/month",
        payoutMethods: ["Amazon", "Walmart", "Target", "Visa"],
        minimumPayout: "$3",
        rating: 4.7,
        steps: [
          "Download Fetch Rewards",
          "Create free account",
          "Scan any grocery receipt",
          "Earn points on eligible items",
          "Redeem for gift cards"
        ],
        tips: [
          "Scan all receipts, even small purchases",
          "Refer friends for bonus points",
          "Look for special bonus offers",
          "Connect email for online purchase points"
        ],
        link: "/mobile-app/fetch-rewards",
        isFeatured: true,
        isBeginnerFriendly: true,
      },
      {
        name: "Ibotta",
        icon: "💰",
        description: "Get cashback on groceries and online shopping",
        platforms: ["iOS", "Android"],
        earningMethods: ["Cashback Offers", "Receipt Scanning", "Pay with Ibotta"],
        earningPotential: "$30-150/month",
        payoutMethods: ["PayPal", "Venmo", "Gift Cards"],
        minimumPayout: "$20",
        rating: 4.6,
        steps: [
          "Download Ibotta app",
          "Create account",
          "Browse available offers",
          "Shop and upload receipt",
          "Earn cashback"
        ],
        tips: [
          "Activate offers before shopping",
          "Stack with store coupons",
          "Use PayPal for fastest payout",
          "Complete bonus challenges"
        ],
        link: "/mobile-app/ibotta",
        isFeatured: false,
        isBeginnerFriendly: true,
      },
    ];
  }

  const beginnerAppsData = {
    title: t(tData?.beginnerAppsTitle, "🌱 Best Apps for Beginners"),
    apps: (tData?.beginnerApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default beginner apps if not in translation
  if (beginnerAppsData.apps.length === 0) {
    beginnerAppsData.apps = [
      {
        name: "Survey Junkie",
        icon: "📋",
        description: "Simple surveys that pay cash",
        platforms: ["iOS", "Android", "Web"],
        earningMethods: ["Paid Surveys", "Profile Questions"],
        earningPotential: "$30-80/month",
        payoutMethods: ["PayPal", "Gift Cards"],
        minimumPayout: "$5",
        rating: 4.4,
        steps: [
          "Download Survey Junkie",
          "Complete profile",
          "Take available surveys",
          "Earn points",
          "Redeem for cash"
        ],
        tips: [
          "Complete profile fully for more surveys",
          "Check daily for new opportunities",
          "Be honest with answers"
        ],
        link: "/mobile-app/survey-junkie",
        isBeginnerFriendly: true,
      },
      {
        name: "InboxDollars",
        icon: "📧",
        description: "Get paid for surveys, emails, and offers",
        platforms: ["iOS", "Android"],
        earningMethods: ["Surveys", "Emails", "Videos", "Offers"],
        earningPotential: "$40-120/month",
        payoutMethods: ["Check", "PayPal", "Gift Cards"],
        minimumPayout: "$30",
        rating: 4.2,
        steps: [
          "Download InboxDollars",
          "Sign up free",
          "Complete paid emails",
          "Take surveys",
          "Cash out"
        ],
        tips: [
          "Check daily for paid emails",
          "Complete your profile",
          "Watch videos for extra points"
        ],
        link: "/mobile-app/inboxdollars",
        isBeginnerFriendly: true,
      },
    ];
  }

  const quickEarningsData = {
    title: t(tData?.quickEarningsTitle, "⚡ Quick Earnings - Start Today"),
    earnings: (tData?.quickEarnings || []).map((earning) => ({
      ...earning,
      title: t(earning.title, earning.title),
      description: t(earning.description, earning.description),
      app: t(earning.app, earning.app),
    })),
  };

  // Default quick earnings if not in translation
  if (quickEarningsData.earnings.length === 0) {
    quickEarningsData.earnings = [
      {
        title: "$10 Welcome Bonus",
        description: "Sign up and earn $10 bonus",
        reward: "$10",
        timeRequired: "5 minutes",
        app: "Swagbucks",
        link: "/quick/signup-bonus",
        isLimited: true,
      },
      {
        title: "First Receipt Scan",
        description: "Scan any receipt for instant points",
        reward: "$2",
        timeRequired: "2 minutes",
        app: "Fetch Rewards",
        link: "/quick/receipt-scan",
        isLimited: true,
      },
      {
        title: "Play Any Game",
        description: "Download and play any featured game",
        reward: "$5",
        timeRequired: "10 minutes",
        app: "Mistplay",
        link: "/quick/play-game",
        isLimited: false,
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Top Earning Apps"),
    description: t(tData?.comparison?.description, "Find the best app for your mobile earning goals"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      app: t(item.app, item.app),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        app: "Swagbucks",
        earningPotential: "$50-200/month",
        timeToEarn: "1-2 hours/day",
        payoutSpeed: "1-3 days",
        easeOfUse: "Very Easy",
      },
      {
        app: "Mistplay",
        earningPotential: "$30-100/month",
        timeToEarn: "1-2 hours/day",
        payoutSpeed: "1-2 days",
        easeOfUse: "Very Easy",
      },
      {
        app: "Fetch Rewards",
        earningPotential: "$20-50/month",
        timeToEarn: "5 min/day",
        payoutSpeed: "1-7 days",
        easeOfUse: "Extremely Easy",
      },
      {
        app: "Ibotta",
        earningPotential: "$30-150/month",
        timeToEarn: "10 min/day",
        payoutSpeed: "1-3 days",
        easeOfUse: "Easy",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      story: t(story.story, story.story),
      app: t(story.app, story.app),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Amanda S.",
        earnings: "$200",
        app: "Swagbucks",
        story: "I earn $200/month just using Swagbucks during my commute and lunch breaks. So easy!",
        timeSpent: "1-2 hours/day",
      },
      {
        name: "Brian L.",
        earnings: "$100",
        app: "Mistplay",
        story: "I play games in the evening anyway. Now I earn $100/month for doing what I love!",
        timeSpent: "1 hour/day",
      },
      {
        name: "Crystal M.",
        earnings: "$50",
        app: "Fetch Rewards",
        story: "Scanning grocery receipts takes 2 minutes. Earned $50 last month without changing my habits.",
        timeSpent: "5 min/day",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 Mobile Earning Tips"),
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
        title: "Use Multiple Apps",
        description: "Don't rely on just one app. Use several to maximize your earnings.",
        icon: "📱",
      },
      {
        title: "Enable Notifications",
        description: "Turn on push alerts to catch limited-time offers and bonuses.",
        icon: "🔔",
      },
      {
        title: "Refer Friends",
        description: "Most apps offer generous referral bonuses. Share your code!",
        icon: "👥",
      },
      {
        title: "Be Consistent",
        description: "Small daily earnings add up. Set aside time each day.",
        icon: "📅",
      },
    ];
  }

  const earningsTrackerData = {
    title: t(tData?.earningsTracker?.title, "Track Your Mobile Earnings"),
    description: t(tData?.earningsTracker?.description, "Monitor how much you're earning across all your mobile apps"),
    buttonText: t(tData?.earningsTracker?.buttonText, "Start Tracking"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Mobile Earning Resources"),
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
        title: "How to Earn $100 on Your Phone",
        description: "Step-by-step guide to mobile earning",
        readTime: "8 min",
        link: "/resource/mobile-earn-100",
      },
      {
        title: "Best Apps for Passive Income",
        description: "Apps that earn while you sleep",
        readTime: "6 min",
        link: "/resource/passive-mobile-apps",
      },
      {
        title: "Mobile Earning Safety Tips",
        description: "Protect your data while earning",
        readTime: "5 min",
        link: "/resource/mobile-safety",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money Using Mobile FAQ - ${countryName}`),
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
        q: "Can I really earn money from my phone?",
        a: "Absolutely! There are dozens of legitimate apps that pay real cash, gift cards, and rewards for simple activities like taking surveys, playing games, scanning receipts, and shopping."
      },
      {
        q: "How much can I earn on my phone?",
        a: "Casual users earn $50-150/month. Dedicated users can earn $200-500+ monthly using multiple apps. Some power users earn over $1,000/month."
      },
      {
        q: "Do I need to pay to use these apps?",
        a: "No! All legitimate earning apps are free to download and use. Never pay to start earning money."
      },
      {
        q: "How do I get paid?",
        a: "Most apps pay via PayPal, Venmo, direct deposit, or gift cards (Amazon, Walmart, Target, Visa). Minimum payout thresholds range from $3-20."
      },
      {
        q: "Are these apps safe to use?",
        a: "Yes, we only recommend established apps with good reputations and positive user reviews. Always check app permissions before installing."
      },
      {
        q: "Can I use these apps on both iPhone and Android?",
        a: "Most apps work on both platforms, but some are Android-only or iOS-only. Check individual app requirements before downloading."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Money on Your Phone Today"),
    subtitle: t(tData?.final?.subtitle, "Download these apps and turn your smartphone into a money-making machine"),
    buttonText: t(tData?.final?.buttonText, "Download Apps Now"),
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
              href="/mobile-apps"
              translationKey="explore_apps"
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.appCount}+ apps
                    </span>
                    <a
                      href={`/mobile/${category.name.toLowerCase().replace(/ /g, '-')}`}
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

      {/* Top Apps Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="topapps-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="topapps-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topAppsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topAppsData.apps.map((app, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{app.icon}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        {app.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.platforms.map((platform, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-lg font-bold text-green-600">{app.earningPotential}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.payoutMethods.slice(0, 3).map((method, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {method}
                        </span>
                      ))}
                      <span className="text-xs text-gray-500">Min: {app.minimumPayout}</span>
                    </div>
                    <PrimaryCTA
                      href={app.link}
                      translationKey="download_app"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Beginner Apps Section */}
      {beginnerAppsData.apps.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="beginner-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="beginner-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {beginnerAppsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beginnerAppsData.apps.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{app.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {app.description}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">{app.platforms.join(", ")}</span>
                          <span className="text-sm font-bold text-green-600">{app.earningPotential}</span>
                        </div>
                        <PrimaryCTA
                          href={app.link}
                          translationKey="get_started"
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

      {/* Quick Earnings Section */}
      {quickEarningsData.earnings.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="quick-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="quick-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {quickEarningsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickEarningsData.earnings.map((earning, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800 relative"
                  >
                    {earning.isLimited && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                        Limited
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-5xl mb-3">
                        {index === 0 ? "🎁" : index === 1 ? "📸" : "🎮"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {earning.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {earning.description}
                      </p>
                      <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2 mb-2">
                        <p className="text-2xl font-bold text-green-600">{earning.reward}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        ⏱️ {earning.timeRequired}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        App: {earning.app}
                      </p>
                      <PrimaryCTA
                        href={earning.link}
                        translationKey="claim_now"
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
                      <th className="px-6 py-3 text-left">App</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
                      <th className="px-6 py-3 text-left">Time Investment</th>
                      <th className="px-6 py-3 text-left">Payout Speed</th>
                      <th className="px-6 py-3 text-left">Ease of Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.app}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">
                          {item.earningPotential}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.timeToEarn}</td>
                        <td className="px-6 py-4 text-gray-600">{item.payoutSpeed}</td>
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
                    <div className="text-4xl mb-3">📱</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Earned ${story.earnings} • {story.app}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {story.timeSpent}
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

      {/* Earnings Tracker Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="tracker-heading"
          >
            <h2
              id="tracker-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {earningsTrackerData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {earningsTrackerData.description}
            </p>
            <PrimaryCTA
              href="/earnings-tracker"
              translationKey={earningsTrackerData.buttonText}
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
              href="/mobile-apps"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
