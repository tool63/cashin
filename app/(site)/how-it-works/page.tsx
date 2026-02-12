// app/how-it-works/page.tsx
"use client";

import Meta from "@/components/seo/SeoEngine";
import { motion } from "framer-motion";
import { CheckCircle, User, CreditCard, Gift } from "lucide-react";

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

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">
        <section className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Follow these simple steps and start earning real money online today.
          </p>
        </section>

        {/* Steps Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
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

        {/* CTA Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 rounded-xl mx-4 md:mx-auto max-w-3xl">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 bg-white text-black font-bold rounded-xl shadow-lg"
          >
            Get Started Now
          </motion.a>
          <p className="mt-4 text-white text-lg">
            Join thousands of users already earning daily.
          </p>
        </section>
      </main>
    </>
  );
}
