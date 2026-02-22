"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { Eye, ClipboardList, Gift, Star } from "lucide-react";

/* ================= DATA ================= */
type Survey = {
  id: number;
  title: string;
  category: string;
  reward: string;
  estimatedTime: string;
  rating: number;
};

const surveys: Survey[] = [
  { id: 1, title: "Consumer Electronics Feedback", category: "Tech", reward: "$3", estimatedTime: "5 min", rating: 4.8 },
  { id: 2, title: "Travel Habits Survey", category: "Travel", reward: "$5", estimatedTime: "7 min", rating: 4.6 },
  { id: 3, title: "Healthy Eating Preferences", category: "Food", reward: "$2", estimatedTime: "3 min", rating: 4.7 },
  { id: 4, title: "Gaming Experience Feedback", category: "Gaming", reward: "$4", estimatedTime: "6 min", rating: 4.9 },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. Signing up and earning is completely free." },
  { q: "How fast are payouts?", a: "Most payouts are processed within hours." },
  { q: "What payment methods?", a: "PayPal, gift cards, and mobile top-ups (where available)." },
  { q: "Are surveys safe?", a: "Yes. Surveys collect anonymous feedback only." },
  { q: "Can I use mobile?", a: "Absolutely. The platform works on all devices." },
  { q: "How much can I earn?", a: "Earnings vary by survey — typically $1 to $10." },
];

/* ================= STAR RATING ================= */
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex justify-center mt-2">
      {Array(full).fill(0).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
      ))}
      {half && <Star className="w-5 h-5 text-yellow-400 opacity-60" />}
      {Array(empty).fill(0).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      ))}
    </div>
  );
}

/* ================= PAGE ================= */
export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Surveys | Cashog"
        description="Complete surveys and earn rewards with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">

        {/* BACKGROUND (like How It Works page) */}
        <Background />

        {/* HERO */}
        <Reveal>
          <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Earn Rewards by Completing Surveys
            </h1>

            <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Share your opinion and earn real rewards instantly.
            </p>

            <PrimaryCTA href="/signup">
              Get Started
            </PrimaryCTA>
          </section>
        </Reveal>

        {/* SURVEYS */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Surveys
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="text-green-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {survey.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold">{survey.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Estimated Time: {survey.estimatedTime}
                  </p>

                  <StarRating rating={survey.rating} />
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
        </section>

        {/* STATS (optional — simple like how it works page) */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Survey Performance
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Millions of surveys completed with trusted payouts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div className="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg text-center">
              <h3 className="text-4xl font-extrabold text-green-600">125K+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Satisfied Users</p>
            </motion.div>

            <motion.div className="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg text-center">
              <h3 className="text-4xl font-extrabold text-green-600">780K+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Surveys Completed</p>
            </motion.div>

            <motion.div className="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg text-center">
              <h3 className="text-4xl font-extrabold text-green-600">$4.5</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Average Reward</p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <Reveal>
          <section className="text-center py-28">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Start Earning?
            </h2>

            <PrimaryCTA href="/signup">
              Start Taking Surveys
            </PrimaryCTA>
          </section>
        </Reveal>

      </main>
    </>
  );
}
