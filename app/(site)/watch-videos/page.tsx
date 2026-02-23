"use client";

import React from "react";
import {
  Video,
  DollarSign,
  Shield,
  Smartphone,
  Globe,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* ================= FEATURES ================= */
const features = [
  {
    icon: <Video size={36} className="text-blue-400" />,
    title: "Watch Sponsored Videos",
    description:
      "Earn points by watching high-quality sponsored content from verified partners.",
  },
  {
    icon: <DollarSign size={36} className="text-green-400" />,
    title: "Instant Rewards",
    description:
      "Points are credited automatically after successful completion.",
  },
  {
    icon: <Shield size={36} className="text-blue-400" />,
    title: "Secure & Trusted",
    description:
      "All video providers are verified to ensure safety and reliability.",
  },
  {
    icon: <Smartphone size={36} className="text-green-400" />,
    title: "Mobile Optimized",
    description:
      "Watch and earn directly from your smartphone anytime.",
  },
  {
    icon: <Globe size={36} className="text-purple-400" />,
    title: "Global Access",
    description:
      "Users worldwide can participate and start earning instantly.",
  },
  {
    icon: <Headphones size={36} className="text-yellow-400" />,
    title: "24/7 Support",
    description:
      "Our support team is always available to help you.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I earn by watching videos?",
    a: "Simply watch the full sponsored video and rewards will be credited automatically.",
  },
  {
    q: "Why was my video not credited?",
    a: "Make sure you watched the video fully without skipping or closing the tab.",
  },
  {
    q: "How fast are rewards added?",
    a: "Most rewards are credited instantly after verification.",
  },
  {
    q: "Is watching videos safe?",
    a: "Yes, we only work with verified advertising partners.",
  },
  {
    q: "Can I participate using my phone?",
    a: "Absolutely! Our platform is fully mobile optimized.",
  },
  {
    q: "Is it free to join?",
    a: "Yes, joining and earning is completely free.",
  },
  {
    q: "When can I withdraw earnings?",
    a: "You can withdraw once you reach the minimum payout threshold.",
  },
];

export default function WatchVideos() {
  return (
    <>
      <Meta
        title="Watch Videos & Earn | Cashog"
        description="Earn real rewards by watching sponsored videos online. Secure, fast and reliable payouts."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Watch Videos & Earn
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Watch sponsored videos and earn rewards instantly from anywhere in the world.
              </p>

              <PrimaryCTA href="/signup">
                Start Watching
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* FEATURES */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about watching and earning
            </p>
          </Reveal>

          <div className="mb-24">
            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Watching?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join Cashog today and unlock unlimited earning opportunities.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
