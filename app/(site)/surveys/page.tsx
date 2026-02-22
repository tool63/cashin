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

/* ================= SURVEYS ================= */
const surveys = [
  {
    id: 1,
    title: "Consumer Electronics Feedback",
    category: "Tech",
    reward: "$3",
    estimatedTime: "5 min",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Travel Habits Survey",
    category: "Travel",
    reward: "$5",
    estimatedTime: "7 min",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Healthy Eating Preferences",
    category: "Food",
    reward: "$2",
    estimatedTime: "3 min",
    rating: 4.7,
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "Is it free to join?",
    a: "Yes. Signing up and completing surveys costs nothing. You earn rewards for your time.",
  },
  {
    q: "How fast are payouts?",
    a: "Most payouts are processed instantly or within a few hours depending on method.",
  },
];

/* ================= PAGE ================= */
export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Surveys | Cashog"
        description="Complete surveys and earn rewards with Cashog."
      />

      {/* MAIN WRAPPER (same logic as other pages) */}
      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* CONTENT WRAPPER WITH z-10 */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Earn Rewards by Completing Surveys
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Share your opinion and earn real rewards instantly.
              </p>

              <PrimaryCTA href="/signup">
                Get Started
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* SURVEYS GRID */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
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
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="text-green-400 w-6 h-6" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {survey.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{survey.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Estimated Time: {survey.estimatedTime}
                </p>

                <div className="flex items-center mt-2">
                  {Array(Math.floor(survey.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold">{survey.reward}</span>

                  <PrimaryCTA href="/signup">
                    Start Survey
                  </PrimaryCTA>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
                Everything you need to know about earning
              </p>
            </Reveal>

            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <div className="text-center">
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
          </div>

        </section>
      </main>
    </>
  );
}
