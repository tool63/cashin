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
  gradient: string;
  stats: string;
}

interface PaypalAmount {
  amount: number;
  isPopular?: boolean;
  bonus?: string;
}

interface UserReview {
  name: string;
  text: string;
  rating: number;
  achievement?: string;
  avatar?: string;
  date?: string;
}

interface LiveOffer {
  platform: string;
  user: string;
  amount: number;
  isPaypal?: boolean;
  timestamp?: string;
}

interface Task {
  title: string;
  reward: string;
  action?: string;
  platform?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  popular?: boolean;
}

interface ActivityItem {
  user: string;
  action: string;
  amount: number;
  platform: string;
  timestamp: string;
  avatar?: string;
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
    icon: string;
  }>;
  userReviewsTitle?: string;
  userReviews?: UserReview[];
  earningsEstimate?: {
    timeMinutes: number;
    platformEarnings: string;
    otherPlatformsEarnings: string;
    disclaimer: string;
  };
  tasks?: {
    title: string;
    tasks: Task[];
  };
  activityFeed?: {
    title: string;
    activities: ActivityItem[];
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

const replacePlaceholders = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

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
    baseKeywords.push("free paypal money usa", "earn paypal usa", "paypal cash usa");
  } else if (countryCode === "gb") {
    baseKeywords.push("free paypal money uk", "earn paypal uk", "paypal cash uk");
  } else if (countryCode === "ca") {
    baseKeywords.push("free paypal money canada", "earn paypal canada", "paypal cash canada");
  } else if (countryCode === "au") {
    baseKeywords.push("free paypal money australia", "earn paypal australia", "paypal cash australia");
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

  const tData = await loadSectionTranslation(language, "earn-paypal-money");

  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

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

  const heroData = {
    title: t(tData?.hero?.title, "Get Free PayPal Money"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Earn real PayPal cash by completing simple tasks. Sign up, play cool games, complete surveys or watch videos - and get paid via PayPal. Start earning today in ${countryName}!`
    ),
  };

  const liveOffersData = {
    title: t(tData?.liveOffersTitle, "🔥 Live Earnings Feed"),
    offers: tData?.liveOffers || [
      { platform: "PayPal", user: "Keziah", amount: 18, isPaypal: true, timestamp: "Just now" },
      { platform: "Stake", user: "MoDanU", amount: 5, timestamp: "2 min ago" },
      { platform: "PayPal", user: "Lexi B", amount: 3.75, isPaypal: true, timestamp: "5 min ago" },
      { platform: "PayPal", user: "Madison Shanley", amount: 3.75, isPaypal: true, timestamp: "8 min ago" },
      { platform: "PayPal", user: "bryanasloan35", amount: 95, isPaypal: true, timestamp: "12 min ago" },
      { platform: "PayPal", user: "Xiaochen Wang", amount: 95, isPaypal: true, timestamp: "15 min ago" },
      { platform: "Venmo", user: "Emma", amount: 3.75, timestamp: "20 min ago" },
      { platform: "PayPal", user: "Michael Cwirko", amount: 48, isPaypal: true, timestamp: "25 min ago" },
      { platform: "GooglePlay", user: "Jruiz03115", amount: 25, timestamp: "32 min ago" },
    ],
  };

  const paypalAmountsData = {
    amounts: tData?.paypalAmounts || [
      { amount: 5, isPopular: true, bonus: "+$0.50" },
      { amount: 10, bonus: "+$1" },
      { amount: 25, bonus: "+$2.50" },
      { amount: 50, bonus: "+$5" },
      { amount: 100, bonus: "+$10" },
    ],
  };

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
        gradient: "from-green-500 to-emerald-600",
        stats: "1,234 active players",
      },
      {
        name: "Answer Surveys",
        icon: "📋",
        description: "Share your opinion and earn PayPal cash. Complete paid surveys in just a few minutes.",
        examples: [
          { title: "Prime Video", reward: "$5", duration: "10 min" },
          { title: "Lego Magazine", reward: "$1.00", duration: "5 min" },
          { title: "Finanzguru", reward: "$10", duration: "15 min" },
        ],
        link: "/earn/surveys",
        gradient: "from-blue-500 to-indigo-600",
        stats: "5,678 surveys completed today",
      },
      {
        name: "Test Products",
        icon: "🔍",
        description: "Get paid via PayPal for signing up to new products and services. Review and earn!",
        examples: [
          { title: "Finanzguru", reward: "$10", action: "Sign up" },
          { title: "Prime Video", reward: "$3.50", action: "Sign up" },
          { title: "Woolsocks", reward: "$4.80", action: "Sign up" },
        ],
        link: "/earn/test-products",
        gradient: "from-purple-500 to-pink-600",
        stats: "$12,345 paid this week",
      },
      {
        name: "Watch Videos",
        icon: "🎬",
        description: "Start earning toward your PayPal cashout now with paid video watching.",
        examples: [
          { title: "AdscendMedia" },
          { title: "Tapjoy" },
          { title: "Lootably" },
        ],
        link: "/earn/watch-videos",
        gradient: "from-orange-500 to-red-600",
        stats: "1M+ videos watched",
      },
    ],
  };

  const stepsData = {
    title: t(tData?.stepsTitle, "Get Free PayPal Gift Cards In 3 Simple Steps"),
    steps: tData?.steps || [
      {
        step: 1,
        title: "Join Free",
        description: "Sign up in under 30 seconds. Log in instantly using Google or Facebook.",
        icon: "🚀",
      },
      {
        step: 2,
        title: "Complete Tasks",
        description: "Complete simple tasks like surveys, playing games, and watching videos.",
        icon: "✅",
      },
      {
        step: 3,
        title: "Withdraw to PayPal",
        description: "When you want to cash out, select PayPal and get paid instantly!",
        icon: "💙",
      },
    ],
  };

  const activityFeedData = {
    title: t(tData?.activityFeed?.title, "📡 Live Activity Feed"),
    activities: tData?.activityFeed?.activities || [
      { user: "Sarah_J", action: "completed survey", amount: 5, platform: "PayPal", timestamp: "Just now", avatar: "S" },
      { user: "Mike_T", action: "finished game level", amount: 15, platform: "PayPal", timestamp: "2 min ago", avatar: "M" },
      { user: "Emma_W", action: "tested product", amount: 10, platform: "PayPal", timestamp: "5 min ago", avatar: "E" },
      { user: "David_L", action: "watched videos", amount: 3, platform: "PayPal", timestamp: "8 min ago", avatar: "D" },
      { user: "Lisa_K", action: "completed offer", amount: 25, platform: "PayPal", timestamp: "12 min ago", avatar: "L" },
    ],
  };

  const userReviewsData = {
    title: t(tData?.userReviewsTitle, "⭐ What Our Users Say"),
    reviews: tData?.userReviews || [
      {
        name: "Renee",
        text: "I was skeptical at first, but almost 4 months of playing and I have earned so much free money!!! All are legit, and I've never waited more than 5 minutes to receive my cash out.",
        rating: 5,
        achievement: "$100+ Earned",
        avatar: "R",
        date: "2 days ago",
      },
      {
        name: "cherryconatser",
        text: "This is a great pay to play game site. Tons of games to choose from. When you meet the criteria, they 100% pay through many means like PayPal.",
        rating: 5,
        avatar: "C",
        date: "1 week ago",
      },
      {
        name: "Kristin Townsend",
        text: "I love freecash! It's super easy to navigate, earning money is a breeze and it gets send straight to my PayPal within minutes!",
        rating: 5,
        achievement: "Top Earner",
        avatar: "K",
        date: "3 days ago",
      },
    ],
  };

  const tasksData = {
    title: t(tData?.tasks?.title, "🎯 Featured High-Paying Tasks"),
    tasks: tData?.tasks?.tasks || [
      { title: "Chime", reward: "$400", action: "First Deposit", difficulty: "Medium", popular: true },
      { title: "Monopoly Go", reward: "$30", action: "Reach Board 26", difficulty: "Easy", popular: true },
      { title: "Raid Shadow Legends", reward: "$30", action: "Reach lvl 30", difficulty: "Medium" },
      { title: "Animals & Coins", reward: "$50", action: "Reach lvl 135", difficulty: "Hard" },
      { title: "Coinbase", reward: "$20", action: "Create account", difficulty: "Easy" },
      { title: "Acorns", reward: "$20", action: "Create account", difficulty: "Easy" },
      { title: "TikTok", reward: "$10", action: "Install", difficulty: "Easy" },
      { title: "Capital One", reward: "$5", action: "Install Extension", difficulty: "Easy" },
    ],
  };

  const earningsEstimateData = {
    timeMinutes: tData?.earningsEstimate?.timeMinutes || 240,
    platformEarnings: tData?.earningsEstimate?.platformEarnings || "$108.42",
    otherPlatformsEarnings: tData?.earningsEstimate?.otherPlatformsEarnings || "$40.08",
    disclaimer: tData?.earningsEstimate?.disclaimer || "Earnings depend on your location, activity, and offer availability.",
  };

  const faqData = {
    title: t(tData?.faq?.title, `Earn PayPal Money FAQ - ${countryName}`),
    items: (tData?.faq?.items || [
      { question: "Can I withdraw PayPal balance to my bank account?", answer: "Yes! Once money is in your PayPal account, you can transfer it to your linked bank account for free (1-3 business days) or instantly for a small fee." },
      { question: "Are there any fees for using PayPal?", answer: "Receiving money to PayPal is completely free. PayPal may charge fees for currency conversion or instant transfers to your bank." },
      { question: "How long will it take me to earn a PayPal gift card?", answer: "Most users earn their first $5-$10 within 1-2 hours. With consistent effort, many earn $100+ per month." },
      { question: "What will I need to sign up and start earning?", answer: "Just an email address or Google/Facebook account. No credit card or payment required to start." },
      { question: "Is this available in my country?", answer: "Yes! Our platform is available in over 130 countries worldwide. Minimum withdrawal amounts may vary by region." },
    ]).map((item) => ({ q: t(item.question, item.question), a: t(item.answer, item.answer) })),
  };

  const finalData = {
    title: t(tData?.final?.title, "Ready to Start Earning Free PayPal Money?"),
    subtitle: t(tData?.final?.subtitle, "Join over 20 million users who already earn with us. Sign up free - no credit card required!"),
    buttonText: t(tData?.final?.buttonText, "Join Free & Start Earning 💙"),
  };

  // JSX Return
  return (
    <main className="flex flex-col items-center w-full overflow-x-hidden">
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 rounded-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">20M+ Active Users Worldwide</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {heroData.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {heroData.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-sm font-semibold">Trustpilot 4.7 ★</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
                  <span className="text-blue-600 text-xl">⚡</span>
                  <span className="text-sm font-semibold">Instant Payouts</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
                  <span className="text-purple-600 text-xl">💰</span>
                  <span className="text-sm font-semibold">$10M+ Paid Monthly</span>
                </div>
              </div>
              <PrimaryCTA href="/signup" translationKey="start_earning" observer={true} />
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* Live Offers Ticker */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
              <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-4 scrollbar-hide">
                {[...liveOffersData.offers, ...liveOffersData.offers].map((offer, idx) => (
                  <div key={idx} className="inline-block mx-2 flex-shrink-0">
                    <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className={`w-2 h-2 rounded-full ${offer.isPaypal ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                      <span className="font-medium text-sm">{offer.user}</span>
                      <span className="text-gray-500 text-xs">{offer.timestamp || `${Math.floor(Math.random() * 30) + 1} min ago`}</span>
                      <span className="font-bold text-green-600">+${offer.amount}</span>
                      <span className="text-xs text-gray-400">{offer.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">{liveOffersData.title}</p>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* PayPal Amounts Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="relative bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Instant Withdrawals
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <div className="text-7xl filter drop-shadow-lg">💙</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {paypalAmountsData.amounts.map((amount, index) => (
                  <div
                    key={index}
                    className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                      amount.isPopular ? "ring-2 ring-yellow-400 shadow-lg" : ""
                    }`}
                  >
                    {amount.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-0.5 rounded-full">Popular</span>
                      </div>
                    )}
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${amount.amount}</p>
                    <p className="text-xs text-gray-500 mt-1">PayPal</p>
                    {amount.bonus && <p className="text-xs text-green-500 font-semibold mt-1">{amount.bonus} bonus</p>}
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-6">*Minimum cashout: $5. Instant delivery to your PayPal account.</p>
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* Earning Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {earningMethodsData.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
              <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">Choose from multiple earning methods - all verified, all paying real cash to PayPal</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {earningMethodsData.methods.map((method, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative p-6">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{method.description}</p>
                    <div className="space-y-2 mb-4">
                      {method.examples.slice(0, 3).map((example, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                          <span className="text-gray-700 dark:text-gray-300">{example.title}</span>
                          <div className="flex items-center gap-2">
                            {example.duration && <span className="text-xs text-gray-400">{example.duration}</span>}
                            <span className="font-bold text-green-600">{example.reward}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xs text-gray-500">{method.stats}</span>
                      <PrimaryCTA href={method.link} translationKey="start_earning" observer={false} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* 3 Steps Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl my-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stepsData.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {stepsData.steps.map((step) => (
                <div key={step.step} className="relative text-center group">
                  <div className="relative z-10 w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse opacity-75" />
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                  </div>
                  <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform duration-300 inline-block">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <PrimaryCTA href="/signup" translationKey="join_free_now" observer={true} />
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* Live Activity Feed */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{activityFeedData.title}</h2>
              <p className="text-gray-500">Real-time earnings from our community</p>
            </div>
            <div className="space-y-3">
              {activityFeedData.activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1 border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+${activity.amount}</p>
                      <p className="text-xs text-gray-400">{activity.platform}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Tasks Grid */}
      {tasksData.tasks.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{tasksData.title}</h2>
                <p className="text-gray-500">Complete these tasks and get paid instantly</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {tasksData.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  >
                    {task.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">🔥 Popular</div>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{task.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                        task.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {task.difficulty || "Easy"}
                      </span>
                    </div>
                    {task.action && <p className="text-xs text-gray-500 mb-2">{task.action}</p>}
                    <p className="text-2xl font-bold text-green-600">+{task.reward}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Earnings Estimate */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">How Much Can You Earn?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full mb-12" />
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <p className="text-5xl font-bold">{earningsEstimateData.timeMinutes}</p>
                  <p className="text-sm opacity-80 mt-2">Minutes Invested</p>
                </div>
                <div className="text-center border-l border-r border-white/20">
                  <p className="text-5xl font-bold">{earningsEstimateData.platformEarnings}</p>
                  <p className="text-sm opacity-80 mt-2">Our Platform Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold line-through opacity-60">{earningsEstimateData.otherPlatformsEarnings}</p>
                  <p className="text-sm opacity-80 mt-2">Other Platforms</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-xs opacity-70">{earningsEstimateData.disclaimer}</p>
              </div>
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>

      {/* User Reviews */}
      {userReviewsData.reviews.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{userReviewsData.title}</h2>
                <p className="text-gray-500">Join 20M+ satisfied users worldwide</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userReviewsData.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500 text-lg" : "text-gray-300 text-lg"}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{review.text}"</p>
                    <div className="flex justify-between items-center border-t pt-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      {review.achievement && (
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                          {review.achievement}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
              </div>
              <FAQ title={faqData.title} faqs={faqData.items} />
            </div>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Final CTA */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center my-8 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-bounce">💙</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">{finalData.title}</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{finalData.subtitle}</p>
              <PrimaryCTA href="/signup" translationKey={finalData.buttonText} observer={true} />
              <p className="text-sm text-white/70 mt-6">✓ No credit card required ✓ 100% free to join ✓ Instant payouts</p>
            </div>
          </div>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
