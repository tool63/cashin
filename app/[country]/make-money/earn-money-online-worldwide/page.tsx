// app/[country]/(marketing)/earn-money-online-worldwide/page.tsx

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

interface GlobalPlatform {
  name: string;
  icon: string;
  description: string;
  availableCountries: string[];
  earningMethods: string[];
  earningPotential: string;
  payoutMethods: string[];
  minimumPayout: string;
  rating: number;
  steps: string[];
  tips: string[];
  link: string;
  isFeatured?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  platformCount: number;
}

interface CountrySpecific {
  country: string;
  platforms: string[];
  earningPotential: string;
  popularMethods: string[];
  flag: string;
}

interface ComparisonItem {
  platform: string;
  globalAvailability: string;
  earningPotential: string;
  payoutMethods: string;
  easeOfUse: string;
}

interface SuccessStory {
  name: string;
  country: string;
  earnings: string;
  platform: string;
  story: string;
  flag: string;
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
  globalPlatformsTitle?: string;
  globalPlatforms?: GlobalPlatform[];
  countrySpecificTitle?: string;
  countrySpecific?: CountrySpecific[];
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
    `earn money online worldwide ${lowerCountry}`,
    `global earning platforms ${lowerCountry}`,
    `international online jobs ${lowerCountry}`,
    `work online from anywhere ${lowerCountry}`,
    `worldwide earning opportunities ${lowerCountry}`,
    `global freelance platforms ${lowerCountry}`,
    `earn money internationally ${lowerCountry}`,
    `remote work worldwide ${lowerCountry}`,
    `online jobs for all countries ${lowerCountry}`,
    `global side hustles ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "international earning usa",
      "global remote jobs usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "international earning uk",
      "global remote jobs uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "international earning canada",
      "global remote jobs canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "international earning australia",
      "global remote jobs australia"
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
    translation = await loadSectionTranslation(language, "earn-money-online-worldwide");
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
    `Earn Money Online Worldwide - Global Earning Opportunities from ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover worldwide online earning opportunities available from ${countryName}. Global platforms that accept international users. Start earning money online no matter where you live.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/earn-money-online-worldwide`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/earn-money-online-worldwide`,
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

export default async function EarnMoneyOnlineWorldwidePage({
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
  const tData = await loadSectionTranslation(language, "earn-money-online-worldwide");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Online Worldwide - Global Earning Opportunities`);
  const description = t(rawDescription, `Discover worldwide online earning opportunities available from ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/earn-money-online-worldwide`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Money Online Worldwide"),
    subtitle: t(
      tData?.hero?.subtitle,
      `No matter where you live in ${countryName}, you can earn money online! Discover global platforms that accept international users. From freelancing to microtasks - start earning worldwide today.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Global Earning Categories"),
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
        description: "Sell skills to global clients",
        platformCount: 25,
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Small tasks for worldwide platforms",
        platformCount: 18,
      },
      {
        name: "Content Creation",
        icon: "📹",
        description: "Monetize content globally",
        platformCount: 15,
      },
      {
        name: "Online Teaching",
        icon: "🎓",
        description: "Teach students worldwide",
        platformCount: 12,
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Support businesses globally",
        platformCount: 20,
      },
      {
        name: "Translation",
        icon: "🌐",
        description: "Translate for global clients",
        platformCount: 10,
      },
    ];
  }

  const globalPlatformsData = {
    title: t(tData?.globalPlatformsTitle, "🌍 Best Global Earning Platforms"),
    platforms: (tData?.globalPlatforms || []).map((platform) => ({
      ...platform,
      name: t(platform.name, platform.name),
      description: t(platform.description, platform.description),
    })),
  };

  // Default global platforms if not in translation
  if (globalPlatformsData.platforms.length === 0) {
    globalPlatformsData.platforms = [
      {
        name: "Upwork",
        icon: "🌐",
        description: "World's largest freelance marketplace - available in over 180 countries",
        availableCountries: ["USA", "UK", "Canada", "Australia", "India", "Philippines", "180+ countries"],
        earningMethods: ["Freelancing", "Contract Work", "Hourly Projects"],
        earningPotential: "$20-100/hour",
        payoutMethods: ["PayPal", "Wire Transfer", "Payoneer", "Direct Deposit"],
        minimumPayout: "$10",
        rating: 4.5,
        steps: [
          "Create a free Upwork account",
          "Complete your profile with skills",
          "Browse available jobs worldwide",
          "Submit proposals to clients",
          "Get paid upon completion"
        ],
        tips: [
          "Start with smaller projects to build reputation",
          "Complete your profile 100%",
          "Take skill tests to stand out",
          "Respond quickly to client messages"
        ],
        link: "/worldwide/upwork",
        isFeatured: true,
      },
      {
        name: "Fiverr",
        icon: "🎯",
        description: "Sell digital services starting at $5 - global marketplace",
        availableCountries: ["Worldwide - 160+ countries"],
        earningMethods: ["Gig Selling", "Digital Services", "Custom Offers"],
        earningPotential: "$10-500/gig",
        payoutMethods: ["PayPal", "Fiverr Revenue Card", "Direct Deposit"],
        minimumPayout: "$10",
        rating: 4.4,
        steps: [
          "Sign up for Fiverr",
          "Create your first gig",
          "Set your pricing",
          "Promote your services",
          "Get paid when orders complete"
        ],
        tips: [
          "Create multiple gigs for different services",
          "Use attractive gig images",
          "Respond to messages within 24 hours",
          "Deliver high-quality work"
        ],
        link: "/worldwide/fiverr",
        isFeatured: true,
      },
      {
        name: "Appen",
        icon: "📱",
        description: "Global microtask and data annotation platform",
        availableCountries: ["130+ countries worldwide"],
        earningMethods: ["Micro Tasks", "Data Annotation", "Search Evaluation"],
        earningPotential: "$10-20/hour",
        payoutMethods: ["PayPal", "Payoneer", "Direct Deposit"],
        minimumPayout: "$10",
        rating: 4.3,
        steps: [
          "Apply on Appen website",
          "Complete qualification tests",
          "Choose available projects",
          "Complete tasks accurately",
          "Get paid monthly"
        ],
        tips: [
          "Apply for multiple projects",
          "Be consistent with quality",
          "Complete training thoroughly",
          "Check for new projects regularly"
        ],
        link: "/worldwide/appen",
        isFeatured: false,
      },
      {
        name: "Clickworker",
        icon: "✅",
        description: "Global microtask platform - available internationally",
        availableCountries: ["130+ countries"],
        earningMethods: ["Micro Tasks", "Text Creation", "Data Entry", "Surveys"],
        earningPotential: "$5-15/hour",
        payoutMethods: ["PayPal", "Payoneer"],
        minimumPayout: "$5",
        rating: 4.2,
        steps: [
          "Register on Clickworker",
          "Complete profile and assessments",
          "Browse available tasks",
          "Complete tasks accurately",
          "Withdraw earnings weekly"
        ],
        tips: [
          "Complete all assessments for better tasks",
          "Check for new tasks daily",
          "Focus on higher-paying jobs",
          "Maintain high quality rating"
        ],
        link: "/worldwide/clickworker",
        isFeatured: false,
      },
    ];
  }

  const countrySpecificData = {
    title: t(tData?.countrySpecificTitle, "📍 Earning Opportunities by Region"),
    countries: (tData?.countrySpecific || []).map((item) => ({
      ...item,
      country: t(item.country, item.country),
    })),
  };

  // Default country-specific data if not in translation
  if (countrySpecificData.countries.length === 0) {
    countrySpecificData.countries = [
      {
        country: "United States",
        platforms: ["Upwork", "Fiverr", "Appen", "Clickworker", "Amazon MTurk"],
        earningPotential: "$500-3000/month",
        popularMethods: ["Freelancing", "Micro Tasks", "Online Surveys"],
        flag: "🇺🇸",
      },
      {
        country: "United Kingdom",
        platforms: ["Upwork", "Fiverr", "Appen", "Clickworker", "PeoplePerHour"],
        earningPotential: "$400-2500/month",
        popularMethods: ["Freelancing", "Virtual Assistant", "Online Teaching"],
        flag: "🇬🇧",
      },
      {
        country: "India",
        platforms: ["Upwork", "Fiverr", "Appen", "Clickworker", "Truelancer"],
        earningPotential: "$200-1500/month",
        popularMethods: ["Freelancing", "Data Entry", "Virtual Assistant"],
        flag: "🇮🇳",
      },
      {
        country: "Philippines",
        platforms: ["Upwork", "Fiverr", "Appen", "OnlineJobs.ph"],
        earningPotential: "$300-2000/month",
        popularMethods: ["Virtual Assistant", "Freelancing", "Customer Support"],
        flag: "🇵🇭",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Global Platforms"),
    description: t(tData?.comparison?.description, "Find the best platform for your location and skills"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      platform: t(item.platform, item.platform),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        platform: "Upwork",
        globalAvailability: "180+ countries",
        earningPotential: "$20-100/hour",
        payoutMethods: "PayPal, Payoneer, Wire",
        easeOfUse: "Medium",
      },
      {
        platform: "Fiverr",
        globalAvailability: "160+ countries",
        earningPotential: "$10-500/gig",
        payoutMethods: "PayPal, Direct Deposit",
        easeOfUse: "Easy",
      },
      {
        platform: "Appen",
        globalAvailability: "130+ countries",
        earningPotential: "$10-20/hour",
        payoutMethods: "PayPal, Payoneer",
        easeOfUse: "Easy",
      },
      {
        platform: "Clickworker",
        globalAvailability: "130+ countries",
        earningPotential: "$5-15/hour",
        payoutMethods: "PayPal, Payoneer",
        easeOfUse: "Very Easy",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Global Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      country: t(story.country, story.country),
      story: t(story.story, story.story),
      platform: t(story.platform, story.platform),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Miguel R.",
        country: "Mexico",
        earnings: "$2,500",
        platform: "Upwork",
        story: "Started freelancing on Upwork from Mexico. Now earning $2,500/month working with US clients.",
        flag: "🇲🇽",
      },
      {
        name: "Priya K.",
        country: "India",
        earnings: "$1,800",
        platform: "Fiverr",
        story: "Sell graphic design services on Fiverr to clients worldwide. Made $1,800 last month!",
        flag: "🇮🇳",
      },
      {
        name: "John M.",
        country: "Kenya",
        earnings: "$1,200",
        platform: "Appen",
        story: "Working on Appen microtasks from Kenya. Earn $1,200/month consistently.",
        flag: "🇰🇪",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 Tips for Global Online Earning"),
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
        title: "Build a Strong Profile",
        description: "Complete your profile 100% with skills, experience, and portfolio samples.",
        icon: "📝",
      },
      {
        title: "Learn Global Payment Methods",
        description: "Set up PayPal, Payoneer, or Wise to receive international payments easily.",
        icon: "💰",
      },
      {
        title: "Work in Your Time Zone",
        description: "Find clients and tasks that match your available hours.",
        icon: "⏰",
      },
      {
        title: "Build Your Reputation",
        description: "Positive reviews help you earn more and attract better clients.",
        icon: "⭐",
      },
    ];
  }

  const earningsCalculatorData = {
    title: t(tData?.earningsCalculator?.title, "Calculate Your Global Earning Potential"),
    description: t(tData?.earningsCalculator?.description, "See how much you could earn based on your country and skills"),
    buttonText: t(tData?.earningsCalculator?.buttonText, "Try Calculator"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Global Earning Resources"),
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
        title: "How to Receive International Payments",
        description: "Guide to PayPal, Payoneer, and Wise",
        readTime: "8 min",
        link: "/resource/international-payments",
      },
      {
        title: "Freelancing for Non-Native English Speakers",
        description: "Tips for success in global marketplaces",
        readTime: "10 min",
        link: "/resource/freelancing-non-native",
      },
      {
        title: "Avoiding Global Scams",
        description: "How to identify legitimate worldwide opportunities",
        readTime: "6 min",
        link: "/resource/global-scams",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money Online Worldwide FAQ - ${countryName}`),
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
        q: "Can I really earn money online from any country?",
        a: "Yes! Many global platforms accept users from 130+ countries. While some platforms are region-restricted, there are plenty of worldwide opportunities available."
      },
      {
        q: "How do I receive international payments?",
        a: "Most global platforms use PayPal, Payoneer, or Wise. These services allow you to receive payments in multiple currencies and withdraw to your local bank."
      },
      {
        q: "Which platform is best for beginners worldwide?",
        a: "Fiverr and Clickworker are great for beginners - they're easy to use and available in most countries. Start with small tasks to build confidence."
      },
      {
        q: "Do I need to speak perfect English?",
        a: "Not necessarily. Many tasks require basic English only. Some platforms also offer work in Spanish, French, German, and other languages."
      },
      {
        q: "How much can I earn from developing countries?",
        a: "Earnings vary, but many earn $200-1500/month working part-time. Full-time freelancers can earn $2000-5000+ depending on skills and clients."
      },
      {
        q: "Are these platforms safe and legitimate?",
        a: "Yes, we only recommend established platforms with millions of users worldwide and proven payment histories. Always read platform policies before starting."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Worldwide Today"),
    subtitle: t(tData?.final?.subtitle, `No matter where you live in ${countryName}, there's an online earning opportunity waiting for you`),
    buttonText: t(tData?.final?.buttonText, "Explore Global Platforms"),
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
              href="/worldwide-platforms"
              translationKey="explore_platforms"
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
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
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
                      href={`/worldwide/${category.name.toLowerCase().replace(/ /g, '-')}`}
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

      {/* Global Platforms Section */}
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
                {globalPlatformsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {globalPlatformsData.platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
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
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 mb-3">
                      <p className="text-sm font-semibold text-blue-600">🌍 Available in {platform.availableCountries.join(", ")}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Earning Potential</p>
                        <p className="text-sm font-bold text-green-600">{platform.earningPotential}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Min. Payout</p>
                        <p className="text-sm font-semibold">{platform.minimumPayout}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {platform.payoutMethods.slice(0, 2).map((method, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {method}
                        </span>
                      ))}
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

      {/* Country Specific Section */}
      {countrySpecificData.countries.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="country-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="country-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {countrySpecificData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {countrySpecificData.countries.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{item.flag}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.country}
                      </h3>
                      <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2 mb-3">
                        <p className="text-sm font-bold text-green-600">{item.earningPotential}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Popular Platforms:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {item.platforms.slice(0, 3).map((platform, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Popular Methods:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {item.popularMethods.map((method, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {method}
                            </span>
                          ))}
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Platform</th>
                      <th className="px-6 py-3 text-left">Global Availability</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
                      <th className="px-6 py-3 text-left">Payout Methods</th>
                      <th className="px-6 py-3 text-left">Ease of Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.platform}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.globalAvailability}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">{item.earningPotential}</td>
                        <td className="px-6 py-4 text-gray-600">{item.payoutMethods}</td>
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
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">{story.flag}</span>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                        <p className="text-xs text-gray-500">{story.country}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        💰 ${story.earnings}/month • {story.platform}
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
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
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
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {earningsCalculatorData.description}
            </p>
            <PrimaryCTA
              href="/global-earnings-calculator"
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
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
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/worldwide-platforms"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
