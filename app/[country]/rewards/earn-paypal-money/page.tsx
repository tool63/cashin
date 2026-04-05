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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Country Not Supported</h1>
          <p className="mt-2">Please check your region settings.</p>
        </div>
      </div>
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

  const title = t(tData?.seo?.title, "Earn PayPal Money - Get Free PayPal Gift Cards");
  const description = t(tData?.seo?.description, `Earn free PayPal money in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/rewards/earn-paypal-money`,
    title,
    description,
    type: "low",
  });

  // Hero Section Data
  const heroTitle = t(tData?.hero?.title, "Get Free PayPal Money");
  const heroSubtitle = t(
    tData?.hero?.subtitle,
    `Earn real PayPal cash by completing simple tasks. Sign up, play cool games, complete surveys or watch videos - and get paid via PayPal. Start earning today in ${countryName}!`
  );

  // Live Offers Data
  const liveOffersTitle = t(tData?.liveOffersTitle, "🔥 Live Earnings Feed");
  const liveOffers = tData?.liveOffers || [
    { platform: "PayPal", user: "Keziah", amount: 18, isPaypal: true, timestamp: "Just now" },
    { platform: "Stake", user: "MoDanU", amount: 5, timestamp: "2 min ago" },
    { platform: "PayPal", user: "Lexi B", amount: 3.75, isPaypal: true, timestamp: "5 min ago" },
  ];

  // PayPal Amounts Data
  const paypalAmounts = tData?.paypalAmounts || [
    { amount: 5, isPopular: true, bonus: "+$0.50" },
    { amount: 10, bonus: "+$1" },
    { amount: 25, bonus: "+$2.50" },
    { amount: 50, bonus: "+$5" },
    { amount: 100, bonus: "+$10" },
  ];

  // Earning Methods Data
  const earningMethodsTitle = t(tData?.earningMethodsTitle, "Discover Fun & Easy Ways To Earn PayPal");
  const earningMethods = tData?.earningMethods || [
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
  ];

  // Steps Data
  const stepsTitle = t(tData?.stepsTitle, "Get Free PayPal Gift Cards In 3 Simple Steps");
  const steps = tData?.steps || [
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
  ];

  // Activity Feed Data
  const activityFeedTitle = t(tData?.activityFeed?.title, "📡 Live Activity Feed");
  const activities = tData?.activityFeed?.activities || [
    { user: "Sarah_J", action: "completed survey", amount: 5, platform: "PayPal", timestamp: "Just now", avatar: "S" },
    { user: "Mike_T", action: "finished game level", amount: 15, platform: "PayPal", timestamp: "2 min ago", avatar: "M" },
  ];

  // User Reviews Data
  const userReviewsTitle = t(tData?.userReviewsTitle, "⭐ What Our Users Say");
  const userReviews = tData?.userReviews || [
    {
      name: "Renee",
      text: "I was skeptical at first, but almost 4 months of playing and I have earned so much free money!!!",
      rating: 5,
      achievement: "$100+ Earned",
      avatar: "R",
      date: "2 days ago",
    },
  ];

  // Tasks Data
  const tasksTitle = t(tData?.tasks?.title, "🎯 Featured High-Paying Tasks");
  const tasks = tData?.tasks?.tasks || [
    { title: "Chime", reward: "$400", action: "First Deposit", difficulty: "Medium", popular: true },
    { title: "Monopoly Go", reward: "$30", action: "Reach Board 26", difficulty: "Easy", popular: true },
  ];

  // Earnings Estimate Data
  const earningsEstimate = {
    timeMinutes: tData?.earningsEstimate?.timeMinutes || 240,
    platformEarnings: tData?.earningsEstimate?.platformEarnings || "$108.42",
    otherPlatformsEarnings: tData?.earningsEstimate?.otherPlatformsEarnings || "$40.08",
    disclaimer: tData?.earningsEstimate?.disclaimer || "Earnings depend on your location, activity, and offer availability.",
  };

  // FAQ Data
  const defaultFaqItems = [
    { question: "Can I withdraw PayPal balance to my bank account?", answer: "Yes! Once money is in your PayPal account, you can transfer it to your linked bank account for free." },
    { question: "Are there any fees for using PayPal?", answer: "Receiving money to PayPal is completely free." },
  ];
  
  const faqItemsSource = tData?.faq?.items || defaultFaqItems;
  const faqItems = faqItemsSource.map((item) => ({ 
    q: t(item.question, item.question), 
    a: t(item.answer, item.answer) 
  }));
  const faqTitle = t(tData?.faq?.title, `Earn PayPal Money FAQ - ${countryName}`);

  // Final CTA Data
  const finalTitle = t(tData?.final?.title, "Ready to Start Earning Free PayPal Money?");
  const finalSubtitle = t(tData?.final?.subtitle, "Join over 20 million users who already earn with us. Sign up free - no credit card required!");
  const finalButtonText = t(tData?.final?.buttonText, "Join Free & Start Earning 💙");

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
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
        <div className="absolute top-0 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Hero Section */}
      <CircleBorder>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">20M+ Active Users Worldwide</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
            <PrimaryCTA href="/signup" translationKey="start_earning" observer={true} />
          </div>
        </div>
      </CircleBorder>

      {/* Live Offers Ticker */}
      <CircleBorder>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto gap-2 pb-4">
              {liveOffers.map((offer, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className={`w-2 h-2 rounded-full ${offer.isPaypal ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                    <span className="font-medium text-sm">{offer.user}</span>
                    <span className="text-gray-500 text-xs">{offer.timestamp}</span>
                    <span className="font-bold text-green-600">+${offer.amount}</span>
                    <span className="text-xs text-gray-400">{offer.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">{liveOffersTitle}</p>
        </div>
      </CircleBorder>

      {/* PayPal Amounts Section */}
      <CircleBorder>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="relative bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Instant Withdrawals
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paypalAmounts.map((amount, index) => (
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
          </div>
        </div>
      </CircleBorder>

      {/* Earning Methods Section */}
      <CircleBorder>
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {earningMethodsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {earningMethods.map((method, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative p-6">
                  <div className="text-6xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{method.description}</p>
                  <PrimaryCTA href={method.link} translationKey="start_earning" observer={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CircleBorder>

      {/* Final CTA */}
      <CircleBorder>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center my-8 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          <div className="relative z-10">
            <div className="text-7xl mb-6 animate-bounce">💙</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">{finalTitle}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{finalSubtitle}</p>
            <PrimaryCTA href="/signup" translationKey={finalButtonText} observer={true} />
            <p className="text-sm text-white/70 mt-6">✓ No credit card required ✓ 100% free to join ✓ Instant payouts</p>
          </div>
        </div>
      </CircleBorder>
    </div>
  );
}
