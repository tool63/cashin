// app/page.tsx

import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

export default function RootPage() {
  const title = "Cashog - Earn Money Online Worldwide";

  const description =
    "Earn real money online from anywhere. Complete surveys, install apps, and play games.";

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

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Earn Money Online 🌍
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Start earning from anywhere in the world. Choose your country for the best offers.
        </p>

        {/* CTA */}
        <PrimaryCTA
          href="/bd"
          translationKey="get_started_now"
          aria-label="Get started"
        />

        <p className="text-sm mt-4 text-gray-500">
          Available worldwide • No credit card required
        </p>
      </section>
    </>
  );
}
