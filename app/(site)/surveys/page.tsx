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
  UserPlus,
  ListChecks,
  Wallet,
  Users,
  BarChart3,
  DollarSign,
  Award,
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

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. Signing up and completing surveys costs nothing." },
  { q: "How fast are payouts?", a: "Most payouts are processed instantly or within hours." },
  { q: "Why was I disqualified?", a: "Some surveys target specific demographics." },
  { q: "Can I use mobile?", a: "Yes. Fully mobile optimized." },
];

export default function SurveysPage() {
  return (
    <>
      <Meta title="Surveys | Cashog" description="Complete surveys and earn rewards with Cashog." />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Earn Rewards by Completing Surveys
            </h1>

            <div className="text-3xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Share your opinion and earn real money instantly.
            </p>

            <PrimaryCTA href="/signup">Get Started</PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <p className="text-green-600 font-semibold text-center mb-2">
              Platform Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted by Thousands Worldwide
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-8 h-8 text-green-500" />, label: "Active Users", value: "250K+" },
              { icon: <BarChart3 className="w-8 h-8 text-green-500" />, label: "Surveys Completed", value: "1.2M+" },
              { icon: <DollarSign className="w-8 h-8 text-green-500" />, label: "Total Paid", value: "$850K+" },
              { icon: <Award className="w-8 h-8 text-green-500" />, label: "Avg Rating", value: "4.8★" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] p-8 rounded-2xl shadow border border-gray-200 dark:border-gray-800 text-center"
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-green-600">
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SURVEY GRID ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Surveys
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow flex flex-col h-full"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="text-green-500 w-5 h-5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {survey.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {survey.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Estimated Time: {survey.estimatedTime}
                  </p>

                  <div className="flex mt-3">
                    {Array(Math.floor(survey.rating))
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                  </div>
                </div>

                <div className="flex-grow" />

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-green-600 font-bold text-lg whitespace-nowrap">
                    {survey.reward}
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition whitespace-nowrap flex-none"
                  >
                    Start Survey
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS (MOVED HERE) ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <p className="text-green-600 font-semibold text-center mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <UserPlus className="w-8 h-8 text-green-500" />, title: "Sign Up", desc: "Create your free account in seconds." },
              { icon: <ListChecks className="w-8 h-8 text-green-500" />, title: "Complete Surveys", desc: "Choose surveys that match your profile." },
              { icon: <Wallet className="w-8 h-8 text-green-500" />, title: "Get Paid", desc: "Receive rewards instantly after completion." },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] p-8 rounded-2xl shadow border border-gray-200 dark:border-gray-800 text-center"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Start Earning?
            </h2>
            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
