// app/[country]/(marketing)/shopping-rewards/travel/hotels/page.tsx

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

interface HotelBookingSite {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  features: string[];
  bestFor: string[];
  link: string;
}

interface HotelDeal {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  cashbackRate: string;
  site: string;
  location: string;
  rating: number;
  image: string;
  link: string;
}

interface Destination {
  city: string;
  country: string;
  image: string;
  hotelCount: number;
  avgCashback: string;
  link: string;
}

interface HotelChain {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  properties: number;
  benefits: string[];
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
  stats?: {
    hotelsBooked?: string;
    savingsAmount?: string;
    partnerSites?: string;
    userRating?: string;
  };
  bookingSitesTitle?: string;
  bookingSites?: HotelBookingSite[];
  topDestinationsTitle?: string;
  topDestinations?: Destination[];
  hotelChainsTitle?: string;
  hotelChains?: HotelChain[];
  hotDealsTitle?: string;
  hotDeals?: HotelDeal[];
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    sites?: Array<{
      name: string;
      cashbackRate: string;
      priceMatch: string;
      freeCancellation: string;
      loyaltyProgram: string;
      rating: number;
    }>;
  };
  lastMinuteDealsTitle?: string;
  lastMinuteDeals?: HotelDeal[];
  luxuryCollectionTitle?: string;
  luxuryCollection?: Array<{
    name: string;
    logo: string;
    cashbackRate: string;
    description: string;
    locations: string[];
    link: string;
  }>;
  priceMatchTitle?: string;
  priceMatch?: {
    title?: string;
    description?: string;
    buttonText?: string;
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
    `hotel cashback ${lowerCountry}`,
    `book hotels with cashback ${lowerCountry}`,
    `hotel booking rewards ${lowerCountry}`,
    `cashback on hotel stays ${lowerCountry}`,
    `best hotel deals ${lowerCountry}`,
    `hotel discounts ${lowerCountry}`,
    `accommodation cashback ${lowerCountry}`,
    `hotel booking sites ${lowerCountry}`,
    `last minute hotel deals ${lowerCountry}`,
    `luxury hotel cashback ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "hotels.com cashback",
      "booking.com usa",
      "expedia hotel deals",
      "marriott bonvoy cashback"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "hotel cashback uk",
      "booking.com uk",
      "premier inn cashback",
      "travelodge deals"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "hotel cashback canada",
      "booking.com canada",
      "fairmont hotels cashback"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "hotel cashback australia",
      "booking.com australia",
      "accommodation deals au"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-travel-hotels");
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
    `Hotel Cashback - Earn Up to 15% Back on Hotel Bookings in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Book hotels with cashback in ${countryName}. Earn up to 15% back on hotel stays at Booking.com, Expedia, Hotels.com, and more. Save on luxury resorts, budget hotels, and everything in between.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/travel/hotels`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/travel/hotels`,
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

export default async function HotelsCashbackPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-travel-hotels");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Hotel Cashback - Earn Up to 15% Back`);
  const description = t(rawDescription, `Book hotels with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/travel/hotels`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Hotel Bookings"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Save money on every hotel stay in ${countryName}. Earn up to 15% cashback when you book through top hotel sites like Booking.com, Expedia, Hotels.com, and more. From budget motels to luxury resorts.`
    ),
  };

  const statsData = {
    hotelsBooked: t(tData?.stats?.hotelsBooked, "2M+"),
    savingsAmount: t(tData?.stats?.savingsAmount, "$25M+"),
    partnerSites: t(tData?.stats?.partnerSites, "50+"),
    userRating: t(tData?.stats?.userRating, "4.8"),
  };

  const bookingSitesData = {
    title: t(tData?.bookingSitesTitle, "Top Hotel Booking Sites"),
    sites: (tData?.bookingSites || []).map((site) => ({
      ...site,
      name: t(site.name, site.name),
      description: t(site.description, site.description),
    })),
  };

  // Default booking sites if not in translation
  if (bookingSitesData.sites.length === 0) {
    bookingSitesData.sites = [
      {
        name: "Booking.com",
        logo: "🏨",
        cashbackRate: "Up to 8%",
        description: "World's largest selection of hotels, apartments, and hostels",
        features: ["Free cancellation", "Price match", "24/7 support", "Genius loyalty"],
        bestFor: ["All travelers", "Best selection", "Flexible bookings"],
        link: "/travel/booking",
      },
      {
        name: "Expedia",
        logo: "✈️",
        cashbackRate: "Up to 10%",
        description: "Hotels, flights, car rentals, and vacation packages",
        features: ["Bundle savings", "Member prices", "OneKey rewards", "Free cancellation"],
        bestFor: ["Package deals", "Last minute", "US travelers"],
        link: "/travel/expedia",
      },
      {
        name: "Hotels.com",
        logo: "🏨",
        cashbackRate: "Up to 12%",
        description: "Specialized hotel booking with rewards program",
        features: ["Collect 10 nights get 1 free", "Secret prices", "Price guarantee", "VIP access"],
        bestFor: ["Hotel specialists", "Rewards seekers", "Regular travelers"],
        link: "/travel/hotelscom",
      },
      {
        name: "Agoda",
        logo: "🌏",
        cashbackRate: "Up to 10%",
        description: "Great deals on hotels in Asia and worldwide",
        features: ["Flash deals", "Member discounts", "PointsMax rewards", "24/7 support"],
        bestFor: ["Asia travel", "Budget stays", "Last minute"],
        link: "/travel/agoda",
      },
      {
        name: "Kayak",
        logo: "🔍",
        cashbackRate: "Up to 6%",
        description: "Hotel price comparison and booking",
        features: ["Price alerts", "Travel search", "Deals finder", "Explore tool"],
        bestFor: ["Price comparison", "Flexible dates", "Value seekers"],
        link: "/travel/kayak",
      },
      {
        name: "Priceline",
        logo: "💰",
        cashbackRate: "Up to 8%",
        description: "Express deals and name-your-own-price hotels",
        features: ["Express deals", "Pricebreakers", "VIP program", "Bundle savings"],
        bestFor: ["Express deals", "Name your price", "Budget travelers"],
        link: "/travel/priceline",
      },
    ];
  }

  const topDestinationsData = {
    title: t(tData?.topDestinationsTitle, "Popular Hotel Destinations"),
    destinations: (tData?.topDestinations || []).map((destination) => ({
      ...destination,
      city: t(destination.city, destination.city),
      country: t(destination.country, destination.country),
    })),
  };

  // Default destinations if not in translation
  if (topDestinationsData.destinations.length === 0) {
    topDestinationsData.destinations = [
      { city: "New York", country: "USA", image: "🗽", hotelCount: 850, avgCashback: "8%", link: "/travel/hotels/new-york" },
      { city: "London", country: "UK", image: "🏰", hotelCount: 720, avgCashback: "7%", link: "/travel/hotels/london" },
      { city: "Paris", country: "France", image: "🗼", hotelCount: 680, avgCashback: "8%", link: "/travel/hotels/paris" },
      { city: "Tokyo", country: "Japan", image: "🗻", hotelCount: 950, avgCashback: "9%", link: "/travel/hotels/tokyo" },
      { city: "Dubai", country: "UAE", image: "🏜️", hotelCount: 520, avgCashback: "10%", link: "/travel/hotels/dubai" },
      { city: "Sydney", country: "Australia", image: "🏄", hotelCount: 480, avgCashback: "7%", link: "/travel/hotels/sydney" },
      { city: "Bangkok", country: "Thailand", image: "🏯", hotelCount: 890, avgCashback: "12%", link: "/travel/hotels/bangkok" },
      { city: "Las Vegas", country: "USA", image: "🎰", hotelCount: 420, avgCashback: "6%", link: "/travel/hotels/las-vegas" },
    ];
  }

  const hotelChainsData = {
    title: t(tData?.hotelChainsTitle, "Hotel Chain Cashback"),
    chains: (tData?.hotelChains || []).map((chain) => ({
      ...chain,
      name: t(chain.name, chain.name),
      description: t(chain.description, chain.description),
    })),
  };

  // Default hotel chains if not in translation
  if (hotelChainsData.chains.length === 0) {
    hotelChainsData.chains = [
      {
        name: "Marriott Bonvoy",
        logo: "🏨",
        cashbackRate: "Up to 8%",
        description: "World's largest hotel portfolio with 30+ brands",
        properties: 8000,
        benefits: ["Free nights", "Room upgrades", "Late checkout", "Mobile check-in"],
        link: "/hotel/marriott",
      },
      {
        name: "Hilton Honors",
        logo: "🏨",
        cashbackRate: "Up to 7%",
        description: "Premium hotels from luxury to budget",
        properties: 7000,
        benefits: ["Points pooling", "Digital key", "Free nights", "Diamond status"],
        link: "/hotel/hilton",
      },
      {
        name: "IHG One Rewards",
        logo: "🏨",
        cashbackRate: "Up to 8%",
        description: "InterContinental, Holiday Inn, Kimpton, and more",
        properties: 6000,
        benefits: ["Reward nights", "Milestone rewards", "Point transfers", "Elite status"],
        link: "/hotel/ihg",
      },
      {
        name: "Accor Live Limitless",
        logo: "🏨",
        cashbackRate: "Up to 9%",
        description: "Fairmont, Sofitel, Novotel, and budget options",
        properties: 5000,
        benefits: ["Status matches", "Free breakfast", "Room upgrades", "Local experiences"],
        link: "/hotel/accor",
      },
    ];
  }

  const hotDealsData = {
    title: t(tData?.hotDealsTitle, "Hot Hotel Deals"),
    deals: (tData?.hotDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      site: t(deal.site, deal.site),
      location: t(deal.location, deal.location),
    })),
  };

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Hotel Booking Tips"),
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
        title: "Book Direct vs OTA",
        description: "Compare direct booking benefits with OTA cashback offers for best value.",
        icon: "🏨",
      },
      {
        title: "Stack Rewards",
        description: "Combine cashback with hotel loyalty programs and credit card points.",
        icon: "📚",
      },
      {
        title: "Flexible Dates",
        description: "Use flexible date search to find lower rates and higher cashback.",
        icon: "📅",
      },
      {
        title: "Last Minute Deals",
        description: "Check last-minute apps for same-day booking discounts plus cashback.",
        icon: "⚡",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "Compare Booking Sites"),
    description: t(tData?.comparison?.description, "Find the best cashback rates for your hotel stay"),
    sites: (tData?.comparison?.sites || []).map((site) => ({
      ...site,
      name: t(site.name, site.name),
    })),
  };

  const lastMinuteDealsData = {
    title: t(tData?.lastMinuteDealsTitle, "Last Minute Hotel Deals"),
    deals: (tData?.lastMinuteDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      site: t(deal.site, deal.site),
      location: t(deal.location, deal.location),
    })),
  };

  const luxuryCollectionData = {
    title: t(tData?.luxuryCollectionTitle, "Luxury Hotel Collection"),
    hotels: (tData?.luxuryCollection || []).map((hotel) => ({
      ...hotel,
      name: t(hotel.name, hotel.name),
      description: t(hotel.description, hotel.description),
    })),
  };

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Rate?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best hotel cashback rates"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Hotel Rates"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Hotel Cashback FAQ - ${countryName}`),
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
        q: "How do I earn cashback on hotel bookings?",
        a: "Simply click through Cashog to your preferred hotel booking site, complete your reservation as usual, and cashback will be automatically tracked and added to your account.",
      },
      {
        q: "Can I combine cashback with hotel loyalty programs?",
        a: "Yes! Most hotel booking sites allow you to earn both cashback and loyalty points simultaneously. Just make sure to enter your loyalty number during checkout.",
      },
      {
        q: "How long does hotel cashback take to confirm?",
        a: "Hotel cashback typically takes 30-60 days to confirm after your stay is completed. This accounts for cancellation periods and stay verification.",
      },
      {
        q: "What if I need to cancel my booking?",
        a: "If you cancel a booking, the cashback will not be credited. If you've already received it, it will be deducted from your account.",
      },
      {
        q: "Do all hotels qualify for cashback?",
        a: "Most hotels on our partner sites qualify, but some exclusions may apply (e.g., non-refundable rates, certain chains). Check site terms for details.",
      },
      {
        q: "Can I earn cashback on prepaid hotel bookings?",
        a: "Yes! Prepaid bookings are eligible for cashback. The cashback will be confirmed after your stay is completed.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Hotel Stays Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of travelers earning cashback on every hotel booking"),
    buttonText: t(tData?.final?.buttonText, "Book Hotels with Cashback"),
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
              href="/travel/hotels/search"
              translationKey="search_hotels"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {statsData.hotelsBooked}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Hotels Booked
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {statsData.savingsAmount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Member Savings
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {statsData.partnerSites}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Partner Sites
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {statsData.userRating}★
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  User Rating
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Booking Sites Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="booking-sites-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="booking-sites-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {bookingSitesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingSitesData.sites.map((site, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{site.logo}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {site.name}
                      </h3>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-bold">
                      {site.cashbackRate}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {site.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {site.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Best For:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {site.bestFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={site.link}
                    translationKey="book_now"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Destinations Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="destinations-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="destinations-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topDestinationsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {topDestinationsData.destinations.map((destination, index) => (
                <a
                  key={index}
                  href={destination.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {destination.image}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {destination.city}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {destination.country}
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {destination.avgCashback} cashback
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Hotel Chains Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="chains-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="chains-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {hotelChainsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotelChainsData.chains.map((chain, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{chain.logo}</div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {chain.cashbackRate}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {chain.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {chain.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {chain.properties.toLocaleString()}+ properties worldwide
                  </div>
                  <ul className="space-y-1 mb-4">
                    {chain.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-green-500 mr-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <PrimaryCTA
                    href={chain.link}
                    translationKey="view_offers"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Hot Deals Section */}
      {hotDealsData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="deals-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="deals-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {hotDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "🏨"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {deal.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {deal.location}
                          </p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-500">
                          {"★".repeat(Math.floor(deal.rating))}
                          {"☆".repeat(5 - Math.floor(deal.rating))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{deal.rating}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          via {deal.site}
                        </span>
                      </div>
                      <PrimaryCTA
                        href={deal.link}
                        translationKey="view_deal"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Comparison Section */}
      {comparisonData.sites && comparisonData.sites.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="comparison-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="comparison-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {comparisonData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {comparisonData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Booking Site</th>
                      <th className="px-6 py-3 text-left">Cashback Rate</th>
                      <th className="px-6 py-3 text-left">Price Match</th>
                      <th className="px-6 py-3 text-left">Free Cancellation</th>
                      <th className="px-6 py-3 text-left">Loyalty Program</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.sites.map((site, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {site.name}
                        </td>
                        <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold">
                          {site.cashbackRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.priceMatch}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.freeCancellation}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.loyaltyProgram}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{site.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/travel/${site.name.toLowerCase().replace(/\s+/g, '')}`}
                            translationKey="book"
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

      {/* Last Minute Deals Section */}
      {lastMinuteDealsData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="last-minute-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="last-minute-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {lastMinuteDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lastMinuteDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-800"
                  >
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "⚡"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {deal.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {deal.location}
                          </p>
                        </div>
                        <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {deal.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          via {deal.site}
                        </span>
                      </div>
                      <PrimaryCTA
                        href={deal.link}
                        translationKey="book_now"
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

      {/* Luxury Collection Section */}
      {luxuryCollectionData.hotels.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="luxury-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="luxury-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {luxuryCollectionData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {luxuryCollectionData.hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-5xl">{hotel.logo}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {hotel.name}
                          </h3>
                          <div className="text-purple-600 dark:text-purple-400 font-semibold">
                            {hotel.cashbackRate} cashback
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {hotel.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Popular Locations:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hotel.locations.map((location, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PrimaryCTA
                      href={hotel.link}
                      translationKey="view_luxury"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Price Match Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="price-match-heading"
          >
            <h2
              id="price-match-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {priceMatchData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {priceMatchData.description}
            </p>
            <PrimaryCTA
              href="/hotel-price-compare"
              translationKey={priceMatchData.buttonText}
              observer={true}
            />
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
              href="/travel/hotels"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
