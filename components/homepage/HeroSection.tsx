"use client";

import TypingText from "@/components/typing/home";
import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

interface HeroData {
  headline?: string;
  subtext?: string;
  trust_badges?: string[];
}

interface HeroSectionProps {
  data?: HeroData;
  onOpenAuth?: (view: "login" | "signup" | "reset") => void;

  // ✅ NEW: pass translations + country
  translations?: any;
  countryName?: string;
}

export default function HeroSection({
  data = {},
  onOpenAuth,
  translations,
  countryName,
}: HeroSectionProps) {
  return (
    <OpeningStyle delay={0.1}>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">

        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          {data.headline || "Get Paid Instantly"}
        </h1>

        {/* TYPING TEXT */}
        <div className="mb-6">
          <TypingText
            translations={translations}
            countryName={countryName}
          />
        </div>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {data.subtext || ""}
        </p>

        {/* CTA */}
        <div
          className="inline-block cursor-pointer"
          onClick={() => onOpenAuth?.("signup")}
        >
          <PrimaryCTA
            href="/signup"
            translationKey="start_earning_now"
            observer={true}
          />
        </div>

        {/* TRUST BADGES */}
        {data.trust_badges && data.trust_badges.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            {data.trust_badges.map((badge: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {badge}
              </div>
            ))}
          </div>
        )}

      </section>
    </OpeningStyle>
  );
}
