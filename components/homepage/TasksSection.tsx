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
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle icon="🎯" text="Earn Money Tasks" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {earningOptions.map(([icon, title, href]) => (
          <Link
            key={title}
            href={href}
            className="rounded-2xl p-6 flex flex-col items-center text-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:scale-105 transition"
          >
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {earningDescriptions[title] || `Earn rewards with ${title.toLowerCase()}`}
            </p>
            <ArrowRight className="mt-3 text-blue-500" size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}
