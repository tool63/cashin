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
  const languages: Record<string, string> = {
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
  };
  return languages;
};

// Country-specific data helpers (using switch statements to avoid TypeScript Record issues)
const getCountryPaymentMethods = (country: CountryCode): string[] => {
  const countryCode = country.toLowerCase();
  
  // Special country-specific payment methods
  if (countryCode === "bd") return ["bKash", "PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "in") return ["Paytm", "PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "ph") return ["GCash", "PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "ke") return ["M-Pesa", "PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "tz") return ["Tigo Pesa", "PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "ng") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "pk") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "id") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "vn") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "th") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "my") return ["PayPal", "Bank Transfer", "Gift Cards"];
  if (countryCode === "sg") return ["PayPal", "Bank Transfer", "Gift Cards"];
  
  // Default for US, UK, CA, AU, EU countries
  return ["PayPal", "Bank Transfer", "Gift Cards"];
};

const getCountryCPM = (country: CountryCode): { perVideo: string; dailyAverage: string; dailyMax: string } => {
  const countryCode = country.toLowerCase();
  
  const cpmMap: Record<string, { perVideo: string; dailyAverage: string; dailyMax: string }> = {
    us: { perVideo: "$0.08-$0.12", dailyAverage: "$15-25", dailyMax: "$40-50" },
    gb: { perVideo: "£0.06-£0.10", dailyAverage: "£12-20", dailyMax: "£35-45" },
    ca: { perVideo: "C$0.07-C$0.11", dailyAverage: "C$18-30", dailyMax: "C$50-60" },
    au: { perVideo: "A$0.08-A$0.12", dailyAverage: "A$20-35", dailyMax: "A$55-65" },
    de: { perVideo: "€0.06-€0.10", dailyAverage: "€12-20", dailyMax: "€35-45" },
    fr: { perVideo: "€0.06-€0.10", dailyAverage: "€12-20", dailyMax: "€35-45" },
    es: { perVideo: "€0.05-€0.09", dailyAverage: "€10-18", dailyMax: "€30-40" },
    it: { perVideo: "€0.05-€0.09", dailyAverage: "€10-18", dailyMax: "€30-40" },
    bd: { perVideo: "৳5-৳10", dailyAverage: "৳500-1000", dailyMax: "৳1500-2000" },
    in: { perVideo: "₹5-₹10", dailyAverage: "₹500-1000", dailyMax: "₹1500-2000" },
    ph: { perVideo: "₱3-₱6", dailyAverage: "₱300-600", dailyMax: "₱900-1200" },
    ng: { perVideo: "₦50-₦100", dailyAverage: "₦5000-10000", dailyMax: "₦15000-20000" },
    pk: { perVideo: "₨10-₨20", dailyAverage: "₨1000-2000", dailyMax: "₨3000-4000" },
    id: { perVideo: "Rp500-Rp1000", dailyAverage: "Rp50000-100000", dailyMax: "Rp150000-200000" },
    vn: { perVideo: "₫1000-₫2000", dailyAverage: "₫100000-200000", dailyMax: "₫300000-400000" },
  };
  
  return cpmMap[countryCode] || { perVideo: "$0.05-$0.10", dailyAverage: "$10-20", dailyMax: "$30-40" };
};

const getCountryLocalTestimonials = (country: CountryCode): Array<{ name: string; earnings: string; quote: string }> => {
  const countryCode = country.toLowerCase();
  
  const testimonialMap: Record<string, Array<{ name: string; earnings: string; quote: string }>> = {
    bd: [
      { name: "Rahim U.", earnings: "৳15,000", quote: "Cashog helped me earn extra income while watching videos on my phone during commute." },
      { name: "Fatima K.", earnings: "৳12,500", quote: "The bKash withdrawal option is amazing! Money arrives instantly." },
    ],
    in: [
      { name: "Priya S.", earnings: "₹18,000", quote: "Paytm withdrawals are instant. Best decision to join Cashog!" },
      { name: "Amit K.", earnings: "₹22,000", quote: "I earn daily by watching videos for 2 hours. Highly recommended!" },
    ],
    ph: [
      { name: "Maria R.", earnings: "₱15,000", quote: "GCash payout is super fast. I love earning while watching videos!" },
      { name: "Juan D.", earnings: "₱18,000", quote: "Legit platform. Received my first payout within 24 hours." },
    ],
    us: [
      { name: "John S.", earnings: "$2,450", quote: "Best side hustle ever! I earn $20 daily watching videos during my lunch break." },
      { name: "Sarah M.", earnings: "$3,200", quote: "PayPal withdrawals are instant. Highly recommend Cashog!" },
    ],
    gb: [
      { name: "David K.", earnings: "£1,890", quote: "Great platform for extra income. Earn while watching videos on the train!" },
      { name: "Emma L.", earnings: "£2,100", quote: "Love the instant payouts to my bank account. 5 stars!" },
    ],
  };
  
  return testimonialMap[countryCode] || [];
};

const getCountryEarningTips = (country: CountryCode): Array<{ title: string; description: string }> => {
  const countryCode = country.toLowerCase();
  
  const tipsMap: Record<string, Array<{ title: string; description: string }>> = {
    bd: [
      { title: "Watch During Off-Peak Hours", description: "Internet is faster and videos load quicker between 10 PM - 8 AM." },
      { title: "Use bKash for Withdrawals", description: "bKash offers the lowest fees and instant transfers in Bangladesh." },
    ],
    in: [
      { title: "Use Paytm for Fast Payouts", description: "Paytm withdrawals are processed instantly with zero fees." },
      { title: "Watch During Evenings", description: "6 PM - 10 PM has the highest paying video offers in India." },
    ],
    ph: [
      { title: "Use GCash for Instant Payouts", description: "GCash offers the fastest withdrawals with no fees." },
      { title: "Watch During Peak Hours", description: "Evenings and weekends offer 40% more video opportunities." },
    ],
  };
  
  return tipsMap[countryCode] || [
    { title: "Watch During Peak Hours", description: "Evenings and weekends offer 40% more video opportunities." },
    { title: "Complete Your Profile", description: "Verified users get access to 3x more video opportunities." },
    { title: "Maintain Daily Streak", description: "Log in daily to unlock bonus rewards up to $5 extra per day." },
    { title: "Use Mobile App", description: "Exclusive app-only video offers pay up to 2x more than web." },
  ];
};

const getCountryFAQs = (country: CountryCode): Array<{ question: string; answer: string }> => {
  const countryName = getCountry(country).name;
  const cpmData = getCountryCPM(country);
  const paymentMethods = getCountryPaymentMethods(country);
  
  return [
    {
      question: `Is watching videos for money legit in ${countryName}?`,
      answer: `Yes! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide, including thousands in ${countryName}. We are PayPal Verified with a 4.8/5 rating from 12,000+ Trustpilot reviews.`
    },
    {
      question: `How much can I earn watching videos in ${countryName}?`,
      answer: `Most users earn ${cpmData.dailyAverage} per day watching videos for 2-3 hours. Top earners make up to ${cpmData.dailyMax} monthly.`
    },
    {
      question: `Which app pays the most for watching videos in ${countryName}?`,
      answer: `Cashog pays the highest rates in ${countryName} with ${cpmData.perVideo} per video - that's 3-5x higher than competitors like Swagbucks or InboxDollars.`
    },
    {
      question: `How do I withdraw my earnings in ${countryName}?`,
      answer: `You can withdraw via ${paymentMethods.slice(0, 3).join(", ")}. Most withdrawals are processed instantly with no hidden fees.`
    },
    {
      question: `Do I need to pay taxes on my earnings in ${countryName}?`,
      answer: `You should report your earnings to your local tax authority. Cashog provides annual earnings statements for tax purposes. Consult a tax professional for specific advice.`
    },
    {
      question: `What's the minimum payout in ${countryName}?`,
      answer: `The minimum payout is $5 for PayPal and $10 for gift cards. Verified users can withdraw instantly with no minimum on PayPal.`
    },
  ];
};

const getCountryPeopleAlsoSearch = (country: CountryCode): string[] => {
  const countryName = getCountry(country).name;
  const lowerCountry = countryName.toLowerCase();
  
  return [
    `earn money online in ${lowerCountry}`,
    `best earning apps in ${lowerCountry}`,
    `passive income apps ${lowerCountry}`,
    `how to make money online ${lowerCountry} fast`,
    `legit earning platform ${lowerCountry}`,
    `daily income app ${lowerCountry}`,
    `side hustle apps ${lowerCountry}`,
    `work from home jobs ${lowerCountry}`,
    `make money from phone ${lowerCountry}`,
    `online earning sites ${lowerCountry}`,
  ];
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

  const cpmData = getCountryCPM(country);
  const earningPotential = cpmData.dailyAverage;

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

  // Country-specific data from inline helpers
  const paymentMethods = getCountryPaymentMethods(country);
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
      `Want to earn fast daily income in ${countryName}? Join ${countryData.activeUsers || "100K+"} members earning ${cpmData.dailyAverage} daily by watching videos. ✓ No investment ✓ Legit platform ✓ Instant payouts via ${paymentMethods.slice(0, 2).join(" or ")}!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Why Thousands Choose Cashog"),
    videosWatched: tData?.stats?.videosWatched || "50M+",
    videosWatchedLabel: tData?.stats?.videosWatchedLabel || "Videos Watched",
    avgPayout: tData?.stats?.avgPayout || cpmData.perVideo,
    avgPayoutLabel: tData?.stats?.avgPayoutLabel || "Average Per Video",
    activeUsers: tData?.stats?.activeUsers || countryData.activeUsers || "100K+",
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Members",
    totalPaid: tData?.stats?.totalPaid || countryData.totalPaid || "$12.5M+",
    totalPaidLabel: tData?.stats?.totalPaidLabel || "Total Paid",
  };

  const videoCategoriesData = (tData?.videoCategories || []).map((category) => ({
    ...category,
    title: t(category.title, category.title),
    description: t(category.description, category.description),
    avgReward: category.avgReward?.replace("{cpm}", cpmData.perVideo) || cpmData.perVideo,
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

  // Use local testimonials if available, otherwise use translation
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

  // Combine FAQs
  const combinedFAQs = [
    ...countryFAQs,
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
      `Join ${statsData.activeUsers} members already earning in ${countryName}. Sign up for free - no credit card required. Start earning today!`
    ),
  };

  // Trust badges
  const trustBadges = [
    { name: "PayPal Verified", icon: "✅", description: "Instant withdrawals" },
    { name: "4.8⭐ Rating", icon: "⭐", description: "From 12,000+ reviews" },
    { name: `Trusted by ${statsData.activeUsers}`, icon: "👥", description: "Active users worldwide" },
    { name: "No Investment", icon: "💰", description: "100% free to join" },
    { name: "Fast Payouts", icon: "⚡", description: "Same-day withdrawals" },
  ];

  // Hub pages
  const hubPages = [
    { href: "surveys", title: "Paid Surveys", anchorText: "earn money with paid surveys in", icon: "📋", description: "Share your opinion & earn $1-$5 each" },
    { href: "offers", title: "Complete Offers", anchorText: "high paying offers", icon: "🎁", description: "Complete tasks & earn $0.50-$20" },
    { href: "apps", title: "Download Apps", anchorText: "app install earnings", icon: "📱", description: "Get paid $0.50-$2 per app download" },
    { href: "referrals", title: "Referral Program", anchorText: "referral program for passive income", icon: "👥", description: "Earn 10% lifetime commission" },
    { href: "play-games", title: "Play Games", anchorText: "play games for money", icon: "🎮", description: "Earn $0.50-$5 per hour playing" },
    { href: "watch-ads", title: "Watch Ads", anchorText: "watch ads get paid", icon: "📺", description: "Earn $0.03-$0.10 per ad" },
  ];

  const earningsDisclaimer = `Most users in ${countryName} earn ${cpmData.dailyAverage} per day watching videos for 2-3 hours. Results vary based on activity level.`;

  // Blog-style content block
  const blogContent = {
    title: `Best Time to Watch Videos for Money in ${countryName} (Pro Tips to Maximize Earnings)`,
    sections: [
      {
        subtitle: "Peak Hours for Maximum Earnings",
        content: `Based on data from ${statsData.activeUsers} active users in ${countryName}, the best times to watch videos for money are evenings (6 PM - 10 PM local time) and weekends. During these peak hours, advertisers release 40% more video inventory, and the average payout per video increases by 25%. Morning sessions (8 AM - 11 AM) also perform well for international advertisers targeting ${countryName}.`
      },
      {
        subtitle: "How to Increase Your Daily Earnings",
        content: `To maximize your earnings watching videos in ${countryName}, focus on these proven strategies: First, complete your profile verification - verified users get access to 3x more video opportunities. Second, maintain your daily streak - logging in consecutively unlocks bonus rewards up to $5 extra per day. Third, use our mobile app - exclusive app-only video offers pay up to 2x more than web-based videos. Fourth, refer friends - you earn 10% of their earnings for life, creating true passive income. ${earningTips.map(tip => `${tip.title}: ${tip.description}`).join(" ")}`
      },
      {
        subtitle: `Is Watching Videos for Money Legit in ${countryName}?`,
        content: `Absolutely! Cashog is a legitimate platform that has paid over $12.5 million to users worldwide, including thousands in ${countryName}. We are PayPal Verified, have a 4.8/5 rating from 12,000+ Trustpilot reviews, and have been featured on Business Insider, Forbes, and Entrepreneur.com. Unlike scam sites, we have transparent payout systems, 24/7 customer support, and instant withdrawals. Users in ${countryName} can withdraw earnings via ${paymentMethods.slice(0, 3).join(", ")}.`
      },
      {
        subtitle: `Fastest Way to Earn Daily Income in ${countryName}`,
        content: `The fastest way to start earning daily income in ${countryName} is to combine multiple earning methods. While watching videos alone can earn you ${cpmData.dailyAverage}, power users who also complete ${hubPages[0].anchorText} ${countryName}, ${hubPages[1].anchorText}, and ${hubPages[4].anchorText} typically earn ${cpmData.dailyMax} per day. The key is consistency - even 30 minutes daily can generate $50-$100 monthly. Most users reach their first payout within 24-48 hours.`
      }
    ]
  };

  // Breadcrumb schema
  const breadcrumbData = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://cashog.com/${country}` },
      { "@type": "ListItem", "position": 2, "name": "Earn Money", "item": `https://cashog.com/${country}/earn` },
      { "@type": "ListItem", "position": 3, "name": `Watch Videos Earn Money ${countryName}`, "item": `https://cashog.com/${country}/watch-videos` }
    ]
  };

  // FAQ schema
  const faqSchemaData = {
    "@type": "FAQPage",
    "mainEntity": faqData.items.slice(0, 8).map((item) => ({
      "@type": "Question",
      "name": item.q || item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.a || item.answer }
    }))
  };

  // Organization schema
  const organizationSchema = {
    "@type": "Organization",
    "name": "Cashog",
    "url": `https://cashog.com/${country}`,
    "logo": "https://cashog.com/logo.png",
    "sameAs": ["https://www.facebook.com/cashog", "https://twitter.com/cashog", "https://www.instagram.com/cashog"],
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "12500", "bestRating": "5", "worstRating": "1" }
  };

  // All Schema Markup
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateJsonLd({ path: `/${country}/watch-videos`, title, description, type: "low" }),
      breadcrumbData,
      faqSchemaData,
      organizationSchema,
      {
        "@type": "HowTo",
        "name": `How to Earn Money Watching Videos in ${countryName} (Fast & Legit)`,
        "description": `Step-by-step guide to start earning daily income by watching videos in ${countryName}`,
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
        "step": [
          { "@type": "HowToStep", "name": "Create Free Account", "text": `Sign up for a free Cashog account in ${countryName} - no credit card required`, "position": 1 },
          { "@type": "HowToStep", "name": "Watch Videos", "text": "Start watching sponsored videos and ads immediately", "position": 2 },
          { "@type": "HowToStep", "name": "Earn Rewards", "text": `Collect points and convert to real money - earn ${cpmData.dailyAverage} daily`, "position": 3 },
          { "@type": "HowToStep", "name": "Withdraw Earnings", "text": `Cash out instantly via ${paymentMethods.slice(0, 3).join(", ")} in ${countryName}`, "position": 4 }
        ]
      },
      {
        "@type": "Product",
        "name": `Cashog - Best Earning App in ${countryName}`,
        "description": `Earn ${cpmData.dailyAverage} daily watching videos in ${countryName} - Legit & Fast`,
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "12500", "bestRating": "5", "worstRating": "1" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      }
    ].filter(Boolean),
  };

  return (
    <main className="flex flex-col items-center w-full">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              {heroData.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.name}</span>
                </div>
              ))}
            </div>

            <PrimaryCTA href="/signup" translationKey="start_earning_now_free" observer={true} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">{earningsDisclaimer}</p>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Stats Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{statsData.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">Join thousands already earning fast daily income in {countryName}</p>
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
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">💰 Current rate in {countryName}: {cpmData.perVideo} per video • {cpmData.dailyAverage} daily average</p>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Blog-style Content Block */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">{blogContent.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
              <div className="space-y-8">
                {blogContent.sections.map((section, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{section.subtitle}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* People Also Search Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">People Also Search</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">Popular searches related to earning money in {countryName}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {peopleAlsoSearch.map((term, idx) => (
                <span key={idx} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">{term}</span>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Hub Pages Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">More Ways to Earn Fast Daily Income</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">Combine these methods to maximize your earnings in {countryName}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {hubPages.map((page, idx) => (
                <Link key={idx} href={`/${country}/earn/${page.href}`} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                  <div className="text-3xl mb-2">{page.icon}</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm">{page.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{page.description}</div>
                </Link>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Contextual Internal Links */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Start Your Earning Journey Today</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
                <p>
                  Watching videos is just one of many ways to <strong>earn money online in {countryName}</strong>. You can also <Link href={`/${country}/earn/surveys`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">earn money with paid surveys in {countryName}</Link> where you can make $1-$5 per survey sharing your opinion. Many users combine video watching with <Link href={`/${country}/earn/offers`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">high paying offers</Link> to maximize their daily earnings.
                </p>
                <p>
                  For those who prefer mobile earning, <Link href={`/${country}/earn/apps`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">app install earnings</Link> can add an extra $5-$10 daily. You can also <Link href={`/${country}/earn/play-games`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">play games for money</Link> and earn while having fun. Don't forget our <Link href={`/${country}/earn/referrals`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">referral program for passive income</Link> - you earn 10% of your friends' earnings for life!
                </p>
                <p>
                  The key to success on Cashog is diversifying your earning methods. While watching videos alone can earn you {cpmData.dailyAverage}, combining it with <Link href={`/${country}/earn/surveys`} className="text-blue-600 dark:text-blue-400 hover:underline">paid surveys in {countryName}</Link>, <Link href={`/${country}/earn/offers`} className="text-blue-600 dark:text-blue-400 hover:underline">high paying offers</Link>, and <Link href={`/${country}/earn/play-games`} className="text-blue-600 dark:text-blue-400 hover:underline">play games for money</Link> can push your earnings to {cpmData.dailyMax} per day.
                </p>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Payment Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Get Paid Fast in {countryName}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">Choose from multiple withdrawal options - all with instant processing</p>
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t(tData?.tipsTitle, "Pro Tips to Maximize Your Video Earnings")}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {tipsData.map((tip) => (
                  <div key={tip.number} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">{tip.number}</div>
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t(tData?.testimonialsTitle, "Real Users in {country} Are Earning Real Money")}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{testimonial.avatar}</div>
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

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{faqData.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">Everything you need to know about earning money watching videos in {countryName}</p>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{finalData.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">{finalData.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm text-gray-600 dark:text-gray-400">Free to join</span></div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm text-gray-600 dark:text-gray-400">Instant payouts</span></div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm text-gray-600 dark:text-gray-400">24/7 support</span></div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm text-gray-600 dark:text-gray-400">No hidden fees</span></div>
            </div>
            <PrimaryCTA href="/signup" translationKey="start_earning_now_free" observer={true} />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 max-w-md mx-auto">{earningsDisclaimer}</p>
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
