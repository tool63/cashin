// app/[country]/(marketing)/cashout/page.tsx

import { cookies } from "next/headers";

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
import OpeningStyle from "@/components/animations/openingstyle";
import FAQ from "@/components/animations/FAQ";

/* ================= HELPER ================= */

async function loadSectionTranslation(language: string, section: string) {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch (error) {
    console.warn(`Missing translation: ${section} (${language})`);
    return {};
  }
}

/* ================= LANGUAGE ================= */

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

/* ================= PAGE ================= */

export default async function CashoutPage({
  params,
}: {
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null;
  }

  const country = countryParam as CountryCode;
  const countryName = getCountry(country).name;
  const language = getLanguage(country);

  /* ================= LOAD TRANSLATIONS ================= */
  const cashout = await loadSectionTranslation(language, "cashout");

  /* ================= SEO ================= */
  const title = cashout?.seo?.title || `Cash Out Your Earnings in ${countryName} - Fast & Secure Withdrawals`;
  const description = cashout?.seo?.description || `Withdraw your earnings instantly in ${countryName}. Multiple payment methods including PayPal, USDT, Bitcoin, Gift Cards, and more. Fast and secure payouts.`;

  const structuredData = generateJsonLd({
    path: `/${country}/cashout`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: cashout?.hero?.title?.replace(/\{country\}/g, countryName),
    subtitle: cashout?.hero?.subtitle?.replace(/\{country\}/g, countryName),
  };

  const paymentMethodsData = (cashout?.paymentMethods || []).map((method: any) => ({
    icon: method?.icon,
    title: method?.title?.replace(/\{country\}/g, countryName),
    description: method?.description?.replace(/\{country\}/g, countryName),
    features: method?.features || [],
    isPopular: method?.isPopular || false,
  }));

  const stepsData = (cashout?.steps || []).map((step: any, index: number) => ({
    number: index + 1,
    title: step?.title?.replace(/\{country\}/g, countryName),
    description: step?.description?.replace(/\{country\}/g, countryName),
    icon: step?.icon,
  }));

  const featuresData = (cashout?.features || []).map((feature: any) => ({
    icon: feature?.icon,
    title: feature?.title?.replace(/\{country\}/g, countryName),
    description: feature?.description?.replace(/\{country\}/g, countryName),
  }));

  const withdrawalsData = (cashout?.liveWithdrawals || []).map((withdrawal: any) => ({
    name: withdrawal?.name,
    country: withdrawal?.country,
    amount: withdrawal?.amount,
    time: withdrawal?.time,
  }));

  const faqData = {
    title: cashout?.faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(cashout?.faq?.items)
      ? cashout.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: cashout?.final?.title?.replace(/\{country\}/g, countryName),
    subtitle: cashout?.final?.subtitle?.replace(/\{country\}/g, countryName),
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
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
            {heroData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <PrimaryCTA
            href="/signup"
            translationKey="start_earning_now"
            observer={true}
          />
        </section>
      </OpeningStyle>

      {/* Stats Highlights */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {cashout?.statsTitle?.replace(/\{country\}/g, countryName) || "Withdrawal Statistics"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {cashout?.stats?.totalWithdrawals || "$10M+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {cashout?.stats?.totalWithdrawalsLabel || "Total Withdrawn"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {cashout?.stats?.instantPayouts || "Instant"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {cashout?.stats?.instantPayoutsLabel || "Payout Speed"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {cashout?.stats?.methods || "10+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {cashout?.stats?.methodsLabel || "Payment Methods"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {cashout?.stats?.users || "50K+"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {cashout?.stats?.usersLabel || "Happy Users"}
              </div>
            </div>
          </div>
        </section>
      </OpeningStyle>

      {/* Payment Methods Grid */}
      {paymentMethodsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {cashout?.methodsTitle?.replace(/\{country\}/g, countryName) || "Withdrawal Methods in {country}"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {cashout?.methodsSubtitle?.replace(/\{country\}/g, countryName) || "Choose your preferred way to cash out"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethodsData.map((method: any, index: number) => (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center ${
                    method.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {method.isPopular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="text-5xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {method.description}
                  </p>
                  {method.features && method.features.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                      <ul className="space-y-1">
                        {method.features.slice(0, 2).map((feature: string, idx: number) => (
                          <li key={idx} className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                            <span className="text-green-500">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* How to Withdraw - Steps */}
      {stepsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {cashout?.stepsTitle?.replace(/\{country\}/g, countryName) || "How to Withdraw Your Earnings"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {cashout?.stepsSubtitle?.replace(/\{country\}/g, countryName) || "Withdraw your money in 3 simple steps"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stepsData.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.icon || step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Features Section */}
      {featuresData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {cashout?.featuresTitle?.replace(/\{country\}/g, countryName) || "Why Users Love Our Payout System"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresData.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Live Withdrawals Section */}
      {withdrawalsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {cashout?.liveWithdrawalsTitle?.replace(/\{country\}/g, countryName) || "Live Withdrawals in {country}"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {cashout?.liveWithdrawalsSubtitle?.replace(/\{country\}/g, countryName) || "Real users are withdrawing money right now"}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {withdrawalsData.map((withdrawal: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {withdrawal.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {withdrawal.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {withdrawal.country}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          ${withdrawal.amount}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {withdrawal.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* FAQ Section */}
      {faqData.items.length > 0 && (
        <OpeningStyle delay={0.1}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <FAQ title={faqData.title} faqs={faqData.items} />
          </div>
        </OpeningStyle>
      )}

      {/* Final Section */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {finalData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {finalData.subtitle}
          </p>
          <PrimaryCTA
            href="/signup"
            translationKey="start_earning_now"
            observer={true}
          />
        </section>
      </OpeningStyle>
    </main>
  );
}
