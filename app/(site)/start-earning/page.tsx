// app/(site)/start-earning/page.tsx
"use client";

import { ArrowRight, Gift, Video, Gamepad, Smartphone, Star, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

const earningMethods = [
  { icon: <Gift size={28} />, title: "Surveys", description: "Complete surveys to earn cash quickly." },
  { icon: <Video size={28} />, title: "Watch Videos", description: "Watch fun videos and get rewarded." },
  { icon: <Gamepad size={28} />, title: "Play Games", description: "Play games and earn points instantly." },
  { icon: <Smartphone size={28} />, title: "Install Apps", description: "Install apps and get paid." },
];

const highOffers = [
  { title: "Premium App Signup", reward: "$5", description: "Sign up for top apps and earn instantly." },
  { title: "Game Completion Bonus", reward: "$10", description: "Complete popular games for high rewards." },
  { title: "Mega Survey Pack", reward: "$8", description: "Complete multiple surveys in one go." },
];

const steps = ["Sign Up", "Complete Tasks", "Earn Rewards", "Withdraw"];

export default function StartEarning() {
  return (
    <>
      <Meta
        title="Cashog - Start Earning"
        description="Earn real money online by completing surveys, videos, games, and high-paying offers."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* HERO SPLIT SECTION */}
        <section className="flex flex-col-reverse lg:flex-row items-center max-w-7xl mx-auto px-4 py-20 gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Start Earning Instantly
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg sm:text-xl leading-relaxed">
              Complete surveys, watch videos, play games, and install apps to earn real money from anywhere.
            </p>
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-lg text-lg"
              >
                Join & Start Earning <ArrowRight />
              </motion.span>
            </Link>
          </div>
          <div className="lg:w-1/2">
            {/* Illustration placeholder */}
            <div className="w-full h-64 sm:h-96 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-3xl">
              💰 Earn Now
            </div>
          </div>
        </section>

        {/* EARNING METHODS CARDS */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Ways to Earn
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {earningMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 text-yellow-500">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HIGH-PAYING OFFERS */}
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 dark:bg-[#111827] rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">High-Paying Offers</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {highOffers.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white dark:bg-[#1A1F2B] rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
                <span className="text-green-500 font-bold">{offer.reward}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROGRESS / STEPS SECTION */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex-1 bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-yellow-500 mb-4 text-4xl">{["📝","🎯","💰","📤"][i]}</div>
                <h3 className="font-semibold text-xl mb-2">{step}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Real Money Today!
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join Now & Start Earning <ArrowRight />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Complete tasks, surveys, videos, and offers to earn real money daily.
          </p>
        </section>

      </main>
    </>
  );
}
