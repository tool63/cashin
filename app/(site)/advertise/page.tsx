"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Target, Globe, BarChart, DollarSign, ShieldCheck, HeadphonesIcon, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= DATA ================= */
const steps = [
  { icon: <User size={32} className="text-yellow-400" />, title: "Sign Up as Advertiser", description: "Create an advertiser account and access our platform to promote your brand or products." },
  { icon: <CreditCard size={32} className="text-green-400" />, title: "Set Up Campaigns", description: "Design your ad campaigns, choose target audience, and set your budget with ease." },
  { icon: <Target size={32} className="text-yellow-400" />, title: "Reach Millions", description: "Your ads will be displayed to millions of active users completing tasks, surveys, and offers." },
  { icon: <BarChart size={32} className="text-green-400" />, title: "Monitor & Optimize", description: "Track clicks, conversions, and ROI in real-time with our advertiser dashboard." },
];

const features = [
  { icon: <Target size={24} className="text-yellow-500" />, title: "High Engagement", description: "Reach an active audience ready to interact with your ads.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <BarChart size={24} className="text-green-500" />, title: "Real-Time Analytics", description: "Monitor performance metrics instantly to optimize campaigns.", color: "from-green-400/20 to-green-500/5" },
  { icon: <Globe size={24} className="text-yellow-500" />, title: "Global Reach", description: "Promote to users from anywhere in the world.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <DollarSign size={24} className="text-green-500" />, title: "Flexible Budgets", description: "Set daily or total campaign budgets to control spending efficiently.", color: "from-green-400/20 to-green-500/5" },
  { icon: <ShieldCheck size={24} className="text-yellow-500" />, title: "Trusted Platform", description: "Advertise on a platform trusted by millions of users worldwide.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <HeadphonesIcon size={24} className="text-green-500" />, title: "Dedicated Support", description: "Our team helps you set up and optimize campaigns 24/7.", color: "from-green-400/20 to-green-500/5" },
];

const stats = [
  { value: "50M+", label: "Active Users", icon: <Users size={20} /> },
  { value: "150+", label: "Countries", icon: <Globe size={20} /> },
  { value: "2.5B+", label: "Impressions/mo", icon: <BarChart size={20} /> },
  { value: "99.9%", label: "Uptime", icon: <CheckCircle size={20} /> },
];

const faqs = [
  { q: "How do I start advertising?", a: "Sign up for a free advertiser account and create your first campaign instantly. No credit card required to get started." },
  { q: "Can I target specific users?", a: "Yes, our platform allows detailed targeting by demographics, location, interests, and user behavior to ensure your ads reach the right audience." },
  { q: "Is there a minimum budget?", a: "You can start with any budget that fits your advertising goals. Our flexible system works for both small businesses and enterprise campaigns." },
  { q: "How is campaign performance tracked?", a: "Real-time dashboards provide clicks, conversions, impressions, CTR, and ROI metrics with detailed breakdowns by campaign, ad set, and creative." },
  { q: "Can I run campaigns globally?", a: "Absolutely! Our platform supports global reach and multi-country campaigns with localized targeting options for maximum effectiveness." },
  { q: "What ad formats are supported?", a: "We support display ads, native ads, video ads, and interactive offer walls to maximize engagement with your target audience." },
];

/* ================= PAGE COMPONENT ================= */
export default function AdvertisePage() {
  return (
    <>
      <Meta
        title="Cashog - Advertise with Us | Reach Millions of Active Users"
        description="Reach millions of active users by advertising with Cashog. Flexible budgets, real-time analytics, and global reach for your campaigns. Start advertising today!"
      />

      <main className="relative min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white overflow-hidden">

        {/* ================= BACKGROUND GRADIENT + GLOWS ================= */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20 dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20 transition-colors duration-500"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-400/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-28">

          {/* ================= HERO ================= */}
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white text-center">
            Advertise with Cashog
          </h1>
          <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            <TypingText />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            Reach millions of active users, maximize engagement, and grow your business with Cashog's premium advertising platform.
          </p>

          {/* ================= STATS ================= */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
                <span className="text-yellow-500">{stat.icon}</span>
                <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* ================= STEPS ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Works</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#0b0e1a] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group hover:-translate-y-2"
              >
                <div className="mb-4 p-4 rounded-full bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= FEATURES ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Advertise with <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Cashog</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of advertisers who trust Cashog to reach their target audience effectively
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-[#070A14] rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= FAQ ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Questions</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Everything you need to know about advertising on Cashog
          </p>
          <div className="space-y-4 mb-20">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-[#0b0e1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <summary className="font-semibold text-lg px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gradient-to-r hover:from-yellow-400/5 hover:via-green-400/5 hover:to-green-500/5">
                  <span>{faq.q}</span>
                  <span className="text-green-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>

          {/* ================= FINAL CTA ================= */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Ready to Scale Your Advertising?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of advertisers already reaching millions of active users on Cashog
            </p>
            <Link href="/signup?type=advertiser" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl hover:shadow-2xl transition-all duration-300"
              >
                Launch Your Campaign <ArrowRight size={24} />
              </motion.span>
            </Link>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">✓ No credit card required</span>
              <span className="flex items-center gap-2">✓ Cancel anytime</span>
              <span className="flex items-center gap-2">✓ 24/7 support</span>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
