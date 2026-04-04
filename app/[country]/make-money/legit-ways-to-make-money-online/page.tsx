// app/[country]/(marketing)/legit-ways-to-make-money-online/page.tsx

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

interface LegitMethod {
  name: string;
  icon: string;
  description: string;
  earningPotential: string;
  timeToStart: string;
  difficulty: "Easy" | "Medium" | "Hard";
  redFlags: string[];
  verificationSteps: string[];
  platforms: string[];
  tips: string[];
  link: string;
  isVerified?: boolean;
  isBeginnerFriendly?: boolean;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  methodCount: number;
  scamRisk: "Low" | "Medium" | "High";
}

interface ScamAlert {
  title: string;
  description: string;
  redFlags: string[];
  icon: string;
}

interface ComparisonItem {
  method: string;
  legitimacy: string;
  earningPotential: string;
  timeToEarn: string;
  scamRisk: string;
}

interface SuccessStory {
  name: string;
  earnings: string;
  method: string;
  story: string;
  verificationNote: string;
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
  verifiedMethodsTitle?: string;
  verifiedMethods?: LegitMethod[];
  scamAlertsTitle?: string;
  scamAlerts?: ScamAlert[];
  redFlagsTitle?: string;
  redFlags?: string[];
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
  verificationTool?: {
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
    `legit ways to make money online ${lowerCountry}`,
    `legitimate online jobs ${lowerCountry}`,
    `real online earning methods ${lowerCountry}`,
    `trusted ways to earn online ${lowerCountry}`,
    `verified online income ${lowerCountry}`,
    `legit work from home ${lowerCountry}`,
    `safe online earning ${lowerCountry}`,
    `genuine online opportunities ${lowerCountry}`,
    `legitimate side hustles ${lowerCountry}`,
    `proven online money makers ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "legit online jobs usa",
      "real work from home usa",
      "trusted earning methods usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "legit online jobs uk",
      "real work from home uk",
      "trusted earning methods uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "legit online jobs canada",
      "real work from home canada",
      "trusted earning methods canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "legit online jobs australia",
      "real work from home australia",
      "trusted earning methods australia"
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
    translation = await loadSectionTranslation(language, "legit-ways-to-make-money-online");
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
    `Legit Ways to Make Money Online - Trusted Methods in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover legit ways to make money online in ${countryName}. Verified platforms, scam-free opportunities, and trusted earning methods. Start earning safely with our expert-vetted recommendations.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/legit-ways-to-make-money-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/legit-ways-to-make-money-online`,
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

export default async function LegitWaysToMakeMoneyOnlinePage({
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
  const tData = await loadSectionTranslation(language, "legit-ways-to-make-money-online");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Legit Ways to Make Money Online - Trusted Methods`);
  const description = t(rawDescription, `Discover legit ways to make money online in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/legit-ways-to-make-money-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Legit Ways to Make Money Online"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Don't waste time on scams! Discover legitimate, proven ways to earn money online in ${countryName}. We've verified every method - so you can start earning safely and confidently.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Legitimate Earning Categories"),
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
        description: "Sell your skills on trusted platforms",
        methodCount: 25,
        scamRisk: "Low",
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Small tasks, guaranteed payment",
        methodCount: 18,
        scamRisk: "Low",
      },
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for your opinions",
        methodCount: 15,
        scamRisk: "Low",
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Earn on everyday purchases",
        methodCount: 20,
        scamRisk: "Low",
      },
      {
        name: "Virtual Assistant",
        icon: "📋",
        description: "Support businesses remotely",
        methodCount: 12,
        scamRisk: "Low",
      },
      {
        name: "User Testing",
        icon: "📱",
        description: "Test websites and apps",
        methodCount: 10,
        scamRisk: "Low",
      },
    ];
  }

  const verifiedMethodsData = {
    title: t(tData?.verifiedMethodsTitle, "✅ Verified Legitimate Earning Methods"),
    methods: (tData?.verifiedMethods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default verified methods if not in translation
  if (verifiedMethodsData.methods.length === 0) {
    verifiedMethodsData.methods = [
      {
        name: "Upwork",
        icon: "🌐",
        description: "World's largest freelance marketplace - fully vetted clients",
        earningPotential: "$20-100/hour",
        timeToStart: "1-2 days",
        difficulty: "Medium",
        redFlags: ["Never work without a contract", "Don't accept off-platform payments", "Watch for fake check scams"],
        verificationSteps: ["Complete profile", "Add portfolio", "Take skill tests", "Start with small jobs"],
        platforms: ["Upwork.com"],
        tips: ["Build reputation with smaller jobs first", "Always use Upwork's payment protection", "Communicate through platform"],
        link: "/legit/upwork",
        isVerified: true,
        isBeginnerFriendly: false,
      },
      {
        name: "Swagbucks",
        icon: "💰",
        description: "Earn points for surveys, shopping, videos - millions of paid users",
        earningPotential: "$50-200/month",
        timeToStart: "5 minutes",
        difficulty: "Easy",
        redFlags: ["Never pay to join", "Avoid offers that seem too good", "Don't share sensitive info"],
        verificationSteps: ["Create free account", "Complete profile", "Start with simple tasks", "Build up slowly"],
        platforms: ["Swagbucks.com", "iOS", "Android"],
        tips: ["Complete daily goals for bonuses", "Use the shopping portal", "Watch videos passively"],
        link: "/legit/swagbucks",
        isVerified: true,
        isBeginnerFriendly: true,
      },
      {
        name: "UserTesting",
        icon: "📱",
        description: "Get paid to test websites and apps - legitimate company",
        earningPotential: "$10-60/test",
        timeToStart: "1-2 hours",
        difficulty: "Easy",
        redFlags: ["Never pay to become a tester", "Avoid sites asking for bank access", "Watch for fake test invites"],
        verificationSteps: ["Sign up free", "Complete sample test", "Verify payment info", "Start testing"],
        platforms: ["UserTesting.com"],
        tips: ["Speak your thoughts continuously", "Complete profile thoroughly", "Apply quickly when tests appear"],
        link: "/legit/usertesting",
        isVerified: true,
        isBeginnerFriendly: true,
      },
      {
        name: "Rakuten",
        icon: "🛍️",
        description: "Legitimate cashback on shopping - formerly Ebates",
        earningPotential: "$50-500+/year",
        timeToStart: "2 minutes",
        difficulty: "Easy",
        redFlags: ["Never pay to join", "Avoid 'too good to be true' rates", "Watch for fake cashback sites"],
        verificationSteps: ["Create free account", "Install browser extension", "Shop normally", "Get paid quarterly"],
        platforms: ["Rakuten.com", "iOS", "Android"],
        tips: ["Install browser extension", "Stack with coupons", "Refer friends for bonus"],
        link: "/legit/rakuten",
        isVerified: true,
        isBeginnerFriendly: true,
      },
    ];
  }

  const scamAlertsData = {
    title: t(tData?.scamAlertsTitle, "🚨 Common Online Scams to Avoid"),
    alerts: (tData?.scamAlerts || []).map((alert) => ({
      ...alert,
      title: t(alert.title, alert.title),
      description: t(alert.description, alert.description),
    })),
  };

  // Default scam alerts if not in translation
  if (scamAlertsData.alerts.length === 0) {
    scamAlertsData.alerts = [
      {
        title: "Pyramid Schemes",
        description: "Promises high returns for recruiting others, not selling products",
        redFlags: ["Focus on recruitment", "Upfront payment required", "Get rich quick promises"],
        icon: "🔺",
      },
      {
        title: "Fake Check Scams",
        description: "You receive a check, deposit it, then send money back",
        redFlags: ["Overpayment for services", "Buy gift cards", "Urgent requests"],
        icon: "💵",
      },
      {
        title: "Work-from-Home Job Scams",
        description: "Jobs that require upfront payment for training or materials",
        redFlags: ["Pay to start", "Buy training materials", "No legitimate company info"],
        icon: "🏠",
      },
      {
        title: "Phishing Attempts",
        description: "Fake emails pretending to be from legitimate platforms",
        redFlags: ["Suspicious links", "Urgent action required", "Requests for password"],
        icon: "🎣",
      },
    ];
  }

  const redFlagsData = {
    title: t(tData?.redFlagsTitle, "⚠️ 10 Red Flags That Signal a Scam"),
    flags: (tData?.redFlags || []).map((flag) => t(flag, flag)),
  };

  // Default red flags if not in translation
  if (redFlagsData.flags.length === 0) {
    redFlagsData.flags = [
      "They ask you to pay money to start working",
      "The pay seems too good to be true (e.g., $5,000/week for simple tasks)",
      "They promise guaranteed income with no effort",
      "They request your bank login information",
      "They want you to buy gift cards as part of the job",
      "The website has poor grammar and spelling",
      "They pressure you to act immediately",
      "No legitimate company information or physical address",
      "They contact you unsolicited via email or text",
      "They ask for your Social Security number before hiring",
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "📊 Compare Legit Earning Methods"),
    description: t(tData?.comparison?.description, "Find the safest and most reliable method for your situation"),
    items: (tData?.comparison?.items || []).map((item) => ({
      ...item,
      method: t(item.method, item.method),
    })),
  };

  // Default comparison items if not in translation
  if (!comparisonData.items || comparisonData.items.length === 0) {
    comparisonData.items = [
      {
        method: "Upwork",
        legitimacy: "High",
        earningPotential: "$20-100/hour",
        timeToEarn: "Days",
        scamRisk: "Low",
      },
      {
        method: "Swagbucks",
        legitimacy: "High",
        earningPotential: "$50-200/month",
        timeToEarn: "Hours",
        scamRisk: "Very Low",
      },
      {
        method: "UserTesting",
        legitimacy: "High",
        earningPotential: "$10-60/test",
        timeToEarn: "Hours",
        scamRisk: "Very Low",
      },
      {
        method: "Rakuten",
        legitimacy: "High",
        earningPotential: "$50-500+/year",
        timeToEarn: "Days",
        scamRisk: "Very Low",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Real Success Stories (Verified)"),
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
        name: "Michael R.",
        earnings: "$3,200",
        method: "Upwork",
        story: "Started freelancing on Upwork with zero experience. Within 3 months, I earned $3,200 from legit clients.",
        verificationNote: "Verified payment proof",
      },
      {
        name: "Jennifer L.",
        earnings: "$450",
        method: "Swagbucks",
        story: "Used Swagbucks during my commute. Earned $450 in gift cards last year - completely legit!",
        verificationNote: "Verified user reviews",
      },
      {
        name: "David P.",
        earnings: "$280",
        method: "UserTesting",
        story: "Tested 15 websites last month. Got paid $280 via PayPal - no scams, no issues.",
        verificationNote: "Payment verified",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "💡 How to Spot Legit Opportunities"),
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
        title: "Research Before Joining",
        description: "Search for reviews on Trustpilot, Reddit, and BBB before signing up.",
        icon: "🔍",
      },
      {
        title: "Never Pay to Work",
        description: "Legitimate opportunities never ask for upfront payment. This is the #1 red flag.",
        icon: "💰",
      },
      {
        title: "Check Payment Proof",
        description: "Look for payment screenshots from real users on social media and forums.",
        icon: "📸",
      },
      {
        title: "Trust Your Gut",
        description: "If something feels wrong, it probably is. Don't ignore your instincts.",
        icon: "💭",
      },
    ];
  }

  const verificationToolData = {
    title: t(tData?.verificationTool?.title, "Verify Any Online Opportunity"),
    description: t(tData?.verificationTool?.description, "Use our free tool to check if a website or opportunity is legitimate"),
    buttonText: t(tData?.verificationTool?.buttonText, "Check Now"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Safety Resources"),
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
        title: "How to Research a Company",
        description: "Step-by-step guide to vetting online opportunities",
        readTime: "8 min",
        link: "/resource/research-company",
      },
      {
        title: "Report a Scam",
        description: "Where to report fraudulent online schemes",
        readTime: "5 min",
        link: "/resource/report-scam",
      },
      {
        title: "FTC Guide on Online Scams",
        description: "Official government resource for scam prevention",
        readTime: "10 min",
        link: "/resource/ftc-guide",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Legit Ways to Make Money Online FAQ - ${countryName}`),
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
        q: "How can I tell if an online earning opportunity is legitimate?",
        a: "Legitimate opportunities never ask for upfront payment. Research the company, read reviews on Trustpilot and Reddit, check for payment proof, and verify they have a physical address and contact information."
      },
      {
        q: "What are the most common online scams?",
        a: "Pyramid schemes, fake check scams, work-from-home job scams requiring upfront payment, phishing emails, and 'get rich quick' schemes are the most common."
      },
      {
        q: "Can I really make money online without any investment?",
        a: "Yes! Many legitimate methods require zero investment: online surveys, micro tasks, cashback apps, user testing, and freelancing platforms are all free to join."
      },
      {
        q: "How much can I legitimately earn online?",
        a: "Beginners earn $100-500/month part-time. Skilled freelancers earn $2,000-10,000+/month. Success depends on your skills, time investment, and consistency."
      },
      {
        q: "What should I do if I've been scammed?",
        a: "Report to your bank immediately, file a complaint with the FTC (usa.gov), report to the platform where you found the scam, and warn others on social media."
      },
      {
        q: "Are the methods on this page truly verified?",
        a: "Yes! We only recommend platforms we've personally tested or that have thousands of positive verified user reviews and proven payment histories."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Safely Today"),
    subtitle: t(tData?.final?.subtitle, "Choose a verified method and start earning legitimate income online - no scams, no risks, just real opportunities"),
    buttonText: t(tData?.final?.buttonText, "Get Started Safely"),
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
              href="/legit-methods"
              translationKey="explore_safe_methods"
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
                    <span className={`text-xs px-2 py-1 rounded ${
                      category.scamRisk === "Low" ? "bg-green-100 text-green-700" :
                      category.scamRisk === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {category.scamRisk} risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Verified Methods Section */}
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
                {verifiedMethodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verifiedMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{method.icon}</div>
                      <h3 className="font-bold text-white text-xl">{method.name}</h3>
                    </div>
                    {method.isVerified && (
                      <span className="bg-white text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                        ✓ Verified
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
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 mb-3">
                      <p className="text-xs font-semibold text-red-600 mb-1">⚠️ Red Flags to Avoid:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {method.redFlags.slice(0, 2).map((flag, idx) => (
                          <li key={idx}>• {flag}</li>
                        ))}
                      </ul>
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

      {/* Scam Alerts Section */}
      {scamAlertsData.alerts.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="alerts-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="alerts-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {scamAlertsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {scamAlertsData.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{alert.icon}</div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {alert.description}
                      </p>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
                        <p className="text-xs font-semibold text-red-600 mb-1">Red Flags:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {alert.redFlags.slice(0, 2).map((flag, idx) => (
                            <li key={idx}>• {flag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Red Flags Section */}
      {redFlagsData.flags.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="flags-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="flags-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {redFlagsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {redFlagsData.flags.map((flag, index) => (
                  <div key={index} className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{flag}</span>
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
                      <th className="px-6 py-3 text-left">Legitimacy</th>
                      <th className="px-6 py-3 text-left">Earning Potential</th>
                      <th className="px-6 py-3 text-left">Time to Earn</th>
                      <th className="px-6 py-3 text-left">Scam Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.method}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-semibold">{item.legitimacy}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.earningPotential}</td>
                        <td className="px-6 py-4 text-gray-600">{item.timeToEarn}</td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-semibold">{item.scamRisk}</span>
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
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
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
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
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
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-xs text-green-600">{story.verificationNote}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Earned ${story.earnings} • {story.method}
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

      {/* Verification Tool Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="verify-heading"
          >
            <h2
              id="verify-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {verificationToolData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {verificationToolData.description}
            </p>
            <PrimaryCTA
              href="/verify-opportunity"
              translationKey={verificationToolData.buttonText}
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
              href="/legit-methods"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
