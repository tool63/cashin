// app/[country]/(marketing)/watch-videos/page.tsx

import { cookies } from "next/headers";
import { Metadata, Viewport } from "next";
import Link from "next/link";
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

// Cache translations for better performance
const loadSectionTranslation = cache(async (language: string, section: string) => {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch {
    return {};
  }
});

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();
  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override && SUPPORTED_LANGUAGES.includes(override.split("-")[0] as any)) {
    return override.split("-")[0] as SupportedLanguage;
  }
  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved && SUPPORTED_LANGUAGES.includes(saved.split("-")[0] as any)) {
    return saved.split("-")[0] as SupportedLanguage;
  }
  return getCountry(country).defaultLanguage as SupportedLanguage;
}

const replaceCountry = (text: string, country: string) =>
  text.replace(/\{country\}/g, country);

// Pre-compute static paths for better performance
export async function generateStaticParams() {
  const countries = ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it'];
  return countries.map((country) => ({ country }));
}

/* ================= ADVANCED METADATA ================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3B82F6",
  colorScheme: "light dark",
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
  
  const title = `Get Paid to Watch Videos in ${countryName} | Earn $50-$100 Daily (2025)`;
  const description = `Start earning real money in ${countryName} by watching videos. ✓ $100+ daily potential ✓ Instant PayPal payouts ✓ 100% free to join. Trusted by 100K+ users. Start earning in 5 minutes!`;
  
  return {
    title,
    description,
    authors: [{ name: "Cashog", url: "https://cashog.com" }],
    creator: "Cashog",
    publisher: "Cashog",
    category: "earn money online",
    classification: "Online Earning Platform",
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
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
      title: `Get Paid to Watch Videos in ${countryName} - Earn $50-$100 Daily`,
      description: `Start earning real money in ${countryName} by watching videos. Instant PayPal payouts. 100% free to join.`,
      url: `https://cashog.com/${country}/watch-videos`,
      siteName: "Cashog",
      locale: language === "en" ? "en_US" : `${language}_${country.toUpperCase()}`,
      type: "website",
      images: [
        {
          url: `https://cashog.com/og/watch-videos-${country}.jpg`,
          width: 1200,
          height: 630,
          alt: `Get Paid to Watch Videos in ${countryName} - Cashog Platform`,
          type: "image/jpeg",
        },
      ],
      emails: ["support@cashog.com"],
      phoneNumbers: ["+1-888-CASHOG"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Get Paid to Watch Videos in ${countryName}`,
      description: `Start earning real money watching videos. $100+ daily potential. Instant payouts. Free to join!`,
      images: [`https://cashog.com/og/watch-videos-${country}.jpg`],
      site: "@cashog",
      creator: "@cashog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": 3,
        "max-image-preview": "large",
        "max-snippet": 200,
        noimageindex: false,
        notranslate: false,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "your-google-code",
      yandex: process.env.YANDEX_VERIFICATION || "your-yandex-code",
      other: {
        "msvalidate.01": process.env.BING_VERIFICATION || "your-bing-code",
        "p:domain_verify": process.env.PINTEREST_VERIFICATION || "your-pinterest-code",
      },
    },
    appleWebApp: {
      capable: true,
      title: "Cashog - Earn Money",
      statusBarStyle: "black-translucent",
      startupImage: [
        "/apple-touch-icon.png",
      ],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon-16x16.png",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    other: {
      "geo.region": country.toUpperCase(),
      "geo.placename": countryName,
      "geo.position": "0,0",
      "ICBM": "0,0",
      "revisit-after": "1 day",
      "rating": "General",
      "distribution": "global",
    },
  };
}

/* ================= PAGE COMPONENT ================= */

export default async function WatchVideosPage({ params }: any) {
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Country Not Supported</h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We're sorry, but this service is not available in your country yet.
            We're expanding rapidly - check back soon!
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Return to Home
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = countryData.name;
  const language = getLanguage(country);
  const tData = await loadSectionTranslation(language, "watch-videos");

  // Performance-optimized schema generation
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateJsonLd({
        path: `/${country}/watch-videos`,
        title: `Get Paid to Watch Videos in ${countryName}`,
        description: `Earn money watching videos in ${countryName}. Free signup, instant payouts. Join thousands earning passive income daily.`,
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
      tData?.faq?.items?.length > 0 && {
        "@type": "FAQPage",
        mainEntity: tData.faq.items.slice(0, 6).map((item: any) => ({
          "@type": "Question",
          name: replaceCountry(item.question, countryName),
          acceptedAnswer: { "@type": "Answer", text: replaceCountry(item.answer, countryName) },
        })),
      },
    ].filter(Boolean),
  };

  // Optimized earning data
  const earningMethods = [
    { name: "Ad Videos", earnings: "$0.05-$0.15", time: "5-10 sec", daily: "$15-30", difficulty: "Easy" },
    { name: "Sponsored Content", earnings: "$0.25-$1.00", time: "30-60 sec", daily: "$30-60", difficulty: "Medium" },
    { name: "Premium Videos", earnings: "$1.00-$5.00", time: "2-5 min", daily: "$50-100", difficulty: "Medium" },
    { name: "Daily Bonuses", earnings: "$0.50-$10.00", time: "5 min", daily: "$10-20", difficulty: "Easy" },
  ];

  return (
    <main className="flex flex-col items-center w-full bg-white dark:bg-gray-900" itemScope itemType="https://schema.org/WebPage">
      
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO SECTION - Updated for dark/light mode */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-blue-100 dark:bg-gray-800 rounded-full">
              <span className="text-yellow-500 dark:text-yellow-400 mr-2">⭐</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Trusted by 100,000+ users worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Get Paid to Watch Videos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                in {countryName}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Earn <strong className="text-blue-600 dark:text-blue-400">$50-$100 daily</strong> by watching videos, ads, and sponsored content.
              Join over 100,000 members already making passive income.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="transform hover:scale-105 transition-all duration-300 shadow-lg">
                <PrimaryCTA href="/signup" />
              </div>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch How It Works (2 min)
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6 justify-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>100% Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Instant Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="w-full py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Earners Worldwide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who are already earning
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100,000+", label: "Active Members", change: "+23% this month" },
              { number: "$12.5M+", label: "Total Paid", change: "Paid in 2024" },
              { number: "4.8/5", label: "User Rating", change: "From 15,000+ reviews" },
              { number: "45s", label: "Average Payout", change: "Faster than 99% of platforms" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARNING POTENTIAL TABLE */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real Earning Potential in {countryName}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how much you can earn by watching different types of videos
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Video Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Per Video</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Daily Potential</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {earningMethods.map((method, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{method.name}</td>
                      <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">{method.earnings}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{method.time}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{method.daily}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                💡 <strong className="text-blue-600 dark:text-blue-400">Pro Tip:</strong> Users who watch videos for 2-3 hours daily earn an average of $450-$600 monthly in {countryName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="w-full py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Earning in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in less than 5 minutes - no credit card required
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Free Account", desc: `Sign up in 30 seconds - no credit card needed in ${countryName}`, icon: "📝", time: "30 sec" },
              { step: "02", title: "Watch Videos", desc: "Start watching ads, trailers, and sponsored content immediately", icon: "🎬", time: "Start instantly" },
              { step: "03", title: "Cash Out", desc: `Withdraw via PayPal, gift cards, or bank transfer in ${countryName}`, icon: "💰", time: "Instant" },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{item.desc}</p>
                  <div className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Takes {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-800">
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
                💡 Pro Tip: Users in {countryName} earn an average of $15-$25 per hour
                when combining video watching with other earning methods on Cashog.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
              Is Watching Videos for Money Legit in {countryName}?
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Absolutely! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide,
              including thousands in {countryName}. We're transparent about our payment system and have
              hundreds of verified payment proofs from {countryName} users. While you won't get rich overnight,
              video watching provides a reliable way to earn extra cash during your free time.
            </p>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="w-full py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            More Ways to Earn Money in {countryName}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { href: "surveys", title: "Paid Surveys", desc: `Share your opinion and earn $1-$5 per survey in ${countryName}`, icon: "📋" },
              { href: "apps", title: "Download Apps", desc: `Get paid $0.50-$2 for trying new apps and games`, icon: "📱" },
              { href: "offers", title: "Complete Offers", desc: `Earn bonuses for signing up for free trials and services`, icon: "🎁" },
              { href: "referrals", title: "Referral Program", desc: `Earn 10% of your friends' earnings for life in ${countryName}`, icon: "👥" },
              { href: "daily-bonus", title: "Daily Bonuses", desc: `Claim your free daily bonus and streak rewards`, icon: "🎯" },
              { href: "contests", title: "Contests", desc: `Compete with users in ${countryName} for cash prizes`, icon: "🏆" },
            ].map((item, index) => (
              <Link
                key={index}
                href={`/${country}/${item.href}`}
                className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG LINKS SECTION */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-800">
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
                className="bg-white dark:bg-gray-900 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{post.desc}</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400">Read Article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {tData?.faq?.items?.length > 0 && (
        <section className="w-full py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about earning in {countryName}
              </p>
            </div>
            
            <div className="space-y-4">
              {tData.faq.items.slice(0, 6).map((item: any, index: number) => (
                <details key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 dark:text-white list-none">
                    <span>{replaceCountry(item.question, countryName)}</span>
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    {replaceCountry(item.answer, countryName)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION - Updated for dark/light mode */}
      <section className="relative w-full py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/50 dark:to-gray-900/50" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Start Earning Real Money Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 100,000+ users already earning with Cashog. Free to join - start in 30 seconds!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="transform hover:scale-105 transition-all duration-300 shadow-lg">
              <PrimaryCTA href="/signup" />
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            *Limited time offer for {countryName} users - exclusive signup bonus available
          </p>
        </div>
      </section>

      {/* PERFORMANCE OPTIMIZATION: Preload critical assets */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </main>
  );
}
