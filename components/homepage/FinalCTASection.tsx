"use client";

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

interface FinalCTAData {
  title?: string;
  description?: string;
  trust_badge_1?: string;
  trust_badge_2?: string;
  trust_badge_3?: string;
}

export default function FinalCTASection({
  data = {},
}: {
  data?: FinalCTAData;
}) {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              {data.title || "Start Earning Today"}
            </span>
          </h2>

          {/* Description */}
          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {data.description ||
              "Join thousands of users earning real money by completing simple tasks online."}
          </p>

          {/* CTA */}
          <div className="inline-block">
            <PrimaryCTA
              href="/signup"
              translationKey="start_earning_now"
            />
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            {[data.trust_badge_1, data.trust_badge_2, data.trust_badge_3]
              .filter(Boolean)
              .map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {badge}
                </div>
              ))}
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
