"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import { MessageSquare, CheckCircle, Star } from "lucide-react";

/* ================= COUNT UP ================= */
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

/* ================= SURVEYS ================= */
const surveys = [
  { id: 1, title: "Food Preferences Survey", reward: "$1.5", time: "5 min", category: "Food" },
  { id: 2, title: "Travel Experience Survey", reward: "$2.0", time: "8 min", category: "Travel" },
  { id: 3, title: "Fashion Shopping Survey", reward: "$1.2", time: "4 min", category: "Fashion" },
  { id: 4, title: "E-commerce Shopping Survey", reward: "$2.5", time: "7 min", category: "E-commerce" },
  { id: 5, title: "Technology Usage Survey", reward: "$1.8", time: "6 min", category: "Technology" },
  { id: 6, title: "Lifestyle Preferences Survey", reward: "$2.2", time: "6 min", category: "Lifestyle" },
  { id: 7, title: "Entertainment Preferences Survey", reward: "$1.6", time: "5 min", category: "Entertainment" },
  { id: 8, title: "Health & Wellness Survey", reward: "$1.4", time: "4 min", category: "Health" },
  { id: 9, title: "Product Feedback Survey", reward: "$2.0", time: "7 min", category: "Product" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  { name: "Alex", text: "I love sharing opinions and earning rewards!" },
  { name: "Sarah", text: "Quick surveys and instant rewards. Great platform." },
  { name: "John", text: "Simple surveys and fast payouts. Highly recommend." },
  { name: "Emma", text: "Surveys are easy and rewards are real." },
  { name: "Daniel", text: "I earn daily with minimal effort!" },
  { name: "Olivia", text: "Great way to earn by answering questions." },
];

export default function SurveyPage() {
  return (
    <>
      <SeoEngine
        title="Earn by Surveys | Cashog"
        description="Complete surveys and earn rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-32 px-6 text-center">
          <Reveal>
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Share Your Opinion and <span className="gradient-text">Earn Rewards</span>
              </h1>

              <div className="text-2xl md:text-3xl font-bold mb-6">
                <TypingText />
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Complete short surveys and earn rewards instantly.
              </p>

              <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
            </>
          </Reveal>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 py-28 px-6">
          <Reveal>
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Growing Community of Earners
                </h2>
              </div>

              <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4">
                {[
                  { value: 50000, label: "Surveys Completed" },
                  { value: 25000, label: "Active Participants" },
                  { value: 100000, label: "Rewards Given" },
                  { value: 99, label: "Satisfaction Rate", suffix: "%" },
                ].map((stat, i) => (
                  <Reveal key={i}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border text-center"
                    >
                      <h3 className="text-3xl font-bold text-green-500 mb-2">
                        <CountUp end={stat.value} />
                        {stat.suffix ? stat.suffix : "+"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </>
          </Reveal>
        </section>

        {/* ================= SURVEY CARDS ================= */}
        <section className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
          <Reveal>
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Complete Surveys and Earn Rewards
                </h2>

                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Choose from categories and get paid for your opinions.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {surveys.map((survey) => (
                  <Reveal key={survey.id}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border flex flex-col"
                    >
                      <MessageSquare className="w-8 h-8 text-yellow-500 mb-4" />

                      <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 mb-3 self-start">
                        {survey.category}
                      </span>

                      <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        Time: {survey.time}
                      </p>
                      <p className="text-green-600 font-bold mb-4">{survey.reward}</p>

                      <motion.a
                        href="/signup"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-auto inline-flex items-center justify-center gap-2
                          bg-gradient-to-r from-yellow-400 to-green-500
                          text-black px-4 py-2.5 rounded-xl font-semibold text-sm shadow"
                      >
                        Start Survey <CheckCircle size={16} />
                      </motion.a>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </>
          </Reveal>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="relative z-10 py-28 px-6">
          <Reveal>
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Loved by Earners
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Real feedback from our community.
                </p>
              </div>

              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <Reveal key={i}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white dark:bg-[#0a0d16] rounded-3xl p-6 shadow-md border"
                    >
                      <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="italic text-gray-600 dark:text-gray-300">
                        “{t.text}”
                      </p>
                      <h3 className="mt-4 font-semibold text-green-500">
                        — {t.name}
                      </h3>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </>
          </Reveal>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-36 px-6 text-center">
          <Reveal>
            <>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
                Start Earning Today
              </h2>

              <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
            </>
          </Reveal>
        </section>
      </main>
    </>
  );
}
