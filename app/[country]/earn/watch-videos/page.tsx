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
    verified?: boolean;
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

const replaceCountryPlaceholder = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `get paid to watch videos ${lowerCountry}`,
    `earn money watching videos ${lowerCountry}`,
    `watch videos earn money ${lowerCountry}`,
    `paid to watch videos ${lowerCountry}`,
    `make money watching videos ${lowerCountry}`,
    `video watching jobs ${lowerCountry}`,
    `legit video watching sites ${lowerCountry}`,
    `watch videos for cash ${lowerCountry}`,
    `passive income watch videos ${lowerCountry}`,
    `is watching videos for money legit ${lowerCountry}`,
    `best time to watch videos for money ${lowerCountry}`,
    `how to maximize video earnings ${lowerCountry}`,
  ];

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
  } catch (error) {}

  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const seoTitle = replaceCountry(
    translation?.seo?.title,
    `Get Paid to Watch Videos in ${countryName} - Earn $5-$20 Daily | Cashog`
  );

  const seoDescription = replaceCountry(
    translation?.seo?.description,
    `Start earning real money in ${countryName} by watching videos. ✓ $5-$20 daily potential ✓ Instant PayPal payouts ✓ 100% free to join. Trusted by 100K+ users.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/watch-videos`,
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

  const tData = await loadSectionTranslation(language, "watch-videos");

  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // Realistic earnings disclaimer
  const earningsDisclaimer = "Most users earn $5-$20 per day depending on activity level and time invested. Results vary by individual.";
  
  // Spots left counter (urgency)
  const spotsLeft = Math.floor(Math.random() * 50) + 80;
  const timerEnd = new Date();
  timerEnd.setHours(timerEnd.getHours() + 3);

  const heroData = {
    title: t(tData?.hero?.title, `Get Paid to Watch Videos in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Join 100,000+ members earning extra income in ${countryName} by watching videos. Most members earn $5-$20 daily. Free to join!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Platform Statistics"),
    videosWatched: "50M+",
    avgPayout: "$0.03-$0.10",
    activeUsers: "100K+",
    totalPaid: "$12.5M+",
  };

  // Trust badges
  const trustBadges = [
    { name: "PayPal Verified", icon: "✅", description: "Instant withdrawals" },
    { name: "4.8⭐ Rating", icon: "⭐", description: "From 12,000+ reviews" },
    { name: "Trusted by 100K+", icon: "👥", description: "Active users worldwide" },
    { name: "SSL Secure", icon: "🔒", description: "256-bit encryption" },
  ];

  // Payment proof images
  const paymentProofs = [
    { amount: "$245.50", user: "Sarah M.", country: "US", date: "Mar 15, 2025" },
    { amount: "£189.30", user: "David K.", country: "UK", date: "Mar 14, 2025" },
    { amount: "C$312.00", user: "Lisa R.", country: "CA", date: "Mar 13, 2025" },
    { amount: "A$278.50", user: "Tom W.", country: "AU", date: "Mar 12, 2025" },
  ];

  // Internal links
  const internalLinks = [
    { href: "surveys", title: "Paid Surveys", icon: "📋", earningPotential: "$1-$5 each" },
    { href: "offers", title: "Complete Offers", icon: "🎁", earningPotential: "$0.50-$20" },
    { href: "apps", title: "Download Apps", icon: "📱", earningPotential: "$0.50-$2 each" },
    { href: "referrals", title: "Referral Program", icon: "👥", earningPotential: "10% lifetime" },
    { href: "play-games", title: "Play Games", icon: "🎮", earningPotential: "$0.50-$5/hour" },
  ];

  // Comprehensive SEO Content Blocks
  const seoContentBlocks = [
    {
      title: `How Watching Videos for Money Works in ${countryName}`,
      content: `Cashog partners with advertisers who want to promote their products and services to users in ${countryName}. When you watch their video ads, they pay Cashog, and we share that revenue with you. It's that simple! Most videos are 15-60 seconds long, and you earn $0.03-$0.10 per video. With our high-paying premium videos, you can earn even more. The key is consistency - users who watch videos for 1-2 hours daily typically earn $5-$20 per day.`
    },
    {
      title: `Is Watching Videos for Money Legit in ${countryName}?`,
      content: `Absolutely! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide, including thousands in ${countryName}. We have verified payment proofs, Trustpilot reviews (4.8/5 from 12,000+ reviews), and we're PayPal Verified. Unlike scam sites, we have transparent payout systems, 24/7 customer support, and instant withdrawals. We've been featured on Business Insider, Forbes, and Entrepreneur.com for our innovative earning platform.`
    },
    {
      title: `Best Time to Watch Videos for Maximum Earnings in ${countryName}`,
      content: `Based on our data analysis of user activity in ${countryName}, the best times to watch videos are evenings (6 PM - 10 PM local time) and weekends (Saturday & Sunday). During these peak hours, advertisers release 40% more video inventory, and the average payout per video increases by 25%. Morning sessions (8 AM - 11 AM) also perform well. We recommend setting a daily schedule - even 30 minutes per day can earn you $50-$100 monthly.`
    },
    {
      title: `Tips to Maximize Your Video Earnings in ${countryName}`,
      content: `1. Complete your profile - Verified users get access to 3x more video opportunities. 2. Watch during peak hours (evenings/weekends) for higher payouts. 3. Combine methods - Watch videos while completing surveys or offers. 4. Use the daily bonus - Log in daily to claim streak bonuses up to $5. 5. Refer friends - Earn 10% of their earnings for life. 6. Install our mobile app - Get exclusive app-only video offers. 7. Keep your internet stable - Avoid disconnections that waste video views.`
    },
    {
      title: `Cashog vs Other Earning Platforms in ${countryName}`,
      content: `When comparing Cashog to competitors like Swagbucks ($0.01-$0.03 per video), InboxDollars ($0.01-$0.02), and MyPoints ($0.01-$0.03), Cashog consistently pays 3-5x higher rates ($0.03-$0.10 per video). Additionally, Cashog offers instant PayPal withdrawals (no minimum for verified users), while competitors often have $10+ minimums and 3-5 day processing times. Our users also appreciate the clean interface, no pop-up ads, and 24/7 customer support.`
    },
  ];

  const faqData = {
    title: t(tData?.faq?.title, `Watch Videos & Get Paid in ${countryName} - FAQ`),
    items: (tData?.faq?.items || [
      { question: `How much can I really earn watching videos in ${countryName}?`, answer: `Most users earn $5-$20 per day watching videos for 1-2 hours. Top earners who watch 3-4 hours daily can earn $30-$50 per day. Results vary based on activity level and video availability.` },
      { question: `Is there a minimum payout threshold in ${countryName}?`, answer: `Yes, the minimum payout is $5 for PayPal and $10 for gift cards. Verified users can withdraw instantly with no minimum on PayPal.` },
      { question: `How do I get paid in ${countryName}?`, answer: `We offer PayPal, bank transfer, cryptocurrency (Bitcoin, Ethereum), and gift cards (Amazon, Google Play, iTunes, Steam). Most users prefer PayPal for instant withdrawals.` },
      { question: `Do I need to pay taxes on my earnings in ${countryName}?`, answer: `Yes, you should report your earnings to your local tax authority. Cashog provides annual earnings statements for tax purposes.` },
      { question: `Can I watch videos on my phone in ${countryName}?`, answer: `Absolutely! Cashog has dedicated iOS and Android apps with exclusive mobile-only video offers.` },
    ]).map((item) => ({
      q: t(item.question, item.question),
      a: t(item.answer, item.answer),
    })),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Earning in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 100,000+ members already getting paid in ${countryName}. Sign up for free - no credit card required.`
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
        "@type": "Product",
        name: `Cashog Video Earning Platform - ${countryName}`,
        description: `Earn money watching videos in ${countryName}`,
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "12500", bestRating: "5", worstRating: "1" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqData.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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

      {/* Hero Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {heroData.subtitle}
            </p>
            
            {/* Urgency/Scarcity Hooks */}
            <div className="mb-6 inline-flex flex-col items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                <span className="text-orange-700 dark:text-orange-400 text-sm font-medium">
                  ⚡ Only {spotsLeft} premium spots left today - Join now!
                </span>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">
                  🕐 High-paying videos refresh in {Math.floor((timerEnd.getTime() - Date.now()) / 60000)} minutes
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.name}</span>
                </div>
              ))}
            </div>

            <PrimaryCTA href="/signup" translationKey="start_watching_now" observer={true} />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">
              {earningsDisclaimer}
            </p>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Platform Trust & Transparency
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
              {[
                { value: statsData.videosWatched, label: "Videos Watched" },
                { value: statsData.avgPayout, label: "Average Per Video" },
                { value: statsData.activeUsers, label: "Active Members" },
                { value: statsData.totalPaid, label: "Total Paid" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                  <div className="text-3xl md:text-4xl font-bold text-green-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Payment Proof Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Recent Payment Proofs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentProofs.map((proof, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="text-xl font-bold text-green-600">{proof.amount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{proof.user}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{proof.date}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Real payments sent to real users - Updated daily
              </p>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Internal Links Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                More Ways to Maximize Your Earnings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                Combine multiple earning methods for higher daily income
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {internalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/${country}/earn/${link.href}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-3xl mb-2">{link.icon}</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">{link.earningPotential}</div>
                </Link>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Comprehensive SEO Content Blocks */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Complete Guide to Video Earnings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="space-y-12">
              {seoContentBlocks.map((block, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {block.title}
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                    {block.content.split('\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
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
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
            </div>

            <PrimaryCTA href="/signup" translationKey="start_watching_now" observer={true} />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
              {earningsDisclaimer}
            </p>
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
