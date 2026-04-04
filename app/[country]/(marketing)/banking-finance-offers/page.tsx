// app/[country]/(marketing)/banking-finance-offers/page.tsx

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

interface Offer {
  title: string;
  description: string;
  offerValue: string;
  requirements: string;
  bank: string;
  type: string;
  image: string;
  link: string;
  expiryDate?: string;
  isFeatured?: boolean;
}

interface Bank {
  name: string;
  logo: string;
  offerCount: number;
  description: string;
  features: string[];
  link: string;
}

interface CreditCard {
  name: string;
  bank: string;
  annualFee: string;
  rewardsRate: string;
  signupBonus: string;
  introApr: string;
  regularApr: string;
  image: string;
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
    offerCount: number;
  }>;
  featuredOffersTitle?: string;
  featuredOffers?: Offer[];
  creditCardsTitle?: string;
  creditCards?: CreditCard[];
  topBanksTitle?: string;
  topBanks?: Bank[];
  savingsAccountsTitle?: string;
  savingsAccounts?: Array<{
    bank: string;
    apy: string;
    minimumDeposit: string;
    features: string[];
    link: string;
  }>;
  loanOffersTitle?: string;
  loanOffers?: Array<{
    bank: string;
    loanType: string;
    rate: string;
    loanAmount: string;
    terms: string;
    link: string;
  }>;
  investmentOffersTitle?: string;
  investmentOffers?: Array<{
    platform: string;
    offer: string;
    commission: string;
    minimumDeposit: string;
    features: string[];
    link: string;
  }>;
  tipsTitle?: string;
  tips?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  calculator?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  compareTitle?: string;
  compare?: {
    description?: string;
    items?: Array<{
      name: string;
      rate: string;
      fee: string;
      rating: number;
    }>;
  };
  seasonalPromosTitle?: string;
  seasonalPromos?: Array<{
    title: string;
    description: string;
    endDate: string;
    link: string;
  }>;
  buyingGuidesTitle?: string;
  buyingGuides?: Array<{
    title: string;
    description: string;
    readTime: string;
    link: string;
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
    `banking offers ${lowerCountry}`,
    `finance deals ${lowerCountry}`,
    `credit card offers ${lowerCountry}`,
    `savings account rates ${lowerCountry}`,
    `loan offers ${lowerCountry}`,
    `investment promotions ${lowerCountry}`,
    `bank bonuses ${lowerCountry}`,
    `finance rewards ${lowerCountry}`,
    `cashback banking ${lowerCountry}`,
    `financial offers ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "chase offers usa",
      "american express deals",
      "bank of america promotions"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "banking offers uk",
      "barclays deals",
      "lloyds bank promotions"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "banking offers canada",
      "rbc promotions",
      "td bank deals"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "banking offers australia",
      "commbank deals",
      "westpac promotions"
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
    translation = await loadSectionTranslation(language, "banking-finance-offers");
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
    `Banking & Finance Offers - Best Rates & Bonuses in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Compare the best banking and finance offers in ${countryName}. Find top credit cards, savings accounts, loans, and investment deals. Earn cashback and bonuses on financial products.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/banking-finance-offers`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/banking-finance-offers`,
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

export default async function BankingFinanceOffersPage({
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
  const tData = await loadSectionTranslation(language, "banking-finance-offers");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Banking & Finance Offers - Best Rates & Bonuses`);
  const description = t(rawDescription, `Compare the best banking and finance offers in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/banking-finance-offers`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Best Banking & Finance Offers"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Maximize your money with exclusive banking and finance offers in ${countryName}. Compare credit cards, savings accounts, loans, and investment deals. Earn bonuses, cashback, and premium rates.`
    ),
  };

  const categoryData = {
    title: t(tData?.categoryTitle, "Browse by Category"),
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
        name: "Credit Cards",
        icon: "💳",
        description: "Rewards, cashback, and low APR offers",
        offerCount: 245,
      },
      {
        name: "Savings Accounts",
        icon: "🏦",
        description: "High-yield savings and bonus rates",
        offerCount: 89,
      },
      {
        name: "Personal Loans",
        icon: "📝",
        description: "Low-interest loans and debt consolidation",
        offerCount: 67,
      },
      {
        name: "Mortgages",
        icon: "🏠",
        description: "Home loans with competitive rates",
        offerCount: 43,
      },
      {
        name: "Investments",
        icon: "📈",
        description: "Trading platforms and robo-advisors",
        offerCount: 56,
      },
      {
        name: "Bank Bonuses",
        icon: "🎁",
        description: "Cash bonuses for new accounts",
        offerCount: 78,
      },
    ];
  }

  const featuredOffersData = {
    title: t(tData?.featuredOffersTitle, "🌟 Featured Offers"),
    offers: (tData?.featuredOffers || []).map((offer) => ({
      ...offer,
      title: t(offer.title, offer.title),
      description: t(offer.description, offer.description),
      bank: t(offer.bank, offer.bank),
    })),
  };

  // Default featured offers if not in translation
  if (featuredOffersData.offers.length === 0) {
    featuredOffersData.offers = [
      {
        title: "Chase Sapphire Preferred",
        description: "Premium travel rewards credit card",
        offerValue: "60,000 bonus points",
        requirements: "$4,000 spend in 3 months",
        bank: "Chase",
        type: "Credit Card",
        image: "💳",
        link: "/offer/chase-sapphire",
        expiryDate: "Feb 28, 2025",
        isFeatured: true,
      },
      {
        title: "American Express Gold",
        description: "Earn points on dining and groceries",
        offerValue: "75,000 Membership Rewards points",
        requirements: "$6,000 spend in 6 months",
        bank: "American Express",
        type: "Credit Card",
        image: "✨",
        link: "/offer/amex-gold",
        expiryDate: "Mar 15, 2025",
        isFeatured: true,
      },
      {
        title: "Capital One 360",
        description: "High-yield savings account",
        offerValue: "4.25% APY",
        requirements: "No minimum balance",
        bank: "Capital One",
        type: "Savings",
        image: "💰",
        link: "/offer/capital-one-360",
        expiryDate: "",
        isFeatured: false,
      },
    ];
  }

  const creditCardsData = {
    title: t(tData?.creditCardsTitle, "💳 Top Credit Card Offers"),
    cards: (tData?.creditCards || []).map((card) => ({
      ...card,
      name: t(card.name, card.name),
      bank: t(card.bank, card.bank),
    })),
  };

  // Default credit cards if not in translation
  if (creditCardsData.cards.length === 0) {
    creditCardsData.cards = [
      {
        name: "Citi Double Cash",
        bank: "Citi",
        annualFee: "$0",
        rewardsRate: "2% cashback",
        signupBonus: "$200",
        introApr: "0% for 18 months",
        regularApr: "17.99% - 27.99%",
        image: "💳",
        link: "/card/citi-double-cash",
      },
      {
        name: "Discover it Cash Back",
        bank: "Discover",
        annualFee: "$0",
        rewardsRate: "5% rotating categories",
        signupBonus: "Cashback match first year",
        introApr: "0% for 15 months",
        regularApr: "16.99% - 27.99%",
        image: "🎯",
        link: "/card/discover-it",
      },
      {
        name: "Wells Fargo Active Cash",
        bank: "Wells Fargo",
        annualFee: "$0",
        rewardsRate: "2% unlimited cashback",
        signupBonus: "$200",
        introApr: "0% for 15 months",
        regularApr: "18.99% - 28.99%",
        image: "💵",
        link: "/card/wells-fargo-active",
      },
    ];
  }

  const topBanksData = {
    title: t(tData?.topBanksTitle, "🏦 Top Banks with Offers"),
    banks: (tData?.topBanks || []).map((bank) => ({
      ...bank,
      name: t(bank.name, bank.name),
      description: t(bank.description, bank.description),
    })),
  };

  // Default top banks if not in translation
  if (topBanksData.banks.length === 0) {
    topBanksData.banks = [
      {
        name: "Chase",
        logo: "🏦",
        offerCount: 24,
        description: "Credit cards, banking, and mortgage offers",
        features: ["Sapphire Reserve", "Freedom Unlimited", "Business cards"],
        link: "/bank/chase",
      },
      {
        name: "American Express",
        logo: "✨",
        offerCount: 18,
        description: "Premium credit cards and rewards",
        features: ["Platinum Card", "Gold Card", "Blue Cash Preferred"],
        link: "/bank/amex",
      },
      {
        name: "Capital One",
        logo: "🔴",
        offerCount: 15,
        description: "Banking and credit card offers",
        features: ["Venture Rewards", "Quicksilver", "360 Savings"],
        link: "/bank/capital-one",
      },
      {
        name: "Discover",
        logo: "🎯",
        offerCount: 12,
        description: "Cashback cards and high-yield savings",
        features: ["Cash Back", "Miles", "Student cards"],
        link: "/bank/discover",
      },
    ];
  }

  const savingsAccountsData = {
    title: t(tData?.savingsAccountsTitle, "💰 High-Yield Savings Accounts"),
    accounts: (tData?.savingsAccounts || []).map((account) => ({
      ...account,
      bank: t(account.bank, account.bank),
    })),
  };

  // Default savings accounts if not in translation
  if (savingsAccountsData.accounts.length === 0) {
    savingsAccountsData.accounts = [
      {
        bank: "Ally Bank",
        apy: "4.25%",
        minimumDeposit: "$0",
        features: ["No monthly fees", "24/7 customer support", "FDIC insured"],
        link: "/savings/ally",
      },
      {
        bank: "Marcus by Goldman Sachs",
        apy: "4.15%",
        minimumDeposit: "$0",
        features: ["No fees", "Same-day transfers", "FDIC insured"],
        link: "/savings/marcus",
      },
      {
        bank: "Synchrony Bank",
        apy: "4.30%",
        minimumDeposit: "$0",
        features: ["ATM access", "No minimum balance", "FDIC insured"],
        link: "/savings/synchrony",
      },
    ];
  }

  const loanOffersData = {
    title: t(tData?.loanOffersTitle, "📋 Personal Loan Offers"),
    loans: (tData?.loanOffers || []).map((loan) => ({
      ...loan,
      bank: t(loan.bank, loan.bank),
      loanType: t(loan.loanType, loan.loanType),
    })),
  };

  // Default loan offers if not in translation
  if (loanOffersData.loans.length === 0) {
    loanOffersData.loans = [
      {
        bank: "SoFi",
        loanType: "Personal Loan",
        rate: "8.99% - 23.43% APR",
        loanAmount: "$5,000 - $100,000",
        terms: "2-7 years",
        link: "/loan/sofi",
      },
      {
        bank: "LightStream",
        loanType: "Personal Loan",
        rate: "7.49% - 25.49% APR",
        loanAmount: "$5,000 - $100,000",
        terms: "2-7 years",
        link: "/loan/lightstream",
      },
      {
        bank: "Upstart",
        loanType: "Personal Loan",
        rate: "7.80% - 35.99% APR",
        loanAmount: "$1,000 - $50,000",
        terms: "3-5 years",
        link: "/loan/upstart",
      },
    ];
  }

  const investmentOffersData = {
    title: t(tData?.investmentOffersTitle, "📊 Investment Platform Offers"),
    investments: (tData?.investmentOffers || []).map((inv) => ({
      ...inv,
      platform: t(inv.platform, inv.platform),
    })),
  };

  // Default investment offers if not in translation
  if (investmentOffersData.investments.length === 0) {
    investmentOffersData.investments = [
      {
        platform: "Robinhood",
        offer: "Free stock worth up to $200",
        commission: "$0 trades",
        minimumDeposit: "$0",
        features: ["Fractional shares", "Cryptocurrency", "IPO access"],
        link: "/invest/robinhood",
      },
      {
        platform: "Webull",
        offer: "12 free stocks",
        commission: "$0 trades",
        minimumDeposit: "$100",
        features: ["Extended hours", "Options trading", "Margin accounts"],
        link: "/invest/webull",
      },
      {
        platform: "M1 Finance",
        offer: "$30 bonus",
        commission: "$0 trades",
        minimumDeposit: "$100",
        features: ["Automated investing", "Pie portfolios", "Borrowing"],
        link: "/invest/m1",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Smart Financial Tips"),
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
        title: "Compare Multiple Offers",
        description: "Don't settle for the first offer. Compare rates, fees, and benefits across multiple providers.",
        icon: "📊",
      },
      {
        title: "Read the Fine Print",
        description: "Understand fees, APR terms, and bonus requirements before applying.",
        icon: "🔍",
      },
      {
        title: "Check Your Credit Score",
        description: "Know your credit score before applying for credit cards or loans.",
        icon: "📈",
      },
      {
        title: "Stack Rewards",
        description: "Combine credit card rewards with cashback apps for maximum savings.",
        icon: "💰",
      },
    ];
  }

  const calculatorData = {
    title: t(tData?.calculator?.title, "Need Help Calculating?"),
    description: t(tData?.calculator?.description, "Use our financial calculators to compare loan payments, savings growth, and credit card rewards"),
    buttonText: t(tData?.calculator?.buttonText, "Try Calculators"),
  };

  const compareData = {
    title: t(tData?.compareTitle, "Compare Top Offers"),
    description: t(tData?.compare?.description, "See how the best banking offers stack up"),
    items: (tData?.compare?.items || []).map((item) => ({
      ...item,
      name: t(item.name, item.name),
    })),
  };

  // Default compare items if not in translation
  if (!compareData.items || compareData.items.length === 0) {
    compareData.items = [
      {
        name: "Chase Sapphire Preferred",
        rate: "60k points",
        fee: "$95",
        rating: 4.8,
      },
      {
        name: "Capital One Venture",
        rate: "75k miles",
        fee: "$95",
        rating: 4.7,
      },
      {
        name: "Amex Gold",
        rate: "75k points",
        fee: "$250",
        rating: 4.6,
      },
    ];
  }

  const seasonalPromosData = {
    title: t(tData?.seasonalPromosTitle, "🎯 Limited-Time Promotions"),
    promos: (tData?.seasonalPromos || []).map((promo) => ({
      ...promo,
      title: t(promo.title, promo.title),
      description: t(promo.description, promo.description),
    })),
  };

  // Default seasonal promos if not in translation
  if (seasonalPromosData.promos.length === 0) {
    seasonalPromosData.promos = [
      {
        title: "Tax Season Loan Special",
        description: "Reduced rates on personal loans through April 15",
        endDate: "Apr 15, 2025",
        link: "/promo/tax-loans",
      },
      {
        title: "Summer Travel Bonus",
        description: "Extra points on travel bookings with select cards",
        endDate: "Aug 31, 2025",
        link: "/promo/travel-bonus",
      },
    ];
  }

  const buyingGuidesData = {
    title: t(tData?.buyingGuidesTitle, "Financial Guides"),
    guides: (tData?.buyingGuides || []).map((guide) => ({
      ...guide,
      title: t(guide.title, guide.title),
      description: t(guide.description, guide.description),
    })),
  };

  // Default buying guides if not in translation
  if (buyingGuidesData.guides.length === 0) {
    buyingGuidesData.guides = [
      {
        title: "How to Choose a Credit Card",
        description: "Find the best card for your spending habits and goals",
        readTime: "8 min",
        link: "/guide/choose-credit-card",
      },
      {
        title: "Understanding Credit Scores",
        description: "Learn how credit scores work and how to improve yours",
        readTime: "6 min",
        link: "/guide/credit-scores",
      },
      {
        title: "Debt Repayment Strategies",
        description: "Proven methods to pay off debt faster",
        readTime: "10 min",
        link: "/guide/debt-repayment",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Banking & Finance FAQ - ${countryName}`),
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
        q: "How do I qualify for credit card bonuses?",
        a: "Most signup bonuses require you to spend a certain amount within the first 3-6 months. Check the specific offer terms for exact requirements."
      },
      {
        q: "What's a good APY for savings?",
        a: "High-yield savings accounts currently offer between 4-5% APY. Compare rates across multiple banks to find the best deal."
      },
      {
        q: "Will applying for multiple cards hurt my credit?",
        a: "Each application creates a hard inquiry, which may temporarily lower your score by a few points. Space out applications every 6 months."
      },
      {
        q: "Are online banks safe?",
        a: "Yes, reputable online banks are FDIC or NCUA insured, protecting your deposits up to $250,000."
      },
      {
        q: "How do I choose between rewards and low APR?",
        a: "If you carry a balance monthly, prioritize low APR. If you pay in full, rewards cards offer better value."
      },
      {
        q: "Can I negotiate loan rates?",
        a: "Yes! Many lenders will negotiate rates, especially if you have good credit or existing relationship with the bank."
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Maximizing Your Money Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of smart consumers who found the best banking and finance offers"),
    buttonText: t(tData?.final?.buttonText, "Browse All Offers"),
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
              href="/offers"
              translationKey="browse_offers"
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
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
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
                      {category.offerCount}+ offers
                    </span>
                    <a
                      href={`/offers/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
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

      {/* Featured Offers Section */}
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
                {featuredOffersData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOffersData.offers.map((offer, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
                >
                  {offer.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                      🌟 Featured
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center p-8">
                    <div className="text-6xl">{offer.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {offer.title}
                      </h3>
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
                        {offer.type}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {offer.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {offer.offerValue}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {offer.requirements}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {offer.bank}
                    </p>
                    {offer.expiryDate && (
                      <p className="text-xs text-orange-500 mb-2">
                        ⏰ Expires: {offer.expiryDate}
                      </p>
                    )}
                    <PrimaryCTA
                      href={offer.link}
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

      {/* Credit Cards Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
            aria-labelledby="cards-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="cards-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {creditCardsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditCardsData.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center p-6">
                    <div className="text-5xl">{card.image}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {card.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{card.bank}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Annual Fee:</span>
                        <span className="font-semibold">{card.annualFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rewards:</span>
                        <span className="font-semibold">{card.rewardsRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Signup Bonus:</span>
                        <span className="font-semibold text-green-600">{card.signupBonus}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Intro APR:</span>
                        <span className="font-semibold">{card.introApr}</span>
                      </div>
                    </div>
                    <PrimaryCTA
                      href={card.link}
                      translationKey="apply_now"
                      observer={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Banks Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="banks-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="banks-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {topBanksData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topBanksData.banks.map((bank, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-5xl mb-3">{bank.logo}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {bank.name}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm font-semibold mb-2">
                    {bank.offerCount} active offers
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {bank.description}
                  </p>
                  <PrimaryCTA
                    href={bank.link}
                    translationKey="view_offers"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Savings Accounts Section */}
      {savingsAccountsData.accounts.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="savings-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="savings-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {savingsAccountsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savingsAccountsData.accounts.map((account, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-green-200 dark:border-green-800"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {account.bank}
                      </h3>
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {account.apy}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Min. deposit: {account.minimumDeposit}
                      </p>
                      <ul className="text-left space-y-1 mb-4">
                        {account.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <PrimaryCTA
                        href={account.link}
                        translationKey="open_account"
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

      {/* Loan Offers Section */}
      {loanOffersData.loans.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="loans-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="loans-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {loanOffersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-4">
                {loanOffersData.loans.map((loan, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {loan.bank}
                        </h3>
                        <p className="text-sm text-gray-500">{loan.loanType}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {loan.rate}
                        </p>
                        <p className="text-xs text-gray-500">APR</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{loan.loanAmount}</p>
                        <p className="text-xs text-gray-500">Loan amount</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{loan.terms}</p>
                        <p className="text-xs text-gray-500">Terms</p>
                      </div>
                      <PrimaryCTA
                        href={loan.link}
                        translationKey="check_rate"
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

      {/* Investment Offers Section */}
      {investmentOffersData.investments.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="invest-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="invest-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {investmentOffersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {investmentOffersData.investments.map((inv, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="text-5xl mb-3">
                      {index === 0 ? "📈" : index === 1 ? "📊" : "💰"}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {inv.platform}
                    </h3>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                      {inv.offer}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Commission: {inv.commission}
                    </p>
                    <ul className="text-left space-y-1 mb-4">
                      {inv.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <PrimaryCTA
                      href={inv.link}
                      translationKey="claim_offer"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Compare Section */}
      {compareData.items && compareData.items.length > 0 && (
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
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {compareData.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Offer</th>
                      <th className="px-6 py-3 text-left">Value/Rate</th>
                      <th className="px-6 py-3 text-left">Annual Fee</th>
                      <th className="px-6 py-3 text-left">Rating</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                          {item.rate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.fee}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PrimaryCTA
                            href={`/offer/${item.name.toLowerCase().replace(/ /g, '-')}`}
                            translationKey="view"
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
                className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
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

      {/* Calculator Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="calculator-heading"
          >
            <h2
              id="calculator-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {calculatorData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {calculatorData.description}
            </p>
            <PrimaryCTA
              href="/calculators"
              translationKey={calculatorData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Seasonal Promos Section */}
      {seasonalPromosData.promos.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl my-8"
              aria-labelledby="promos-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="promos-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {seasonalPromosData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seasonalPromosData.promos.map((promo, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {promo.description}
                    </p>
                    <p className="text-sm text-orange-500 mb-4">
                      ⏰ Ends: {promo.endDate}
                    </p>
                    <PrimaryCTA
                      href={promo.link}
                      translationKey="learn_more"
                      observer={false}
                    />
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Buying Guides Section */}
      {buyingGuidesData.guides.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="guides-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="guides-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {buyingGuidesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {buyingGuidesData.guides.map((guide, index) => (
                  <a
                    key={index}
                    href={guide.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.readTime} read
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        Read guide →
                      </span>
                    </div>
                  </a>
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
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {finalData.subtitle}
            </p>
            <PrimaryCTA
              href="/offers"
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
