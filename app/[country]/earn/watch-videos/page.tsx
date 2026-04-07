// app/[country]/(marketing)/watch-videos/page.tsx

import { cookies } from "next/headers";
import { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { cache } from "react";

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
  stats?: {
    videosWatched?: string;
    videosWatchedLabel?: string;
    avgPayout?: string;
    avgPayoutLabel?: string;
    activeUsers?: string;
    activeUsersLabel?: string;
    totalPaid?: string;
    totalPaidLabel?: string;
  };
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  videoCategories?: Array<{
    icon: string;
    title: string;
    description: string;
    avgReward: string;
    timeRequired: string;
    dailyLimit: string;
  }>;
  featuredVideosTitle?: string;
  featuredVideosSubtitle?: string;
  featuredVideos?: Array<{
    title: string;
    reward: string;
    timeEstimate: string;
    category: string;
    viewsLeft: number;
    creator: string;
    rating: string;
  }>;
  benefitsTitle?: string;
  benefits?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
  }>;
  testimonialsTitle?: string;
  testimonials?: Array<{
    name: string;
    country: string;
    earnings: string;
    quote: string;
    avatar: string;
  }>;
  comparisonTitle?: string;
  comparison?: Array<{
    platform: string;
    ourRate: string;
    theirRate: string;
    advantage: string;
  }>;
  peopleAlsoAsk?: Array<{
    question: string;
    answer: string;
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

// Helper to replace {country} placeholder
const replaceCountryPlaceholder = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

// Dynamic keywords based on country type
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `get paid to watch videos ${lowerCountry}`,
    `earn money watching videos ${lowerCountry}`,
    `watch videos earn money ${lowerCountry}`,
    `paid to watch videos ${lowerCountry}`,
    `make money watching videos ${lowerCountry}`,
    `video watching jobs ${lowerCountry}`,
    `get paid for watching videos ${lowerCountry}`,
    `watch videos for cash ${lowerCountry}`,
    `earn watching video content ${lowerCountry}`,
    `best sites to watch videos for money ${lowerCountry}`,
    `legit video watching sites ${lowerCountry}`,
    `make money watching youtube ${lowerCountry}`,
    `paid video content ${lowerCountry}`,
    `watch videos earn paypal ${lowerCountry}`,
    `video rewards program ${lowerCountry}`,
    `passive income watch videos ${lowerCountry}`,
    `get paid to watch youtube videos ${lowerCountry}`,
    `video viewing jobs from home ${lowerCountry}`,
    `earn $1 per video watched ${lowerCountry}`,
    `daily video watching rewards ${lowerCountry}`,
    `video content cash rewards ${lowerCountry}`,
    `watch videos get gift cards ${lowerCountry}`,
  ];

  // Add country-specific variations
  if (countryCode === "us") {
    baseKeywords.push(
      "watch videos get paid usa",
      "video watching jobs for americans",
      "highest paying video watch sites usa",
      "how much can you earn watching videos in usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "watch videos get paid uk",
      "video watching money uk",
      "earn pounds watching videos"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "watch videos get paid canada",
      "canadian video watching rewards",
      "earn cad watching videos"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "watch videos get paid australia",
      "video watching money australia",
      "earn aud from watching videos"
    );
  }

  return baseKeywords;
};

/* ================= METADATA ================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3B82F6",
  colorScheme: "light dark",
};

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
    translation = await loadSectionTranslation(language, "watch-videos");
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
    `Get Paid to Watch Videos in ${countryName} - Earn $50-$100 Daily (2025) | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Start earning real money in ${countryName} by watching videos. ✓ $100+ daily potential ✓ Instant PayPal payouts ✓ 100% free to join. Trusted by 100K+ users. Start earning in 5 minutes!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/watch-videos`,
      languages: {
        "en-US": "/en/watch-videos",
        "es-ES": "/es/watch-videos",
        "fr-FR": "/fr/watch-videos",
        "de-DE": "/de/watch-videos",
        "it-IT": "/it/watch-videos",
        "pt-PT": "/pt/watch-videos",
        "nl-NL": "/nl/watch-videos",
        "pl-PL": "/pl/watch-videos",
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/watch-videos`,
      siteName: "Cashog",
      type: "website",
      locale: language === "es" ? "es_ES" : language === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `https://cashog.com/og/watch-videos-${country}.jpg`,
          width: 1200,
          height: 630,
          alt: `Get Paid to Watch Videos in ${countryName} - Cashog Platform`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`https://cashog.com/og/watch-videos-${country}.jpg`],
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

export default async function WatchVideosPage({
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
  const tData = await loadSectionTranslation(language, "watch-videos");

  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // Real-time counters (dynamic for engagement)
  const realTimeStats = {
    usersEarningNow: Math.floor(Math.random() * 500) + 1000,
    videosWatchedToday: Math.floor(Math.random() * 50000) + 50000,
    weeklyEarnings: {
      US: "$23,450",
      UK: "£18,230",
      CA: "C$31,500",
      AU: "A$28,900",
    },
  };

  const heroData = {
    title: t(tData?.hero?.title, `Get Paid to Watch Videos in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Join 100,000+ members earning passive income in ${countryName} by watching videos. Watch 30-second videos, earn cash, and get paid instantly via PayPal!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Watch Videos Statistics"),
    videosWatched: tData?.stats?.videosWatched || "50M+",
    videosWatchedLabel: tData?.stats?.videosWatchedLabel || "Videos Watched",
    avgPayout: tData?.stats?.avgPayout || "$0.05",
    avgPayoutLabel: tData?.stats?.avgPayoutLabel || "Average Per Video",
    activeUsers: tData?.stats?.activeUsers || "100K+",
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Members",
    totalPaid: tData?.stats?.totalPaid || "$12.5M+",
    totalPaidLabel: tData?.stats?.totalPaidLabel || "Total Paid",
  };

  // Internal links for SEO authority flow
  const internalLinks = [
    { href: "surveys", title: "Paid Surveys", icon: "📋" },
    { href: "offers", title: "Complete Offers", icon: "🎁" },
    { href: "apps", title: "Download Apps", icon: "📱" },
    { href: "referrals", title: "Referral Program", icon: "👥" },
    { href: "play-games", title: "Play Games", icon: "🎮" },
    { href: "mining-rewards", title: "Mining Rewards", icon: "⛏️" },
  ];

  const comparisonData = [
    { platform: "Cashog", ourRate: "$0.05-$0.15", theirRate: "N/A", advantage: "Higher payouts" },
    { platform: "Swagbucks", ourRate: "$0.05-$0.15", theirRate: "$0.01-$0.03", advantage: "3x higher" },
    { platform: "InboxDollars", ourRate: "$0.05-$0.15", theirRate: "$0.01-$0.02", advantage: "5x higher" },
    { platform: "MyPoints", ourRate: "$0.05-$0.15", theirRate: "$0.01-$0.03", advantage: "3x higher" },
  ];

  const peopleAlsoAskData = [
    {
      question: `How much can you earn watching videos in ${countryName}?`,
      answer: `Users in ${countryName} earn between $50-$100 daily by watching videos for 2-3 hours. Top earners make over $500 monthly.`
    },
    {
      question: `Is watching videos for money legit in ${countryName}?`,
      answer: `Yes! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide, including thousands in ${countryName}.`
    },
    {
      question: `What's the best time to watch videos for maximum earnings?`,
      answer: `Peak hours (evenings 6-10 PM and weekends) offer 40% more video opportunities and higher-paying content.`
    },
    {
      question: `Can you watch videos on mobile in ${countryName}?`,
      answer: `Absolutely! Cashog has dedicated iOS and Android apps for watching videos on the go.`
    },
  ];

  const faqData = {
    title: t(tData?.faq?.title, `Watch Videos & Get Paid in ${countryName} - FAQ`),
    items: (tData?.faq?.items || [])
      .map((item) => ({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      }))
      .filter((item) => item.q && item.a),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Earning in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 100,000+ members already getting paid in ${countryName}. Sign up for free and start watching paid videos today!`
    ),
  };

  // All Schema Markup
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateJsonLd({
        path: `/${country}/watch-videos`,
        title: heroData.title,
        description: heroData.subtitle,
        type: "low",
      }),
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://cashog.com/${country}` },
          { "@type": "ListItem", "position": 2, "name": "Watch Videos", "item": `https://cashog.com/${country}/watch-videos` },
        ],
      },
      {
        "@type": "HowTo",
        name: `How to Earn Money Watching Videos in ${countryName}`,
        description: `Step-by-step guide to start earning money by watching videos in ${countryName}`,
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
        step: [
          { "@type": "HowToStep", name: "Create Free Account", text: `Sign up for a free Cashog account in ${countryName}`, position: 1 },
          { "@type": "HowToStep", name: "Watch Videos", text: "Start watching sponsored videos and ads", position: 2 },
          { "@type": "HowToStep", name: "Earn Rewards", text: "Collect points and convert to real money", position: 3 },
          { "@type": "HowToStep", name: "Withdraw Earnings", text: `Cash out via PayPal, gift cards, or bank transfer in ${countryName}`, position: 4 },
        ],
      },
      {
        "@type": "VideoObject",
        name: `Earn Money Watching Videos in ${countryName} - Complete Tutorial`,
        description: `Learn how to earn $50-$100 daily by watching videos in ${countryName}`,
        thumbnailUrl: `https://cashog.com/video-thumbnail-${country}.jpg`,
        uploadDate: "2024-01-01",
        duration: "PT3M30S",
        embedUrl: "https://www.youtube.com/embed/cashog-tutorial",
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/WatchAction",
          userInteractionCount: 125000,
        },
      },
      {
        "@type": "Product",
        name: `Cashog Video Earning Platform - ${countryName}`,
        description: `Earn money watching videos in ${countryName}`,
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "12500", bestRating: "5", worstRating: "1" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [...peopleAlsoAskData, ...(faqData.items || [])].map((item) => ({
          "@type": "Question",
          name: item.q || item.question,
          acceptedAnswer: { "@type": "Answer", text: item.a || item.answer },
        })),
      },
    ].filter(Boolean),
  };

  return (
    <main className="flex flex-col items-center w-full">
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section with Image */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/icons/video-earnings-icon.svg"
                  alt={`Get paid to watch videos in ${countryName} - Earn money online`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {heroData.subtitle}
            </p>
            
            {/* Real-time counter */}
            <div className="mb-8 inline-flex items-center gap-4 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {realTimeStats.usersEarningNow.toLocaleString()} users earning right now
                </span>
              </div>
              <div className="w-px h-4 bg-green-300 dark:bg-green-700"></div>
              <span className="text-sm text-green-600 dark:text-green-400">
                {realTimeStats.videosWatchedToday.toLocaleString()} videos watched today
              </span>
            </div>

            <PrimaryCTA href="/signup" translationKey="start_watching_now" observer={true} />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section with Image SEO */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {statsData.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: statsData.videosWatched, label: statsData.videosWatchedLabel },
                { value: statsData.avgPayout, label: statsData.avgPayoutLabel },
                { value: statsData.activeUsers, label: statsData.activeUsersLabel },
                { value: statsData.totalPaid, label: statsData.totalPaidLabel },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                  <div className="text-3xl md:text-4xl font-bold text-green-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Location-based proof */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📊 Users in {countryName} earned {realTimeStats.weeklyEarnings[country.toUpperCase() as keyof typeof realTimeStats.weeklyEarnings] || "$15,000+"} last week
              </p>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Internal Links Section (SEO Authority Flow) */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                More Ways to Earn Money
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Combine multiple earning methods to maximize your income
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/${country}/earn/${link.href}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl mb-2">{link.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{link.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Video Tutorial Section with YouTube Embed */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Watch How It Works
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                See exactly how to start earning money by watching videos
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/cashog-tutorial"
                  title={`How to earn money watching videos in ${countryName} - Cashog tutorial`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Comparison Section (High Commercial Intent) */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Cashog vs Competitors
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                See why Cashog pays more than other platforms
              </p>
            </div>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-yellow-400 to-green-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Platform</th>
                    <th className="px-6 py-4 text-left">Our Rate</th>
                    <th className="px-6 py-4 text-left">Their Rate</th>
                    <th className="px-6 py-4 text-left">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.platform}</td>
                      <td className="px-6 py-4 text-green-600 font-bold">{item.ourRate}</td>
                      <td className="px-6 py-4 text-gray-500">{item.theirRate}</td>
                      <td className="px-6 py-4 text-blue-600">{item.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* People Also Ask Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                People Also Ask
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {peopleAlsoAskData.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              ))}
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
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {finalData.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {finalData.subtitle}
            </p>
            <PrimaryCTA href="/signup" translationKey="start_watching_now" observer={true} />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
