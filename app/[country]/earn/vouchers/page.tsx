// app/[country]/(marketing)/vouchers/page.tsx

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
    vouchersRedeemed?: string;
    vouchersRedeemedLabel?: string;
    avgDiscount?: string;
    avgDiscountLabel?: string;
    activeUsers?: string;
    activeUsersLabel?: string;
    totalSaved?: string;
    totalSavedLabel?: string;
  };
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  voucherCategories?: Array<{
    icon: string;
    title: string;
    description: string;
    avgDiscount: string;
    popularity: string;
    expiryDays: string;
  }>;
  featuredVouchersTitle?: string;
  featuredVouchersSubtitle?: string;
  featuredVouchers?: Array<{
    title: string;
    discount: string;
    code: string;
    category: string;
    usesLeft: number;
    store: string;
    rating: string;
    expiryDate: string;
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
    saved: string;
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
    console.warn(`Missing translation: ${section} (${language}), using defaults`);
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
    `vouchers ${lowerCountry}`,
    `discount vouchers ${lowerCountry}`,
    `promo codes ${lowerCountry}`,
    `coupon codes ${lowerCountry}`,
    `voucher codes ${lowerCountry}`,
    `save money vouchers ${lowerCountry}`,
    `shopping vouchers ${lowerCountry}`,
    `discount codes ${lowerCountry}`,
    `free shipping vouchers ${lowerCountry}`,
    `best voucher sites ${lowerCountry}`,
    `voucher discounts ${lowerCountry}`,
    `online shopping vouchers ${lowerCountry}`,
    `cashback vouchers ${lowerCountry}`,
    `daily voucher deals ${lowerCountry}`,
    `voucher code list ${lowerCountry}`,
    `money saving vouchers ${lowerCountry}`,
    `retail vouchers ${lowerCountry}`,
    `restaurant vouchers ${lowerCountry}`,
    `travel vouchers ${lowerCountry}`,
    `electronics vouchers ${lowerCountry}`,
    `fashion vouchers ${lowerCountry}`,
    `grocery vouchers ${lowerCountry}`,
    `voucher aggregator ${lowerCountry}`,
    `best discount codes ${lowerCountry}`,
  ];

  // Add country-specific variations
  if (countryCode === "us") {
    baseKeywords.push(
      "coupon codes usa",
      "promo codes for american stores",
      "best discount codes usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "voucher codes uk",
      "discount codes uk",
      "save money uk vouchers"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "coupon codes canada",
      "canadian discount vouchers",
      "save cad with vouchers"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "voucher codes australia",
      "discount codes australia",
      "save aud with vouchers"
    );
  } else if (countryCode === "de") {
    baseKeywords.push(
      "gutscheincodes deutschland",
      "rabatt codes deutschland",
      "sparen mit gutscheinen"
    );
  } else if (countryCode === "fr") {
    baseKeywords.push(
      "codes promo france",
      "bons de réduction france",
      "économiser avec des codes promo"
    );
  } else if (countryCode === "es") {
    baseKeywords.push(
      "códigos descuento españa",
      "vales descuento españa",
      "ahorrar con cupones"
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
    translation = await loadSectionTranslation(language, "vouchers");
  } catch (error) {
    // Use defaults
  }

  // Helper to replace {country} in metadata
  const replaceCountry = (text: string | undefined, fallback: string): string => {
    const str = text || fallback;
    return str.replace(/\{country\}/g, countryName);
  };

  const rawTitle = translation?.seo?.title;
  const rawDescription = translation?.seo?.description;

  const seoTitle = replaceCountry(
    rawTitle,
    `Vouchers & Discount Codes in ${countryName} - Save Up to 70% Off | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Find the best vouchers and discount codes in ${countryName}. Save money at 1000+ stores including Amazon, Nike, and Walmart. Free daily updated promo codes!`
  );

  // Generate dynamic keywords
  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/vouchers`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/vouchers`,
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

export default async function VouchersPage({
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

  // Load translations with fallback to empty object
  let tData: TranslationSection = {};
  try {
    tData = await loadSectionTranslation(language, "vouchers");
  } catch (error) {
    console.error("Failed to load vouchers translation:", error);
  }

  // Helper function to replace country placeholder
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replaceCountryPlaceholder(fallback, countryName);
    return replaceCountryPlaceholder(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Vouchers & Discount Codes in ${countryName} - Save Money`);
  const description = t(rawDescription, `Find the best vouchers in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/vouchers`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks (hardcoded defaults to prevent empty state)
  const heroData = {
    title: t(tData?.hero?.title, `Save Money with Vouchers in ${countryName}`),
    subtitle: t(
      tData?.hero?.subtitle,
      `Find the best vouchers and discount codes in ${countryName}. Save up to 70% at 1000+ stores including Amazon, Nike, Walmart, and more. New codes added daily!`
    ),
  };

  const statsData = {
    title: t(tData?.statsTitle, "Voucher Statistics"),
    vouchersRedeemed: tData?.stats?.vouchersRedeemed || "5M+",
    vouchersRedeemedLabel: tData?.stats?.vouchersRedeemedLabel || "Vouchers Redeemed",
    avgDiscount: tData?.stats?.avgDiscount || "25%",
    avgDiscountLabel: tData?.stats?.avgDiscountLabel || "Average Discount",
    activeUsers: tData?.stats?.activeUsers || "100K+",
    activeUsersLabel: tData?.stats?.activeUsersLabel || "Active Savers",
    totalSaved: tData?.stats?.totalSaved || "$50M+",
    totalSavedLabel: tData?.stats?.totalSavedLabel || "Total Saved",
  };

  // Default voucher categories (hardcoded fallback)
  const defaultVoucherCategories = [
    {
      icon: "🛍️",
      title: "Fashion & Apparel",
      description: "Clothing, shoes, accessories",
      avgDiscount: "20-50%",
      popularity: "🔥 Very High",
      expiryDays: "7-30 days"
    },
    {
      icon: "📱",
      title: "Electronics",
      description: "Phones, laptops, gadgets",
      avgDiscount: "10-30%",
      popularity: "🔥 High",
      expiryDays: "14-45 days"
    },
    {
      icon: "🏠",
      title: "Home & Living",
      description: "Furniture, decor, appliances",
      avgDiscount: "15-40%",
      popularity: "Medium",
      expiryDays: "7-60 days"
    },
    {
      icon: "🍔",
      title: "Food & Dining",
      description: "Restaurants, delivery, groceries",
      avgDiscount: "10-25%",
      popularity: "🔥 Very High",
      expiryDays: "3-14 days"
    },
    {
      icon: "✈️",
      title: "Travel",
      description: "Flights, hotels, rentals",
      avgDiscount: "15-40%",
      popularity: "Medium",
      expiryDays: "30-90 days"
    },
    {
      icon: "💄",
      title: "Beauty & Health",
      description: "Cosmetics, skincare, wellness",
      avgDiscount: "15-30%",
      popularity: "High",
      expiryDays: "7-30 days"
    }
  ];

  const voucherCategoriesData = (tData?.voucherCategories && tData.voucherCategories.length > 0 
    ? tData.voucherCategories 
    : defaultVoucherCategories
  ).map((category) => ({
    ...category,
    title: t(category.title, category.title),
    description: t(category.description, category.description),
  }));

  // Default featured vouchers (hardcoded fallback)
  const defaultFeaturedVouchers = [
    {
      title: "Amazon Fashion Week Sale",
      discount: "30% OFF + Free Shipping",
      code: "AMZ30FS",
      category: "Fashion",
      usesLeft: 5000,
      store: "Amazon",
      rating: "4.9",
      expiryDate: "Mar 31, 2026"
    },
    {
      title: "Nike Member Exclusive",
      discount: "25% OFF Sitewide",
      code: "NIKE25",
      category: "Fashion",
      usesLeft: 2500,
      store: "Nike",
      rating: "4.8",
      expiryDate: "Mar 25, 2026"
    },
    {
      title: "Best Buy Tech Deals",
      discount: "$50 OFF $500+",
      code: "BBY50",
      category: "Electronics",
      usesLeft: 1000,
      store: "Best Buy",
      rating: "4.7",
      expiryDate: "Mar 20, 2026"
    }
  ];

  const featuredVouchersData = (tData?.featuredVouchers && tData.featuredVouchers.length > 0
    ? tData.featuredVouchers
    : defaultFeaturedVouchers
  ).map((voucher) => ({
    ...voucher,
    title: t(voucher.title, voucher.title),
  }));

  // Default benefits
  const defaultBenefits = [
    {
      icon: "💰",
      title: "Save Money Instantly",
      description: "Apply codes at checkout and save instantly on your purchases"
    },
    {
      icon: "🔄",
      title: "Daily Updates",
      description: "New vouchers added every day. We verify all codes work"
    },
    {
      icon: "🎯",
      title: "1000+ Stores",
      description: "Vouchers for all your favorite stores in one place"
    },
    {
      icon: "⭐",
      title: "Verified & Tested",
      description: "Every voucher is tested and verified by our team"
    }
  ];

  const benefitsData = (tData?.benefits && tData.benefits.length > 0
    ? tData.benefits
    : defaultBenefits
  ).map((benefit) => ({
    ...benefit,
    title: t(benefit.title, benefit.title),
    description: t(benefit.description, benefit.description),
  }));

  // Default tips
  const defaultTips = [
    {
      title: "Check Expiry Dates",
      description: "Vouchers expire quickly. Use them before they're gone"
    },
    {
      title: "Stack When Possible",
      description: "Some stores allow combining vouchers with sales"
    },
    {
      title: "Sign Up for Alerts",
      description: "Get notified when new vouchers for your favorite stores drop"
    },
    {
      title: "Read Terms & Conditions",
      description: "Check minimum spend and excluded items before using"
    }
  ];

  const tipsData = (tData?.tips && tData.tips.length > 0
    ? tData.tips
    : defaultTips
  ).map((tip, index) => ({
    number: index + 1,
    title: t(tip.title, tip.title),
    description: t(tip.description, tip.description),
  }));

  // Default testimonials
  const defaultTestimonials = [
    {
      name: "Jessica M.",
      country: "United States",
      saved: "$450",
      quote: "Saved over $450 last month using Cashog vouchers. The Amazon codes are amazing!",
      avatar: "JM"
    },
    {
      name: "David L.",
      country: "Canada",
      saved: "$280",
      quote: "Found a 30% off Nike voucher that actually worked. Saved $60 on new shoes!",
      avatar: "DL"
    },
    {
      name: "Sarah K.",
      country: "United Kingdom",
      saved: "$620",
      quote: "I check Cashog before every online purchase. Already saved over $600 this year.",
      avatar: "SK"
    }
  ];

  const testimonialsData = (tData?.testimonials && tData.testimonials.length > 0
    ? tData.testimonials
    : defaultTestimonials
  ).map((testimonial) => ({
    ...testimonial,
    quote: t(testimonial.quote, testimonial.quote),
  }));

  // Default FAQ items
  const defaultFaqItems = [
    {
      question: "Are these vouchers really free?",
      answer: "Yes! All vouchers on Cashog are completely free to use. Just copy the code and paste at checkout."
    },
    {
      question: "How do I use a voucher code?",
      answer: "Copy the voucher code, go to the store's website, add items to your cart, and paste the code in the 'Promo Code' or 'Discount Code' box at checkout."
    },
    {
      question: "Do vouchers expire?",
      answer: "Yes, most vouchers have an expiry date. Check the expiry date shown on each voucher. Use them before they expire!"
    },
    {
      question: "How often are new vouchers added?",
      answer: "New vouchers are added daily. We update our database constantly to bring you the latest deals and discounts."
    }
  ];

  const faqData = {
    title: t(tData?.faq?.title, `Vouchers in ${countryName} - FAQ`),
    items: (tData?.faq?.items && tData.faq.items.length > 0
      ? tData.faq.items
      : defaultFaqItems
    ).map((item) => ({
      q: t(item.question, item.question),
      a: t(item.answer, item.answer),
    })).filter((item) => item.q && item.a),
  };

  const finalData = {
    title: t(tData?.final?.title, `Ready to Start Saving in ${countryName}?`),
    subtitle: t(
      tData?.final?.subtitle,
      `Join 100,000+ savvy shoppers already saving in ${countryName}. Sign up for free and get access to exclusive vouchers today!`
    ),
  };

  // Function to handle copy to clipboard (client-side only)
  const copyToClipboard = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
    }
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
              href="/signup"
              translationKey="start_saving_now"
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
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.vouchersRedeemed}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.vouchersRedeemedLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {statsData.avgDiscount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.avgDiscountLabel}
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
                  {statsData.totalSaved}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {statsData.totalSavedLabel}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Voucher Categories Grid */}
      {voucherCategoriesData.length > 0 && (
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
                  {t(tData?.categoriesTitle, "Voucher Categories")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.categoriesSubtitle, "Save money with vouchers in these categories")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {voucherCategoriesData.map((category, index) => (
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
                        <span className="text-gray-500 dark:text-gray-400">
                          Avg Discount:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {category.avgDiscount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Popularity:
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {category.popularity}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Expires:
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {category.expiryDays}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Featured Vouchers */}
      {featuredVouchersData.length > 0 && (
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
                  {t(tData?.featuredVouchersTitle, "Today's Hot Vouchers")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {t(tData?.featuredVouchersSubtitle, "Limited time - use these vouchers today")}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {featuredVouchersData.map((voucher, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {voucher.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                            {voucher.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            ⭐ {voucher.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Store: {voucher.store}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          <span className="text-green-600 dark:text-green-400 font-semibold">
                            💰 {voucher.discount}
                          </span>
                          <span className="text-orange-600 dark:text-orange-400">
                            🎯 {voucher.usesLeft.toLocaleString()} uses left
                          </span>
                          <span className="text-red-500 dark:text-red-400">
                            ⏰ Expires: {voucher.expiryDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <code className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-mono">
                            {voucher.code}
                          </code>
                          <button
                            onClick={() => copyToClipboard(voucher.code)}
                            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                            aria-label="Copy voucher code"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Benefits Section */}
      {benefitsData.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="benefits-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="benefits-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.benefitsTitle, "Why Use Cashog Vouchers")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitsData.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-3" aria-hidden="true">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Tips Section */}
      {tipsData.length > 0 && (
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
                  {t(tData?.tipsTitle, "Tips to Maximize Your Savings")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {tipsData.map((tip) => (
                  <div key={tip.number} className="text-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg"
                      aria-label={`Tip ${tip.number}`}
                    >
                      {tip.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {tip.description}
                    </p>
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
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="testimonials-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="testimonials-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {t(tData?.testimonialsTitle, "What Our Savvy Shoppers Say")}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        aria-hidden="true"
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.country}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      Saved {testimonial.saved}
                    </p>
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
              href="/signup"
              translationKey="start_saving_now"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
