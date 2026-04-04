// app/[country]/(marketing)/contact/page.tsx

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
  contactMethodsTitle?: string;
  contactMethods?: Array<{
    icon: string;
    title: string;
    description: string;
    action: string;
    href: string;
  }>;
  formTitle?: string;
  formSubtitle?: string;
  form?: {
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    subjectLabel?: string;
    subjectPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submitButton?: string;
    successMessage?: string;
    errorMessage?: string;
  };
  supportHours?: {
    title?: string;
    hours?: string;
    responseTime?: string;
    phone?: string;
    email?: string;
  };
  locationsTitle?: string;
  locations?: Array<{
    city: string;
    country: string;
    address: string;
    phone: string;
    email: string;
  }>;
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
const replacePlaceholders = (text: string, countryName: string): string => {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName);
};

// Dynamic keywords based on country
const getCountrySpecificKeywords = (countryName: string, countryCode: string): string[] => {
  const lowerCountry = countryName.toLowerCase();
  
  const baseKeywords = [
    `contact cashog ${lowerCountry}`,
    `cashog support ${lowerCountry}`,
    `cashback site help ${lowerCountry}`,
    `customer support cashog ${lowerCountry}`,
    `report issue cashog ${lowerCountry}`,
    `cashog phone number ${lowerCountry}`,
    `cashog email support ${lowerCountry}`,
    `get help cashog ${lowerCountry}`,
  ];

  if (countryCode === "us") {
    baseKeywords.push(
      "cashog usa contact",
      "american cashback support"
    );
  } else if (countryCode === "gb") {
    baseKeywords.push(
      "cashog uk contact",
      "british cashback support"
    );
  } else if (countryCode === "ca") {
    baseKeywords.push(
      "cashog canada contact",
      "canadian cashback support"
    );
  } else if (countryCode === "au") {
    baseKeywords.push(
      "cashog australia contact",
      "australian cashback support"
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
    translation = await loadSectionTranslation(language, "contact");
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
    `Contact Cashog Support in ${countryName} - Get Help | Cashog`
  );

  const seoDescription = replaceCountry(
    rawDescription,
    `Need help with your Cashog account in ${countryName}? Contact our support team for assistance with cashback, account issues, or general questions. We're here to help!`
  );

  const keywordsArray = getCountrySpecificKeywords(countryName, country);
  const keywords = keywordsArray.join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    alternates: {
      canonical: `https://cashog.com/${country}/contact`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://cashog.com/${country}/contact`,
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

export default async function ContactPage({
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
  const tData = await loadSectionTranslation(language, "contact");

  // Helper function to replace placeholders
  const t = (text: string | undefined, fallback: string): string => {
    if (!text) return replacePlaceholders(fallback, countryName);
    return replacePlaceholders(text, countryName);
  };

  // SEO data for structured data
  const rawTitle = tData?.seo?.title;
  const rawDescription = tData?.seo?.description;
  const title = t(rawTitle, `Contact Cashog Support in ${countryName}`);
  const description = t(rawDescription, `Get help with your Cashog account in ${countryName}.`);

  const structuredData = generateJsonLd({
    path: `/${country}/contact`,
    title,
    description,
    type: "low",
  });

  // Prepare data with fallbacks
  const heroData = {
    title: t(tData?.hero?.title, "We're Here to Help"),
    subtitle: t(
      tData?.hero?.subtitle,
      `Have questions about cashback, account issues, or just want to say hello? Our support team in ${countryName} is ready to assist you.`
    ),
  };

  const contactMethodsData = {
    title: t(tData?.contactMethodsTitle, "Ways to Reach Us"),
    methods: (tData?.contactMethods || []).map((method) => ({
      ...method,
      title: t(method.title, method.title),
      description: t(method.description, method.description),
      action: t(method.action, method.action),
    })),
  };

  // Default contact methods if not in translation
  if (contactMethodsData.methods.length === 0) {
    contactMethodsData.methods = [
      {
        icon: "💬",
        title: "Live Chat",
        description: "Get instant answers from our support team",
        action: "Start Chat",
        href: "#chat",
      },
      {
        icon: "📧",
        title: "Email Us",
        description: "Send us an email and we'll respond within 24 hours",
        action: "support@cashog.com",
        href: "mailto:support@cashog.com",
      },
      {
        icon: "📞",
        title: "Call Us",
        description: "Speak directly with a support representative",
        action: "+1 (800) 123-4567",
        href: "tel:+18001234567",
      },
      {
        icon: "💬",
        title: "Social Media",
        description: "Reach out on Twitter, Facebook, or Instagram",
        action: "@cashog",
        href: "https://twitter.com/cashog",
      },
    ];
  }

  const formData = {
    title: t(tData?.formTitle, "Send Us a Message"),
    subtitle: t(tData?.formSubtitle, "Fill out the form below and we'll get back to you as soon as possible"),
    nameLabel: t(tData?.form?.nameLabel, "Your Name"),
    namePlaceholder: t(tData?.form?.namePlaceholder, "Enter your full name"),
    emailLabel: t(tData?.form?.emailLabel, "Email Address"),
    emailPlaceholder: t(tData?.form?.emailPlaceholder, "Enter your email address"),
    subjectLabel: t(tData?.form?.subjectLabel, "Subject"),
    subjectPlaceholder: t(tData?.form?.subjectPlaceholder, "What is this regarding?"),
    messageLabel: t(tData?.form?.messageLabel, "Message"),
    messagePlaceholder: t(tData?.form?.messagePlaceholder, "Please provide details about your question or issue..."),
    submitButton: t(tData?.form?.submitButton, "Send Message"),
    successMessage: t(tData?.form?.successMessage, "Thank you! Your message has been sent. We'll respond within 24 hours."),
    errorMessage: t(tData?.form?.errorMessage, "Sorry, something went wrong. Please try again or email us directly."),
  };

  const supportHoursData = {
    title: t(tData?.supportHours?.title, "Support Hours"),
    hours: t(tData?.supportHours?.hours, "Monday - Friday: 9:00 AM - 6:00 PM {country} Time"),
    responseTime: t(tData?.supportHours?.responseTime, "Response Time: Within 24 hours"),
    phone: t(tData?.supportHours?.phone, "Emergency Support: +1 (800) 123-4567"),
    email: t(tData?.supportHours?.email, "24/7 Email Support: support@cashog.com"),
  };

  const locationsData = {
    title: t(tData?.locationsTitle, "Our Offices"),
    locations: (tData?.locations || []).map((location) => ({
      ...location,
      city: t(location.city, location.city),
      country: t(location.country, location.country),
      address: t(location.address, location.address),
    })),
  };

  // Default locations if not in translation
  if (locationsData.locations.length === 0) {
    locationsData.locations = [
      {
        city: "San Francisco",
        country: "USA",
        address: "123 Market Street, Suite 400, San Francisco, CA 94105",
        phone: "+1 (800) 123-4567",
        email: "us@cashog.com",
      },
      {
        city: "London",
        country: "UK",
        address: "45 Oxford Street, London, W1D 2DZ",
        phone: "+44 20 1234 5678",
        email: "uk@cashog.com",
      },
    ];
  }

  const faqData = {
    title: t(tData?.faq?.title, `Frequently Asked Questions - ${countryName}`),
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
        q: "How long does it take to get a response?",
        a: "We typically respond to all inquiries within 24 hours during business days. For urgent issues, please call our support hotline.",
      },
      {
        q: "How do I report missing cashback?",
        a: "You can report missing cashback through your account dashboard or by emailing us with your order details. Please include your order confirmation number and date of purchase.",
      },
      {
        q: "Can I get help in my local language?",
        a: `Yes! Our support team in ${countryName} speaks the local language and can assist you with any questions or issues.`,
      },
      {
        q: "What information should I include in my message?",
        a: "Please include your account email, a clear description of the issue, and any relevant screenshots or order numbers. This helps us resolve your issue faster.",
      },
      {
        q: "Do you have phone support?",
        a: "Yes, we offer phone support during business hours. Our phone number is listed above in the contact methods section.",
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, please contact our support team directly. We'll guide you through the process and ensure all your data is handled according to our privacy policy.",
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
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Contact Methods Section */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="contact-methods-heading"
          >
            <div className="text-center mb-16">
              <h2
                id="contact-methods-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {contactMethodsData.title}
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                aria-hidden="true"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethodsData.methods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-green-600 dark:text-green-400 font-semibold text-sm">
                    {method.action}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Contact Form & Support Hours */}
      <CircleBorder>
        <OpeningStyle delay={0.1}>
          <section
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            aria-labelledby="form-heading"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="text-center lg:text-left mb-8">
                  <h2
                    id="form-heading"
                    className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
                  >
                    {formData.title}
                  </h2>
                  <div
                    className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full lg:mx-0 mx-auto mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.subtitle}
                  </p>
                </div>

                <form
                  action="/api/contact"
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder={formData.namePlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder={formData.emailPlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.subjectLabel}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder={formData.subjectPlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder={formData.messagePlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    {formData.submitButton}
                  </button>
                </form>
              </div>

              {/* Support Hours & Info */}
              <div>
                <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {supportHoursData.title}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🕒</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Hours</p>
                        <p className="text-gray-600 dark:text-gray-300">{supportHoursData.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Response Time</p>
                        <p className="text-gray-600 dark:text-gray-300">{supportHoursData.responseTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📞</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Phone Support</p>
                        <p className="text-gray-600 dark:text-gray-300">{supportHoursData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Email Support</p>
                        <p className="text-gray-600 dark:text-gray-300">{supportHoursData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      For urgent issues, please call our support hotline.
                      For non-urgent inquiries, email is best.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      </CircleBorder>

      {/* Office Locations Section */}
      {locationsData.locations.length > 0 && (
        <CircleBorder>
          <OpeningStyle delay={0.1}>
            <section
              className="max-w-7xl mx-auto px-6 py-24 md:py-32"
              aria-labelledby="locations-heading"
            >
              <div className="text-center mb-16">
                <h2
                  id="locations-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                  {locationsData.title}
                </h2>
                <div
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {locationsData.locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {location.city}, {location.country}
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p className="flex items-start space-x-2">
                        <span>📍</span>
                        <span>{location.address}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span>📞</span>
                        <span>{location.phone}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span>📧</span>
                        <span>{location.email}</span>
                      </p>
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
              Still Have Questions?
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Can't find what you're looking for? Our support team is always here to help.
            </p>
            <PrimaryCTA
              href="#"
              translationKey="start_chat"
              observer={true}
            />
          </section>
        </OpeningStyle>
      </CircleBorder>
    </main>
  );
}
