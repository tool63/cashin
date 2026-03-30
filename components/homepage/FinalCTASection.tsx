"use client";

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

export default function FinalCTASection({ data }: { data: any }) {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              {data.title}
            </span>
          </h2>

          {/* Description */}
          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {data.description}
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
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {data.trust_badge_1}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {data.trust_badge_2}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {data.trust_badge_3}
            </div>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
