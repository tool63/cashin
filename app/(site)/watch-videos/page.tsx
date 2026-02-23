"use client";

import React from "react";
import {
  Video,
  Gift,
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
      "Earn points by watching high-quality sponsored content from trusted partners.",
  },
  {
    icon: <DollarSign size={36} className="text-green-400" />,
    title: "Instant Rewards",
    description:
      "Points are credited automatically after successful video completion.",
  },
  {
    icon: <Shield size={36} className="text-blue-400" />,
    title: "Secure & Verified",
    description:
      "All video partners are verified to ensure safety and reliability.",
  },
  {
    icon: <Smartphone size={36} className="text-green-400" />,
    title: "Mobile Optimized",
    description:
      "Watch and earn from your mobile device anytime, anywhere.",
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
      "Our support team is always available to assist you.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I earn by watching videos?",
    a: "Simply watch the full sponsored video and points will be credited automatically.",
  },
  {
    q: "Why was my video not credited?",
    a: "Make sure you watched the full video without skipping or closing the page.",
  },
  {
    q: "How fast are rewards added?",
    a: "Most rewards are added instantly after successful completion.",
  },
  {
    q: "Is it safe to participate?",
    a: "Yes, we work only with verified advertising partners.",
  },
  {
    q: "Can I watch videos on mobile?",
    a: "Yes, our platform is fully optimized for mobile devices.",
  },
  {
    q: "Is there any cost to join?",
    a: "No, joining and earning is completely free.",
  },
  {
    q: "When can I withdraw?",
    a: "You can withdraw once you reach the minimum payout threshold.",
  },
];

export default function WatchVideos() {
  return (
    <>
      <Meta
        title="Watch Videos & Earn | Cashog"
        description="Earn real rewards by watching sponsored videos online. Fast, secure and reliable payouts."
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

              <PrimaryCTA
                href="/signup"
                className="px-8 py-3 text-sm rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
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
