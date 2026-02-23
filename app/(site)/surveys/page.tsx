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
  User,
  Users,
  TrendingUp,
  Gift,
} from "lucide-react";

/* ================= SURVEYS ================= */
const surveys = [
  { id: 1, title: "Consumer Electronics Feedback", category: "Tech", reward: "$3", estimatedTime: "5 min", rating: 4.8 },
  { id: 2, title: "Travel Habits Survey", category: "Travel", reward: "$5", estimatedTime: "7 min", rating: 4.6 },
  { id: 3, title: "Healthy Eating Preferences", category: "Food", reward: "$2", estimatedTime: "3 min", rating: 4.7 },
  { id: 4, title: "Mobile App Usage Study", category: "Apps", reward: "$4", estimatedTime: "6 min", rating: 4.9 },
  { id: 5, title: "Online Shopping Behavior", category: "E-commerce", reward: "$6", estimatedTime: "8 min", rating: 4.7 },
  { id: 6, title: "Gaming Preferences Survey", category: "Gaming", reward: "$3", estimatedTime: "5 min", rating: 4.8 },
  { id: 7, title: "Streaming Services Review", category: "Entertainment", reward: "$4", estimatedTime: "6 min", rating: 4.6 },
  { id: 8, title: "Financial Habits Questionnaire", category: "Finance", reward: "$7", estimatedTime: "10 min", rating: 4.9 },
  { id: 9, title: "Social Media Trends Study", category: "Social", reward: "$3", estimatedTime: "4 min", rating: 4.7 },
];

/* ================= FAQ (7 QUESTIONS) ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. Signing up and completing surveys costs nothing." },
  { q: "How fast are payouts?", a: "Most payouts are processed instantly or within hours." },
  { q: "Why was I disqualified?", a: "Some surveys target specific demographics. It happens." },
  { q: "Can I use mobile?", a: "Yes. Fully optimized for phones and tablets." },
  { q: "How much can I earn?", a: "Earnings vary per survey. Higher time surveys usually pay more." },
  { q: "Do I need special qualifications?", a: "No. Most surveys are open to general users." },
  { q: "What payment methods are available?", a: "We support multiple methods including digital wallets." },
];

/* ================= STATS ================= */
const stats = [
  { label: "Active Users", number: 250000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Surveys Completed", number: 1200000, icon: <TrendingUp className="w-6 h-6 text-green-400" /> },
  { label: "Total Paid", number: 850000, icon: <Gift className="w-6 h-6 text-green-400" /> },
  { label: "Avg Rating", number: 48, icon: <Star className="w-6 h-6 text-green-400" /> },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
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

/* ================= PAGE ================= */
export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Surveys | Cashog"
        description="Complete surveys and earn rewards with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Rewards by Completing Surveys
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Share your opinion and earn real money instantly.
            </p>

            <PrimaryCTA href="/signup">
              Get Started
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">
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
              Featured Surveys
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Share opinions and earn rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {survey.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Estimated Time: {survey.estimatedTime}
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
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm"
                  >
                    Start Survey
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in three simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Create your free account." },
              { icon: <ClipboardList className="w-8 h-8 text-green-400" />, title: "Complete Surveys", desc: "Choose surveys that match your profile." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Withdraw", desc: "Redeem your earnings instantly." },
            ].map((step) => (
              <motion.div
                key={step.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {step.desc}
                </p>
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
              Everything you need to know about earning with surveys
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Turn Your Opinion Into Real Rewards
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join Cashog today and start earning by sharing what you know.
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
