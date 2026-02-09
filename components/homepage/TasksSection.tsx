"use client";

import { earningOptions } from "@/components/earning/earningOptions";
import { SectionTitle } from "@/components/live/SmallComponents";
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
    <section className="max-w-7xl mx-auto px-6 py-20">
      <SectionTitle icon="🎯" text="High Paying Tasks" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {earningOptions.map(([icon, title, href]) => (
          <Link
            key={title}
            href={href}
            className="group relative rounded-3xl p-6 flex flex-col items-center text-center
              bg-gray-100 dark:bg-white/5
              border border-gray-200 dark:border-white/10
              hover:border-blue-500/40
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="text-4xl mb-3 transition-transform group-hover:scale-110">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold">{title}</h3>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {earningDescriptions[title] ||
                `Earn rewards with ${title.toLowerCase()}`}
            </p>

            {/* CTA indicator */}
            <div className="mt-4 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
              Start earning <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
