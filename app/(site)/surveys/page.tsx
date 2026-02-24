"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
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

/* ================= STAGGER ANIMATION ================= */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ================= DATA (9 SURVEYS) ================= */
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
  { name: "Alex", text: "I love sharing my opinions and earning rewards!" },
  { name: "Sarah", text: "Quick surveys, easy rewards. Great platform." },
  { name: "John", text: "Fantastic way to earn while answering simple surveys." },
  { name: "Emma", text: "Survey experience is smooth and rewarding." },
  { name: "Daniel", text: "I earn money daily with minimal effort. Highly recommend!" },
  { name: "Olivia", text: "Simple surveys and fast payouts, couldn't ask for more." },
];

/* ================= FAQ (6 QUESTIONS) ================= */
const faqs = [
  { q: "How do I start earning?", a: "Sign up and complete surveys to earn rewards." },
  { q: "How much can I earn per survey?", a: "Earnings depend on the survey, usually between $1 to $3." },
  { q: "Is my data safe?", a: "Yes, your data is protected and used only for survey purposes." },
  { q: "Can I redeem rewards immediately?", a: "Most surveys offer instant rewards upon completion." },
  { q: "How often can I participate?", a: "New surveys are added regularly, so check back often." },
  { q: "Are the rewards worth it?", a: "Yes! You can claim gift cards, cash, and other rewards." },
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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Share Your Opinion and <span className="gradient-text">Earn Rewards</span>
            </h1>

            <div className="text-2xl md:text-3xl font-bold mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Complete quick surveys and claim your rewards.
            </p>

            <PrimaryCTA href="/signup">
              Start Earning
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 py-28 px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Join a <span className="gradient-text">Thriving Community</span>
              </h2>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4"
            >
              {[
                { value: 50000, label: "Surveys Completed" },
                { value: 25000, label: "Active Participants" },
                { value: 100000, label: "Rewards Given" },
                { value: 99, label: "Satisfaction Rate", suffix: "%" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 text-center"
                >
                  <h3 className="text-3xl font-bold text-green-500 mb-2">
                    <CountUp end={stat.value} />
                    {stat.suffix ? stat.suffix : "+"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ================= SURVEY CARDS ================= */}
        <section className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Complete Surveys and Earn <span className="gradient-text">Instant Rewards</span>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose from a variety of surveys and get paid instantly.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {surveys.map((survey) => (
                <motion.div
                  key={survey.id}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border flex flex-col"
                >
                  <MessageSquare className="w-8 h-8 text-yellow-500 mb-4" />

                  <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Time: <span className="font-bold">{survey.time}</span>
                  </p>
                  <p className="text-green-600 font-bold mb-4">{survey.reward}</p>

                  <motion.a
                   
