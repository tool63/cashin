"use client";

import { earningOptions } from "@/components/homepage/earningOptions";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const earningDescriptions: Record<string, string> = {
  Surveys: "Share your opinions and get rewarded instantly",
  "App Installs": "Install apps and earn money easily",
  "Play Games": "Have fun while earning rewards",
  "Watch Videos": "Watch short videos and get paid",
  "Mining Rewards": "Earn crypto while mining rewards",
  "Complete Offers": "Finish tasks and get instant payouts",
  Offerwall: "Complete multiple offers for bonuses",
  Surveywall: "Explore surveys with higher payouts",
};

export default function TasksSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-[#0B0E1A]">
      {/* Section Title */}
      <SectionTitle icon="🎯" text="High Paying Tasks" />

      {/* Tasks Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {earningOptions.map(([icon, title, href]) => (
          <Link
            key={title}
            href={href}
            className="group relative rounded-3xl p-6 flex flex-col items-center text-center
              bg-white dark:bg-[#111827]
              border border-gray-200 dark:border-white/10
              hover:border-gradient-to-r from-yellow-400 via-green-400 to-green-500
              hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2"
          >
            {/* Icon */}
            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {earningDescriptions[title] ||
                `Earn rewards with ${title.toLowerCase()}`}
            </p>

            {/* CTA indicator */}
            <div className="mt-4 flex items-center gap-1 text-yellow-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition duration-300">
              Start earning <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
