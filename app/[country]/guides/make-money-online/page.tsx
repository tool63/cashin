// app/[country]/(marketing)/make-money-online/page.tsx

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

interface Method {
  name: string;
  icon: string;
  description: string;
  earningPotential: string;
  difficulty: string;
  timeToStart: string;
  link: string;
}

interface Opportunity {
  title: string;
  company: string;
  logo: string;
  earningPotential: string;
  description: string;
  requirements: string[];
  link: string;
}

interface SuccessStory {
  name: string;
  age: number;
  location: string;
  earnings: string;
  story: string;
  image: string;
  method: string;
}

interface Tip {
  title: string;
  description: string;
  icon: string;
}

interface Resource {
  name: string;
  logo: string;
  description: string;
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
  methodsTitle?: string;
  methods?: Method[];
  opportunitiesTitle?: string;
  opportunities?: Opportunity[];
  successStoriesTitle?: string;
  successStories?: SuccessStory[];
  tipsTitle?: string;
  tips?: Tip[];
  calculatorTitle?: string;
  calculator?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  resourcesTitle?: string;
  resources?: Resource[];
  comparisonTitle?: string;
  comparison?: {
    description?: string;
    methods?: Array<{
      name: string;
    }>;
  };
  newsletterTitle?: string;
  newsletter?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    placeholder?: string;
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
    `make money online ${lowerCountry}`,
    `earn money from home ${lowerCountry}`,
    `side hustle ideas ${lowerCountry}`,
    `passive income ${lowerCountry}`,
    `work from home jobs ${lowerCountry}`,
    `online earning methods ${lowerCountry}`,
    `cashback earnings ${lowerCountry}`,
    `freelance opportunities ${lowerCountry}`,
    `survey sites ${lowerCountry}`,
    `affiliate marketing ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "make money usa",
      "american side hustles",
      "remote jobs usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "make money uk",
      "british side hustles",
      "remote jobs uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "make money canada",
      "canadian side hustles",
      "remote jobs canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "make money australia",
      "australian side hustles",
      "remote jobs australia"
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
    translation = await loadSectionTranslation(language, "make-money-online");
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
    `Make Money Online in ${countryName} - 15+ Legit Ways to Earn | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Discover legit ways to make money online in ${countryName}. From cashback and surveys to freelancing and passive income. Start earning today with our proven methods.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/make-money-online`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/make-money-online`,
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

export default async function MakeMoneyOnlinePage({
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
  const tData = await loadSectionTranslation(language, "make-money-online");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Make Money Online in ${countryName}`);
  const description = t(rawDescription, `Discover legit ways to make money online in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/make-money-online`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Make Money Online in {country}"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Discover legit ways to earn extra income from home in ${countryName}. Whether you want a side hustle or full-time online income, we've got you covered with proven methods that actually work.`
    ),
  };

  const methodsData = {
    title: t(tData?.methodsTitle, "Proven Ways to Make Money Online"),
    methods: (tData?.methods || []).map((method) => ({
      ...method,
      name: t(method.name, method.name),
      description: t(method.description, method.description),
    })),
  };

  // Default methods if not in translation
  if (methodsData.methods.length === 0) {
    methodsData.methods = [
      {
        name: "Cashback Shopping",
        icon: "💰",
        description: "Earn money back on purchases you already make. Get paid to shop at thousands of stores.",
        earningPotential: "$50-500/month",
        difficulty: "Easy",
        timeToStart: "Minutes",
        link: "/shopping-rewards",
      },
      {
        name: "Online Surveys",
        icon: "📋",
        description: "Get paid for your opinion. Companies want to hear what you think about products and services.",
        earningPotential: "$20-200/month",
        difficulty: "Easy",
        timeToStart: "Minutes",
        link: "/surveys",
      },
      {
        name: "Freelancing",
        icon: "💻",
        description: "Sell your skills online. Writing, design, programming, virtual assistance, and more.",
        earningPotential: "$500-5,000+/month",
        difficulty: "Medium",
        timeToStart: "Hours",
        link: "/freelancing",
      },
      {
        name: "Affiliate Marketing",
        icon: "🔗",
        description: "Earn commissions promoting products you love. Share links and get paid for sales.",
        earningPotential: "$100-10,000+/month",
        difficulty: "Medium",
        timeToStart: "Days",
        link: "/affiliate",
      },
      {
        name: "User Testing",
        icon: "🧪",
        description: "Test websites and apps. Get paid to find bugs and share feedback.",
        earningPotential: "$100-500/month",
        difficulty: "Easy",
        timeToStart: "Minutes",
        link: "/user-testing",
      },
      {
        name: "Online Tutoring",
        icon: "📚",
        description: "Share your knowledge. Teach students online in subjects you're good at.",
        earningPotential: "$500-3,000/month",
        difficulty: "Medium",
        timeToStart: "Hours",
        link: "/tutoring",
      },
      {
        name: "Dropshipping",
        icon: "📦",
        description: "Start an online store without inventory. Sell products that ship directly to customers.",
        earningPotential: "$500-10,000+/month",
        difficulty: "Hard",
        timeToStart: "Days",
        link: "/dropshipping",
      },
      {
        name: "Content Creation",
        icon: "🎥",
        description: "Create videos, blogs, or podcasts. Build an audience and monetize through ads and sponsors.",
        earningPotential: "$100-10,000+/month",
        difficulty: "Hard",
        timeToStart: "Weeks",
        link: "/content-creation",
      },
    ];
  }

  const opportunitiesData = {
    title: t(tData?.opportunitiesTitle, "Top Earning Opportunities"),
    opportunities: (tData?.opportunities || []).map((opp) => ({
      ...opp,
      title: t(opp.title, opp.title),
      company: t(opp.company, opp.company),
      description: t(opp.description, opp.description),
    })),
  };

  // Default opportunities if not in translation
  if (opportunitiesData.opportunities.length === 0) {
    opportunitiesData.opportunities = [
      {
        title: "Cashback App",
        company: "Cashog",
        logo: "💰",
        earningPotential: "$50-500/month",
        description: "Earn cashback on everyday purchases at thousands of stores. Stack with coupons and sales.",
        requirements: ["Free account", "Valid email", "Any country"],
        link: "/signup",
      },
      {
        title: "Survey Panel",
        company: "Survey Junkie",
        logo: "📋",
        earningPotential: "$20-150/month",
        description: "Share your opinions and get paid. Join paid surveys on products and services.",
        requirements: ["18+ years", "Email address", "Any country"],
        link: "/survey-junkie",
      },
      {
        title: "Freelance Platform",
        company: "Upwork",
        logo: "💼",
        earningPotential: "$500-5,000+/month",
        description: "Find freelance work in writing, design, programming, marketing, and more.",
        requirements: ["Skills portfolio", "Profile", "Payment method"],
        link: "/upwork",
      },
      {
        title: "User Testing",
        company: "UserTesting",
        logo: "🧪",
        earningPotential: "$100-500/month",
        description: "Test websites and apps. Record your screen and voice while giving feedback.",
        requirements: ["Microphone", "Computer", "English fluency"],
        link: "/usertesting",
      },
    ];
  }

  const successStoriesData = {
    title: t(tData?.successStoriesTitle, "Real Success Stories"),
    stories: (tData?.successStories || []).map((story) => ({
      ...story,
      name: t(story.name, story.name),
      location: t(story.location, story.location),
      story: t(story.story, story.story),
    })),
  };

  // Default success stories if not in translation
  if (successStoriesData.stories.length === 0) {
    successStoriesData.stories = [
      {
        name: "Sarah",
        age: 28,
        location: "Texas",
        earnings: "$2,500/month",
        story: "Started with cashback and surveys, now runs a full-time freelance writing business.",
        image: "👩",
        method: "Freelancing",
      },
      {
        name: "Mike",
        age: 35,
        location: "Florida",
        earnings: "$1,200/month",
        story: "Earns extra income through cashback and user testing while working full-time.",
        image: "👨",
        method: "Cashback + Testing",
      },
      {
        name: "Jessica",
        age: 42,
        location: "California",
        earnings: "$8,000/month",
        story: "Built a successful dropshipping store after learning e-commerce basics online.",
        image: "👩",
        method: "Dropshipping",
      },
    ];
  }

  const tipsData = {
    title: t(tData?.tipsTitle, "Tips to Maximize Your Earnings"),
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
        title: "Start with What You Know",
        description: "Begin with methods that match your existing skills and interests.",
        icon: "🎯",
      },
      {
        title: "Diversify Income Streams",
        description: "Combine multiple methods for more stable and higher earnings.",
        icon: "📚",
      },
      {
        title: "Be Consistent",
        description: "Set aside dedicated time each day or week for your online earning activities.",
        icon: "⏰",
      },
      {
        title: "Track Your Earnings",
        description: "Monitor what works best and focus your energy on the most profitable methods.",
        icon: "📊",
      },
    ];
  }

  const calculatorData = {
    title: t(tData?.calculator?.title, "Calculate Your Earning Potential"),
    description: t(tData?.calculator?.description, "See how much you could earn with different online money-making methods"),
    buttonText: t(tData?.calculator?.buttonText, "Try Our Calculator"),
  };

  const resourcesData = {
    title: t(tData?.resourcesTitle, "Helpful Resources"),
    resources: (tData?.resources || []).map((resource) => ({
      ...resource,
      name: t(resource.name, resource.name),
      description: t(resource.description, resource.description),
    })),
  };

  // Default resources if not in translation
  if (resourcesData.resources.length === 0) {
    resourcesData.resources = [
      {
        name: "Cashog Blog",
        logo: "📝",
        description: "Weekly tips and strategies for making money online",
        link: "/blog",
      },
      {
        name: "Earning Calculator",
        logo: "🧮",
        description: "Calculate your potential earnings with different methods",
        link: "/calculator",
      },
      {
        name: "Free Guides",
        logo: "📚",
        description: "Downloadable PDF guides for getting started",
        link: "/guides",
      },
      {
        name: "Community Forum",
        logo: "💬",
        description: "Connect with others making money online",
        link: "/forum",
      },
    ];
  }

  const comparisonData = {
    title: t(tData?.comparisonTitle, "Compare Earning Methods"),
    description: t(tData?.comparison?.description, "Find the right method for your goals and schedule"),
  };

  const newsletterData = {
    title: t(tData?.newsletter?.title, "Get Weekly Earning Tips"),
    subtitle: t(tData?.newsletter?.subtitle, "Join 50,000+ subscribers getting money-making strategies"),
    buttonText: t(tData?.newsletter?.buttonText, "Subscribe"),
    placeholder: t(tData?.newsletter?.placeholder, "Enter your email"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `Make Money Online FAQ - ${countryName}`),
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
        q: "Can I really make money online?",
        a: "Yes! Thousands of people earn legitimate income online through cashback, freelancing, surveys, and other methods. It takes time and effort, but it's absolutely possible.",
      },
      {
        q: "How much can I earn?",
        a: "Earnings vary widely based on method and effort. Some earn $50-200/month with surveys and cashback, while freelancers and entrepreneurs earn $1,000-10,000+/month.",
      },
      {
        q: "Do I need special skills?",
        a: "Not for all methods. Cashback and surveys require no special skills. Freelancing and affiliate marketing benefit from existing skills but can be learned.",
      },
      {
        q: "Are these methods legit?",
        a: "Yes, all methods we recommend are legitimate. We only list proven platforms that actually pay users. Always avoid get-rich-quick schemes.",
      },
      {
        q: "How quickly can I start earning?",
        a: "Some methods like surveys and cashback let you start earning within minutes. Others like freelancing may take days to land your first client.",
      },
      {
        q: "Do I need to pay taxes on online earnings?",
        a: "Yes, online earnings are taxable income. Keep records of your earnings and consult a tax professional for guidance.",
      },
    ];
  }

  const finalData = {
    title: t(tData?.final?.title, "Start Your Online Earning Journey Today"),
    subtitle: t(tData?.final?.subtitle, "Join thousands of people already making money online with Cashog"),
    buttonText: t(tData?.final?.buttonText, "Get Started Now"),
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
              translationKey="start_earning"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="methods-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="methods-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {methodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodsData.methods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Potential:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {method.earningPotential}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {method.difficulty}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Top Opportunities Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="opportunities-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="opportunities-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {opportunitiesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunitiesData.opportunities.map((opp, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{opp.logo}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {opp.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          by {opp.company}
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-bold">
                      {opp.earningPotential}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {opp.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Requirements:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {opp.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <PrimaryCTA
                    href={opp.link}
                    translationKey="learn_more"
                    observer={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Success Stories Section */}
      {successStoriesData.stories.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="stories-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="stories-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {successStoriesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStoriesData.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                  >
                    <div className="text-6xl mb-4">{story.image}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {story.name}, {story.age}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {story.location}
                    </p>
                    <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-3">
                      {story.earnings}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                      "{story.story}"
                    </p>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      Method: {story.method}
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
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4">{tip.icon}</div>
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
            <div className="bg-gradient-to-r from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
              <h2
                id="calculator-heading"
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {calculatorData.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {calculatorData.description}
              </p>
              <PrimaryCTA
                href="/calculator"
                translationKey={calculatorData.buttonText}
                observer={true}
              />
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Resources Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="resources-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="resources-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {resourcesData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {resourcesData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {resource.logo}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Newsletter Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="newsletter-heading"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-12">
              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
              >
                {newsletterData.title}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {newsletterData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder={newsletterData.placeholder}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  {newsletterData.buttonText}
                </button>
              </div>
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
              translationKey={finalData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
