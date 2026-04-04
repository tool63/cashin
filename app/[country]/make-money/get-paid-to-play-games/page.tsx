// app/[country]/(marketing)/get-paid-to-play-games/page.tsx

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

interface GamingApp {
  name: string;
  logo: string;
  platform: string;
  signupBonus: string;
  earnings: string;
  description: string;
  payoutMethods: string[];
  requirements: string[];
  link: string;
}

interface Game {
  name: string;
  icon: string;
  genre: string;
  earnings: string;
  difficulty: string;
  timeToReward: string;
  platforms: string[];
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface Tournament {
  name: string;
  game: string;
  entryFee: string;
  prizePool: string;
  participants: string;
  nextStart: string;
  link: string;
}

interface SuccessStory {
  name: string;
  age: number;
  location: string;
  earnings: string;
  story: string;
  favoriteGames: string[];
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
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  gameCategoriesTitle?: string;
  gameCategories?: Array<{
    name: string;
    icon: string;
    description: string;
    gameCount: number;
  }>;
  topAppsTitle?: string;
  topApps?: GamingApp[];
  popularGamesTitle?: string;
  popularGames?: Game[];
  tipsTitle?: string;
  tips?: Tip[];
  tournamentsTitle?: string;
  tournaments?: Tournament[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    apps?: Array<{
      name: string;
      easeOfUse: number;
      earningRate: number;
      gameVariety: number;
      payoutSpeed: number;
    }>;
  };
  earningStrategiesTitle?: string;
  earningStrategies?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  newsletterTitle?: string;
  newsletter?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    placeholder?: string;
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
    `get paid to play games ${lowerCountry}`,
    `play games earn money ${lowerCountry}`,
    `gaming apps that pay ${lowerCountry}`,
    `earn money playing games ${lowerCountry}`,
    `paid to play games ${lowerCountry}`,
    `game apps that pay real money ${lowerCountry}`,
    `mobile gaming rewards ${lowerCountry}`,
    `play and earn games ${lowerCountry}`,
    `gaming rewards apps ${lowerCountry}`,
    `best game apps for money ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "game apps that pay usa",
      "american gaming rewards",
      "paid games usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "game apps that pay uk",
      "british gaming rewards",
      "paid games uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "game apps that pay canada",
      "canadian gaming rewards",
      "paid games canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "game apps that pay australia",
      "australian gaming rewards",
      "paid games australia"
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
    translation = await loadSectionTranslation(language, "get-paid-to-play-games");
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
    `Get Paid to Play Games in ${countryName} - Best Gaming Apps That Pay | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover the best apps that pay you to play games in ${countryName}. Earn real money, gift cards, and rewards while playing mobile games. Start gaming and earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/get-paid-to-play-games`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/get-paid-to-play-games`,
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

export default async function GetPaidToPlayGamesPage({
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
  const tData = await loadSectionTranslation(language, "get-paid-to-play-games");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Get Paid to Play Games in ${countryName}`);
  const description = t(rawDescription, `Discover the best apps that pay you to play games in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/get-paid-to-play-games`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Paid to Play Games"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Turn your gaming passion into real money! Discover the best apps that pay you to play mobile games in ${countryName}. Earn cash, gift cards, and rewards while having fun.`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Gaming Rewards by the Numbers"),
    stats: (tData?.stats || []).map((stat) => ({
      ...stat,
      value: t(stat.value, stat.value),
      label: t(stat.label, stat.label),
      description: t(stat.description, stat.description),
    })),
  };

  // Default stats if not in translation
  if (statsData.stats.length === 0) {
    statsData.stats = [
      {
        value: "50M+",
        label: "Gamers",
        description: "Earning rewards worldwide",
      },
      {
        value: "$500M+",
        label: "Paid Out",
        description: "To mobile gamers",
      },
      {
        value: "2-5 hrs",
        label: "Average Play",
        description: "To earn $50/month",
      },
      {
        value: "100+",
        label: "Games",
        description: "That pay real rewards",
      },
    ];
  }

  const gameCategoriesData = {
    title: t(tData?.gameCategoriesTitle, "Game Categories That Pay"),
    categories: (tData?.gameCategories || []).map((category) => ({
      ...category,
      name: t(category.name, category.name),
      description: t(category.description, category.description),
    })),
  };

  // Default game categories if not in translation
  if (gameCategoriesData.categories.length === 0) {
    gameCategoriesData.categories = [
      {
        name: "Skill-Based Games",
        icon: "🎯",
        description: "Compete and win based on your skill level",
        gameCount: 45,
      },
      {
        name: "Match 3 & Puzzle",
        icon: "🧩",
        description: "Relaxing puzzle games that reward progress",
        gameCount: 120,
      },
      {
        name: "Strategy & RPG",
        icon: "⚔️",
        description: "Build, battle, and earn as you advance",
        gameCount: 65,
      },
      {
        name: "Casino & Slots",
        icon: "🎰",
        description: "Free-to-play casino games with real rewards",
        gameCount: 80,
      },
      {
        name: "Arcade & Action",
        icon: "🎮",
        description: "Fast-paced games with quick rewards",
        gameCount: 95,
      },
      {
        name: "Trivia & Quiz",
        icon: "❓",
        description: "Test your knowledge and win prizes",
        gameCount: 40,
      },
    ];
  }

  const topAppsData = {
    title: t(tData?.topAppsTitle, "Best Apps That Pay You to Play"),
    apps: (tData?.topApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default top apps if not in translation
  if (topAppsData.apps.length === 0) {
    topAppsData.apps = [
      {
        name: "Mistplay",
        logo: "🎮",
        platform: "Android",
        signupBonus: "0",
        earnings: "$20-150/month",
        description: "Play mobile games and earn points redeemable for gift cards. One of the most popular gaming rewards apps.",
        payoutMethods: ["Amazon", "Visa", "PayPal", "Xbox", "Google Play"],
        requirements: ["Android phone", "Age 13+", "Internet connection"],
        link: "/mistplay",
      },
      {
        name: "Swagbucks",
        logo: "🎯",
        platform: "iOS, Android, Web",
        signupBonus: "$10",
        earnings: "$30-300/month",
        description: "Complete offers, play games, and earn SB points redeemable for cash and gift cards.",
        payoutMethods: ["PayPal", "Amazon", "Visa", "Target", "Walmart"],
        requirements: ["Email address", "Time to play"],
        link: "/swagbucks",
      },
      {
        name: "Lucktastic",
        logo: "🍀",
        platform: "iOS, Android",
        signupBonus: "0",
        earnings: "$10-100/month",
        description: "Free scratch-off lottery tickets and games. Win real cash and gift cards daily.",
        payoutMethods: ["PayPal", "Amazon", "Visa"],
        requirements: ["Smartphone", "Daily play"],
        link: "/lucktastic",
      },
      {
        name: "Skillz",
        logo: "⚡",
        platform: "iOS, Android",
        signupBonus: "$5",
        earnings: "$100-1,000+/month",
        description: "Compete in skill-based games for real money. Higher skill = higher earnings.",
        payoutMethods: ["PayPal", "Check"],
        requirements: ["Skill", "Practice", "Competitive mindset"],
        link: "/skillz",
      },
      {
        name: "Cash'em All",
        logo: "💰",
        platform: "Android",
        signupBonus: "$1",
        earnings: "$15-100/month",
        description: "Play games, reach levels, and earn cash rewards. Simple and straightforward.",
        payoutMethods: ["PayPal", "Amazon"],
        requirements: ["Android phone", "Patience"],
        link: "/cashem-all",
      },
      {
        name: "InboxDollars",
        logo: "📧",
        platform: "iOS, Android, Web",
        signupBonus: "$5",
        earnings: "$30-200/month",
        description: "Play games, take surveys, and complete offers for cash rewards.",
        payoutMethods: ["Check", "PayPal", "Gift Cards"],
        requirements: ["Email address", "US only"],
        link: "/inboxdollars",
      },
    ];
  }

  const popularGamesData = {
    title: t(tData?.popularGamesTitle, "Popular Pay-to-Play Games"),
    games: (tData?.popularGames || []).map((game) => ({
      ...game,
      name: t(game.name, game.name),
      genre: t(game.genre, game.genre),
    })),
  };

  // Default popular games if not in translation
  if (popularGamesData.games.length === 0) {
    popularGamesData.games = [
      {
        name: "Solitaire Cube",
        icon: "🃏",
        genre: "Card Game",
        earnings: "$5-50/day",
        difficulty: "Medium",
        timeToReward: "Minutes",
        platforms: ["Skillz"],
      },
      {
        name: "Blackout Bingo",
        icon: "🎲",
        genre: "Bingo",
        earnings: "$10-100/day",
        difficulty: "Easy",
        timeToReward: "Minutes",
        platforms: ["Skillz"],
      },
      {
        name: "Mistplay Hub Games",
        icon: "🎮",
        genre: "Various",
        earnings: "$20-150/month",
        difficulty: "Easy",
        timeToReward: "Hours",
        platforms: ["Mistplay"],
      },
      {
        name: "Swagbucks Live",
        icon: "❓",
        genre: "Trivia",
        earnings: "$5-50/week",
        difficulty: "Medium",
        timeToReward: "Daily",
        platforms: ["Swagbucks"],
      },
      {
        name: "8 Ball Pool",
        icon: "🎱",
        genre: "Sports",
        earnings: "$10-200/month",
        difficulty: "Medium",
        timeToReward: "Minutes",
        platforms: ["Miniclip", "Skillz"],
      },
      {
        name: "Words With Friends",
        icon: "📝",
        genre: "Word Game",
        earnings: "$5-50/month",
        difficulty: "Easy",
        timeToReward: "Minutes",
        platforms: ["Zynga"],
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips to Maximize Your Gaming Earnings"),
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
        title: "Use Multiple Apps",
        description: "Don't rely on just one app. Use 3-5 different gaming apps to maximize your earnings.",
        icon: "📚",
      },
      {
        title: "Play Daily",
        description: "Many apps offer daily bonuses and streak rewards. Log in and play every day.",
        icon: "📅",
      },
      {
        title: "Focus on Higher Paying Games",
        description: "Some games pay better than others. Focus your time on the most rewarding ones.",
        icon: "🎯",
      },
      {
        title: "Complete Achievements",
        description: "Many games offer bonus rewards for reaching certain levels or achievements.",
        icon: "🏆",
      },
      {
        title: "Invite Friends",
        description: "Referral bonuses can significantly boost your earnings with minimal effort.",
        icon: "👥",
      },
      {
        title: "Watch for Double Reward Events",
        description: "Many apps offer special events with double points or bonus rewards.",
        icon: "⚡",
      },
    ];
  }

  const tournamentsData = {
    title: t(tData?.tournamentsTitle, "Upcoming Gaming Tournaments"),
    tournaments: (tData?.tournaments || []).map((tournament) => ({
      ...tournament,
      name: t(tournament.name, tournament.name),
      game: t(tournament.game, tournament.game),
    })),
  };

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Gamer Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      location: t(story.location, story.location),
      story: t(story.story, story.story),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Alex",
        age: 24,
        location: "Texas",
        earnings: "$450/month",
        story: "I play games during my commute and lunch breaks. It pays for my Netflix and gaming subscriptions every month!",
        favoriteGames: ["Mistplay", "Solitaire Cube"],
      },
      {
        name: "Taylor",
        age: 31,
        location: "Florida",
        earnings: "$800/month",
        story: "Competitive gaming on Skillz has become my main side hustle. I practice 2 hours daily and earn consistently.",
        favoriteGames: ["Blackout Bingo", "8 Ball Pool"],
      },
      {
        name: "Jordan",
        age: 19,
        location: "California",
        earnings: "$300/month",
        story: "I use multiple gaming apps while watching TV. It adds up to extra spending money without much effort.",
        favoriteGames: ["Swagbucks Live", "Lucktastic"],
      },
    ];
  }

  const earningStrategiesData = {
    title: t(tData?.earningStrategiesTitle, "Earning Strategies"),
    strategies: (tData?.earningStrategies || []).map((strategy) => ({
      ...strategy,
      title: t(strategy.title, strategy.title),
      description: t(strategy.description, strategy.description),
    })),
  };

  // Default earning strategies if not in translation
  if (earningStrategiesData.strategies.length === 0) {
    earningStrategiesData.strategies = [
      {
        title: "Casual Gaming",
        description: "Play puzzle and match games during downtime. Low effort, steady rewards.",
        icon: "🎮",
      },
      {
        title: "Competitive Gaming",
        description: "Master skill-based games for higher payouts. More effort = more money.",
        icon: "⚔️",
      },
      {
        title: "Multi-App Approach",
        description: "Use 5+ apps simultaneously. Switch between them to maximize time.",
        icon: "📱",
      },
      {
        title: "Tournament Focus",
        description: "Enter paid tournaments with high prize pools. Higher risk, higher reward.",
        icon: "🏆",
      },
    ];
  }

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Gaming Reward Alerts"),
    subtitle: t(tData?.newsletter?.subtitle, "Subscribe for weekly updates on new paying games and bonus opportunities"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Get Paid to Play Games FAQ - ${countryName}`),
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
        q: "Can I really get paid to play games?",
        a: "Yes! Many legitimate apps pay you real money and gift cards for playing mobile games. It's not a get-rich-quick scheme, but you can earn extra cash in your spare time.",
      },
      {
        q: "How much can I earn playing games?",
        a: "Most people earn $20-150/month casually. Dedicated gamers can earn $300-1,000+ by mastering skill-based competitive games.",
      },
      {
        q: "Do I need to invest money to start?",
        a: "No! All the apps we recommend are free to download and play. Avoid any app that asks for upfront payment.",
      },
      {
        q: "Which games pay the most?",
        a: "Skill-based competitive games on platforms like Skillz offer the highest earning potential. Casual reward apps like Mistplay offer steady but lower earnings.",
      },
      {
        q: "How do I get paid?",
        a: "Most apps pay via PayPal, gift cards (Amazon, Walmart, Target, Google Play), or direct bank transfer. Minimum payout thresholds vary by app.",
      },
      {
        q: "Are these apps available worldwide?",
        a: "Most are available in the US, UK, Canada, and Australia. Some have international options. Check each app's availability.",
      },
      {
        q: "Do I need special skills?",
        a: "For casual games, no. For competitive games, practice and skill development helps you earn more.",
      },
      {
        q: "How long until I get paid?",
        a: "Casual apps pay within days to weeks. Competitive platforms pay instantly or within a few days after tournament wins.",
      },
      {
        q: "Can I play on iPhone and Android?",
        a: "Most apps work on both. Some are Android-only. Check app requirements before downloading.",
      },
      {
        q: "Is this safe for kids?",
        a: "Most apps require users to be 13+. Some competitive gaming apps require 18+. Always check age requirements.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Getting Paid to Play Games Today"),
    subtitle: t(tData?.final?.subtitle, "Join millions of gamers already earning real money while having fun"),
    buttonText: t(tData?.final?.buttonText, "Start Gaming Now"),
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
              href="/gaming-apps"
              translationKey="start_playing"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="stats-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="stats-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {statsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Game Categories Section */}
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
                {gameCategoriesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {gameCategoriesData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.gameCount}+ games
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Apps Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="apps-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="apps-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topAppsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topAppsData.apps.map((app, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{app.logo}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {app.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {app.platform}
                        </p>
                      </div>
                    </div>
                    {app.signupBonus !== "0" && (
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold">
                        Bonus: ${app.signupBonus}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {app.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Potential:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {app.earnings}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payout: {app.payoutMethods.slice(0, 3).join(", ")}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={app.link}
                    translationKey="download_app"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Popular Games Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="games-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="games-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {popularGamesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularGamesData.games.map((game, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-4xl">{game.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {game.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {game.genre}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Earnings:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {game.earnings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                      <span className="text-gray-700 dark:text-gray-300">{game.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Time to Reward:</span>
                      <span className="text-gray-700 dark:text-gray-300">{game.timeToReward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Platforms:</span>
                      <span className="text-gray-700 dark:text-gray-300">{game.platforms.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Earning Strategies Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="strategies-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="strategies-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {earningStrategiesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earningStrategiesData.strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{strategy.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {strategy.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {strategy.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
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
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">👤</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {story.name}, {story.age}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {story.location}
                      </p>
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg mt-2">
                        {story.earnings}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center mb-3">
                      "{story.story}"
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Favorite: {story.favoriteGames?.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Newsletter Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="newsletter-heading"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-12">
              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
              >
                {newsletterData.title}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {newsletterData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder={newsletterData.placeholder}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

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
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/gaming-apps"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
