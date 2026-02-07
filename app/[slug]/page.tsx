"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react";

import HeroSection from "@/components/hero/HeroSection";
import { getEarningOptions } from "@/components/earning/earningOptions";
import { SectionTitle, Stat, Feature } from "@/components/live/SmallComponents";
import Meta from "@/components/seo/SeoEngine";

export default function DynamicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // English-only earning options
  const earningOptions = getEarningOptions(() => "");

  const option = earningOptions.find(([, , href]) => href === `/${slug}`);

  const title = option
    ? `${option[1]} | PayUp`
    : slug
    ? `${slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1)} | PayUp`
    : "PayUp";

  const description = option
    ? `Earn money by ${option[1].toLowerCase()} instantly on PayUp.`
    : slug
    ? `Learn more about ${slug.replace("-", " ")} and earn real money on PayUp.`
    : "PayUp - Earn rewards online";

  return (
    <>
      <Meta title={title} description={description} />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
        <HeroSection />

        {/* Page Header */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {option
              ? option[1]
              : slug
              ? slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1)
              : "Page"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            {option
              ? `Start earning by ${option[1].toLowerCase()} today!`
              : "Explore opportunities and start earning rewards now."}
          </p>
        </section>

        {/* Tasks Grid */}
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
                  Earn by {title.toLowerCase()}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Additional sections (Trust, Payments, Features, CTA) */}
        {/* Keep as in your current code; imports are already correct */}
      </main>
    </>
  );
}
