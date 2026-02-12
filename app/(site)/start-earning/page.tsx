"use client";

import { useState } from "react";
import { ArrowRight, Gift, Video, Gamepad, Smartphone, Star, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

// Steps for earning
const steps = [
  { title: "Sign Up Instantly", icon: <Gift size={28} />, desc: "Create your account in seconds and start earning." },
  { title: "Pick Your Task", icon: <Video size={28} />, desc: "Select from surveys, app installs, games, and more." },
  { title: "Complete & Earn", icon: <Gamepad size={28} />, desc: "Finish tasks and watch your rewards accumulate." },
  { title: "Withdraw Rewards", icon: <Star size={28} />, desc: "Cash out instantly via PayPal, gift cards, or crypto." },
];

// Features / benefits
const features = [
  { icon: <Zap size={24} />, title: "Instant Rewards", desc: "Get paid immediately after completing each task." },
  { icon: <Smartphone size={24} />, title: "Mobile-Friendly", desc: "Earn anywhere, anytime, on any device." },
  { icon: <Gift size={24} />, title: "Multiple Ways to Earn", desc: "Surveys, videos, games, app installs, and more." },
  { icon: <Star size={24} />, title: "High-Paying Offers", desc: "Top offers selected daily to maximize your earnings." },
];

// FAQ items
const faqs = [
  { q: "Do I need prior experience?", a: "No experience is needed. Anyone can start earning immediately." },
  { q: "How long does it take to get paid?", a: "Most rewards are processed instantly or within a few hours." },
  { q: "What payment methods are supported?", a: "Withdraw via PayPal, gift cards, or crypto." },
  { q: "Is the platform secure?", a: "Absolutely! Cashooz is safe and trusted by thousands of users." },
  { q: "Can I earn on my mobile?", a: "Yes! Cashooz is fully mobile-friendly." },
  { q: "Are there hidden fees?", a: "No, all tasks are completely free to complete." },
  { q: "Can I invite friends?", a: "Yes, refer friends to earn additional bonuses and rewards." },
];

export default function HowToStartEarning() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <Meta
        title="Cashooz - How to Start Earning Real Money Online"
        description="Learn how to start earning real money online with Cashooz. Complete surveys, play games, watch videos, and install apps to earn instantly."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 py-24 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Real Money <br /> Instantly
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg sm:text-xl">
              Complete surveys, play games, watch videos, and install apps to earn rewards instantly.
            </p>
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-lg text-lg"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="w-full h-64 sm:h-96 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-3xl">
              💸 Start Now
            </div>
          </div>
        </section>

        {/* QUICK STEPS */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How to Start Earning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-yellow-500 mb-4 mx-auto w-fit">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-gray-50 dark:bg-[#111827] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Cashooz?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-[#1A1F2B] rounded-xl p-6 text-center shadow hover:shadow-lg transition"
                >
                  <div className="text-green-400 mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 text-gray-400 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <h3 className="font-semibold flex justify-between items-center">
                  {faq.q} <span>{openFAQ === i ? "-" : "+"}</span>
                </h3>
                {openFAQ === i && <p className="mt-2 text-sm">{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-28 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-8">
            Start Earning Real Money Today!
          </h2>
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-black text-yellow-400 px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join Now & Start Earning <ArrowRight />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}
