// app/[country]/(marketing)/help/page.tsx

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
  searchPlaceholder?: string;
  popularTopicsTitle?: string;
  popularTopics?: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
  }>;
  gettingStartedTitle?: string;
  gettingStarted?: Array<{
    step: number;
    title: string;
    description: string;
    link?: string;
  }>;
  faqCategories?: Array<{
    id: string;
    title: string;
    icon: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  }>;
  videoTutorialsTitle?: string;
  videoTutorials?: Array<{
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    link: string;
  }>;
  accountManagement?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  cashbackHelp?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  technicalSupport?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  contactSupport?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  stillNeedHelp?: {
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
    `cashog help ${lowerCountry}`,
    `cashback support ${lowerCountry}`,
    `how to earn cashback ${lowerCountry}`,
    `cashog tutorial ${lowerCountry}`,
    `cashback guide ${lowerCountry}`,
    `help center cashog ${lowerCountry}`,
    `faq cashback ${lowerCountry}`,
    `cashog account help ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "cashog usa help",
      "american cashback guide"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "cashog uk help",
      "british cashback guide"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "cashog canada help",
      "canadian cashback guide"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cashog australia help",
      "australian cashback guide"
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
    translation = await loadSectionTranslation(language, "help");
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
    `Help Center - Cashog Support in ${countryName} | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Get help with Cashog in ${countryName}. Find answers to common questions about cashback, account management, and more. Our support center is here to assist you.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/help`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/help`,
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

export default async function HelpPage({
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
  const tData = await loadSectionTranslation(language, "help");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Help Center - Cashog Support in ${countryName}`);
  const description = t(rawDescription, `Get help with Cashog in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/help`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "How Can We Help You?"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Find answers, guides, and support resources for all your Cashog questions in ${countryName}.`
    ),
  };

  const searchPlaceholder = t(tData?.searchPlaceholder, "Search for help articles...");

  const popularTopicsData = {
    title: t(tData?.popularTopicsTitle, "Popular Topics"),
    topics: (tData?.popularTopics || []).map((topic) => ({
      ...topic,
      title: t(topic.title, topic.title),
      description: t(topic.description, topic.description),
    })),
  };

  // Default popular topics if not in translation
  if (popularTopicsData.topics.length === 0) {
    popularTopicsData.topics = [
      {
        icon: "💰",
        title: "How Cashback Works",
        description: "Learn how to earn cashback on your purchases",
        link: "/help/cashback-guide",
      },
      {
        icon: "📝",
        title: "Account Setup",
        description: "Create and manage your Cashog account",
        link: "/help/account-setup",
      },
      {
        icon: "🏧",
        title: "Withdrawals",
        description: "How to withdraw your earned cashback",
        link: "/help/withdrawals",
      },
      {
        icon: "🔒",
        title: "Security & Privacy",
        description: "Learn how we protect your information",
        link: "/help/security",
      },
      {
        icon: "🛍️",
        title: "Shopping Tips",
        description: "Maximize your savings while shopping",
        link: "/help/shopping-tips",
      },
      {
        icon: "❓",
        title: "Troubleshooting",
        description: "Fix common issues and errors",
        link: "/help/troubleshooting",
      },
    ];
  }

  const gettingStartedData = {
    title: t(tData?.gettingStartedTitle, "Getting Started with Cashog"),
    steps: (tData?.gettingStarted || []).map((step) => ({
      ...step,
      title: t(step.title, step.title),
      description: t(step.description, step.description),
    })),
  };

  // Default getting started steps if not in translation
  if (gettingStartedData.steps.length === 0) {
    gettingStartedData.steps = [
      {
        step: 1,
        title: "Create Your Account",
        description: "Sign up for free using your email or social media account",
        link: "/signup",
      },
      {
        step: 2,
        title: "Browse Partner Stores",
        description: "Shop at thousands of partner stores through Cashog",
        link: "/stores",
      },
      {
        step: 3,
        title: "Earn Cashback",
        description: "Get cashback automatically when you make purchases",
        link: "/how-it-works",
      },
      {
        step: 4,
        title: "Withdraw Your Earnings",
        description: "Cash out via PayPal, bank transfer, or gift cards",
        link: "/withdraw",
      },
    ];
  }

  // Combine all FAQ items from categories
  const allFaqItems: Array<{ q: string; a: string }> = [];
  
  if (tData?.faqCategories) {
    tData.faqCategories.forEach((category) => {
      category.questions.forEach((question) => {
        allFaqItems.push({
          q: t(question.question, question.question),
          a: t(question.answer, question.answer),
        });
      });
    });
  }

  // Add individual category items if they exist
  if (tData?.accountManagement?.items) {
    tData.accountManagement.items.forEach((item) => {
      allFaqItems.push({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      });
    });
  }

  if (tData?.cashbackHelp?.items) {
    tData.cashbackHelp.items.forEach((item) => {
      allFaqItems.push({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      });
    });
  }

  if (tData?.technicalSupport?.items) {
    tData.technicalSupport.items.forEach((item) => {
      allFaqItems.push({
        q: t(item.question, item.question),
        a: t(item.answer, item.answer),
      });
    });
  }

  // Default FAQ items if none exist
  let faqData = {
    title: t(tData?.seo?.title, `Frequently Asked Questions - ${countryName}`),
    items: allFaqItems.filter((item) => item.q && item.a),
  };

  if (faqData.items.length === 0) {
    faqData.items = [
      {
        q: "How do I earn cashback?",
        a: "Simply click through our partner store links, make a purchase as usual, and cashback will be automatically added to your account. No coupons or codes needed!",
      },
      {
        q: "When will I receive my cashback?",
        a: "Cashback is typically confirmed within 30-90 days, depending on the store's return policy. Once confirmed, you can withdraw it immediately.",
      },
      {
        q: "Is Cashog free to use?",
        a: "Yes! Cashog is completely free. We earn a commission from stores, and we share that commission with you as cashback.",
      },
      {
        q: "How do I withdraw my cashback?",
        a: "You can withdraw your cashback via PayPal, bank transfer, or gift cards once you reach the minimum withdrawal amount of $10.",
      },
      {
        q: "Why is my cashback pending?",
        a: "Cashback is pending while stores verify your purchase and return period. This protects against returns and cancellations.",
      },
      {
        q: "Can I use coupons with Cashog?",
        a: "Yes! You can stack coupons and promo codes with Cashog for even more savings. Just make sure to start your shopping session through Cashog first.",
      },
      {
        q: "What happens if I return an item?",
        a: "If you return an item, the cashback for that purchase will be deducted from your account. This is standard practice across all cashback platforms.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach our support team via email at support@cashog.com, live chat, or phone during business hours.",
      },
    ];
  }

  const videoTutorialsData = {
    title: t(tData?.videoTutorialsTitle, "Video Tutorials"),
    videos: (tData?.videoTutorials || []).map((video) => ({
      ...video,
      title: t(video.title, video.title),
      description: t(video.description, video.description),
    })),
  };

  const contactSupportData = {
    title: t(tData?.contactSupport?.title, "Still Need Help?"),
    subtitle: t(tData?.contactSupport?.subtitle, "Our support team is ready to assist you"),
    buttonText: t(tData?.contactSupport?.buttonText, "Contact Support"),
  };

  const stillNeedHelpData = {
    title: t(tData?.stillNeedHelp?.title, "Can't Find What You're Looking For?"),
    subtitle: t(tData?.stillNeedHelp?.subtitle, "We're here to help you with any questions or issues"),
    buttonText: t(tData?.stillNeedHelp?.buttonText, "Get in Touch"),
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

      {/* Hero Section with Search */}
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
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-lg"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-green-500 text-white px-6 py-2 rounded-full hover:from-yellow-500 hover:to-green-600 transition-all duration-300"
                >
                  🔍 Search
                </button>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Popular Topics Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="popular-topics-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="popular-topics-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {popularTopicsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTopicsData.topics.map((topic, index) => (
                <a
                  key={index}
                  href={topic.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {topic.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Getting Started Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="getting-started-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="getting-started-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {gettingStartedData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {gettingStartedData.steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg"
                    aria-label={`Step ${step.step}`}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {step.description}
                  </p>
                  {step.link && (
                    <a
                      href={step.link}
                      className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Video Tutorials Section (Optional) */}
      {videoTutorialsData.videos.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="videos-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="videos-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {videoTutorialsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTutorialsData.videos.map((video, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🎥</div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {video.description}
                      </p>
                      <a
                        href={video.link}
                        className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
                      >
                        Watch now →
                      </a>
                    </div>
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

      {/* Contact Support Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="contact-support-heading"
          >
            <h2
              id="contact-support-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {contactSupportData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {contactSupportData.subtitle}
            </p>
            <PrimaryCTA
              href="/contact"
              translationKey={contactSupportData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Still Need Help Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="still-need-help-heading"
          >
            <h2
              id="still-need-help-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {stillNeedHelpData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {stillNeedHelpData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryCTA
                href="/contact"
                translationKey={stillNeedHelpData.buttonText}
                observer={true}
              />
              <PrimaryCTA
                href="/faq"
                translationKey="Browse FAQ"
                observer={true}
              />
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
