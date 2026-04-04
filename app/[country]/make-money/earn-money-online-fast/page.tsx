// app/[country]/(marketing)/earn-money-online-fast/page.tsx

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

interface FastEarningMethod {
  name: string;
  icon: string;
  description: string;
  timeToEarn: string;
  upfrontCost: string;
  earningPotential: string;
  difficulty: "Easy" | "Medium" | "Hard";
  steps: string[];
  platforms: string[];
  tips: string[];
  link: string;
  isUrgent?: boolean;
}

interface ImmediateOpportunity {
  title: string;
  description: string;
  reward: string;
  timeRequired: string;
  platform: string;
  link: string;
  isLimited?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  earningTimeframe: string;
}

interface SuccessTip {
  title: string;
  description: string;
  icon: string;
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
  fastestMethodsTitle?: string;
  fastestMethods?: FastEarningMethod[];
  immediateOpportunitiesTitle?: string;
  immediateOpportunities?: ImmediateOpportunity[];
  dailyEarningTitle?: string;
  dailyEarning?: FastEarningMethod[];
  emergencyCashTitle?: string;
  emergencyCash?: ImmediateOpportunity[];
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    items?: Array<{
      method: string;
      timeToEarn: string;
      effort: string;
      payout: string;
      reliability: string;
    }>;
  };
  successTipsTitle?: string;
  successTips?: SuccessTip[];
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
    `earn money fast ${lowerCountry}`,
    `make money quickly ${lowerCountry}`,
    `fast cash online ${lowerCountry}`,
    `immediate money online ${lowerCountry}`,
    `quick earning methods ${lowerCountry}`,
    `get paid today ${lowerCountry}`,
    `urgent money online ${lowerCountry}`,
    `fastest way to make money ${lowerCountry}`,
    `instant cash online ${lowerCountry}`,
    `emergency money online ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "fast cash usa",
      "make money fast usa",
      "quick money online usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "fast cash uk",
      "make money fast uk",
      "quick money online uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "fast cash canada",
      "make money fast canada",
      "quick money online canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "fast cash australia",
      "make money fast australia",
      "quick money online australia"
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
    translation = await loadSectionTranslation(language, "earn-money-online-fast");
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
    `Earn Money Online Fast - Quick Ways to Make Money in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Need cash fast? Discover legitimate ways to earn money online quickly in ${countryName}. Same-day payout options, urgent opportunities, and fast earning methods. Start earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-online-fast`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-online-fast`,
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

export default async function EarnMoneyOnlineFastPage({
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
  const tData = await loadSectionTranslation(language, "earn-money-online-fast");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Online Fast - Quick Ways to Make Money`);
  const description = t(rawDescription, `Need cash fast? Discover legitimate ways to earn money online quickly in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-online-fast`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money Online Fast"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Need cash quickly? Discover legitimate ways to make money online in ${countryName} within hours or days. From same-day payouts to urgent opportunities - start earning now!`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Fast Earning Categories"),
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
        name: "Same Day Payout",
        icon: "⚡",
        description: "Get paid within hours",
        earningTimeframe: "Hours",
      },
      {
        name: "24-48 Hours",
        icon: "📅",
        description: "Quick cash in 1-2 days",
        earningTimeframe: "1-2 days",
      },
      {
        name: "Weekly Payout",
        icon: "📆",
        description: "Reliable weekly earnings",
        earningTimeframe: "Weekly",
      },
      {
        name: "Instant Withdrawal",
        icon: "💰",
        description: "Cash out immediately",
        earningTimeframe: "Instant",
      },
      {
        name: "Urgent Tasks",
        icon: "🚨",
        description: "Emergency money opportunities",
        earningTimeframe: "Same day",
      },
      {
        name: "Micro Earnings",
        icon: "✨",
        description: "Small tasks, fast pay",
        earningTimeframe: "Minutes",
      },
    ];
  }

  const fastestMethodsData = {
    title: t(tData?.fastestMethodsTitle, "⚡ Fastest Ways to Earn Money Online"),
    methods: (tData?.fastestMethods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default fastest methods if not in translation
  if (fastestMethodsData.methods.length === 0) {
    fastestMethodsData.methods = [
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps for cash",
        timeToEarn: "1-2 hours",
        upfrontCost: "$0",
        earningPotential: "$10-60/test",
        difficulty: "Easy",
        steps: ["Sign up for platform", "Complete qualification test", "Apply for available tests", "Record screen and voice feedback", "Get paid via PayPal"],
        platforms: ["UserTesting", "Userlytics", "TryMyUI"],
        tips: ["Speak your thoughts continuously", "Complete profile thoroughly", "Apply for multiple tests"],
        link: "/method/user-testing",
        isUrgent: true,
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Complete small online tasks",
        timeToEarn: "30 minutes",
        upfrontCost: "$0",
        earningPotential: "$5-15/hour",
        difficulty: "Easy",
        steps: ["Create account on micro task site", "Browse available tasks", "Complete simple data entry or categorization", "Submit for review", "Withdraw earnings"],
        platforms: ["Amazon MTurk", "Clickworker", "Appen"],
        tips: ["Focus on higher paying tasks", "Build reputation for better tasks", "Work during peak hours"],
        link: "/method/micro-tasks",
        isUrgent: true,
      },
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for your opinions",
        timeToEarn: "1 hour",
        upfrontCost: "$0",
        earningPotential: "$5-20/hour",
        difficulty: "Easy",
        steps: ["Sign up for survey sites", "Complete profile surveys", "Check for available surveys", "Answer questions honestly", "Cash out via PayPal or gift cards"],
        platforms: ["Swagbucks", "Survey Junkie", "InboxDollars"],
        tips: ["Complete profile fully for more invites", "Check daily for new surveys", "Be consistent with answers"],
        link: "/method/online-surveys",
        isUrgent: false,
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
        title: "Sign Up Bonus",
        description: "Get paid just for creating a free account",
        reward: "$10",
        timeRequired: "5 minutes",
        platform: "Swagbucks",
        link: "/offer/signup-bonus",
        isLimited: true,
      },
      {
        title: "First Survey",
        description: "Complete your first survey for instant reward",
        reward: "$5",
        timeRequired: "10-15 minutes",
        platform: "Survey Junkie",
        link: "/offer/first-survey",
        isLimited: false,
      },
      {
        title: "Referral Bonus",
        description: "Share your referral link and earn instantly",
        reward: "$5-25",
        timeRequired: "2 minutes",
        platform: "Multiple",
        link: "/offer/referral-bonus",
        isLimited: true,
      },
    ];
  }

  const dailyEarningData = {
    title: t(tData?.dailyEarningTitle, "📅 Daily Earning Methods"),
    methods: (tData?.dailyEarning || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default daily earning methods if not in translation
  if (dailyEarningData.methods.length === 0) {
    dailyEarningData.methods = [
      {
        name: "Freelance Writing",
        icon: "✍️",
        description: "Write short articles and content",
        timeToEarn: "1-2 days",
        upfrontCost: "$0",
        earningPotential: "$25-100/hour",
        difficulty: "Medium",
        steps: ["Create profile on Upwork/Fiverr", "Showcase writing samples", "Apply for quick turnaround jobs", "Deliver quality work", "Get paid via platform"],
        platforms: ["Upwork", "Fiverr", "ProBlogger"],
        tips: ["Start with lower rates to build reviews", "Respond quickly to clients", "Deliver before deadline"],
        link: "/method/freelance-writing",
        isUrgent: false,
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Help businesses with admin tasks",
        timeToEarn: "1-3 days",
        upfrontCost: "$0",
        earningPotential: "$15-30/hour",
        difficulty: "Medium",
        steps: ["List your skills", "Create profile on VA platforms", "Apply for entry-level positions", "Complete tasks efficiently", "Get paid weekly"],
        platforms: ["Belay", "Time Etc", "Upwork"],
        tips: ["Highlight organizational skills", "Be responsive", "Build long-term relationships"],
        link: "/method/virtual-assistant",
        isUrgent: false,
      },
    ];
  }

  const emergencyCashData = {
    title: t(tData?.emergencyCashTitle, "🚑 Emergency Cash Options"),
    opportunities: (tData?.emergencyCash || []).map((opp) => ({
      ...opp,
      title: t(opp.title, opp.title),
      description: t(opp.description, opp.description),
      platform: t(opp.platform, opp.platform),
    })),
  };

  // Default emergency cash options if not in translation
  if (emergencyCashData.opportunities.length === 0) {
    emergencyCashData.opportunities = [
      {
        title: "Same-Day Freelance Gig",
        description: "Complete urgent tasks for immediate payment",
        reward: "$20-100",
        timeRequired: "2-4 hours",
        platform: "Fiverr",
        link: "/offer/same-day-gig",
        isLimited: true,
      },
      {
        title: "Mystery Shopping",
        description: "Get paid to shop and review today",
        reward: "$10-50",
        timeRequired: "1-2 hours",
        platform: "BestMark",
        link: "/offer/mystery-shopping",
        isLimited: false,
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Fast Earning Methods"),
    description: t(tData?.comparison?.description, "Find the fastest way to earn based on your situation"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      method: t(item.method, item.method),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        method: "User Testing",
        timeToEarn: "1-2 hours",
        effort: "Low",
        payout: "$10-60",
        reliability: "High",
      },
      {
        method: "Micro Tasks",
        timeToEarn: "30 min - 1 hour",
        effort: "Low",
        payout: "$5-15",
        reliability: "Medium",
      },
      {
        method: "Online Surveys",
        timeToEarn: "1-2 hours",
        effort: "Low",
        payout: "$5-20",
        reliability: "High",
      },
      {
        method: "Freelance Writing",
        timeToEarn: "1-2 days",
        effort: "Medium",
        payout: "$25-100",
        reliability: "High",
      },
    ];
  }

  const successTipsData = {
    title: t(tData?.successTipsTitle, "💡 Tips to Earn Faster"),
    tips: (tData?.successTips || []).map((tip) => ({
      ...tip,
      title: t(tip.title, tip.title),
      description: t(tip.description, tip.description),
    })),
  };

  // Default success tips if not in translation
  if (successTipsData.tips.length === 0) {
    successTipsData.tips = [
      {
        title: "Complete Your Profile",
        description: "Fully completed profiles get more opportunities and higher-paying tasks.",
        icon: "📝",
      },
      {
        title: "Check Platforms Daily",
        description: "New opportunities appear daily. Check multiple times for best results.",
        icon: "📅",
      },
      {
        title: "Stack Multiple Methods",
        description: "Use several platforms simultaneously to maximize hourly earnings.",
        icon: "📚",
      },
      {
        title: "Withdraw Immediately",
        description: "Don't let earnings sit. Withdraw as soon as you hit minimum payout.",
        icon: "💰",
      },
    ];
  }

  const earningsTrackerData = {
    title: t(tData?.earningsTracker?.title, "Track Your Fast Earnings"),
    description: t(tData?.earningsTracker?.description, "Use our earnings tracker to monitor your daily income and goal progress"),
    buttonText: t(tData?.earningsTracker?.buttonText, "Start Tracking"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Quick Start Resources"),
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
        title: "How to Make $100 Today",
        description: "Step-by-step guide to earning $100 in 24 hours",
        readTime: "8 min",
        link: "/resource/make-100-today",
      },
      {
        title: "Fast Payout Platforms",
        description: "Websites that pay within 24 hours",
        readTime: "6 min",
        link: "/resource/fast-payout",
      },
      {
        title: "Avoiding Fast Cash Scams",
        description: "Red flags to watch for when earning money quickly",
        readTime: "5 min",
        link: "/resource/avoid-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money Online Fast FAQ - ${countryName}`),
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
        q: "What's the fastest way to earn money online?",
        a: "Micro tasks and user testing offer earnings within hours. Same-day opportunities include sign-up bonuses and urgent freelance gigs."
      },
      {
        q: "Can I earn money today?",
        a: "Yes! Many platforms offer same-day payouts via PayPal. User testing, micro tasks, and survey sites can pay within 24 hours."
      },
      {
        q: "How much can I earn in a day?",
        a: "Beginners earn $20-50/day. With multiple platforms and dedication, $100-200/day is achievable. Focus on higher-paying tasks."
      },
      {
        q: "Do I need special skills?",
        a: "No! Many fast-earning methods like surveys and micro tasks require no special skills. User testing just requires speaking your thoughts."
      },
      {
        q: "Are these methods legitimate?",
        a: "Yes, we only recommend legitimate platforms with verified payment histories. Never pay to start earning - that's a scam red flag."
      },
      {
        q: "How do I get paid quickly?",
        a: "Use platforms that offer PayPal or instant gift cards. Some sites have instant withdrawal options or same-day processing."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Money Fast Today"),
    subtitle: t(tData?.final?.subtitle, "Don't wait - choose a method and start earning real cash within hours"),
    buttonText: t(tData?.final?.buttonText, "Start Now"),
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
              href="/fast-earnings"
              translationKey="start_now"
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
                      Earn in: {category.earningTimeframe}
                    </span>
                    <a
                      href={`/fast-earnings/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline"
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

      {/* Fastest Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="fastest-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="fastest-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {fastestMethodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fastestMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {method.isUrgent && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10 animate-pulse">
                      🚀 Fastest
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{method.icon}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      {method.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Time to Earn</p>
                        <p className="text-sm font-semibold text-green-600">{method.timeToEarn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Upfront Cost</p>
                        <p className="text-sm font-semibold">{method.upfrontCost}</p>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-lg font-bold text-red-600">{method.earningPotential}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        method.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                        method.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {method.difficulty}
                      </span>
                    </div>
                    <PrimaryCTA
                      href={method.link}
                      translationKey="start_earning"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
                        {index === 0 ? "🎁" : index === 1 ? "📝" : "👥"}
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

      {/* Daily Earning Section */}
      {dailyEarningData.methods.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="daily-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="daily-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {dailyEarningData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dailyEarningData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center p-4">
                      <div className="text-5xl">{method.icon}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                        {method.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {method.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Time to Earn</p>
                          <p className="text-sm font-semibold text-green-600">{method.timeToEarn}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Potential</p>
                          <p className="text-sm font-semibold">{method.earningPotential}</p>
                        </div>
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
      )}

      {/* Emergency Cash Section */}
      {emergencyCashData.opportunities.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="emergency-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="emergency-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {emergencyCashData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyCashData.opportunities.map((opp, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{index === 0 ? "💼" : "🕵️"}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {opp.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {opp.description}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-green-600">{opp.reward}</span>
                          <span className="text-xs text-gray-500">⏱️ {opp.timeRequired}</span>
                        </div>
                        <PrimaryCTA
                          href={opp.link}
                          translationKey="get_cash"
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
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Method</th>
                      <th className="px-6 py-3 text-left">Time to Earn</th>
                      <th className="px-6 py-3 text-left">Effort</th>
                      <th className="px-6 py-3 text-left">Payout</th>
                      <th className="px-6 py-3 text-left">Reliability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.method}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">
                          {item.timeToEarn}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.effort}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.payout}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.reliability === "High" ? "bg-green-100 text-green-700" :
                            item.reliability === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {item.reliability}
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

      {/* Success Tips Section */}
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
                {successTipsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {successTipsData.tips.map((tip, index) => (
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
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full mb-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.readTime} read
                      </span>
                      <span className="text-red-600 dark:text-red-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/fast-earnings"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
