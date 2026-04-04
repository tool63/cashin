// app/[country]/(marketing)/shopping-rewards/travel/flights/page.tsx

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

interface Airline {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  hubs: string[];
  benefits: string[];
  link: string;
}

interface FlightDeal {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  cashbackRate: string;
  airline: string;
  route: string;
  dates: string;
  image: string;
  link: string;
}

interface BookingSite {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  features: string[];
  bestFor: string[];
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
    flightsBooked?: string;
    savingsAmount?: string;
    airlinesPartnered?: string;
    userRating?: string;
  };
  bookingSitesTitle?: string;
  bookingSites?: BookingSite[];
  airlinesTitle?: string;
  airlines?: Airline[];
  hotDealsTitle?: string;
  hotDeals?: FlightDeal[];
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
      priceAlerts: string;
      flexibleDates: string;
      bundleDiscount: string;
      rating: number;
    }>;
  };
  domesticDealsTitle?: string;
  domesticDeals?: FlightDeal[];
  internationalDealsTitle?: string;
  internationalDeals?: FlightDeal[];
  businessClassTitle?: string;
  businessClass?: Array<{
    airline: string;
    logo: string;
    cashbackRate: string;
    description: string;
    routes: string[];
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
    `flight cashback ${lowerCountry}`,
    `book flights with cashback ${lowerCountry}`,
    `airline rewards ${lowerCountry}`,
    `cashback on flights ${lowerCountry}`,
    `cheap flight deals ${lowerCountry}`,
    `airline tickets cashback ${lowerCountry}`,
    `flight booking rewards ${lowerCountry}`,
    `domestic flights ${lowerCountry}`,
    `international flights ${lowerCountry}`,
    `business class deals ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "delta cashback",
      "united airlines deals",
      "american airlines cashback",
      "southwest flights"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "british airways cashback",
      "easyjet deals",
      "ryanair cashback",
      "virgin atlantic"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "air canada cashback",
      "westjet deals",
      "flair airlines"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "qantas cashback",
      "virgin australia deals",
      "jetstar flights"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-travel-flights");
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
    `Flight Cashback - Earn Up to 10% Back on Flight Bookings in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Book flights with cashback in ${countryName}. Earn up to 10% back on airline tickets at Expedia, Kayak, CheapOair, and more. Save on domestic and international flights.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/travel/flights`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/travel/flights`,
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

export default async function FlightsCashbackPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-travel-flights");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Flight Cashback - Earn Up to 10% Back`);
  const description = t(rawDescription, `Book flights with cashback in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/travel/flights`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Flight Bookings"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Save money on every flight in ${countryName}. Earn up to 10% cashback when you book through top travel sites like Expedia, Kayak, CheapOair, and more. Domestic or international, economy or business class.`
    ),
  };

  const statsData = {
    flightsBooked: t(tData?.stats?.flightsBooked, "1.5M+"),
    savingsAmount: t(tData?.stats?.savingsAmount, "$15M+"),
    airlinesPartnered: t(tData?.stats?.airlinesPartnered, "100+"),
    userRating: t(tData?.stats?.userRating, "4.7"),
  };

  const bookingSitesData = {
    title: t(tData?.bookingSitesTitle, "Top Flight Booking Sites"),
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
        name: "Expedia",
        logo: "✈️",
        cashbackRate: "Up to 10%",
        description: "Flights, hotels, car rentals, and vacation packages",
        features: ["Bundle savings", "Member prices", "OneKey rewards", "Free cancellation"],
        bestFor: ["Package deals", "Last minute", "US travelers"],
        link: "/travel/expedia",
      },
      {
        name: "Kayak",
        logo: "🔍",
        cashbackRate: "Up to 8%",
        description: "Flight price comparison and booking",
        features: ["Price alerts", "Explore tool", "Flexible dates", "Hacker fares"],
        bestFor: ["Price comparison", "Flexible travel", "Budget seekers"],
        link: "/travel/kayak",
      },
      {
        name: "CheapOair",
        logo: "💰",
        cashbackRate: "Up to 12%",
        description: "Budget-friendly flight bookings",
        features: ["Price match", "24/7 support", "Low price guarantee", "Mobile app deals"],
        bestFor: ["Budget flights", "Domestic travel", "Price sensitive"],
        link: "/travel/cheapoair",
      },
      {
        name: "Priceline",
        logo: "💰",
        cashbackRate: "Up to 8%",
        description: "Express deals and name-your-own-price flights",
        features: ["Express deals", "Pricebreakers", "VIP program", "Bundle savings"],
        bestFor: ["Express deals", "Name your price", "Flexible travelers"],
        link: "/travel/priceline",
      },
      {
        name: "Orbitz",
        logo: "🌍",
        cashbackRate: "Up to 8%",
        description: "Flights, hotels, and travel packages",
        features: ["Rewards program", "Price guarantee", "Free cancellation", "Orbucks"],
        bestFor: ["Package deals", "Rewards seekers", "Family travel"],
        link: "/travel/orbitz",
      },
      {
        name: "Travelocity",
        logo: "🧙",
        cashbackRate: "Up to 7%",
        description: "Flights, hotels, and vacation packages",
        features: ["Price match", "24/7 support", "Free cancellation", "Insider prices"],
        bestFor: ["Package deals", "Customer service", "Leisure travel"],
        link: "/travel/travelocity",
      },
    ];
  }

  const airlinesData = {
    title: t(tData?.airlinesTitle, "Airline Cashback Offers"),
    airlines: (tData?.airlines || []).map((airline) => ({
      ...airline,
      name: t(airline.name, airline.name),
      description: t(airline.description, airline.description),
    })),
  };

  // Default airlines if not in translation
  if (airlinesData.airlines.length === 0) {
    airlinesData.airlines = [
      {
        name: "Delta Air Lines",
        logo: "🔺",
        cashbackRate: "Up to 6%",
        description: "Premium service with extensive domestic and international network",
        hubs: ["Atlanta", "Detroit", "Minneapolis", "Salt Lake City"],
        benefits: ["SkyMiles", "Free Wi-Fi", "Delta One lounge"],
        link: "/airline/delta",
      },
      {
        name: "United Airlines",
        logo: "🌐",
        cashbackRate: "Up to 5%",
        description: "Global carrier with award-winning MileagePlus program",
        hubs: ["Chicago", "Denver", "Houston", "Newark"],
        benefits: ["MileagePlus", "Polaris lounge", "Economy Plus"],
        link: "/airline/united",
      },
      {
        name: "American Airlines",
        logo: "🔴",
        cashbackRate: "Up to 5%",
        description: "Largest airline in the world by fleet size",
        hubs: ["Dallas", "Charlotte", "Chicago", "Miami"],
        benefits: ["AAdvantage", "Admirals Club", "Flagship service"],
        link: "/airline/american",
      },
      {
        name: "Southwest Airlines",
        logo: "❤️",
        cashbackRate: "Up to 7%",
        description: "Low-fare carrier with two free checked bags",
        hubs: ["Dallas", "Chicago", "Denver", "Las Vegas"],
        benefits: ["Rapid Rewards", "No change fees", "Two free bags"],
        link: "/airline/southwest",
      },
      {
        name: "JetBlue",
        logo: "🔵",
        cashbackRate: "Up to 8%",
        description: "Low-fare carrier with premium economy options",
        hubs: ["New York", "Boston", "Fort Lauderdale", "Orlando"],
        benefits: ["TrueBlue", "Free Wi-Fi", "More legroom"],
        link: "/airline/jetblue",
      },
      {
        name: "Alaska Airlines",
        logo: "🐻",
        cashbackRate: "Up to 7%",
        description: "West Coast carrier with excellent loyalty program",
        hubs: ["Seattle", "Portland", "San Francisco", "Los Angeles"],
        benefits: ["Mileage Plan", "First class upgrades", "Global partners"],
        link: "/airline/alaska",
      },
    ];
  }

  const hotDealsData = {
    title: t(tData?.hotDealsTitle, "Hot Flight Deals"),
    deals: (tData?.hotDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      airline: t(deal.airline, deal.airline),
      route: t(deal.route, deal.route),
    })),
  };

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Flight Booking Tips"),
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
        title: "Book on Tuesdays",
        description: "Flight prices are often lower when booked on Tuesday afternoons.",
        icon: "📅",
      },
      {
        title: "Use Incognito Mode",
        description: "Search for flights in private browsing to avoid price increases.",
        icon: "🕵️",
      },
      {
        title: "Set Price Alerts",
        description: "Get notified when flight prices drop for your desired route.",
        icon: "🔔",
      },
      {
        title: "Be Flexible",
        description: "Flexible dates can save you hundreds on airfare.",
        icon: "📆",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "Compare Booking Sites"),
    description: t(tData?.comparison?.description, "Find the best cashback rates for your flights"),
    sites: (tData?.comparison?.sites || []).map((site) => ({
      ...site,
      name: t(site.name, site.name),
    })),
  };

  const domesticDealsData = {
    title: t(tData?.domesticDealsTitle, "Domestic Flight Deals"),
    deals: (tData?.domesticDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      airline: t(deal.airline, deal.airline),
      route: t(deal.route, deal.route),
    })),
  };

  const internationalDealsData = {
    title: t(tData?.internationalDealsTitle, "International Flight Deals"),
    deals: (tData?.internationalDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      airline: t(deal.airline, deal.airline),
      route: t(deal.route, deal.route),
    })),
  };

  const businessClassData = {
    title: t(tData?.businessClassTitle, "Business Class Deals"),
    airlines: (tData?.businessClass || []).map((airline) => ({
      ...airline,
      airline: t(airline.airline, airline.airline),
      description: t(airline.description, airline.description),
    })),
  };

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Price?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best flight cashback rates"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Flight Prices"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Flight Cashback FAQ - ${countryName}`),
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
        q: "How do I earn cashback on flight bookings?",
        a: "Simply click through Cashog to your preferred flight booking site, complete your reservation as usual, and cashback will be automatically tracked and added to your account.",
      },
      {
        q: "Can I combine cashback with airline miles?",
        a: "Yes! Most flight booking sites allow you to earn both cashback and airline miles simultaneously. Just make sure to enter your frequent flyer number during checkout.",
      },
      {
        q: "How long does flight cashback take to confirm?",
        a: "Flight cashback typically takes 30-45 days to confirm after your flight is completed. This accounts for cancellation periods and flight verification.",
      },
      {
        q: "What if I need to cancel my flight?",
        a: "If you cancel a flight, the cashback will not be credited. If you've already received it, it will be deducted from your account.",
      },
      {
        q: "Do all flights qualify for cashback?",
        a: "Most flights on our partner sites qualify, but some exclusions may apply (e.g., basic economy, certain airlines). Check site terms for details.",
      },
      {
        q: "Can I earn cashback on international flights?",
        a: "Yes! International flights are eligible for cashback on most partner sites. Rates may vary by route and airline.",
      },
      {
        q: "What about business and first class?",
        a: "Yes! Premium cabin bookings qualify for cashback at the same rates as economy flights.",
      },
      {
        q: "Do I need to book directly through Cashog every time?",
        a: "Yes, to ensure cashback tracking, you must start your booking session by clicking through Cashog to the partner site.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Saving on Flights Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of travelers earning cashback on every flight booking"),
    buttonText: t(tData?.final?.buttonText, "Book Flights with Cashback"),
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
              href="/travel/flights/search"
              translationKey="search_flights"
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
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
                  {statsData.flightsBooked}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Flights Booked
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
                  {statsData.savingsAmount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Member Savings
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
                  {statsData.airlinesPartnered}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Airlines Partnered
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
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
                    <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-bold">
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
                          className="inline-block px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs rounded"
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

      {/* Airlines Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="airlines-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="airlines-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {airlinesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airlinesData.airlines.map((airline, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{airline.logo}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {airline.name}
                      </h3>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {airline.cashbackRate}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {airline.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Major Hubs:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {airline.hubs.map((hub, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {airline.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-green-500 mr-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <PrimaryCTA
                    href={airline.link}
                    translationKey="view_deals"
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
              aria-labelledby="hot-deals-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="hot-deals-heading"
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
                    <div className="bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "✈️"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {deal.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {deal.airline}
                          </p>
                        </div>
                        <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        📍 {deal.route}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        📅 {deal.dates}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-teal-600 dark:text-teal-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
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

      {/* Domestic Deals Section */}
      {domesticDealsData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="domestic-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="domestic-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {domesticDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {domesticDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "🇺🇸"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {deal.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {deal.airline}
                          </p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        📍 {deal.route} | 📅 {deal.dates}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <PrimaryCTA
                          href={deal.link}
                          translationKey="book"
                          observer={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* International Deals Section */}
      {internationalDealsData.deals.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="international-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="international-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {internationalDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internationalDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "🌍"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {deal.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {deal.airline}
                          </p>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        📍 {deal.route} | 📅 {deal.dates}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <PrimaryCTA
                          href={deal.link}
                          translationKey="book"
                          observer={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Business Class Section */}
      {businessClassData.airlines.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="business-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="business-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {businessClassData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessClassData.airlines.map((airline, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md border border-amber-200 dark:border-amber-800"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-5xl">{airline.logo}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {airline.airline}
                          </h3>
                          <div className="text-amber-600 dark:text-amber-400 font-semibold">
                            {airline.cashbackRate} cashback
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {airline.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Popular Routes:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {airline.routes.map((route, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
                          >
                            {route}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PrimaryCTA
                      href={airline.link}
                      translationKey="view_business"
                      observer={false}
                    />
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
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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
                  <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Booking Site</th>
                      <th className="px-6 py-3 text-left">Cashback Rate</th>
                      <th className="px-6 py-3 text-left">Price Alerts</th>
                      <th className="px-6 py-3 text-left">Flexible Dates</th>
                      <th className="px-6 py-3 text-left">Bundle Discount</th>
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
                        <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-bold">
                          {site.cashbackRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.priceAlerts}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.flexibleDates}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {site.bundleDiscount}
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
              href="/flight-price-compare"
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
              href="/travel/flights"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
