"use client";

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

export default function FinalCTASection() {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Section Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Real Money Today!
            </span>
          </h2>

          {/* Description */}
          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join millions of users already earning daily. Complete surveys, tasks, and high-paying offers securely from anywhere.
          </p>

          {/* CTA Button using PrimaryCTA */}
          <div className="inline-block">
            <PrimaryCTA href="/signup">
              Get Started Now
            </PrimaryCTA>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 1M+ Happy Users
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> $10M+ Paid Out
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 4.8/5 Trustpilot
            </div>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
