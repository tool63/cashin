"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { ClipboardList, Star } from "lucide-react";

/* ================= APPS ================= */
const apps = [
  {
    id: 1,
    name: "Photo Editor Pro",
    category: "Utilities",
    reward: "$2",
    rating: 4.8,
    installs: "500K+",
  },
  {
    id: 2,
    name: "Fitness Tracker",
    category: "Health",
    reward: "$3",
    rating: 4.7,
    installs: "350K+",
  },
  {
    id: 3,
    name: "Language Learner",
    category: "Education",
    reward: "$2",
    rating: 4.6,
    installs: "200K+",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How does app installation earning work?",
    a: "Install apps and complete simple in-app actions to earn rewards.",
  },
  {
    q: "Are installed apps safe?",
    a: "Yes. We only feature verified apps from trusted developers.",
  },
  {
    q: "How fast are rewards credited?",
    a: "Rewards are usually credited instantly after completion.",
  },
  {
    q: "Can I uninstall apps after earning?",
    a: "Yes. After completing the earning task, you may uninstall if you wish.",
  },
  {
    q: "Is it free to participate?",
    a: "Yes. Installing apps and earning rewards costs nothing.",
  },
  {
    q: "What payment methods are available?",
    a: "You can withdraw via PayPal, gift cards, and other supported methods.",
  },
  {
    q: "How much can I earn?",
    a: "Earnings vary per app — typically between $1 and $5 per install/action.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We do not access personal data from installed apps.",
  },
  {
    q: "Do I need experience?",
    a: "No. Just install apps and follow simple instructions.",
  },
  {
    q: "Can I use mobile?",
    a: "Yes. The platform is fully mobile-friendly.",
  },
];

/* ================= PAGE ================= */
export default function AppInstallPage() {
  return (
    <>
      <Meta
        title="Install Apps & Earn | Cashog"
        description="Install apps and earn rewards instantly with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Install Apps & Earn Rewards
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Install premium apps and complete actions to earn real rewards.
              </p>

              <PrimaryCTA href="/signup">
                Get Started
              </PrimaryCTA>
            </div>
          </Reveal>
        </section>

        {/* APPS GRID */}
        <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Apps
          </h2>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ y: -4 }}
                className="
                  bg-white
                  dark:bg-[#0a0d16]
                  rounded-2xl
                  p-6
                  border
                  border-gray-200
                  dark:border-gray-800
                  shadow-md
                "
              >
                {/* CATEGORY BADGE */}
                <div className="flex items-center justify-between mb-4">
                  <ClipboardList className="text-green-500 w-6 h-6" />
                  <span className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    text-green-600
                    dark:text-green-400
                    border
                    border-green-500/20
                  ">
                    {app.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{app.name}</h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Installs: {app.installs}
                </p>

                {/* STAR RATING */}
                <div className="flex items-center mt-3">
                  {Array(Math.floor(app.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-5">
                  <span className="text-green-500 font-bold">{app.reward}</span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      rounded-lg
                      bg-gradient-to-r from-yellow-400 to-green-400
                      text-black
                      shadow-sm
                      hover:shadow-md
                    "
                  >
                    Install & Earn
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about earning
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Ready to Start Earning?
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join Cashog today and unlock unlimited earning opportunities.
            </p>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
