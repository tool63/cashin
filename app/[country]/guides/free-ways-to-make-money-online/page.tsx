// app/[country]/(marketing)/free-ways-to-make-money-online/page.tsx

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

interface FreeMethod {
  name: string;
  icon: string;
  description: string;
  earningPotential: string;
  timeToStart: string;
  difficulty: "Easy" | "Very Easy";
  zeroInvestment: boolean;
  platforms: string[];
  steps: string[];
  tips: string[];
  link: string;
  isPopular?: boolean;
  payoutSpeed: string;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  methodCount: number;
  startupCost: "$0";
}

interface ComparisonItem {
  method: string;
  earningPotential: string;
  timeToStart: string;
  payoutSpeed: string;
  difficulty: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  method: string;
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
  freeMethodsTitle?: string;
  freeMethods?: FreeMethod[];
  quickStartTitle?: string;
  quickStart?: FreeMethod[];
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
    `free ways to make money online ${lowerCountry}`,
    `make money online free ${lowerCountry}`,
    `no cost online jobs ${lowerCountry}`,
    `free earning methods ${lowerCountry}`,
    `zero investment online income ${lowerCountry}`,
    `free side hustles ${lowerCountry}`,
    `earn money without spending ${lowerCountry}`,
    `free online jobs ${lowerCountry}`,
    `no investment required ${lowerCountry}`,
    `free money making opportunities ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "free online jobs usa",
      "no cost side hustles usa",
      "zero investment usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "free online jobs uk",
      "no cost side hustles uk",
      "zero investment uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "free online jobs canada",
      "no cost side hustles canada",
      "zero investment canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "free online jobs australia",
      "no cost side hustles australia",
      "zero investment australia"
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
    translation = await loadSectionTranslation(language, "free-ways-to-make-money-online");
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
    `Free Ways to Make Money Online - Zero Investment Methods in {country} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover free ways to make money online in ${countryName} with zero investment. No startup costs, no hidden fees - just legitimate methods that cost nothing to start. Begin earning today for free!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/free-ways-to-make-money-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/free-ways-to-make-money-online`,
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

export default async function FreeWaysToMakeMoneyOnlinePage({
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
  const tData = await loadSectionTranslation(language, "free-ways-to-make-money-online");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Free Ways to Make Money Online - Zero Investment Methods`);
  const description = t(rawDescription, `Discover free ways to make money online in ${countryName} with zero investment.`);

  const structuredData = generateJsonLd({
    path: `/${country}/free-ways-to-make-money-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Free Ways to Make Money Online"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Start earning with absolutely zero investment! Discover legitimate ways to make money online in ${countryName} that cost nothing to join. No hidden fees, no credit card required - just real earning opportunities.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Zero-Cost Earning Categories"),
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
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for your opinions",
        methodCount: 25,
        startupCost: "$0",
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Small tasks, quick cash",
        methodCount: 30,
        startupCost: "$0",
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn on everyday purchases",
        methodCount: 18,
        startupCost: "$0",
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites for money",
        methodCount: 12,
        startupCost: "$0",
      },
      {
        name: "Sign-up Bonuses",
        icon: "🎁",
        description: "Get paid to register",
        methodCount: 22,
        startupCost: "$0",
      },
      {
        name: "Content Creation",
        icon: "📹",
        description: "Monetize free platforms",
        methodCount: 15,
        startupCost: "$0",
      },
    ];
  }

  const freeMethodsData = {
    title: t(tData?.freeMethodsTitle, "💰 Best Free Ways to Earn Money Online"),
    methods: (tData?.freeMethods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default free methods if not in translation
  if (freeMethodsData.methods.length === 0) {
    freeMethodsData.methods = [
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for sharing your opinions on products and brands",
        earningPotential: "$5-20/hour",
        timeToStart: "5 minutes",
        difficulty: "Very Easy",
        zeroInvestment: true,
        platforms: ["Swagbucks", "Survey Junkie", "InboxDollars", "Branded Surveys"],
        steps: [
          "Sign up for free on survey sites",
          "Complete your profile (5-10 minutes)",
          "Check daily for available surveys",
          "Answer questions honestly",
          "Cash out via PayPal or gift cards"
        ],
        tips: [
          "Complete profile fully for more surveys",
          "Check multiple sites daily",
          "Be consistent with answers",
          "Sign up for email alerts"
        ],
        link: "/free-methods/online-surveys",
        isPopular: true,
        payoutSpeed: "1-3 days",
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Complete simple online tasks like data entry and categorization",
        earningPotential: "$5-15/hour",
        timeToStart: "10 minutes",
        difficulty: "Very Easy",
        zeroInvestment: true,
        platforms: ["Amazon MTurk", "Clickworker", "Appen", "Microworkers"],
        steps: [
          "Create free account",
          "Complete basic assessments",
          "Browse available tasks",
          "Complete tasks accurately",
          "Withdraw earnings"
        ],
        tips: [
          "Focus on higher-paying tasks",
          "Build reputation for better tasks",
          "Work during peak hours",
          "Use browser extensions"
        ],
        link: "/free-methods/micro-tasks",
        isPopular: true,
        payoutSpeed: "1-7 days",
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn money back on purchases you're already making",
        earningPotential: "$20-100/month",
        timeToStart: "5 minutes",
        difficulty: "Very Easy",
        zeroInvestment: true,
        platforms: ["Rakuten", "Ibotta", "Fetch Rewards", "Dosh"],
        steps: [
          "Download free cashback apps",
          "Create account",
          "Link cards or scan receipts",
          "Shop as normal",
          "Earn automatic cashback"
        ],
        tips: [
          "Use multiple apps together",
          "Check apps before shopping",
          "Refer friends for bonuses",
          "Scan all receipts"
        ],
        link: "/free-methods/cashback-apps",
        isPopular: true,
        payoutSpeed: "1-30 days",
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps, provide feedback",
        earningPotential: "$10-60/test",
        timeToStart: "30 minutes",
        difficulty: "Easy",
        zeroInvestment: true,
        platforms: ["UserTesting", "Userlytics", "TryMyUI"],
        steps: [
          "Sign up for free",
          "Complete sample test",
          "Apply for available tests",
          "Record screen and voice",
          "Get paid within 7 days"
        ],
        tips: [
          "Speak thoughts continuously",
          "Complete profile thoroughly",
          "Apply quickly to tests",
          "Be honest in feedback"
        ],
        link: "/free-methods/user-testing",
        isPopular: false,
        payoutSpeed: "7 days",
      },
    ];
  }

  const quickStartData = {
    title: t(tData?.quickStartTitle, "⚡ Quick Start - No Cost, No Waiting"),
    methods: (tData?.quickStart || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default quick start methods if not in translation
  if (quickStartData.methods.length === 0) {
    quickStartData.methods = [
      {
        name: "Sign-up Bonuses",
        icon: "🎁",
        description: "Get paid just for creating free accounts",
        earningPotential: "$5-25",
        timeToStart: "2 minutes",
        difficulty: "Very Easy",
        zeroInvestment: true,
        platforms: ["Various platforms"],
        steps: [
          "Find sites offering sign-up bonuses",
          "Create free account",
          "Complete simple verification",
          "Receive bonus"
        ],
        tips: [
          "Use dedicated email",
          "Read terms carefully",
          "Complete all verification steps"
        ],
        link: "/free-methods/signup-bonuses",
        isPopular: true,
        payoutSpeed: "Instant-7 days",
      },
      {
        name: "Receipt Scanning",
        icon: "📸",
        description: "Scan any receipt for instant points",
        earningPotential: "$2-20/month",
        timeToStart: "2 minutes",
        difficulty: "Very Easy",
        zeroInvestment: true,
        platforms: ["Fetch Rewards", "Receipt Hog", "CoinOut"],
        steps: [
          "Download receipt scanning app",
          "Create free account",
          "Scan any receipt",
          "Earn points instantly",
          "Redeem for gift cards"
        ],
        tips: [
          "Scan every receipt",
          "Refer friends for bonus",
          "Link email for online receipts"
        ],
        link: "/free-methods/receipt-scanning",
        isPopular: true,
        payoutSpeed: "Instant",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Free Earning Methods"),
    description: t(tData?.comparison?.description, "Find the best zero-investment method for your lifestyle"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      method: t(item.method, item.method),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        method: "Online Surveys",
        earningPotential: "$5-20/hour",
        timeToStart: "5 min",
        payoutSpeed: "1-3 days",
        difficulty: "Very Easy",
      },
      {
        method: "Micro Tasks",
        earningPotential: "$5-15/hour",
        timeToStart: "10 min",
        payoutSpeed: "1-7 days",
        difficulty: "Very Easy",
      },
      {
        method: "Cashback Apps",
        earningPotential: "$20-100/month",
        timeToStart: "5 min",
        payoutSpeed: "1-30 days",
        difficulty: "Very Easy",
      },
      {
        method: "User Testing",
        earningPotential: "$10-60/test",
        timeToStart: "30 min",
        payoutSpeed: "7 days",
        difficulty: "Easy",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Success Stories (Zero Investment)"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      story: t(story.story, story.story),
      method: t(story.method, story.method),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Amanda T.",
        earnings: "$320",
        method: "Online Surveys",
        story: "Started taking surveys during my lunch break. Never spent a penny - earned $320 in 3 months!",
        timeSpent: "30 min/day",
      },
      {
        name: "Kevin R.",
        earnings: "$180",
        method: "Cashback Apps",
        story: "Just using cashback apps on normal shopping. Made $180 back with zero investment.",
        timeSpent: "5 min/day",
      },
      {
        name: "Sarah L.",
        earnings: "$450",
        method: "Micro Tasks",
        story: "Complete small tasks while watching TV. Earned $450 without spending anything.",
        timeSpent: "1 hour/day",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 Tips for Free Online Earning"),
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
        title: "Never Pay to Start",
        description: "Legitimate free methods never ask for upfront payment. Avoid any site that charges fees.",
        icon: "🚫",
      },
      {
        title: "Use Multiple Platforms",
        description: "Sign up for several sites to maximize opportunities and earnings.",
        icon: "📱",
      },
      {
        title: "Create a Schedule",
        description: "Set aside specific times each day for earning activities.",
        icon: "⏰",
      },
      {
        title: "Be Patient",
        description: "Free methods won't make you rich overnight, but consistent effort adds up.",
        icon: "⏳",
      },
    ];
  }

  const earningsTrackerData = {
    title: t(tData?.earningsTracker?.title, "Track Your Free Earnings"),
    description: t(tData?.earningsTracker?.description, "Monitor how much you're earning with zero investment methods"),
    buttonText: t(tData?.earningsTracker?.buttonText, "Start Tracking"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Free Earning Resources"),
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
        title: "How to Make $100 Free",
        description: "Step-by-step guide using only free platforms",
        readTime: "8 min",
        link: "/resource/make-100-free",
      },
      {
        title: "Best Free Survey Sites",
        description: "Comparison of highest-paying survey platforms",
        readTime: "7 min",
        link: "/resource/free-survey-sites",
      },
      {
        title: "Avoiding Free Trial Scams",
        description: "How to spot fake 'free' opportunities",
        readTime: "6 min",
        link: "/resource/free-trial-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Free Ways to Make Money Online FAQ - ${countryName}`),
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
        q: "Can I really make money online for free?",
        a: "Absolutely! Many legitimate platforms pay real money for simple tasks like surveys, micro tasks, and cashback - all with zero investment required."
      },
      {
        q: "How much can I earn with free methods?",
        a: "Beginners earn $50-200/month part-time. Dedicated users can earn $300-500+ monthly using multiple free platforms consistently."
      },
      {
        q: "Do I need a credit card to start?",
        a: "No! Legitimate free methods never require a credit card. If a site asks for payment info, it's likely a scam."
      },
      {
        q: "What's the easiest free method for beginners?",
        a: "Start with online surveys and cashback apps. Both require no skills, no investment, and can be done in spare time."
      },
      {
        q: "How do I get paid?",
        a: "Most platforms pay via PayPal, gift cards (Amazon, Walmart, Target), or direct deposit. Minimum payouts range from $3-20."
      },
      {
        q: "Are these methods available worldwide?",
        a: "Availability varies. Most major platforms work in the US, UK, Canada, Australia, and select European countries. Check each site's terms."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Online for Free Today"),
    subtitle: t(tData?.final?.subtitle, "No credit card. No investment. Just real ways to make money online from ${countryName}"),
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
              href="/free-methods"
              translationKey="explore_free_methods"
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
                      {category.methodCount}+ ways
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {category.startupCost} to start
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Free Methods Section */}
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
                {freeMethodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{method.icon}</div>
                      <h3 className="font-bold text-white text-xl">{method.name}</h3>
                    </div>
                    {method.isPopular && (
                      <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Earning Potential</p>
                        <p className="text-sm font-bold text-green-600">{method.earningPotential}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Time to Start</p>
                        <p className="text-sm font-semibold">{method.timeToStart}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-xs text-green-600 font-semibold">✓ Zero Investment Required</p>
                      <p className="text-xs text-gray-500">Payout: {method.payoutSpeed}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        {method.difficulty}
                      </span>
                    </div>
                    <PrimaryCTA
                      href={method.link}
                      translationKey="start_free"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Quick Start Section */}
      {quickStartData.methods.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="quickstart-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="quickstart-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {quickStartData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickStartData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {method.description}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-gray-500">Start in {method.timeToStart}</span>
                          <span className="text-sm font-bold text-green-600">{method.earningPotential}</span>
                        </div>
                        <PrimaryCTA
                          href={method.link}
                          translationKey="start_now"
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
                      <th className="px-6 py-3 text-left">Method</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
                      <th className="px-6 py-3 text-left">Time to Start</th>
                      <th className="px-6 py-3 text-left">Payout Speed</th>
                      <th className="px-6 py-3 text-left">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.method}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">{item.earningPotential}</td>
                        <td className="px-6 py-4 text-gray-600">{item.timeToStart}</td>
                        <td className="px-6 py-4 text-gray-600">{item.payoutSpeed}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                            {item.difficulty}
                          </span>
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
                        Earned ${story.earnings} • {story.method}
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
              href="/free-methods"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
