"use client";

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

interface FinalCTAData {
  title?: string;
  description?: string;
  trust_badges?: string[];
}

interface FinalCTASectionProps {
  data?: FinalCTAData;
  translations?: any;
  countryName?: string;
  onOpenAuth?: (view: "login" | "signup" | "reset") => void;
}

export default function FinalCTASection({
  data = {},
  translations,
  countryName,
  onOpenAuth,
}: FinalCTASectionProps) {
  /* ================= TEXT HELPERS ================= */

  const replaceCountry = (text?: string) => {
    if (!text) return "";

    let finalText = text;

    if (countryName) {
      finalText = finalText.replace(/\{country\}/gi, countryName);
    }

    return finalText;
  };

  const t = (key: string, fallback?: string) => {
    return replaceCountry(translations?.finalhome?.[key]) || fallback || "";
  };

  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* TITLE */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">
            {replaceCountry(data.title) || t("title")}
          </h2>

          {/* DESCRIPTION */}
          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {replaceCountry(data.description) || t("description")}
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
                  <span className="text-green-500">✓</span>
                  {replaceCountry(badge)}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </OpeningStyle>
  );
}
