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

/* ================= TYPES ================= */
type Survey = {
  id: number;
  title: string;
  category: string;
  reward: string;
  estimatedTime: string;
  rating: number;
};

/* ================= DATA ================= */
const surveys: Survey[] = [
  { id: 1, title: "Consumer Electronics Feedback", category: "Tech", reward: "$3", estimatedTime: "5 min", rating: 4.8 },
  { id: 2, title: "Travel Habits Survey", category: "Travel", reward: "$5", estimatedTime: "7 min", rating: 4.6 },
  { id: 3, title: "Healthy Eating Preferences", category: "Food", reward: "$2", estimatedTime: "3 min", rating: 4.7 },
  { id: 4, title: "Gaming Experience Feedback", category: "Gaming", reward: "$4", estimatedTime: "6 min", rating: 4.9 },
  { id: 5, title: "E-commerce Shopping Habits", category: "Shopping", reward: "$3", estimatedTime: "5 min", rating: 4.5 },
  { id: 6, title: "Fitness & Lifestyle", category: "Health", reward: "$4", estimatedTime: "6 min", rating: 4.8 },
];

/* ================= STATS ================= */
const stats = [
  { label: "Satisfied Users", number: 125000 },
  { label: "Surveys Completed", number: 780000 },
  { label: "Average Reward ($)", number: 4.5 },
];

/* ================= FAQ DATA ================= */
const faqs = [
  {
    q: "Is it free to join?",
    a: "Yes. Signing up and completing surveys costs nothing. You earn rewards for your time.",
  },
  {
    q: "How fast are payouts?",
    a: "Most payouts are processed instantly or within a few hours depending on method.",
  },
  {
    q: "What payment methods are available?",
    a: "You can withdraw via PayPal, gift cards, and mobile top-ups (where supported).",
  },
  {
    q: "Are surveys safe and legit?",
    a: "Yes. All surveys are verified and designed to collect anonymous feedback only.",
  },
  {
    q: "Why was I disqualified from a survey?",
    a: "Some surveys target specific demographics. If you don’t qualify, you can try another one.",
  },
  {
    q: "How much can I earn?",
    a: "Earnings vary by survey. Most surveys pay between $1 and $10 depending on complexity.",
  },
  {
    q: "Can I use mobile?",
    a: "Absolutely. Our platform is fully mobile-friendly and works on all devices.",
  },
  {
    q: "Is there a minimum age requirement?",
    a: "Yes. You must be at least 13 years old to participate (or older depending on region).",
  },
];

/* ================= COUNT UP HOOK ================= */
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const increment = end / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [visible, end, duration]);

  return { count, ref };
}

/* ================= STAR RATING ================= */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex justify-center mt-2">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
        ))}
      {hasHalf && <Star className="w-5 h-5 text-yellow-400 opacity-60" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
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
        description="Complete surveys and earn rewards with Cashog. Fast payouts and professional surveys."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <Reveal>
          <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Earn Rewards by Completing Surveys
            </h1>

            <div className="text-3xl md:text-4xl font-extrabold mb-6 gradient-text">
              <TypingText />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Share your opinion, help businesses improve, and earn real money instantly.
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

          <div className="grid md:grid-cols-3 gap-8">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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

        {/* STATS */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Survey Performance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stats.map((stat) => {
              const { count, ref } = useCountUp(stat.number);

              return (
                <motion.div
                  key={stat.label}
                  className="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 ref={ref} className="text-4xl font-extrabold text-green-600">
                    {count.toLocaleString()}
                    {stat.label === "Average Reward ($)" && "$"}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
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
              Ready to Share Your Opinion?
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
