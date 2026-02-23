"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  PackageCheck,
  Star,
  Gift,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

/* ================= PRODUCT DATA ================= */

type ProductTest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
};

const products: ProductTest[] = [
  {
    id: 1,
    title: "Smartphone Beta Test",
    description:
      "Get early access to the latest smartphone and earn rewards by reviewing it.",
    reward: "$15.00",
    duration: "7 Days",
  },
  {
    id: 2,
    title: "Headphones Trial",
    description:
      "Test premium headphones and submit feedback for instant payout.",
    reward: "$8.00",
    duration: "3 Days",
  },
  {
    id: 3,
    title: "Fitness Tracker Test",
    description:
      "Try new fitness tracker features and report your experience.",
    reward: "$12.00",
    duration: "5 Days",
  },
  {
    id: 4,
    title: "Gaming Survey",
    description: "Share your gaming habits and earn rewards.",
    reward: "$4.00",
    duration: "10 Min",
  },
  {
    id: 5,
    title: "App Usability Test",
    description: "Test a new app and provide usability feedback.",
    reward: "$6.00",
    duration: "15 Min",
  },
  {
    id: 6,
    title: "Video Feedback",
    description: "Watch and review short promotional videos.",
    reward: "$2.00",
    duration: "5 Min",
  },
  {
    id: 7,
    title: "Market Research Survey",
    description: "Help brands understand consumer preferences.",
    reward: "$5.00",
    duration: "8 Min",
  },
  {
    id: 8,
    title: "Product Opinion Poll",
    description: "Quick polls to shape future products.",
    reward: "$1.50",
    duration: "2 Min",
  },
  {
    id: 9,
    title: "Lifestyle Survey",
    description: "Answer lifestyle questions and earn rewards.",
    reward: "$3.00",
    duration: "6 Min",
  },
];

/* ================= STATS ================= */

const stats = [
  { icon: Users, title: "Active Users", value: "1M+" },
  { icon: TrendingUp, title: "Daily Earnings", value: "$25K+" },
  { icon: DollarSign, title: "Payouts", value: "$5M+" },
  { icon: BarChart3, title: "Surveys Completed", value: "8M+" },
];

/* ================= HOW IT WORKS ================= */

const steps = [
  {
    icon: Users,
    title: "Sign Up",
    description: "Create your account in minutes and join the community.",
  },
  {
    icon: PackageCheck,
    title: "Choose a Survey",
    description: "Browse available surveys and select one that fits you.",
  },
  {
    icon: CheckCircle,
    title: "Complete Tasks",
    description: "Answer questions and provide feedback.",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description: "Receive instant payouts after approval.",
  },
];

/* ================= FAQ ================= */

const faqs = [
  {
    q: "How do product tests work?",
    a: "Sign up, apply for a product test, complete instructions, and submit feedback to earn rewards.",
  },
  {
    q: "When will I receive my reward?",
    a: "Rewards are credited instantly once your submission is approved.",
  },
  {
    q: "Do I keep the product?",
    a: "Some tests allow you to keep the product, others require returns. Details are provided before applying.",
  },
  {
    q: "Is product testing free?",
    a: "Yes. There are no hidden fees.",
  },
];

export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products | Cashog"
        description="Join exclusive product testing programs and earn instant rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Test Premium Products & Earn Rewards
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join exclusive product trials, provide honest feedback, and get paid instantly.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <PrimaryCTA href="/signup">
              Start Testing Products
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Statistics
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Trusted by thousands of users worldwide
            </p>
          </Reveal>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </h3>

                <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCT OFFERS */}
        <section className="relative z-10 w-full px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Product Testing Offers
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Complete tasks and earn rewards
            </p>
          </Reveal>

          {/* Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <PackageCheck className="w-6 h-6 text-green-400" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-center">{product.title}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>

                  <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                    {product.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Reward</span>
                    <span className="text-green-500 font-bold text-lg">{product.reward}</span>
                  </div>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm hover:shadow-md transition-all"
                  >
                    Apply Now
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
              Start earning in four simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-xl flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-green-400" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about product testing
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-24 px-4">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Ready to Start Testing?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Join thousands of testers who are already earning rewards by sharing their opinions on premium products.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <PrimaryCTA href="/signup">
              Join Cashog Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
