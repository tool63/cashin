// app/[country]/(marketing)/watch-videos/page.tsx

import { cookies } from "next/headers";
import { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { lazy, Suspense } from "react";

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

/* ================= HELPERS ================= */

async function loadSectionTranslation(language: string, section: string) {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch {
    return {};
  }
}

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) return override.split("-")[0] as SupportedLanguage;

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) return saved.split("-")[0] as SupportedLanguage;

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

const replaceCountry = (text: string, country: string) =>
  text.replace(/\{country\}/g, country);

/* ================= METADATA ================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return {
      title: "Page Not Found | Cashog",
      description: "The requested page could not be found.",
      robots: { index: false },
    };
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);
  
  const title = `Get Paid to Watch Videos in ${countryName} - Earn Money Online 2025`;
  const description = `Start earning real money in ${countryName} by watching videos. ✓ Free signup ✓ Instant payouts via PayPal/Gift cards ✓ Join 100K+ users. Start earning today!`;
  
  return {
    title,
    description,
    keywords: `earn money watching videos ${countryName}, get paid to watch videos ${countryName}, passive income ${countryName}, watch videos earn money ${countryName}, online earning ${countryName}`,
    authors: [{ name: "Cashog", url: "https://cashog.com" }],
    category: "earn money online",
    alternates: {
      canonical: `https://cashog.com/${country}/watch-videos`,
      languages: {
        "en-US": "/en/watch-videos",
        "es": "/es/watch-videos",
        "fr": "/fr/watch-videos",
        "de": "/de/watch-videos",
        "it": "/it/watch-videos",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://cashog.com/${country}/watch-videos`,
      siteName: "Cashog",
      locale: language === "en" ? "en_US" : `${language}_${country.toUpperCase()}`,
      type: "website",
      images: [
        {
          url: `https://cashog.com/og-images/watch-videos-${country}.jpg`,
          width: 1200,
          height: 630,
          alt: `Get Paid to Watch Videos in ${countryName} - Cashog Platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://cashog.com/og-images/watch-videos-${country}.jpg`],
      site: "@cashog",
      creator: "@cashog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": 200,
      },
    },
    verification: {
      google: "your-google-verification-code",
      other: {
        "msvalidate.01": "your-bing-verification-code",
      },
    },
    appleWebApp: {
      capable: true,
      title: "Cashog - Earn Money",
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

/* ================= PAGE COMPONENT ================= */

export default async function WatchVideosPage({ params }: any) {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Country Not Supported</h1>
          <p className="text-lg mb-8">
            We're sorry, but this service is not available in your country yet.
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const countryCode = countryData.code || country.toUpperCase();
  const currency = countryData.currency || "USD";
  const language = getLanguage(country);

  const tData = await loadSectionTranslation(language, "watch-videos");

  /* STRUCTURED DATA - JSON-LD */
  const structuredData = generateJsonLd({
    path: `/${country}/watch-videos`,
    title: `Get Paid to Watch Videos in ${countryName}`,
    description: `Earn money watching videos in ${countryName}. Free signup, instant payouts. Join thousands earning passive income daily.`,
    type: "low",
  });

  /* BREADCRUMB SCHEMA */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://cashog.com/${country}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Watch Videos",
        "item": `https://cashog.com/${country}/watch-videos`,
      },
    ],
  };

  /* FAQ SCHEMA */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (tData?.faq?.items || []).map((item: any) => ({
      "@type": "Question",
      name: replaceCountry(item.question, countryName),
      acceptedAnswer: {
        "@type": "Answer",
        text: replaceCountry(item.answer, countryName),
      },
    })),
  };

  /* HOW-TO SCHEMA */
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Earn Money Watching Videos in ${countryName}`,
    description: `Step-by-step guide to start earning money by watching videos in ${countryName}`,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: currency,
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Create Free Account",
        text: `Sign up for a free Cashog account in ${countryName}`,
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Watch Videos",
        text: "Start watching sponsored videos and ads",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Earn Rewards",
        text: "Collect points and convert to real money",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Withdraw Earnings",
        text: `Cash out via PayPal, gift cards, or bank transfer in ${countryName}`,
        position: 4,
      },
    ],
  };

  /* VIDEO OBJECT SCHEMA */
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Earn Money Watching Videos in ${countryName} - Tutorial`,
    description: `Learn how to earn real money by watching videos online in ${countryName}`,
    thumbnailUrl: `https://cashog.com/video-thumbnail-${country}.jpg`,
    uploadDate: "2024-01-01",
    duration: "PT3M30S",
    embedUrl: "https://www.youtube.com/embed/your-video-id",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: 125000,
    },
  };

  /* EARNING POTENTIAL TABLE DATA */
  const earningMethods = [
    { name: "Ad Videos", earnings: "$0.01-$0.05", time: "5-10 seconds", daily: "$5-10" },
    { name: "Sponsored Content", earnings: "$0.10-$0.50", time: "30-60 seconds", daily: "$15-30" },
    { name: "Premium Videos", earnings: "$0.50-$2.00", time: "2-5 minutes", daily: "$20-50" },
    { name: "Daily Bonuses", earnings: "$0.50-$5.00", time: "5 minutes", daily: "$5-10" },
  ];

  return (
    <main className="flex flex-col items-center w-full bg-white dark:bg-gray-900">
      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/icons/video-earnings-icon.svg"
                alt={`Get paid to watch videos in ${countryName} - Cashog platform`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get Paid to Watch Videos in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {countryName}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Earn real money by watching videos, ads, and sponsored content in {countryName}.
            Join over 100,000 members already making passive income daily.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCTA href="/signup" className="text-lg px-8 py-3" />
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              Learn How It Works
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free Signup
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Instant Payouts
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Trusted Platform
            </span>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="w-full py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Trusted by Earners Worldwide
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Active Users", icon: "/icons/users-icon.svg", alt: `Over 100,000 active users in ${countryName}` },
              { number: "$8M+", label: "Total Paid", icon: "/icons/payments-icon.svg", alt: `Over $8 million paid to users in ${countryName}` },
              { number: "Instant", label: "Payouts", icon: "/icons/instant-icon.svg", alt: "Instant payment processing" },
              { number: "4.8★", label: "User Rating", icon: "/icons/rating-icon.svg", alt: "4.8 star rating from users" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-110">
                  <Image
                    src={stat.icon}
                    alt={stat.alt}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section id="how-it-works" className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            How to Start Earning in {countryName}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Get started in minutes with these simple steps
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Create Account", desc: `Sign up for free in ${countryName} - no credit card required` },
              { step: "2", title: "Watch Videos", desc: "Start watching ads, trailers, and sponsored content" },
              { step: "3", title: "Earn Points", desc: "Collect points for every video you watch" },
              { step: "4", title: "Cash Out", desc: `Withdraw via PayPal, gift cards, or bank in ${countryName}` },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EARNING POTENTIAL TABLE ================= */}
      <section className="w-full py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Earning Potential in {countryName}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Different video types offer different rewards - maximize your earnings
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Video Type</th>
                  <th className="px-6 py-3 text-left">Earnings per Video</th>
                  <th className="px-6 py-3 text-left">Time Required</th>
                  <th className="px-6 py-3 text-left">Daily Potential</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {earningMethods.map((method, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{method.name}</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">{method.earnings}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{method.time}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{method.daily}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              *Based on average user data. Actual earnings may vary by location and activity level in {countryName}.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEO CONTENT SECTION ================= */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            How to Maximize Your Earnings Watching Videos in {countryName}
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Watching videos online has become one of the most popular ways to earn extra income in{" "}
              {countryName}. With platforms like Cashog, you can transform your free time into real money
              by simply engaging with video content, advertisements, and sponsored materials.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
              Why Video Earning Works in {countryName}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              The digital economy in {countryName} is booming, and companies are willing to pay for user
              attention. When you watch videos on Cashog, advertisers pay for your engagement, and we share
              that revenue with you. It's a win-win situation that has helped thousands of users in{" "}
              {countryName} supplement their income.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
              Top Strategies for Maximum Earnings
            </h3>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-600 dark:text-gray-400">
              <li><strong>Watch Daily:</strong> Consistency is key. Log in every day to watch available videos and earn daily bonuses.</li>
              <li><strong>Complete Your Profile:</strong> A complete profile gets access to higher-paying video opportunities.</li>
              <li><strong>Refer Friends:</strong> Earn bonus points when friends you invite join Cashog in {countryName}.</li>
              <li><strong>Combine Methods:</strong> Watch videos while completing surveys or offers to maximize your hourly rate.</li>
              <li><strong>Peak Hours:</strong> More videos are available during peak hours (evenings and weekends) in {countryName}.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
              Payment Options in {countryName}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Cashog offers multiple withdrawal methods for users in {countryName}:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-600 dark:text-gray-400">
              <li><strong>PayPal:</strong> Instant withdrawals with no fees</li>
              <li><strong>Gift Cards:</strong> Amazon, Google Play, iTunes, and more</li>
              <li><strong>Cryptocurrency:</strong> Bitcoin, Ethereum, and other popular options</li>
              <li><strong>Bank Transfer:</strong> Direct deposits to your {countryName} bank account</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                💡 Pro Tip: Users in {countryName} earn an average of {currency === "USD" ? "$15-25" : "15-25 units"} per hour
                when combining video watching with other earning methods on Cashog.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
              Is Watching Videos for Money Legit in {countryName}?
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Absolutely! Cashog is a legitimate platform that has paid over $8 million to users worldwide,
              including thousands in {countryName}. We're transparent about our payment system and have
              hundreds of verified payment proofs from {countryName} users. While you won't get rich overnight,
              video watching provides a reliable way to earn extra cash during your free time.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTERNAL LINKS SECTION ================= */}
      <section className="w-full py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            More Ways to Earn Money in {countryName}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "surveys", title: "Paid Surveys", desc: `Share your opinion and earn ${currency === "USD" ? "$1-$5" : "1-5 units"} per survey in ${countryName}`, icon: "📋" },
              { href: "apps", title: "Download Apps", desc: `Get paid ${currency === "USD" ? "$0.50-$2" : "0.50-2 units"} for trying new apps and games`, icon: "📱" },
              { href: "offers", title: "Complete Offers", desc: `Earn bonuses for signing up for free trials and services`, icon: "🎁" },
              { href: "referrals", title: "Referral Program", desc: `Earn 10% of your friends' earnings for life in ${countryName}`, icon: "👥" },
              { href: "daily-bonus", title: "Daily Bonuses", desc: `Claim your free daily bonus and streak rewards`, icon: "🎯" },
              { href: "contests", title: "Contests", desc: `Compete with users in ${countryName} for cash prizes`, icon: "🏆" },
            ].map((item, index) => (
              <Link
                key={index}
                href={`/${country}/${item.href}`}
                className="group bg-gray-50 dark:bg-gray-900 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                <div className="mt-4 text-blue-600 group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG LINKS SECTION ================= */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Learn More About Online Earning
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Check out our latest articles and guides
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { href: "/blog/how-to-earn-money-online", title: "Ultimate Guide: How to Earn Money Online in 2025", desc: "Discover 15 legitimate ways to make money from home" },
              { href: `/blog/best-side-hustles-${country}`, title: `Best Side Hustles in ${countryName} for 2025`, desc: "Top part-time opportunities to boost your income" },
              { href: "/blog/passive-income-ideas", title: "10 Passive Income Ideas That Actually Work", desc: "Build wealth while you sleep with these strategies" },
              { href: "/blog/make-money-watching-videos", title: "Complete Guide: Get Paid to Watch Videos", desc: "Maximize your earnings with these pro tips" },
            ].map((post, index) => (
              <Link
                key={index}
                href={post.href}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{post.desc}</p>
                <div className="mt-4 text-blue-600">Read Article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      {tData?.faq?.items?.length > 0 && (
        <section className="w-full py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions About Earning in {countryName}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Everything you need to know about getting paid to watch videos
            </p>
            
            <Suspense fallback={<div className="text-center py-8">Loading FAQ...</div>}>
              <FAQ
                title={`FAQ - ${countryName}`}
                faqs={tData.faq.items.map((f: any) => ({
                  q: replaceCountry(f.question, countryName),
                  a: replaceCountry(f.answer, countryName),
                }))}
              />
            </Suspense>
          </div>
        </section>
      )}

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Start Earning in {countryName}?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join over 100,000 users who are already making money by watching videos online.
            Sign up today - it's completely free!
          </p>
          <PrimaryCTA href="/signup" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100" />
          <p className="mt-6 text-sm text-blue-100">
            No credit card required • Cancel anytime • Instant payouts
          </p>
        </div>
      </section>

      {/* ================= SCROLL TO TOP BUTTON ================= */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </main>
  );
}
