"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  ClipboardList,
  Star,
  Trophy,
  User,
  TrendingUp,
  Gift,
} from "lucide-react";

/* ================= SURVEYS ================= */
const surveys = [
  { id: 1, title: "Consumer Electronics Feedback", category: "Tech", reward: "$3", estimatedTime: "5 min", rating: 4.8 },
  { id: 2, title: "Travel Habits Survey", category: "Travel", reward: "$5", estimatedTime: "7 min", rating: 4.6 },
  { id: 3, title: "Healthy Eating Preferences", category: "Food", reward: "$2", estimatedTime: "3 min", rating: 4.7 },
  { id: 4, title: "Gaming Preferences Study", category: "Gaming", reward: "$4", estimatedTime: "6 min", rating: 4.9 },
  { id: 5, title: "Online Shopping Trends", category: "Shopping", reward: "$3", estimatedTime: "5 min", rating: 4.7 },
  { id: 6, title: "Crypto Investment Insights", category: "Finance", reward: "$6", estimatedTime: "8 min", rating: 4.8 },
  { id: 7, title: "Streaming Services Review", category: "Entertainment", reward: "$3", estimatedTime: "4 min", rating: 4.6 },
  { id: 8, title: "Fitness & Wellness Survey", category: "Health", reward: "$4", estimatedTime: "6 min", rating: 4.7 },
  { id: 9, title: "Mobile App Usage Study", category: "Apps", reward: "$2", estimatedTime: "3 min", rating: 4.5 },
];

/* ================= COUNT UP ================= */
function CountUp({ end }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STATS ================= */
const stats = [
  { label: "Surveys Completed", number: 950000, icon: <Trophy className="w-6 h-6 text-yellow-400" /> },
  { label: "Active Members", number: 420000, icon: <User className="w-6 h-6 text-green-400" /> },
  { label: "Avg Reward", number: 4, icon: <TrendingUp className="w-6 h-6 text-blue-400" /> },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. Signing up and completing surveys costs nothing." },
  { q: "How fast are payouts?", a: "Most payouts are processed instantly or within hours." },
  { q: "Why was I disqualified?", a: "Some surveys target specific demographics." },
  { q: "Is my data safe?", a: "Yes. Survey responses are anonymous and secure." },
];

/* ================= PAGE ================= */
export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Surveys | Cashog"
        description="Complete surveys and earn rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Complete Surveys & Earn Rewards
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Share your opinion and earn real money instantly.
              </p>

              <PrimaryCTA href="/signup">
                Start Earning
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* SURVEY GRID */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Surveys
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              High-paying surveys updated daily
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <ClipboardList className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {survey.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Time: {survey.estimatedTime}
                </p>

                <div className="flex justify-center mt-2">
                  {Array(Math.floor(survey.rating)).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-green-500 font-bold">{survey.reward}</span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm hover:shadow-md"
                  >
                    Start Survey
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* STATS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>
                <div className="text-3xl font-extrabold mt-2">
                  <CountUp end={stat.number} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in three simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {[
              { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Create your free account." },
              { icon: <ClipboardList className="w-8 h-8 text-green-400" />, title: "Complete Surveys", desc: "Answer surveys honestly." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Withdraw", desc: "Redeem earnings instantly." },
            ].map((step) => (
              <motion.div
                key={step.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-24">
            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Earning?
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
