"use client";

import React from "react";
import {
  ArrowRight,
  User,
  CreditCard,
  Target,
  Globe,
  BarChart,
  DollarSign,
  ShieldCheck,
  Headphones,
  CheckCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";

/* ================= DATA ================= */

const steps = [
  {
    icon: <User size={30} className="text-yellow-400" />,
    title: "Sign Up as Advertiser",
    description:
      "Create an advertiser account and access our platform to promote your brand or products.",
  },
  {
    icon: <CreditCard size={30} className="text-green-400" />,
    title: "Set Up Campaigns",
    description:
      "Design campaigns, choose target audience, and set your budget easily.",
  },
  {
    icon: <Target size={30} className="text-yellow-400" />,
    title: "Reach Millions",
    description:
      "Your ads are displayed to millions of active users completing offers.",
  },
  {
    icon: <BarChart size={30} className="text-green-400" />,
    title: "Monitor & Optimize",
    description:
      "Track clicks, conversions, and ROI in real-time with our dashboard.",
  },
];

const features = [
  {
    icon: <Target size={22} className="text-yellow-500" />,
    title: "High Engagement",
    description: "Reach an active audience ready to interact.",
  },
  {
    icon: <BarChart size={22} className="text-green-500" />,
    title: "Real-Time Analytics",
    description: "Monitor performance metrics instantly.",
  },
  {
    icon: <Globe size={22} className="text-yellow-500" />,
    title: "Global Reach",
    description: "Promote to users worldwide.",
  },
  {
    icon: <DollarSign size={22} className="text-green-500" />,
    title: "Flexible Budgets",
    description: "Set daily or total campaign budgets easily.",
  },
  {
    icon: <ShieldCheck size={22} className="text-yellow-500" />,
    title: "Trusted Platform",
    description: "Advertise on a trusted platform.",
  },
  {
    icon: <Headphones size={22} className="text-green-500" />,
    title: "Dedicated Support",
    description: "24/7 campaign optimization support.",
  },
];

const stats = [
  { value: "50M+", label: "Active Users", icon: <Users size={18} /> },
  { value: "150+", label: "Countries", icon: <Globe size={18} /> },
  { value: "2.5B+", label: "Impressions/mo", icon: <BarChart size={18} /> },
  { value: "99.9%", label: "Uptime", icon: <CheckCircle size={18} /> },
];

const faqs = [
  {
    q: "How do I start advertising?",
    a: "Sign up for a free advertiser account and create your first campaign instantly.",
  },
  {
    q: "Can I target specific users?",
    a: "Yes, you can target by demographics, location, and interests.",
  },
  {
    q: "Is there a minimum budget?",
    a: "Start with any budget that fits your goals.",
  },
  {
    q: "How is performance tracked?",
    a: "Real-time dashboards show clicks, conversions, and ROI.",
  },
];

/* ================= PAGE ================= */

export default function AdvertisePage() {
  return (
    <>
      <Meta
        title="Advertise with Us"
        description="Reach millions of active users with our advertising platform."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        <section className="relative isolate max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-24">
              <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
                Advertise with <span className="gradient-text">Platform</span>
              </h1>

              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 gradient-text">
                <TypingText />
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Reach millions of active users and scale your business with
                performance-driven advertising.
              </p>

              <PrimaryCTA href="/signup?type=advertiser">
                Start Advertising <ArrowRight size={20} />
              </PrimaryCTA>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    <span className="text-green-400">{stat.icon}</span>
                    <span className="font-semibold">{stat.value}</span>
                    <span className="text-gray-500 dark:text-gray-300">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* STEPS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] dark:text-white rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
                >
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FEATURES */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Advertise
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Performance-driven advertising that connects brands with active users
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] dark:text-white rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about advertising
            </p>
          </Reveal>

          <div className="space-y-4 mb-24">
            {faqs.map((faq, i) => (
              <Reveal key={i}>
                <details
                  className="bg-white dark:bg-[#0a0d16] dark:text-white rounded-xl border border-gray-200 dark:border-gray-800 p-4"
                >
                  <summary className="font-semibold text-lg cursor-pointer dark:text-white">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 gradient-text">
                Ready to Scale?
              </h2>

              <PrimaryCTA href="/signup?type=advertiser">
                Launch Your Campaign <ArrowRight size={20} />
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
