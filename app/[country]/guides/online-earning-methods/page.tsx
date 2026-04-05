// app/[country]/(marketing)/online-earning-methods/page.tsx

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
  earningPotential: string;
  timeToStart: string;
  difficulty: "Easy" | "Medium" | "Hard";
  passiveIncome: boolean;
  skills: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  link: string;
  isPopular?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  methodCount: number;
}

interface ComparisonItem {
  method: string;
  earningPotential: string;
  startupCost: string;
  timeToEarn: string;
  scalability: string;
  difficulty: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  method: string;
  story: string;
  timeToAchieve: string;
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
  allMethods?: EarningMethod[];
  passiveIncomeTitle?: string;
  passiveIncome?: EarningMethod[];
  fastestEarningTitle?: string;
  fastestEarning?: EarningMethod[];
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
  earningsCalculator?: {
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
    `online earning methods ${lowerCountry}`,
    `make money online ${lowerCountry}`,
    `ways to earn online ${lowerCountry}`,
    `online income ideas ${lowerCountry}`,
    `work from home earn money ${lowerCountry}`,
    `legitimate online earning ${lowerCountry}`,
    `passive income online ${lowerCountry}`,
    `side hustle ideas ${lowerCountry}`,
    `online money making methods ${lowerCountry}`,
    `earn cash online ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "make money online usa",
      "online side hustles usa",
      "work from home usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "make money online uk",
      "online side hustles uk",
      "work from home uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "make money online canada",
      "online side hustles canada",
      "work from home canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "make money online australia",
      "online side hustles australia",
      "work from home australia"
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
    translation = await loadSectionTranslation(language, "online-earning-methods");
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
    `Online Earning Methods - Make Money Online in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover legitimate online earning methods in ${countryName}. From freelancing to passive income, find the best ways to make money online. Start earning today with proven strategies.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/online-earning-methods`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/online-earning-methods`,
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

export default async function OnlineEarningMethodsPage({
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
  const tData = await loadSectionTranslation(language, "online-earning-methods");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Online Earning Methods - Make Money Online`);
  const description = t(rawDescription, `Discover legitimate online earning methods in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/online-earning-methods`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Discover Legitimate Online Earning Methods"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Explore proven ways to make money online in ${countryName}. From freelancing and surveys to passive income and e-commerce - find the method that fits your skills and lifestyle.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Earning Method Categories"),
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
        name: "Freelancing",
        icon: "💼",
        description: "Sell your skills and services",
        methodCount: 25,
      },
      {
        name: "Passive Income",
        icon: "💰",
        description: "Earn while you sleep",
        methodCount: 18,
      },
      {
        name: "Microtasks",
        icon: "✅",
        description: "Small tasks for quick cash",
        methodCount: 12,
      },
      {
        name: "Content Creation",
        icon: "📹",
        description: "Create and monetize content",
        methodCount: 15,
      },
      {
        name: "E-commerce",
        icon: "🛍️",
        description: "Sell products online",
        methodCount: 10,
      },
      {
        name: "Investing",
        icon: "📈",
        description: "Grow your money online",
        methodCount: 8,
      },
    ];
  }

  const allMethodsData = {
    title: t(tData?.allMethodsTitle, "📋 Complete List of Online Earning Methods"),
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
        name: "Freelance Writing",
        icon: "✍️",
        description: "Write articles, blog posts, and content for clients",
        earningPotential: "$25-100/hour",
        timeToStart: "1-2 days",
        difficulty: "Medium",
        passiveIncome: false,
        skills: ["Writing", "Research", "SEO"],
        platforms: ["Upwork", "Fiverr", "ProBlogger"],
        pros: ["Flexible schedule", "High earning potential", "Work from anywhere"],
        cons: ["Competitive", "Income fluctuates", "Need portfolio"],
        link: "/method/freelance-writing",
        isPopular: true,
      },
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for sharing your opinions",
        earningPotential: "$5-20/hour",
        timeToStart: "1 hour",
        difficulty: "Easy",
        passiveIncome: false,
        skills: ["None required", "Basic English"],
        platforms: ["Swagbucks", "Survey Junkie", "InboxDollars"],
        pros: ["No skills needed", "Easy to start", "Can do anytime"],
        cons: ["Low pay", "Can be boring", "Limited availability"],
        link: "/method/online-surveys",
        isPopular: true,
      },
      {
        name: "Print on Demand",
        icon: "👕",
        description: "Sell custom designs on products",
        earningPotential: "$500-5000/month",
        timeToStart: "1-2 weeks",
        difficulty: "Medium",
        passiveIncome: true,
        skills: ["Design", "Marketing", "E-commerce"],
        platforms: ["Printful", "Redbubble", "TeeSpring"],
        pros: ["No inventory", "Passive income", "Creative work"],
        cons: ["Competitive", "Marketing needed", "Lower margins"],
        link: "/method/print-on-demand",
        isPopular: true,
      },
      {
        name: "Affiliate Marketing",
        icon: "🔗",
        description: "Earn commissions promoting products",
        earningPotential: "$500-10,000+/month",
        timeToStart: "1-3 months",
        difficulty: "Hard",
        passiveIncome: true,
        skills: ["Marketing", "SEO", "Content creation"],
        platforms: ["Amazon Associates", "ShareASale", "CJ Affiliate"],
        pros: ["High earning potential", "Passive income", "Work from anywhere"],
        cons: ["Takes time to build", "Requires traffic", "Commission based"],
        link: "/method/affiliate-marketing",
        isPopular: true,
      },
    ];
  }

  const passiveIncomeData = {
    title: t(tData?.passiveIncomeTitle, "💤 Best Passive Income Methods"),
    methods: (tData?.passiveIncome || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default passive income methods if not in translation
  if (passiveIncomeData.methods.length === 0) {
    passiveIncomeData.methods = [
      {
        name: "Dividend Investing",
        icon: "📊",
        description: "Earn regular payments from stocks",
        earningPotential: "4-8% annual returns",
        timeToStart: "1-2 days",
        difficulty: "Medium",
        passiveIncome: true,
        skills: ["Research", "Patience", "Basic finance"],
        platforms: ["Robinhood", "Vanguard", "Fidelity"],
        pros: ["Truly passive", "Compound growth", "Tax advantages"],
        cons: ["Capital required", "Market risk", "Research needed"],
        link: "/method/dividend-investing",
      },
      {
        name: "Digital Products",
        icon: "📱",
        description: "Create and sell ebooks, courses, templates",
        earningPotential: "$1,000-50,000+/year",
        timeToStart: "2-4 weeks",
        difficulty: "Medium",
        passiveIncome: true,
        skills: ["Expertise", "Creation", "Marketing"],
        platforms: ["Gumroad", "Teachable", "Etsy"],
        pros: ["High margins", "Scalable", "Once created, sells forever"],
        cons: ["Time to create", "Marketing needed", "Competition"],
        link: "/method/digital-products",
      },
      {
        name: "Rental Income",
        icon: "🏠",
        description: "Rent out property or space",
        earningPotential: "$500-5,000+/month",
        timeToStart: "1-2 months",
        difficulty: "Hard",
        passiveIncome: true,
        skills: ["Property management", "Customer service", "Basic maintenance"],
        platforms: ["Airbnb", "VRBO", "Zillow"],
        pros: ["Real asset", "Appreciation", "Tax benefits"],
        cons: ["High capital", "Maintenance", "Tenant issues"],
        link: "/method/rental-income",
      },
    ];
  }

  const fastestEarningData = {
    title: t(tData?.fastestEarningTitle, "⚡ Fastest Ways to Start Earning"),
    methods: (tData?.fastestEarning || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default fastest earning methods if not in translation
  if (fastestEarningData.methods.length === 0) {
    fastestEarningData.methods = [
      {
        name: "Micro Task Sites",
        icon: "✅",
        description: "Complete small tasks for quick cash",
        earningPotential: "$5-15/hour",
        timeToStart: "30 minutes",
        difficulty: "Easy",
        passiveIncome: false,
        skills: ["Basic computer skills", "Attention to detail"],
        platforms: ["Amazon MTurk", "Clickworker", "Appen"],
        pros: ["Start immediately", "No skills needed", "Flexible hours"],
        cons: ["Low pay", "Repetitive", "Limited tasks"],
        link: "/method/micro-tasks",
      },
      {
        name: "Mystery Shopping",
        icon: "🕵️",
        description: "Get paid to shop and review experiences",
        earningPotential: "$10-50 per assignment",
        timeToStart: "1-2 days",
        difficulty: "Easy",
        passiveIncome: false,
        skills: ["Observation", "Writing", "Attention to detail"],
        platforms: ["Mystery Shopper", "BestMark", "Market Force"],
        pros: ["Fun tasks", "Free products", "Flexible"],
        cons: ["Inconsistent", "Reimbursement delays", "Detailed reports"],
        link: "/method/mystery-shopping",
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps for feedback",
        earningPotential: "$10-60/test",
        timeToStart: "1-2 hours",
        difficulty: "Medium",
        passiveIncome: false,
        skills: ["Communication", "Attention to detail", "Tech comfort"],
        platforms: ["UserTesting", "Userlytics", "TryMyUI"],
        pros: ["Good pay", "Interesting", "Learn about UX"],
        cons: ["Limited tests", "Need microphone", "Screen recording"],
        link: "/method/user-testing",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Earning Methods"),
    description: t(tData?.comparison?.description, "See which online earning method fits your goals"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      method: t(item.method, item.method),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        method: "Freelancing",
        earningPotential: "$$$$",
        startupCost: "$",
        timeToEarn: "Days",
        scalability: "High",
        difficulty: "Medium",
      },
      {
        method: "Online Surveys",
        earningPotential: "$",
        startupCost: "$",
        timeToEarn: "Hours",
        scalability: "Low",
        difficulty: "Easy",
      },
      {
        method: "Affiliate Marketing",
        earningPotential: "$$$$$",
        startupCost: "$$",
        timeToEarn: "Months",
        scalability: "Very High",
        difficulty: "Hard",
      },
      {
        method: "Print on Demand",
        earningPotential: "$$$",
        startupCost: "$$",
        timeToEarn: "Weeks",
        scalability: "High",
        difficulty: "Medium",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Success Stories"),
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
        name: "Emma L.",
        earnings: "$5,000/month",
        method: "Freelance Writing",
        story: "Started freelance writing part-time while working full-time. Within 6 months, I replaced my 9-5 income!",
        timeToAchieve: "6 months",
      },
      {
        name: "David C.",
        earnings: "$2,000/month",
        method: "Print on Demand",
        story: "Design t-shirts and mugs in my spare time. Now earning $2k monthly passive income.",
        timeToAchieve: "4 months",
      },
      {
        name: "Rachel K.",
        earnings: "$10,000/year",
        method: "Online Surveys",
        story: "Complete surveys during TV commercials. Made $10k last year just from spare time!",
        timeToAchieve: "1 year",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Tips for Online Earning"),
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
        title: "Start Small",
        description: "Begin with one method, master it, then expand to others. Don't try everything at once.",
        icon: "🌱",
      },
      {
        title: "Be Consistent",
        description: "Set regular hours for your online work. Consistency beats intensity.",
        icon: "⏰",
      },
      {
        title: "Track Your Time",
        description: "Monitor how much you earn per hour. Focus on high-value activities.",
        icon: "📊",
      },
      {
        title: "Avoid Scams",
        description: "Never pay to start earning. Legitimate opportunities don't require upfront fees.",
        icon: "🛡️",
      },
    ];
  }

  const earningsCalculatorData = {
    title: t(tData?.earningsCalculator?.title, "Calculate Your Online Earning Potential"),
    description: t(tData?.earningsCalculator?.description, "See how much you could earn with different online methods"),
    buttonText: t(tData?.earningsCalculator?.buttonText, "Try Calculator"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Resources & Guides"),
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
        title: "How to Start Freelancing",
        description: "Step-by-step guide to launching your freelance career",
        readTime: "10 min",
        link: "/resource/start-freelancing",
      },
      {
        title: "Beginner's Guide to Passive Income",
        description: "Build wealth while you sleep with these strategies",
        readTime: "12 min",
        link: "/resource/passive-income-guide",
      },
      {
        title: "Avoid Online Earning Scams",
        description: "Red flags to watch for and how to stay safe",
        readTime: "7 min",
        link: "/resource/avoid-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Online Earning Methods FAQ - ${countryName}`),
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
        q: "What is the fastest way to earn money online?",
        a: "Microtasks, online surveys, and user testing offer the quickest path to earning - often within hours or days. However, they typically pay less than skilled work."
      },
      {
        q: "How much can I realistically earn online?",
        a: "Beginners earn $100-500/month. With skills and dedication, $1,000-5,000/month is achievable. Full-time professionals can earn $5,000-20,000+/month."
      },
      {
        q: "Do I need special skills to earn online?",
        a: "No! Many methods like surveys, microtasks, and cashback apps require no special skills. As you gain experience, you can develop higher-paying skills."
      },
      {
        q: "Is passive income really passive?",
        a: "Most 'passive' income requires upfront work to create. Once established, it requires minimal maintenance. True passive income (dividends, interest) needs capital."
      },
      {
        q: "Which method is best for beginners?",
        a: "Start with online surveys, microtasks, or freelance writing. These have low barriers to entry and help you build confidence and skills."
      },
      {
        q: "Can I earn online without investment?",
        a: "Yes! Many methods require zero investment: surveys, microtasks, freelance work, user testing, and content creation. Never pay to start earning."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Your Online Earning Journey Today"),
    subtitle: t(tData?.final?.subtitle, "Choose a method that fits your lifestyle and start earning real money online"),
    buttonText: t(tData?.final?.buttonText, "Explore All Methods"),
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
              href="/earning-methods"
              translationKey="explore_methods"
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
                className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"
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
                      {category.methodCount}+ methods
                    </span>
                    <a
                      href={`/methods/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-teal-600 dark:text-teal-400 text-sm font-semibold hover:underline"
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
                className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{method.icon}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        {method.name}
                      </h3>
                      {method.isPopular && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Earning Potential</p>
                        <p className="text-sm font-semibold text-green-600">{method.earningPotential}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Time to Start</p>
                        <p className="text-sm font-semibold">{method.timeToStart}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        method.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                        method.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {method.difficulty}
                      </span>
                      {method.passiveIncome && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          Passive Income
                        </span>
                      )}
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

      {/* Passive Income Section */}
      {passiveIncomeData.methods.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="passive-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="passive-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {passiveIncomeData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {passiveIncomeData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{method.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {method.description}
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                        <p className="text-lg font-bold text-green-600">{method.earningPotential}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        Time to start: {method.timeToStart}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        {method.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {skill}
                          </span>
                        ))}
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

      {/* Fastest Earning Section */}
      {fastestEarningData.methods.length > 0 && (
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
                  {fastestEarningData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fastestEarningData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-800"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{method.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {method.description}
                      </p>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        {method.earningPotential}
                      </p>
                      <p className="text-sm text-orange-600 font-semibold mb-3">
                        ⏱️ Start earning in {method.timeToStart}
                      </p>
                      <PrimaryCTA
                        href={method.link}
                        translationKey="start_now"
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Method</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
                      <th className="px-6 py-3 text-left">Startup Cost</th>
                      <th className="px-6 py-3 text-left">Time to Earn</th>
                      <th className="px-6 py-3 text-left">Scalability</th>
                      <th className="px-6 py-3 text-left">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.method}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">
                          {item.earningPotential}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.startupCost}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.timeToEarn}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.scalability}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                            item.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
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
                        ${story.earnings} • {story.method}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Achieved in {story.timeToAchieve}
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
                className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
              className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {earningsCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/earnings-calculator"
              translationKey={earningsCalculatorData.buttonText}
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
                  className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.readTime} read
                      </span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
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
              className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/earning-methods"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
