// app/[country]/(marketing)/about/page.tsx

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
  storyTitle?: string;
  story?: {
    founded?: string;
    description1?: string;
    description2?: string;
    description3?: string;
  };
  missionTitle?: string;
  mission?: {
    title?: string;
    description?: string;
    values?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  teamTitle?: string;
  teamSubtitle?: string;
  team?: Array<{
    name: string;
    role: string;
    bio: string;
    image: string;
    social?: {
      linkedin?: string;
      twitter?: string;
    };
  }>;
  valuesTitle?: string;
  values?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  partnersTitle?: string;
  partnersSubtitle?: string;
  partners?: Array<{
    name: string;
    logo: string;
    description: string;
  }>;
  careers?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  contact?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  faq?: {
    title?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
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
const replacePlaceholders = (text: string, countryName: string, activeUsers: string = "500K+"): string => {
  if (!text) return "";
  return text
    .replace(/\{country\}/g, countryName)
    .replace(/\{activeUsers\}/g, activeUsers);
};

// Dynamic keywords based on country
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `cashback site ${lowerCountry}`,
    `money saving app ${lowerCountry}`,
    `shopping rewards ${lowerCountry}`,
    `earn cashback ${lowerCountry}`,
    `online shopping deals ${lowerCountry}`,
    `cashback platform ${lowerCountry}`,
    `save money shopping ${lowerCountry}`,
    `best cashback site ${lowerCountry}`,
    `shopping discounts ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "cashback usa",
      "american shopping deals",
      "save money usa"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "cashback uk",
      "british shopping deals",
      "save money uk"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "cashback canada",
      "canadian shopping deals",
      "save money canada"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cashback australia",
      "australian shopping deals",
      "save money australia"
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
    translation = await loadSectionTranslation(language, "about");
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
    `About Cashog in ${countryName} - Our Mission to Help You Save Money | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Learn about Cashog's mission to help people save money and earn cashback in ${countryName}. Discover our story, values, and commitment to smart shopping.`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/about`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/about`,
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

export default async function AboutPage({
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
  const tData = await loadSectionTranslation(language, "about");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName, "500K+");
    return replacePlaceholders(text, countryName, "500K+");
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `About Cashog in ${countryName}`);
  const description = t(rawDescription, `Learn about Cashog's mission to help people save money in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/about`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "Our Mission: Help You Save Money, Every Day"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Cashog was founded with a simple belief: everyone deserves to save money on the things they buy every day. We're building the smartest way to shop online and earn cashback in ${countryName}.`
    ),
  };

  const storyData = {
    title: t(tData?.storyTitle, "Our Story"),
    founded: t(tData?.story?.founded, "Founded in 2020"),
    description1: t(
      tData?.story?.description1,
      "Cashog started with a simple observation: millions of people were leaving money on the table by not using cashback sites. Traditional cashback platforms were clunky, slow, and frustrating to use."
    ),
    description2: t(
      tData?.story?.description2,
      `We set out to build something better. A platform that's fast, intuitive, and actually rewarding. Today, Cashog helps over 500K+ users in ${countryName} save money on thousands of stores, from fashion to electronics, travel to home goods.`
    ),
    description3: t(
      tData?.story?.description3,
      "But we're just getting started. Our team is constantly working on new features, better rewards, and smarter ways to help you keep more money in your pocket."
    ),
  };

  const missionData = {
    title: t(tData?.missionTitle, "Our Mission & Values"),
    missionTitle: t(tData?.mission?.title, "Make Saving Money Effortless"),
    missionDescription: t(
      tData?.mission?.description,
      "We believe saving money shouldn't be hard work. Our mission is to build technology that automatically finds you the best deals, highest cashback rates, and smartest shopping insights."
    ),
    values: (tData?.mission?.values || []).map((value) => ({
      ...value,
      title: t(value.title, value.title),
      description: t(value.description, value.description),
    })),
  };

  // Default values if not in translation
  if (missionData.values.length === 0) {
    missionData.values = [
      {
        icon: "💚",
        title: "Customer First",
        description: "Every decision we make starts with our users. If it doesn't help you save money or time, we don't do it.",
      },
      {
        icon: "⚡",
        title: "Speed & Simplicity",
        description: "Shopping should be fast and fun. We obsess over making Cashog the quickest way to find deals and earn cashback.",
      },
      {
        icon: "🔒",
        title: "Trust & Transparency",
        description: "No hidden fees. No fine print. We're upfront about how we make money and how much you'll earn.",
      },
      {
        icon: "🌱",
        title: "Sustainable Growth",
        description: "We're building a company for the long term, focused on creating real value for our users, partners, and communities.",
      },
    ];
  }

  const statsData = {
    title: t(tData?.statsTitle, `Cashog by the Numbers in ${countryName}`),
    stats: (tData?.stats || []).map((stat) => ({
      ...stat,
      value: t(stat.value, stat.value),
      label: t(stat.label, stat.label),
      description: t(stat.description, stat.description),
    })),
  };

  // Default stats if not in translation
  if (statsData.stats.length === 0) {
    statsData.stats = [
      {
        value: "500K+",
        label: "Active Users",
        description: "And growing every day",
      },
      {
        value: "10K+",
        label: "Partner Stores",
        description: "From fashion to electronics",
      },
      {
        value: "$50M+",
        label: "Cashback Earned",
        description: "Put back in users' pockets",
      },
      {
        value: "4.9",
        label: "User Rating",
        description: "From thousands of reviews",
      },
    ];
  }

  const teamData = {
    title: t(tData?.teamTitle, "Meet Our Team"),
    subtitle: t(tData?.teamSubtitle, "The passionate people behind Cashog"),
    members: (tData?.team || []).map((member) => ({
      ...member,
      name: t(member.name, member.name),
      role: t(member.role, member.role),
      bio: t(member.bio, member.bio),
    })),
  };

  const valuesData = {
    title: t(tData?.valuesTitle, "Our Core Values"),
    values: (tData?.values || []).map((value) => ({
      ...value,
      title: t(value.title, value.title),
      description: t(value.description, value.description),
    })),
  };

  // Default values if not in translation
  if (valuesData.values.length === 0) {
    valuesData.values = [
      {
        icon: "🎯",
        title: "Obsess Over Users",
        description: "Everything we do is designed to help our users save more money with less effort.",
      },
      {
        icon: "💪",
        title: "Move Fast",
        description: "We move quickly to bring you the best deals and newest features before anyone else.",
      },
      {
        icon: "🤝",
        title: "Win Together",
        description: "We succeed when our users, partners, and team succeed together.",
      },
      {
        icon: "📈",
        title: "Think Long Term",
        description: "We make decisions that build lasting value, not quick wins.",
      },
    ];
  }

  const partnersData = {
    title: t(tData?.partnersTitle, "Our Partners"),
    subtitle: t(tData?.partnersSubtitle, "Trusted by leading brands and retailers"),
    partners: (tData?.partners || []).map((partner) => ({
      ...partner,
      name: t(partner.name, partner.name),
      description: t(partner.description, partner.description),
    })),
  };

  const careersData = {
    title: t(tData?.careers?.title, "Join Our Team"),
    subtitle: t(tData?.careers?.subtitle, "Help us build the future of smart shopping"),
    buttonText: t(tData?.careers?.buttonText, "View Open Positions"),
  };

  const contactData = {
    title: t(tData?.contact?.title, "Get in Touch"),
    subtitle: t(tData?.contact?.subtitle, "Have questions? We'd love to hear from you"),
    buttonText: t(tData?.contact?.buttonText, "Contact Us"),
  };

  const faqData = {
    title: t(tData?.faq?.title, `About Cashog in ${countryName} - FAQ`),
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
        q: "Is Cashog really free to use?",
        a: "Yes! Cashog is completely free for users. We earn a commission from our partner stores when you make a purchase through our links, and we share that commission with you as cashback.",
      },
      {
        q: "How do I get my cashback?",
        a: "Once your purchase is confirmed by the store (usually within 30-90 days), the cashback is added to your account. You can then withdraw it via PayPal, bank transfer, or gift cards.",
      },
      {
        q: "Is Cashog available in my country?",
        a: `Cashog is available in multiple countries including ${countryName}. Check our website for the full list of supported countries and stores.`,
      },
      {
        q: "How does Cashog make money?",
        a: "We earn affiliate commissions from stores when we send them customers. We then share a portion of that commission with you as cashback, and keep a small portion to run and improve the platform.",
      },
      {
        q: "Is my personal information safe?",
        a: "Absolutely. We take privacy and security seriously. We never sell your personal information, and we use industry-standard encryption to protect your data.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach our support team through the contact form on our website, or email us directly at support@cashog.com. We typically respond within 24 hours.",
      },
    ];
  }

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
              href="/"
              translationKey="start_saving"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Story Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="story-heading"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                  {storyData.founded}
                </div>
                <h2
                  id="story-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
                >
                  {storyData.title}
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>{storyData.description1}</p>
                  <p>{storyData.description2}</p>
                  <p>{storyData.description3}</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 to-green-500 rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="text-8xl mb-4">💰</div>
                      <p className="text-white font-semibold text-xl">Saving money, simplified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              {statsData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Mission Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="mission-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="mission-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {missionData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {missionData.missionTitle}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {missionData.missionDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionData.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Values Section */}
      {valuesData.values.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="values-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="values-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {valuesData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valuesData.values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-3" aria-hidden="true">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Team Section (Optional - only if team data exists) */}
      {teamData.members.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="team-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="team-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {teamData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {teamData.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamData.members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </OpeningStyle>
        </CircleBorder>
      )}

      {/* Partners Section (Optional) */}
      {partnersData.partners.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="partners-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="partners-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {partnersData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                  {partnersData.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partnersData.partners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-4xl mb-3">{partner.logo}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {partner.description}
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

      {/* Careers Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="careers-heading"
          >
            <h2
              id="careers-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {careersData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {careersData.subtitle}
            </p>
            <PrimaryCTA
              href="/careers"
              translationKey={careersData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Contact Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center"
            aria-labelledby="contact-heading"
          >
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              {contactData.title}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {contactData.subtitle}
            </p>
            <PrimaryCTA
              href="/contact"
              translationKey={contactData.buttonText}
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
