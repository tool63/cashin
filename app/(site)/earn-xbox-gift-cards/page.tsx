"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up for Free",
    description: "Create your Cashog account and start earning Xbox Gift Cards instantly.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points redeemable for Xbox Gift Cards.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Convert Points to Xbox Gift Cards",
    description: "Redeem your points safely and instantly for Xbox Gift Cards via your Cashog account.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Redeem Instantly",
    description: "Xbox Gift Cards are delivered instantly once the redemption threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Instant Gift Card Delivery", description: "Receive Xbox Gift Cards immediately after redeeming points." },
  { title: "High-Paying Offers", description: "Earn maximum points from top offers for faster rewards." },
  { title: "Global Access", description: "Available for users worldwide on any device." },
  { title: "Mobile-Friendly", description: "Earn Xbox Gift Cards on mobile, tablet, or desktop anywhere." },
  { title: "Trusted & Secure", description: "Millions of users trust Cashog for safe, verified Xbox Gift Card rewards." },
  { title: "24/7 Support", description: "Our support team is always ready to help with any questions." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I redeem Xbox Gift Cards?", a: "After collecting points from tasks, redeem them instantly for Xbox Gift Cards via your Cashog account." },
  { q: "Can I earn from mobile?", a: "Yes! The platform is fully responsive and works on any mobile device." },
  { q: "Is signing up free?", a: "Absolutely! Creating an account and earning Xbox Gift Cards is 100% free." },
  { q: "Are redemptions safe?", a: "Yes, all tasks and redemptions are verified and secure." },
  { q: "How long does it take to receive my card?", a: "Xbox Gift Cards are delivered instantly after redeeming your points." },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnXboxGiftCards() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Meta
        title="Cashog - Earn Xbox Gift Cards"
        description="Learn how to earn Xbox Gift Cards online by completing tasks, offers, and surveys with Cashog. Instant, secure, and high-paying rewards!"
      />

      <main
        className={`transition-colors duration-500 min-h-screen ${
          theme === "dark" ? "bg-[#070A14] text-white" : "bg-white text-gray-900"
        }`}
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
      >

        {/* ================= HERO ================= */}
        <section
          className={`relative py-24 px-4 text-center rounded-b-3xl transition-colors duration-500 ${
            theme === "dark" ? "bg-[#111827] text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">Earn Xbox Gift Cards</h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className={`text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Complete tasks, offers, and surveys to earn Xbox Gift Cards instantly from anywhere.
            </p>

            {/* ================= HERO CTA BUTTON ================= */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 ${
                theme === "dark" ? "bg-[#1A1F2B]" : "bg-gray-100"
              }`}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className={`text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Cashog for Xbox Gift Cards</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`rounded-2xl p-6 text-center shadow hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto ${
                  theme === "dark" ? "bg-[#111827]" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className={`rounded-xl p-4 cursor-pointer group ${theme === "dark" ? "bg-[#1A1F2B]" : "bg-gray-100"}`}>
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className={`mt-2 text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className={`text-center py-28 w-full transition-colors duration-300 rounded-t-3xl ${
          theme === "dark" ? "bg-[#111827]" : "bg-[#f9fafb]"
        }`}>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Xbox Gift Cards Today!
          </h2>
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Redeem Xbox Gift Cards <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Join Cashog and start earning Xbox Gift Cards instantly from any device, anywhere.
          </p>
        </section>

      </main>
    </>
  );
}
