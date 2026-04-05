// app/[country]/(marketing)/earn-money-without-skills/page.tsx

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

interface NoSkillMethod {
  name: string;
  icon: string;
  description: string;
  timeToStart: string;
  earningPotential: string;
  difficulty: "Easy" | "Very Easy";
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
}

interface QuickOpportunity {
  title: string;
  description: string;
  reward: string;
  timeRequired: string;
  platform: string;
  link: string;
  isLimited?: boolean;
}

interface ComparisonItem {
  method: string;
  timeToStart: string;
  earningPotential: string;
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
  allMethodsTitle?: string;
  allMethods?: NoSkillMethod[];
  quickStartTitle?: string;
  quickStart?: NoSkillMethod[];
  immediateOpportunitiesTitle?: string;
  immediateOpportunities?: QuickOpportunity[];
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
    `earn money without skills ${lowerCountry}`,
    `no skill needed jobs ${lowerCountry}`,
    `easy money online ${lowerCountry}`,
    `beginner friendly earning ${lowerCountry}`,
    `no experience required jobs ${lowerCountry}`,
    `simple ways to earn money ${lowerCountry}`,
    `easy online jobs ${lowerCountry}`,
    `no talent needed earn money ${lowerCountry}`,
    `basic tasks get paid ${lowerCountry}`,
    `easy side hustles ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "no skill jobs usa",
      "easy money usa",
      "beginner jobs online usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "no skill jobs uk",
      "easy money uk",
      "beginner jobs online uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "no skill jobs canada",
      "easy money canada",
      "beginner jobs online canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "no skill jobs australia",
      "easy money australia",
      "beginner jobs online australia"
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
    translation = await loadSectionTranslation(language, "earn-money-without-skills");
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
    `Earn Money Without Skills - Easy Ways to Make Money in {country} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `No special skills? No problem! Discover easy ways to earn money online in ${countryName} without experience. Simple tasks, surveys, micro jobs - start earning today with zero skills required.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-without-skills`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-without-skills`,
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

export default async function EarnMoneyWithoutSkillsPage({
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
  const tData = await loadSectionTranslation(language, "earn-money-without-skills");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Without Skills - Easy Ways to Make Money`);
  const description = t(rawDescription, `No special skills? No problem! Discover easy ways to earn money online in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-without-skills`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money Without Special Skills"),
    subtitle: t(
      tData?.hero?.subtitle,
      `No experience? No problem! Discover easy ways to make money online in ${countryName} that require zero special skills. From simple tasks and surveys to cashback apps - start earning today with just a few minutes of your time.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Easy Earning Categories"),
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
        description: "Share your opinion for cash",
        methodCount: 25,
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Simple small tasks",
        methodCount: 30,
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn on everyday purchases",
        methodCount: 18,
      },
      {
        name: "Mystery Shopping",
        icon: "🕵️",
        description: "Get paid to shop",
        methodCount: 12,
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps",
        methodCount: 10,
      },
      {
        name: "Sign-up Bonuses",
        icon: "🎁",
        description: "Get paid to register",
        methodCount: 22,
      },
    ];
  }

  const allMethodsData = {
    title: t(tData?.allMethodsTitle, "📋 Best Ways to Earn Without Skills"),
    methods: (tData?.allMethods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default all methods if not in translation
  if (allMethodsData.methods.length === 0) {
    allMethodsData.methods = [
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for sharing your opinions on products and services",
        timeToStart: "5 minutes",
        earningPotential: "$5-20/hour",
        difficulty: "Very Easy",
        platforms: ["Swagbucks", "Survey Junkie", "InboxDollars", "Branded Surveys"],
        steps: [
          "Create free account on survey site",
          "Complete your profile (takes 5-10 minutes)",
          "Check for available surveys daily",
          "Answer questions honestly",
          "Cash out via PayPal or gift cards"
        ],
        tips: [
          "Complete your profile fully for more surveys",
          "Check daily for new opportunities",
          "Be consistent with your answers",
          "Sign up for multiple survey sites"
        ],
        link: "/no-skills/online-surveys",
        isPopular: true,
        payoutSpeed: "1-3 days",
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Complete simple small tasks like data entry, categorization, and research",
        timeToStart: "10 minutes",
        earningPotential: "$5-15/hour",
        difficulty: "Very Easy",
        platforms: ["Amazon MTurk", "Clickworker", "Appen", "Microworkers"],
        steps: [
          "Sign up for micro task platform",
          "Complete basic training (if required)",
          "Browse available tasks",
          "Complete tasks accurately",
          "Get paid per task completed"
        ],
        tips: [
          "Focus on higher-paying tasks",
          "Build a good reputation for better tasks",
          "Work during peak hours for more tasks",
          "Use browser extensions to find best tasks"
        ],
        link: "/no-skills/micro-tasks",
        isPopular: true,
        payoutSpeed: "1-7 days",
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn money back on purchases you're already making",
        timeToStart: "5 minutes",
        earningPotential: "$20-100/month",
        difficulty: "Very Easy",
        platforms: ["Rakuten", "Ibotta", "Fetch Rewards", "Dosh", "Honey"],
        steps: [
          "Download cashback apps",
          "Create free account",
          "Link credit/debit cards (optional)",
          "Browse offers or activate cashback",
          "Shop as normal and earn automatically"
        ],
        tips: [
          "Stack multiple apps for same purchase",
          "Check apps before shopping",
          "Refer friends for bonuses",
          "Watch for boosted cashback offers"
        ],
        link: "/no-skills/cashback-apps",
        isPopular: true,
        payoutSpeed: "1-30 days",
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps, provide feedback",
        timeToStart: "30 minutes",
        earningPotential: "$10-60/test",
        difficulty: "Easy",
        platforms: ["UserTesting", "Userlytics", "TryMyUI", "UserFeel"],
        steps: [
          "Sign up for user testing platform",
          "Complete sample test (unpaid)",
          "Apply for available tests",
          "Record screen and speak your thoughts",
          "Get paid within 7 days"
        ],
        tips: [
          "Speak your thoughts continuously",
          "Complete your profile thoroughly",
          "Apply for tests as soon as they appear",
          "Be honest in your feedback"
        ],
        link: "/no-skills/user-testing",
        isPopular: false,
        payoutSpeed: "7 days",
      },
    ];
  }

  const quickStartData = {
    title: t(tData?.quickStartTitle, "⚡ Quick Start - Start Earning Today"),
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
        timeToStart: "2 minutes",
        earningPotential: "$5-25",
        difficulty: "Very Easy",
        platforms: ["Various"],
        steps: [
          "Find sites offering sign-up bonuses",
          "Create free account",
          "Complete simple verification",
          "Receive bonus instantly or within days"
        ],
        tips: [
          "Use a dedicated email for sign-ups",
          "Read terms carefully",
          "Complete all verification steps"
        ],
        link: "/no-skills/signup-bonuses",
        isPopular: true,
        payoutSpeed: "Instant-7 days",
      },
      {
        name: "Mystery Shopping",
        icon: "🕵️",
        description: "Get paid to shop and review stores",
        timeToStart: "1 day",
        earningPotential: "$10-50/assignment",
        difficulty: "Easy",
        platforms: ["BestMark", "Market Force", "Mystery Shopper"],
        steps: [
          "Join mystery shopping platform",
          "Browse available shops",
          "Accept assignment",
          "Visit store and make purchase",
          "Complete detailed report"
        ],
        tips: [
          "Follow instructions exactly",
          "Keep receipts",
          "Submit reports promptly"
        ],
        link: "/no-skills/mystery-shopping",
        isPopular: false,
        payoutSpeed: "30 days",
      },
    ];
  }

  const immediateOpportunitiesData = {
    title: t(tData?.immediateOpportunitiesTitle, "🚨 Immediate Cash Opportunities"),
    opportunities: (tData?.immediateOpportunities || []).map((opp) => ({
      ...opp,
      title: t(opp.title, opp.title),
      description: t(opp.description, opp.description),
      platform: t(opp.platform, opp.platform),
    })),
  };

  // Default immediate opportunities if not in translation
  if (immediateOpportunitiesData.opportunities.length === 0) {
    immediateOpportunitiesData.opportunities = [
      {
        title: "Welcome Bonus",
        description: "Get paid for creating your first account",
        reward: "$10",
        timeRequired: "5 minutes",
        platform: "Swagbucks",
        link: "/offer/welcome-bonus",
        isLimited: true,
      },
      {
        title: "First Survey",
        description: "Complete your first survey for instant cash",
        reward: "$5",
        timeRequired: "10-15 minutes",
        platform: "Survey Junkie",
        link: "/offer/first-survey",
        isLimited: false,
      },
      {
        title: "Receipt Scan",
        description: "Scan your first receipt for bonus points",
        reward: "$2",
        timeRequired: "2 minutes",
        platform: "Fetch Rewards",
        link: "/offer/receipt-scan",
        isLimited: true,
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare No-Skill Earning Methods"),
    description: t(tData?.comparison?.description, "Find the easiest method for your situation"),
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
        timeToStart: "5 min",
        earningPotential: "$5-20/hour",
        payoutSpeed: "1-3 days",
        difficulty: "Very Easy",
      },
      {
        method: "Micro Tasks",
        timeToStart: "10 min",
        earningPotential: "$5-15/hour",
        payoutSpeed: "1-7 days",
        difficulty: "Very Easy",
      },
      {
        method: "Cashback Apps",
        timeToStart: "5 min",
        earningPotential: "$20-100/month",
        payoutSpeed: "1-30 days",
        difficulty: "Very Easy",
      },
      {
        method: "User Testing",
        timeToStart: "30 min",
        earningPotential: "$10-60/test",
        payoutSpeed: "7 days",
        difficulty: "Easy",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Success Stories (No Skills Needed!)"),
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
        name: "Jennifer R.",
        earnings: "$350",
        method: "Online Surveys",
        story: "I do surveys while watching TV. Made $350 last month with zero skills required!",
        timeSpent: "1-2 hours/day",
      },
      {
        name: "Mark T.",
        earnings: "$200",
        method: "Cashback Apps",
        story: "Just using cashback apps on my normal shopping earned me $200 this month. So easy!",
        timeSpent: "5 min/day",
      },
      {
        name: "Lisa C.",
        earnings: "$500",
        method: "Micro Tasks",
        story: "Complete small tasks during my lunch break. Earned $500 without any special skills.",
        timeSpent: "1 hour/day",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 Tips for Maximum Earnings (No Skills Required)"),
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
        description: "Don't rely on just one site. Sign up for several to maximize opportunities.",
        icon: "📱",
      },
      {
        title: "Create a Routine",
        description: "Set aside specific times each day for earning activities.",
        icon: "⏰",
      },
      {
        title: "Refer Friends",
        description: "Many platforms offer generous referral bonuses for bringing new users.",
        icon: "👥",
      },
      {
        title: "Stay Consistent",
        description: "Small daily earnings add up. Consistency is key to building meaningful income.",
        icon: "📈",
      },
    ];
  }

  const earningsTrackerData = {
    title: t(tData?.earningsTracker?.title, "Track Your No-Skill Earnings"),
    description: t(tData?.earningsTracker?.description, "Monitor how much you're earning with simple tasks and surveys"),
    buttonText: t(tData?.earningsTracker?.buttonText, "Start Tracking"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Getting Started Resources"),
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
        title: "How to Make $50 Today",
        description: "Simple strategies using only free platforms",
        readTime: "7 min",
        link: "/resource/make-50-today",
      },
      {
        title: "Best Survey Sites Compared",
        description: "Which survey platforms pay the most",
        readTime: "8 min",
        link: "/resource/survey-sites-compared",
      },
      {
        title: "Avoiding Online Scams",
        description: "How to identify legitimate earning opportunities",
        readTime: "6 min",
        link: "/resource/avoid-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money Without Skills FAQ - ${countryName}`),
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
        q: "Can I really earn money without any skills?",
        a: "Absolutely! Many legitimate platforms pay for simple tasks like taking surveys, watching videos, or shopping through cashback apps. No special skills required."
      },
      {
        q: "How much can I earn with no skills?",
        a: "Beginners typically earn $50-200/month with casual effort. Dedicated users can earn $300-500+ monthly using multiple platforms."
      },
      {
        q: "Do I need to pay to start?",
        a: "Never! Legitimate opportunities are always free to join. If a site asks for upfront payment, it's likely a scam."
      },
      {
        q: "What's the easiest method for beginners?",
        a: "Start with online surveys and cashback apps. Both require no skills and can be done in spare time."
      },
      {
        q: "How do I get paid?",
        a: "Most platforms pay via PayPal, gift cards (Amazon, Walmart, Target), or direct deposit. Minimum payout thresholds typically range from $5-20."
      },
      {
        q: "Are these methods available in my country?",
        a: "Availability varies. Most major platforms work in the US, UK, Canada, Australia, and select European countries. Check each site's terms."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Today - No Skills Required!"),
    subtitle: t(tData?.final?.subtitle, "Join thousands who earn real money with simple tasks and zero experience"),
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
              href="/no-skills-methods"
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
                      {category.methodCount}+ ways
                    </span>
                    <a
                      href={`/no-skills/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
                    >
                      Explore →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* All Methods Section */}
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
                {allMethodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{method.icon}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        {method.name}
                      </h3>
                      {method.isPopular && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Time to Start</p>
                        <p className="text-sm font-semibold">{method.timeToStart}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payout Speed</p>
                        <p className="text-sm font-semibold text-green-600">{method.payoutSpeed}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-lg font-bold text-blue-600">{method.earningPotential}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        {method.difficulty}
                      </span>
                    </div>
                    <PrimaryCTA
                      href={method.link}
                      translationKey="learn_more"
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
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-500 mx-auto mt-4 rounded-full"
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

      {/* Immediate Opportunities Section */}
      {immediateOpportunitiesData.opportunities.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="immediate-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="immediate-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {immediateOpportunitiesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {immediateOpportunitiesData.opportunities.map((opp, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800 relative"
                  >
                    {opp.isLimited && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                        Limited Time
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-5xl mb-3">
                        {index === 0 ? "🎁" : index === 1 ? "📝" : "📸"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {opp.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {opp.description}
                      </p>
                      <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2 mb-2">
                        <p className="text-2xl font-bold text-green-600">{opp.reward}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        ⏱️ {opp.timeRequired}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        Platform: {opp.platform}
                      </p>
                      <PrimaryCTA
                        href={opp.link}
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Method</th>
                      <th className="px-6 py-3 text-left">Time to Start</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
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
                        <td className="px-6 py-4 text-gray-600">{item.timeToStart}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">{item.earningPotential}</td>
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
                    <div className="text-4xl mb-3">⭐</div>
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
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.readTime} read
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/no-skills-methods"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
