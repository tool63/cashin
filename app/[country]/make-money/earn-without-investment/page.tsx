// app/[country]/(marketing)/earn-without-investment/page.tsx

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

interface EarningMethod {
  name: string;
  icon: string;
  description: string;
  earnings: string;
  timeToStart: string;
  platforms: string[];
  requirements: string[];
  link: string;
}

interface Platform {
  name: string;
  logo: string;
  type: string;
  signupBonus: string;
  earnings: string;
  description: string;
  payoutMethods: string[];
  link: string;
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface SuccessStory {
  name: string;
  age: number;
  location: string;
  earnings: string;
  story: string;
  method: string;
}

interface ComparisonItem {
  method: string;
  easeOfUse: number;
  earningPotential: number;
  timeRequired: number;
  payoutSpeed: number;
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
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  methodsTitle?: string;
  methods?: EarningMethod[];
  featuredPlatformsTitle?: string;
  featuredPlatforms?: Platform[];
  tipsTitle?: string;
  tips?: Tip[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    items?: ComparisonItem[];
  };
  dailyEarningsTitle?: string;
  dailyEarnings?: Array<{
    activity: string;
    timeSpent: string;
    earnings: string;
    platforms: string;
  }>;
  redFlagsTitle?: string;
  redFlags?: string[];
  newsletterTitle?: string;
  newsletter?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    placeholder?: string;
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
    `earn money without investment ${lowerCountry}`,
    `free earning apps ${lowerCountry}`,
    `no investment jobs ${lowerCountry}`,
    `zero investment earning ${lowerCountry}`,
    `free money making ${lowerCountry}`,
    `earn online free ${lowerCountry}`,
    `no cost side hustle ${lowerCountry}`,
    `free earning websites ${lowerCountry}`,
    `earn money for free ${lowerCountry}`,
    `no investment income ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "free earning apps usa",
      "no investment jobs usa",
      "american free earning"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "free earning apps uk",
      "no investment jobs uk",
      "british free earning"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "free earning apps canada",
      "no investment jobs canada",
      "canadian free earning"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "free earning apps australia",
      "no investment jobs australia",
      "australian free earning"
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
    translation = await loadSectionTranslation(language, "earn-without-investment");
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
    `Earn Money Without Investment in ${countryName} - 100% Free Methods | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover legit ways to earn money without any investment in ${countryName}. Free apps, websites, and methods that pay real money. Start earning today with zero cost.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-without-investment`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-without-investment`,
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

export default async function EarnWithoutInvestmentPage({
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
  const tData = await loadSectionTranslation(language, "earn-without-investment");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Without Investment in ${countryName}`);
  const description = t(rawDescription, `Discover legit ways to earn money without any investment in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-without-investment`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money Without Any Investment"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Start earning real money today with zero investment. Discover legit free methods that actually pay - from cashback apps and surveys to free online work. No credit card required, no hidden fees.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "No Investment Needed - Start Today"),
    stats: (tData?.stats || []).map((stat) => ({
      ...stat,
      value: t(stat.value, stat.value),
      label: t(stat.label, stat.label),
      description: t(stat.description, stat.description),
    })),
  };

  // Default stats if not in translation
  if (statsData.stats.length === 0) {
    statsData.stats = [
      {
        value: "$0",
        label: "Investment",
        description: "Required to start earning",
      },
      {
        value: "50+",
        label: "Free Methods",
        description: "To earn real money",
      },
      {
        value: "10M+",
        label: "Users",
        description: "Earning without investment",
      },
      {
        value: "$100-500",
        label: "Monthly Potential",
        description: "With consistent effort",
      },
    ];
  }

  const methodsData = {
    title: t(tData?.methodsTitle, "Zero-Investment Earning Methods"),
    methods: (tData?.methods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default methods if not in translation
  if (methodsData.methods.length === 0) {
    methodsData.methods = [
      {
        name: "Cashback Shopping",
        icon: "💰",
        description: "Earn money back on purchases you already make. Get paid to shop at thousands of stores.",
        earnings: "$50-500/month",
        timeToStart: "5 minutes",
        platforms: ["Cashog", "Rakuten", "TopCashback"],
        requirements: ["Email address", "Shopping online"],
        link: "/cashback",
      },
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Share your opinion and get paid. Companies want your feedback on products and services.",
        earnings: "$20-200/month",
        timeToStart: "2 minutes",
        platforms: ["Survey Junkie", "Swagbucks", "Branded Surveys"],
        requirements: ["Email address", "Basic internet access"],
        link: "/surveys",
      },
      {
        name: "GPT (Get-Paid-To) Sites",
        icon: "🎯",
        description: "Complete simple tasks like watching videos, playing games, and signing up for offers.",
        earnings: "$30-300/month",
        timeToStart: "2 minutes",
        platforms: ["Swagbucks", "InboxDollars", "PrizeRebel"],
        requirements: ["Email address", "Time to complete tasks"],
        link: "/gpt-sites",
      },
      {
        name: "Micro Tasks",
        icon: "🔍",
        description: "Small tasks like data entry, image tagging, and content moderation that pay per task.",
        earnings: "$50-400/month",
        timeToStart: "5 minutes",
        platforms: ["Amazon MTurk", "Clickworker", "Appen"],
        requirements: ["Attention to detail", "Computer access"],
        link: "/micro-tasks",
      },
      {
        name: "User Testing",
        icon: "🧪",
        description: "Test websites and apps. Record your screen and voice while giving feedback.",
        earnings: "$100-500/month",
        timeToStart: "10 minutes",
        platforms: ["UserTesting", "Userlytics", "TryMyUI"],
        requirements: ["Microphone", "Computer", "Speak clearly"],
        link: "/user-testing",
      },
      {
        name: "Mystery Shopping",
        icon: "🕵️",
        description: "Get paid to shop, dine, and review businesses. Share your experience as a secret shopper.",
        earnings: "$50-300/month",
        timeToStart: "15 minutes",
        platforms: ["BestMark", "Mystery Shopper", "Market Force"],
        requirements: ["Observation skills", "Writing ability"],
        link: "/mystery-shopping",
      },
      {
        name: "Referral Programs",
        icon: "🔗",
        description: "Earn by referring friends to apps and services you already use.",
        earnings: "$50-1,000+/month",
        timeToStart: "5 minutes",
        platforms: ["Cashog", "PayPal", "Bank bonuses"],
        requirements: ["Friends/family", "Social media presence"],
        link: "/referrals",
      },
      {
        name: "Freemium Games",
        icon: "🎮",
        description: "Play mobile games that reward you with real money or gift cards.",
        earnings: "$20-150/month",
        timeToStart: "2 minutes",
        platforms: ["Mistplay", "Lucktastic", "Skillz"],
        requirements: ["Smartphone", "Time to play"],
        link: "/freemium-games",
      },
    ];
  }

  const featuredPlatformsData = {
    title: t(tData?.featuredPlatformsTitle, "Top Free Earning Platforms"),
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
        name: "Cashog",
        logo: "💰",
        type: "Cashback & Rewards",
        signupBonus: "$5",
        earnings: "$50-500/month",
        description: "Earn cashback on everyday purchases at thousands of stores. Stack with coupons and sales.",
        payoutMethods: ["PayPal", "Bank Transfer", "Gift Cards"],
        link: "/signup",
      },
      {
        name: "Swagbucks",
        logo: "🎯",
        type: "GPT & Surveys",
        signupBonus: "$10",
        earnings: "$30-300/month",
        description: "Complete surveys, watch videos, play games, and shop online for points redeemable for cash.",
        payoutMethods: ["PayPal", "Amazon", "Visa", "Gift Cards"],
        link: "/swagbucks",
      },
      {
        name: "Survey Junkie",
        logo: "📋",
        type: "Paid Surveys",
        signupBonus: "$0",
        earnings: "$20-150/month",
        description: "Share your opinion on products and services. Get paid for each survey you complete.",
        payoutMethods: ["PayPal", "Bank Transfer", "Gift Cards"],
        link: "/survey-junkie",
      },
      {
        name: "UserTesting",
        logo: "🧪",
        type: "User Testing",
        signupBonus: "$0",
        earnings: "$100-500/month",
        description: "Test websites and apps. Get paid $10-60 per test for providing feedback.",
        payoutMethods: ["PayPal"],
        link: "/usertesting",
      },
      {
        name: "Amazon MTurk",
        logo: "🔵",
        type: "Micro Tasks",
        signupBonus: "$0",
        earnings: "$50-400/month",
        description: "Complete small tasks like data entry, surveys, and content moderation for payment.",
        payoutMethods: ["Amazon Gift Card", "Bank Transfer"],
        link: "/mturk",
      },
      {
        name: "Mistplay",
        logo: "🎮",
        type: "Freemium Games",
        signupBonus: "$0",
        earnings: "$20-150/month",
        description: "Play mobile games and earn points redeemable for gift cards. Available on Android.",
        payoutMethods: ["Amazon", "Visa", "PayPal", "Xbox"],
        link: "/mistplay",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips to Maximize Your Free Earnings"),
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
        title: "Use Multiple Platforms",
        description: "Don't rely on just one method. Use 3-5 different platforms to maximize your earnings.",
        icon: "📚",
      },
      {
        title: "Be Consistent",
        description: "Set aside dedicated time each day for your earning activities. Consistency pays off.",
        icon: "⏰",
      },
      {
        title: "Check Daily",
        description: "Many apps offer daily bonuses or streaks. Log in daily to maximize rewards.",
        icon: "📅",
      },
      {
        title: "Refer Friends",
        description: "Referral programs can significantly boost your earnings with minimal effort.",
        icon: "👥",
      },
      {
        title: "Cash Out Early",
        description: "Don't wait too long to cash out. Platforms can change terms or shut down unexpectedly.",
        icon: "💰",
      },
      {
        title: "Avoid Scams",
        description: "Never pay to join. Legitimate opportunities never require upfront investment.",
        icon: "🛡️",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Real Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      location: t(story.location, story.location),
      story: t(story.story, story.story),
      method: t(story.method, story.method),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah",
        age: 29,
        location: "Texas",
        earnings: "$450/month",
        story: "I earn extra income through cashback and surveys while working my full-time job. It pays for my groceries every month!",
        method: "Cashback + Surveys",
      },
      {
        name: "Mike",
        age: 34,
        location: "Florida",
        earnings: "$600/month",
        story: "User testing and micro tasks have become my favorite side hustle. I do it during lunch breaks and evenings.",
        method: "User Testing",
      },
      {
        name: "Jessica",
        age: 25,
        location: "California",
        earnings: "$300/month",
        story: "Playing mobile games on Mistplay and doing surveys helps me afford my streaming subscriptions and coffee.",
        method: "Games + Surveys",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "Compare Earning Methods"),
    description: t(tData?.comparison?.description, "Find the right method for your schedule and goals"),
  };

  const dailyEarningsData = {
    title: t(tData?.dailyEarningsTitle, "Example Daily Earnings Breakdown"),
    activities: (tData?.dailyEarnings || []).map((activity) => ({
      ...activity,
      activity: t(activity.activity, activity.activity),
      platforms: t(activity.platforms, activity.platforms),
    })),
  };

  const redFlagsData = {
    title: t(tData?.redFlagsTitle, "Red Flags to Avoid"),
    flags: (tData?.redFlags || []).map((flag) => t(flag, flag)),
  };

  // Default red flags if not in translation
  if (redFlagsData.flags.length === 0) {
    redFlagsData.flags = [
      "Any platform asking for upfront payment",
      "Get-rich-quick promises",
      "Pyramid schemes or MLMs requiring payment",
      "Requests for your bank password",
      "Unrealistic earning claims ($1000/day with no effort)",
      "Pressure to recruit others before earning",
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Free Earning Tips"),
    subtitle: t(tData?.newsletter?.subtitle, "Subscribe for weekly updates on new zero-investment opportunities"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Earn Without Investment FAQ - ${countryName}`),
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
        q: "Can I really earn money without any investment?",
        a: "Yes! Many legitimate platforms pay you for your time, opinions, and data. Cashback apps, surveys, and micro tasks require zero investment.",
      },
      {
        q: "How much can I earn without investing?",
        a: "Most people earn $100-500/month with consistent effort. Some power users earn $1,000+ by using multiple platforms actively.",
      },
      {
        q: "Are these methods legit or scams?",
        a: "All methods we recommend are legitimate. However, always be cautious of any platform asking for upfront payment - real opportunities never require investment.",
      },
      {
        q: "How do I get paid?",
        a: "Most platforms pay via PayPal, bank transfer, or gift cards (Amazon, Walmart, Target, etc.). Minimum payout thresholds vary by platform.",
      },
      {
        q: "Do I need special skills?",
        a: "Not for most methods. Surveys, cashback, and micro tasks require no special skills. Some methods like user testing require clear communication.",
      },
      {
        q: "Can I do this from any country?",
        a: "Most platforms work in the US, UK, Canada, and Australia. Some have international options. Check each platform's availability.",
      },
      {
        q: "How quickly can I start earning?",
        a: "Most platforms let you start earning within minutes of signing up. Payouts typically take days to weeks depending on the platform.",
      },
      {
        q: "Do I need to pay taxes on these earnings?",
        a: "Yes, these earnings are taxable income. Keep records of your earnings. In the US, platforms issue 1099 forms if you earn over $600.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Without Investment Today"),
    subtitle: t(tData?.final?.subtitle, "Join millions of people already making money with zero investment"),
    buttonText: t(tData?.final?.buttonText, "Get Started Free"),
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
              translationKey="start_earning_free"
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
            <div className="text-center mb-16">
              <h2
                id="stats-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {statsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Methods Section */}
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
                {methodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodsData.methods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Earnings:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {method.earnings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Start in:</span>
                      <span className="text-gray-700 dark:text-gray-300">{method.timeToStart}</span>
                    </div>
                  </div>
                </a>
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
            aria-labelledby="platforms-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="platforms-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {featuredPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlatformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{platform.logo}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {platform.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.type}
                        </p>
                      </div>
                    </div>
                    {platform.signupBonus !== "$0" && (
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold">
                        Bonus: {platform.signupBonus}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {platform.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Potential:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {platform.earnings}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payout: {platform.payoutMethods.slice(0, 3).join(", ")}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={platform.link}
                    translationKey="sign_up_free"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">👤</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {story.name}, {story.age}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {story.location}
                      </p>
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg mt-2">
                        {story.earnings}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        via {story.method}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center">
                      "{story.story}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Red Flags Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="redflags-heading"
          >
            <div className="text-center mb-12">
              <h2
                id="redflags-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {redFlagsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 border border-red-200 dark:border-red-800">
              <ul className="space-y-3">
                {redFlagsData.flags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <span className="text-gray-700 dark:text-gray-300">{flag}</span>
                  </li>
                ))}
              </ul>
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
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-12">
              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
              >
                {newsletterData.title}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {newsletterData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder={newsletterData.placeholder}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
            </div>
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
