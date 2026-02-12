// app/how-it-works/page.tsx
"use client";

import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import FloatingCTA from "@/components/cta/FloatingCTA";

// How It Works Steps
const steps = [
  {
    icon: <User size={32} />,
    title: "Sign Up for Free",
    description: "Create your account in minutes and join our growing community of earners.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points.",
  },
  {
    icon: <Gift size={32} />,
    title: "Earn Rewards",
    description: "Points can be redeemed for real cash via PayPal, gift cards, or mobile top-ups.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Withdraw Easily",
    description: "Instant payouts once you reach the minimum withdrawal threshold.",
  },
];

// Features / Benefits
const features = [
  { title: "Fast Payouts", description: "Get your money instantly via PayPal or gift cards." },
  { title: "Trusted & Secure", description: "Millions of users trust our platform daily." },
  { title: "High-Paying Offers", description: "Access top offers that maximize your earnings." },
  { title: "Mobile-Friendly", description: "Earn on the go with our fully responsive platform." },
  { title: "Trusted Payments", description: "Secure and reliable payouts every time." },
];

// FAQ Questions
const faqs = [
  { q: "How do I cash out?", a: "You can withdraw via PayPal, gift cards, or mobile top-ups once you reach the minimum threshold." },
  { q: "Are surveys safe?", a: "Yes, all tasks and surveys are secure and verified for safety." },
  { q: "Can I join from any country?", a: "Yes! Our platform supports users globally." },
  { q: "Is there a minimum age to join?", a: "You must be at least 13 years old to create an account." },
  { q: "How long does it take to get paid?", a: "Most withdrawals are processed instantly or within a few hours." },
  { q: "Do I need to pay anything to join?", a: "No, signing up is completely free." },
  { q: "Can I complete offers on mobile?", a: "Yes! Our platform is fully mobile-friendly, so you can earn anywhere." },
];

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* HERO-STYLE SECTION */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Real Money Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Follow these simple steps and start earning instantly from anywhere.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>
          </div>
          <FloatingCTA />
        </section>

        {/* HOW IT WORKS STEPS */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-yellow-500">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* FEATURES / BENEFITS */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Cashog
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer group">
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA - DARK BACKGROUND */}
        <section className="text-center py-24 px-4 bg-[#070A14] rounded-2xl mx-4 md:mx-auto max-w-3xl">
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join Now & Start Earning <ArrowRight />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-300 text-lg max-w-md mx-auto">
            Become part of our community and start earning daily rewards instantly.
          </p>
        </section>

      </main>
    </>
  );
}
