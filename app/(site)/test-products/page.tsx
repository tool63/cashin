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
  ShieldCheck,
  Users,
  TrendingUp,
  DollarSign,
  Smartphone,
  Globe,
  Headphones,
  BarChart3,
} from "lucide-react";

/* ================= PRODUCT DATA (SURVEYS) ================= */

type ProductTest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
  popular?: boolean;
};

const products: ProductTest[] = [
  {
    id: 1,
    title: "Smartphone Beta Test",
    description:
      "Get early access to the latest smartphone and earn rewards by reviewing it.",
    reward: "$15.00",
    duration: "7 Days",
    popular: true,
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

/* ================= FAQ DATA ================= */

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

      <main className="relative bg-white dark:bg-zinc-950 text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <Reveal>
            <TypingText />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-4 mb-10">
              Join exclusive product trials, provide honest feedback, and get paid instantly.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <PrimaryCTA href="/signup">
              Start Testing Products
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Statistics
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Trusted by thousands of users worldwide
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-2xl font-bold text-green-500">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= PRODUCT SECTION (GRID RULES) ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Surveys
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              PC: 3 per row | Mid: 2 per row | Mobile: 1 per row
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className={`relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md ${
                  product.popular
                    ? "border-green-400"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {product.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}

                <PackageCheck className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />

                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {product.description}
                </p>

                <div className="mb-4">
                  <p className="text-green-500 font-bold">Reward: {product.reward}</p>
                  <p className="text-sm text-gray-500">Duration: {product.duration}</p>
                </div>

                <div className="flex justify-center">
                  <PrimaryCTA href="/signup">
                    Apply Now <CheckCircle size={16} />
                  </PrimaryCTA>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in four simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="flex justify-center mb-3">
                  <step.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Why Test Products with Cashog?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Safe, verified and rewarding experience.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Star,
                title: "Premium Brands",
                desc: "Access high-quality products before public release.",
              },
              {
                icon: Gift,
                title: "Instant Rewards",
                desc: "Get paid immediately after completing approved tests.",
              },
              {
                icon: ShieldCheck,
                title: "Secure & Verified",
                desc: "All product tests are verified and secure.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
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

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-24">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Ready to Start Testing?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join Cashog today and start earning with premium product tests.
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
