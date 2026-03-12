"use client";

import TypingText from "@/components/typing/home";
import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

interface HeroSectionProps {
  onOpenAuth: (view: "login" | "signup" | "reset") => void;
}

export default function HeroSection({ onOpenAuth }: HeroSectionProps) {
  return (
    <OpeningStyle delay={0.1}>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">

        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Get Paid Instantly By
        </h1>

        {/* TYPING GRADIENT TEXT */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            <TypingText />
          </span>
        </div>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
        </p>

        {/* CTA BUTTON */}
        <div
          className="inline-block cursor-pointer"
          onClick={() => onOpenAuth?.("signup")}
        >
          <PrimaryCTA href="/signup" observer={true}>
            Start Earning Now
          </PrimaryCTA>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 100% Free to Join
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Instant Payouts
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 1M+ Happy Users
          </div>
        </div>

      </section>
    </OpeningStyle>
  );
}
