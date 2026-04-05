// app/[country]/(marketing)/install-apps-for-cash/page.tsx

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

interface CashApp {
  name: string;
  logo: string;
  payoutAmount: string;
  description: string;
  requirements: string[];
  platform: string[];
  rating: number;
  link: string;
  isFeatured?: boolean;
}

interface Offer {
  title: string;
  description: string;
  reward: string;
  timeToComplete: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
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
  categories?: Array<{
    name: string;
    icon: string;
    description: string;
    appCount: number;
  }>;
  featuredAppsTitle?: string;
  featuredApps?: CashApp[];
  highestPayingTitle?: string;
  highestPaying?: CashApp[];
  quickEarningsTitle?: string;
  quickEarnings?: Offer[];
  surveyAppsTitle?: string;
  surveyApps?: CashApp[];
  gamingAppsTitle?: string;
  gamingApps?: CashApp[];
  shoppingAppsTitle?: string;
  shoppingApps?: CashApp[];
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
  compareTitle?: string;
  compare?: {
    description?: string;
    items?: Array<{
      name: string;
      payout: string;
      timeToPayout: string;
      minimumPayout: string;
      rating: number;
    }>;
  };
  referralBonusesTitle?: string;
  referralBonuses?: Array<{
    app: string;
    bonusAmount: string;
    requirement: string;
    link: string;
  }>;
  earningGuidesTitle?: string;
  earningGuides?: Array<{
    title: string;
    description: string;
    readTime: string;
    link: string;
  }>;
  successStoriesTitle?: string;
  successStories?: Array<{
    name: string;
    amount: string;
    story: string;
    app: string;
  }>;
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
    `install apps earn money ${lowerCountry}`,
    `cash for downloading apps ${lowerCountry}`,
    `get paid to install apps ${lowerCountry}`,
    `app install rewards ${lowerCountry}`,
    `earn cash installing apps ${lowerCountry}`,
    `money making apps ${lowerCountry}`,
    `paid app installations ${lowerCountry}`,
    `cash rewards apps ${lowerCountry}`,
    `download apps get paid ${lowerCountry}`,
    `app earning opportunities ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "cash apps usa",
      "get paid to download apps usa",
      "app install bonuses usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "cash apps uk",
      "get paid to download apps uk",
      "app install rewards uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "cash apps canada",
      "get paid to download apps canada",
      "app install bonuses canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cash apps australia",
      "get paid to download apps australia",
      "app install rewards australia"
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
    translation = await loadSectionTranslation(language, "install-apps-for-cash");
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
    `Install Apps for Cash - Earn Money by Downloading Apps in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Get paid to install and try new apps in ${countryName}. Earn cash rewards, gift cards, and bonuses for downloading and testing mobile apps. Start earning today!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/install-apps-for-cash`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/install-apps-for-cash`,
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

export default async function InstallAppsForCashPage({
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
  const tData = await loadSectionTranslation(language, "install-apps-for-cash");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Install Apps for Cash - Earn Money by Downloading Apps`);
  const description = t(rawDescription, `Get paid to install and try new apps in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/install-apps-for-cash`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Get Paid to Install Apps"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Earn real cash rewards just for downloading and trying new apps in ${countryName}. No investment required - start earning today with our trusted app partners.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Browse Earning Categories"),
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
        name: "Survey Apps",
        icon: "📋",
        description: "Get paid for your opinions",
        appCount: 45,
      },
      {
        name: "Gaming Apps",
        icon: "🎮",
        description: "Earn while playing games",
        appCount: 78,
      },
      {
        name: "Shopping Apps",
        icon: "🛍️",
        description: "Cashback on purchases",
        appCount: 32,
      },
      {
        name: "Cashback Apps",
        icon: "💰",
        description: "Get money back on spending",
        appCount: 28,
      },
      {
        name: "Fitness Apps",
        icon: "🏃",
        description: "Get paid to stay active",
        appCount: 15,
      },
      {
        name: "Micro Tasks",
        icon: "✅",
        description: "Small tasks, quick cash",
        appCount: 56,
      },
    ];
  }

  const featuredAppsData = {
    title: t(tData?.featuredAppsTitle, "🌟 Featured Cash Apps"),
    apps: (tData?.featuredApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default featured apps if not in translation
  if (featuredAppsData.apps.length === 0) {
    featuredAppsData.apps = [
      {
        name: "Swagbucks",
        logo: "💰",
        payoutAmount: "$5 - $100+",
        description: "Earn points for surveys, shopping, watching videos, and more",
        requirements: ["Download app", "Create free account", "Complete simple tasks"],
        platform: ["iOS", "Android", "Web"],
        rating: 4.5,
        link: "/app/swagbucks",
        isFeatured: true,
      },
      {
        name: "Mistplay",
        logo: "🎮",
        payoutAmount: "$5 - $50",
        description: "Get paid to play mobile games",
        requirements: ["Download app", "Play games", "Earn units for playtime"],
        platform: ["Android"],
        rating: 4.3,
        link: "/app/mistplay",
        isFeatured: true,
      },
      {
        name: "Fetch Rewards",
        logo: "📸",
        payoutAmount: "$5 - $20",
        description: "Earn points by scanning grocery receipts",
        requirements: ["Download app", "Scan receipts", "Get points for purchases"],
        platform: ["iOS", "Android"],
        rating: 4.7,
        link: "/app/fetch-rewards",
        isFeatured: true,
      },
    ];
  }

  const highestPayingData = {
    title: t(tData?.highestPayingTitle, "💎 Highest Paying Apps"),
    apps: (tData?.highestPaying || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default highest paying apps if not in translation
  if (highestPayingData.apps.length === 0) {
    highestPayingData.apps = [
      {
        name: "UserTesting",
        logo: "📱",
        payoutAmount: "$10 - $60 per test",
        description: "Test websites and apps, provide feedback",
        requirements: ["Complete sample test", "Speak thoughts aloud", "Record screen"],
        platform: ["iOS", "Android", "Desktop"],
        rating: 4.8,
        link: "/app/usertesting",
      },
      {
        name: "Dscout",
        logo: "🎥",
        payoutAmount: "$50 - $200+",
        description: "Video diary studies and missions",
        requirements: ["Apply for studies", "Complete video entries", "Share experiences"],
        platform: ["iOS", "Android"],
        rating: 4.6,
        link: "/app/dscout",
      },
      {
        name: "Respondent",
        logo: "👥",
        payoutAmount: "$50 - $500",
        description: "Paid research studies and interviews",
        requirements: ["Qualify for studies", "Schedule interviews", "Share expertise"],
        platform: ["Web"],
        rating: 4.9,
        link: "/app/respondent",
      },
    ];
  }

  const quickEarningsData = {
    title: t(tData?.quickEarningsTitle, "⚡ Quick Earnings"),
    offers: (tData?.quickEarnings || []).map((offer) => ({
      ...offer,
      title: t(offer.title, offer.title),
      description: t(offer.description, offer.description),
    })),
  };

  // Default quick earnings if not in translation
  if (quickEarningsData.offers.length === 0) {
    quickEarningsData.offers = [
      {
        title: "Download & Open App",
        description: "Install and open any featured app",
        reward: "$0.50 - $2",
        timeToComplete: "2-5 minutes",
        difficulty: "Easy",
        category: "Install",
        link: "/offer/download-open",
      },
      {
        title: "Complete Profile",
        description: "Fill out your profile information",
        reward: "$1 - $5",
        timeToComplete: "5-10 minutes",
        difficulty: "Easy",
        category: "Profile",
        link: "/offer/complete-profile",
      },
      {
        title: "First Survey",
        description: "Complete your first paid survey",
        reward: "$3 - $10",
        timeToComplete: "10-20 minutes",
        difficulty: "Medium",
        category: "Survey",
        link: "/offer/first-survey",
      },
    ];
  }

  const surveyAppsData = {
    title: t(tData?.surveyAppsTitle, "📋 Best Survey Apps"),
    apps: (tData?.surveyApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default survey apps if not in translation
  if (surveyAppsData.apps.length === 0) {
    surveyAppsData.apps = [
      {
        name: "Survey Junkie",
        logo: "📝",
        payoutAmount: "$1 - $3 per survey",
        description: "Share your opinions and earn points",
        requirements: ["Create account", "Complete profile", "Take surveys"],
        platform: ["iOS", "Android", "Web"],
        rating: 4.4,
        link: "/app/survey-junkie",
      },
      {
        name: "InboxDollars",
        logo: "📧",
        payoutAmount: "$0.50 - $5 per survey",
        description: "Get paid for surveys, emails, and offers",
        requirements: ["Sign up free", "Complete offers", "Cash out at $30"],
        platform: ["iOS", "Android"],
        rating: 4.2,
        link: "/app/inboxdollars",
      },
    ];
  }

  const gamingAppsData = {
    title: t(tData?.gamingAppsTitle, "🎮 Gaming Apps That Pay"),
    apps: (tData?.gamingApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default gaming apps if not in translation
  if (gamingAppsData.apps.length === 0) {
    gamingAppsData.apps = [
      {
        name: "Lucktastic",
        logo: "🍀",
        payoutAmount: "$0.10 - $100",
        description: "Free scratch cards and games",
        requirements: ["Download app", "Play scratch cards", "Win prizes"],
        platform: ["iOS", "Android"],
        rating: 4.1,
        link: "/app/lucktastic",
      },
      {
        name: "Cash'em All",
        logo: "💵",
        payoutAmount: "$0.10 - $5 per game",
        description: "Play games and earn real money",
        requirements: ["Download games", "Reach milestones", "Cash out"],
        platform: ["Android"],
        rating: 4.3,
        link: "/app/cashem-all",
      },
    ];
  }

  const shoppingAppsData = {
    title: t(tData?.shoppingAppsTitle, "🛍️ Shopping & Cashback Apps"),
    apps: (tData?.shoppingApps || []).map((app) => ({
      ...app,
      name: t(app.name, app.name),
      description: t(app.description, app.description),
    })),
  };

  // Default shopping apps if not in translation
  if (shoppingAppsData.apps.length === 0) {
    shoppingAppsData.apps = [
      {
        name: "Ibotta",
        logo: "💰",
        payoutAmount: "$0.20 - $20",
        description: "Cashback on groceries and shopping",
        requirements: ["Browse offers", "Upload receipts", "Earn cashback"],
        platform: ["iOS", "Android"],
        rating: 4.7,
        link: "/app/ibotta",
      },
      {
        name: "Rakuten",
        logo: "🛒",
        payoutAmount: "1-15% cashback",
        description: "Shop through app and earn cashback",
        requirements: ["Install browser extension", "Shop at stores", "Get paid quarterly"],
        platform: ["iOS", "Android", "Web"],
        rating: 4.8,
        link: "/app/rakuten",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Earning Tips"),
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
        title: "Use a Dedicated Email",
        description: "Create a separate email for earning apps to manage offers and avoid spam.",
        icon: "📧",
      },
      {
        title: "Check Daily",
        description: "New offers appear regularly. Check apps daily for the best earning opportunities.",
        icon: "📅",
      },
      {
        title: "Refer Friends",
        description: "Most apps offer generous referral bonuses. Share your code with friends.",
        icon: "👥",
      },
      {
        title: "Stack Multiple Apps",
        description: "Use several apps simultaneously to maximize your earning potential.",
        icon: "📚",
      },
    ];
  }

  const earningsCalculatorData = {
    title: t(tData?.earningsCalculator?.title, "Calculate Your Potential Earnings"),
    description: t(tData?.earningsCalculator?.description, "See how much you could earn monthly with different apps and activities"),
    buttonText: t(tData?.earningsCalculator?.buttonText, "Try Calculator"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Compare Top Earning Apps"),
    description: t(tData?.compare?.description, "Find the best app for your earning goals"),
    items: (tData?.compare?.items || []).map((item) => ({
      ...item,
      name: t(item.name, item.name),
    })),
  };

  // Default compare items if not in translation
  if (!compareData.items || compareData.items.length === 0) {
    compareData.items = [
      {
        name: "Swagbucks",
        payout: "$100+/month",
        timeToPayout: "3-5 days",
        minimumPayout: "$5",
        rating: 4.5,
      },
      {
        name: "Mistplay",
        payout: "$30-50/month",
        timeToPayout: "1-2 days",
        minimumPayout: "$5",
        rating: 4.3,
      },
      {
        name: "UserTesting",
        payout: "$200-500/month",
        timeToPayout: "7 days",
        minimumPayout: "$10",
        rating: 4.8,
      },
    ];
  }

  const referralBonusesData = {
    title: t(tData?.referralBonusesTitle, "🤝 Best Referral Bonuses"),
    bonuses: (tData?.referralBonuses || []).map((bonus) => ({
      ...bonus,
      app: t(bonus.app, bonus.app),
    })),
  };

  // Default referral bonuses if not in translation
  if (referralBonusesData.bonuses.length === 0) {
    referralBonusesData.bonuses = [
      {
        app: "Swagbucks",
        bonusAmount: "$10",
        requirement: "Friend earns 300 SB",
        link: "/refer/swagbucks",
      },
      {
        app: "Ibotta",
        bonusAmount: "$5",
        requirement: "Friend redeems first offer",
        link: "/refer/ibotta",
      },
      {
        app: "Fetch Rewards",
        bonusAmount: "$2",
        requirement: "Friend scans first receipt",
        link: "/refer/fetch",
      },
    ];
  }

  const earningGuidesData = {
    title: t(tData?.earningGuidesTitle, "Earning Guides"),
    guides: (tData?.earningGuides || []).map((guide) => ({
      ...guide,
      title: t(guide.title, guide.title),
      description: t(guide.description, guide.description),
    })),
  };

  // Default earning guides if not in translation
  if (earningGuidesData.guides.length === 0) {
    earningGuidesData.guides = [
      {
        title: "How to Maximize App Earnings",
        description: "Proven strategies to earn more from cash apps",
        readTime: "8 min",
        link: "/guide/maximize-earnings",
      },
      {
        title: "Avoiding Scams",
        description: "How to identify legitimate earning apps",
        readTime: "6 min",
        link: "/guide/avoid-scams",
      },
      {
        title: "Tax Guide for App Earnings",
        description: "Understanding taxes on your side income",
        readTime: "10 min",
        link: "/guide/tax-guide",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "🌟 Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      story: t(story.story, story.story),
      app: t(story.app, story.app),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah M.",
        amount: "$450",
        story: "I earned $450 last month just by using cashback apps and taking surveys during my commute!",
        app: "Multiple Apps",
      },
      {
        name: "Mike T.",
        amount: "$200",
        story: "Playing games on Mistplay earned me over $200 in gift cards. It's like getting paid to have fun!",
        app: "Mistplay",
      },
      {
        name: "Jessica R.",
        amount: "$100",
        story: "Scanning my grocery receipts with Fetch and Ibotta saves me about $100 every month.",
        app: "Fetch + Ibotta",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Install Apps for Cash FAQ - ${countryName}`),
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
        q: "Are these apps really free to use?",
        a: "Yes! All the apps we list are completely free to download and use. Never pay to start earning money."
      },
      {
        q: "How much money can I actually make?",
        a: "Earnings vary by app and time invested. Some users make $50-100/month casually, while dedicated users can earn $500+ monthly."
      },
      {
        q: "How do I get paid?",
        a: "Most apps offer PayPal cash, gift cards (Amazon, Visa, etc.), or direct deposit. Minimum payout thresholds typically range from $5-20."
      },
      {
        q: "Are these apps safe?",
        a: "We only recommend legitimate, vetted apps. Always read reviews and never share sensitive information like your Social Security number unless verified."
      },
      {
        q: "Can I use multiple apps at once?",
        a: "Absolutely! Using several apps simultaneously is the best way to maximize your earnings."
      },
      {
        q: "Do I need to pay taxes on earnings?",
        a: "Yes, app earnings are considered taxable income. Keep track of your earnings and consult a tax professional."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Cash Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of users who earn real money by installing and trying new apps"),
    buttonText: t(tData?.final?.buttonText, "Browse All Apps"),
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
              href="/apps"
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
                className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
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
                      {category.appCount}+ apps
                    </span>
                    <a
                      href={`/apps/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="text-purple-600 dark:text-purple-400 text-sm font-semibold hover:underline"
                    >
                      Browse apps →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Apps Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="featured-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="featured-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {featuredAppsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAppsData.apps.map((app, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {app.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                      🌟 Featured
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-8">
                    <div className="text-6xl">{app.logo}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {app.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {app.description}
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-3">
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {app.payoutAmount}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Potential earnings</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.platform.map((plat, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                    <PrimaryCTA
                      href={app.link}
                      translationKey="get_app"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Highest Paying Apps Section */}
      {highestPayingData.apps.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="highest-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="highest-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {highestPayingData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highestPayingData.apps.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-6">
                      <div className="text-5xl">{app.logo}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {app.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {app.description}
                      </p>
                      <div className="text-center mb-3">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {app.payoutAmount}
                        </p>
                        <p className="text-xs text-gray-500">per task/study</p>
                      </div>
                      <PrimaryCTA
                        href={app.link}
                        translationKey="apply_now"
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

      {/* Quick Earnings Section */}
      {quickEarningsData.offers.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="quick-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="quick-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {quickEarningsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickEarningsData.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="text-5xl mb-3">
                      {offer.difficulty === "Easy" ? "✅" : offer.difficulty === "Medium" ? "⭐" : "🔥"}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {offer.description}
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {offer.reward}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      ⏱️ {offer.timeToComplete}
                    </p>
                    <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs mb-3">
                      {offer.category}
                    </div>
                    <PrimaryCTA
                      href={offer.link}
                      translationKey="start_earning"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Survey Apps Section */}
      {surveyAppsData.apps.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="survey-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="survey-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {surveyAppsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {surveyAppsData.apps.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="text-5xl">{app.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{app.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{app.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm text-purple-600 font-semibold">{app.payoutAmount}</span>
                      </div>
                    </div>
                    <PrimaryCTA href={app.link} translationKey="get_app" observer={false} />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Gaming Apps Section */}
      {gamingAppsData.apps.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="gaming-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="gaming-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {gamingAppsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gamingAppsData.apps.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="text-5xl">{app.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{app.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{app.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm text-green-600 font-semibold">{app.payoutAmount}</span>
                      </div>
                    </div>
                    <PrimaryCTA href={app.link} translationKey="play_now" observer={false} />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Shopping Apps Section */}
      {shoppingAppsData.apps.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="shopping-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="shopping-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {shoppingAppsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shoppingAppsData.apps.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="text-5xl">{app.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{app.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{app.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm text-purple-600 font-semibold">{app.payoutAmount}</span>
                      </div>
                    </div>
                    <PrimaryCTA href={app.link} translationKey="get_app" observer={false} />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Compare Section */}
      {compareData.items && compareData.items.length > 0 && (
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
                  {compareData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">App</th>
                      <th className="px-6 py-3 text-left">Monthly Potential</th>
                      <th className="px-6 py-3 text-left">Payout Time</th>
                      <th className="px-6 py-3 text-left">Min. Payout</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-purple-600 dark:text-purple-400 font-bold">
                          {item.payout}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.timeToPayout}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.minimumPayout}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/app/${item.name.toLowerCase().replace(/ /g, '-')}`}
                            translationKey="view"
                            observer={false}
                          />
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

      {/* Referral Bonuses Section */}
      {referralBonusesData.bonuses.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="referral-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="referral-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {referralBonusesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {referralBonusesData.bonuses.map((bonus, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="text-5xl mb-3">👥</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {bonus.app}
                    </h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {bonus.bonusAmount}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {bonus.requirement}
                    </p>
                    <PrimaryCTA
                      href={bonus.link}
                      translationKey="refer_now"
                      observer={false}
                    />
                  </div>
                ))}
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
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md"
                  >
                    <div className="text-4xl mb-3">⭐</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                      "{story.story}"
                    </p>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Earned ${story.amount} • {story.app}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Shopping Tips Section */}
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
                className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
              className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full mb-8"
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

      {/* Earning Guides Section */}
      {earningGuidesData.guides.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="guides-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="guides-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {earningGuidesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {earningGuidesData.guides.map((guide, index) => (
                  <a
                    key={index}
                    href={guide.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                        Read guide →
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
              className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/apps"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
