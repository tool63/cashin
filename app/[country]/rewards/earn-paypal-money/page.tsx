// app/[country]/rewards/earn-paypal-money/page.tsx

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
  examples: Array<{
    title: string;
    reward: string;
    duration?: string;
    action?: string;
  }>;
  link: string;
}

interface PaypalAmount {
  amount: number;
  isPopular?: boolean;
}

interface UserReview {
  name: string;
  text: string;
  rating: number;
  achievement?: string;
}

interface LiveOffer {
  platform: string;
  user: string;
  amount: number;
  isPaypal?: boolean;
}

interface Task {
  title: string;
  reward: string;
  action?: string;
  platform?: string;
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
  liveOffersTitle?: string;
  liveOffers?: LiveOffer[];
  paypalAmounts?: PaypalAmount[];
  earningMethodsTitle?: string;
  earningMethods?: EarningMethod[];
  stepsTitle?: string;
  steps?: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  userReviewsTitle?: string;
  userReviews?: UserReview[];
  earningsEstimate?: {
    timeMinutes: number;
    freecashEarnings: string;
    otherPlatformsEarnings: string;
    disclaimer: string;
  };
  tasks?: {
    title: string;
    tasks: Task[];
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
    `earn paypal money ${lowerCountry}`,
    `free paypal money ${lowerCountry}`,
    `get paypal gift cards ${lowerCountry}`,
    `paypal cash rewards ${lowerCountry}`,
    `make money paypal ${lowerCountry}`,
    `free paypal cash ${lowerCountry}`,
    `earn paypal instantly ${lowerCountry}`,
    `paypal money online ${lowerCountry}`,
    `free paypal gift card ${lowerCountry}`,
    `get paid to paypal ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "free paypal money usa",
      "earn paypal usa",
      "paypal cash usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "free paypal money uk",
      "earn paypal uk",
      "paypal cash uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "free paypal money canada",
      "earn paypal canada",
      "paypal cash canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "free paypal money australia",
      "earn paypal australia",
      "paypal cash australia"
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
    translation = await loadSectionTranslation(language, "earn-paypal-money");
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
    `Earn PayPal Money - Get Free PayPal Gift Cards in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn free PayPal money in ${countryName}. Complete simple tasks, play games, take surveys, and get paid directly to your PayPal account. Start earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/rewards/earn-paypal-money`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/rewards/earn-paypal-money`,
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

export default async function EarnPaypalMoneyPage({
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
  const tData = await loadSectionTranslation(language, "earn-paypal-money");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn PayPal Money - Get Free PayPal Gift Cards`);
  const description = t(rawDescription, `Earn free PayPal money in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/rewards/earn-paypal-money`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Free PayPal Money"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Earn real PayPal cash by completing simple tasks. Sign up, play cool games, complete surveys or watch videos - and get paid via PayPal. Start earning today in ${countryName}!`
    ),
  };

  // Live offers data
  const liveOffersData = {
    title: t(tData?.liveOffersTitle, "Live Offers"),
    offers: tData?.liveOffers || [
      { platform: "PayPal", user: "Keziah", amount: 18, isPaypal: true },
      { platform: "Stake", user: "MoDanU", amount: 5 },
      { platform: "PayPal", user: "Lexi B", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "Madison Shanley", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "Beast44bg", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "bryanasloan35", amount: 95, isPaypal: true },
      { platform: "PayPal", user: "Xiaochen Wang", amount: 95, isPaypal: true },
      { platform: "PayPal", user: "kandiokaner96", amount: 3.75, isPaypal: true },
      { platform: "NaverPay", user: "RelevantChocolate", amount: 10000 },
      { platform: "Venmo", user: "Emma", amount: 3.75 },
      { platform: "PayPal", user: "SuperbCyan", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "Taz Drwenski", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "Michael Cwirko", amount: 48, isPaypal: true },
      { platform: "PayPal", user: "Nathan", amount: 3.75, isPaypal: true },
      { platform: "PayPal", user: "charleanatoney", amount: 3.75, isPaypal: true },
      { platform: "GooglePlay", user: "Jruiz03115", amount: 25 },
      { platform: "NaverPay", user: "승환", amount: 10000 },
    ],
  };

  // PayPal amounts for withdrawal
  const paypalAmountsData = {
    amounts: tData?.paypalAmounts || [
      { amount: 0 },
      { amount: 5, isPopular: true },
      { amount: 10 },
      { amount: 25 },
      { amount: 50 },
      { amount: 100 },
    ],
  };

  // Earning methods
  const earningMethodsData = {
    title: t(tData?.earningMethodsTitle, "Discover Fun & Easy Ways To Earn PayPal"),
    methods: tData?.earningMethods || [
      {
        name: "Play Games",
        icon: "🎮",
        description: "Get paid PayPal to play games! Select from our many fun gaming offers, complete the steps, and get paid.",
        examples: [
          { title: "Monopoly Go!", reward: "$10" },
          { title: "Uno", reward: "$10" },
          { title: "Premium", reward: "$215" },
        ],
        link: "/earn/play-games",
      },
      {
        name: "Answer Surveys",
        icon: "📋",
        description: "Share your opinion and earn PayPal cash. Complete paid surveys in just a few minutes.",
        examples: [
          { title: "Prime Video", reward: "$5", duration: "10 min" },
          { title: "Lego Magazine", reward: "$1.00", duration: "5 min" },
          { title: "Finanzguru", reward: "$10", duration: "15 min" },
          { title: "Woolsocks", reward: "$5", duration: "45 min" },
        ],
        link: "/earn/surveys",
      },
      {
        name: "Test Products",
        icon: "🔍",
        description: "Get paid via PayPal for signing up to new products and services. Review and earn!",
        examples: [
          { title: "Finanzguru", reward: "$10", action: "Sign up" },
          { title: "Lego Magazine", reward: "$1.00", action: "Sign up" },
          { title: "Prime Video", reward: "$3.50", action: "Sign up" },
          { title: "Woolsocks", reward: "$4.80", action: "Sign up" },
        ],
        link: "/earn/test-products",
      },
      {
        name: "Watch Videos",
        icon: "🎬",
        description: "Start earning toward your PayPal cashout now with paid video watching. Even while making dinner or waiting for the bus!",
        examples: [
          { title: "AdscendMedia" },
          { title: "Tapjoy" },
          { title: "Lootably" },
          { title: "MM Wall" },
          { title: "AdGate" },
        ],
        link: "/earn/watch-videos",
      },
    ],
  };

  // Steps to earn
  const stepsData = {
    title: t(tData?.stepsTitle, "Get Free PayPal Gift Cards In 3 Simple Steps"),
    steps: tData?.steps || [
      {
        step: 1,
        title: "Join Free",
        description: "Sign up in under 30 seconds. Log in instantly using Google or Facebook.",
      },
      {
        step: 2,
        title: "Complete Tasks",
        description: "Complete simple tasks like surveys, playing games, and watching videos. The more tasks you finish, the more you earn.",
      },
      {
        step: 3,
        title: "Withdraw to PayPal",
        description: "When you want to cash out, select PayPal and tell us how much you want. Get paid instantly!",
      },
    ],
  };

  // User reviews
  const userReviewsData = {
    title: t(tData?.userReviewsTitle, "Hear From Other Users Getting Free PayPal Gift Cards"),
    reviews: tData?.userReviews || [
      {
        name: "Renee",
        text: "I was skeptical at first, but almost 4 months of playing and I have earned so much free money!!! Love this and all the games it offers! I have cashed out Amazon and Google play gift cards as well as to my PayPal. All are legit, and I've never waited more than 5 minutes to receive my cash out.",
        rating: 5,
        achievement: "$100+ Earned",
      },
      {
        name: "cherryconatser",
        text: "This is a great pay to play game site. Tons of games to choose from. When you meet the criteria of the game, they 100% pay through many means like PayPal or your bank account. I've had nothing but good experiences.",
        rating: 5,
      },
      {
        name: "teairaj",
        text: "Quick earnings and deposits",
        rating: 4,
      },
      {
        name: "LO",
        text: "Big library of games to choose from, great way to earn a little extra cash. Fast and easy to withdrawal. I get my earnings sent to PayPal and receive it within only a few mins.",
        rating: 5,
      },
      {
        name: "Kristin Townsend",
        text: "I love freecash! It's super easy to navigate, earning money is a breeze and it gets send straight to my PayPal within minutes of me cashing out!",
        rating: 5,
      },
    ],
  };

  // Tasks section
  const tasksData = {
    title: t(tData?.tasks?.title, "Featured Tasks"),
    tasks: tData?.tasks?.tasks || [
      { title: "Dice Dreams", reward: "$0.00" },
      { title: "Animals & Coins", reward: "$50", action: "Reach lvl 135" },
      { title: "Coin Master", reward: "$0.00" },
      { title: "Solitaire Cash", reward: "$5", action: "Play 10 Cash Games" },
      { title: "TikTok", reward: "$10", action: "Install" },
      { title: "Audible", reward: "$5", action: "Sign Up" },
      { title: "Chime", reward: "$400", action: "First Deposit" },
      { title: "Coinbase", reward: "$20", action: "Create account" },
      { title: "Acorns", reward: "$20", action: "Create account" },
      { title: "Binance", reward: "$0.00" },
      { title: "Warhammer 40,000: Tactic", reward: "$5", action: "Reach Lvl 15" },
      { title: "Monopoly Go", reward: "$30", action: "Reach Board 26" },
      { title: "Capital One", reward: "$5", action: "Install Extension" },
      { title: "Raid Shadow Legends", reward: "$30", action: "Reach lvl 30" },
      { title: "Merge Inn", reward: "$5", action: "Reach lvl 20" },
      { title: "Call of Dragons", reward: "$5", action: "Reach lvl 3" },
      { title: "Guns of Glory", reward: "$10", action: "Reach lvl 20" },
      { title: "Rise of Kingdoms", reward: "$5", action: "Reach lvl 8" },
      { title: "Royal Match", reward: "$5", action: "Complete Bathroom" },
      { title: "Toon Blast", reward: "$1.00", action: "Download" },
      { title: "Revolut", reward: "$5", action: "Make one transaction" },
      { title: "2248", reward: "$5", action: "Reach Step 250" },
    ],
  };

  // Earnings estimate
  const earningsEstimateData = {
    timeMinutes: tData?.earningsEstimate?.timeMinutes || 240,
    freecashEarnings: tData?.earningsEstimate?.freecashEarnings || "$108.42",
    otherPlatformsEarnings: tData?.earningsEstimate?.otherPlatformsEarnings || "$40.08",
    disclaimer: tData?.earningsEstimate?.disclaimer || "Earnings depend on your location, activity, and offer availability.",
  };

  const faqData = {
    title: t(tData?.faq?.title, `Earn PayPal Money FAQ - ${countryName}`),
    items: (tData?.faq?.items || [
      {
        question: "Can I withdraw PayPal balance to my bank account?",
        answer: "Yes! Once money is in your PayPal account, you can transfer it to your linked bank account for free (1-3 business days) or instantly for a small fee."
      },
      {
        question: "Are there any fees for using PayPal?",
        answer: "Receiving money to PayPal is completely free. PayPal may charge fees for currency conversion or instant transfers to your bank."
      },
      {
        question: "Does PayPal balance expire?",
        answer: "No, your PayPal balance does not expire. It stays in your account until you withdraw or spend it."
      },
      {
        question: "How long will it take me to earn a PayPal gift card?",
        answer: "Most users earn their first $5-$10 within 1-2 hours. With consistent effort, many earn $100+ per month."
      },
      {
        question: "What will I need to sign up and start earning?",
        answer: "Just an email address or Google/Facebook account. No credit card or payment required to start."
      },
      {
        question: "Why is this withdrawal method not available for me?",
        answer: "PayPal availability depends on your region. Most countries support PayPal withdrawals, but minimum amounts may vary (typically $5-$20 for first withdrawal)."
      },
    ]).map((item) => ({
      q: t(item.question, item.question),
      a: t(item.answer, item.answer),
    })),
  };

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Free PayPal Money Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of users already getting paid via PayPal. Sign up free and start earning!"),
    buttonText: t(tData?.final?.buttonText, "Join Free & Earn PayPal"),
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
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-sm font-semibold">272,721+ reviews on Trustpilot</span>
              </div>
            </div>
            <PrimaryCTA
              href="/signup"
              translationKey="start_earning"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Live Offers Ticker Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-12"
            aria-labelledby="live-offers-heading"
          >
            <h2
              id="live-offers-heading"
              className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white"
            >
              {liveOffersData.title}
            </h2>
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {liveOffersData.offers.slice(0, 18).map((offer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <p className="text-xs text-gray-500">{offer.platform}</p>
                    <p className="font-semibold text-sm truncate">{offer.user}</p>
                    <p className="text-green-600 font-bold text-lg">${offer.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* PayPal Amounts Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-12"
            aria-labelledby="amounts-heading"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <span className="text-6xl">💙</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {paypalAmountsData.amounts.map((amount, index) => (
                  <div
                    key={index}
                    className={`bg-white dark:bg-gray-800 rounded-xl px-6 py-3 shadow-md min-w-[100px] text-center ${
                      amount.isPopular ? "ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    <p className="text-2xl font-bold text-blue-600">${amount.amount}</p>
                    <p className="text-xs text-gray-500">PayPal</p>
                    {amount.isPopular && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                        Popular
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Availability and redemption method depend on your region. Minimum cashout amount may vary.
              </p>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Earning Methods Section */}
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
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earningMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-center">
                    <div className="text-5xl mb-2">{method.icon}</div>
                    <h3 className="font-bold text-white text-xl">{method.name}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {method.examples.slice(0, 3).map((example, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
                          <span className="text-gray-700 dark:text-gray-300">{example.title}</span>
                          <div className="flex items-center gap-2">
                            {example.duration && <span className="text-xs text-gray-400">{example.duration}</span>}
                            {example.action && <span className="text-xs text-gray-400">{example.action}</span>}
                            <span className="font-semibold text-green-600">{example.reward}</span>
                          </div>
                        </div>
                      ))}
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

      {/* 3 Steps Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-8"
            aria-labelledby="steps-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="steps-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {stepsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stepsData.steps.map((step) => (
                <div
                  key={step.step}
                  className="text-center relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <PrimaryCTA
                href="/signup"
                translationKey="join_free_now"
                observer={true}
              />
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Tasks Section */}
      {tasksData.tasks.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="tasks-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="tasks-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {tasksData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {tasksData.tasks.slice(0, 24).map((task, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-sm truncate">{task.title}</p>
                    {task.action && <p className="text-xs text-gray-500 truncate">{task.action}</p>}
                    <p className="text-green-600 font-bold text-lg">+{task.reward}</p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Earnings Estimate Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="estimate-heading"
          >
            <h2
              id="estimate-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              See How Much You Can Earn
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="text-center flex-1">
                  <p className="text-3xl font-bold text-blue-600">{earningsEstimateData.timeMinutes} min</p>
                  <p className="text-sm text-gray-500">Time Invested</p>
                </div>
                <div className="text-4xl text-gray-300">⚡</div>
                <div className="text-center flex-1">
                  <p className="text-3xl font-bold text-green-600">{earningsEstimateData.freecashEarnings}</p>
                  <p className="text-sm text-gray-500">Platform Earnings</p>
                </div>
              </div>
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Other Reward Platforms</span>
                  <span className="font-semibold">{earningsEstimateData.otherPlatformsEarnings}</span>
                </div>
                <p className="text-xs text-gray-400 mt-4">{earningsEstimateData.disclaimer}</p>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* User Reviews Section */}
      {userReviewsData.reviews.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-8"
              aria-labelledby="reviews-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="reviews-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {userReviewsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userReviewsData.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-4">
                      "{review.text}"
                    </p>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                      {review.achievement && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {review.achievement}
                        </span>
                      )}
                    </div>
                  </div>
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
