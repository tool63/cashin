"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import TypingText from "@/components/typing/TypingText";
import {
  Users,
  TrendingUp,
  Gift,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";

/* ================= SURVEYS / OFFERS ================= */
const offers = [
  { id: 1, title: "Food Preferences Survey", reward: 1.5, time: "5 min", category: "Food" },
  { id: 2, title: "Travel Experience Survey", reward: 2.0, time: "8 min", category: "Travel" },
  { id: 3, title: "Fashion Shopping Survey", reward: 1.2, time: "4 min", category: "Fashion" },
  { id: 4, title: "E-commerce Shopping Survey", reward: 2.5, time: "7 min", category: "E-commerce" },
  { id: 5, title: "Technology Usage Survey", reward: 1.8, time: "6 min", category: "Technology" },
  { id: 6, title: "Lifestyle Preferences Survey", reward: 2.2, time: "6 min", category: "Lifestyle" },
  { id: 7, title: "Entertainment Preferences", reward: 1.6, time: "5 min", category: "Entertainment" },
  { id: 8, title: "Health & Wellness Survey", reward: 1.4, time: "4 min", category: "Health" },
  { id: 9, title: "Brand Feedback Survey", reward: 2.0, time: "7 min", category: "E-commerce" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  { name: "Alex", text: "Surveys are quick and rewarding. I earn daily!" },
  { name: "Maria", text: "Great way to share opinions and get paid." },
  { name: "John", text: "Simple surveys, instant rewards. Highly recommend." },
  { name: "Sarah", text: "I love earning while giving feedback." },
  { name: "David", text: "Surveys fit perfectly into my free time." },
  { name: "Emma", text: "Cashog makes earning rewards easy and fun." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do surveys work?", a: "Complete short questionnaires and earn rewards." },
  { q: "How much can I earn?", a: "Earnings depend on survey length and availability." },
  { q: "When do I get paid?", a: "Payments are processed based on our payout schedule." },
  { q: "Are surveys available daily?", a: "New surveys are added regularly." },
  { q: "Is my data safe?", a: "Yes. We prioritize user privacy and data security." },
  { q: "What payment methods are supported?", a: "Payments are available via multiple secure methods." },
  { q: "How long do surveys take?", a: "Most surveys take 3-10 minutes to complete." },
];

/* ================= STATS ================= */
const stats = [
  { label: "Surveys Completed", number: 1250000, icon: <MessageSquare /> },
  { label: "Active Participants", number: 280000, icon: <Users /> },
  { label: "Rewards Paid", number: 350000, icon: <Gift /> },
  { label: "Avg Reward ($)", number: 2.5, icon: <TrendingUp /> },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

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

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= PAGE ================= */
export default function SurveyPage() {
  return (
    <>
      <Meta
        title="Earn by Surveys | Cashog"
        description="Share your opinion and earn rewards by completing surveys."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <TypingText
              texts={[
                "Share Your Opinion, Earn Rewards",
                "Complete Surveys. Get Paid.",
                "Your Opinion Matters.",
              ]}
              speed={100}
              pause={1500}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            />

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Complete short surveys and help companies improve their products while earning rewards.
            </p>

            <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real data from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
              >
                <div className="flex justify-center mb-2 text-green-400">
                  {stat.icon}
                </div>

                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>

                <div className="text-3xl font-extrabold mt-2 text-green-500">
                  <CountUp end={stat.number} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SURVEY GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Surveys
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Complete surveys by category and earn rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {offer.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {offer.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{offer.time}</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-green-500 font-bold text-lg">
                    ${offer.reward}
                  </span>

                  <motion.a
                    href="/signup"
                    aria-label={`Start survey: ${offer.title}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm"
                  >
                    Start Survey
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Users Say
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Real feedback from our community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md"
              >
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-2">“{t.text}”</p>
                <span className="text-sm font-semibold">— {t.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Start Earning Today
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join Cashog and earn rewards by sharing your opinions.
            </p>

            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
