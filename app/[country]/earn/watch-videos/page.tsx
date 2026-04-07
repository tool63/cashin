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
  getCountryPaymentMethods,
  getCountryEarningDifficulty,
  getCountryCPM,
  getCountryLocalTestimonials,
  getCountryEarningTips,
  getCountryFAQs,
  getCountryPeopleAlsoSearch,
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
    `earn money watching videos in ${lowerCountry}`,
    `get paid to watch videos ${lowerCountry} legit`,
    `best app to earn money watching videos ${lowerCountry}`,
    `fast way to earn daily income ${lowerCountry}`,
    `passive income apps ${lowerCountry} no investment`,
    `watching videos for cash ${lowerCountry} legit`,
    `make money online ${lowerCountry} free`,
    `daily earning app ${lowerCountry} paypal`,
    `video watching jobs from home ${lowerCountry}`,
    `earn $10 per day watching videos ${lowerCountry}`,
    `best earning apps in ${lowerCountry}`,
    `how to earn money online ${lowerCountry} fast`,
    `legit earning platform ${lowerCountry}`,
    `watch videos get paid instantly ${lowerCountry}`,
    `side hustle apps ${lowerCountry}`,
  ];

  return baseKeywords;
};

// Get hreflang languages based on country
const getHreflangLanguages = (country: CountryCode) => {
  const baseUrl = "https://cashog.com";
  const languages = {
    "en-US": `${baseUrl}/en/watch-videos`,
    "en-GB": `${baseUrl}/gb/watch-videos`,
    "en-CA": `${baseUrl}/ca/watch-videos`,
    "en-AU": `${baseUrl}/au/watch-videos`,
    "es-ES": `${baseUrl}/es/watch-videos`,
    "fr-FR": `${baseUrl}/fr/watch-videos`,
    "de-DE": `${baseUrl}/de/watch-videos`,
    "it-IT": `${baseUrl}/it/watch-videos`,
    "pt-PT": `${baseUrl}/pt/watch-videos`,
    "nl-NL": `${baseUrl}/nl/watch-videos`,
    "pl-PL": `${baseUrl}/pl/watch-videos`,
    "tr-TR": `${baseUrl}/tr/watch-videos`,
    "ar-SA": `${baseUrl}/sa/watch-videos`,
    "hi-IN": `${baseUrl}/in/watch-videos`,
    "bn-BD": `${baseUrl}/bd/watch-videos`,
  };
  return languages;
};

/* ================= METADATA with HREFLANG ================= */

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
  } catch (error) {}

  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const rawTitle = translation?.seo?.title;
  const rawDescription = translation?.seo?.description;

  // Country-specific earning potential based on CPM
  const cpmData = getCountryCPM(country);
  const earningPotential = cpmData.dailyAverage;

  // Optimized H1 with power words
  const seoTitle = replaceCountry(
    rawTitle,
    `Earn Money Watching Videos in ${countryName} - Get Paid Daily (Fast & Legit) | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Want to earn fast daily income in ${countryName}? Watch videos & get paid instantly. ✓ No investment ✓ Legit platform ✓ ${earningPotential} daily potential. Join 100K+ users!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  // Get hreflang languages
  const hreflangLanguages = getHreflangLanguages(country);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/watch-videos`,
      languages: hreflangLanguages,
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
          alt: `Earn money watching videos in ${countryName} - Cashog platform`,
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

  // Helper function to replace country placeholder
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // Country-specific data
  const paymentMethods = getCountryPaymentMethods(country);
  const earningDifficulty = getCountryEarningDifficulty(country);
  const cpmData = getCountryCPM(country);
  const localTestimonials = getCountryLocalTestimonials(country);
  const earningTips = getCountryEarningTips(country);
  const countryFAQs = getCountryFAQs(country);
  const peopleAlsoSearch = getCountryPeopleAlsoSearch(country);

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Earn Money Watching Videos in ${countryName} - Get Paid Daily`);
  const description = t(rawDescription, `Watch videos and earn money in ${countryName} - Fast & Legit`);

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, `Earn Money Watching Videos in ${countryName} (Get Paid Daily)`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Want to earn fast daily income in ${countryName}? Join ${countryData.activeUsers}+ members earning ${cpmData.dailyAverage} daily by watching videos. ✓ No investment ✓ Legit platform ✓ Instant payouts via ${paymentMethods.slice(0, 2).join(" or ")}!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Why Thousands Choose Cashog"),
    videosWatched: tData?.stats?.videosWatched || "50M+",
    videosWatchedLabel: tData?.stats?.videosWatchedLabel || "Videos Watched",
    avgPayout: tData?.stats?.avgPayout || cpmData.perVideo,
    avgPayoutLabel: tData?.stats?.avgPayoutLabel || "Average Per Video",
    activeUsers: tData?.stats?.activeUsers || countryData.activeUsers,
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Members",
    totalPaid: tData?.stats?.totalPaid || countryData.totalPaid,
    totalPaidLabel: tData?.stats?.totalPaidLabel || "Total Paid",
  };

  const videoCategoriesData = (tData?.videoCategories || []).map((category) => ({
    ...category,
    title: t(category.title, category.title),
    description: t(category.description, category.description),
    avgReward: category.avgReward.replace("{cpm}", cpmData.perVideo),
  }));

  const featuredVideosData = (tData?.featuredVideos || []).map((video) => ({
    ...video,
    title: t(video.title, video.title),
  }));

  const benefitsData = (tData?.benefits || []).map((benefit) => ({
    ...benefit,
    title: t(benefit.title, benefit.title),
    description: t(benefit.description, benefit.description),
  }));

  const tipsData = (tData?.tips || []).map((tip, index) => ({
    number: index + 1,
    title: t(tip.title, tip.title),
    description: t(tip.description, tip.description),
  }));

  // Use local testimonials if available
  const testimonialsData = localTestimonials.length > 0 
    ? localTestimonials.map((testimonial, index) => ({
        name: testimonial.name,
        country: countryName,
        earnings: testimonial.earnings,
        quote: t(testimonial.quote, testimonial.quote),
        avatar: testimonial.name.charAt(0),
      }))
    : (tData?.testimonials || []).map((testimonial) => ({
        ...testimonial,
        quote: t(testimonial.quote, testimonial.quote),
      }));

  // Combine FAQs from translation and country-specific
  const combinedFAQs = [
    ...(countryFAQs || []),
    ...(tData?.faq?.items || []).map((item) => ({
      question: t(item.question, item.question),
      answer: t(item.answer, item.answer),
    })),
  ];

  const faqData = {
    title: t(tData?.faq?.title, `Earn Money Watching Videos in ${countryName} - Frequently Asked Questions`),
    items: combinedFAQs.filter((item) => item.question && item.answer),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Earn Fast Daily Income in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join ${countryData.activeUsers}+ members already earning in ${countryName}. Sign up for free - no credit card required. Start earning today!`
    ),
  };

  // Trust badges
  const trustBadges = [
    { name: "PayPal Verified", icon: "✅", description: "Instant withdrawals" },
    { name: "4.8⭐ Rating", icon: "⭐", description: "From 12,000+ reviews" },
    { name: `Trusted by ${countryData.activeUsers}+`, icon: "👥", description: "Active users in your country" },
    { name: "No Investment", icon: "💰", description: "100% free to join" },
    { name: "Fast Payouts", icon: "⚡", description: "Same-day withdrawals" },
  ];

  // Hub pages with keyword-rich anchor text
  const hubPages = [
    { href: "surveys", title: "Paid Surveys", anchorText: "earn money with paid surveys in", icon: "📋", description: "Share your opinion & earn $1-$5 each" },
    { href: "offers", title: "Complete Offers", anchorText: "high paying offers", icon: "🎁", description: "Complete tasks & earn $0.50-$20" },
    { href: "apps", title: "Download Apps", anchorText: "app install earnings", icon: "📱", description: "Get paid $0.50-$2 per app download" },
    { href: "referrals", title: "Referral Program", anchorText: "referral program for passive income", icon: "👥", description: "Earn 10% lifetime commission" },
    { href: "play-games", title: "Play Games", anchorText: "play games for money", icon: "🎮", description: "Earn $0.50-$5 per hour playing" },
    { href: "watch-ads", title: "Watch Ads", anchorText: "watch ads get paid", icon: "📺", description: "Earn $0.03-$0.10 per ad" },
  ];

  const earningsDisclaimer = `Most users in ${countryName} earn ${cpmData.dailyAverage} per day watching videos for 2-3 hours. Results vary based on activity level.`;

  // Blog-style content block (500+ words for SEO)
  const blogContent = {
    title: `Best Time to Watch Videos for Money in ${countryName} (Pro Tips to Maximize Earnings)`,
    sections: [
      {
        subtitle: "Peak Hours for Maximum Earnings",
        content: `Based on data from ${countryData.activeUsers}+ active users in ${countryName}, the best times to watch videos for money are evenings (6 PM - 10 PM local time) and weekends. During these peak hours, advertisers release 40% more video inventory, and the average payout per video increases by 25%. Morning sessions (8 AM - 11 AM) also perform well for international advertisers targeting ${countryName}.`
      },
      {
        subtitle: "How to Increase Your Daily Earnings",
        content: `To maximize your earnings watching videos in ${countryName}, focus on these proven strategies: First, complete your profile verification - verified users get access to 3x more video opportunities. Second, maintain your daily streak - logging in consecutively unlocks bonus rewards up to $5 extra per day. Third, use our mobile app - exclusive app-only video offers pay up to 2x more than web-based videos. Fourth, refer friends - you earn 10% of their earnings for life, creating true passive income.`
      },
      {
        subtitle: `Is Watching Videos for Money Legit in ${countryName}?`,
        content: `Absolutely! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide, including thousands in ${countryName}. We are PayPal Verified, have a 4.8/5 rating from 12,000+ Trustpilot reviews, and have been featured on Business Insider, Forbes, and Entrepreneur.com. Unlike scam sites, we have transparent payout systems, 24/7 customer support, and instant withdrawals. Users in ${countryName} can withdraw earnings via ${paymentMethods.slice(0, 3).join(", ")}.`
      },
      {
        subtitle: `Fastest Way to Earn Daily Income in ${countryName}`,
        content: `The fastest way to start earning daily income in ${countryName} is to combine multiple earning methods. While watching videos alone can earn you ${cpmData.dailyAverage}, power users who also complete ${hubPages[0].anchorText} ${countryName}, ${hubPages[1].anchorText}, and ${hubPages[4].anchorText} typically earn $30-$50 per day. The key is consistency - even 30 minutes daily can generate $50-$100 monthly. Most users reach their first payout within 24-48 hours.`
      }
    ]
  };

  // People Also Search section
  const peopleAlsoSearchData = peopleAlsoSearch.length > 0 ? peopleAlsoSearch : [
    `earn money online in ${countryName}`,
    `best earning apps in ${countryName}`,
    `passive income apps ${countryName}`,
    `how to make money online ${countryName} fast`,
    `legit earning platform ${countryName}`,
    `daily income app ${countryName}`,
    `side hustle apps ${countryName}`,
    `work from home jobs ${countryName}`,
  ];

  // Breadcrumb schema data
  const breadcrumbData = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://cashog.com/${country}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Earn Money",
        "item": `https://cashog.com/${country}/earn`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Watch Videos Earn Money ${countryName}`,
        "item": `https://cashog.com/${country}/watch-videos`
      }
    ]
  };

  // FAQ schema data
  const faqSchemaData = {
    "@type": "FAQPage",
    "mainEntity": faqData.items.slice(0, 8).map((item) => ({
      "@type": "Question",
      "name": item.q || item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a || item.answer
      }
    }))
  };

  // Organization schema
  const organizationSchema = {
    "@type": "Organization",
    "name": "Cashog",
    "url": `https://cashog.com/${country}`,
    "logo": "https://cashog.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/cashog",
      "https://twitter.com/cashog",
      "https://www.instagram.com/cashog"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // All Schema Markup
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateJsonLd({
        path: `/${country}/watch-videos`,
        title,
        description,
        type: "low",
      }),
      breadcrumbData,
      faqSchemaData,
      organizationSchema,
      {
        "@type": "HowTo",
        "name": `How to Earn Money Watching Videos in ${countryName} (Fast & Legit)`,
        "description": `Step-by-step guide to start earning daily income by watching videos in ${countryName}`,
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Create Free Account",
            "text": `Sign up for a free Cashog account in ${countryName} - no credit card required`,
            "position": 1
          },
          {
            "@type": "HowToStep",
            "name": "Watch Videos",
            "text": "Start watching sponsored videos and ads immediately",
            "position": 2
          },
          {
            "@type": "HowToStep",
            "name": "Earn Rewards",
            "text": `Collect points and convert to real money - earn ${cpmData.dailyAverage} daily`,
            "position": 3
          },
          {
            "@type": "HowToStep",
            "name": "Withdraw Earnings",
            "text": `Cash out instantly via ${paymentMethods.slice(0, 3).join(", ")} in ${countryName}`,
            "position": 4
          }
        ]
      },
      {
        "@type": "Product",
        "name": `Cashog - Best Earning App in ${countryName}`,
        "description": `Earn ${cpmData.dailyAverage} daily watching videos in ${countryName} - Legit & Fast`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "12500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    ].filter(Boolean),
  };

  return (
    <main className="flex flex-col items-center w-full">
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero Section with Optimized H1 */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="hero-heading"
          >
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/icons/video-earnings-icon.svg"
                  alt={`Earn money watching videos in ${countryName} - Cashog platform for fast daily income`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white"
            >
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.name}</span>
                </div>
              ))}
            </div>

            <PrimaryCTA
              href="/signup"
              translationKey="start_earning_now_free"
              observer={true}
            />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">
              {earningsDisclaimer}
            </p>
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
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Join thousands already earning fast daily income in {countryName}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.videosWatched}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.videosWatchedLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.avgPayout}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.avgPayoutLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.activeUsers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.activeUsersLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.totalPaid}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.totalPaidLabel}
                </div>
              </div>
            </div>

            {/* Country-specific CPM info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💰 Current rate in {countryName}: {cpmData.perVideo} per video • {cpmData.dailyAverage} daily average
              </p>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Blog-style Content Block (500+ words for SEO) */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                {blogContent.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
              <div className="space-y-8">
                {blogContent.sections.map((section, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {section.subtitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* People Also Search Section (Semantic SEO) */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                People Also Search
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Popular searches related to earning money in {countryName}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {peopleAlsoSearchData.map((term, idx) => (
                <span key={idx} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  {term}
                </span>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Hub Pages Cluster Section with Keyword-Rich Anchor Text */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                More Ways to Earn Fast Daily Income
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Combine these methods to maximize your earnings in {countryName}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {hubPages.map((page, idx) => (
                <Link
                  key={idx}
                  href={`/${country}/earn/${page.href}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-3xl mb-2">{page.icon}</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm">
                    {page.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{page.description}</div>
                </Link>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Contextual Internal Links with SEO Anchor Text */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                Start Your Earning Journey Today
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
                <p>
                  Watching videos is just one of many ways to <strong>earn money online in {countryName}</strong>. 
                  You can also <Link href={`/${country}/earn/surveys`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  earn money with paid surveys in {countryName}
                </Link> where you can make $1-$5 per survey sharing your opinion. Many users combine video watching with 
                  <Link href={`/${country}/earn/offers`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium"> high paying offers</Link> to maximize their daily earnings.
                </p>
                <p>
                  For those who prefer mobile earning, <Link href={`/${country}/earn/apps`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  app install earnings</Link> can add an extra $5-$10 daily. You can also 
                  <Link href={`/${country}/earn/play-games`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium"> play games for money</Link> and earn while having fun. 
                  Don't forget our <Link href={`/${country}/earn/referrals`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  referral program for passive income</Link> - you earn 10% of your friends' earnings for life!
                </p>
                <p>
                  The key to success on Cashog is diversifying your earning methods. While watching videos alone can earn you {cpmData.dailyAverage}, 
                  combining it with <Link href={`/${country}/earn/surveys`} className="text-blue-600 dark:text-blue-400 hover:underline">paid surveys in {countryName}</Link>, 
                  {" "}<Link href={`/${country}/earn/offers`} className="text-blue-600 dark:text-blue-400 hover:underline">high paying offers</Link>, and 
                  {" "}<Link href={`/${country}/earn/play-games`} className="text-blue-600 dark:text-blue-400 hover:underline">play games for money</Link> can push your earnings to {cpmData.dailyMax || "$30-$50"} per day.
                </p>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Earning Comparison Table */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Earning Potential by Country
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Compare daily earning potential across different regions
              </p>
            </div>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-yellow-400 to-green-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Country</th>
                    <th className="px-6 py-4 text-left">Daily Average</th>
                    <th className="px-6 py-4 text-left">Per Video Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { country: "United States", dailyAverage: "$15-25", cpm: "$0.08-0.12" },
                    { country: "United Kingdom", dailyAverage: "£12-20", cpm: "£0.06-0.10" },
                    { country: "Canada", dailyAverage: "C$18-30", cpm: "C$0.07-0.11" },
                    { country: "Australia", dailyAverage: "A$20-35", cpm: "A$0.08-0.12" },
                    { country: countryName, dailyAverage: cpmData.dailyAverage, cpm: cpmData.perVideo, isCurrent: true },
                  ].map((item, idx) => (
                    <tr key={idx} className={item.isCurrent ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"}>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.country} {item.isCurrent && "📍"}
                       </td>
                      <td className="px-6 py-4 text-green-600 font-bold">{item.dailyAverage}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.cpm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Video Categories Grid */}
      {videoCategoriesData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {t(tData?.categoriesTitle, "Types of Videos You Can Watch for Money")}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.categoriesSubtitle, "Choose from hundreds of videos updated daily")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoCategoriesData.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="text-5xl mb-4" aria-hidden="true">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Reward:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{category.avgReward}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Time:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{category.timeRequired}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Daily Limit:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{category.dailyLimit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Payment Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Get Paid Fast in {countryName}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Choose from multiple withdrawal options - all with instant processing
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {paymentMethods.map((method, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-md flex items-center gap-2">
                  <span className="text-2xl">
                    {method === "PayPal" && "💳"}
                    {method === "Bank Transfer" && "🏦"}
                    {method === "Gift Cards" && "🎁"}
                    {method === "bKash" && "📱"}
                    {method === "Paytm" && "📱"}
                    {method === "GCash" && "📱"}
                    {method === "Tigo Pesa" && "📱"}
                    {method === "M-Pesa" && "📱"}
                    {method === "Cryptocurrency" && "₿"}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{method}</span>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Tips Section */}
      {tipsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {t(tData?.tipsTitle, "Pro Tips to Maximize Your Video Earnings")}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {tipsData.map((tip) => (
                  <div key={tip.number} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {tip.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Testimonials */}
      {testimonialsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {t(tData?.testimonialsTitle, "Real Users in {country} Are Earning Real Money")}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.country}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">"{testimonial.quote}"</p>
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">Earned {testimonial.earnings}</p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* FAQ Section with Optimized Questions */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {faqData.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  Everything you need to know about earning money watching videos in {countryName}
                </p>
              </div>
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
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            
            {/* Final Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Instant payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">24/7 support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">No hidden fees</span>
              </div>
            </div>

            <PrimaryCTA href="/signup" translationKey="start_earning_now_free" observer={true} />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 max-w-md mx-auto">
              {earningsDisclaimer}
            </p>
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
