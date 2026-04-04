// app/[country]/(marketing)/shopping-rewards/finance/page.tsx

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

interface Store {
  name: string;
  logo: string;
  cashbackRate: string;
  description: string;
  categories: string[];
  features: string[];
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
    storeCount: number;
  }>;
  featuredStoresTitle?: string;
  featuredStores?: Store[];
  topDealsTitle?: string;
  topDeals?: Array<{
    title: string;
    description: string;
    originalPrice: string;
    salePrice: string;
    cashbackRate: string;
    store: string;
    image: string;
    link: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  compareTitle?: string;
  compare?: {
    description?: string;
    stores?: Array<{
      name: string;
      cashbackRate: string;
      minInvestment: string;
      fees: string;
      rating: number;
    }>;
  };
  bankAccountsTitle?: string;
  bankAccounts?: Array<{
    name: string;
    logo: string;
    bonus: string;
    cashbackRate: string;
    description: string;
    requirements: string[];
    link: string;
  }>;
  creditCardsTitle?: string;
  creditCards?: Array<{
    name: string;
    logo: string;
    bonus: string;
    cashbackRate: string;
    description: string;
    benefits: string[];
    annualFee: string;
    link: string;
  }>;
  investingTitle?: string;
  investing?: Array<{
    name: string;
    logo: string;
    bonus: string;
    cashbackRate: string;
    description: string;
    features: string[];
    link: string;
  }>;
  insuranceTitle?: string;
  insurance?: Array<{
    name: string;
    logo: string;
    cashbackRate: string;
    description: string;
    coverage: string[];
    link: string;
  }>;
  taxSoftwareTitle?: string;
  taxSoftware?: Array<{
    name: string;
    logo: string;
    cashbackRate: string;
    description: string;
    features: string[];
    link: string;
  }>;
  comparisonTableTitle?: string;
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
    `financial cashback ${lowerCountry}`,
    `bank account bonus ${lowerCountry}`,
    `credit card rewards ${lowerCountry}`,
    `investing cashback ${lowerCountry}`,
    `refinance cashback ${lowerCountry}`,
    `loan cashback ${lowerCountry}`,
    `insurance cashback ${lowerCountry}`,
    `tax software deals ${lowerCountry}`,
    `financial products cashback ${lowerCountry}`,
    `money saving finance ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "chase bonus",
      "amex cashback",
      "sofi bonus",
      "robinhood promotion"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "monzo bonus",
      "starling offer",
      "nationwide cashback",
      "hargreaves lansdown"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "td bank bonus",
      "rbc offer",
      "wealthsimple promotion",
      "scotiabank cashback"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "commbank bonus",
      "up bank offer",
      "raiz promotion",
      "stake cashback"
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
    translation = await loadSectionTranslation(language, "shopping-rewards-finance");
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
    `Finance Cashback - Earn Bonuses & Cash Back on Financial Products in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Earn cashback and bonuses on financial products in ${countryName}. Get paid for opening bank accounts, credit cards, investment accounts, insurance, and more.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/shopping-rewards/finance`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/shopping-rewards/finance`,
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

export default async function FinanceRewardsPage({
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
  const tData = await loadSectionTranslation(language, "shopping-rewards-finance");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Finance Cashback - Earn Bonuses & Cash Back`);
  const description = t(rawDescription, `Earn cashback and bonuses on financial products in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/shopping-rewards/finance`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Earn Cashback on Financial Products"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Get paid to improve your finances. Earn cashback bonuses for opening bank accounts, credit cards, investment accounts, and more in ${countryName}. Turn smart financial decisions into real cash rewards.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Shop by Category"),
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
        name: "Bank Accounts",
        icon: "🏦",
        description: "Checking, savings, and high-yield accounts",
        storeCount: 35,
      },
      {
        name: "Credit Cards",
        icon: "💳",
        description: "Rewards, cashback, and travel cards",
        storeCount: 50,
      },
      {
        name: "Investing",
        icon: "📈",
        description: "Brokerage, retirement, and roboadvisors",
        storeCount: 28,
      },
      {
        name: "Loans",
        icon: "💰",
        description: "Personal, mortgage, and student loans",
        storeCount: 25,
      },
      {
        name: "Insurance",
        icon: "🛡️",
        description: "Life, auto, home, and health insurance",
        storeCount: 30,
      },
      {
        name: "Tax Software",
        icon: "📊",
        description: "File taxes and maximize refunds",
        storeCount: 15,
      },
    ];
  }

  const featuredStoresData = {
    title: t(tData?.featuredStoresTitle, "Top Financial Providers"),
    stores: (tData?.featuredStores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
      description: t(store.description, store.description),
    })),
  };

  // Default featured stores if not in translation
  if (featuredStoresData.stores.length === 0) {
    featuredStoresData.stores = [
      {
        name: "Chase",
        logo: "🏦",
        cashbackRate: "$200-$900",
        description: "Premium bank accounts with generous welcome bonuses",
        categories: ["Checking", "Savings", "Credit Cards"],
        features: ["Nationwide branches", "Mobile app", "24/7 support"],
        link: "/finance/chase",
      },
      {
        name: "SoFi",
        logo: "💙",
        cashbackRate: "$250-$500",
        description: "All-in-one finance platform with high yields",
        categories: ["Banking", "Investing", "Loans", "Credit Cards"],
        features: ["No fees", "Early direct deposit", "Career coaching"],
        link: "/finance/sofi",
      },
      {
        name: "American Express",
        logo: "💳",
        cashbackRate: "$200-$800",
        description: "Premium credit cards with exceptional rewards",
        categories: ["Credit Cards", "Business Cards"],
        features: ["Membership Rewards", "Centurion Lounge", "Concierge"],
        link: "/finance/amex",
      },
      {
        name: "Vanguard",
        logo: "📈",
        cashbackRate: "Up to $1,000",
        description: "Low-cost investing for long-term wealth building",
        categories: ["Brokerage", "Retirement", "529 Plans"],
        features: ["Low fees", "Index funds", "Retirement planning"],
        link: "/finance/vanguard",
      },
      {
        name: "TurboTax",
        logo: "📊",
        cashbackRate: "$15-$30",
        description: "Easy tax filing with maximum refund guarantee",
        categories: ["Tax Software", "CPA Services"],
        features: ["Max refund", "Audit support", "Step-by-step guidance"],
        link: "/finance/turbotax",
      },
      {
        name: "Progressive",
        logo: "🛡️",
        cashbackRate: "$50-$150",
        description: "Name Your Price® insurance tool",
        categories: ["Auto", "Home", "Renters"],
        features: ["Comparison shopping", "Bundle discounts", "Snapshot program"],
        link: "/finance/progressive",
      },
    ];
  }

  const topDealsData = {
    title: t(tData?.topDealsTitle, "Hot Financial Offers"),
    deals: (tData?.topDeals || []).map((deal) => ({
      ...deal,
      title: t(deal.title, deal.title),
      description: t(deal.description, deal.description),
      store: t(deal.store, deal.store),
    })),
  };

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Financial Shopping Tips"),
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
        title: "Read the Fine Print",
        description: "Always check requirements for bonuses like minimum deposits or spending thresholds.",
        icon: "📝",
      },
      {
        title: "Stack Multiple Offers",
        description: "Combine referral bonuses, cashback, and account perks for maximum value.",
        icon: "📚",
      },
      {
        title: "Check Your Credit",
        description: "Some financial products require good credit. Check your score before applying.",
        icon: "📊",
      },
      {
        title: "Avoid Fees",
        description: "Look for accounts with no monthly fees or ways to waive them easily.",
        icon: "💰",
      },
    ];
  }

  const compareData = {
    title: t(tData?.compareTitle, "Compare Financial Offers"),
    description: t(tData?.compare?.description, "See how much you can earn with different providers"),
    stores: (tData?.compare?.stores || []).map((store) => ({
      ...store,
      name: t(store.name, store.name),
    })),
  };

  const bankAccountsData = {
    title: t(tData?.bankAccountsTitle, "Top Bank Account Bonuses"),
    accounts: (tData?.bankAccounts || []).map((account) => ({
      ...account,
      name: t(account.name, account.name),
      description: t(account.description, account.description),
    })),
  };

  const creditCardsData = {
    title: t(tData?.creditCardsTitle, "Best Credit Card Offers"),
    cards: (tData?.creditCards || []).map((card) => ({
      ...card,
      name: t(card.name, card.name),
      description: t(card.description, card.description),
    })),
  };

  const investingData = {
    title: t(tData?.investingTitle, "Investment Account Bonuses"),
    accounts: (tData?.investing || []).map((account) => ({
      ...account,
      name: t(account.name, account.name),
      description: t(account.description, account.description),
    })),
  };

  const insuranceData = {
    title: t(tData?.insuranceTitle, "Insurance Cashback Offers"),
    policies: (tData?.insurance || []).map((policy) => ({
      ...policy,
      name: t(policy.name, policy.name),
      description: t(policy.description, policy.description),
    })),
  };

  const taxSoftwareData = {
    title: t(tData?.taxSoftwareTitle, "Tax Software Deals"),
    software: (tData?.taxSoftware || []).map((software) => ({
      ...software,
      name: t(software.name, software.name),
      description: t(software.description, software.description),
    })),
  };

  const priceMatchData = {
    title: t(tData?.priceMatch?.title, "Found a Better Offer?"),
    description: t(tData?.priceMatch?.description, "We'll help you find the best financial bonuses and cashback rates"),
    buttonText: t(tData?.priceMatch?.buttonText, "Compare Offers"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Financial Cashback FAQ - ${countryName}`),
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
        q: "How do bank account bonuses work?",
        a: "Open a new account and meet requirements like direct deposit or minimum balance. Bonus is credited within 30-90 days.",
      },
      {
        q: "Can I earn cashback on credit card annual fees?",
        a: "The annual fee itself doesn't earn cashback, but welcome bonuses and spending rewards more than offset the fee.",
      },
      {
        q: "Are investment account bonuses taxable?",
        a: "Yes, most bonuses are considered taxable income. You'll receive a 1099 form for bonuses over $600.",
      },
      {
        q: "How long do financial bonuses take to post?",
        a: "Most bonuses post within 60-90 days after meeting requirements. Check each offer's terms for specifics.",
      },
      {
        q: "Can I get multiple bank account bonuses?",
        a: "Yes! Many people open multiple accounts each year to earn thousands in bonuses.",
      },
      {
        q: "Do refinance offers affect my credit score?",
        a: "Yes, refinance applications involve hard credit checks. Multiple applications in a short period count as one inquiry.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Earning Financial Cashback Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart savers earning cashback on their financial decisions"),
    buttonText: t(tData?.final?.buttonText, "Browse Financial Offers"),
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
              href="/finance"
              translationKey="explore_offers"
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
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
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
                      {category.storeCount}+ offers
                    </span>
                    <a
                      href={`/finance/${category.name.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-')}`}
                      className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                    >
                      View offers →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Featured Stores Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="stores-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="stores-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {featuredStoresData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStoresData.stores.map((store, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{store.logo}</div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {store.cashbackRate}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {store.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {store.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {store.categories.slice(0, 3).map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-1 mb-4">
                    {store.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-green-500 mr-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <PrimaryCTA
                    href={store.link}
                    translationKey="view_offer"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Deals Section */}
      {topDealsData.deals.length > 0 && (
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
                  {topDealsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topDealsData.deals.map((deal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center p-8">
                      <div className="text-6xl">{deal.image || "💰"}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {deal.title}
                        </h3>
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
                          {deal.cashbackRate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {deal.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {deal.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400 ml-2">
                            {deal.salePrice}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {deal.store}
                        </span>
                      </div>
                      <PrimaryCTA
                        href={deal.link}
                        translationKey="view_offer"
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
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipsData.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
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

      {/* Compare Section */}
      {compareData.stores && compareData.stores.length > 0 && (
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
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Provider</th>
                      <th className="px-6 py-3 text-left">Bonus</th>
                      <th className="px-6 py-3 text-left">Min. Investment</th>
                      <th className="px-6 py-3 text-left">Fees</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.stores.map((store, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {store.name}
                        </td>
                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                          {store.cashbackRate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.minInvestment}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {store.fees}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{store.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/finance/${store.name.toLowerCase()}`}
                            translationKey="view_offer"
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

      {/* Bank Accounts Section */}
      {bankAccountsData.accounts.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="bank-accounts-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="bank-accounts-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {bankAccountsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bankAccountsData.accounts.map((account, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{account.logo}</div>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                        {account.bonus}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {account.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {account.description}
                    </p>
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {account.requirements.map((req, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-4">
                      {account.cashbackRate}
                    </div>
                    <PrimaryCTA
                      href={account.link}
                      translationKey="view_offer"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Credit Cards Section */}
      {creditCardsData.cards.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="credit-cards-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="credit-cards-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {creditCardsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creditCardsData.cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{card.logo}</div>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                        {card.bonus}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {card.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {card.description}
                    </p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Annual Fee:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{card.annualFee}</span>
                      </div>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-3">
                      {card.cashbackRate}
                    </div>
                    <PrimaryCTA
                      href={card.link}
                      translationKey="apply_now"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Investing Section */}
      {investingData.accounts.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="investing-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="investing-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {investingData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investingData.accounts.map((account, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{account.logo}</div>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                        {account.bonus}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {account.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {account.description}
                    </p>
                    <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-4">
                      {account.cashbackRate}
                    </div>
                    <PrimaryCTA
                      href={account.link}
                      translationKey="view_offer"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Insurance Section */}
      {insuranceData.policies.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="insurance-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="insurance-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {insuranceData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {insuranceData.policies.map((policy, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-5xl mb-4">{policy.logo}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {policy.name}
                    </h3>
                    <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-2">
                      {policy.cashbackRate}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {policy.description}
                    </p>
                    <PrimaryCTA
                      href={policy.link}
                      translationKey="get_quote"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Tax Software Section */}
      {taxSoftwareData.software.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="tax-software-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="tax-software-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {taxSoftwareData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {taxSoftwareData.software.map((software, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-5xl mb-4">{software.logo}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {software.name}
                    </h3>
                    <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-2">
                      {software.cashbackRate}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {software.description}
                    </p>
                    <PrimaryCTA
                      href={software.link}
                      translationKey="file_taxes"
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
              href="/finance-compare"
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
              href="/finance"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
