"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import {
  ClipboardList,
  Star,
  Gift,
  User,
  Users,
  DollarSign,
} from "lucide-react";

/* ================= SURVEY TYPE ================= */
type Survey = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number;
};

/* ================= SURVEYS ================= */
const surveys: Survey[] = [
  { id: 1, title: "Customer Satisfaction Survey", category: "Marketing", reward: "$2", popularity: 95 },
  { id: 2, title: "Product Feedback Survey", category: "Product", reward: "$3", popularity: 90 },
  { id: 3, title: "App Experience Survey", category: "Tech", reward: "$1.5", popularity: 80 },
  { id: 4, title: "Website Feedback Survey", category: "UX", reward: "$2.5", popularity: 85 },
  { id: 5, title: "Brand Awareness Survey", category: "Marketing", reward: "$2", popularity: 88 },
  { id: 6, title: "Employee Satisfaction Survey", category: "HR", reward: "$3.5", popularity: 70 },
  { id: 7, title: "Gaming Preferences Survey", category: "Gaming", reward: "$2.8", popularity: 82 },
  { id: 8, title: "Food & Nutrition Survey", category: "Health", reward: "$2.2", popularity: 78 },
  { id: 9, title: "Social Media Trends Survey", category: "Social", reward: "$3", popularity: 91 },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STATS ================= */
const stats = [
  { label: "Total Surveys", number: 1250, icon: <ClipboardList className="w-6 h-6 text-green-400" /> },
  { label: "Active Users", number: 15000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Average Reward ($)", number: 2.8, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ QUESTIONS ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. Signing up and completing surveys costs nothing." },
  { q: "How fast are payouts?", a: "Most payouts are processed instantly or within hours." },
  { q: "Why was I disqualified from a survey?", a: "Some surveys target specific demographics." },
  { q: "Can I use mobile to complete surveys?", a: "Yes. Our platform is fully mobile-friendly." },
  { q: "How much can I earn?", a: "Earnings vary by survey. Longer surveys typically pay more." },
  { q: "Do I need qualifications?", a: "No special skills are required for most surveys." },
  { q: "What payment methods are available?", a: "We support multiple payout methods." },
];

export default function SurveyWallPage() {
  return (
    <>
      <SeoEngine
        title="SurveyWall | Cashog"
        description="Complete premium surveys and earn rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Get Instant Rewards Through
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Complete premium surveys and earn cash instantly.
              </p>

              <PrimaryCTA href="/signup">Start Earning Now</PrimaryCTA>
            </>
          </Reveal>
        </section>

        {/* SURVEYS GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Featured Surveys
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Share opinions and earn rewards
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {surveys.map((survey) => (
              <Reveal key={survey.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="text-green-400 w-5 h-5" />
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                      {survey.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>

                  <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full"
                      style={{ width: `${survey.popularity}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {survey.popularity}% Popularity
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-green-500 font-bold">
                      {survey.reward}
                    </span>

                    <motion.a
                      href="/signup"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black"
                    >
                      Claim Survey
                    </motion.a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                SurveyWall Stats
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real numbers from our community
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>

                  <h3 className="text-3xl font-extrabold text-green-500">
                    <CountUp end={stat.number} />
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                How It Works
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Start earning in three simple steps
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Create your free account." },
              { icon: <Star className="w-8 h-8 text-green-400" />, title: "Complete Surveys", desc: "Choose matching surveys." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Withdraw", desc: "Redeem earnings instantly." },
            ].map((step) => (
              <Reveal key={step.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                Everything you need to know about surveys
              </p>
            </>
          </Reveal>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-5 text-left border shadow-md"
                >
                  <h3 className="font-semibold text-lg">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {faq.a}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Turn Your Opinion Into Real Rewards
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Join Cashog today and start earning instantly.
              </p>

              <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
            </>
          </Reveal>
        </section>

      </main>
    </>
  );
}
