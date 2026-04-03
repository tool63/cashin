// app/[country]/(marketing)/withdrawals/page.tsx

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

export default async function WithdrawalsPage({
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
  const withdrawals = await loadSectionTranslation(language, "withdrawals");

  /* ================= SEO ================= */
  const title = withdrawals?.seo?.title || `Withdraw Your Earnings in ${countryName} - Fast & Secure Payouts`;
  const description = withdrawals?.seo?.description || `Withdraw your earnings instantly in ${countryName}. Multiple payment methods including PayPal, Crypto, Bank Transfer, and Gift Cards. Fast and secure payouts.`;

  const structuredData = generateJsonLd({
    path: `/${country}/withdrawals`,
    title,
    description,
    type: "low",
  });

  /* ================= DATA TRANSFORMATION ================= */
  const heroData = {
    title: withdrawals?.hero?.title?.replace(/\{country\}/g, countryName),
    subtitle: withdrawals?.hero?.subtitle?.replace(/\{country\}/g, countryName),
  };

  const statsData = {
    title: withdrawals?.statsTitle?.replace(/\{country\}/g, countryName),
    totalWithdrawn: withdrawals?.stats?.totalWithdrawn?.replace(/\{country\}/g, countryName),
    totalWithdrawnLabel: withdrawals?.stats?.totalWithdrawnLabel,
    dailyWithdrawals: withdrawals?.stats?.dailyWithdrawals?.replace(/\{country\}/g, countryName),
    dailyWithdrawalsLabel: withdrawals?.stats?.dailyWithdrawalsLabel,
    activeUsers: withdrawals?.stats?.activeUsers?.replace(/\{country\}/g, countryName),
    activeUsersLabel: withdrawals?.stats?.activeUsersLabel,
    avgWithdrawal: withdrawals?.stats?.avgWithdrawal?.replace(/\{country\}/g, countryName),
    avgWithdrawalLabel: withdrawals?.stats?.avgWithdrawalLabel,
  };

  const methodsData = (withdrawals?.withdrawalMethods || []).map((method: any) => ({
    icon: method?.icon,
    title: method?.title?.replace(/\{country\}/g, countryName),
    description: method?.description?.replace(/\{country\}/g, countryName),
    processingTime: method?.processingTime,
    minAmount: method?.minAmount,
    fee: method?.fee,
    isPopular: method?.isPopular || false,
  }));

  const stepsData = (withdrawals?.steps || []).map((step: any, index: number) => ({
    number: index + 1,
    title: step?.title?.replace(/\{country\}/g, countryName),
    description: step?.description?.replace(/\{country\}/g, countryName),
    icon: step?.icon,
  }));

  const benefitsData = (withdrawals?.benefits || []).map((benefit: any) => ({
    icon: benefit?.icon,
    title: benefit?.title?.replace(/\{country\}/g, countryName),
    description: benefit?.description?.replace(/\{country\}/g, countryName),
  }));

  const withdrawalsData = (withdrawals?.liveWithdrawals || []).map((withdrawal: any) => ({
    name: withdrawal?.name,
    country: withdrawal?.country,
    amount: withdrawal?.amount,
    method: withdrawal?.method,
    time: withdrawal?.time,
  }));

  const faqData = {
    title: withdrawals?.faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(withdrawals?.faq?.items)
      ? withdrawals.faq.items
          .map((item: any) => ({
            q: item?.question?.replace(/\{country\}/g, countryName),
            a: item?.answer?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  const finalData = {
    title: withdrawals?.final?.title?.replace(/\{country\}/g, countryName),
    subtitle: withdrawals?.final?.subtitle?.replace(/\{country\}/g, countryName),
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
              {statsData.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.totalWithdrawn}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.totalWithdrawnLabel}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                {statsData.dailyWithdrawals}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.dailyWithdrawalsLabel}
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
                {statsData.avgWithdrawal}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {statsData.avgWithdrawalLabel}
              </div>
            </div>
          </div>
        </section>
      </OpeningStyle>

      {/* Withdrawal Methods Grid */}
      {methodsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {withdrawals?.methodsTitle?.replace(/\{country\}/g, countryName) || "Withdrawal Methods in {country}"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {withdrawals?.methodsSubtitle?.replace(/\{country\}/g, countryName) || "Choose the method that works best for you"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodsData.map((method: any, index: number) => (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 ${
                    method.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {method.isPopular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-5xl mb-4 text-center">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                    {method.description}
                  </p>
                  <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Processing:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{method.processingTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Minimum:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{method.minAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Fee:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{method.fee}</span>
                    </div>
                  </div>
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
                {withdrawals?.stepsTitle?.replace(/\{country\}/g, countryName) || "How to Withdraw Your Money"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {withdrawals?.stepsSubtitle?.replace(/\{country\}/g, countryName) || "Get your earnings in 3 simple steps"}
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

      {/* Benefits Section */}
      {benefitsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {withdrawals?.benefitsTitle?.replace(/\{country\}/g, countryName) || "Why Choose Our Withdrawal System"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefitsData.map((benefit: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </OpeningStyle>
      )}

      {/* Live Withdrawals Feed */}
      {withdrawalsData.length > 0 && (
        <OpeningStyle delay={0.1}>
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {withdrawals?.liveWithdrawalsTitle?.replace(/\{country\}/g, countryName) || "Live Withdrawals in {country}"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
                {withdrawals?.liveWithdrawalsSubtitle?.replace(/\{country\}/g, countryName) || "Real users are withdrawing money right now"}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          {withdrawal.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {withdrawal.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500 dark:text-gray-400">{withdrawal.country}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 dark:text-gray-400">{withdrawal.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400 text-lg">
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
