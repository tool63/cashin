// app/page.tsx

import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

// ===============================
// Global Homepage
// ===============================
export default function GlobalHomePage() {
  const title = "Cashog - Earn Money Online Worldwide";
  const description =
    "Cashog helps you earn real money online from anywhere in the world. Complete surveys, install apps, and play games to earn rewards.";

  // Structured Data
  const structuredData = generateJsonLd({
    path: "/",
    title,
    description,
    type: "low",
  });

  return (
    <>
      {/* SEO */}
      <SeoRenderer
        path="/"
        title={title}
        description={description}
        noindex={false}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        {/* HERO */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Earn Money Online 🌍
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Join Cashog and start earning from anywhere in the world. Complete
          simple tasks like surveys, app installs, and games.
        </p>

        <PrimaryCTA
          href="/signup"
          translationKey="get_started_now"
          aria-label="Get started now"
        />

        <p className="text-sm mt-4 text-gray-500">
          No credit card required • Available worldwide
        </p>

        {/* FEATURES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">Complete Surveys</h3>
            <p className="text-gray-600">
              Answer simple surveys and earn rewards instantly.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">Install Apps</h3>
            <p className="text-gray-600">
              Download apps and get paid quickly.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow">
            <h3 className="font-semibold text-xl mb-2">Play Games</h3>
            <p className="text-gray-600">
              Enjoy fun games while earning money.
            </p>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Earning Today
          </h2>

          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users worldwide already earning with Cashog.
          </p>

          <PrimaryCTA
            href="/signup"
            translationKey="get_started_now"
            aria-label="Get started now"
          />

          <p className="text-sm mt-4 opacity-80">
            Fast signup • Instant access • No hidden fees
          </p>
        </div>
      </section>
    </>
  );
}
