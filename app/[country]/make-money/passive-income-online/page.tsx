// app/[country]/(marketing)/passive-income-online/page.tsx

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

interface PassiveIncomeMethod {
  name: string;
  icon: string;
  description: string;
  upfrontWork: string;
  startupCost: string;
  monthlyEarning: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToPassive: string;
  scalability: "Low" | "Medium" | "High";
  steps: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  link: string;
  isBeginnerFriendly?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  methodCount: number;
}

interface ComparisonItem {
  method: string;
  upfrontWork: string;
  startupCost: string;
  monthlyPotential: string;
  maintenance: string;
  scalability: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  method: string;
  story: string;
  timeToBuild: string;
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
  allMethods?: PassiveIncomeMethod[];
  beginnerFriendlyTitle?: string;
  beginnerFriendly?: PassiveIncomeMethod[];
  highEarningTitle?: string;
  highEarning?: PassiveIncomeMethod[];
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
  passiveCalculator?: {
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
    `passive income online ${lowerCountry}`,
    `make passive income ${lowerCountry}`,
    `earn while you sleep ${lowerCountry}`,
    `passive income ideas ${lowerCountry}`,
    `build passive income ${lowerCountry}`,
    `online passive income streams ${lowerCountry}`,
    `residual income online ${lowerCountry}`,
    `set and forget income ${lowerCountry}`,
    `passive earning methods ${lowerCountry}`,
    `automated income online ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "passive income usa",
      "make passive income usa",
      "residual income usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "passive income uk",
      "make passive income uk",
      "residual income uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "passive income canada",
      "make passive income canada",
      "residual income canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "passive income australia",
      "make passive income australia",
      "residual income australia"
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
    translation = await loadSectionTranslation(language, "passive-income-online");
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
    `Passive Income Online - Build Wealth While You Sleep in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover legitimate passive income streams online in ${countryName}. Build automated income sources that earn while you sleep. From digital products to investments - start your passive income journey today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/passive-income-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/passive-income-online`,
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

export default async function PassiveIncomeOnlinePage({
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
  const tData = await loadSectionTranslation(language, "passive-income-online");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Passive Income Online - Build Wealth While You Sleep`);
  const description = t(rawDescription, `Discover legitimate passive income streams online in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/passive-income-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Build Passive Income Online"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Create automated income streams that earn money while you sleep in ${countryName}. From digital products and affiliate marketing to investments and royalties - start building wealth today.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Passive Income Categories"),
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
        name: "Digital Products",
        icon: "📱",
        description: "Create once, sell forever",
        methodCount: 12,
      },
      {
        name: "Affiliate Marketing",
        icon: "🔗",
        description: "Earn commissions promoting products",
        methodCount: 15,
      },
      {
        name: "Investing",
        icon: "📈",
        description: "Let your money work for you",
        methodCount: 8,
      },
      {
        name: "Content Creation",
        icon: "📹",
        description: "Monetize your content",
        methodCount: 10,
      },
      {
        name: "Print on Demand",
        icon: "👕",
        description: "Sell designs without inventory",
        methodCount: 6,
      },
      {
        name: "Royalties",
        icon: "🎵",
        description: "Earn from your creations",
        methodCount: 5,
      },
    ];
  }

  const allMethodsData = {
    title: t(tData?.allMethodsTitle, "📋 Best Passive Income Methods"),
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
        name: "Digital Products",
        icon: "📱",
        description: "Create ebooks, courses, templates, or software",
        upfrontWork: "20-100 hours",
        startupCost: "$0-500",
        monthlyEarning: "$500-10,000+",
        difficulty: "Medium",
        timeToPassive: "1-3 months",
        scalability: "High",
        steps: [
          "Identify your expertise and target audience",
          "Create high-quality digital product",
          "Set up sales platform (Gumroad, Teachable, Etsy)",
          "Create marketing content",
          "Drive traffic to your product"
        ],
        platforms: ["Gumroad", "Teachable", "Etsy", "Amazon KDP"],
        pros: ["High margins", "No inventory", "Scalable", "Passive after creation"],
        cons: ["Time to create", "Marketing required", "Competition"],
        link: "/passive/digital-products",
        isBeginnerFriendly: true,
      },
      {
        name: "Affiliate Marketing",
        icon: "🔗",
        description: "Promote products and earn commissions",
        upfrontWork: "10-50 hours",
        startupCost: "$0-100",
        monthlyEarning: "$500-20,000+",
        difficulty: "Medium",
        timeToPassive: "2-6 months",
        scalability: "High",
        steps: [
          "Choose a niche",
          "Join affiliate programs (Amazon, ShareASale)",
          "Create content (blog, YouTube, social media)",
          "Add affiliate links",
          "Drive traffic and earn commissions"
        ],
        platforms: ["Amazon Associates", "ShareASale", "CJ Affiliate", "ClickBank"],
        pros: ["No product creation", "Work from anywhere", "High earning potential"],
        cons: ["Requires traffic", "Commission based", "Takes time to build"],
        link: "/passive/affiliate-marketing",
        isBeginnerFriendly: true,
      },
      {
        name: "Dividend Investing",
        icon: "📊",
        description: "Earn regular payments from stocks",
        upfrontWork: "5-10 hours",
        startupCost: "$500+",
        monthlyEarning: "4-8% annual returns",
        difficulty: "Medium",
        timeToPassive: "Immediately after investing",
        scalability: "High",
        steps: [
          "Open brokerage account",
          "Research dividend stocks",
          "Invest in dividend-paying companies",
          "Reinvest dividends for growth",
          "Monitor portfolio quarterly"
        ],
        platforms: ["Robinhood", "Vanguard", "Fidelity", "Schwab"],
        pros: ["Truly passive", "Compound growth", "Tax advantages"],
        cons: ["Capital required", "Market risk", "Research needed"],
        link: "/passive/dividend-investing",
        isBeginnerFriendly: false,
      },
      {
        name: "Print on Demand",
        icon: "👕",
        description: "Sell custom designs on products",
        upfrontWork: "10-40 hours",
        startupCost: "$0-50",
        monthlyEarning: "$200-5,000+",
        difficulty: "Easy",
        timeToPassive: "1-2 months",
        scalability: "Medium",
        steps: [
          "Create designs or use templates",
          "Choose products (t-shirts, mugs, posters)",
          "Set up store (Redbubble, Printful)",
          "Upload designs to products",
          "Promote your store"
        ],
        platforms: ["Redbubble", "Printful", "TeeSpring", "Merch by Amazon"],
        pros: ["No inventory", "No shipping", "Creative work", "Low risk"],
        cons: ["Lower margins", "Competitive", "Marketing needed"],
        link: "/passive/print-on-demand",
        isBeginnerFriendly: true,
      },
    ];
  }

  const beginnerFriendlyData = {
    title: t(tData?.beginnerFriendlyTitle, "🌱 Beginner-Friendly Passive Income"),
    methods: (tData?.beginnerFriendly || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default beginner-friendly methods if not in translation
  if (beginnerFriendlyData.methods.length === 0) {
    beginnerFriendlyData.methods = [
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn money back on purchases you already make",
        upfrontWork: "1-2 hours",
        startupCost: "$0",
        monthlyEarning: "$20-100",
        difficulty: "Easy",
        timeToPassive: "Immediate",
        scalability: "Low",
        steps: [
          "Download cashback apps",
          "Link credit/debit cards",
          "Shop through app or activate offers",
          "Earn cashback automatically"
        ],
        platforms: ["Rakuten", "Ibotta", "Fetch Rewards", "Dosh"],
        pros: ["Zero effort after setup", "Works on normal spending", "Easy to start"],
        cons: ["Low earnings", "Requires spending", "Limited by purchases"],
        link: "/passive/cashback-apps",
        isBeginnerFriendly: true,
      },
      {
        name: "High-Yield Savings",
        icon: "🏦",
        description: "Earn interest on your savings",
        upfrontWork: "1 hour",
        startupCost: "$100+",
        monthlyEarning: "4-5% APY",
        difficulty: "Easy",
        timeToPassive: "Immediate",
        scalability: "Medium",
        steps: [
          "Research high-yield savings accounts",
          "Open account online",
          "Deposit money",
          "Watch interest accrue automatically"
        ],
        platforms: ["Ally", "Marcus", "Synchrony", "Discover"],
        pros: ["FDIC insured", "No risk", "Completely passive", "Liquid"],
        cons: ["Low returns compared to investing", "Inflation risk"],
        link: "/passive/high-yield-savings",
        isBeginnerFriendly: true,
      },
    ];
  }

  const highEarningData = {
    title: t(tData?.highEarningTitle, "💎 Highest Earning Passive Income"),
    methods: (tData?.highEarning || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default high earning methods if not in translation
  if (highEarningData.methods.length === 0) {
    highEarningData.methods = [
      {
        name: "Real Estate Crowdfunding",
        icon: "🏠",
        description: "Invest in property without being a landlord",
        upfrontWork: "2-5 hours",
        startupCost: "$500+",
        monthlyEarning: "8-12% annual returns",
        difficulty: "Medium",
        timeToPassive: "Immediate after investing",
        scalability: "High",
        steps: [
          "Join real estate crowdfunding platform",
          "Review available properties",
          "Invest in properties",
          "Receive monthly dividends",
          "Reinvest or withdraw earnings"
        ],
        platforms: ["Fundrise", "CrowdStreet", "RealtyMogul"],
        pros: ["Real estate exposure", "Professional management", "Monthly dividends"],
        cons: ["Capital required", "Illiquid", "Fees"],
        link: "/passive/real-estate-crowdfunding",
        isBeginnerFriendly: false,
      },
      {
        name: "Create an Online Course",
        icon: "🎓",
        description: "Share your expertise and earn forever",
        upfrontWork: "40-100 hours",
        startupCost: "$0-500",
        monthlyEarning: "$1,000-50,000+",
        difficulty: "Hard",
        timeToPassive: "2-4 months",
        scalability: "High",
        steps: [
          "Identify a profitable topic",
          "Outline course curriculum",
          "Record video lessons",
          "Upload to course platform",
          "Market your course"
        ],
        platforms: ["Udemy", "Teachable", "Thinkific", "Kajabi"],
        pros: ["High margins", "Establish authority", "Scalable", "Global audience"],
        cons: ["Time-intensive to create", "Marketing required", "Competition"],
        link: "/passive/online-course",
        isBeginnerFriendly: false,
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Passive Income Methods"),
    description: t(tData?.comparison?.description, "Find the right passive income stream for your goals"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      method: t(item.method, item.method),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        method: "Digital Products",
        upfrontWork: "High",
        startupCost: "Low",
        monthlyPotential: "High",
        maintenance: "Low",
        scalability: "High",
      },
      {
        method: "Affiliate Marketing",
        upfrontWork: "Medium",
        startupCost: "Low",
        monthlyPotential: "High",
        maintenance: "Medium",
        scalability: "High",
      },
      {
        method: "Dividend Investing",
        upfrontWork: "Low",
        startupCost: "High",
        monthlyPotential: "Medium",
        maintenance: "Very Low",
        scalability: "High",
      },
      {
        method: "Print on Demand",
        upfrontWork: "Medium",
        startupCost: "Low",
        monthlyPotential: "Medium",
        maintenance: "Low",
        scalability: "Medium",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Passive Income Success Stories"),
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
        name: "Patricia L.",
        earnings: "$3,000/month",
        method: "Digital Products",
        story: "Created a budgeting spreadsheet template. Now earns $3k monthly with zero ongoing work!",
        timeToBuild: "3 months",
      },
      {
        name: "Brian K.",
        earnings: "$5,000/month",
        method: "Affiliate Marketing",
        story: "Built a review blog about outdoor gear. Took 6 months, now earns $5k/month passively.",
        timeToBuild: "6 months",
      },
      {
        name: "Lisa W.",
        earnings: "$2,500/month",
        method: "Print on Demand",
        story: "Designs funny t-shirts. After initial setup, earns $2.5k monthly while working full-time job.",
        timeToBuild: "2 months",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Passive Income Tips"),
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
        description: "Begin with one method, master it, then expand. Don't try to build everything at once.",
        icon: "🌱",
      },
      {
        title: "Focus on Quality",
        description: "High-quality products and content generate sustainable passive income longer.",
        icon: "⭐",
      },
      {
        title: "Reinvest Earnings",
        description: "Use your passive income to build additional streams for compounding growth.",
        icon: "🔄",
      },
      {
        title: "Be Patient",
        description: "Most passive income takes 3-6 months to build. Stay consistent and trust the process.",
        icon: "⏰",
      },
    ];
  }

  const passiveCalculatorData = {
    title: t(tData?.passiveCalculator?.title, "Calculate Your Passive Income Potential"),
    description: t(tData?.passiveCalculator?.description, "See how much you could earn with different passive income streams"),
    buttonText: t(tData?.passiveCalculator?.buttonText, "Try Calculator"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Passive Income Resources"),
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
        title: "How to Create Your First Digital Product",
        description: "Step-by-step guide from idea to first sale",
        readTime: "12 min",
        link: "/resource/create-digital-product",
      },
      {
        title: "Affiliate Marketing for Beginners",
        description: "Start earning commissions with zero products",
        readTime: "10 min",
        link: "/resource/affiliate-beginners",
      },
      {
        title: "Passive Income Tax Guide",
        description: "Understanding taxes on different income streams",
        readTime: "8 min",
        link: "/resource/passive-income-tax",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Passive Income Online FAQ - ${countryName}`),
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
        q: "How much money do I need to start passive income?",
        a: "It depends on the method. Digital products and affiliate marketing can start with $0. Investing requires capital - start with as little as $100."
      },
      {
        q: "How long until I see passive income?",
        a: "Some methods pay immediately (investing, savings). Others take 1-6 months to build (digital products, affiliate marketing)."
      },
      {
        q: "Is passive income really passive?",
        a: "Most methods require upfront work to create. Once established, they need minimal maintenance - a few hours per month."
      },
      {
        q: "What's the best passive income for beginners?",
        a: "Start with high-yield savings, cashback apps, or print on demand. These have low barriers to entry and minimal risk."
      },
      {
        q: "Can I quit my job with passive income?",
        a: "Yes, but it takes time. Most people need 1-3 years to build enough passive income to replace a full-time salary."
      },
      {
        q: "Do I need special skills?",
        a: "Not necessarily. Many methods use skills you already have. Others can be learned through free online resources."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Building Your Passive Income Today"),
    subtitle: t(tData?.final?.subtitle, "Choose a method, put in the upfront work, and watch your money grow while you sleep"),
    buttonText: t(tData?.final?.buttonText, "Explore Methods"),
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
              href="/passive-methods"
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
                      {category.methodCount}+ methods
                    </span>
                    <a
                      href={`/passive/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
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
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center p-6">
                    <div className="text-6xl">{method.icon}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        {method.name}
                      </h3>
                      {method.isBeginnerFriendly && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Beginner Friendly
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Upfront Work</p>
                        <p className="text-sm font-semibold">{method.upfrontWork}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Startup Cost</p>
                        <p className="text-sm font-semibold">{method.startupCost}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-3 text-center">
                      <p className="text-lg font-bold text-green-600">{method.monthlyEarning}</p>
                      <p className="text-xs text-gray-500">monthly potential</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        method.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                        method.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {method.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {method.timeToPassive}
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

      {/* Beginner Friendly Section */}
      {beginnerFriendlyData.methods.length > 0 && (
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
                  {beginnerFriendlyData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beginnerFriendlyData.methods.map((method, index) => (
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
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Monthly Potential</p>
                            <p className="text-sm font-semibold text-green-600">{method.monthlyEarning}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Time to Passive</p>
                            <p className="text-sm font-semibold">{method.timeToPassive}</p>
                          </div>
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

      {/* High Earning Section */}
      {highEarningData.methods.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="high-earning-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="high-earning-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {highEarningData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highEarningData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800"
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
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 mb-3 text-center">
                          <p className="text-xl font-bold text-purple-600">{method.monthlyEarning}</p>
                        </div>
                        <PrimaryCTA
                          href={method.link}
                          translationKey="learn_more"
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
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Method</th>
                      <th className="px-6 py-3 text-left">Upfront Work</th>
                      <th className="px-6 py-3 text-left">Startup Cost</th>
                      <th className="px-6 py-3 text-left">Monthly Potential</th>
                      <th className="px-6 py-3 text-left">Maintenance</th>
                      <th className="px-6 py-3 text-left">Scalability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.method}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.upfrontWork}</td>
                        <td className="px-6 py-4 text-gray-600">{item.startupCost}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">{item.monthlyPotential}</td>
                        <td className="px-6 py-4 text-gray-600">{item.maintenance}</td>
                        <td className="px-6 py-4 text-gray-600">{item.scalability}</td>
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
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
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
                      <p className="text-sm text-green-600 dark:text-green-400">
                        ${story.earnings} • {story.method}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Built in {story.timeToBuild}
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

      {/* Passive Calculator Section */}
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
              {passiveCalculatorData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {passiveCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/passive-calculator"
              translationKey={passiveCalculatorData.buttonText}
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
                  className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
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
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/passive-methods"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
